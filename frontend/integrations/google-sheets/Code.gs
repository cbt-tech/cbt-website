// Paste into Extensions > Apps Script in your private submissions spreadsheet.
// Set Script Properties as described in SETUP.md; do not paste secrets into code.
const FORM_SCHEMAS = {
  contact: { tab: 'Contact enquiries', fields: ['Privacy acknowledgment', 'Form', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Message'] },
  hiring: { tab: 'Developer hiring', fields: ['Privacy acknowledgment', 'Contact name', 'Company name', 'Email', 'Phone', 'Developer expertise', 'Number of developers', 'Engagement type', 'Expected duration', 'Preferred start date', 'Budget range', 'Timezone overlap', 'Requirements'] },
  careers: { tab: 'Career applications', fields: ['Privacy acknowledgment', 'Career consideration consent', 'Full name', 'Email', 'Phone', 'Current location', 'Role interested in', 'Experience', 'Current company', 'LinkedIn', 'Portfolio / GitHub', 'Cover message'] }
};

// Accept either a resource ID or the URL copied from Sheets / Drive.
function resourceId(value) {
  const input = String(value || '').trim();
  const match = input.match(/\/d\/([\w-]+)/) || input.match(/\/folders\/([\w-]+)/) || input.match(/[?&]id=([\w-]+)/);
  return match ? match[1] : input;
}

// Run this once in the editor to authorize Sheets and Drive and verify careers setup.
// This does not create files or change spreadsheet data.
function checkCareersSetup() {
  const properties = PropertiesService.getScriptProperties();
  const secret = properties.getProperty('WEBHOOK_SECRET');
  if (!secret || secret.length < 32) throw new Error('Set WEBHOOK_SECRET to the same 32+ character secret used by the website.');
  const sheetId = resourceId(properties.getProperty('SPREADSHEET_ID'));
  if (!sheetId) throw new Error('Set SPREADSHEET_ID in Project Settings > Script Properties.');
  SpreadsheetApp.openById(sheetId);
  const folderId = resourceId(properties.getProperty('RESUME_FOLDER_ID'));
  if (!folderId) throw new Error('Set RESUME_FOLDER_ID in Project Settings > Script Properties. Careers requires a Drive folder.');
  const folder = DriveApp.getFolderById(folderId);
  if (folder.getSharingAccess() !== DriveApp.Access.PRIVATE) throw new Error('Set the resume folder General access to Restricted.');
  console.log('Careers setup check passed: spreadsheet and restricted resume folder are accessible. File creation and row writing must still be verified with a test submission.');
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  let resumeFile;
  let writingRow = false;
  let stage = 'configuration';
  try {
    const properties = PropertiesService.getScriptProperties();
    const secret = properties.getProperty('WEBHOOK_SECRET');
    const sheetId = resourceId(properties.getProperty('SPREADSHEET_ID'));
    if (!secret || secret.length < 32 || !sheetId) {
      console.error(!sheetId ? 'Missing SPREADSHEET_ID in Project Settings > Script Properties.' : 'Missing or too short WEBHOOK_SECRET in Script Properties.');
      return jsonResponse({ ok: false });
    }
    if (!e || !e.postData || e.postData.contents.length > 7100000) return jsonResponse({ ok: false });
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== secret) {
      console.error('Website GOOGLE_SHEETS_WEBHOOK_SECRET does not match Apps Script WEBHOOK_SECRET.');
      return jsonResponse({ ok: false });
    }
    if (!Object.prototype.hasOwnProperty.call(FORM_SCHEMAS, data.type)) return jsonResponse({ ok: false });
    const schema = FORM_SCHEMAS[data.type];
    if (typeof data.submissionId !== 'string' || !/^[a-f0-9-]{36}$/i.test(data.submissionId)) return jsonResponse({ ok: false });
    if (!data.fields || !data.fields['Privacy acknowledgment'] || !data.privacyPolicyVersion || !Number.isFinite(Date.parse(data.submittedAt))) return jsonResponse({ ok: false });
    const values = schema.fields.map(function (key) {
      const value = data.fields[key];
      if (typeof value !== 'string' || value.length > 5000) throw new Error('Invalid field');
      return safeCell(value);
    });
    if (!lock.tryLock(10000)) return jsonResponse({ ok: false });
    stage = 'spreadsheet_access';
    const spreadsheet = SpreadsheetApp.openById(sheetId);
    const sheet = spreadsheet.getSheetByName(schema.tab) || spreadsheet.insertSheet(schema.tab);
    stage = 'sheet_headers';
    const headers = ['Submission ID', 'Received at (UTC)', 'Privacy policy version'].concat(schema.fields, data.type === 'careers' ? ['Resume (private Drive link)'] : []);
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
      sheet.setFrozenRows(1);
    } else if (JSON.stringify(sheet.getRange(1, 1, 1, headers.length).getValues()[0]) !== JSON.stringify(headers)) {
      throw new Error('Unexpected column headers');
    }
    if (sheet.getLastRow() > 1 && sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).createTextFinder(data.submissionId).matchEntireCell(true).findNext()) {
      return jsonResponse({ ok: true, submissionId: data.submissionId });
    }
    if (data.type === 'careers') {
      stage = 'resume_storage';
      const folderId = resourceId(properties.getProperty('RESUME_FOLDER_ID'));
      if (!folderId) {
        stage = 'resume_folder_missing';
        throw new Error('Missing RESUME_FOLDER_ID');
      }
      const resume = data.resume;
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!folderId || !resume || typeof resume.filename !== 'string' || !/\.(pdf|doc|docx)$/i.test(resume.filename) || allowedTypes.indexOf(resume.mimeType) === -1 || typeof resume.content !== 'string' || resume.content.length > 7000000) throw new Error('Invalid resume');
      stage = 'resume_decode';
      const bytes = Utilities.base64Decode(resume.content);
      if (!bytes.length || bytes.length > 5 * 1024 * 1024) throw new Error('Invalid resume size');
      stage = 'resume_folder_access';
      const folder = DriveApp.getFolderById(folderId);
      if (folder.getSharingAccess() !== DriveApp.Access.PRIVATE) {
        stage = 'resume_folder_sharing';
        throw new Error('Use a restricted resume folder');
      }
      stage = 'resume_file_create';
      resumeFile = folder.createFile(Utilities.newBlob(bytes, resume.mimeType, resume.filename.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 200)));
      stage = 'resume_file_url';
      values.push(resumeFile.getUrl());
    }
    stage = 'row_write';
    const row = [data.submissionId, new Date().toISOString(), safeCell(String(data.privacyPolicyVersion))].concat(values);
    const range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length);
    range.setNumberFormat('@');
    writingRow = true;
    range.setValues([row]);
    SpreadsheetApp.flush();
    return jsonResponse({ ok: true, submissionId: data.submissionId });
  } catch (error) {
    // Do not log the submitted personal information or shared secret.
    console.error('Submission storage failed at stage: ' + stage + '. Check script properties, permissions, headers, and quotas.');
    if (resumeFile && !writingRow) {
      try { resumeFile.setTrashed(true); } catch (cleanupError) { console.error('Unable to remove an unrecorded resume file. Review the resume folder.'); }
    }
    return jsonResponse({ ok: false, error: stage });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function safeCell(value) {
  // Store user text as text, including values that resemble spreadsheet formulas.
  return /^[\s]*[=+\-@]/.test(value) ? "'" + value : value;
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
  

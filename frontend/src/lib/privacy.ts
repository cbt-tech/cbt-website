export const PRIVACY_POLICY_VERSION = "2026-09-17";
export const PRIVACY_ACKNOWLEDGMENT_ERROR = "Please confirm that you have read the Privacy Policy before submitting.";

export function hasPrivacyAcknowledgment(value: unknown) {
  return value === "true";
}

export function privacyReceipt() {
  return `Privacy Policy acknowledged: ${PRIVACY_POLICY_VERSION}; submission received: ${new Date().toISOString()}`;
}

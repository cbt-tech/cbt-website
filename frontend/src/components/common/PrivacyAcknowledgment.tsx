import Link from "next/link";

export function PrivacyAcknowledgment({ purpose = "respond to my enquiry" }: { purpose?: "respond to my enquiry" | "consider my career application" }) {
  return (
    <label className="my-5 flex items-start gap-3 text-sm leading-6 text-[var(--brand-gray)]">
      <input type="checkbox" name="privacyAcknowledged" value="true" required className="mt-1 size-4 shrink-0 accent-[var(--brand-blue)]" />
      <span>I have read the <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[var(--brand-blue)] underline underline-offset-2">Privacy Policy (opens in a new tab)</Link> and consent to the use of my submitted information to {purpose}.</span>
    </label>
  );
}

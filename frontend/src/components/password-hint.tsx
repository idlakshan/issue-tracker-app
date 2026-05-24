interface Props {
  show: boolean;
}

export default function PasswordHint({ show }: Props) {
  if (!show) return null;

  return (
    <div className="absolute left-0 -top-32 w-full bg-surface border border-secondary-text/20 shadow-lg rounded-md p-3 text-xs text-secondary-text z-10">
      <p className="font-semibold mb-1 text-text-main">
        Password must contain:
      </p>

      <ul className="space-y-1 list-disc ml-4">
        <li>At least 8 characters</li>
        <li>One uppercase letter (A-Z)</li>
        <li>One number (0-9)</li>
        <li>One symbol (!@#$ etc.)</li>
      </ul>
    </div>
  );
}

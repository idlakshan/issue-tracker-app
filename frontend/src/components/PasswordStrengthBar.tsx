import { getPasswordStrength } from "../utils/passwordStrength";

interface Props {
  password: string;
}

export default function PasswordStrengthBar({ password }: Props) {
  const strength = getPasswordStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      <div className="w-full h-1 bg-secondary-text/20 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${strength.color}`}
          style={{ width: `${strength.score}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-xs">
        <span className="text-secondary-text">Password strength</span>
        <span
          className="font-semibold"
          style={{
            color:
              strength.label === "Weak"
                ? "#ef4444"
                : strength.label === "Fair"
                  ? "#f97316"
                  : strength.label === "Good"
                    ? "#3b82f6"
                    : "#22c55e",
          }}
        >
          {strength.label}
        </span>
      </div>
    </div>
  );
}

export interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return { score: 0, label: "", color: "bg-transparent" };
  }

  let score = 0;

  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  if (hasLength) score++;
  if (hasUpper) score++;
  if (hasNumber) score++;
  if (hasSymbol) score++;

  switch (score) {
    case 0:
    case 1:
      return { score: 25, label: "Weak", color: "bg-red-500" };
    case 2:
      return { score: 50, label: "Fair", color: "bg-orange-500" };
    case 3:
      return { score: 75, label: "Good", color: "bg-blue-500" };
    case 4:
      return { score: 100, label: "Strong", color: "bg-green-500" };
    default:
      return { score: 0, label: "", color: "bg-transparent" };
  }
}
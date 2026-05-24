import React, { useState } from "react";
import { ShieldHalf, Eye, EyeOff } from "lucide-react";
import Button from "../components/ui/button";
import Input from "../components/ui/Input";
import PasswordStrengthBar from "../components/PasswordStrengthBar";
import { z } from "zod";
import { getPasswordStrength } from "../utils/passwordStrength";

const registerSchema = z.object({
  firstName: z.string().min(2, "Enter at least 2 characters"),
  lastName: z.string().min(2, "Enter at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Minimum 8 characters"),
});

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export default function Register() {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: FormErrors = {};

      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    const strength = getPasswordStrength(form.password);

    if (strength.label !== "Strong") {
      setErrors({
        password: "Password must be Strong to continue",
      });
      return;
    }

    setErrors({});
    console.log("Validated Data:", result.data);

    setForm({ firstName: "", lastName: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="w-full max-w-md bg-surface rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-text">
            <ShieldHalf size={20} />
          </div>
          <h1 className="text-lg font-semibold text-text-main">
            Issue<span className="text-primary">Tracker</span>
          </h1>
        </div>

        <h2 className="text-2xl font-semibold mb-1 text-text-main">
          Create account
        </h2>
        <p className="text-md text-secondary-text mb-6">
          Register as an assignee
        </p>

        <form onSubmit={handleRegister}>
          <div className="flex gap-4">
            <div className="mb-4 flex-1">
              <label className="text-sm font-medium text-secondary-text mb-1 block">
                First name
              </label>
              <Input
                placeholder="Dimuthu"
                value={form.firstName}
                onChange={handleChange("firstName")}
                className="w-full"
              />
              {errors.firstName && (
                <p className="text-priority-critical-text text-xs mt-1">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="mb-4 flex-1">
              <label className="text-sm font-medium text-secondary-text mb-1 block">
                Last name
              </label>
              <Input
                placeholder="Lakshan"
                value={form.lastName}
                onChange={handleChange("lastName")}
                className="w-full"
              />
              {errors.lastName && (
                <p className="text-priority-critical-text text-xs mt-1">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-secondary-text mb-1 block">
              Email
            </label>
            <Input
              type="email"
              placeholder="dimuthu@gmail.com"
              value={form.email}
              onChange={handleChange("email")}
              className="w-full"
            />
            {errors.email && (
              <p className="text-priority-critical-text text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-secondary-text mb-1 block">
              Password
            </label>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Min 8 characters"
                value={form.password}
                onChange={handleChange("password")}
                className="w-full pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-text/70 hover:text-text-main"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <PasswordStrengthBar password={form.password} />

            {errors.password && (
              <p className="text-priority-critical-text text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full mb-4">
            Register
          </Button>

          <p className="text-center text-sm text-secondary-text">
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer font-medium hover:underline"
              onClick={() => console.log("Navigate to login")}
            >
              Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

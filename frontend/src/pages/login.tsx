import React, { useState } from "react";
import { ShieldHalf, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../store/api/authApi";
import { setCredentials } from "../store/slices/authSlice";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

interface LogInData {
  email: string;
  password: string;
}

interface LogInErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [form, setForm] = useState<LogInData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LogInErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange =
    (field: keyof LogInData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: LogInErrors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof LogInData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      const response = await loginUser({
        email: form.email,
        password: form.password,
      }).unwrap();

      dispatch(setCredentials(response));

      navigate("/dashboard");
    } catch (err: unknown) {
      console.error("Login failed:", err);
    }

    console.log("Validated Login Data:", result.data);
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

        <h2 className="text-2xl font-semibold mb-1 text-text-main">Sign in</h2>
        <p className="text-md text-secondary-text mb-6">
          Enter your credentials here
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="text-sm font-medium text-secondary-text mb-1 block">
              Email
            </label>
            <Input
              type="email"
              placeholder="dimuthu@gmail.com"
              value={form.email}
              onChange={handleChange("email")}
              icon={<Mail size={16} />}
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
                placeholder={"\u2022".repeat(8)}
                value={form.password}
                onChange={handleChange("password")}
                icon={<Lock size={16} />}
                className="w-full pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-text/70 hover:text-text-main cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-priority-critical-text text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full mb-4">
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          <p className="text-center text-sm text-secondary-text">
            No account?{" "}
            <span
              className="text-primary cursor-pointer font-medium hover:underline"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

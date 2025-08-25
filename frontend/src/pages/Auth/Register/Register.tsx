// src/pages/Register.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setErrors({ ...errors, [e.target.id]: "" });
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.username) newErrors.username = "Username is required.";
        if (!formData.first_name) newErrors.first_name = "First name is required.";
        if (!formData.last_name) newErrors.last_name = "Last name is required.";
        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format.";
        }
        if (!formData.password) newErrors.password = "Password is required.";
        if (formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters.";
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError(null);
        setSuccess(false);

        if (!validate()) return;

        setSubmitting(true);
        try {
            await register(
                formData.username,
                formData.email,
                formData.password,
                formData.first_name,
                formData.last_name
            );
            setSuccess(true);
            setTimeout(() => navigate("/login"), 500);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const data = err.response?.data;
            if (data && typeof data === "object") {
                const fieldErrors: Record<string, string> = {};
                Object.keys(data).forEach((key) => {
                    if (Array.isArray(data[key]) && data[key].length > 0) {
                        fieldErrors[key] = data[key][0];
                    }
                });
                setErrors(fieldErrors);
                if (Object.keys(fieldErrors).length === 0) {
                    setApiError("Registration failed.");
                }
            } else {
                setApiError("Something went wrong.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex h-fit w-full items-start justify-center bg-background mt-2 md:mt-4 lg:mt-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl space-y-4 rounded-xl border bg-card p-6 shadow"
            >
                <h1 className="text-2xl font-bold text-center">Register</h1>

                {success && (
                    <p className="text-sm text-green-600 text-center">
                        Registration successful! Redirecting...
                    </p>
                )}

                {apiError && (
                    <p className="text-sm text-red-500 text-center">{apiError}</p>
                )}

                {/* Username */}
                <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="Choose a username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && (
                        <p className="text-xs text-red-500">{errors.username}</p>
                    )}
                </div>

                {/* First + Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input
                            id="first_name"
                            type="text"
                            placeholder="Enter first name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        {errors.first_name && (
                            <p className="text-xs text-red-500">{errors.first_name}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input
                            id="last_name"
                            type="text"
                            placeholder="Enter last name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                        {errors.last_name && (
                            <p className="text-xs text-red-500">{errors.last_name}</p>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                </div>

                {/* Password + Confirm Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-500">{errors.password}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && (
                            <p className="text-xs text-red-500">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? "Registering..." : "Register"}
                </Button>
            </form>
        </div>
    );
};

export default Register;

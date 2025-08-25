import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const result = await login(username, password);

        setLoading(false);

        if (result.success) {
            navigate("/");
        } else {
            setError(result.message || "Login failed");
        }
    };

    return (
        <div className="flex h-fit w-full items-start justify-center bg-background mt-2 md:mt-4 lg:mt-6">
            <form
                onSubmit={handleSubmit}
                className="w-full space-y-4 rounded-xl border bg-card p-6"
            >
                <h1 className="text-2xl font-bold text-center">Login</h1>

                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                {/* Username Input */}
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        required
                        className="w-full"
                    />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                        className="w-full"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </form>
        </div>
    );
}

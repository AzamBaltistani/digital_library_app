import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SocialLogin() {
    return (
        <div className="space-y-2">
            <Button
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={() => console.log("Google login")}
            >
                <FcGoogle className="w-5 h-5" />
                Continue with Google
            </Button>

            <Button
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={() => console.log("GitHub login")}
            >
                <FaGithub className="w-5 h-5" />
                Continue with GitHub
            </Button>
        </div>
    );
}
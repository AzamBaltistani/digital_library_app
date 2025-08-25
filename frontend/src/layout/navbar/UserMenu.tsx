import { User2, LogOut, LayoutDashboardIcon, RotateCcwKeyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";

export function UserMenu() {
    const { logout } = useAuth();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="flex items-center justify-center rounded-full border hover:bg-neutral-200 dark:bg-neutral-800"
                >
                    <User2 className="h-5 w-5" />
                    <span className="sr-only">User Menu</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => console.log("Profile clicked")}>
                    <User2 className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                    <Link to={'/dashboard'}>Dashboard</Link>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => console.log("Dashboard clicked")}>
                    <RotateCcwKeyIcon className="mr-2 h-4 w-4" />
                    <span>Switch Role</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => logout()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

import { BookOpenText, Building2, Slack } from "lucide-react";
import DesktopNav from "./Desktop";
import MobileNav from "./Mobile";
import { ModeToggle } from "@/components/mode-toggle";
import { UserMenu } from "./UserMenu";
import { useRole } from "@/hooks/useRole";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import SearchBox from "./SearchBox";

const Navbar = () => {
    const { isAuthenticated } = useRole();

    const navItems = [
        { label: "Home", icon: <Slack />, href: "/" },
        { label: "Explore", icon: <BookOpenText />, href: "/explore" },
        { label: "About Us", icon: <Building2 />, href: "/about-us" },
    ];

    return (
        <nav className="flex w-full dark:bg-black bg-white border-b min-h-[8vh] sticky top-0 z-30 opacity-90 justify-center">
            <div className="flex container items-center justify-between">
                <div className="flex md:px-3">
                    <DesktopNav navItems={navItems} />
                    <MobileNav navItems={navItems} />
                </div>

                <SearchBox />
                <div className="flex items-center gap-2 md:px-3">
                    {isAuthenticated ? <UserMenu /> : <Link to={'login'} className="px-2"> <Button>Login</Button></Link>}
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

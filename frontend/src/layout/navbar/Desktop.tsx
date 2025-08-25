import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

interface NavItem {
    label: string;
    icon: React.ReactNode;
    href: string;
}

interface DesktopNavProps {
    navItems: NavItem[];
}

const DesktopNav = ({ navItems }: DesktopNavProps) => {
    return (
        <div className="hidden md:flex items-center gap-4 justify-start w-full">
            {navItems.map((item) => (
                <Button
                    asChild
                    variant="ghost"
                    className="hover:cursor-pointer gap-2 text-sm items-center justify-center"
                    size="sm"
                    key={item.label}
                >
                    <NavLink to={item.href}>
                        {item.icon}
                        {item.label}
                    </NavLink>
                </Button>
            ))}
        </div>
    );
};

export default DesktopNav;

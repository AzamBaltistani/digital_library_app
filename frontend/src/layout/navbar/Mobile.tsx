
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavLink } from "react-router";


interface NavItem {
    label: string;
    icon: React.ReactNode;
    href: string;
}

interface MobileNavProps {
    navItems: NavItem[];
}

const MobileNav = ({ navItems }: MobileNavProps) => {
    return (
        <div className="flex md:hidden items-center gap-2">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-56">
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-2 mt-4">
                        {navItems.map((item) => (
                            <Button
                                asChild
                                variant="ghost"
                                className="justify-start gap-2"
                                key={item.label}
                            >
                                <NavLink to={item.href}>
                                    {item.icon}
                                    {item.label}
                                </NavLink>
                            </Button>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileNav;

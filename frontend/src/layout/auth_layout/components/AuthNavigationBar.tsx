import TabsNavigation from "@/components/layout/TabsNavigation";

const AuthNavigationBar = () => {
    const authTabs = [
        { value: "login", label: "Login", href: "/login" },
        { value: "register", label: "Register", href: "/register" },
    ];

    return <TabsNavigation tabs={authTabs} />;
};

export default AuthNavigationBar;

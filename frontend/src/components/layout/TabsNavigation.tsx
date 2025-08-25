import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";

interface TabItem {
  value: string;
  label: string;
  href: string;
}

interface TabsNavigationProps {
  tabs: TabItem[];
}

const TabsNavigation = ({ tabs }: TabsNavigationProps) => {
  const location = useLocation();

  const currentPath = location.pathname;
  const activeTab = tabs.find((tab) => currentPath.includes(tab.value))?.value ?? tabs[0].value;

  return (
    <Tabs
      value={activeTab}
      className="relative flex w-full items-center justify-center"
    >
      <TabsList className="relative w-full h-10 flex">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="flex-1 relative">
            {activeTab === tab.value && (
              <motion.div
                layoutId="authTabBg"
                className="absolute inset-0 rounded-md bg-background dark:bg-input/30 shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Link
              to={tab.href}
              className={`relative z-10 flex w-full h-10 items-center justify-center text-center ${activeTab !== tab.value && "hover:underline"}`}
            >
              {tab.label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default TabsNavigation;

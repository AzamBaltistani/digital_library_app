import React from "react";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-[92vh] bg-white justify-center dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100">
            <div className="flex container">
                {children}
            </div>
        </div>
    );
}
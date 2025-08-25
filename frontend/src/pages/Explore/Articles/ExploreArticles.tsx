import PageWrapper from "@/components/page-wrapper";
import FilterBar from "../components/FilterBar";
import { useState } from "react";

export default function ExploreArticles() {
    const [selectedItem, setSelectedItem] = useState("All");

    const filterItems = [
        "All",
        "Free",
        "Free to Borrow",
        "Most Downloaded",
        "Most Borrowed",
    ];

    return (
        <PageWrapper>
            <div className="flex flex-col w-full h-full">
                <div>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold border-b px-1 md:px-2">
                        Articles
                    </h1>
                </div>
                <div className="flex w-full h-[8vh]">
                    <FilterBar
                        filterItems={filterItems}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                    />
                </div>
                <div className="p-4">
                    Articles
                </div>
            </div>
        </PageWrapper>
    )
}

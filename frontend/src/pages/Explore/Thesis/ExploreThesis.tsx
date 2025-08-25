import PageWrapper from "@/components/page-wrapper";
import { useEffect, useState } from "react";

import FilterBar from "../components/FilterBar";
import { fetchAllContents, fetchBorrowableContents, fetchFreeContents, fetchMostBorrowed, fetchMostDownloaded, type ContentThesis } from "@/utils/api_explore_thesis";


export default function ExploreThesis() {
    const [selectedItem, setSelectedItem] = useState("All");
    const [data, setData] = useState<ContentThesis[]>([]);
    const [loading, setLoading] = useState(false);

    const filterItems = [
        "All",
        "Free",
        "Free to Borrow",
        "Most Downloaded",
        "Most Borrowed",
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let result: ContentThesis[] = [];
                if (selectedItem === "All") result = await fetchAllContents();
                else if (selectedItem === "Free") result = await fetchFreeContents();
                else if (selectedItem === "Free to Borrow")
                    result = await fetchBorrowableContents();
                else if (selectedItem === "Most Downloaded")
                    result = await fetchMostDownloaded();
                else if (selectedItem === "Most Borrowed")
                    result = await fetchMostBorrowed();

                setData(result);
            } catch (error) {
                console.error("Error fetching contents:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedItem]);

    return (
        <PageWrapper>
            <div className="flex flex-col w-full h-full">
                <div>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold border-b px-1 md:px-2">
                        Thesis
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
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {data.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-4 border rounded-lg shadow hover:shadow-lg transition"
                                >
                                    <h2 className="font-bold text-lg">{item.title}</h2>
                                    <p className="text-sm">{item.description}</p>
                                    <p className="text-xs text-gray-500">
                                        by {item.author_name} | {item.content_type}
                                    </p>
                                    <div className="mt-2 text-sm">
                                        {item.is_free && (
                                            <span className="text-green-600 pr-1 md:pr-2">Free</span>
                                        )}
                                        <>
                                            <span>Buy: ${item.price_buy ? item.price_buy : 0}</span> |{" "}
                                            <span>Borrow: ${item.price_borrow ? item.price_borrow : 0}</span>
                                        </>

                                    </div>
                                    <div className="mt-1 text-xs">
                                        {
                                            item.thesis_details.university ? (<>
                                                University: {item.thesis_details?.university}
                                            </>) : (
                                                <> {" "} </>
                                            )
                                        }
                                        {
                                            item.thesis_details.supervisor ? (<>
                                                {" | "} Supervisor: {item.thesis_details?.supervisor}
                                            </>) : (
                                                <> {" "} </>
                                            )
                                        }
                                    </div>
                                    <div className="mt-1 text-xs">
                                        Downloads: {item.download_count} | Borrowed:{" "}
                                        {item.borrowed_count}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PageWrapper>
    );
}

import TabsNavigation from "@/components/layout/TabsNavigation";
import PageWrapper from "@/components/page-wrapper";
import { Outlet } from "react-router";

export default function Index() {
    const pageLinkItems = [
        {
            value: "all",
            label: "All",
            href: ""
        },
        {
            value: "books",
            label: "Books",
            href: "books"
        },
        {
            value: "articles",
            label: "Articles",
            href: "articles"
        },
        {
            value: "blogs",
            label: "Blogs",
            href: "blogs"
        },
        {
            value: "research-papers",
            label: "Research Papers",
            href: "research-papers"
        },
        {
            value: "thesis",
            label: "Thesis",
            href: "thesis"
        }
    ];

    return (
        <PageWrapper>
            <div className="flex flex-col h-full w-full">
                <div className="flex w-fit md:w-[50%] h-[8vh] overflow-hidden self-center">
                    <TabsNavigation tabs={pageLinkItems} />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>

        </PageWrapper>
    )
}

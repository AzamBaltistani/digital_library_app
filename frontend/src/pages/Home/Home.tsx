import PageWrapper from "@/components/page-wrapper";
import Announcement from "@/components/page_items/Announcement";

export default function Home() {


    return (
        <PageWrapper>
            <div className="flex flex-col w-full h-full">
                <div className="flex w-full h-[6vh] ">
                    <Announcement message="📢 New semester resources are now available!" />
                </div>
                <div>
                    <h1>For You</h1>
                </div>
            </div>


        </PageWrapper>
    );
}

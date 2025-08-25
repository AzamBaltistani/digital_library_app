import { ScrollArea } from "@/components/ui/scroll-area"
import { ScrollAreaScrollbar } from "@radix-ui/react-scroll-area"

interface FilterBarProps {
    filterItems: string[];
    extraFilters?: string[];
    selectedItem: string;
    setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}

function FilterBar({ filterItems, setSelectedItem, selectedItem, extraFilters }: FilterBarProps) {
    const buttonBaseStyle = " rounded w-fit px-3 md:px-4 py-1 h-fit text-sm text-center font-semibold text-nowrap "
    const selectedButtonStyle = " bg-neutral-800 hover:bg-neutral-700 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-black "
    const normalButtonStyle = " bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-black dark:text-white "

    const handleExploreBtnClick = (i: string) => {
        setSelectedItem(i)
    }

    return (
        <div className="flex p-1 md:p-2 w-full h-full items-center justify-start">
            <ScrollArea className="h-fit w-full ">
                <div className="flex gap-2 md:gap-3 h-full w-full items-center justify-start">
                    {filterItems.map((item, index) => (
                        <button className={buttonBaseStyle + `${selectedItem === item ? selectedButtonStyle : normalButtonStyle}`} key={index} onClick={() => (handleExploreBtnClick(item))}>{item}</button>
                    ))}
                    {extraFilters?.map((item, index) => (
                        <button className={buttonBaseStyle + `${selectedItem === item ? selectedButtonStyle : normalButtonStyle}`} key={index} onClick={() => (handleExploreBtnClick(item))}>{item}</button>
                    ))}
                </div>
                <ScrollAreaScrollbar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

export default FilterBar
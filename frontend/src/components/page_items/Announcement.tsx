interface AnnouncementProps {
    message: string;
}

const Announcement = ({ message }: AnnouncementProps) => {
    return (
        <div className="flex items-center justify-center w-full h-full font-medium bg-neutral-200 dark:bg-neutral-800 dark:text-white">
            <p>{message}</p>
        </div>
    );
};

export default Announcement;

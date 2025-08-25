interface ItemCardProps {
    title: string;
    description: string;
    author?: string;
}

const ItemCard = ({ title, description, author }: ItemCardProps) => {
    return (
        <div className="rounded-xl border bg-card p-4 shadow hover:shadow-md transition">
            <h3 className="text-lg font-semibold">{title}</h3>
            {author && <p className="text-sm text-muted-foreground">by {author}</p>}
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
    );
};

export default ItemCard;

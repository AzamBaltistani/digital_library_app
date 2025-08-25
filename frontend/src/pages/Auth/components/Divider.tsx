
type DividerProps = {
    text?: string;
};

export default function Divider({ text }: DividerProps) {
    return (
        <div className="flex items-center justify-center gap-2">
            <div className="h-px w-full bg-border"></div>
            {text && (
                <>
                    <span className="text-xs text-muted-foreground">{text}</span>
                    <div className="h-px w-full bg-border"></div>
                </>
            )}
        </div>
    );
}

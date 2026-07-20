import { Inbox } from "lucide-react";

function Empty() {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
                <Inbox className="w-6 h-6 text-white/40" />
            </div>
            <p className="text-sm text-muted-foreground font-medium">No market data found.</p>
        </div>
    );
}
export default Empty;
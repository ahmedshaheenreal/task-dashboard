import { LayoutDashboard, Wallet, ArrowRightLeft, ChevronRight } from "lucide-react";
import { showComingSoon } from "./CommingSoonToast";


function LeftSideBar() {
    const dummySideBar = [
        { icon: LayoutDashboard, label: "Overview", active: true },
        { icon: Wallet, label: "Portfolio", active: false },
        { icon: ArrowRightLeft, label: "Transactions", active: false },
    ]
    return (<>
        {dummySideBar.map((item, idx) => (
            <button
                key={idx}
                onClick={!item.active ? showComingSoon : undefined}
                className={`flex items-center justify-center lg:justify-start gap-4 px-3 py-3 rounded-xl transition-all duration-300 group ${item.active
                    ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(139,92,246,0.2)]"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                    }`}
            >
                <item.icon className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${item.active ? "text-primary drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" : ""}`} />
                <span className="font-medium hidden lg:block truncate">{item.label}</span>
                {item.active && <ChevronRight className="w-4 h-4 ml-auto hidden lg:block shrink-0" />}
            </button>
        ))}</>)

}

export default LeftSideBar;
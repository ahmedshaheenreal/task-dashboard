import { LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.store";

export default function UserList() {
    const { logout } = useAuthStore();


    return (
        <div className="absolute top-14 right-0 w-32 glass-panel p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50 border border-white/10 origin-top-right">
            <button
                onClick={() => logout()}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors w-full text-center"
            >
                <LogOut className="w-4 h-4" />
                Logout
            </button>
        </div>
    );
}
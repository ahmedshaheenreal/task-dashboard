import { useState, useRef, useEffect } from "react";
import { RefreshCcwIcon, Activity, LogOut } from "lucide-react";
import CoinDetails from "../components/CoinDetails";
import DataTable from "../components/DataTable";
import SearchInput from "../components/SearchInput";
import { useAuthStore } from "../store/useAuthStore.store";
import LeftSideBar from "../components/LeftSideBar";
import { useMarketStore } from "../store/useMarketStore.store";

function Dashboard() {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { logout } = useAuthStore();
    const { refreshAssets, isLoading } = useMarketStore()
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className="flex h-screen overflow-hidden text-foreground antialiased selection:bg-primary/30 selection:text-primary-foreground">

            {/* Sidebar */}
            <aside className="w-20 lg:w-64 flex flex-col justify-between p-4 glass-panel border-r border-white/5 shrink-0 z-20 m-4 lg:m-6 mr-0 lg:mr-2 relative">
                {/* Glow behind sidebar */}
                <div className="absolute top-0 left-0 w-full h-32 bg-primary/20 blur-[60px] -z-10 rounded-t-2xl pointer-events-none" />

                <div>
                    <div className="flex items-center gap-3 mb-10 px-2 pt-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)] shrink-0">
                            <Activity className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold text-label hidden lg:block tracking-wide truncate">
                            Dashboard
                        </span>
                    </div>

                    <nav className="flex flex-col gap-2">
                        <LeftSideBar />
                    </nav>
                </div>


            </aside>

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 w-full relative z-10 overflow-hidden">

                {/* Header */}
                <header className="h-20 lg:h-24 px-6 lg:px-8 flex items-center justify-between shrink-0">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight drop-shadow-md leading-tight">
                            Market Overview
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1 hidden sm:block">
                            Welcome back, here's what's happening today.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 ml-4 relative" ref={menuRef}>
                        <div className="hidden sm:flex gap-4">

                            <button
                                disabled={isLoading}
                                onClick={() => refreshAssets()}
                                className="w-10 h-10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors shrink-0"
                            >
                                <RefreshCcwIcon className="w-5 h-5 text-white" />
                            </button>
                            <SearchInput />
                        </div>
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors shrink-0"
                        >
                            <img
                                src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=transparent"
                                alt="Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                        </button>

                        {/* User Menu Dropdown */}
                        {showUserMenu && (
                            <div className="absolute top-14 right-0 w-32 glass-panel p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50 border border-white/10 origin-top-right">
                                <button
                                    disabled={isLoading}
                                    onClick={() => logout()}
                                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors w-full text-center"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* Dashboard Grid */}
                <main className="flex-1 overflow-y-auto px-4 lg:px-8 pb-8 scroll-smooth" style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255, 255, 255, 0.1) transparent'
                }}>
                    <div className="sm:hidden mb-6">
                        {/* Mobile search */}
                        <SearchInput />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-auto xl:h-full xl:min-h-[700px]">

                        {/* Table Area (Takes up 2/3 on large screens) */}
                        <div className="xl:col-span-2 glass-panel glass-panel-hover flex flex-col overflow-hidden relative min-h-[500px]">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] -z-10 rounded-full pointer-events-none" />
                            <div className="flex-1 overflow-hidden">
                                <DataTable />
                            </div>
                        </div>

                        {/* Details/Sidebar Area (Takes up 1/3 on large screens) */}
                        <div className="xl:col-span-1 glass-panel glass-panel-hover flex flex-col overflow-hidden relative min-h-[400px]">
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 blur-[80px] -z-10 rounded-full pointer-events-none" />
                            <div className="flex-1 overflow-hidden">
                                <CoinDetails />
                            </div>
                        </div>

                    </div>
                </main>

            </div>
        </div>
    );
}

export default Dashboard;
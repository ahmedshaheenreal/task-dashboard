import UserList from "./UserList";
import { useState, useEffect, useRef } from "react";
export default function UserAvatarButton() {

    const [showUserMenu, setShowUserMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
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
        <div ref={menuRef}>
            <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 cursor-pointer rounded-full bg-background/10 backdrop-blur-md border border-white/20 shadow-lgflex items-center justify-center hover:bg-white/10 transition-colors shrink-0"
            >
                <img
                    src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=transparent"
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                />
            </button>
            {/* User Menu Dropdown */}
            {showUserMenu && (
                <UserList />
            )}
        </div >
    );
}
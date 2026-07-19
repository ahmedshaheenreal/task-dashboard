import { useState } from "react";
import { Activity, LogIn, Sparkles } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.store";

function Login() {
  const [username, setUsername] = useState("");
  const { login } = useAuthStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden relative selection:bg-primary/30 selection:text-primary-foreground antialiased text-foreground">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />

      {/* Login Card */}
      <div className="glass-panel w-full max-w-md p-8 sm:p-10 relative z-10 mx-4 border-t border-l border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_15px_50px_rgba(139,92,246,0.15)]">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-primary/20 blur-[40px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.4)] mb-6 group cursor-default">
            <Activity className="text-white w-10 h-10 group-hover:scale-110 transition-transform duration-500" />
          </div>
          <h1 className="text-4xl font-bold aura-text tracking-tight text-center drop-shadow-md">
            AuraDash
          </h1>
          <p className="text-muted-foreground text-sm mt-3 flex items-center gap-1.5 font-medium">
            <Sparkles className="w-4 h-4 text-accent" />
            Secure Trader Terminal
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-semibold text-white/80 pl-1 uppercase tracking-wider">
              Trader Alias
            </label>
            <div className="relative group">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. Satoshi99"
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-inner text-lg"
                autoComplete="off"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full relative group overflow-hidden rounded-xl p-[1px] mt-4 transition-all duration-300 shadow-lg"
          >
            {/* Animated border gradient */}
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative bg-[#05050f]/80 backdrop-blur-sm group-hover:bg-transparent transition-all duration-300 rounded-xl px-4 py-3.5 flex items-center justify-center gap-2 w-full h-full">
              <span className="font-bold text-white tracking-wide text-lg group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Launch Terminal</span>
              <LogIn className="w-5 h-5 text-white/80 group-hover:text-white group-hover:translate-x-1.5 transition-all" />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

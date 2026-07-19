import { AlertCircle, RefreshCcw } from "lucide-react";

interface ErrorProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
    className?: string;
}

function ErrorComponent({
    title = "Something went wrong",
    message = "We couldn't load the requested data. Please try again.",
    onRetry,
    className = "",
}: ErrorProps) {
    return (
        <div className={`flex flex-col items-center justify-center p-8 text-center h-full min-h-[300px] w-full ${className}`}>
            {/* Icon Container with Aura Glow */}
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.15)] relative group cursor-default">
                <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <AlertCircle className="w-10 h-10 text-red-400 group-hover:scale-110 transition-transform duration-500 relative z-10" />
            </div>

            {/* Error Text */}
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight drop-shadow-sm">
                {title}
            </h3>
            <p className="text-sm text-muted-foreground max-w-[300px] mb-6 leading-relaxed">
                {message}
            </p>

            {/* Optional Retry Button */}
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 group shadow-lg"
                >
                    <RefreshCcw className="w-4 h-4 text-primary group-hover:-rotate-180 transition-transform duration-500" />
                    Try Again
                </button>
            )}
        </div>
    );
}

export default ErrorComponent;

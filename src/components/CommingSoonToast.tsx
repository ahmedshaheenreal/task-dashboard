import { toast } from "sonner";
import { Rocket } from "lucide-react";

export function showComingSoon() {
    toast("Coming Soon!", {
        description: <p className="text-label">This feature is currently under development.</p>,
        icon: <Rocket className="w-4 h-4 text-primary" />,
        duration: 2500,

    });
}
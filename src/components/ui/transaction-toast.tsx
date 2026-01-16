import { cn } from "@/lib/utils";
import { 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  ExternalLink,
  Zap
} from "lucide-react";
import { useEffect, useState } from "react";

export type TransactionState = "pending" | "verifying" | "confirmed" | "failed";

interface TransactionToastProps {
  state: TransactionState;
  title: string;
  hash?: string;
  onClose?: () => void;
}

const stateConfig = {
  pending: {
    icon: Loader2,
    label: "Submitting to Sui...",
    color: "text-primary",
    bg: "bg-primary/10",
    animate: true,
  },
  verifying: {
    icon: Zap,
    label: "Verifying on-chain...",
    color: "text-warning",
    bg: "bg-warning/10",
    animate: true,
  },
  confirmed: {
    icon: CheckCircle2,
    label: "Object transferred",
    color: "text-success",
    bg: "bg-success/10",
    animate: false,
  },
  failed: {
    icon: XCircle,
    label: "Transaction failed",
    color: "text-destructive",
    bg: "bg-destructive/10",
    animate: false,
  },
};

export function TransactionToast({ state, title, hash, onClose }: TransactionToastProps) {
  const config = stateConfig[state];
  const Icon = config.icon;

  return (
    <div className="animate-slide-in-right w-80 rounded-xl border border-border bg-background-elevated p-4 shadow-elevated">
      <div className="flex items-start gap-3">
        <div className={cn("rounded-lg p-2", config.bg)}>
          <Icon 
            className={cn(
              "h-5 w-5", 
              config.color,
              config.animate && "animate-spin"
            )} 
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className={cn("mt-0.5 text-xs font-medium", config.color)}>
            {config.label}
          </p>
          {hash && (
            <a
              href={`https://suiscan.xyz/mainnet/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              View on Suiscan
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-foreground-subtle hover:text-foreground transition-colors"
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// Demo component to showcase transaction states
export function TransactionDemo() {
  const [toasts, setToasts] = useState<Array<{ id: number; state: TransactionState; title: string }>>([]);
  const [nextId, setNextId] = useState(0);

  const simulateTransaction = () => {
    const id = nextId;
    setNextId(id + 1);
    
    // Add pending toast
    setToasts(prev => [...prev, { id, state: "pending", title: "Purchasing Data Access" }]);
    
    // Simulate state transitions
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, state: "verifying" } : t));
    }, 1500);
    
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, state: "confirmed" } : t));
    }, 3000);
    
    // Remove after confirmed
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div>
      <button
        onClick={simulateTransaction}
        className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Simulate Transaction
      </button>
      
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 space-y-3 z-50">
        {toasts.map(toast => (
          <TransactionToast
            key={toast.id}
            state={toast.state}
            title={toast.title}
            hash="0x1234...5678"
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

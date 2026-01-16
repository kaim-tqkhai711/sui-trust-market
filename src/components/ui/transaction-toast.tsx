import { cn } from "@/lib/utils";
import { 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  ExternalLink,
  Zap,
  Box,
  ArrowRightLeft,
  Link2
} from "lucide-react";

export type TransactionState = "pending" | "verifying" | "confirmed" | "failed";

interface TransactionToastProps {
  state: TransactionState;
  title: string;
  hash?: string;
  objectId?: string; // Minted AccessRight object
  onClose?: () => void;
}

const stateConfig = {
  pending: {
    icon: ArrowRightLeft,
    label: "Submitting to Sui Network...",
    sublabel: "Broadcasting transaction",
    color: "text-primary",
    bg: "bg-primary/10",
    borderColor: "border-primary/30",
    animate: true,
  },
  verifying: {
    icon: Zap,
    label: "Verifying on-chain...",
    sublabel: "Awaiting consensus",
    color: "text-warning",
    bg: "bg-warning/10",
    borderColor: "border-warning/30",
    animate: true,
  },
  confirmed: {
    icon: CheckCircle2,
    label: "AccessRight object minted",
    sublabel: "Object transferred successfully",
    color: "text-success",
    bg: "bg-success/10",
    borderColor: "border-success/30",
    animate: false,
  },
  failed: {
    icon: XCircle,
    label: "Transaction reverted",
    sublabel: "On-chain execution failed",
    color: "text-destructive",
    bg: "bg-destructive/10",
    borderColor: "border-destructive/30",
    animate: false,
  },
};

export function TransactionToast({ state, title, hash, objectId, onClose }: TransactionToastProps) {
  const config = stateConfig[state];
  const Icon = config.icon;

  return (
    <div className={cn(
      "animate-slide-in-right w-96 rounded-xl border bg-background-elevated p-4 shadow-elevated",
      config.borderColor
    )}>
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className={cn("rounded-lg p-2.5 relative", config.bg)}>
          <Icon 
            className={cn(
              "h-5 w-5", 
              config.color,
              config.animate && "animate-pulse"
            )} 
          />
          {config.animate && (
            <span className="absolute inset-0 rounded-lg animate-ping opacity-20" style={{ backgroundColor: 'currentColor' }} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className={cn("mt-0.5 text-xs font-medium", config.color)}>
            {config.label}
          </p>
          <p className="text-[10px] text-foreground-subtle mt-0.5">
            {config.sublabel}
          </p>
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

      {/* On-chain Details */}
      <div className="mt-3 pt-3 border-t border-border/50 space-y-2">
        {/* Transaction Hash */}
        {hash && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] text-foreground-subtle">
              <Link2 className="h-3 w-3" />
              <span className="uppercase tracking-wider">Tx Hash</span>
            </div>
            <a
              href={`https://suiscan.xyz/mainnet/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] font-mono text-primary hover:underline"
            >
              {hash}
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>
        )}

        {/* Minted Object ID */}
        {state === "confirmed" && objectId && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] text-foreground-subtle">
              <Box className="h-3 w-3" />
              <span className="uppercase tracking-wider">New Object</span>
            </div>
            <a
              href={`https://suiscan.xyz/mainnet/object/${objectId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] font-mono text-success hover:underline"
            >
              {objectId}
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>
        )}

        {/* View on Explorer */}
        {hash && (
          <a
            href={`https://suiscan.xyz/mainnet/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors"
          >
            View on Suiscan
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      {/* On-chain indicator */}
      <div className="mt-3 flex items-center gap-1.5 text-[9px] text-foreground-subtle/60">
        <span className="relative flex h-1.5 w-1.5">
          <span className={cn(
            "absolute inline-flex h-full w-full rounded-full opacity-75",
            state === "confirmed" ? "bg-success" : state === "failed" ? "bg-destructive" : "bg-primary animate-ping"
          )}></span>
          <span className={cn(
            "relative inline-flex rounded-full h-1.5 w-1.5",
            state === "confirmed" ? "bg-success" : state === "failed" ? "bg-destructive" : "bg-primary"
          )}></span>
        </span>
        <span className="uppercase tracking-wider">Sui Mainnet • Object-centric execution</span>
      </div>
    </div>
  );
}

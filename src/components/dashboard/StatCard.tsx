import { cn } from "@/lib/utils";
import { LucideIcon, Link2 } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning";
  className?: string;
  /** On-chain source label to display */
  onChainLabel?: string;
  /** Optional object ID for on-chain reference */
  objectId?: string;
}

const variantStyles = {
  default: {
    icon: "bg-background-hover text-foreground-muted",
    border: "border-border",
    chainBg: "bg-background-hover",
  },
  primary: {
    icon: "bg-primary/10 text-primary",
    border: "border-primary/20",
    chainBg: "bg-primary/5",
  },
  success: {
    icon: "bg-success/10 text-success",
    border: "border-success/20",
    chainBg: "bg-success/5",
  },
  warning: {
    icon: "bg-warning/10 text-warning",
    border: "border-warning/20",
    chainBg: "bg-warning/5",
  },
};

export function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  variant = "default",
  className,
  onChainLabel,
  objectId
}: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-background-card p-5 border transition-all duration-300",
        "hover:bg-background-hover hover:shadow-card",
        styles.border,
        className
      )}
    >
      {/* On-chain indicator pulse */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
        </span>
        <span className="text-[10px] font-medium text-success uppercase tracking-wider">Live</span>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground-muted">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">{value}</span>
            {subtitle && (
              <span className="text-sm font-medium text-foreground-subtle">{subtitle}</span>
            )}
          </div>
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}
              >
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
              <span className="text-xs text-foreground-subtle">vs last week</span>
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-xl mt-4", styles.icon)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {/* On-chain source label */}
      {onChainLabel && (
        <div className={cn(
          "mt-4 pt-3 border-t border-border/50"
        )}>
          <div className="flex items-center gap-1.5">
            <Link2 className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-medium text-foreground-subtle uppercase tracking-wide">
              {onChainLabel}
            </span>
          </div>
          {objectId && (
            <div className="mt-1.5 font-mono text-[10px] text-foreground-subtle/70 flex items-center gap-1">
              <span className="text-primary/60">Object:</span>
              <span className="hover:text-primary cursor-pointer transition-colors">{objectId}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

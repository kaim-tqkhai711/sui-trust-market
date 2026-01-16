import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

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
}

const variantStyles = {
  default: {
    icon: "bg-background-hover text-foreground-muted",
    border: "border-border",
  },
  primary: {
    icon: "bg-primary/10 text-primary",
    border: "border-primary/20",
  },
  success: {
    icon: "bg-success/10 text-success",
    border: "border-success/20",
  },
  warning: {
    icon: "bg-warning/10 text-warning",
    border: "border-warning/20",
  },
};

export function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  variant = "default",
  className 
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
        <div className={cn("p-3 rounded-xl", styles.icon)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

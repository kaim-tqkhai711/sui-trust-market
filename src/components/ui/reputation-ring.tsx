import { cn } from "@/lib/utils";

interface ReputationRingProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const getTrustColor = (score: number) => {
  if (score >= 80) return { stroke: "stroke-success", text: "text-success", bg: "bg-success" };
  if (score >= 50) return { stroke: "stroke-warning", text: "text-warning", bg: "bg-warning" };
  return { stroke: "stroke-destructive", text: "text-destructive", bg: "bg-destructive" };
};

const getTrustLabel = (score: number) => {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Trusted";
  if (score >= 60) return "Verified";
  if (score >= 40) return "New";
  return "Risky";
};

const sizeConfig = {
  sm: { wrapper: "w-12 h-12", text: "text-sm", label: "text-[9px]", strokeWidth: 3 },
  md: { wrapper: "w-16 h-16", text: "text-lg", label: "text-[10px]", strokeWidth: 3.5 },
  lg: { wrapper: "w-20 h-20", text: "text-xl", label: "text-xs", strokeWidth: 4 },
};

export function ReputationRing({ score, size = "md", showLabel = true, className }: ReputationRingProps) {
  const config = sizeConfig[size];
  const colors = getTrustColor(score);
  const label = getTrustLabel(score);
  
  // SVG circle calculations
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={cn("relative flex items-center justify-center", config.wrapper, className)}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.strokeWidth}
          className="text-background-hover"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn("reputation-ring transition-all duration-500", colors.stroke)}
          style={{ strokeDashoffset }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-bold", config.text, colors.text)}>
          {score}
        </span>
        {showLabel && (
          <span className={cn("font-medium text-foreground-muted uppercase tracking-wider", config.label)}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

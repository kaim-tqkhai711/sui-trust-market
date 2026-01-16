import { cn } from "@/lib/utils";
import { ReputationRing } from "@/components/ui/reputation-ring";
import { 
  Database, 
  Brain, 
  TrendingUp, 
  ShieldCheck, 
  ShieldAlert,
  Clock,
  Users,
  Download
} from "lucide-react";

interface DataListing {
  id: string;
  title: string;
  description: string;
  category: "dataset" | "ai-model" | "signal";
  price: number;
  seller: {
    address: string;
    reputation: number;
    verified: boolean;
  };
  stats: {
    downloads: number;
    subscribers: number;
    lastUpdated: string;
  };
}

interface TrustCardProps {
  listing: DataListing;
  onBuy?: (id: string) => void;
  onVerify?: (id: string) => void;
}

const categoryConfig = {
  dataset: { icon: Database, label: "Dataset", color: "text-primary" },
  "ai-model": { icon: Brain, label: "AI Model", color: "text-purple-400" },
  signal: { icon: TrendingUp, label: "Signal", color: "text-emerald-400" },
};

const getTrustBorder = (reputation: number) => {
  if (reputation >= 80) return "trust-border-high";
  if (reputation >= 50) return "trust-border-medium";
  return "trust-border-low";
};

const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function TrustCard({ listing, onBuy, onVerify }: TrustCardProps) {
  const { icon: CategoryIcon, label: categoryLabel, color: categoryColor } = categoryConfig[listing.category];
  const isHighRisk = listing.seller.reputation < 50;
  const isVerified = listing.seller.verified;

  return (
    <div
      className={cn(
        "group relative rounded-xl bg-background-card p-5 transition-all duration-300",
        "hover:bg-background-hover hover:shadow-elevated hover:-translate-y-1",
        getTrustBorder(listing.seller.reputation),
        isHighRisk && "ring-1 ring-destructive/20"
      )}
    >
      {/* High Risk Badge */}
      {isHighRisk && (
        <div className="absolute -top-2 -right-2 flex items-center gap-1 rounded-full bg-destructive/20 px-2 py-0.5 text-xs font-medium text-destructive">
          <ShieldAlert className="h-3 w-3" />
          High Risk
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-2">
            <div className={cn("flex items-center gap-1.5 text-xs font-medium", categoryColor)}>
              <CategoryIcon className="h-3.5 w-3.5" />
              {categoryLabel}
            </div>
            {isVerified && (
              <div className="flex items-center gap-1 text-xs font-medium text-success">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {listing.title}
          </h3>
          <p className="mt-1 text-sm text-foreground-muted line-clamp-2">
            {listing.description}
          </p>
        </div>

        {/* Reputation Ring */}
        <ReputationRing score={listing.seller.reputation} size="md" />
      </div>

      {/* Seller Info */}
      <div className="mt-4 flex items-center gap-2 text-xs text-foreground-subtle">
        <span className="font-mono">{formatAddress(listing.seller.address)}</span>
      </div>

      {/* Stats Row */}
      <div className="mt-4 flex items-center gap-4 text-xs text-foreground-muted">
        <div className="flex items-center gap-1">
          <Download className="h-3.5 w-3.5" />
          {listing.stats.downloads.toLocaleString()}
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          {listing.stats.subscribers}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {listing.stats.lastUpdated}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-foreground">{listing.price}</span>
          <span className="text-sm font-medium text-primary">SUI</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onVerify?.(listing.id)}
            className="px-3 py-1.5 text-xs font-medium text-foreground-muted rounded-lg border border-border hover:bg-background-hover hover:text-foreground transition-colors"
          >
            Verify
          </button>
          <button
            onClick={() => onBuy?.(listing.id)}
            className={cn(
              "px-4 py-1.5 text-xs font-semibold rounded-lg transition-all",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "glow-primary hover:shadow-glow"
            )}
          >
            Buy Access
          </button>
        </div>
      </div>
    </div>
  );
}

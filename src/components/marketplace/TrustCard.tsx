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
  Download,
  Link2,
  ExternalLink,
  Fingerprint
} from "lucide-react";

interface DataListing {
  id: string;
  objectId: string; // Sui Object ID
  title: string;
  description: string;
  category: "dataset" | "ai-model" | "signal";
  price: number;
  seller: {
    address: string;
    reputation: number;
    reputationObjectId: string; // On-chain reputation object
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

const formatObjectId = (objectId: string) => {
  return `${objectId.slice(0, 8)}...${objectId.slice(-6)}`;
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
        <div className="absolute -top-2 -right-2 flex items-center gap-1 rounded-full bg-destructive/20 px-2 py-0.5 text-xs font-medium text-destructive border border-destructive/30">
          <ShieldAlert className="h-3 w-3" />
          High Risk (On-chain)
        </div>
      )}

      {/* On-chain Object ID Badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1 text-[9px] font-mono text-foreground-subtle/60 bg-background-hover/50 px-1.5 py-0.5 rounded">
        <Fingerprint className="h-2.5 w-2.5" />
        {formatObjectId(listing.objectId)}
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mt-4">
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
                On-chain Verified
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

        {/* Reputation Ring with Tooltip */}
        <div className="relative group/rep">
          <ReputationRing score={listing.seller.reputation} size="md" />
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover/rep:block z-10">
            <div className="bg-background-elevated border border-border rounded-lg p-2 shadow-elevated text-[10px] whitespace-nowrap">
              <div className="flex items-center gap-1 text-primary font-medium mb-1">
                <Link2 className="h-3 w-3" />
                Computed from on-chain ratings
              </div>
              <div className="font-mono text-foreground-subtle">
                {formatObjectId(listing.seller.reputationObjectId)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seller Info */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-foreground-subtle">
          <span className="text-foreground-muted">Seller:</span>
          <span className="font-mono hover:text-primary cursor-pointer transition-colors flex items-center gap-1">
            {formatAddress(listing.seller.address)}
            <ExternalLink className="h-2.5 w-2.5" />
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mt-3 flex items-center gap-4 text-xs text-foreground-muted">
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

      {/* On-chain Source Label */}
      <div className="mt-3 flex items-center gap-1.5 text-[10px] text-primary/70">
        <Link2 className="h-3 w-3" />
        <span className="uppercase tracking-wider font-medium">Data stored as Sui Object</span>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
        {/* Price */}
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-foreground">{listing.price}</span>
            <span className="text-sm font-medium text-primary">SUI</span>
          </div>
          <div className="text-[10px] text-foreground-subtle/70 mt-0.5">
            Payment via on-chain transfer
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onVerify?.(listing.id)}
            className="px-3 py-1.5 text-xs font-medium text-foreground-muted rounded-lg border border-border hover:bg-background-hover hover:text-foreground hover:border-primary/30 transition-colors"
          >
            Verify Data
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

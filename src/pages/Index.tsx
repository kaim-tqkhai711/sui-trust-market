import { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopBar } from "@/components/layout/TopBar";
import { StatCard } from "@/components/dashboard/StatCard";
import { TrustCard } from "@/components/marketplace/TrustCard";
import { TransactionToast, TransactionState } from "@/components/ui/transaction-toast";
import { cn } from "@/lib/utils";
import { 
  Wallet, 
  Shield, 
  Users,
  Filter,
  SlidersHorizontal,
  Grid3X3,
  List,
  Link2
} from "lucide-react";

// Mock data for marketplace listings with Object IDs
const mockListings = [
  {
    id: "1",
    objectId: "0x7b8f4e2a1c9d6e3f5a2b8c4d7e9f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f",
    title: "DeFi Trading Signals - Premium",
    description: "Real-time trading signals for top 50 DeFi pairs with 78% accuracy rate",
    category: "signal" as const,
    price: 45,
    seller: { 
      address: "0x7a4b3c2d1e0f9876543210abcdef123456789abc", 
      reputation: 95, 
      reputationObjectId: "0xrep1a2b3c4d5e6f7890abcdef1234567890abcdef12345678",
      verified: true 
    },
    stats: { downloads: 12453, subscribers: 847, lastUpdated: "2h ago" },
  },
  {
    id: "2",
    objectId: "0x3e2f1a0b9c8d7654321fedcba0987654321fedcba09876543210fedcba098765",
    title: "Sui Network Analytics Dataset",
    description: "Historical transaction data and on-chain metrics for the Sui ecosystem",
    category: "dataset" as const,
    price: 120,
    seller: { 
      address: "0x3e2f1a0b9c8d7654321fedcba0987654321fedcba", 
      reputation: 88, 
      reputationObjectId: "0xrep2b3c4d5e6f78901234567890abcdef12345678901234",
      verified: true 
    },
    stats: { downloads: 5621, subscribers: 234, lastUpdated: "1d ago" },
  },
  {
    id: "3",
    objectId: "0x9f8e7d6c5b4a3210fedcba987654321098765432109876543210fedcba987654",
    title: "NFT Price Prediction Model",
    description: "LSTM-based model trained on 2M+ NFT sales for price forecasting",
    category: "ai-model" as const,
    price: 250,
    seller: { 
      address: "0x9f8e7d6c5b4a3210fedcba987654321098765432", 
      reputation: 72, 
      reputationObjectId: "0xrep3c4d5e6f7890123456789012345678901234567890",
      verified: false 
    },
    stats: { downloads: 1890, subscribers: 156, lastUpdated: "3d ago" },
  },
  {
    id: "4",
    objectId: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
    title: "Whale Wallet Tracker",
    description: "Live tracking of 500+ whale wallets with movement alerts",
    category: "signal" as const,
    price: 35,
    seller: { 
      address: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12", 
      reputation: 91, 
      reputationObjectId: "0xrep4d5e6f7890123456789012345678901234567890ab",
      verified: true 
    },
    stats: { downloads: 8932, subscribers: 623, lastUpdated: "5h ago" },
  },
  {
    id: "5",
    objectId: "0x5f4e3d2c1b0a9876543210fedcba98765432abcd0987654321fedcba98765432",
    title: "Social Sentiment Dataset",
    description: "Aggregated sentiment scores from Twitter, Discord, and Telegram",
    category: "dataset" as const,
    price: 80,
    seller: { 
      address: "0x5f4e3d2c1b0a9876543210fedcba98765432abcd", 
      reputation: 42, 
      reputationObjectId: "0xrep5e6f7890123456789012345678901234567890abcd",
      verified: false 
    },
    stats: { downloads: 2341, subscribers: 89, lastUpdated: "12h ago" },
  },
  {
    id: "6",
    objectId: "0xabcdef123456789012345678901234567890abcdef1234567890abcdef123456",
    title: "Token Listing Predictor v2",
    description: "AI model predicting CEX listings with 65% accuracy, 7-day advance",
    category: "ai-model" as const,
    price: 180,
    seller: { 
      address: "0xabcdef123456789012345678901234567890abcd", 
      reputation: 83, 
      reputationObjectId: "0xrep6f7890123456789012345678901234567890abcdef",
      verified: true 
    },
    stats: { downloads: 4567, subscribers: 312, lastUpdated: "6h ago" },
  },
];

export default function Index() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeToasts, setActiveToasts] = useState<Array<{ 
    id: number; 
    state: TransactionState; 
    title: string;
    hash: string;
    objectId: string;
  }>>([]);
  const [toastId, setToastId] = useState(0);

  const handleBuy = (listingId: string) => {
    const listing = mockListings.find(l => l.id === listingId);
    if (!listing) return;

    const id = toastId;
    setToastId(prev => prev + 1);

    // Generate mock tx hash and object ID
    const txHash = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`;
    const newObjectId = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`;

    // Add pending toast
    setActiveToasts(prev => [...prev, { 
      id, 
      state: "pending", 
      title: `Purchasing "${listing.title}"`,
      hash: txHash,
      objectId: newObjectId
    }]);

    // Simulate transaction states
    setTimeout(() => {
      setActiveToasts(prev => prev.map(t => t.id === id ? { ...t, state: "verifying" } : t));
    }, 1500);

    setTimeout(() => {
      setActiveToasts(prev => prev.map(t => t.id === id ? { ...t, state: "confirmed" } : t));
    }, 3000);

    setTimeout(() => {
      setActiveToasts(prev => prev.filter(t => t.id !== id));
    }, 7000);
  };

  const handleVerify = (listingId: string) => {
    console.log("Verifying listing:", listingId);
  };

  const removeToast = (id: number) => {
    setActiveToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <AppSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Top Bar */}
      <TopBar sidebarCollapsed={sidebarCollapsed} />

      {/* Main Content */}
      <main
        className={cn(
          "pt-16 min-h-screen transition-all duration-300",
          sidebarCollapsed ? "pl-16" : "pl-64"
        )}
      >
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold text-foreground">On-chain Dashboard</h1>
            <p className="mt-1 text-sm text-foreground-muted flex items-center gap-2">
              <Link2 className="h-3.5 w-3.5 text-primary" />
              All data derived directly from Sui blockchain — trustless & verifiable
            </p>
          </div>

          {/* Network Status Banner */}
          <div className="animate-fade-in flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
            </span>
            <span className="text-xs font-medium text-foreground">Connected to Sui Mainnet</span>
            <span className="text-xs text-foreground-muted">•</span>
            <span className="text-xs text-foreground-subtle">Latest block: #48,293,847</span>
            <span className="text-xs text-foreground-muted">•</span>
            <span className="text-xs text-foreground-subtle">Epoch: 412</span>
          </div>

          {/* Stats Section */}
          <section className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Personal On-chain Stats</h2>
              <div className="flex-1 h-px bg-border"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="Total Revenue"
                value="2,847"
                subtitle="SUI"
                icon={Wallet}
                trend={{ value: 12.5, isPositive: true }}
                variant="primary"
                onChainLabel="Derived from on-chain Coin transfers"
                objectId="0x7a4b...9abc"
              />
              <StatCard
                title="Data Quality Score"
                value="87"
                subtitle="/100"
                icon={Shield}
                trend={{ value: 3.2, isPositive: true }}
                variant="success"
                onChainLabel="On-chain Reputation Object"
                objectId="0x3e2f...dcba"
              />
              <StatCard
                title="Active Subscriptions"
                value="24"
                subtitle="datasets"
                icon={Users}
                trend={{ value: 8, isPositive: true }}
                variant="default"
                onChainLabel="Live AccessRight objects"
                objectId="0x9f8e...5432"
              />
            </div>
          </section>

          {/* Marketplace Section */}
          <section className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-semibold text-foreground">Data Marketplace</h2>
                  <div className="px-2 py-0.5 text-[10px] font-medium text-primary bg-primary/10 rounded-full uppercase tracking-wider">
                    On-chain Objects
                  </div>
                </div>
                <p className="text-sm text-foreground-muted flex items-center gap-1.5">
                  <Link2 className="h-3 w-3 text-primary" />
                  {mockListings.length} Sui Objects available • Each listing is a verifiable on-chain asset
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Filters */}
                <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground-muted rounded-lg border border-border hover:bg-background-hover hover:text-foreground transition-colors">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground-muted rounded-lg border border-border hover:bg-background-hover hover:text-foreground transition-colors">
                  <SlidersHorizontal className="h-4 w-4" />
                  Sort
                </button>

                {/* View Toggle */}
                <div className="flex items-center rounded-lg border border-border p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-1.5 rounded-md transition-colors",
                      viewMode === "grid"
                        ? "bg-background-hover text-foreground"
                        : "text-foreground-muted hover:text-foreground"
                    )}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-1.5 rounded-md transition-colors",
                      viewMode === "list"
                        ? "bg-background-hover text-foreground"
                        : "text-foreground-muted hover:text-foreground"
                    )}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Listings Grid */}
            <div className={cn(
              "grid gap-4",
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                : "grid-cols-1"
            )}>
              {mockListings.map((listing, index) => (
                <div
                  key={listing.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${300 + index * 50}ms` }}
                >
                  <TrustCard
                    listing={listing}
                    onBuy={handleBuy}
                    onVerify={handleVerify}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* On-chain Disclaimer */}
          <div className="animate-fade-in text-center py-6 border-t border-border/50">
            <p className="text-xs text-foreground-subtle flex items-center justify-center gap-2">
              <Link2 className="h-3 w-3 text-primary" />
              All transactions are executed on Sui blockchain. No centralized backend. Your keys, your data.
            </p>
          </div>
        </div>
      </main>

      {/* Transaction Toast Container */}
      <div className="fixed bottom-4 right-4 space-y-3 z-50">
        {activeToasts.map(toast => (
          <TransactionToast
            key={toast.id}
            state={toast.state}
            title={toast.title}
            hash={toast.hash}
            objectId={toast.objectId}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

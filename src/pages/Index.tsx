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
  List
} from "lucide-react";

// Mock data for marketplace listings
const mockListings = [
  {
    id: "1",
    title: "DeFi Trading Signals - Premium",
    description: "Real-time trading signals for top 50 DeFi pairs with 78% accuracy rate",
    category: "signal" as const,
    price: 45,
    seller: { address: "0x7a4b3c2d1e0f9876543210abcdef123456789abc", reputation: 95, verified: true },
    stats: { downloads: 12453, subscribers: 847, lastUpdated: "2h ago" },
  },
  {
    id: "2",
    title: "Sui Network Analytics Dataset",
    description: "Historical transaction data and on-chain metrics for the Sui ecosystem",
    category: "dataset" as const,
    price: 120,
    seller: { address: "0x3e2f1a0b9c8d7654321fedcba0987654321fedcba", reputation: 88, verified: true },
    stats: { downloads: 5621, subscribers: 234, lastUpdated: "1d ago" },
  },
  {
    id: "3",
    title: "NFT Price Prediction Model",
    description: "LSTM-based model trained on 2M+ NFT sales for price forecasting",
    category: "ai-model" as const,
    price: 250,
    seller: { address: "0x9f8e7d6c5b4a3210fedcba987654321098765432", reputation: 72, verified: false },
    stats: { downloads: 1890, subscribers: 156, lastUpdated: "3d ago" },
  },
  {
    id: "4",
    title: "Whale Wallet Tracker",
    description: "Live tracking of 500+ whale wallets with movement alerts",
    category: "signal" as const,
    price: 35,
    seller: { address: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12", reputation: 91, verified: true },
    stats: { downloads: 8932, subscribers: 623, lastUpdated: "5h ago" },
  },
  {
    id: "5",
    title: "Social Sentiment Dataset",
    description: "Aggregated sentiment scores from Twitter, Discord, and Telegram",
    category: "dataset" as const,
    price: 80,
    seller: { address: "0x5f4e3d2c1b0a9876543210fedcba98765432abcd", reputation: 42, verified: false },
    stats: { downloads: 2341, subscribers: 89, lastUpdated: "12h ago" },
  },
  {
    id: "6",
    title: "Token Listing Predictor v2",
    description: "AI model predicting CEX listings with 65% accuracy, 7-day advance",
    category: "ai-model" as const,
    price: 180,
    seller: { address: "0xabcdef123456789012345678901234567890abcd", reputation: 83, verified: true },
    stats: { downloads: 4567, subscribers: 312, lastUpdated: "6h ago" },
  },
];

export default function Index() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeToasts, setActiveToasts] = useState<Array<{ id: number; state: TransactionState; title: string }>>([]);
  const [toastId, setToastId] = useState(0);

  const handleBuy = (listingId: string) => {
    const listing = mockListings.find(l => l.id === listingId);
    if (!listing) return;

    const id = toastId;
    setToastId(prev => prev + 1);

    // Add pending toast
    setActiveToasts(prev => [...prev, { id, state: "pending", title: `Purchasing "${listing.title}"` }]);

    // Simulate transaction states
    setTimeout(() => {
      setActiveToasts(prev => prev.map(t => t.id === id ? { ...t, state: "verifying" } : t));
    }, 1500);

    setTimeout(() => {
      setActiveToasts(prev => prev.map(t => t.id === id ? { ...t, state: "confirmed" } : t));
    }, 3000);

    setTimeout(() => {
      setActiveToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
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
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="mt-1 text-sm text-foreground-muted">
              Explore trusted data assets and manage your marketplace activity
            </p>
          </div>

          {/* Stats Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <StatCard
              title="Total Revenue"
              value="2,847"
              subtitle="SUI"
              icon={Wallet}
              trend={{ value: 12.5, isPositive: true }}
              variant="primary"
            />
            <StatCard
              title="Data Quality Score"
              value="87"
              subtitle="/100"
              icon={Shield}
              trend={{ value: 3.2, isPositive: true }}
              variant="success"
            />
            <StatCard
              title="Active Subscriptions"
              value="24"
              subtitle="datasets"
              icon={Users}
              trend={{ value: 8, isPositive: true }}
              variant="default"
            />
          </section>

          {/* Marketplace Section */}
          <section className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Data Marketplace</h2>
                <p className="text-sm text-foreground-muted">
                  {mockListings.length} verified listings available
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
        </div>
      </main>

      {/* Transaction Toast Container */}
      <div className="fixed bottom-4 right-4 space-y-3 z-50">
        {activeToasts.map(toast => (
          <TransactionToast
            key={toast.id}
            state={toast.state}
            title={toast.title}
            hash="0x1a2b3c4d...8e9f"
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

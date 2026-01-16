import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Search, 
  Wifi, 
  WifiOff,
  Bell,
  ChevronDown,
  Copy,
  ExternalLink
} from "lucide-react";
import { ReputationRing } from "@/components/ui/reputation-ring";

interface TopBarProps {
  sidebarCollapsed: boolean;
}

export function TopBar({ sidebarCollapsed }: TopBarProps) {
  const [isConnected] = useState(true);
  const [walletAddress] = useState("0x8f3a9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a");
  const [searchFocused, setSearchFocused] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 border-b border-border bg-background-elevated/80 backdrop-blur-xl transition-all duration-300",
        sidebarCollapsed ? "left-16" : "left-64"
      )}
    >
      <div className="flex h-full items-center justify-between px-6">
        {/* Search */}
        <div className="relative flex-1 max-w-xl">
          <div
            className={cn(
              "relative flex items-center rounded-xl border bg-background-card transition-all duration-200",
              searchFocused ? "border-primary ring-2 ring-primary/20" : "border-border"
            )}
          >
            <Search className="absolute left-3 h-4 w-4 text-foreground-subtle" />
            <input
              type="text"
              placeholder="Search datasets, models, signals..."
              className="w-full bg-transparent py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground-subtle focus:outline-none"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <div className="absolute right-3 hidden items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-foreground-subtle sm:flex">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-4">
          {/* Network Status */}
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background-card px-3 py-1.5">
            {isConnected ? (
              <>
                <Wifi className="h-3.5 w-3.5 text-success" />
                <span className="text-xs font-medium text-foreground">Sui Mainnet</span>
              </>
            ) : (
              <>
                <WifiOff className="h-3.5 w-3.5 text-destructive" />
                <span className="text-xs font-medium text-foreground-muted">Disconnected</span>
              </>
            )}
          </div>

          {/* Notifications */}
          <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background-card text-foreground-muted hover:bg-background-hover hover:text-foreground transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              3
            </span>
          </button>

          {/* Wallet */}
          <div className="flex items-center gap-3 rounded-xl border border-border bg-background-card px-3 py-1.5 hover:bg-background-hover transition-colors cursor-pointer group">
            <ReputationRing score={87} size="sm" showLabel={false} />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-foreground font-mono">
                  {formatAddress(walletAddress)}
                </span>
                <Copy className="h-3 w-3 text-foreground-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xs text-foreground-muted">Diamond Tier</span>
            </div>
            <ChevronDown className="h-4 w-4 text-foreground-subtle" />
          </div>
        </div>
      </div>
    </header>
  );
}

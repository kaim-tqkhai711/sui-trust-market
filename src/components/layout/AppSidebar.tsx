import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  LayoutGrid, 
  Database, 
  Upload, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  LogOut
} from "lucide-react";
import { ReputationRing } from "@/components/ui/reputation-ring";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { icon: LayoutGrid, label: "Marketplace", href: "/" },
  { icon: Database, label: "My Assets", href: "/assets", badge: 12 },
  { icon: Upload, label: "Provide Data", href: "/provide" },
  { icon: AlertTriangle, label: "Disputes", href: "/disputes", badge: 2 },
];

const bottomNavItems: NavItem[] = [
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help", href: "/help" },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const [activeItem, setActiveItem] = useState("/");

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Database className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">SuiTrust</span>
            </div>
          )}
          {collapsed && (
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Database className="h-4 w-4 text-primary-foreground" />
            </div>
          )}
          <button
            onClick={onToggle}
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
              collapsed && "absolute -right-3 top-5 h-6 w-6 rounded-full border border-sidebar-border bg-sidebar"
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-3.5 w-3.5" />
            ) : (
              <ChevronLeft className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          {mainNavItems.map((item) => (
            <button
              key={item.href}
              onClick={() => setActiveItem(item.href)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                activeItem === item.href
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/20 px-1.5 text-xs font-semibold text-primary">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-sidebar-border p-3 space-y-1">
          {bottomNavItems.map((item) => (
            <button
              key={item.href}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>

        {/* User Profile */}
        <div className="border-t border-sidebar-border p-3">
          <div
            className={cn(
              "flex items-center gap-3 rounded-lg p-2 hover:bg-sidebar-accent transition-colors cursor-pointer",
              collapsed && "justify-center"
            )}
          >
            <ReputationRing score={87} size="sm" showLabel={false} />
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">0x8f3a...d4e2</p>
                <p className="text-xs text-sidebar-foreground">Diamond Tier</p>
              </div>
            )}
            {!collapsed && (
              <LogOut className="h-4 w-4 text-sidebar-foreground hover:text-destructive transition-colors" />
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

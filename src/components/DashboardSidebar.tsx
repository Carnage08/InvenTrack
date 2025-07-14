import { BarChart3, Package, TrendingUp, AlertTriangle, Truck, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigationItems = [
  { icon: BarChart3, label: 'Dashboard', id: 'dashboard', active: true },
  { icon: Package, label: 'Inventory Status', id: 'inventory' },
  { icon: TrendingUp, label: 'Demand Forecast', id: 'forecast' },
  { icon: AlertTriangle, label: 'Alert Simulation', id: 'alerts' },
  { icon: Truck, label: 'Delivery ETA', id: 'delivery' },
  { icon: Settings, label: 'Settings', id: 'settings' }
];

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const DashboardSidebar = ({ activeTab, onTabChange }: DashboardSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "bg-card border-r shadow-card transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="mb-4"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>

        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200",
                activeTab === item.id
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};
import { Package, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { UserRole } from '@/types/inventory';

interface DashboardHeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  simulationMode: boolean;
  onSimulationToggle: (enabled: boolean) => void;
}

export const DashboardHeader = ({ 
  currentRole, 
  onRoleChange, 
  simulationMode, 
  onSimulationToggle 
}: DashboardHeaderProps) => {
  const getPageTitle = () => {
    return currentRole === 'manager' ? 'Manager Dashboard' : 'Floor Staff Tasks';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-card backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-card">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SmartStock
              </h1>
              <p className="text-xs text-muted-foreground">Inventory Intelligence</p>
            </div>
          </div>
        </div>

        <div className="flex-1 text-center">
          <h2 className="text-lg font-semibold text-foreground">
            {getPageTitle()}
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="simulation-mode" className="text-sm font-medium">
              Simulation Mode
            </label>
            <Switch
              id="simulation-mode"
              checked={simulationMode}
              onCheckedChange={onSimulationToggle}
            />
          </div>

          <Select value={currentRole} onValueChange={onRoleChange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manager">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>🧑‍💼 Store Manager</span>
                </div>
              </SelectItem>
              <SelectItem value="staff">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4" />
                  <span>📦 Floor Staff</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
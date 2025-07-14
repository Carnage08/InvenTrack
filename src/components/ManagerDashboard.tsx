import { useState } from 'react';
import { StockStatusCard } from './StockStatusCard';
import { DemandForecastTable } from './DemandForecastTable';
import { RestockSuggestionsPanel } from './RestockSuggestionsPanel';
import { AlertSimulation } from './AlertSimulation';
import { DeliveryETAPanel } from './DeliveryETAPanel';
import { InventoryItem } from '@/types/inventory';
import { useToast } from '@/hooks/use-toast';

interface ManagerDashboardProps {
  inventoryData: InventoryItem[];
  activeTab: string;
  simulationMode: boolean;
  onSimulationToggle: (active: boolean) => void;
}

export const ManagerDashboard = ({ 
  inventoryData, 
  activeTab, 
  simulationMode, 
  onSimulationToggle 
}: ManagerDashboardProps) => {
  const { toast } = useToast();

  const handleRestock = (itemId: string, amount?: number) => {
    const item = inventoryData.find(i => i.id === itemId);
    if (item) {
      toast({
        title: "🎉 Restock Initiated",
        description: `Restocking ${amount || 'recommended amount of'} ${item.name} units`,
        variant: "default"
      });
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inventoryData
                .filter(item => item.urgencyLevel === 'urgent' || item.currentStock <= item.reorderThreshold)
                .slice(0, 6)
                .map((item) => (
                  <StockStatusCard
                    key={item.id}
                    item={item}
                    onRestock={handleRestock}
                  />
                ))}
            </div>
          </div>
        );
        
      case 'inventory':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inventoryData.map((item) => (
                <StockStatusCard
                  key={item.id}
                  item={item}
                  onRestock={handleRestock}
                />
              ))}
            </div>
          </div>
        );
        
      case 'forecast':
        return <DemandForecastTable items={inventoryData} />;
        
      case 'alerts':
        return (
          <div className="space-y-6">
            <AlertSimulation 
              isActive={simulationMode} 
              onToggle={onSimulationToggle}
            />
            <RestockSuggestionsPanel 
              items={inventoryData} 
              onRestock={handleRestock}
            />
          </div>
        );
        
      case 'delivery':
        return <DeliveryETAPanel items={inventoryData} />;
        
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-card p-8 rounded-lg shadow-card text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">⚙️ Settings</h3>
              <p className="text-muted-foreground">
                Configuration options and system preferences will be available here.
              </p>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inventoryData
                .filter(item => item.urgencyLevel === 'urgent' || item.currentStock <= item.reorderThreshold)
                .slice(0, 6)
                .map((item) => (
                  <StockStatusCard
                    key={item.id}
                    item={item}
                    onRestock={handleRestock}
                  />
                ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      {renderActiveTab()}
    </div>
  );
};
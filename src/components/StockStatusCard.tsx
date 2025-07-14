import { TrendingUp, TrendingDown, Minus, Megaphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UrgencyBadge } from './UrgencyBadge';
import { InventoryItem } from '@/types/inventory';

interface StockStatusCardProps {
  item: InventoryItem;
  onRestock: (itemId: string) => void;
}

export const StockStatusCard = ({ item, onRestock }: StockStatusCardProps) => {
  const getTrendIcon = () => {
    switch (item.salesTrend) {
      case 'rising':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'falling':
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStockStatus = () => {
    if (item.currentStock <= item.reorderThreshold * 0.5) return 'Critical';
    if (item.currentStock <= item.reorderThreshold) return 'Low Stock';
    return 'Moderate';
  };

  return (
    <Card className="hover:shadow-elevated transition-all duration-300 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
          <UrgencyBadge urgency={item.urgencyLevel} />
        </div>
        <p className="text-sm text-muted-foreground">{item.department}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Stock Left</p>
            <p className="text-2xl font-bold text-foreground">{item.currentStock}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <p className="text-lg font-semibold text-foreground">{getStockStatus()}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {getTrendIcon()}
            <span className="text-sm text-muted-foreground">
              {item.salesTrend.charAt(0).toUpperCase() + item.salesTrend.slice(1)} trend
            </span>
          </div>
          {item.promoEvent && (
            <Badge variant="secondary" className="text-xs">
              <Megaphone className="h-3 w-3 mr-1" />
              Promo Active
            </Badge>
          )}
        </div>

        {item.predictedOutIn && (
          <div className="mb-4 p-3 bg-accent/50 rounded-lg">
            <p className="text-sm font-medium text-foreground">
              Predicted out in: <span className="text-urgent font-bold">{item.predictedOutIn} mins</span>
            </p>
            {item.footfallPerHour && (
              <p className="text-xs text-muted-foreground mt-1">
                Footfall: {item.footfallPerHour}/hr
              </p>
            )}
          </div>
        )}

        <Button 
          onClick={() => onRestock(item.id)}
          className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          size="sm"
        >
          ➕ Restock Now
        </Button>
      </CardContent>
    </Card>
  );
};
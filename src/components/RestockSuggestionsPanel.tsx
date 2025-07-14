import { Package, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InventoryItem } from '@/types/inventory';

interface RestockSuggestionsPanelProps {
  items: InventoryItem[];
  onRestock: (itemId: string, amount: number) => void;
}

export const RestockSuggestionsPanel = ({ items, onRestock }: RestockSuggestionsPanelProps) => {
  const suggestionItems = items.filter(item => item.suggestedRestock);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="h-5 w-5 text-primary" />
          <span>🤖 Restocking Suggestions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestionItems.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 bg-gradient-card"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.department}</p>
                </div>
                <Badge 
                  variant={item.currentStock <= item.reorderThreshold * 0.5 ? 'destructive' : 'secondary'}
                  className="font-medium"
                >
                  Stock: {item.currentStock}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Current Stock:</span>
                  <span className="ml-2 font-mono font-bold">{item.currentStock}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Reorder Threshold:</span>
                  <span className="ml-2 font-mono font-bold">{item.reorderThreshold}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4 text-primary" />
                  <span className="font-medium text-primary">
                    Suggested: Restock {item.suggestedRestock} units
                  </span>
                </div>
                <Button
                  onClick={() => onRestock(item.id, item.suggestedRestock!)}
                  size="sm"
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  Restock
                </Button>
              </div>
            </div>
          ))}

          {suggestionItems.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No restocking suggestions at the moment</p>
              <p className="text-sm">All items are adequately stocked</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
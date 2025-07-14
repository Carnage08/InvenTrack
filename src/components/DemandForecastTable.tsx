import { TrendingUp, TrendingDown, Minus, Megaphone, Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InventoryItem } from '@/types/inventory';

interface DemandForecastTableProps {
  items: InventoryItem[];
}

export const DemandForecastTable = ({ items }: DemandForecastTableProps) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'falling':
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPredictedOutColor = (minutes?: number) => {
    if (!minutes) return 'text-muted-foreground';
    if (minutes < 30) return 'text-urgent font-bold';
    if (minutes < 60) return 'text-warning font-semibold';
    return 'text-foreground';
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span>Demand Forecast (Next Hour/Day)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Footfall/hr</TableHead>
                <TableHead>Sales Trend</TableHead>
                <TableHead>Promo Event</TableHead>
                <TableHead>Predicted Out In</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items
                .filter(item => item.footfallPerHour && item.predictedOutIn)
                .sort((a, b) => (a.predictedOutIn || 999) - (b.predictedOutIn || 999))
                .map((item) => (
                  <TableRow key={item.id} className="hover:bg-accent/50">
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.department}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-lg">{item.footfallPerHour}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(item.salesTrend)}
                        <span className="capitalize">{item.salesTrend}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.promoEvent ? (
                        <Badge variant="secondary" className="text-xs">
                          <Megaphone className="h-3 w-3 mr-1" />
                          Yes
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className={getPredictedOutColor(item.predictedOutIn)}>
                          {item.predictedOutIn} mins
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
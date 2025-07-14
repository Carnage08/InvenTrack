import { Truck, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { InventoryItem } from '@/types/inventory';

interface DeliveryETAPanelProps {
  items: InventoryItem[];
}

export const DeliveryETAPanel = ({ items }: DeliveryETAPanelProps) => {
  const deliveryItems = items.filter(item => item.eta !== undefined && item.deliveryStatus);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'arrived':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'en-route':
        return <Truck className="h-4 w-4 text-primary" />;
      case 'delayed':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'arrived':
        return <Badge className="bg-gradient-success text-success-foreground">✅ Arrived</Badge>;
      case 'en-route':
        return <Badge variant="secondary">⏳ En Route</Badge>;
      case 'delayed':
        return <Badge variant="destructive">⚠️ Delayed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getETADisplay = (eta: number, status: string) => {
    if (status === 'arrived') return 'Arrived';
    if (eta === 0) return 'Due now';
    return `${eta} mins`;
  };

  const getETAColor = (eta: number, status: string) => {
    if (status === 'arrived') return 'text-success font-semibold';
    if (eta <= 15) return 'text-urgent font-bold';
    if (eta <= 30) return 'text-warning font-semibold';
    return 'text-foreground';
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Truck className="h-5 w-5 text-primary" />
          <span>🚚 Last-Mile Delivery ETA</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Source Warehouse</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveryItems
                .sort((a, b) => {
                  // Sort by status (arrived last) then by ETA
                  if (a.deliveryStatus === 'arrived' && b.deliveryStatus !== 'arrived') return 1;
                  if (b.deliveryStatus === 'arrived' && a.deliveryStatus !== 'arrived') return -1;
                  return (a.eta || 0) - (b.eta || 0);
                })
                .map((item) => (
                  <TableRow key={item.id} className="hover:bg-accent/50">
                    <TableCell>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.department}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="font-medium">{item.warehouseSource}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className={getETAColor(item.eta!, item.deliveryStatus!)}>
                          {getETADisplay(item.eta!, item.deliveryStatus!)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(item.deliveryStatus!)}
                        {getStatusBadge(item.deliveryStatus!)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {deliveryItems.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Truck className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No active deliveries</p>
            <p className="text-sm">All deliveries have been completed</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
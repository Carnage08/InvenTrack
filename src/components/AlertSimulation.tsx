import { useState, useEffect } from 'react';
import { Play, Pause, AlertTriangle, Megaphone, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertEvent } from '@/types/inventory';
import { mockInventoryData } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface AlertSimulationProps {
  isActive: boolean;
  onToggle: (active: boolean) => void;
}

export const AlertSimulation = ({ isActive, onToggle }: AlertSimulationProps) => {
  const [alerts, setAlerts] = useState<AlertEvent[]>([]);
  const [alertCount, setAlertCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const randomItem = mockInventoryData[Math.floor(Math.random() * mockInventoryData.length)];
      const alertTypes = ['low-stock', 'restock-needed', 'delivery-arrived'] as const;
      const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      
      const messages = {
        'low-stock': `${randomItem.name} went below threshold!`,
        'restock-needed': `Urgent restock needed for ${randomItem.name}`,
        'delivery-arrived': `Delivery arrived: ${randomItem.name} from ${randomItem.warehouseSource}`
      };

      const newAlert: AlertEvent = {
        id: Date.now().toString(),
        timestamp: new Date(),
        itemName: randomItem.name,
        message: messages[randomType],
        type: randomType
      };

      setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep only 10 most recent
      setAlertCount(prev => prev + 1);

      // Show toast notification
      toast({
        title: getAlertIcon(randomType) + " " + getAlertTitle(randomType),
        description: newAlert.message,
        variant: randomType === 'delivery-arrived' ? 'default' : 'destructive'
      });
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [isActive, toast]);

  const getAlertIcon = (type: AlertEvent['type']) => {
    switch (type) {
      case 'low-stock':
        return '📢';
      case 'restock-needed':
        return '⚠️';
      case 'delivery-arrived':
        return '✅';
    }
  };

  const getAlertTitle = (type: AlertEvent['type']) => {
    switch (type) {
      case 'low-stock':
        return 'Low Stock Alert';
      case 'restock-needed':
        return 'Restock Needed';
      case 'delivery-arrived':
        return 'Delivery Arrived';
    }
  };

  const getAlertColor = (type: AlertEvent['type']) => {
    switch (type) {
      case 'low-stock':
        return 'bg-gradient-urgent text-urgent-foreground';
      case 'restock-needed':
        return 'bg-gradient-warning text-warning-foreground';
      case 'delivery-arrived':
        return 'bg-gradient-success text-success-foreground';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: false });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <span>🕹 Alert Simulation Engine</span>
            </div>
            <Badge variant="secondary" className="font-mono">
              Score: {alertCount}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <Button
                onClick={() => onToggle(!isActive)}
                variant={isActive ? "destructive" : "default"}
                size="lg"
                className="w-32"
              >
                {isActive ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Resume
                  </>
                )}
              </Button>
            </div>

            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <Megaphone className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">
                {isActive 
                  ? "Simulation active - New alerts every 10 seconds" 
                  : "Simulation paused - Click resume to continue"
                }
              </p>
              {isActive && (
                <p className="text-xs text-muted-foreground mt-1">
                  🏆 Handle 5+ alerts to unlock confetti!
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Megaphone className="h-5 w-5 text-primary" />
            <span>Live Alert Feed</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3 rounded-lg border-l-4 border-l-primary bg-gradient-card hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getAlertColor(alert.type)}>
                        {getAlertIcon(alert.type)} {getAlertTitle(alert.type)}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(alert.timestamp)}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">Item: {alert.itemName}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No alerts yet</p>
                  <p className="text-sm">Start simulation to see live alerts</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
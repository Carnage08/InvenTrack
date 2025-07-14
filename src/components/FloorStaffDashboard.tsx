import { CheckCircle, Clock, Play, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UrgencyBadge } from './UrgencyBadge';
import { RestockTask } from '@/types/inventory';
import { cn } from '@/lib/utils';

interface FloorStaffDashboardProps {
  tasks: RestockTask[];
  onTaskUpdate: (taskId: string, status: RestockTask['status']) => void;
}

export const FloorStaffDashboard = ({ tasks, onTaskUpdate }: FloorStaffDashboardProps) => {
  const getStatusIcon = (status: RestockTask['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-warning" />;
      default:
        return <Play className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusButton = (task: RestockTask) => {
    switch (task.status) {
      case 'completed':
        return (
          <Button disabled variant="outline" className="bg-gradient-success text-success-foreground">
            ✅ Done
          </Button>
        );
      case 'in-progress':
        return (
          <Button 
            onClick={() => onTaskUpdate(task.id, 'completed')}
            className="bg-gradient-success hover:shadow-glow transition-all duration-300"
          >
            ✅ Complete
          </Button>
        );
      default:
        return (
          <Button 
            onClick={() => onTaskUpdate(task.id, 'in-progress')}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            ⏳ Start
          </Button>
        );
    }
  };

  const getTaskCardStyle = (status: RestockTask['status']) => {
    switch (status) {
      case 'completed':
        return 'border-success/50 bg-success/5';
      case 'in-progress':
        return 'border-warning/50 bg-warning/5';
      default:
        return 'border-primary/50 bg-primary/5';
    }
  };

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Task Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-urgent/10 rounded-full">
                <Package className="h-6 w-6 text-urgent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingTasks.length}</p>
                <p className="text-sm text-muted-foreground">Pending Tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-warning/10 rounded-full">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{inProgressTasks.length}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-success/10 rounded-full">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{completedTasks.length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-primary" />
            <span>📦 Floor Staff Tasks</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.length > 0 ? (
              tasks
                .sort((a, b) => {
                  // Sort by status (pending first, then in-progress, then completed) and urgency
                  const statusOrder = { 'pending': 0, 'in-progress': 1, 'completed': 2 };
                  const urgencyOrder = { 'urgent': 0, 'medium': 1, 'low': 2 };
                  
                  if (statusOrder[a.status] !== statusOrder[b.status]) {
                    return statusOrder[a.status] - statusOrder[b.status];
                  }
                  
                  return urgencyOrder[a.urgencyLevel] - urgencyOrder[b.urgencyLevel];
                })
                .map((task) => (
                  <div
                    key={task.id}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md",
                      getTaskCardStyle(task.status)
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(task.status)}
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <UrgencyBadge urgency={task.urgencyLevel} />
                            <span className="text-lg font-semibold text-foreground">
                              {task.aisle} – {task.itemName}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            → Refill {task.unitsNeeded} units
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusButton(task)}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No tasks available</p>
                <p className="text-sm">All restocking tasks are completed</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
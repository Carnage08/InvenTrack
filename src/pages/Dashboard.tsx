import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { ManagerDashboard } from '@/components/ManagerDashboard';
import { FloorStaffDashboard } from '@/components/FloorStaffDashboard';
import { UserRole } from '@/types/inventory';
import { mockInventoryData, mockRestockTasks } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('manager');
  const [simulationMode, setSimulationMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [restockTasks, setRestockTasks] = useState(mockRestockTasks);
  const { toast } = useToast();

  // Welcome message on load
  useEffect(() => {
    toast({
      title: "🎉 Welcome to SmartStock",
      description: "Your intelligent inventory management dashboard is ready!",
      variant: "default"
    });
  }, [toast]);

  // Confetti celebration for handling multiple alerts
  useEffect(() => {
    if (simulationMode) {
      const interval = setInterval(() => {
        // Random chance to show celebration
        if (Math.random() < 0.1) { // 10% chance every check
          toast({
            title: "🎊 Amazing Work!",
            description: "You're handling alerts like a pro! Keep it up!",
            variant: "default"
          });
        }
      }, 30000); // Check every 30 seconds

      return () => clearInterval(interval);
    }
  }, [simulationMode, toast]);

  const handleRoleChange = (role: string) => {
    setCurrentRole(role as UserRole);
    setActiveTab('dashboard'); // Reset to dashboard when switching roles
    
    toast({
      title: role === 'manager' ? '🧑‍💼 Manager Mode' : '📦 Floor Staff Mode',
      description: `Switched to ${role === 'manager' ? 'Store Manager' : 'Floor Staff'} dashboard`,
      variant: "default"
    });
  };

  const handleSimulationToggle = (enabled: boolean) => {
    setSimulationMode(enabled);
    
    toast({
      title: enabled ? '🕹 Simulation Started' : '⏸ Simulation Paused',
      description: enabled 
        ? 'Alert simulation is now active - new alerts every 10 seconds'
        : 'Alert simulation has been paused',
      variant: enabled ? "default" : "destructive"
    });
  };

  const handleTaskUpdate = (taskId: string, status: 'pending' | 'in-progress' | 'completed') => {
    setRestockTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, status }
          : task
      )
    );
    
    const task = restockTasks.find(t => t.id === taskId);
    if (task) {
      const statusMessages = {
        'in-progress': `Started restocking ${task.itemName}`,
        'completed': `✅ Completed restocking ${task.itemName}!`,
        'pending': `Reset ${task.itemName} to pending`
      };
      
      toast({
        title: status === 'completed' ? '🎉 Task Completed!' : '📋 Task Updated',
        description: statusMessages[status],
        variant: status === 'completed' ? 'default' : 'default'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        simulationMode={simulationMode}
        onSimulationToggle={handleSimulationToggle}
      />
      
      <div className="flex w-full">
        {currentRole === 'manager' && (
          <DashboardSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        )}
        
        <main className="flex-1 overflow-auto">
          {currentRole === 'manager' ? (
            <ManagerDashboard
              inventoryData={mockInventoryData}
              activeTab={activeTab}
              simulationMode={simulationMode}
              onSimulationToggle={handleSimulationToggle}
            />
          ) : (
            <div className="p-6">
              <FloorStaffDashboard
                tasks={restockTasks}
                onTaskUpdate={handleTaskUpdate}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
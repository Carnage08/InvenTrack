export type UserRole = 'manager' | 'staff';

export interface InventoryItem {
  id: string;
  name: string;
  department: string;
  currentStock: number;
  reorderThreshold: number;
  urgencyLevel: 'urgent' | 'medium' | 'low';
  footfallPerHour?: number;
  salesTrend: 'rising' | 'falling' | 'stable';
  promoEvent: boolean;
  predictedOutIn?: number; // minutes
  suggestedRestock?: number;
  eta?: number; // minutes
  warehouseSource?: string;
  deliveryStatus?: 'en-route' | 'arrived' | 'delayed';
}

export interface RestockTask {
  id: string;
  itemName: string;
  aisle: string;
  unitsNeeded: number;
  status: 'pending' | 'in-progress' | 'completed';
  urgencyLevel: 'urgent' | 'medium' | 'low';
}

export interface AlertEvent {
  id: string;
  timestamp: Date;
  itemName: string;
  message: string;
  type: 'low-stock' | 'restock-needed' | 'delivery-arrived';
}
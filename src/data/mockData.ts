import { InventoryItem, RestockTask, AlertEvent } from '@/types/inventory';

export const mockInventoryData: InventoryItem[] = [
  {
    id: '1',
    name: 'Rice 5kg',
    department: 'Groceries',
    currentStock: 10,
    reorderThreshold: 15,
    urgencyLevel: 'urgent',
    footfallPerHour: 85,
    salesTrend: 'rising',
    promoEvent: false,
    predictedOutIn: 35,
    suggestedRestock: 50,
    eta: 23,
    warehouseSource: 'Warehouse A',
    deliveryStatus: 'en-route'
  },
  {
    id: '2',
    name: 'Action Doll',
    department: 'Toys',
    currentStock: 25,
    reorderThreshold: 20,
    urgencyLevel: 'medium',
    footfallPerHour: 45,
    salesTrend: 'stable',
    promoEvent: true,
    predictedOutIn: 120,
    suggestedRestock: 30,
    eta: 55,
    warehouseSource: 'Warehouse C',
    deliveryStatus: 'arrived'
  },
  {
    id: '3',
    name: 'Milk 1L',
    department: 'Dairy',
    currentStock: 8,
    reorderThreshold: 12,
    urgencyLevel: 'urgent',
    footfallPerHour: 130,
    salesTrend: 'rising',
    promoEvent: true,
    predictedOutIn: 35,
    suggestedRestock: 40,
    eta: 15,
    warehouseSource: 'Warehouse B',
    deliveryStatus: 'en-route'
  },
  {
    id: '4',
    name: 'Bread',
    department: 'Bakery',
    currentStock: 18,
    reorderThreshold: 20,
    urgencyLevel: 'medium',
    footfallPerHour: 95,
    salesTrend: 'falling',
    promoEvent: false,
    predictedOutIn: 70,
    suggestedRestock: 25,
    eta: 40,
    warehouseSource: 'Warehouse A',
    deliveryStatus: 'en-route'
  },
  {
    id: '5',
    name: 'Shampoo 200ml',
    department: 'Personal Care',
    currentStock: 35,
    reorderThreshold: 25,
    urgencyLevel: 'low',
    footfallPerHour: 60,
    salesTrend: 'stable',
    promoEvent: false,
    predictedOutIn: 180,
    suggestedRestock: 20,
    eta: 0,
    warehouseSource: 'Warehouse C',
    deliveryStatus: 'arrived'
  },
  {
    id: '6',
    name: 'Sugar 1kg',
    department: 'Groceries',
    currentStock: 5,
    reorderThreshold: 10,
    urgencyLevel: 'urgent',
    footfallPerHour: 70,
    salesTrend: 'rising',
    promoEvent: false,
    predictedOutIn: 25,
    suggestedRestock: 35,
    eta: 23,
    warehouseSource: 'Warehouse A',
    deliveryStatus: 'en-route'
  },
  {
    id: '7',
    name: 'Noodles Pack',
    department: 'Groceries',
    currentStock: 12,
    reorderThreshold: 15,
    urgencyLevel: 'medium',
    footfallPerHour: 85,
    salesTrend: 'stable',
    promoEvent: false,
    predictedOutIn: 90,
    suggestedRestock: 25,
    eta: 65,
    warehouseSource: 'Warehouse B',
    deliveryStatus: 'en-route'
  },
  {
    id: '8',
    name: 'Cooking Oil 1L',
    department: 'Groceries',
    currentStock: 3,
    reorderThreshold: 8,
    urgencyLevel: 'urgent',
    footfallPerHour: 40,
    salesTrend: 'rising',
    promoEvent: true,
    predictedOutIn: 20,
    suggestedRestock: 30,
    eta: 35,
    warehouseSource: 'Warehouse A',
    deliveryStatus: 'en-route'
  }
];

export const mockRestockTasks: RestockTask[] = [
  {
    id: '1',
    itemName: 'Milk 1L',
    aisle: 'Aisle 2',
    unitsNeeded: 25,
    status: 'completed',
    urgencyLevel: 'urgent'
  },
  {
    id: '2',
    itemName: 'Noodles Pack',
    aisle: 'Aisle 5',
    unitsNeeded: 10,
    status: 'in-progress',
    urgencyLevel: 'medium'
  },
  {
    id: '3',
    itemName: 'Cooking Oil 1L',
    aisle: 'Aisle 7',
    unitsNeeded: 30,
    status: 'pending',
    urgencyLevel: 'urgent'
  },
  {
    id: '4',
    itemName: 'Rice 5kg',
    aisle: 'Aisle 3',
    unitsNeeded: 20,
    status: 'pending',
    urgencyLevel: 'urgent'
  },
  {
    id: '5',
    itemName: 'Bread',
    aisle: 'Aisle 1',
    unitsNeeded: 15,
    status: 'pending',
    urgencyLevel: 'medium'
  }
];

export const mockAlerts: AlertEvent[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 5000),
    itemName: 'Milk 1L',
    message: 'Stock went below threshold',
    type: 'low-stock'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 15000),
    itemName: 'Sugar 1kg',
    message: 'Urgent restock needed',
    type: 'restock-needed'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 30000),
    itemName: 'Shampoo 200ml',
    message: 'Delivery arrived from Warehouse C',
    type: 'delivery-arrived'
  }
];
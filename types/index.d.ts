export interface SidebarLink {
  route: string;
  label: string;
  authorized: string[];
}
interface Service {
  serviceName: string;
  serviceId: string;
  price: string;
  serviceGroupId?: string;
}

export interface OrderData {
  clientId: string;
  clientPhoneNumber: string;
  locationId: string;
  comment: string;
  garageId: string;
  carId: string;
  discount: number;
  discountType: string;
  orderState: string;
  service: Service;
  extraServices: Service[];
  estimatedPickUpTime: string;
  tz: string;
  clientName: string;
  clientEmail: string;
  carTypeId: string;
  carTypeName: string;
}

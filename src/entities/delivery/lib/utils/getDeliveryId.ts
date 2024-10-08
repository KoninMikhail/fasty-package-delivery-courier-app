import { Delivery } from "@/shared/api";

export const getDeliveryId = (delivery: Delivery, padLeft?: number) => {
  if (!delivery) console.error('Delivery is not defined');
  const { deliveryId } = delivery;
  return deliveryId.toString().padStart(padLeft || 0, '0') ?? '';
}
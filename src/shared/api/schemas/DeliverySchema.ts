import { z } from 'zod';
import { contactSchema } from './ContactSchema';
import { clientSchema } from './ClientSchema';
import { userSchema } from './UserSchema';
import { addressSchema } from './AddressSchema';

export const deliveryStateSchema = z.union([
    z.literal('created'),
    z.literal('delivering'),
    z.literal('canceled'),
    z.literal('done'),
]);

export const deliveryTypeSchema = z.enum(['car', 'foot', 'unset']);

export const deliverySchema = z.object({
    id: z.string(),
    deliveryId: z.number(),
    car: z.boolean(),
    comment: z.string(),
    contents: z.string(),
    date: z.coerce.date(),
    express: z.boolean(),
    time_end: z.coerce.date(),
    time_start: z.coerce.date(),
    weight: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date().nullish(),
    state: deliveryStateSchema,
    courier: userSchema.nullable(),
    manager: userSchema,
    client: clientSchema,
    contact: contactSchema,
    address: addressSchema,
});

export const upcomingDeliverySchema = deliverySchema.omit({
    manager: true,
    courier: true,
    client: true,
    contact: true,
});

export const historyDeliverySchema = deliverySchema
    .extend({
        updatedAt: z.coerce.date(),
    })
    .omit({
        courier: true,
        manager: true,
    });

export const changeDeliveryStateSchema = z.object({
    id: z.string(),
    state: deliveryStateSchema,
    comment: z.string(),
});

export const assignUserToDeliverySchema = z.object({
    userId: z.string(),
    deliveryId: z.string(),
});

export type Delivery = z.infer<typeof deliverySchema>;
export type DeliveryStates = Delivery['state'];
export type HistoryDelivery = z.infer<typeof historyDeliverySchema>;
export type UpcomingDelivery = z.infer<typeof upcomingDeliverySchema>;
export type MyDelivery = z.infer<typeof deliverySchema>;
export type DeliveryType = z.infer<typeof deliveryTypeSchema>;
export type ChangeDeliveryStateRequest = z.infer<
    typeof changeDeliveryStateSchema
>;
export type AssignUserToDeliveryRequest = z.infer<
    typeof assignUserToDeliverySchema
>;

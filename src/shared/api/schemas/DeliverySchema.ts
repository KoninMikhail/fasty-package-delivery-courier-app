import { z } from 'zod';
import { userSchema } from '@/shared/api/schemas/UserSchema';
import { contactSchema } from '@/shared/api/schemas/ContactSchema';
import { addressSchema } from '@/shared/api/schemas/AddressSchema';
import { clientSchema } from '@/shared/api/schemas/ClientSchema';
import { orderSchema } from '@/shared/api/schemas/OrderSchema';

const timeSchema = z
    .string()
    .regex(
        /^([01]?\d|2[0-3]):[0-5]\d$/,
        'Invalid time format. Time must be in hh:mm format',
    );

export const deliverySchema = z.object({
    id: z.number(),
    car: z.boolean(),
    client_id: z.number(),
    comment: z.string(),
    contact_id: z.number(),
    contents: z.string(),
    deleted: z.boolean(),
    date: z.string(),
    express: z.boolean(),
    manager_id: z.number(),
    order_id: z.number(),
    states: z.string(),
    time_end: timeSchema,
    time_start: timeSchema,
    order: orderSchema,
    weight: z.string(),
    courier: userSchema,
    courier_id: z.number(),
    contact: contactSchema,
    client: clientSchema,
    address: addressSchema,
    manager: userSchema,
});

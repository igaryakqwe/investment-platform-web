import { z } from "zod";

export const addContactSchema = z.object({
  type: z.enum(["PHONE", "EMAIL", "VIBER", "TELEGRAM", "WHATSAPP", "FACEBOOK", "OTHER"], {
    required_error: "Please select a contact type",
  }),
  content: z.string().min(1, { message: "Contact value cannot be empty" }),
})

export const editContactSchema = z.object({
  content: z.string().min(1, { message: "Contact value cannot be empty" }),
})

export type AddContactDto = z.infer<typeof addContactSchema>;
export type EditContactDto = z.infer<typeof editContactSchema>;

import { z } from "zod";


export const updateProfileDataSchema = z
  .object({
    name: z
      .string({ message: 'Nome é obrigatório' })
      .min(3, {
        message: 'Nome é obrigatório e deve ter ao menos 3 caracteres',
      })
      .optional(),
    email: z
      .string({ message: 'Email é obrigatório' })
      .email({ message: 'Email inválido' })
      .optional(),
    currentPassword: z
      .string({ message: 'Senha é obrigatório' })
      .min(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
      .optional(),
    newPassword: z
      .string({ message: 'Senha é obrigatório' })
      .min(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
      .optional(),
    confirmPassword: z
      .string({ message: 'Senha é obrigatório' })
      .min(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
      .optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirm_password'],
  })
  .optional();

export type Profile = z.infer<typeof updateProfileDataSchema>;

import { useUser } from "@/context/user";
import { OrgService } from "@/services/api/org";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { z } from "zod";

const createOrgSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email deve ser válido"),
  description: z
    .string()
    .min(4, "A descrição da organização deve ter no mínimo 4 caracteres")
    .min(1, "Descrição é obrigatória"),
  openHour: z
    .string()
    .min(4, "O horário de abertura deve ter no mínimo 4 caracteres")
    .max(6, "O horário de abertura deve ter no máximo 6 caracteres")
    .min(1, "Horário de abertura é obrigatório"),
  closeHour: z
    .string()
    .min(4, "O horário de fechamento deve ter no mínimo 4 caracteres")
    .max(6, "O horário de fechamento deve ter no máximo 6 caracteres")
    .min(1, "Horário de fechamento é obrigatório"),
  cep: z.string().min(8, "O CEP deve ter no mínimo 8 caracteres").max(9, "O CEP deve ter no mínimo 9 caracteres").transform(value => value.replace(/\D+/g, '')),
  image: z.instanceof(File).or(z.null()).optional(),
});

export type CreateOrgBody = z.infer<typeof createOrgSchema>;

export function useOrgController() {
  const setOrgInfo = useUser(state => state.setOrgInfo);
  const user = useUser(state => state.user);
  const navigate = useNavigate();
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors, isValid },
    control,
  } = useForm<CreateOrgBody>({
    resolver: zodResolver(createOrgSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateOrgBody) => {
      return OrgService.createOrg({data: {
        ...data,
        userid: user.id
      }});
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const {
        name,
        orgId,
        imgUrl
      } = await mutateAsync(data);
      setOrgInfo({
        imgUrl: imgUrl ?? '',
        name,
        orgId
      });
      navigate('/app/home');
      return;
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar a organização.");
    }
  });

  const image = useWatch({
    control,
    name: 'image',
    defaultValue: null
  });

  return { handleSubmit, register, errors, isLoading: isPending, control, isValid, image };
}

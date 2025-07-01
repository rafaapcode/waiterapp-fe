import { useUser } from "@/context/user";
import { OrgService } from "@/services/api/org";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const updateOrgSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").optional(),
  email: z.string().email("Email deve ser válido").optional(),
  description: z
    .string()
    .min(4, "A descrição da organização deve ter no mínimo 4 caracteres")
    .min(1, "Descrição é obrigatória")
    .optional(),
  openHour: z
    .string()
    .min(4, "O horário de abertura deve ter no mínimo 4 caracteres")
    .max(6, "O horário de abertura deve ter no máximo 6 caracteres")
    .min(1, "Horário de abertura é obrigatório")
    .optional(),
  closeHour: z
    .string()
    .min(4, "O horário de fechamento deve ter no mínimo 4 caracteres")
    .max(6, "O horário de fechamento deve ter no máximo 6 caracteres")
    .min(1, "Horário de fechamento é obrigatório")
    .optional(),
  cep: z
    .string()
    .min(8, "O CEP deve ter no mínimo 8 caracteres")
    .max(9, "O CEP deve ter no mínimo 9 caracteres")
    .transform((value) => value.replace(/\D+/g, ""))
    .optional(),
  image: z.instanceof(File).or(z.null()).optional(),
});

export type UpdateOrgBody = z.infer<typeof updateOrgSchema>;

export function useOrgInfoController() {
  const user = useUser((state) => state.user);
  const orgid = user.orgId;
  const orgName = user.orgName;

  // Get OrgInfo
  const {data: orgInfo, isFetching} = useQuery({
    queryKey: ["get", "org", orgid],
    queryFn: async () => {
      return  await OrgService.getOrg({ orgid });
    },
  });

  console.log(orgInfo);

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors, isValid, isDirty },
    control,
  } = useForm<UpdateOrgBody>({
    resolver: zodResolver(updateOrgSchema),
    defaultValues: {
      cep: orgInfo && orgInfo.cep,
      closeHour: orgInfo && orgInfo.closeHour,
      description: orgInfo && orgInfo.description,
      email: orgInfo && orgInfo.email,
      name: orgInfo && orgInfo.name,
      openHour: orgInfo && orgInfo.openHour
    }
  });

  // Update Org Info

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      console.log(data);
      return;
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar a organização.");
    }
  });



  // Tracking Image changes
  const image = useWatch({
    control,
    name: "image",
    defaultValue: null,
  });

  return {
    orgid,
    orgName,
    handleSubmit,
    errors,
    register,
    control,
    isValid,
    image,
    isDirty,
    isFetching,
    imageUrl: orgInfo &&  orgInfo.imageUrl
  };
}

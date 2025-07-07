import { useAuth } from "@/hooks/useAuth";
import { OrgService } from "@/services/api/org";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  locationCode: z
    .string()
    .min(1, "O número do estabelecimento é obrigatório")
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
  const {user, setOrgInfo} = useAuth();
  const orgid = user.orgId;
  const orgName = user.orgName;

  // Get OrgInfo
  const {data: orgInfo, isFetching} = useQuery({
    queryKey: ["get", "org", orgid],
    queryFn: async () => {
      return  await OrgService.getOrg({ orgid });
    },
  });

   // Delete Org
  const { mutateAsync: deleteMutate, isPending: isOrgDeleting } = useMutation({
    mutationFn: async () => {
      return await OrgService.deleteOrg({orgId: orgid});
    },
  });

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors, isValid, isDirty, defaultValues },
    control,
  } = useForm<UpdateOrgBody>({
    resolver: zodResolver(updateOrgSchema),
    defaultValues: async () => await OrgService.getOrg({ orgid })
  });

  // Update Org Info
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: UpdateOrgBody) => {
      return OrgService.updateOrg({ newData: data, defaultvalues: defaultValues!, orgId: orgid, userId: user.id })
    }
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync(data);
      toast.success("Organização atualizada com sucesso !");
      return;
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar a organização.");
    }
  });

  const deleteOrg  = async () => {
    try {
      await deleteMutate();
      setOrgInfo({
        imgUrl: '',
        name: '',
        orgId: ''
      });
    } catch (error) {
      console.log(error);
      toast.error('Erro ao deletar a organização');
    }
  }

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
    imageUrl: orgInfo &&  orgInfo.imageUrl,
    isPending,
    isOrgDeleting,
    deleteOrg
  };
}

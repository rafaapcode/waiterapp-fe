import { UsersService } from "@/services/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface UseDeleteUserModalControllerProps {
  onClose: () => void;
  onEditModalClose: () => void;
}

export const useDeleteUserModalController = ({ onClose, onEditModalClose }: UseDeleteUserModalControllerProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteUser, isPending: deletingUser } = useMutation({
    mutationFn: async (userId: string) => {
      await UsersService.deleteUser(userId);
    }
  });


  const onDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      toast.success("Usuário deletado com sucesso !", {toastId: 'deleteUserSucessoId'});
      queryClient.invalidateQueries({ queryKey: ["get_all_users", { page: 0 }] });
      onClose();
      onEditModalClose();
    } catch (error) {
      toast.error('Erro ao deletar usuário !', {toastId: 'deleteUserErroId'});
    }
  };

  return {
    onDelete,
    deletingUser
  }
};

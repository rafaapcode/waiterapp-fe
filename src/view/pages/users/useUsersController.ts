import { UsersService } from "@/services/api/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useUsersController = () => {
  const queryClient = useQueryClient();
  const [newUserModal, setNewUserModal] = useState<boolean>(false);
  const [page, setCurrentPage] = useState<number>(1);
  const [userToEdit, setUserToEditModal] = useState<string | null>(null);

  const toggleNewUserModal = useCallback(
    () => setNewUserModal((prev) => !prev),
    []
  );

  const { data: allUsers, isPending: gettingAllUsers } = useQuery({
    queryKey: ["get_all_users", { page }],
    queryFn: async () => {
      return await UsersService.getAllUsers(page);
    },
  });

  const { mutateAsync: deleteUser, isPending: deletingUser } = useMutation({
    mutationFn: async (userId: string) => {
      await UsersService.deleteUser(userId);
    },
  });

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      queryClient.invalidateQueries({ queryKey: ["get_all_users", { page }] });
      toast.success("Usuário deletado com sucesso !", {
        toastId: "deletarUserSucessoToastId",
      });
    } catch (error) {
      console.log(error);
      toast.error("Erro ao deletar o usuário", {
        toastId: "deletarUserErroToastId",
      });
    }
  };

  return {
    allUsers,
    handleDeleteUser,
    deletingUser,
    gettingAllUsers,
    newUserModal,
    page,
    setCurrentPage,
    setUserToEditModal,
    toggleNewUserModal,
    userToEdit,
  };
};

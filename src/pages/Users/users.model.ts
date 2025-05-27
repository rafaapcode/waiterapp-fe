import { UsersService } from "@/services/api/users";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { UsersPageProps } from "./users.type";

export const useUsersModel = (): UsersPageProps => {
  const queryClient = useQueryClient();
  const [newUserModal, setNewUserModal] = useState<boolean>(false);
  const [page, setCurrentPage] = useState<number>(1);
  const [userToEdit, setUserToEditModal] = useState<string | null>(null);

  const toggleNewUserModal = useCallback(
    () => setNewUserModal((prev) => !prev),
    []
  );

  const { deleteUser } = UsersService.deleteUser(
    () => {
      toast.success("Usuário deletado com sucesso !");
      queryClient.invalidateQueries({ queryKey: ["all_users", { page: 1 }] });
    },
    (error) => {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message);
    }
  );

  const { data: AllUsers, isPending } = UsersService.getAllUsers(page);

  return {
    props: {
      AllUsers,
      deleteUser,
      isPending,
      newUserModal,
      page,
      setCurrentPage,
      setUserToEditModal,
      toggleNewUserModal,
      userToEdit,
    },
  };
};

import { Users } from "@/types/Users";
import { apiclient } from "@/utils/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

  const { mutateAsync: deleteUser } = useMutation({
    mutationFn: async (id: string) => {
      if (!id || id.length !== 24) {
        toast.error("Id do usuário inválido");
        return;
      }
      await apiclient.delete(`/user/${id}`);
    },
    onSuccess: () => {
      toast.success("Usuário deletado com sucesso !");
      queryClient.invalidateQueries({ queryKey: ["all_users", { page: 1 }] });
    },
    onError: (error) => {
      const err = error as AxiosError<{message: string}>;
      toast.error(err.response?.data?.message);
    }
  });

  const { data: AllUsers, isPending } = useQuery({
    queryKey: ["all_users", { page }],
    queryFn: async () => {
      try {
        const { data } = await apiclient.get(`/user/all/${page}`);
        return {
          total_pages: data.total_pages,
          users: data.users.map((u: any) => ({ ...u, id: u._id })),
        } as { total_pages: number; users: Users[] };
      } catch (error) {
        console.log(error);
        const err = error as AxiosError<{message: string}>;
        toast.error(err.response?.data?.message);
        return { total_pages: 0, users: [] };
      }
    },
  });

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
      userToEdit
    }
  }
}

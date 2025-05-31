import { Users } from "@/types/Users";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";

export interface UsersPageProps {
  props: {
    newUserModal: boolean;
    toggleNewUserModal: () => void;
    userToEdit: string | null;
    setUserToEditModal: Dispatch<SetStateAction<string | null>>;
    page: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    AllUsers: {total_pages: number; users: Users[];} | undefined;
    isPending: boolean;
    deleteUser: UseMutateAsyncFunction<void | AxiosResponse<any, any>, Error, string, unknown>;
  };
}

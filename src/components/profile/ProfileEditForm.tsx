import { Profile } from "@/types/Profile";
import { LoaderCircle, Lock, Mail, Save, User } from "lucide-react";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { isValid } from "zod";


interface ProfileEditFormProps {
  props: {
    onSubmit: (data: Profile) => Promise<void>;
    register: UseFormRegister<{
      name: string;
      email: string;
      confirmPassword: string;
      currentPassword: string;
      newPassword: string;
    }>;
    handleSubmit: UseFormHandleSubmit<
      {
        name: string;
        email: string;
        confirmPassword: string;
        currentPassword: string;
        newPassword: string;
      },
      {
        name: string;
        email: string;
        confirmPassword: string;
        currentPassword: string;
        newPassword: string;
      }
    >;
    isDirty: boolean;
    isLoading: boolean;
    isPending: boolean;
  };
}

function ProfileEditForm({props}: ProfileEditFormProps) {
  const {
    handleSubmit,
    isDirty,
    isLoading,
    isPending,
    onSubmit,
    register
  } = props;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 max-h-[750px] overflow-y-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Informações Pessoais */}
        <div className="space-y-2">
          <h2 className="text-lg font-medium">Informações Pessoais</h2>

          <div className="space-y-3">
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 flex items-center gap-1.5"
              >
                <User className="h-4 w-4 text-gray-500" />
                Nome
              </label>
              <div className="mt-1">
                <input
                  disabled={isLoading}
                  id="name"
                  type="text"
                  {...register("name")}
                  className="px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 flex items-center gap-1.5"
              >
                <Mail className="h-4 w-4 text-gray-500" />
                Email
              </label>
              <div className="mt-1">
                <input
                  disabled={isLoading}
                  id="email"
                  type="email"
                  {...register("email")}
                  className="px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  placeholder="seu.email@exemplo.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="h-px w-full bg-gray-200 my-6"></div>

        {/* Alterar Senha */}
        <div className="space-y-2">
          <h2 className="text-lg font-medium flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-gray-500" />
            Alterar Senha
          </h2>
          <p className="text-sm text-gray-500">
            Deixe os campos em branco se não deseja alterar sua senha.
          </p>

          <div className="space-y-3">
            <div>
              <label
                htmlFor="current-password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha Atual
              </label>
              <div className="mt-1">
                <input
                  disabled={isLoading}
                  id="current-password"
                  type="password"
                  {...register("currentPassword")}
                  className="px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm pr-10"
                  placeholder="Digite sua senha atual"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700"
              >
                Nova Senha
              </label>
              <div className="mt-1">
                <input
                  disabled={isLoading}
                  id="new-password"
                  type="password"
                  {...register("newPassword")}
                  className="px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm pr-10"
                  placeholder="Digite sua nova senha"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar Nova Senha
              </label>
              <div className="mt-1">
                <input
                  disabled={isLoading}
                  id="confirm-password"
                  type="password"
                  {...register("confirmPassword")}
                  className="px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm pr-10"
                  placeholder="Confirme sua nova senha"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            disabled={!isValid || !isDirty || isLoading || isPending}
            type="submit"
            className="px-4 py-2 h-10 rounded-md border border-transparent bg-red-500 disabled:bg-red-400 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center gap-1"
          >
            {isPending ? (
              <LoaderCircle size={24} className="animate-spin" />
            ) : (
              <div className="flex gap-2">
                <Save className="h-4 w-4" />
                Salvar Alterações
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileEditForm;

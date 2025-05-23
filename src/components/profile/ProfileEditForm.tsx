import {
  ChevronLeft,
  EyeOff,
  ImagePlus,
  Lock,
  Mail,
  Save,
  Upload,
  User,
} from "lucide-react";

function ProfileEditForm() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 max-h-[750px] overflow-y-auto">
      {/* Modal de carregamento */}
      {/* <LoadingModal isOpen={isAnalyzing} message="Processando imagem..." /> */}

      <form onSubmit={() => {}} className="space-y-6">
        {/* Seção de Imagem de Perfil */}
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
          <div className="relative">
            <div
              className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-md cursor-pointer relative"
              onClick={() => {}}
            >
              {true && (
                <>
                  <img
                    src="https://www.g20.rj.gov.br/painel/app/imagens_salvas/default_image.jpg"
                    alt="Foto de perfil"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity flex gap-2">
                      <button
                        type="button"
                        onClick={(e) => {}}
                        className="bg-white p-1.5 rounded-full shadow-md"
                      >
                        <ImagePlus className="h-4 w-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={() => {}}
            />
          </div>

          <div className="flex-1 space-y-2">
            <h2 className="text-lg font-medium">Foto de Perfil</h2>
            <p className="text-sm text-gray-500">
              Esta foto será exibida no seu perfil e em outros lugares onde você
              interage na plataforma.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                className="px-3 h-9 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center gap-1"
                onClick={() => {}}
              >
                <Upload className="h-4 w-4" />
                Alterar foto
              </button>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="h-px w-full bg-gray-200 my-6"></div>

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
                  id="name"
                  type="text"
                  value={""}
                  onChange={() => {}}
                  className="px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 flex items-center gap-1.5"
              >
                <Mail className="h-4 w-4 text-gray-500" />
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  value={""}
                  onChange={() => {}}
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
              <div className="mt-1 relative">
                <input
                  id="current-password"
                  type="text"
                  value={""}
                  onChange={() => {}}
                  className="px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm pr-10"
                  placeholder="Digite sua senha atual"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => {}}
                >
                  {/* {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />} */}
                  <EyeOff className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700"
              >
                Nova Senha
              </label>
              <div className="mt-1 relative">
                <input
                  id="new-password"
                  type="text"
                  value={"newPassword"}
                  onChange={() => {}}
                  className="px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm pr-10"
                  placeholder="Digite sua nova senha"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => {}}
                >
                  {/* {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />} */}
                  <EyeOff className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar Nova Senha
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirm-password"
                  type="text"
                  value={"confirmPassword"}
                  onChange={() => {}}
                  className="px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm pr-10"
                  placeholder="Confirme sua nova senha"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => {}}
                >
                  {/* {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />} */}
                  <EyeOff className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 h-10 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 h-10 rounded-md border border-transparent bg-red-500 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center gap-1"
          >
            <Save className="h-4 w-4" />
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileEditForm;

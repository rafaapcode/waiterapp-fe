import Input from "@/components/Input";
import { Building2, Upload } from "lucide-react";
import { Controller } from "react-hook-form";
import { VscLoading } from "react-icons/vsc";
import DefaulImage from "../../assets/images/default-image.png";
import { useOrgController } from "./useOrgController";

function OrgRegister() {
  const {
    errors,
    handleSubmit,
    register,
    isLoading,
    control,
    isValid,
    getValues,
  } = useOrgController();
  console.log(getValues('image'));
  return (
    <section className="container mx-auto pt-10">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-4 text-2xl font-medium">
          <Building2 size={24} />
          <p>Crie uma organização</p>
        </div>
        <span className="text-sm text-gray-500">
          Cadastre seu restaurante e comece a gerenciar pedidos, cardápios e
          equipes com facilidade.
        </span>
      </header>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-4 gap-6 h-full mt-10"
      >
        <div className="col-span-1 flex flex-col">
          <div className="bg-red-700 h-[200px] rounded-tr-md rounded-tl-md overflow-hidden">
            <img src={DefaulImage} alt="Image of organization" className="w-full h-full object-cover" />
          </div>
          <Controller
            control={control}
            name="image"
            render={({ field }) => {
              return (
                <div className="flex justify-center items-center p-2 bg-white rounded-br-md rounded-bl-md shadow-sm">
                  <label htmlFor="uploadImage" className="text-red-600 text-sm font-medium cursor-pointer flex gap-2 items-center"><Upload size={16}/> Selecionar imagem</label>
                  <Input
                    {...field}
                    id="uploadImage"
                    type="file"
                    accept="image/*"
                    value={undefined}
                    onChange={(e) => {
                      field.onChange(e.target.files ? e.target.files[0] : null);
                    }}
                    error={errors.image?.message}
                    className="hidden"
                  />
                </div>
              );
            }}
          />
        </div>
        <div className="col-span-3">
          <textarea
            placeholder="Descrição"
            {...register("description")}
            className="w-full border border-gray-300 h-full"
          />
        </div>
        <div className="col-span-2">
          <Input
            placeholder="Nome"
            error={errors.name?.message}
            {...register("name")}
          />
        </div>
        <div className="col-span-2">
          <Input
            type="email"
            placeholder="Email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <Input
          placeholder="Horário de abertura"
          error={errors.openHour?.message}
          {...register("openHour")}
        />
        <Input
          placeholder="Horário de fechamento"
          error={errors.closeHour?.message}
          {...register("closeHour")}
        />
        <Input
          type="number"
          placeholder="CEP"
          error={errors.cep?.message}
          {...register("cep")}
        />

        <div className="col-span-4 flex justify-end">
          <button
            disabled={isLoading || !isValid}
            type="submit"
            className="flex justify-center items-center text-lg bg-red-600 text-white p-2 rounded-lg w-1/6 hover:bg-red-700 disabled:bg-red-400 transition-all duration-100"
          >
            {isLoading ? (
              <VscLoading size={20} className="animate-spin" />
            ) : (
              "Criar"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default OrgRegister;

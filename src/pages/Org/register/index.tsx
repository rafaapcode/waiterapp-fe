import Input from "@/components/Input";
import Select from "@/components/Select";
import { Building2, Upload } from "lucide-react";
import { Controller } from "react-hook-form";
import { VscLoading } from "react-icons/vsc";
import DefaulImage from "../../../assets/images/default-image.png";
import { closeHoursOptions, openHoursOptions } from "../constants";
import { useOrgController } from "./useOrgController";

function OrgRegister() {
  const { errors, handleSubmit, register, isLoading, control, isValid, image } =
    useOrgController();

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
        className="grid grid-cols-4 gap-6 h-full mt-16"
      >
        <div className="col-span-4 flex flex-col">
          <Controller
            control={control}
            name="image"
            render={({ field }) => {
              return (
                <div className="flex flex-col justify-center items-center w-fit mx-auto">
                  <div className="h-[200px] rounded-md shadow overflow-hidden relative max-w-[300px] group">
                    <img
                      src={image ? URL.createObjectURL(image) : DefaulImage}
                      alt="Image of organization"
                      className="w-full h-full object-cover"
                    />
                    <label
                      htmlFor="uploadImage"
                      className="opacity-0 group-hover:opacity-100 text-red-600 bg-black/70 w-full h-full text-sm font-medium rounded-md gap-2 justify-center items-center absolute cursor-pointer flex transition-all duration-200 top-0"
                    >
                      <Upload size={32} />
                    </label>
                  </div>
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
        <div className="col-span-4">
          <Input
            placeholder="Descrição"
            {...register("description")}
            className="w-full border border-gray-300 h-full"
          />
        </div>
        <div className="col-span-4 flex justify-between items-center gap-6">
          <Select
            label="Horário de abertura"
            {...register("openHour")}
            options={openHoursOptions}
          />
          <Select
            label="Horário de fechamento"
            {...register("closeHour")}
            options={closeHoursOptions}
          />
          <Input
            type="number"
            placeholder="CEP"
            error={errors.cep?.message}
            {...register("cep")}
          />
        </div>

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

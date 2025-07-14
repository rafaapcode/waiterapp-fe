import DefaulImage from "@/assets/images/default-image.png";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import PageHeader from "@/components/molecule/PageHeader";
import { Building2, TrashIcon, Upload } from "lucide-react";
import { Controller } from "react-hook-form";
import { VscLoading } from "react-icons/vsc";
import { closeHoursOptions, openHoursOptions } from "../constants";
import { useOrgInfoController } from "./userOrgInfoController";

function InfoOrgs() {
  const {
    orgid,
    orgName,
    control,
    errors,
    handleSubmit,
    image,
    isValid,
    register,
    isDirty,
    isFetching,
    imageUrl,
    isPending,
    isOrgDeleting,
    deleteOrg
  } = useOrgInfoController();

  if (!orgid) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-2xl">Nenhuma organização selecionada !</p>
      </div>
    );
  }

  return (
    <main className="w-full h-full pt-10 overflow-y-auto">
      <PageHeader
        Icon={Building2}
        subtitle="Atualize as informações da sua organização"
        title={orgName}
      />

      <div className="mt-10">
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
                        src={image ? URL.createObjectURL(image) : imageUrl ? imageUrl : DefaulImage}
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
                        field.onChange(
                          e.target.files ? e.target.files[0] : null
                        );
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
              isLoading={isFetching}
              placeholder="Nome"
              error={errors.name?.message}
              {...register("name")}
            />
          </div>
          <div className="col-span-2">
            <Input
              isLoading={isFetching}
              type="email"
              placeholder="Email"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
          <div className="col-span-4">
            <Input
              isLoading={isFetching}
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
              isLoading={isFetching}
              type="number"
              placeholder="CEP"
              error={errors.cep?.message}
              {...register("cep")}
            />
            <Input
              isLoading={isFetching}
              type="number"
              placeholder="Número"
              error={errors.locationCode?.message}
              {...register("locationCode")}
            />
          </div>

          <div className="col-span-4 flex justify-end gap-4">
             <button
              onClick={deleteOrg}
              disabled={isOrgDeleting}
              type="button"
              className="flex justify-center items-center bg-red-600 text-white p-2 rounded-lg w-1/6 hover:bg-red-700 disabled:bg-red-400 transition-all duration-100"
            >
              {isOrgDeleting ? (
                <VscLoading size={20} className="animate-spin" />
              ) : (
                <span className="flex gap-2 items-center">
                  <TrashIcon size={16}/>
                  Deletar Organização
                </span>
              )}
            </button>
            <button
              disabled={isFetching || !isValid || !isDirty || isPending}
              type="submit"
              className="flex justify-center items-center bg-red-600 text-white p-2 rounded-lg w-1/6 hover:bg-red-700 disabled:bg-red-400 transition-all duration-100"
            >
              {isPending ? (
                <VscLoading size={20} className="animate-spin" />
              ) : (
                "Atualizar"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default InfoOrgs;

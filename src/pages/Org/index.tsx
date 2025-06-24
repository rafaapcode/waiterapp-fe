import Input from "@/components/Input";
import { Building2 } from "lucide-react";
import { VscLoading } from "react-icons/vsc";
import { useOrgController } from "./useOrgController";

function OrgRegister() {
  const { errors, handleSubmit, register, isLoading } = useOrgController();

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

        <div className="col-span-4">
          <Input
            placeholder="Descrição"
            error={errors.description?.message}
            {...register("description")}
          />
        </div>

        <div className="col-span-4 flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="flex justify-center items-center text-lg bg-red-600 text-white p-2 rounded-lg w-1/6 hover:bg-red-700 disabled:bg-red-400 transition-all duration-100"
          >
            {isLoading ? <VscLoading size={20} className="animate-spin"/> : 'Criar'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default OrgRegister;

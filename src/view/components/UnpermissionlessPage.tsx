import Button from "@/components/atoms/Button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router";

function UnpermissionlessPage() {
const { signOut } = useAuth();
  const navigate = useNavigate();

  const logoutUser = () => {
    signOut();
    return navigate("/");
  };
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full">
      <h1 className="text-gray-900 text-2xl font-medium">
        Você não possui permissão para acessar essa página
      </h1>
      <Button onClick={logoutUser} className="min-w-52 max-w-60">Sair</Button>
    </div>
  );
}

export default UnpermissionlessPage;

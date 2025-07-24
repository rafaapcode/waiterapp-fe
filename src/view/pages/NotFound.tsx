import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <p className="text-7xl md:text-[200px]">404</p>
      <p className="text-2xl md:text-3xl">Página não encontrada</p>
      <button onClick={() => navigate('/app/home')} className="text-lg md:text-xl mt-6 bg-red-500 text-white px-6 py-1.5 rounded-lg hover:bg-red-600 transition-all duration-150">
        Voltar
      </button>
    </div>
  )
}

export default NotFound

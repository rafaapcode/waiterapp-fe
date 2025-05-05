import { apiclient } from "@/lib/apiClient";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

function Authentication() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await apiclient.get('/user/auth');

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return <div className="w-full h-full"><LoaderCircle size={32} className="animate-spin"/></div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default Authentication

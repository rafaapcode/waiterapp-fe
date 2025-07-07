import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import Router from "./router/Router";
import AuthenticationProvider from "./store/auth/AuthenticationProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>
          <ToastContainer position="top-center" />
          <Router />
        </AuthenticationProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

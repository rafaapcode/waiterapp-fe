import { useLoginModel } from "./login.model";
import LoginView from "./login.view";

function Login() {
  const { props } = useLoginModel();

  return <LoginView props={props} />;
}

export default Login;

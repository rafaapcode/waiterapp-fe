import { useHomeModel } from "./home.model";
import HomeView from "./home.view";

function Home() {
  const { props } = useHomeModel();

  return <HomeView props={props} />;
}

export default Home;

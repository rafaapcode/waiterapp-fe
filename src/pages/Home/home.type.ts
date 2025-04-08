export default interface HomePageProps {
  props: {
    toogleRestartModal: () => void;
    restartModal: boolean;
    refetchData: () => Promise<void>;
  };
}

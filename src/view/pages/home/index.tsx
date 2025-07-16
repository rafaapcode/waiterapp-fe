import Main from '@/components/atoms/Main';
import PageHeader from '@/components/molecule/PageHeader';
import RestartModal from '@/view/components/RestartModal/RestartModal';
import { Suspense } from 'react';
import { RiHomeLine } from 'react-icons/ri';
import { RxUpdate } from 'react-icons/rx';
import RestartModalSkeleton from '../../components/RestartModal/RestartModalSkeleton';
import Orders from "./components/Orders";
import { useHomeController } from './useHomeController';

function Home() {
  const {
    isPending,
    refetchData,
    restartModal,
    toogleRestartModal
  } = useHomeController();

  return (
    <Main layoutType="custom" className="w-full h-full pt-10 overflow-y-auto">
      {restartModal && (
        <Suspense
          fallback={<RestartModalSkeleton isVisible={restartModal} size="sm"/>}
        >
          <RestartModal
            onCancel={toogleRestartModal}
            onClose={toogleRestartModal}
            isVisible={restartModal}
            onClick={refetchData}
            isLoading={isPending}
          />
        </Suspense>
      )}
      <PageHeader
        title="Home"
        subtitle="Acompanhe os pedidos dos clientes"
        Icon={RiHomeLine}
        rightButton={{
          Icon: RxUpdate,
          text: "Reiniciar o dia",
          onClick: toogleRestartModal,
          isLoading: isPending
        }}
      />
      <Orders />
    </Main>
  )
}

export default Home

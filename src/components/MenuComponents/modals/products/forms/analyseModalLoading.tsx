import ImageLoadingAnimation from "@/assets/animations/image-loading.json";
import Modal from "@/components/Modal";
import Lottie from "lottie-react";

interface AnalyseModalLoadingProps{
  isVisible: boolean;
}

function AnalyseModalLoading({ isVisible }: AnalyseModalLoadingProps) {
  return (
    <Modal.Root size="sm" isVisible={isVisible} priority>
      <Modal.Body className="my-2">
        <div className="flex flex-col justify-center items-center">
          <Lottie animationData={ImageLoadingAnimation} style={{width: '100px'}} loop={true}/>
          <p className="text-center text-sm">Analisando a sua imagem para extrair informações relevantes, por favor aguarde ...</p>
        </div>
      </Modal.Body>
    </Modal.Root>
  );
}

export default AnalyseModalLoading;

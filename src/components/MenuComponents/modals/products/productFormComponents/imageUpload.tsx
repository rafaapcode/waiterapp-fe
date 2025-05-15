import { Image, Upload } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";

interface ImageUploadProps {
  imageurl?: string;
  selectedImage: File | null;
  setSelectedImage: Dispatch<SetStateAction<File | null>>;
}

function ImageUpload({ imageurl, selectedImage, setSelectedImage }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);
    }
  }

  return (
    <div>
      <p className="text-[#666666] font-semibold text-lg mb-4">Imagem</p>
      <div className="border rounded-lg overflow-hidden h-[230px]">
        <div className="bg-gray-50 h-[75%] flex items-center justify-center">
          {
            !imageurl ? (
              selectedImage ? <img src={URL.createObjectURL(selectedImage)} alt="image-preview" className="w-full h-full object-cover"/> : <Image size={26} className="text-gray-400" />
            ) : selectedImage ? <img src={URL.createObjectURL(selectedImage)} alt="image-preview" className="w-full h-full object-cover"/> : <img src={imageurl} alt="image-preview" className="w-full h-full object-cover"/>
          }

        </div>
        <label
            htmlFor="image-upload"
            className="flex items-center  justify-center border-t p-4 gap-2 text-red-500 font-medium cursor-pointer"
          >
            <Upload size={20} />
            Alterar Imagem
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
          </label>
      </div>
    </div>
  );
}

export default ImageUpload;

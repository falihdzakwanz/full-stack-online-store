import { ChangeEvent, Dispatch, SetStateAction } from "react";

type PropTypes = {
  name: string;
  uploadedImage: File | null;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
};

const InputFile = (props: PropTypes) => {
    const { uploadedImage, setUploadedImage, name } = props;

    
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify center gap-2 w-full">
      <label
        htmlFor={name}
        className="flex- flex-col bg-slate-300 p-3 rounded-sm text-center w-full"
      >
        {uploadedImage?.name ? (
          <p>{uploadedImage?.name}</p>
        ) : (
          <>
            <p>Upload new image here</p>
            <p>
              Maximum upload size is <span className="font-bold">1 MB</span>
            </p>
          </>
        )}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        className="opacity-0 absolute -z-50"
        onChange={handleChangeImage}
      />
    </div>
  );
};

export default InputFile;
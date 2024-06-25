import { BiCheckCircle, BiXCircle, BiX, BiError } from "react-icons/bi";
import { useToaster } from "@/context/ToasterContext";
import Button from "../Button";
import { useEffect, useRef, useState } from "react";

type Proptypes = {
  variant: string;
  message?: string;
};

const toasterVariant: any = {
  success: {
    title: "Success",
    icon: BiCheckCircle,
    barColor: "bg-barSuccess",
    color: "bg-success",
    text: "text-barSuccess",
  },
  error: {
    title: "Error",
    icon: BiXCircle,
    barColor: "bg-barError",
    color: "bg-error",
    text: "text-barError",
  },
  warning: {
    title: "Warning",
    icon: BiError,
    barColor: "bg-barWarning",
    color: "bg-warning",
    text: "text-barWarning",
  },
};

const Toaster = (props: Proptypes) => {
  const { variant, message } = props;
  const IconComponent = toasterVariant[variant].icon;
  const { setToaster } = useToaster();
  const [lengthBar, setLengthBar] = useState(100);
  const timeRef = useRef<any>(null);

  const handleClose = () => {
    setToaster({ variant: undefined, message: undefined });
  };

  const timerStart = () => {
    timeRef.current = setInterval(() => {
      setLengthBar((prevLength) => prevLength - 0.189);
    }, 1);
  };

  useEffect(() => {
    timerStart();
    return () => {
      clearInterval(timeRef.current);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 flex shadow-custom py-5 px-6 rounded-sm overflow-hidden`}
    >
      <div className="flex flex-row items-center justify-around gap-5">
        <div className="">
          <IconComponent
            className={`mb-1 ${toasterVariant[variant].text}`}
            size={50}
          />
        </div>
        <div className="px-4">
          <p className="font-bold">{toasterVariant[variant].title}</p>
          <p>{message}</p>
        </div>
        <Button
          className="absolute top-3 right-3 cursor-pointer hover:text-gray-700"
          onClick={handleClose}
        >
          <BiX size={25} />
        </Button>
      </div>
      <div
        className={`w-full absolute bottom-0 left-0 h-1 ${toasterVariant[variant].color}`}
      >
        <div
          style={{ width: `${lengthBar}%` }}
          className={`h-full ${toasterVariant[variant].barColor}`}
        />
      </div>
    </div>
  );
};

export default Toaster;

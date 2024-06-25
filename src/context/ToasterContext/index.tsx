import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface ToasterContextProps {
  toaster: { variant?: string; message?: string };
  setToaster: React.Dispatch<
    React.SetStateAction<{ variant?: string; message?: string }>
  >;
}

const ToasterContext = createContext<ToasterContextProps | undefined>(
  undefined
);

export const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const [toaster, setToaster] = useState<{
    variant?: string;
    message?: string;
  }>({});

  useEffect(() => {
    if (toaster?.variant) {
      setTimeout(() => {
        setToaster({ variant: undefined, message: undefined });
      }, 3000);
    }
  }, [toaster]);

  return (
    <ToasterContext.Provider value={{ toaster, setToaster }}>
      {children}
    </ToasterContext.Provider>
  );
};

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useToaster must be used within a ToasterProvider");
  }
  return context;
};

import { useEffect, useRef } from "react";

type PropTypes = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = (props: PropTypes) => {
  const { children, onClose } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed top-0 w-screen h-screen z-50 bg-black-50 flex items-center justify-center">
      <div className="modal-container bg-white p-5 w-50vw max-h-80vh overflow-y-auto" ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Modal;

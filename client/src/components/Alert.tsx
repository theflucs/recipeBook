import { useRef, useEffect } from "react";

type AlertType = "success" | "error" | "info";

type AlertProps = {
  message: string;
  type?: AlertType;
  onClose?: () => void;
};

function Alert({ message, type = "info", onClose }: AlertProps) {
  const timeoutRef = useRef<number | null>(null);

  let alertClassName =
    "p-4 mb-4 rounded-md text-white flex items-center justify-between";

  switch (type) {
    case "success":
      alertClassName += " bg-green-400";
      break;
    case "error":
      alertClassName += " bg-red-400";
      break;
    case "info":
      alertClassName += " bg-blue-400";
      break;
    default:
      alertClassName += " bg-gray-400";
      break;
  }

  useEffect(() => {
    if (onClose) {
      timeoutRef.current = window.setTimeout(onClose, 3000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [onClose]);

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={alertClassName} role="alert">
      <span>{message}</span>
      {onClose && (
        <button
          onClick={handleClose}
          className="ml-4 p-1 hover:bg-opacity-70 rounded"
          aria-label="Close alert"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Alert;

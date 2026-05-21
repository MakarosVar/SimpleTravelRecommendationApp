import { createContext, useContext, useState } from 'react';

const ToastContext = createContext(null);
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function addToast(message, type = 'info') {
    const id = crypto.randomUUID();

    const toast = {
      id,
      message,
      type,
    };

    setToasts((currentToasts) => [...currentToasts, toast]);

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }

  function removeToast(id) {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  }

  const value = {
    toasts,
    addToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used inside ToastProvider');
  }

  return context;
}

import { useState } from "react";

export default function useModal<T = any>() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const openModal = (modalData: T) => {
    setData(modalData);
    setIsOpen(true);
  };

  const closeModal = () => {
    setData(null);
    setIsOpen(false);
  };

  return { isOpen, data, openModal, closeModal };
}

import React, { createContext, ReactNode, useContext, useState } from 'react';
import ICard from '../interfaces/ICard';

interface ModelContextData {
  visible: boolean;
  toggleVisibility: (card: ICard | undefined) => void;
  selectedCard: ICard | undefined;
}

interface ModalProviderProps {
  children: ReactNode;
}

const ModelContext = createContext<ModelContextData>({} as ModelContextData);

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<ICard | undefined>();

  const toggleVisibility = (card: ICard | undefined) => {
    if (card) setSelectedCard(card);
    else setSelectedCard(undefined);
    setVisible(!visible);
  };

  return (
    <ModelContext.Provider value={{ visible, toggleVisibility, selectedCard }}>
      {children}
    </ModelContext.Provider>
  );
};

function useModal(): ModelContextData {
  const context = useContext(ModelContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
}

export { ModalProvider, useModal };

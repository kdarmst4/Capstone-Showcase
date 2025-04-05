import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MenuContextProps {
  isSideMenu: boolean;
  toggleMenu: () => void;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }
  return context;
};

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [isSideMenu, setIsSideMenu] = useState(false);

  const toggleMenu = () => {
    setIsSideMenu(!isSideMenu);
  };

  return (
    <MenuContext.Provider value={{ isSideMenu, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

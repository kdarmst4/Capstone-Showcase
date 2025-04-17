import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MenuContextProps {
  isSideMenu: boolean;
  toggleMenu: () => void;
  selectedSemester: string | null;
  selectedYear: string | null;
  setSelectedSemester: (semester: string, year: string) => void;
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
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsSideMenu(!isSideMenu);
  };

  const setSelectedSemesterHandler = (semester: string, year: string) => {
    setSelectedSemester(semester);
    setSelectedYear(year);
  };

  return (
    <MenuContext.Provider value={{ isSideMenu, toggleMenu, selectedSemester, selectedYear, setSelectedSemester: setSelectedSemesterHandler }}>
      {children}
    </MenuContext.Provider>
  );
};
// Este archivo es para crear un contexto y poder pasar el nombre de las empresas creadas al header del branchcontent, Así el titulo puedo cambiar dependiendo de cual empresa esta selecionnado, Para eso se agregaron modificaciones en DashBoard,sidebar y por ultimo en branch content.
// esto es un hook personalizado
import { createContext, useContext, useState, ReactNode } from 'react';

interface SelectedCompanyContextType {
  selectedCompany: string;
  setSelectedCompany: (name: string) => void;
}

const SelectedCompanyContext = createContext<SelectedCompanyContextType | undefined>(undefined);

export const SelectedCompanyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCompany, setSelectedCompany] = useState<string>('');

  return (
    <SelectedCompanyContext.Provider value={{ selectedCompany, setSelectedCompany }}>
      {children}
    </SelectedCompanyContext.Provider>
  );
};

export const useSelectedCompany = () => {
  const context = useContext(SelectedCompanyContext);
  if (!context) throw new Error('useSelectedCompany must be used within a SelectedCompanyProvider');
  return context;
};

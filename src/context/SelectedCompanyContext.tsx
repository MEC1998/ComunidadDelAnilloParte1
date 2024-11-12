// Este archivo es para crear un contexto y poder pasar el nombre de las empresas creadas al header del branchcontent, Así el titulo puedo cambiar dependiendo de cual empresa esta selecionnado, Para eso se agregaron modificaciones en DashBoard,sidebar y por ultimo en branch content.


import { createContext, useContext, useState, ReactNode } from 'react';

//Contexto
interface SelectedCompanyContextType {
  selectedCompany: string;
  setSelectedCompany: (name: string) => void;
}

const SelectedCompanyContext = createContext<SelectedCompanyContextType | undefined>(undefined);

//Proveedor
export const SelectedCompanyProvider = ({ children }: { children: ReactNode }) => {

  const [selectedCompany, setSelectedCompany] = useState<string>('');

  return (
    <SelectedCompanyContext.Provider value={{ selectedCompany, setSelectedCompany }}>
      {children}
    </SelectedCompanyContext.Provider>
  );
};


//hook personalizado
export const useSelectedCompany = () => {
  const context = useContext(SelectedCompanyContext);

  //por si no se usa SelectedCompanyContext
  if (!context) throw new Error('useSelectedCompany debe usarse con SelectedCompanyProvider');
  return context;
};

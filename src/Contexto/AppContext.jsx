import { createContext, useContext, useState } from "react";
import { buscarUsuarioLogado } from "../servicos/usuarios";

const AppContext = createContext();

export function AppProvider({ children }) {
  const usuarioLogadoDefault = buscarUsuarioLogado();
  const [usuarioLogado, setUsuarioLogado] = useState(usuarioLogadoDefault);

  return (
    <AppContext.Provider value={{ usuarioLogado, setUsuarioLogado }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
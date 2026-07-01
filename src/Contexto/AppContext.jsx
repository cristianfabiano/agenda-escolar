import { createContext, useContext, useState } from "react";
import { buscarUsuarioLogado } from "../servicos/usuarios";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(() =>
    buscarUsuarioLogado()
  );

  return (
    <AppContext.Provider
      value={{
        usuarioLogado,
        setUsuarioLogado,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAppContext deve ser utilizado dentro do AppProvider."
    );
  }

  return context;
}
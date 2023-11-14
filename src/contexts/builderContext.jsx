import { createContext, useContext, useState } from 'react';

const BuilderContext = createContext(null);

export default function BuilderProvider({children}) {
  const [builderId, setBuilderId] = useState(1);

  return (
    <BuilderContext.Provider value={{ setBuilderId, builderId }}>
      {children}
    </BuilderContext.Provider>
  );
}

export const useBuilder = (() => useContext(BuilderContext));

import React, { createContext, useContext, useMemo, useState } from "react";
import { theme } from "../config/theme";

type ThemeMode = keyof typeof theme;

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  mode: "light",
  setMode: () => {},
});

export const ThemeProvider = ({
  children,
  initialMode = "light",
}: {
  children: React.ReactNode;
  initialMode?: ThemeMode;
}) => {
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const value = useMemo(() => ({ mode, setMode }), [mode]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext);

export default ThemeProvider;

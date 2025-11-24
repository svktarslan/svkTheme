import { theme } from "../config/theme";
import { useThemeMode } from "./ThemeProvider";

export const useTheme = () => {
  const { mode } = useThemeMode();
  return theme[mode];
};

export const staticColors = {
  tblack70: "#00000070",
  white: "#ffffff",
  white2: "#EEEEEE",
  black: "#000000",
  error: "#FF1E1E",
  warning: "#F39F5A",
  success: "#54B435",
  pink: "#FF407D",
  gold: "#FFD700",
  silver: "#C0C0C0",
  bronze: "#CD7F32",
};

import React from "react";
import { IconButton } from "@mui/material";
import {
  Brightness4 as MoonIcon,
  Brightness7 as SunIcon,
} from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import useTheme from "./use-theme";

export default function DarkMode() {
  const { mode, loading }: any = useTheme();
  const [newMode, setNewMode] = React.useState("dark");

  React.useEffect(() => {
    if (loading === false && newMode !== mode) setNewMode(mode);
  }, [mode]);

  React.useEffect(() => {
    localStorage.setItem("mode", newMode);
  }, [newMode]);

  const theme: any = {
    palette: {
      mode: newMode,
    },
  };

  const muiTheme = createTheme(theme);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <IconButton
        onClick={() => setNewMode(newMode === "dark" ? "light" : "dark")}
      >
        {newMode === "dark" ? <SunIcon /> : <MoonIcon />}
      </IconButton>
    </ThemeProvider>
  );
}

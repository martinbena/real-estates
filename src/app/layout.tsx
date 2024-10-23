import ToggleTheme from "@/components/controls/ToggleTheme";
import { CustomThemeProvider } from "@/context/ThemeContext";
import { AppBar, Toolbar, Typography } from "@mui/material";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Favicon from "/src/public/icon.png";

export const metadata: Metadata = {
  title: "Správa nemovitostí",
  description:
    "Spravujte inzerce nemovitostí pomocí CRUD operací, sortování, filtrování a vyhledávání.",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>
        <CustomThemeProvider>
          <AppBar sx={{ mb: "2rem" }} position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Správa Nemovitostí
              </Typography>
              <ToggleTheme />
            </Toolbar>
          </AppBar>
          <Toaster position="top-right" reverseOrder={false} />
          {children}
        </CustomThemeProvider>
      </body>
    </html>
  );
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";

import App from "@web/App";
import { UserProvider } from "./user/UserProvider";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <UserProvider>
      <App />
      <Toaster />
    </UserProvider>
  </ThemeProvider>,
);

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/mkapital-site/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        cash: "materinskiy-kapital-nalichnymi/index.html",
        cashout: "obnalichit-materinskiy-kapital/index.html",
        loan: "zaim-pod-materinskiy-kapital/index.html",
        balance: "ostatok-materinskogo-kapitala/index.html",
        uses: "na-chto-potratit-materinskiy-kapital/index.html",
      },
    },
  },
});

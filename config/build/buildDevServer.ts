import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/config";

// Чтобы открывалась странице в браузере и обновлялось при сохранение (изменения файлов)
export const buildDevServer = (
  options: BuildOptions
): DevServerConfiguration => {
  return {
    port: options.port,
    open: true,
    historyApiFallback: true,
  };
};

import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useState, createContext } from "react";
export const TokenContext = createContext<TokenCont>({
  token: "",
  setToken: () => {},
});

export interface TokenCont {
  token: string;
  setToken: (token: string) => void;
}

function MyApp({ Component, pageProps }: AppProps) {
  const [token, setToken] = useState<string>("");
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <Component {...pageProps} />;
    </TokenContext.Provider>
  );
}
export default MyApp;

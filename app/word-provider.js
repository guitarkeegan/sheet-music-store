"use client";

import { createContext } from "react";

export const WordContext = createContext("word");

export default function WordProvider({ children }) {
  return <WordContext.Provider value={"word"}>{children}</WordContext.Provider>;
}

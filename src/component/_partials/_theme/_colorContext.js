import React, {useState} from "react";

interface ColorContextSchema {
  toggleColorMode: () => void;
}

export const ColorContext = React.createContext({ ColorContextSchema: () => {} });

export function setThemeToStorage(){
  localStorage.getItem('isDarkMode') ? localStorage.removeItem('isDarkMode') : localStorage.setItem('isDarkMode', 'darkTheme');
}
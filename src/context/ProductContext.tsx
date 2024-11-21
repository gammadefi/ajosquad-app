import React, { useState, useMemo, ReactNode, useEffect } from 'react'
import { useAuth } from '../zustand/auth.store';

// create context
export const ProductContext = React.createContext<valueItf | null>(null)


interface valueItf {
    isProductOpen: boolean;
    toggleProduct: () => void;
    closeProduct: () => void;
}
interface ProductITF {
    children:ReactNode
}

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

export const ProductProvider = ({ children } : ProductITF) => {
  const [isProductOpen, setIsProductOpen] = useState(false)

  function toggleProduct() {
    setIsProductOpen(!isProductOpen)
  }

  function closeProduct() {
    setIsProductOpen(false)
  }

  const value = useMemo(
    () => ({
      isProductOpen,
      toggleProduct,
      closeProduct,
    }),
    [isProductOpen]
  )



// Product after 5min of idleness 5 * 60 * 1000 = 300000




  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}
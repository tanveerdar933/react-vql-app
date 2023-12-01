import { useState, createContext, useContext } from "react";

const DataContext = createContext({});

const DataContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: ""
  })

  return (
    <DataContext.Provider value={{ formData, setFormData }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContextProvider;

export const useDataContext = () => useContext(DataContext);
import { createContext } from "react";

const AppContext = createContext({
  user: null,
  pet: null,
  appointment: null,
});

export default AppContext;

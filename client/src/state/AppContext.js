import { createContext } from "react";

const AppContext = createContext({
  user: null,
  pet: null,
  appointment: null,
  health: null,
});

export default AppContext;

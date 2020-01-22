import { createContext } from "react";

import { Dispatchers } from "./hooks";

export default createContext<Dispatchers | null>(null);

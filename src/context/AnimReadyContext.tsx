import { createContext, useContext } from 'react';

export const AnimReadyContext = createContext(false);

export const useAnimReady = () => useContext(AnimReadyContext);

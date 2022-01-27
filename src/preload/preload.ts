import { contextBridge } from 'electron';

export const API = {
    pog: 'champ',
    e: () => true,
};

contextBridge.exposeInMainWorld('api', API);

import { createElement, createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Context
const EmitterContext = createContext({});

// ContextProvider
function EmitterProvider ({ children = [], emitter }: { children: ReactNode; emitter: any }) {
   return createElement(EmitterContext.Provider, { value: emitter }, ...children);
}

// Use data for the specific event emitted by the emitter
function useEmitter () {
   return useContext(EmitterContext);
}

// Use a full instance of the emitter with all of its methods.
function useEvent (event: string, defaultValue?: any) {
   const emitter: any = useContext(EmitterContext);
   const [data, setData] = useState(defaultValue);

   useEffect(() => {
      emitter.on(event, setData);
   }, [event, defaultValue]);

   return data;
}

// Use data for the specific event emitted by the emitter only on the first dispatch
useEvent.once = function (event: string, defaultValue?: any) {
   const emitter: any = useContext(EmitterContext);
   const [data, setData] = useState(defaultValue);

   useEffect(() => {
      emitter.once(event, setData);
   }, [event, defaultValue]);

   return data;
};

export { EmitterProvider, useEmitter, useEvent };

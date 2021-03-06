import { createElement, createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Context
const EmitterContext = createContext({});

// ContextProvider
function EmitterProvider ({ children, emitter }: { children: ReactNode; emitter: any }) {
   return createElement(EmitterContext.Provider, { value: emitter, children });
}

// Use the full instance of the emitter with all of its methods.
function useEmitter () {
   return useContext(EmitterContext);
}

// Use data for the specific event emitted by the emitter
function useEvent (event: string, defaultValue?: any, ...options: any) {
   const emitter: any = useContext(EmitterContext);
   const [data, setData] = useState(defaultValue);
   const emit = (data: any, ...options: any) => emitter.emit(event, data, ...options);

   useEffect(() => {
      emitter.on(event, setData, ...options);
   }, [event, defaultValue]);

   return [data, emit];
}

// Use data for the specific event emitted by the emitter only on the first dispatch
useEvent.once = function (event: string, defaultValue?: any, ...options: any) {
   const emitter: any = useContext(EmitterContext);
   const [data, setData] = useState(defaultValue);
   const emit = (data: any, ...options: any) => emitter.emit(event, data, ...options);

   useEffect(() => {
      emitter.once(event, setData, ...options);
   }, [event, defaultValue]);

   return [data, emit];
};

function useEmit (event: string) {
   const emitter: any = useContext(EmitterContext);
   return (data: any, ...options: any) => emitter.emit(event, data, ...options);
}

export { EmitterProvider, useEmitter, useEvent, useEmit };

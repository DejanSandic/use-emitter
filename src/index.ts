import { createElement, createContext, useContext, useState, useEffect, ReactNode } from 'react';

const EmitterContext = createContext({});

function EmitterProvider({ children = [], emitter }: { children: ReactNode; emitter: any }) {
	return createElement(EmitterContext.Provider, { value: emitter }, ...children);
}

function useEmitter() {
	return useContext(EmitterContext);
}

function useEvent(event: string, defaultValue?: any) {
	const emitter: any = useContext(EmitterContext);
	const [ data, setData ] = useState(defaultValue);

	useEffect(
		() => {
			emitter.on(event, setData);
		},
		[ event, defaultValue ]
	);

	return data;
}

useEvent.once = function(event: string, defaultValue?: any) {
	const emitter: any = useContext(EmitterContext);
	const [ data, setData ] = useState(defaultValue);

	useEffect(
		() => {
			emitter.once(event, setData);
		},
		[ event, defaultValue ]
	);

	return data;
};

export { EmitterProvider, useEmitter, useEvent };

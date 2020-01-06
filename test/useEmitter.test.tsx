import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { EmitterProvider, useEmitter } from '../src';
import EventEmitter from 'events';

// Use native node js event emitter
const emitter = new EventEmitter();

// Create context wrapper which will provide event emitter to the useEvent hook
const wrapper = ({ children }: any) => <EmitterProvider emitter={emitter}>{children}</EmitterProvider>;

describe('useEmit hook', () => {
   test('should return the emit function.', () => {
      const { result } = renderHook(() => useEmitter(), { wrapper });
      expect(result.current).toBe(emitter);
   });
});

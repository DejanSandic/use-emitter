import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { EmitterProvider, useEvent, useEmit } from '../src';
import EventEmitter from 'events';

// Use native node js event emitter
const emitter = new EventEmitter();

// Create context wrapper which will provide event emitter to the useEvent hook
const wrapper = ({ children }: any) => <EmitterProvider emitter={emitter}>{children}</EmitterProvider>;

/**
 * Disable console error to prevent the fake memory leak error
 * thrown by the react-test-renderer.
 * This doesn't affect the errors thrown by the failed tests.
 */
console.error = () => {};

describe('useEmit hook', () => {
   test('should return the emit function.', () => {
      const { result } = renderHook(() => useEmit('test'), { wrapper });
      expect(typeof result.current).toBe('function');
   });

   test('returned emit function should call the emit hook on the event emitter.', () => {
      const eventName = 'test';
      const testValue = 'test_value';
      const emitter = { on: jest.fn(), emit: jest.fn() };
      const wrapper = ({ children }: any) => <EmitterProvider emitter={emitter}>{children}</EmitterProvider>;
      const { result } = renderHook(() => useEmit(eventName), { wrapper });

      act(() => {
         result.current(testValue);
      });

      expect(emitter.emit).toBeCalledWith(eventName, testValue);
   });

   test('returned emit function shuld pass all extra arguments to the emit function of the event emitter.', () => {
      const eventName = 'test';
      const emitter = { on: jest.fn(), emit: jest.fn() };
      const wrapper = ({ children }: any) => <EmitterProvider emitter={emitter}>{children}</EmitterProvider>;
      const { result } = renderHook(() => useEmit(eventName), { wrapper });

      act(() => {
         result.current('arg1', 'arg2', 'arg3');
      });

      expect(emitter.emit).toBeCalledWith(eventName, 'arg1', 'arg2', 'arg3');
   });
});

import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { EmitterProvider, useEvent } from '../src';
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

describe('useEvent.once hook', () => {
   test('should return an array with two items, data which is undefined and the emit function.', () => {
      const { result } = renderHook(() => useEvent.once('test'), { wrapper });

      expect(result.current.length).toBe(2);
      expect(result.current[0]).toBe(undefined);
      expect(typeof result.current[1]).toBe('function');
   });

   test('should return the default value as the data and the emit function.', () => {
      const defaultValue = 'default_value';
      const { result } = renderHook(() => useEvent.once('test', defaultValue), { wrapper });

      expect(result.current[0]).toBe(defaultValue);
      expect(typeof result.current[1]).toBe('function');
   });

   test('returned emit function should call the emit hook on the event emitter.', () => {
      const eventName = 'test';
      const testValue = 'test_value';
      const emitter = { once: jest.fn(), emit: jest.fn() };
      const wrapper = ({ children }: any) => <EmitterProvider emitter={emitter}>{children}</EmitterProvider>;
      const { result } = renderHook(() => useEvent.once(eventName), { wrapper });

      act(() => {
         result.current[1](testValue);
      });

      expect(emitter.emit).toBeCalledWith(eventName, testValue);
   });

   test('returned emit function should not change the data returned from the useEvent hook after first invocation.', () => {
      const defaultValue = 'default_value';
      const newValue = 'new_value';
      const newValue2 = 'new_value_2';
      const wrapper = ({ children }: any) => <EmitterProvider emitter={emitter}>{children}</EmitterProvider>;
      const { result } = renderHook(() => useEvent.once('test', defaultValue), { wrapper });

      expect(result.current[0]).toBe(defaultValue);

      act(() => {
         result.current[1](newValue);
      });

      expect(result.current[0]).toBe(newValue);

      act(() => {
         result.current[1](newValue2);
      });

      expect(result.current[0]).toBe(newValue);
   });

   test('shuld pass all extra arguments to the on function of the event emitter.', () => {
      const eventName = 'test';
      const emitter = { once: jest.fn(), emit: jest.fn() };
      const wrapper = ({ children }: any) => <EmitterProvider emitter={emitter}>{children}</EmitterProvider>;
      renderHook(() => useEvent.once(eventName, null, 'arg1', 'arg2'), { wrapper });

      expect(emitter.once).toBeCalledWith(eventName, expect.anything(), 'arg1', 'arg2');
   });

   test('returned emit function shuld pass all extra arguments to the emit function of the event emitter.', () => {
      const eventName = 'test';
      const emitter = { once: jest.fn(), emit: jest.fn() };
      const wrapper = ({ children }: any) => <EmitterProvider emitter={emitter}>{children}</EmitterProvider>;
      const { result } = renderHook(() => useEvent.once(eventName), { wrapper });
      const [_, emit] = result.current;

      act(() => {
         emit('arg1', 'arg2', 'arg3');
      });

      expect(emitter.emit).toBeCalledWith(eventName, 'arg1', 'arg2', 'arg3');
   });
});

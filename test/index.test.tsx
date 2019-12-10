import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '@testing-library/react';
import { EmitterProvider, useEmitter, useEvent } from '../src';
import EventEmitter from 'events';

test('EmitterProvider, useEmitter and useEvent should be functions', () => {
	expect(typeof EmitterProvider).toBe('function');
	expect(typeof useEmitter).toBe('function');
	expect(typeof useEvent).toBe('function');
});

test('useEvent should have .once() property which is a function', () => {
	expect(typeof useEvent.once).toBe('function');
});

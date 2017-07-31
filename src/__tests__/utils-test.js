/* global describe, it, expect */
import { classNames } from '../utils';

describe('Utils - classNames', () => {
  it('Should return empty string when falsy class names are passed', () => {
    let emptyKlassName;
    let falsyKlassName = false;
    let falsyKlassObject = {
      loading: false,
      pending: false,
      rejected: false,
    };

    expect(classNames(emptyKlassName)).toBe('');
    expect(classNames(falsyKlassName)).toBe('');
    expect(classNames(falsyKlassObject)).toBe('');
    expect(classNames(emptyKlassName, falsyKlassName, falsyKlassObject)).toBe(
      ''
    );
  });

  it('Should return comma separated classes when valid classNames are passed', () => {
    let klassName = 'AsyncButton';
    let klassObject = {
      loading: false,
      pending: true,
      rejected: true,
    };

    expect(classNames(klassName)).toBe('AsyncButton');
    expect(classNames(klassName, klassObject)).toBe(
      'AsyncButton pending rejected'
    );
  });
});

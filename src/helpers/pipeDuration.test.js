import { pipeDuration } from './pipeDuration';

describe('pipeDuration helper', () => {
  test('Should format 160 minutes as "02:40 hours"', () => {
    expect(pipeDuration(160)).toBe('02:40 hours');
  });

  test('Should format 210 minutes as "03:30 hours"', () => {
    expect(pipeDuration(210)).toBe('03:30 hours');
  });

  test('Should format 122 minutes as "02:02 hours"', () => {
    expect(pipeDuration(122)).toBe('02:02 hours');
  });

  test('Should handle 0 minutes correctly', () => {
    expect(pipeDuration(0)).toBe('00:00 hours');
  });

  test('Should handle single digit hours/minutes with leading zeros', () => {
    expect(pipeDuration(65)).toBe('01:05 hours');
    expect(pipeDuration(5)).toBe('00:05 hours');
    expect(pipeDuration(60)).toBe('01:00 hours');
  });
});
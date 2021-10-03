const { humanReadableDuration, simpleDuration } = require('../utils/buildTimeString.js');

test('humanReadableDuration, less than 1 sec', () => {
	expect(humanReadableDuration(764)).toBe('00s');
});

test('humanReadableDuration less than 1 min', () => {
	expect(humanReadableDuration(30 * 1000)).toBe('30s');
});

test('humanReadableDuration, 1 minute', () => {
	expect(humanReadableDuration(60 * 1000)).toBe('01m 00s');
});

test('humanReadableDuration, more than 1 minute', () => {
	expect(humanReadableDuration(65 * 1000)).toBe('01m 04s');
});

test('humanReadableDuration, 1 hour', () => {
	expect(humanReadableDuration(60 * 60 * 1000)).toBe('01h 00s');
});

test('humanReadableDuration, more than 1 hour', () => {
	expect(humanReadableDuration(4125 * 1000)).toBe('01h 08m 44s');
});

test('simpleDuration, less than 1 sec', () => {
	expect(simpleDuration(764)).toBe('1s');
});

test('simpleDuration less than 1 min', () => {
	expect(simpleDuration(30 * 1000)).toBe('30s');
});

test('simpleDuration, 1 minute', () => {
	expect(simpleDuration(60 * 1000)).toBe('1m0s');
});

test('simpleDuration, more than 1 minute', () => {
	expect(simpleDuration(65 * 1000)).toBe('1m5s');
});

test('simpleDuration, 1 hour', () => {
	expect(simpleDuration(60 * 60 * 1000)).toBe('1h0s');
});

test('simpleDuration, more than 1 hour', () => {
	expect(simpleDuration(4125 * 1000)).toBe('1h8m45s');
});

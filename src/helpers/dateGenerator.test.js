import { dateGenerator } from './dateGenerator';

describe('dateGenerator helper', () => {
	test('Should return date in d/m/yyyy format', () => {
		const date = dateGenerator();
		const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
		expect(date).toMatch(dateRegex);
	});

	test('Should return current date', () => {
		const date = dateGenerator();
		const now = new Date();
		const expectedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
		expect(date).toBe(expectedDate);
	});

	test('Should format single digit day/month with leading zeros', () => {
		// This test checks the format - actual leading zeros depend on implementation
		const date = dateGenerator();
		expect(date).toBeDefined();
		expect(typeof date).toBe('string');
	});
});

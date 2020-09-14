const { MarkovMachine } = require('./markov');

describe('Testing markov machine', function() {
	let mm;
	let text;
	beforeEach(function() {
		mm = new MarkovMachine('the dog looks for the cat');
		text = mm.makeText();
	});

	test('Creating Object Chain', function() {
		let res = {
			the: [ 'dog', 'cat' ],
			dog: [ 'looks' ],
			looks: [ 'for' ],
			for: [ 'the' ],
			cat: [ null ]
		};
		expect(mm.chains).toEqual(res);
	});

	test('Testing last word', function() {
		let res = [ null ];
		expect(mm.chains['cat']).toEqual(res);
	});

	test('Test making text', function() {
		expect(text).not.toContain('fish');
		expect(text).toContain('the', 'dog', 'looks', 'for', 'cat');
	});
});

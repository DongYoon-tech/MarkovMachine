/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== '');
		this.makeChains();
	}

	/** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		// TODO

		let chains = {};
		for (let i = 0; i < this.words.length; i++) {
			if (chains[this.words[i]]) {
				if (this.words[i + 1]) {
					chains[this.words[i]].push(this.words[i + 1]);
				} else {
					chains[this.words[i]].push(null);
				}
			} else {
				if (this.words[i + 1]) {
					chains[this.words[i]] = [ this.words[i + 1] ];
				} else {
					chains[this.words[i]] = [ null ];
				}
			}
		}

		this.chains = chains;
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		// TODO

		let text = [];
		let keys = Object.keys(this.chains);
		let val = Object.values(this.chains);
		let rndom = Math.floor(Math.random() * keys.length);
		let rndomKey = keys[rndom];
		text.push(rndomKey);

		while (numWords > 0) {
			if (this.chains[rndomKey].length > 1) {
				let r = Math.floor(Math.random() * this.chains[rndomKey].length);
				if (this.chains[rndomKey][r] != null) {
					text.push(this.chains[rndomKey][r]);
				} else {
					break;
				}
			} else {
				if (this.chains[rndomKey][0] === null) {
					break;
				} else {
					text.push(this.chains[rndomKey][0]);
				}
			}
			rndomKey = text[text.length - 1];
			numWords--;
		}

		let res = text.join(' ');
		return res;
	}
}

module.exports = {
	MarkovMachine
};

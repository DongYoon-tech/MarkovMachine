const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');

function cat(path) {
	fs.readFile(path, 'utf8', function(err, data) {
		if (err) {
			console.error(`Error reading ${path}: ${err}`);
			process.exit(1);
		}
		let mm = new markov.MarkovMachine(data);
		console.log(mm.makeText());
	});
}

async function webCat(path) {
	try {
		let res = await axios.get(path);
		let mm = new markov.MarkovMachine(res.data);
		console.log(mm.makeText());
	} catch (e) {
		console.error(`Error fetching ${path}: ${e}`);
		process.exit(1);
	}
}

if (process.argv[2] == 'file') {
	cat(process.argv[3]);
} else if (process.argv[2] == 'url') {
	webCat(process.argv[3]);
} else {
	console.error('Unknown method');
	process.exit(1);
}

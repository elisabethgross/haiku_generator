var fs = require("fs")
var cmudictfile = readCmuDictFile('./cmudict.txt')

// Stringifys the CMU Dict file
function readCmuDictFile(file) {
	return fs.readFileSync(file).toString()
}

// Parses the CMU dict and returns a syllable array, syllablesArr: each index contains an array of words consisting of [index] syllables
function formatData(data) {
	var lines = data.toString().split("\n"), 
		lineSplit,
		syllablesArr = []

		lines.forEach(function(line) {
			lineSplit = line.split("  ")
			//lineSplit[0] is the word
			//lineSplit[1] is the phoneme
			if (lineSplit[1]) {
				var numSyllables = (lineSplit[1].match(/\d/g)|| []).length;
				var word = lineSplit[0].replace(/\(.\)/g, "")	
				if (syllablesArr[numSyllables] !== undefined) {
					syllablesArr[numSyllables].push(word)
				} else {
					syllablesArr[numSyllables] = []
				}
			}
		})
	return syllablesArr
		
}

formatData(cmudictfile)

function createHaiku(structure, syllablesArr) {
	var wordsArr 
	return structure.map(function(lines) {
		return lines.map(function(syllables) {
			wordsArr = syllablesArr[syllables]
			return wordsArr[Math.floor(Math.random() * wordsArr.length)]
		}).join(" ")
	}).join('\n')
}

module.exports = {
	createHaiku: createHaiku,
	readCmuDictFile: readCmuDictFile,
	formatData: formatData
}



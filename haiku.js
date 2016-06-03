
var fs = require('fs');
var cmudictfile = readCmuDictFile('./cmudict.txt');
var numSyllables = []
var words = []


// Stringifys the CMU Dict file
function readCmuDictFile(file){
  return fs.readFileSync(file).toString(); 
}

// Parses the CMU dict and returns a syllable array: each index contains an array of words consisting of [index] syllables
function formatData(data){   
  //make each line into a string and push to the array lines (an array of strings)
  var lines = data.toString().split("\n"), lineSplit
 
  
  //An array of numbers of syllables in each word (corresponds to the words array so numSyllables[4] is the number of syllables in the word at words[4])
  
  lines.forEach(function(line) { 

    // lineSplit is an array with lineSplit[0] being the word string and lineSplit[1] being the phoneme sting
    lineSplit = line.split("  ");
    
    //take out the (digit) in the words
    var theWord = lineSplit[0].replace(/\(.\)/g, "")  
    words.push(theWord)

    //for each phoneme, count how many numbers are in the string with regex, replace count with phoneme 
    if (lineSplit[1] !== undefined) {
      var phoneme = lineSplit[1]
      if (phoneme !== null) {
        var hello = phoneme.match(/\d/g)
        if (hello !== null) {
        numSyllables.push(hello.length)
        }
      }
    }
  
    
  });    
}

formatData(cmudictfile)

function createHaiku(structure) {
  var haiku = ""
  // structure[i] will equal a number of syllables
  for (var i = 0; i < structure.length; i++) {
    //I need a word with structure[i] number of syllables
    //Find structure[i] in numSyllables
    var theIndex = numSyllables.indexOf(structure[i])
    //var theIndex = What index in numSyllables was structure[i] found?
    haiku += words[theIndex] + "\n"
  }

  console.log(haiku) 

}

module.exports = {
  readCmuDictFile: readCmuDictFile,
  formatData: formatData,
  createHaiku: createHaiku
};
var haiku2 = require('./haiku2')
var cmudictfile = haiku2.readCmuDictFile('./cmudict.txt')
var formattedData = haiku2.formatData(cmudictfile)

console.log(haiku2.createHaiku([[5],[7],[5]], formattedData) + "\n")
console.log(haiku2.createHaiku([[2,3], [1,3,3], [3,2]], formattedData))
console.log("\n" + haiku2.createHaiku([[3,2], [1,3,3], [5]], formattedData))
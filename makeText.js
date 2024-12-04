const fs = require("fs");
const axios = require("axios");
const process = require("process");
const { MarkovMachine } = require("./markov");

/** Generate Markov text */
function generateText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

/** Read file and generate text */
function makeTextFromFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file: ${filePath}\nDetails: ${err.message}`);
      process.exit(1);
    }
    generateText(data);
  });
}

/** Fetch URL and generate text */
async function makeTextFromURL(url) {
  try {
    const response = await axios.get(url);
    generateText(response.data);
  } catch (err) {
    console.error(`Error fetching URL: ${url}\nDetails: ${err.message}`);
    process.exit(1);
  }
}

/** Command-line input handling */
let [sourceType, source] = process.argv.slice(2);

if (sourceType === "file") {
  makeTextFromFile(source);
} else if (sourceType === "url") {
  makeTextFromURL(source);
} else {
  console.error(`Unknown source type: ${sourceType}`);
  process.exit(1);
}

/** Textual Markov chain generator */

class MarkovMachine {
  /** Build Markov machine; read in text */
  constructor(text) {
    let words = text.split(/[ \r\n]+/); // Split by spaces or line breaks
    this.words = words.filter(c => c !== ""); // Remove empty strings
    this.makeChains();
  }

  /** Create Markov chains */
  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null; // Handle end of text with `null`

      if (chains.has(word)) {
        chains.get(word).push(nextWord); // Add next word to the array
      } else {
        chains.set(word, [nextWord]); // Create a new entry
      }
    }

    this.chains = chains; // Save chains to the instance
  }

  /** Pick a random word from an array */
  static choice(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /** Generate random text from chains */
  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys()); // Get all unique words
    let key = MarkovMachine.choice(keys); // Start with a random word
    let out = [];

    while (out.length < numWords && key !== null) {
      out.push(key); // Add word to output
      key = MarkovMachine.choice(this.chains.get(key)); // Choose next word
    }

    return out.join(" "); // Combine words into a string
  }
}

module.exports = { MarkovMachine };

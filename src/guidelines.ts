interface Guideline {
  id: string;
  name: string;
  description: string;
  validate: (text: string) => boolean;
}

export const guidelines: Guideline[] = [
  {
    id: "sentence-case",
    name: "Sentence case",
    description:
      "First character capitalized or number or symbol, rest lowercase",
    validate: (text: string) => {
      if (!text) return true;

      // Split the text into words
      const words = text.split(/\s+/);

      // Check if first word starts correctly (capital letter, number, or currency symbol)
      const firstWord = words[0];
      if (!/^[A-Z0-9₹$€£¥\u20B9]/.test(firstWord)) return false;

      // Fail if all words are uppercase (except for single-word abbreviations)
      if (words.length > 1 && words.every((word) => /^[A-Z]+$/.test(word))) {
        return false;
      }

      // Check remaining words
      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const prevWord = words[i - 1];

        // Allow abbreviated words (all uppercase with optional numbers)
        if (/^[A-Z0-9]+$/.test(word)) continue;

        // Allow currency symbols and numbers
        if (/^[₹$€£¥\u20B9]/.test(word) || /^[0-9]/.test(word)) continue;

        // Allow hyphenated words
        if (word.includes("-")) {
          const parts = word.split("-");
          // First part should be capitalized if it's the first word
          if (i === 0) {
            if (!/^[A-Z][a-z]*$/.test(parts[0])) return false;
          } else {
            // For other words, all parts should be lowercase
            if (!parts.every((part) => /^[a-z]+$/.test(part))) return false;
          }
          continue;
        }

        // Regular words should be lowercase unless they come after a number
        if (prevWord && /^[0-9]/.test(prevWord)) {
          if (!/^[A-Z][a-z]*$/.test(word)) return false;
        } else {
          if (!/^[a-z]+$/.test(word)) return false;
        }
      }

      return true;
    },
  },
  {
    id: "no-trailing-spaces",
    name: "No trailing spaces",
    description: "Text should not have trailing spaces",
    validate: (text: string) => {
      return !/\s$/.test(text);
    },
  },
  {
    id: "no-double-spaces",
    name: "No double spaces",
    description: "Text should not contain double spaces",
    validate: (text: string) => {
      return !/\s{2,}/.test(text);
    },
  },
];

export const validateText = (text: string): Record<string, boolean> => {
  const results: Record<string, boolean> = {};
  guidelines.forEach((guideline) => {
    results[guideline.id] = guideline.validate(text);
  });
  return results;
};

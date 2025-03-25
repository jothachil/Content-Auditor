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
    description: "First letter capitalized, rest lowercase",
    validate: (text: string) => {
      if (!text) return true;
      const firstChar = text.charAt(0);
      const restOfText = text.slice(1);
      return (
        firstChar === firstChar.toUpperCase() &&
        restOfText === restOfText.toLowerCase()
      );
    },
  },
  {
    id: "no-trailing-spaces",
    name: "No trailing spaces",
    description: "Text should not have trailing spaces",
    validate: (text: string) => {
      return !text.endsWith(" ");
    },
  },
  {
    id: "no-double-spaces",
    name: "No double spaces",
    description: "Text should not contain double spaces",
    validate: (text: string) => {
      return !text.includes("  ");
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

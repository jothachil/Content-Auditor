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
    description: "First character capitalized or number, rest lowercase",
    validate: (text: string) => {
      if (!text) return true;
      return /^[A-Z0-9][a-z\s]*$/.test(text);
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

import nlp from "compromise";

interface Guideline {
  id: string;
  name: string;
  description: string;
  validate: (text: string) => boolean;
}

export const guidelines: Guideline[] = [
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
  {
    id: "indian-currency-commas",
    name: "Indian Currency Format",
    description:
      "Numbers representing currency should use the Indian comma separation format (e.g., 1,00,000, not 100,000) for values >= 1000.",
    validate: (text: string) => {
      // Regex to find potential numbers (integer or decimal, possibly with commas, optional Rupee symbol)
      const numberRegex = /\b(?:₹\s*)?((\d{1,3}(?:,\d+)*|\d+)(?:\.\d+)?)\b/g;
      // Regex for valid Indian comma format for the integer part (e.g., 1,000, 10,000, 1,00,000)
      const indianCommaIntRegex =
        /^(\d{1,3}(?:,\d{3})?$|^\d{1,2}(?:,\d{2})*,\d{3})$/;

      let match;
      while ((match = numberRegex.exec(text)) !== null) {
        const fullNumberString = match[1]; // The full number string e.g., "1,00,000.50" or "500"

        let intPart = fullNumberString;
        const decimalPointIndex = fullNumberString.indexOf(".");
        if (decimalPointIndex !== -1) {
          intPart = fullNumberString.substring(0, decimalPointIndex);
        }

        // Remove potential currency symbol for parsing (though regex partly handles placement)
        const cleanIntPart = intPart.startsWith("₹")
          ? intPart.substring(1).trim()
          : intPart;
        // Check for empty string after removing symbol, skip if so
        if (!cleanIntPart) continue;

        const numberValue = parseFloat(cleanIntPart.replace(/,/g, ""));

        if (isNaN(numberValue)) {
          continue; // Skip if parsing failed
        }

        if (cleanIntPart.includes(",")) {
          // If commas are present, it must match the Indian format
          if (!indianCommaIntRegex.test(cleanIntPart)) {
            return false; // Found an invalid number format
          }
        } else {
          // If no commas are present, the number value must be less than 1000
          if (numberValue >= 1000) {
            return false; // Found a number >= 1000 missing commas
          }
        }
      }
      return true; // All found numbers were valid according to the rule
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

import { guidelines, validateText } from "./guidelines";

describe("Guidelines Validation", () => {
  describe("Sentence case validation", () => {
    const sentenceCaseRule = guidelines.find((g) => g.id === "sentence-case")!;

    test("should pass for valid sentence case", () => {
      expect(sentenceCaseRule.validate("Hello world")).toBe(true);
      expect(sentenceCaseRule.validate("₹100 is the price")).toBe(true);
    });

    test("should pass for hyphenated words", () => {
      expect(sentenceCaseRule.validate("Self-service portal")).toBe(true);
      expect(sentenceCaseRule.validate("User-friendly interface")).toBe(true);
    });

    test("should fail for invalid sentence case", () => {
      expect(sentenceCaseRule.validate("hello world")).toBe(false);
      expect(sentenceCaseRule.validate("Hello World")).toBe(false);
      expect(sentenceCaseRule.validate("HELLO WORLD")).toBe(false);
      expect(sentenceCaseRule.validate("123 main street")).toBe(false);
    });
  });

  describe("No trailing spaces validation", () => {
    const noTrailingSpacesRule = guidelines.find(
      (g) => g.id === "no-trailing-spaces"
    )!;

    test("should pass for text without trailing spaces", () => {
      expect(noTrailingSpacesRule.validate("Hello world")).toBe(true);
      expect(noTrailingSpacesRule.validate("")).toBe(true);
      expect(
        noTrailingSpacesRule.validate("Multiple   spaces   in   between")
      ).toBe(true);
    });

    test("should fail for text with trailing spaces", () => {
      expect(noTrailingSpacesRule.validate("Hello world ")).toBe(false);
      expect(noTrailingSpacesRule.validate("Multiple spaces at end   ")).toBe(
        false
      );
      expect(noTrailingSpacesRule.validate(" ")).toBe(false);
    });
  });

  describe("No double spaces validation", () => {
    const noDoubleSpacesRule = guidelines.find(
      (g) => g.id === "no-double-spaces"
    )!;

    test("should pass for text without double spaces", () => {
      expect(noDoubleSpacesRule.validate("Hello world")).toBe(true);
      expect(noDoubleSpacesRule.validate("")).toBe(true);
      expect(noDoubleSpacesRule.validate("Single space between words")).toBe(
        true
      );
    });

    test("should fail for text with double spaces", () => {
      expect(noDoubleSpacesRule.validate("Hello  world")).toBe(false);
      expect(noDoubleSpacesRule.validate("Multiple   spaces   here")).toBe(
        false
      );
      expect(noDoubleSpacesRule.validate("  ")).toBe(false);
    });
  });

  describe("validateText function", () => {
    test("should return validation results for all rules", () => {
      const results = validateText("Hello world");
      expect(results).toHaveProperty("sentence-case");
      expect(results).toHaveProperty("no-trailing-spaces");
      expect(results).toHaveProperty("no-double-spaces");
      expect(results["sentence-case"]).toBe(true);
      expect(results["no-trailing-spaces"]).toBe(true);
      expect(results["no-double-spaces"]).toBe(true);
    });

    test("should handle empty string", () => {
      const results = validateText("");
      expect(results["sentence-case"]).toBe(true);
      expect(results["no-trailing-spaces"]).toBe(true);
      expect(results["no-double-spaces"]).toBe(true);
    });

    test("should handle invalid text", () => {
      const results = validateText("hello  world ");
      expect(results["sentence-case"]).toBe(false);
      expect(results["no-trailing-spaces"]).toBe(false);
      expect(results["no-double-spaces"]).toBe(false);
    });
  });
});

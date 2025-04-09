![Content Auditor Cover](https://res.cloudinary.com/drch6exvq/image/upload/v1744178659/Plugin/content-audit.jpg)

# Content Auditor

A Figma plugin to audit and validate text layers in your designs based on UX writing and content guidelines.

## Features

- **Text Layer Auditing**: Scan selected frames, groups, or sections to identify all text layers
- **Content Guidelines**: Validate text against common UX writing standards:
  - Sentence case formatting
  - No trailing spaces
  - No double spaces
- **Visual Reporting**: Clear visual indicators for passing or failing text layers
- **Text Style Analysis**: Identify text layers with or without proper text styles applied
- **Layer Navigation**: Quick select and zoom to specific text layers for editing
- **Filtering Options**: Filter text by:
  - Guidelines status (passing/failing)
  - Text style usage
  - Visibility state (visible/hidden)

## Adding Custom Guidelines

The Content Auditor is designed to be easily extensible with new content guidelines. If you need to add custom validation rules based on your organization's requirements, follow these steps:

### 1. Edit the `guidelines.ts` file

Open the `src/guidelines.ts` file and add your new guideline to the array:

```typescript
export const guidelines: Guideline[] = [
  // Existing guidelines
  {
    id: "sentence-case",
    name: "Sentence case",
    description:
      "First character capitalized or number or symbol, rest lowercase",
    validate: (text: string) => {
      if (!text) return true;
      return /^[A-Z0-9₹$€£¥\u20B9][\sa-z0-9₹$€£¥\u20B9]*$/.test(text);
    },
  },
  // ... other existing guidelines ...

  // Your new custom guideline
  {
    id: "your-guideline-id",
    name: "Your Guideline Name",
    description: "Description of what this guideline checks for",
    validate: (text: string) => {
      // Your validation logic here, returning true if passing, false if failing
      return yourValidationFunction(text);
    },
  },
];
```

### 2. Create your validation function

Each guideline requires a `validate` function that:

- Takes a string as input (the text from a Figma text layer)
- Returns a boolean (true if the text passes the guideline, false if it fails)

You can implement your validation using:

- Regular expressions (for pattern matching)
- JavaScript string methods
- Custom logic based on your requirements

### 3. Common validation patterns

Here are some example patterns for common content guidelines:

```typescript
// No more than 150 characters
{
  id: "max-length",
  name: "Maximum Length",
  description: "Text should not exceed 150 characters",
  validate: (text: string) => text.length <= 150,
}

// Must contain specific keywords
{
  id: "required-keywords",
  name: "Required Keywords",
  description: "Must contain at least one of the required keywords",
  validate: (text: string) => {
    const keywords = ["important", "notice", "warning"];
    return keywords.some(keyword => text.toLowerCase().includes(keyword));
  },
}

// No jargon or technical terms
{
  id: "no-jargon",
  name: "No Technical Jargon",
  description: "Avoid technical terminology",
  validate: (text: string) => {
    const jargonTerms = ["frontend", "backend", "API", "SDK"];
    return !jargonTerms.some(term => text.includes(term));
  },
}
```

### 4. Rebuild the plugin

After adding your new guidelines, rebuild the plugin:

```bash
pnpm build
```

Then reload the plugin in Figma to see your new guidelines in action.

## Installation

1. In Figma, click on **Plugins** in the menu
2. Search for "Content Auditor"
3. Click **Install**

## Usage

1. Select one or more frames, groups, or sections in your Figma document
2. Run the Content Auditor plugin
3. Review the list of text layers and their validation status
4. Click on any text layer to select and zoom to it in your document
5. Use the filter options to focus on specific issues

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.19.0 recommended)
- [PNPM](https://pnpm.io/) (v7.28.0 recommended)

### Setup

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd content-auditor

# Install dependencies
pnpm install
```

### Development Commands

```bash
# Start development mode with hot reload
pnpm dev

# Build for production
pnpm build
```

### Project Structure

- `/src` - Source code
  - `api.ts` - Plugin API implementation
  - `code.ts` - Plugin entry point
  - `ui.tsx` - UI implementation with React
  - `guidelines.ts` - Content validation rules
  - `/components` - React components
- `/dist` - Build output

## Contributing

Contributions are welcome! If you'd like to add new guidelines, improve the UI, or fix bugs:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

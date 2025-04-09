![Content Auditor Cover](https://res.cloudinary.com/drch6exvq/image/upload/v1744178659/Plugin/content-audit.jpg)

# Content Auditor

A Figma plugin to audit and validate text layers in your designs based on UX writing and content guidelines.

## Features

- 🔍 **Text Layer Auditing**: Scan selected frames, groups, or sections to identify all text layers
- 📝 **Content Guidelines**: Validate text against common UX writing standards:
- ✅ **Visual Reporting**: Clear visual indicators for passing or failing text layers
- 🎨 **Text Style Analysis**: Identify text layers with or without proper text styles applied
- 🎯 **Layer Navigation**: Quick select and zoom to specific text layers for editing
- 🔎 **Filtering Options**: Filter text by:
  - Guidelines status (passing/failing)
  - Text style usage
  - Visibility state (visible/hidden)

## Installation

### Project Setup

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd content-auditor

# Install dependencies
pnpm install

# Start development mode with hot reload
pnpm dev
```

### Install Figma Plugin

1. In Figma, right-click in workspace and click **Plugins** > **Development** > **Import from manifest**
2. Select the manifest file from the repository

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

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.19.0 recommended)
- [PNPM](https://pnpm.io/) (v7.28.0 recommended)

## Contributing

Contributions are welcome! If you'd like to add new guidelines, improve the UI, or fix bugs:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

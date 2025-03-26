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

## Acknowledgments

- Built with React and TypeScript
- Styled with TailwindCSS
- Created by John Thachil

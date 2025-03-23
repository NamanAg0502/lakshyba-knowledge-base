# Legal Knowledge Base UI

A modern web application for searching, viewing, and managing legal documents built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- **Enhanced Document Viewer**: Optimized viewer for PDF and other document types with lazy loading
- **Semantic Search**: Advanced search capabilities with customizable weights
- **Modern UI**: Intuitive interface with subtle animations and seamless transitions
- **Responsive Design**: Works on all device sizes from mobile to desktop
- **Dark Mode Support**: Automatic theme detection and manual toggle
- **Performance Optimized**: Code splitting, dynamic imports, and optimized rendering

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd legal-tech/frontend/knowledge-base-ui
```

2. Install dependencies

```bash
pnpm install
```

3. Start the development server

```bash
pnpm dev
```

4. Open your browser and navigate to http://localhost:3000

### Production Build

```bash
pnpm build
pnpm start
```

## Document Viewer Integration

The application includes an enhanced document viewer that supports various document types with optimized loading for large files.

### Supported Document Types

- PDF files (with full search, navigation, and annotation capabilities)
- DOCX files (with basic preview)
- Other document types (with download option)

### PDF Viewer Features

The PDF viewer component (`EnhancedDocumentViewer.tsx`) provides:

- Lazy loading for better performance
- Text search functionality
- Page navigation
- Mobile optimization
- File size detection and warnings for large files
- Loading states and error handling

### Adding New Document Types

To add support for a new document type:

1. Create a new viewer component in `src/components/documents/`
2. Update the `UniversalDocumentViewer.tsx` to include the new document type detection
3. Register the file extension in the `getViewerComponent` function

## Project Structure

```
src/
├── app/             # Next.js app router routes
│   ├── (root)/      # Main application routes
│   └── globals.css  # Global CSS styles
├── components/      # React components
│   ├── documents/   # Document-related components
│   ├── layout/      # Layout components (Navbar, Footer)
│   ├── search/      # Search-related components
│   └── ui/          # UI components (shadcn)
├── lib/             # Utility functions, types, and API services
└── public/          # Static assets
```

## Key Components

- `UniversalDocumentViewer`: Main document viewer that selects the appropriate viewer based on file type
- `EnhancedDocumentViewer`: PDF viewer with advanced features
- `DocxViewer`: Basic DOCX document viewer
- `SearchForm`: Advanced search form with filters
- `SearchResults`: Results display with highlighting

## Dependencies

- **Next.js**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI component library
- **Framer Motion**: Animations
- **@react-pdf-viewer**: PDF viewing capabilities
- **Heroicons**: Icon set
- **date-fns**: Date formatting

## Performance Optimization

The document viewer has been optimized for performance through:

1. Dynamic imports and code splitting
2. Lazy loading of heavy components
3. Virtualized rendering for large documents
4. Suspense boundaries for loading states
5. Memory management for large files
6. Progressive loading for better perceived performance

## Contributing

Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on contributing to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

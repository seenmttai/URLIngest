# URLIngest - Web Content Aggregation Suite

[![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)](https://github.com/seenmttai/urlingest)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/seenmttai/URLIngest/blob/master/LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://urlingest.pages.dev)

A comprehensive toolkit for web content aggregation, analysis, and preparation for Large Language Models (LLMs).

![URLIngest Demo](https://urlingest.pages.dev/assets/demo.gif)

## Features

### Core Functionality
- **Multi-Format Ingestion**
  - Drag & Drop URL management
  - Bulk content parsing
  - Pattern-based URL generation (e.g., `page-[number]`)
- **Content Processing**
  - Text-only extraction with smart filtering
  - Raw HTML source code retrieval
  - Deep parsing with configurable depth
- **Output Management**
  - Individual or bulk content copying
  - Editable link management
  - Real-time parsing status

### Specialized Tools
- **Research Assistant**
  - ArXiv paper discovery & summarization
  - Multi-level explanation styles
  - Literature review generation
- **Security Scanner**
  - Automated vulnerability detection
  - Code analysis through LLMs
  - Progressive scanning controls

## Getting Started

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Edge 90+)
- Internet connection

### Installation
```bash
git clone https://github.com/seenmttai/urlingest.git
cd urlingest
python3 -m http.server 8000
```

Access via:
- Live Website: `https://urlingest.pages.dev`
- Local file: `file:///path/to/index.html`
- Local server: `http://localhost:8000`

## Usage

### Basic Workflow
1. Add URLs via drag & drop or manual input
2. Choose processing mode:
   - **Text Mode**: Clean content extraction
   - **Source Mode**: Raw HTML inspection
3. Configure filters and parsing depth
4. Parse and export content to clipboard

![Interface Overview](https://urlingest.pages.dev/assets/interface.png)

## Research Tools

### ArXiv Assistant
- 150+ research categories
- Automatic paper discovery
- Adaptive summarization:
  - Technical deep dives
  - Layman explanations
  - Literature reviews

### Security Scanner
- Automated vulnerability detection
- Real-time code analysis
- Progressive result reporting

## Contributing

We welcome contributions! Please follow these guidelines:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments
- Inspired by Gitingest
- CORS proxy services
- Cloudflare worker and pages
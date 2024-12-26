# URLIngest: Feeding Entire Web Pages or Docs to LLMs Made Easy

URLIngest is a simple web application inspired by Gitingest, designed to facilitate the easy ingestion of entire web pages or documents into Large Language Models (LLMs).  It allows users to collect and consolidate content from multiple sources into a single, easily copyable format, perfect for feeding into LLMs for analysis, summarization, translation, and other tasks.

## Key Features

* **Drag and Drop or Manual URL Entry:** Add URLs via simple drag and drop or by typing/pasting them into the input field.
* **Bulk Content Parsing:**  URLIngest fetches and displays the content of multiple web pages concurrently.
* **Deep Parsing (Crawling):**  Explore links within the initially provided URLs to extract content from interconnected pages. Control the depth and scope of the crawl.
* **Text-Only Mode:** Extract clean text content from web pages, stripping away HTML, JavaScript, and common navigation elements. Customizable filters are available to further refine the extracted text.
* **Source Code Mode:** Retrieve and display the raw HTML source code of web pages. 
* **Copy Functionality:** Easily copy the content of individual pages or the entire aggregated content to your clipboard.
* **Editable Links:** Modify URLs after they've been added to the list.
* **Parsing Status Display:**  Real-time updates on the parsing progress for each URL.
* **Error Handling:** Gracefully handles errors during content fetching, providing informative messages.

## Use Cases

* **Accurate Scraping Applications:** Feed entire website source code to LLMs for creating precise web scraping tools.
* **Document Analysis and Summarization:**  Analyze lengthy documents or compile information from multiple web pages for quick summarization by an LLM.
* **Website Translation:**  Extract all text content from a website and feed it to an LLM for translation into another language.
* **Content Generation:**  Use scraped content as a seed for LLM-powered content generation, creating articles, summaries, or other forms of text.
* **Code Analysis and Documentation:**  Feed entire code repositories or documentation sites to LLMs to generate summaries, explanations, or identify potential issues.
* **Competitive Analysis:** Analyze the content of competitor websites to gain insights into their strategies, messaging, and offerings.
* **Data Mining for Research:** Extract relevant data from various sources for research.

## How to Use

1. Open the `index.html` file in your web browser.
2. Drag and drop links onto the designated drop zone, or manually enter URLs into the input field and click "Add Link."
3. Choose between "Text Only" mode or "Source Code" mode.  Adjust filter and source code settings as needed.
4. Click "Parse Links Content" to scrape the content of the provided URLs.  Use "Deep Parse" to crawl linked pages.
5. Copy individual page content using the "Copy Content" button or copy all aggregated content using "Copy All Content."

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.


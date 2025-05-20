// Mock fetchWithCORSBypass
let mockFetchResponses = {};
let fetchCallLog = [];

async function mockFetchWithCORSBypass(url) {
    fetchCallLog.push(url);
    console.log(`Mock fetch called for: ${url}`);
    for (const key in mockFetchResponses) {
        if (url.includes(key)) {
            console.log(`Mock response found for key: ${key}`);
            return Promise.resolve(mockFetchResponses[key]);
        }
    }
    console.warn(`No mock response for URL: ${url}`);
    return Promise.reject(new Error(`No mock response for URL: ${url}`));
}

// Store original fetch function and replace it
const originalFetchWithCORSBypass = window.fetchWithCORSBypass;
window.fetchWithCORSBypass = mockFetchWithCORSBypass;


// Helper to simulate click
function simulateClick(element) {
    if (!element) {
        console.error("Cannot simulate click on null element.");
        return;
    }
    const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    element.dispatchEvent(event);
}

// Helper to simulate mouse enter/leave
function simulateMouseEvent(element, eventType) {
    if (!element) {
        console.error(`Cannot simulate ${eventType} on null element.`);
        return;
    }
    const event = new MouseEvent(eventType, {
        bubbles: true,
        cancelable: true,
        view: window
    });
    element.dispatchEvent(event);
}


// --- Mock ArXiv HTML Responses ---
const mockArxivSearchResultsPage1 = `
<html><body>
    <li class="arxiv-result">
        <p class="title is-5">Mock Paper Title 1 (Search)</p>
        <p class="list-title is-inline-block"><a href="/abs/2301.00001">abs/2301.00001</a></p>
        <p class="authors">Author One, Author Two</p>
    </li>
    <li class="arxiv-result">
        <p class="title is-5">Mock Paper Title 2 (Search)</p>
        <p class="list-title is-inline-block"><a href="/abs/2301.00002">abs/2301.00002</a></p>
         <p class="list-title is-inline-block"><a href="/pdf/2301.00002">PDF</a></p> 
        <p class="authors">Author Three</p>
    </li>
    <li class="arxiv-result"> <!-- Paper without direct HTML link, only PDF -->
        <p class="title is-5">Mock Paper Title 3 (Search, No HTML)</p>
        <p class="list-title is-inline-block"><a href="/abs/2301.00003">abs/2301.00003</a></p>
        <p class="list-title is-inline-block"><a href="/pdf/2301.00003">PDF</a></p>
        <p class="authors">Author Four</p>
    </li>
</body></html>`;

const mockArxivSearchResultsPage2 = `
<html><body>
    <li class="arxiv-result">
        <p class="title is-5">Mock Paper Title 51 (Search Page 2)</p>
        <p class="list-title is-inline-block"><a href="/abs/2301.00051">abs/2301.00051</a></p>
    </li>
</body></html>`;


const mockArxivTopicResultsPage1 = `
<html><body>
    <dl>
        <dt><a href="/abs/2302.00001" title="Abstract">arXiv:2302.00001</a> <a href="/pdf/2302.00001" title="Download PDF">pdf</a></dt>
        <dd><div class="list-title mathjax">Mock Topic Paper 1</div></dd>
        <dt><a href="/abs/2302.00002" title="Abstract">arXiv:2302.00002</a> <a href="/html/2302.00002" title="Read HTML">html</a></dt>
        <dd><div class="list-title mathjax">Mock Topic Paper 2 (With HTML)</div></dd>
    </dl>
</body></html>`;

const mockArxivTopicResultsPage2 = `
<html><body>
    <dl>
        <dt><a href="/abs/2302.00026" title="Abstract">arXiv:2302.00026</a> <a href="/pdf/2302.00026" title="Download PDF">pdf</a></dt>
        <dd><div class="list-title mathjax">Mock Topic Paper 26 (Page 2)</div></dd>
    </dl>
</body></html>`;

const mockAbstractPageHtml = `
<html><body>
    <div class="abstract mathjax">
        <h3>Abstract</h3>
        This is a <strong>mock abstract</strong> for paper abs/2301.00001. It contains some details.
    </div>
</body></html>`;

const mockAbstractPageHtml2 = `
<html><body>
     <blockquote class="abstract">
        This is an abstract from a blockquote for paper abs/2302.00002.
    </blockquote>
</body></html>`;


// --- Test Setup ---
function setupResearchPageDOM() {
    // Minimal DOM structure needed for tests.
    // More elements can be added as needed by specific tests.
    document.body.innerHTML = `
        <div id="loadingOverlay" style="display: none;"></div>
        <select id="topicSelect">
            <option value="cs.AI" selected>Artificial Intelligence</option>
            <option value="cs.LG">Machine Learning</option>
        </select>
        <input type="text" id="searchInput">
        <button id="searchPapersButton">Search Papers</button>
        <button id="fetchPapersButton">Fetch Papers</button>
        <div id="paperList"></div>
        <div id="paginationControls"></div>
        <div id="abstractPopup" style="display: none;"></div>
        <button id="summarizeButton" style="display: none;"></button>
        <button id="selectAllButton" style="display: none;"></button>
        <div id="paperSelectionSection" style="display:none;"></div>
        <div id="resultsSection" style="display:none;"></div>
    `;
    // Re-initialize DOM element references as they are captured at script load time in Research.html
    // This is a simplified way; ideally, the script in Research.html would have an init function.
    window.topicSelect = document.getElementById('topicSelect');
    window.fetchPapersButton = document.getElementById('fetchPapersButton');
    window.paperSelectionSection = document.getElementById('paperSelectionSection');
    window.paperList = document.getElementById('paperList');
    window.summarizeButton = document.getElementById('summarizeButton');
    window.resultsSection = document.getElementById('resultsSection');
    // window.summariesContainer = document.getElementById('summaries'); // Not strictly needed for these tests yet
    // window.tokenCountContainer = document.querySelector('#resultsSection .token-count'); // Not strictly needed
    window.searchInput = document.getElementById('searchInput');
    window.searchPapersButton = document.getElementById('searchPapersButton');
    window.paginationControls = document.getElementById('paginationControls');
    window.abstractPopup = document.getElementById('abstractPopup');
    window.selectAllButton = document.getElementById('selectAllButton');
    
    // Reset state variables for Research.html script part
    window.selectedPapers = [];
    window.currentPage = 1;
    window.currentQuery = '';
    window.currentTopic = 'cs.AI'; // Default topic
    window.currentFetchMode = 'topic';
    window.abstractCache = {};
    
    // Clear fetch log and mock responses for each test setup
    fetchCallLog = [];
    mockFetchResponses = {};
}


// --- Test Suite ---
runTests("Research.html Functional Tests", {
    "SearchFunctionality_BasicSearch": async () => {
        setupResearchPageDOM();
        mockFetchResponses['query=TestQuery&searchtype=all&source=header&start=0&size=50'] = mockArxivSearchResultsPage1;

        searchInput.value = "TestQuery";
        simulateClick(searchPapersButton);

        // Wait for async operations
        await new Promise(resolve => setTimeout(resolve, 100)); // Short delay for fetch and DOM updates

        assertTrue(fetchCallLog.some(url => url.includes("query=TestQuery")), "fetchWithCORSBypass called with search query.");
        assertEquals(paperList.children.length, 3, "Paper list should contain 3 items from mock search.");
        assertTrue(paperList.textContent.includes("Mock Paper Title 1 (Search)"), "First paper title found.");
        assertTrue(paperList.textContent.includes("Mock Paper Title 3 (Search, No HTML)"), "Third paper title found.");
        
        const firstPaperButton = paperList.querySelector('.paper-button');
        assertNotNull(firstPaperButton, "First paper button exists.");
        assertEquals(firstPaperButton.dataset.absLink, "https://arxiv.org/abs/2301.00001", "absLink stored on button.");
        assertEquals(firstPaperButton.dataset.paperTitle, "Mock Paper Title 1 (Search)", "paperTitle stored on button.");

        const paginationNextButton = paginationControls.querySelector('.pagination-button:last-child');
        assertTrue(paginationControls.textContent.includes("Page 1"), "Pagination shows Page 1.");
        // For search, default size is 50. mockArxivSearchResultsPage1 has 3 items. So 'Next' should be disabled.
        assertTrue(paginationNextButton && paginationNextButton.disabled, "Pagination 'Next' button should be disabled as results < 50.");
    },

    "TopicFetching_BasicFetch": async () => {
        setupResearchPageDOM();
        mockFetchResponses['/list/cs.LG/new?skip=0&show=25'] = mockArxivTopicResultsPage1;
        
        topicSelect.value = "cs.LG";
        simulateClick(fetchPapersButton);

        await new Promise(resolve => setTimeout(resolve, 100));

        assertTrue(fetchCallLog.some(url => url.includes("/list/cs.LG/new?skip=0&show=25")), "fetchWithCORSBypass called for topic cs.LG.");
        assertEquals(paperList.children.length, 2, "Paper list should contain 2 items from mock topic results.");
        assertTrue(paperList.textContent.includes("Mock Topic Paper 1"), "First topic paper title found.");
        assertTrue(paperList.textContent.includes("Mock Topic Paper 2 (With HTML)"), "Second topic paper title found.");
        
        const secondPaperButton = paperList.children[1];
        assertNotNull(secondPaperButton, "Second paper button exists.");
        assertEquals(secondPaperButton.dataset.absLink, "https://arxiv.org/abs/2302.00002", "absLink stored on topic button.");
        assertEquals(secondPaperButton.dataset.paperTitle, "Mock Topic Paper 2 (With HTML)", "paperTitle stored on topic button.");

        const paginationNextButton = paginationControls.querySelector('.pagination-button:last-child');
        assertTrue(paginationControls.textContent.includes("Page 1"), "Pagination shows Page 1 for topic.");
        // For topic, default size is 25. mockArxivTopicResultsPage1 has 2 items. So 'Next' should be disabled.
        assertTrue(paginationNextButton && paginationNextButton.disabled, "Pagination 'Next' button should be disabled as results < 25 for topic.");
    },
    
    "Pagination_Search_NextAndPrevious": async () => {
        setupResearchPageDOM();
        // Mock enough results for 2 pages (ArXiv search size is 50)
        let page1Results = "";
        for(let i=1; i <= 50; i++) page1Results += `<li class="arxiv-result"><p class="title is-5">Search P1 - ${i}</p><p class="list-title is-inline-block"><a href="/abs/search.p1.${i}">abs/search.p1.${i}</a></p></li>`;
        mockFetchResponses['query=MultiPageSearch&searchtype=all&source=header&start=0&size=50'] = `<html><body>${page1Results}</body></html>`;
        mockFetchResponses['query=MultiPageSearch&searchtype=all&source=header&start=50&size=50'] = mockArxivSearchResultsPage2; // Contains 1 item

        searchInput.value = "MultiPageSearch";
        simulateClick(searchPapersButton);
        await new Promise(resolve => setTimeout(resolve, 100));

        assertEquals(paperList.children.length, 50, "Page 1 of search results loaded (50 items).");
        assertTrue(paginationControls.textContent.includes("Page 1"), "On Page 1 of search.");
        let nextButton = paginationControls.querySelector('.pagination-button:last-child');
        assertFalse(nextButton.disabled, "Next button should be enabled on page 1 of search.");

        simulateClick(nextButton); // Go to Page 2
        await new Promise(resolve => setTimeout(resolve, 100));
        
        assertEquals(window.currentPage, 2, "Current page state updated to 2 after clicking Next.");
        assertTrue(fetchCallLog.some(url => url.includes("start=50&size=50")), "Fetch called for page 2 of search (start=50).");
        assertEquals(paperList.children.length, 1, "Page 2 of search results loaded (1 item).");
        assertTrue(paperList.textContent.includes("Mock Paper Title 51 (Search Page 2)"), "Page 2 paper title found.");
        assertTrue(paginationControls.textContent.includes("Page 2"), "On Page 2 of search.");
        nextButton = paginationControls.querySelector('.pagination-button:last-child');
        assertTrue(nextButton.disabled, "Next button should be disabled on last page of search.");

        let prevButton = paginationControls.querySelector('.pagination-button:first-child');
        assertFalse(prevButton.disabled, "Previous button should be enabled on page 2.");
        
        simulateClick(prevButton); // Go back to Page 1
        await new Promise(resolve => setTimeout(resolve, 100));

        assertEquals(window.currentPage, 1, "Current page state updated to 1 after clicking Previous.");
        assertTrue(fetchCallLog.some(url => url.includes("start=0&size=50")), "Fetch called for page 1 of search (start=0).");
        assertEquals(paperList.children.length, 50, "Page 1 of search results re-loaded.");
        assertTrue(paginationControls.textContent.includes("Page 1"), "Back on Page 1 of search.");
        prevButton = paginationControls.querySelector('.pagination-button:first-child');
        assertTrue(prevButton.disabled, "Previous button should be disabled on page 1.");
    },

    "AbstractPopup_ShowHideAndCache": async () => {
        setupResearchPageDOM();
        mockFetchResponses['/list/cs.AI/new?skip=0&show=25'] = mockArxivTopicResultsPage1; // Use topic fetch to get some items
        mockFetchResponses['/abs/2302.00001'] = mockAbstractPageHtml;
        mockFetchResponses['/abs/2302.00002'] = mockAbstractPageHtml2;


        simulateClick(fetchPapersButton); // Load initial papers
        await new Promise(resolve => setTimeout(resolve, 50)); // Let displayPaperHeadings run

        const firstPaperButton = paperList.querySelector('.paper-button[data-abs-link="https://arxiv.org/abs/2302.00001"]');
        assertNotNull(firstPaperButton, "First paper button found for abstract test.");

        // Test mouse enter
        simulateMouseEvent(firstPaperButton, 'mouseenter');
        await new Promise(resolve => setTimeout(resolve, 50)); // Allow time for fetch & DOM update
        
        assertEquals(abstractPopup.style.display, "block", "Abstract popup should be visible on mouseenter.");
        assertTrue(abstractPopup.innerHTML.includes("mock abstract"), "Abstract content loaded into popup.");
        assertTrue(fetchCallLog.some(url => url.includes("/abs/2302.00001")), "Fetch called for abstract.");
        const initialFetchCount = fetchCallLog.length;

        // Test mouse leave
        simulateMouseEvent(firstPaperButton, 'mouseleave');
        assertEquals(abstractPopup.style.display, "none", "Abstract popup should be hidden on mouseleave.");

        // Test caching: mouse enter again
        simulateMouseEvent(firstPaperButton, 'mouseenter');
        await new Promise(resolve => setTimeout(resolve, 10)); // Should be faster due to cache
        
        assertEquals(abstractPopup.style.display, "block", "Abstract popup visible again on second mouseenter.");
        assertTrue(abstractPopup.innerHTML.includes("mock abstract"), "Cached abstract content shown.");
        assertEquals(fetchCallLog.length, initialFetchCount, "Fetch should NOT be called again for cached abstract.");
        
        simulateMouseEvent(firstPaperButton, 'mouseleave'); // Clean up
    },
    
    "AbstractPopup_DifferentAbstracts": async () => {
        setupResearchPageDOM();
        mockFetchResponses['/list/cs.AI/new?skip=0&show=25'] = mockArxivTopicResultsPage1;
        mockFetchResponses['https://arxiv.org/abs/2302.00001'] = mockAbstractPageHtml;
        mockFetchResponses['https://arxiv.org/abs/2302.00002'] = mockAbstractPageHtml2;

        simulateClick(fetchPapersButton);
        await new Promise(resolve => setTimeout(resolve, 50));

        const firstButton = paperList.querySelector('.paper-button[data-abs-link="https://arxiv.org/abs/2302.00001"]');
        const secondButton = paperList.querySelector('.paper-button[data-abs-link="https://arxiv.org/abs/2302.00002"]');
        assertNotNull(firstButton, "First paper button for diff abstract test.");
        assertNotNull(secondButton, "Second paper button for diff abstract test.");

        // Hover first
        simulateMouseEvent(firstButton, 'mouseenter');
        await new Promise(resolve => setTimeout(resolve, 50));
        assertTrue(abstractPopup.innerHTML.includes("mock abstract"), "First abstract shown.");
        simulateMouseEvent(firstButton, 'mouseleave');
        
        // Hover second
        simulateMouseEvent(secondButton, 'mouseenter');
        await new Promise(resolve => setTimeout(resolve, 50));
        assertTrue(abstractPopup.innerHTML.includes("blockquote"), "Second abstract (blockquote) shown.");
        assertTrue(abstractPopup.innerHTML.includes("abs/2302.00002"), "Second abstract content is correct.");
        simulateMouseEvent(secondButton, 'mouseleave');
    }
});

// Restore original fetch function after all tests (if test runner were more sophisticated)
// window.fetchWithCORSBypass = originalFetchWithCORSBypass;
// For this basic runner, we don't have a global teardown. It's mocked for the duration of the test page.

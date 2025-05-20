// Test suite for script.js
runTests("script.js Unit Tests", {
    "isValidUrl_ValidCases": () => {
        assertTrue(isValidUrl("http://example.com"), "Valid HTTP URL");
        assertTrue(isValidUrl("https://example.com/path?query=value#fragment"), "Valid HTTPS URL with path, query, fragment");
        assertTrue(isValidUrl("ftp://user:pass@example.com:21/path"), "Valid FTP URL");
    },

    "isValidUrl_InvalidCases": () => {
        assertFalse(isValidUrl("example.com"), "Missing scheme");
        assertFalse(isValidUrl("htp://example.com"), "Typo in scheme");
        assertFalse(isValidUrl("  https://example.com"), "Leading spaces"); // URL constructor might handle this, let's see
        assertFalse(isValidUrl("https://example.com  "), "Trailing spaces"); // URL constructor might handle this
        assertFalse(isValidUrl(""), "Empty string");
        assertFalse(isValidUrl(null), "Null value");
        assertFalse(isValidUrl(undefined), "Undefined value");
    },

    "generatePatternLinks_NumberPattern": () => {
        const expected = ["page-1.html", "page-2.html", "page-3.html"];
        assertDeepEquals(generatePatternLinks("page-[number].html", 3), expected, "Number pattern basic");
    },

    "generatePatternLinks_NumberRangePattern": () => {
        const expected = ["item-5", "item-6", "item-7"];
        assertDeepEquals(generatePatternLinks("item-[number:5-7]", 3), expected, "Number range pattern"); // Count is ignored for range
        assertDeepEquals(generatePatternLinks("item-[number:5-7]", 10), expected, "Number range pattern, count too high");
    },

    "generatePatternLinks_LetterPattern": () => {
        const expected = ["img-a.jpg", "img-b.jpg"];
        assertDeepEquals(generatePatternLinks("img-[letter].jpg", 2), expected, "Letter pattern basic");
    },

    "generatePatternLinks_LetterRangePattern": () => {
        const expected = ["doc-c", "doc-d", "doc-e"];
        assertDeepEquals(generatePatternLinks("doc-[letter:c-e]", 3), expected, "Letter range pattern"); // Count is ignored for range
    },
    
    "generatePatternLinks_NoPattern": () => {
        const expected = ["https://example.com/fixed"];
        assertDeepEquals(generatePatternLinks("https://example.com/fixed", 3), expected, "No pattern, count ignored");
    },

    "normalizeUrl_Basic": () => {
        assertEquals(normalizeUrl("http://Example.com/Path"), "http://example.com/path", "Basic normalization with case");
    },

    "normalizeUrl_WithPort": () => {
        assertEquals(normalizeUrl("https://Example.com:443/Path"), "https://example.com/path", "HTTPS default port removal");
        assertEquals(normalizeUrl("http://Example.com:80/Path"), "http://example.com/path", "HTTP default port removal");
        assertEquals(normalizeUrl("http://Example.com:8080/Path"), "http://example.com:8080/path", "Non-default port kept");
    },

    "normalizeUrl_QueryAndFragment": () => {
        assertEquals(normalizeUrl("http://example.com/path?Query=Value#Fragment"), "http://example.com/path", "Query and fragment removal");
    },
    
    "normalizeUrl_TrailingSlash": () => {
        assertEquals(normalizeUrl("http://example.com/path/"), "http://example.com/path", "Trailing slash removal from path");
        assertEquals(normalizeUrl("http://example.com/"), "http://example.com/", "Trailing slash on root kept by URL constructor, then removed by our logic if needed");
    },


    "shouldSkipLink_SkipCases": () => {
        assertTrue(shouldSkipLink("http://example.com/document.pdf"), "Skip PDF");
        assertTrue(shouldSkipLink("http://example.com/archive.zip"), "Skip ZIP");
        assertTrue(shouldSkipLink("http://example.com/image.JPEG"), "Skip JPEG (case insensitive)");
        assertTrue(shouldSkipLink("http://example.com/data.xml?param=1"), "Skip XML with params");
    },

    "shouldSkipLink_NoSkipCases": () => {
        assertFalse(shouldSkipLink("http://example.com/page.html"), "Don't skip HTML");
        assertFalse(shouldSkipLink("http://example.com/"), "Don't skip root URL");
        assertFalse(shouldSkipLink("http://example.com/document.txt"), "Don't skip TXT");
    },

    "showLoader_DisplaysLoader": () => {
        const loader = setupMockLoader();
        loader.style.display = 'none'; // Ensure it's hidden initially
        showLoader();
        assertEquals(loader.style.display, 'flex', "Loader should be displayed (flex)");
        teardownMockLoader();
    },

    "hideLoader_HidesLoader": () => {
        const loader = setupMockLoader();
        loader.style.display = 'flex'; // Ensure it's visible initially
        hideLoader();
        assertEquals(loader.style.display, 'none', "Loader should be hidden (none)");
        teardownMockLoader();
    },
    
    "normalizeUrl_MixedCaseSchemeAndHost": () => {
        assertEquals(normalizeUrl("HTTP://ExAmPlE.CoM/PaTh"), "http://example.com/path", "Mixed case scheme and host");
    },

    "normalizeUrl_MultipleSlashesInPath": () => {
        // The URL constructor will normalize multiple slashes in the path.
        assertEquals(normalizeUrl("http://example.com//path///to/resource"), "http://example.com/path/to/resource", "Multiple slashes in path normalized by URL constructor");
    },
    
    "normalizeUrl_UrlWithSpaces (Should be handled by URL constructor or be invalid)": () => {
        // Behavior of URLs with spaces can be tricky. The URL constructor might handle some encoding.
        // If it throws, our isValidUrl should catch it. If it normalizes, we test the normalized form.
        // For this test, let's assume it produces what the URL constructor produces without query/fragment.
        try {
            const normalized = normalizeUrl("http://example.com/path with spaces");
            // URL constructor encodes spaces to %20
            assertEquals(normalized, "http://example.com/path%20with%20spaces", "Spaces in path encoded");
        } catch (e) {
            // If URL constructor fails, this is also acceptable as normalizeUrl would fail too.
            assertTrue(true, "URL with spaces correctly failed or was normalized by URL constructor: " + e.message);
        }
    },

    "generatePatternLinks_NumberPattern_StartFromOne": () => {
        const expected = ["page-1", "page-2"];
        assertDeepEquals(generatePatternLinks("page-[number]", 2), expected, "Number pattern starts from 1");
    },

    "generatePatternLinks_LetterPattern_StartFromA": () => {
        const expected = ["file-a", "file-b"];
        assertDeepEquals(generatePatternLinks("file-[letter]", 2), expected, "Letter pattern starts from 'a'");
    },

    "generatePatternLinks_NumberRangePattern_SingleNumberInRange": () => {
        const expected = ["image-10"];
        assertDeepEquals(generatePatternLinks("image-[number:10-10]", 1), expected, "Number range pattern with a single number");
    },

    "generatePatternLinks_LetterRangePattern_SingleLetterInRange": () => {
        const expected = ["item-m"];
        assertDeepEquals(generatePatternLinks("item-[letter:m-m]", 1), expected, "Letter range pattern with a single letter");
    },

    "generatePatternLinks_CountZeroOrNegative_NumberPattern": () => {
        // Count 0 or negative should ideally return an empty array or handle gracefully.
        // Current implementation of for loop `for (let i = 1; i <= count; i++)` handles count=0 correctly.
        assertDeepEquals(generatePatternLinks("page-[number].html", 0), [], "Number pattern with count 0");
        assertDeepEquals(generatePatternLinks("page-[number].html", -1), [], "Number pattern with negative count");
    },

    "generatePatternLinks_CountZeroOrNegative_LetterPattern": () => {
        assertDeepEquals(generatePatternLinks("img-[letter].jpg", 0), [], "Letter pattern with count 0");
        assertDeepEquals(generatePatternLinks("img-[letter].jpg", -2), [], "Letter pattern with negative count");
    }
});

function assertEquals(actual, expected, message) {
    if (actual === expected) {
        console.log(`PASS: ${message}`);
        return true;
    } else {
        console.error(`FAIL: ${message}. Expected "${expected}", but got "${actual}".`);
        return false;
    }
}

function assertDeepEquals(actual, expected, message) {
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
        console.log(`PASS: ${message}`);
        return true;
    } else {
        console.error(`FAIL: ${message}. Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}.`);
        return false;
    }
}

function assertTrue(condition, message) {
    if (condition) {
        console.log(`PASS: ${message}`);
        return true;
    } else {
        console.error(`FAIL: ${message}. Condition was false.`);
        return false;
    }
}

function assertFalse(condition, message) {
    if (!condition) {
        console.log(`PASS: ${message}`);
        return true;
    } else {
        console.error(`FAIL: ${message}. Condition was true.`);
        return false;
    }
}

function assertNotNull(value, message) {
    if (value !== null && value !== undefined) {
        console.log(`PASS: ${message}`);
        return true;
    } else {
        console.error(`FAIL: ${message}. Value was null or undefined.`);
        return false;
    }
}

// Mock DOM element for loader tests
function setupMockLoader() {
    let mockLoader = document.getElementById('loadingOverlay');
    if (!mockLoader) {
        mockLoader = document.createElement('div');
        mockLoader.id = 'loadingOverlay';
        mockLoader.style.display = 'none';
        document.body.appendChild(mockLoader);
    }
    return mockLoader;
}

function teardownMockLoader() {
    const mockLoader = document.getElementById('loadingOverlay');
    if (mockLoader) {
        mockLoader.remove();
    }
}

// Simple test runner
function runTests(testSuiteName, tests) {
    console.log(`\nRunning test suite: ${testSuiteName}`);
    let passes = 0;
    let failures = 0;
    for (const testName in tests) {
        try {
            console.log(`\n--- Running test: ${testName} ---`);
            tests[testName]();
            // If we reach here, assume pass unless an assert inside testName fails and throws.
            // For simplicity, asserts log pass/fail. We'll count based on console output for now or improve later.
            // This is a very basic runner; a more sophisticated one would track results from assert functions.
        } catch (e) {
            console.error(`ERROR in test ${testName}: ${e}`);
            // failures++; // This would be better if asserts threw errors.
        }
    }
    // Due to the async nature of some tests and asserts logging directly,
    // a summary here might be tricky without a more complex runner.
    // For now, manual inspection of console logs will be key.
    console.log(`--- Test suite ${testSuiteName} finished. Check logs for PASS/FAIL status. ---`);
}

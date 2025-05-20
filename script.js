const corsProxies = [
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?',
    'https://proxy.cors.sh/',
    'https://gobetween.oklabs.org/',
    'https://test.cors.workers.dev/?'
];
let currentProxyIndex = 0;

const unreadableFileExtensions = [
    '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.zip', '.rar', '.7z',
    '.tar', '.gz', '.bz2', '.xz', '.iso', '.img', '.dmg', '.exe', '.apk', '.jar',
    '.bin', '.csv', '.tsv', '.dat', '.db', '.dbf', '.sql', '.xml', '.json', '.yaml',
    '.mp3', '.wav', '.ogg', '.flac', '.aac', '.wma', '.m4a', '.mp4', '.avi', '.mov',
    '.wmv', '.flv', '.mkv', '.webm', '.m4v', '.png', '.jpg', '.jpeg', '.gif', '.bmp',
    '.tiff', '.svg', '.ico', '.psd', '.ai', '.eps', '.ps', '.ttf', '.otf', '.woff',
    '.woff2', '.eot', '.odt', '.ods', '.odp', '.odg', '.odf'
];

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(dropZone) {
    dropZone.classList.add('dragover');
}

function unhighlight(dropZone) {
    dropZone.classList.remove('dragover');
}

function handleDrop(e, addLinkToListCallback) {
    const dt = e.dataTransfer;
    const text = dt.getData('text');

    if (isValidUrl(text)) {
        addLinkToListCallback(text);
    }
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function generatePatternLinks(pattern, count) {
    const links = [];
    const numberPattern = /\[number\]/;
    const numberRangePattern = /\[number:(\d+)-(\d+)\]/;
    const letterPattern = /\[letter\]/;
    const letterRangePattern = /\[letter:([a-z])-([a-z])\]/;

    if (pattern.match(numberPattern)) {
        for (let i = 1; i <= count; i++) {
            links.push(pattern.replace(numberPattern, i));
        }
    } else if (pattern.match(numberRangePattern)) {
        const match = pattern.match(numberRangePattern);
        const start = parseInt(match[1]);
        const end = parseInt(match[2]);
        for (let i = start; i <= end; i++) {
            links.push(pattern.replace(numberRangePattern, i));
        }
    } else if (pattern.match(letterPattern)) {
        for (let i = 0; i < count; i++) {
            links.push(pattern.replace(letterPattern, String.fromCharCode(97 + i)));
        }
    } else if (pattern.match(letterRangePattern)) {
        const match = pattern.match(letterRangePattern);
        const start = match[1].charCodeAt(0);
        const end = match[2].charCodeAt(0);
        for (let i = start; i <= end; i++) {
            links.push(pattern.replace(letterRangePattern, String.fromCharCode(i)));
        }
    } else {
        links.push(pattern);
    }
    return links;
}


async function fetchWithCORSBypass(url) {
    currentProxyIndex = 0;
    while (currentProxyIndex < corsProxies.length) {
        try {
            const proxyUrl = corsProxies[currentProxyIndex] + encodeURIComponent(url);
            const response = await fetch(proxyUrl);
            if (response.ok) {
                return await response.text();
            } else {
                throw new Error(`Failed to fetch with proxy ${corsProxies[currentProxyIndex]}: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
            currentProxyIndex++;
        }
    }
    throw new Error('Failed to fetch with all available CORS proxies');
}


function normalizeUrl(url) {
    try {
        const parsedUrl = new URL(url);
        return (parsedUrl.origin + parsedUrl.pathname).toLowerCase();
    } catch {
        return url.toLowerCase();
    }
}

function shouldSkipLink(url) {
    const lowerCaseUrl = url.toLowerCase();
    return unreadableFileExtensions.some(ext => lowerCaseUrl.endsWith(ext));
}
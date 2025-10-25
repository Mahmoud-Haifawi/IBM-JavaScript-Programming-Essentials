// AJAX — short primer (beginner-friendly):
// - AJAX = "Asynchronous JavaScript And XML" (term from older days). It means making HTTP requests
//   from JavaScript without reloading the page. Modern AJAX typically uses JSON instead of XML.
// - Two main APIs: XMLHttpRequest (old, still used for advanced features like upload progress)
//   and fetch (modern, Promise-based). Libraries like axios wrap fetch/XHR with nicer APIs.
// - Key concepts: async vs sync, callbacks vs promises, response status codes, CORS, timeouts, aborting,
//   response parsing (text/json/blob), and progress events for large uploads/downloads.

// Utility: build URL with query params
function buildUrl(url, params = {}) {
    const u = new URL(url, typeof location !== 'undefined' ? location.origin : 'http://localhost');
    Object.keys(params).forEach(k => u.searchParams.append(k, params[k]));
    return u.toString();
}

// --------------------------
// 1) XMLHttpRequest — GET (classic, supports progress events)
// --------------------------
// When to use: need progress events, older codebases, or detailed XHR control.
function xhrGet(url, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true); // true = async
    xhr.responseType = 'json';  // try 'json', 'text', 'blob' depending on response
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            onSuccess(xhr.response);
        } else {
            onError(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
        }
    };
    xhr.onerror = () => onError(new Error('Network error'));
    xhr.send();
}

// Example usage (browser):
// xhrGet('https://jsonplaceholder.typicode.com/todos/1',
//   data => console.log('XHR GET success', data),
//   err => console.error('XHR GET error', err.message));

// --------------------------
// 2) XMLHttpRequest — POST with FormData (file upload example)
// --------------------------
function xhrPostForm(url, formElement, onProgress, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    const fd = new FormData(formElement);
    xhr.open('POST', url);
    xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable && onProgress) {
            onProgress({ loaded: ev.loaded, total: ev.total, percent: (ev.loaded / ev.total) * 100 });
        }
    };
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) onSuccess(xhr.responseText);
        else onError(new Error(`HTTP ${xhr.status}`));
    };
    xhr.onerror = () => onError(new Error('Network error'));
    xhr.send(fd);
}
// Usage in browser: pass a <form> element to xhrPostForm to upload files.

// --------------------------
// 3) fetch — basic GET (modern, Promise-based)
// --------------------------
// When to use: most common cases for HTTP requests in modern code.
function fetchGet(url, options = {}) {
    return fetch(url, options)
        .then(resp => {
            if (!resp.ok) throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
            // choose parsing: resp.json(), resp.text(), resp.blob(), etc.
            return resp.json();
        });
}
// Example:
// fetchGet('https://jsonplaceholder.typicode.com/todos/1')
//   .then(data => console.log('fetch GET', data))
//   .catch(err => console.error('fetch GET error', err.message));

// --------------------------
// 4) fetch — POST JSON (with content-type and error handling)
// --------------------------
function fetchPostJson(url, bodyObj = {}) {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyObj),
    })
    .then(async resp => {
        const text = await resp.text(); // read raw text for better debugging
        if (!resp.ok) {
            // try to parse error JSON if available
            let parsed;
            try { parsed = JSON.parse(text); } catch (e) { parsed = text; }
            throw new Error(`HTTP ${resp.status} ${resp.statusText} — ${JSON.stringify(parsed)}`);
        }
        return text ? JSON.parse(text) : null;
    });
}
// Example:
// fetchPostJson('https://httpbin.org/post', { name: 'Alice' })
//   .then(data => console.log('fetch POST JSON', data))
//   .catch(err => console.error('fetch POST error', err.message));

// --------------------------
// 5) fetch + async/await + try/catch (recommended style)
// --------------------------
async function getTodo(id) {
    try {
        const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const json = await resp.json();
        return json;
    } catch (err) {
        // handle network and parsing errors here
        throw err;
    }
}
// Usage:
// (async () => {
//   try {
//     const todo = await getTodo(1);
//     console.log('todo', todo);
//   } catch (e) {
//     console.error('error', e.message);
//   }
// })();

// --------------------------
// 6) Aborting requests and timeouts (AbortController)
// --------------------------
function fetchWithTimeout(url, timeoutMs = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    return fetch(url, { signal: controller.signal })
        .then(resp => {
            clearTimeout(id);
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            return resp.json();
        })
        .catch(err => {
            if (err.name === 'AbortError') throw new Error('Request timed out');
            throw err;
        });
}
// Example:
// fetchWithTimeout('https://jsonplaceholder.typicode.com/todos/1', 1000)
//   .then(d => console.log('fwt', d))
//   .catch(e => console.error('fwt err', e.message));

// --------------------------
// 7) Download progress with fetch (ReadableStream) — advanced
// --------------------------
// When to use: show progress for large downloads in modern browsers.
async function fetchWithDownloadProgress(url, onProgress) {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const contentLength = resp.headers.get('Content-Length');
    if (!resp.body || !contentLength) {
        // fallback to simple read
        const text = await resp.text();
        onProgress && onProgress({ percent: 100 });
        return text;
    }
    const reader = resp.body.getReader();
    const total = Number(contentLength);
    let loaded = 0;
    const chunks = [];
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        onProgress && onProgress({ loaded, total, percent: (loaded / total) * 100 });
    }
    const blob = new Blob(chunks);
    return blob; // or blob.text() / createObjectURL(blob) depending on needs
}
// Example usage in browser:
// fetchWithDownloadProgress('/large-file', p => console.log('progress', p))
//   .then(blob => console.log('download complete', blob))
//   .catch(err => console.error(err));

// --------------------------
// 8) CORS — short explanation (must-know)
// --------------------------
// - CORS = Cross-Origin Resource Sharing. Browsers block cross-origin requests unless the server
//   returns appropriate Access-Control-Allow-* headers.
// - Simple GET/POST (with simple headers) may work with CORS if server allows origin.
// - Non-simple requests (custom headers, JSON content-type, PUT/DELETE) trigger a preflight OPTIONS request.
// - You must configure the server (not the client) to allow cross-origin requests (e.g., Access-Control-Allow-Origin).
// - In development, use proxies or CORS-relaxed endpoints when testing locally.

// --------------------------
// 9) Error handling checklist
// --------------------------
// - Check resp.ok / status codes (401, 403, 404, 500).
// - Parse response safely (try/catch around resp.json()) — invalid JSON will throw.
// - Network errors are thrown by fetch; XHR has onerror/onabort.
// - Provide user feedback and retry/backoff if appropriate.

// --------------------------
// 10) Practical tips / anti-patterns
// --------------------------
// - Prefer fetch + async/await for readability in new code.
// - Use AbortController to cancel slow requests (e.g., user navigates away or repeated queries).
// - Avoid blocking the UI with synchronous XHR (deprecated and bad UX).
// - For large concurrency of requests, limit parallelism (see asyncJavaScrpit.js mapWithLimit).
// - Use HTTPS for production APIs and handle sensitive data carefully.
// - When building APIs, return consistent JSON error shapes to simplify client handling.

// --------------------------
// 11) Quick cheat-sheet examples (one-liners)
// --------------------------
const quick = {
    // GET JSON (fetch + promise)
    fetchGetJson: url => fetch(url).then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }),

    // POST JSON (with async/await)
    postJson: async (url, body) => {
        const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        if (!r.ok) throw new Error(r.status);
        return r.json();
    },

    // Simple XHR GET (callback)
    xhrGetCb: (url, cb) => {
        const x = new XMLHttpRequest();
        x.open('GET', url);
        x.onload = () => cb(null, x.status >= 200 && x.status < 300 ? JSON.parse(x.responseText) : new Error(x.status));
        x.onerror = () => cb(new Error('network'));
        x.send();
    }
};

// --------------------------
// End: export or expose for interactive testing (node/browser compatible light export)
// --------------------------
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        buildUrl,
        xhrGet,
        xhrPostForm,
        fetchGet,
        fetchPostJson,
        getTodo,
        fetchWithTimeout,
        fetchWithDownloadProgress,
        quick
    };
}
/* ═══════════════════════════════════════════════════════════════
   Theme Toggle & Bar Style Selector
   ═══════════════════════════════════════════════════════════════ */

// ── Theme Toggle ────────────────────────────────────────────
let currentTheme = localStorage.getItem('sv-theme') || 'dark';

function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sv-theme', theme);

    const sun = document.querySelector('.theme-icon.sun');
    const moon = document.querySelector('.theme-icon.moon');
    if (sun && moon) {
        sun.style.display = theme === 'dark' ? '' : 'none';
        moon.style.display = theme === 'dark' ? 'none' : '';
    }
}

function toggleTheme() {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

// Apply saved theme on load
applyTheme(currentTheme);

// ── Bar Style Selector ──────────────────────────────────────
let currentBarStyle = localStorage.getItem('sv-bar-style') || 'bars';

function setBarStyle(style) {
    currentBarStyle = style;
    localStorage.setItem('sv-bar-style', style);

    // Update data attribute
    if (style === 'bars') {
        document.documentElement.removeAttribute('data-bar-style');
    } else {
        document.documentElement.setAttribute('data-bar-style', style);
    }

    // Update pill buttons
    document.querySelectorAll('.style-pill').forEach(p => p.classList.remove('active'));
    const activeBtn = document.querySelector(`.style-pill[data-style="${style}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // For gradient mode, apply hue-based colors to all existing bars
    if (style === 'gradient') {
        applyGradientColors();
    } else {
        removeGradientColors();
    }

    // For circles mode, compute sizes based on values
    if (style === 'circles') {
        applyCircleSizes();
    }
}

/** Apply HSL hue-mapped backgrounds to bars for gradient mode */
function applyGradientColors() {
    const containers = [
        document.getElementById('vizContainer'),
        document.getElementById('vizA'),
        document.getElementById('vizB')
    ];
    containers.forEach(container => {
        if (!container) return;
        const bars = container.querySelectorAll('.bar');
        if (!bars.length) return;
        let maxVal = 1;
        bars.forEach(b => { const v = parseInt(b.dataset.value, 10); if (v > maxVal) maxVal = v; });
        bars.forEach(b => {
            const v = parseInt(b.dataset.value, 10);
            const hue = Math.round((v / maxVal) * 270); // 0 = red → 270 = violet
            b.style.background = `hsl(${hue}, 80%, 55%)`;
        });
    });
}

function removeGradientColors() {
    document.querySelectorAll('.bar').forEach(b => {
        b.style.background = '';
    });
}

/** Apply circle sizes proportional to values */
function applyCircleSizes() {
    const containers = [
        document.getElementById('vizContainer'),
        document.getElementById('vizA'),
        document.getElementById('vizB')
    ];
    containers.forEach(container => {
        if (!container) return;
        const bars = container.querySelectorAll('.bar');
        if (!bars.length) return;
        let maxVal = 1;
        bars.forEach(b => { const v = parseInt(b.dataset.value, 10); if (v > maxVal) maxVal = v; });
        const maxSize = Math.min(50, container.clientWidth / bars.length - 2);
        bars.forEach(b => {
            const v = parseInt(b.dataset.value, 10);
            const size = Math.max(10, (v / maxVal) * maxSize);
            b.style.width = size + 'px';
            b.style.height = size + 'px';
        });
    });
}

// Apply saved bar style on load
setBarStyle(currentBarStyle);

// ── Hook into drawBars — re-apply styles after bars are redrawn ──
// We monkey-patch the existing drawBars if it exists
if (typeof drawBars === 'function') {
    const _origDrawBars = drawBars;
    drawBars = function (arr) {
        _origDrawBars(arr);
        if (currentBarStyle === 'gradient') applyGradientColors();
        if (currentBarStyle === 'circles') applyCircleSizes();
    };
}

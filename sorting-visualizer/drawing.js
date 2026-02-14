/* ═══════════════════════════════════════════════════════════════
   Drawing, Sound, Pause & Utility Functions
   ═══════════════════════════════════════════════════════════════ */

// ---------- DOM refs ----------
const vizContainer = document.getElementById('vizContainer');
const emptyState = document.getElementById('emptyState');

// ---------- Speed ----------
let animSpeed = 50; // ms — lower = faster

const speedSlider = document.getElementById('speedSlider');
const speedValueEl = document.getElementById('speedValue');

function updateSpeed() {
    const val = parseInt(speedSlider.value, 10);
    animSpeed = Math.round(305 - val * 3); // 1→302ms, 100→5ms
    speedValueEl.textContent = val;
}

speedSlider.addEventListener('input', updateSpeed);
updateSpeed();

// ---------- Array Size ----------
const sizeSlider = document.getElementById('sizeSlider');
const sizeValueEl = document.getElementById('sizeValue');

function updateSizeLabel() {
    sizeValueEl.textContent = sizeSlider.value;
}

sizeSlider.addEventListener('input', () => {
    updateSizeLabel();
    generateArray(); // auto-regenerate when size changes
});
updateSizeLabel();

// ---------- Stats ----------
let comparisons = 0;
let swaps = 0;
const statComparisons = document.getElementById('statComparisons');
const statSwaps = document.getElementById('statSwaps');

function resetStats() {
    comparisons = 0;
    swaps = 0;
    statComparisons.textContent = '0';
    statSwaps.textContent = '0';
}

function incComparisons() {
    comparisons++;
    statComparisons.textContent = comparisons;
}

function incSwaps() {
    swaps++;
    statSwaps.textContent = swaps;
}

// ---------- Status ----------
const statusText = document.getElementById('statusText');

function setStatus(msg, type) {
    statusText.textContent = msg;
    statusText.className = 'status-text' + (type ? ' ' + type : '');
}

// ═════════════════════════════════════════════════════════════
//  SOUND ENGINE — Web Audio API
// ═════════════════════════════════════════════════════════════
let soundEnabled = true;
let audioCtx = null;

function getAudioCtx() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    document.getElementById('soundIconOn').style.display = soundEnabled ? '' : 'none';
    document.getElementById('soundIconOff').style.display = soundEnabled ? 'none' : '';
    document.getElementById('btnSound').classList.toggle('muted', !soundEnabled);
}

/**
 * Play a short sine tone. Frequency is mapped from the bar value:
 *   value 1 → ~200Hz,  value 100 → ~800Hz
 * Duration is short (50ms) so it sounds like a "blip".
 */
function playTone(value, maxValue) {
    if (!soundEnabled) return;
    try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // map value to frequency 200–800 Hz
        const freq = 200 + (value / (maxValue || 100)) * 600;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
        // silently fail if audio is blocked
    }
}

/** Play ascending victory sweep */
function playCelebration() {
    if (!soundEnabled) return;
    try {
        const ctx = getAudioCtx();
        const now = ctx.currentTime;
        for (let i = 0; i < 8; i++) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(300 + i * 80, now + i * 0.06);
            gain.gain.setValueAtTime(0.06, now + i * 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + i * 0.06);
            osc.stop(now + i * 0.06 + 0.08);
        }
    } catch (e) { /* ignore */ }
}

// ═════════════════════════════════════════════════════════════
//  PAUSE / RESUME / STEP
// ═════════════════════════════════════════════════════════════
let isPaused = false;
let stepResolve = null; // resolve function for step-through

/**
 * Awaitable checkpoint — call this from algorithms.
 * If paused, it blocks until resumed or stepped.
 */
function waitIfPaused() {
    if (!isPaused) return Promise.resolve();
    return new Promise(resolve => {
        stepResolve = resolve;
    });
}

function pauseSort() {
    isPaused = true;
    setStatus('⏸ Paused — press Resume or Step', 'paused');
    document.getElementById('btnPause').disabled = true;
    document.getElementById('btnResume').disabled = false;
    document.getElementById('btnStep').disabled = false;
}

function resumeSort() {
    isPaused = false;
    document.getElementById('btnPause').disabled = false;
    document.getElementById('btnResume').disabled = true;
    document.getElementById('btnStep').disabled = true;
    setStatus('▶ Resumed…', 'sorting');
    if (stepResolve) {
        const r = stepResolve;
        stepResolve = null;
        r();
    }
}

function stepSort() {
    // advance exactly one operation then pause again
    if (stepResolve) {
        const r = stepResolve;
        stepResolve = null;
        // stay paused — a new waitIfPaused() will be hit next iteration
        r();
    }
}

function showPlayback() {
    document.getElementById('playbackRow').style.display = '';
    document.getElementById('btnPause').disabled = false;
    document.getElementById('btnResume').disabled = true;
    document.getElementById('btnStep').disabled = true;
}

function hidePlayback() {
    document.getElementById('playbackRow').style.display = 'none';
    isPaused = false;
    stepResolve = null;
}

// ---------- Generate random array ----------
function generateArray() {
    const size = parseInt(sizeSlider.value, 10) || 25;
    const values = [];
    for (let i = 0; i < size; i++) {
        values.push(Math.floor(Math.random() * 95) + 5); // 5–99
    }
    document.getElementById('arrayInput').value = values.join(', ');
    drawBars(values);
    setStatus('Array generated — press Sort to begin', '');
}

// ---------- Draw bars ----------
function drawBars(arr) {
    if (emptyState) emptyState.style.display = 'none';

    // clear old bars
    vizContainer.querySelectorAll('.bar').forEach(b => b.remove());

    const maxVal = Math.max(...arr);
    const containerH = vizContainer.clientHeight - 40;
    const showLabels = arr.length <= 40; // hide labels for large arrays

    arr.forEach((val) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.dataset.value = val;
        const h = Math.max(4, (val / maxVal) * containerH);
        bar.style.height = h + 'px';

        if (showLabels) {
            const label = document.createElement('span');
            label.className = 'bar-value';
            label.textContent = val;
            bar.appendChild(label);
        }

        vizContainer.appendChild(bar);
    });
}

// ---------- Visual helpers (used by algos) ----------
function getBars() {
    return vizContainer.querySelectorAll('.bar');
}

function getMaxValue() {
    const bars = getBars();
    let mx = 1;
    bars.forEach(b => {
        const v = parseInt(b.dataset.value, 10);
        if (v > mx) mx = v;
    });
    return mx;
}

function highlightBars(i, j) {
    const bars = getBars();
    const mx = getMaxValue();
    if (bars[i]) {
        bars[i].classList.add('compare-a');
        playTone(parseInt(bars[i].dataset.value, 10), mx);
    }
    if (bars[j]) {
        bars[j].classList.add('compare-b');
    }
}

function unhighlightBars(i, j) {
    const bars = getBars();
    if (bars[i]) { bars[i].classList.remove('compare-a'); bars[i].classList.remove('compare-b'); }
    if (bars[j]) { bars[j].classList.remove('compare-a'); bars[j].classList.remove('compare-b'); }
}

function swapBars(i, j) {
    const bars = getBars();
    if (!bars[i] || !bars[j]) return;
    const tempH = bars[i].style.height;
    const tempVal = bars[i].dataset.value;
    const tempLabel = bars[i].querySelector('.bar-value');
    const tempLabelJ = bars[j].querySelector('.bar-value');

    bars[i].style.height = bars[j].style.height;
    bars[i].dataset.value = bars[j].dataset.value;
    if (tempLabel) tempLabel.textContent = bars[j].dataset.value;

    bars[j].style.height = tempH;
    bars[j].dataset.value = tempVal;
    if (tempLabelJ) tempLabelJ.textContent = tempVal;
}

function updateBar(i, val, maxVal) {
    const bars = getBars();
    if (!bars[i]) return;
    const containerH = vizContainer.clientHeight - 40;
    const h = Math.max(4, (val / maxVal) * containerH);
    bars[i].style.height = h + 'px';
    bars[i].dataset.value = val;
    const label = bars[i].querySelector('.bar-value');
    if (label) label.textContent = val;
}

function markSorted(i) {
    const bars = getBars();
    if (bars[i]) bars[i].classList.add('sorted');
}

function celebrateAll() {
    playCelebration();
    const bars = getBars();
    bars.forEach((bar, idx) => {
        setTimeout(() => {
            bar.classList.add('sorted', 'celebrate');
        }, idx * 30);
    });
}

// ---------- Sleep ----------
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
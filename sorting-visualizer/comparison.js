/* ═══════════════════════════════════════════════════════════════
   Comparison Mode — Run two algorithms side-by-side
   ═══════════════════════════════════════════════════════════════ */

const ALGO_LABELS = {
    bubble: 'Bubble Sort', selection: 'Selection Sort', insertion: 'Insertion Sort',
    quick: 'Quick Sort', merge: 'Merge Sort', heap: 'Heap Sort',
    shell: 'Shell Sort', counting: 'Counting Sort', radix: 'Radix Sort', tim: 'Tim Sort',
};

let isComparing = false;

// ── Feature tab switching ───────────────────────────────────
function switchFeature(feat) {
    document.querySelectorAll('.feature-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.feature-tab[data-feature="${feat}"]`).classList.add('active');
    document.querySelectorAll('.feature-panel').forEach(p => p.classList.add('hidden'));
    document.getElementById(feat + 'Panel').classList.remove('hidden');
}

// ── Scoped visualization context ────────────────────────────
function createCtx(containerId, compId, swapId, timeId) {
    const el = document.getElementById(containerId);
    const cEl = document.getElementById(compId);
    const sEl = document.getElementById(swapId);
    const tEl = document.getElementById(timeId);
    let c = 0, s = 0;
    return {
        drawBars(arr) {
            el.innerHTML = '';
            const mx = Math.max(...arr), h = el.clientHeight - 24, show = arr.length <= 40;
            arr.forEach(v => {
                const b = document.createElement('div'); b.className = 'bar'; b.dataset.value = v;
                b.style.height = Math.max(4, (v / mx) * h) + 'px';
                if (show) { const l = document.createElement('span'); l.className = 'bar-value'; l.textContent = v; b.appendChild(l); }
                el.appendChild(b);
            });
        },
        bars() { return el.querySelectorAll('.bar'); },
        hl(i, j) { const b = this.bars(); if (b[i]) b[i].classList.add('compare-a'); if (b[j]) b[j].classList.add('compare-b'); },
        uhl(i, j) { const b = this.bars(); if (b[i]) b[i].classList.remove('compare-a', 'compare-b'); if (b[j]) b[j].classList.remove('compare-a', 'compare-b'); },
        sw(i, j) {
            const b = this.bars(); if (!b[i] || !b[j]) return;
            const th = b[i].style.height, tv = b[i].dataset.value;
            const lA = b[i].querySelector('.bar-value'), lB = b[j].querySelector('.bar-value');
            b[i].style.height = b[j].style.height; b[i].dataset.value = b[j].dataset.value; if (lA) lA.textContent = b[j].dataset.value;
            b[j].style.height = th; b[j].dataset.value = tv; if (lB) lB.textContent = tv;
        },
        upd(i, v, mx) {
            const b = this.bars(); if (!b[i]) return;
            b[i].style.height = Math.max(4, (v / mx) * (el.clientHeight - 24)) + 'px'; b[i].dataset.value = v;
            const l = b[i].querySelector('.bar-value'); if (l) l.textContent = v;
        },
        mark(i) { const b = this.bars(); if (b[i]) b[i].classList.add('sorted'); },
        celebrate() { this.bars().forEach((b, idx) => setTimeout(() => b.classList.add('sorted', 'celebrate'), idx * 20)); },
        incC() { c++; cEl.textContent = c; }, incS() { s++; sEl.textContent = s; },
        reset() { c = 0; s = 0; cEl.textContent = '0'; sEl.textContent = '0'; tEl.textContent = '—'; },
        setTime(ms) { tEl.textContent = ms + 'ms'; },
    };
}

// ── Context-parameterized algorithms ────────────────────────
async function cBubble(a, x, sp) {
    const n = a.length;
    for (let i = 0; i < n - 1; i++) { for (let j = 0; j < n - i - 1; j++) { if (!isComparing) return; x.hl(j, j + 1); x.incC(); await sleep(sp); if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; x.sw(j, j + 1); x.incS(); await sleep(sp); } x.uhl(j, j + 1); } x.mark(n - i - 1); } x.mark(0);
}
async function cSelection(a, x, sp) {
    const n = a.length;
    for (let i = 0; i < n - 1; i++) {
        let m = i; for (let j = i + 1; j < n; j++) { if (!isComparing) return; x.hl(m, j); x.incC(); await sleep(sp); if (a[j] < a[m]) { x.uhl(m, j); m = j; } else { x.uhl(m, j); } }
        if (m !== i) { x.hl(i, m); await sleep(sp);[a[i], a[m]] = [a[m], a[i]]; x.sw(i, m); x.incS(); await sleep(sp); x.uhl(i, m); } x.mark(i);
    } x.mark(a.length - 1);
}
async function cInsertion(a, x, sp) {
    const n = a.length; for (let i = 1; i < n; i++) { let k = a[i], j = i - 1; while (j >= 0 && a[j] > k) { if (!isComparing) return; x.hl(j, j + 1); x.incC(); await sleep(sp); a[j + 1] = a[j]; x.sw(j, j + 1); x.incS(); await sleep(sp); x.uhl(j, j + 1); j--; } if (j >= 0) x.incC(); a[j + 1] = k; }
}
async function cQuick(a, x, sp, lo, hi) {
    if (!isComparing || lo >= hi) { if (lo === hi) x.mark(lo); return; }
    const pv = a[hi]; let i = lo - 1;
    for (let j = lo; j < hi; j++) { if (!isComparing) return; x.hl(j, hi); x.incC(); await sleep(sp); if (a[j] <= pv) { i++; if (i !== j) { [a[i], a[j]] = [a[j], a[i]]; x.sw(i, j); x.incS(); await sleep(sp); } } x.uhl(j, hi); }
    i++; if (i !== hi) { x.hl(i, hi);[a[i], a[hi]] = [a[hi], a[i]]; x.sw(i, hi); x.incS(); await sleep(sp); x.uhl(i, hi); } x.mark(i);
    await cQuick(a, x, sp, lo, i - 1); await cQuick(a, x, sp, i + 1, hi);
}
async function cMerge(a, x, sp, lo, hi) {
    if (!isComparing || lo >= hi) return; const mid = (lo + hi) >> 1; await cMerge(a, x, sp, lo, mid); await cMerge(a, x, sp, mid + 1, hi);
    const L = a.slice(lo, mid + 1), R = a.slice(mid + 1, hi + 1), mx = Math.max(...a); let i = 0, j = 0, k = lo;
    while (i < L.length && j < R.length) { if (!isComparing) return; x.hl(k, mid + 1 + j); x.incC(); await sleep(sp); if (L[i] <= R[j]) { a[k] = L[i]; x.upd(k, L[i], mx); i++; } else { a[k] = R[j]; x.upd(k, R[j], mx); j++; } x.incS(); x.uhl(k, mid + 1 + j); k++; await sleep(sp); }
    while (i < L.length) { if (!isComparing) return; a[k] = L[i]; x.upd(k, L[i], mx); x.incS(); i++; k++; await sleep(sp); }
    while (j < R.length) { if (!isComparing) return; a[k] = R[j]; x.upd(k, R[j], mx); x.incS(); j++; k++; await sleep(sp); }
}

// ── Heap Sort (comparison) ──────────────────────────────────
async function cHeapify(a, n, i, x, sp) {
    let lg = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < n) { x.hl(lg, l); x.incC(); await sleep(sp); if (a[l] > a[lg]) lg = l; x.uhl(i, l); }
    if (r < n) { x.hl(lg, r); x.incC(); await sleep(sp); if (a[r] > a[lg]) lg = r; x.uhl(i, r); }
    if (lg !== i) { if (!isComparing) return; x.hl(i, lg);[a[i], a[lg]] = [a[lg], a[i]]; x.sw(i, lg); x.incS(); await sleep(sp); x.uhl(i, lg); await cHeapify(a, n, lg, x, sp); }
}
async function cHeap(a, x, sp) {
    const n = a.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) { if (!isComparing) return; await cHeapify(a, n, i, x, sp); }
    for (let i = n - 1; i > 0; i--) { if (!isComparing) return; x.hl(0, i);[a[0], a[i]] = [a[i], a[0]]; x.sw(0, i); x.incS(); await sleep(sp); x.uhl(0, i); x.mark(i); await cHeapify(a, i, 0, x, sp); }
    x.mark(0);
}

// ── Shell Sort (comparison) ─────────────────────────────────
async function cShell(a, x, sp) {
    const n = a.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            let tmp = a[i], j = i;
            while (j >= gap) { if (!isComparing) return; x.hl(j, j - gap); x.incC(); await sleep(sp); if (a[j - gap] > tmp) { a[j] = a[j - gap]; x.sw(j, j - gap); x.incS(); await sleep(sp); x.uhl(j, j - gap); j -= gap; } else { x.uhl(j, j - gap); break; } }
            a[j] = tmp;
        }
    }
}

// ── Counting Sort (comparison) ──────────────────────────────
async function cCounting(a, x, sp) {
    const n = a.length, mx = Math.max(...a), mn = Math.min(...a), range = mx - mn + 1;
    const count = new Array(range).fill(0);
    for (let i = 0; i < n; i++) { if (!isComparing) return; x.hl(i, i); count[a[i] - mn]++; x.incC(); await sleep(sp); x.uhl(i, i); }
    let pos = 0;
    for (let i = 0; i < range; i++) { while (count[i] > 0) { if (!isComparing) return; a[pos] = i + mn; x.upd(pos, i + mn, mx); x.incS(); x.hl(pos, pos); await sleep(sp); x.uhl(pos, pos); x.mark(pos); count[i]--; pos++; } }
}

// ── Radix Sort (comparison) ─────────────────────────────────
async function cRadix(a, x, sp) {
    const n = a.length, mx = Math.max(...a);
    for (let exp = 1; Math.floor(mx / exp) > 0; exp *= 10) {
        if (!isComparing) return;
        const output = new Array(n), count = new Array(10).fill(0);
        for (let i = 0; i < n; i++) { x.hl(i, i); x.incC(); count[Math.floor(a[i] / exp) % 10]++; await sleep(sp); x.uhl(i, i); }
        for (let i = 1; i < 10; i++) count[i] += count[i - 1];
        for (let i = n - 1; i >= 0; i--) { const d = Math.floor(a[i] / exp) % 10; output[count[d] - 1] = a[i]; count[d]--; }
        for (let i = 0; i < n; i++) { if (!isComparing) return; a[i] = output[i]; x.upd(i, output[i], mx); x.incS(); x.hl(i, i); await sleep(sp); x.uhl(i, i); }
    }
}

// ── Tim Sort (comparison) ───────────────────────────────────
const C_TIM_RUN = 16;
async function cTimInsert(a, lo, hi, x, sp) {
    for (let i = lo + 1; i <= hi; i++) {
        let k = a[i], j = i - 1;
        while (j >= lo && a[j] > k) { if (!isComparing) return; x.hl(j, j + 1); x.incC(); await sleep(sp); a[j + 1] = a[j]; x.sw(j, j + 1); x.incS(); await sleep(sp); x.uhl(j, j + 1); j--; }
        if (j >= lo) x.incC(); a[j + 1] = k;
    }
}
async function cTimMerge(a, lo, mid, hi, x, sp) {
    const L = a.slice(lo, mid + 1), R = a.slice(mid + 1, hi + 1), mx = Math.max(...a);
    let i = 0, j = 0, k = lo;
    while (i < L.length && j < R.length) { if (!isComparing) return; x.hl(k, mid + 1 + j); x.incC(); await sleep(sp); if (L[i] <= R[j]) { a[k] = L[i]; x.upd(k, L[i], mx); i++; } else { a[k] = R[j]; x.upd(k, R[j], mx); j++; } x.incS(); x.uhl(k, mid + 1 + j); k++; await sleep(sp); }
    while (i < L.length) { if (!isComparing) return; a[k] = L[i]; x.upd(k, L[i], mx); x.incS(); i++; k++; await sleep(sp); }
    while (j < R.length) { if (!isComparing) return; a[k] = R[j]; x.upd(k, R[j], mx); x.incS(); j++; k++; await sleep(sp); }
}
async function cTim(a, x, sp) {
    const n = a.length;
    for (let i = 0; i < n; i += C_TIM_RUN) { await cTimInsert(a, i, Math.min(i + C_TIM_RUN - 1, n - 1), x, sp); }
    for (let size = C_TIM_RUN; size < n; size *= 2) {
        for (let left = 0; left < n; left += 2 * size) {
            const mid = Math.min(left + size - 1, n - 1), right = Math.min(left + 2 * size - 1, n - 1);
            if (mid < right) { if (!isComparing) return; await cTimMerge(a, left, mid, right, x, sp); }
        }
    }
}

function getCmpFn(name) {
    switch (name) {
        case 'bubble': return (a, x, s) => cBubble(a, x, s);
        case 'selection': return (a, x, s) => cSelection(a, x, s);
        case 'insertion': return (a, x, s) => cInsertion(a, x, s);
        case 'quick': return (a, x, s) => cQuick(a, x, s, 0, a.length - 1);
        case 'merge': return (a, x, s) => cMerge(a, x, s, 0, a.length - 1);
        case 'heap': return (a, x, s) => cHeap(a, x, s);
        case 'shell': return (a, x, s) => cShell(a, x, s);
        case 'counting': return (a, x, s) => cCounting(a, x, s);
        case 'radix': return (a, x, s) => cRadix(a, x, s);
        case 'tim': return (a, x, s) => cTim(a, x, s);
    }
}

// ── Start comparison ────────────────────────────────────────
async function startComparison() {
    if (isComparing) return;
    const aV = document.getElementById('algoA').value;
    const bV = document.getElementById('algoB').value;
    if (!aV || !bV) return;

    const size = parseInt(document.getElementById('cmpSizeSlider').value, 10) || 30;
    const base = Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);

    const xA = createCtx('vizA', 'compA', 'swapA', 'timeA');
    const xB = createCtx('vizB', 'compB', 'swapB', 'timeB');
    xA.reset(); xB.reset();
    xA.drawBars([...base]); xB.drawBars([...base]);

    document.getElementById('nameA').textContent = ALGO_LABELS[aV];
    document.getElementById('nameB').textContent = ALGO_LABELS[bV];

    isComparing = true;
    document.getElementById('btnCompare').disabled = true;

    const speed = Math.round(305 - parseInt(document.getElementById('speedSlider').value, 10) * 3);
    const arrA = [...base], arrB = [...base];
    const t0 = performance.now();

    const pA = getCmpFn(aV)(arrA, xA, speed).then(() => { xA.setTime(Math.round(performance.now() - t0)); xA.celebrate(); });
    const pB = getCmpFn(bV)(arrB, xB, speed).then(() => { xB.setTime(Math.round(performance.now() - t0)); xB.celebrate(); });
    await Promise.all([pA, pB]);

    isComparing = false;
    document.getElementById('btnCompare').disabled = false;
}

// ── Compare size slider label ──────────────────────────────
document.getElementById('cmpSizeSlider').addEventListener('input', function () {
    document.getElementById('cmpSizeVal').textContent = this.value;
});

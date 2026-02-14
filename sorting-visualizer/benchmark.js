/* ═══════════════════════════════════════════════════════════════
   Benchmark — Run all algorithms silently & plot canvas chart
   ═══════════════════════════════════════════════════════════════ */

const BENCH_COLORS = {
    bubble: '#ef4444', selection: '#f59e0b', insertion: '#22c55e',
    quick: '#6366f1', merge: '#06b6d4', heap: '#ec4899',
    shell: '#8b5cf6', counting: '#14b8a6', radix: '#f97316', tim: '#64748b',
};
const BENCH_NAMES = {
    bubble: 'Bubble Sort', selection: 'Selection Sort', insertion: 'Insertion Sort',
    quick: 'Quick Sort', merge: 'Merge Sort', heap: 'Heap Sort',
    shell: 'Shell Sort', counting: 'Counting Sort', radix: 'Radix Sort', tim: 'Tim Sort',
};

// ── Silent algorithms (no DOM, just count) ──────────────────
function silentBubble(arr) {
    let c = 0, s = 0, n = arr.length;
    for (let i = 0; i < n - 1; i++)
        for (let j = 0; j < n - i - 1; j++) {
            c++;
            if (arr[j] > arr[j + 1]) { [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; s++; }
        }
    return { comparisons: c, swaps: s };
}
function silentSelection(arr) {
    let c = 0, s = 0, n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let m = i;
        for (let j = i + 1; j < n; j++) { c++; if (arr[j] < arr[m]) m = j; }
        if (m !== i) { [arr[i], arr[m]] = [arr[m], arr[i]]; s++; }
    }
    return { comparisons: c, swaps: s };
}
function silentInsertion(arr) {
    let c = 0, s = 0, n = arr.length;
    for (let i = 1; i < n; i++) {
        let k = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > k) { c++; arr[j + 1] = arr[j]; s++; j--; }
        if (j >= 0) c++;
        arr[j + 1] = k;
    }
    return { comparisons: c, swaps: s };
}
function silentQuick(arr) {
    let c = 0, s = 0;
    function part(lo, hi) {
        const p = arr[hi]; let i = lo - 1;
        for (let j = lo; j < hi; j++) { c++; if (arr[j] <= p) { i++; if (i !== j) { [arr[i], arr[j]] = [arr[j], arr[i]]; s++; } } }
        i++; if (i !== hi) { [arr[i], arr[hi]] = [arr[hi], arr[i]]; s++; }
        return i;
    }
    function qs(lo, hi) { if (lo < hi) { const p = part(lo, hi); qs(lo, p - 1); qs(p + 1, hi); } }
    qs(0, arr.length - 1);
    return { comparisons: c, swaps: s };
}
function silentMerge(arr) {
    let c = 0, s = 0;
    function mg(lo, mid, hi) {
        const L = arr.slice(lo, mid + 1), R = arr.slice(mid + 1, hi + 1);
        let i = 0, j = 0, k = lo;
        while (i < L.length && j < R.length) { c++; arr[k++] = L[i] <= R[j] ? L[i++] : R[j++]; s++; }
        while (i < L.length) { arr[k++] = L[i++]; s++; }
        while (j < R.length) { arr[k++] = R[j++]; s++; }
    }
    function ms(lo, hi) { if (lo >= hi) return; const m = (lo + hi) >> 1; ms(lo, m); ms(m + 1, hi); mg(lo, m, hi); }
    ms(0, arr.length - 1);
    return { comparisons: c, swaps: s };
}
function silentHeap(arr) {
    let c = 0, s = 0, n = arr.length;
    function hfy(n2, i) {
        let lg = i, l = 2 * i + 1, r = 2 * i + 2;
        if (l < n2) { c++; if (arr[l] > arr[lg]) lg = l; }
        if (r < n2) { c++; if (arr[r] > arr[lg]) lg = r; }
        if (lg !== i) { [arr[i], arr[lg]] = [arr[lg], arr[i]]; s++; hfy(n2, lg); }
    }
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) hfy(n, i);
    for (let i = n - 1; i > 0; i--) { [arr[0], arr[i]] = [arr[i], arr[0]]; s++; hfy(i, 0); }
    return { comparisons: c, swaps: s };
}
function silentShell(arr) {
    let c = 0, s = 0, n = arr.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            let tmp = arr[i], j = i;
            while (j >= gap && arr[j - gap] > tmp) { c++; arr[j] = arr[j - gap]; s++; j -= gap; }
            if (j >= gap) c++;
            arr[j] = tmp;
        }
    }
    return { comparisons: c, swaps: s };
}
function silentCounting(arr) {
    let c = 0, s = 0, n = arr.length;
    const mx = Math.max(...arr), mn = Math.min(...arr), range = mx - mn + 1;
    const count = new Array(range).fill(0);
    for (let i = 0; i < n; i++) { count[arr[i] - mn]++; c++; }
    let pos = 0;
    for (let i = 0; i < range; i++) { while (count[i] > 0) { arr[pos++] = i + mn; s++; count[i]--; } }
    return { comparisons: c, swaps: s };
}
function silentRadix(arr) {
    let c = 0, s = 0, n = arr.length, mx = Math.max(...arr);
    for (let exp = 1; Math.floor(mx / exp) > 0; exp *= 10) {
        const output = new Array(n), count = new Array(10).fill(0);
        for (let i = 0; i < n; i++) { count[Math.floor(arr[i] / exp) % 10]++; c++; }
        for (let i = 1; i < 10; i++) count[i] += count[i - 1];
        for (let i = n - 1; i >= 0; i--) { const d = Math.floor(arr[i] / exp) % 10; output[count[d] - 1] = arr[i]; count[d]--; }
        for (let i = 0; i < n; i++) { arr[i] = output[i]; s++; }
    }
    return { comparisons: c, swaps: s };
}
function silentTim(arr) {
    let c = 0, s = 0;
    const RUN = 16, n = arr.length;
    for (let i = 0; i < n; i += RUN) {
        const hi = Math.min(i + RUN - 1, n - 1);
        for (let j = i + 1; j <= hi; j++) {
            let k = arr[j], p = j - 1;
            while (p >= i && arr[p] > k) { c++; arr[p + 1] = arr[p]; s++; p--; }
            if (p >= i) c++; arr[p + 1] = k;
        }
    }
    function mg(lo, mid, hi) {
        const L = arr.slice(lo, mid + 1), R = arr.slice(mid + 1, hi + 1);
        let i = 0, j = 0, k = lo;
        while (i < L.length && j < R.length) { c++; arr[k++] = L[i] <= R[j] ? L[i++] : R[j++]; s++; }
        while (i < L.length) { arr[k++] = L[i++]; s++; }
        while (j < R.length) { arr[k++] = R[j++]; s++; }
    }
    for (let size = RUN; size < n; size *= 2) {
        for (let left = 0; left < n; left += 2 * size) {
            const mid = Math.min(left + size - 1, n - 1), right = Math.min(left + 2 * size - 1, n - 1);
            if (mid < right) mg(left, mid, right);
        }
    }
    return { comparisons: c, swaps: s };
}

const SILENT = {
    bubble: silentBubble, selection: silentSelection, insertion: silentInsertion,
    quick: silentQuick, merge: silentMerge, heap: silentHeap,
    shell: silentShell, counting: silentCounting, radix: silentRadix, tim: silentTim,
};

// ── Benchmark runner ────────────────────────────────────────
let isBenchmarking = false;

async function runBenchmark() {
    if (isBenchmarking) return;
    isBenchmarking = true;
    const btn = document.getElementById('btnBenchmark');
    const st = document.getElementById('benchmarkStatus');
    btn.disabled = true;

    const sizes = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const algos = ['bubble', 'selection', 'insertion', 'quick', 'merge', 'heap', 'shell', 'counting', 'radix', 'tim'];
    const results = {};
    algos.forEach(a => results[a] = []);

    for (const size of sizes) {
        const base = Array.from({ length: size }, () => Math.floor(Math.random() * 1000) + 1);
        for (const algo of algos) {
            const stats = SILENT[algo]([...base]);
            results[algo].push({ size, ...stats });
        }
        st.textContent = `Benchmarking… size ${size}/100`;
        await new Promise(r => setTimeout(r, 5));
    }

    drawChart(sizes, results);
    buildLegend();
    st.textContent = 'Benchmark complete — comparisons vs. array size';
    btn.disabled = false;
    isBenchmarking = false;
}

// ── Canvas chart ────────────────────────────────────────────
function drawChart(sizes, results) {
    const canvas = document.getElementById('benchmarkChart');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.parentElement.getBoundingClientRect().width;
    const H = 380;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);

    const pad = { top: 30, right: 24, bottom: 50, left: 64 };
    const pW = W - pad.left - pad.right, pH = H - pad.top - pad.bottom;

    let maxC = 0;
    Object.values(results).forEach(d => d.forEach(r => { if (r.comparisons > maxC) maxC = r.comparisons; }));
    maxC = Math.ceil(maxC * 1.1) || 1;

    // bg
    ctx.fillStyle = '#0d0d1f'; ctx.fillRect(0, 0, W, H);

    // grid
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = pad.top + (pH / 5) * i;
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
        ctx.fillStyle = '#555570'; ctx.font = '11px Inter,sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxC * (1 - i / 5)).toLocaleString(), pad.left - 8, y + 4);
    }

    // x labels
    ctx.textAlign = 'center';
    sizes.forEach((s, i) => {
        ctx.fillStyle = '#555570';
        ctx.fillText(s, pad.left + (i / (sizes.length - 1)) * pW, H - pad.bottom + 20);
    });

    // axis labels
    ctx.fillStyle = '#8888a8'; ctx.font = '12px Inter,sans-serif';
    ctx.fillText('Array Size', W / 2, H - 6);
    ctx.save(); ctx.translate(14, H / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText('Comparisons', 0, 0); ctx.restore();

    // lines
    Object.keys(results).forEach(algo => {
        const data = results[algo], color = BENCH_COLORS[algo];
        ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
        data.forEach((d, i) => {
            const x = pad.left + (i / (sizes.length - 1)) * pW;
            const y = pad.top + pH * (1 - d.comparisons / maxC);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();
        // dots
        data.forEach((d, i) => {
            const x = pad.left + (i / (sizes.length - 1)) * pW;
            const y = pad.top + pH * (1 - d.comparisons / maxC);
            ctx.beginPath(); ctx.fillStyle = color; ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
        });
    });
}

function buildLegend() {
    const el = document.getElementById('chartLegend');
    el.innerHTML = '';
    Object.keys(BENCH_COLORS).forEach(a => {
        const d = document.createElement('div'); d.className = 'chart-legend-item';
        d.innerHTML = `<span class="chart-legend-swatch" style="background:${BENCH_COLORS[a]}"></span>${BENCH_NAMES[a]}`;
        el.appendChild(d);
    });
}

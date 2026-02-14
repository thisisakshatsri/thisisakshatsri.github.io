/* ═══════════════════════════════════════════════════════════════
   Input Validation, Orchestration & State
   ═══════════════════════════════════════════════════════════════ */

let isSorting = false;

// ---------- Parse input ----------
function parseInput() {
    const raw = document.getElementById('arrayInput').value.trim();
    if (!raw) return null;

    // accept comma-separated, space-separated, or mixed
    const tokens = raw.split(/[\s,]+/).filter(Boolean);
    const nums = tokens.map(t => parseInt(t, 10));

    for (const n of nums) {
        if (isNaN(n)) return null;
    }
    return nums;
}

// ---------- Start sorting ----------
function startSort() {
    if (isSorting) return;

    const arr = parseInput();
    if (!arr || arr.length === 0) {
        setStatus('⚠ Please enter valid numbers separated by commas or spaces', '');
        return;
    }

    const algoSelect = document.getElementById('sortingAlgo');
    const algo = algoSelect.value;
    if (!algo) {
        setStatus('⚠ Please choose a sorting algorithm first', '');
        return;
    }

    // draw initial state
    drawBars(arr);
    resetStats();

    // lock controls & show playback
    isSorting = true;
    setControlsDisabled(true);
    showPlayback();
    setStatus('Sorting with ' + algoSelect.options[algoSelect.selectedIndex].text + '…', 'sorting');

    // run
    let sortPromise;
    switch (algo) {
        case 'bubble': sortPromise = bubbleSort(arr); break;
        case 'selection': sortPromise = selectionSort(arr); break;
        case 'insertion': sortPromise = insertionSort(arr); break;
        case 'quick': sortPromise = quickSort(arr, 0, arr.length - 1); break;
        case 'merge': sortPromise = mergeSort(arr, 0, arr.length - 1); break;
        case 'heap': sortPromise = heapSort(arr); break;
        case 'shell': sortPromise = shellSort(arr); break;
        case 'counting': sortPromise = countingSort(arr); break;
        case 'radix': sortPromise = radixSort(arr); break;
        case 'tim': sortPromise = timSort(arr); break;
        default: sortPromise = Promise.resolve();
    }

    sortPromise.then(() => {
        celebrateAll();
        setStatus('✓ Sorted! ' + comparisons + ' comparisons, ' + swaps + ' swaps', 'done');
        isSorting = false;
        setControlsDisabled(false);
        hidePlayback();
    });
}

// ---------- Enable / Disable controls ----------
function setControlsDisabled(disabled) {
    document.getElementById('btnSort').disabled = disabled;
    document.getElementById('btnGenerate').disabled = disabled;
    document.getElementById('sortingAlgo').disabled = disabled;
    document.getElementById('arrayInput').disabled = disabled;
    document.getElementById('sizeSlider').disabled = disabled;
    document.getElementById('btnSurprise').disabled = disabled;
}

// ---------- Surprise Me ----------
const ALGO_NAMES = {
    bubble: 'Bubble Sort', selection: 'Selection Sort', insertion: 'Insertion Sort',
    quick: 'Quick Sort', merge: 'Merge Sort', heap: 'Heap Sort',
    shell: 'Shell Sort', counting: 'Counting Sort', radix: 'Radix Sort', tim: 'Tim Sort'
};

function surpriseMe() {
    if (isSorting) return;

    const algos = Object.keys(ALGO_NAMES);
    const pick = algos[Math.floor(Math.random() * algos.length)];

    // Set the algorithm
    const sel = document.getElementById('sortingAlgo');
    sel.value = pick;
    sel.dispatchEvent(new Event('change'));

    // Generate a fresh random array
    generateArray();

    // Announce choice
    setStatus(`🎲 Surprise! Let's try ${ALGO_NAMES[pick]}...`, '');

    // Auto-start after a brief teaser delay
    setTimeout(() => {
        if (!isSorting) startSort();
    }, 600);
}
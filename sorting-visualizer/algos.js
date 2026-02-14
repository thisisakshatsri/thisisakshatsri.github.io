/* ═══════════════════════════════════════════════════════════════
   Sorting Algorithms — with code-panel line tracking
   ═══════════════════════════════════════════════════════════════ */

// ─── Bubble Sort ────────────────────────────────────────────
async function bubbleSort(arr) {
    const n = arr.length;
    setCodeLine(1);
    for (let i = 0; i < n - 1; i++) {
        setCodeLine(2);
        for (let j = 0; j < n - i - 1; j++) {
            setCodeLine(3);
            await waitIfPaused();
            setCodeLine(4);
            highlightBars(j, j + 1);
            incComparisons();
            await sleep(animSpeed);

            if (arr[j] > arr[j + 1]) {
                setCodeLine(5);
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapBars(j, j + 1);
                incSwaps();
                await sleep(animSpeed);
            }
            unhighlightBars(j, j + 1);
        }
        setCodeLine(6);
        markSorted(n - i - 1);
    }
    markSorted(0);
    clearCodeHighlight();
}

// ─── Selection Sort ─────────────────────────────────────────
async function selectionSort(arr) {
    const n = arr.length;
    setCodeLine(1);
    for (let i = 0; i < n - 1; i++) {
        setCodeLine(2);
        let minIdx = i;
        setCodeLine(3);
        for (let j = i + 1; j < n; j++) {
            setCodeLine(4);
            await waitIfPaused();
            setCodeLine(5);
            highlightBars(minIdx, j);
            incComparisons();
            await sleep(animSpeed);

            if (arr[j] < arr[minIdx]) {
                setCodeLine(6);
                unhighlightBars(minIdx, j);
                minIdx = j;
            } else {
                unhighlightBars(minIdx, j);
            }
        }
        if (minIdx !== i) {
            setCodeLine(7);
            await waitIfPaused();
            highlightBars(i, minIdx);
            await sleep(animSpeed);
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            swapBars(i, minIdx);
            incSwaps();
            await sleep(animSpeed);
            unhighlightBars(i, minIdx);
        }
        setCodeLine(8);
        markSorted(i);
    }
    markSorted(arr.length - 1);
    clearCodeHighlight();
}

// ─── Insertion Sort ─────────────────────────────────────────
async function insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        setCodeLine(1);
        let key = arr[i];
        setCodeLine(2);
        let j = i - 1;
        setCodeLine(3);
        while (j >= 0 && arr[j] > key) {
            setCodeLine(4);
            await waitIfPaused();
            highlightBars(j, j + 1);
            incComparisons();
            await sleep(animSpeed);

            setCodeLine(5);
            arr[j + 1] = arr[j];
            swapBars(j, j + 1);
            incSwaps();
            await sleep(animSpeed);
            unhighlightBars(j, j + 1);
            setCodeLine(6);
            j--;
        }
        if (j >= 0) incComparisons();
        setCodeLine(7);
        arr[j + 1] = key;
    }
    clearCodeHighlight();
}

// ─── Quick Sort ─────────────────────────────────────────────
async function quickSort(arr, lo, hi) {
    setCodeLine(0);
    if (lo < hi) {
        setCodeLine(1);
        const pi = await partition(arr, lo, hi);
        setCodeLine(2);
        setCodeLine(3);
        await quickSort(arr, lo, pi - 1);
        setCodeLine(4);
        await quickSort(arr, pi + 1, hi);
    }
    if (lo === hi) markSorted(lo);
    if (lo === 0 && hi === arr.length - 1) clearCodeHighlight();
}

async function partition(arr, lo, hi) {
    setCodeLine(6);
    const pivot = arr[hi];
    setCodeLine(7);
    let i = lo - 1;
    setCodeLine(8);

    for (let j = lo; j < hi; j++) {
        setCodeLine(9);
        await waitIfPaused();
        setCodeLine(10);
        highlightBars(j, hi);
        incComparisons();
        await sleep(animSpeed);

        if (arr[j] <= pivot) {
            setCodeLine(11);
            i++;
            if (i !== j) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                swapBars(i, j);
                incSwaps();
                await sleep(animSpeed);
            }
        }
        unhighlightBars(j, hi);
    }

    i++;
    if (i !== hi) {
        setCodeLine(12);
        await waitIfPaused();
        highlightBars(i, hi);
        [arr[i], arr[hi]] = [arr[hi], arr[i]];
        swapBars(i, hi);
        incSwaps();
        await sleep(animSpeed);
        unhighlightBars(i, hi);
    }
    setCodeLine(13);
    markSorted(i);
    return i;
}

// ─── Merge Sort ─────────────────────────────────────────────
async function mergeSort(arr, lo, hi) {
    setCodeLine(0);
    if (lo >= hi) { setCodeLine(1); return; }

    const mid = Math.floor((lo + hi) / 2);
    setCodeLine(2);
    setCodeLine(3);
    await mergeSort(arr, lo, mid);
    setCodeLine(4);
    await mergeSort(arr, mid + 1, hi);
    setCodeLine(5);
    await merge(arr, lo, mid, hi);
    if (lo === 0 && hi === arr.length - 1) clearCodeHighlight();
}

async function merge(arr, lo, mid, hi) {
    setCodeLine(7);
    const left = arr.slice(lo, mid + 1);
    setCodeLine(8);
    const right = arr.slice(mid + 1, hi + 1);
    setCodeLine(9);
    const maxVal = Math.max(...arr);

    let i = 0, j = 0, k = lo;
    setCodeLine(10);

    while (i < left.length && j < right.length) {
        setCodeLine(11);
        await waitIfPaused();
        highlightBars(lo + i, mid + 1 + j);
        incComparisons();
        await sleep(animSpeed);

        if (left[i] <= right[j]) {
            setCodeLine(12);
            arr[k] = left[i];
            updateBar(k, left[i], maxVal);
            i++;
        } else {
            setCodeLine(14);
            arr[k] = right[j];
            updateBar(k, right[j], maxVal);
            j++;
        }
        incSwaps();
        unhighlightBars(lo + i, mid + 1 + j);
        k++;
        await sleep(animSpeed);
    }

    setCodeLine(15);
    while (i < left.length) {
        await waitIfPaused();
        arr[k] = left[i];
        updateBar(k, left[i], maxVal);
        incSwaps();
        i++;
        k++;
        await sleep(animSpeed);
    }

    while (j < right.length) {
        await waitIfPaused();
        arr[k] = right[j];
        updateBar(k, right[j], maxVal);
        incSwaps();
        j++;
        k++;
        await sleep(animSpeed);
    }
}

// ─── Heap Sort ──────────────────────────────────────────────
async function heapSort(arr) {
    const n = arr.length;
    setCodeLine(0);

    // Build max-heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        setCodeLine(1);
        await heapify(arr, n, i);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        setCodeLine(3);
        await waitIfPaused();
        highlightBars(0, i);
        await sleep(animSpeed);

        setCodeLine(4);
        [arr[0], arr[i]] = [arr[i], arr[0]];
        swapBars(0, i);
        incSwaps();
        await sleep(animSpeed);
        unhighlightBars(0, i);

        setCodeLine(5);
        markSorted(i);

        setCodeLine(6);
        await heapify(arr, i, 0);
    }
    markSorted(0);
    clearCodeHighlight();
}

async function heapify(arr, n, i) {
    setCodeLine(8);
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
        setCodeLine(9);
        highlightBars(largest, left);
        incComparisons();
        await sleep(animSpeed);
        if (arr[left] > arr[largest]) largest = left;
        unhighlightBars(i, left);
    }

    if (right < n) {
        setCodeLine(10);
        highlightBars(largest, right);
        incComparisons();
        await sleep(animSpeed);
        if (arr[right] > arr[largest]) largest = right;
        unhighlightBars(i, right);
    }

    if (largest !== i) {
        setCodeLine(11);
        await waitIfPaused();
        highlightBars(i, largest);
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        swapBars(i, largest);
        incSwaps();
        await sleep(animSpeed);
        unhighlightBars(i, largest);

        await heapify(arr, n, largest);
    }
}

// ─── Shell Sort ─────────────────────────────────────────────
async function shellSort(arr) {
    const n = arr.length;
    setCodeLine(0);

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        setCodeLine(1);
        for (let i = gap; i < n; i++) {
            setCodeLine(2);
            let temp = arr[i];
            setCodeLine(3);
            let j = i;

            while (j >= gap) {
                setCodeLine(4);
                await waitIfPaused();
                highlightBars(j, j - gap);
                incComparisons();
                await sleep(animSpeed);

                if (arr[j - gap] > temp) {
                    setCodeLine(5);
                    arr[j] = arr[j - gap];
                    swapBars(j, j - gap);
                    incSwaps();
                    await sleep(animSpeed);
                    unhighlightBars(j, j - gap);
                    j -= gap;
                } else {
                    unhighlightBars(j, j - gap);
                    break;
                }
            }
            setCodeLine(6);
            arr[j] = temp;
        }
    }
    clearCodeHighlight();
}

// ─── Counting Sort ──────────────────────────────────────────
async function countingSort(arr) {
    const n = arr.length;
    setCodeLine(0);
    const maxVal = Math.max(...arr);
    const minVal = Math.min(...arr);
    const range = maxVal - minVal + 1;

    setCodeLine(1);
    const count = new Array(range).fill(0);

    // Count occurrences
    setCodeLine(2);
    for (let i = 0; i < n; i++) {
        await waitIfPaused();
        highlightBars(i, i);
        count[arr[i] - minVal]++;
        incComparisons();
        await sleep(animSpeed);
        unhighlightBars(i, i);
    }

    // Reconstruct array
    setCodeLine(3);
    let pos = 0;
    const mx = maxVal;
    for (let i = 0; i < range; i++) {
        setCodeLine(4);
        while (count[i] > 0) {
            setCodeLine(5);
            await waitIfPaused();
            arr[pos] = i + minVal;
            updateBar(pos, i + minVal, mx);
            incSwaps();

            highlightBars(pos, pos);
            await sleep(animSpeed);
            unhighlightBars(pos, pos);

            setCodeLine(6);
            markSorted(pos);
            count[i]--;
            pos++;
        }
    }
    clearCodeHighlight();
}

// ─── Radix Sort (LSD) ──────────────────────────────────────
async function radixSort(arr) {
    const n = arr.length;
    setCodeLine(0);
    const maxVal = Math.max(...arr);
    const mx = maxVal;

    setCodeLine(1);
    for (let exp = 1; Math.floor(maxVal / exp) > 0; exp *= 10) {
        setCodeLine(2);
        await radixCountSort(arr, n, exp, mx);
    }
    clearCodeHighlight();
}

async function radixCountSort(arr, n, exp, mx) {
    const output = new Array(n);
    const count = new Array(10).fill(0);

    setCodeLine(3);
    for (let i = 0; i < n; i++) {
        await waitIfPaused();
        highlightBars(i, i);
        incComparisons();
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
        await sleep(animSpeed);
        unhighlightBars(i, i);
    }

    setCodeLine(4);
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];

    setCodeLine(5);
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }

    setCodeLine(6);
    for (let i = 0; i < n; i++) {
        await waitIfPaused();
        arr[i] = output[i];
        updateBar(i, output[i], mx);
        incSwaps();

        highlightBars(i, i);
        await sleep(animSpeed);
        unhighlightBars(i, i);
    }
}

// ─── Tim Sort ───────────────────────────────────────────────
const TIM_RUN = 16;

async function timSort(arr) {
    const n = arr.length;
    setCodeLine(0);

    // Sort individual runs with insertion sort
    setCodeLine(1);
    for (let i = 0; i < n; i += TIM_RUN) {
        setCodeLine(2);
        await timInsertionSort(arr, i, Math.min(i + TIM_RUN - 1, n - 1));
    }

    // Merge runs
    setCodeLine(4);
    const maxVal = Math.max(...arr);
    for (let size = TIM_RUN; size < n; size *= 2) {
        setCodeLine(5);
        for (let left = 0; left < n; left += 2 * size) {
            const mid = Math.min(left + size - 1, n - 1);
            const right = Math.min(left + 2 * size - 1, n - 1);
            if (mid < right) {
                setCodeLine(6);
                await timMerge(arr, left, mid, right, maxVal);
            }
        }
    }
    clearCodeHighlight();
}

async function timInsertionSort(arr, lo, hi) {
    for (let i = lo + 1; i <= hi; i++) {
        setCodeLine(3);
        let key = arr[i];
        let j = i - 1;
        while (j >= lo && arr[j] > key) {
            await waitIfPaused();
            highlightBars(j, j + 1);
            incComparisons();
            await sleep(animSpeed);

            arr[j + 1] = arr[j];
            swapBars(j, j + 1);
            incSwaps();
            await sleep(animSpeed);
            unhighlightBars(j, j + 1);
            j--;
        }
        if (j >= lo) incComparisons();
        arr[j + 1] = key;
    }
}

async function timMerge(arr, lo, mid, hi, maxVal) {
    setCodeLine(7);
    const left = arr.slice(lo, mid + 1);
    const right = arr.slice(mid + 1, hi + 1);
    let i = 0, j = 0, k = lo;

    while (i < left.length && j < right.length) {
        await waitIfPaused();
        highlightBars(lo + i, mid + 1 + j);
        incComparisons();
        await sleep(animSpeed);

        if (left[i] <= right[j]) {
            arr[k] = left[i];
            updateBar(k, left[i], maxVal);
            i++;
        } else {
            arr[k] = right[j];
            updateBar(k, right[j], maxVal);
            j++;
        }
        incSwaps();
        unhighlightBars(lo + i, mid + 1 + j);
        k++;
        await sleep(animSpeed);
    }

    while (i < left.length) {
        await waitIfPaused();
        arr[k] = left[i];
        updateBar(k, left[i], maxVal);
        incSwaps(); i++; k++;
        await sleep(animSpeed);
    }
    while (j < right.length) {
        await waitIfPaused();
        arr[k] = right[j];
        updateBar(k, right[j], maxVal);
        incSwaps(); j++; k++;
        await sleep(animSpeed);
    }
}
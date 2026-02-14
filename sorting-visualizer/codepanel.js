/* ═══════════════════════════════════════════════════════════════
   Code Panel — Pseudocode display with live line highlighting
   ═══════════════════════════════════════════════════════════════ */

const PSEUDOCODE = {
    bubble: [
        'function bubbleSort(arr):',
        '  n = arr.length',
        '  for i = 0 to n-1:',
        '    for j = 0 to n-i-2:',
        '      if arr[j] > arr[j+1]:',
        '        swap(arr[j], arr[j+1])',
        '    mark position n-i-1 as sorted',
    ],
    selection: [
        'function selectionSort(arr):',
        '  n = arr.length',
        '  for i = 0 to n-1:',
        '    minIdx = i',
        '    for j = i+1 to n:',
        '      if arr[j] < arr[minIdx]:',
        '        minIdx = j',
        '    swap(arr[i], arr[minIdx])',
        '    mark position i as sorted',
    ],
    insertion: [
        'function insertionSort(arr):',
        '  for i = 1 to n:',
        '    key = arr[i]',
        '    j = i - 1',
        '    while j >= 0 and arr[j] > key:',
        '      arr[j+1] = arr[j]  // shift right',
        '      j = j - 1',
        '    arr[j+1] = key',
    ],
    quick: [
        'function quickSort(arr, lo, hi):',
        '  if lo < hi:',
        '    pivot = partition(arr, lo, hi)',
        '    quickSort(arr, lo, pivot-1)',
        '    quickSort(arr, pivot+1, hi)',
        '',
        'function partition(arr, lo, hi):',
        '  pivot = arr[hi]',
        '  i = lo - 1',
        '  for j = lo to hi-1:',
        '    if arr[j] <= pivot:',
        '      i++; swap(arr[i], arr[j])',
        '  swap(arr[i+1], arr[hi])',
        '  return i + 1',
    ],
    merge: [
        'function mergeSort(arr, lo, hi):',
        '  if lo >= hi: return',
        '  mid = floor((lo + hi) / 2)',
        '  mergeSort(arr, lo, mid)',
        '  mergeSort(arr, mid+1, hi)',
        '  merge(arr, lo, mid, hi)',
        '',
        'function merge(arr, lo, mid, hi):',
        '  left = arr[lo..mid]',
        '  right = arr[mid+1..hi]',
        '  while both have elements:',
        '    if left[i] <= right[j]:',
        '      arr[k] = left[i++]',
        '    else:',
        '      arr[k] = right[j++]',
        '  copy remaining elements',
    ],
    heap: [
        'function heapSort(arr):',
        '  buildMaxHeap(arr)          // sift down',
        '  // extract elements',
        '  for i = n-1 down to 1:',
        '    swap(arr[0], arr[i])     // move max to end',
        '    mark i as sorted',
        '    heapify(arr, i, 0)',
        '',
        'function heapify(arr, n, i):',
        '  if left > arr[largest]: largest = left',
        '  if right > arr[largest]: largest = right',
        '  if largest != i:',
        '    swap(arr[i], arr[largest])',
        '    heapify(arr, n, largest)',
    ],
    shell: [
        'function shellSort(arr):',
        '  for gap = n/2; gap > 0; gap /= 2:',
        '    for i = gap to n:',
        '      temp = arr[i]; j = i',
        '      while j >= gap and arr[j-gap] > temp:',
        '        arr[j] = arr[j-gap]  // shift',
        '        j -= gap',
        '      arr[j] = temp',
    ],
    counting: [
        'function countingSort(arr):',
        '  count = new array[max - min + 1]',
        '  for each element: count[val]++',
        '  pos = 0',
        '  for i in range:',
        '    while count[i] > 0:',
        '      arr[pos++] = i + min',
        '      mark position sorted',
    ],
    radix: [
        'function radixSort(arr):',
        '  for exp = 1; max/exp > 0; exp *= 10:',
        '    countSortByDigit(arr, exp)',
        '',
        '  // count digit occurrences',
        '  for each element: count[digit]++',
        '  // build cumulative count',
        '  // place elements in output',
        '  // copy output back to arr',
    ],
    tim: [
        'function timSort(arr):',
        '  // Phase 1: sort small runs',
        '  for each run of size RUN:',
        '    insertionSort(run)',
        '  // Phase 2: merge runs',
        '  for size = RUN; size < n; size *= 2:',
        '    for each pair of runs:',
        '      merge(left, right)',
    ],
};

let codePanelVisible = false;

function toggleCodePanel() {
    codePanelVisible = !codePanelVisible;
    const panel = document.getElementById('codePanel');
    const btn = document.getElementById('btnCode');
    panel.classList.toggle('visible', codePanelVisible);
    if (btn) btn.classList.toggle('active', codePanelVisible);
    updateCodePanel();
}

function updateCodePanel() {
    const algo = document.getElementById('sortingAlgo').value;
    const pre = document.getElementById('pseudocode');
    if (!algo || !PSEUDOCODE[algo]) {
        pre.innerHTML = '<span class="code-placeholder">Select an algorithm to view its code</span>';
        return;
    }
    const lines = PSEUDOCODE[algo];
    pre.innerHTML = lines.map((line, idx) =>
        `<span class="code-line" data-line="${idx}">${escapeHtml(line) || '&nbsp;'}</span>`
    ).join('\n');
}

function setCodeLine(lineIdx) {
    if (!codePanelVisible) return;
    const pre = document.getElementById('pseudocode');
    const lines = pre.querySelectorAll('.code-line');
    lines.forEach(l => l.classList.remove('active-line'));
    if (lines[lineIdx] && lines[lineIdx].textContent.trim() !== '') {
        lines[lineIdx].classList.add('active-line');
    }
}

function clearCodeHighlight() {
    const pre = document.getElementById('pseudocode');
    if (pre) pre.querySelectorAll('.code-line').forEach(l => l.classList.remove('active-line'));
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Update code panel when algorithm selection changes
document.getElementById('sortingAlgo').addEventListener('change', updateCodePanel);

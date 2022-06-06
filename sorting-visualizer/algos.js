async function selectionSort(arr) {
    let n = arr.length;
        
    for(let i = 0; i < n; i++) {
        let min = i;
        for(let j = i+1; j < n; j++){
            if(arr[j] < arr[min]) {
                min=j; 
            }
         }
         if (min != i) {
            drawUnique(i, min)
            let tmp = arr[i]; 
            arr[i] = arr[min];
            arr[min] = tmp;
            await sleep(200)
            swap(i, min)
            await sleep(100)
            drawSame(i, min)      
        }
    }
}

async function bubbleSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < (arr.length - i - 1); j++) {
            if (arr[j] > arr[j + 1]) {


                drawUnique(j, j+1)

                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp

                await sleep(200)
                swap(j, j+1)
                await sleep(100)
                drawSame(j, j+1)  
            }
        }
    }
}

async function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let j = i - 1;
        let temp = arr[i];
        while (j >= 0 && arr[j] > temp) {
            drawUnique(j, j+1)
            arr[j + 1] = arr[j];
            await sleep(200)
            swap(j, j+1)
            await sleep(100)
            drawSame(j, j+1) 
            j--;
        }
        arr[j + 1] = temp;
    }
}

async function quickSort(arr) {
    let l = 0
    let h = arr.length-1;
    let n = arr.lenght
    let stack = new Array(h - l + 1);
    stack.fill(0);
    let top = -1;
    stack[++top] = l;
    stack[++top] = h;
    while (top >= 0) {
        h = stack[top--];
        l = stack[top--];
        let temp;
        let pivot = arr[h];
        let i = (l - 1);
        for (let j = l; j <= h - 1; j++) {
            if (arr[j] <= pivot) {
                i++;

                drawUnique(i, j)


                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;

                await sleep(200)
                swapp(i, j)
                await sleep(100)
                drawSame(i, j)    
            }
        }

        drawUnique(i+1, h)

        temp = arr[i + 1];
        arr[i + 1] = arr[h];
        arr[h] = temp;

        await sleep(200)
        swapp(i+1, h)
        await sleep(100)
        drawSame(i+1, h)

        let p = i + 1;;
        if (p - 1 > l) {
            stack[++top] = l;
            stack[++top] = p - 1;
        }
        if (p + 1 < h) {
            stack[++top] = p + 1;
            stack[++top] = h;
        }
    }
}

async function mergeSort(arr) {
    let n = arr.length;
    let temp = new Array(n);
    for (let i = 0; i < n; i++) {
        temp[i] = arr[i];
    }
    let l = 0;
    let h = n - 1;
    let m = Math.floor((l + h) / 2);
    let i = 0;
    let j = m + 1;
    while (i <= m && j <= h) {
        if (temp[i] <= temp[j]) {
            drawUnique(i, j)
            arr[i] = temp[i];
            i++;
        } else {
            drawUnique(i, j)
            arr[j] = temp[j];
            j++;
        }
        await sleep(200)
        swap(i, j)
        await sleep(100)
        drawSame(i, j)
    }
    while (i <= m) {
        drawUnique(i, j)
        arr[j] = temp[i];
        j++;
        i++;
        await sleep(200)
        swap(i, j)
        await sleep(100)
        drawSame(i, j)
    }
    while (j <= h) {
        drawUnique(i, j)
        arr[j] = temp[j];
        j++;
        await sleep(200)
        swap(i, j)
        await sleep(100)
        drawSame(i, j)
    }
}
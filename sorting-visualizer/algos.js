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
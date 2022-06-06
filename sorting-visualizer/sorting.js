var arr = [34, 23];
var block = '<div class="block"></div>';
var piles = '<div class="pile"></div>';
var q = document.querySelector(".numbers");

var drawUnique = (i, j) => {
    q1 = document.getElementsByClassName("block")[i]
    q2 = document.getElementsByClassName("block")[j]

    for (let i = 0; i < q1.childNodes.length; i++) {
        q1.childNodes[i].className = "un1";
    }
    for (let i = 0; i < q2.childNodes.length; i++) {
        q2.childNodes[i].className = "un2";
    }
}

var drawSame = (i, j) => {
    q1 = document.getElementsByClassName("block")[i]
    q2 = document.getElementsByClassName("block")[j]

    for (let i = 0; i < q1.childNodes.length; i++) {
        q1.childNodes[i].className = "pile";
    }
    for (let i = 0; i < q2.childNodes.length; i++) {
        q2.childNodes[i].className = "pile";
    }
}

var swap = (i1, i2) => {
    q1 = document.getElementsByClassName("block")[i1]
    q2 = document.getElementsByClassName("block")[i2]

    var temp = q1.innerHTML
    q1.innerHTML = q2.innerHTML
    q2.innerHTML = temp
}



const validate = () => {
    let q = document.querySelector("#array")
    var alertMsg = ""
    var num = q.value.split(" ").map(x => parseInt(x)); 
    for (let i = 0; i < num.length; i++) {
        if(isNaN(num[i])){
            alertMsg = "Invalid Input"
            break
        }
    }
    if(alertMsg!=""){
        alert(alertMsg)
    }
    else{
        simulate(num)
    }
}

let simulate = (arr) => {
    draw(arr)

    
    var q = document.querySelector("#sortingAlgo")
    let algo = q.value
    if(algo=="insertion")
        insertionSort(arr)
    else if(algo == "selection")
        selectionSort(arr)
    else if(algo == "bubble")
        bubbleSort(arr)   
    else if(algo == "quick")
        quickSort(arr)
    else if(algo == "merge")
        mergeSort(arr)
}
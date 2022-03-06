function generateArray(){
    var size = 10;
    let n
    let q = document.querySelector("#array")
    q.value = ""
    for (let i = 0; i < size; i++) {
        n = Math.floor((Math.random() * 50) + 1);
        q.value += n
        if(i<size-1){
            q.value += ", "
        }
    }
}

var draw = (arr) => {
    q.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        q.innerHTML += block;
        var j = document.getElementsByClassName("block")[i];
        for(let k=0; k<p; k++){
            j.innerHTML += piles;
        }
    }
};

function sleep(milliseconds) {  
    return new Promise(resolve => setTimeout(resolve, milliseconds));  
}
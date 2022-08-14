
function sleep(milliseconds) {  
    return new Promise(resolve => setTimeout(resolve, milliseconds));  
}

function draw(grid, rows, cols){
    let id = 1;
    var q = document.querySelector(".grid")
    var rowhtml = '<div class="rw"></div>'
    q.innerHTML = ""
    for(var i = 0; i<rows; i++) {
        q.innerHTML += rowhtml
        var el = document.querySelectorAll(".rw")[i]
        el.innerHTML = ""
        for(var j=0; j<cols; j++) {
            el.innerHTML += '<div class="cell" id='+ id +' ></div>'
            grid[i][j].id = id
            grid[i][j].show("white")
            id++
        }
    }
}

async function drawPath(node, col="yellow") {
    var cot = 0
    while(node!=undefined) {
        cot++
        node.show(col)
        
        await sleep(10)
        node = node.parent
    }
    console.log(cot)
}

function valid(i, j, rows, cols){
    if (i<0 || j<0 || i>=rows || j>=cols){
        return false
    } else {
        return true
    }
}

function one2two(one, rows, cols){
    // Takes one based flattend index and returns two zero based Index index 
    
    var r = Math.floor((one-1)/cols)
    
    var c = ((one-1)%cols)

    var arr = [r,c]
    return arr
}

function removeFromArray(arr, elt){
    for(var i=arr.length-1; i>=0; i--){
        if (arr[i] == elt){
            arr.splice(i, 1)
        }
    }
}

function heuristic(a, b) {
    // var d = abs(a.i-b.i)+abs(a.j-b.j)
    var d = Math.pow(Math.pow(a.i-b.i,2) + Math.pow(a.j-b.j, 2), 0.5)
    return d
}
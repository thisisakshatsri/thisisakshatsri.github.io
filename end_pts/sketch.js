
function removeFromArray(arr, elt){
    for(var i=arr.length-1; i>=0; i--){
        if (arr[i] == elt){
            arr.splice(i, 1)
        }
    }
}

function heuristic(a, b) {
    // var d = abs(a.i-b.i)+abs(a.j-b.j)
    var d = dist(a.i, a.j, b.i, b.j)
    return d
}

function valid(i, j){
    if (i<0 || j<0 || i>=cols || j>=rows){
        return false
    } else {
        return true
    }
}


var rows = 50
var cols = 50
var grid = new Array(cols)


var openSet = []
var closeSet = []
var start;
var end;
var w,h
var path = []

var rA = [0,1,0,-1,1,1,-1,-1]
var rB = [1,0,-1,0,1,-1,-1,1]
function Spot(i, j) {
    this.i = i
    this.j = j
    this.f = 0
    this.g = 0
    this.h = 0
    this.neighbors = []
    this.previous = undefined
    this.wall = false
    
    if (random(1) < 0.4) {
        this.wall = true
    }

    this.show = function(col) {
        fill(col)
        if (this.wall){
            fill(0)
            noStroke()
            ellipse(this.i*w+w/2, this.j*h+h/2, w/2, h/2)
        }

        // rect(this.i*w, this.j*h, w-1, h-1)
    }
    
    this.addNeighbors = function(grid) {
        var i = this.i;
        var j = this.j;

        for(var k=0; k<8; k++){
            if (valid(i+rA[k], j+rB[k])){
                this.neighbors.push(grid[i+rA[k]][j+rB[k]])
            }
        }
    } 

}


function setup(){
    createCanvas(500, 500)
    console.log("A*")
    
    w = width / cols
    h = height / rows
    for(var i =0; i<cols; i++){
        grid[i] = new Array(rows);
    }
    
    for(var i=0; i<cols; i++){
        for(var j=0; j<rows; j++){
            grid[i][j] = new Spot(i,j);
        }
    }

    for(var i=0; i<cols; i++){
        for(var j=0; j<rows; j++){
            grid[i][j].addNeighbors(grid);
        }
    }
    
    start = grid[0][0]
    end = grid[cols-1][rows-1]
    start.wall = false
    end.wall = false


    openSet.push(start);


}

function draw(){
    background(255)

    
    if (openSet.length > 0){
        var winner = 0
        
        for( var i=0; i<openSet.length; i++){
            if (openSet[i].f < openSet[winner].f){
                winner = i
            }
        }

        var current = openSet[winner]

        

        if (current == end){

           
            noLoop()
            console.log("Done!")
        }

        removeFromArray(openSet, current) 
        closeSet.push(current)

        var neighbors = current.neighbors
        for (var i=0; i<neighbors.length; i++){
            var nbr = neighbors[i]

            if (!closeSet.includes(nbr) && !nbr.wall){
                var tempG = current.g + 1
                
                var newPath = false
                if (openSet.includes(nbr)){
                    if (tempG < nbr.g){
                        nbr.g=tempG
                        newPath = true
                    }
                } else {
                    nbr.g = tempG
                    newPath = true
                    openSet.push(nbr)
                }

                if(newPath){
                    nbr.h = heuristic(nbr, end)
                    nbr.f = nbr.g + nbr.h
                    nbr.previous = current

                }

            }

        }
        
        
        // Keep Going
    }
    else {


        console.log("No Solution")
        // No Solution
        noLoop()
        return
    }

    for(var i = 0; i<cols; i++){
        for(var j = 0; j<rows; j++){
            grid[i][j].show(color(255))
        }
    }

    // for(var i = 0 ; i<closeSet.length; i++){
    //     closeSet[i].show(color(255,0,0))
    // }
    // for(var i=0; i<openSet.length; i++){
    //     openSet[i].show(color(0,255,0))
    // }

    var temp = current
    
    path = []
    path.push(temp)
    while (temp.previous){
        path.push(temp.previous)
        temp = temp.previous
    }

    

    noFill()
    stroke(255,0,0)
    strokeWeight(w/2)
    beginShape()
    for(var i=0; i<path.length; i++){
        vertex(path[i].i*w + w/2, path[i].j*h+h/2)
    }

    endShape()
    
}

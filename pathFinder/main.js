import {Queue, Stack, PriorityQueue} from './dataStructure.js'


// Global Variables
var rows = 35
var cols = 80
var visited = new Array(rows*cols)
var start
var end 

var grid = new Array(rows)
var rA = [0,1,0,-1]
var rB = [1,0,-1,0]


// Cell Initialization
class Cell {
    constructor(i, j) {
        this.i = i
        this.j = j
        this.weighted = false
        this.cost = 1
        this.id = undefined
        this.parent = undefined
        this.neighbors = []
        this.wall = false
        this.fscore = 0
        this.gscore = 100000
        this.hscore = 0
        
        
        
        this.addNeighbors = function(grid) {
            this.neighbors.length = 0
            var i = this.i;
            var j = this.j;
            
            for(var k=0; k<rA.length; k++){
                if (valid(i+rA[k], j+rB[k], rows, cols) && !this.wall){
                    this.neighbors.push(grid[i+rA[k]][j+rB[k]])
                }
            }
        } 
        
        this.show = function(color){
            document.getElementById(this.id).style.backgroundColor = color
            if (this.wall){
                document.getElementById(this.id).style.backgroundColor = "black"
            }
        }
    }
}



/// Initial Boiler Plate Code
setup()
// init()



// Event Handler and their functions
document.getElementById("generate").addEventListener("click", function(){ resetBoard(true) })
document.getElementById("resetfull").addEventListener("click", function(){ resetBoard(false) })

var elements = document.getElementsByClassName("cell")
Array.from(elements).forEach(function(element) {
    element.addEventListener('click', toggleWall);
});




function toggleWall(){
    var arr = one2two(this.id, rows, cols)
    var cell = grid[arr[0]][arr[1]]
    console.log(cell.id)
    if(cell.wall) {
        cell.wall = false
        cell.show("white")
    } else {
        cell.wall = true
        cell.show("black")
    }
    var i = arr[0]
    var j = arr[1]
    for(var k=0; k<8; k++){
        if (valid(i+rA[k], j+rB[k], rows, cols)){
            if(cell.wall) {
                removeFromArray(grid[i+rA[k]][j+rB[k]].neighbors, cell)
            } else {
                grid[i+rA[k]][j+rB[k]].neighbors.push(cell)
            }
        }
    }
}

function resetBoard(maze) { // Maze is boolean Value. False leads to clear board, true leads to a random maze.

    for(var i=0; i<rows; i++) {
        for(var j=0; j<cols; j++) {
            grid[i][j].gscore = 100000
            if(maze) { 
                if(Math.random() < 0.3) {
                    grid[i][j].wall = true
                    grid[i][j].show("black")
                } else {
                    grid[i][j].wall = false
                    grid[i][j].show("white")
                }
            }
            else {
                grid[i][j].wall = false
                grid[i][j].show("white")
            }
        }
    }

    for(var i=0; i<rows; i++){
        for(var j=0; j<cols; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    for(var i=0; i<rows*cols; i++) {
        visited[i] = false
    }

    start.wall = false
    end.wall = false
    start.show("white")
    end.show("white")
}

document.getElementById("simulate").addEventListener("click", init)



function init(){
    
    for(var i=0; i<rows*cols; i++) {
        visited[i] = false
    }

   
    var algo = document.getElementById("algo").value
    
    if(algo == "bfs")
        bfs()
    else if (algo == "dfs")
        dfs()
    else
        astar()


}
//// Main Functions

function setup() {
    for(var i =0; i<rows; i++){
        grid[i] = new Array(cols);
    }
    
    for(var i=0; i<rows; i++) {
        for(var j=0; j<cols; j++) {
            grid[i][j] = new Cell(i, j)
        } 
    }
    start = grid[0][0]
    end = grid[rows-1][cols-1]
    start.wall = false;
    end.wall = false
    for(var i=0; i<rows; i++) {
        for(var j=0; j<cols; j++) {
            grid[i][j].addNeighbors(grid)
        } 
    }
    
    draw(grid, rows, cols)

    
}

async function bfs(){ 
    var q = new Queue()
    q.enqueue(start)
    
    visited[start.id-1] = true
    
    while(!q.empty()) {
        var node = q.front()
        node.show("teal")
        q.dequeue()
        if(node == end) {
            drawPath(end)
            break
        }
        
        for(var i = 0; i<node.neighbors.length; i++) {
            if(!visited[node.neighbors[i].id-1]) {
                q.enqueue(node.neighbors[i])
                node.neighbors[i].show("blue")
                visited[node.neighbors[i].id-1] = true
                node.neighbors[i].parent = node
            }
        }
        await sleep(10)
        
    }
    
}   


async function dfs(){ 
    var s = new Stack()
    s.push(start)
    
    visited[start.id-1] = true
    
    while(!s.isempty()) {
        var node = s.pop()
        node.show("teal")
        
        if(node == end) {
            drawPath(end)
            break
        }
        
        for(var i = 0; i<node.neighbors.length; i++) {
            if(!visited[node.neighbors[i].id-1]) {
                s.push(node.neighbors[i])
                node.neighbors[i].show("blue")
                visited[node.neighbors[i].id-1] = true
                node.neighbors[i].parent = node
            }
        }
        await sleep(10)
    }
    
}   




// TODO : This Algo has Bugs. Fix it asap
async function astar() { 
    var openSet = new PriorityQueue()
    var openMap = new Map()
    var closeMap = new Map()

    for(var i=1; i<=rows*cols; i++) {
        openMap.set(i, false)
        closeMap.set(i, false)
    }


    start.gscore = 0
    openSet.enqueue(start, heuristic(start, end)) 
    openMap.set(start.id, true)
    while (!openSet.isEmpty()) {
        
        var current = openSet.dequeue().element
        openMap.set(current.id, false)
        
        if(current == end) {
            // Path Is Finished
            
            drawPath(end, "yellow")
            break
        }
        current.show("green")
        closeMap.set(current.id, true)
        for(var i = 0; i<current.neighbors.length; i++ ) {
            var nbr = current.neighbors[i]
            
            if(!closeMap.get(nbr.id) && !nbr.wall) {
                var tempG = current.gscore + nbr.cost
                var newPath = false
                var toAdd = false

                if(openMap.get(nbr.id)) {
                    if(tempG < nbr.gscore) {
                        nbr.gscore = tempG
                        newPath = true
                    }
                } else {
                    nbr.gscore = tempG
                    newPath = true
                    var toAdd = true
                }
                if (newPath) {
                    nbr.hscore = heuristic(nbr, end)
                    nbr.fscore = nbr.hscore + nbr.gscore
                    nbr.parent = current
                }
                if(openMap.get(nbr.id) == false) {
                    openSet.enqueue(nbr, nbr.fscore)
                    openMap.set(nbr.id, true)
                }
            }
        }

        await sleep(15)

        
        
    }
}
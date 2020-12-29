const field = document.getElementById("FileBack")
let square = document.getElementsByClassName("Sqier")
let arr = Array.from(Array(8), () => new Array(8));
let levelOfGame = document.getElementById("counterLevel")
let end = document.getElementById("End")
let step = 2
let dificulty = 6

class CreateNode{
    constructor(parent, positionArr, ownerOfStep, level, x, y ){
        this.parent = parent
        this.positionArr = positionArr
        this.childArr = []
        this.price = -1
        this.ownerOfStep = ownerOfStep
        this.level = level
        this.x = x
        this.y = y
    }
};


window.onload = function (){
    for (let a= 0; a < 8; a++) {
        for (let b = 0; b < 8; b++) {
            let temp = document.createElement("div")
            temp.style.top = (a*52.5)+"px"
            temp.style.left = (b*12.5)+"%"
            temp.className = "Sqier"
            temp.setAttribute("row", a)
            temp.setAttribute("column", b)  
            field.appendChild(temp)          
        }        
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j]=-1
        }        
    }
    square = document.getElementsByClassName("Sqier")
    arr[3][3] = 1
    PasteСhip(1, 3, 3)
    arr[4][4] = 1
    PasteСhip(1, 4, 4)
    arr[3][4] = 2
    PasteСhip(2, 3, 4)
    arr[4][3] = 2
    PasteСhip(2, 4, 3)
};

function CheckFreePlace(step, tempArr) {
    let count = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if(tempArr[i][j] != step && tempArr[i][j] != 0 && tempArr[i][j] != -1){
                if(i-1>-1 && arr[i-1][j] == -1){
                    tempArr[i-1][j]=0; 
                  //  square[(i-1)*8+j].style.border = "solid 2px deeppink";
                    count++}
                if(i+1<8 && tempArr[i+1][j] == -1){
                    tempArr[i+1][j]=0; 
                   // square[(i+1)*8+j].style.border = "solid 2px deeppink"; 
                    count++}
                if(j+1<8 && tempArr[i][j+1] == -1){
                    tempArr[i][j+1]=0; 
                   //square[i*8+j+1].style.border = "solid 2px deeppink"; 
                    count++}
                if(j-1>-1 && tempArr[i][j-1] == -1){
                    tempArr[i][j-1]=0; 
                   // square[i*8+j-1].style.border = "solid 2px deeppink"; 
                    count++
                }
            }            
        }    
    }
    if(count == 0){return false}
    else{return true}
}

function PasteСhip(step, tempRow, tempColum){ 
    let temp = document.createElement("div")
    if(step == 1){temp.className= "circleWhite"}
    if(step == 2){temp.className= "circleBlack"}
    
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let x = i*8+j
            if(square[x].getAttribute("row") == tempRow && square[x].getAttribute("column")== tempColum){
                square[x].appendChild(temp)
                arr[tempRow][tempColum]=step
            }            
        }
    }

    return arr
};

function ReturnToBegin(tempArr){
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if(tempArr[i][j] == 0){
                tempArr[i][j]=-1     
            }   
        }       
    }    
    return tempArr
};

function ChangeColor(tempRow, tempCol, tempArr, ownerOfStep) {
    let i = tempRow+1; j = tempCol+1

    while (i<8 && j<8 && tempArr[i][j]!= -1 && tempArr[i][j]!= ownerOfStep ) {i++; j++}
    if(i<8 && j<8 && tempArr[i][j] == ownerOfStep){
        let l = tempCol
        for (let k = tempRow+1; k < i; k++) {
            if( l++ < j){
                if(ownerOfStep == 1)square[k*8+l].firstChild.className = "circleWhite"
                if(ownerOfStep == 2)square[k*8+l].firstChild.className= "circleBlack" 
                tempArr[k][l]=ownerOfStep
            }
        }
    }

    i = tempRow-1; j = tempCol-1
    while ((i>-1 && j>-1) && tempArr[i][j]!= -1 && tempArr[i][j]!= ownerOfStep) {i--; j--}
         if(i>-1 && j>-1 && tempArr[i][j] == ownerOfStep){
            l = tempCol
        for (let k = tempRow-1; k > i; k--) {
            l--
            if(l > j){
                if(ownerOfStep == 1 && square[k*8+l].firstChild != null)square[k*8+l].firstChild.className= "circleWhite"
                if(ownerOfStep == 2 && square[k*8+l].firstChild != null)square[k*8+l].firstChild.className= "circleBlack" 
                arr[k][l]=ownerOfStep
            }
        }
    }

    i = tempRow-1; j = parseInt(tempCol)    
    while (i > -1  && tempArr[i][j] != -1 && tempArr[i][j]!= ownerOfStep) {i--;}
    if(i > -1 && tempArr[i][j] == ownerOfStep){
        for (let k = tempRow-1; k > i; k--) {
            let x = k*8+j
            if(ownerOfStep == 1 && square[x].firstChild != null)square[x].firstChild.className = "circleWhite"
            if(ownerOfStep == 2 && square[x].firstChild != null)square[x].firstChild.className = "circleBlack" 
            tempArr[k][j]=ownerOfStep
        }
    }

    i = tempRow; j = tempCol-1
    while (tempArr[i][j]!= -1 && tempArr[i][j]!= ownerOfStep && j>-1 ) { j--}
    if(j>-1 && tempArr[i][j] == ownerOfStep){
        for (let k = tempCol-1; k > j; k--) {
            if(ownerOfStep == 1 && square[i*8+k].firstChild != null)square[i*8+k].firstChild.className = "circleWhite"
            if(ownerOfStep == 2 && square[i*8+k].firstChild != null)square[i*8+k].firstChild.className = "circleBlack"
            tempArr[i][k]=ownerOfStep 
        }
    }

    i = tempRow+1; j = tempCol
    while (i < 8 && tempArr[i][j]!= -1 && tempArr[i][j]!= ownerOfStep ) {i++}
    if(i < 8 && tempArr[i][j] == ownerOfStep){
        for (let k = tempRow+1; k < i; k++) {
            if(ownerOfStep == 1 && square[k*8+j].firstChild != null)square[k*8+j].firstChild.className= "circleWhite"
            if(ownerOfStep == 2 && square[k*8+j].firstChild != null)square[k*8+j].firstChild.className= "circleBlack" 
            tempArr[k][j]=ownerOfStep
        }
    }
    
    i = tempRow; j = tempCol+1
    while (j < 8 && tempArr[i][j]!= -1 && tempArr[i][j]!= ownerOfStep ) {j++}
    if(j < 8 && tempArr[i][j] == ownerOfStep){
        for (let k = tempCol+1; k < j; k++) {
          if(ownerOfStep == 1 && square[i*8+k].firstChild != null)square[i*8+k].firstChild.className= "circleWhite"
          if(ownerOfStep == 2 && square[i*8+k].firstChild != null)square[i*8+k].firstChild.className= "circleBlack" 
          tempArr[i][k]=ownerOfStep
        }
    }

    i = tempRow-1; j = tempCol+1
    while ((j < 8 && i>-1) && tempArr[i][j]!= -1 && tempArr[i][j]!= ownerOfStep) {i--; j++}
    if(j < 8 && i>-1 && tempArr[i][j] == ownerOfStep){
        let l = tempRow
        for (let k = tempCol+1; k < j; k++) {
            l--
            if(l>i){
                if(ownerOfStep == 1 && square[l*8+k].firstChild != null)square[l*8+k].firstChild.className= "circleWhite"
                if(ownerOfStep == 2 && square[l*8+k].firstChild != null)square[l*8+k].firstChild.className= "circleBlack" 
                tempArr[l][k]=ownerOfStep
            }
        }
    }

    i = tempRow+1; j = tempCol-1
    while ((i < 8 && j>-1) && tempArr[i][j]!= -1 && tempArr[i][j]!= ownerOfStep) {j--; i++}
    if(i < 8 && j>-1 && tempArr[i][j] == ownerOfStep){
        l = tempRow
        for (let k = tempCol-1; k >j; k--) {
            l++
            if( l < i){
                if(ownerOfStep == 1 && square[l*8+k].firstChild != null)square[l*8+k].firstChild.className= "circleWhite"
                if(ownerOfStep == 2 && square[l*8+k].firstChild != null)square[l*8+k].firstChild.className= "circleBlack" 
                tempArr[l][k]=ownerOfStep
            }
        }
    }
    return tempArr
};

function ChangeColor2(tempRow, tempCol, tempArr, ownerOfStep) {
    let i = tempRow+1; j = tempCol+1

    while (i<8 && j<8 && tempArr[i][j]!= -1 && tempArr[i][j]!= ownerOfStep ) {i++; j++}
    if(i<8 && j<8 && tempArr[i][j] == ownerOfStep){
        let l = tempCol
        for (let k = tempRow+1; k < i; k++) {
            if( l++ < j){tempArr[k][l]=ownerOfStep}
        }
    }

    i = tempRow-1; j = tempCol-1
    while ((i>-1 && j>-1) && tempArr[i][j]!= -1 && tempArr[i][j]!= ownerOfStep) {i--; j--}
         if(i>-1 && j>-1 && tempArr[i][j] == ownerOfStep){
            l = tempCol
        for (let k = tempRow-1; k > i; k--) {
            l--
            if(l > j){tempArr[k][l]=ownerOfStep}
        }
    }

    i = tempRow-1; j = parseInt(tempCol)    
    while (i > -1  && tempArr[i][j] != -1 && tempArr[i][j]!= ownerOfStep) {i--;}
    if(i > -1 && tempArr[i][j] == ownerOfStep){
        for (let k = tempRow-1; k > i; k--) {tempArr[k][j]=ownerOfStep}
    }

    i = tempRow; j = tempCol-1
    while (tempArr[i][j]!= -1 && tempArr[i][j]!= ownerOfStep && j>-1 ) { j--}
    if(j>-1 && tempArr[i][j] == ownerOfStep){
        for (let k = tempCol-1; k > j; k--) { tempArr[i][k]=ownerOfStep}
    }

    i = tempRow+1; j = tempCol
    while (i < 8 && tempArr[i][j]!= -1 && tempArr[i][j]!= ownerOfStep ) {i++}
    if(i < 8 && tempArr[i][j] == ownerOfStep){
        for (let k = tempRow+1; k < i; k++) {tempArr[k][j]=ownerOfStep}
    }
    
    i = tempRow; j = tempCol+1
    while (j < 8 && tempArr[i][j]!= -1 && tempArr[i][j]!= ownerOfStep ) {j++}
    if(j < 8 && tempArr[i][j] == ownerOfStep){
        for (let k = tempCol+1; k < j; k++) {tempArr[i][k]=ownerOfStep}
    }

    i = tempRow-1; j = tempCol+1
    while ((j < 8 && i>-1) && tempArr[i][j]!= -1 && tempArr[i][j]!= ownerOfStep) {i--; j++}
    if(j < 8 && i>-1 && tempArr[i][j] == ownerOfStep){
        let l = tempRow
        for (let k = tempCol+1; k < j; k++) {
            l--
            if(l>i){ tempArr[l][k]=ownerOfStep}
        }
    }

    i = tempRow+1; j = tempCol-1
    while ((i < 8 && j>-1) && tempArr[i][j]!= -1 && tempArr[i][j]!= ownerOfStep) {j--; i++}
    if(i < 8 && j>-1 && tempArr[i][j] == ownerOfStep){
        l = tempRow
        for (let k = tempCol-1; k >j; k--) {
            l++
            if( l < i){tempArr[l][k]=ownerOfStep}
        }
    }
    return tempArr
};

function PriceFunction(tempArr, x, y) {
    let first = 0;
    let second = 0;
    for (let i = 0; i < tempArr.length; i++) {
        for (let j = 0; j < tempArr[i].length; j++) {
            if(tempArr[i][j] == 2)first++
            else{
                if(tempArr[i][j] == 1)second++
            }
        }        
    }

    if((x==0 && y==0) || (x==0 && y==7) ||(x==7 && y==0) || (x==7 && y == 7)){
        return ((first/second)* 3.5)      
    }
    return (first/second)
};

function copyArr(firstArr, secondArr) {
    for (let i = 0; i < firstArr.length; i++) {
        for (let j = 0; j < firstArr[i].length; j++) {
            secondArr[i][j] = firstArr[i][j]            
        }        
    }
    return secondArr
};

function ChooseBest(parent) {
    let temp = 0
    let tempI = 0

    for (let i = 0; i < parent.childArr.length; i++) {
       if(dificulty == 3){
            if((parent.childArr[i].x==0 && parent.childArr[i].y==0) || (parent.childArr[i].x==0 && parent.childArr[i].y==7) ||(parent.childArr[i].x==7 && parent.childArr[i].y==0) || (parent.childArr[i].x==7 && parent.childArr[i].y == 7)){
                return parent.childArr[i]
            }
        }
        if(parent.childArr[i].price>temp){
            temp = parent.childArr[i].price
            tempI = i
        }
    }
    return parent.childArr[tempI]
}

function AddNode(parent, positionArr, level, ownerOfStep) {
    if(parent == null){
        let tempArr = Array.from(Array(8), () => new Array(8));
        tempArr = copyArr(positionArr, tempArr)

        let newNode = new CreateNode(null, tempArr, ownerOfStep, level, -1, -1 )
        parent = AddNode( newNode, newNode.positionArr, level+1, ownerOfStep) 
        
        console.log(parent)
        let bestNode = ChooseBest(parent)
        parent.x = bestNode.x
        parent.y = bestNode.y
    }
    else{
        if(level == dificulty+1){
           parent.price = PriceFunction(parent.positionArr, parent.x, parent.y)
        }
        else{
            if(CheckFreePlace(ownerOfStep, positionArr) == true){
                for (let i = 0; i < positionArr.length; i++) {
                    for (let j = 0; j < positionArr[i].length; j++) {
                        if(positionArr[i][j] == 0){
                            let copArr = Array.from(Array(8), () => new Array(8));

                            copArr = copyArr(positionArr, copArr)
                            copArr[i][j] = ownerOfStep

                            copArr = ReturnToBegin(copArr)
                            if(dificulty == 3)copArr = ChangeColor2(i, j, copArr, ownerOfStep)

                            let newNode = new CreateNode(parent, copArr, ownerOfStep, level, i, j)
                            
                            if(ownerOfStep == 1){ownerOfStep = 2}
                            else{ownerOfStep == 2}{ownerOfStep == 1}

                            newNode = AddNode(newNode, newNode.positionArr, level+1, ownerOfStep)
                            
                            
                            if(parent.price == -1){ 
                                parent.price = newNode.price
                                parent.childArr.push(newNode)
                            } 
                            else{ 
                                if(level%2 == 1){
                                    if(parent.price < newNode.price){
                                     parent.price = newNode.price
                                     parent.childArr.push(newNode)
                                    }
                                }
                                else{
                                    if(level%2 == 0){
                                        if(parent.price > newNode.price){
                                            parent.price = newNode.price
                                            parent.childArr.push(newNode)
                                        }
                                    }
                                }
                            }

                                                 
                        }         
                    }            
                }
            }
            else { parent.price = PriceFunction(parent.positionArr, parent.x, parent.y)}
        }
    }
    return parent;
}

function CheckTheEnd() {
    let temp = 0
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if(arr[i][j] == -1 || arr[i][j] == 0){temp++}
        }        
    }
    if(temp == 0){return true}
    else{return false}
}

function CountGoals() {
    let player1 = 0; comp1 = 0
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
           if(arr[i][j]==2){player1++}
           else{
            if(arr[i][j]==1){comp1++}
           }          
        }        
    }
    document.getElementById("counterBlackPlayer").innerHTML ='black:'+player1
    document.getElementById("counterWhitePlayer").innerHTML ='white: ' + comp1

    if(CheckTheEnd()){
        end.style.display = "block"
        if(player1 > comp1) end.innerHTML = "Player1 win!"
        else if (comp1 > player1){end.innerHTML = "Computer win!"}
        else end.innerHTML = "dead heat"        
    }
};

function RobotStep() {
    let tempArr = Array.from(Array(8), () => new Array(8));
    tempArr = copyArr(arr, tempArr)

    let startNode = AddNode(null, Array.from(tempArr), 0, step)
    arr = PasteСhip(step, startNode.x, startNode.y)
    arr = ReturnToBegin(arr)
    arr = ChangeColor(startNode.x, startNode.y, arr, 1)
    CountGoals()
    step = 2   
}

counterLevel.addEventListener("click", ()=>{
    let temp = parseInt(levelOfGame.getAttribute("value"))
    if(temp < 3) {
        levelOfGame.innerHTML = temp+1
        levelOfGame.setAttribute("value", temp+1)
        if(temp+1 == 3)dificulty = 6
        else dificulty = 4
    }
    else{
        levelOfGame.innerHTML = 1
        levelOfGame.setAttribute("value", 1)
        dificulty = 1
    }
});

window.addEventListener("click", (event)=>{
    if(event.target.className == "Sqier" && step == 2){
        if(CheckFreePlace(2, arr) == true){
            if(arr[event.target.getAttribute("row")][event.target.getAttribute("column")] == 0){
                arr = PasteСhip(step, event.target.getAttribute("row"), event.target.getAttribute("column"))
                arr = ReturnToBegin(arr)
                arr = ChangeColor(parseInt(event.target.getAttribute("row")), parseInt(event.target.getAttribute("column")), arr, step)
                CountGoals()
                step = 1                
                setTimeout(RobotStep, 500)  
                CheckTheEnd()      
            }
            arr = ReturnToBegin(arr)            
        }    
        else{
            step = 1
            RobotStep()
            
        }  
    }   
});
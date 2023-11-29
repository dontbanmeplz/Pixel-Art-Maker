/* jshint esnext: true */
/* global document */
let color = document.getElementById("colorPicker");
let canvas = document.getElementById("pixel_canvas");
let height = 11;
let width = 20;
let sizePicker = document.getElementById("go");
sizePicker.addEventListener("click", go);
/*sizePicker.onsubmit = function(event){
    event.preventDefault();
    clearGrid();
    makeGrid();
};*/
function go(){
    clearGrid();
    makeGrid();
}
function makeGrid() {
    for (let r=0; r<10; r++){
        const row = canvas.insertRow(r);
        for (let c=0; c<19; c++){
            const cell = row.insertCell(c);
            cell.addEventListener("click", fillSquare);
            cell.setAttribute("style", "background-color: #ffffff");
        }
    }
}

function clearGrid(){
    while (canvas.firstChild){
         canvas.removeChild(canvas.firstChild);
    }
}
// alternative code:
// while (table.rows.length > 0) {
//  table.deleteRow(0);
// }

function fillSquare () {
    if (this.style.backgroundColor == "rgb(255, 255, 255)" || this.style.backgroundColor == null)
    {
        this.setAttribute("style", `background-color: ${color.value}`);
    }
    else if (this.style.backgroundColor != "rgb(255, 255, 255)")
    {
        this.setAttribute("style", "background-color: #ffffff");
    }
}

function expor()
{
    let out = [];
    for (var i = 0, row; row = canvas.rows[i]; i++) {
        out[i] = [];
       for (var j = 0, col; col = row.cells[j]; j++) {
           out[i][j] = col.style.backgroundColor;
       } 
   
    }
    navigator.clipboard.writeText(out.toString());
    alert("copied");
}

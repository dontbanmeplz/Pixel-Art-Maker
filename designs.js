/* jshint esnext: true */
/* global document */
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
    for (let r=0; r<height; r++){
        const row = canvas.insertRow(r);
        for (let c=0; c<width; c++){
            const cell = row.insertCell(c);
            cell.addEventListener("click", fillSquare);
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
    this.setAttribute("style", `background-color: ${color.value}`);
}

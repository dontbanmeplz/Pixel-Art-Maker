/* jshint esnext: true */
/* global document */
let color = document.getElementById("colorPicker");
let canvas = document.getElementById("pixel_canvas");
let height = 11;
let width = 20;
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
let sizePicker = document.getElementById("go");
sizePicker.addEventListener("click", go);
let isMouseDown = false;
let col = color.value;
canvas.addEventListener("mousedown", (e) => {
    if (isMouseDown == false){
        col = e.target.style.backgroundColor;
    }
    isMouseDown = true;
});

canvas.addEventListener("mouseup", () => {
    isMouseDown = false;
});

canvas.addEventListener("mouseover", (event) => {
    if (isMouseDown) {
        fillSquare.call(event.target);
    }
});

function go(){
    clearGrid();
    makeGrid();
}
function erase(){
    //color.value = "#ffffff";
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
    //if (this.style.backgroundColor == "rgb(255, 255, 255)" || this.style.backgroundColor == null)
    //{
        this.setAttribute("style", `background-color: ${col}`);
    //}
    //else if (this.style.backgroundColor != "rgb(255, 255, 255)")
    //{
        //this.setAttribute("style", "background-color: #ffffff");
    //}
}
function rgb(rg) {
    const rgh = rg.split(", ");
    
    return "#" + (1 << 24 | rgh[0] << 16 | rgh[1] << 8 | rgh[2]).toString(16).slice(1);
}
function expor()
{
    let out = [];
    var home;
    for (var i = 0, row; row = canvas.rows[i]; i++) {
        out[i] = [];
       for (var j = 0, col; col = row.cells[j]; j++) {
           home = col.style.backgroundColor;
           if (col.style.backgroundColor=="rgb(255, 255, 255)"){
               home="0";
           }
           else{
               home = home.replace("rgb(", "");
               home = home.replace(")", "");
               home = rgb(home);
           }
               out[i][j] = home;
       } 
   
    }
    navigator.clipboard.writeText(Base64.encode(out.toString()));
    alert("copied");
} 

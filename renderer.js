//window.api.enviar()
//window.api.recibir()
const info=document.getElementById('info')
const vuelta=document.getElementById('vuelta')
const n=document.getElementById('n')
const grabar=document.getElementById('grabar')
const meteBotones=document.getElementById("meteBotones")
const boton=document.getElementById("boton")
const tabla=document.getElementById("tabla")
const tbody=document.getElementById("cuerpoTabla")
var formsx=[];
var formsy=[]
let numeroDocumentos=0;
//info.innerHTML='<p align="center"><i class="fa fa-large fa-3x fa-plus-square"></i></p>'
let botones=[];
boton.addEventListener('click',()=>{
   
    window.api.enviar('abreDialog',numeroDocumentos)
    numeroDocumentos++;
    grabar.innerHTML=""
    let botonGrabar=document.createElement("button");
botonGrabar.innerText="Grabar"
grabar.appendChild(botonGrabar)
botonGrabar.addEventListener('click',()=>{
    window.api.enviar('grabar');
    vuelta.innerHTML=""
    grabar.innerHTML=""
    cuerpoTabla.innerHTML=""
    formsx=[]
    formsy=[]
    numeroDocumentos=0
}) 

/* numeroDocumentos++;
console.log("Nº documentos: "+numeroDocumentos)
grabar.innerHTML=""
meteBotones.innerHTML=""
for (let i=0;i<numeroDocumentos;i++){

        botones[i]=document.createElement("button");
        botones[i].innerText="Seleccione documento: "+eval(i+1);
        meteBotones.appendChild(botones[i])
        botones[i].addEventListener("click",()=>{
            window.api.enviar('abreDialog',i)
        })

}
let botonGrabar=document.createElement("button");
botonGrabar.innerText="Grabar"
grabar.appendChild(botonGrabar)
botonGrabar.addEventListener('click',()=>{
    window.api.enviar('grabar')
}) */

})

window.api.recibir("tomaNombre",(datos)=>{
/* vuelta.appendChild(document.createElement("ul"))
vuelta.appendChild(document.createTextNode('- '+datos))
let x=document.createElement("input");
x.setAttribute("type","checkbox")
vuelta.appendChild(x);
vuelta.appendChild(document.createElement("br")) */
console.log(datos)
var nD=numeroDocumentos-1;
var row=cuerpoTabla.insertRow();
row.addEventListener('contextmenu',()=>{
    row.innerHTML=""
    formsx.splice(nD,nD);
    formsy.splice(nD,nD);
    window.api.enviar('borra',nD)

})
var celda1=row.insertCell(0);
var celda2=row.insertCell(1);
celda2.style.textAlign="center";
var celda3=row.insertCell(2);
celda3.style.textAlign="center";
celda1.innerHTML=datos;
var x=document.createElement("input");
x.setAttribute("type","checkbox");
x.setAttribute("checked","true");
x.setAttribute("disabled","true");
x.setAttribute["id",nD]
formsx.push(x)
// eval("itemsBinarios[i].name "+" = " + "'check" + datosTotales[i].id + "'");

//eval('var ' + k + i + '= ' + i + ';');
//eval('var nombreX'+' = '+'x'+numeroDocumentos)
//console.log("Dando nombre a x: "+nombreX)
celda2.appendChild(x);

var y=document.createElement("input");
y.setAttribute("type","text");
y.setAttribute("id",nD+1);
formsy.push(y);
celda3.appendChild(y);

y.addEventListener("change",()=>{
    formsx[nD].checked=false
    formsx[nD].disabled=false
console.log("vamos a actualizar desde y");
    let objeto=[nD,y.value]
    window.api.enviar("actualiza",objeto);
})

x.addEventListener("click",()=>{
    let objeto=[nD,0]
    console.log("vamos a actualizar desde x")
    window.api.enviar("actualiza",objeto);
    formsy[nD].value=""
    formsx[nD].setAttribute("disabled","true");
   
})

})

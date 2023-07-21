const { app, BrowserWindow, ipcMain ,dialog} = require('electron');
const PDFMerger = require('pdf-merger-js');
const path = require('path')
let win
let archivos=[];
//1 para todo el documento
let paginado=[];
const createWindow = () => {

  win = new BrowserWindow({

   width: 800,

   height: 600,
   webPreferences: {
    preload: path.join(__dirname, 'preload.js')
  }
 });

 win.loadFile('index.html');

};

app.whenReady().then(() => {

 createWindow();

 app.on('activate', () => {
ipcMain.handle('ping',()=>'pong')
   if (BrowserWindow.getAllWindows().length === 0) {

     createWindow();

   }

 });

});

app.on('window-all-closed', () => {

 if (process.platform !== 'darwin') {

   app.quit();

 }

});
ipcMain.on('cambia',function(event,datos){
    console.log('ok...')
    win.webContents.send("vuelta")
})
ipcMain.on('abreDialog',function(event,datos){
  console.log("Botón: "+datos)
  let options = {
    // See place holder 1 in above image
    title : "Seleccione archivo", 
    
  
    // See place holder 3 in above image
    buttonLabel : "Cargar",
    
    // See place holder 4 in above image
    filters :[
     {name: 'Documento pdf', extensions: ['pdf']},
   
    ],
    properties: ['openFile']
   }
  dialog.showOpenDialog(options).then(function (response) {
    if (!response.canceled) {
        // handle fully qualified file name
      console.log(response.filePaths[0]);
      archivos[datos]=response.filePaths[0];
      paginado[datos]=1;
      win.webContents.send('tomaNombre',response.filePaths[0])
    } else {
      console.log("no file selected");
    }
});
})
ipcMain.on('grabar',function(event){
  console.log("Repasando archivos a mezclar...")
  for (let a=0;a<archivos.length;a++){
    console.log(archivos[a])
  }
 dialog.showSaveDialog(
 
  {
    title: 'Elige el nombre del archivo',
    filters: [{
  name: 'Adobe PDF',
  extensions: ['pdf']
}]}).then(destino=>{
  const { canceled, filePath } = destino;
  juntaPdf(filePath);
 })
})
function juntaPdf(destino){
  console.log("Destino: "+destino+'.pdf')
  var merger = new PDFMerger();
  (async()=>{
  for (c=0;c<archivos.length;c++){
   
      console.log("Mezclando: "+archivos[c])
      if (paginado[c]==0){
        console.log("El archivo "+archivos[c]+" está entero")
    await merger.add(archivos[c])
      }else{
        console.log("Pasamos a paginar así: "+paginado[c])
        await merger.add(archivos[c],paginado[c])
      }

  }
  console.log("Pasamos a grabar...")
  await merger.save(destino+'.pdf')
  archivos=[];
  paginado=[];
  //Minimum options object
let options  = {
  buttons: ["Ok"],
  message: "¡Bueno!. Pues ya estaría..."
 }
 dialog.showMessageBox(options)
})();
}
ipcMain.on('actualiza',function(event,objeto){
  console.log("Actualizando el archivo número "+objeto[0]+" al tipo "+objeto[1]);
  paginado[objeto[0]]=objeto[1] 
})
ipcMain.on('borra',function(event,numero){
  console.log("Borrando el archivo numero "+numero);
  paginado.splice(numero,numero);
  archivos.splice(numero,numero);
})
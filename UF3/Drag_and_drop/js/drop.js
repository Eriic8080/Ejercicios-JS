//Para solucionar el error de dropArea is null hace falta el DOMCOntentLoaded para que el codigo que pongas
//dentro se ejecuta cuando ya se haya cargado todo el html
document.addEventListener('DOMContentLoaded', function() {

    let ficheros = [];
    let dropArea = document.querySelector('.drop-area');
    let dragDropText = document.querySelector('h2');
    let button = document.querySelector('button');
    let inputFile = document.querySelector('#input-file');
    let preview = document.querySelector('#preview');

    //Con el forEach voy llamando a la funcion para ir deactivandolos
    ['dragover', 'dragleave', 'drop'].forEach(evt => {
        dropArea.addEventListener(evt, prevDefault);
    });

    //Con esta funcion desactivo las acciones por defecto del dragover,dragleave y drop 
    function prevDefault(e) {
        e.preventDefault();
    }

    //Aqui agrego la classe active al elemento dropArea de CSS para cambiar el aspecto cuando 
    //se este arrastrando algo por encima 
    dropArea.addEventListener("dragover", function(){
        dropArea.classList.add('active');
        
        dropArea.innerHTML = '<h2>Arrastra El Fichero</h2>';
    });

    //Aqui hago que vuelva como esta antes cuanto el fichero sale de la zona de dropArea
    dropArea.addEventListener("dragleave", function(){
        dropArea.classList.remove('active');
        dropArea.innerHTML = '<h2>Drag & Drop files</h2><button>Upload files</button>';
    });

    dropArea.addEventListener("drop", function(){
        dropArea.classList.remove('active');



    });
    




});

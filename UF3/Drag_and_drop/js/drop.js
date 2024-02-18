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
        dropArea.addEventListener("drop", (event)=>{
            //con el dataTransfer recibo los datos de los ficheros que se han arrastrado en el dropArea
            //pero los pasa en modo lectura asi que para poder manejar-los hacemos un Array.from para 
            //poder concatenar-lo con el array que hay creado al principio
            ficheros = ficheros.concat(Array.from(event.dataTransfer.files));
        });

        //Con esta funcion muestra los archivos en el espacio del dropArea
        showFiles();

    });

    function showFiles() {
        if (ficheros.length > 0) {
            // Aqui envio los ficheros a la funcion processFile para que me comprueba la extension si es aceptada o no
            ficheros.forEach((file, index) => {
                processFile(file, index);
            });
        }

    }

    //Estas son las extensiones validas
    const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

    function processFile(file, index) {
        // Extraer la extensión del archivo
        const docType = file.type;

        // Comprobar si la extension no es correcta
        if (!validExtensions.includes(docType)) {
            //Mensaje de error
            console.log(`El archivo ${file.name} no tiene una extension válida`);
            //Aqui borro el archivo del array con el splice
            ficheros.splice(index, 1);
            return;
        }

        //Creo una variable para leer el fichero
        let reader = new FileReader(); 

        // Aqui leo el archivo para despues poder conseguir la URL con el result 
        reader.readAsDataURL(file);


        //A la variable le pongo el onload que basicamente le dice que una vez se haya leido todo el fichero
        //se ejecute lo de la funcion para que no de error
        reader.onload = function () {

            //Aqui me guardo la URL de fichero para poder mostrar-lo en el previw
            const fileURL = reader.result; 

            // Creo la variable con el resultado que se mostrara de los ficheros
            let preview = `
                <div class="previewImage">
                    <img src="${fileURL}"/>
                    <span>${file.name}</span>
                    <span onclick="remove(${index})" class="material-symbols-outlined removeBtn">DELETE</span>
                </div>
            `;
            
            document.getElementById('preview').innerHTML += preview;
        };

    }


});

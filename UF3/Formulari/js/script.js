document.addEventListener("DOMContentLoaded", function() {
    let numero;

    //Aqui me guardo todos los inputs del html con la querySelectorAll
    const inputs = document.querySelectorAll('input[name]');

    //Voy recorriendo da input escuchando si se ha escrito algo en alguno
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const inputTexto = this.value;
            numero = inputTexto.length;
        });

        const form = document.getElementById("form");

        form.addEventListener("focusin", (event) => {
            event.target.style.background = "";
            numero = 0;
        });

        form.addEventListener("focusout", (event) => {
        //Si se ha escrito algo se pone el input verde sino se pone rojo
            if(numero > 0){
                event.target.style.background = "green";
                

            }else{
                event.target.style.background = "red";
            }

        });
        //Aqui busco el input del gmail y lo filtro para comprobar si es un gmail o no con la funcion validateEmail
        //Para si esta correcto se pinta el input verde y si no lo esta se pinta en rojo
        if(input.getAttribute('name')==='email'){
            input.addEventListener('input', function() {
                const correo = this.value;

                if(validateEmail(correo) == true){
                    input.addEventListener("focusout", (event) => {
                        event.target.style.background = "green";
                    });
                }else{
                    input.addEventListener("focusout", (event) => {
                        event.target.style.background = "red";
                    });
                }

            });
        }

        if(input.getAttribute('name') === 'passwd') {
            input.addEventListener('input', function() {
                const pass = this.value;
                const caracteresCorrectos = pass.length >= 8 && pass.length <= 15;
        
                if(caracteresCorrectos) {
                    console.log("Correcto");
                }else{
                    console.log("No es correcto");
                }
            });
        }
        






        //Aqui hago que cada vez que se recarga la pagina los inputs esten vacios
        input.value="";
    
    });
    

});


function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return true;
    }else{
        return false;
    }
}
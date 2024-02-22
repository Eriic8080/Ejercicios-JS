document.addEventListener("DOMContentLoaded", function() {
    let numero;

    //Aqui me guardo todos los inputs del html con la querySelectorAll
    const inputs = document.querySelectorAll('input');

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
        //Aqui hago que cada vez que se recarga la pagina los inputs esten vacios
        input.value="";
    
    });


});

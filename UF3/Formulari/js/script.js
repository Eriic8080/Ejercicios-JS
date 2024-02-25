document.addEventListener("DOMContentLoaded", function() {

    //Aqui me guardo todos los inputs del html con la querySelectorAll
    const inputs = document.querySelectorAll('input[name]');
    const errores = document.getElementById("errores");
    const form = document.getElementById("form");
    const postal = document.querySelector('input[name="postal"]');


    //Voy recorriendo da input escuchando si se ha escrito algo en alguno
    inputs.forEach(input => {
        //Aqui pongo que si sales del input y no hay nada se pone rojo y si hay algo se pone verde
        input.addEventListener('focusout', function() {
            if (this.value.trim() === '') {
                this.style.background = "red";
                // Aquí podrías mostrar un mensaje de error indicando que el campo está vacío
            } else {
                this.style.background = "green";
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

        if (input.getAttribute('name') === 'passwd') {
            input.addEventListener('input', function() {
                const pass = this.value;
                const longuitud = pass.length >= 8 && pass.length <= 15;
                //Con estas variables .test compruebo si el input cumple las condiciones ya que el test devuelve true o false
                const minuscula = /[a-z]/.test(pass);
                const majuscula = /[A-Z]/.test(pass);
                const numero = /[0-9]/.test(pass);
                const caracterEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pass);

                //Aqui creo el mensaje que se mostrar y hago que dependiendo se se cumple la condicion de los tests se pone verde(correcto) o rojo(que le falta el test)
                let message = "<div>La contraseña debe contener:</div>";
                if (!longuitud) {
                     message += "<div style='color: red;'>- Entre 8 y 15 caracteres</div>";
                } else {
                    message += "<div style='color: green;'>- Entre 8 y 15 caracteres</div>";
                }
                if (!minuscula) {
                    message += "<div style='color: red;'>- Al menos una letra minúscula</div>";
                } else {
                    message += "<div style='color: green;'>- Al menos una letra minúscula</div>";
                }
                if (!majuscula) {
                    message += "<div style='color: red;'>- Al menos una letra mayúscula</div>";
                } else {
                    message += "<div style='color: green;'>- Al menos una letra mayúscula</div>";
                }
                if (!numero) {
                    message += "<div style='color: red;'>- Al menos un número</div>";
                } else {
                    message += "<div style='color: green;'>- Al menos un número</div>";
                }
                if (!caracterEspecial) {
                    message += "<div style='color: red;'>- Al menos un carácter especial</div>";
                } else {
                    message += "<div style='color: green;'>- Al menos un carácter especial</div>";
                }
                //Aqui introduzco el mensaje en el html
                errores.innerHTML = message;

                //Aqui hago que si la salida no es valida se pinta el input rojo pero si es valida se pinta verde
                input.addEventListener('focusout', function() {
                    errores.innerHTML = "";
                    if (longuitud && minuscula && majuscula && numero && caracterEspecial) {
                        input.style.background = 'green';
                    }else{
                        input.style.background = 'red';
                    }
                }); 
            });          
        }
        //Creo dos variables que me guardan el valor de los inputs de la contraseña y su confirmacion
        const contra = document.querySelector('input[name="passwd"]');
        const confirmContra = document.querySelector('input[name="confirmPasswd"]');
        
        //Aqui filtro el input de confirmar contraseña para que si es igual que la contraseña se pinte verde sino se pinta rojo
        if (confirmContra) {
            confirmContra.addEventListener('focusout', function() {
                const contrasena = contra.value;
                const confirmar = this.value;
        
                if (contrasena === confirmar) {
                    confirmContra.style.background = "green";
                } else {
                    confirmContra.style.background = "red";
                }
            });
        }
        form.addEventListener("submit", function(e) {
            e.preventDefault(); // Aqui evito que el formulario se envie
            
            //Aqui conmpruebo si esta vacio o no el input del postal
            if (postal.value.trim() === '') {
                alert("EL CAMPO POSTAL ES OBLIGATORIO");
                return; 
            }
            //Aqui compruebo el resto de los campos
            else if (!validateForm()) {
                return;
            }
            form.submit();
        });
        
        

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

function validateForm() {
    const inputs = document.querySelectorAll('input[name]');
    let valido = true;

    inputs.forEach(input => {
        const nombre = input.getAttribute('name');
        const valor = input.value.trim();

        // Miro que el nombre no este vacio
        if (valor === '') {
            valido = false;
            alert(`EL CAMPO ${nombre} ES OBLIGATORIO`);
            return;
        }

        // Aqui  miro todos los inputs para validar que todos esten bien 
        switch(nombre) {
            case 'email':
                if (!validateEmail(valor)) {
                    valido = false;
                    alert('EL CORREO NO ES VALIDO');
                    return;
                }
                break;
            case 'passwd':
                const longuitud = valor.length >= 8 && valor.length <= 15;
                const minuscula = /[a-z]/.test(valor);
                const mayuscula = /[A-Z]/.test(valor);
                const numero = /[0-9]/.test(valor);
                const caracterEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(valor);

                if (!(longuitud && minuscula && mayuscula && numero && caracterEspecial)) {
                    valido = false;
                    alert('LA CONTRASEÑA NO ES SEGURA');
                    return;
                }
                break;
            case 'confirmPasswd':
                const contrasena = document.querySelector('input[name="passwd"]');
                const pass = contrasena.value;
                if (valor !== pass) {
                    valido = false;
                    alert('LA CONTRASEÑA NO COINCIDE CON LA INTRODUCIDA');
                    return;
                }
                break;
        }
    });

    return valido;
}

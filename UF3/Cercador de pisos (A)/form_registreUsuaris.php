<!DOCTYPE html>
<html>
<head>
	<title></title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

	<link rel="stylesheet" href="css/style.css"> 
</head>

<body>
	<div class="container pt-5">
		<h4>Formulari de registre d'usuaris</h4>
		<form id="form-user-register">
			<div class="form-row mt-5 mb-4">
				<div class="col-4">
					<label for="validationNom">Nom*</label>
					<input type="text" class="form-control" id="validationNom" value="" name="nom">
					<div id="feedbackNom">
						
					</div>
				</div>

				<div class="col-4">
					<label for="validationCognoms">Cognoms*</label>
					<input type="text" class="form-control"  id="validationCognoms" value="" name="cognoms">
					<div id="feedbackCognoms">
						
					</div>
				</div>

				<div class="col-4">
					<label for="validationDNI">DNI*</label>
					<input type="text" class="form-control" id="validationDNI" value="" name="DNI" placeholder="DNI">
					<div id="feedbackDNI">
						
					</div>
				</div>
			</div>
			
			<div class="form-row mb-4">
				<div class="col-4">
					<label for="validationUsername">Username*</label>
					<div class="input-group">
						<div class="input-group-prepend" id="btnUsername">
							<span class="input-group-text">@</span>
						</div>
						<input type="text" class="form-control" id="validationUsername">
						<div id="feedbackUsername">
						
						</div>
					</div>
				</div>

				<div class="col-4">
					<label for="validationEmail">Email*</label>
					<input type="email" class="form-control" id="validationEmail">
					<div id="feedbakEmail">

					</div>
				</div>

				<div class="col-4">
					<label for="validationTelf">Telèfon*</label>
					<input type="text" class="form-control" id="validationTelf">
					<div id="feedbackTelf">
						
					</div>
				</div>
			</div>
			
			<button class="btn btn-primary" type="submit">Registrar</button>
		</form>
	</div>
	<script>
		$(document).ready(function() {
			$('#form-user-register').submit(function(e) {
				e.preventDefault();
				validarFormulario();
			});

			$('#validationNom, #validationCognoms, #validationDNI, #validationUsername, #validationEmail, #validationTelf').focusout(function() {
				//Aqui llamo a la funcion validarCampos atraves de focusout para que me mustre los errores que haya una vez fuera del campo
				validarCampos($(this));
			});
			
			$('#btnUsername').click(function() {
				generarUsuario();
			});
		});

		//Esta funcion valida todos los campos del formlario
		function validarFormulario() {
			var valido = true;

			//Aqui voy recorriendo cada campo 
			$('#validationNom, #validationCognoms, #validationDNI, #validationUsername, #validationEmail, #validationTelf').each(function() {
				//Aqui verifico si el campo esta vacio 
				if (!$(this).val()) {
					//Si lo esta agrego la clase is-invalid y elimino la clase is-valid 
					$(this).addClass('is-invalid');
					$(this).removeClass('is-valid');
					//Ademas agrego el mesaje de error que se era una vez hecho el submit
					$(this).next().html('El campo es obligatorio.');
					valido = false;
				} else {
				
					$(this).removeClass('is-invalid');
					$(this).addClass('is-valid');
					$(this).next().html('');

					// Valido especificamente el DNI con los parametros que tiene la funcion validateNIF_NIE
					if ($(this).attr('id') === 'validationDNI' && !validateNIF_NIE($(this).val())) {
						$(this).addClass('is-invalid');
						$(this).removeClass('is-valid');
						$(this).next().html('El DNI no és válido.');
						valido = false;
					}

					// Valido que el campo del EMAIL cumpla los parametros de la funcion validateEmail
					if ($(this).attr('id') === 'validationEmail') {
						if (!validateEmail($(this).val())) {
							$(this).addClass('is-invalid');
							$(this).removeClass('is-valid');
							$(this).next().html('El correo electrónico no es válido.');
							valido = false;
						}
					}

					// Valido que el numero introducido cumpla con la funcion phonenumber 
					if ($(this).attr('id') === 'validationTelf' && !phonenumber($(this).val())) {
						$(this).addClass('is-invalid');
						$(this).removeClass('is-valid');
						$(this).next().html('El teléfono no és válido.');
						valido = false;
					}
				}
			});

			//Si todo cumple con los parametros especificados muestra un alert de que todo esta correcto sino muestra uno de formulario incompleto
			if (valido) {
				alert('Formulario enviado correctamente!');
			}
			else{
				alert('El Forulario esta incompleto!')
			}
		}

		//Esta funcion es para valida los campos y muestra si hay alguin error al salir del campo con el focusout
		function validarCampos(field) {
			//Primero valido que haya algo en el campo y si no hay nada 
			if (!field.val()) {
				//Agrego la clase is-invalid y borro la clase is-valid
				field.addClass('is-invalid');
				field.removeClass('is-valid');
				//Creo el mensaje de error que se mostara
				field.next().html('El campo es obligatorio.');
			} else {
				field.removeClass('is-invalid');
				field.addClass('is-valid');
				field.next().html('');

				// Valido que el campo DNI cumpla con los parametros de la funcion validateNIF_NIE
				if (field.attr('id') === 'validationDNI' && !validateNIF_NIE(field.val())) {
					field.addClass('is-invalid');
					field.removeClass('is-valid');
					field.next().html('El DNI no es válido.');
				}

					// Valido que el campo del EMAIL cumpla los parametros de la funcion validateEmail
					if (field.attr('id') === 'validationEmail') {
					if (!validateEmail(field.val())) {
						field.addClass('is-invalid');
						field.removeClass('is-valid');
						field.next().html('El correo electrónico no es válido.');
					}
				}

					// Valido que el numero introducido cumpla con la funcion phonenumber 
					if (field.attr('id') === 'validationTelf' && !phonenumber(field.val())) {
					field.addClass('is-invalid');
					field.removeClass('is-valid');
					field.next().html('El teléfon no es válido.');
				}
			}
		}

		//Esta funcio genera un Nombre de Usuario con la primera letra del nombre en minuscula, las 4 primeras letras del apellido siendo la primera
		//del apellido en mayuscula y los numeros de las posiciones impares del DNI
		function generarUsuario() {
			var nombre = $('#validationNom').val().toLowerCase();
			var apellidos = $('#validationCognoms').val().toLowerCase();
			var dni = $('#validationDNI').val();
			
			var primerApellido = apellidos.split(' ')[0];
			var segundoApellido = apellidos.split(' ')[1] || ''; 

			if (primerApellido.length > 4) {
				primerApellido = primerApellido.slice(0, 4);
			}
			
			var dniNumerosImpares = '';
			for (var i = 0; i < dni.length; i += 2) {
				dniNumerosImpares += dni[i];
			}

			var nombreUsuario = nombre.charAt(0) + primerApellido.charAt(0).toUpperCase() + primerApellido.slice(1) + dniNumerosImpares;
			
			$('#validationUsername').val(nombreUsuario);
	}

		function validateNIF_NIE(value){
			var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
			var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
			var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
			var str = value.toString().toUpperCase();

			if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

			var nie = str
			.replace(/^[X]/, '0')
			.replace(/^[Y]/, '1')
			.replace(/^[Z]/, '2');

			var letter = str.substr(-1);
			var charIndex = parseInt(nie.substr(0, 8)) % 23;

			if (validChars.charAt(charIndex) === letter) return true;

			return false;
		}

		function validateEmail(mail) {
			return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
		}

		function phonenumber(inputtxt) {
			var phoneno = /^\d{10}$/;
			if (inputtxt.match(phoneno)) {
				return true;
			} else {
				return false;
			}
		}

	</script>

</body>
</html>
const form = document.querySelector('#formulario-calculadora');
const resultado = document.querySelector('#resultado');

const multiplicadorTMB = {
    peso: 10,
    altura: 6.25,
    edad: 5,
}

form.addEventListener("submit", e => {
    e.preventDefault();
    calcularCalorias();
});

function calcularCalorias() {
    aparecerResultado();

    const nombre = document.querySelector('#nombre');
    const documento = document.querySelector('#documento');
    const numeroDocumento = document.querySelector('#numero-documento');
    const edad = document.querySelector('#edad');
    const peso = document.querySelector('#peso');
    const altura = document.querySelector('#altura');
    const actividad = document.querySelector('#actividad');
    const genero = document.querySelector('input[name="genero"]:checked');
    //validaciones
    if (!( nombre.value && numeroDocumento.value && edad.value && peso.value && altura.value )) {
        mostrarMensajeDeError('Todos los campos son obligatorios');
        return;
    } else if ( edad.value < 15 || edad.value > 80 ){
        mostrarMensajeDeError('La edad debe estar entre 15 y 80');
        return;
    } else if ( numeroDocumento.value.length < 6 ){
        mostrarMensajeDeError('Documento no es valido, debe tener mínimo 7 números');
        return;
    }
    //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
    //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161    
    let calcluloCalorias;
    if (genero.value === 'M') {
        calcluloCalorias = actividad.value * ((multiplicadorTMB.peso * peso.value) + (multiplicadorTMB.altura * altura.value) - (multiplicadorTMB.edad * edad.value) + 5);
    } else {
        calcluloCalorias = actividad.value * ((multiplicadorTMB.peso * peso.value) + (multiplicadorTMB.altura * altura.value) - (multiplicadorTMB.edad * edad.value) - 161);
    }

    let grupoPoblacional = validarGrupoPoblacional(edad.value);

    resultado.innerHTML = `
            <div class="d-flex flex-column justify-content-center align-items-center h-100">
                <h5>Calorias requeridas</h5>
                <input class="text-center" value="${calcluloCalorias} kcal"></input>
                <br>
                <p class="text-start w-80">
                    El paciente <strong>${nombre.value}</strong> identificado con <strong>${documento.value}</strong> NO. <strong>${numeroDocumento.value}</strong>, requiere un total de <strong>${calcluloCalorias} kcal</strong> para el sostenimiento de su TBM.
                </p>
                <p class="text-start w-80" value="${grupoPoblacional}">El paciente pretenece al grupo poblacional 
                    <strong>${grupoPoblacional}.</strong>
                </p>
            </div>
    ` 
}

function validarGrupoPoblacional(edad) {
    let grupoPoblacional;
    if (edad>14 && edad<30) {
        grupoPoblacional = "Joven";
    } else if(edad >= 30 && edad < 60){
        grupoPoblacional = "adulto";
    } else {
        grupoPoblacional = "adulto mayor";
    }
    return grupoPoblacional;
}


function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}

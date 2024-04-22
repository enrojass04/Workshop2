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
    const { nombre, documento, numeroDocumento, edad, peso, altura, actividad, genero } = obtenerCampos();
    
    if (!validarCampos(nombre, numeroDocumento, edad, peso, altura)) {
        return;
    }

    const calcluloCalorias = calcularValorCalorias(actividad, genero, peso, altura, edad);
    const grupoPoblacional = validarGrupoPoblacional(edad);

    mostrarResultado(nombre, documento, numeroDocumento, calcluloCalorias, grupoPoblacional);
}


function obtenerCampos() {
    return {
        nombre: document.querySelector('#nombre').value,
        documento: document.querySelector('#documento').value,
        numeroDocumento: document.querySelector('#numero-documento').value,
        edad: parseInt(document.querySelector('#edad').value),
        peso: parseFloat(document.querySelector('#peso').value),
        altura: parseFloat(document.querySelector('#altura').value),
        actividad: parseFloat(document.querySelector('#actividad').value),
        genero: document.querySelector('input[name="genero"]:checked').value,
    };
}

function validarCampos(nombre, numeroDocumento, edad, peso, altura) {
    if (!nombre.trim() || !numeroDocumento.trim() || !edad || !peso || !altura) {
        mostrarMensajeDeError('Todos los campos son obligatorios');
        return false;
    } 

    if (edad < 15 || edad > 80) {
        mostrarMensajeDeError('La edad debe estar entre 15 y 80');
        return false;
    }

    if (numeroDocumento.length < 7) {
        mostrarMensajeDeError('Documento no es valido, debe tener mínimo 7 números');
        return false;
    }

    return true;
}

function calcularValorCalorias(actividad, genero, peso, altura, edad) {
    const valorActividad = actividad;
    const factorGenero = genero === 'M' ? 5 : -161;

    return valorActividad * ((multiplicadorTMB.peso * peso) + (multiplicadorTMB.altura * altura) - (multiplicadorTMB.edad * edad) + factorGenero);
}

function mostrarResultado(nombre, documento, numeroDocumento, calcluloCalorias, grupoPoblacional) {
    resultado.innerHTML = `
            <div class="d-flex flex-column justify-content-center align-items-center h-100">
                <h5>Calorias requeridas</h5>
                <input class="text-center form-control resultado" value="${calcluloCalorias} kcal"></input>
                <br>
                <p class="text-start w-80">
                    El paciente <strong>${nombre}</strong> identificado con <strong>${documento}</strong> NO. <strong>${numeroDocumento}</strong>, requiere un total de <strong>${calcluloCalorias} kcal</strong> para el sostenimiento de su TBM.
                </p>
                <p class="text-start w-80" value="${grupoPoblacional}">El paciente pertenece al grupo poblacional 
                    <strong>${grupoPoblacional}.</strong>
                </p>
            </div>
    `;
    resultado.style.display = 'block';
}

function validarGrupoPoblacional(edad) {
    if (edad > 14 && edad < 30) {
        return "Joven";
    } else if (edad >= 30 && edad < 60) {
        return "adulto";
    } else {
        return "adulto mayor";
    }
}

function mostrarMensajeDeError(msg) {
    resultado.innerHTML = `
        <div class="card-body d-flex justify-content-center align-items-center h-100">
            <span class="alert alert-danger text-center">${msg}</span>
        </div>
    `;
    resultado.style.display = 'block';

    setTimeout(() => {
        resultado.innerHTML = '';
        resultado.style.display = 'none';
    }, 5000);
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


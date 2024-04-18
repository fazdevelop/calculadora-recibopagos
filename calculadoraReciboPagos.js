// Variables
const containerElement = document.querySelector('.container');
const btnNums = document.querySelectorAll('.btn-num');
const btnPlan24 = document.querySelector('.plan24');
const btnPlan72 = document.querySelector('.plan72');
const panelNumber = document.querySelector('#panel-numbers');
const resultProduct = document.querySelector('#result-product');
const resultPlan = document.querySelector('#result-plan');
const resultComision = document.querySelector('#result-comision');

let planType = 0;
let precioProducto = '0';

// Detectar los números que se vayan clickeando + comprobaciones
btnNums.forEach(boton => {
    boton.addEventListener("click", () => {
        const teclaPresionada = boton.textContent;
        
        // Evitar agregar ceros adicionales al inicio
        if (teclaPresionada === '⟵' && precioProducto.length === 1) {
            precioProducto = '0'
        }
        // Eliminar el último número
        else if (teclaPresionada === '⟵') {
            precioProducto = precioProducto.slice(0,-1)
        }
        else if (precioProducto === '0') {
            precioProducto = teclaPresionada
        } 
        // Agregar los números ingresados a precioProducto
        else if (!isNaN(teclaPresionada)) {
            precioProducto += teclaPresionada
            
        }
        // Eliminar el símbolo de igual para que no aparezca en precioProducto
        if (precioProducto.includes('=')) {
            precioProducto = precioProducto.replace('=', '');
        }

        // Mostrar los números en la calculadora
        panelNumber.textContent = precioProducto

        // Verificar cuando se presione el boton =
        if(teclaPresionada === '=') {

            // Mostrar un mensaje para que se seleccione un plan 
            if(planType === 0) {
                panelNumber.textContent = 'Seleccione un plan primero'
                return
            } 
            // Mostrar un mensaje si es que no se han ingresado numeros
            else if(precioProducto.length === 0) {
                panelNumber.textContent = 'Ingrese un monto'
                return
            } 
            // Correción de error en el cual aparecía símbolo = cuando se presionaba el boton
            else if(precioProducto.length === 1 && precioProducto === '=') {
                panelNumber.textContent = 'Ingrese un monto'
                precioProducto = '0'
                return
            }
            else {
                mostrarResultado();
            } 
        }

        if(teclaPresionada === '=' && precioProducto !== '' && precioProducto !== '=') {
            mostrarResultado();
            return;
        }
    })
})

// Cambiar de planes
btnPlan24.addEventListener("click", () => {
    planType = 2.74;
    btnPlan72.classList.remove('plan-selected');
    btnPlan24.classList.add('plan-selected');
})

btnPlan72.addEventListener("click", () => {
    planType = 2.59;
    btnPlan24.classList.remove('plan-selected');
    btnPlan72.classList.add('plan-selected');
})

// Función para calcular la comisión por transación
const calcularImpuesto = function(precioProducto, planType) {

    let formula = (precioProducto * (planType / 100));
    let calcularIVA = formula * (19 / 100);

    const totalComision = Math.floor(formula + calcularIVA);

    return totalComision; 
}

// Función que mostrará los resultados en un pequeño modal
const mostrarResultado = function() {
    // Aparecer modal
    document.querySelector('.modal-bg').style.display = 'block'
    resultProduct.parentElement.parentElement.parentElement.style.display = 'flex'

    // Elementos del modal
    resultProduct.textContent = `$${precioProducto}`;
    resultComision.textContent = `$${calcularImpuesto(precioProducto, planType)}`;

    if (planType === 2.74) {
        resultPlan.textContent = '24 Horas'
    } else if (planType === 2.59) {
        resultPlan.textContent = '72 Horas'
    }
}

// Cerrar modal
const cerrarResultado = function() {
    resultProduct.parentElement.parentElement.parentElement.style.display = 'none'
    document.querySelector('.modal-bg').style.display = 'none'
}
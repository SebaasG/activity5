import { getClients, saveClient } from "../controllers/formController.js";

class FormComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.getClients();
        this.addEventListeners();
    }

    render() {
        this.innerHTML = /*html*/ `
    <style>
        @import url("../../src/styles/formStyles.css");
    </style>
    <div class="container">
        <h2>Simulación de Préstamo</h2>
        <form id="prestamoForm">
            <label>Nombre del Cliente:</label>
            <input type="text" id="nombre" placeholder="Ingrese su nombre">
            <label>Documento de Identidad:</label>
            <input type="text" id="documento" placeholder="Ingrese su documento">
            <label>Monto del Préstamo:</label>
            <input type="number" id="monto" placeholder="Ingrese el monto">
            <label>Tasa de Interés Anual (%):</label>
            <input type="number" id="tasa" placeholder="Ingrese la tasa">
            <label>Plazo (Meses):</label>
            <input type="number" id="plazo" placeholder="Ingrese el plazo">
            <label>Tipo de Amortización:</label>
            <select id="tipoAmortizacion">
                <option value="Francés">Francés</option>
                <option value="Americano">Americano</option>
            </select>
            <button type="submit" id="btnCalcular">Calcular</button>
        </form>

        <div class="table-container">
            <h3>Tabla de Amortización</h3>
            <table id="tablaAmortizacion">
                <tr>
                    <th>Cuota</th>
                    <th>Saldo Inicial</th>
                    <th>Cuota Mensual</th>
                    <th>Intereses</th>
                    <th>Amortización</th>
                    <th>Saldo Restante</th>
                </tr>
            </table>
        </div>
    </div>
`;

    }

    async getClients() {
        const clients = await getClients();
        console.log("Clientes cargados:", clients);
    }

    addEventListeners() {
        const btnCalcular = this.querySelector("#btnCalcular");

        const form = this.querySelector("form");

        // Prevenir la recarga de la página cuando se envíe el formulario
        form.addEventListener("submit", (event) => {
            event.preventDefault();
        });
        btnCalcular.addEventListener("click", (event) => {
            event.preventDefault();
            this.calcularAmortizacion();
        });
    }

    calcularAmortizacion() {
        const nombre = this.querySelector("#nombre").value.trim();
        const documento = this.querySelector("#documento").value.trim();
        const monto = parseFloat(this.querySelector("#monto").value) || 0;
        const tasa = parseFloat(this.querySelector("#tasa").value) || 0;
        const plazo = parseInt(this.querySelector("#plazo").value) || 0;
        const tipoAmortizacion = this.querySelector("#tipoAmortizacion").value;

        if (!nombre || !documento || monto <= 0 || tasa <= 0 || plazo <= 0) {
            alert("Por favor, ingrese valores válidos.");
            return;
        }

        let tablaAmortizacion = (tipoAmortizacion === "Francés")
            ? this.calcularAmortizacionFrancesa(monto, tasa, plazo)
            : this.calcularAmortizacionAmericana(monto, tasa, plazo);

        this.mostrarTablaAmortizacion(tablaAmortizacion);
        this.guardarPrestamo(nombre, documento, monto, tasa, plazo, tipoAmortizacion, tablaAmortizacion);
    }

    calcularAmortizacionFrancesa(monto, tasaAnual, plazo) {
        let tasaMensual = (tasaAnual / 12) / 100;
        let cuotaMensual = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));
        let saldo = monto;
        let tabla = [];

        for (let i = 1; i <= plazo; i++) {
            let interes = saldo * tasaMensual;
            let amortizacion = cuotaMensual - interes;
            saldo -= amortizacion;

            tabla.push({
                cuota: i,
                saldoInicial: monto.toFixed(2),
                cuotaMensual: cuotaMensual.toFixed(2),
                intereses: interes.toFixed(2),
                amortizacionCapital: amortizacion.toFixed(2),
                saldoRestante: saldo.toFixed(2)
            });

            monto = saldo;
        }
        return tabla;
    }

    calcularAmortizacionAmericana(monto, tasaAnual, plazo) {
        let tasaMensual = (tasaAnual / 12) / 100;
        let interesesMensuales = monto * tasaMensual;
        let tabla = [];

        for (let i = 1; i <= plazo; i++) {
            let amortizacion = (i === plazo) ? monto : 0;
            let saldoRestante = (i === plazo) ? 0 : monto;

            tabla.push({
                cuota: i,
                saldoInicial: monto.toFixed(2),
                cuotaMensual: (interesesMensuales + amortizacion).toFixed(2),
                intereses: interesesMensuales.toFixed(2),
                amortizacionCapital: amortizacion.toFixed(2),
                saldoRestante: saldoRestante.toFixed(2)
            });
        }
        return tabla;
    }

    mostrarTablaAmortizacion(tabla) {
        const tablaHTML = this.querySelector("#tablaAmortizacion");
        tablaHTML.innerHTML = `
            <tr>
                <th>Cuota</th>
                <th>Saldo Inicial</th>
                <th>Cuota Mensual</th>
                <th>Intereses</th>
                <th>Amortización</th>
                <th>Saldo Restante</th>
            </tr>
        `;

        tabla.forEach((fila) => {
            tablaHTML.innerHTML += `
                <tr>
                    <td>${fila.cuota}</td>
                    <td>${fila.saldoInicial}</td>
                    <td>${fila.cuotaMensual}</td>
                    <td>${fila.intereses}</td>
                    <td>${fila.amortizacionCapital}</td>
                    <td>${fila.saldoRestante}</td>
                </tr>
            `;
        });
    }

    async guardarPrestamo(nombre, documento, monto, tasa, plazo, tipoAmortizacion, tablaAmortizacion) {
        const nuevoPrestamo = {
            id: Date.now(), // ID único para el préstamo
            monto,
            tasaInteres: tasa,
            plazoMeses: plazo,
            tipoAmortizacion,
            tablaAmortizacion
        };

        try {
            let clientes = await getClients(); // Obtener todos los clientes


            let cliente = clientes.find(c => c.documento === documento);

            if (cliente) {
                cliente.prestamos.push(nuevoPrestamo);
            } else {

                cliente = {
                    id: Date.now(),
                    nombre,
                    documento,
                    prestamos: [nuevoPrestamo]
                };
                clientes.push(cliente);
            }

            await saveClient(clientes);
            console.log("Préstamo guardado correctamente:", cliente);
        } catch (error) {
            console.error("Error al guardar el préstamo:", error);
        }
    }

}

customElements.define("form-component", FormComponent);

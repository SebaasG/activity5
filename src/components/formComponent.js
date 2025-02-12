class FormComponent extends HTMLElement {
    constructor() {
        super();
        // this.controller = new FormController(this);


    }


    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = /*html*/ `
      <style>
        @import url("../../src/styles/formStyles.css");
      </style>
          <div class="container">
        <h2>Simulación de Préstamo</h2>
        <label>Nombre del Cliente:</label>
        <input type="text" placeholder="Ingrese su nombre">
        <label>Documento de Identidad:</label>
        <input type="text" placeholder="Ingrese su documento">
        <label>Monto del Préstamo:</label>
        <input type="number" placeholder="Ingrese el monto">
        <label>Tasa de Interés Anual (%):</label>
        <input type="number" placeholder="Ingrese la tasa">
        <label>Plazo (Meses):</label>
        <input type="number" placeholder="Ingrese el plazo">
        <label>Tipo de Amortización:</label>
        <select>
            <option>Francés</option>
        </select>
        <button>Calcular</button>

        <div class="table-container">
            <h3>Tabla de Amortización</h3>
            <table>
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
      `
    }

}

customElements.define("form-component", FormComponent);
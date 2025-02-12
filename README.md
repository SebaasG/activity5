# Simulación de Préstamo Bancario con Gestión de Clientes

## Descripción

Este proyecto es una aplicación web que permite calcular la tabla de amortización de un préstamo bancario, gestionar los datos de los clientes, y almacenar el historial de simulaciones realizadas por cada cliente. La aplicación soporta dos tipos de amortización: **Francés** y **Americano**. Los datos se almacenan de forma persistente utilizando **JSON Server**, lo que permite consultar el historial de cálculos previos de los clientes.

## Tecnologías Utilizadas

- **HTML**: Estructura de la página web.
- **CSS**: Estilos para la interfaz de usuario.
- **JavaScript**: Lógica para el cálculo de la tabla de amortización y manipulación del DOM.
- **WebComponents**: Componentes personalizados para la gestión del formulario, la tabla de amortización y el historial de clientes.
- **JSON Server**: Simulación de una API RESTful para almacenar los datos de los clientes y sus préstamos.
  
## Requerimientos

### Gestión de Clientes

- Los usuarios deben ingresar su **nombre** y **documento de identidad** antes de calcular la tabla de amortización.
- Cada cliente tendrá un historial de simulaciones de préstamos almacenado en **JSON Server**.

### Formulario de Entrada

Los clientes deben ingresar los siguientes datos:

- **Datos del cliente**:
  - Nombre
  - Documento de identidad (único por cliente)
- **Datos del préstamo**:
  - Monto del préstamo
  - Tasa de interés anual
  - Plazo en meses
  - Tipo de amortización (Francés o Americano)
- Un botón **"Calcular"** para generar la tabla.

### Cálculo de la Tabla de Amortización

La aplicación genera la tabla de amortización con los siguientes datos para cada mes:

- Número de cuota
- Saldo inicial
- Cuota mensual
- Intereses
- Amortización del capital
- Saldo restante

La aplicación soporta dos tipos de amortización:

- **Francés**: Cuotas fijas, intereses decrecientes.
- **Americano**: Pago de solo intereses y capital al final.

### Interfaz Gráfica (UI/UX)

- Utiliza **WebComponents** para crear los siguientes componentes:
  - Componente para el formulario de entrada.
  - Componente para la tabla de amortización.
  - Componente para el historial de préstamos.
- La tabla debe mostrarse dinámicamente en la interfaz al hacer clic en el botón **"Calcular"**.

### Persistencia de Datos con JSON Server

La aplicación utiliza **JSON Server** para almacenar y gestionar los datos de los clientes y sus préstamos. La estructura de los datos en el servidor es la siguiente:

```json
{
  "clientes": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "documento": "123456789",
      "prestamos": [
        {
          "id": 101,
          "monto": 10000,
          "tasaInteres": 5,
          "plazoMeses": 12,
          "tipoAmortizacion": "Francés",
          "tablaAmortizacion": [
            {
              "cuota": 1,
              "saldoInicial": 10000,
              "cuotaMensual": 900,
              "intereses": 50,
              "amortizacionCapital": 850,
              "saldoRestante": 9150
            }
          ]
        }
      ]
    }
  ]
}

import { CZooAnimal } from "public./animal.js";

// Crear formulario con document.write
document.write(`
    <h1>Zoológico - Ingreso de Animales</h1>
    <form id="animalForm">
        <div id="formContainer"></div>
        <button type="submit">Enviar</button>
    </form>
`);

const formContainer = document.currentScript.previousElementSibling.querySelector("#formContainer");

for (let i = 0; i < 5; i++) {
    formContainer.innerHTML += `
        <fieldset>
            <legend>Animal ${i + 1}</legend>
            ID: <input type="number" id="id${i}" required><br>
            Nombre: <input type="text" id="nombre${i}" required><br>
            Jaula Número: <input type="number" id="jaula${i}" required><br>
            Tipo Animal (1 felino, 2 ave, 3 reptil): <input type="number" id="tipo${i}" required><br>
            Peso (kg): <input type="number" step="0.1" id="peso${i}" required><br>
        </fieldset><br>
    `;
}

document.getElementById("animalForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const zooAnimals = [];

    for (let i = 0; i < 5; i++) {
        const IdAnimal = parseInt(document.getElementById(`id${i}`).value);
        const nombre = document.getElementById(`nombre${i}`).value;
        const JaulaNumero = parseInt(document.getElementById(`jaula${i}`).value);
        const IdTypeAnimal = parseInt(document.getElementById(`tipo${i}`).value);
        const peso = parseFloat(document.getElementById(`peso${i}`).value);

        zooAnimals.push(new CZooAnimal(IdAnimal, nombre, JaulaNumero, IdTypeAnimal, peso));
    }

    mostrarResultados(zooAnimals);
});

function mostrarResultados(zooAnimals) {
    document.open();
    document.write("<h2>Resultados del Zoológico</h2>");

    const countJaula5 = zooAnimals.filter(a => a.JaulaNumero === 5 && a.peso < 3).length;
    const countFelinos = zooAnimals.filter(a => a.IdTypeAnimal === 1 && a.JaulaNumero >= 2 && a.JaulaNumero <= 5).length;
    const animalJaula4 = zooAnimals.find(a => a.JaulaNumero === 4 && a.peso < 120);

    document.write(`<p><strong>b)</strong> Animales en Jaula 5 con peso &lt; 3kg: ${countJaula5}</p>`);
    document.write(`<p><strong>c)</strong> Felinos en jaulas 2 a 5: ${countFelinos}</p>`);
    document.write(`<p><strong>d)</strong> Animal en Jaula 4 con peso &lt; 120kg: ${animalJaula4 ? animalJaula4.nombre : "Ninguno"}</p>`);

    document.write("<h2>Tabla de Animales</h2>");
    document.write(`
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Jaula</th>
                <th>Tipo</th>
                <th>Peso</th>
            </tr>
    `);

    zooAnimals.forEach(a => {
        document.write(`
            <tr>
                <td>${a.IdAnimal}</td>
                <td>${a.nombre}</td>
                <td>${a.JaulaNumero}</td>
                <td>${getTipoNombre(a.IdTypeAnimal)}</td>
                <td>${a.peso}</td>
            </tr>
        `);
    });

    document.write("</table>");
    document.close();
}

function getTipoNombre(tipo) {
    switch (tipo) {
        case 1: return "Felino";
        case 2: return "Ave";
        case 3: return "Reptil";
        default: return "Otro";
    }
}

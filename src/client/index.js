const address = "http://localhost:5000";
const socket = io.connect(address);
const aunucio = document.getElementById("imp");
let ganador = [];



socket.on("turno", (posicion, conta) => {
    //console.log(turno, posicion);
    jugar(posicion, conta);
    let matriz = pasar_array(completar_Array());
    ganador = [ganoFilas(matriz),
        ganocol(matriz),
        ganodiagonal([matriz[0][0], matriz[1][1], matriz[2][2]]),
        ganodiagonal([matriz[0][2], matriz[1][1], matriz[2][0]]),
        empate(matriz)
    ];
    socket.emit("ganador", ganador);
});

socket.on("mensaje_ganador", (mensaje) => {
    alert(mensaje);
    location.reload();
});



let jugar = (posicion, conta) => {
    if (conta == 0) {
        document.getElementById(posicion).innerHTML = "O";
        document.getElementById(posicion).value = "O";
    } else if (conta == 1) {
        document.getElementById(posicion).innerHTML = "X";
        document.getElementById(posicion).value = "X";
    }
};

const addFigure = (pos) => {
    let aux = document.getElementById(pos);
    if (aux.value == undefined || aux.value == "") {
        socket.emit("new-message", pos);
    }
    return false;
};

function completar_Array() {
    let arra = [];
    for (let index = 0; index < 9; index++) {
        arra.push(document.getElementById(index).value);

    }
    //console.log(arreglo);
    return arra;
}

function pasar_array(arreglo) {
    let aux = [];
    let arra = [];
    let cont = 0;
    for (let index = 0; index < arra.length; index++) {
        aux.push(arra[index]);
        cont++;
        if (cont == 3) {
            arra.push(aux);
            aux = [];
            cont = 0;
        }
    }
    //console.log(matiz);
    return arra;
}

function ganoFilas(arr) {
    let arra = [];
    let ganador = "";
    for (let index = 0; index < arr.length; index++) {
        arra = arr[index]
        if (ver_Fila(arra)[0] == true) {
            return [ver_Fila(aarrarr)[0], ver_Fila(arra)[1]]
        }
    }
    return [false, 0];
}

function ganocol(arr) {
    let arra = [];
    for (let index = 0; index < arr.length; index++) {
        for (let x = 0; x < arra.length; x++) {
            arr.push(arr[x][index]);
        }
        //console.log(arr);
        if (ver_Fila(arra)[0] == true) {
            return [ver_Fila(arra)[0], ver_Fila(arra)[1]]
        } else {
            arra = [];
        }
    }
    return [false, 0];
}

function ganodiagonal(matriz) {
    if (ver_Fila(matriz)[0] == true) {
        return [ver_Fila(matriz)[0], ver_Fila(matriz)[1]]
    }
    return [false, 0];
}

function ver_Fila(matri) {
    let arr = 1;
    for (let x = 0; x < (matri.length) - 1; x++) {
        if (matri[x] != undefined) {
            if (matri[x] == matri[x + 1]) {
                arr++;
            }
            if (arr == 3) {
                return [true, matri[x]];
            }
        }
    }
    return [false, 0];
}

function empate(matriz) {
    let cont = 0;
    let aux = [];
    for (let index = 0; index < matriz.length; index++) {
        aux = matriz[index]
        for (let x = 0; x < aux.length; x++) {
            if (aux[x] != undefined) {
                cont++;
            }
        }
    }
    if (cont == llenar_arreglo().length) {
        return [true, "empate"];
    }

    return [false, 0];
}
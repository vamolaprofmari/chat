const firebaseConfig = {
    apiKey: "AIzaSyA_dQwRCqv3qFX9J1nfmYQx0b6BYEUK8p4",
    authDomain: "chat-lia-ju-beni-lucas.firebaseapp.com",
    databaseURL: "https://chat-lia-ju-beni-lucas-default-rtdb.firebaseio.com",
    projectId: "chat-lia-ju-beni-lucas",
    storageBucket: "chat-lia-ju-beni-lucas.appspot.com",
    messagingSenderId: "1096324347518",
    appId: "1:1096324347518:web:6ea00b49df677c86588a2f"
  };

firebase.initializeApp(firebaseConfig);

inicializar();

function inicializar() {
    const nomeUsuario = localStorage.getItem("nomeUsuario");
    // console.log(nomeUsuario);
    document.getElementById("nomeUsuario").textContent = "Olá, " + nomeUsuario + "!";

    getData();
}

function addSala() {
    const nomeSala = document.getElementById("nomeSala").value;
    console.log(nomeSala);
    if (nomeSala) {
        firebase.database().ref('/').child(nomeSala).set({
            purpose: "sala criada"
        });

        carregaSala(nomeSala);
    }
}

function getData() {
    firebase.database().ref('/').on("value", snapshot => {
        let salas = [];
        snapshot.forEach(childSnapshot => {
            const childKey = childSnapshot.key;
            const html = '<div class="nomeSala" id="'
                + childKey
                + '" onclick="carregaSala(this.id)">#'
                + childKey
                + '</div>'
            salas.push(html);
        });
        document.getElementById("output").innerHTML = salas.join("");
        // const output = document.getElementById("output");
        // output.innerHTML = salas.join("");
    });
}

function carregaSala(sala) {
    localStorage.setItem("nomeSala", sala);
    location = "chat.html";
}
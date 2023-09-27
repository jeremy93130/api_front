const REGISTERFORM = $("#registerForm");
const LOGINFORM = $("#loginForm");
getUserList();

REGISTERFORM.on("submit", (e) => {
  // Pour empêcher l'envoi du formulaire
  e.preventDefault();
  // Récupérer les infos de l'utilisateur
  let pseudo = $("#pseudo").val();
  let nom = $("#nom").val();
  let prenom = $("#prenom").val();
  let mdp = $("#motdepasse").val();
  let action = $("#action").val();
  // Appel de la fonction register
  register(pseudo, nom, prenom, mdp, action);
});

function register(pseudo, nom, prenom, mdp, action) {
  let data = {
    pseudo: pseudo,
    motdepasse: mdp,
    nom: nom,
    prenom: prenom,
    action: action,
  };

  let dataOption = {
    method: "post",
    body: JSON.stringify(data),
  };

  // Appel la fonction fetch
  fetch("http://localhost/api_back/", dataOption)
    .then((response) => {
      response
        .json()
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => console.log("tu me l'avais promis en tout cas"));
}

LOGINFORM.on("submit", (e) => {
  // Pour empêcher l'envoi du formulaire
  e.preventDefault();
  // Récupérer les infos de l'utilisateur
  let pseudo = $("#pseudo").val();
  let mdp = $("#motdepasse").val();
  let action = $("#action").val();
  // Appel de la fonction register
  login(pseudo, mdp, action);
});

function login(pseudo, mdp, action) {
  let data = {
    pseudo: pseudo,
    motdepasse: mdp,
    action: action,
  };
  let dataOption = {
    method: "post",
    body: JSON.stringify(data),
  };

  // Appel de la fonction fetch :
  fetch("http://localhost/api_back/", dataOption)
    .then((response) => {
      response
        .json()
        .then((data) => {
          if (data.status == 200) {
            // On enregistre l'identifiant de l'utilisateur dans le localstorage:
            localStorage.setItem("iduser", data.data.id_user);
            // On enregistre le prenom de l'utilisateur dans le localStorage
            localStorage.setItem("prenom", data.data.prenom);
            window.location.href = "index.html";
          } else {
            console.log(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => console.log("tu me l'avais promis en tout cas"));
}

// fonction pour obtenir la liste des utilisateurs :
function getUserList() {
  fetch("http://localhost/api_back/getuserlist/")
    .then((response) => {
      response
        .json()
        .then((data) => {
          // Appel de printUser
          printUsers(data.users);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}

// fonction pour afficher la liste des utilisateurs :
function printUsers(listUser) {
  console.log(listUser);
  listUser.forEach((element) => {
    // Créer une balise p en lui ajoutant le prenom de l'utilisateur comme texte
    let p = document.createElement("p");
    p.textContent = element.prenom;
    p.id = element.id_user;

    p.addEventListener("click", () => {
      getListMessage(localStorage.getItem("iduser"), p.id);
    });
    // On ajoute le paragraphe en tant qu'enfant de la div avec la classe user_list
    $("#user_list").append(p);
  });
}
// fonction pour avoir la liste des messages entre deux utilisateurs
function getListMessage(expediteur, destinataire) {
  fetch(
    "http://localhost/api_back/getListMessage/" +
      expediteur +
      "/" +
      destinataire
  )
    .then((response) => {
      response
        .json()
        .then((data) => {
          // Traitement
          console.log(data);
          printMessage(data.listMessage);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}

// fonction pour afficher la liste des messages entre 2 utilisateurs
function printMessage(listMessage) {
  document.getElementById("discussion").innerHTML = "";
  listMessage.forEach((element) => {
    // On crée une div et un p
    let div = document.createElement("div");
    let p = document.createElement("p");
    // On ajoute le paragraphe à la div
    div.append(p);
    // On ajoute au paragraphe son texte
    p.textContent = element.message;

    if (element.expediteur_id == localStorage.getItem("iduser")) {
      div.className = "expediteur";
    } else {
      div.className = "recepteur";
    }

    $("#discussion").append(div);
  });
}

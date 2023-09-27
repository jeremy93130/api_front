const REGISTERFORM = $("#registerForm");
const LOGINFORM = $("#loginForm");
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
          console.log(data)
          localStorage.setItem("iduser", data.data.id_user);
          localStorage.setItem("prenom", data.data.prenom);
          window.location.href("");
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => console.log("tu me l'avais promis en tout cas"));
}

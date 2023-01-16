const formLogin = document.querySelector('.connexion')

formLogin.addEventListener('submit', function(event){

    event.preventDefault()

    const login ={
        email: event.target.querySelector("#signin-email").value,
        password: event.target.querySelector("#signin-password").value,
    }
    const chargeUtile = JSON.stringify(login)
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    });
 
})


//:====================
// export function ajoutListenersAvis() {

//     const piecesElements = document.querySelectorAll(".fiches article button");
 
//     for (let i = 0; i < piecesElements.length; i++) {
 
//      piecesElements[i].addEventListener("click", async function (event) {
 
//         const id = event.target.dataset.id;
//         const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");
//         const avis = await reponse.json();
//         const pieceElement = event.target.parentElement;

//         const avisElement = document.createElement("p");
//         for (let i = 0; i < avis.length; i++) {
//             avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br>`;
//         }
//         pieceElement.appendChild(avisElement);
 
//      });
//     }
// }


// export function ajoutListenerEnvoyerAvis() {
//     const formulaireAvis = document.querySelector(".connexion")

//     formulaireAvis.addEventListener("submit", function (event) {

//     event.preventDefault()

//     const avis = {
//     pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
//     utilisateur: event.target.querySelector("[name=utilisateur").value,
//     commentaire: event.target.querySelector("[name=commentaire]").value,      
//     };

//     const chargeUtile = JSON.stringify(avis)

//     // Appel de la fonction fetch avec toutes les informations nécessaires
//     fetch("http://localhost:8081/avis", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: chargeUtile
//     });

//     })
// }
 

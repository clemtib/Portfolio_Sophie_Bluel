

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
    })       
        .then(function (reponse) {
            if (reponse.ok) {
                // document.location.href="index.html"
                console.log(chargeUtile)
                console.log(reponse)
            } else {
                window.alert("identification ou mot de passe eronné")
             
        }
        })
        .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message)
        })
})



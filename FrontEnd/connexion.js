

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
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: chargeUtile
    })  
    .then(function (reponse) {
        if (reponse.ok) {
            // document.location.href="index.html"
            reponse.json()
            .then(function (reponse) {
                sessionStorage.setItem('adminId', reponse.token)
                document.location.href = "index.html"
            })
            .catch(function (error) {
            console.log('Il y a eu un problème avec la deuxieme opération fetch : ' + error.message)
            })

        } else {
            alert("identification ou mot de passe eronné")
            
        }
    })
    .catch(function (error) {
    console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message)
    })

   
})





//  .then(async function (reponse) {
//             if (reponse.ok) {
//                 reponse = await reponse.json()
//                 sessionStorage.setItem('adminId', reponse.token)
//                 document.location.href = "index.html"
                
//                 console.log(sessionStorage.getItem('adminId'))
            
//             } else {
//                 window.alert("identification ou mot de passe eronné")
                
             
//         }
//         })
//         .catch(function (error) {
//         console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message)
//         })
   
               
 


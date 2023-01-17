
const takeProject = await fetch('http://localhost:5678/api/works')
const project = await takeProject.json();

const takeCategories = await fetch('http://localhost:5678/api/categories')
const categories = await takeCategories.json();





//Ajout du Titre
const sectionPortfolio = document.querySelector("#portfolio")
const containerTitlePortfolio = document.createElement('div')
containerTitlePortfolio.className = 'titlePortfolio'
const titlePortfolio = document.createElement("h2")
titlePortfolio.innerText = `Mes Projets`
sectionPortfolio.appendChild(containerTitlePortfolio)
containerTitlePortfolio.appendChild(titlePortfolio)

//création div pour filter
const sectionFilter = document.createElement("div")
sectionFilter.className = 'filter'
sectionPortfolio.appendChild(sectionFilter)




function generateFilter(categories) {
    //button Init
    const buttonFilter = document.createElement("button")
    buttonFilter.innerText = "Tous"
    sectionFilter.appendChild(buttonFilter)
    buttonFilter.addEventListener('click', function () {
        const categoriesFilter = project
        generateWorks(categoriesFilter);
    }) 
    sectionFilter.appendChild(buttonFilter)
    //stockage des filtres actif
    // let bilan = []
    // let bilanCategories = []
    //button categoriesFilter
    for (let i = 0; i < categories.length; i++) {
        
        const categoriesElement = categories[i]
        const buttonFilter = document.createElement("button")
        buttonFilter.innerText = categoriesElement.name
        // buttonFilter.className = "low"
        let check = false
        
        buttonFilter.addEventListener('click', function () {
           
            // toggle vert/blanc
            check = !check 

            if (check) {
                this.className = 'high'
                // bilan.push(categories[i].id)
                // bilan.sort(function (a, b) {
                //     return a - b
                // })
            } else {
                this.className = 'low'
                // bilan.splice(i,1)
            }

            // bilan

            
            const categoriesFilter = project.filter(function (project) {
                // return project.categoryId === bilan //syntaxe pour ajouter deux valeur dans un filtre de array 
                // for (let i = 0; i < bilan.length; i++){
                //     bilanCategories.push(bilan[i])
                // }
                // return project.categoryId === bilanCategories
                return project.categoryId === categories[i].id
                //si les trois sont vert 
            })
            // console.log(bilanCategories)
          
            // buttonFilter.className = "high"
            // document.querySelector(".gallery").innerHTML = "";
            generateWorks(categoriesFilter);
        }) 
        sectionFilter.appendChild(buttonFilter)
    }
}



function generateWorks(project) {

    document.querySelector(".gallery").remove()
    //selection de la balise .gallery
    //const sectionGallery = document.querySelector(".gallery")
    const sectionGallery = document.createElement("div")
    sectionGallery.className = 'gallery';
    
    for (let i = 0; i < project.length; i++){

        const projectElement = project[i];
       

        //ajout d'un balise figure
        const galleryElement = document.createElement("figure")
        //ajout de l'image
        const imageElement = document.createElement("img")
        imageElement.src = projectElement.imageUrl
        imageElement.crossOrigin = 'anonymous'
        imageElement.alt = projectElement.title
        //ajout du titre
        const sectionTitle = document.createElement("figcaption")
        sectionTitle.innerText = projectElement.title


        //sectionPortfolio.appendChild(sectionGallery)
        galleryElement.appendChild(imageElement)
        galleryElement.appendChild(sectionTitle)
        sectionGallery.appendChild(galleryElement)     
    }
    sectionPortfolio.appendChild(sectionGallery)
}

adminLogin()
generateWorks(project)

generateFilter(categories)





//Modification de la page => Home-page Edit 
//Verifier si c'est comme ca que l'on fait ... j'ai un doute 
function adminLogin() {
    //modification et ajout des elements en mode EDIT
    //il faudra remettre en mode normal quand  "click" "logout"
    if (sessionStorage.getItem('adminId')) {
        //Bandeau noir
        const header = document.querySelector("header")
        const editionMode = document.createElement("div")
        editionMode.className = 'editionMode'
        //Changement du style du header. Conventionel ?
        header.style.padding = "0 0 0 0"
        //icon + "Mode edition"
        const iconEdition = document.createElement("i")
        iconEdition.className = "fa-regular fa-pen-to-square fa-lg iconEdition"
        const editionTitle = document.createElement("div")
        editionTitle.className ="editionTitle"
        editionTitle.innerText = "Mode édition"
        //button "publier les changements"
        const publishButton = document.createElement("button")
        publishButton.innerText = "publier les changements"
        //ajouter action pour valider les modification et les envoyer à l'API
        //-------

        //-------
        //login to logout
        const login = document.querySelector(".login").remove()
        const ulNav = document.querySelector('header nav ul')
        const logout_li = document.createElement("li")
        const logout_a = document.createElement('a')
        logout_a.innerText = "logout"
        logout_a.className = "logout"
        //suppression du token pour "logout"
        logout_a.addEventListener('click', function () {
            sessionStorage.clear('adminId')
            //refresh la page html pour repartir à 0 
            location.reload()
        })

        // icon + modifier 
        // section#introduction figure div
        // section#introduction article div
        // section#portfolio div

        const selectElement = ['section#introduction figure',
            'section#introduction article',
            'section#portfolio .titlePortfolio']
        
        for (let i = 0; i < selectElement.length; i++){
            const modifElement = document.querySelector(selectElement[i])
            const divModif = document.createElement('div')
            divModif.className = "divModif"
            const textModif = document.createElement('a')
            textModif.innerText = "Modifier"
            const iconModif = document.createElement("i")
            iconModif.className = "fa-regular fa-pen-to-square fa-lg iconModif"

            modifElement.appendChild(divModif)
            divModif.appendChild(iconModif)
            divModif.appendChild(textModif)
        }

        //supression des filtres
       const filter = document.querySelector('.filter').remove()
     


     
        //bloc noir
        header.appendChild(editionMode)
        editionMode.appendChild(editionTitle)
        editionTitle.appendChild(iconEdition)
        editionMode.appendChild(publishButton)

        //logout
        ulNav.appendChild(logout_li)
        logout_li.appendChild(logout_a)

        //icon + Modifier
      
       
        console.log(selectElement)
} else {
    console.log("bye")
}  
}










const takeProject = await fetch('http://localhost:5678/api/works')
const project = await takeProject.json();

const takeCategories = await fetch('http://localhost:5678/api/categories')
const categories = await takeCategories.json();


//Ajout du Titre
const sectionPortfolio = document.querySelector("#portfolio")
const titlePortfolio = document.createElement("h2")
titlePortfolio.innerText = `Mes Projets`
sectionPortfolio.appendChild(titlePortfolio)

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
        // document.querySelector(".gallery").innerHTML = "";
        generateWorks(categoriesFilter);
    }) 
    sectionFilter.appendChild(buttonFilter)
    //stockage des filtres actif
    let bilan = []
    let bilanCategories = []
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
                bilan.push(categories[i].id)
                bilan.sort(function (a, b) {
                    return a - b
                })
            } else {
                this.className = 'low'
                bilan.splice(i,1)
            }
            console.log(bilan)
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


generateWorks(project)

generateFilter(categories)


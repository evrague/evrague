

// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

// protfolio filters
$(window).on("load", function() {
    var t = $(".portfolio-container");
    t.isotope({
        filter: ".new",
        animationOptions: {
            duration: 750,
            easing: "linear",
            queue: !1
        }
    }), $(".filters a").click(function() {
        $(".filters .active").removeClass("active"), $(this).addClass("active");
        var i = $(this).attr("data-filter");
        return t.isotope({
            filter: i,
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: !1
            }
        }), !1
    });
});


fetch('https://raw.githubusercontent.com/evrague/evrague/master/travaux.json')
  .then(response => response.json())
  .then(travaux => {

    // const portfolio_container = document.getElementById("porportfolio");
    const iso = $('.portfolio-container').isotope(); // récupération instance


    travaux.forEach(travail => {
      const code_html = `
            <div class="col-md-6 col-lg-4 ${travail.type} new">
                <div class="portfolio-item">
                        <img src="assets/imgs/${travail.image}" class="img-fluid" alt="Github Work ${travail.title}">                         
                    <div class="content-holder">
                        <div class="text-holder">
                            <a href="${travail.lien_site}" target="_blank"> 
                                <h6 class="title">${travail.title}</h6>
                            </a>
                            <a href="${travail.code_source}" target="_blank"> 
                                <p class="text-light"><u><b>Code Source</b></u></p>
                            </a>
                            <ul>
                                ${travail.competences.map(competence => `<li class="subtitle"> ${competence} </li>`)}
                            </ul>
                        </div>
                    </div>    
                </div>              
            </div>`;

            //portfolio_container.innerHTML += code_html;
            // Créer l'élément DOM
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = code_html.trim();
            const elem = tempDiv.firstChild;

            // Ajouter à la page
            document.getElementById("porportfolio").appendChild(elem);

            // Ajouter dynamiquement à Isotope
            iso.isotope('appended', $(elem));

    });
  })
  .catch(error=>{
    console.log("erreur de recuperation des travaux du fichier json ", error);
  })
var app = {
    'init': function () {
        console.log('--> init');
        // importer le plateau qui va contenir les carte
        app.plateau = document.getElementById('plateau');
        // tableau qui contient les classes permettant d'identifier deux cartes identiques
        app.arrayClass = [100, 100, 200, 200, 300, 300, 400, 400, 500, 500, 600, 600, 700, 700, 800, 800, 900, 900, 1000, 1000, 1100, 1100, 1200, 1200, 1300, 1300, 1400, 1400];
        // counter de click
        app.clickCounter = 1;

        // première carte 
        app.firstCard;
        // deuxième carte 
        app.secondCard;
        // click autorisé ou pas
        app.clickAllowed=true;

        // lancer la function pour créer le plateau
        app.createPlateau();
    },
    'createPlateau': function () {
        // boucle for qui s'execute 28 fois de 0 à 27
        app.arrayClass = app.shuffle(app.arrayClass);
        console.log("app.arrayClass:", app.arrayClass);
        for (var i = 0; i < 28; i++) {
            app.createCard(i);
        }
    },
    'createCard': function (param) {
        console.log('createCard(', param, ')');
        // créer une div au sein du javascript
        var card = document.createElement('div');
        // ajouter une class commune à toute les cartes : card
        // ajouter la class commune à deux cartes :  app.arrayClass[param]
        card.className = 'card ' + app.arrayClass[param];
        // ajouter un id unique à l'élément
        card.id = param;
        // modifier dynamiquement la propriété css backgroundpositiony
        card.style.backgroundPositionY = app.arrayClass[param] + 'px';
        // envoyer la div vers le html dans le plateau
        app.plateau.appendChild(card);
        // ajouter un ecouteur d'evenement click
        card.addEventListener('click', function (evt) {

    
            //check if we already click on the card
            var cardAlreadyFlip = evt.target.className.includes('active');

            if(app.clickAllowed==true && cardAlreadyFlip==false){

                // ajouter ou enlever la class active sur l'element sur lequel on a cliqué
                evt.target.classList.toggle('active');
    
                // si premir click
                if (app.clickCounter == 1) {
                    // incrementation de click counter
                    app.clickCounter = app.clickCounter + 1
    
                    // je stock l'element HTML sur lequel j'ai cliqué
                    app.firstCard = evt.target;
    
                } else if (app.clickCounter == 2) {
                    // je remet à 1 la valeur de click count
                    app.clickCounter = 1;
    
                    // je stock l'element HTML sur lequel j'ai cliqué la deuxième fois
                    app.secondCard = evt.target;
    
                    // comparer les deux images sur lesquelles on a cliqué
                    if (app.firstCard.className == app.secondCard.className) {
    
                        console.log('trouvé')
                    } else {
                        app.clickAllowed=false;
                        // attendre 2 secondes puis retourner les cartes
                        // lancer un compteur de secondes pdt 2 sec
                        setTimeout(function(){
                            // enlever la class active des deux cartes au bout des deux secondes
                            app.firstCard.classList.remove('active');
                            app.secondCard.classList.remove('active');
                            app.clickAllowed=true;
                        }, 2000);
                    }
    
                }

            }    

        })
    },
    'shuffle': function (arrayToShuffle) {
        // ------ melanger des cartes -----------
        var arrayShuffled = [];

        while ((arrayToShuffle.length > 0)) {

            arrayShuffled[arrayShuffled.length] = arrayToShuffle.splice(Math.floor(Math.random() * arrayToShuffle.length), 1)[0];
        }

        return arrayShuffled;
    },
    'shuffle2': function (a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
}

// attendre le chargement du dom puis lancer l'app via la function init
document.addEventListener('DOMContentLoaded', app.init)
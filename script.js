


document.addEventListener("DOMContentLoaded",()=>{
    let temps=0;
    let miniteurtempsComplet;
    demarrerTempsComplet();
    
    const quizeSData=JSON.parse(localStorage.getItem("quizeSData"));
    console.log(quizeSData);


const index_quiz=localStorage.index_quiz;
const quizData =quizeSData[index_quiz].questions; 
    

  let barProgression=document.getElementById("progressBar");
  let btn_progress=document.querySelector(".btn_progress");
  
  
  let pourcentageBarre=100/quizData.length;
  
  function fonction_augment_Bar(){
      barProgression.style.width=`${pourcentageBarre}%`;
      pourcentageBarre+=100/quizData.length;
  }
  
let miuteur;
const elementTemps = document.getElementById("time");

function demarrerMinuteur(){
    
    let tempsRestant = 10;
    elementTemps.textContent = tempsRestant + "s"; 
    
    function decrementerTemps(){
        if(indiceQuestionActuelle >= quizData.length){
            setTimeout(()=>{
                elementTemps.textContent = 0 + "s"; 
            },1000)
            
        }
         if(tempsRestant > 0){
            tempsRestant--;
            elementTemps.textContent = tempsRestant + "s"; 
        } else {
            clearInterval(miuteur);
            suivanteQuestion(); 
        }
    }

    clearInterval(miuteur);
    miuteur = setInterval(decrementerTemps, 1000);
}

function demarrerTempsComplet() {

        temps =0;    
        miniteurtempsComplet = setInterval(() => {
        temps++;
        affichageTempsComplet.textContent = `${temps-quizData.length}s`;
        console.log(affichageTempsComplet.textContent);
    }, 1000);

}

function arreterTempsComplet() {
    clearInterval(miniteurtempsComplet);
}


let indiceQuestionActuelle = 0;
let score=0;
const spanScore=document.querySelector("#score");

const zoneTous=document.querySelector(".question_area");
const zoneChoixMultiple=document.querySelector(".multiple-choice");
const zonevraiFaux=document.querySelector(".vf-question");
const zoneQuestionInput = document.querySelector(".input-question");
const affichageTempsComplet=document.querySelector(".affichage_temps span");


console.log(affichageTempsComplet);

const details_quiz_utilisateur=document.querySelector(".details_quiz_utilisateur");

function afficherQuestion() {

    demarrerMinuteur();
    
     

    const zoneOptions = document.querySelector(".question_area .options");
    const zoneQuestion = document.querySelector(".question_area h2");

    

    
    const zoneOptionsVF = document.querySelector(".vf-question .options");
    const zoneQuestionVF = document.querySelector(".vf-question h2");


    
    const titreQuestionInput = zoneQuestionInput.querySelector("h2");
    const champDeSaisie = zoneQuestionInput.querySelector(".answer-input");
    const boutonValiderReponse = zoneQuestionInput.querySelector(".submit-answer");





    const questionActuelle = quizData[indiceQuestionActuelle];


    const nombreQuestion=document.querySelector("#question-number");
    nombreQuestion.textContent=indiceQuestionActuelle+1;

    const nombreTotalQuestion=document.querySelector(".question-progress strong");
    nombreTotalQuestion.textContent=quizData.length;

    zoneTous.style.display = "none";
    zoneChoixMultiple.style.display = "none";
    zonevraiFaux.style.display = "none";
    zoneQuestionInput.style.display = "none";
    details_quiz_utilisateur.style.display="none";
    
    switch (questionActuelle.type) {
        case 'mcq':
            zoneChoixMultiple.style.display = "block";

            zoneQuestion.textContent = questionActuelle.question;
            zoneOptions.innerHTML = '';

            questionActuelle.options.forEach((option, index) => {
            const bouton = document.createElement("button");
            bouton.textContent = option;
        
            bouton.addEventListener("click", () => verifierReponse(index));    
            zoneOptions.appendChild(bouton);
        
            });
            
            break;
    
        case 'boolean':
            zonevraiFaux.style.display = "block";

            zoneQuestionVF.textContent = questionActuelle.question;
            zoneOptionsVF.innerHTML = '';

            questionActuelle.options.forEach((option, index) => {
            const bouton = document.createElement("button");
            bouton.textContent = option;
            bouton.addEventListener("click", () => verifierReponse(index));    
            zoneOptionsVF.appendChild(bouton);
            });
            break;
    
            case 'text':
                let textTrouve = false;
                zoneQuestionInput.style.display = "block";
                titreQuestionInput.textContent = questionActuelle.question;

                const boutonValiderReponseClone = boutonValiderReponse.cloneNode(true);
                boutonValiderReponse.parentNode.replaceChild(boutonValiderReponseClone, boutonValiderReponse);
            
                boutonValiderReponseClone.addEventListener("click", () => {

                    if (champDeSaisie.value.trim() === '') {
                        alert("Le champ doit contenir du texte !");
                        return; 
                    }
                

                    textTrouve = questionActuelle.correctAnswer.includes(champDeSaisie.value.trim());
                
                    if (textTrouve) {
                        boutonValiderReponseClone.style.backgroundColor = "green";
                        champDeSaisie.style.backgroundColor = "green";
                        score++;
                        spanScore.textContent=score;

                        const question_detail_user=document.createElement("h3");
                        question_detail_user.textContent=questionActuelle.question;
                        container_questions_correctes.appendChild(question_detail_user);

                        const div_reponse_corrcte=document.createElement("div");
                        div_reponse_corrcte.classList.add("reponses_correctes");
                        div_reponse_corrcte.textContent=champDeSaisie.value;
                        div_reponse_corrcte.style.fontSize="18px";
                        div_reponse_corrcte.style.fontFamily="bold";
                        container_questions_correctes.appendChild(div_reponse_corrcte);

                        const explication=document.createElement("h4");
                        explication.textContent=questionActuelle.explication;
                        explication.style.marginBottom = "20px";
                        explication.style.color="green";
                        container_questions_correctes.appendChild(explication);



                    } else {
                        boutonValiderReponseClone.style.backgroundColor = "red";
                        champDeSaisie.style.backgroundColor = "red";

                        const question_detail_user=document.createElement("h3");
                        question_detail_user.textContent=questionActuelle.question;
                        container_questions_incorrectes.appendChild(question_detail_user);

                        const div_reponse_incorrcte=document.createElement("div");
                        div_reponse_incorrcte.classList.add("reponses_incorrectes");
                        div_reponse_incorrcte.textContent=champDeSaisie.value;
                        div_reponse_incorrcte.style.fontSize="18px";
                        div_reponse_incorrcte.style.fontFamily="bold";
                        container_questions_incorrectes.appendChild(div_reponse_incorrcte);

                        const explication=document.createElement("h4");
                        explication.textContent=questionActuelle.explication;
                        explication.style.marginBottom = "20px";
                        explication.style.color="red";
                        container_questions_incorrectes.appendChild(explication);

                        

                    }
                    boutonValiderReponseClone.disabled = true;
                

                    setTimeout(() => {
                        boutonValiderReponseClone.disabled = false;
                        boutonValiderReponseClone.style.backgroundColor = "";
                        champDeSaisie.style.backgroundColor = "";
                        champDeSaisie.value = "";
                        suivanteQuestion();
                    }, 1000);
                });
                
                break;   
        default:
            console.log("Type de question inconnu");
    }
        
}

const container_questions_correctes=document.querySelector(".container_questions_correctes");
const container_questions_incorrectes=document.querySelector(".container_questions_incorrectes");



function verifierReponse(indiceReponse) {
    const questionActuelle = quizData[indiceQuestionActuelle];
    const options = questionActuelle.type === 'boolean' 
                        ? document.querySelector(".vf-question .options") 
                        : document.querySelector(".multiple-choice .options")

    const boutons = options.querySelectorAll(" button");
    const bonneReponse = questionActuelle.correctAnswer;


    boutons.forEach(bouton => bouton.style.backgroundColor = "#F2E6E6");


    if (indiceReponse === bonneReponse) {
        boutons[indiceReponse].style.backgroundColor = 'green';
        score++;
        spanScore.textContent=score;

        const question_detail_user=document.createElement("h3");
        question_detail_user.textContent=questionActuelle.question;
        container_questions_correctes.appendChild(question_detail_user);

        const div_reponse_corrcte=document.createElement("div");
        div_reponse_corrcte.classList.add("reponses_correctes");
        div_reponse_corrcte.textContent=boutons[indiceReponse].textContent;
        div_reponse_corrcte.style.fontSize="18px";
        div_reponse_corrcte.style.fontFamily="bold";
        container_questions_correctes.appendChild(div_reponse_corrcte);

        const explication=document.createElement("h4");
        explication.textContent=questionActuelle.explication;
        explication.style.marginBottom = "20px";
        explication.style.color="green";
        container_questions_correctes.appendChild(explication);

    } else {
        boutons[indiceReponse].style.backgroundColor = 'red';
        boutons[bonneReponse].style.backgroundColor = 'green';
        const question_detail_user=document.createElement("h3");
        question_detail_user.textContent=questionActuelle.question;
        container_questions_incorrectes.appendChild(question_detail_user);

        const div_reponse_corrcte=document.createElement("div");
        div_reponse_corrcte.classList.add("reponses_incorrectes");
        div_reponse_corrcte.textContent=boutons[indiceReponse].textContent;
        div_reponse_corrcte.style.fontSize="18px";
        div_reponse_corrcte.style.fontFamily="bold";
        container_questions_incorrectes.appendChild(div_reponse_corrcte);

        const explication=document.createElement("h4");
        explication.textContent=questionActuelle.explication;
        explication.style.marginBottom = "20px";
        explication.style.color="red";
        container_questions_incorrectes.appendChild(explication);
    }
    boutons.forEach(botton=>{
        botton.disabled="true"
    });
   setTimeout(suivanteQuestion,1000);
}


function suivanteQuestion() {

    indiceQuestionActuelle++;

    if (indiceQuestionActuelle >= quizData.length) {
        fonction_augment_Bar();
        arreterTempsComplet();
        setTimeout(()=>{
        const affichage_score=document.querySelector(".affichage_score h2 span");
        const affichage_pourcentage=document.querySelector(".affichage_pourcentage span");
        
        zoneTous.style.display = "none";
        zoneChoixMultiple.style.display = "none";
        zonevraiFaux.style.display = "none";
        zoneQuestionInput.style.display = "none";
        details_quiz_utilisateur.style.display="block";
        affichage_score.textContent=`${score} / ${quizData.length} `
        affichage_pourcentage.textContent = `${((score / quizData.length) * 100).toFixed(2)}%`;
        },2000);
        
        return;
    }

    else{
    fonction_augment_Bar(); 
    afficherQuestion();
    }
     
}
afficherQuestion();

const btnrepeatQuiz=document.querySelector(".btnrepeatQuiz");
const btnNouveauQuiz=document.querySelector(".btnNouveauQuiz");

btnrepeatQuiz.addEventListener("click", () => {
    setTimeout(() => {
        location.reload();
    }, 500); 
});


btnNouveauQuiz.addEventListener("click",()=>{
    setTimeout(()=>{
        window.location.href="index.html";
    },500);
    
})

});
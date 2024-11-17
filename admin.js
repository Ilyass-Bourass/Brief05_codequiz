document.addEventListener("DOMContentLoaded", () => {
    const quizeSData = JSON.parse(localStorage.getItem("quizeSData")) || [];

    const selectQuizAdmin = document.querySelector("#quiz");

    quizeSData.forEach((quiz, index) => {
        const optionQuizAdmin = document.createElement("option");
        optionQuizAdmin.textContent = quiz.title;
        optionQuizAdmin.setAttribute("index_quiz_admin", index);
        selectQuizAdmin.appendChild(optionQuizAdmin);
    });

    


    
    selectQuizAdmin.addEventListener("change", (e) => {
        const index_quiz_admin=e.target.options[e.target.selectedIndex].getAttribute("index_quiz_admin");
        localStorage.setItem("index_quiz_admin",index_quiz_admin);
    });

    const container_quiz_quistion = document.querySelector(".container_ajouterQuiz");
    const dashbord_ajouterQuiz = document.querySelector(".ajouterQuiz");
    const dashbord_ajouterQuestion = document.querySelector(".ajouterQustion");

    const zoneQuiz = document.querySelector(".quiz-section");
    const zoneQuestion = document.querySelector(".question-section");

    zoneQuiz.style.display = "none";
    zoneQuestion.style.display = "none";
    container_quiz_quistion.style.display = "none";

    dashbord_ajouterQuiz.addEventListener("click", (e) => {
        e.preventDefault();
        zoneQuestion.style.display = "none";
        container_quiz_quistion.style.display = "block";
        zoneQuiz.style.display = "block";
        location.href="#partieQuiz"
    });

    dashbord_ajouterQuestion.addEventListener("click", (e) => {
        e.preventDefault();
        zoneQuiz.style.display = "none";
        container_quiz_quistion.style.display = "block";
        zoneQuestion.style.display = "block";
        location.href="#partieQuiz"
    });


    const quizesTable=document.querySelector("#quizesTable");

    quizeSData.forEach((quizeData, index) => {
    const tr_Détails= document.createElement("tr");

    tr_Détails.innerHTML = ` 
                             <td>${index+1}</td>
                            <td>${quizeData.title}</td>
                            <td>${quizeData.categorie}</td>
                            <td>${quizeData.tempsEstime}min</td>
                            <td>${quizeData.questions.length}</td>
                            <td>${quizeData.Niveau}</td>
                            <td><select id="statut">
            
                                <option value="inactif">inactif</option> 
                                <option value="actif">actif</option>
                            </select></td>
                            <td><button class="modifier">Modifier</button></td>
                            <td><button class="supprimer">Supprimer</button></td>
    `;
    quizesTable.appendChild(tr_Détails);

    const btsupprimer=tr_Détails.querySelector(".supprimer");
    const btnModier=tr_Détails.querySelector(".modifier");
    
    btsupprimer.addEventListener("click",()=>{
        quizeSData.splice(index,1);
        localStorage.setItem("quizeSData",JSON.stringify(quizeSData));
        location.reload();
    });

    btnModier.addEventListener("click", () => {
            location.href = "#EspaceModifierquiz";
        
        const ModifierQuiz = document.querySelector(".ModifierQuiz");
    
        const div_modifierQUiz = document.createElement("div");
        div_modifierQUiz.classList.add("container_ajouterQuiz");
        div_modifierQUiz.innerHTML = `
            <form class="quiz-form">
                <div class="quiz-section">
                    <h1>Modifier le Quiz ${quizeData.title}</h1>
                    <label for="title">Titre du Quiz</label>
                    <input type="text" id="title" name="title">
    
                    <label for="categorie">Catégorie</label>
                    <input type="text" id="categorie" name="categorie">
    
                    <label for="tempsEstime">Temps Estimé (minutes)</label>
                    <input type="number" id="tempsEstime" name="tempsEstime" >
    
                    <label for="NiveauPrecedent">Niveau Précédent</label>
                    <input type="text" id="NiveauPrecedent" name="NiveauPrecedent">
    
                    <label for="niveau">Le nouveau niveau</label>
                    <select id="niveau" name="niveau">
                        <option value="Facile">Facile</option>
                        <option value="Moyenne">Moyenne</option>
                        <option value="Difficile">Difficile</option>
                    </select>
                    <button type="submit" class="submit_btn_admin">Enregistrer la Modification</button>
                </div>
            </form>
        `;
        ModifierQuiz.appendChild(div_modifierQUiz);
    
        const inputTitle = div_modifierQUiz.querySelector("#title");
        const inputCategorie = div_modifierQUiz.querySelector("#categorie");
        const inputTemps = div_modifierQUiz.querySelector("#tempsEstime");
        const inputNiveauPrecedent = div_modifierQUiz.querySelector("#NiveauPrecedent");
        const selectNouveauNiveau = div_modifierQUiz.querySelector("#niveau");
    
        
        inputTitle.value = quizeData.title;
        inputCategorie.value = quizeData.categorie;
        inputTemps.value = parseInt(quizeData.tempsEstime);
        inputNiveauPrecedent.value = quizeData.Niveau;
    
        const btnEnregestrerModificationQuiz = div_modifierQUiz.querySelector(".submit_btn_admin");
    
        
        btnEnregestrerModificationQuiz.addEventListener("click", (e) => {
            e.preventDefault();
    
            
            quizeData.title = inputTitle.value;
            quizeData.categorie = inputCategorie.value;
            quizeData.tempsEstime = parseInt(inputTemps.value);
            quizeData.Niveau = selectNouveauNiveau.value; 
    
            
            localStorage.setItem("quizeSData", JSON.stringify(quizeSData));
            setTimeout(() => {
                alert("la modification du quiz a été avec succés");
                location.reload();
            }, 500);
        });
    });
    
    
    const selectStatut=tr_Détails.querySelector("#statut");

    selectStatut.addEventListener("change", (e) => {
        quizeData.statut = e.target.value; 
        localStorage.setItem("quizeSData", JSON.stringify(quizeSData)); 
    
        if (e.target.value === "actif") {
            selectStatut.style.color = "green";
        } else if (e.target.value === "inactif") {
            selectStatut.style.color = "red";
        }
    });
    if (quizeData.statut === "actif") {
        selectStatut.style.color = "green";
        selectStatut.value="actif";
    } else if (quizeData.statut === "inactif") {
        selectStatut.style.color = "red";
        selectStatut.value="inactif";
    }

});



    const question_type = document.querySelector("#question-type");
    const zone_mcq_option = document.querySelector(".mcq-options");
    const zone_VF_option = document.querySelector(".boolean-options");
    const zone_text_option = document.querySelector(".text-options");

    const btn_enregestrerQuiz = document.querySelector(".submit_btn_admin");
    const ajouter_questionQcm = document.querySelector(".ajouter_questionQcm");
    const ajouter_questionVF = document.querySelector(".ajouter_questionVF");
    const ajouter_questionText = document.querySelector(".ajouter_questionText");

    btn_enregestrerQuiz.addEventListener("click", () => {
        const inputTileQuiz = document.querySelector(".quiz-section #title");
        const inputCategorieQuiz = document.querySelector(".quiz-section #categorie");
        const inputTempsQuiz = document.querySelector(".quiz-section #tempsEstime");
        const selectNiveau = document.querySelector("#niveau");
        
        const nouveauQuiz = {
            "title": inputTileQuiz.value,
            "categorie": inputCategorieQuiz.value,
            "tempsEstime": inputTempsQuiz.value,
            "Niveau": selectNiveau.value,
            "questions": []
        };

        quizeSData.push(nouveauQuiz);
        localStorage.setItem("quizeSData", JSON.stringify(quizeSData));
        alert("Le quiz : " + inputTileQuiz.value + " a été enregistré avec succès");
    });

    function ajouterQuestion() {
        zone_VF_option.style.display = "none";
        zone_mcq_option.style.display = "none";
        zone_text_option.style.display = "none";

        question_type.addEventListener("change", (e) => {
            const selectedType = e.target.value;
            zone_text_option.style.display = selectedType === "text" ? "block" : "none";
            zone_mcq_option.style.display = selectedType === "mcq" ? "block" : "none";
            zone_VF_option.style.display = selectedType === "boolean" ? "block" : "none";
            btn_enregestrerQuiz.style.display = "block";
        });

        ajouter_questionText.addEventListener("click", (e) => {
            e.preventDefault();
        const inputquestionTxt=document.querySelector(".text-options #question-text");
        const inputResponse01=document.querySelector(".text-options #option1");
        const inputResponse02=document.querySelector(".text-options #option2");
        const inputExplication=document.querySelector(".text-options #explication");
        

        const nouveauQustionTxt= {
            "type": "text",
            "question":inputquestionTxt.value,
            "correctAnswer": [inputResponse01.value,inputResponse02.value],
            "explication":inputExplication.value
        }
        const index_quiz_admin=parseInt(localStorage.getItem("index_quiz_admin"));
        console.log(index_quiz_admin);
        quizeSData[index_quiz_admin].questions.push(nouveauQustionTxt);
        localStorage.setItem("quizeSData", JSON.stringify(quizeSData));
       // ajouter_questionText.removeEventListener("click");
        alert("la question a été enregestrer avec succés");
        location.reload();
        ajouterQuestion();
               
        });

        ajouter_questionQcm.addEventListener("click", (e) => {
            
            e.preventDefault();
            const inputQustionQcm=document.querySelector(".mcq-options #question-text");
            const inputOption01=document.querySelector(".mcq-options #option1");
            const inputOption02=document.querySelector(".mcq-options #option2");
            const inputOption03=document.querySelector(".mcq-options #option3");
            const inputOption04=document.querySelector(".mcq-options #option4");
            
            const inputCorrectIndex=document.querySelector(".mcq-options #correct-index");
            const inputExplication=document.querySelector(".mcq-options #explication");

            const nouveauQuestionQcm={
                "type": "mcq",
                "question":inputQustionQcm.value,
                "options": [inputOption01.value,inputOption02.value,inputOption03.value,inputOption04.value],
                "correctAnswer":parseInt(inputCorrectIndex.value),
                "explication":inputExplication.value
            }
            const index_quiz_admin=parseInt(localStorage.getItem("index_quiz_admin"));
            console.log(index_quiz_admin);
            quizeSData[index_quiz_admin].questions.push(nouveauQuestionQcm);
            localStorage.setItem("quizeSData", JSON.stringify(quizeSData));
         //   ajouter_questionQcm.removeEventListener("click");
            alert("la question a été enregestrer avec succés");
            location.reload();
            ajouterQuestion();
        });

        ajouter_questionVF.addEventListener("click", (e) => {  
            e.preventDefault();
            const inputquestionVF=document.querySelector(".boolean-options #question-text");
        //    const inputCorrectIndex=document.querySelector(".boolean-options #correct-index");
            const inputExplication=document.querySelector(".boolean-options #explication");

            const input_optionVraiFaux=document.querySelectorAll(".div_optionVraiFaux input");
            let indexCorrect=null;

            input_optionVraiFaux.forEach((inputvF)=>{
                if(inputvF.checked){
                    indexCorrect=parseInt(inputvF.value);
                    console.log(typeof(indexCorrect));
                }
            })

            if (indexCorrect === null) {
                alert("Veuillez sélectionner une réponse correcte (Vrai ou Faux).");
                return;
            }

            
            const nouveauQuestionVF={
                "type": "boolean",
                "question":inputquestionVF.value,
                "options": ["vrai","faux"],
                "correctAnswer":indexCorrect,
                "explication":inputExplication.value
            }
            const index_quiz_admin=parseInt(localStorage.getItem("index_quiz_admin"));
            console.log(index_quiz_admin);
            quizeSData[index_quiz_admin].questions.push(nouveauQuestionVF);
            localStorage.setItem("quizeSData", JSON.stringify(quizeSData));
            alert("la question a été enregestrer avec succés");
            location.reload();
            ajouterQuestion();            
        });
    }

    ajouterQuestion();
});

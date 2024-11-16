
document.addEventListener("DOMContentLoaded",()=>{

const quizeSData=JSON.parse(localStorage.getItem("quizeSData"));
console.log(quizeSData);

const quiz_list = document.querySelector(".quiz-list");
console.log(quiz_list);

quizeSData.forEach((quizeData, index) => {
    if(quizeData.statut==="actif"){
    const div_quizCard = document.createElement("div");
    div_quizCard.classList.add("quiz-card");
    div_quizCard.innerHTML = ` 
        <h2>${quizeData.title}</h2>
        <p>Categorie : <span>${quizeData.categorie}</span></p>
        <p>Niveau :<span> ${quizeData.Niveau}<\span></p>
        <p>Temps estimé : ${quizeData.tempsEstime} min</p>
        <p>Nombre de questions : ${quizeData.questions.length}</p>
    `;

    const btn_star_quiz = document.createElement("button");
    btn_star_quiz.textContent = "Démarrer le Quiz";
    div_quizCard.appendChild(btn_star_quiz);
    quiz_list.appendChild(div_quizCard);

    btn_star_quiz.addEventListener("click", () => {
        localStorage.index_quiz = index;
        window.location.href = "quiz.html";
    });
    }
});


const quizTypeSelect = document.querySelector(".quiz-type");
const quizCards = document.querySelectorAll(".quiz-card");

quizTypeSelect.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    
    quizCards.forEach((quizCard) => {
        const categoryText = quizCard.querySelector("p span").textContent.toLowerCase();

        if (selectedValue === "all") {
            quizCard.style.display = "";
        } 
        else if (categoryText === selectedValue) {
            quizCard.style.display = "";
        } else {
            quizCard.style.display = "none";
        }
    });
});


const search_input=document.querySelector(".search-input");

search_input.addEventListener("input",(e)=>{
    const searchUser=search_input.value.toLocaleLowerCase();
    quizCards.forEach(quizcard=>{
       const titreCard= quizcard.querySelector("h2").textContent.toLocaleLowerCase();
       if(titreCard.includes(searchUser)){
        quizcard.style.display="";
       }
       else{
        quizcard.style.display="none";
       }
    })
})

const difficultyOptions = document.querySelectorAll('input[name="difficulty"]');
let lastSelectedOption = null;

difficultyOptions.forEach(option => {
    option.addEventListener('click', () => {
        if (lastSelectedOption === option) {
            option.checked = false;
            lastSelectedOption = null;

            quizCards.forEach(quizCard => {
                quizCard.style.display = "";
            });
        } else {
            lastSelectedOption = option;
            const selectedDifficulty = option.value.toLowerCase();
            
            quizCards.forEach(quizCard => {
                const niveauQuiz = quizCard.children[2].querySelector("span").textContent.toLowerCase().trim();
                
                if (niveauQuiz === selectedDifficulty) {
                    quizCard.style.display = "";
                } else {
                    quizCard.style.display = "none";
                }
            });
        }
    });
});

});

let placeOfWord = document.querySelector(".word");

function getRandomWord() {
  let words = [
    "sphere",
    "harbor",
    "raid",
    "dimension",
    "confrontation",
    "weigh",
    "topple",
    "hunter",
    "communist",
    "upset",
    "unity",
    "permission",
    "ample",
    "trouser",
    "resource",
    "rehabilitation",
    "opinion",
    "sympathetic",
    "percent",
    "fashion",
    "discover",
    "version",
    "hover",
    "slice",
    "premature",
    "salmon",
    "manner",
    "letter",
    "habit",
    "bounce",
    "tune",
    "identification",
    "guarantee",
    "conglomerate",
    "chain",
    "basin",
    "recovery",
    "bathtub",
    "care",
    "hard",
    "vigorous",
    "temperature",
    "survival",
    "quality",
    "dare",
  ];

  let chooseRandom = Math.floor(Math.random() * words.length);
  let randomWordChosen = words[chooseRandom];
  let randomWordSplit = randomWordChosen.split("");
  let splitShuffle = shuffleWord(randomWordSplit);
  let finalWord = splitShuffle.join("");

  placeOfWord.innerHTML += finalWord;
  document.querySelector(".answer-btn").addEventListener("click", () => {
    let enteredGuess = document.querySelector(".entered-guess").value;
    enteredGuess = enteredGuess.trim();
    enteredGuess = enteredGuess.toLowerCase();
    console.log(enteredGuess);

    if (enteredGuess == randomWordChosen) {
      let playersPoints =
        JSON.parse(localStorage.getItem("playersPoints")) || 0;

      playersPoints = playersPoints + 1;
      alert(
        "Well Done You Have " +
          playersPoints +
          " Pts And The Word Was " +
          randomWordChosen
      );

      localStorage.setItem("playersPoints", JSON.stringify(playersPoints));
      location.reload();
    } else if (enteredGuess === "" || enteredGuess === null) {
      let playersPoints =
        JSON.parse(localStorage.getItem("playersPoints")) || 0;
      playersPoints = playersPoints - 1;

      alert(
        "Sorry You Lost A Point Now You Have " +
          playersPoints +
          " Pts And The Word Was " +
          randomWordChosen
      );
      localStorage.setItem("playersPoints", JSON.stringify(playersPoints));
      location.reload();
    } else {
      let playersPoints =
        JSON.parse(localStorage.getItem("playersPoints")) || 0;

      playersPoints = playersPoints - 1;
      alert(
        "Sorry You Lost A Point Now You Have " +
          playersPoints +
          " Pts And The Word Was " +
          randomWordChosen
      );
      localStorage.setItem("playersPoints", JSON.stringify(playersPoints));
      location.reload();
    }
  });
}

function shuffleWord(randomWord) {
  let currentIndex = randomWord.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [randomWord[currentIndex], randomWord[randomIndex]] = [
      randomWord[randomIndex],
      randomWord[currentIndex],
    ];
  }
  return randomWord;
}

getRandomWord();

let pointBtn = document.querySelector(".btns.point-btn");
pointBtn.addEventListener("click", function showPionts() {
  let playersPoints = JSON.parse(localStorage.getItem("playersPoints")) || 0;
  alert(playersPoints + " Pts");
});

let restartBtn = document
  .querySelector(".restart-btn")
  .addEventListener("click", function restart() {
    let playersPoints = JSON.parse(localStorage.getItem("playersPoints")) || 0;
    alert("You Had " + playersPoints + " Pts");
    alert("Points Are Reset");
    window.localStorage.clear();
  });

let exitBtn = document
  .querySelector(".exit-btn")
  .addEventListener("click", function restart() {
    let playersPoints = JSON.parse(localStorage.getItem("playersPoints")) || 0;
    alert("You Had " + playersPoints + " Pts");
    alert("Points Are Reset");
    window.localStorage.clear();
    window.location.href = "https://gamergram.netlify.app/homepage.html";
  });

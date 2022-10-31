let players_points: any = localStorage.getItem("players_points") || 0;
const place_of_word: Element | null = document.querySelector(".word");
const answer_btn: Element | null = document.querySelector(".answer-btn")

function getGameControls() {
	const point_btn: Element | null = document.getElementById("point-btn");
	const restart_btn: Element | null = document.getElementById("restart-btn");
	const exitBtn: Element | null = document.getElementById("exit-btn");

	if (!point_btn || !restart_btn || !exitBtn)
		return;

	point_btn.addEventListener("click", function showPionts() {
		alert(players_points + " Pts");
	});

	restart_btn.addEventListener("click", function restart() {
		alert("You Had " + players_points + " Pts");
		alert("Points Are Reset");
		window.localStorage.clear();
	});

	exitBtn.addEventListener("click", function restart() {
		alert("You Had " + players_points + " Pts");
		alert("Points Are Reset");
		window.localStorage.clear();
	});
}

function getRandomWord() {
	let words: string[] = ["hello", "hey"];
	let final_word: string[] = getWordToGuess(words);

	if (!place_of_word)
		return;
	place_of_word.innerHTML += final_word[1];

	answer_btn?.addEventListener("click", () => {
		const entered_guess: any = document.querySelector(".entered-guess");
		let guess = entered_guess?.value.trim().toLowerCase();
		let start_msg: string = "";
		let answer = final_word[0].trim().toLowerCase();

		if (guess === answer) {
			start_msg = "You now have "
			players_points = JSON.parse(players_points) + 1;

			localStorage.setItem("players_points", players_points);
			location.reload();
		} else {
			start_msg = "Sorry you lost a point you now have "
			players_points = JSON.parse(players_points) - 1;

			localStorage.setItem("players_points", players_points);
			location.reload();
		}

		alert(`${start_msg + players_points} Pts And The Word Was ${final_word}`);
	});
}

function getWordToGuess(word_choice: string[]): string[] {
	let choose_random: number = Math.floor(Math.random() * word_choice.length);
	let values: string[] = []

	if (choose_random != null) {
		let random_word_chosen = word_choice[choose_random];
		let random_word_split = random_word_chosen.split("");
		let split_shuffle = shuffleWord(random_word_split).join("");

		values.push(random_word_chosen, split_shuffle);
	}

	return values;
}

function shuffleWord(random_word: string[]) {
	let current_index = random_word.length, randomIndex;

	while (current_index != 0) {
		randomIndex = Math.floor(Math.random() * current_index);
		current_index--;
		[random_word[current_index], random_word[randomIndex]] = [
			random_word[randomIndex],
			random_word[current_index],
		];
	}
	return random_word;
}


getGameControls();
getRandomWord();

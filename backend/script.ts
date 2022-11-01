let players_points: any = localStorage.getItem("players_points") || 0;
const place_of_word: Element | null = document.querySelector(".word");
const answer_btn: Element | null = document.querySelector(".answer-btn")

// function alert_modal(heading: string, message: string, btn_text: string): void {
// 	let alert_visible = false;
// 	const body = document.getElementsByTagName("body")[0];

// 	const alert_modal = `	
// 		<section id="alert-modal">
// 			<h1 class="alert-modal-content heading">${heading}</h1>
// 			<p class="alert-modal-content message">${message}</p>
// 			<button id="alert-modal-btn">${btn_text}</button>
// 		</section>`

// 	body.innerHTML = alert_modal;
// 	const alert_modal_styling = document.getElementById("alert-modal") as HTMLElement | null;

// 	if (!alert_modal_styling)
// 		return;

// 	let alert_modal_styles: any = {
// 		"display": "flex",
// 		"position": "absolute",
// 		"flex-direction": "column",
// 		"justify-content": "space-between",
// 		"background-color": "white",
// 		"border-radius": "5px",
// 		"height": "30%",
// 		"width": "30%",
// 		"padding": "25px",
// 		"opacity": "1"
// 	}

// 	for (const key in alert_modal_styles) {
// 		if (!Object.prototype.hasOwnProperty.call(alert_modal_styles, key))
// 			return;
// 		alert_modal_styling.setAttribute('style', `${key}: ${alert_modal_styles[key]}`);
// 	}

// 	const alert_modal_btn: Element | null = document.getElementById("alert_modal_btn");

// 	if (!alert_visible)
// 		alert_visible = true;

// 	alert_modal_btn?.addEventListener('click', () => {
// 		if (alert_visible)
// 			alert_modal_styling.style.opacity = "1";
// 		alert_visible = false;
// 	})

// }

function getGameControls() {
	const point_btn: Element | null = document.getElementById("point-btn");
	const restart_btn: Element | null = document.getElementById("restart-btn");
	const exitBtn: Element | null = document.getElementById("exit-btn");

	if (!point_btn || !restart_btn || !exitBtn)
		return;

	point_btn.addEventListener("click", function showPoints() {
		// alert_modal("Points", `${players_points} Pts`, "Ok");
		alert(`${players_points} Pts`);
	});

	restart_btn.addEventListener("click", function restart() {
		// alert_modal("You have restarted", `You Had ${players_points} Pts`, "Ok");
		alert(`You Had ${players_points} Pts. They have been restarted.`);
		window.localStorage.clear();
	});

	exitBtn.addEventListener("click", function exit() {
		// alert_modal("You have exited", `You Had ${players_points} Pts`, "Ok");
		alert(`You Had ${players_points} Pts. They have been reset.`);
		window.localStorage.clear();
		window.close();
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

		// alert_modal("The Answer", `${start_msg + players_points} Pts And The Word Was ${final_word}`, "Ok");
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

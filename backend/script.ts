const word_api = {
	"words": [
		"lighter",
		"deliver",
		"outline",
		"confuse",
		"trustee",
		"regular",
		"exploit",
		"improve",
		"predict",
		"journal",
		"diagram",
		"popular",
		"certain",
		"hunting",
		"fortune",
		"suggest",
		"nervous",
		"episode",
		"shatter",
		"splurge",
		"benefit",
		"biscuit",
		"achieve",
		"lecture",
		"decline",
		"barrier",
		"package",
		"elegant",
		"cunning",
		"harmony",
		"seminar",
		"prevent",
		"tension",
		"abridge",
		"freight",
		"skilled",
		"respect",
		"extract",
		"display",
		"digital",
		"serious",
		"analyst",
		"comment",
		"despise",
		"purpose",
		"stomach",
		"bedroom",
		"urgency",
		"confine",
		"concert",
		"waterfall",
		"radiation",
		"explosion",
		"foreigner",
		"influence",
		"satisfied",
		"principle",
		"favourite",
		"butterfly",
		"biography",
		"candidate",
		"injection",
		"reservoir",
		"adventure",
		"recognize",
		"objective",
		"exception",
		"premature",
		"reduction",
		"community",
		"eavesdrop",
		"exemption",
		"therapist",
		"consensus",
		"breakdown",
		"overwhelm",
		"marketing",
		"executrix",
		"breakfast",
		"guideline",
		"formulate",
		"qualified",
		"professor",
		"important",
		"captivate",
		"magnitude",
		"freighter",
		"orchestra",
		"frequency",
		"undertake",
		"precedent",
		"evolution",
		"fisherman",
		"coalition",
		"machinery",
		"telephone",
		"precision",
		"relevance",
		"communist",
		"direction",
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
		"dare"
	]
}

let players_points: any = localStorage.getItem("players_points") || 0;
const place_of_word: Element | null = document.querySelector(".word");
const answer_btn: Element | null = document.querySelector(".answer-btn");

function alert_modal(heading: string = "", message: string = "", btn_text: string = "Ok", exit_status: boolean = false): void {
	const body = document.getElementsByTagName("body")[0];

	const alert_modal_struc = `	
		<section id="alert-modal">
		<h1 class="alert-modal-content amc-heading">${heading}</h1>
		<p class="alert-modal-content amc-message">${message}</p>
		<button id="${btn_text}-btn">${btn_text}</button>
		</section>`

	body.innerHTML = alert_modal_struc;
	const alert_modal_styling = document.getElementById("alert-modal") as HTMLElement | null;
	const alert_modal_btn = document.getElementById(`${btn_text}-btn`) as HTMLElement | null;

	if (!alert_modal_styling || !alert_modal_btn)
		return;

	let alert_modal_styles: any = {
		display: "flex",
		position: "absolute",
		flexDirection: "column",
		alignItems: "",
		justifyContent: "space-evenly",
		backgroundColor: "white",
		borderRadius: "5px",
		height: "30%",
		width: "30%",
		padding: "25px",
		opacity: "1"
	}

	let styles = alert_modal_styling.style
	for (const value in styles) {
		for (const key in alert_modal_styles) {
			if (value === key) {
				styles[value] = alert_modal_styles[key];
				alert_modal_btn.style.alignSelf = "flex-end";
				alert_modal_btn.style.width = "30%";
			}
		}
	}

	alert_modal_btn.addEventListener('click', () => {
		if (exit_status) {
			window.close();
		}

		if (!exit_status) {
			window.location.reload();
		}
	})
}

function getGameControls() {
	const restart_btn: Element | null = document.getElementById("restart-btn");
	const exitBtn: Element | null = document.getElementById("exit-btn");

	if (!restart_btn || !exitBtn)
		return;

	restart_btn.addEventListener("click", function restart() {
		alert_modal("You have restarted", `You Had ${players_points} Pts`, "Ok");
		window.localStorage.clear();
	});

	exitBtn.addEventListener("click", function exit() {
		alert_modal("You have exited", `You Had ${players_points} Pts`, "Ok", true);
		window.localStorage.clear();
	});
}

function getRandomWord(word_api_value: string[]) {
	let words: string[] = [];
	if (word_api_value)
		words = word_api_value
	let final_word: string[] = getWordToGuess(words);

	if (!place_of_word)
		return;

	place_of_word.innerHTML += final_word[1];
	console.log(final_word[0]);

	answer_btn?.addEventListener("click", () => {
		const entered_guess: any = document.querySelector(".entered-guess");
		let guess = entered_guess?.value.trim().toLowerCase();
		let start_msg: string = "";
		let answer = final_word[0].trim().toLowerCase();

		if (guess === answer) {
			start_msg = "You now have "
			players_points = JSON.parse(players_points) + 1;

			localStorage.setItem("players_points", players_points);
		} else {
			start_msg = "Sorry you lost a point you now have "
			players_points = JSON.parse(players_points) - 1;

			localStorage.setItem("players_points", players_points);
		}

		alert_modal("The Answer", `${start_msg + players_points} Pts and the word was ${answer}`, "Ok");
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
getRandomWord(word_api["words"]);

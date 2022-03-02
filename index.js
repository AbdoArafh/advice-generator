const API_ENDPOINT = "https://api.adviceslip.com/advice";
const SPIN_CLASSNAME = "spin";
const ERROR_CLASSNAME = "error";

const adviceIdEl = document.querySelector(".advice-id");
const adviceTextEl = document.querySelector(".advice-text");
const rollButton = document.querySelector(".roll-button");
const slipCount = 224;

let advice = {
    id: 117,
    advice: "It is easy to sit up and take notice, what's more difficult is getting up and taking action."
}

function randomId() {
    return "/" + Math.ceil(Math.random() * slipCount)
}

function render() {
    adviceIdEl.textContent = advice.id;
    adviceTextEl.textContent = advice.advice;
    rollButton.classList.remove(SPIN_CLASSNAME);
    rollButton.classList.remove(ERROR_CLASSNAME);
}

function updateAdvice() {
    rollButton.classList.add(SPIN_CLASSNAME);
    fetch(API_ENDPOINT + randomId())
        .then(res => res.json())
        .then(d => d.slip)
        .then(slip => advice = slip)
        .then(render)
        .catch(() => {
            rollButton.classList.remove(SPIN_CLASSNAME);
            rollButton.classList.add(ERROR_CLASSNAME);
        });
}

rollButton.addEventListener("click", updateAdvice);
render();
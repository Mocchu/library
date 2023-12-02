const formList = document.querySelector(".form-list");
const pw = document.querySelector("#pw");
const pw2 = document.querySelector("#pw2");
const submit = document.querySelector(".login");

let messageExists = false;

pw2.addEventListener("input", () => {
	if (pw.value != pw2.value) {
		pw2.setCustomValidity("Passwords do not match!");
		console.log("Passwords do not match!");
		if (!messageExists) {
			messageExists = true;
			appendErrorMessage();
		}
	} else if (pw.value === pw2.value) {
		pw2.setCustomValidity("");
		console.log("Passwords match!");
		if (messageExists) {
			messageExists = false;
			errorList.remove();
		}
	}
});

function appendErrorMessage() {
	errorList = document.createElement("li");
	errorMsg = document.createElement("p");
	errorMsg.textContent = "Passwords do not match!";
	errorMsg.style.color = "red";
	errorMsg.style.fontSize = "0.9rem";
	errorList.append(errorMsg);
	formList.append(errorList);
}

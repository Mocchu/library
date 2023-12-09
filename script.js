// Backend
const myLibrary = [];

function Book(title, author, pages, read, index) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.index = index;
}

function addBookToLibrary(book) {
	myLibrary.push(book);
}

// Frontend
function createCard(book) {
	// Create elements
	const card = document.createElement("div");
	const ul = document.createElement("ul");
	const title = document.createElement("li");
	const author = document.createElement("li");
	const pages = document.createElement("li");
	const read = document.createElement("li");

	// Set content
	title.textContent = book.title;
	author.textContent = book.author;
	pages.textContent = book.pages;
	read.textContent = book.read;

	// Append content to card
	card.append(title);
	for (const li of [title, author, pages, read]) ul.append(li);
	card.append(ul);

	// Set classes and attributes
	card.classList.add("card");
	card.classList.add("fadeInUp-animation");
	card.setAttribute("index", book.index);

	return card;
}

function addCardToShelf(card) {
	if (card) shelfDiv.append(card);
}

// Selectors
const shelfDiv = document.querySelector(".shelf");
const form = document.querySelector("form");
const addBookThings = document.getElementsByClassName("add");

const newBookBtn = document.querySelector(".new-book");
const submitBtn = document.querySelector("button[type=submit]");

const editCard = document.querySelector(".edit-card");
const editH1 = document.querySelector(".edit-h1");
const editRead = document.querySelector(".edit-read");
const editDelete = document.querySelector(".edit-delete");

// Event listeners
shelfDiv.addEventListener("click", (e) => {
	// When user clicks a card
	e.stopPropagation();
	showEditForm();
	index = getcardIndex(e);

	editH1.textContent = "";
});

document.addEventListener("click", (e) => {
	// When user unfocuses the edit form
	showAddBookForm();
});

submitBtn.addEventListener("click", (e) => {
	// If form is invalid do nothing
	if (!form.checkValidity()) return;

	// Assign values
	const titleInp = document.querySelector("#title").value;
	const authorInp = document.querySelector("#author").value;
	const pagesInp = document.querySelector("#pages").value;
	let readInp = document.querySelector("#read").checked;
	readInp = readInp ? "✅" : "📖";
	const index = myLibrary.length;

	// Create and append book & card
	newBook = new Book(titleInp, authorInp, pagesInp, readInp, index);
	addBookToLibrary(newBook);
	newCard = createCard(newBook);
	addCardToShelf(newCard);

	// Reset form fields
	form.reset();

	// Stop required validation error on submit
	e.preventDefault();
});

// Utility functions
function getcardIndex(e) {
	let currentElement = e.target;
	while (!currentElement.classList.contains("card")) {
		currentElement = currentElement.parentElement;
	}
	return currentElement.getAttribute("index");
}

function getBook(index) {}

function showEditForm() {
	// Hide "Add a book" content
	for (let element of addBookThings) {
		element.classList.add("hidden");
	}

	// Show "Edit" content
	editCard.classList.remove("hidden");
}

function showAddBookForm() {
	// Show "Add a book" when click off "Edit" content
	for (let element of addBookThings) {
		element.classList.remove("hidden");
	}
	editCard.classList.add("hidden");
}

// Create example book for display
const exampleBook = new Book(
	"Harry Potter and the Philosopher's Stone",
	"J.K. Rowling",
	223,
	"✅",
	0
);

addBookToLibrary(exampleBook);

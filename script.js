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
	readStatus = emojify(book.read);
	read.textContent = readStatus;

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
let book;

submitBtn.addEventListener("click", (e) => {
	// If form is invalid do nothing
	if (!form.checkValidity()) return;

	// Assign values
	const titleInp = document.querySelector("#title").value;
	const authorInp = document.querySelector("#author").value;
	const pagesInp = document.querySelector("#pages").value;
	let readInp = document.querySelector("#read").checked;
	const index = myLibrary.length;

	// Create and append book & card
	newBook = new Book(titleInp, authorInp, pagesInp, readInp, index);
	addBookToLibrary(newBook);
	newCard = createCard(newBook);
	addCardToShelf(newCard);

	// Reset form fields
	form.reset();

	// Stop "required" validation error on submit
	e.preventDefault();
});

shelfDiv.addEventListener("click", (e) => {
	// When user clicks a card

	// Don't show modal if header is clicked
	console.log(e.target.parentElement);
	if (
		e.target.classList.contains("header") ||
		e.target.parentElement.classList.contains("header1")
	)
		return;

	// Show form and get book
	showEditForm();
	e.stopPropagation();
	book = getBook(e); // Defined in global scope

	// Set content
	editH1.textContent = book.title;
	editRead.checked = book.read === true;
});

// When user clicks off edit form
document.addEventListener("click", showAddBookForm);

editRead.addEventListener("click", (e) => {
	// Update the object with new edited read status
	const readStatus = e.target.checked;
	book.read = readStatus;

	// Update the DOM
	const card = document.querySelector(`[index="${book.index}"]`);
	const cardStatus = card.children[0].children[3];
	cardStatus.textContent = emojify(book.read);
});

editDelete.addEventListener("click", () => {
	// Delete from myLibrary array
	// Replace with empty object, as deleting will mess up index assignment on book instantiation
	myLibrary[book.index] = [];

	// Delete card from DOM
	const card = document.querySelector(`[index="${book.index}"]`);
	card.remove();

	// Unfocus edit modal to prevent issues from editing deleted objects
	showAddBookForm();
});

editCard.addEventListener("click", (e) => {
	e.stopPropagation();
});

// Utility functions
function getBook(e) {
	let currentElement = e.target;
	while (!currentElement.classList.contains("card")) {
		currentElement = currentElement.parentElement;
	}
	const index = currentElement.getAttribute("index");
	return myLibrary[index];
}

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

function emojify(read) {
	return read ? "✅" : "📖";
}

// Create example book for display
const exampleBook = new Book(
	"Harry Potter and the Philosopher's Stone",
	"J.K. Rowling",
	223,
	true,
	0
);

addBookToLibrary(exampleBook);

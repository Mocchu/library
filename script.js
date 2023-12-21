// Cache DOM
const shelfDiv = document.querySelector(".shelf");
const newBookForm = document.querySelector("form");
const newBookDiv = document.querySelector(".form-card");
const newBookElements = document.getElementsByClassName("add");
const editBookDiv = document.querySelector(".edit-card");
const editBookH1 = document.querySelector(".edit-h1");
const readCheckbox = document.querySelector(".edit-read");
const deleteBtn = document.querySelector(".edit-delete");

// Prevents edit card from being hidden when clicking itself
[editBookDiv, newBookDiv].forEach((element) => {
	element.addEventListener("click", (e) => {
		e.stopPropagation();
	});
});

class Book {
	constructor(title, author, pages, read, index) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
		this.index = index;
	}
}

class Library {
	constructor() {
		this.book;
		this.myLibrary = [];

		// Create example book for display
		this.myLibrary.push(
			new Book(
				"Harry Potter and the Philosopher's Stone",
				"J.K. Rowling",
				223,
				true,
				0
			)
		);
	}

	// Functions
	showEditBookCard() {
		// Loop needed to edit h2, which is not nested within a shared div
		for (let element of newBookElements) element.classList.add("hidden");
		editBookDiv.classList.remove("hidden");
	}

	createListItem(content) {
		const li = document.createElement("li");
		li.textContent = content;
		return li;
	}

	getBook(e) {
		// Traverse up the DOM to get a specific card element
		let currentElement = e.target;
		while (!currentElement.classList.contains("card")) {
			currentElement = currentElement.parentElement;
		}
		const index = currentElement.getAttribute("index");
		return this.myLibrary[index];
	}

	showNewBookCard() {
		for (let element of newBookElements) element.classList.remove("hidden");
		editBookDiv.classList.add("hidden");
	}

	emojify(read) {
		return read ? "✅" : "📖";
	}

	createNewBook(e) {
		if (!newBookForm.checkValidity()) return;

		const titleInp = document.querySelector("#title").value;
		const authorInp = document.querySelector("#author").value;
		const pagesInp = document.querySelector("#pages").value;
		const readInp = document.querySelector("#read").checked;
		const index = this.myLibrary.length;

		newBook = Book(titleInp, authorInp, pagesInp, readInp, index);
		this.myLibrary.push(newBook);
		shelfDiv.append(this.createCard(newBook));

		newBookForm.reset();

		// Stop "field required" validation error after submission
		e.preventDefault();
	}

	initEditBookCard(e) {
		// Don't show edit card if header card is clicked
		if (
			e.target.classList.contains("header") ||
			e.target.classList.contains("header1") ||
			e.target.parentElement.classList.contains("header1")
		)
			return;

		this.showEditBookCard();

		this.book = this.getBook(e);
		editBookH1.textContent = this.book.title;
		readCheckbox.checked = this.book.read === true;

		// Prevents clicking the doc & closing the new book card
		e.stopPropagation();
	}

	updateReadStatus(e) {
		const checkboxVal = e.target.checked;
		this.book.read = checkboxVal;

		const card = document.querySelector(`[index="${this.book.index}"]`);
		const cardStatus = card.children[0].children[3];
		cardStatus.textContent = this.emojify(this.book.read);
	}

	deleteBook() {
		// Popping the object will mess up index assignment on book instantiation
		this.myLibrary[this.book.index] = [];

		const card = document.querySelector(`[index="${this.book.index}"]`);
		card.remove();

		this.showNewBookCard();
	}

	createCard(book) {
		const card = document.createElement("div");
		const ul = document.createElement("ul");
		const title = this.createListItem(book.title);
		const author = this.createListItem(book.author);
		const pages = this.createListItem(book.pages);
		const read = this.createListItem(this.emojify(book.read));

		card.append(title);
		for (const li of [title, author, pages, read]) ul.append(li);
		card.append(ul);

		card.classList.add("card");
		card.classList.add("fadeInUp-animation");
		card.setAttribute("index", book.index);

		return card;
	}
}

const library = new Library();

// Bind events
document.addEventListener("click", library.showNewBookCard);
newBookForm.addEventListener("submit", (e) => library.createNewBook(e));
readCheckbox.addEventListener("click", (e) => library.updateReadStatus(e));
deleteBtn.addEventListener("click", (e) => library.deleteBook(e));
shelfDiv.addEventListener("click", (e) => library.initEditBookCard(e)); // When a card is selected

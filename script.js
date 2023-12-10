// Variables
let book

const shelfDiv = document.querySelector(".shelf")
const form = document.querySelector("form")
const formCard = document.querySelector(".form-card")
const addBookThings = document.getElementsByClassName("add")

const newBookBtn = document.querySelector(".new-book")

const editCard = document.querySelector(".edit-card")
const editH1 = document.querySelector(".edit-h1")
const editRead = document.querySelector(".edit-read")
const editDelete = document.querySelector(".edit-delete")

// Objects
const myLibrary = []

function Book(title, author, pages, read, index) {
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
	this.index = index
}

// Frontend
function createCard(book) {
	// Create elements and assign text content
	const card = document.createElement("div")
	const ul = document.createElement("ul")
	const title = createListItem(book.title)
	const author = createListItem(book.author)
	const pages = createListItem(book.pages)
	const read = createListItem(emojify(book.read))

	function createListItem(content) {
		const li = document.createElement("li")
		li.textContent = content
		return li
	}

	// Append list items to card
	card.append(title)
	for (const li of [title, author, pages, read]) ul.append(li)
	card.append(ul)

	// Set classes and attributes
	card.classList.add("card")
	card.classList.add("fadeInUp-animation")
	card.setAttribute("index", book.index)

	return card
}

// Event listeners
form.addEventListener("submit", (e) => {
	if (!form.checkValidity()) return // If form is invalid do nothing

	// Assign variables
	const titleInp = document.querySelector("#title").value
	const authorInp = document.querySelector("#author").value
	const pagesInp = document.querySelector("#pages").value
	const readInp = document.querySelector("#read").checked
	const index = myLibrary.length

	// Create and append book & card
	newBook = new Book(titleInp, authorInp, pagesInp, readInp, index)
	myLibrary.push(newBook)
	shelfDiv.append(createCard(newBook))

	form.reset() // Reset form fields
	e.preventDefault() // Stop "required" validation error on submit
})

shelfDiv.addEventListener("click", (e) => {
	// Triggers when user clicks a card

	// Don't show modal if header is clicked
	if (
		e.target.classList.contains("header") ||
		e.target.parentElement.classList.contains("header1")
	)
		return

	// Show edit form to user and get book
	showEditForm()
	e.stopPropagation() // Prevents clicking the doc & closing the edit form
	book = getBook(e)

	// Set content
	editH1.textContent = book.title
	editRead.checked = book.read === true
})

document.addEventListener("click", showAddBookForm) // Triggers when user clicks off the edit form

editRead.addEventListener("click", (e) => {
	// Update the object with new edited read status
	const readStatus = e.target.checked
	book.read = readStatus

	// Update the read status in the DOM
	const card = document.querySelector(`[index="${book.index}"]`)
	const cardStatus = card.children[0].children[3]
	cardStatus.textContent = emojify(book.read)
})

editDelete.addEventListener("click", () => {
	// Delete from myLibrary array
	myLibrary[book.index] = [] // Deleting object will mess up index assignment on book instantiation

	// Delete card from DOM
	const card = document.querySelector(`[index="${book.index}"]`)
	card.remove()

	showAddBookForm() // Hide edit form and show new book form
})

editCard.addEventListener("click", (e) => {
	e.stopPropagation() // Prevents edit form from being hidden on click
})

formCard.addEventListener("click", (e) => {
	e.stopPropagation()
})

// Utility functions
function getBook(e) {
	// Traverse up the DOM to get a specific card element
	let currentElement = e.target
	while (!currentElement.classList.contains("card")) {
		currentElement = currentElement.parentElement
	}
	const index = currentElement.getAttribute("index")
	return myLibrary[index]
}

function showEditForm() {
	for (let element of addBookThings) element.classList.add("hidden") // Hide new book form
	editCard.classList.remove("hidden") // Show edit form
}

function showAddBookForm() {
	// Opposite of showEditForm()
	for (let element of addBookThings) element.classList.remove("hidden")
	editCard.classList.add("hidden")
}

function emojify(read) {
	return read ? "✅" : "📖"
}

// Create example book for display
const exampleBook = new Book(
	"Harry Potter and the Philosopher's Stone",
	"J.K. Rowling",
	223,
	true,
	0
)

myLibrary.push(exampleBook)

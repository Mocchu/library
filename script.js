let book
const myLibrary = []
const newBookBtn = document.querySelector(".new-book")
const shelfDiv = document.querySelector(".shelf")
const form = document.querySelector("form")
const formCard = document.querySelector(".form-card")
const addBookThings = document.getElementsByClassName("add")
const editCard = document.querySelector(".edit-card")
const editH1 = document.querySelector(".edit-h1")
const editRead = document.querySelector(".edit-read")
const editDelete = document.querySelector(".edit-delete")

function Book(title, author, pages, read, index) {
	return { title, author, pages, read, index }
}

function createCard(book) {
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

	card.append(title)
	for (const li of [title, author, pages, read]) ul.append(li)
	card.append(ul)

	card.classList.add("card")
	card.classList.add("fadeInUp-animation")
	card.setAttribute("index", book.index)

	return card
}

form.addEventListener("submit", (e) => {
	if (!form.checkValidity()) return

	const titleInp = document.querySelector("#title").value
	const authorInp = document.querySelector("#author").value
	const pagesInp = document.querySelector("#pages").value
	const readInp = document.querySelector("#read").checked
	const index = myLibrary.length

	newBook = new Book(titleInp, authorInp, pagesInp, readInp, index)
	myLibrary.push(newBook)
	shelfDiv.append(createCard(newBook))

	form.reset()

	// Stop "field required" validation error after submission
	e.preventDefault()
})

// Trigger when user clicks a card
shelfDiv.addEventListener("click", (e) => {
	// Don't show modal if header card is clicked
	if (
		e.target.classList.contains("header") ||
		e.target.parentElement.classList.contains("header1")
	)
		return

	showEditForm()

	book = getBook(e)
	editH1.textContent = book.title
	editRead.checked = book.read === true

	// Prevents clicking the doc & closing the edit form
	e.stopPropagation()
})

// Triggers when user clicks off the edit form
document.addEventListener("click", showAddBookForm)

editRead.addEventListener("click", (e) => {
	const checkboxVal = e.target.checked
	book.read = checkboxVal

	const card = document.querySelector(`[index="${book.index}"]`)
	const cardStatus = card.children[0].children[3]
	cardStatus.textContent = emojify(book.read)
})

editDelete.addEventListener("click", () => {
	// Popping the object will mess up index assignment on book instantiation
	myLibrary[book.index] = []

	const card = document.querySelector(`[index="${book.index}"]`)
	card.remove()

	showAddBookForm()
})

// Prevents edit form from being hidden when clicking itself
;[editCard, formCard].forEach((element) => {
	element.addEventListener("click", (e) => {
		e.stopPropagation()
	})
})

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
	// Loop needed to edit h2, which is not nested within a shared div
	for (let element of addBookThings) element.classList.add("hidden")
	editCard.classList.remove("hidden")
}

function showAddBookForm() {
	for (let element of addBookThings) element.classList.remove("hidden")
	editCard.classList.add("hidden")
}

function emojify(read) {
	return read ? "✅" : "📖"
}

// Create example book for display
myLibrary.push(
	new Book(
		"Harry Potter and the Philosopher's Stone",
		"J.K. Rowling",
		223,
		true,
		0
	)
)

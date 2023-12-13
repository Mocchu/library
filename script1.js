function Book(title, author, pages, read, index) {
	return { title, author, pages, read, index }
}

const library = (function () {
	let book
	const myLibrary = []

	// Create example book for display
	myLibrary.push(
		Book(
			"Harry Potter and the Philosopher's Stone",
			"J.K. Rowling",
			223,
			true,
			0
		)
	)

	// Cache DOM
	const shelfDiv = document.querySelector(".shelf")
	const newBookForm = document.querySelector("form")
	const newBookDiv = document.querySelector(".form-card")
	const newBookElements = document.getElementsByClassName("add")
	const editBookDiv = document.querySelector(".edit-card")
	const editBookH1 = document.querySelector(".edit-h1")
	const readCheckbox = document.querySelector(".edit-read")
	const deleteBtn = document.querySelector(".edit-delete")

	// Prevent edit card from being hidden when user clicks it
	;[editBookDiv, newBookDiv].forEach((element) => {
		element.addEventListener("click", (event) => {
			event.stopPropagation()
		})
	})

	// Bind events
	document.addEventListener("click", showNewBookCard)
	newBookForm.addEventListener("submit", createBook)
	readCheckbox.addEventListener("click", updateReadStatus)
	deleteBtn.addEventListener("click", deleteBook)
	shelfDiv.addEventListener("click", initEditBookCard) // When a card is selected

	// Functions
	function createBook(title, author, pages, read, event) {
		const titleInp = title || document.querySelector("#title").value
		const authorInp = author || document.querySelector("#author").value
		const pagesInp = pages || document.querySelector("#pages").value
		const readInp = read || document.querySelector("#read").checked
		const index = myLibrary.length

		newBook = Book(titleInp, authorInp, pagesInp, readInp, index)
		myLibrary.push(newBook)
		shelfDiv.append(createCard(newBook))

		newBookForm.reset()

		// Stop "field required" validation error after submission
		if (event) event.preventDefault()
	}

	function initEditBookCard(event) {
		// Don't show edit card if header card is clicked
		if (
			event.target.classList.contains("header") ||
			event.target.classList.contains("header1") ||
			event.target.parentElement.classList.contains("header1")
		)
			return

		showEditBookCard()

		book = getBook(event)
		editBookH1.textContent = book.title
		readCheckbox.checked = book.read === true

		// Prevents clicking the doc & closing the new book card
		event.stopPropagation()
	}

	function updateReadStatus(event) {
		const checkboxVal = event.target.checked
		book.read = checkboxVal

		const card = document.querySelector(`[index="${book.index}"]`)
		const cardStatus = card.children[0].children[3]
		cardStatus.textContent = emojify(book.read)
	}

	function deleteBook() {
		// Popping the object will mess up index assignment on book instantiation
		myLibrary[book.index] = []

		const card = document.querySelector(`[index="${book.index}"]`)
		card.remove()

		showNewBookCard()
	}

	function createCard(book) {
		const card = document.createElement("div")
		const ul = document.createElement("ul")
		const title = createListItem(book.title)
		const author = createListItem(book.author)
		const pages = createListItem(book.pages)
		const read = createListItem(emojify(book.read))

		card.append(title)
		for (const li of [title, author, pages, read]) ul.append(li)
		card.append(ul)

		card.classList.add("card")
		card.classList.add("fadeInUp-animation")
		card.setAttribute("index", book.index)

		return card
	}

	function createListItem(content) {
		const li = document.createElement("li")
		li.textContent = content
		return li
	}

	function getBook(event) {
		// Traverse up the DOM to get a specific card element
		let currentElement = event.target
		while (!currentElement.classList.contains("card")) {
			currentElement = currentElement.parentElement
		}
		const index = currentElement.getAttribute("index")
		return myLibrary[index]
	}

	function showEditBookCard() {
		// Loop needed to edit h2, which is not nested within a shared div
		for (let element of newBookElements) element.classList.add("hidden")
		editBookDiv.classList.remove("hidden")
	}

	function showNewBookCard() {
		for (let element of newBookElements) element.classList.remove("hidden")
		editBookDiv.classList.add("hidden")
	}

	function emojify(read) {
		return read ? "✅" : "📖"
	}

	function getLibrary() {
		return myLibrary
	}

	return { createBook, getLibrary }
})()

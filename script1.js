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

	// Prevents edit card from being hidden when clicking itself
	;[editBookDiv, newBookDiv].forEach((element) => {
		element.addEventListener("click", (e) => {
			e.stopPropagation()
		})
	})

	// Bind events
	document.addEventListener("click", showNewBookCard)
	newBookForm.addEventListener("submit", createNewBook)
	readCheckbox.addEventListener("click", updateReadStatus)
	deleteBtn.addEventListener("click", deleteBook)
	shelfDiv.addEventListener("click", initEditBookCard) // When a card is selected

	// Functions
	function createNewBook(e) {
		if (!newBookForm.checkValidity()) return

		const titleInp = document.querySelector("#title").value
		const authorInp = document.querySelector("#author").value
		const pagesInp = document.querySelector("#pages").value
		const readInp = document.querySelector("#read").checked
		const index = myLibrary.length

		newBook = Book(titleInp, authorInp, pagesInp, readInp, index)
		myLibrary.push(newBook)
		shelfDiv.append(createCard(newBook))

		newBookForm.reset()

		// Stop "field required" validation error after submission
		e.preventDefault()
	}

	function initEditBookCard(e) {
		// Don't show edit card if header card is clicked
		if (
			e.target.classList.contains("header") ||
			e.target.classList.contains("header1") ||
			e.target.parentElement.classList.contains("header1")
		)
			return

		showEditBookCard()

		book = getBook(e)
		editBookH1.textContent = book.title
		readCheckbox.checked = book.read === true

		// Prevents clicking the doc & closing the new book card
		e.stopPropagation()
	}

	function updateReadStatus(e) {
		const checkboxVal = e.target.checked
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

	function getBook(e) {
		// Traverse up the DOM to get a specific card element
		let currentElement = e.target
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

	return {}
})()

function Book(title, author, pages, read, index) {
	return { title, author, pages, read, index }
}

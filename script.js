const library = [];

const collection = (function(){
    const bookDisplay = document.querySelector(".book-container");
    const newBookBtn = document.querySelector("#new-book-btn");

    newBookBtn.addEventListener("click", () => {
        formFunction.formDisplay.hidden === true ? 
            formFunction.formDisplay.hidden = false : 
            formFunction.formDisplay.hidden = true;});

    function displayBooks(){
        while (bookDisplay.firstChild) {
            bookDisplay.firstChild.remove();
        }
        for (let book of library){
            const bookCard = document.createElement("div");
            const bookNameLabel = document.createElement("div");
            const bookName = document.createElement("div");
            const bookAuthorLabel = document.createElement("div");
            const bookAuthor = document.createElement("div");
            const bookPagesLabel = document.createElement("div");
            const bookPages = document.createElement("div");
            const bookRead = document.createElement("button");
            const bookDeleteBtn = document.createElement("button");
            bookDisplay.appendChild(bookCard);
            bookCard.appendChild(bookNameLabel)
            bookCard.appendChild(bookName);
            bookCard.appendChild(bookAuthorLabel);
            bookCard.appendChild(bookAuthor);
            bookCard.appendChild(bookPagesLabel);
            bookCard.appendChild(bookPages);
            bookCard.setAttribute("class", "book-card");
            bookName.setAttribute("class", "book-title");
            bookAuthor.setAttribute("class", "book-author");
            bookPages.setAttribute("class", "book-pages");
            bookNameLabel.setAttribute("class", "book-title-label");
            bookAuthorLabel.setAttribute("class", "book-author-label");
            bookPagesLabel.setAttribute("class", "book-pages-label");
            bookNameLabel.innerHTML = "Title:"
            bookName.innerHTML = `${book.title}`;
            bookAuthorLabel.innerHTML = "Author:"
            bookAuthor.innerHTML = `${book.author}`;
            bookPagesLabel.innerHTML = "Pages:"
            bookPages.innerHTML = `${book.pages}`;
    
            
            bookCard.appendChild(bookRead);
            bookRead.setAttribute("class", "book-read-btn");
            bookRead.setAttribute("indexRef", `${library.indexOf(book)}`)
            if (book.read === true) {
                bookRead.setAttribute("value", "read")
                bookRead.innerHTML = "✔︎ Read"
            } else {
                bookRead.setAttribute("value", "not-read")
                bookRead.innerHTML = "✗ Not Read"
            }
            
            bookCard.appendChild(bookDeleteBtn);
            bookDeleteBtn.setAttribute("class", "delete-btn");
            bookDeleteBtn.setAttribute("id", `delete-btn-${library.indexOf(book)}`);
            bookDeleteBtn.setAttribute("value", `${library.indexOf(book)}`)
            bookDeleteBtn.innerHTML = "✖︎ Delete";
            book.readButton(bookRead);
            book.deleteBook(bookDeleteBtn);
        }
    }
    
    return {displayBooks}
})();

const formFunction = (function(){
    const formDisplay = document.querySelector(".add-book-form");
    const titleInput = document.querySelector(".book-title-input");
    const authorInput = document.querySelector(".book-author-input");
    const pageInput = document.querySelector(".book-pages-input");
    const readInput = document.querySelector(".book-read-input");
    const addBtn = document.querySelector("#add-btn");

    function addBookToLibrary(){
        const newBook = new Books(
            titleInput.value, authorInput.value, pageInput.value, readInput.checked
        );
        library.push(newBook);
        titleInput.value = "";
        authorInput.value = "";
        pageInput.value = "";
        collection.displayBooks();
        formDisplay.hidden = true;
    }
    
    addBtn.addEventListener("click", addBookToLibrary);

    return {formDisplay}
})();

class Books{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = Boolean(read);
    }
    
    readButton(button){
        button.addEventListener("click", () => {
            if (this.read === true){
                this.read = false;
                button.value = "not-read";
                button.innerHTML = "✗ Not Read";
            } else {
                this.read = true;
                button.value = "read";
                button.innerHTML = "✔︎ Read";
            }
        });
    }

    deleteBook(index){
        index.addEventListener("click", () => {
            library.splice(index.value, 1);
            collection.displayBooks();
        });
    }
}
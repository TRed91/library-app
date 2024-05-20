const library = [];

const bookDisplay = document.querySelector(".book-container");
const newBookBtn = document.querySelector("#new-book-btn");

const formDisplay = document.querySelector(".add-book-form");
const titleInput = document.querySelector(".book-title-input");
const authorInput = document.querySelector(".book-author-input");
const pageInput = document.querySelector(".book-pages-input");
const readInput = document.querySelector(".book-read-input");
const addBtn = document.querySelector("#add-btn");

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
}

class Books{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = Boolean(read);
    }
    /* toggleRead(){
        if (this.read === true){
            this.read = false;
        } else {
            this.read = true;
        }
    } */
    readButton(button){
        button.addEventListener("click", () => {
            //this.toggleRead();
            if (this.read === true){
                this.read = false;
                button.value = "not-read";
                button.innerHTML = "✗ Not Read";
            } else {
                this.read = true;
                button.value = "read";
                button.innerHTML = "✔︎ Read";
            }
            /* if (button.value === "read"){
                button.value = "not-read";
                button.innerHTML = "✗ Not Read";
            } else {
                button.value = "read";
                button.innerHTML = "✔︎ Read";
            } */
        });
    }
    deleteBook(index){
        index.addEventListener("click", () => {
            library.splice(index.value, 1);
            displayBooks();
        });
    }
}

function addBookToLibrary(){
    const newBook = new Books(
        titleInput.value, authorInput.value, pageInput.value, readInput.checked
    );
    library.push(newBook);
    titleInput.value = "";
    authorInput.value = "";
    pageInput.value = "";
    displayBooks();
    formDisplay.hidden = true;
}

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
        //readButton(bookRead);
        book.readButton(bookRead);
        book.deleteBook(bookDeleteBtn);
        //deleteButton(bookDeleteBtn);
    }
}

newBookBtn.addEventListener("click", () => {
    formDisplay.hidden === true ? 
        formDisplay.hidden = false : 
        formDisplay.hidden = true;});

addBtn.addEventListener("click", addBookToLibrary);

displayBooks();


function deleteButton(button){
    button.addEventListener("click", () => {
        library.splice(button.value, 1);
        displayBooks();
    });
};

Book.prototype.readToggle = function(){
    if (this.read === true){
        this.read = false;
    } else {
        this.read = true;
    }
};

function readButton(button){
    button.addEventListener("click", () => {
        let indexRef = button.getAttribute("indexRef");
        library[indexRef].readToggle();

        if (button.value === "read"){
            button.value = "not-read";
            button.innerHTML = "✗ Not Read";
        } else {
            button.value = "read";
            button.innerHTML = "✔︎ Read";
        }
    });
};
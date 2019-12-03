// const wmf = document.querySelector("#book-list li:nth-child(2) .name");
// //console.log(wmf);

// var books = document.querySelector("#book-list li .name");
// //console.log(books);

// books = document.querySelectorAll("#book-list li .name");

// Array.from(books).forEach(function(book){
//     console.log(book);
// });

// var books = document.querySelectorAll("#book-list li .name");

// books.forEach(function(book){
//     book.textContent += " (book title)";
// });

// const bookList = document.querySelectorAll("#book-list")
// console.log(bookList.innerHTML);

// const banner = document.querySelector("#page-banner");
// console.log("page-banner node type is:", banner.nodeType);
// console.log("page-banner node type is:", banner.nodeName);
// console.log("page-banner node type is:", banner.hasChildNodes());

// const clonedBanner = banner.cloneNode(true);
// console.log(clonedBanner);
// const banner = document.querySelector("#page-banner");
// console.log(banner.nodeType);

// const bookList = document.querySelector('#book-list');
// console.log(bookList.parentNode);
// console.log(bookList.parentElement.parentElement);
// console.log(bookList.children);

// console.log(bookList.nextElementSibling);
// console.log(bookList.previousElementSibling);

// bookList.previousElementSibling.querySelector("p").innerHTML += "<br/> Too Cool for School";

// var h2 = document.querySelector("#book-list");
// h2.addEventListener("click", function(e){
//     console.log(e.target);
//     console.log(e);

// })

// var btns = document.querySelectorAll("#book-list .delete");

// btns.forEach(function(btn){
//     btn.addEventListener("click", function(e) {
//         const li = e.target.parentElement;
//         li.parentNode.removeChild(li);
//     });
// })

// const linkx = document.querySelector("#page-banner a");

// linkx.addEventListener("click", function(e){
//     e.preventDefault();
//     console.log(e.target.textContent);
// })


//delete book
const list = document.querySelector("#book-list ul");

list.addEventListener("click", function(e){
    if (e.target.className == "delete") {
        const li = e.target.parentElement;
        list.removeChild(li);
    }
})


//add book
const addForm = document.forms["add-books"];

addForm.addEventListener("submit", function(e){
    e.preventDefault();
    const valuex = addForm.querySelector('input[type="text"]').value;

    //create elements
    const li = document.createElement("li");
    const bookName = document.createElement("span");
    const deletBtn = document.createElement("button");

    //add content
    deletBtn.textContent = " delete";
    bookName.textContent = valuex;

    //append to document
    li.appendChild(bookName);
    li.appendChild(deletBtn);

    list.appendChild(li);

    //add class
    bookName.classList.add('name');
    deletBtn.classList.add('delete');






    
})

//hide box
const hidebox = document.querySelector("#hide");
hidebox.addEventListener("change", function(e){
    if (hidebox.checked) {
        list.style.display = "none";
        
    } else {
        list.style.display = "block";
    }
})

//search title
const searchbar = document.forms["search-books"].querySelector("input");

searchbar.addEventListener("keyup", function(e) {
    const term = e.target.value.toLowerCase();
    const books = list.getElementsByTagName('li');

    Array.from(books).forEach(function(book) {

        const title = book.firstElementChild.textContent;

        if (title.toLowerCase().indexOf(term) != -1) {
            book.style.display = "block";
        }
        else {
            book.style.display = "none";
        }
    });
});
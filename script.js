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





// <!-- <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">

//     <title>JavaScript DOM Tutorials</title>
//     <link rel="stylesheet" href="main.css">
// </head>
// <body>
//     <div id="wrapper">
//         <header>
//             <div id="page-banner">
//                 <h1 class="title">MovieOrama</h1>
//                 <a href="#">Net Ninja is good</a>
//                 <p>Books For Ninja</p>
//                 <form id="search-books">
//                     <input type="text" placeholder="Search Books"/>
//                 </form>
//             </div>
//         </header>
//         <div id="book-list">
            
//             <h2 class="title">Books To Read</h2>
            
//             <ul>
//                 <li>
//                     <span class="name">Doctor Strange</span>
//                     <button class="delete">delete</button>
//                 </li>
//                 <li>
//                     <span class="name">The Wise Man's Fear</span>
//                     <button class="delete">delete</button>
//                 </li>
//                 <li>
//                     <span class="name">Rich Dad, Poor Dad</span>
//                     <button class="delete">delete</button>
//                 </li>
//                 <li>
//                     <span class="name">Avengers: The Final Battle</span>
//                     <button class="delete">delete</button>
//                 </li>                
//             </ul>
//         </div>
//         <form id="add-books">
//             <input type="checkbox" id="hide"/>
//             <label for="hide">Hide All Books</label><br/>
//             <input type="text" placeholder="Add a Book..."/>
//             <button>Add</button>

//         </form>


//     </div>
//     <script src="script.js"></script>
// </body>
// </html> --></meta>
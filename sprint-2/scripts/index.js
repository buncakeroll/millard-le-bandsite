/* ********************************************
TABLE OF CONTENTS
1. Dates variables
2. Comments Arrays
3. Variables for getElement
4. Functions to add class names
5. Functions to clear
6. Event Listener for form on submit
7. For loop to add comments until array.length
8. Adding elements to comments section
******************************************** */

/* ********************************************************** 
1. Date - Uses date keywords to get dynamic date from user
then puts inside 'today' variable to print the full date
Month/Day/Year.
https://tecadmin.net/get-current-date-time-javascript/
********************************************************** */
let newDate = new Date();
let today = `${newDate.getMonth()}/${newDate.getDate()}/${newDate.getFullYear()}`;

/* ********************************************************** 
2. Array for the user comments - including their
name, date of post, their avatar, and their comment
********************************************************** */
const comments = [{
    name: "Ciara Scarlet",
    date: "12/25/2019",
    avatar: "../assets/Images/user.jpg",
    comment: "They were so good and would definitely see them again. <3"
  },
  {
    name: "Kate Bouchard",
    date: "08/01/2019",
    avatar: "./assets/Images/user-kb.jpg",
    comment: "WOW!! So amazing! They are all so talented and sound super good. Love you Uncle Wang!"
  },
  {
    name: "Millard Le",
    date: "02/11/2019",
    avatar: "./assets/Images/user-ml.jpg",
    comment: "They're alright I guess."
  }
];

/* ********************************************************** 
3. Set const variables to get the element by their ID.
comments__section = empty div to display user comments
form-section = form on html that requests user for name 
                and avatar
avatar = gets user avatar from assets folder - the default
        avatar that all users will get 
********************************************************** */
const form = document.getElementById("form-section");
const section = document.getElementById("comments__section");
const avatar = "./assets/Images/user-new.jpg";

/* ********************************************************** 
4. Created a function and asked for parameters.
Added a class to each parameter
div, header, content, image, name,
Resource 
https://stackoverflow.com/questions/507138/how-do-i-add-a-class-to-a-given-element
********************************************************** */
function addContent(name, date, comment, image, header, div, content) {
  div.classList.add("commentsSection");
  header.classList.add("commentsSection__header");
  content.classList.add("commentsSection__content");
  image.classList.add("commentsSection__avatar");
  name.classList.add("commentsSection__name");
  date.classList.add("commentsSection__date");
  comment.classList.add("commentsSection__comment");
}

/* ********************************************************** 
5. Function that takes in a parameter to clear the elements
Takes all elements with the class name and will loop the
array at the end and will remove each child with the class
name in that section. 
Using this function in eventListener
w3schools.com/jsref/met_code_removechild.asp
********************************************************** */
function clear(section) {
  let div = section.getElementsByClassName("commentsSection");
  console.log(div);
  for (let i = div.length; i > 0; i--) {
    section.removeChild(div[i - 1]);
  }
};

/* ********************************************************** 
6. Event listner for the form and on submit it will submit
the user information including their name and comment from
the form
- A new empty object to put our new objects inside including
name, avatar, date, and the comment.
- Then unshift the object to add the newest comment to index
0, so the newest comment will be at the top of the comments
list
- prevent default to prevent refresh on page
- add keys to empty object
name from the form
avatar from variable with path to image
date from the dynamic date
comment from the form
********************************************************** */
form.addEventListener("submit", submitEvent => {
  submitEvent.preventDefault();
  let comment = {};
  comment.name = submitEvent.target.name.value;
  comment.avatar = avatar;
  comment.date = today;
  comment.comment = submitEvent.target.comment.value;
  comments.unshift(comment);
  clear(section);
  sections(comments);
  submitEvent.target.reset();
});

/* ********************************************************** 
7. A for loop to to add the comments from the array. Starting
at index 0 and until the last index of the array
********************************************************** */
let sections = (data) => {
  for (let i = 0; i < data.length; i++) {
    addCommentInfo(section, comments[i]);
  }
}

/* ********************************************************** 
8. Function to add comments by making elements to the document
and uses innerText to add data to that element.
********************************************************** */
function addCommentInfo(section, data) {
  const div = document.createElement("div");
  const header = document.createElement("div");
  const info = document.createElement("div");
  const name = document.createElement("h3");
  const image = document.createElement("img");
  const date = document.createElement("h3");
  const comment = document.createElement("p");
  header.appendChild(name);
  div.appendChild(image);
  header.appendChild(date);
  info.appendChild(header);
  info.appendChild(comment);
  div.appendChild(info);
  name.innerText = data.name;
  date.innerText = data.date;
  comment.innerText = data.comment;
  image.src = data.avatar;
  section.appendChild(div);
  addContent(name, date, comment, image, header, div, info);
}

sections(comments);
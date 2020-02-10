/* ********************************************
TABLE OF CONTENTS
1. API Information and Axios
2. Dynamic Dates
3. Variables for getElement
4. Functions to add class names
5. Functions to clear comment
6. Function to add comment
7. Function to add likes to comments
8.  Function to delete comments
9. Form event listener
10. Adding elements to comments section
11. Function to refresh comments
******************************************** */

/* ********************************************************** 
1. API information and axios
********************************************************** */
const api_full = `${api_url}comments${api_key}`;
const api_full_axios = axios.get(api_full);

api_full_axios.then(result => {
  sections(result.data);
});

/* ********************************************************** 
2. Date - Uses date keywords to get dynamic date from user
then displays when it was posted i.e 1 seconds ago, 1 minute 
ago, 1 hour ago, 1 day ago, etc
********************************************************** */
timeConvert = data => {
  let seconds = Math.floor((new Date() - data) / 1000);
  let timeStamp = Math.floor(seconds / 31536000);

  if (timeStamp >= 1) {
    return timeStamp + " years";
  }
  timeStamp = Math.floor(seconds / 2592000);
  if (timeStamp >= 1) {
    return timeStamp + " months";
  }

  timeStamp = Math.floor(seconds / 86400);
  if (timeStamp >= 1) {
    return timeStamp + " days ago";
  }
  timeStamp = Math.floor(seconds / 3600);
  if (timeStamp >= 1) {
    return timeStamp + " hours ago";
  }
  timeStamp = Math.floor(seconds / 60);
  if (timeStamp >= 1) {
    return timeStamp + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};

let aDay = 24 * 60 * 60 * 1000;

/* ********************************************************** 
3. Set const variables to get the element by their ID.
comments__section = empty div to display user comments
form-section = form on html that requests user for name 
                and avatar
avatar = gets user avatar from assets folder - the default
        avatar that all users will get 
delBtn = Delete button for deleting comment
********************************************************** */
const form = document.getElementById("form-section");
const section = document.getElementById("comments__section");
let delBtn = document.getElementsByClassName("delBtn");
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
let clear = (section) => {
  let div = section.getElementsByClassName("commentsSection");
  for (let i = div.length; i > 0; i--) {
    section.removeChild(div[i - 1]);
  }
}

/* ********************************************************** 
6. A for loop to to add the comments from the array. Starting
at index 0 and until the last index of the array
********************************************************** */
let sections = data => {
  for (let i = 0; i < data.length; i++) {
    addCommentInfo(section, data[i]);
  }
};

/* ********************************************************** 
7. Function to add likes to api by using event listener on 
click and posting it to the api. Converting it to a string 
for it to display the like counter
********************************************************** */
let addLike = (data) => {
  let commentBox = document.getElementById(data.id);
  let likeBtn = commentBox.querySelector(".comment-box__like-btn");
  likeBtn.addEventListener("click", event => {
    axios
      .put(`${api_url}comments/${commentBox.id}/like${api_key}`)
      .then(response => {
        updateLikes(response.data);
      });
  });
}

let updateLikes = (data) => {
  let commentBox = document.getElementById(data.id);
  let toString = commentBox.querySelector(".comments__like-number");
  toString.innerText = data.likes;
}

/* ********************************************************** 
8. Function to delete comments from the api
********************************************************** */
let deleteItems = (data) => {
  let commentBox = document.getElementById(data.id);
  let button = commentBox.querySelector(".delBtn");
  button.addEventListener("click", event => {
    axios
      .delete(`${api_url}comments/${commentBox.id}${api_key}`)
      .then(response => {
        commentBox.remove();
      });
  });
}
/* ********************************************************** 
9. Event listner for the form and on submit it will submit
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
  axios
    .post(api_full, {
      name: submitEvent.target.name.value,
      comment: submitEvent.target.comment.value
    })
    .then(response => {
      refresh();
      submitEvent.target.reset();
    });

  submitEvent.preventDefault();
});

/* ********************************************************** 
10. Function to add comments by making elements to the document
and uses innerText to add data to that element.
********************************************************** */
function addCommentInfo(section, data) {
  const div = document.createElement("div");
  const header = document.createElement("div");
  const info = document.createElement("div");
  const itemFunc = document.createElement("div");
  const garbage = document.createElement("i");
  garbage.classList.add("fas", "fa-trash", "delBtn");
  const likesObj = document.createElement("h3");
  likesObj.classList.add("comments__like-number");
  const likesBtn = document.createElement("i");
  likesBtn.classList.add("fas", "fa-heart", "comment-box__like-btn");
  const name = document.createElement("h3");
  const image = document.createElement("img");
  const date = document.createElement("h3");
  const comment = document.createElement("p");
  header.appendChild(name);
  div.appendChild(image);
  header.appendChild(date);
  info.appendChild(header);
  info.appendChild(comment);
  itemFunc.appendChild(likesObj);
  itemFunc.appendChild(likesBtn);
  itemFunc.appendChild(garbage);
  info.appendChild(itemFunc);
  div.appendChild(info);
  name.innerText = data.name;
  likesObj.innerText = `${data.likes}`;
  date.innerText = timeConvert(data.timestamp);
  comment.innerText = data.comment;
  image.src = avatar;
  section.appendChild(div);
  addContent(name, date, comment, image, header, div, info);

  div.id = data.id;

  section.insertBefore(div, section.childNodes[0]);
  deleteItems(data);
  addLike(data);
}

/* ********************************************************** 
11. Function to refresh the comments
********************************************************** */
let refresh = () => {
  axios.get(api_full).then(result => {
    clear(section);
    sections(result.data);
  });
}
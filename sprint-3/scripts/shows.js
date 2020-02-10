/* ********************************************
TABLE OF CONTENTS
1. Array for event times
2. Function for creating mobile table
3. Functions for creating tablet/desktop table
    a) create table headers
    b) create table elements
4. media query breakpoints
5. Resets if > 767px generate tablet/desktop table
******************************************** */

/* ********************************************************** 
1. Array - Show times with date, venue, and location of event 
********************************************************** */
const showTimes = [
  {
    Dates: "Mon Dec 17 2018",
    Venue: "Ronald Lane",
    Location: "San Fancisco, CA"
  },
  {
    Dates: "Tue Jul 18 2019",
    Venue: "Pier 3 East",
    Location: "San Fancisco, CA"
  },
  {
    Dates: "Fri Jul 22 2019",
    Venue: "View Loungue",
    Location: "San Fancisco, CA"
  },
  {
    Dates: "Sat Aug 12 2019",
    Venue: "Hyatt Agency",
    Location: "San Fancisco, CA"
  },
  {
    Dates: "Fri Sep 05 2019",
    Venue: "Moscow Center",
    Location: "San Fancisco, CA"
  },
  {
    Dates: "Wed Aug 11 2019",
    Venue: "Pres Club",
    Location: "San Fancisco, CA"
  }
];

/* ********************************************************** 
2. Function - Generating table by taking 2 parameters for table
and shows schedule. Creating table rows and creating text node
for array of shows for mobile devices
********************************************************** */
let generateTableMobile = (time, table) => {
  table.classList.add("show__table");
  let row = table.insertRow();
  let showsSchedule = Object.keys(time[0]);
  row.classList.add("show__table-mobile");
  for (show of time) {
    let cell = row.insertCell();
    cell.classList.add("show__table-show");
    for (tableHeaderName = 0; tableHeaderName < 3; tableHeaderName++) {
      let header = document.createElement("div");
      let text = document.createTextNode(showsSchedule[tableHeaderName]);
      header.appendChild(text);
      cell.appendChild(header);
      header.classList.add("show__table-header");
      let content = document.createElement("div");
      text = document.createTextNode(Object.values(show)[tableHeaderName]);
      content.appendChild(text);
      cell.appendChild(content);
      content.classList.add("show__info");
    }
    let btn = document.createElement("button");
    btn.classList.add("show__btn");
    btn.textContent = "buy tickets";
    cell.appendChild(btn);
  }
};

/* ********************************************************** 
3. a) Function - Generating table header by taking 2 parameters for 
table and shows schedule. Creating table headers for schedule
(date, venue, location) from showTimes

3. b) Function - Generating table by taking 2 parameters for table
and shows schedule. Creating table rows and creating text node
for array of shows from showTimes
********************************************************** */
let generateTableHeader = (time, table) => {
  let tHead = table.createTHead();
  let showsSchedule = Object.keys(time[0]);
  tHead.classList.add("show__table--header");
  let row = tHead.insertRow();
  for (let key of showsSchedule) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
};

let generateTable = (time, table) => {
  table.classList.add("show__table");
  for (let show of time) {
    let row = table.insertRow();
    for (let key in show) {
      let cell = row.insertCell();
      let text = document.createTextNode(show[key]);
      cell.appendChild(text);
      cell.classList.add("show__info");
    }
    let cell = row.insertCell();
    cell.classList.add("show__info");
    let btn = document.createElement("button");
    btn.textContent = "buy tickets";
    btn.classList.add("show__btn");
    cell.appendChild(btn);
  }
};

/* ********************************************************** 
4. if statement for when min-width 768px generate table for 
tablet/desktop view and if it's < 768px generate mobile
table instead
********************************************************** */
let tableBreakPoint = window.matchMedia("(max-width: 767px)");
let table = document.querySelector("table");

if (tableBreakPoint.matches) {
  generateTableMobile(showTimes, table);
} else {
  generateTable(showTimes, table);
  generateTableHeader(showTimes, table);
}

/* ********************************************************** 
5. Function - reset table depending on media query break points
If min-width = 768px it will reset and generate the bigger
table for shows list
********************************************************** */
let deleteObj = element => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

let reset = () => {
  deleteObj(table);

  if (tableBreakPoint.matches) {
    generateTableMobile(showTimes, table);
  } else {
    generateTable(showTimes, table);
    generateTableHeader(showTimes, table);
  }
};

// Resets window on window resize
window.onresize = reset;

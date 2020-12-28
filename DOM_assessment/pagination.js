//body
let div = createElement('div');
setAttribute(div, 'class', 'container');
append(div);

let table = createElement('table');
setAttribute(table, 'class', 'table');
appendChild(div, table);

let thead = createElement('thead');
appendChild(table, thead);

let tr = createElement('tr');
appendChild(thead, tr);

let th1 = createElement('th');
setAttribute(th1, 'scope', 'col');
th1.innerText = 'S.No';
appendChild(tr, th1);

let th2 = createElement('th');
setAttribute(th2, 'scope', 'col');
th2.innerText = 'Name';
appendChild(tr, th2);

let th3 = createElement('th');
setAttribute(th3, 'scope', 'col');
th3.innerText = 'Email';
appendChild(tr, th3);

let tbody = createElement('tbody');
appendChild(table, tbody);

function createElement(element) {
  return document.createElement(element);
}

function append(element) {
  return document.body.append(element);
}

function appendChild(element, child) {
  return element.appendChild(child);
}

function setAttribute(element, attribute, value) {
  element.setAttribute(attribute, value);
}

function page() {
let paginationDiv = createElement('div');
setAttribute(paginationDiv, 'class', 'd-flex justify-content-center');
appendChild(div, paginationDiv);

let navBar = createElement('nav');
setAttribute(navBar, 'aria-label', '...');
appendChild(paginationDiv, navBar);

let ul = createElement('ul');
setAttribute(ul, 'class', 'pagination');
appendChild(navBar, ul);

  //previous button 
  let prevButton = createElement('li');
  setAttribute(prevButton, 'class', 'page-item');
  setAttribute(prevButton, 'id', 'prev');
  appendChild(ul, prevButton);

  let prevHyperLink = createElement('a');
  setAttribute(prevHyperLink, 'class', 'page-link');
  console.log(`startpage: ${startpage}`);
  setAttribute(prevHyperLink, 'onclick', `prevPage()`);

  prevHyperLink.innerText = 'Previous';
  appendChild(prevButton, prevHyperLink);
  appendChild(ul, prevButton);
  //button
  for (let i = 0; i < totalPages; i++) {
    let pageNumBtn = createElement('li');
    setAttribute(pageNumBtn, 'class', 'page-item');
    appendChild(ul, pageNumBtn);

    let pageNumLink = createElement('a');
    setAttribute(pageNumLink, 'class', 'page-link');
    setAttribute(pageNumLink, 'onclick', `displayPage(${i})`);
    pageNumLink.innerText = i + 1;
    appendChild(pageNumBtn, pageNumLink);
    appendChild(ul, pageNumBtn);
  }

  //Next button
  let nextButton = createElement('li');
  setAttribute(nextButton, 'class', 'page-item');
  setAttribute(nextButton, 'id', 'next');
  appendChild(ul, nextButton);

  let nextPagelink = createElement('a');
  setAttribute(nextPagelink, 'class', 'page-link');
  setAttribute(nextPagelink, 'onclick', `nextPage()`);
  nextPagelink.innerText = 'Next';
  appendChild(nextButton, nextPagelink);
  appendChild(ul, nextButton);
}
//functions of pagination
let request = new XMLHttpRequest();request.open('GET', 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json', true);
request.send();
let data;
let tableData;
let pageNumber = 1;
let startpage = 0;
let end = 5;
let totalPages = 0;

request.onload = function () {
data = JSON.parse(this.response);
totalPages = data.length / 5;
loadTableData();
page();
};

function loadTableData() {
tableData = data.slice(startpage, end);
console.log(tableData);
tbody.innerHTML = '';
for (let i = 0; i < tableData.length; i++) {
  let dataTr = createElement('tr');
  let dataTd1 = createElement('td');
  dataTd1.innerText = tableData[i].id;
  let dataTd2 = createElement('td');
  dataTd2.innerText = tableData[i].name;
  let dataTd3 = createElement('td');
  dataTd3.innerText = tableData[i].email;

  appendChild(dataTr, dataTd1);
  appendChild(dataTr, dataTd2);
  appendChild(dataTr, dataTd3);
  appendChild(tbody, dataTr);
}
}

function displayPage(i) {
pageNumber = i;
startpage = pageNumber * 5;
end = pageNumber * 5 + 5;
console.log(i);
loadTableData();
}

function prevPage() {
startpage = startpage - 5;
end = end - 5;
console.log(startpage, end);
loadTableData();

}

function nextPage() {
startpage = startpage + 5;
end = end + 5;
console.log(startpage, end);
loadTableData();

}
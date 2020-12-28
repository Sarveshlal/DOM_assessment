var table = document.createElement('table')
table.classList.add('table','table-dark')
var r1 = document.createElement('tr')
r1.classList.add('thead-light')
var d1 = document.createElement('td')
d1.innerHTML = 'ID';
var d2 = document.createElement('td')
d2.innerHTML = 'NAME';
var d3 = document.createElement('td')
d3.innerHTML = 'E-MAIL ID';
r1.append(d1,d2,d3)
var tbody = document.createElement('tbody')
tbody.setAttribute('id','datas')
table.append(r1,tbody)
document.body.append(table)
var div1 = document.createElement('div')
var div2 = document.createElement('div')
div2.setAttribute('id','pageWrap')
div1.append(div2)
document.body.append(div1)
var request = new XMLHttpRequest();
request.open('GET','https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json',true);
request.send();
request.onload = function() {
  var data = JSON.parse(this.response);
  var state = {
    'Set': data,
    'page': 1,
    'rows': 5,
    'window': 5,
  }
  tabledata(data)
  function pagination(Set, page, rows) {
    var start = (page - 1) * rows
    var end = start + rows
    var trimmeddata = Set.slice(start, end)
    var pages = Math.round(Set.length / rows);
    return {
      'Set': trimmeddata,
      'pages': pages,
    }
  }
  function pageButtons(pages) {
    var paging = document.getElementById('pageWrap')
    var maxLeft = (state.page - Math.floor(state.window / 2))
    var maxRight = (state.page + Math.floor(state.window / 2))
    if (maxLeft < 1) {
      maxLeft = 1
      maxRight = state.window
    }
    if (maxRight > pages) {
      maxLeft = pages - (state.window - 1)
      if (maxLeft < 1) {
        maxLeft = 1
      }
      maxRight = pages
    }
    for (var page = maxLeft; page <= maxRight; page++) {
      paging.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`
    }
    if (state.page != 1) {
      paging.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + paging.innerHTML
    }
    if (state.page != pages) {
      paging.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
    }
    document.getElementById('page').onclick = 
  }
  function tabledata(array){
    var tablerows = document.getElementById('datas')   
    var data = pagination(state.Set, state.page, state.rows)
    var myList = data.Set
    for(var i in myList)
    {
      var row = `<tr><td>${myList[i].id}</td>
                <td>${myList[i].name}</td>
                <td>${myList[i].email}</td></tr>`
      tablerows.innerHTML+=row
    }   
    pageButtons(data.Set)
  }
}
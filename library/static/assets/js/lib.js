var current_page = 0

function add_book(id, name, titile, year, link) {
    let dBooksList = document.getElementsByClassName("booksList")[0];
    dBooksList.innerHTML += `
        <div class="bookLine">
            <a href="${link}" class="btn"><i class="fa fa-download"></i></a>
            <span>${name} — ${titile} (${year})</span>
            <button onclick="edit_book('${id}')" class="btn"><i class="fa fa-bars"></i></button>
        </div>
    `;
}

function edit_book(id) {
    
}

function add_ten_books() {
    let dBooksList = document.getElementsByClassName("booksList")[0];
    dBooksList.innerHTML = "";
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: "/api/get_books",
        data: JSON.stringify({
            "offset":current_page
        }),
        success: function (response) {
            response.forEach(jBook => {
                add_book(jBook['_id']['$oid'], jBook['author'], jBook['title'], jBook['year'], jBook['url'])
            });
        }
    });
}
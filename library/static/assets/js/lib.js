var current_page = 0;
var current_book = null;
var able_to_next_page = true;

function add_book(id, name, titile, year, link) {
    let dBooksList = document.getElementsByClassName("booksList")[0];
    dBooksList.innerHTML += `
        <div class="bookLine">
            <a href="${link}" class="btn"><i class="fa fa-download"></i></a>
            <span>${name} — ${titile} (${year})</span>
            <button onclick="show_edit_modal('${id}')" class="btn"><i class="fa fa-edit"></i></button>
        </div>
    `;
}

function edit_book() {
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: "/api/edit_book",
        data: JSON.stringify({
            "id":current_book,
            "title":$("#bookName").val(),
            "url":$("#bookLink").val(),
            "author":$("#bookAuthor").val(),
            "year":$("#bookYear").val()
        }),
        success: function (response) {
            $(".window").toggle();
            add_ten_books()
        }
    });
}

function delete_book() {
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: "/api/del_book",
        data: JSON.stringify({
            "id":current_book
        }),
        success: function (response) {
            $(".window").toggle();
            add_ten_books()
        }
    });
}

function show_edit_modal(id) {
    current_book = id
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: "/api/get_book",
        data: JSON.stringify({
            "id":id
        }),
        success: function (response) {
            $(".window").toggle();
            $("#bookName").val(response['title']);
            $("#bookLink").val(response['url']);
            $("#bookAuthor").val(response['author']);
            $("#bookYear").val(response['year']);
        }
    });
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
            console.log(response.length)
            if (response.length < 20) {
                able_to_next_page = false;
            }
            response.forEach(jBook => {
                add_book(jBook['_id']['$oid'], jBook['author'], jBook['title'], jBook['year'], jBook['url'])
            });
        }
    });
}

function change_page(mod) {
    if (mod < 0) {
        able_to_next_page = true;
    }
    if (current_page+mod >= 0 && able_to_next_page) {
        current_page += mod;
        add_ten_books();
        $("#label_page").html(current_page+1)
    }
}

function change_page_to_last() {
    able_to_next_page = false;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/api/get_books_amount",
        success: function (response) {
            current_page = Math.floor(response/20)
            add_ten_books();
            $("#label_page").html(current_page+1)
        }
    });
}

add_ten_books();
$("#label_page").html(current_page+1)
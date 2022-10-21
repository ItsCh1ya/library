function add_book(id, name, titile, year, link) {
    let dBooksList = document.getElementsByClassName("booksList")[0];
    dBooksList.innerHTML += ```
        <div class="bookLine" data-id="${id}">
            <a href="${link}" class="btn"><i class="fa fa-download"></i></a>
            <span>${name} — ${titile} (${year})</span>
            <button class="btn"><i class="fa fa-bars"></i></button>
        </div>
    ```;
}
const tableData = document.querySelector('table thead');
const loader = document.querySelector('.loader');

let allData = [];

async function getData(){
    return await fetch('/api/get_all_books').then(data => data.json()).then(data => {
        allData = data || [];
    });
}

function fillTable(){
    let result = allData.map(el => `<tr>
        <th>${el.title}</th>
        <th>${el.author}</th>
        <th>${el.year}</th>
        <th>${el.link}</th>
    </tr>`);

    tableData.innerHTML = result.join('');
}

async function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function endLoader(){
    loader.classList.add('loader-end');
    await (() => new Promise(resolve => setTimeout(() => {
        loader.style.display = 'none';
        resolve();
    }, 750)))();
}

async function init(){
    await getData();
    fillTable();
    await sleep(1000);
    await endLoader();
}

init();

$(document).ready(function () {
    $('table').DataTable();
});
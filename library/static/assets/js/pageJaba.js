let someHead;
let someText;

function showText(someHead, someText) {
    document.getElementById('editH2').innerHTML = `${someHead}`;
    document.getElementById('editP').innerHTML = `${someText}`;
}

buttOpen.onclick = function () {
    showText(
        `Индивидуальная библиотека`,
        `По вашему изысканному вкусу`
    );
};

buttCreate.onclick = function () {
    showText(
        `Новинки?!`,
        `Скорее, добавьте вашу книгу в архив!`
    );
};

buttEdit.onclick = function () {
    showText(
        `Редактируйте`,
        `??`
    );
};

buttContact.onclick = function () {
    showText(
        `Наши контакты`,
        `???`
    );
};
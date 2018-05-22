var local = localStorage;

function setLocal(key, value) {
    local.setItem(value);
}

function getLocal(key) {
    return local.getItem(key);
}


// displays the scores stored in local storage
$(document).ready(function () {
    for (var i = 0; i < 3; i += 1) {
        if (getLocal(i) == '99999999,999') document.getElementById(i).innerText = 'NONE';

        else {
            var time = getLocal(i).split(",");
            var sec = time[0];
            var milli = time[1];
            document.getElementById(i).innerText = sec + "." + milli;
        }
    }
});
function play() {
    window.location.href = "game_panel.html"
}
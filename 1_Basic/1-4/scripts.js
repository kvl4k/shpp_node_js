function hideAndShowElement(keyWord) {
    const elements = document.getElementsByClassName(keyWord);
    showHideElements(elements);
}

function hideAndShowBySelector(selector) {
    const elements = document.querySelectorAll(selector);
    showHideElements(elements);
}

function showHideElements(elements) {
    if (elements[0].style.display === 'none') {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'block';
        }
    } else {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
    }
}

function helloAndHide() {
    let click = true;
    document.getElementById("six").onclick = () => {
        if (click) {
            click = !click;
            alert("Hello!");
        } else {
            click = !click;
            document.getElementById("six").style.display = 'none';
        }
    }
}

function showHideElement(id) {
    let elementDisplay = document.getElementById(id).style.display;
    if (elementDisplay === 'block') {
        elementDisplay = 'none';
    } else {
        elementDisplay = 'block';
    }
    document.getElementById(id).style.display = elementDisplay
}

function showPictures(source) {
    let refs = source.split('\n');
    for (const ref of refs) {
        let image = document.createElement('img');
        image.src = ref;
        document.querySelector('.common').appendChild(image);
    }
}

function showCoordinates(id) {
    let elem = document.getElementById(id);

    document.addEventListener('mousemove', function (event) {
        elem.innerHTML = event.clientX + ' : ' + event.clientY + '\n' + navigator.language;
    });
}

function localStorageArea() {
    document.getElementById("firstBlock").innerText = localStorage["value"];
}

addEventListener("load", localStorageArea);

function localEdited() {
    localStorage["value"] = document.getElementById("firstBlock").innerText;
}

function cookiesArea() {
    document.getElementById("secondBlock").innerText = document.cookie;
}

addEventListener("load", cookiesArea);

function cookiesEdited() {
    document.cookie = document.getElementById("secondBlock").innerText;
}

function sessionArea() {
    document.getElementById("thirdBlock").innerText = sessionStorage.getItem("1");
}

addEventListener("load", sessionArea);

function sessionEdited() {
    sessionStorage.setItem("1", document.getElementById("thirdBlock").innerText);
}


//TODO----------------------------------------------------------------
addEventListener("scroll", scrollFunction);

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

function scrollToTop() {
    window.scrollTo(0, 0);
}


addEventListener('click', e => {
        if (e.target === document.getElementById("inner")) {
            alert("i");
        } else if (e.target === document.getElementById("outer")) {
            alert("o");
        }
    }
)

function showBanner() {
    document.getElementById("banner").style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideBanner() {
    document.getElementById("banner").style.display = 'none';
    document.body.style.overflow = "visible";
}







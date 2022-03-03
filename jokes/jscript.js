const buttonSelector = document.getElementById('button');
const buttonCtaSelector = document.getElementById('cta');
const loaderSelector = document.getElementById('loader');
const jokeSelector = document.getElementById('joke');
const errorContainerSelector = document.getElementById('error-container');
const errorSelector = document.getElementById('error-message');

const API_ENDPOINT = 'https://icanhazdadjoke.com/';
const XHR = new XMLHttpRequest();
function showJoke(joke) {
    setLoaderState(false);
    setButtonState(false);
    document.getElementById('joke').innerHTML = joke;
}
function showError(error) {
    setLoaderState(false);
    setButtonState(false)
    document.getElementById('error-message').innerHTML = error;
    document.getElementById('error-container').style.display = 'block';
}

function setLoaderState(isVisible) {
    const displayState = isVisible ? 'block' : 'none';
    document.getElementById('loader').style.display = displayState;
}

function setButtonState(isDisabled) {
    if(isDisabled){
        buttonSelector.setAttribute('disabled', 'disabled');        
    } else{
    buttonSelector.removeAttribute('disabled');
    }
    const buttonCtaState = isDisabled ? 'none' : 'block';
    document.getElementById('cta').style.display = buttonCtaState;
}

function setButtonCta(isError) {
    const buttonCta = isError ? 'Try Again' : 'Hehe, One more!';
    buttonCtaSelector.innerHTML = buttonCta;
}

function getJoke() {
    XHR.open('GET', API_ENDPOINT);
    XHR.setRequestHeader('Accept', 'application/json');
    XHR.responseType = 'json';
    XHR.onload = function() {
        showJoke( XHR.response.joke);
        setButtonCta(false);
    }
    XHR.onerror = function() {
        showError('An error occured, Please Try Again');
        setButtonCta(true);
    }
    XHR.send();
}

document.getElementById('button').addEventListener('click', function(){ 
    setButtonState(true);
    setLoaderState(true);
    getJoke();
})

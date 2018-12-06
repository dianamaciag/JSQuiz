// utworzenie tablicy z opcjami
const options = ["javascript", "function", "object", "prototype", "variable", "const", "let", "var", "array", "constructor", "class", "number", "string", "boolean", "false", "true", "null", "undefined", "symbol", "this", "closures", "callback", "hoisting", "scope", "ecma", "dom", "method", "return", "event", "typeof", "delete", "operator", "reference", "document", "window", "for", 'if', "switch", "new", "instance", "node", "increment", "decrement", "concatenate", "rest", "spread", "loop", "while", "parameter", "argument", "default", "else", "value", "key", "encapsulation", "inheritance", "extends", "super", "get", "set", "bind", "call", "apply", "instanceof"];

// Zmienne: 
let wordIndex; // przygotowanie zmiennej dla indeksu wylosowanego slowa
let number = 0; // zmienna do nadania numeru dla atrybutu data spanowi
let colorNumber = 5; // zmienna wskazujaca element paska zycia
let guessed = 0; // zmienna liczaca ilosc odgadnietych liter 
const checkedLetters = [] // tablica przechowujaca sprawdzone litery

// pobieranie potrzebnych elementow z DOM
const drawBtn = document.querySelector('button.draw');
const wordDiv = document.querySelector('div.word');
const input = document.querySelector('input');
const checkBtn = document.querySelector('button.check');
const result = document.querySelector('div.result');
const lifePannel = document.querySelector('.life');
const colors = document.querySelectorAll('.life div');
const badLetters = document.querySelector('div.wrong');


// funkcja losujaca slowo oraz wyswietlajaca pola pod litery oraz 'pasek życia'
const chosenWord = () => {

    cleanGame(); // czyszczenie gry w przypadku ponownego losowania

    wordIndex = Math.floor(Math.random() * options.length); // losowanie slowa z tablicy

    for (let i = 0; i < options[wordIndex].length; i++) {

        const span = document.createElement('span');
        span.setAttribute('data-key', number);
        span.className = 'placeForLett';
        number++;
        span.textContent = "_ ";
        wordDiv.appendChild(span)

    } // wyswietlenie odpowiedniej liczby _ dla odgadywanych liter

    colors.forEach(color => color.style.backgroundColor = 'green'); // nadanie paskowi zycia koloru

    console.log(options[wordIndex]);

};

// funkcja sprawdzajaca poprawnosc wprowadzonej wartosci

const checkValue = () => {

    if (typeof wordIndex === 'undefined') { // przypadek gdy nie zostalo jeszcze wylosowane slowo
        alert("Please, draw a word.")
        input.value = '';

    } else {

        const value = parseInt(input.value); // zamiana wpisanej wartosci na typ number

        if (!isNaN(value)) { // przypadek gdy wartosc jest liczba 

            alert('Incorrect value! Please, enter letter.');
            input.value = "";

        } else if (input.value === '') { // przypadek gdy pole jest puste
            alert('Please, enter letter.')

        } else {

            if (input.value.length > 1) {
                alert('Please, enter a single letter.')
            } else {

                const letter = input.value.toLocaleLowerCase();

                // sprawdzenie czy litera nie byla juz sprawdzana
                if (checkedLetters.includes(letter)) {
                    alert('This letter has already been checked. Enter another one')
                }
                checkedLetters.push(letter);

                findLetter(letter); // w innym wypadku wywolanie funkcji szukajacej wpisana litere w slowie
            }

        }

    }

}

// funkcja sprawdzajaca czy dana litera znajduje sie w wylosowanym slowie i wyswietlajaca odgadniete litery

const findLetter = (value) => {

    const letter = value;

    const word = options[wordIndex].split('');

    const include = word.includes(letter);

    if (!include) {

        losse(letter); // wywolanie funkcji obslugujacej porazke gdy litery nie ma w slowie


    } else if (include) {

        win(letter, word); // // wywolanie funkcji obslugujacej wygrana gdy litera jest w slowie 

    }
}

// funkcja obslugujaca porazke 

const losse = (letter) => {

    const span = document.createElement('span');
    span.textContent = `${letter} `;
    badLetters.appendChild(span); // pokazanie blednej litery w przeznaczonym na to polu


    result.textContent = "No. Try again!"
    result.style.backgroundColor = "red";
    input.value = "";

    document.querySelector(`.life div:nth-child(${colorNumber})`).style.backgroundColor = "red";

    --colorNumber;

    if (colorNumber == 0) {
        wordDiv.textContent = options[wordIndex];
        result.textContent = "Game over! Try again!";
    }

}

// funkcja obslugujaca wygrana 

const win = (letter, word) => {

    // odsloniecie odgadnietych liter
    for (i = 0; i < word.length; i++) {

        if (word[i] == letter) {

            const span = document.querySelector(`[data-key = '${i}' ]`);

            span.textContent = `${word[i]} `;

            result.textContent = "Good job! Keep it up!"
            result.style.backgroundColor = "green";
            input.value = "";

            guessed++;

        }

    }
    // gdy wszystkie litery odgadniete:

    if (guessed === options[wordIndex].length) {

        result.textContent = "That's it! Congrats!";
        result.style.backgroundColor = "green";

    }

}

// funkcja czyszczaca grę

const cleanGame = () => {

    input.value = "";
    wordDiv.textContent = "";
    lifePannel.classList.remove('loose')
    result.textContent = "";
    result.style.backgroundColor = "white";
    badLetters.textContent = "";
    number = 0;
    gameNumber = 0;
    colorNumber = 5;
    checkedLetters.length = 0;
    guessed = 0;

}

// nasluchiwanie na button losujacy
drawBtn.addEventListener('click', chosenWord);

// nasluchiwanie na przycisk sprawdzajacy litere
checkBtn.addEventListener('click', checkValue);

// nasluchiwanie na aktywnosc inputa
input.addEventListener('focus', () => {
    result.style.backgroundColor = 'white';
    result.textContent = ""
})
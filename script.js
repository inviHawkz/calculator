const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator')
const del = document.querySelector('#del');
const output = document.querySelector('#output');
const reset = document.querySelector('#reset');
const equal = document.querySelector('#equal');

window.addEventListener('keydown', e => console.log(e.key));
window.addEventListener('keydown', e => {
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') output.textContent += ` ${document.querySelector(`.operator[data-key='${e.key}']`).textContent} `;
    else if (e.key === 'Backspace') output.textContent = output.textContent.slice(0, output.textContent.length - 1);
    else if (e.key === 'Enter') output.textContent = calculator.calculate(output.textContent);
    else if (e.key === 'Escape') output.textContent = '';
    else output.textContent += document.querySelector(`.number[data-key='${e.key}']`).textContent;
});

numbers.forEach(number => number.addEventListener('click', () => output.textContent += number.textContent));

operators.forEach(operator => operator.addEventListener('click', () => output.textContent += ` ${operator.textContent} `));
del.addEventListener('click', () => output.textContent = output.textContent.slice(0, output.textContent.length - 1));
reset.addEventListener('click', () => output.textContent = '');
equal.addEventListener('click', () => output.textContent = calculator.calculate(output.textContent));

function Calculator() {
    this.operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    }
    this.calculate = (str) => {
        const arr = str.split(' ');
        let a = +arr[0];
        let op = arr[1];
        let b = +arr[2];
        if (!op) return a;
        return this.operators[op](a, b);
    }
}

let calculator = new Calculator;

//first string is number a
//second string is op
//third string is number b

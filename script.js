const numbers = document.querySelectorAll('.number');
const dot = document.querySelector('#dot');
const operators = document.querySelectorAll('.operator')
const del = document.querySelector('#del');
const reset = document.querySelector('#reset');
const equal = document.querySelector('#equal');
let output = document.querySelector('#output');
let outputTop = document.querySelector('#output-top');
const numberList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

//Mouse
numbers.forEach(number => number.addEventListener('click', () => output.textContent += number.textContent));
dot.addEventListener('click', () => {
    if (!output.textContent.includes('.')) output.textContent += '.';
    else if (output.textContent.split(' ').length === 3 && !output.textContent.split(' ')[2].includes('.')) output.textContent += '.';
})

operators.forEach(operator => operator.addEventListener('click', () => {
    if (output.textContent.split(' ').length < 3) output.textContent += ` ${operator.textContent} `;
    else {
        outputTop.textContent = `${output.textContent.split(' ')[0]} ${output.textContent.split(' ')[1]} ${output.textContent.split(' ')[2]} = ${calculator.calculate(output.textContent)}`;
        output.textContent = `${calculator.calculate(output.textContent)} ${operator.textContent} `;
    };
}));
del.addEventListener('click', () => output.textContent = output.textContent.slice(0, output.textContent.length - 1));
reset.addEventListener('click', () => output.textContent = '');
equal.addEventListener('click', () => {
    if (output.textContent.split(' ').length < 3) outputTop.textContent = output.textContent.split(' ')[0];
    else outputTop.textContent = `${output.textContent.split(' ')[0]} ${output.textContent.split(' ')[1]} ${output.textContent.split(' ')[2]} = ${calculator.calculate(output.textContent)}`;
    output.textContent = (+calculator.calculate(output.textContent).toFixed(2));
});

document.querySelectorAll('#buttons div div').forEach(button => button.addEventListener('mousedown', e => e.target.classList.add('pressing')));
document.querySelectorAll('#buttons div div').forEach(button => button.addEventListener('mouseup', e => e.target.classList.remove('pressing')));


//Keyboard
window.addEventListener('keydown', e => console.log(e.key));
window.addEventListener('keydown', e => {
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        if (output.textContent.split(' ').length < 3) output.textContent += ` ${document.querySelector(`.operator[data-key='${e.key}']`).textContent} `;
        else {
            outputTop.textContent = `${output.textContent.split(' ')[0]} ${output.textContent.split(' ')[1]} ${output.textContent.split(' ')[2]} = ${calculator.calculate(output.textContent)}`;
            output.textContent = `${calculator.calculate(output.textContent)} ${e.key} `;
        };
    }
    else if (e.key === 'Backspace') output.textContent = output.textContent.slice(0, output.textContent.length - 1);
    else if (e.key === 'Enter') {
        if (output.textContent.split(' ').length < 3) outputTop.textContent = output.textContent.split(' ')[0];
        else outputTop.textContent = `${output.textContent.split(' ')[0]} ${output.textContent.split(' ')[1]} ${output.textContent.split(' ')[2]} = ${calculator.calculate(output.textContent)}`;
        output.textContent = (+calculator.calculate(output.textContent).toFixed(2));
    }
    else if (e.key === 'Escape') output.textContent = '';
    else if (e.key === '.' && !output.textContent.includes('.')) output.textContent += '.';
    else if (e.key === '.' && output.textContent.split(' ').length === 3 && !output.textContent.split(' ')[2].includes('.')) output.textContent += '.';
    else if (numberList.includes(e.key)) output.textContent += e.key;
});

window.addEventListener('keydown', e => {if (numberList.includes(e.key) || e.key === '.') document.querySelector(`#buttons div div[data-key='${e.key}']`).classList.add('pressing')});
window.addEventListener('keyup', e => {if (numberList.includes(e.key) || e.key === '.') document.querySelector(`#buttons div div[data-key='${e.key}']`).classList.remove('pressing')});

//function
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
let input = document.getElementById('input');
let buttons = document.querySelectorAll('button');

let string = "";

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    if (e.target.innerHTML === '=') {
      if (string.trim() === '') {
        input.value = '';
      } else {
        try {
          string = eval(string);
          if (isNaN(string)) {
            input.value = "Syntax Error";
          } else {
            input.value = string;
          }
        } catch (error) {
          input.value = "Syntax Error";
        }
      }
    } else if (e.target.innerHTML === '%') {
      string += '/100';
      input.value = string;
    } else if (e.target.innerHTML === 'AC') {
      string = "";
      input.value = string;
    } else if (e.target.innerHTML === 'DEL') {
      string = string.substring(0, string.length - 1);
      input.value = string;
    } else {
      string += e.target.innerHTML;
      input.value = string;
    }
  });
});

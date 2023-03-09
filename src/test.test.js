/**
 * @jest-environment jsdom
 */

let todoArr = [];
const input = document.createElement('input');
input.value = 'one';

const dataObj = {
  description: input.value,
  completed: false,
};

const Add = () => {
  if(input.value.length !== 0) {
    dataObj.description = input.value;

    for (let i = 0; i < todoArr.length; i += 1) {
      todoArr[i].index = i + 1;
    }
    todoArr.push(dataObj);

    localStorage.setItem('data', JSON.stringify(todoArr));
  }
}


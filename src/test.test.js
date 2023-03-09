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

const deleteItem = (id) => {
  const indexItem = todoArr.findIndex((item) => item.index === id);
  if (indexItem > -1) {
  todoArr.splice(indexItem, 1);

  todoArr.forEach((item, indexItem) => {
      item.index = indexItem;
  });
  }
  localStorage.setItem('data', JSON.stringify(todoArr));
}

describe('Todo List', () => {
  test('Add  todo', () => {
    Add();
    expect(todoArr.length).toBe(1);
  })
  test('delete Item', () => {
    deleteItem(1);
    expect(todoArr.length).toBe(1);
  }) 
});

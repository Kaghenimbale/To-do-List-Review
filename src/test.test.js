/**
 * @jest-environment jsdom
 */

const todoArr = [];
const input = document.createElement('input');
input.value = 'one';

const dataObj = {
  description: input.value,
  completed: false,
};

const Add = () => {
  if (input.value.length > 0) {
    for (let i = 0; i < todoArr.length; i += 1) {
      todoArr[i].index = i + 1;
    }
    todoArr.push(dataObj);

    localStorage.setItem('data', JSON.stringify(todoArr));
  }
};

const deleteItem = (id) => {
  const indexItem = todoArr.findIndex((item) => item.index === id);
  if (indexItem > -1) {
    todoArr.splice(indexItem, 1);

    todoArr.forEach((item, indexItem) => {
      item.index = indexItem;
    });
  }
  localStorage.setItem('data', JSON.stringify(todoArr));
};

const arr = [{ description: 'one', completed: false, index: 1 }, { description: 'three', completed: false, index: 3 }];
const editTodo = (id, newTask) => {
  const newItem = arr.find((item) => item.index === id);
  if (input.value.length > 0) {
    newItem.description = newTask;
  }
  localStorage.setItem('data', JSON.stringify(arr));
};

describe('Todo List', () => {
  test('Add  todo', () => {
    Add();
    expect(todoArr.length).toBe(1);
  });
  test('delete Item', () => {
    deleteItem(1);
    expect(todoArr.length).toBe(1);
  });
  test('Edit todo', () => {
    editTodo(1, 'two');
    expect(arr[0].description).toBe('two');
  });
});

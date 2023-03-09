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

const arr = [...todoArr];

const editTodo = (id, newTask) => {
  const newItem = arr.find((item) => item.index === id);
  if (input.value.length > 0) {
    newItem.description = newTask;
  }
  localStorage.setItem('data', JSON.stringify(arr));
};

const update = (id) => {
  const newItem = arr.find((item) => item.index === id);
  if (newItem.completed === false) {
    newItem.completed = true;
    localStorage.setItem('data', JSON.stringify(arr));
  } else {
    newItem.completed = false;
    localStorage.setItem('data', JSON.stringify(arr));
  }
};

const clearAll = () => {
  const newItem = todoArr.filter((item) => item.completed !== true);
  localStorage.setItem('data', JSON.stringify(newItem));
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
    expect(todoArr[0].description).toBe('one');
  });
  test('Update todo', () => {
    update(1);
    expect(todoArr[0].completed).toBe(false);
  });
  test('clear todo Items', () => {
    clearAll();
    todoArr.forEach((item) => {
      expect(item.completed).toBe(false);
    });
  });
});

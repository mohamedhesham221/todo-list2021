<template>
  <div class="top-background" :class="{darkBck:switchTheme}">
    <img src="../assets/logo.png" alt="logo" class="top-background__logo">
    <img src="../assets/images/icon-moon.svg" alt="moon" class="top-background__theme"
        @click="switcher()" v-if="!switchTheme">
    <img src="../assets/images/icon-sun.svg" alt="sun" class="top-background__theme"
        @click="switcher()" v-else>
    <div class="clearfix"></div>
    <form class="input-todo" @submit.prevent="addTodo();" :class="{darkInput:switchTheme}">
      <button type="submit" class="input-todo__submit" :class="{darkSubmit:switchTheme}"></button>
      <input type="text" class="input-todo__input" placeholder="Create a new todo..."
              v-model="todo" :class="{darkTxtInput:switchTheme}">
    </form>
  </div>
</template>

<script>
import Bus from '../main';

export default {
  name: 'TopBackground',
  data() {
    return {
      todo: null,
      myTodos: [],
      switchTheme: false,
      countItems: 0,
      keyStorage: 'item-todo',
      keyCount: 'items-count',
      keySwitch: 'switcher',
    };
  },
  created() {
    // eslint-disable-next-line no-return-assign
    Bus.$on('transfer counts', (el) => this.countItems = el);
    // eslint-disable-next-line no-return-assign
    Bus.$on('new arr', (el) => this.myTodos = el);
    this.getItems();
    this.bodyBckClr();
  },
  methods: {
    addTodo() {
      this.todos();
      this.countTodos();
      localStorage.setItem(this.keyStorage, JSON.stringify(this.myTodos));
    },
    todos() {
      this.myTodos.push({
        name: this.todo,
        checked: false,
      });
      this.todo = null;
      Bus.$emit('todos', this.myTodos);
    },
    countTodos() {
      this.countItems += 1;
      Bus.$emit('count', this.countItems);
      localStorage.setItem(this.keyCount, this.countItems);
    },
    switcher() {
      this.switchTheme = !this.switchTheme;
      Bus.$emit('change theme', this.switchTheme);
      localStorage.setItem(this.keySwitch, this.switchTheme);
      this.bodyBckClr();
    },
    bodyBckClr() {
      if (this.switchTheme) { // if statement to change body background color
        document.body.style.backgroundColor = '#161722';
      } else {
        document.body.style.backgroundColor = '#e4e5f187';
      }
    },
    getItems() {
      this.myTodos = JSON.parse(localStorage.getItem(this.keyStorage) || '[]');
      this.countItems = JSON.parse(localStorage.getItem(this.keyCount));
      this.switchTheme = JSON.parse(localStorage.getItem(this.keySwitch));
    },
  },
};
</script>

<template>
  <div class="todos">
    <div class="todos__list" :class="{darkList:switchTheme}">
      <!--render all array -->
      <div v-if="activeArr == 0">
          <draggable v-model="myTodos" group="people" @start="drag=true" @end="drag=false">
        <div class="todos__list--item" v-for="(todo,index) in myTodos" :key="index"
            :class="{darkItem:switchTheme}">
        <div class="todos__list--item__check"
        :class="{darkCheck:switchTheme,checkedClass: todo.checked}"
        @click="todo.checked = !todo.checked;
                todo.checked? countItems-- : countItems++;
                transferCounts;">
          <img src="../assets/images/icon-check.svg" alt="check" :class="{markCheck: todo.checked}">
        </div>
        <p :class="{darkTodo:switchTheme, lineThrough: todo.checked}">{{ todo.name }}</p>
        <img src="../assets/images/icon-cross.svg" alt="cross" class="cross"
          @click="removeTodo(index);
                  todo.checked? '' : countItems--;
                  transferCounts; ">
      </div>
          </draggable>
      </div>
      <!--render active filterd array -->
      <div v-if="activeArr == 1">
                    <div class="todos__list--item"
                    v-for="(todo,index) in myTodos.filter(el => !el.checked)" :key="index"
            :class="{darkItem:switchTheme}">
        <div class="todos__list--item__check"
        :class="{darkCheck:switchTheme,checkedClass: todo.checked}"
        @click="todo.checked = !todo.checked;
                todo.checked? countItems-- : countItems++;
                transferCounts;">
          <img src="../assets/images/icon-check.svg" alt="check" :class="{markCheck: todo.checked}">
        </div>
        <p :class="{darkTodo:switchTheme, lineThrough: todo.checked}">{{ todo.name }}</p>
      </div>
      </div>
      <!--render completed filterd array -->
      <div v-if="activeArr == 2">
      <div class="todos__list--item"
      v-for="(todo,index) in myTodos.filter(el => el.checked)" :key="index"
            :class="{darkItem:switchTheme}">
        <div class="todos__list--item__check"
        :class="{darkCheck:switchTheme,checkedClass: todo.checked}"
        @click="todo.checked = !todo.checked;
                todo.checked? countItems-- : countItems++;
                transferCounts;">
          <img src="../assets/images/icon-check.svg" alt="check" :class="{markCheck: todo.checked}">
        </div>
        <p :class="{darkTodo:switchTheme, lineThrough: todo.checked}">{{ todo.name }}</p>
      </div>
      </div>

      <div class="todos__list--item items-count">
        <p :class="{darkCount:switchTheme}">{{ countItems }} items left</p>
  <div class="todos-filter lg-screen" v-if="myTodos.length > 0" :class="{darkFilter:switchTheme}">
      <p @click="activeClass(1); allFilter();" :class="{isActive: activeEl === 1}">All</p>
      <p @click="activeClass(2); activeFilter();" :class="{isActive: activeEl === 2}">Active</p>
      <p @click="activeClass(3); finishFilter();" :class="{isActive: activeEl === 3}">Completed</p>
    </div>
        <p :class="{darkCount:switchTheme}" @click="clearCompletedTodos">Clear Completed</p>
      </div>
    </div>
    <div class="todos-filter" v-if="myTodos.length > 0" :class="{darkFilter:switchTheme}">
      <p @click="activeClass(1); allFilter();" :class="{isActive: activeEl === 1}">All</p>
      <p @click="activeClass(2); activeFilter();" :class="{isActive: activeEl === 2}">Active</p>
      <p @click="activeClass(3); finishFilter();" :class="{isActive: activeEl === 3}">Completed</p>
    </div>
    <p class="drag-drop" v-if="myTodos.length > 0"
        :class="{darkTxt:switchTheme}">Drag and drop to reorder list</p>
    <p class="no-items" v-else :class="{darkTxt:switchTheme}">There's no Todos</p>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import Bus from '../main';

export default {
  name: 'MyTodos',
  data() {
    return {
      myTodos: [],
      switchTheme: false,
      countItems: 0,
      activeEl: 1,
      activeArr: 0,
      keyStorage: 'item-todo',
      keyCount: 'items-count',
      keySwitch: 'switcher',
    };
  },
  created() {
    this.customEve();
  },
  components: {
    draggable,
  },
  methods: {
    customEve() {
      // eslint-disable-next-line no-return-assign
      Bus.$on('todos', (el) => this.myTodos = el);
      // eslint-disable-next-line no-return-assign
      Bus.$on('change theme', (el) => this.switchTheme = el);
      // eslint-disable-next-line no-return-assign
      Bus.$on('count', (el) => this.countItems = el);
      this.getItems();
    },
    clearCompletedTodos() {
      this.myTodos.forEach((el) => {
        if (el.checked) {
          const filterdCompleted = this.myTodos.filter((newEl) => !newEl.checked);
          this.myTodos = filterdCompleted;
        }
      });
      Bus.$emit('new arr', this.myTodos);
      this.setItems();
    },
    removeTodo(el) {
      this.myTodos.splice(el, 1);
    },
    allFilter() {
      // eslint-disable-next-line no-return-assign
      return this.activeArr = 0;
    },
    activeFilter() {
      // eslint-disable-next-line no-return-assign
      return this.activeArr = 1;
    },
    finishFilter() {
      // eslint-disable-next-line no-return-assign
      return this.activeArr = 2;
    },
    activeClass(el) {
      this.activeEl = el;
    },
    setItems() {
      localStorage.setItem(this.keyCount, this.countItems);
      localStorage.setItem(this.keyStorage, JSON.stringify(this.myTodos));
      localStorage.setItem(this.keySwitch, this.switchTheme);
    },
    getItems() {
      this.myTodos = JSON.parse(localStorage.getItem(this.keyStorage) || '[]');
      this.countItems = JSON.parse(localStorage.getItem(this.keyCount));
      this.switchTheme = JSON.parse(localStorage.getItem(this.keySwitch));
    },
  },
  computed: {
    transferCounts() {
      this.setItems();
      return Bus.$emit('transfer counts', this.countItems);
    },
  },
};
</script>

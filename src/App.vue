<template>
  <div id="app">
    <Today />
    <Background />
    <Todos />
  </div>
</template>

<script>
import Background from './components/Background.vue';
import Todos from './components/MyTodos.vue';
import Today from './components/Today.vue';

export default {
  name: 'App',
  components: {
    Background,
    Todos,
    Today,
  },
};
</script>

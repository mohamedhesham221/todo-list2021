<template>
  <div class="date" :class="{changeColor:switchTheme}">
    <p>{{ today }}</p>
    <p>{{ date }}</p>
    <p>{{ month }} {{ year }}</p>
  </div>
</template>
<script>
import Bus from '../main';

export default {
  name: 'Today',
  data() {
    return {
      days: ['sunday', 'monday', 'tuesday', 'Wednesday', 'thursday', 'friday', 'saturday'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      date: '',
      month: '',
      year: '',
      today: '',
      currentDate: new Date(),
      switchTheme: false,
      keySwitch: 'switcher',
    };
  },
  created() {
    this.localDate();
    this.switchTheme = JSON.parse(localStorage.getItem(this.keySwitch));
    // eslint-disable-next-line no-return-assign
    Bus.$on('change theme', (el) => this.switchTheme = el);
  },
  methods: {
    localDate() {
      this.getMonth();
      this.getYear();
      this.getDate();
      this.getToday();
    },
    getMonth() {
      const mm = this.currentDate.getMonth();
      for (let i = 0; i < this.months.length; i += 1) {
        const element = this.months[i];
        if (mm === i) {
          this.month = element;
        }
      }
    },
    getYear() {
      const yy = this.currentDate.getFullYear();
      this.year = yy;
    },
    getDate() {
      const dd = this.currentDate.getDate();
      if (dd < 10) {
        this.date = `0${this.currentDate.getDate()}`;
      } else {
        this.date = this.currentDate.getDate();
      }
    },
    getToday() {
      const todayName = this.currentDate.getDay();
      for (let i = 0; i < this.days.length; i += 1) {
        const element = this.days[i];
        if (todayName === i) {
          this.today = element;
        }
      }
    },
  },
};
</script>

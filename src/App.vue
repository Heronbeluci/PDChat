<template lang='pug'>
  #app
    Index(msg="Hello World")
</template>

<script>
import Index from './components/Index.vue'

export default {
  name: 'App',
  components: {
    Index
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

html, body {
  width: 100% !important;
  height: 100% !important;
  background-color: #395e96;
  background-image: linear-gradient(160deg, #395e96 0%, #5899a5 100%);
}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100% !important;
  height: 100% !important;
}
</style>

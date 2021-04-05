<template lang='pug'>
  #app
    <component v-bind:is="component" />
</template>

<script>
import Index from './components/Index.vue'
import Chat from './components/Chat.vue'

export default {
  name: 'App',
  components: {
    Index, Chat
  },
  data (){
    return {
      component: "Index",

      nickname: ''
    }
  },
  methods: {
    toggleComponent (name){
      this.component = name;
    },
    setNickname (name) {
      this.nickname = name
    },
    getNickname () {
      return this.nickname
    }
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

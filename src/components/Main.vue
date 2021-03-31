<template lang="pug">
  div
    h1| {{ msg }}
</template>

<script>
export default {
  name: 'Main',
  props: {
    msg: String
  }
}
</script>

<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

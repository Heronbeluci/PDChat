<template lang="pug">
  .main
    .container
      .row
        .col-md-4.content

          h2| PDCHAT
          img(src="../assets/user.svg")

          form(@submit.prevent="saveNickname" method="post" class="uk-form-stacked")
            .input-group
              input.form-control(placeholder="Nickname" v-model="nickname")
              .input-group-append
                button.btn.btn-primary
                  b-icon-arrow-right-short

</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      nickname: ""
    }
  },
  methods: {
    async saveNickname () {
      console.log(this.nickname)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap');

$logo_width: 160px;
$margin_top: 140px;

h2 {
  color: rgba(27, 52, 88, 0.678);
  font-family: 'Dela Gothic One', cursive;
  font-size: 26px;
  margin-bottom: 35px;
}

.content {
  float: none;
  margin-left: auto;
  margin-right: auto;
  margin-top: $margin_top;
  background-color: rgb(255, 255, 255, 0.8);
  padding: 25px 20px 20px 20px;
  border-radius: 5px;
  border: 1px solid rgba(209, 209, 209, 0.507);
}

img {
  float: none;
  display: block;
  width: $logo_width;
  margin: 30px auto 60px auto;
}

h2 {
  text-align: center;
}

input[type="text"] {
  text-align: center;
}
</style>

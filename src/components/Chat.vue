<template lang="pug">
  .main
    .container
      .row
        .col-md-10.content.px-0.py-0

          div.px-5.py-4
            h2.mb-0| PDCHAT
          
          .col-12.px-0
            .px-4.py-5.chat-box.bg-white(ref='messageDisplay')
            
              .media.w-50.mb-3(v-for="msg in messages" :key="msg.id", v-bind:class="{ 'ml-auto': msg.me }")
                img.rounded-circle(src='../assets/user.svg', alt='user', v-bind:class="{ 'hidden': msg.me }")
                .media-body.ml-3
                  .rounded.py-0.px-1.mb-0
                    p.mb-0.nickname.text-muted(v-bind:class="{ 'text-right': msg.me }") {{ msg.nickname }}:
                  .rounded.py-2.px-3.mb-2(v-bind:class="{ 'bg-primary': msg.me, 'bg-light': !msg.me }")
                    p.text-small.mb-0.text-muted(v-bind:class="{ 'text-white': msg.me }") {{ msg.message }}
                  p.small.text-muted(v-bind:class="{ 'text-right': msg.me }") {{ msg.datetime }}

            form.bg-light(@submit.prevent="submitMessage" method="post")
              .input-group
                input.form-control.rounded-0.border-0.py-4.bg-light(v-model="message" type='text', placeholder='Digite uma mensagem', aria-describedby='button-addon')
                .input-group-append
                  button#button-addon.btn.btn-link(type='submit')
                    b-icon-arrow-right

</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      nickname: this.$parent.getNickname(),
      message: '',
      messages: []
    }
  },
  methods: {
    async submitMessage () {
      var vm = this
      if (this.message == '') return alert('Please, insert a valid message.');

      var messageDisplay = this.$refs.messageDisplay;
      messageDisplay.scrollTop = messageDisplay.scrollHeight;

      var id = this.$uuid.v4()
      var date = new Date().getTime()
      var message = this.message
      this.$socket.emit('chat_message', {
        id,
        message: message,
        date: date
      }, (res) => {
        if (res == 'success') {
          vm.messages.push({
            id,
            nickname: vm.nickname,
            message: message,
            datetime: new Date(date).toLocaleString(),
            me: true
          })
        } else if (res == 'nickname-needed') {
          this.$parent.toggleComponent('Index')
        }
      })
      this.message = ''
    },
    async sortItems () {
      this.messages.sort((a, b) => {
        return new Date(a.datetime) - new Date(b.datetime);
      });
      return this.messages;
    }
  },
  sockets: {
    chat_message: function (data) {
      var vm = this
      // console.log('new message:', data)
      vm.messages.push({
        id: data.id,
        nickname: data.nickname,
        message: data.message,
        datetime: new Date(data.date).toLocaleString(),
        me: false
      })
    }
  },
  mounted(){
    var vm = this
    let history = this.$parent.getHistory()
    for (var i in history) {
      let item = history[i]
      vm.messages.push({
        id: item.id,
        nickname: item.owner,
        message: item.message,
        datetime: new Date(item.date).toLocaleString(),
        me: item.owner == vm.nickname
      })
    }
    this.sortItems()
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

.chat-box{
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  min-height: 500px;
  max-height: 600px;
  overflow-y: auto;
  img{
    width: 60px;
    margin: 10px auto 30px auto;
  }
  .nickname{
    font-size: 14px;
  }
  .hidden{
    display: none;
  }
  .text-white{
    color: white!important;
  }
  .text-right{
    text-align: right;
  }
}

input.form-control{
  text-align: left!important;
  padding-left: 20px;
}
#button-addon{
  color: rgba(0, 92, 153, 0.8);
}

.userstate{
  width: 100%;
  margin-top: 4px;
  height: 24px;
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

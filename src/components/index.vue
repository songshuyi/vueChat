<template>
  <div>
    <chat :chatData="chatData" class="chat"/>
    <div class="send">
      <input v-model="msg" type="text" placeholder="随便说点什么"/>
      <a @click="send">发送</a>
    </div>

  </div>
</template>

<script>
import chat from './common/chat/index'

export default {
  name: 'index',
  components: {
    chat
  },
  data () {
    return {
      msg: '',
      chatData: [{
        id: '1',
        avatar: require('../assets/1.png'),
        time: '1603005960915',
        type: 'text',
        content: '你好',
        isUser: false,
      }, {
        id: '2',
        avatar: require('../assets/1.png'),
        time: '1603005960915',
        type: 'text',
        content: '你也好',
        isUser: true,
      }, {
        id: '3',
        avatar: require('../assets/1.png'),
        time: '1603005960915',
        type: 'system',
        content: '这是一条撤销消息内容',
        isUser: true,
      }, {
        id: '4',
        avatar: require('../assets/1.png'),
        time: '1603005960915',
        type: 'image',
        content: require('../assets/1.png'),
        isUser: true,
      }, {
        id: '5',
        avatar: require('../assets/1.png'),
        time: '1603005960915',
        type: 'image',
        content: require('../assets/1.png'),
        isUser: false,
      }],
      scoket: null,
    }
  },
  mounted() {
    this.initSocket()
  },
  methods: {
    initSocket() {
      const socket = window.socket
      this.socket = socket
      socket.on('message', (data) => {
        this.chatData.push({
          id: '3',
          avatar: require('../assets/1.png'),
          time: '1603005960915',
          type: 'text',
          content: data,
          isUser: true,
        })
      this.scrollBottom()
    });
      socket.on('enter',(data) => {
        this.chatData.push({
          id: '3',
          avatar: require('../assets/1.png'),
          time: '1603005960915',
          type: 'system',
          content: data,
          isUser: true,
        })
        this.scrollBottom()
      });
      socket.on('leave',(data) => {
        this.chatData.push({
          id: '3',
          avatar: require('../assets/1.png'),
          time: '1603005960915',
          type: 'system',
          content: data,
          isUser: true,
        })
        this.scrollBottom()
      });
    },
    scrollBottom() {
      this.$nextTick(() => {
        window.scrollTo(0, document.documentElement.clientHeight);
      });
    },
    send() {
      this.socket.emit('message', this.msg);
      this.msg = ''
    }
  },
}
</script>

<style lang="scss" scoped>
.chat{
  font-size: 16px;
  padding: 6px;
  padding-bottom: 80px;
}
.send{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  padding: 10px;
  border-top:1px solid #ddd;
}
.send input{
  height: 30px;
  width: 80%;
  outline: none;
}
.send a{
  cursor: pointer;
  width: 20%;
  height: 40px;
  background: #ff6058;
  color: #fff;
  border-radius: 20px;
  line-height: 40px;
  text-align: center;
}

.say{
  line-height: 38px;font-size: 24px;color: #ff6058;margin-top: 5px;
  span{
    display: inline-block;background: #ff6058;color: #fff;
    padding: 0 10px;border-radius: 5px;margin-left: 10px;
  }
}
</style>

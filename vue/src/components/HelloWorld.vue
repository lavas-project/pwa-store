<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <div class="wrapper">
      <div class="author">Eason Wang</div>
    </div>
  </div>
</template>

<script>
import {sayHello} from '../utils/example'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    let arr = [...[1,2,3], ...[4]]
    console.log(arr)
    sayHello()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1, h2 {
  font-weight: normal;
}
.wrapper {
  .author {
    text-align: center
  }
}
</style>

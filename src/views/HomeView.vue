<template>
  <div class="home">

    <HelloWorld msg="Desafio Gram"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/login.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

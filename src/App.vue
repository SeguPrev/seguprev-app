<template>
  <div class="app">
    <router-view id="content" />
    <notifications group="foo" position="top right" class="mr-3 mt-3" />
    <Footer></Footer>
  </div>
</template>


<script>
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Footer
  }
}
</script>

<style>
@font-face {
  font-family: VarelaRound;;
  src: url("assets/fonts/VarelaRound-Regular.ttf");
}

* {
  margin: 0;
  padding: 0;
  font-family: VarelaRound;
}

#content {
  min-height: 100vh;
}
</style>

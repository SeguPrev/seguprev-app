<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  beforeCreate: function() {
    this.$router.push('sessions');
  }
}
</script>

<style scoped>
</style>

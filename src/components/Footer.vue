<template lang="html">

  <footer class="bg-dark">
    <div class="container">
      SEGUPREV &copy; {{ year }}
    </div>
  </footer>

</template>

<script>
export default {
  name: 'Footer',
  data: function() {
    return {
      year: new Date().getFullYear(),
    }
  }
}

</script>

<style scoped>
footer {
  color:white;
  width: 100%;
  padding: 6px 0px;
}
</style>

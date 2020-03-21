<template>

  <div class="">
    <b-navbar toggleable="lg" id="nav-bar">
      <b-collapse id="nav-collapse" is-nav>

        <b-navbar-nav>
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" variant="success" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>

        <b-navbar-nav>
          <b-nav-item href="#"><span class="text-light">Recursos</span></b-nav-item>
          <b-nav-item href="#"><span class="text-light">Filtros</span></b-nav-item>
          <b-nav-item href="#"><span class="text-light">Ayuda</span></b-nav-item>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>

    <google-map />
  </div>

</template>

<script>
import GoogleMap from '@/components/GoogleMaps.vue';
export default {
  name: 'Center',
  components: {
    GoogleMap
  }
}

</script>

<style scoped>
#nav-bar {
  z-index: 3;
}

.white {
  color: #fff;
}
</style>

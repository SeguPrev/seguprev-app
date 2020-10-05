<template>
  <div class="content ml-2 px-3 py-2 rounded">
    <table>
      <tr>
        <td class="pr-5"><small>Latitud</small></td>
        <td class="pr-5"><small>Longitud</small></td>
      </tr>
      <tr>
        <td class="pr-5">
          <small>{{ (coords.lat).toFixed(4) }}...</small>
        </td>
        <td class="pr-5">
          <small>{{ (coords.lng).toFixed(4) }}...</small>
        </td>
      </tr>
    </table>
    
    <form class="mt-3">
        <div class="form-group">
            <label for="zones"><small>Zonas</small></label>
            <select
                name="zones"
                id="zones"
                v-model="zone_selected"
                @change="enableNewZone($event)"
                class="form-control form-control-sm">

                
                <option disabled selected value="">
                    Selecciona una opción
                </option>
                <option
                    v-for="zone in zones"
                    v-bind:key="zone.name"
                    :value="zone.name">
                    {{ zone.name }}
                </option>
                <option value="*">Otro</option>
                
            </select>
            <input
                type="text"
                placeholder="Zona"
                v-show="newZone"
                class="form-control form-control-sm mt-1">
        </div>

        <div class="form-group">
            <label for="category"><small>Categoria</small></label>
            <select
                name="category"
                id="category"
                v-model="category_selected"
                class="form-control form-control-sm">

                <option disabled selected value="">
                    Selecciona una opción
                </option>
                <option
                    v-for="category in categories"
                    v-bind:key="category.name"
                    :value="category.name">
                    {{ category.name }}
                </option>

            </select>
        </div>

        <div class="from-group">
            <label for=""></label>
            <select name="" id="">
                <option value=""></option>
            </select>
        </div>

        <div class="btn-group">
            <b-button
                variant="primary"
                size="sm">
                Agregar
            </b-button>
            <b-button
                variant="danger"
                size="sm"
                @click="$emit('toggle-menu')">
                Cancelar
            </b-button>
        </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "EventMenu",
  data: () => {
      return {
          zones: [],
          categories: [],

          zone_selected: '',
          category_selected: '',
          newZone: false
      }
  },
  props: ["coords"],
  methods: {
      enableNewZone: function(event) {
        this.newZone = event.target.value === '*';
      }
  },
  mounted: async function() {
      const zones = await this.$rq.get('/zone/all', []);
      const categories = await this.$rq.get('/category/all', []);
      const key_api = 'AIzaSyBC5PzXTo9DmOQmkTWlUANfzSgfhyD452Y';
      const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=' + key_api;
      
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      this.zones = zones;
      this.zones_selected = zones[0].name;
      this.categories = categories;
  }
};
</script>

<style scoped>
.content {
  background-color: #fff;
}

.btn-group {
    width: 100%;
}
</style>

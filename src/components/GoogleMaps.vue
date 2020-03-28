<template>
  <div>
    <gmap-map :center="center" :zoom="18"
      style="width:100%;  height: 100vh; position: absolute; left: 0; top: 0;">

      <gmap-marker :key="index" v-for="(m, index) in getResources"
        :position="m.position" @click="center=m.position" :icon="{url: require('../assets/icons/marker.png')}">
      </gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      center: { lat: 27.5721744, lng: -109.9455839},
      markers: [],
      places: [],
      currentPlace: null
    };
  },

  methods: {
    addMarker(lat, lng) {
        const marker = {
          lat: lat,
          lng: lng
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
    },
  },

  computed: {
    getResources: function(){
      const resources = this.$store.getters.getResources;
      let marks = [];

        for(let i = 0; i < resources.length; i++) {
          marks.push({
            position: {
              lat: resources[i].Latitud,
              lng: resources[i].Longitud,
            }
          });
        }

      return marks;
    }
  }
};
</script>

<template>
  <div>
    <EventMenu
      :coords="coords"
      :showable="showMenu"
      v-show="showMenu"
      @toggle-menu="showMenu = false"
      style="position: absolute;z-index: 100000;">
    </EventMenu>

    <gmap-map
      :center="center"
      :zoom="18"
      @click="showEventMenu"
      style="width:100%;  height: 100vh; position: absolute; left: 0; top: 0;">

      <gmap-marker
        :key="index"
        v-for="(m, index) in getResources"
        :position="m.position"
        @click="center=m.position"
        :icon="{url: require('../../assets/icons/marker.png')}">
      </gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import EventMenu from '../menu/EventMenu.vue';
export default {
  name: "GoogleMap",
  data() {
    return {
      center: { lat: 27.5721744, lng: -109.9455839},
      coords: { lat: 27.5721744, lng: -109.9455839 },
      markers: [],
      places: [],
      currentPlace: null,
      showMenu: false
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
    showEventMenu(event) {
      this.coords.lat = event.latLng.lat();
      this.coords.lng = event.latLng.lng();
      this.showMenu = true;
    }
  },

  computed: {
    getResources: function(){
      const resources = this.$store.getters.getResources;
      let marks = [];

        for(let i = 0; i < resources.length; i++) {
          marks.push({
            position: {
              lat: resources[i].latitude,
              lng: resources[i].longitude,
            }
          });
        }

      return marks;
    }
  },

  components: {
    EventMenu
  }
};
</script>

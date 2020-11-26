<template>
  <div>
    <EventMenu
      :coords="coords"
      :showable="showMenu"
      v-show="showMenu"
      @toggle-menu="showMenu = false"
      @update="$emit('update')"
      style="position: absolute; z-index: 100000;"
    >
    </EventMenu>

    <EventMenuAction
      v-show="selectedEvent"
      :event="selectedEvent"
      @update="$emit('update')"
      @toggle-menu-action="selectedEvent = null"
      style="position: absolute; z-index: 100000;"
    >
    </EventMenuAction>

    <ResourceMenu
      v-show="selectedResource"
      :event="selectedResource"
      @update="$emit('update')"
      @toggle-menu-action="selectedResource = null"
      style="position: absolute; z-index: 100000;"
    >
    </ResourceMenu>

    <gmap-map
      :center="center"
      :zoom="18"
      @click="showEventMenu"
      style="width: 100%; height: 100vh; position: absolute; left: 0; top: 0"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in getMarkers"
        :position="m.position"
        @click="center = markerClick(m)"
        :icon="{
          url:
            m.type == 'event'
              ? require('../../assets/icons/danger.png')
              : require('../../assets/icons/police-car.png'),
        }"
      >
      </gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import EventMenu from "../menu/EventMenu.vue";
import ResourceMenu from "../menu/ResourceMenu.vue";
import EventMenuAction from "../menu/EventMenuAction.vue";
export default {
  name: "GoogleMap",
  data() {
    return {
      center: { lat: 27.5721744, lng: -109.9455839 },
      coords: { lat: 27.5721744, lng: -109.9455839 },
      markers: [],
      places: [],
      selectedEvent: null,
      selectedResource: null,
      currentPlace: null,
      showMenu: false,
    };
  },
  props: ["search", "show_resources"],

  methods: {
    addMarker(lat, lng) {
      const marker = {
        lat: lat,
        lng: lng,
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
      this.selectedEvent = null;
      this.selectedResource = null;
    },
    markerClick(event) {
      this.showMenu = false;
      this.selectedEvent = null;
      this.selectedResource = null;
      const resources = this.$store.getters.getResources;
      const events = this.$store.getters.getEvents;
      switch (event.type) {
        case "resource":
          this.selectedResource = resources.find(
            (e) =>
              e.latitude == event.position.lat &&
              e.longitude == event.position.lng
          );
          console.log(resources);
          return event.position;
        case "event":
          this.selectedEvent = events.find(
            (e) => e.lat == event.position.lat && e.lng == event.position.lng
          );
          return event.position;
        default:
          return this.center;
      }
    },
  },

  computed: {
    getResources: function () {
      const resources = this.$store.getters.getResources;
      let marks = [];

      for (let i = 0; i < resources.length; i++) {
        marks.push({
          position: {
            lat: resources[i].latitude,
            lng: resources[i].longitude,
          },
          type: "resource",
        });
      }

      return marks;
    },
    getEvents: function () {
      const events = this.$store.getters.getEvents;
      let marks = [];

      for (let i = 0; i < events.length; i++) {
        marks.push({
          position: {
            lat: events[i].lat,
            lng: events[i].lng,
          },
          type: "event",
        });
      }

      return marks;
    },
    getMarkers: function () {
      let markers = this.getEvents;
      if (this.show_resources) {
        markers = markers.concat(this.getResources);
      }
      return markers;
    },
  },

  watch: {
    search: function () {
      const event = this.$store.getters.getEvents.find(
        (event) => event.zone.toLowerCase() === this.search.toLowerCase()
      );
      if (event) {
        this.center = { lat: event.lat, lng: event.lng };
      } else {
        this.center = { lat: 27.5721744, lng: -109.9455839 };
      }
    },
  },

  components: {
    EventMenu,
    ResourceMenu,
    EventMenuAction,
  },
};
</script>

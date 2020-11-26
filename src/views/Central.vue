<template>
  <div>
    <b-navbar toggleable="lg" id="nav-bar">
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              v-model="filter_search"
              placeholder="Search"
            >
            </b-form-input>
            <b-button
              size="sm"
              variant="success"
              class="my-2 my-sm-0"
              type="submit"
            >
              Search
            </b-button>
          </b-nav-form>
        </b-navbar-nav>

        <b-navbar-nav>
          <b-nav-item href="#">
            <b-button
              size="sm"
              variant="primary"
              @click="$router.push('/profile')"
            >
              Perfil
            </b-button>
          </b-nav-item>
          <b-nav-item href="#">
            <b-button
              size="sm"
              :variant="show_resources ? 'success' : 'secondary'"
              @click="show_resources = !show_resources"
            >
              Recursos
            </b-button>
          </b-nav-item>
          <b-nav-item href="#">
            <b-button
              variant="warning"
              size="sm"
              @click="$router.push('/about')"
              >Ayuda</b-button
            >
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <google-map v-if="user != null" :search="filter_search" :show_resources="show_resources" @update="update()" />
  </div>
</template>

<script>
import GoogleMap from "@/components/maps/GoogleMaps.vue";

export default {
  name: "Center",
  data: function () {
    return {
      user: null,
      show_resources: false,
      filter_search: "",
      filters_selected: [],
      filters: ["Asesinatos", "Violaciones", "Balaceras"],
    };
  },
  components: {
    GoogleMap,
  },
  methods: {
    select_filter(option) {
      let i = this.filters_selected.indexOf(option.value);
      if (i >= 0) {
        this.filters_selected.splice(i, 1);
      } else {
        this.filters_selected.push(option.value);
      }
    },
    update: async function () {
      const today = new Date();
      const route_event = `/event/all?day=${today.getDate()}&month=${today.getMonth()}&year=${today.getFullYear()}`;
      const route_resource = "/resource/all";

      let response_events = await this.$rq.get(route_event, []);
      this.$store.dispatch("addEvents_action", response_events);

      let response_resources = await this.$rq.get(route_resource, []);
      this.$store.dispatch("addResources_action", response_resources);
    },
  },
  created: async function () {
    const userCookie = sessionStorage.getItem('user');
    if(userCookie != null) {
      this.user = JSON.parse(userCookie);
      await this.update();
    } else {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
#nav-bar {
  z-index: 3;
}

#filters {
  padding: 0;
  border: none;
  background-color: transparent;
}

.pd-nothing {
  padding-bottom: 0px;
}
</style>

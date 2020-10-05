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
          <b-nav-item href="#">
            <b-button variant="primary" @click="$router.push('/profile')">Perfil</b-button>
          </b-nav-item>
          <b-nav-item href="#">
            <b-button>Recursos</b-button>
          </b-nav-item>
          <b-nav-item>

            <b-dropdown text="Filtros" id="filters" @click.stop="">
              <b-dropdown-form @click.stop="">
                <b-form-group @click.stop="">
                  <b-list-group flush>
                    <b-list-group-item class="pd-nothing">
                      <b-form-checkbox @click.stop="" class="mb-3">Asesinatos</b-form-checkbox>
                    </b-list-group-item>
                    <b-list-group-item class="pd-nothing">
                      <b-form-checkbox @click.stop="" class="mb-3">Violaciones</b-form-checkbox>
                    </b-list-group-item>
                    <b-list-group-item class="pd-nothing">
                      <b-form-checkbox @click.stop="" class="mb-3">Balaceras</b-form-checkbox>
                    </b-list-group-item>
                    <b-list-group-item class="pd-nothing">
                      <b-form-checkbox @click.stop="" class="mb-3">Robos</b-form-checkbox>
                    </b-list-group-item>
                  </b-list-group>

                  <b-button block>Filtrar</b-button>
                </b-form-group>
              </b-dropdown-form>
            </b-dropdown>

          </b-nav-item>
          <b-nav-item href="#">
            <b-button>Ayuda</b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>

    <google-map />
  </div>

</template>

<script>
import GoogleMap from '@/components/maps/GoogleMaps.vue';

export default {
  name: 'Center',
  data: function() {
    return {
      filters_selected: [],
      filters: [
        'Asesinatos',
        'Violaciones',
        'Balaceras'
      ],
    }
  },
  components: {
    GoogleMap
  },
  methods: {
    select_filter(option) {
      let i = this.filters_selected.indexOf(option.value);
      if (i >= 0) {
        this.filters_selected.splice(i, 1);
      } else {
        this.filters_selected.push(option.value);
      }
    }
  },
  created: async function() {
    const route_event = '/event';
    const route_resource = '/resource/all';

    let response_events = await this.$rq.get(route_event, []);
    this.$store.dispatch('addEvents_action', response_events);

    let response_resources = await this.$rq.get(route_resource, []);
    this.$store.dispatch('addResources_action', response_resources);
  }
}

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

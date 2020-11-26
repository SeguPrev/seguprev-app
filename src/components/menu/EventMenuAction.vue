<template>
  <div class="content ml-2 px-3 py-2 rounded">
    <notifications group="alert" />
    <vue-confirm-dialog></vue-confirm-dialog>
    <table class="text-center">
      <tr style="width: 100%;">
        <td class="px-5"><small><b>Latitud</b></small></td>
        <td class="px-5"><small><b>Longitud</b></small></td>
      </tr>
      <tr>
        <td class="px-5">
          <small v-if="event">{{ event.lat.toFixed(4) }}...</small>
        </td>
        <td class="px-5">
          <small v-if="event">{{ event.lng.toFixed(4) }}...</small>
        </td>
      </tr>
    </table>

    <form class="mt-3">
      <hr />
      <div class="form-group">
        <table class="text-center">
          <tr>
            <td class="px-2"><small><b>Asesinatos</b></small></td>
            <td class="px-2"><small><b>Violaciones</b></small></td>
            <td class="px-2"><small><b>Balaceras</b></small></td>
            <td class="px-2"><small><b>Robos</b></small></td>
          </tr>
          <tr>
            <td v-if="event" class="px-1">
              <small>{{ event.cases[0] }}</small>
            </td>
            <td v-if="event" class="px-1">
              <small>{{ event.cases[1] }}</small>
            </td>
            <td v-if="event" class="px-1">
              <small>{{ event.cases[2] }}</small>
            </td>
            <td v-if="event" class="px-1">
              <small>{{ event.cases[3] }}</small>
            </td>
          </tr>
        </table>
      </div>

      <div class="content pb-3" v-if="history.length > 0">
        <hr />
        <div class="row pb-1">
          <div class="col-md-6">
            <h6><b>Historial</b></h6>
          </div>
          <div class="col-md-6 text-right pr-3">
            <font-awesome-icon
              icon="toggle-on"
              @click="history = []"
              :style="{ color: 'blue', cursor: 'pointer' }"
            />
          </div>
        </div>
        <div id="history">
          <table>
            <tr>
              <td class="px-2"><small><b>Zona</b></small></td>
              <td class="px-2"><small><b>Delito</b></small></td>
              <td class="px-2"><small><b>Fecha</b></small></td>
            </tr>
            <tr v-for="record in history" v-bind:key="record.id">
              <td class="px-2 py-1">
                <small v-if="user.type == 1">{{ record.zone }}</small>
                <b-form-select
                  v-model="record.zone"
                  :options="zones"
                  size="sm"
                  class="mt-3"
                  v-else
                ></b-form-select>
              </td>
              <td class="px-2 py-1">
                <small v-if="user.type == 1">{{ record.type }}</small>
                <b-form-select
                  v-model="record.type"
                  :options="categories"
                  size="sm"
                  class="mt-3"
                  v-else
                ></b-form-select>
              </td>
              <td class="px-2 py-1">
                <small v-if="user.type == 1">{{ getDate(record.time) }}</small>
                <b-form-datepicker
                  v-model="record.time"
                  class="mt-3"
                  size="sm"
                  boundary="window"
                  v-else
                ></b-form-datepicker>
              </td>
              <td class="px-2 py-1">
                <b-button
                  variant="danger"
                  size="sm"
                  v-if="user.type == 0"
                  @click="remove(record.id)"
                >
                  <font-awesome-icon icon="trash" size="sm" />
                </b-button>
                <b-button
                  variant="warning"
                  size="sm"
                  v-if="user.type == 0"
                  class="ml-2"
                  @click="update(record)"
                >
                  <font-awesome-icon icon="edit" size="sm"></font-awesome-icon>
                </b-button>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="btn-group">
        <b-button variant="primary" size="sm" @click="getHistory()">
          Historial
        </b-button>
        <b-button
          variant="danger"
          size="sm"
          @click="$emit('toggle-menu-action')"
        >
          Cerrar
        </b-button>
      </div>
    </form>
  </div>
</template>

<script>
import Parser from "@/assets/models/parser.model";

export default {
  name: "EventMenuAction",
  data: () => {
    return {
      history: [],
      user: null,
      categories: [],
      zones: [],
    };
  },
  props: ["event"],
  methods: {
    async getHistory() {
      const zones = await this.$rq.get(
        "/event/records?event=",
        Parser.zip(this.event)
      );
      zones.forEach((element) => {
        element.time = new Date(element.time);
        element.time.setDate(element.time.getDate() + 1);
      });
      this.history = zones;
    },
    getDate: function (date) {
      const crimeDate = new Date(date);
      return `${crimeDate.getFullYear()}/${crimeDate.getMonth()}/${crimeDate.getDate()}`;
    },
    remove: function (id) {
      this.$confirm({
        message: `¿Estas seguro de que quieres eliminar este evento?`,
        button: {
          no: "No",
          yes: "Si",
        },
        callback: async (confirm) => {
          if (confirm) {
            const result = await this.$rq.delete(
              "/event",
              Parser.zip({ id: id })
            );
            if (result.length == 0) {
              const index = this.history.findIndex((x) => x.id == id);
              this.history.splice(index, 1);
              if (result) {
                this.$notify({
                  group: "foo",
                  type: "success",
                  title: "Completado!",
                  text: "Evento eliminado con éxito.",
                });
              } else {
                this.$notify({
                  group: "foo",
                  type: "error",
                  title: "Ups!",
                  text: "Lo sentimos, intentelo más tarde.",
                });
              }
            }
          }
        },
      });
    },
    update: async function (event) {
      if(typeof(event.time) === 'object') {
        event.time.setDate(event.time.getDate() - 1);
      }
      const result = await this.$rq.put("/event", Parser.zip(event));
      if (result) {
        this.$notify({
          group: "foo",
          type: "success",
          title: "Completado!",
          text: "Evento modificado con éxito.",
        });
      } else {
        this.$notify({
          group: "foo",
          type: "error",
          title: "Ups!",
          text: "Lo sentimos, intentelo más tarde.",
        });
      }

      this.getHistory();
    },
  },
  created: async function () {
    const userCookie = sessionStorage.getItem("user");
    if (userCookie != null) {
      this.user = JSON.parse(userCookie);
    } else {
      this.$router.push("/");
    }

    const categories = await this.$rq.get("/category/all", []);
    categories.forEach((element) => {
      this.categories.push({ value: element.name, text: element.name });
    });

    const zones = await this.$rq.get("/zone/all", []);
    zones.forEach((element) => {
      this.zones.push({ value: element.name, text: element.name });
    });
  },
};
</script>

<style scoped>
.content {
  background-color: #fff;
}

.btn-group {
  width: 100%;
}

#history {
  height: 200px;
  overflow-y: scroll;
}

table {
  margin: auto;
  text-align: center;
}
</style>

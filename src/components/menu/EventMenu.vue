<template>
  <div class="content ml-2 px-3 py-2 rounded">
    <vue-confirm-dialog></vue-confirm-dialog>
    <notifications group="alert" />
    <table class="text-center">
      <tr>
        <td class="px-5">
          <small><b>Latitud</b></small>
        </td>
        <td class="px-5">
          <small><b>Longitud</b></small>
        </td>
      </tr>
      <tr>
        <td class="px-5">
          <small>{{ coords.lat.toFixed(4) }}...</small>
        </td>
        <td class="px-5">
          <small>{{ coords.lng.toFixed(4) }}...</small>
        </td>
      </tr>
    </table>

    <b-form-group
      label="Tipo"
      label-size="sm"
      class="mt-3"
      style="font-weight: bold"
    >
      <b-form-select
        v-model="selected"
        :options="options"
        size="sm"
      ></b-form-select>
    </b-form-group>

    <form class="mt-3" v-if="!selected">
      <div class="btn-group">
        <b-button variant="primary" size="sm" @click="addResource()">
          Agregar
        </b-button>
        <b-button variant="danger" size="sm" @click="$emit('toggle-menu')">
          Cancelar
        </b-button>
      </div>
    </form>

    <form class="mt-3" v-if="selected">
      <div class="form-group">
        <label for="zones"
          ><small><b>Zonas</b></small></label
        >
        <select
          name="zones"
          id="zones"
          v-model="event_.zone"
          @change="enableNewZone($event)"
          class="form-control form-control-sm"
        >
          <option disabled selected value="">Selecciona una opción</option>
          <option
            v-for="zone in zones"
            v-bind:key="zone.name"
            :value="zone.name"
          >
            {{ zone.name }}
          </option>
          <option value="*">Otro</option>
        </select>
        <input
          type="text"
          placeholder="Zona"
          v-show="newZone"
          v-model="newZoneName"
          class="form-control form-control-sm mt-1"
        />
      </div>

      <div class="form-group">
        <label for="category"
          ><small><b>Categoria</b></small></label
        >
        <select
          name="category"
          id="category"
          v-model="event_.type"
          class="form-control form-control-sm"
        >
          <option disabled selected value="">Selecciona una opción</option>
          <option
            v-for="category in categories"
            v-bind:key="category.name"
            :value="category.name"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="from-group">
        <label for="eventDate"
          ><small><b>Fecha</b></small></label
        >
        <b-form-datepicker
          id="eventDate"
          name="eventDate"
          v-model="eventDate"
          size="sm"
          locale="en"
          class="mb-2"
        >
        </b-form-datepicker>
      </div>

      <div class="btn-group">
        <b-button variant="primary" size="sm" @click="add()">
          Agregar
        </b-button>
        <b-button variant="danger" size="sm" @click="$emit('toggle-menu')">
          Cancelar
        </b-button>
      </div>
    </form>
  </div>
</template>

<script>
import Parser from "@/assets/models/parser.model";
import { Event } from "@/assets/models/event.model";

export default {
  name: "EventMenu",
  data: () => {
    return {
      zones: [],
      categories: [],
      eventDate: "",
      newZoneName: "",

      event_: new Event(),
      newZone: false,

      selected: true,
      options: [
        { value: true, text: "Evento" },
        { value: false, text: "Recurso" },
      ],
    };
  },
  props: ["coords"],
  methods: {
    enableNewZone: function (event) {
      this.newZone = event.target.value === "*";
    },
    add: async function () {
      this.event_.date = this.dateBuild();

      if (this.newZone) {
        console.log("RRRRRR");
        this.$confirm({
          message: `¿Estas seguro de que quieres agregar esta zona?\n\n"${this.newZoneName}"`,
          button: {
            no: "No",
            yes: "Si",
          },
          callback: async (confirm) => {
            if (confirm) {
              if (this.addZone()) {
                this.alert(
                  "success",
                  "Correcto!",
                  "La zona fue agregada exitosamente."
                );
                this.addEvent();
              } else {
                this.alert(
                  "success",
                  "Ups!",
                  "Algo salio mal, intentelo más tarde."
                );
              }
            }
          },
        });
      } else {
        this.addEvent();
      }
    },
    addEvent: async function () {
      if (this.newZone) {
        this.event_.zone = this.newZoneName;
      }

      const response = await this.$rq.post("/event", {
        event: Parser.zip(this.event_),
      });

      if (response.length === 0) {
        this.event_.zone = "";
        this.event_.type = "";
        this.alert(
          "success",
          "Correcto!",
          "El evento fue agregado exitosamente"
        );
      } else {
        this.alert("error", "Ups!", "Algo salio mal, intentelo más tarde.");
      }

      this.$emit("update");
    },
    addZone: async function () {
      const name = this.newZoneName;
      const coords = this.coords;
      let zone = {
        name: name,
        address: "Empty",
        latitude: coords.lat,
        longitude: coords.lng,
      };

      const result = await this.$rq.post("/zone", Parser.zip(zone));
      return result.length == 0;
    },
    addResource: async function () {
      const lat = this.coords.lat;
      const lng = this.coords.lng;
      const response = await this.$rq.post(
        "/resource",
        Parser.zip({
          lat: lat,
          lng: lng,
        })
      );

      if (response.length === 0) {
        this.event_.zone = "";
        this.event_.type = "";
        this.alert(
          "success",
          "Correcto!",
          "El recurso fue agregado exitosamente"
        );
      } else {
        this.alert("error", "Ups!", "Algo salio mal, intentelo más tarde.");
      }

      this.$emit("update");
    },
    alert(type, title, text) {
      this.$notify({
        group: "alert",
        title: title,
        text: text,
      });
    },
    dateBuild() {
      const datePart = this.eventDate.split("-");
      const dating = new Date(datePart[0], datePart[1] - 1, datePart[2]);
      return dating;
    },
  },
  created: function () {},
  mounted: async function () {
    const zones = await this.$rq.get("/zone/all", []);
    const categories = await this.$rq.get("/category/all", []);
    const key_api = "AIzaSyBC5PzXTo9DmOQmkTWlUANfzSgfhyD452Y";
    const url =
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=" +
      key_api;

    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    this.zones = zones;
    this.categories = categories;
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
</style>

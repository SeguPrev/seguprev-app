<template>
  <b-container>
    <b-form @submit.prevent="send_bundle_trainer">
      <h4><b>Entrenamientos</b></h4>

      <b-form-row>
        <b-col cols="3">
          <b-form-group label="Asesinatos">
            <b-form-input type="number" v-model="events.asesinatos">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="3">
          <b-form-group label="Violaciones">
            <b-form-input type="number" v-model="events.violaciones">
            </b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="3">
          <b-form-group label="Balaceras">
            <b-form-input type="number" v-model="events.balaceras">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col class="3">
          <b-form-group label="Robos">
            <b-form-input type="number" v-model="events.robos"> </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col>
          <b-form-group>
            <b-form-select v-model="selected" :options="options">
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-button-group>
        <b-button type="button" variant="primary" @click="add_event()">
          Agregar
        </b-button>
        <b-button type="submit" variant="primary"> Enviar </b-button>
        <b-button type="button" variant="primary" @click="testing()">
          Probar
        </b-button>
        <b-button type="button" variant="primary" @click="save()">
          Guardar
        </b-button>
        <b-button type="button" variant="danger" @click="clean()">
          Limpiar
        </b-button>
        <b-button type="button" variant="secondary" disabled>
          Estado: {{ result }}
        </b-button>
      </b-button-group>
    </b-form>

    <b-container class="show-data">
      <table>
        <tr class="pb-5">
          <td class="px-3" v-for="field in fields" v-bind:key="field">
            <span
              ><b>{{ field }}</b></span
            >
          </td>
        </tr>
        <tr v-for="(events, index) in train_events" v-bind:key="index">
          <td class="px-3" v-for="(event, index) in events" v-bind:key="index">
            <span>{{ event }}</span>
          </td>
        </tr>
      </table>
    </b-container>
  </b-container>
</template>

<script>
export default {
  name: "Trainer",
  data: function () {
    return {
      selected: 0,
      events: {
        asesinatos: "",
        violaciones: "",
        balaceras: "",
        robos: "",
        type: 0,
      },
      options: [
        { value: 0, text: "Urgente" },
        { value: 1, text: "Advertencia" },
        { value: 2, text: "Normal" },
      ],
      fields: ["Asesinatos", "Violaciones", "Balaceras", "Robos", "Prioridad"],
      train_events: [],
      result: "En espera",
    };
  },
  methods: {
    add_event: function () {
      this.events.type = this.selected;
      const clone = [
        parseInt(this.events.asesinatos),
        parseInt(this.events.violaciones),
        parseInt(this.events.balaceras),
        parseInt(this.events.robos),
        this.events.type,
      ];
      this.train_events.push(clone);
    },
    clean: function () {
      this.train_events = [];
      this.result = "En espera";
    },
    save: function () {
      if (this.train_events.length == 0) {
        const route = "/saveconf";
        const response = this.request(route);
        this.result = response.stats == 200 ? "Guardado" : "No se pudo guardar";
      }
    },
    request: async function (route) {
      const response = await this.$rq.post(route, this.train_events);
      return response;
    },
    testing: async function () {
      if (this.train_events.length == 1) {
        const route = "/nn/predict";
        const response = await this.request(route);
        if (response[0] >= 0.5) this.result = "IMPORTANTE";
        else this.result = "NO IMPORTANTE";
      } else {
        this.$notify({
          group: "foo",
          type: "error",
          title: "Ups!",
          text: "Solo puede probar con un caso.",
        });
      }
    },
    send_bundle_trainer: async function () {
      if (this.train_events.length > 0) {
        const route = "/nn/train";

        await this.request(route);
        this.result = "Entrenado";
      }
    },
  },
};
</script>

<style scoped>
h4 {
  margin: 20px 0px;
}

.show-data {
  margin: 10% 0px 20px 0px;
}

#alert {
  position: fixed;
  bottom: 0;
  width: 60%;
  margin-left: 50%;
  left: -23%;
}
</style>

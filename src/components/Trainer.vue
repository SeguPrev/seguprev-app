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
            <b-form-input type="number" v-model="events.robos">
            </b-form-input>
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
        <b-button type="submit" variant="primary">
          Enviar
        </b-button>
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
      <b-table striped hover :items="train_events"></b-table>
    </b-container>
  </b-container>
</template>

<script>
import Requester from '@/res/Requester.js';

export default {
  name: 'Trainer',
  data: function() {
    return {
      selected: 0,
      events: {
        asesinatos: '',
        violaciones: '',
        balaceras: '',
        robos: '',
        type: 0
      },
      options: [
        { value: 0, text: 'Urgente' },
        { value: 1, text: 'Advertencia' },
        { value: 2, text: 'Normal' },
      ],
      train_events: [],
      result: 'En espera',
      requester: new Requester(this.$store.getters.getUrl)
    }
  },
  methods: {
    add_event: function() {
      this.events.type = this.selected;
      const clone = JSON.parse(JSON.stringify(this.events));
      this.train_events.push(clone);
    },
    clean: function() {
      this.train_events = [];
      this.result = 'En espera';
    },
    save: function() {
      if(this.train_events.length == 0) {
        const route = '/saveconf';
        const response = this.request(route);
        this.result = (response.stats == 200) ? 'Guardado' : 'No se pudo guardar';
      }
    },
    request: async function(route) {
      const params = { events: this.train_events };
      const response = await this.requester.post(route, params);
      return response;
    },
    testing: async function() {
      if(this.train_events.length == 1) {
        const route = '/predict';
        const response = await this.request(route);

        const maxim = Math.max.apply(null, response);
        if(response.indexOf(maxim) == 0 || response.indexOf(maxim) == 1)
          this.result = 'IMPORTANTE';
        else
          this.result = 'NO IMPORTANTE';
      }
    },
    send_bundle_trainer: async function() {
      if(this.train_events.length > 0) {
        const route = '/train';

        const json = await this.request(route);
        this.result = (json.stats == 200) ? 'Entrenado' : 'No se pudo entrenar';
      }
    }
  }
}
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

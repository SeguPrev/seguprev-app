<template lang="html">
  <div>
    <h3 class="texto text-center"><b>Registro</b></h3>
    <b-form @submit.prevent="register_me()">
      <b-form-row>
        <b-col cols="6">
          <b-form-group label="Nombre" label-for="name">
            <b-form-input
              id="name"
              name="name"
              placeholder="Nombre"
              type="text"
              v-model="user.name"
              pattern="^[\D\s]{4,20}$"
              required ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="6">
          <b-form-group label="Teléfono" label-for="tel">
            <b-form-input
              id="tel"
              name="tel"
              placeholder="6442459807"
              type="tel"
              v-model="user.tel"
              pattern="^\d{10}$"
              required >
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-group label="Correo electrónico" label-for="email">
        <b-form-input
          placeholder="ejemplo@hotmail.com"
          type="email"
          id="email"
          name="email"
          v-model="user.email"
          pattern="^[a-zA-Z0-9][a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
          required >
        </b-form-input>
      </b-form-group>

      <b-form-group label="Clave" label-for="key">
        <b-form-input
          id="key"
          name="key"
          placeholder="Clave"
          type="text"
          v-model="key"
          pattern="^\w{6,15}$"
          required >
        </b-form-input>
      </b-form-group>

      <div class="form-group">
        <b-button-group>
          <b-button variant="success" type="submit">Registrarme</b-button>
          <b-button variant="outline-success" @click="$emit('change_login')">
            Accceder
          </b-button>
        </b-button-group>
      </div>
    </b-form>
  </div>
</template>

<script>
import Parser from "@/assets/models/parser.model.js";
import User from "@/assets/models/user.model.js";

export default {
  name: "Registro",
  data: () => {
    return {
      user: new User(),
      key: '',
    };
  },
  methods: {
    register_me: async function() {
      this.user.password = 'seguprev2020';
      this.user.type = 1;

      let response = await this.$rq.post('/user', {
        user: Parser.zip(this.user),
        key: [{
          name: 'key',
          value: this.key
        }]
      });

      if(response.length == 0) {
        sessionStorage.setItem('user', JSON.stringify(this.user));
        this.$router.push('/central');
      } else {
        this.$notify({
          group: "foo",
          type: "error",
          title: "Algo salió mal!",
          text: "Ingrese una clave de usuario valida.",
        });
      }
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 20px 0px 30px 0px;
}
.form-row {
  margin: 10px 0px 0px 0px;
}
.btn-group {
  width: 100%;
  margin-top: 10%;
}

#email {
  width: 100%;
}
</style>

<template lang="html">
    <div>
      <h3 class = "texto text-center"><b>Registro</b></h3>
        <b-form @submit.prevent="register_me($event)">
          <b-form-row>
            <b-col cols="6">

              <b-form-group label="Nombre" label-for="name">
                <b-form-input id="name" name="name" placeholder="Nombre" type="text"
                  pattern="^[\D\s]{4,20}$" required></b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="6">
              <b-form-group label="Teléfono" label-for="tel">
                <b-form-input id="tel" name="tel" placeholder="6442459807" type="tel"
                  pattern="^\d{10}$" required>
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-form-group label="Correo electrónico" label-for="email">
            <b-form-input placeholder="ejemplo@hotmail.com" type="email" id="email" name="email"
              pattern="^[a-zA-Z0-9][a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" required>
            </b-form-input>
          </b-form-group>

          <b-form-group label="Clave" label-for="key">
            <b-form-input id="key" name="key" placeholder="Clave" type="text"
              pattern="^\w{6,15}$" required>
            </b-form-input>
          </b-form-group>

          <div class="form-group">
            <b-button-group>
              <b-button variant="success" type="submit">Registrarme</b-button>
              <b-button variant="outline-success" @click="$emit('change_login')">Accceder</b-button>
            </b-button-group>
          </div>
      </b-form>

    </div>
</template>

<script>
import User from '@/res/User.js';

export default {
  name: 'Registro',
  methods: {
    register_me: async function(event) {
      const URL = this.$store.getters.getUrl + '/api/addUsuario';
      const build_user = {
        email: event.target.email.value,
        name: event.target.name.value,
        pass: 'seguprev2020',
        tel: event.target.tel.value,
        type: 1
      };

      const user = new User();
      user.init(build_user);

      const bundle = JSON.stringify({
        user: user.template,
        key: [{
          name: 'key',
          type: 12,
          value: event.target.key.value
        }]
      });

      const options = {
        method: 'POST',
        body: bundle,
        headers: {
          'Content-Type': 'application/json'
        }
      };
console.log(user.template);
      let response = await fetch(URL, options);
      let json = await response.json();
      console.log(json);
    }
  }
}
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

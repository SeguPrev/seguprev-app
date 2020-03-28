<template>
  <b-container>
    <b-form @submit.prevent="update_user($event)">
      <h4><b>Perfil</b></h4>

      <b-form-row>
        <b-col>
          <b-form-group label="Nombre" label-for="name" class="">
            <b-form-input type="text" name="name" id="name"
              placeholder="Mauricio Arambula" v-model="user.Nombre"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Teléfono">
            <b-form-input type="tel" name="tel" id="tel" v-model="user.Telefono"
              placeholder="6442635472">
            </b-form-input></b-form-group>
        </b-col>
      </b-form-row>

      <b-form-group label="Correo electrónico" label-for="email">
        <b-form-input type="email" name="email" id="email" v-model="user.email"
          placeholder="ejemplo@gmail.com"></b-form-input>
      </b-form-group>

      <b-form-row>
        <b-col>
          <b-form-group label="Contraseña" label-for="pass">
            <b-form-input type="password" name="pass" id="pass" v-model="user.Pass"
              placeholder="************"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Tipo de usuario">
            <b-form-select v-model="user.Tipo" :options="type_users" disabled>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-group class="text-dark" label="** No hay respaldo de los datos modificados">
      </b-form-group>

      <b-button block variant="primary">Cambiar</b-button>
    </b-form>
  </b-container>
</template>

<script>
import User from '@/res/User.js';
export default {
  name: 'User',
  data: function() {
    return {
      user: JSON.parse(sessionStorage.getItem('user')),
      type_users: [
        {value: 0, text: 'Admin'},
        {value: 1, text: 'Empleado'}
      ]
    }
  },
  methods: {
    update_user: async function(event) {
      const URL = this.$store.getters.getUrl + '/api/updateUsuario';

      const template = {
        email: event.target.email.value,
        name: event.target.name.value,
        pass: event.target.pass.value,
        tel: event.target.tel.value,
        type: this.user.type
      };

      const options = {
        method: 'POST',
        body: JSON.stringify({ user: user }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const user = new User();
      user.init(template);

      const response = await fetch(URL, options);
      const json = await response.json();
      console.log(json);
    }
  },
  mounted: function() {
    console.log(this.user);
  }
}
</script>

<style scoped>
h4 {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>

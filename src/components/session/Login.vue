<template>
  <div>
    <h3 class="text-center"><b>Iniciar Sesión</b></h3>
    <b-form class="login-form" v-on:submit.prevent="buildUser($event)">

      <b-form-group
        label="Correo electrónico"
        label-for="email">

        <b-form-input
          type="email"
          id="email"
          name="email"
          v-model="user.email"
          placeholder="ejemplo@hotmail.com"
          required >
        </b-form-input>

      </b-form-group>

      <b-form-group
        label="Contraseña"
        label-for="pass">

        <b-form-input
          type="password"
          id="pass"
          name="pass"
          minlength="6"
          v-model="user.password"
          placeholder="************"
          required >
        </b-form-input>

      </b-form-group>

      <b-form-group>
        <b-form-checkbox id="rememberme" v-model="remember"
          name="checkbox-1" value="accepted" unchecked-value="no-accepted">
          Recuerdame
        </b-form-checkbox>
      </b-form-group>

      <b-form-group>
        <b-button-group>
          <b-button variant="success" type="submit">Acceder</b-button>
          <b-button variant="outline-success" @click="$emit('change_register')">Registrarme</b-button>
        </b-button-group>
      </b-form-group>
    </b-form>
  </div>

</template>

<script>
import Parser from '@/assets/models/parser.model.js';
import User from '@/assets/models/user.model.js';

export default {
  name: 'Login',
  data: function() {
    return {
      user: new User(),
      remember: '',
    }
  },
  methods: {
    buildUser: async function (){
      let response = await this.$rq.post("/session/login", Parser.zip(this.user));
      sessionStorage.setItem('user', JSON.stringify(response));
      this.$router.push('/central');
    }
  }
}
</script>
<style scoped>
h3 {
  margin: 20px 0px 30px 0px;
}
label {
  text-align: left;
}
.btn-group {
  width: 100%;
  margin-top: 25%;
}
</style>

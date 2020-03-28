<template>
  <div>
    <h3 class="text-center"><b>Iniciar Sesión</b></h3>
    <b-form class="login-form" v-on:submit.prevent="buildUser($event)">

      <b-form-group label="Correo electrónico" label-for="email">
        <b-form-input type="email" id="email" name="email"
          placeholder="ejemplo@hotmail.com" required></b-form-input>
      </b-form-group>

      <b-form-group label="Contraseña" label-for="pass">
        <b-form-input type="password" id="pass" name="pass"
          placeholder="************" minlength="6" required ></b-form-input>
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
import User from '@/res/User.js';

export default {
  name: 'Login',
  data: function() {
    return {
      remember: '',
    }
  },
  methods: {
    buildUser: async function (event){
      let user = new User();
      const email = event.target.email.value;
      const password = event.target.pass.value;
      const url = this.$store.getters.getUrl + '/api/getLogin';

      user.init({
        email: email,
        pass: password
      });

      const options = {
        method: 'POST',
        body: JSON.stringify({ user: user.template }),
        headers:{
          'Content-Type': 'application/json'
        }
      };

      let response = await fetch(url, options);
      let json= await response.json();
      console.log(json);
      sessionStorage.setItem('user', JSON.stringify(json));
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

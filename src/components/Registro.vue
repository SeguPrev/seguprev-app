<template lang="html">
    <div>
      <h3 class = "texto text-center"><b>Registro</b></h3>
        <b-form @submit="registrarse()">
          <b-form-row>
            <b-col cols="6">

              <b-form-group label="Nombre" label-for="name">
                <b-form-input placeholder="Nombre" type="text"
                  pattern="^[\D\s]{4,20}$" required></b-form-input>
              </b-form-group>
            </b-col>

            <b-col cols="6">
              <b-form-group label="Teléfono">
                <b-form-input placeholder="6442459807" type="tel"
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

          <b-form-group label="Clave">
            <b-form-input class="form-control" placeholder="Clave" type="text"
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
export default {
  name: 'Registro',
  beforeCreate: async function(){
    const API_KEY = 'AIzaSyBC5PzXTo9DmOQmkTWlUANfzSgfhyD452Y';
    const url= 'https://maps.googleapis.com/maps/api/geocode/json?address=Winnetka&key=' + API_KEY;

    let response = await fetch(url);
    let json = await response.json();
    console.log(json);
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

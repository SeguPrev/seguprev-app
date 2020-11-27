<template>
  <b-container>
    <b-form @submit.prevent="update_user($event)">
      <h4><b>Perfil</b></h4>

      <b-form-row>
        <b-col>
          <b-form-group label="Nombre" label-for="name" class="">
            <b-form-input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Mauricio Arambula"
              v-model="user.name"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Teléfono">
            <b-form-input
              type="tel"
              name="tel"
              id="tel"
              required
              v-model="user.tel"
              placeholder="6442635472"
            >
            </b-form-input
          ></b-form-group>
        </b-col>
      </b-form-row>

      <b-form-group label="Correo electrónico" label-for="email">
        <b-form-input
          type="email"
          name="email"
          id="email"
          required
          v-model="user.email"
          placeholder="ejemplo@gmail.com"
        ></b-form-input>
      </b-form-group>

      <b-form-row>
        <b-col>
          <b-form-group label="Contraseña" label-for="pass">
            <b-form-input
              type="password"
              name="pass"
              id="pass"
              required
              v-model="user.password"
              placeholder="************"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Tipo de usuario">
            <b-form-select v-model="user.type" :options="type_users" disabled>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-group
        class="text-dark"
        label="** No hay respaldo de los datos modificados"
      >
      </b-form-group>
      <input type="submit" value="Cambiar" class="btn btn-primary btn-block">
    </b-form>
  </b-container>
</template>

<script>
import Parser from "@/assets/models/parser.model.js";
export default {
  name: "User",
  data: function() {
    return {
      user: JSON.parse(sessionStorage.getItem("user")),
      type_users: [
        { value: 0, text: "Admin" },
        { value: 1, text: "Empleado" },
      ],
    };
  },
  methods: {
    update_user: async function() {
      const route = "/user";
      const response = await this.$rq.put(route, Parser.zip(this.user));
      if(response !== null) {
        sessionStorage.setItem('user', JSON.stringify(this.user));
        this.$notify({
          group: 'foo',
          type: 'success',
          title: 'Completado!',
          text: 'Los cambios se han guardado con éxito.'
        });
      }
    },
  }
};
</script>

<style scoped>
h4 {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>

<template>
  <b-container class="pt-3">
    <vue-confirm-dialog></vue-confirm-dialog>
    <h4><b>Empleados</b></h4>

    <b-form inline class="mt-4 mb-5" @submit.prevent="genKey()">
      <b-form-group label-size="sm" label="Generar nueva clave">
        <b-input disabled size="sm" v-model="key"> </b-input>
        <b-button class="ml-1" variant="success" size="sm" @click="genKey()">
          Generar
        </b-button>
      </b-form-group>
    </b-form>

    <table>
      <tr>
        <td class="px-3">
          <small><b>Correo electrónico</b></small>
        </td>
        <td class="px-3">
          <small><b>Nombre</b></small>
        </td>
        <td class="px-3">
          <small><b>Tel.</b></small>
        </td>
        <td></td>
      </tr>
      <tr v-for="employee in employees" v-bind:key="employee.email">
        <td class="px-3 py-1">
          <small>{{ employee.email }}</small>
        </td>
        <td class="px-3 py-1">
          <small>{{ employee.name }}</small>
        </td>
        <td class="px-3 py-1">
          <small>{{ employee.tel }}</small>
        </td>
        <td class="px-3 py-1">
          <b-button variant="danger" size="sm" @click="removeUser(employee)">
            <font-awesome-icon icon="trash" size="sm" />
          </b-button>
        </td>
      </tr>
    </table>
  </b-container>
</template>

<script>
import Parser from "@/assets/models/parser.model";
export default {
  name: "Employees",
  data: () => {
    return {
      key: "",
      employees: [],
    };
  },
  methods: {
    genKey: async function () {
      this.key = await this.$rq.post("/session/key", []);
    },
    removeUser: async function (employee) {
      this.$confirm({
        message: `¿Estas seguro de que quieres eliminar a este empleado?`,
        button: {
          no: "No",
          yes: "Si",
        },
        callback: async (confirm) => {
          if (confirm) {
            const result = await this.$rq.delete("/user", Parser.zip(employee));
            const index = this.employees.findIndex(
              (x) => x.email == employee.email
            );
            this.employees.splice(index, 1);
            if (result) {
              this.$notify({
                group: "foo",
                type: "success",
                title: "Completado!",
                text: "Empleado eliminado con exito.",
              });
            } else {
              this.$notify({
                group: "foo",
                type: "error",
                title: "Ups!",
                text: "Lo sentimos, intentelo más tarde.",
              });
            }
          }
        },
      });
    },
  },
  created: async function () {
    this.employees = await this.$rq.get("/user/employee", []);
  },
};
</script>

<style scoped>
</style>
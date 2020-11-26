<template>
  <div class="content ml-2 px-3 py-2 rounded">
    <table class="text-center">
      <tr>
        <td class="px-5"><small><b>Latitud</b></small></td>
        <td class="px-5"><small><b>Longitud</b></small></td>
      </tr>
      <tr>
        <td class="px-5">
          <small v-if="event">{{ event.latitude.toFixed(4) }}...</small>
        </td>
        <td class="px-5">
          <small v-if="event">{{ event.longitude.toFixed(4) }}...</small>
        </td>
      </tr>
    </table>

    <b-button-group style="width: 100%" class="mt-3">
      <b-button variant="danger" size="sm" @click="remove()">Borrar</b-button>
      <b-button variant="secondary" size="sm" @click="$emit('toggle-menu-action')">Cerrar</b-button>
    </b-button-group>
  </div>
</template>

<script>
import Parser from '@/assets/models/parser.model';
export default {
  name: "ResourceMenu",
  props: ["event"],
  methods: {
    remove: async function () {
      const result = await this.$rq.delete("/resource", Parser.zip(this.event));
      if (result.length == 0) {
        if (result) {
          this.$notify({
            group: "foo",
            type: "success",
            title: "Completado!",
            text: "Recurso eliminado con éxito.",
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
  },
};
</script>

<style scoped>
.content {
  background-color: #fff;
}
</style>
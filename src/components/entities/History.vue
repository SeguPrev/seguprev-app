<template>
  <b-container class="pt-3">
    <vue-confirm-dialog></vue-confirm-dialog>
    <h4><b>Historial</b></h4>

    <b-form-group label="Fecha" label-size="sm" class="mt-4">
      <b-form-datepicker v-model="date" class="mb-2"></b-form-datepicker>
    </b-form-group>

    <b-container v-if="records.length > 0">
      <b-row v-for="record in records" v-bind:key="record.zone" class="mb-3">
        <b-col>{{ record.zone }}</b-col>
        <b-col class="text-right">
          <font-awesome-icon
            icon="trash"
            class="mr-3"
            @click="removeZone(record.zone)"
            :style="{ color: 'red', cursor: 'pointer' }"
          />
          <font-awesome-icon
            icon="angle-down"
            v-show="selected != record.zone"
            @click="selected = record.zone"
            :style="{ color: 'blue', cursor: 'pointer' }"
          />
          <font-awesome-icon
            icon="angle-up"
            @click="selected = ''"
            v-show="selected == record.zone"
            :style="{ color: 'blue', cursor: 'pointer' }"
          />
        </b-col>
        <b-container v-show="selected == record.zone" class="px-5">
          <b-row
            v-for="event in record.records"
            v-bind:key="event.id"
            class="py-1"
          >
            <b-col
              ><small>{{ event.id }}</small></b-col
            >
            <b-col
              ><small>{{ event.zone }}</small></b-col
            >
            <b-col
              ><small>{{ event.type }}</small></b-col
            >
            <b-col
              ><small>{{
                `${event.time.split("-")[0]}-${event.time.split("-")[1]}-${
                  event.time.split("-")[2].split("T")[0]
                }`
              }}</small></b-col
            >
            <b-col
              ><small
                ><b-button
                  variant="danger"
                  size="sm"
                  @click="removeEvent(event.zone, event.id)"
                >
                  <font-awesome-icon icon="trash" /> </b-button></small
            ></b-col>
          </b-row>
        </b-container>
      </b-row>
    </b-container>

    <b-container v-else class="text-center mt-5">
        <font-awesome-icon icon="box-open" :style="{ color: '#ccc', 'font-size': '100px' }" />
        <p>No se han encontrado registros</p>
    </b-container>
  </b-container>
</template>

<script>
import Parser from "@/assets/models/parser.model";
export default {
  name: "History",
  data: () => {
    return {
      records: [],
      date: "",
      selected: "",
      filterSearchEvents: "",
      filterSearchRecords: "",
    };
  },
  computed: {
    filterEvents: function () {
      return null;
    },
    filterRecords: function () {
      return null;
    },
  },
  methods: {
    removeZone: function (zone) {
      this.$confirm({
        message: `Al eliminar una zona se eliminaran los eventos sucedidos en ella, ¿Estas seguro?`,
        button: {
          no: "No",
          yes: "Si",
        },
        callback: async (confirm) => {
          if (confirm) {
            const result = await this.$rq.delete(
              "/zone",
              Parser.zip({ zone: zone })
            );
            if (result.length == 0) {
              const index = this.records.findIndex((x) => x.zone == zone);
              this.records.splice(index, 1);
              if (result) {
                this.$notify({
                  group: "foo",
                  type: "success",
                  title: "Completado!",
                  text: "Zona eliminada con exito.",
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
          }
        },
      });
    },
    removeEvent: function (zone, id) {
      this.$confirm({
        message: `¿Estas seguro de que quieres eliminar este evento?`,
        button: {
          no: "No",
          yes: "Si",
        },
        callback: async (confirm) => {
          if (confirm) {
            const result = await this.$rq.delete(
              "/event",
              Parser.zip({ id: id })
            );
            if (result.length == 0) {
              const index = this.records
                .find((x) => x.zone == zone)
                .records.findIndex((x) => x.id == id);
              this.records.find((x) => x.zone == zone).records.splice(index, 1);
              if (result) {
                this.$notify({
                  group: "foo",
                  type: "success",
                  title: "Completado!",
                  text: "Evento eliminado con éxito.",
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
          }
        },
      });
    },
    getData: async function () {
        this.records = [];
      const day = this.date.split("-")[2];
      const month = this.date.split("-")[1];
      const year = this.date.split("-")[0];
      let events = await this.$rq.get(
        `/event/all/np?day=${day}&month=${month-1}&year=${year}`,
        []
      );
      for (const event of events) {
        const records = await this.$rq.get(
          `/event/records?event=`,
          Parser.zip(event)
        );
        this.records.push({
          zone: event.zone,
          records: records,
        });
      }
    },
  },
  watch: {
      date: async function() {
          await this.getData();
      }
  },
  created: async function () {
    const today = new Date();
    this.date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
  },
};
</script>

<style scoped>
.section {
  box-shadow: #ccc 2px 20px 2px;
}

p {
    color: #ccc;
}
</style>

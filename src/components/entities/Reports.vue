<template>
  <b-container class="pt-3">
    <h4><b>Reportes</b></h4>

    <b-card no-body class="mt-5">
      <b-tabs card>
        <b-tab title="Delitos" active>
          <b-card-text
            >* Reporte de datos utilizados para predicción de una
            fecha</b-card-text
          >
          <label for="date-report">Fecha</label>
          <b-form-datepicker id="date-report" v-model="dateReport" class="mb-2">
          </b-form-datepicker>
          <b-button variant="info" block @click="genReportCrime()"
            >Descargar</b-button
          >
        </b-tab>
        <b-tab title="Recursos">
          <b-card-text
            >* Reporte de datos de los recursos disponibles</b-card-text
          >
          <b-button variant="info" block @click="genReportResources()"
            >Descargar</b-button
          >
        </b-tab>
        <b-tab title="Usuarios">
          <b-card-text>* Reporte de datos de usuarios</b-card-text>
          <b-button variant="info" block @click="genReportUsers()">
            Descargar
          </b-button>
        </b-tab>
      </b-tabs>
    </b-card>
  </b-container>
</template>

<script>
import Parser from "@/assets/models/parser.model";
import PdfGenerator from "@/assets/models/pdf.model";
export default {
  name: "Reports",
  data: () => {
    return {
      dateReport: new Date(Date.now()),
      events: [],
    };
  },
  methods: {
    genReportCrime: async function () {
      this.events = this.records = [];
      const datePart = this.dateReport.split("-");
      const result = await this.$rq.get(
        `/event/all?day=${datePart[2]}&month=${datePart[1] - 1}&year=${
          datePart[0]
        }`,
        []
      );

      if (result.length > 0) {
        for (const event of result) {
          const zones = await this.$rq.get(
            "/event/records?event=",
            Parser.zip(event)
          );

          this.events.push({
            event: event,
            records: zones,
          });
        }
      }

      let formatEvents = [];
      let formatRecords = [];
      this.events.forEach((event) => {
        const keys = Object.keys(event.event);
        let data = [];
        keys.forEach((key) => {
          data.push(event.event[key]);
        });

        const format1 = {
          margin: { top: 50 },
          head: [["Zona", "Latitud", "Longitud", "Casos"]],
          body: [data],
        };

        let records = [];
        event.records.forEach((record) => {
          const keys = Object.keys(record);
          let data = [];
          keys.forEach((key) => {
            data.push(record[key]);
          });
          records.push(data);
        });
        const format2 = {
          head: [["ID", "Zona", "Crimen", "Fecha"]],
          body: records,
        };

        formatEvents.push(JSON.parse(JSON.stringify(format1)));
        formatRecords.push(JSON.parse(JSON.stringify(format2)));
      });

      let header = `Reporte de datos utilizados para la predicción de delitos de un caso individual\n`;
      PdfGenerator.genPdf(
        formatEvents,
        formatRecords,
        header,
        "seguprev_events_report"
      );
    },
    genReportResources: function () {
      const user = JSON.parse(sessionStorage.getItem("user"));
      const keys = Object.keys(user);
      let dataUser = [[]];
      keys.forEach((key) => {
        dataUser[0].push(user[key]);
      });

      const resources = this.$store.getters.getResources;
      let data = [];
      resources.forEach((resource) => {
        let attrs = [];
        const keys = Object.keys(resource);
        keys.forEach((key) => {
          if (key === "type") {
            attrs.push(resource[key] == 1 ? "Empleado" : "Administrador");
          } else {
            attrs.push(resource[key]);
          }
        });
        data.push(JSON.parse(JSON.stringify(attrs)));
      });

      const formatData2 = {
        head: [["ID", "Latitud", "Longitud"]],
        body: data,
      };
      const formatData1 = {
        margin: { top: 50 },
        head: [["Correo electrónico", "Nombre", "Tel", "Tipo"]],
        body: dataUser,
      };
      let header = `Reporte de datos de los recursos disponibles. Descargado por: ${user.name}`;
      PdfGenerator.genPdf(
        [formatData1],
        [formatData2],
        header,
        "seguprev_resources_report"
      );
    },
    genReportUsers: async function () {
      const usera = JSON.parse(sessionStorage.getItem("user"));
      const users = await this.$rq.get("/user/all", []);
      let data = [];
      let dataAdmin = [];
      users.forEach((user) => {
        let attrs = [];
        const keys = Object.keys(user);
        keys.forEach((key) => {
          if (key === "type") {
            attrs.push(user[key] == 1 ? "Empleado" : "Admin");
          } else if(key !== 'password'){
            attrs.push(user[key]);
          }
        });

        if (user["type"] == 0) {
          dataAdmin.push(attrs);
        } else {
          data.push(attrs);
        }
      });

      const formatData1 = {
        margin: { top: 50 },
        head: [["Correo electrónico", "Nombre", "Tel", "Tipo"]],
        body: dataAdmin,
      };

      const formatData2 = {
        margin: { top: 50 },
        head: [["Correo electrónico", "Nombre", "Tel", "Tipo"]],
        body: data,
      };
      let header = `Reporte de datos de los usuarios disponibles. Descargado por: ${usera.name}`;
      PdfGenerator.genPdf(
        [formatData1],
        [formatData2],
        header,
        "seguprev_users_report"
      );
    },
  },
  created: function () {
    this.dateReport = `${this.dateReport.getFullYear()}-${
      this.dateReport.getMonth() + 1
    }-${this.dateReport.getDate()}`;
  },
};
</script>

<style scoped>
</style>
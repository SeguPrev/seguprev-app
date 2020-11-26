<template>
  <b-container class="pt-3">
    <h4><b>Respaldo</b></h4>

    <b-row>
      <b-col class="pt-5">
        <b-form @submit.prevent="downloadBackup()">
          <b-form-group label="Descargar respaldo" label-for="download">
            <b-input
              disabled
              name="download"
              class="text-center"
              :value="getBackupName"
            >
            </b-input>
            <input
              type="submit"
              value="Descargar"
              class="btn btn-success btn-block mt-2"
            />
          </b-form-group>
        </b-form>
      </b-col>
      <b-col class="pt-5">
        <b-form @submit.prevent="uploadBackup()">
          <b-form-group label="Restaurar respaldo" label-for="upload">
            <b-form-file
              name="upload"
              v-model="file"
              placeholder="Elige un archivo o sueltalo aqui..."
              drop-placeholder="Suelta un archivo"
            ></b-form-file>
            <input
              type="submit"
              value="Restaurar"
              class="btn btn-success btn-block mt-2"
            />
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>

    <a href="#" id="downloadAnchorElem"></a>
  </b-container>
</template>

<script>
export default {
  name: "Backup",
  data: () => {
    return {
      actualDate: new Date(),
      file: null,
    };
  },
  methods: {
    downloadBackup: async function () {
      const backup = await this.$rq.get("/backup", []);
      if (backup) {
        var dataStr =
          "data:text/json;charset=utf-8," +
          encodeURIComponent(JSON.stringify(backup));
        var dlAnchorElem = document.getElementById("downloadAnchorElem");
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", `${this.getBackupName}-seguprev-backup.json`);
        dlAnchorElem.click();
      }
    },
    uploadBackup: async function() {
      const result = await fetch("http://localhost:5000/api/backup", { method: 'POST', body: this.file });
      console.log(result);
    }
  },
  computed: {
      getBackupName: function() {
          return `${this.actualDate.getFullYear()}/${this.actualDate.getMonth()}/${this.actualDate.getDate()}`;
      }
  }
};
</script>

<style scoped>
</style>
<template>
  <div class="profile">
    <b-navbar variant="light">
      <b-container>
        <b-navbar-nav>
          <b-nav-item @click="$router.push('central')">
            <img
              src="https://image.flaticon.com/icons/svg/630/630615.svg"
              alt="maxico-flag"
              width="30px"
            />
          </b-nav-item>
          <b-nav-item @click="$router.push('central')">
            <b>SeguPrev</b>
          </b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>

    <b-container>
      <b-row>
        <b-col cols="2" id="aside">
          <h6 class="text-primary">Configuraciones</h6>
          <b-list-group flush>
            <b-list-group-item class="li-item">
              <b-button block class="option-btn" @click="section = 'profile'"
                >Perfil</b-button
              >
            </b-list-group-item>
            <b-list-group-item class="li-item">
              <b-button block class="option-btn" @click="section = 'train'"
                >Entrenar</b-button
              >
            </b-list-group-item>
            <b-list-group-item class="li-item">
              <b-button block class="option-btn" @click="section = 'backup'"
                >Respaldo</b-button
              >
            </b-list-group-item>
            <b-list-group-item class="li-item" v-show="isAdmin">
              <b-button block class="option-btn" @click="section = 'employees'"
                >Empleados</b-button
              >
            </b-list-group-item>
            <b-list-group-item class="li-item">
              <b-button block class="option-btn" @click="section = 'reports'"
                >Reportes</b-button
              >
            </b-list-group-item>
            <b-list-group-item class="li-item" v-show="isAdmin">
              <b-button block class="option-btn" @click="section = 'history'"
                >Historial</b-button
              >
            </b-list-group-item>
            <b-list-group-item class="li-item">
              <b-button block class="option-btn" @click="$router.push('/about')"
                >Ayuda</b-button
              >
            </b-list-group-item>
            <b-list-group-item class="li">
              <b-button variant="danger" block @click="logout()" class="mt-3"
                >Salir</b-button
              >
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col>
          <User v-if="section == 'profile' && isAuth"></User>
          <Trainer v-else-if="section == 'train' && isAuth"></Trainer>
          <Backup v-else-if="section == 'backup' && isAuth"></Backup>
          <Employees v-else-if="section == 'employees' && isAuth"></Employees>
          <Reports v-else-if="section == 'reports' && isAuth"></Reports>
          <History v-else-if="section == 'history' && isAuth"></History>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import User from "@/components/entities/User.vue";
import Trainer from "@/components/entities/Trainer.vue";
import Backup from "@/components/entities/Backup.vue";
import Employees from "@/components/entities/Employees.vue";
import Reports from "@/components/entities/Reports.vue";
import History from "@/components/entities/History.vue";

export default {
  name: "Profile",
  data: function () {
    return {
      section: "profile",
      user: null,
    };
  },
  computed: {
    isAdmin: function() {
      if(this.user) {
        return this.user.type == 0;
      }
      return false;
    },
    isAuth: function() {
      return (this.user != null);
    }
  },
  methods: {
    logout: function() {
      sessionStorage.clear();
      this.$router.push('/');
    }
  },
  components: {
    User,
    Trainer,
    Backup,
    Employees,
    Reports,
    History,
  },
  created: function () {
    const userCookie = sessionStorage.getItem("user");
    if (userCookie != null) {
      this.user = JSON.parse(userCookie);
    } else {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
#aside {
  border-right: 1px solid #e0e0e0;
}
h6 {
  margin-top: 20px;
}

.option-btn {
  color: rgba(0, 0, 0, 0.6);
  border: none;
  outline: none;
  padding: 12px;
  text-align: justify;
  background-color: transparent;
}

.li-item {
  padding: 0px;
  transition: ease-in-out 200ms;
}
.li-item:hover {
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.1);
}

.li {
  padding: 0px;
  transition: ease-in-out 200ms;
}
</style>

<template>
  <div class="profile">
    <b-navbar variant="light">
      <b-container>
        <b-navbar-nav>
          <b-nav-item>
            <img src="https://image.flaticon.com/icons/svg/630/630615.svg" 
              alt="maxico-flag" width="30px">
            </b-nav-item>
          <b-nav-item><b>SeguPrev</b></b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>

    <b-container>
      <b-row>
        <b-col cols="2" id="aside">
          <h6 class="text-primary">Configuraciones</h6>
          <b-list-group flush>
            <b-list-group-item>
              <b-button block class="option-btn" @click="section = 'profile'">Perfil</b-button>
            </b-list-group-item>
            <b-list-group-item>
              <b-button block class="option-btn" @click="section = 'train'">Entrenar</b-button>
            </b-list-group-item>
            <b-list-group-item>
              <b-button block class="option-btn" @click="section = 'backup'">Respaldo</b-button>
            </b-list-group-item>
            <b-list-group-item>
              <b-button block class="option-btn">Distribucion</b-button>
            </b-list-group-item>
            <b-list-group-item>
              <b-button block class="option-btn">Ayuda</b-button>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col>
          <User v-if="section == 'profile'"></User>
          <Trainer v-else></Trainer>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import User from '@/components/User.vue';
import Trainer from '@/components/Trainer.vue';

export default {
  name: 'Profile',
  data: function() {
    return {
      section: 'train',
    }
  },
  components: {
    User,
    Trainer
  }
}
</script>

<style scoped>
#aside {
  border-right: 1px solid #E0E0E0;
} h6 {
  margin-top: 20px;
}

.option-btn {
  color: rgba(0,0,0,.6);
  border: none;
  padding: 0;
  text-align: justify;
  background-color: transparent;
}
</style>

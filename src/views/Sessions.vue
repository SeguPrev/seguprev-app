<template lang = "html">
  <section class="login-block">
    <div class="wallpaper"></div>
    <div class="space">
      <div class="container">
        <table>
          <tr>
            <td>
              <img src="https://image.flaticon.com/icons/svg/630/630615.svg" 
                alt="maxico-flag" width="30px">
            </td>
            <td>
              <strong><span class="text-light">SEGUPREV</span></strong>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div id="marco" class="container">
      <div class="row">
        <div class="col-md-4 login-sec">
          <Login v-if="login" @change_register="login=false" />
          <Registro v-else @change_login="login=true"/>
        </div>

        <div class="col-md-8 banner-sec">
          <b-carousel id="carousel-no-animation" style="text-shadow: 0px 0px 2px #000"
            no-animation indicators>

            <b-carousel-slide>
              <img slot="img" src="../assets/images/1.jpg" width="100%" height="450px">
            </b-carousel-slide>
            <b-carousel-slide>
              <img slot="img" src="../assets/images/2.png" width="100%" height="450px">
            </b-carousel-slide>
            <b-carousel-slide>
              <img slot="img" src="../assets/images/3.jpg" width="100%" height="450px">
            </b-carousel-slide>
          </b-carousel>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import Login from '@/components/Login.vue';
import Registro from '@/components/Registro.vue';
export default{
  name: 'inicio',
  data: function (){
    return{
      login: true
    }
  },
  components: {
    Login,
    Registro
  }
}

</script>

<style scoped>
.space {
  height: 15%;
} .space .container {
  padding-top: 30px;
} .space table tr td {
  padding: 0px 5px;
} .space span {
  font-size: 20px;
}

.banner-sec {
  padding: 0;
}

img {
  border-radius: 0px 5px 5px 0px;
}

strong {
  padding: 30px 0px 0px 0px;
}

#marco {
  box-shadow: -1px 3px 18px 6px rgba(0,0,0,0.5);
  border-radius: 6px;
  background-color: white;
  margin-top: 5%;
}

.wallpaper {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-image: url("../assets/images/blur-wallpaper.jpg");
}
</style>

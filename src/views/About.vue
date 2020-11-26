<template>
  <div class="about">
    <div id="logo" class="container" @click="$router.push('/central')">
      <table>
        <tr>
          <td>
            <img
              src="https://image.flaticon.com/icons/svg/630/630615.svg"
              alt="maxico-flag"
              width="30px"
            />
          </td>
          <td>
            <strong><span class="text-light">SEGUPREV</span></strong>
          </td>
        </tr>
      </table>
    </div>

    <b-container class="mt-5">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Mapa" active>
            <b-container>
              <nav>
                <ul>
                  <li>
                    <p><b>¿Por qué el mapa se ve obscuro?</b></p>
                    <p>
                      El mapa se torna obscuro cuando la licencia de Google Maps
                      vence y no ha sido renovada. Para renovarla tiene que ir a
                      la Google Console y hacer el pago correspondiente.
                    </p>
                  </li>
                  <li>
                    <p><b>¿Por qué no se muestran las zonas en el mapa?</b></p>
                    <p>
                      Primero asegurese de que hay registros de eventos sucedidos en esa 
                      zona. Si se encuentrar registros y no se muestra en el mapa puede 
                      ser que el sistema no lo detecta como un caso crítico, si dentro 
                      de los parametros el sistema debería detectarlo como uno, entonces 
                      haría falta poner a entrenar al sistema en la sección "Entrenar" de 
                      la página de "Perfil", para más información contactenos.
                    </p>
                  </li>
                  <li>
                    <p><b>¿Cómo puedo ver por qué el sistema seleccionó un caso como crítico?</b></p>
                    <p>
                      Puede dirigirse a la sección del mapa, buscarlo manualmente o por el 
                      filtro de busqueda por zona, hacer clic en el icono de la calavera, 
                      aparecera un cuadro flotante del lado izquierdo donde podrás ver la 
                      información de dicho lugar.
                    </p>
                  </li>
                  <li>
                    <p><b>¿Cómo encuentra una zona?</b></p>
                    <p>Puede buscarla de forma manual deslizando el mapa por donde 
                      se encuentra el sitio, o bien puede hacer un filtro de busqueda 
                      por la barra de texto en el área del mapa en la parte superior izquierda
                    </p>
                  </li>
                </ul>
              </nav>
            </b-container>
          </b-tab>
          <b-tab title="Usuarios">
            <b-container>
              <nav>
                <ul>
                  <li>
                    <p><b>¿Qué tipos de usuarios existen?</b></p>
                    <p>
                      Existe el usuario "Empleado" que tiene permisos para observar la 
                      información, agregar nuevos datos y entrenar al sistema. También 
                      existe el tipo "Admin" que es un usuario con permisos de borrar, 
                      incluyendo los permisos de "Empleado".
                    </p>
                  </li>
                  <li>
                    <p><b>¿Cómo puedo registrarme?</b></p>
                    <p>
                      Una cuenta de tipo "Admin" deberá otorgarte un código unico, una vez 
                      que lo tengas deberás ir a la página de inicio haciendo clic en el 
                      botón "Registrarme", colocas el código junto con tu información y 
                      listo.
                    </p>
                  </li>
                  <li>
                    <p><b>No puedo iniciar sesión</b></p>
                    <p>
                      Primero asegurese con el "Admin" del sistema si esta dado de alta, 
                      si no es el caso, favor de pedirle el código único con el cual 
                      podrá registrarse. En el caso contrario, puede haber olvidado su 
                      constraseña o ingreso incorrectamente el correo, para más información, 
                      contáctenos.
                    </p>
                  </li>
                </ul>
              </nav>
            </b-container>
          </b-tab>
          <b-tab title="Crimenes">
            <b-container>
              <p>
                Existen cuatro tipos de delitos que el sistema reconoce y valora dentro 
                de sus parametros de predicción, los cuales son los siguientes:
              </p>
              
              <nav>
                <ul>
                  <li>
                    <p><b>Asesinato</b></p>
                    <p>
                      Es la categoria con más alta prioridad para las predicciones, entre 
                      más asesinatos existan dentro de la fecha, más importancia tomará la 
                      zona.
                    </p>
                  </li>
                  <li>
                    <p><b>Violación</b></p>
                    <p>
                      La segunda categoria con más alta prioridad. Una alta tasa de violaciones 
                      o asesinatos o una mezcla de estos, resultara en un caso crítico.
                    </p>
                  </li>
                  <li>
                    <p><b>Balaceras</b></p>
                    <p>
                      Dentro de los parametros y nivel de prioridad, en esta categoria es 
                      necesario tener una cantidad considerable o mezclar con otras de más 
                      alta prioridad para considerar un caso como crítico.
                    </p>
                  </li>
                  <li>
                    <p><b>Robos</b></p>
                    <p>
                      Como último orden dentro de la prioridad tenemos esta categoria, 
                      que requiere de una cantidad superior a la media de las anteriores 
                      para considerar un caso como crítico o mezclarla con otras de mayor 
                      prioridad.
                    </p>
                  </li>
                </ul>
              </nav>
            </b-container>
          </b-tab>
          <b-tab title="Contactanos">
            <b-row>
              <b-col class="text-center">
                <div class="profile" style="background-image: url('https://scontent.fgym1-1.fna.fbcdn.net/v/t1.0-9/48371506_2447798881952770_4193548682756358144_n.jpg?_nc_cat=103&ccb=2&_nc_sid=a4a2d7&_nc_eui2=AeEPMfpHCIJtdVHyo6NGGVDGr01k8O4wKQ2vTWTw7jApDe8UrGsTM1VGwb40LrvmNAHpK1nv7CBgqpnv-iyJWa4c&_nc_ohc=RvxS-VY3lbkAX8k4Kbm&_nc_ht=scontent.fgym1-1.fna&oh=a7595e7d88c1ab3b08ee4be35cbcd024&oe=5FE16C4B');"></div>
                <p class="mt-3"><b>Dayanne Gabriela Flores Sañudo</b></p>
                <p>6442 365891<br>dayanne@gmail.com</p>
              </b-col>
              <b-col class="text-center">
                <div class="profile" style="background-image: url('https://scontent.fgym1-1.fna.fbcdn.net/v/t1.0-9/57311645_2334844559871694_2533899755382112256_o.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeGT17vW_QXLlCM7V9DOfYlSbT0aQnh1LSBtPRpCeHUtICR7cACS9y_STrrAs6EyfloVl8DX01uwNvlEEGO-jruX&_nc_ohc=S6cNtCXoWfUAX9wJBIa&_nc_ht=scontent.fgym1-1.fna&oh=7aeef43d3bae3b2b8d1e1e1b370dc77a&oe=5FE22DB0');"></div>
                <p class="mt-3"><b>René Rodríguez Luquin</b></p>
                <p>6442 365891<br>rene@gmail.com</p>
              </b-col>
              <b-col class="text-center">
                <div class="profile" style="background-image: url('https://scontent.fgym1-1.fna.fbcdn.net/v/t1.0-9/22310298_1693958940675477_7622382484898408964_n.jpg?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeFWcaCvcHWYe2sYQ15PiD4CZpXDbx2xL89mlcNvHbEvzyaHlFzpYPhXM213Bx5xOosX1uVgKZHYp3RRSzK2ulGb&_nc_ohc=AmdT0wgdkAgAX-K4UpD&_nc_ht=scontent.fgym1-1.fna&oh=7293186beb4d315eade5864a9cbaee4f&oe=5FE2178D');"></div>
                <p class="mt-3"><b>Martín Alberto Ruvalcaba Rodríguez</b></p>
                <p>6442 365891<br>martin@gmail.com</p>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
.about {
  width: 100%;
  height: 100vh;
  position: absolute;
  background-size: cover;
  background-image: url("../assets/images/blur-wallpaper.jpg");
}

#logo {
  margin-top: 20px;
  cursor: pointer;
}
#logo td {
  padding: 0px 5px;
}

.profile {
  width: 200px;
  height: 200px;
  border-radius: 1000%;
  box-shadow: #999 2px 4px 4px;
  background-size: cover;
  margin: auto;
}
</style>

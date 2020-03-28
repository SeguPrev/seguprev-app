<template>
  <div class="about">
    <div id="logo" class="container">
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
</template>

<script>
export default {
  name: 'About',
}
</script>

<style>
.about {
  width: 100%;
  height: 100vh;
  position: absolute;
  background-size: cover;
  background-image: url("../assets/images/blur-wallpaper.jpg");
}

#logo {
  margin-top: 20px;
} #logo td {
  padding: 0px 5px;
}
</style>

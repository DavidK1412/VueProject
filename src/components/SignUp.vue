<template>
  <div class="center">
    <div class="container_logIn_user">
      <form v-on:submit.prevent="processSignUp" >
        <div class="txt_field">
          <input type="text" v-model="user.username" >
          <span></span>
          <label>Usuario</label>
        </div>
        <div class="txt_field">
          <input type="password" v-model="user.password">
          <span></span>
          <label>Contraseña</label>
        </div>
        <div class="txt_field">
          <input type="email" v-model="user.email">
          <span></span>
          <label>E-mail</label>
        </div>
        <div class="txt_field">
          <input type="text" v-model="user.nombre">
          <span></span>
          <label>Nombre</label>
        </div>
        <input type="submit" value="Registrarse">
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "SignUp",

  data: function(){
    return {
      user: {
        username: "",
        password: "",
        email: "",
        nombre: "",

      }
    }
  },

  methods: {
    processSignUp: function(){
      axios.post(
          "https://p41g5be.herokuapp.com/userReg/",
          this.user,
          {headers: {}}
      )

          .then((result) => {
            let dataSignUp = {
              username: this.user.username,
              token_access: result.data.access,
              token_refresh: result.data.refresh,
            }

            this.$emit('completedSignUp', dataSignUp)
          })
          .catch((error) => {
            console.log(error)
            alert("ERROR: Fallo en el registro de usuario.");
          });
    }
  }
}
</script>

<style>
</style>
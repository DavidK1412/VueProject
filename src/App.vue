<template>
  <div id="app">
    <div>
      <b-navbar id="navbar" type="dark">
        <b-navbar-brand tag="h1" class="mb-0">Administración Tienda</b-navbar-brand>
        <div class="ml-auto">
          <button v-if="is_auth" v-on:click="loadMenu" class="btnav"> Inicio </button>
          <button v-if="is_auth" v-on:click="logOut" class="btnav"> Cerrar Sesión </button>
          <button v-if="!is_auth" v-on:click="loadLogIn" class="btnav"> Iniciar Sesión </button>
          <button v-if="!is_auth" v-on:click="loadSignUp" class="btnav"> Registrarse </button>
        </div>
      </b-navbar>
    </div>

    <div class="main-component">
      <router-view
          v-on:completedLogIn="completedLogIn"
          v-on:completedSignUp="completedSignUp"
          v-on:logOut="logOut"
          v-on:loadInventario ="loadInventario">
      </router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',

  data: function(){
    return{
      is_auth: false
    }
  },

  components: {
  },

  methods:{
    verifyAuth: function() {
      this.is_auth = localStorage.getItem("isAuth") || false;

      if (this.is_auth == false){
        this.$router.push({ name: "logIn" });
      }
      else{
        this.$router.push({ name: "Menu" });
      }
    },

    loadMenu: function() {
      this.$router.push({ name: "Menu" });
    },
    loadInventario: function (){
      this.$router.push({name: "Inventario"})
    },
    loadLogIn: function(){
      this.$router.push({name: "logIn"})
    },

    loadSignUp: function(){
      this.$router.push({name: "signUp"})
    },

    logOut: function () {
      localStorage.clear();
      alert("Sesión Cerrada");
      this.verifyAuth();
    },

    completedLogIn: function(data) {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("username", data.username);
      localStorage.setItem("token_access", data.token_access);
      localStorage.setItem("token_refresh", data.token_refresh);
      alert("Autenticación Exitosa");
      this.verifyAuth();
    },

    completedSignUp: function(data) {
      alert("Registro Exitoso");
      this.completedLogIn(data);
    },
  },

  created: function(){
    this.verifyAuth()
  }
}
</script>

<style>
.main-component{
  background-color: #fff8ff;
}

#navbar{
  background-color: #2756fa;
}

.btnav{
  color: #e5e5e9;
  background: #488de8;
  border: 1px solid #488de8;
  border-radius: 5px;
  padding: 10px 20px;
  margin-left: 15px;
}

.btnav:hover{
  color: #E5E7E9;
  background: rgb(20, 83, 220);
  border: 1px solid #E5E7E9;
}

.main-component{
  height: 65vh;
  margin: 0%;
  padding: 0%;
  background: #FDFEFE ;
}
</style>

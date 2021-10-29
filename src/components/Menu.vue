<template>
  <div class="center">
      <h2>Menú</h2>
      <router-link class="iconis" to="/user/Admin"><button><b-icon icon="file-person-fill"></b-icon> Administrar</button></router-link>
      <router-link class="iconis" to="/Catalogo"><button><b-icon icon="cart4"></b-icon> Catálogo de Productos</button></router-link>
  </div>
</template>

<script>
</script>

<style>
h2{
  text-align: center;
}
.center{
  text-align: center;
}

.iconis{
  text-align: left;
}

.center button{
  margin: 5px;
  width: 300px;
  height: 50px;
  border-radius: 5px;
}

.center button:hover{
  color: #FFFFFF;
  transition: 300ms all;
  background-color: #2691d9;
}
</style>


<template>
  <b-container fluid>
    <div class="inputdiv">
      <label>Seleccionar ID :</label>
      <b-form-select v-model="selected"  :options="options"></b-form-select>
      <br>
      <label>Titulo Producto: </label>
      <b-form-input v-model="productos[selected-1].nom_prod" :type="`text`" disabled="`true`"></b-form-input>
      <br>
      <label>Descripción: </label>
      <b-form-input v-model="productos[selected-1].Descripcion" :type="`text`" disabled="`true`"></b-form-input>
      <br>
      <label>Link Imagen: </label>
      <b-form-input v-model="productos[selected-1].LINKImg" :type="`text`" disabled="`true`"></b-form-input>
      <br>
      <label>Inventario Actual: </label>
      <b-form-input v-model="productos[selected-1].ProdInven" :type="`text`" disabled="`true`"></b-form-input>
      <br>
      <label>Precio (Sin puntos ni signos especiales): </label>
      <b-form-input v-model="productos[selected-1].Precio" :type="`text`" disabled="`true`"></b-form-input>
      <br>
      <b-button variant="danger" v-on:click="deleteProduct(selected)">Eliminar</b-button>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductDelete",
  data: function(){
    return {
      productos: [],
      selected: 1,
      options: [],
    }
  },
  created: function(){
    this.getProds();
  },
  methods: {
    getProds: function () {
      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit('logOut');
        return;
      }
      let este = this;
      let token = localStorage.getItem("token_access");
      axios.get('https://p41g5be.herokuapp.com/producto/', {headers: {'Authorization': `Bearer ${token}`}})
          .then(function (response) {
            este.productos = response.data;
            este.productos = este.productos.sort((a, b) => {
              return a.id_Prod - b.id_Prod;
            });
            for (let i = 0; i < response.data.length; i++) {
              este.options.push(response.data[i].id_Prod);
            }
          })
    },
    deleteProduct: function (id){
      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit('logOut');
        return;
      }
      let token = localStorage.getItem("token_access");
      axios.delete(`https://p41g5be.herokuapp.com/producto/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
          .then(() => {
            alert("exitoso");
          })
    }
  }
}
</script>

<style scoped>

</style>
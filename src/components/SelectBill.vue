<template>
  <b-container fluid>
    <div class="input-div">
      <h2>Buscar factura</h2>
      <label>Seleccionar ID: </label>
      <b-form-select v-model="selected"  :options="options"></b-form-select>
      <b-button v-b-modal.modal-xl variant="primary" v-on:click="splitProds(ventas[selected].productList)">Buscar factura # {{selected}}</b-button>
    </div>
    <b-modal id="modal-xl" size="xl" :title="`Factura # ${selected}`" ok-only ok-variant="danger" ok-title="Cerrar">
      <div class="header">
        <label class="label-header">ID Venta: <b>{{ventas[selected-1].id}}</b></label>
        <label class="label-header">Fecha de venta: <b>{{ventas[selected-1].fechaVenta}}</b></label>
        <label class="label-header"> ID Factura: <b>{{ventas[selected-1].factura.id}}</b></label>
        <hr>
      </div>
      <div id="products">
        <label>{{ventas[selected].productList}}</label>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "SelectBill",
  data: function (){
    return {
      selected: 1,
      ventas: [],
      options: [],
      products: [],
    }
  },
  created: function() {
    this.getVentas();
  },
  methods:{
    getVentas: function (){
      if(localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null){
        this.$emit('logOut');
        return;
      }
      let este = this;
      let token = localStorage.getItem("token_access");

      axios.get('https://p41g5be.herokuapp.com/venta/', {headers: {'Authorization': `Bearer ${token}`}})
          .then(function(response){
            este.ventas = response.data;
            for (let i = 0; i < response.data.length; i++) {
              este.options.push(response.data[i].id);
            }
          })
    },
    splitProds: function (prodList) {
      this.products = [];
      let str = prodList.replace("{", "");
      str = str.replace("}", "");
      str = str.replace(" ", "");
      let cads = str;
      if (cads.length > 4 || cads.includes(",")){
        cads = str.split(",");
      }
      console.log(cads);
      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit('logOut');
        return;
      }
      let este = this;
      let token = localStorage.getItem("token_access");
      for (let i = 0; i < cads.length; i++) {
        console.log(cads[i][0], cads[i][2])
        axios.get(`https://p41g5be.herokuapp.com/producto/${cads[i][0]}`, {headers: {'Authorization': `Bearer ${token}`}})
            .then(function (response) {
              este.products.push(
                  {
                    id: cads[i][0],
                    link: response.data.LINKImg,
                    descripcion: response.data.Descripcion,
                    cantidad: cads[i][2],
                    precio: response.data.Precio * cads[i][2]
                  }
              )
            })
      }
      console.log(este.products[0]);
    }
    }
  }
</script>

<style scoped>
.header{
  .padding: 5px;
}

.label-header{
  margin-right: 193px;
}
</style>
<template>
  <div>
    <b-table id="my-table" :items="ventas" :fields="fields" :per-page="perPage" :current-page="currentPage">
    </b-table>
    <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Ventas",
  data: function (){
    return {
      perPage: 5,
      currentPage: 3,
      fields: [{key: 'id', label: 'ID'}, {key:'fechaVenta', label:'Fecha'}, {key:'valor', label:'Valor'}, {key: 'descuento', label:'Descuento'}, {key:'valorTotal', label:'Valor Total'}],
      ventas: [

      ]
    }
  },
  mounted: function () {
    this.getVentas();
  },
  methods: {
    ponerComas: function (locales, currency, fractionDigits, number){
      let formatted = new Intl.NumberFormat(locales, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: fractionDigits
      }).format(number);
      return formatted;
    },
    getVentas: function (){
      if(localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null){
        this.$emit('logOut');
        return;
      }
      let este = this;
      let token = localStorage.getItem("token_access");

      axios.get('https://p41g5be.herokuapp.com/venta/', {headers: {'Authorization': `Bearer ${token}`}})
          .then(function(response){
            //{{ponerComas("es-CO", "COP", 0, prod.Precio * max)}}
            for (let i = 0; i < response.data.length; i++){
              response.data[i].valor = este.ponerComas("es-CO", "COP", 0, response.data[i].valor);
              response.data[i].descuento = este.ponerComas("es-CO", "COP", 0, response.data[i].descuento);
              response.data[i].valorTotal = este.ponerComas("es-CO", "COP", 0, response.data[i].valorTotal);
            }
            este.ventas = response.data;
          })
    },
  },
  computed:{
    rows() {
      return this.ventas.length;
    }
  }
}
</script>

<style scoped>
</style>
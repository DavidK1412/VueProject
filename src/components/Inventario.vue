<template>
  <div class="principal">
    <b-card no-body>
      <b-tabs card>
        <b-tab  active>
          <template slot="title">
            <b-icon icon="book-half"></b-icon> Inventario
          </template>
          <b-table id="my-table" :items="productos" :fields="fields" :per-page="perPage" :current-page="currentPage">
          </b-table>
          <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table"
          ></b-pagination>
        </b-tab>
        <b-tab>
          <template slot="title">
            <b-icon icon="file-earmark-bar-graph"></b-icon> Ventas
          </template>
          <Ventas></Ventas>
        </b-tab>
      </b-tabs>
    </b-card>

  </div>
</template>

<script>
import axios from 'axios';
import Ventas from "@/components/Ventas";

export default {
  name: "Inventario",
  components:{
    Ventas
  },
  data: function (){
    return {
      perPage: 5,
      currentPage: 3,
      fields: [{key: 'id_Prod', label: 'ID'}, {key:'nom_prod', label:'Titulo'}, {key:'Descripcion', label:'Descripción'}, {key: 'Precio', label:'Precio Unitario'}, {key: 'ProdInven', label:'Inventario'}],
      productos: []
    }
  },
  mounted: function () {
    this.getProds();
  },
  methods: {
    getProds: function (){
      if(localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null){
        this.$emit('logOut');
        return;
      }
      let este = this;
      let token = localStorage.getItem("token_access");

      axios.get('https://p41g5be.herokuapp.com/producto/', {headers: {'Authorization': `Bearer ${token}`}})
          .then(function(response){
            este.productos = response.data;
          })
    }
  },
  computed:{
    rows() {
      this.getProds();
      return this.productos.length;
    }
  }
}
</script>

<style scoped>

h1{
  font-size: 40px;
  text-align: center;
  padding-bottom: 20px;
}
.principal{
  padding: 0 2%;
  margin: 30px auto 0;
}

</style>
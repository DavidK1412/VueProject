<template>
  <b-container fluid>
    <div class="main">
      <div class="inputdiv">
        <label>Seleccionar ID :</label>
        <b-form-select v-model="selected"  :options="options"></b-form-select>
        <br>
        <label>Titulo Producto: </label>
        <b-form-input v-model="productos[selected-1].nom_prod" :type="`text`"></b-form-input>
        <br>
        <label>Descripción: </label>
        <b-form-input v-model="productos[selected-1].Descripcion" :type="`text`"></b-form-input>
        <br>
        <label>Link Imagen: </label>
        <b-form-input v-model="productos[selected-1].LINKImg" :type="`text`"></b-form-input>
        <br>
        <label>Inventario Actual: </label>
        <b-form-input v-model="productos[selected-1].ProdInven" :type="`text`"></b-form-input>
        <br>
        <label>Precio (Sin puntos ni signos especiales): </label>
        <b-form-input v-model="productos[selected-1].Precio" :type="`text`"></b-form-input>
        <br>
        <b-button variant="success" v-on:click="put(selected)">Editar</b-button>
      </div>
      <div class="preview">
        <h3>Previsualización: </h3>
        <b-card
            :title="productos[selected-1].nom_prod"
            :img-src="productos[selected-1].LINKImg"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 18rem;"
            class="mb-3"
        >
          <b-card-text>

          </b-card-text>
          <div class="butt">
            <b-form-input  v-model="cuantity" :type="'number'" min="1" :max="productos[selected-1].ProdInven" ></b-form-input>
            <b-button variant="success">{{productos[selected-1].Precio * cuantity}}</b-button>
          </div>
        </b-card>
      </div>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductEdit",
  data: function () {
    return{
      productos: [],
      selected: 1,
      options: [],
      cuantity: 0
    }
  },
  created: function () {
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
    put: function (id) {
      if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        this.$emit('logOut');
        return;
      }
      let este = this;
      let token = localStorage.getItem("token_access");
      axios.put(`https://p41g5be.herokuapp.com/producto/${id}`, {
        nom_prod: este.productos[id-1].nom_prod,
        Descripcion: este.productos[id-1].Descripcion,
        LINKImg: este.productos[id-1].LINKImg,
        ProdInven: este.productos[id-1].ProdInven,
        Precio: este.productos[id-1].Precio
      }, {headers: {'Authorization': `Bearer ${token}`}})
          .then(() => {
            alert("exitoso");
          })
    }
  }
}
</script>

<style scoped>
.inputdiv{
  width: 65%;
}

.main{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
}

.preview{
  margin-left: 30px;
  width: 30%;
}
</style>
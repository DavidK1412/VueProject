<template>
  <b-container fluid>
    <div class="main">
    <div class="inputdiv">
    <label>Titulo Producto: </label>
    <b-form-input v-model="dataModel.nom_prod" :type="`text`"></b-form-input>
    <br>
    <label>Descripción: </label>
    <b-form-input v-model="dataModel.Descripcion" :type="`text`"></b-form-input>
    <br>
    <label>Link Imagen: </label>
    <b-form-input v-model="dataModel.LINKImg" :type="`text`"></b-form-input>
    <br>
    <label>Inventario Actual: </label>
    <b-form-input v-model="dataModel.ProdInven" :type="`text`"></b-form-input>
    <br>
    <label>Precio (Sin puntos ni signos especiales): </label>
    <b-form-input v-model="dataModel.Precio" :type="`text`"></b-form-input>
    <br>
      <b-button variant="success" v-on:click="postProduct">Crear</b-button>
    </div>
    <div class="preview">
      <h3>Previsualización: </h3>
      <b-card
              :title="dataModel.nom_prod"
              :img-src="dataModel.LINKImg"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 18rem;"
              class="mb-3"
      >
        <b-card-text>
        {{dataModel.Descripcion}}
        </b-card-text>
        <div class="butt">
          <b-form-input v-model="cuantity" :type="'number'" min="1" :max="dataModel.ProdInven"></b-form-input>
          <b-button variant="success">{{dataModel.Precio * cuantity}}</b-button>
        </div>
      </b-card>
    </div>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductCreate",
  data: function (){
    return {
      cuantity: 0,
      dataModel : {
        nom_prod: "",
        Descripcion: "",
        LINKImg: "",
        ProdInven: 0,
        Precio: 0
      }
    }
  },
  methods:{
    postProduct: function () {
      let token = localStorage.getItem("token_access");
      let este = this;
      axios.post(
          "https://p41g5be.herokuapp.com/producto/",
          este.dataModel,
          {headers: {'Authorization': `Bearer ${token}`}}
      ).then((result) =>{
        let responsePost = result.data.response;
        alert(responsePost);
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
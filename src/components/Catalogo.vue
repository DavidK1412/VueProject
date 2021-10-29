<template>
  <div>
    <div class="productsrow">
      <b-card v-for="prod in productos" v-bind:key="prod.id"
        :title="prod.nom_prod"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 18rem;"
        class="mb-3"
      >
        <b-card-text>
          {{prod.Descripcion}}
        </b-card-text>
        <div class="butt">
          <b-form-input  v-model="prod.max" :type="'number'" min="1" :max="prod.ProdInven"></b-form-input>
          <b-button href="#" id="btnColor" v-on:click="anadirCarrito(prod.id_Prod, prod.max)">{{ponerComas("es-CO", "COP", 0, prod.Precio * prod.max)}}</b-button>
        </div>
      </b-card>
      <div>
        <b-button v-b-toggle.sidebar-1 class="cartbtn" ><b-icon icon="cart-fill"></b-icon> {{itemscart}}</b-button>
        <b-sidebar id="sidebar-1" title="Carrito" class="overlow-hidden" shadow>
          <div class="px-3 py-2">
            <div class="cartt" v-for="item in carrito" v-bind:key="item.id">
              <div class="cartimg">
                <b-img :src="item.img" fluid></b-img>
              </div>
              <div class="itemscart">
                <label>{{item.titulo}}</label>
                <br>
                <label>Cantidad: {{item.cantidad}}</label>
                <br>
                <label>Precio: {{ponerComas("es-CO", "COP", 0, item.precio*item.cantidad)}}</label>
              </div>
            </div>
            <div class="checkout">
              <label>Total: {{ponerComas("es-CO", "COP", 0, total)}}</label>
              <div>
                <b-form-input v-model="descuento" class="checkout-form" :type="'number'" min="0" placeholder="Descuento"></b-form-input>
                <b-button variant="success" class="checkout-btn">Comprar</b-button>
              </div>
            </div>
          </div>
        </b-sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Catalogo",
  data: function (){
    return {
      producto: null,
      productos: [],
      carrito:[],
      descuento: 0,
      total: 0,
      max: 1,
      itemscart: 0
    }
  },
  beforeMount: function (){
    this.getProds();
  },
  methods:{
    getProds: function (){
      if(localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null){
        this.$emit('logOut');
        return;
      }
      let este = this;
      let token = localStorage.getItem("token_access");

      axios.get('https://p41g5be.herokuapp.com/producto/', {headers: {'Authorization': `Bearer ${token}`}})
          .then(function(response){
            este.productos = response.data.map(prod =>{
              prod.max = 0;
              return prod;
            });
          })
    },
    anadirCarrito: function (id, cuantity){
      let token = localStorage.getItem("token_access");
      let este = this;
      axios.get(`https://p41g5be.herokuapp.com/producto/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
      .then(function (response){
        cuantity = parseInt(cuantity);
        let total = response.data.Precio * cuantity;
        if(response.data.ProdInven < cuantity){
          alert(`Sin suficiente stock, el stock actual es de ${response.data.ProdInven}`);
        }else{
            este.carrito.push({id:id, cantidad:cuantity, img:response.data.LINKImg, titulo: response.data.nom_prod, precio: response.data.Precio});
            este.total += total;
            este.itemscart += cuantity
            console.log(este.carrito[0], este.total)
        }
      })
    },
    ponerComas: function (locales, currency, fractionDigits, number){
      let formatted = new Intl.NumberFormat(locales, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: fractionDigits
      }).format(number);
      return formatted;
    }
  }

}
</script>

<style scoped>
.productsrow{
  padding: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-around;
}
#btnColor{
  background-color: #8ba3f4;
  border: #3c3f44;
}

#btnColor:hover{
  background-color: #488de8;
}

.cartbtn{
  width: 70px;
  height: 70px;
  border: black;
  border-radius: 50%;
  position: fixed;
  right: 20px;
  bottom: 20px;
  background-color: #2691d9;
}
.cartbtn:hover{
  background-color: #488de8;
}

.cartt{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
  border-bottom: 1px solid black;
  margin-bottom: 4px;
}
.cartimg{
  width: 125px;
  height: 125px;
  margin: 2px;
}

.checkout{
  margin-top: 15px;
  position: relative;
  bottom: 10px;
}

.checkout, .checkout div{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
}
.checkout-form{
  width: 60%;
  margin-right: 5px;
}
.checkout-btn{
  width: 35%;
}
</style>
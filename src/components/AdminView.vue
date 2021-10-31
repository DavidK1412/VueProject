<template>
<div>
  <b-card no-body>
    <b-tabs  card vertical>
      <b-tab active>
        <template slot="title">
          <b-icon icon="journal-bookmark-fill"></b-icon> Inf. Admin
        </template>
        <Inventario></Inventario></b-tab>
      <b-tab>
        <template slot="title">
          <b-icon icon="bag-check-fill"></b-icon> Admin. Productos
        </template>
        <AdminProductos></AdminProductos>
      </b-tab>
  <!--<b-tab>
        <template slot="title">
          <b-icon icon="book"></b-icon> Facturas
        </template>
        <SelectBill></SelectBill>
      </b-tab>-->
    </b-tabs>
  </b-card>
</div>
</template>

<script>
import Inventario from "@/components/Inventario";
import AdminProductos from "@/components/AdminProductos";
//import SelectBill from "@/components/SelectBill";

export default {
  name: "AdminView",
  components: {
    Inventario,
    AdminProductos,
    //SelectBill
  }
}
</script>

<style scoped>

</style>
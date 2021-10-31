<template>
<div>
  <b-card no-body>
    <b-tabs card>
      <b-tab>
        <template slot="title">
          <b-icon icon="plus-circle-fill"></b-icon> Añadir
        </template>
        <ProductCreate></ProductCreate>
      </b-tab>
      <b-tab>
        <template slot="title">
          <b-icon icon="pencil-fill"></b-icon> Editar
        </template>
        <ProductEdit></ProductEdit>
      </b-tab>
      <b-tab>
        <template slot="title">
          <b-icon icon="dash-circle-fill"></b-icon> Eliminar
        </template>
        <ProductDelete></ProductDelete>
      </b-tab>
    </b-tabs>
  </b-card>
</div>
</template>

<script>
import ProductCreate from "@/components/ProductCreate";
import ProductEdit from "@/components/ProductEdit";
import ProductDelete from "@/components/ProductDelete";
export default {
  name: "AdminProductos",
  components: {
    ProductCreate,
    ProductEdit,
    ProductDelete
  }
}
</script>

<style scoped>

</style>
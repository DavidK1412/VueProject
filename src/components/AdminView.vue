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
          <b-icon icon="journal-bookmark-fill"></b-icon> Admin. Productos
        </template>
      </b-tab>
    </b-tabs>
  </b-card>
</div>
</template>

<script>
import Inventario from "@/components/Inventario";

export default {
  name: "AdminView",
  components: {
    Inventario,
  }
}
</script>

<style scoped>

</style>
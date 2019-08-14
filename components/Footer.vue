<template>
  <v-footer
    :fixed="fixed"
    app
    class="py-4"
  >
    <span class="caption">Farmer Portal &copy; 2019 - Todos os direitos reservados</span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    fixed: false
  })
}
</script>

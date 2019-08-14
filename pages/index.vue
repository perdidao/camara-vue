<template>
  <v-container>
    <v-row md12 class="d-flex justify-space-between flex-wrap">
      <v-card
        v-for="(item,index) in items"
        :key="index"
        exact
        max-width="24%"
        class="mb-6"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <span class="caption mb-4">
              {{ item.siglaPartido }} ({{ item.siglaUf }})
            </span>
            <v-list-item-title class="headline mb-1">
              {{ item.nome }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ item.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar
            tile
            size="80"
          >
            <v-img :src="item.urlFoto" :alt="item.nome" />
          </v-list-item-avatar>
        </v-list-item>
        <v-card-actions>
          <v-btn
            router
            :to="'deputado/' + item.id"
            text
            color="primary"
          >
            Ver mais
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-row class="d-flex justify-center mt-8">
      <v-btn color="primary" class="mx-4" :disabled="!prevStatus" @click="previousPage(pagina)">
        Página anterior
      </v-btn>
      <v-btn color="primary" class="mx-4" :disabled="!nextStatus" @click="nextPage(pagina)">
        Próxima página
      </v-btn>
    </v-row>
    <!-- <v-row>
      <v-flex md12>
        <pre class="caption">{{ items }}</pre>
      </v-flex>
    </v-row> -->
  </v-container>
</template>

<script>
import axios from 'axios'
import scope from 'scope'

export default {
  data: () => ({
    items: null,
    length: 1,
    pagina: 1,
    nextStatus: true,
    prevStatus: false
  }),
  mounted () {
    const pagina = scope.pagina || this.pagina
    this.fetchDeputados(pagina)
  },
  methods: {
    fetchLength () {
      axios
        .get(process.env.api + 'deputados', {
          accept: 'application/json'
        })
        .then(response => (
          scope.length = Math.ceil(response.data.dados.length / 12)
        ))
    },
    fetchDeputados (page) {
      const pagina = page || 1
      if (!scope.length) {
        this.fetchLength()
      }
      axios
        .get(process.env.api + 'deputados?itens=12&pagina=' + pagina, {
          accept: 'application/json'
        })
        .then(response => (
          this.items = response.data.dados
        ))
        .catch((error) => {
          error({ statusCode: 404, message: 'Página não encontrada' })
        })
      if (pagina === scope.length) {
        this.prevStatus = true
        this.nextStatus = false
      } else if (page === 1) {
        this.prevStatus = false
        this.nextStatus = true
      } else {
        this.prevStatus = true
        this.nextStatus = true
      }
    },
    previousPage (curPage) {
      const self = this
      const current = scope.pagina || this.pagina
      const prev = current - 1
      if (prev > 0) {
        self.fetchDeputados(prev)
        scope.pagina = prev
      }
    },
    nextPage (curPage) {
      const self = this
      const current = scope.pagina || this.pagina
      const next = current + 1
      if (next <= scope.length) {
        self.fetchDeputados(next)
        scope.pagina = next
      }
    }
  }
}
</script>

<template>
  <v-layout justify-center>
    <v-flex xs12 md6>
      <v-list>
        <v-list-item
          v-for="(item,index) in items"
          :key="index"
          :to="'deputado/' + item.id"
          router
          exact
        >
          <v-list-item-avatar>
            <v-img :src="item.urlFoto" :alt="item.nome" />
          </v-list-item-avatar>
          <v-list-item-title>{{ item.nome }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <div class="d-flex justify-space-between mt-8">
        <v-btn color="primary" :disabled="!prevStatus" @click="previousPage(pagina)">
          Página anterior
        </v-btn>
        <v-btn color="primary" :disabled="!nextStatus" @click="nextPage(pagina)">
          Próxima página
        </v-btn>
      </div>
    </v-flex>
    <v-flex xs12 md6>
      <pre class="caption">{{ items }}</pre>
    </v-flex>
  </v-layout>
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
          scope.length = Math.ceil(response.data.dados.length / 10)
        ))
    },
    fetchDeputados (page) {
      const pagina = page || 1
      if (!scope.length) {
        this.fetchLength()
      }
      axios
        .get(process.env.api + 'deputados?itens=10&pagina=' + pagina, {
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
      } else {
        alert('Você está no início da lista')
      }
    },
    nextPage (curPage) {
      const self = this
      const current = scope.pagina || this.pagina
      const next = current + 1
      if (next <= scope.length) {
        self.fetchDeputados(next)
        scope.pagina = next
      } else {
        alert('Você chegou ao fim da lista')
      }
    }
  }
}
</script>

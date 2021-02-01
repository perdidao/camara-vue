<template>
  <v-container>
    <v-layout md12 class="d-flex justify-space-between">
      <v-flex md9>
        <p>Página {{ pagina }} de {{ length }}</p>
      </v-flex>
      <v-flex md3>
        <v-select
          v-model="perPage"
          :items="pageSizes"
          label="Deputados por página"
          @change="updatePageSize($event)"
        />
      </v-flex>
    </v-layout>
    <v-progress-circular v-if="loading" indeterminate color="blue" />
    <v-row v-else md12 class="d-flex justify-space-between flex-wrap">
      <v-card
        v-for="(item, index) in items"
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
          <v-list-item-avatar tile size="80">
            <v-img :src="item.urlFoto" :alt="item.nome" />
          </v-list-item-avatar>
        </v-list-item>
        <v-card-actions>
          <v-btn router :to="'deputado/' + item.id" text color="primary">
            Ver mais
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-row class="d-flex justify-center mt-8">
      <v-btn
        color="primary"
        class="mx-4"
        :loading="loading"
        :disabled="loading || !prevStatus"
        @click="previousPage(pagina)"
      >
        Página anterior
      </v-btn>
      <v-btn
        color="primary"
        class="mx-4"
        :loading="loading"
        :disabled="loading || !nextStatus"
        @click="nextPage(pagina)"
      >
        Próxima página
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
// import scope from 'scope'

export default {
  data: () => ({
    items: null,
    pageSizes: [4, 8, 12, 16, 32],
    length: null,
    pagina: 1,
    perPage: 12,
    nextStatus: true,
    prevStatus: false,
    loading: false,
  }),
  mounted() {
    const pagina = this.pagina
    this.fetchDeputados(pagina)
  },
  methods: {
    fetchLength() {
      this.loading = true

      const settings = {
        method: 'GET',
        url: `${process.env.api}deputados`,
        headers: {
          accept: 'application/json',
        },
      }
      axios(settings)
        .then((response) => {
          this.length = Math.ceil(response.data.dados.length / this.perPage)
        })
        .catch((error) => {
          error({
            statusCode: error.response.status,
            message: 'Página não encontrada',
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    fetchDeputados(page = 1) {
      this.loading = true
      this.pagina = page

      if (!this.length) {
        this.fetchLength()
      }

      const settings = {
        method: 'GET',
        url: `${process.env.api}deputados?itens=${this.perPage}&pagina=${this.pagina}`,
        headers: {
          accept: 'application/json',
        },
      }

      axios(settings)
        .then((response) => {
          this.items = response.data.dados
        })
        .catch((error) => {
          error({
            statusCode: error.response.status,
            message: 'Página não encontrada',
          })
        })
        .finally(() => {
          this.loading = false
        })

      this.handleButtonStatus(this.pagina)
    },
    handleButtonStatus(currentPage) {
      if (currentPage === this.length) {
        this.nextStatus = false
      } else if (currentPage === 1) {
        this.prevStatus = false
      } else {
        this.prevStatus = true
        this.nextStatus = true
      }
    },
    previousPage() {
      const prev = this.pagina - 1
      if (prev > 0) {
        this.fetchDeputados(prev)
        this.pagina = prev
      }
    },
    nextPage() {
      const next = this.pagina + 1
      if (next <= this.length) {
        this.fetchDeputados(next)
        this.pagina = next
      }
    },
    updatePageSize(e) {
      this.perPage = parseInt(e)
      this.fetchLength()
      this.fetchDeputados(this.pagina)
    },
  },
}
</script>

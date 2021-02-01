<template>
  <v-container>
    <v-layout md12 class="d-flex justify-space-between">
      <v-flex md9>
        <p>Página {{ currentPage }} de {{ length }}</p>
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
        color="green"
        dark
        class="mx-4"
        :loading="loading"
        :disabled="loading"
        @click="goToStart"
      >
        Primeira
      </v-btn>
      <v-btn
        color="primary"
        class="mx-4"
        :loading="loading"
        :disabled="loading || !prevStatus"
        @click="previousPage(currentPage)"
      >
        Página anterior
      </v-btn>
      <v-btn
        color="primary"
        class="mx-4"
        :loading="loading"
        :disabled="loading || !nextStatus"
        @click="nextPage(currentPage)"
      >
        Próxima página
      </v-btn>
      <v-btn
        color="green"
        dark
        class="mx-4"
        :loading="loading"
        :disabled="loading"
        @click="goToEnd"
      >
        Última
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import {
  fetchLength,
  fetchDeputies,
  verifyCurrentPageCache,
} from '@/utils/deputies'

export default {
  data: () => ({
    items: [],
    pageSizes: [4, 8, 12, 16, 32, 64],
    length: 0,
    currentPage: 1,
    perPage: 12,
    nextStatus: true,
    prevStatus: false,
    loading: false,
  }),
  beforeMount() {
    verifyCurrentPageCache(this)
  },
  mounted() {
    fetchDeputies(this, this.currentPage)
  },
  methods: {
    goToStart() {
      localStorage.setItem('currentPage', '1')
      fetchDeputies(this)
    },
    goToEnd() {
      localStorage.setItem('currentPage', this.length)
      fetchDeputies(this, this.length)
    },
    previousPage() {
      verifyCurrentPageCache(this)
      const prev = this.currentPage - 1
      localStorage.setItem('currentPage', prev)
      if (prev > 0) {
        fetchDeputies(this, prev)
      }
    },
    nextPage() {
      verifyCurrentPageCache(this)
      const next = this.currentPage + 1
      localStorage.setItem('currentPage', next)
      if (next <= this.length) {
        fetchDeputies(this, next)
      }
    },
    updatePageSize(e) {
      localStorage.setItem('currentPage', '1')
      this.perPage = parseInt(e)
      fetchLength(this)
      fetchDeputies(this)
    },
  },
}
</script>

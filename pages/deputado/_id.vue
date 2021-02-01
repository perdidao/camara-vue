<template>
  <v-container>
    <v-progress-circular v-if="loading" indeterminate color="blue" />
    <v-layout v-else>
      <v-flex md2>
        <v-card flat width="100%">
          <v-img height="400" :src="deputy.ultimoStatus.urlFoto" />
          <v-card-title>{{ deputy.ultimoStatus.nomeEleitoral }}</v-card-title>
          <v-card-text>
            {{ deputy.ultimoStatus.siglaPartido }}
            ({{ deputy.ultimoStatus.siglaUf }})<br />
            Situação atual: {{ deputy.ultimoStatus.situacao }}
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary" router to="/">
              <v-icon left> mdi-arrow-left </v-icon>
              <span>Voltar</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex md8 class="px-8 pt-4">
        <h1 class="display-2 mb-2">
          {{ deputy.nomeCivil }}
        </h1>
        <h2 class="display-1 grey--text mb-8">
          {{
            `${deputy.ultimoStatus.nomeEleitoral} (${deputy.ultimoStatus.siglaPartido}-${deputy.ultimoStatus.siglaUf})`
          }}
        </h2>
        <p>
          <strong class="d-block">Local de nascimento:</strong>
          <span class="grey--text">
            {{ deputy.municipioNascimento }} / {{ deputy.ufNascimento }}
          </span>
        </p>
        <p>
          <strong class="d-block">Sexo:</strong>
          <span class="grey--text">
            {{ deputy.sexo === 'M' ? 'Masculino' : 'Feminino' }}
          </span>
        </p>
        <p>
          <strong class="d-block">Idade:</strong>
          <span class="grey--text">
            {{ calculateAge(deputy.dataNascimento) }} anos
          </span>
        </p>
        <p>
          <strong class="d-block">Data de nascimento:</strong>
          <span class="grey--text">
            {{ formatDate(deputy.dataNascimento) }}
          </span>
        </p>
        <p>
          <strong class="d-block">Website:</strong>
          <span class="grey--text">
            {{ deputy.urlWebsite ? deputy.urlWebsite : 'Não informado' }}
          </span>
        </p>
        <p>
          <strong class="d-block">Nível de escolaridade:</strong>
          <span class="grey--text">{{ deputy.escolaridade }}</span>
        </p>
      </v-flex>
    </v-layout>
    <h2 class="display-1 mt-4 mb-2">Despesas do deputado</h2>
    <strong class="d-block red--text mb-2">
      {{ toMoneyFormat(totalExpenses, true) }} no total
    </strong>
    <v-data-table
      :headers="headers"
      :items="expenses"
      :items-per-page="10"
      :loading="loadingExpenses"
      class="elevation-1"
    >
      <template #[`item.dataDocumento`]="{ item }">
        {{ formatDate(item.dataDocumento) }}<br />
      </template>
      <template #[`item.tipoDespesa`]="{ item }">
        {{ toCapitals(item.tipoDespesa) }}<br />
      </template>
      <template #[`item.nomeFornecedor`]="{ item }">
        {{ toCapitals(item.nomeFornecedor) }}<br />
        {{ documentFormat(item.cnpjCpfFornecedor) }}
      </template>
      <template #[`item.valorDocumento`]="{ item }">
        {{ toMoneyFormat(item.valorDocumento, true) }}<br />
      </template>
      <template #[`item.valorGlosa`]="{ item }">
        {{ toMoneyFormat(item.valorGlosa, true) }}<br />
      </template>
      <template #[`item.valorLiquido`]="{ item }">
        {{ toMoneyFormat(item.valorLiquido, true) }}<br />
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { fetchDeputy, fetchDeputyExpenses } from '@/utils/deputy'
import {
  documentFormat,
  toCapitals,
  formatDate,
  calculateAge,
  toMoneyFormat,
} from '@/utils/helpers'

export default {
  data: () => ({
    loading: true,
    loadingExpenses: true,
    id: 0,
    deputy: {},
    title: '',
    expenses: [],
    totalExpenses: 0,
    headers: [
      { text: 'Data', value: 'dataDocumento' },
      { text: 'Tipo', value: 'tipoDespesa' },
      { text: 'Fornecedor', value: 'nomeFornecedor' },
      { text: 'Valor bruto', value: 'valorDocumento' },
      { text: 'Desconto', value: 'valorGlosa' },
      { text: 'Valor líquido', value: 'valorLiquido' },
    ],
  }),
  head() {
    return {
      title: `${this.title} | `,
    }
  },
  beforeMount() {
    this.id = this.$route.params.id
  },
  mounted() {
    fetchDeputy(this)
    fetchDeputyExpenses(this)
  },
  methods: {
    documentFormat,
    toCapitals,
    formatDate,
    calculateAge,
    toMoneyFormat,
  },
}
</script>

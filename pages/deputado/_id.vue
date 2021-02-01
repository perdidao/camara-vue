<template>
  <v-container>
    <v-progress-circular v-if="loading" indeterminate color="blue" />
    <v-layout v-else>
      <v-flex md2>
        <v-card flat width="100%">
          <v-img height="400" :src="item.ultimoStatus.urlFoto" />
          <v-card-title>{{ item.ultimoStatus.nomeEleitoral }}</v-card-title>
          <v-card-text>
            {{ item.ultimoStatus.siglaPartido }} ({{
              item.ultimoStatus.siglaUf
            }})<br />
            Situação atual: {{ item.ultimoStatus.situacao }}
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
          {{ item.nomeCivil }}
        </h1>
        <h2 class="display-1 grey--text mb-8">
          {{ item.ultimoStatus.nomeEleitoral }} ({{
            item.ultimoStatus.siglaPartido
          }}-{{ item.ultimoStatus.siglaUf }})
        </h2>
        <p>
          <strong class="d-block">Local de nascimento:</strong>
          <span class="grey--text"
            >{{ item.municipioNascimento }} / {{ item.ufNascimento }}</span
          >
        </p>
        <p>
          <strong class="d-block">Sexo:</strong>
          <span class="grey--text">{{
            item.sexo === 'M' ? 'Masculino' : 'Feminino'
          }}</span>
        </p>
        <p>
          <strong class="d-block">Idade:</strong>
          <span class="grey--text">
            {{ calculateAge(item.dataNascimento) }} anos
          </span>
        </p>
        <p>
          <strong class="d-block">Data de nascimento:</strong>
          <span class="grey--text">{{ convertDate(item.dataNascimento) }}</span>
        </p>
        <p>
          <strong class="d-block">Website:</strong>
          <span class="grey--text">{{
            item.urlWebsite ? item.urlWebsite : 'Não informado'
          }}</span>
        </p>
        <p>
          <strong class="d-block">Nível de escolaridade:</strong>
          <span class="grey--text">{{ item.escolaridade }}</span>
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { fetchDeputy, convertDate, calculateAge } from '@/utils/deputy'

export default {
  data: () => ({
    loading: true,
    id: 0,
    item: null,
    title: '',
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
  },
  methods: {
    convertDate,
    calculateAge,
  },
}
</script>

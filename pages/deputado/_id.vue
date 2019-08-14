<template>
  <v-container>
    <v-layout>
      <v-flex md2>
        <v-card flat width="100%">
          <v-img
            height="400"
            :src="item.ultimoStatus.urlFoto"
          />
          <v-card-title>{{ item.ultimoStatus.nomeEleitoral }}</v-card-title>
          <v-card-text>
            {{ item.ultimoStatus.siglaPartido }} ({{ item.ultimoStatus.siglaUf }})<br>
            Situação atual: {{ item.ultimoStatus.situacao }}
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary" router to="/">
              <v-icon left>
                mdi-arrow-left
              </v-icon>
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
          {{ item.ultimoStatus.nomeEleitoral }} ({{ item.ultimoStatus.siglaPartido }}-{{ item.ultimoStatus.siglaUf }})
        </h2>
        <p>
          <strong class="d-block">Local de nascimento:</strong>
          <span class="grey--text">{{ item.municipioNascimento }} / {{ item.ufNascimento }}</span>
        </p>
        <p>
          <strong class="d-block">Sexo:</strong>
          <span class="grey--text">{{ (item.sexo === 'M') ? 'Masculino' : 'Feminino' }}</span>
        </p>
        <p>
          <strong class="d-block">Idade:</strong>
          <span class="grey--text">{{ getAge(item.dataNascimento) }} anos</span>
        </p>
        <p>
          <strong class="d-block">Data de nascimento:</strong>
          <span class="grey--text">{{ convertDate(item.dataNascimento) }}</span>
        </p>
        <p>
          <strong class="d-block">Website:</strong>
          <span class="grey--text">{{ (item.urlWebsite) ? item.urlWebsite : 'Não informado' }}</span>
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
import axios from 'axios'

export default {
  data: () => ({
    item: null
  }),
  head () {
    return {
      title: this.item.ultimoStatus.nomeEleitoral
    }
  },
  asyncData ({ params }) {
    return axios
      .get(process.env.api + `deputados/${params.id}`, {
        accept: 'application/json'
      })
      .then((response) => {
        return {
          item: response.data.dados
        }
      })
  },
  // mounted () {},
  methods: {
    convertDate (date) {
      const units = date.split('-')
      return units[2] + '/' + units[1] + '/' + units[0]
    },
    getAge (date) {
      const t = new Date()
      const curYear = t.getFullYear()
      const curMonth = t.getMonth() + 1
      const curDay = t.getDate()
      const d = date.split('-')
      const birthYear = +d[0]
      const birthMonth = +d[1]
      const birthDay = +d[2]

      let age = curYear - birthYear

      if (curMonth === birthMonth) { age-- }
      if (curDay < birthDay) { age-- }
      if (curMonth < birthMonth) { age-- }

      return age < 0 ? 0 : age
    }
  }
}
</script>

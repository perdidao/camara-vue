<template>
  <v-layout>
    <v-flex md6>
      <h1>{{ (item.ultimoStatus.nomeEleitoral) ? item.ultimoStatus.nomeEleitoral : item.nomeCivil }} {{ (item.ultimoStatus.siglaPartido) ? '(' + item.ultimoStatus.siglaPartido + ')' : '' }}</h1>
      <p>Natural de <span class="text-capitalize font-weight-bold">{{ item.municipioNascimento }} / {{ item.ufNascimento }}</span></p>
    </v-flex>
    <v-flex md6>
      <v-btn router to="/">
        <span>Voltar</span>
        <v-icon right>
          mdi-apps
        </v-icon>
      </v-btn>
      <pre class="caption">{{ item }}</pre>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    item: null
  }),
  head () {
    return {
      title: (this.item.ultimoStatus.nomeEleitoral) ? this.item.ultimoStatus.nomeEleitoral : this.item.nomeCivil
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
  }
  // mounted () {},
  // methods: {
  //   sayHello (text) {
  //     alert(text)
  //   }
  // }
}
</script>

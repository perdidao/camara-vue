import Axios from 'axios'

/**
 * Fetch current deputy
 * @param {Object} self - Vue component object
 */
export const fetchDeputy = (self) => {
  self.loading = true

  const settings = {
    method: 'GET',
    url: `${process.env.api}deputados/${self.id}`,
    headers: {
      accept: 'application/json',
    },
  }

  Axios(settings)
    .then((response) => {
      const data = response.data.dados
      self.deputy = data
      self.title = `${data.ultimoStatus.nomeEleitoral} (${data.ultimoStatus.siglaPartido}-${data.ultimoStatus.siglaUf})`
    })
    .catch((error) => {
      error({ statusCode: error.response.status, message: 'Algo deu errado' })
    })
    .finally(() => {
      self.loading = false
    })
}

export const fetchDeputyExpenses = (self) => {
  self.loadingExpenses = true

  const settings = {
    method: 'GET',
    url: `${process.env.api}deputados/${self.id}/despesas`,
    headers: {
      accept: 'application/json',
    },
  }

  Axios(settings)
    .then((response) => {
      const data = response.data.dados
      self.expenses = data

      let total = 0
      data.forEach((e) => {
        total = total + e.valorLiquido
      })
      self.totalExpenses = total
    })
    .catch((error) => {
      error({ statusCode: error.response.status, message: 'Algo deu errado' })
    })
    .finally(() => {
      self.loadingExpenses = false
    })
}

import Axios from 'axios'

/**
 * Fetch full lenght of the list
 * @param {Object} self - Vue component object
 */
export const fetchLength = (self) => {
  self.loading = true

  const settings = {
    method: 'GET',
    url: `${process.env.api}deputados`,
    headers: {
      accept: 'application/json',
    },
  }
  Axios(settings)
    .then((response) => {
      self.length = Math.ceil(response.data.dados.length / self.perPage)
    })
    .catch((error) => {
      error({
        statusCode: error.response.status,
        message: 'Página não encontrada',
      })
    })
    .finally(() => {
      self.loading = false
    })
}

export const fetchDeputados = (self, page = 1) => {
  self.loading = true
  self.pagina = page

  if (!self.length) {
    fetchLength(self)
  }

  const settings = {
    method: 'GET',
    url: `${process.env.api}deputados?itens=${self.perPage}&pagina=${self.pagina}`,
    headers: {
      accept: 'application/json',
    },
  }

  Axios(settings)
    .then((response) => {
      self.items = response.data.dados
    })
    .catch((error) => {
      error({
        statusCode: error.response.status,
        message: 'Página não encontrada',
      })
    })
    .finally(() => {
      self.loading = false
    })

  handleButtonStatus(self)
}

export const handleButtonStatus = (self) => {
  if (self.pagina === self.length) {
    self.nextStatus = false
  } else if (self.pagina === 1) {
    self.prevStatus = false
  } else {
    self.prevStatus = true
    self.nextStatus = true
  }
}

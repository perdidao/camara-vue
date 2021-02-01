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

/**
 * Fetch paged list of deputies
 * @param {Object} self - Vue component object
 * @param {int} page - Current page
 */
export const fetchDeputies = (self, page = 1) => {
  self.loading = true
  self.currentPage = page

  if (!self.length) {
    fetchLength(self)
  }

  const settings = {
    method: 'GET',
    url: `${process.env.api}deputados?itens=${self.perPage}&pagina=${self.currentPage}`,
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

/**
 * Set current navigation button status
 * @param {Object} self - Vue component object
 */
export const handleButtonStatus = (self) => {
  if (self.currentPage === self.length) {
    self.nextStatus = false
  } else if (self.currentPage === 1) {
    self.prevStatus = false
  } else {
    self.prevStatus = true
    self.nextStatus = true
  }
}

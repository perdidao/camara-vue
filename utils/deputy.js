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
      self.item = data
      self.title = `${data.ultimoStatus.nomeEleitoral} (${data.ultimoStatus.siglaPartido}-${data.ultimoStatus.siglaUf})`
    })
    .catch((error) => {
      error({ statusCode: error.response.status, message: 'Algo deu errado' })
    })
    .finally(() => {
      self.loading = false
    })
}

/**
 * Format date
 * @param {String} date
 */
export const convertDate = (date) => {
  const section = date.split('-')
  return `${section[2]}/${section[1]}/${section[0]}`
}

/**
 * Calculate current deputy age based on the provided birth date
 * @param {String} date
 */
export const calculateAge = (date) => {
  const t = new Date()
  const curYear = t.getFullYear()
  const curMonth = t.getMonth() + 1
  const curDay = t.getDate()
  const d = date.split('-')
  const birthYear = +d[0]
  const birthMonth = +d[1]
  const birthDay = +d[2]

  let age = curYear - birthYear

  if (curMonth === birthMonth) {
    age--
  }
  if (curDay < birthDay) {
    age--
  }
  if (curMonth < birthMonth) {
    age--
  }

  return age < 0 ? 0 : age
}

import moment from 'moment'

/**
 *
 * @param {*} t
 */
export const formatDate = (date) => {
  return !date ? '' : moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
}

/**
 * Capitalize text
 * @param {String} t - Text to be capitalized
 */
export const toCapitals = (t) => {
  const name = t.split(' ')
  let treated = ''

  for (const tx in name) {
    const lowercase = name[tx].toLowerCase()
    const terms = ['e', 'a', 'o', 'de', 'da', 'do', 'das', 'dos']
    const cap = ['bba', 'ec', 'br', 'mg', 'hc', 'fr', 'l', 'mz', 'sc', 'wg']
    const ignore = terms.includes(lowercase)
    const keepCaptalized = cap.includes(lowercase)

    if (ignore) {
      treated += lowercase
    } else if (keepCaptalized) {
      treated += lowercase.toUpperCase()
    } else {
      treated += lowercase.charAt(0).toUpperCase() + lowercase.substring(1)
    }

    if (tx < name.length - 1) {
      treated += ' '
    }
  }

  return treated
}

/**
 * Format CPF and CNPJ numbers
 * @param {String} document - user document
 */
export const documentFormat = (document) => {
  const doc = document.replace(/[^\d]/g, '')

  if (doc.length > 11) {
    return doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }

  return doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

/**
 * Convert number to money
 * @param {Number} value - Number of bags to be treated
 * @param {Boolean} displayCurrency - Whether or not to display the currency
 * @param {String} unit - Money currency symbol
 * @param {Number} decimalCount - Decimal spaces
 * @param {String} decimal - Decimal separator
 * @param {String} thousands - Thousands separator
 */
export const toMoneyFormat = (
  amount,
  displayCurrency,
  currency,
  decimalCount = 2,
  decimal = ',',
  thousands = '.'
) => {
  let treatedVal

  decimalCount = Math.abs(decimalCount)
  decimalCount = isNaN(decimalCount) ? 2 : decimalCount

  const negativeSign = amount < 0 ? '-' : ''

  const i = parseInt(
    (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
  ).toString()
  const j = i.length > 3 ? i.length % 3 : 0

  treatedVal =
    negativeSign +
    (j ? i.substr(0, j) + thousands : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
    (decimalCount
      ? decimal +
        Math.abs(amount - i)
          .toFixed(decimalCount)
          .slice(2)
      : '')

  if (displayCurrency) {
    if (currency) {
      treatedVal = currency + ' ' + treatedVal
    } else {
      treatedVal = 'R$ ' + treatedVal
    }
  }

  return treatedVal
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

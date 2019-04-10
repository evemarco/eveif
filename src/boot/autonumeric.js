// import something here
import AutoNumeric from 'autonumeric/src/main'

// leave the export, even if you don't use it
export default async ({ Vue }) => {
  // something to do
  Vue.filter('pourcent', function (x) {
    if (isFinite(x)) {
      return AutoNumeric.format(x, ['percentageEU2dec', { digitGroupSeparator: '\u202f', decimalCharacter: '.' }])
    } else {
      return ' - %'
    }
  })
  Vue.filter('currency', function (x) {
    if (isFinite(x)) {
      return AutoNumeric.format(x, ['euro', { currencySymbol: '\u202fISK', digitGroupSeparator: '\u202f', decimalCharacter: '.', decimalCharacterAlternative: ',' }])
    } else {
      return ' - ISK'
    }
  })
  Vue.filter('humanCurrency', function (x) {
    if (isFinite(x)) {
      let d = 1, cur = '\u202fISK'
      if (x >= 1000000000) {
        d = 1000000000
        cur = '\u202fB\u202fISK'
      } else if (x >= 1000000) {
        d = 1000000
        cur = '\u202fM\u202fISK'
      } else if (x >= 1000) {
        d = 1000
        cur = '\u202fk\u202fISK'
      }
      return AutoNumeric.format(x / d, ['euro', { currencySymbol: cur, digitGroupSeparator: '\u202f', decimalCharacter: '.', decimalCharacterAlternative: ',' }])
    } else {
      return ' - ISK'
    }
  })
}

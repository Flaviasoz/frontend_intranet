export default function hideCpf(value: string) {
  if (!value || value === 'NÃO CADASTRADO') {
    return 'NÃO CADASTRADO'
  } else {
    const firstChar = value.charAt(0)
    const secondChar = value.charAt(1)
    const penultimateChar = value.charAt(value.length - 2)
    const lastChar = value.charAt(value.length - 1)
    let maskedValue = ''

    if (value.length < 12) {
      if (value.length === 10) {
        // cpf = 10 digitos
        maskedValue = `0${firstChar}*.***.***-${penultimateChar}${lastChar}`
      } else if (value.length <= 9) {
        // cpf = 9
        maskedValue = `00*.***.***-${penultimateChar}${lastChar}`
      } else {
        maskedValue = `${firstChar}${secondChar}*.***.***-${penultimateChar}${lastChar}`
      }
    } else {
      if (value.length === 13) {
        maskedValue = `0${firstChar}.***.***/****-${penultimateChar}${lastChar}`
      } else if (value.length <= 12) {
        maskedValue = `00.***.***/****-${penultimateChar}${lastChar}`
      } else {
        maskedValue = `${firstChar}${secondChar}.***.***/****-${penultimateChar}${lastChar}`
      }
    }

    return maskedValue
  }
}

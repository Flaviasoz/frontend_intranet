export default function formatPhoneNumber(phoneNumber?: string) {
  let formattedNumber = ''
  const phoneNumberLength = phoneNumber?.length

  if (phoneNumberLength === 11) {
    // Número com DDD e com 9
    formattedNumber = `(${phoneNumber?.substring(
      0,
      2,
    )}) ${phoneNumber?.substring(2, 7)}-${phoneNumber?.substring(7)}`
  } else if (phoneNumberLength === 10) {
    // Número com DDD e sem 9
    formattedNumber = ` (${phoneNumber?.substring(
      0,
      2,
    )}) ${phoneNumber?.substring(2, 6)}-${phoneNumber?.substring(6)}`
  } else if (phoneNumberLength === 9) {
    // Número sem DDD e com o 9
    formattedNumber = `${phoneNumber?.substring(0, 5)}-${phoneNumber?.substring(
      5,
    )}`
  } else if (phoneNumberLength === 8) {
    // Número sem DDD e sem 9
    formattedNumber = `${phoneNumber?.substring(0, 4)}-${phoneNumber?.substring(
      4,
    )}`
  } else {
    // Número inválido, retornar o mesmo valor
    formattedNumber = phoneNumber ?? ''
  }

  return formattedNumber
}

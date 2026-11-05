const whatsappNumber = '5519988882409'

export const whatsappLink = (
  message = 'Olá! Conheci a Souza Atacadista pelo site e gostaria de conhecer melhor os produtos.',
) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

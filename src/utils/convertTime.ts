export const convertTime = (minutes: number) => {
  const hour = Math.floor(minutes / 60)
  minutes = minutes % 60

  return `${hour} ч ${minutes} минут`
}

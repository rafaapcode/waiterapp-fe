export const formatDate = (date: Date | number): string => {
  const formatDate = Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  }).format(date);

  return formatDate;
}

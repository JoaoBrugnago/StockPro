export default function inicioDoAnoCorrente() {
  const dataAtual = new Date();
  const ano = dataAtual.getFullYear();
  const data = new Date(ano, 0, 1); // Mês começa do zero (janeiro é 0)
  const fusoHorarioLocal = data.getTimezoneOffset() / 60; // Obtém o deslocamento do fuso horário local em horas
  data.setHours(data.getHours() - fusoHorarioLocal); // Ajusta a data para o fuso horário local
  return data.toISOString().split('T')[0];
}

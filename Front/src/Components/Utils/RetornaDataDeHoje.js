export default function RetornaDataDeHoje() {
  const data = new Date(); 
  const fusoHorarioLocal = data.getTimezoneOffset() / 60;
  data.setHours(data.getHours() - fusoHorarioLocal);
  return data.toISOString().split('T')[0];
}
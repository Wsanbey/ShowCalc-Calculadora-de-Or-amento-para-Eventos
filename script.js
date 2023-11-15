function calcularOrcamento() {
    // Coleta os valores do formulário
    var distancia = parseFloat(document.getElementById('location').value);

    var rateLocation = parseFloat(document.getElementById('rateLocation').value);
    var data = document.getElementById('date').value;
    var horarioInicio = document.getElementById('time').value;
    var qtHoras = parseFloat(document.getElementById('qtHoras').value);
    var qtMusicos = parseInt(document.getElementById('qtMusicos').value);
    var rateMusicos = parseInt(document.getElementById('rateMusicos').value);

    // Cálculos de orçamento
    var custoDistancia = distancia >= 1 ? distancia * rateLocation : 0.00;
    var cachePorMusico = qtHoras * rateMusicos;
    var cacheBanda = qtMusicos * cachePorMusico;
    var total = custoDistancia + cacheBanda;

    // Verifica se os valores são números válidos
    if (isNaN(distancia) || isNaN(rateLocation) || isNaN(qtHoras) || isNaN(qtMusicos) || isNaN(rateMusicos)) {
        alert('Por favor, insira valores numéricos válidos.');
        return; // Sai da função se houver valores inválidos
    }

    // Calcula o horário de fim com base no horário de início e na quantidade de horas
    var horarioFim = calcularHorarioFim(horarioInicio, qtHoras);

    // Exibe o resultado
    var resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <p><strong>Orçamento estimado para o show:</strong></p>
        <p>Distância em Km: ${distancia}</p>
        <p>Custo por distância: R$ ${custoDistancia.toFixed(2)}</p>
        <p>Cache por músico (por ${qtHoras} horas): R$ ${cachePorMusico.toFixed(2)}</p>
        <p>Cache da banda (${qtMusicos} músicos): R$ ${cacheBanda.toFixed(2)}</p>
        <p>Horário de Fim: ${horarioFim}</p>
        <p><strong>Valor do Show: R$ ${total.toFixed(2)}</strong></p>
    `;
}

function calcularHorarioFim(horarioInicio, qtHoras) {
    var partesInicio = horarioInicio.split(":");
    var horaInicio = parseInt(partesInicio[0]);
    var minInicio = parseInt(partesInicio[1]);

    var horaFim = horaInicio + Math.floor(qtHoras);
    var minFim = minInicio + (qtHoras % 1) * 60;

    // Formatação para garantir que os minutos tenham dois dígitos
    if (minFim < 10) {
        minFim = "0" + minFim;
    }

    // Formatação para garantir que a hora não ultrapasse 24 horas
    if (horaFim >= 24) {
        horaFim -= 24;
    }

    return horaFim + ":" + minFim;
}
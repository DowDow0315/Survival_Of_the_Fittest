function processAkasiaText(text, player){
    return text.replaceAll("{akasiaTitle}", getValenTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getAkasiaTitle(player){
    if (NPC_DATA["akasia"].emotion.rage > 80) return "아름다운 그대";
    else if(NPC_DATA["akasia"].emotion.affection > 80) return "나의 그대";
    else if(NPC_DATA["akasia"].emotion.affection > 50) return "상류도시의 그대";
    else if(NPC_DATA["akasia"].emotion.affection > 30) return "하류도시의 그대";
    return "시민";
}
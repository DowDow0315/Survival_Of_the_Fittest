function processSionText(text, player){
    return text.replaceAll("{sionTitle}", getSionTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getSionTitle(player){
    if (NPC_DATA["sion"].emotion.dominance > 80) return "내 심장";
    else if(NPC_DATA["sion"].emotion.affection > 70) return "나만의 영웅님";
    return "영웅님";
}
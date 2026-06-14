function processKainText(text, player){
    return text.replaceAll("{kainTitle}", getValenTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getKainTitle(player){
    if (NPC_DATA["kain"].emotion.rage > 60) return "개자식";
    else if(NPC_DATA["kain"].emotion.affection > 80) return "나의 별";
    else if(NPC_DATA["kain"].emotion.affection > 50) return "별";
    return "그새끼꺼";
}
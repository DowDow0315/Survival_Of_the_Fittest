function processValenText(text, player){
    return text.replaceAll("{valenTitle}", getValenTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getValenTitle(player){
    if (NPC_DATA["valen"].emotion.rage > 60) return "버러지";
    else if(NPC_DATA["valen"].emotion.affection > 80) return "창백한꽃";
    else if(NPC_DATA["valen"].emotion.affection > 50) return "꽃";
    return "시민";
}
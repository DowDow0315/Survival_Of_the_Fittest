function processDericText(text, player){
    return text.replaceAll("{dericTitle}", getDericTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getDericTitle(player){
    if (NPC_DATA["deric"].emotion.affection > 80) return "아들";
    else if(NPC_DATA["deric"].emotion.affection > 50) return "파트너";
    return "꼬마";
}
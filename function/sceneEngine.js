function processText(text, player){
    return text
    .replace("리플레이스단어"), getPlayerTitle(player);
}

function getPlayerTitle(player){
    if (player.gender === "male") return "멋쟁이";
    if (player.gender === "female") return "예쁜이";
    return "귀염둥이";
}
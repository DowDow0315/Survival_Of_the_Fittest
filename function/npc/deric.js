function processDericText(text, player){
    return text.replaceAll("{dericTitle}", getDericTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getDericTitle(player){
    if (NPC_DATA["deric"].emotion.affection > 80) return "천사";
    else if(NPC_DATA["deric"].emotion.affection > 50) return "파트너";
    return "아가";
}

function deric_date_01_accepted(player){
    changeEmotion("deric", "affection", 3);
    changeEmotion("deric", "dominance", 5);
    savePlayer(player);

    startScene(SCENES.deric.deric_date_01_accepted, player, {
        onEnd : () => {
            player.location = "gloryStreet";
            player.flags.dericDate01Accepted = true;
            passTime(player, 10);
            changeGold(player, 1000);
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
    });
}

function deric_date_01_refused(player){
    player.flags = player.flags || {};
    player.flags.dericDate01Refused = true;

    changeEmotion("deric", "affection", -5);
    changeEmotion("deric", "rage", 3);

    savePlayer(player);
}
function processNikolaiText(text, player){
    return text.replaceAll("{nikolaiTitle}", getNikolaiTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getNikolaiTitle(player){
    if (NPC_DATA["nikolai"].emotion.rage > 70) return "암퇘지";
    else if(NPC_DATA["nikolai"].emotion.lust > 70) return "아가";
    else if(NPC_DATA["nikolai"].emotion.affection > 80) return "보석";
    else if(NPC_DATA["nikolai"].emotion.affection > 50) return "스위츠달링";
    return "자기";
}

registerActions("nikolai", {
    //처음 이벤트
    gloryHoleWelcome_defiant: (player) => {
        changeEmotion("nikolai", "rage", 2);
        startScene(NPC_DATA["nikolai"].scenes.nikolai_gloryHoleWelcome_defiant, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },

    gloryHoleWelcome_neutral: (player) => {
        changeEmotion("nikolai", "affection", 3);
        startScene(NPC_DATA["nikolai"].scenes.nikolai_gloryHoleWelcome_neutral, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },

    gloryHoleWelcome_submissive: (player) => {
        changeEmotion("nikolai", "affection", 5);
        changeGold(player, 100);
        startScene(NPC_DATA["nikolai"].scenes.nikolai_gloryHoleWelcome_submissive, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    }

    //개인이벤트

    //스토리이벤트
})

window.giveDericLetter = function(player){
    if (!hasItem(player, "데릭의 친필 서신")){
        addItem(player, ITEMS.misc.dericLetter);
    }

    player.flags.dericLetterReceived = true;
    savePlayer(player);
};
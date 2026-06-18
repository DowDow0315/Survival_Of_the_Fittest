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
            player.flags.dericDate01AcceptedDay = getCurrentDay(player);
            passTime(player, 10);
            changeGold(player, 800);
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
    });
    return true;
}

function deric_date_01_refused(player){
    player.flags = player.flags || {};
    player.flags.dericDate01Refused = true;

    changeEmotion("deric", "affection", -5);
    changeEmotion("deric", "rage", 3);

    savePlayer(player);
}

function deric_date_02_accepted(player){
    changeEmotion("deric", "affection", 5);
    changeEmotion("deric", "dominance", 3);
    savePlayer(player);

    startScene(SCENES.deric.deric_date_02_accepted, player, {
        onEnd : () => {
            player.location = "gloryStreet";
            player.flags.dericDate02Accepted = true;
            player.flags.dericDate02AcceptedDay = getCurrentDay(player);
            passTime(player, 20);
            changeGold(player, 1200);
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
    });
    return true;
}

function deric_date_02_refused(player){
    player.flags = player.flags || {};
    player.flags.dericDate02Refused = true;

    changeEmotion("deric", "affection", -5);
    changeEmotion("deric", "rage", 3);

    savePlayer(player);
}

function deric_repeat_date(player){
    player.flags = player.flags || {};
    player.flags.dericRepeatDateCheckedDay = getCurrentDay(player);

    savePlayer(player);

    startScene(SCENES.deric.deric_repeat_date, player, {
        onEnd : () => {
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
    });
}

function deric_repeat_date_place(player){
    const scenes = [
        "deric_repeat_restaurant",
        "deric_repeat_theater",
        "deric_repeat_party"
    ];

    const sceneId = scenes[Math.floor(Math.random() * scenes.length)];

    startScene(SCENES.deric[sceneId], player);
    return true;
}

function deric_repeat_restaurant_branch(player){
    return deric_repeat_branch_by_place(player, "restaurant");
}

function deric_repeat_theater_branch(player){
    return deric_repeat_branch_by_place(player, "theater");
}

function deric_repeat_party_branch(player){
    return deric_repeat_branch_by_place(player, "party");
}

function deric_repeat_branch_by_place(player, place){
    const affection = NPC_DATA["deric"].emotion.affection;

    if (affection >= 50){
        startScene(SCENES.deric[`deric_repeat_${place}_to_house`], player, {
            onEnd : () => {
                savePlayer(player);
                startScene(getLocationScene(player), player);
            }
        });
    } else {
        startScene(SCENES.deric[`deric_repeat_${place}_goodbye`], player, {
            onEnd : () => {
                player.location = "gloryStreet";
                savePlayer(player);
                startScene(getLocationScene(player), player);
            }
        });
    }
    return true;
}

function deric_repeat_date_house(player){
    const scenes = [
        "deric_repeat_house_01",
        "deric_repeat_house_02",
        "deric_repeat_house_03"
    ];

    const sceneId = scenes[Math.floor(Math.random() * scenes.length)];

    startScene(SCENES.deric[sceneId], player, {
        onEnd : () => {
            player.location = "gloryStreet";
            passToNextMorning9(player);
            startScene(getLocationScene(player), player);
        }
    });
    return true;
}

function deric_repeat_date_accepted(player){
    player.flags = player.flags || {};
    player.flags.dericRepeatDateCount = (player.flags.dericRepeatDateCount || 0) + 1;

    changeEmotion("deric", "affection", 3);
    changeEmotion("deric", "dominance", 2);

    savePlayer(player);

    return deric_repeat_date_place(player);
}

function deric_repeat_date_refused(player){

    changeEmotion("deric", "affection", -5);
    changeEmotion("deric", "rage", 3);

    savePlayer(player);
}
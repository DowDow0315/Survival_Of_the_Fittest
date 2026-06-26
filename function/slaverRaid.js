function initSlaverRaid(player){
    player.slaverRaid = player.slaverRaid || {
        active : false,
        progress : 0,
        maxProgress : getRandomSlaverRaidMaxProgress(),
        prisonerEventDone : false,
        campFound : false
    };
}

function getRandomSlaverRaidMaxProgress(){
    return 7 + Math.floor(Math.random() * 4); // 7~10
}

window.startSlaverRaid = function(player){
    player.slaverRaid = {
        active: true,
        progress: 0,
        maxProgress: getRandomSlaverRaidMaxProgress(),
        prisonerEventDone: false,
        campFound: false
    };

    savePlayer(player);

    startScene([
        {
            type: "text",
            value: "당신은 인신매매단의 흔적을 따라가기 시작했다."
        }
    ], player, {
        onEnd: () => advanceSlaverRaid(player)
    });
};

function advanceSlaverRaid(player){
    initSlaverRaid(player);

    const raid = player.slaverRaid;

    if (!raid.active) return;

    if (raid.progress >= raid.maxProgress){
        endSlaverRaidFoundCamp(player);
        return;
    }

    raid.progress++;

    passTime(player, 5);
    savePlayer(player);

    startSlaverRaidRandomEvent(player);
}

function startSlaverRaidRandomEvent(player){
    const eventId = pickWeighted([
        { id: "slaverRaid_trafficker1", weight: 40 },
        { id: "slaverRaid_trafficker2", weight: 30 },
        { id: "slaverRaid_trafficker3", weight: 20 },
        { id: "slaverRaid_hidden_prisoner", weight: 10 },
        { id: "slaverRaid_arrow_minigame", weight: 15 }
    ]);

    if (eventId === "slaverRaid_trafficker1"){
        showSingleTextScene("인신매매단의 호위가 길을 막았다.", player, {
            onEnd: () => startBattle("trafficker1", player, {
                noEscape : true,

                onWin: () => advanceSlaverRaid(player)
            })
        });
        return;
    }
}
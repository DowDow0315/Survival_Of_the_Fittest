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
        { id: "slaverRaid_trafficker1", weight: 30 },
        { id: "slaverRaid_trafficker2", weight: 30 },
        { id: "slaverRaid_trafficker3", weight: 20 },
        { id: "slaverRaid_hidden_prisoner", weight: 10 },
        { id: "slaverRaid_arrow_minigame", weight: 15 }
    ]);

    if (eventId === "slaverRaid_trafficker1"){
        showSingleTextScene("인신매매상이 길을 막았다. 그는 당신을 위아래로 훑어보더니 제압봉을 바로잡았다.", player, {
            onEnd: () => startBattle("trafficker1", player, {
                noEscape : true,

                onWin: () => advanceSlaverRaid(player)
            })
        });
        return;
    }

    if (eventId === "slaverRaid_trafficker2"){
        showSingleTextScene("인신매매상이 길을 막았다. <br><br>\"우리를 토벌하러 왔다고?\"<br><br>그는 비스듬히 웃었다.<br><br>\"영웅 놀이라도 하고 있는 모양이군.\"", player, {
            onEnd: () => startBattle("trafficker2", player, {
                noEscape : true,

                onWin: () => advanceSlaverRaid(player)
            })
        });
        return;
    }

    if (eventId === "slaverRaid_trafficker3"){
        showSingleTextScene("인신매매상이 길을 막았다. 근육으로 이루어진 그의 덩치에 당신은 위협을 느꼈다. ", player, {
            onEnd: () => startBattle("trafficker3", player, {
                noEscape : true,

                onWin: () => advanceSlaverRaid(player)
            })
        });
        return;
    }
}
function initWhiteArmyRaid(player){
    player.whiteArmyRaid = player.whiteArmyRaid || {
        active : false,
        progress : 0,
        maxProgress : 12
    };
}

window.startWhiteArmyRaid = function(player){
    initWhiteArmyRaid(player);

    player.whiteArmyRaid = {
        active : true,
        progress : 0,
        maxProgress : getRandomWhiteArmyRaidMaxProgress()
    };

    savePlayer(player);

    startScene([
        {
            type : "text",
            value :
                "당신은 백색 군단을 토벌하기 위해 나섰다. 상류도시 사람들이 당신에게 비난을 쏟아낸다고 해도, 몇몇의 하류도시 사람들은 당신에게서 희망을 보겠지. 당신은 복면을 썼다."
        }
    ], player, {
        onEnd : () => {
            advanceWhiteArmyRaid(player);
        }
    });
};

function advanceWhiteArmyRaid(player){
    initWhiteArmyRaid(player);

    const raid = player.whiteArmyRaid;

    if (!raid.active) return;

    if (raid.progress >= raid.maxProgress){
        startWhiteArmyRaidBoss(player);
        return;
    }

    raid.progress++;

    passTime(player, 5);
    savePlayer(player);

    startWhiteArmyRaidRandomEvent(player);
}

function startWhiteArmyRaidRandomEvent(player){
    const eventId = pickWeighted([
        { id: "whiteArmyRaid_armies", weight: 30 },
        { id: "whiteArmyRaid_armies2", weight: 30 },
        { id: "whiteArmyRaid_armies3", weight: 25 },
        { id: "whiteArmyRaid_pepper", weight: 10 },
        { id: "whiteArmyRaid_theirNameList", weight: 5 }
    ]);

    if (eventId === "whiteArmyRaid_armies"){
        showSingleTextScene(
            "당신을 본 백색 군인들이 당신에게 달려든다!",
            player,
            {
                onEnd: () => startBattle(["whiteArmy1", "whiteArmy1", "whiteArmy2"], player, {
                    noEscape: true,
                    onWin: () => showWhiteArmyRaidChoice(player)
                })
            }
        );
        return;
    }

    if (eventId === "whiteArmyRaid_armies2"){
        showSingleTextScene(
            "검을 든 백색 군인들이 당신을 향해 걸어온다.",
            player,
            {
                onEnd: () => startBattle(["whiteArmy1", "whiteArmy3"], player, {
                    noEscape: true,
                    onWin: () => showWhiteArmyRaidChoice(player)
                })
            }
        );
        return;
    }

    if (eventId === "whiteArmyRaid_armies3"){
        showSingleTextScene(
            "쌍도끼를 든 백색 군인들이 당신을 향해 걸어온다.",
            player,
            {
                onEnd: () => startBattle(["whiteArmy2", "whiteArmy4"], player, {
                    noEscape: true,
                    onWin: () => showWhiteArmyRaidChoice(player)
                })
            }
        );
        return;
    }

    if (eventId === "whiteArmyRaid_pepper"){
        startScene([
            {
                type: "text",
                value:
                    "당신은 백색 군단의 보급품 상자에서 고추를 발견했다. 당신은 고추를 챙겼다."
            },
            {
                type: "effect",
                run: (player) => {
                    addItem(player, ITEMS.misc.pepper);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => showWhiteArmyRaidChoice(player)
        });
        return;
    }

    if (eventId === "whiteArmyRaid_theirNameList"){
        startScene([
            {
                type: "text",
                value:
                    "당신은 명단들이 적혀있는 노트를 보았다. 이 명단에 적힌 사람들에게 무슨 일이 벌어졌는지는 모른다. 하지만 당신은 그 명단들 중 아는 사람의 이름들을 발견했다. 당신이 구했는데도 실종자 명단에 올라가있는 사람들도 있었고, 갑자기 도시에서 사라져버린 사람들의 이름도 있었다. <br><br>하류도시뿐만 아니라 상류도시에서 사라진 사람들의 이름도."
            },
            {
                type: "effect",
                run: (player) => {
                    changeTrauma(player, 5);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => showWhiteArmyRaidChoice(player)
        });
        return;
    }
}

function getRandomWhiteArmyRaidMaxProgress(){
    return 10 + Math.floor(Math.random() * 3); // 10~12
}

window.whiteArmyRaid_leave = function(player){
    player.whiteArmyRaid.active = false;
    player.whiteArmyRaid.failed = true;

    if (player.quest?.active?.id === "act3_quest_03_rebels"){
        player.quest.active = null;
    }

    if (player.quest?.active?.id === "whiteArmyRaid_cleanup"){
        player.quest.active = null;
    }

    savePlayer(player);

    startScene([
        {
            type : "text",
            value :
                "백색군단은 다시 자신의 세력을 강화했다. 당신은 백색군단의 힘을 약화시키지 못했다.<br><br>" +
                "<strong style='color:red; font-size:1.4rem'>임무 실패</strong>"
        }
    ], player, {
        onEnd : () => {
            player.location = "deepForest_act3";
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
    });
};

function startWhiteArmyRaidBoss(player){
    startScene([
        {
            type : "text",
            value :
                "\"비켜라.\"<br><br>백색군단 장군이 할버드를 들고 당신의 앞으로 나섰다. <br><br>\"발렌님을 위해, 죽여주마.\""
        }
    ], player, {
        onEnd : () => {
            startBattle("whiteArmyLeader1", player, {
                noEscape : true,

                onWin : () => {
                    endWhiteArmyRaidWin(player);
                }
            });
        }
    });
}

function endWhiteArmyRaidWin(player){
    player.whiteArmyRaid.active = false;

    addQuestProgress(player, "whiteArmyLeader1");

    savePlayer(player);

    showSingleTextScene(
        "당신은 백색 군단의 힘을 약화시켰다. 당신은 하류도시의 영웅이지, 상류도시의 영웅이 아니다.",
        player,
        {
            onEnd : () => {
                changeNPCEmotion("valen", "rage", 10);
                changeNPCEmotion("aiden", "rage", 10);
                player.location = "deepForest_act3";
                savePlayer(player);
                startScene(getLocationScene(player), player);
            }
        }
    );
}

function showWhiteArmyRaidChoice(player){
    startScene([
        {
            type: "text",
            value:
                "백색 군단은 당신을 경계하고 있다. 당신은 복면을 고쳐썼다."
        },
        {
            type: "choice",
            choices: [
                {
                    text: "계속 전진한다",
                    action: "continueWhiteArmyRaid"
                },
                {
                    text: "잠시 쉰다",
                    action: "restWhiteArmyRaid"
                },
                {
                    text: "퇴각한다",
                    action: "whiteArmyRaid_leave"
                }
            ]
        }
    ], player);
}

window.restWhiteArmyRaid = function(player){
    startScene([
        {
            type: "text",
            value:
                "당신은 잠깐 쉬었다. 당신이 쉬는 동안, 백색 군단은 대열을 정비하고 있다."
        },
        {
            type: "effect",
            run: (player) => {
                passTime(player, 20);
                changeHP(player, 100);
                changeStamina(player, 100);

                player.whiteArmyRaid.progress = Math.max(0, player.whiteArmyRaid.progress - 1);

                savePlayer(player);
            }
        }
    ], player, {
        onEnd: () => showWhiteArmyRaidChoice(player)
    });
};

window.continueWhiteArmyRaid = function(player){
    advanceWhiteArmyRaid(player);
};
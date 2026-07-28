function initRebelRaid(player){
    player.rebelRaid = player.rebelRaid || {
        active : false,
        progress : 0,
        maxProgress : 12
    };
}

window.startRebelRaid = function(player){
    initRebelRaid(player);

    player.rebelRaid = {
        active : true,
        progress : 0,
        maxProgress : getRandomRebelRaidMaxProgress()
    };

    savePlayer(player);

    startScene([
        {
            type : "text",
            value :
                "당신은 반란군 깃발을 발견했다.<br><br>...그리고 당신은 그 깃발을 꺾으러 가고 있다."
        }
    ], player, {
        onEnd : () => {
            advanceRebelRaid(player);
        }
    });
};

function advanceRebelRaid(player){
    initRebelRaid(player);

    const raid = player.rebelRaid;

    if (!raid.active) return;

    if (raid.progress >= raid.maxProgress){
        startRebelRaidBoss(player);
        return;
    }

    raid.progress++;

    passTime(player, 5);
    savePlayer(player);

    startRebelRaidRandomEvent(player);
}

function startRebelRaidRandomEvent(player){
    const eventId = pickWeighted([
        { id: "rebelRaid_rebels", weight: 30 },
        { id: "rebelRaid_rebels2", weight: 30 },
        { id: "rebelRaid_rebels3", weight: 25 },
        { id: "rebelRaid_pepper", weight: 10 },
        { id: "rebelRaid_yourName", weight: 5 }
    ]);

    if (eventId === "rebelRaid_rebels"){
        showSingleTextScene(
            "당신을 본 반란군들이 당신에게 달려든다!",
            player,
            {
                onEnd: () => startBattle(["rebels2", "rebels3", "rebels4"], player, {
                    noEscape: true,
                    onWin: () => showRebelRaidChoice(player)
                })
            }
        );
        return;
    }

    if (eventId === "rebelRaid_rebels2"){
        showSingleTextScene(
            "당신을 본 반란군들이 당신에게 달려든다!",
            player,
            {
                onEnd: () => startBattle(["rebels4", "rebels5"], player, {
                    noEscape: true,
                    onWin: () => showRebelRaidChoice(player)
                })
            }
        );
        return;
    }

    if (eventId === "rebelRaid_rebels3"){
        showSingleTextScene(
            "당신을 발견한 반란군이 자신의 대검을 들었다. 다른 반란군들이 협공에 나선다.",
            player,
            {
                onEnd: () => startBattle(["rebels6", "rebels1", "rebels2"], player, {
                    noEscape: true,
                    onWin: () => showRebelRaidChoice(player)
                })
            }
        );
        return;
    }

    if (eventId === "rebelRaid_pepper"){
        startScene([
            {
                type: "text",
                value:
                    "당신은 반란군 기지에서 상자를 하나 발견했다. 가까이에 가서 열어보니 귀한 고추가 있었다. 이들은 대체 어디서 고추를 얻은 걸까. 당신은 고추를 챙겼다."
            },
            {
                type: "effect",
                run: (player) => {
                    addItem(player, ITEMS.misc.pepper);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => showRebelRaidChoice(player)
        });
        return;
    }

    if (eventId === "rebelRaid_yourName"){
        startScene([
            {
                type: "text",
                value:
                    "당신은 반란군 기지에서 당신의 이름이 적혀있는 메모를 보았다. 당신은 그들에게 꼭 죽여야 하는 인물 중 하나인 모양이다."
            },
            {
                type: "effect",
                run: (player) => {
                    changeTrauma(player, 5);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => showRebelRaidChoice(player)
        });
        return;
    }
}

function getRandomRebelRaidMaxProgress(){
    return 10 + Math.floor(Math.random() * 3); // 10~12
}

window.rebelRaid_leave = function(player){
    player.rebelRaid.active = false;
    player.rebelRaid.failed = true;

    if (player.quest?.active?.id === "act3_quest_03_upper"){
        player.quest.active = null;
    }

    if (player.quest?.active?.id === "rebelRaid_cleanup"){
        player.quest.active = null;
    }

    savePlayer(player);

    startScene([
        {
            type : "text",
            value :
                "반란군들은 눈치를 채고 근거지를 옮겨버렸다.<br><br>" +
                "<strong style='color:red; font-size:1.4rem'>임무 실패</strong>"
        }
    ], player, {
        onEnd : () => {
            changeNPCEmotion("valen", "affection", -3);
            player.location = "deepForest_act3";
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
    });
};

function startRebelRaidBoss(player){
    startScene([
        {
            type : "text",
            value :
                "당신은 반란군 진지 가장 안쪽까지 도착했다. 반란군이 자리에서 일어났다. <br><br>\"하류도시의 영웅이라고? 네놈은 그 호칭을 쓰면서 부끄럽지도 않느냐.\"<br><br>그가 당신을 공격해온다!"
        }
    ], player, {
        onEnd : () => {
            startBattle("rebelLeader3", player, {
                noEscape : true,

                onWin : () => {
                    endRebelRaidWin(player);
                }
            });
        }
    });
}

function endRebelRaidWin(player){
    player.rebelRaid.active = false;

    addQuestProgress(player, "rebelLeader3");

    savePlayer(player);

    showSingleTextScene(
        "당신은 반란군들을 소탕했다. 상류도시는 당신 때문에 조금 더 오래 빛날 것이다.",
        player,
        {
            onEnd : () => {
                changeNPCEmotion("yuri", "rage", 5);
                player.location = "deepForest_act3";
                savePlayer(player);
                startScene(getLocationScene(player), player);
            }
        }
    );
}

function showRebelRaidChoice(player){
    startScene([
        {
            type: "text",
            value:
                "당신은 반란군 깃발을 하나하나 꺾고 있다."
        },
        {
            type: "choice",
            choices: [
                {
                    text: "계속 전진한다",
                    action: "continueRebelRaid"
                },
                {
                    text: "잠시 쉰다",
                    action: "restRebelRaid"
                },
                {
                    text: "퇴각한다",
                    action: "rebelRaid_leave"
                }
            ]
        }
    ], player);
}

window.restRebelRaid = function(player){
    startScene([
        {
            type: "text",
            value:
                "당신은 잠깐 쉬었다. 당신이 쉬는 동안, 반란군들은 대열을 정비하고 있다."
        },
        {
            type: "effect",
            run: (player) => {
                passTime(player, 20);
                changeHP(player, 100);
                changeStamina(player, 100);

                player.rebelRaid.progress = Math.max(0, player.rebelRaid.progress - 1);

                savePlayer(player);
            }
        }
    ], player, {
        onEnd: () => showRebelRaidChoice(player)
    });
};

window.continueRebelRaid = function(player){
    advanceRebelRaid(player);
};
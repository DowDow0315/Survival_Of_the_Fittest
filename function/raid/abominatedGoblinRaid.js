function initAbominatedGoblinRaid(player){
    player.abominatedGoblinRaid = player.abominatedGoblinRaid || {
        active : false,
        progress : 0,
        maxProgress : 12
    };
}

window.startAbominatedGoblinRaid = function(player){
    initAbominatedGoblinRaid(player);

    player.abominatedGoblinRaid = {
        active : true,
        progress : 0,
        maxProgress : getRandomAbominatedGoblinRaidMaxProgress()
    };

    savePlayer(player);

    startScene([
        {
            type : "text",
            value :
                "당신은 실종자들의 흔적을 따라갔다.<br><br>...고블린? 당신은 흉물에 오염된 고블린들이 모여있는 장소에 도착했다."
        }
    ], player, {
        onEnd : () => {
            advanceAbominatedGoblinRaid(player);
        }
    });
};

function advanceAbominatedGoblinRaid(player){
    initAbominatedGoblinRaid(player);

    const raid = player.abominatedGoblinRaid;

    if (!raid.active) return;

    if (raid.progress >= raid.maxProgress){
        startAbominatedGoblinRaidBoss(player);
        return;
    }

    raid.progress++;

    passTime(player, 5);
    savePlayer(player);

    startAbominatedGoblinRaidRandomEvent(player);
}

function startAbominatedGoblinRaidRandomEvent(player){
    const eventId = pickWeighted([
        { id: "abominatedGoblinRaid_goblins", weight: 30 },
        { id: "abominatedGoblinRaid_goblins2", weight: 30 },
        { id: "abominatedGoblinRaid_goblins3", weight: 25 },
        { id: "abominatedGoblinRaid_prisoner", weight: 10 },
        { id: "abominatedGoblinRaid_prisoner2", weight: 5 },
        { id: "abominatedGoblinRaid_restCorner", weight: 5 }
    ]);

    if (eventId === "abominatedGoblinRaid_goblins"){
        showSingleTextScene(
            "모여있던 흉물에 오염된 고블린들이 당신을 보더니 그르륵거리는 소리와 함께 달려들었다.",
            player,
            {
                onEnd: () => startBattle(["abominatedGoblin", "abominatedGoblin", "abominatedGoblin"], player, {
                    noEscape: true,
                    onWin: () => showAbominatedGoblinRaidChoice(player)
                })
            }
        );
        return;
    }

    if (eventId === "abominatedGoblinRaid_goblins2"){
        showSingleTextScene(
            "고블린들 중심에는 백색 흉물이 있었다. 백색 흉물이 당신을 바라보자 고블린들은 마치 명령에 따르듯이 대열을 갖추어 당신을 포위했다.",
            player,
            {
                onEnd: () => startBattle(["abominatedGoblin", "abominatedGoblin", "whiteAbomination1"], player, {
                    noEscape: true,
                    onWin: () => showAbominatedGoblinRaidChoice(player)
                })
            }
        );
        return;
    }

    if (eventId === "abominatedGoblinRaid_goblins3"){
        showSingleTextScene(
            "당신은 흉물에 오염된 고블린들이 죽어가는 다른 고블린을 파먹고 있는 모습을 보았다.... 살점처럼 보이던 흉물이 꿈틀거리더니 융합되었다. 융합된 흉물이 고블린들과 함께 당신을 공격한다.",
            player,
            {
                onEnd: () => startBattle(["abominatedGoblin", "abominatedGoblin", "abominationMixedArms", "abominationMixedHead"], player, {
                    noEscape: true,
                    onWin: () => showAbominatedGoblinRaidChoice(player)
                })
            }
        );
        return;
    }

    if (eventId === "abominatedGoblinRaid_prisoner"){
        startScene([
            {
                type: "text",
                value:
                    "당신은 온 구멍이 검붉은 것으로 끓고 있는 시체를 보았다. 아직 살아있는지 그는 신음 소리를 흘리다가 당신이 있는 쪽으로 손을 내밀며 제발 살려달라고 말했다."
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 그를 죽여주었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 그를 죽였다. 그를 죽이자 흉물의 작은 알들이 데굴데굴 굴러나왔다.<br><br>...당신이 그에게 베푼 것이 자비였는지는 모르겠다. 확실한 건 그는 살고 싶어했고, 당신은 그의 고통을 끝내주었다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    addItem(player, ITEMS.misc.abominationSmallEgg);
                                    addItem(player, ITEMS.misc.abominationSmallEgg);
                                    addItem(player, ITEMS.misc.abominationSmallEgg);
                                    changeTrauma(player, 5);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 그를 지나쳤다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "...그 모습이 되어서도 그는 살고 싶어하고 있다. 당신은 그를 그대로 지나쳤다."
                                ]
                            }
                        ]
                    }
                ]
            }
        ], player, {
            onEnd: () => showAbominatedGoblinRaidChoice(player)
        });
        return;
    }

    if (eventId === "abominatedGoblinRaid_prisoner2"){
        startScene([
            {
                type: "text",
                value:
                    "당신은 묶여있지도 않는데 바닥에 그저 널부러져 있는 포로들을 보았다. 몇몇은 정신이 나갔는지 알아들을 수 없는 말을 중얼거리고 있었고, 몇몇은 기괴하게 뼈와 살이 뒤틀려서 도저히 움직일 수가 없는 상황이었다." +
                    "<br><br>\"...끄으...끄으...?\"<br><br>" +
                    "백흉물에 잠식되어 가고 있던 사람이 당신을 발견했다. 그는 당신을 보더니 고개를 휘저으며 비명을 질렀다." +
                    "<br><br>\"아니야! 보면 안돼! 당신, 지금 당장 도망가! 그들에게 신호가...!\"<br><br>"+
                    "그의 비명이 뚝 멈췄다. 당장 자리를 피해야 할 것만 같다. 당신은 재빨리 자리를 벗어났다."
            },
            {
                type: "effect",
                run: (player) => {
                    changeTrauma(player, 5);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => showAbominatedGoblinRaidChoice(player)
        });
        return;
    }

    if (eventId === "abominatedGoblinRaid_restCorner"){
        startScene([
            {
                type: "text",
                value:
                    "당신은 주변에 쉴 수 있는 틈새를 찾았다. 당신은 잠깐 쉬었다가 앞으로 나아갔다."
            },
            {
                type: "effect",
                run: (player) => {
                    changeHP(player, 100);
                    changeStamina(player, 100);
                    passTime(player, 15);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => showAbominatedGoblinRaidChoice(player)
        });
        return;
    }
}

function getRandomAbominatedGoblinRaidMaxProgress(){
    return 10 + Math.floor(Math.random() * 3); // 10~12
}

window.abominatedGoblinRaid_leave = function(player){
    player.abominatedGoblinRaid.active = false;
    player.abominatedGoblinRaid.failed = true;

    if (player.quest?.active?.id === "act3_quest_06"){
        player.quest.active = null;
    }

    if (player.quest?.active?.id === "abominatedGoblinRaid_cleanup"){
        player.quest.active = null;
    }

    savePlayer(player);

    startScene([
        {
            type : "text",
            value :
                "실종자들 수색이 끊겨버렸다.<br><br>" +
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

function startAbominatedGoblinRaidBoss(player){
    startScene([
        {
            type : "text",
            value :
                "...당신이 구할 수 있는 실종자는 없다. 당신이 유일하게 할 수 있는 것은, 사람들의 인생을 파괴한 흉물을 토벌하는 것뿐이다. 당신이 마지막까지 도달하자 앉아있던 고블린 킹이 일어났다. 한때는 고블린들의 가장 위에서 사람들의 인생을 파괴해왔던 왕이, 지금은 흉물에게 오염되어 사람들의 인생을 파괴하고 있었다. 당신은 무기를 들었다. 옆에 있던 오염된 고블린들이 그르륵그르륵 소리를 내며 고블린킹의 옆에 보좌하듯이 섰다." +
                "<br><br>...마치 인간의 군대처럼."
        }
    ], player, {
        onEnd : () => {
            startBattle(["abominatedGoblin", "abominatedGoblin", "abominatedGoblinKing"], player, {
                noEscape : true,

                onWin : () => {
                    endAbominatedGoblinRaidWin(player);
                }
            });
        }
    });
}

function endAbominatedGoblinRaidWin(player){
    player.abominatedGoblinRaid.active = false;

    addQuestProgress(player, "abominatedGoblinKing");

    savePlayer(player);

    showSingleTextScene(
        "...당신은 인생이 파괴된 사람들을 위해 해줄 수 있는 일은 전부 했다.<br><br>남은 사람들이 앞으로 살아갈 수 있을지는 모르겠지만.",
        player,
        {
            onEnd : () => {
                player.location = "deepForest_act3";
                savePlayer(player);
                startScene(getLocationScene(player), player);
            }
        }
    );
}

function showAbominatedGoblinRaidChoice(player){
    startScene([
        {
            type: "text",
            value:
                "당신은 실종자 흔적을 쫓으며, 흉물에 오염된 고블린들을 하나하나 처단하고 있다."
        },
        {
            type: "choice",
            choices: [
                {
                    text: "계속 전진한다",
                    action: "continueAbominatedGoblinRaid"
                },
                {
                    text: "잠시 쉰다",
                    action: "restAbominatedGoblinRaid"
                },
                {
                    text: "퇴각한다",
                    action: "AbominatedGoblinRaid_leave"
                }
            ]
        }
    ], player);
}

window.restAbominatedGoblinRaid = function(player){
    startScene([
        {
            type: "text",
            value:
                "당신은 잠깐 쉬었다. 당신이 쉬는 동안, 실종자의 흔적은 옅어지고 있다."
        },
        {
            type: "effect",
            run: (player) => {
                passTime(player, 20);
                changeHP(player, 150);
                changeStamina(player, 150);

                player.abominatedGoblinRaid.progress = Math.max(0, player.abominatedGoblinRaid.progress - 1);

                savePlayer(player);
            }
        }
    ], player, {
        onEnd: () => showAbominatedGoblinRaidChoice(player)
    });
};

window.continueAbominatedGoblinRaid = function(player){
    advanceAbominatedGoblinRaid(player);
};
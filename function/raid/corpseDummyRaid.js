function initCorpseDummyRaid(player){
    player.corpseDummyRaid = player.corpseDummyRaid || {
        active : false,
        progress : 0,
        maxProgress : 12
    };
}

window.startCorpseDummyRaid = function(player){
    player.corpseDummyRaid = {
        active: true,
        progress: 0,
        maxProgress: getRandomCorpseDummyRaidMaxProgress(),
        middleEventDone: false,
        sanctuaryFound: false
    };

    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "실험실은 일방향 통로에 좌우로 방이 다닥다닥 붙어 있었다. 그 모습은 마치 병원처럼 보이기도 했고 감옥처럼 보이기도 했다. 방안에는 흰색 침대 위로 인간이 한 명씩 누워 있었다. 피부는 썩지 않았지만 살아있는 것처럼은 보이지 않았다. 그들은 마치 시체처럼 미동이 없었다, 입에 거대한 호스를 꽂은 채로." +
                "<br><br>아니.<br><br>" +
                "자세히 보니 미동은 있었다.<br><br>시체 안에서의 미동이.<br><br>당신은 가장 끝을 향해 발걸음을 옮겼다." +
                "<br><br>...방금, 시체가 움직이지 않았나?"
        }
    ], player, {
        onEnd: () => advanceCorpseDummyRaid(player)
    });
};

function advanceCorpseDummyRaid(player){
    initAct3Quest09Raid(player);

    const raid = player.corpseDummyRaid;

    if (!raid.active) return;

    if (raid.progress >= raid.maxProgress){
        endCorpseDummyRaidFoundSanctuary(player);
        return;
    }

    raid.progress++;

    passTime(player, 5);

    const middleEventPoints = [3, 6, 9, 12];
    
    if (
        raid.middleEventCount < middleEventPoints.length &&
        raid.progress === middleEventPoints[raid.middleEventCount]
    ){
        const eventIndex = raid.middleEventCount;
        raid.middleEventCount++;
        savePlayer(player);
        
        startCorpseDummyRaidMiddleEvent(player, eventIndex);
        return;
    }

    savePlayer(player);

    startCorpseDummyRaidRandomEvent(player);
}

function startCorpseDummyRaidRandomEvent(player){
    const eventId = pickWeighted([
        { id: "corpseDummyRaid_a", weight: 30 },
        { id: "corpseDummyRaid_b", weight: 30 },
        { id: "corpseDummyRaid_c", weight: 30 },
        { id: "corpseDummyRaid_d", weight: 10 },
        { id: "corpseDummyRaid_e", weight: 5 },
        { id: "corpseDummyRaid_f", weight: 10 }
    ]);

    if (eventId === "corpseDummyRaid_a"){
        showSingleTextScene(
            "복도를 지나는 당신의 앞으로 갑자기 시체가 세 구 쿵쿵 떨어졌다. 그러더니 그것들은 움직이기 시작했다.",
            player,
            {
                onEnd: () => startBattle(["experimentAboCorpse1", "experimentAboCorpse1", "experimentAboCorpse1"], player, {
                    noEscape: true,
                    onWin: () => showCorpseDummyRaidChoice(player)
                })
            }
        );
        return;
    }

    if (eventId === "corpseDummyRaid_b"){
        showSingleTextScene(
            "복도를 지나가는 당신의 앞으로 좌에 있던 문이 벌컥 열렸다. 시체에서 뿜어나온 촉수가 스르르 움직이는 것이 보인다. 당신이 그냥 지나가려고 하자 시체에서 뻗어나온 백흉물 촉수가 당신의 앞길을 날카롭게 막았다. 싸울 수밖에 없을 것 같다...!",
            player,
            {
                onEnd: () => startBattle(["experimentAboCorpse1", "experimentAboCorpse2", "experimentAboCorpse1"], player, {
                    noEscape: true,
                    onWin: () => showCorpseDummyRaidChoice(player)
                })
            }
        );
        return;
    }

    if (eventId === "corpseDummyRaid_c"){
        showSingleTextScene(
            "복도를 지나가는 당신의 앞으로 우에 있던 문이 벌컥 열렸다. 시체에서 뿜어나온 촉수가 스르르 움직이는 것이 보인다. 당신이 그냥 지나가려고 하자 시체에서 뻗어나온 백흉물 촉수가 당신의 앞길을 날카롭게 막았다. 싸울 수밖에 없을 것 같다...!",
            player,
            {
                onEnd: () => startBattle(["experimentAboCorpse1", "experimentAboCorpse2", "experimentAboCorpse3"], player, {
                    noEscape: true,
                    onWin: () => showCorpseDummyRaidChoice(player)
                })
            }
        );
        return;
    }

    if (eventId === "corpseDummyRaid_d"){
        showSingleTextScene(
            "복도를 지나는 당신의 앞으로 꾸물거리는 것이 휙 스치고 지나갔다. 당신은 고개를 돌렸다. 당신의 시야에는 꿈틀거리는 백흉물들이 있었다. 당신의 온기에 반응한 그것들이 당신에게 달려든다!",
            player,
            {
                onEnd: () => startBattle(["experimentAboCorpse3", "experimentAboCorpse3", "experimentAboCorpse3", "experimentAboCorpse3", "experimentAboCorpse3"], player, {
                    noEscape: true,
                    onWin: () => showCorpseDummyRaidChoice(player)
                })
            }
        );
        return;
    }

    if (eventId === "corpseDummyRaid_e"){
        startScene([
            {
                type: "text",
                value:
                    "당신은 달콤한 냄새가 훅 풍기는 방의 앞에서 멈췄다. 달콤한 냄새로 가득한 방은 희뿌연해서 방 안의 형체가 잘 보이지도 않았다." +
                    "<br><br>...시체의 입에 꽂혀있던 호스에 틈이 생긴 모양이다. 그 틈에서 달콤한 연기가 뿜어나오고 있었다. 당신은 그 연기를 당신도 모르게 들이마셨다." +
                    "<br>...? 어쩐지 생명력이 솟아오르는 것 같다! 당신의 피부가 순간 흉물의 피부로 보였던 것만 제외하면. 당신은 흉물의 피부로 보였던 팔을 자기도 모르게 긁으며 앞으로 나아갔다."
            },
            {
                type: "effect",
                run: (player) => {
                    changeTrauma(player, 5);
                    changeHP(player, 100);
                    changeStamina(player, 100);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => showCorpseDummyRaidChoice(player)
        });
        return;
    }
}

function getRandomCorpseDummyRaidMaxProgress(){
    return 10 + Math.floor(Math.random() * 3); // 10~12
}

window.corpseDummyRaid_leave = function(player){
    player.corpseDummyRaid.active = false;
    player.corpseDummyRaid.failed = true;

    if (player.quest?.active?.id === "act3_quest_12"){
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

function startCorpseDummyRaidBoss(player){
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

function endCorpseDummyRaidWin(player){
    player.corpseDummyRaid.active = false;

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

function showCorpseDummyRaidChoice(player){
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
                    action: "continueCorpseDummyRaid"
                },
                {
                    text: "잠시 쉰다",
                    action: "restCorpseDummyRaid"
                },
                {
                    text: "퇴각한다",
                    action: "CorpseDummyRaid_leave"
                }
            ]
        }
    ], player);
}

window.restCorpseDummyRaid = function(player){
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
        onEnd: () => showCorpseDummyRaidChoice(player)
    });
};

window.continueCorpseDummyRaid = function(player){
    advanceCorpseDummyRaid(player);
};
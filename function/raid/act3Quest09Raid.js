function initAct3Quest09Raid(player){
    player.act3Quest09Raid = player.act3Quest09Raid || {
        active: false,
        progress: 0,
        maxProgress: getRandomAct3Quest09RaidMaxProgress(),
        middleEventCount: 0,
        sanctuaryFound: false
    };
}

function getRandomAct3Quest09RaidMaxProgress(){
    return 15 + Math.floor(Math.random() * 3); // 15~18
}

window.startAct3Quest09Raid = function(player){
    player.act3Quest09Raid = {
        active: true,
        progress: 0,
        maxProgress: getRandomAct3Quest09RaidMaxProgress(),
        middleEventCount: 0,
        sanctuaryFound: false
    };

    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "당신이 가야하는 길 위로 하얀 꽃잎들이 우수수 떨어져 있다. 당신은 하얀 꽃잎들을 밟으며 걸음을 옮겼다."
        }
    ], player, {
        onEnd: () => advanceAct3Quest09Raid(player)
    });
};

function advanceAct3Quest09Raid(player){
    initAct3Quest09Raid(player);

    const raid = player.act3Quest09Raid;

    if (!raid.active) return;

    if (raid.progress >= raid.maxProgress){
        endAct3Quest09RaidFoundSanctuary(player);
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
        
        startAct3Quest09RaidMiddleEvent(player, eventIndex);
        return;
    }

    savePlayer(player);

    startAct3Quest09RaidRandomEvent(player);
}

function startAct3Quest09RaidRandomEvent(player){
    const eventId = pickWeighted([
        { id: "act3Quest09Raid_whiteflower", weight: 5 },
        { id: "act3Quest09Raid_tentacle", weight: 15 },
        { id: "act3Quest09Raid_flower", weight: 15 },
        { id: "act3Quest09Raid_flower2", weight: 15 },
        { id: "act3Quest09Raid_flower3", weight: 15 }
    ]);

    if (eventId === "act3Quest09Raid_whiteflower"){
        startScene([
            {
                type: "text",
                value:
                    "<strong>{playerName}. 너를 원해.</strong>" +
                    "<br><br>어디선가 익숙한 목소리가 들린다. 그 목소리는 마치 메아리처럼 당신의 머릿속에 울렸다.<br><br>" +
                    "\"두려워. 하지만 동시에 네 선택을 원해.... 내가 무엇을 원하는지 모르겠어.\"<br><br>" +
                    "누군가의 솔직한 고백이 당신의 머리에 계속 울린다. 두 번씩. 바닥에 있던 하얀 꽃잎들이 폭풍처럼 일어나더니 당신에게 생명력을 나누어주고 시들어버렸다."
            },
            {
                type: "effect",
                run: (player) => {
                    changeHP(player, 50);
                    changeStamina(player, 20);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => showAct3Quest09RaidChoice(player)
        });
        return;
    }

    if (eventId === "act3Quest09Raid_tentacle"){
        startScene([
            {
                type: "text",
                value:
                    "당신이 길을 가는 순간, 창백한 촉수 하나가 지면에서 솟구쳤다. 그것은 당신을 더 앞으로 보낼 생각이 없는 것 같다."
            }
        ], player, {
            onEnd: () => {
                startArrowMinigame(player, {
                target: 4, 
                sequenceLength: 8,
                timeLimit: 700,         

                title: "창백한 촉수를 피해라!",

                successText: "당신은 몸을 비틀어 촉수를 피했다!",
                failText: "촉수가 당신을 강하게 후려쳤다!",

                onClear: () => {
                    showSingleTextScene(
                        "당신이 멀리 떨어지자 창백한 촉수는 당신을 더 이상 쫓아오지 않았다. 당신은 뒤를 돌았다. 창백한 촉수는 사라지지 않고 고개를 숙인 채 당신을 빤히 주시하고 있었다.",
                        player,
                        {
                            onEnd: () => showAct3Quest09RaidChoice(player)
                        }
                    );
                },

                onStepFail: (player, state) => {
                    changeHP(player, -15);
                    changeStamina(player, -10);

                    return {
                        text:
                            "촉수가 당신의 몸을 강하게 후려쳤다! 당신의 균형이 흔들렸다!<br><br>" +
                            "당신은 간신히 자세를 바로잡고 다시 달리기 시작했다.",
                        progress: Math.max(0, state.progress - 1)
                    };
                }
            });
        }
    });
    return;
    }

    if (eventId === "act3Quest09Raid_flower"){
        showSingleTextScene(
            "창백한 촉수들이 지면에서 솟아나오더니 당신의 앞을 가로막았다. 그것들은 당신의 개입을 원하지 않는다. 당신이 더 앞으로 가려고 하자 그것들은 바들바들 떨더니 당신을 공격해오기 시작했다.",
            player,
            {
                onEnd: () => startBattle(["flower7", "flower7", "flower7", "flower7", "flower7"], player, {
                    noEscape: true,
                    onWin: () => showAct3Quest09RaidChoice(player),
                    onLose : () => {
                        loseAct3Quest09Raid(player);
                    }
                })
            }
        );
        return;
    }

    if (eventId === "act3Quest09Raid_flower2"){
        showSingleTextScene(
            "당신은 소라를 보았다. 아니, 정확히 말하면 당신이 알고 있는 소라보다 조금 더 작은 소라를 보았다. 소라는 금안을 휘어 웃으며 당신에게 왜 여기까지 왔냐고 물었다" +
            "<br><br>\"누구를 도와줄 건데?\"<br><br>" +
            "작은 소라는 잠시 고개를 숙였다가 다른 창백한 촉수들과 함께 일어났다." +
            "<br><br>\"소라는 죽는 것보다 네게 선택받지 못하는 것이 더 두려워...\"<br><br>" +
            "그것들은 당신을 앞으로 보낼 생각이 없다. 작은 소라와 창백한 촉수들이 당신을 공격해온다.",
            player,
            {
                onEnd: () => startBattle(["flower8", "flower7", "flower7", "flower7"], player, {
                    noEscape: true,
                    onWin: () => showAct3Quest09RaidChoice(player),
                    onLose : () => {
                        loseAct3Quest09Raid(player);
                    }
                })
            }
        );
        return;
    }

    if (eventId === "act3Quest09Raid_flower3"){
        showSingleTextScene(
            "당신은 소라를 보았다. 아니, 정확히 말하면 당신이 알고 있는 소라보다 조금 더 작은 소라를 보았다. 소라는 다른 백발의 꽃인간들과 함께 앉아 있었다." +
            "<br><br>\"모든 꽃인간들이 소라의 것을 사랑해.\"<br><br>" +
            "작은 소라는 당신을 올려다보았다." +
            "<br><br>\"...그리고 모든 꽃인간들이 당신에게 버림받는 걸 두려워 해.\"<br><br>" +
            "작은 소라와 꽃인간들을 두려움에 당신을 앞으로 보낼 생각이 없다. 작은 소라와 꽃인간들이 당신을 공격해온다.",
            player,
            {
                onEnd: () => startBattle(["flower3", "flower6", "flower3", "flower8"], player, {
                    noEscape: true,
                    onWin: () => showAct3Quest09RaidChoice(player),
                    onLose : () => {
                        loseAct3Quest09Raid(player);
                    }
                })
            }
        );
        return;
    }
}

function startAct3Quest09RaidMiddleEvent(player, eventIndex){
    const middleEvents = [
        [
            {
                type : "text",
                value : [
                    "발자국 소리가 들린다. 반란군의 발자국 소리인지, 백색 군단의 발자국 소리인지, 당신은 금방 구분해낼 수 있었다. 백색 군단을 쫓아온 반란군들이 주변을 경계하면서 앞으로 나아가고 있는 모양이었다." +
                    "<br><br>\"상류도시 놈들, 대체 무슨 꿍꿍이를 꾸미고 있는 거야?\"<br><br>" +
                    "\"뭐가 됐든 일단 우리가 먼저 낚아채는 게 좋겠어.\"<br><br>" +
                    "당신은 하얀 꽃잎을 따라 앞으로 나아갔다."
                ]
            },
            {
                type : "text",
                value : [
                    "길을 가다보니 반란군들의 발자국 소리는 어느새 멀어져 있었다. <br><br>...어쩌면 그들의 앞에는 하얀 꽃잎 길이 없는 걸지도 모르겠다."
                ]
            }
        ],
        [
            {
                type : "text",
                value : [
                    "발자국 소리가 들린다. 반란군의 발자국 소리인지, 백색 군단의 발자국 소리인지, 당신은 금방 구분해낼 수 있었다. 흐트러짐 하나 없이 규칙적인 발걸음 소리- 백색 군단은 당신처럼 앞으로 나아가고 있었다." +
                    "<br><br>\"이번에야말로... 발렌님의 이상적인 세계에 가까워지는 걸까.\"<br><br>" +
                    "\"우리는 계속 가까워지고 있었어. 이번에는 한 발걸음이 아니라 다섯 발걸음 정도 가까워지는 것뿐이고.\"<br><br>" +
                    "당신은 하얀 꽃잎을 따라 앞으로 나아갔다."
                ]
            },
            {
                type : "text",
                value : [
                    "길을 가다보니 백색 군단의 발자국 소리는 어느새 멀어져 있었다. <br><br>...어쩌면 그들의 앞에는 하얀 꽃잎 길이 없는 걸지도 모르겠다."
                ]
            }
        ],
        [
            {
                type : "text",
                value : [
                    "하얀 꽃잎 바람이 살랑살랑 당신의 코끝을 스치고 지나갔다. 그 순간, 당신의 머리가 아찔해졌다. 당신은 눈을 깜박였다. 에이든이다. 당신이 기억하는 것보다 젊은 에이든. 그리고 당신은 의자에 앉아서 하얀꽃 차를 대접받고 있었다." +
                    "<br><br>\"...당신이 창백한 꽃을 훔쳐간 걸 알고 있습니다.\"<br><br>" +
                    "\"나는 상류도시에 간 적도 없는데?\"<br><br>" +
                    "당신은 웃으면서 말했다. 당신의 웃음 소리에도 에이든의 표정에는 변화가 없었다. 소라의 웃음 소리가 뚝 그쳤다." +
                    "<br><br>\"그러니까 진작에 주면 좋았잖아. 그러면 그 꽃들이 덜 시들었을 텐데.\"<br><br>" +
                    "\"거래의 기본도 모르시는군요. 상점 주인의 딸을 연기하시면서.\"<br><br>" +
                    "소라의 표정이 굳었다. 에이든은 차가운 시선으로 당신을 응시하다가 고개를 돌렸다." +
                    "<br><br>\"발렌님은 이 일을 잊지 않으실 겁니다. 특히 첫 거래에 당신에게 은혜를 베풀었는데도 당신은 그 은혜를 원수로 갚으셨으니까요.\"<br><br>" +
                    "\"...겨우 그 말을 전하러 여기까지 온 거야?\"<br><br>" +
                    "당신은 그제야 이곳이 소라의 상점이라는 걸 깨달았다. 에이든은 당신을 돌아보지 않았다." +
                    "<br><br><span class='log-valen'>\"...저는 어디에나 있습니다. 저는 그분의 눈이니까요.\"</span><br><br>"
                ]
            },
            {
                type : "text",
                value : [
                    "시야가 흐려지면서 당신은 다시 당신의 세계로 돌아왔다. 하얀 꽃잎들만이 당신의 발밑에서 사르륵사르륵 움직인다." +
                    "<br><br>...당신은 다시 발걸음을 옮겼다."
                ]
            }
        ],
        [
            {
                type : "text",
                value : [
                    "당신은 위화감에 발걸음을 멈췄다. 당신은 주변을 둘러보았다. 마치 뭔가의 행렬처럼, 하얀 꽃 줄기들이 일렬로 서 있었다." +
                    "<br><br>당신은 다시 발걸음을 옮겼다. 피크닉 풍경을 흉내낸 꽃잎 조각들, 그리고 누군가의 가족을 흉내낸 꽃잎 조각들.... 마지막은 마치 비석 형태를 띄고 있는 꽃잎 조각들. 당신은 그 비석에 써져 있는 꽃잎 글씨를 더듬더듬 읽었다." +
                    "<br><br>카산드라와 매그너스<br><br>" +
                    "당신은 이 비석 말고도 수많은 비석들이 있는 것을 보았다." +
                    "<br><br><span class='log-pale'>하얀꽃 무덤은, 그 자체로 무덤이었다.</span>"
                ]
            }
        ]
    ];

    const scene = middleEvents[eventIndex];

    if (!scene){
        showAct3Quest09RaidChoice(player);
        return;
    }

    startScene(scene, player, {
        onEnd : () => showAct3Quest09RaidChoice(player)
    });
}

function endAct3Quest09RaidFoundSanctuary(player){
    const raid = player.act3Quest09Raid;

    raid.active = false;
    raid.sanctuaryFound = true;

    savePlayer(player);

    if (player.flags?.act3Quest09_mourningGuardiansEncountered){
        startScene([
            {
                type : "text",
                value : [
                    "달콤한 냄새가 점점 짙어진다. 당신은 하얀 꽃잎을 따라 계속 앞으로 나아갔다." +
                    "<br><br>아까 보았던 애도의 수호자들은 더 이상 이곳에 없었다. 하얀 꽃잎들만이 그들이 서 있던 자리를 조용히 뒤덮고 있었다." +
                    "<br><br>당신은 그 너머로 이어지는 흔적을 따라갔다." +
                    "<br><br><span class='log-pale'>...창백의 근거지를 찾았다.</span>"
                ]
            }
        ], player, {
            onEnd : () => {
                enterDungeon(player, "paleHideOut");
                return true;
            }
        });

        return;
    }

    startScene([
        {
            type: "text",
            value:
                "당신은 고개를 들었다. 이곳은 실험을 당한 자들의 무덤이자, 흉물에게 당해서 죽은 자들의 무덤이자- 아니, 그런 건 상관없었다. 당신은 하얀 꽃잎들 밑에 묻혀 있는 백색 군인의 옷을 보았다. 이곳은 모두의 무덤이었다. 생전에 무슨 일을 했든 하얀꽃 무덤은 차별없이 모두를 애도했다." +
                "<br><br>그리고 저 멀리에서 한 쌍의 연인이 걸어왔다. 이 무덤을 지키고 있는 자들일까? 당신은 알 수 없다. 그들은 이미 당신을 적으로 간주하고 있었다. 당신은 무기를 들었다. 인영이 점점 드러난다."
        }
    ], player, {
        onEnd : ()=> startAct3Quest09FinalRaid(player)
    });
}

function leaveAct3Quest09Raid(player){
    resetAct3Quest09Raid(player);

    showSingleTextScene(
        "당신은 소라를 쫓아가는 것을 그만두었다." +
        "<br><br>하지만 당신이 가야할 길 위에 놓인 하얀 꽃잎들은 더 길게 이어질 뿐, 당신의 눈앞에서 아예 사라지지는 않을 것이다. 아주 조금 멀어진 것뿐이다.",
        player,
        {
            onEnd: () => {
                player.location = "whiteFlowerTomb";
                savePlayer(player);
                startScene(getLocationScene(player), player);
            }
        }
    );
}

window.leaveAct3Quest09Raid = leaveAct3Quest09Raid;

function resetAct3Quest09Raid(player){
    player.act3Quest09Raid = {
        active: false,
        progress: 0,
        maxProgress: getRandomAct3Quest09RaidMaxProgress(),
        middleEventCount: 0,
        sanctuaryFound: false
    };

    savePlayer(player);
}

window.resetAct3Quest09Raid = resetAct3Quest09Raid;

function showAct3Quest09RaidChoice(player){
    startScene([
        {
            type: "text",
            value:
                "하얀 꽃잎길은 아직 이어지고 있다."
        },
        {
            type: "choice",
            choices: [
                {
                    text: "계속 수색한다",
                    action: "continueAct3Quest09Raid"
                },
                {
                    text: "잠시 쉰다",
                    action: "restAct3Quest09Raid"
                },
                {
                    text: "수색을 중단한다",
                    action: "leaveAct3Quest09Raid"
                }
            ]
        }
    ], player);
}

window.restAct3Quest09Raid = function(player){
    startScene([
        {
            type: "text",
            value:
                "당신은 잠시 숨을 고르기로 했다.<br><br>" +
                "흔들리던 하얀 꽃잎들이 당신의 상처에 반응을 보인다. 그것들은 당신의 몸에 붙더니 생명력을 나누어주고 시들어버렸다." +
                "<br><br>당신의 앞에 펼쳐진 하얀 꽃잎길은 없어지지 않는다, 그저 종착지가 멀어질 뿐."
        },
        {
            type: "effect",
            run: (player) => {
                passTime(player, 20);
                changeHP(player, 150);
                changeStamina(player, 100);

                player.act3Quest09Raid.progress = Math.max(0, player.act3Quest09Raid.progress - 1);

                savePlayer(player);
            }
        }
    ], player, {
        onEnd: () => showAct3Quest09RaidChoice(player)
    });
};

window.continueAct3Quest09Raid = function(player){
    advanceAct3Quest09Raid(player);
};

function startAct3Quest09FinalRaid(player){

    player.flags.act3Quest09_mourningGuardiansEncountered = true;
    savePlayer(player);

    // 1. 에릭 사망
    if (player.flags?.ericDie){
        startAct3Quest09FinalRaid_EricDead(player);
        return;
    }

    // 2. 에릭 생존 + 부모 던전 클리어
    if (player.flags?.lateLab_ashParents_defeated){
        startAct3Quest09FinalRaid_WithEric(player);
        return;
    }

    // 3. 에릭 생존 + 부모 던전 미클리어
    startAct3Quest09FinalRaid_NoEric(player);
}

function startAct3Quest09FinalRaid_EricDead(player){
    startScene([
        {
            type : "text",
            value : [
                "익숙한 얼굴이다. 카산드라와 매그너스, 당신은 이미 싸워본 적들이다. 하지만 지금의 그들은 하얀꽃에 오염되어 있지 않았다. 카산드라는 그때와 똑같이 당신을 보며 태도를 손에 쥐었고 매그너스도 그때와 똑같이 마장총을 당신의 얼굴에 겨누었다. 그들에게는 원념만이 남아 있었다." +
                "<br><br>\"인간의 손이 닿으면 안돼...\"<br><br>" +
                "<br><br>뒤늦은 후회가 그들의 시체를 일으켰다. 애도의 무덤을 지키기 위해 그들이 당신에게 달려든다."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                startAct3Quest09FinalBattleWithoutEric(player);
                return true;
            }
        }
    ], player);
}

function startAct3Quest09FinalRaid_WithEric(player){
    startScene([
        {
            type : "text",
            value : [
                "당신은 그들의 얼굴을 알아보고 숨을 들이마셨다. 당신이 당황한 틈을 타 카산드라의 검격이 당신의 옆구리를 파고들었다. 하지만 그 순간, 당신의 귀에 익숙한 총성이 들렸다." +
                "<br><br>에릭이다.<br><br>" +
                "카산드라와 매그너스는 그때와 다르게 하얀 꽃에 잠식되어 있지 않았다. 그들은 그저, 이곳은 인간의 손으로 더럽혀지면 안 되는 곳이라고 중얼거리고 있었다. 에릭은 말이 없었다. 하지만 그는 당신의 옆에 섰다." +
                "<br><br>그는 더 이상 주저하지 않는다."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                startAct3Quest09FinalBattleWithEric(player);
                return true;
            }
        }
    ], player);
}

function  startAct3Quest09FinalRaid_NoEric(player){
    startScene([
        {
            type : "text",
            value : [
                "한 쌍의 연인이 당신에게 다가온다. 당신은 당신의 뒤로 누군가의 인기척을 느꼈다. 당신은 뒤를 돌아보았다." +
                "<br><br>에릭이다. 그는 두 사람의 얼굴에서 시선을 떼지 못했다.<br><br>" +
                "에릭의 반응에 당신은 이제야 그들의 얼굴을 기억해냈다. 매그너스와 카산드라다. 그리고 그들은 이곳은 인간의 손으로 더러워지면 안 되는 곳이라고 말하며 당신과 에릭을 몰아내기 위해 달려들었다." +
                "<br><br>에릭은 무표정이었다. 하지만 그는 빠르게 움직이지 못했다. 마치 현실을 부정하는 것처럼, 그의 녹안에서는 어떤 감정도 읽을 수 없었다. 당신은 재빠르게 카산드라의 검격을 막아냈다. 전투가 시작된다...!"
            ]
        },
        {
            type : "effect",
            run : (player) => {
                startAct3Quest09FinalBattleNoEric(player);
                return true;
            }
        }
    ], player);
}

function startAct3Quest09FinalBattleWithoutEric(player){
    startBattle(
        ["cassandra2", "magnus2"],
        player,
        {
            noEscape : true,
            onWin : () => {
                startAct3Quest09FinalRaidWinWithoutEric(player);
            },
            onLose : () => {
                loseAct3Quest09Raid(player);
            }
        }
    );
}

function startAct3Quest09FinalBattleWithEric(player){
    startBattle(
        ["cassandra2", "magnus2"],
        player,
        {
            noEscape : true,

            allyTurnSupport : {
                name : "에릭",
                hpRate : 1,
                damage : 150,
                logType : "eric",

                line : () => {
                    return pickRandom([
                        "총성이 울렸다. 에릭은 당신이 위험에 처하자 정확히 제 부모님의 손을 노렸다. <strong>150 데미지!</strong>",
                        "에릭은 당신의 옆에서 말없이 방아쇠를 당겼다. <strong>150 데미지!</strong>",
                        "당신에게 달려들던 그의 부모님의 몸이 총격에 크게 흔들렸다. <strong>150 데미지!</strong>"
                    ]);
                }
            },

            onWin : () => {
                startAct3Quest09FinalRaidWinWithEric(player);
            },
            onLose : () => {
                loseAct3Quest09Raid(player);
            }
        }
    );
}

function startAct3Quest09FinalBattleNoEric(player){
    startBattle(
        ["cassandra2", "magnus2"],
        player,
        {
            noEscape : true,

            allyTurnSupport : {
                name : "에릭",
                hpRate : 0.5,
                damage : 150,
                logType : "eric",

                line : () => {
                    return pickRandom([
                        "당신의 옆에서 총성이 울렸다. 에릭이다! <strong>150 데미지!</strong>",
                        "에릭은 당신의 옆에서 말없이 방아쇠를 당겼다. <strong>150 데미지!</strong>",
                        "당신은 에릭의 표정을 전혀 읽어낼 수 없었다. 그는 그저 총을 쏠 뿐이다, 무표정으로. <strong>150 데미지!</strong>"
                    ]);
                }
            },

            onWin : () => {
                startAct3Quest09FinalRaidWinNoEric(player);
            },
            onLose : () => {
                loseAct3Quest09Raid(player);
            }
        }
    );
}

function startAct3Quest09FinalRaidWinWithoutEric(player){
    startScene([
        {
            type : "text",
            value : [
                "당신은 한 번 더 카산드라와 매그너스를 쓰러뜨렸다. 너무 늦어버린 마지막 장례식은 결국 당신의 손에 완성되었다. 그들의 시체를 하얀 꽃잎들이 감싸안았다. 하얀 꽃잎들은 마치 관처럼 그들의 주변을 감싸안았다." +
                "<br><br>그들은 서로의 손을 잡은 채, 드디어 영원한 잠에 들었다." +
                "<br><br>당신은 창백의 근거지에 도착했다."
            ]
        }
    ], player, {
        onEnd : () => {
            enterDungeon(player, "paleHideOut");
            return true;
        }
    });
}

function startAct3Quest09FinalRaidWinWithEric(player){
    startScene([
        {
            type : "text",
            value : [
                "그들이 쓰러지자, 에릭은 당신에게는 가까이 오지 못하게 팔로 막은 후 자신이 걸어가서 그들의 시체를 확인했다. 방아쇠에서 손을 떼지 못하는 그의 녹안은 깊고 어두웠다. 그 순간, 하얀 꽃잎들이 두 사람의 시체를 감싸안았다." +
                "<br><br>하얀 꽃잎들은 마치 관처럼 그들의 주변을 감싸안았다. 카산드라와 매그너스는 서로의 손을 잡은 채, 드디어 영면에 들었다." +
                "<br><br>\"....\"<br><br>" +
                "에릭은 가만히 두 사람을 내려다보았다. 자신의 부모님 시체 앞에서 에릭은 움직일 생각이 없는 것처럼 보였다. 당신은 당신을 돌아보지 않는 에릭의 뒷모습을 응시하다가 천천히 발걸음을 옮겼다." +
                "<br><br>당신은 창백의 근거지에 도착했다."
            ]
        }
    ], player, {
        onEnd : () => {
            enterDungeon(player, "paleHideOut");
            return true;
        }
    });
}

function startAct3Quest09FinalRaidWinNoEric(player){
    startScene([
        {
            type : "text",
            value : [
                "그들이 쓰러진 후 에릭의 총이 바닥으로 툭 떨어졌다. 당신은 놀라서 에릭을 쳐다보았지만 에릭은 당신은 쳐다도 보지 않았다. 그는 그저 시체들을 응시했다. 하얀 꽃잎들이 꿈틀거리며 시체를 감싸려고 하자 그는 다시 총을 들었다. 그리고 하얀 꽃잎들을 쐈다." +
                "하얀 꽃잎들은 결국 두 시체를 감싸안지 못했다. 에릭은 물러나는 하얀 꽃잎들을 응시하다가 주머니에서 라이터를 꺼냈다. 치익, 소리와 함께 라이터에 불이 붙었다. 당신이 막기도 전에 그는 시체에 불을 던졌다." +
                "<br><br>화르륵 소리와 함께 시체 위로 불이 타올랐다. 에릭은 마지막까지 당신을 쳐다보지 않았다. 당신은 그가 무슨 생각을 하고 있는지 읽을 수 없었다." +
                "<br><br>...당신은 발걸음을 옮겼다. 창백의 근거지가 앞에 보인다."
            ]
        }
    ], player, {
        onEnd : () => {
            enterDungeon(player, "paleHideOut");
            return true;
        }
    });
}

function loseAct3Quest09Raid(player){
    resetAct3Quest09Raid(player);

    player.location = "whiteFlowerTomb";
    player.inBattle = false;
    player.inEvent = false;

    savePlayer(player);

    startScene([
        {
            type : "text",
            value : [
                "당신은 더 이상 수색을 이어가지 못하고 하얀꽃 무덤으로 물러났다." +
                "<br><br>당신이 따라가던 하얀 꽃잎길은 멀어졌다." +
                "<br><br>다시 쫓으려면 처음부터 흔적을 찾아야 할 것 같다."
            ]
        }
    ], player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });
}
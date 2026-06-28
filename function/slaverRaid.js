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

    if (raid.progress === 7 && !raid.prisonerEventDone){
        raid.prisonerEventDone = true;
        savePlayer(player);
        startSlaverRaidPrisonerEvent(player);
        return;
    }

    savePlayer(player);

    startSlaverRaidRandomEvent(player);
}

function startSlaverRaidRandomEvent(player){
    const eventId = pickWeighted([
        { id: "slaverRaid_trafficker1", weight: 30 },
        { id: "slaverRaid_trafficker2", weight: 30 },
        { id: "slaverRaid_trafficker3", weight: 20 },
        { id: "slaverRaid_prisoner_escape", weight: 20 },
        { id: "slaverRaid_food1", weight: 15 },
        { id: "slaverRaid_food2", weight: 5 },
        { id: "slaverRaid_caltrops", weight: 10},
        { id: "slaverRaid_uppercity", weight : 1}
    ]);

    if (eventId === "slaverRaid_trafficker1"){
        showSingleTextScene("당신이 추격해온다는 걸 눈치챈 인신매매상이 기다리고 있다가 당신의 앞을 막아섰다. 그는 당신을 위아래로 훑어보더니 제압봉을 바로잡았다.", player, {
            onEnd: () => startBattle("trafficker1", player, {
                noEscape : true,

                onWin: () => showSlaverRaidChoice(player)
            })
        });
        return;
    }

    if (eventId === "slaverRaid_trafficker2"){
        showSingleTextScene("인신매매상이 길을 막았다. <br><br>\"지금 우리를 쫓아오고 있는 거야?\"<br><br>그는 비스듬히 웃었다.<br><br>\"영웅 놀이라도 하고 있는 모양이군.\"", player, {
            onEnd: () => startBattle("trafficker2", player, {
                noEscape : true,

                onWin: () => showSlaverRaidChoice(player)
            })
        });
        return;
    }

    if (eventId === "slaverRaid_trafficker3"){
        showSingleTextScene("인신매매상이 길을 막았다. 근육질로 이루어진 그의 몸은 당신의 2배는 되어보인다.", player, {
            onEnd: () => startBattle("trafficker3", player, {
                noEscape : true,

                onWin: () => showSlaverRaidChoice(player)
            })
        });
        return;
    }

    if (eventId === "slaverRaid_prisoner_escape"){
        startScene([
            {
                type: "text",
                value:
                    "인신매매상의 흔적을 쫓던 당신은 어설픈 발자국을 발견했다. 추적을 당하지 않기 위해 어설프게 반대 방향으로 찍어놓은 발자국들, 쉽게 추적이 가능할 거 같다."

            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 어설픈 흔적을 쫓아갔다.",
                        stat : "int",
                        difficulty : 14,
                        success : [
                            {
                                type : "text",
                                value : [
                                    "어설픈 흔적을 쫓아가자, 어디선가 흐느끼는 소리가 들린다. 당신은 흐느끼는 소리 쪽으로 고개를 돌렸다. 헐벗은 사람 하나가 수풀속에 몸을 웅크리고 있었다. 당신을 인신매매상으로 착각했는지, 그는 당신을 보자마자 엎드려서 잘못했다고 빌었다." +
                                    "<br><br>\"제발 때리지 말아주세요...\"<br><br>" +
                                    "죽은 듯이 바닥에 엎드려있던 그는 예상했던 고통이 닥치지 않자 천천히 고개를 들었다. 이제야 그는 당신이 인신매매상이 아니라는 걸 알아차렸다. 그는 떨리는 목소리로 인신매매상이 눈치채기 전에 당신도 자신도 도망가야 한다고 말했다." +
                                    "<br><br>\"설마 당신... 그들을 죽이려고.\"<br><br>" +
                                    "그는 잠시 말이 없었다. 그는 당신에게 줄 것이 없어서 미안하다고 말하더니, 그나마 의료 실력은 있다고 말하며 당신의 상처를 긴급처치해주었다. <br>...의료 능력이 있어서 여기까지 올 수 있었던 걸지도 모르겠다. 그의 몸에는 상처가 안 난 곳이 없었다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeHP(player, 30);
                                    changeTrauma(player, -3);
                                }
                            }
                        ],
                        fail : [
                            {
                                type : "text",
                                value : [
                                    "당신은 어설픈 흔적을 끝까지 쫓아가려고 했지만 결국에는 놓치고 말았다. 당신은 더 먼 길을 돌아가야만 했다..."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    passTime(player, 10);
                                    changeStamina(player, -12);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 그저 앞으로 나아갔다.",
                        scene : [
                            {
                                type : "text",
                                value: [
                                    "당신은 그저 앞으로 나아갔다. 그 어설픈 흔적에 인신매매상에게 다시 잡혀갔든 아니든, 당신이 여기 온 목적은 명확했다. 당신은 인신매매상을 끝까지 추적해낼 것이다."
                                ]
                            }
                        ]
                    }
                ]
            }
        ], player, {
            onEnd: () => showSlaverRaidChoice(player)
        });
        return;
    }

    if (eventId === "slaverRaid_food1"){
        startScene([
            {
                type: "text",
                value:
                    "길을 가던 중, 당신은 떨어진 보급상자를 발견했다. 인신매매상들이 노예들을 끌고 가면서 놓친 모양이다."
            },
            {
                type: "effect",
                run: (player) => {
                    addItem(player, ITEMS.misc.cabbage);
                    addItem(player, ITEMS.misc.potato);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => showSlaverRaidChoice(player)
        });
        return;
    }

    if (eventId === "slaverRaid_food2"){
        startScene([
            {
                type: "text",
                value:
                    "길을 가던 중, 당신은 떨어진 보급상자를 발견했다. 인신매매상들이 노예들을 끌고 가면서 놓친 모양이다." +
                    "<br><br>쌀과 밀이다. 그들이 쌀과 밀을 노예들에게 먹였을 거 같지는 않다."
            },
            {
                type: "effect",
                run: (player) => {
                    addItem(player, ITEMS.misc.wheat);
                    addItem(player, ITEMS.misc.rice);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => showSlaverRaidChoice(player)
        });
        return;
    }

    if (eventId === "slaverRaid_uppercity"){
        startScene([
            {
                type: "text",
                value:
                    "그들을 추적하던 중, 당신은 명령서라고 써져있는 종이가 떨어져있는 것을 보았다. 당신은 그 종이를 주웠다. 종이에는 상류도시를 상징하는 도장이 앞에 찍혀있었다." +
                    "<br><br>하류도시 출신 노예 4명 이송<br><br>" +
                    "노예 4명을 대가로 한 군사 자원 확인<br><br>" +
                    "앞으로의 거래에도 협조를 기대하겠음" +
                    "<br><br><br>다음 거래에는 식량 자원이 필요하다고 함. 준비해놓을 것."
            }
        ], player, {
            onEnd: () => showSlaverRaidChoice(player)
        });
        return;
    }

    if (eventId === "slaverRaid_caltrops"){
        startArrowMinigame(player, {
            target: 3,
            sequenceLength: 3,
            timeLimit: 2000,
            title: "바닥에 칼트롭이 깔려있다! 피하자!",
            successText: "당신은 칼트롭을 피해서 움직였다!",
            failText: "당신은 칼트롭을 밟았다...!",
        
            onClear: () => showSlaverRaidChoice(player),
            onStepFail: (player, state) => {
                changeStamina(player, -5);
                changeHP(player, -10);
                return {
                    text: "당신은 다른 길로 피해 당신의 발을 치료했다. 당신이 발을 치료하는 동안 인신매매상이 더 멀어졌을 거 같다....",
                    progress: Math.max(0, state.progress - 1)
                };
            }
        });
        return;
    }
}

function startSlaverRaidPrisonerEvent(player){
    startScene([
        {
            type: "text",
            value:
                "당신은 마차 바퀴 자국을 따라가던 중, 길가에 버려진 작은 야영지를 발견했다.<br><br>" +
                "모닥불은 꺼진 지 얼마 되지 않았고, 땅에는 끌린 자국과 피 묻은 천 조각이 남아 있었다. 그 옆에는 쇠사슬에 묶인 사람이 쓰러져 있었다."
        },
        {
            type: "choice",
            choices: [
                {
                    text: "쇠사슬을 풀어준다",
                    stat: "str",
                    difficulty: 15,
                    success: [
                        {
                            type: "text",
                            value:
                                "당신은 힘을 주어 쇠사슬을 비틀었다. 잠금쇠가 거칠게 벌어지며 사슬이 풀렸다.<br><br>" +
                                "쓰러져 있던 사람은 간신히 몸을 일으키더니 떨리는 손으로 한쪽 방향을 가리켰다.<br><br>" +
                                "그는 도저히 말을 하지 못하겠는지 입술만 달싹였다. 그리고 고개를 숙였다."
                        },
                        {
                            type: "effect",
                            run: (player) => {
                                changeTrauma(player, -2);
                                changeStamina(player, -5);
                                savePlayer(player);
                            }
                        }
                    ],
                    fail: [
                        {
                            type: "text",
                            value:
                                "당신은 쇠사슬을 풀어보려 했지만, 잠금쇠는 쉽게 열리지 않았다.<br><br>" +
                                "쇠가 긁히는 소리에 쓰러져 있던 사람이 겁에 질려 몸을 움츠렸다. 결국 당신은 주변에서 찾은 천으로 그의 상처를 대충 묶어주는 것밖에 할 수 없었다.<br><br>" +
                                "그는 울먹이며 한쪽 방향을 가리켰다. 인신매매단의 진지는 멀지 않은 모양이다."
                        },
                        {
                            type: "effect",
                            run: (player) => {
                                changeStamina(player, -10);
                                changeTrauma(player, 1);
                                savePlayer(player);
                            }
                        }
                    ]
                },
                {
                    text: "주변 흔적을 조사한다",
                    stat: "int",
                    difficulty: 14,
                    success: [
                        {
                            type: "text",
                            value:
                                "당신은 야영지 주변을 살폈다. 마차는 여러 번 이곳을 오간 흔적이 있었고, 발자국은 모두 같은 방향으로 이어지고 있었다.<br><br>" +
                                "흔적은 이제 숨길 수 없을 만큼 선명하다. 인신매매단의 임시 진지는 가까운 곳에 있다."
                        },
                        {
                            type: "effect",
                            run: (player) => {
                                player.slaverRaid.progress += 1;
                                savePlayer(player);
                            }
                        }
                    ],
                    fail: [
                        {
                            type: "text",
                            value:
                                "당신은 흔적을 살피려 했지만, 이미 너무 많은 발자국이 뒤엉켜 있었다.<br><br>" +
                                "시간을 낭비했다. 하지만 한 가지는 분명했다. 놈들은 멀리 가지 못했다."
                        },
                        {
                            type: "effect",
                            run: (player) => {
                                passTime(player, 10);
                                changeStamina(player, -8);
                                savePlayer(player);
                            }
                        }
                    ]
                },
                {
                    text: "더 지체하지 않고 추적을 계속한다",
                    scene: [
                        {
                            type: "text",
                            value:
                                "당신은 이를 악물고 다시 발걸음을 옮겼다. 아직 늦지 않았....<br><br>언제 도착하든, 아직 늦지 않았다고 말할 수 있을까."
                        }
                    ]
                }
            ]
        }
    ], player, {
        onEnd: () => showSlaverRaidChoice(player)
    });
}

function endSlaverRaidFoundCamp(player){
    const raid = player.slaverRaid;

    raid.active = false;
    raid.campFound = true;

    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "당신은 마지막 흔적을 따라 숲을 헤치고 나아갔다. 그리고 그 순간, 당신의 귀에 신음이 섞인 비명소리가 박혔다. 당신은 숨을 멈췄다." +
                "<br>채찍 소리, 살과 살이 맞부딪히는 소리, 그리고.... 웃음 소리." +
                "<br><br><strong>그들은 웃고 있었다.</strong><br><br>" +
                "다른 사람들의 절망 속에서 그들은 웃고 있었다." +
                "<br><br><br><br><span class='log-warning'>...당신은 인신매매단의 임시 진지를 발견했다.</span>"
        },
        {
            type: "effect",
            run: (player) => {
                enterDungeon(player, "slaverCamp");
                return true;
            }
        }
    ], player);
}

function failSlaverRaid(player){
    player.slaverRaid = {
        active: false,
        progress: 0,
        maxProgress: getRandomSlaverRaidMaxProgress(),
        prisonerEventDone: false,
        campFound: false
    };

    if (player.quest?.active?.id === "slaverCamp_cleanup"){
        player.quest.active = null;
    }

    savePlayer(player);

    showSingleTextScene(
        "당신은 추적을 포기했다.<br><br>인신매매단은 당신이 포기한 동안 다시는 추적을 하지 못할 정도로 멀어져버렸다. 임무는 실패했다.",
        player,
        {
            onEnd: () => {
                player.location = "guardPost2";
                savePlayer(player);
                startScene(getLocationScene(player), player);
            }
        }
    );
}

window.failSlaverRaid = failSlaverRaid;

function showSlaverRaidChoice(player){
    startScene([
        {
            type: "text",
            value: "인신매매단의 흔적은 아직 이어지고 있다."
        },
        {
            type: "choice",
            choices: [
                {
                    text: "계속 추적한다",
                    action: "continueSlaverRaid"
                },
                {
                    text: "잠시 쉰다",
                    action: "restSlaverRaid"
                },
                {
                    text: "추적을 포기한다",
                    action: "failSlaverRaid"
                }
            ]
        }
    ], player);
}

window.restSlaverRaid = function(player){
    startScene([
        {
            type: "text",
            value:
                "당신은 충분히 쉬어가기로 했다.<br><br>" +
                "상처를 살피고, 거칠어진 호흡을 가라앉힌다. 그러나 쉬는 동안에도 인신매매단의 흔적은 조금씩 멀어지고 있다."
        },
        {
            type: "effect",
            run: (player) => {
                passTime(player, 30);
                changeHP(player, 50);
                changeStamina(player, 50);

                // 쉬면 추적이 조금 늦어짐
                player.slaverRaid.progress = Math.max(0, player.slaverRaid.progress - 1);

                savePlayer(player);
            }
        }
    ], player, {
        onEnd: () => showSlaverRaidChoice(player)
    });
};

window.continueSlaverRaid = function(player){
    advanceSlaverRaid(player);
};
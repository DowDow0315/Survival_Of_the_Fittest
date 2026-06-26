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
        { id: "slaverRaid_prisoner", weight: 20 },
        { id: "slaverRaid_food1", weight: 15 },
        { id: "slaverRaid_food2", weight: 5 },
        { id: "slaverRaid_caltrops", weight: 10}
    ]);

    if (eventId === "slaverRaid_trafficker1"){
        showSingleTextScene("당신이 추격해온다는 걸 눈치챈 인신매매상이 기다리고 있다가 당신의 앞을 막아섰다. 그는 당신을 위아래로 훑어보더니 제압봉을 바로잡았다.", player, {
            onEnd: () => startBattle("trafficker1", player, {
                noEscape : true,

                onWin: () => advanceSlaverRaid(player)
            })
        });
        return;
    }

    if (eventId === "slaverRaid_trafficker2"){
        showSingleTextScene("인신매매상이 길을 막았다. <br><br>\"지금 우리를 쫓아오고 있는 거야?\"<br><br>그는 비스듬히 웃었다.<br><br>\"영웅 놀이라도 하고 있는 모양이군.\"", player, {
            onEnd: () => startBattle("trafficker2", player, {
                noEscape : true,

                onWin: () => advanceSlaverRaid(player)
            })
        });
        return;
    }

    if (eventId === "slaverRaid_trafficker3"){
        showSingleTextScene("인신매매상이 길을 막았다. 근육질로 이루어진 그의 몸은 당신의 2배는 되어보인다.", player, {
            onEnd: () => startBattle("trafficker3", player, {
                noEscape : true,

                onWin: () => advanceSlaverRaid(player)
            })
        });
        return;
    }

    if (eventId === "slaverRaid_prisoner"){
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
            onEnd: () => advanceSlaverRaid(player)
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
            onEnd: () => advanceSlaverRaid(player)
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
            onEnd: () => advanceSlaverRaid(player)
        });
        return;
    }

    if (eventId === "slaverRaid_caltrops"){
    startArrowMinigame(player, {
        target: 3,
        sequenceLength: 3,
        timeLimit: 4000,
        title: "감시자의 눈을 피해 움직이세요!",
        successText: "당신은 들키지 않고 지나갔다.",
        failText: "발밑의 나뭇가지가 부러졌다!",
        onClear: () => advanceSlaverRaid(player),
        onStepFail: (player, state) => {
            changeStamina(player, -5);
            return {
                text: "당신은 황급히 몸을 낮췄다.",
                progress: Math.max(0, state.progress - 1)
            };
        }
    });
    return;
}
}
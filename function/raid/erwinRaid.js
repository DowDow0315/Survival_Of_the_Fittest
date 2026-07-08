function initErwinRaid(player){
    player.erwinRaid = player.erwinRaid || {
        active: false,
        progress: 0,
        maxProgress: getRandomErwinRaidMaxProgress(),
        middleEventDone: false,
        sanctuaryFound: false
    };
}

function getRandomErwinRaidMaxProgress(){
    return 6 + Math.floor(Math.random() * 3); // 6~8
}

window.startErwinRaid = function(player){
    player.erwinRaid = {
        active: true,
        progress: 0,
        maxProgress: getRandomErwinRaidMaxProgress(),
        middleEventDone: false,
        sanctuaryFound: false
    };

    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "당신은 경계병 제3초소에서부터 마물의 흔적을 쫓기 시작했다." +
                "<br><br>어디선가 달콤한 냄새가 나는 거 같다. 당신은 달콤한 냄새를 쫓아가기 시작했다."
        }
    ], player, {
        onEnd: () => advanceErwinRaid(player)
    });
};

function advanceErwinRaid(player){
    initErwinRaid(player);

    const raid = player.erwinRaid;

    if (!raid.active) return;

    if (raid.progress >= raid.maxProgress){
        endErwinRaidFoundSanctuary(player);
        return;
    }

    raid.progress++;

    passTime(player, 5);

    if (raid.progress === 3 && !raid.middleEventDone){
        raid.middleEventDone = true;
        savePlayer(player);
        startErwinRaidMiddleEvent(player);
        return;
    }

    savePlayer(player);

    startErwinRaidRandomEvent(player);
}

function startErwinRaidRandomEvent(player){
    const eventId = pickWeighted([
        { id: "erwinRaid_whiteflower", weight: 15 },
        { id: "erwinRaid_tentacle", weight: 20 },
        { id: "erwinRaid_flower", weight: 15 },
        { id: "erwinRaid_flower2", weight: 15 },
        { id: "erwinRaid_flower3", weight: 5 }
    ]);

    if (eventId === "erwinRaid_whiteflower"){
        startScene([
            {
                type: "text",
                value:
                    "길가에 하얀꽃이 피어 있었다. 아까까지 분명 가만히 있었던 거 같은데, 하얀꽃은 갑자기 하늘하늘 바람을 따라 춤추듯이 움직이기 시작했다." +
                    "<br><br><span class='log-pale'>{playerName}</span><br><br>" +
                    "...? 순간 당신은 당신의 이름을 들었던 거 같다. 하지만 뒤를 돌아보았을 때는 아무도 없었다."
            },
            {
                type: "effect",
                run: (player) => {
                    changeTrauma(player, 1);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => showErwinRaidChoice(player)
        });
        return;
    }

    if (eventId === "erwinRaid_tentacle"){
        startScene([
            {
                type: "text",
                value:
                    "지면이 꿈틀거렸다.<br><br>다음 순간, 하얀 꽃잎길 아래에서 거대한 촉수가 솟구쳐 오르더니 당신을 향해 휘둘러졌다. 꽃의 촉수는 아니었다." +
                    "<br>꽃의 촉수보다 더 물컹거렸고 징그러웠다. 같은 마물인데도 꽃마물과 싸우기라도 했는지 촉수의 표면 이곳저곳에는 촉수가 흘린 애액과 함께 하얀꽃잎이 박혀있었다." +
                    "<br><br>촉수가 다시 한번 당신을 노리고 휘둘러진다!"
            }
        ], player, {
            onEnd: () => {
                startArrowMinigame(player, {
                target: 5, 
                sequenceLength: 1,
                timeLimit: 700,         

                title: "촉수를 피해라!",

                successText: "당신은 몸을 비틀어 촉수를 피했다!",
                failText: "촉수가 당신을 강하게 후려쳤다!",

                onClear: () => {
                    showSingleTextScene(
                        "당신은 촉수의 공격을 피하고 앞으로 달려나갔다. 다행히, 촉수는 더 이상 당신을 쫓아오지 않았다.",
                        player,
                        {
                            onEnd: () => showErwinRaidChoice(player)
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

    if (eventId === "erwinRaid_flower"){
        showSingleTextScene(
            "닮콤한 냄새를 쫓아가던 당신은 익숙한 웃음 소리를 들었다. 하얀꽃이다. 당신은 그가 당신을 덮치기 전에 고개를 돌렸다." +
            "<br><br>까르르르, 웃음 소리가 난다. 그들은 언제나 웃고는 했다. 비명을 지르며 도망갈 때도 그들은 언제나 웃었다. 그래서 사람들은 꽃인간의 웃음을 무서워했다." +
            "<br><br>웃음소리가 당신을 덮쳐온다. 꽃인간과의 전투가 시작된다!",
            player,
            {
                onEnd: () => startBattle("flower", player, {
                    noEscape: true,
                    onWin: () => showErwinRaidChoice(player)
                })
            }
        );
        return;
    }

    if (eventId === "erwinRaid_flower2"){
        showSingleTextScene(
            "\"안녕하세요.\"<br><br>갑자기 들린 목소리에 당신은 고개를 돌렸다. 꽃인간이다. 하지만 그 꽃인간은 웃고 있지 않았다. 보통 인간처럼 생겼지만 뒤에는 딱딱한 꽃이 달려있는 꽃인간, 그는 당신을 향해 걸어왔다." +
            "<br><br>당신은 무기를 바로잡았다. 물러설 곳은 없다.",
            player,
            {
                onEnd: () => startBattle("flower2", player, {
                    noEscape: true,
                    onWin: () => showErwinRaidChoice(player)
                })
            }
        );
        return;
    }

    if (eventId === "erwinRaid_flower3"){
        showSingleTextScene(
            "누군가가 다가오는 소리를 들은 당신은 고개를 돌렸다. 처음에 당신은 인간인 줄 알았다. 백발. 하지만 그 뒤로 무수히 뻗어있는 촉수. 하얀꽃무덤에서부터 내려온 마물일까. 그는 춤을 추듯이 유려하게 움직이며 당신에게 다가왔다." +
            "<br><br>\"나, 너.\"<br><br>" +
            "백발꽃인간은 히죽 웃었다. 그는 손가락으로 당신과 자신을 번갈아 가리켰다.<br>당신은 무기를 바로잡았다. 물러설 곳은 없다.",
            player,
            {
                onEnd: () => startBattle("flower3", player, {
                    noEscape: true,
                    onWin: () => showErwinRaidChoice(player)
                })
            }
        );
        return;
    }
}

function startErwinRaidMiddleEvent(player){
    startScene([
        {
            type : "text",
            value : [
                "...." +
                "<br>..........." +
                "<br>......................." +
                "<br><br><br>뒤에서 무서운 시선이 느껴진다. 당신은 뒤를 돌아보았다. 저 멀리서 누군가가 걸어오고 있었다." +
                "<br><br><br><div style='text-align:center;'><strong style='color: #302ce9; font-size:4rem'>창백</strong></div>"
            ]
        },
        {
            type : "text",
            value : [
                "<div style='text-align:center;'>당신에게 오는 속도가 점점 빨라진다. 창백한 그것은 당신을 보자마자 빠르게 당신에게 다가왔다. 당신이 지금 도망친다고 해도 저것에게 잡힐 것이다.</div>" +
                "<br><br><div style='text-align:center;'><strong style='color: #302ce9; font-size:4rem'>저벅</strong></div>" +
                "<br><br><div style='text-align:center;'><strong style='color: #302ce9; font-size:4rem'>저벅</strong></div>" +
                "<br><br><div style='text-align:center;'><strong style='color: #302ce9; font-size:4rem'>저벅</strong></div>" +
                "<br><br><div style='text-align:center;'><strong style='color: #302ce9; font-size:4rem'>저벅</strong></div>" +
                "<br><br><div style='text-align:center;'><strong style='color: #302ce9; font-size:4rem'>저벅</strong></div>" +
                "<br><br><div style='text-align:center;'><strong style='color: #302ce9; font-size:4rem'>당신에게 그것이 다가온다</strong></div>" +
                "<br><br><br><div style='text-align:center;'><strong style='color: #0e7430; font-size:4rem'>우뚝</strong></div>" +
                "<br><br><br><div style='text-align:center;'>누군가의 인기척에 그것은 멈췄다. 길게 늘어진 그림자가 바르르 떨더니 그대로 모습을 감추었다.</div>"
            ]
        },
        {
            type : "text",
            value : [
                "그대로 흘어질 뻔한 달콤한 냄새를 간신히 붙잡고 당신은 앞으로 나아갔다." +
                "<br><br>어디선가 총소리가 들린 거 같다." +
                "<br><br>당신은 뒤를 돌아보았지만, 그곳에는 아무도 없었다."
            ]
        }
    ], player, {
        onEnd: () => showErwinRaidChoice(player)
    });
}

function endErwinRaidFoundSanctuary(player){
    const raid = player.erwinRaid;

    raid.active = false;
    raid.sanctuaryFound = true;

    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "달콤한 냄새가 당신의 앞에서 진해졌다. 당신은 숲길 위로 하얀꽃잎들이 무더기로 떨어져있는 것을 보았다. 당신의 발밑으로 하얀꽃잎들이 바스러진다...." +
                "<br>당신은 밑을 바라보았다. 한 사람의 발자국이 아니다. 당신은 발자국들을 따라갔다. 여러 사람들의 발자국이 작은 동굴 입구로 이어져 있었다." +
                "<br><br>....당신은 마물의 은신처를 찾았다."
        },
        {
            type: "effect",
            run: (player) => {
                enterDungeon(player, "erwinHideout");
                return true;
            }
        }
    ], player);
}

function leaveErwinRaid(player){
    resetErwinRaid(player);

    showSingleTextScene(
        "당신은 수색을 중단했다.<br><br>" +
        "마물의 흔적은 다시 흐려졌다. 하지만 완전히 사라진 것은 아니다. 준비를 마치면 다시 수색을 시작할 수 있을 것이다.",
        player,
        {
            onEnd: () => {
                player.location = "guardPost3";
                savePlayer(player);
                startScene(getLocationScene(player), player);
            }
        }
    );
}

window.leaveErwinRaid = leaveErwinRaid;

function resetErwinRaid(player){
    player.erwinRaid = {
        active: false,
        progress: 0,
        maxProgress: getRandomErwinRaidMaxProgress(),
        middleEventDone: false,
        sanctuaryFound: false
    };

    savePlayer(player);
}

window.resetErwinRaid = resetErwinRaid;

function showErwinRaidChoice(player){
    startScene([
        {
            type: "text",
            value:
                "마물의 흔적은 아직 이어지고 있다."
        },
        {
            type: "choice",
            choices: [
                {
                    text: "계속 수색한다",
                    action: "continueErwinRaid"
                },
                {
                    text: "잠시 쉰다",
                    action: "restErwinRaid"
                },
                {
                    text: "수색을 중단한다",
                    action: "leaveErwinRaid"
                }
            ]
        }
    ], player);
}

window.restErwinRaid = function(player){
    startScene([
        {
            type: "text",
            value:
                "당신은 잠시 숨을 고르기로 했다.<br><br>" +
                "상처를 살피고, 흐트러진 호흡을 가다듬는다. 하지만 쉬는 동안에도 마물의 흔적은 조금씩 흐려지고 있다."
        },
        {
            type: "effect",
            run: (player) => {
                passTime(player, 30);
                changeHP(player, 50);
                changeStamina(player, 50);

                player.erwinRaid.progress = Math.max(0, player.erwinRaid.progress - 1);

                savePlayer(player);
            }
        }
    ], player, {
        onEnd: () => showErwinRaidChoice(player)
    });
};

window.continueErwinRaid = function(player){
    advanceErwinRaid(player);
};
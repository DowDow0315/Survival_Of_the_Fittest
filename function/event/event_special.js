function getActiveEventName(player){
    const date = getCalendarDate(player);

    if (isChocoChocoPeriod(player)){
        return "🍫";
    }

    if (isMushroomKingdomPeriod(player)){
        return "🍄";
    }

    if (isSpringDancePeriod(player) || isSpringDanceDay(player)){
        return "🩰";
    }

    if (isEatEatEatPeriod(player) || isEatEatEatDay(player)){
        return "🍙";
    }

    if (isHarvestDay(player)){
        return "🌾";
    }

    if (date.month === 1 && date.day === 1){
        return "🧧";
    }

    if (date.month === 12 && date.day === 31){
        return "💐";
    }

    return "";
}

// =========================
// 초코초코 이벤트
// =========================

function isChocoChocoPeriod(player){
    const date = getCalendarDate(player);
    return (
        (date.month === 2 && date.day >= 8 && date.day <= 14) ||
        (date.month === 11 && date.day >= 5 && date.day <= 11)
    );
}

function isChocoChocoDay(player){
    const date = getCalendarDate(player);

    return (
        (date.month === 2 && date.day === 14) ||
        (date.month === 11 && date.day === 11)
    );
}

window.EVENTS.push({
    id : "chocoChoco_01",
    condition : (player) =>
        player.justMoved &&
        player.location === "townStreet" &&
        isChocoChocoPeriod(player) &&
        Math.random() < 0.1,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "초코!" +
                    "<br><br>...어라? 방금 어디서 엄청 귀여운 소리가 들리지 않았나? 당신은 고개를 돌렸다. 갈색 슬라임을 본 것 같기도 하다...."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "chocoChoco_02",
    condition : (player) =>
        player.justMoved &&
        ["townStreet", "townEntrance", "townEntrance_act3", "darkStreet"].includes(player.location) &&
        isChocoChocoPeriod(player) &&
        Math.random() < 0.1,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "\"내가 너를... 이만큼이나 사랑해.\"<br><br>" +
                    "어떤 사람이 갈색 초콜릿을 자신의 연인에게 내밀고 있었다." +
                    "<br><br>\"날 위해 그 던전에 다녀온 거야...? 넌 정말...\"<br><br>" +
                    "초콜릿을 받은 연인의 눈에는 눈물이 그렁그렁했다. 달콤한 키스가 이어진다.... 공공장소에서. 자리를 피하도록 하자."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "chocoChoco_03",
    condition : (player) =>
        player.justMoved &&
        ["shelter", "goldenShelter"].includes(player.location) &&
        isChocoChocoPeriod(player) &&
        Math.random() < 0.1,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "쉘터의 아이들이 초코송을 부르고 있다. 당신을 본 아이들은 밝게 웃으며 당신을 빙 둘러싸고 초코초코 노래를 불렀다." +
                    "<br><br>그저 초코초코 데이일 뿐이지만, 오늘이라도 아이들이 밝게 웃을 수 있다는 사실에 당신의 마음이 따듯해졌다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeTrauma(player, -5);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "chocoChoco_04",
    condition : (player) =>
        player.justMoved &&
        ["richTownStreet", "gloryStreet", "heavenRoad", "heavenPalace"].includes(player.location) &&
        isChocoChocoPeriod(player) &&
        Math.random() < 0.1,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "당신을 위한 마음이라면서, 상류도시 사람들이 서로 초콜릿을 주고받는 모습이 보인다. 그들은 자신의 연인의 행복을 빌고, 사랑을 다시 확인하며 초코초코 데이를 즐겼다. 특히 몇 명의 귀족들은 오늘이야말로 데릭에게 자신의 마음을 고백하겠다며 초콜릿을 예쁜 포장지에 싸고 있었다. 달콤한 냄새가 상류도시를 맴돈다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "chocoChoco_05",
    condition : (player) =>
        player.justMoved &&
        player.location === "theater" &&
        isChocoChocoPeriod(player) &&
        Math.random() < 0.1,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "극장에서 가수가 나오자마자 팬들이 초콜릿을 들고 가수에게 달려들었다. 저기 있으면 압사당할 것 같다...! 당신은 본능적으로 생명의 위협을 느끼고 구석으로 피했다. 당신의 예상대로 팬들에게 압박당하는 가수의 등은 벽에 닿아 있었다. 그는 사색이 된 얼굴로 살려달라고 지배인에게 SOS 신호를 보내고 있었다." +
                    "<br><br>\"초짜인가...? 오늘 같은 날은 절대 나가면 안 돼.\"<br><br>" +
                    "가수들이 혀를 차더니 대기실 문을 닫는 게 보인다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

// =========================
// 신년 복주머니 이벤트
// =========================

function isNewYearDay(player){
    const date = getCalendarDate(player);
    return date.month === 1 && date.day === 1;
}

function canJoinLuckyBagRaid(player){
    const date = getCalendarDate(player);

    // 1월 1일이 아니면 참가 불가
    if (date.month !== 1 || date.day !== 1){
        return false;
    }

    // 올해 이미 참가했으면 참가 불가
    if (player.flags?.luckyBagRaidYear === date.year){
        return false;
    }

    return true;
}

window.EVENTS.push({
    id : "luckyBag_01",
    condition : (player) =>
        player.justMoved &&
        ["shelter", "goldenShelter"].includes(player.location) &&
        isNewYearDay(player) &&
        Math.random() < 0.1,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "쉘터의 아이들이 수군거리는 소리가 들린다." +
                    "<br><br>\"1월 1일의 기적은 안 일어나나? 복주머니가 갑자기 팡 하고 나타난다던데.\"<br><br>" +
                    "\"제대로 쫓아가면 떼돈을 벌 수 있다잖아...! 그 돈으로 상류도시 갈 자본 만든 사람도 은근 많대!\"<br><br>" +
                    "아이들은 하류도시의 전설이라고 쑥덕거리면서 입을 모았다. 하지만 당신은 그게 전설이 아니라는 걸 알고 있다. 복주머니는 실재한다, <strong>길거리에</strong>."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "luckyBag_02",
    condition : (player) =>
        player.justMoved &&
        ["richTownStreet", "gloryStreet"].includes(player.location) &&
        isNewYearDay(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "\"신 해에도 가족이 평안하시길.\"<br><br>" +
                    "상류도시 귀족들이 서로에게 인사를 하고 있는 모습이 보인다. 상류도시의 아이가 어른들에게 세뱃돈을 받는 것이 보인다. 분명 엄청 많은 돈인데도, 상류도시의 아이는 돈의 액수를 세보자마자 실망한 기색을 감추지 못했다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "luckyBag_03",
    condition : (player) =>
        player.justMoved &&
        ["townStreet", "darkStreet"].includes(player.location) &&
        isNewYearDay(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "하류도시 전설의 복주머니를 발견하기 위해 사람들이 이리저리 돌아다니는 것이 보인다." +
                    "<br><br>\"이번에야말로 떼돈을 벌고 말겠어!\"" +
                    "<br><br>\"욕심은 내면 안돼. 틀리면 그냥 그대로 사라져버리니까.\"<br><br>" +
                    "\"맞아. 너 저번에도 0원 받았잖아.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "luckyBag_raid",

    condition : (player) =>
        player.justMoved &&
        ["townStreet", "darkStreet"].includes(player.location) &&
        canJoinLuckyBagRaid(player),

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "길을 걷던 당신의 눈앞으로 무언가가 빠르게 스쳐 지나갔다.<br><br>" +
                    "붉은 천에 금빛 끈. 통통하게 부풀어 오른 주머니가 사람들 사이를 요리조리 피해 달아나고 있다.<br><br>" +
                    "\"복주머니다! 복주머니가 나타났다!\"<br><br>" +
                    "누군가의 외침과 동시에 사람들이 일제히 복주머니를 향해 달려가기 시작했다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "복주머니를 쫓는다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 사람들을 헤치고 복주머니를 뒤쫓았다. 몇몇 사람들이 벌써부터 뒤쳐지는 게 보인다. 하지만 당신은 달려라 하니!" +
                                    "<br><br>난 있잖아, 내 별명 악바리가 맘에 들어. 그래야 이기지. 모두 모두 제치고 달릴 거야. 복주머니 품으로 달려라 달려라~ 달려라 하니~ 복주머니 끝까지 달려라 하니"
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    startLuckyBagRaid(player);
                                    return true;
                                }
                            }
                        ]
                    },
                    {
                        text : "인간이 너무 많다...",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "인간울렁증이 있는 당신은 그 자리를 피하기로 했다."
                                ]
                            }
                        ]
                    }
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

function startLuckyBagRaid(player){
    const date = getCalendarDate(player);

    // 올해 복주머니 레이드 참가 처리
    player.flags.luckyBagRaidYear = date.year;

    // 레이드 진행 정보 생성
    player.luckyBagRaid = {
        active : true,
        round : 1,
        correct : 0,
        clearedRound : 0,
        reward : 0,
        failed : false
    };
    savePlayer(player);
    startLuckyBagRaidIntro(player);
}

function startLuckyBagRaidIntro(player){
    startScene([
        {
            type : "text",
            value : [
                "복주머니를 거의 따라잡은 순간, 눈앞에 빛나는 화살표가 나타났다.<br><br>" +
                "복주머니를 놓치지 않으려면 화살표가 가리키는 방향을 정확하게 따라가야 할 것 같다."
            ]
        },
        {
            type : "text",
            value : [
                "<strong>[복주머니 레이드]</strong><br><br>" +
                "제한시간 동안 화면에 나타나는 화살표와 같은 방향키를 입력하세요.<br><br>" +
                "시간이 끝나면 다음 단계로 넘어갑니다.<br>" +
                "단, <strong>단 한 번이라도 잘못된 방향키를 입력하면 즉시 실패합니다.</strong><br><br>" +
                "실패할 경우 획득 금액은 <strong>0원</strong>입니다." +
                "<br><br>그치만? 단계가 높아질 수록 금액이 더 커진다굿? 단계별로 맞춘 화살표만큼 돈을 준다굿? 우효~ 도박 가보자고!<br><br>" +
                "<span class='log-danger'>1단계 1,000원 / 2단계 5,000원 / 3단계 10,000원 / 4단계 50,000원 / 5단계 100,000원</span>"
            ]
        },
        {
            type : "text",
            value : [
                "복주머니가 빠르게 달아나기 시작했다.<br><br>" +
                "<strong>첫 번째 추격을 시작합니다.</strong>"
            ]
        }
    ], player, {
        onEnd : () => {
            startLuckyBagRaidRound(player);
        }
    });
}

function startLuckyBagRaidRound(player){
    const raid = player.luckyBagRaid;
    if (!raid?.active){
        return;
    }
    const roundData = {
        1 : {
            target : 10,
            reward : 1000,
            timeLimit : 5000
        },
        2 : {
            target : 20,
            reward : 5000,
            timeLimit : 8000
        },
        3 : {
            target : 30,
            reward : 10000,
            timeLimit : 10000
        },
        4 : {
            target : 40,
            reward : 50000,
            timeLimit : 12000
        },
        5 : {
            target : 50,
            reward : 100000,
            timeLimit : 14000
        }
    };
    const data = roundData[raid.round];
    if (!data){
        finishLuckyBagRaid(player);
        return;
    }
    startLuckyBagArrowGame(player, data);
}

function startLuckyBagArrowGame(player, data){
    const raid = player.luckyBagRaid;

    const sequence = getRandomArrowSequence(data.target);

    startArrowMinigame(player, {
        mode : "sequence",

        // 화살표 전체를 한 번에 보여준다
        sequence : sequence,
        sequenceLength : data.target,

        // 이 화살표 묶음 자체가 한 판
        target : 1,

        title : `복주머니 추격 - ${raid.round}단계`,
        timeLimit : data.timeLimit,

        onTimeout : (player, result) => {
            // 이번 단계에서 시간 안에 맞힌 화살표 수
            raid.correct += result.inputCount;
            raid.reward += result.inputCount * data.reward;
            // 다음 단계로 이동
            raid.round++;
            savePlayer(player);
            showLuckyBagContinueChoice(player);
        },

        onClear : (player) => {
            // 이번 단계의 화살표를 전부 맞힘
            raid.correct += data.target;
            // 이번 단계 완주 기록
            raid.reward += data.target * data.reward;
            raid.clearedRound = raid.round;
            // 다음 단계로 이동
            raid.round++;
            savePlayer(player);
            showLuckyBagContinueChoice(player);
        },

        onGameOver : (player) => {
            raid.failed = true;
            raid.active = false;
            raid.reward = 0;
            savePlayer(player);
            failLuckyBagRaid(player);
        },
        skipFailScene : true,
        endOnFail : true
    });
}

function showLuckyBagContinueChoice(player){
    const raid = player.luckyBagRaid;

    // 5단계까지 끝났으면 바로 정산
    if (raid.round > 5){
        finishLuckyBagRaid(player);
        return;
    }

    startScene([
        {
            type : "text",
            value : [
                `현재까지 복주머니에서 <strong>${raid.reward.toLocaleString()}원</strong>을 확보했다.<br><br>` +
                "여기서 그만두면 이 돈을 전부 가져갈 수 있다.<br>" +
                "하지만 계속 쫓다가 <strong>단 한 번이라도 방향을 틀리면 전부 잃는다.</strong>"
            ]
        },
        {
            type : "choice",
            choices : [
                {
                    text : "계속 복주머니를 쫓는다.",
                    scene : [
                        {
                            type : "text",
                            value : [
                                "딱, 딱 한 판만 더...!"
                            ]
                        },
                        {
                            type : "effect",
                            run : (player) => {
                                startLuckyBagRaidRound(player);
                                return true;
                            }
                        }
                    ]
                },
                {
                    text : "여기서 그만둔다.",
                    scene : [
                        {
                            type : "effect",
                            run : (player) => {
                                finishLuckyBagRaid(player);
                                return true;
                            }
                        }
                    ]
                }
            ]
        }
    ], player);
}

function failLuckyBagRaid(player){
    startScene([
        {
            type : "text",
            value : [
                "잘못된 방향으로 발을 내딛는 순간, 복주머니가 당신에게서 순식간에 멀어졌다.<br><br>" +
                "복주머니는 약올리듯 공중에서 한 번 통통 튀어오르더니 그대로 사람들 사이로 사라져버렸다.<br><br>" +
                "<strong>과욕을! 부리지! 말자! 과!유!불!급!</strong><br><br>" +
                "<span class='log-danger'>획득 금액 : 0원</span>"
            ]
        }
    ], player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });
}

function finishLuckyBagRaid(player){
    const raid = player.luckyBagRaid;

    if (!raid || raid.failed){
        return;
    }
    raid.active = false;
    // 최종 획득 금액
    const reward = raid.reward || 0;
    if (reward > 0){
        changeGold(player, reward);
    }
    savePlayer(player);

    startScene([
        {
            type : "text",
            value : [
                "복주머니를 쫓아 정신없이 달리던 당신은 마침내 걸음을 멈췄다.<br><br>" +
                "복주머니가 공중에서 빙글빙글 돌더니, 당신의 앞에 툭 떨어졌다. 금빛 끈이 스르르 풀리고 안에서 돈이 쏟아져 나왔다.<br><br>" +
                `<strong>복주머니 레이드를 완료했습니다!</strong><br><br>` +
                `<span class='log-positive'>획득 금액 : ${reward.toLocaleString()}원</span>`
            ]
        }
    ], player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });
}

window.EVENTS.push({
    id : "matin_newYearFood",

    condition : (player) => {
        const date = getCalendarDate(player);

        return (
            player.justMoved &&
            player.location === "tavern" &&
            NPC_DATA["matin"].emotion.affection >= 70 &&
            date.month === 1 &&
            date.day === 1 &&
            player.flags?.matinNewYearFood !== date.year
        );
    },

    action : (player) => {
        const date = getCalendarDate(player);

        startScene([
            {
                type : "text",
                value : [
                    "마틴의 주점에는 언제나 사람이 많았지만, 이상하게 오늘따라 사람들이 더 많은 것 같다. [상류도시의 온정]. 상류도시에서 마틴의 주점을 통해 신년을 기념하여 사람들에게 요리를 공짜로 한 그릇씩 나눠주고 있는 모양이었다. 당신을 본 마틴이 당신에게 손짓했다." +
                    "<br><br>...당신의 앞에 내밀어진 요리는 다른 사람들의 요리와는 달랐다. 당신의 입맛 취향을 꿰뚫고 있는 요리였다. 당신은 마틴을 올려다보았지만 마틴은 당신과 시선을 마주치지 않았다." +
                    "<br><br>\"새해 복 많이 받아.\""
                ]
            }
        ], player, {
            onEnd : () => {
                player.flags.matinNewYearFood = date.year;
                increasePlayerMaxHp(player, 5);
                passTime(player, 15);
                savePlayer(player);
                startScene(getLocationScene(player), player);
            }
        });
    }
});

window.EVENTS.push({
    id : "deric_newYearMoney",

    condition : (player) => {
        const date = getCalendarDate(player);

        return (
            player.justMoved &&
            player.location === "gloryStreet" &&
            ( hasNpcRelationship("deric", "lover") || hasNpcRelationship("deric", "spouse") ) &&
            getTimePeriod(player) === "night" &&
            date.month === 1 &&
            date.day === 1 &&
            player.flags?.dericNewYearMoney !== date.year
        );
    },

    action : (player) => {
        const date = getCalendarDate(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"아가.\"<br><br>" +
                    "아직 새벽도 오지 않았는데 데릭은 취한 것 같았다. 그는 반갑다는 듯이 당신에게로 오더니 당신의 나이를 물었다. 아무래도 취해서 당신의 나이를 까먹은 모양이다... 당신이 나이를 말해주자 데릭은 당신과 자신의 나이 차를 세어 보더니 고개를 털었다." +
                    "<br><br>\"상류도시에서는 새해에 돈을 준단다.\"<br><br>" +
                    "데릭은 주머니를 뒤적거리더니 지갑에서 지폐 한 무더기를 꺼냈다. 그는 당신의 가슴팍에 꽂아주더니 올해는 작년보다 더 나은 날을 보내길 바란다고 말했다." +
                    "<br><br>\"...돈도 더 많이 벌고.\""
                ]
            }
        ], player, {
            onEnd : () => {
                player.flags.dericNewYearMoney = date.year;
                changeGold(player, 100000);
                savePlayer(player);
                startScene(getLocationScene(player), player);
            }
        });
    }
});

// =========================
// 연말 이벤트
// =========================
window.EVENTS.push({
    id : "yearEnd_01",

    condition : (player) => {
        const date = getCalendarDate(player);

        return (
            player.justMoved &&
            ["underHouse", "upperHouse", "shelter", "goldenShelter"].includes(player.location) &&
            date.month === 12 &&
            date.day === 31 &&
            getTimePeriod(player) === "night" &&
            player.flags?.yearEndYear !== date.year
        );
    },

    action : (player) => {
        startYearEndEvent(player);
    }
});


function startYearEndEvent(player){

    const romanceNpcs = getRomanceNpcs(player);

    const choices = romanceNpcs.map(npc => ({
        text : `${npc.name}과 함께 보낸다.`,
        action : () => startYearEndWithNpc(player, npc.id)
    }));

    choices.push({
        text : "혼자 보낸다.",
        action : () => startYearEndAlone(player)
    });

    startScene([
        {
            type : "text",
            value : [
                "올해의 마지막 날이다.<br><br>" +
                "하류도시와 상류도시를 가릴 것 없이, 매해 마지막 날은 가장 소중한 사람이랑 지낸다는 관습이 있다.<br><br>...아마 그 풍습을 모르는 사람들은 이 도시에 없을 것이다."
            ]
        },
        {
            type : "choice",
            question : "올해의 마지막 날을 누구와 함께 보낼까?",
            choices
        }
    ], player);
}

function startYearEndWithNpc(player, npcId){

    const handler = window.YEAR_END_HANDLERS?.[npcId];

    if (!handler){
        console.warn(`연말 이벤트 핸들러 없음: ${npcId}`);
        return;
    }

    handler(player);
}

function completeYearEndEvent(player, partnerId){

    const date = getCalendarDate(player);

    // 연말 이벤트 완료 연도
    player.flags.yearEndYear = date.year;

    // 올해 연말을 함께 보낸 상대
    player.flags.yearEndPartner = partnerId;

    // 연말 당시의 연인 / 배우자 명단 저장
    const romanceNpcs = getRomanceNpcs(player);

    player.flags.yearEndRomanceNpcs = romanceNpcs.map(npc => npc.id);
    player.flags.yearEndLettersPending = romanceNpcs.some(npc => npc.id !== partnerId);

    // 연말을 누구와 보냈는지에 따른 관계 변화
    romanceNpcs.forEach(npc => {

        if (npc.id === partnerId){
            // 선택받은 연인
            changeNPCEmotion(npc.id, "affection", 5);
            changeNPCEmotion(npc.id, "rage", -5);
            changeNpcSuspicion(npc.id, -5);
        }
        else{
            // 선택받지 못한 연인
            changeNPCEmotion(npc.id, "affection", -5);
            changeNPCEmotion(npc.id, "rage", 10);
            changeNpcSuspicion(npc.id, 5);
        }

    });

    passTime(player, 120);
    changeStamina(player, 100);
    changeHP(player, 100);
    changeTrauma(player, -10);

    savePlayer(player);
    startScene(getLocationScene(player), player);
}

function startYearEndAlone(player){

    startScene([
        {
            type : "text",
            value : [
                "당신은 올해의 마지막은 혼자 보내기로 했다." +
                "<br><br>당신은 꾸물꾸물 당신의 침대로 돌아가 올해 있었던 일들을 정리하며 수면을 취했다."
            ]
        }
    ], player, {
        onEnd : () => completeYearEndEvent(player, "alone")
    });
}

window.EVENTS.push({
    id : "yearEndLetters_01",

    condition : (player) =>
        player.justMoved &&
        ["underHouse", "upperHouse", "shelter", "goldenShelter"].includes(player.location) &&
        player.flags?.yearEndLettersPending === true,

    action : (player) => {
        startYearEndLetters(player);
    }
});

function completeYearEndLetters(player){
    player.flags.yearEndLettersPending = false;
    savePlayer(player);
    startScene(getLocationScene(player), player);
}

function startYearEndLetters(player){

    const letterNpcs = player.flags.yearEndRomanceNpcs.filter(
        npcId => npcId !== player.flags.yearEndPartner
    );

    startScene([
        {
            type : "text",
            value : [
                "우편함을 확인하자 몇 통의 편지가 도착해 있었다."
            ]
        },
        {
            type : "choice",
            question : "편지를 확인할까?",
            choices : [
                {
                    text : "편지를 확인한다.",
                    action : () => {
                        startYearEndLetterSequence(player, letterNpcs, 0);
                    }
                },
                {
                    text : "나중에 확인한다.",
                    action : () => {
                        startScene(getLocationScene(player), player);
                    }
                }
            ]
        }
    ], player);
}

function startYearEndLetterSequence(player, npcIds, index){

    // 모든 편지를 다 읽음
    if (index >= npcIds.length){
        completeYearEndLetters(player);
        return;
    }

    const npcId = npcIds[index];
    const handler = window.YEAR_END_LETTER_HANDLERS?.[npcId];

    // 편지 핸들러가 없으면 다음 편지로
    if (!handler){
        console.warn(`연말 편지 핸들러 없음: ${npcId}`);
        startYearEndLetterSequence(player, npcIds, index + 1);
        return;
    }

    handler(player, () => {
        startYearEndLetterSequence(player, npcIds, index + 1);
    });
}

// =========================
// 버섯런킹덤 이벤트
// =========================
function isMushroomKingdomPeriod(player){
    const date = getCalendarDate(player);

    return (
        (date.month === 9 && date.day >= 9 && date.day <= 19)
    );
}

window.EVENTS.push({
    id : "mushroomKingdom_01",
    condition : (player) =>
        player.justMoved &&
        ["townStreet", "darkStreet", "townEntrance_act3", "townEntrance"].includes(player.location) &&
        isMushroomKingdomPeriod(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "\"아니, 요새 숲에... 버섯이 좀 많아지지 않았어?\"<br><br>" +
                    "\"버섯버섯.\"<br><br>" +
                    "\"...뭔데, 진짜.\"<br><br>" +
                    "\"버섯맨 왕국은 언젠가 부흥할 것이다...! 버섯버섯...!!\"<br><br>" +
                    "\"이녀석, 버섯맨 애니를 많이 보더니 결국... 버섯맨 오타쿠가 되어버렸어...!\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "mushroomKingdom_02",
    condition : (player) =>
        player.justMoved &&
        ["richTownStreet", "gloryStreet", "richTownEntrance"].includes(player.location) &&
        isMushroomKingdomPeriod(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "상류도시 귀족들은 9월이 벌써 왔다고 말하며 이번 수확은 어떻냐고 물었다. 하류도시 사람들처럼 그들에게도 9월은 수익이 제일 많이 나는 달인 모양이다." +
                    "<br><br>\"제 아들은 9월이니까 버섯맨에게 기도를 올리겠다고 하더라고요.\"<br><br>" +
                    "한 귀족의 넋두리에 나머지 사람들이 웃었다. 그들은 어리면 그럴 수도 있다고 말하며, 자신들도 어렸을 때는 버섯맨에게 풍요를 기원한 적이 있다고 말했다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "mushroomKingdom_03",
    condition : (player) =>
        player.justMoved &&
        player.location === "tavern" &&
        isMushroomKingdomPeriod(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "\"근데 진짜 버섯맨들의 왕국이 있다며?\"<br><br>" +
                    "\"숲에 있다고 들었어. 깊은 숲인지, 그냥 숲인지....\"<br><br>" +
                    "사람들은 술을 마시면서 버섯맨들의 왕국에 대한 이야기를 나누고 있었다. 그들은 버섯맨의 왕국에서 킹버섯맨을 만나기만 해도 다음 년도는 풍년이라는 전설이 있다고 말하며 낄낄 웃었다. 몇 명은 이미 숲으로 떠났다더라. 한 탕 잡으려는 거지."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "mushroomKingdom_04",
    condition : (player) =>
        player.justMoved &&
        player.location === "theater" &&
        isMushroomKingdomPeriod(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "[9월 9일부터 19일까지, 버섯맨들의 습격이 시작된다!]" +
                    "<br><br>...벽에 아주 큰 포스터가 붙어져 있다. 버섯맨들은 모두 옥수수 칼이나 당근 쌍검을 들고 인간을 향해 적대심을 보이고 있었고, 붉은색 머리에 주황색 눈동자를 하고 있는 인간은 마왕처럼 망토를 입고 버섯맨을 향해 독구름을 뿜어내고 있었다." +
                    "<br><br>...어린이들을 위한 뮤지컬인 모양이다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

// =========================
// 무도회 이벤트
// =========================
const SPRING_DANCE_NPC_IDS = [
    "deric",
    "eric",
    "akasia",
    "valen",
    "kain",
    "nikolai",
    "sion"
];

function getSpringDanceNpcs(player){
    return window.SPECIAL_GIFT_NPCS.filter(npc =>
        SPRING_DANCE_NPC_IDS.includes(npc.id) &&
        npc.canGift(player)
    );
}

function canAcceptSpringDancePartner(player, npcId){

    const npc = NPC_DATA[npcId];
    if (!npc) return false;

    const affection = npc.emotion?.affection ?? 0;
    const dominance = npc.emotion?.dominance ?? 0;
    const rage = npc.emotion?.rage ?? 0;

    const isPartner =
        hasNpcRelationship(npcId, "lover") ||
        hasNpcRelationship(npcId, "spouse");

    switch (npcId){
        case "deric":
            return (
                isPartner ||
                ( affection >= 80 && dominance <= 30 )
            );

        case "eric":
            return isPartner;

        case "akasia":
            return isPartner;

        case "valen":
            return isPartner;

        case "kain":
            if (rage >= 50) return false;
            return (
                isPartner || affection >= 80
            )

        case "nikolai":
            return true;

        case "sion":
            return true;
    }

    return false;
}

function normalizeSpringDance(player){
    player.springDance = player.springDance || {
        year: null,
        partner: null,
        practiceDays: [],
        practiceScore: 0,
        contestDone: false,
        contestScore: 0,
        rank: null
    };

    const date = getCalendarDate(player);

    // 해가 바뀌면 초기화
    if (player.springDance.year !== date.year){
        player.springDance = {
            year: date.year,
            partner: null,
            practiceDays: [],
            practiceScore: 0,
            contestDone: false,
            contestScore: 0,
            rank: null
        };
    }

    return player.springDance;
}

function isSpringDancePeriod(player){
    const date = getCalendarDate(player);
    return (
        (date.month === 3 && date.day >= 25 && date.day <= 30)
    );
}

function isSpringDanceDay(player){
    const date = getCalendarDate(player);
    return (
        (date.month === 3 && date.day === 31)
    );
}

window.EVENTS.push({
    id : "springDance_01",
    condition : (player) =>
        player.justMoved &&
        ["gloryStreet", "richTownStreet"].includes(player.location) &&
        isSpringDancePeriod(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "귀족들이 이번 무도회에 대해 이야기를 나누는 소리가 들린다. 그들은 서로들의 춤 상대를 말하다가, 데릭의 춤 상대가 궁금하다고 말했다." +
                    "<br><br>\"이번에는 누굴지 궁금하네요.... 벌써 많은 사람들이 데릭에게 꽃다발을 보냈다는데.\"<br><br>" +
                    "\"그래도 이번에는 결혼까지 생각하고 상대를 고르지 않을까요?\"<br><br>" +
                    "\"그러려나요...\"<br><br>" +
                    "화제는 다시 그들의 춤 상대로 돌아왔다. 몇 명은 이번 춤 상대를 상대로 진지하게 결혼까지 생각하고 있는 모양이었다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "springDance_02",
    condition : (player) =>
        player.justMoved &&
        ["heavenRoad", "heavenPalace"].includes(player.location) &&
        isSpringDancePeriod(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "\"...이번에 저의 춤 상대가 되어주시겠습니까?\"<br><br>" +
                    "화려한 옷을 입은 사람이 다른 사람의 손등에 키스를 하며 물었다. 손등에 키스를 받은 사람이 고민하며 답변을 보류하는 모습이 보인다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

function canPracticeSpringDance(player){
    const date = getCalendarDate(player);
    const dance = normalizeSpringDance(player);

    if (date.month !== 3) return false;
    if (date.day < 25 || date.day > 30) return false;

    if (!dance.partner) return false;

    // 하루 한 번
    if (dance.practiceDays.includes(date.day)) return false;

    const period = getTimePeriod(player);

    return (
        period === "afternoon" ||
        period === "night"
    );
}

function practiceSpringDance(player){
    if (!canPracticeSpringDance(player)) return false;

    const date = getCalendarDate(player);
    const dance = normalizeSpringDance(player);

    dance.practiceDays.push(date.day);
    dance.practiceScore += 10;

    // 3시간
    passTime(player, 30);

    savePlayer(player);

    return true;
}

window.openSpringDancePartnerSelection = function(player){
    const dance = normalizeSpringDance(player);
    if (dance.partner){
        showSingleTextScene(
            "함께 무도회에 참가할 상대가 이미 정해졌다.",
            player
        );
        return;
    }

    const npcs = getSpringDanceNpcs(player);
    const npcChoices = npcs.map(npc => ({
        text: `${npc.name}에게 신청한다`,
        action: `springDance_ask_${npc.id}`
    }));

    npcChoices.push({
        text: "그만둔다",
        action: "springDance_cancelPartnerSearch"
    });

    startScene([
        {
            type: "text",
            value:
                "다가오는 무도회에 함께 참가할 상대를 찾아보기로 했다." +
                "<br><br>누구에게 춤 상대를 신청할까?"
        },
        {
            type: "choice",
            choices: npcChoices
        }
    ], player);
};

function askSpringDancePartner(player, npcId){

    if (canAcceptSpringDancePartner(player, npcId)){
        startSpringDanceAcceptScene(player, npcId);
    } else {
        startSpringDanceRejectScene(player, npcId);
    }
}

function acceptSpringDancePartner(player, npcId){
    const dance = normalizeSpringDance(player);

    dance.partner = npcId;

    savePlayer(player);
}

SPRING_DANCE_NPC_IDS.forEach(npcId => {
    window[`springDance_ask_${npcId}`] = function(player){
        askSpringDancePartner(player, npcId);
    };
});

window.springDance_cancelPartnerSearch = function(player){
    startScene(getLocationScene(player), player);
};

function startSpringDanceAcceptScene(player, npcId){
    let scene = [];
    switch (npcId){
        case "deric":
            scene = [
                {
                    type: "text",
                    value: [
                        "데릭은 당신의 제안에 눈썹을 치켜올리더니 미소를 지었다." +
                        "<br><br>\"그럼. 나도 네게 제안을 할까 생각하고 있었단다.\"<br><br>" +
                        "그는 춤 무도회에서 우승하기 위해서라면 자신과 추는 게 당연한 거 아니냐고 물으며, 우승하면 돈은 전부 당신이 가져도 된다고 말했다." +
                        "<br><br>\"나는 너와 시간을 보낼 수 있는 것만으로도 만족한단다.\""
                    ]
                }
            ];
            break;

        case "eric":
            scene = [
                {
                    type: "text",
                    value: [
                        "에릭은 당신의 제안에 잠시 고민하더니 짧게 고개를 끄덕였다."
                    ]
                }
            ];
            break;

        case "akasia":
            scene = [
                {
                    type: "text",
                    value: [
                        "당신의 제안에 아카시아는 당신이 제안해줄 줄 알고 있었다는 듯 고개를 끄덕였다." +
                        "<br><br>\"...오랜만에 재밌을 것 같군요.\"<br><br>" +
                        "그는 발렌이랑 추는 춤도 좋았지만 당신과 손을 맞잡는 것처럼 두근거리지는 않았다고 말하며 미소를 지었다. 두근거리는 춤이 제일 재밌는 법이죠, 아카시아는 당신의 손을 가볍게 맞잡으며 속삭였다." +
                        "<br><br>\"물론 춤에서도 이길 거고요.\""
                    ]
                }
            ];
            break;

        case "valen":
            scene = [
                {
                    type: "text",
                    value: [
                        "\"...그럼요, {valenTitle}.\"<br><br>" +
                        "그는 사람들 앞에서 당신과 춤을 추는 모습은 이미 저번 주부터 머릿속에 그렸던 장면이라고 말했다. 그는 당신이 춤을 추지 못해도 괜찮다고 말했다." +
                        "<br><br>\"당신의 춤 실력과는 상관없이, 저와 당신이 춤을 춘다는 게 더 중요하니까요.\"<br><br>" +
                        "그는 잠시 말을 멈추더니 미소를 지었다." +
                        "<br><br>\"그들에게도, 그리고... 저 개인에게도 말입니다.\""
                    ]
                }
            ];
            break;

        case "kain":
            scene = [
                {
                    type: "text",
                    value: [
                        "\"...어.\"<br><br>" +
                        "카인은 고개를 끄덕였다. 그는 기분이 좋으면서도 무도회가 끝나고 난 후의 당신이 걱정되는 모양이다. 그는 시간이 지나면 지날수록 사생팬들이 점점 더 선을 넘는다고 말하며 한숨을 쉬었다." +
                        "<br><br>\"...어쨌든 날 선택해줘서...\"<br><br>" +
                        "카인은 얼굴을 붉히더니 고개를 돌리고 \"고마워\"라고 속삭이듯이 중얼거렸다. 고개는 돌렸지만 힐끔힐끔 당신을 곁눈질하고 있다."
                    ]
                }
            ];
            break;

        case "nikolai":
            scene = [
                {
                    type: "text",
                    value: [
                        "\"으응~?\"<br><br>" +
                        "니콜라이는 깔깔 웃더니 자신이랑 춤을 춘다는 건 무도회 상금을 포기한 거냐고 물었다." +
                        "<br><br>\"아니면 그냥 나랑 놀고 싶어서~?\"<br><br>" +
                        "그는 장난스럽게 당신의 뺨을 꼬집더니 즐기자고 말했다." +
                        "<br><br>\"이런 순간들은 쉽게 오지 않거든~\""
                    ]
                }
            ];
            break;

        case "sion":
            scene = [
                {
                    type: "text",
                    value: [
                        "\"네, 네!\"<br><br>" +
                        "시온은 당신의 손을 맞잡더니 최선을 다하겠다고 말했다. 어깨에 과한 기합이 들어간 것 같다.... 상류도시 귀족들 중 몇 명이 시온을 보며 저 아이는 대체 누구냐며 수군거리는 소리가 들린다. 몇몇은 시온을 이미 알고 있고 몇몇은 시온을 모르는 것 같다. \"역시 하류도시 출신이라....\", 누군가가 혀를 찼다. 시온은 목소리의 근원지 쪽으로 고개를 돌렸다. 살기 어린 장밋빛 눈동자는 당신을 향하자 다시 애정으로 가득 찼다."
                    ]
                }
            ];
            break;
        default:
            return;
    }

    // 수락 대사 뒤에 파트너 확정
    scene.push({
        type: "effect",
        run: (player) => {
            acceptSpringDancePartner(player, npcId);
        }
    });

    startScene(scene, player, {
        onEnd: () => startScene(getLocationScene(player), player)
    });
}

function startSpringDanceRejectScene(player, npcId){

    let scene = [];

    switch (npcId){

        case "deric":
            scene = [
                {
                    type: "text",
                    value: [
                        "\"...이런, 미안하지만 난 이미 임자가 있단다.\"<br><br>" +
                        "그는 어깨를 으쓱이더니 자신과 상대가 되려면 더 일찍 말했어야 하는 거 아니냐고 물었다." +
                        "<br><br>\"네가 착한 아이가 되어준다면, 내년에는 고려는 한번 해주마.\""
                    ]
                }
            ];
            break;

        case "eric":
            scene = [
                {
                    type: "text",
                    value: [
                        "에릭은 고개를 저었다. 그는 이런 무도회에는 관심이 없다고 말했다."
                    ]
                }
            ];
            break;

        case "akasia":
            scene = [
                {
                    type: "text",
                    value: [
                        "\"당신이 제게 제안을 해주실 줄은 몰랐는데요, {akasiaTitle}.\"<br><br>" +
                        "아카시아는 고개를 저었다." +
                        "<br><br>\"죄송하지만 반려하겠습니다.\""
                    ]
                }
            ];
            break;

        case "valen":
            scene = [
                {
                    type: "text",
                    value: [
                        "\"마음은 감사하지만 죄송합니다. 제게는 아카시아 양이 있어서요.\"<br><br>" +
                        "발렌은 미소 한번 그치지 않고 당신의 제안을 매끄럽게 거절했다." 
                    ]
                }
            ];
            break;

        case "kain":
            scene = [
                {
                    type: "text",
                    value: [
                        "\"...아니.\"<br><br>" +
                        "카인은 인상을 찌푸리더니 고개를 저었다. 그는 다른 사람이나 찾아보라고 말하며 당신에게서 완전히 고개를 돌렸다."
                    ]
                }
            ];
            break;

        default:
            return;
    }

    startScene(scene, player, {
        onEnd: () => startScene(getLocationScene(player), player)
    });
}

function startSpringDancePracticeScene(player, npcId){
    const npc = NPC_DATA[npcId];
    if (!npc) return;

    startScene([
        {
            type: "text",
            value: `${npc.name}을(를) 발견했다.`
        },
        {
            type: "choice",
            choices: [
                {
                    text: "함께 춤을 연습한다.",
                    scene: getSpringDancePracticeScene(npcId)
                },
                {
                    text: "지금은 돌아간다.",
                    scene: [
                        {
                            type: "text",
                            value: "당신은 다음에 다시 찾아오기로 했다."
                        }
                    ]
                }
            ]
        }
    ], player, {
        onEnd: () => startScene(getLocationScene(player), player)
    });
}


function getSpringDancePracticeScene(npcId){
    let text = "";
    switch (npcId){

        case "deric":
            text =
                "데릭은 익숙하게 당신의 손을 잡고 다른 손으로 당신의 허리를 감쌌다." +
                "<br><br>\"발 밟지 마렴. 비싼 구두란다.\"" +
                "<br><br>말은 그렇게 하면서도, 당신이 박자를 놓칠 때마다 데릭은 능숙하게 당신을 이끌었다. 몇 번이고 같은 동작을 반복하다 보니 처음보다는 제법 그럴듯하게 발이 맞기 시작했다.";
            break;

        case "eric":
            text =
                "에릭은 당신과 마주 선 채 한동안 말없이 자세를 잡았다. 당신과 시선을 맞추던 그는 능숙하게 당신을 춤으로 이끌었다. 그는 소리없이 당신이 틀릴 때마다 박자를 고쳐주고는 했다." +
                "<br><br>\"...예전의 몸동작을 기억하고 있어서 다행이군.\"<br><br>" +
                "단순히 예전의 몸동작을 기억하고 있는 수준은 아닌 것 같다... 그의 발걸음을 따라가다보니 당신의 동작도 점점 완벽해졌다.";
            break;

        case "akasia":
            text =
                "아카시아는 당신의 자세를 잠시 살펴보더니 손의 위치부터 바로잡아주었다." +
                "<br><br>\"허리를 조금 더 펴십시오. 시선은 아래가 아니라 정면입니다.\"" +
                "<br><br>한 동작이 끝나기도 전에 다음 지적이 날아왔다. 엄격한 연습이 이어졌지만, 그의 지적대로 움직일수록 당신의 동작은 눈에 띄게 안정되어갔다. 아카시아는 한번 시작한 이상 이겨야 한다고 말하며 계속 춤을 이어갔다.";
            break;

        case "valen":
            text =
                "발렌은 자연스럽게 당신에게 손을 내밀었다." +
                "<br><br>\"너무 긴장하지 마세요. 제게 맞추려고 하지 않으셔도 됩니다. 제가 맞출 테니까요.\"" +
                "<br><br>그의 말대로 발렌은 당신이 조금 늦거나 방향을 잘못 잡아도 자연스럽게 동작을 이어갔다. 덕분에 몇 번 반복하지 않아도 춤의 흐름을 익힐 수 있었다.";
            break;

        case "kain":
            text =
                "카인은 당신과 마주 서더니 어색한 얼굴로 손을 내밀었다." +
                "<br><br>\"...미리 말하는데, 나 이런 거 잘 못해. 이런 류의 춤은 재미도 없고...\"" +
                "<br><br>그 말은 겸손이 아니었던 모양이다. 얼마 지나지 않아 서로의 발이 부딪혔다. 카인은 미간을 구기며 자신의 발을 내려다봤다." +
                "<br><br>\"...다시 해.\"" +
                "<br><br>당신과 카인은 처음부터 다시 동작을 맞추기 시작했다. 몇 번이고.";
            break;

        case "nikolai":
            text =
                "니콜라이는 기다렸다는 듯 당신의 손을 잡아끌었다." +
                "<br><br>\"이끄는 걸 좋아해, 아니면 이끌어지는 걸 좋아해? 난 아무 거나 가능하긴 한데~\"" +
                "<br><br>당신이 조금이라도 박자를 놓치면 니콜라이는 웃으며 당신을 빙글 돌려 제자리로 돌려놓았다. 그는 마치 장난을 치듯 박자를 알려주면서 당신이 틀려도 계속 웃었다. 아니, 오히려 당신이 틀리면 더 자지러지게 웃는 것 같다. 많이 춰봐서 그런지 그래도 제대로 알려주고는 있다.";
            break;

        case "sion":
            text =
                "시온은 당신이 내민 손과 당신의 얼굴을 번갈아 바라봤다." +
                "<br><br>\"저... 제가 먼저 잡으면 되는 건가요?\"" +
                "<br><br>조심스럽게 맞잡은 손에는 잔뜩 힘이 들어가 있었다. 처음에는 두 사람 모두 박자가 어긋났지만, 몇 번이고 같은 동작을 반복하자 조금씩 호흡이 맞기 시작했다." +
                "<br><br>\"아...! 방금은 잘 맞은 것 같아요! 역시 영웅님과 저는 운명인가 봐요!\"";
            break;

        default:
            return [];
    }

    return [
        {
            type: "text",
            value: text
        },
        {
            type: "effect",
            run: (player) => {
                practiceSpringDance(player);
            }
        },
        {
            type: "text",
            value: (player) => {
                const dance = normalizeSpringDance(player);

                return (
                    "한동안 춤을 연습했다." +
                    "<br><br><span class='log-warning'>무도회 연습 점수 +10</span>" +
                    `<br>현재 연습 점수 : ${dance.practiceScore}점`
                );
            }
        }
    ];
}

window.springDance_contest = function(player){

    const dance = normalizeSpringDance(player);

    if (dance.contestDone){
        showSingleTextScene(
            "올해의 무도회는 이미 끝났다.",
            player
        );
        return;
    }

    if (!dance.partner){
        showSingleTextScene(
            "함께 무도회에 참가할 상대가 없다.",
            player
        );
        return;
    }

    const npc = NPC_DATA[dance.partner];
    if (!npc) return;

    const partnerScene = getSpringDanceContestPartnerScene(dance.partner);

    startScene([
        {
            type: "text",
            value:
                "사교회장에는 이미 많은 사람들이 모여 있었다. 결과의 승패보다는 자신의 인맥에 집중하는 사람들이 대다수인 것 같다. 평소보다 더 화려한 꽃들로 장식되어 있는 사교회장은 인조적인 꽃 향기로 가득했다." +
                `당신은 ${npc.name}와(과) 함께 참가자들이 모여 있는 곳으로 향했다.`
        },

        ...partnerScene,

        {
            type: "text",
            value:
                "잠시 후 음악이 시작되었다." +
                "<br><br>" +
                `당신은 ${npc.name}의 손을 잡았다.`
        },
        {
            type: "effect",
            run: (player) => {
                startSpringDanceRhythmGame(player);
                return true;
            }
        }
    ], player);
};

function startSpringDanceRhythmGame(player){

    startArrowRhythmGame(player, {

        title: "꽃무도회",

        noteCount: 20,

        perfectScore: 5,
        goodScore: 3,
        okScore: 1,

        onEnd: (player, result) => {

            finishSpringDanceContest(
                player,
                result
            );
        }
    });
}

function finishSpringDanceContest(player, result){
    const dance = normalizeSpringDance(player);
    const partnerBonus = dance.partner === "deric"
        ? 10
        : 0;
    dance.contestScore = result.score;
    const finalScore =
        dance.practiceScore +
        dance.contestScore +
        partnerBonus;

    const teams =
        getSpringDanceContestTeams(player);

    const partner = NPC_DATA[dance.partner];
    teams.push({
        id: "player",
        name: `당신과 ${partner?.name || "파트너"}`,
        score: finalScore,
        playerTeam: true
    });

    teams.sort((a, b) =>
        b.score - a.score
    );

    const playerIndex =
        teams.findIndex(team =>
            team.playerTeam
        );

    const rank = playerIndex + 1;

    dance.rank = rank;
    dance.contestDone = true;

    savePlayer(player);

    showSpringDanceResult(
        player,
        teams
    );
}

function randomSpringDanceScore(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 본선 경쟁팀 생성
function getSpringDanceContestTeams(player){

    const dance = normalizeSpringDance(player);
    const partnerId = dance.partner;

    const teams = [];

    if (
        partnerId !== "deric" &&
        NPC_DATA.deric
    ){
        teams.push({
            id: "deric",
            name: "데릭과 그의 춤 상대",
            score: randomSpringDanceScore(153, 159)
        });
    }

    const akasiaAlive =
        NPC_DATA.akasia &&
        !player.flags?.akasiaDie;

    const valenAlive =
        NPC_DATA.valen &&
        !player.flags?.valenDie;


    if (
        akasiaAlive &&
        valenAlive
    ){

        if (
            partnerId !== "akasia" &&
            partnerId !== "valen"
        ){
            teams.push({
                id: "akasia_valen",
                name: "아카시아와 발렌",
                score: randomSpringDanceScore(148, 155)
            });
        }


        else if (partnerId === "akasia"){
            teams.push({
                id: "valen_mob",
                name: "발렌과 귀족 아가씨",
                score: randomSpringDanceScore(142, 153)
            });
        }

        else if (partnerId === "valen"){
            teams.push({
                id: "akasia_mob",
                name: "아카시아와 귀족 신사",
                score: randomSpringDanceScore(140, 152)
            });
        }
    }

    let mobIndex = 1;

    while (teams.length < 4){

        teams.push({
            id: `mob_${mobIndex}`,
            name: `귀족 참가자 ${mobIndex}조`,
            score: randomSpringDanceScore(120, 151)
        });
        mobIndex++;
    }
    return teams;
}

function getSpringDanceContestPartnerScene(npcId){

    let text = "";

    switch (npcId){

        case "deric":
            text =
                "데릭은 주변의 참가자들을 천천히 둘러보더니 여유롭게 당신에게 손을 내밀었다." +
                "<br><br>\"긴장할 필요 없단다. 연습한 대로만 하면 돼.\"" +
                "<br><br>그는 당신의 손을 잡아당겨 가까이 세우며 작게 웃었다." +
                "<br><br>\"나만 믿고 따라오렴. 우승 정도는 시켜줄 테니.\"";
            break;

        case "eric":
            text =
                "에릭은 음악이 시작되기를 기다리며 말없이 당신에게 손을 내밀었다." +
                "<br><br>\"...긴장했나?\"" +
                "<br><br>당신의 대답을 들은 그는 잠시 당신을 바라보다 손을 맞잡았다." +
                "<br><br>\"...못 춰도 괜찮다.\"";
            break;

        case "akasia":
            text =
                "아카시아는 다른 참가자들을 바라보며 천천히 장갑을 고쳐 끼었다." +
                "<br><br>\"연습한 것은 전부 기억하고 계시겠지요?\"" +
                "<br><br>당신의 대답과 상관없이 아카시아는 이길 생각으로 만만인 것 같다." +
                "<br><br>\"좋아요. 이기러 갑시다.\"";
            break;

        case "valen":
            text =
                "발렌은 자신에게 다가오는 다른 귀족들과 얘기를 나누면서도 당신의 손을 놓지 않았다. 그는 오히려 당신을 다른 귀족들에게 인사를 시키기도 했다, 마치 당신이 그의 파트너라는 듯이." +
                "<br><br>\"우승하지 않으셔도 됩니다.\"" +
                "<br><br>발렌은 당신의 손등을 은밀하게 쓰다듬으며 속삭였다." +
                "<br><br>\"저와 당신이 함께 춤을 추는 것, 그게 더 중요하니까요.\"";
            break;

        case "kain":
            text =
                "카인의 팬 몇 명이 카인과 당신에게 달려들었지만 다행히도 지배인이 막아주었다. 지배인은 이런 날에도 일을 시키다니, 라고 중얼거리며 데릭에게 추가월급은 꼭 받아낼 거라고 중얼거렸다. 카인은 당신을 보호하듯이 당신의 어깨를 끌어안은 채 인상을 찌푸렸다." +
                "<br><br>\"...진짜 이런 걸 왜 하는 지는 잘 모르겠지만, 그래도....\"" +
                "<br><br>카인은 당신을 내려다보며 씩 웃었다." +
                "<br><br>\"네가 내 상대인 건 좋네.\"";
            break;

        case "nikolai":
            text =
                "니콜라이는 잔뜩 들뜬 얼굴로 당신의 손을 덥석 잡았다." +
                "<br><br>\"드디어 시작하네~\"" +
                "<br><br>그는 주변 참가자들을 한번 훑어보더니 당신에게 얼굴을 가까이했다." +
                "<br><br>\"우승은 모르겠고, 제일 재밌게 놀다 가자. 실수하면 더 재밌고~\"";
            break;

        case "sion":
            text =
                "시온은 주변의 귀족들의 시선에 민감하게 반응했다. 그는 귀족들이 당신에게 다가오려고 하면 서슬이 퍼런 눈으로 그들을 쫓아냈다. 시온은 당신이 저런 음흉한 사람들에게 노출되는 게 싫다며 입술을 내밀었다." +
                "<br><br>\"하지만 그래도... 모두에게 영웅님이 제 춤 상대라는 걸 소개하는 건 좋네요.\"<br><br>" +
                "그는 미소를 지으며, 이제 많은 사람들이 당신과 자신의 관계를 알게 됐으니 당신에게 접근하는 사람이 조금은 줄어들지 않았을까요, 라고 재잘거렸다.";
            break;

        default:
            return [];
    }

    return [
        {
            type: "text",
            value: text
        }
    ];
}

function getSpringDanceAfterDanceText(npcId, score){
    const grade =
        score >= 90 ? "great" :
        score >= 70 ? "good" :
        "bad";

    const texts = {

        deric: {
            great:
                "데릭은 미소를 지었다. 그는 당신이 이렇게 잘 출 줄은 몰랐다며, 내년에도 당신에게 자신과 춤을 출 수 있는 기회가 주어질 지도 모르겠다고 말했다.",

            good:
                "데릭은 당신의 손을 놓으며 작게 웃었다." +
                "<br><br>\"그래도 내 덕분에 체면은 차렸잖니? 빛나지는 못했지만 말이야. 나 말고 너.\"",

            bad:
                "데릭은 마지막까지 당신의 동작을 받아내고는 미소를 지었다. 하지만 그 미소는 서늘했다. 그는 다른 사람들에게 자신이 어떻게 보였을 지 상상하고 있는 것 같다...." +
                "<br><br>\"...적어도 내 구두는 무사하구나.\""
        },

        eric: {
            great:
                "춤이 끝나고 당신과 에릭에게로 시선이 떨어졌다. 에릭은 작게 한숨을 쉬었다." +
                "<br><br>\"데릭이 또 술을 마시겠군.\"",

            good:
                "에릭은 흐트러진 당신의 자세를 마지막까지 자연스럽게 받아주었다. 그는 상류도시 귀족이라 하더라도 당신보다 못 추는 귀족들이 훨씬 많다고 말해주었다.",

            bad:
                "마지막 동작까지 당신을 이끌어낸 에릭은 잠시 침묵했다." +
                "<br><br>\"...삔 곳은 없나?\"<br><br>" +
                "그는 당신의 발목을 살피며 말했다."
        },

        akasia: {
            great:
                "아카시아는 만족스러운 얼굴로 고개를 끄덕였다. 그는 여전히 당신의 손을 놓고 있지 않다." +
                "<br><br>\"저희가 승리하지 못하면 누가 승리하겠습니까?\"",

            good:
                "아카시아는 잠시 방금 전의 춤을 되짚어보는 듯했다." +
                "<br><br>\"몇 군데 아쉽기는 했지만... 충분히 좋은 춤이었습니다. 그리고 즐거웠고요.\"",

            bad:
                "아카시아는 한동안 아무 말 없이 당신을 바라봤다." +
                "<br><br>\"...분합니다. 내년에는 무조건 우승하도록 하죠.\"<br><br>" +
                "그는 내년의 복수를 벌써부터 계획하고 있는 것 같다..."
        },

        valen: {
            great:
                "발렌은 마지막까지 흐트러짐 없이 당신을 에스코트하고는 미소를 지었다." +
                "<br><br>\"...춤까지 잘 추시다니, 훌륭하군요. 역시 당신이 제 옆에 있어서 다행입니다.\"",

            good:
                "발렌은 당신의 손을 놓지 않은 채 미소를 지었다." +
                "<br><br>\"모두에게 저희가 어떻게 비쳤을지, 어떤 소문이 돌지 벌써 기대되는 군요.\"<br><br>" +
                "그는 당신 쪽으로 고개를 기울이더니 자신은 부정도 긍정도 하지 않겠다고 말했다." +
                "<br><br>\"그래야 소문이 더 잘 퍼질 테니까요. 당신과 제가.... 정말 특별한 사이라는 소문이.\"",

            bad:
                "발렌은 마지막 순간까지 당신의 실수를 자연스럽게 감춰주었다." +
                "<br><br>\"괜찮습니다. 춤은 점수만을 위해 추는 것이 아니니까요.\""
        },

        kain: {
            great:
                "카인은 음악이 끝나자 믿기지 않는다는 얼굴로 당신을 바라봤다." +
                "<br><br>\"...와, 씨발, 너 진짜 잘 춘다.\"<br><br>" +
                "그는 즐거움을 감추지 못한 채 당신을 올려다보았다가 얼굴이 붉어지더니 그대로 고개를 돌렸다.",

            good:
                "\"...아이씨. 더 잘 추고 싶었는데.\"<br><br>" +
                "카인은 다음 번에는 더 연습해오겠다고 말했다.<br><br>" +
                "\"그러니까 내년에도...\"",

            bad:
                "음악이 끝나자 카인은 한동안 말없이 자신의 발을 내려다봤다." +
                "<br><br>\"...미안하다.\""
        },

        nikolai: {
            great:
                "니콜라이는 음악이 끝나자 당신의 손을 잡은 채 깔깔 웃었다." +
                "<br><br>\"와~ 우리 꽤 멋있었는데? 한 번 더 출까?\"",

            good:
                "니콜라이는 결과에는 별 관심도 없는 듯 즐겁게 웃었다." +
                "<br><br>\"재밌었지? 난 재밌었어~\"",

            bad:
                "춤이 끝나자 니콜라이는 결국 참지 못하고 웃음을 터뜨렸다." +
                "<br><br>\"아하하! 방금 그거 봤어? 우리 진짜 엉망이었어!\""
        },

        sion: {
            great:
                "시온은 음악이 끝났다는 것도 잊은 듯 한동안 당신을 바라봤다." +
                "<br><br>\"영웅님은 언제까지 절 반하게 만드실 건가요? 여기서 더 반할 수 있을 줄은 꿈에도 몰랐어요.\"",

            good:
                "시온은 긴장이 풀린 듯 환하게 웃었다." +
                "<br><br>\"끝났다...! 영웅님, 집에 돌아가서 더 출까요? 단둘이.\"",

            bad:
                "시온에게 춤을 못 췄다는 사실은 별로 중요하지 않았다. 그는 당신의 손을 잡은 채 손가락을 꼼지락거렸다." +
                "<br><br>\"춤 연습.... 더 하실래요? 끝나고.\""
        }
    };
    return texts[npcId]?.[grade] || "";
}

function showSpringDanceResult(player, teams){
    const dance = normalizeSpringDance(player);
    const partnerBonus = dance.partner === "deric"
        ? 10
        : 0;
    const finalScore =
        dance.practiceScore +
        dance.contestScore +
        partnerBonus;

    const rankingText = teams
        .map((team, index) =>
            `${index + 1}위 - ${team.name}`
        )
        .join("<br>");

    startScene([
        {
            type: "text",
            value:
                "모든 참가자들의 춤이 끝난 뒤, 잠시 심사가 이어졌다." +
                "<br><br>" +
                "이윽고 무도회장의 소란이 잦아들고 결과가 발표되기 시작했다."
        },
        {
            type: "text",
            value:
                `<strong>당신의 무도회 점수</strong>` +
                `<br><br>연습 점수 : ${dance.practiceScore}점` +
                `<br>본선 점수 : ${dance.contestScore}점` +
                (
                    dance.partner === "deric"
                    ? `<br>꺄악 데릭군! +10점`
                    : ""
                ) +
                `<br><br><strong>총점 : ${finalScore}점</strong>`
        },
        {
            type: "text",
            value:
                rankingText +
                `<br><br>` +
                `<strong>당신은 ${dance.rank}위를 차지했다!</strong>`
        }
    ], player, {
        onEnd: () => {
            giveSpringDanceReward(player);
        }
    });
}

function giveSpringDanceReward(player){

    const dance = normalizeSpringDance(player);

    const partnerBonus =
        dance.partner === "deric"
            ? 10
            : 0;

    const finalScore =
        dance.practiceScore +
        dance.contestScore +
        partnerBonus;

    // 점수에 따른 기본 꽃 보상
    const scoreReward =
        Math.round(finalScore * 1.5);

    let rankFlowerReward = 0;
    let furnitureId = null;

    // 등수 보상
    switch (dance.rank){
        case 1: {
            rankFlowerReward = 100;
            furnitureId = getSpringDanceFirstPrize();
            break;
        }

        case 2: {
            rankFlowerReward = 50;
            break;
        }

        case 3:
            rankFlowerReward = 30;
            break;

        default:
            rankFlowerReward = 3;
            break;
    }

    const totalFlowerReward =
        scoreReward +
        rankFlowerReward;

    changeEventPoint(
        player,
        totalFlowerReward
    );

    if (furnitureId){
        giveFurniture(
            player,
            furnitureId
        );
    }

    const furniture =
        furnitureId
            ? FURNITURE_DATA[furnitureId]
            : null;

    startScene([
        {
            type: "text",
            value:
                "무도회의 시상이 시작되었다." +
                "<br><br>" +

                `<span class='log-positive'>점수 보상 : ${scoreReward}꽃</span>` +
                "<br>" +

                `<span class='log-positive'>${dance.rank}위 보상 : ${rankFlowerReward}꽃</span>` +

                (
                    furniture
                        ? `<br><span class='log-positive'>${furniture.name}을(를) 획득했다!</span>`
                        : ""
                ) +
                `<br><br><strong>총 ${totalFlowerReward}꽃을 획득했다!</strong>`
        }
    ], player, {
        onEnd: () => {
            startScene(
                getLocationScene(player),
                player
            );
        }
    });
}

function getSpringDanceFirstPrize(){
    if (Math.random() < 0.03){
        return "goldenRabbitDoll";
    }
    const dolls = [
        "blueRabbitDoll",
        "redRabbitDoll",
        "greenRabbitDoll",
        "blackRabbitDoll",
        "yellowRabbitDoll",
        "whiteRabbitDoll"
    ];
    return dolls[
        Math.floor(Math.random() * dolls.length)
    ];
}

// =========================
// 수확제 이벤트
// =========================

function isHarvestDay(player){
        const date = getCalendarDate(player);
    return (
        (date.month === 10 && date.day >= 10 && date.day <= 16)
    );
}

window.EVENTS.push({
    id : "harvestDay_01",
    condition : (player) =>
        player.justMoved &&
        ["shelter", "goldenShelter"].includes(player.location) &&
        isHarvestDay(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "쉘터의 아이들이 신난 듯 노래를 부르고 있다. 그들은 오늘만큼은 누구보다도 빠르게 배추맨을 잡을 거라고 말하며 두 손을 불끈 쥐었다." +
                    "<br><br>\"배추를 뜯어내서...! 국을 끓여먹을 거야!!\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "harvestDay_02",
    condition : (player) =>
        player.justMoved &&
        player.location === "townStreet" &&
        isHarvestDay(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "길거리로 나오자 여기저기서 비명 소리가 들렸다. 몇 명은 배추맨을 쫓다가 원통하도다 소리와 함께 쓰러졌고, 몇몇은 고추맨을 쫓아가면서 질질 눈물을 흘리고 있었다. 매워! 매워! 너무 매워!! 감자맨은 아예 굴러가고 있었다.... 사람이 쫓아갈 수 있나?" +
                    "<br><br>\"꼬끼오오오오옥!\"<br><br>" +
                    "...당신은 눈앞이 아득해졌다. 길거리는 난장판이었다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "harvestDay_03",
    condition : (player) =>
        player.justMoved &&
        ["richTownEntrance", "richTownStreet"].includes(player.location) &&
        isHarvestDay(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "당신은 수레에 농작물들을 가득 싣고 가는 것을 보았다. 잘 익은 과일과 윤기가 흐르는 채소, 그리고 갓 구운 빵까지. 상류도시 사람들이 며칠 먹고서도 남을 정도의 많은 양이었다." +
                    "<br><br>\"올해도 풍년이군.\"<br><br>" +
                    "누군가가 말했다. 당신은 순간 하류도시가 떠올랐다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "harvestDay_04",
    condition : (player) =>
        player.justMoved &&
        player.location === "gloryStreet" &&
        isHarvestDay(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "영광의 거리, 사람들이 번쩍번쩍거리는 황금 도로 위로 농작물 탑을 쌓고 있었다. 그들은 모두 웃고 있었다." +
                    "<br><br>\"높이높이 쌓인 만큼 지위도 올라갔으면 좋겠다.\"<br><br>" +
                    "귀족들 중 누군가가 배추 하나를 흘낏 보더니 상에서 치워버렸다. 그는 배추의 모양이 예쁘지 않다고 말하며 다른 배추를 가져오라고 말했다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

//농작물 추격
const HARVEST_CHASE_DATA = {
    cabbage: {
        name: "배추맨",
        itemKey: "cabbage",
        itemName: "배추"
    },

    potato: {
        name: "감자맨",
        itemKey: "potato",
        itemName: "감자"
    },

    pepper: {
        name: "고추맨",
        itemKey: "pepper",
        itemName: "고추"
    }
};

const HARVEST_CHASE_ROUNDS = [
    { arrowCount: 6,  timeLimit: 5000 },
    { arrowCount: 8,  timeLimit: 4500 },
    { arrowCount: 10,  timeLimit: 4000 },
    { arrowCount: 11, timeLimit: 3500 },
    { arrowCount: 12, timeLimit: 3000 }
];

function hasPlayedHarvestGameToday(player, gameId){
    const today = getCurrentDay(player);

    player.flags ??= {};
    player.flags.harvestGameDays ??= {};

    return player.flags.harvestGameDays[gameId] === today;
}

function markHarvestGamePlayedToday(player, gameId){
    const today = getCurrentDay(player);

    player.flags ??= {};
    player.flags.harvestGameDays ??= {};

    player.flags.harvestGameDays[gameId] = today;

    savePlayer(player);
}

function loseHarvestPoint(player, amount = 50){
    const current = Number(player.eventPoint) || 0;
    const loss = Math.min(current, amount);

    if (loss > 0){
        changeEventPoint(player, -loss);
    }

    return loss;
}

function giveHarvestItem(player, itemKey, amount = 2){
    const item = ITEMS.misc?.[itemKey];
    if (!item){
        console.warn("수확제 보상 아이템을 찾을 수 없음:", itemKey);
        return false;
    }
    for (let i = 0; i < amount; i++){
        addItem(player, item);
    }
    return true;
}

function startHarvestChase(player, cropType){
    const data = HARVEST_CHASE_DATA[cropType];
    const gameId = `chase_${cropType}`;

    if (!data){
        console.warn("존재하지 않는 수확제 추격 타입:", cropType);
        return;
    }

    // 하루 1회
    if (hasPlayedHarvestGameToday(player, cropType)){
        showSingleTextScene(
            `오늘은 이미 ${data.name} 추격에 참가했다.` +
            `<br><br>내일 다시 참가할 수 있다.`,
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
        return;
    }

    // 참가하는 순간 오늘 참가 처리
    markHarvestGamePlayedToday(player, gameId);

    showSingleTextScene(
        `사람들 사이에서 갑자기 ${data.name}이 튀어나왔다!` +
        `<br><br>"${data.name}이다!! 잡아!!!"` +
        `<br><br>사람들이 일제히 달리기 시작했다.` +
        `<br>당신도 ${data.name}의 뒤를 쫓았다.`,
        player,
        {
            onEnd: () => startHarvestChaseRound(player, cropType, 0)
        }
    );
}

function startHarvestChaseRound(player, cropType, roundIndex){
    const data = HARVEST_CHASE_DATA[cropType];
    const round = HARVEST_CHASE_ROUNDS[roundIndex];

    if (!data || !round) return;

    startArrowMinigame(player, {
        mode: "sequence",
        target: 1,
        sequenceLength: round.arrowCount,
        timeLimit: round.timeLimit,
        title: `${data.name} 추격! - ${roundIndex + 1}단계`,
        skipFailScene: true,
        endOnFail: true,

        onClear: () => {
            harvestChaseSuccess(player, cropType, roundIndex);
        },

        onGameOver: () => {
            harvestChaseFail(player, cropType);
        },

        onTimeout: () => {
            harvestChaseFail(player, cropType);
        }
    });
}

function harvestChaseSuccess(player, cropType, roundIndex){
    const data = HARVEST_CHASE_DATA[cropType];

    // 단계마다 작물 +2 / 꽃 +10
    giveHarvestItem(player, data.itemKey, 2);
    changeEventPoint(player, 10);

    const isLastRound =
        roundIndex >= HARVEST_CHASE_ROUNDS.length - 1;

    // 5단계 클리어
    if (isLastRound){
        showSingleTextScene(
            `마침내 당신이 ${data.name}을 따라잡았다!` +
            `<br><br>${data.name}이 절망적인 표정으로 뒤를 돌아보았다.` +
            `<br><br>"……${data.itemName}."` +
            `<br><br>당신은 ${data.name}에게서 ${data.itemName} 두 개를 뜯어냈다.` +
            `<br>${data.name}은 홀쭉해진 몸으로 터덜터덜 돌아갔다.` +
            `<br><br><b>${data.itemName} +2</b>` +
            `<br><b>꽃 +10</b>` +
            `<br><br><b>추격 성공!</b>`,
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
        return;
    }

    showHarvestChaseContinueChoice(
        player,
        cropType,
        roundIndex
    );
}

function showHarvestChaseContinueChoice(player, cropType, roundIndex){
    const data = HARVEST_CHASE_DATA[cropType];

    const sceneBox = document.getElementById("storyText");
    const choiceArea = document.getElementById("choiceArea");
    const storyBtn = document.getElementById("storyBtn");

    if (!sceneBox || !choiceArea) return;

    if (storyBtn) storyBtn.style.display = "none";

    sceneBox.innerHTML =
        `${data.name}을 거의 따라잡았다!` +
        `<br><br>도망가던 ${data.name}에게서 ${data.itemName} 두 개가 떨어졌다.` +
        `<br><br><b>${data.itemName} +2</b>` +
        `<br><b>꽃 +10</b>` +
        `<br><br>${data.name}은 아직 도망가고 있다.` +
        `<br>계속 쫓아갈까?`;

    choiceArea.innerHTML = "";

    const continueBtn = document.createElement("button");
    continueBtn.textContent = "계속 쫓는다.";

    continueBtn.onclick = () => {
        choiceArea.innerHTML = "";

        startHarvestChaseRound(
            player,
            cropType,
            roundIndex + 1
        );
    };

    const stopBtn = document.createElement("button");
    stopBtn.textContent = "여기서 그만둔다.";

    stopBtn.onclick = () => {
        choiceArea.innerHTML = "";

        showSingleTextScene(
            `당신은 더 이상 ${data.name}을 쫓지 않기로 했다.` +
            `<br><br>${data.name}은 뒤도 돌아보지 않고 멀리 달아났다.`,
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
    };

    choiceArea.appendChild(continueBtn);
    choiceArea.appendChild(stopBtn);
}

function harvestChaseFail(player, cropType){
    const data = HARVEST_CHASE_DATA[cropType];

    const lostPoint = loseHarvestPoint(player, 50);

    let text = "";

    if (cropType === "cabbage"){
        text =
            `배추맨이 갑자기 방향을 틀었다.` +
            `<br><br>당신은 그대로 앞으로 고꾸라졌다.` +
            `<br><br>"배추우우우우우!!!"` +
            `<br><br>배추맨이 승리의 함성을 지르며 사라졌다.`;
    }

    else if (cropType === "potato"){
        text =
            `감자맨이 갑자기 몸을 둥글게 말았다.` +
            `<br><br>……굴러간다.` +
            `<br><br>빠르다.` +
            `<br>너무 빠르다.` +
            `<br><br>당신은 멀어지는 감자맨을 멍하니 바라보았다.`;
    }

    else if (cropType === "pepper"){
        text =
            `고추맨이 뒤를 돌아보더니 몸을 세차게 털었다.` +
            `<br><br>매운 냄새가 얼굴을 덮쳤다.` +
            `<br><br>"으아아악!! 매워!!!"` +
            `<br><br>눈물을 닦는 사이 고추맨은 이미 사라지고 없었다.`;
    }

    text += `<br><br><b>추격 실패!</b>`;

    if (lostPoint > 0){
        text += `<br><b>꽃 -${lostPoint}</b>`;
    }
    else {
        text += `<br>잃을 꽃이 없었다.`;
    }

    showSingleTextScene(
        text,
        player,
        {
            onEnd: () => startScene(getLocationScene(player), player)
        }
    );
}

//닭 로데오
const HARVEST_RODEO_CONFIG = {
    sequenceLength: 8,
    hideAfter: 1000,
    timeLimit: 4300,
    maxMisses: 3,
    reward: 10
};

function startHarvestRodeo(player){
    const gameId = "rodeo";

    if (hasPlayedHarvestGameToday(player, gameId)){
        showSingleTextScene(
            "오늘은 이미 닭 로데오에 참가했다." +
            "<br><br>내일 다시 참가할 수 있다.",
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
        return;
    }

    startScene([
        {
            type: "text",
            value:
                "사람들이 둥글게 모여 환호성을 지르고 있다." +
                "<br><br>그 한가운데에서 거대한 닭 한 마리가 미친 듯이 날뛰고 있었다." +
                "<br><br>\"꼬끼오오오오오오옥!!!\"" +
                "<br><br>닭 위에 올라탄 사람이 허공으로 날아갔다." +
                "<br><br>...다음 참가자는 당신인 것 같다."
        },
        {
            type: "choice",
            choices: [
                {
                    text: "닭 위에 올라탄다.",
                    action: () => beginHarvestRodeo(player)
                },
                {
                    text: "안 한다.",
                    action: () => startScene(getLocationScene(player), player)
                }
            ]
        }
    ], player);
}

function beginHarvestRodeo(player){
    markHarvestGamePlayedToday(player, "rodeo");

    const state = {
        success: 0,
        misses: 0
    };

    showSingleTextScene(
        "당신은 날뛰는 닭의 등에 올라탔다." +
        "<br><br>닭이 고개를 돌려 당신을 바라보았다." +
        "<br><br>...눈이 마주쳤다." +
        "<br><br>\"꼬끼오.\"" +
        "<br><br>...어라? 방금 부리인데 미묘하게 비틀려 올라가지 않았나?",
        player,
        {
            onEnd: () => startHarvestRodeoRound(player, state)
        }
    );
}

function startHarvestRodeoRound(player, state){
    startArrowMinigame(player, {
        title: "닭 위에서 버텨라!",
        target: 1,

        sequenceLength: HARVEST_RODEO_CONFIG.sequenceLength,
        timeLimit: HARVEST_RODEO_CONFIG.timeLimit,
        hideAfter: HARVEST_RODEO_CONFIG.hideAfter,

        onStepSuccess: () => {
            state.success++;

            changeEventPoint(
                player,
                HARVEST_RODEO_CONFIG.reward
            );
        },

        onClear: () => {
            harvestRodeoSuccess(player, state);
        },

        onStepFail: () => {
            state.misses++;
        },
        skipFailScene: true,
        endOnFail: true,
        onGameOver: () => {
            harvestRodeoFail(player, state);
        },
        onTimeout: () => {
            state.misses++;
            harvestRodeoFail(player, state);
        }
    });
}

function harvestRodeoSuccess(player, state){
    showSingleTextScene(
        "\"끼요오오오오오옭!!!\"" +
        "<br><br>ㄷ...닭소리 맞나? 이거 진짜 닭 맞아?" +
        `<br><br><b>꽃 +${HARVEST_RODEO_CONFIG.reward}</b>` +
        `<br><b>성공 ${state.success}회</b>` +
        `<br><b>실수 ${state.misses} / ${HARVEST_RODEO_CONFIG.maxMisses}</b>`,
        player,
        {
            onEnd: () =>
                startHarvestRodeoRound(player, state)
        }
    );
}

function harvestRodeoFail(player, state){
    // 세 번째 실패
    if (state.misses >= HARVEST_RODEO_CONFIG.maxMisses){
        finishHarvestRodeo(player, state);
        return;
    }

    showSingleTextScene(
        "닭이 갑자기 몸을 크게 비틀었다!" +
        "<br><br>당신의 몸이 크게 기울었다." +
        "<br><br>떨어질 뻔했지만 간신히 닭의 깃털을 붙잡았다." +
        `<br><br><b>실수 ${state.misses} / ${HARVEST_RODEO_CONFIG.maxMisses}</b>` +
        `<br><b>성공 ${state.success}회</b>`,
        player,
        {
            onEnd: () =>
                startHarvestRodeoRound(player, state)
        }
    );
}

function finishHarvestRodeo(player, state){
    const earned =
        state.success *
        HARVEST_RODEO_CONFIG.reward;

    showSingleTextScene(
        "순간, 닭은 당신을 돌아보았다. 당신도 닭을 보았다. 닭은 촉촉한 눈으로 당신을 바라보고 있었다." +
        "<br><br>당신의 머리에 지금까지 당신이 먹었던 닭들이 스쳐 지나갔다. 치킨. 양념치킨. 소이치킨. 닭볶음탕. 백숙. 닭꼬치. 청량마요치킨...." +
        "<br><br><strong>치. 치. 치키이이이이이인!!!</strong>" +
        "<br><br>당신은 그대로 하늘로 솟아올랐다. 마치 튀겨진 CHICKEN처럼." +
        `<br><br><b>성공 ${state.success}회</b>` +
        `<br><b>획득한 꽃 ${earned}개</b>`,
        player,
        {
            onEnd: () =>
                startScene(getLocationScene(player), player)
        }
    );
}

//풍요의 탑
const HARVEST_TOWER_STAGES = [
    { speed: 0.35, tolerance: 18 },
    { speed: 0.50, tolerance: 12 },
    { speed: 0.60, tolerance: 9 },
    { speed: 0.75, tolerance: 8 },
    { speed: 0.90, tolerance: 5 }
];

const HARVEST_TOWER_REWARD = 10;

function startHarvestTower(player){
    const gameId = "harvestTower";

    if (hasPlayedHarvestGameToday(player, gameId)){
        showSingleTextScene(
            "오늘은 이미 풍요의 탑 쌓기에 참가했다." +
            "<br><br>내일 다시 참가할 수 있다.",
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
        return;
    }

    startScene([
        {
            type: "text",
            value:
                "영광의 거리 한복판에 온갖 농작물이 산처럼 쌓여 있었다." +
                "<br><br>귀족들은 농작물을 하나씩 쌓아 올리며 누가 가장 높은 탑을 만드는지 겨루고 있었다." +
                "<br><br>\"높이 쌓을수록 올해 더 큰 풍요가 찾아온다네!\"" +
                "<br><br>......물론 근거는 없어 보인다."
        },
        {
            type: "choice",
            choices: [
                {
                    text: "풍요의 탑을 쌓는다.",
                    action: () => beginHarvestTower(player)
                },
                {
                    text: "안 한다.",
                    action: () => startScene(getLocationScene(player), player)
                }
            ]
        }
    ], player);
}

function beginHarvestTower(player){
    markHarvestGamePlayedToday(player, "harvestTower");

    const state = {
        stage: 0,
        targetX: 50,
        placed: []
    };

    startHarvestTowerStage(player, state);
}

function startHarvestTowerStage(player, state){
    const stage = HARVEST_TOWER_STAGES[state.stage];

    if (!stage){
        finishHarvestTower(player, state);
        return;
    }

    const currentIcon = getHarvestTowerIcon(state.stage);
    const towerHtml = `
    <div class="harvest-tower-stage">

        ${state.placed.map((item, index) => `
            <div
                class="harvest-tower-block"
                style="
                    left:${item.x}%;
                    bottom:${25 + index * 38}px;
                "
            >
                ${item.icon}
            </div>
        `).join("")}

        <div class="harvest-tower-base"></div>

    </div>
    `;

    startTimingGaugeGame(player, {
        title:
            `풍요의 탑 ${state.stage + 1} / ${HARVEST_TOWER_STAGES.length}`,

        speed: stage.speed,
        targetX: state.targetX,
        tolerance: stage.tolerance,

        instruction:
            `${currentIcon} SPACE를 눌러 농작물을 떨어뜨리세요!`,

        extraHtml: towerHtml,
        
        onSuccess: (player, result) => {
            harvestTowerSuccess(
                player,
                state,
                result.position,
                currentIcon
            );
        },

        onFail: () => {
            harvestTowerFail(
                player,
                state
            );
        }
    });
}

function getHarvestTowerIcon(stage){
    const icons = [
        "🥔",
        "🥬",
        "🎃",
        "🍎",
        "🍞"
    ];

    return icons[
        stage % icons.length
    ];
}

function harvestTowerSuccess(
    player,
    state,
    currentX,
    icon
){
    state.placed.push({
        x: currentX,
        icon
    });

    state.targetX = currentX;
    state.stage++;

    changeEventPoint(
        player,
        HARVEST_TOWER_REWARD
    );

    // 5단계 전부 성공
    if (
        state.stage >=
        HARVEST_TOWER_STAGES.length
    ){
        finishHarvestTower(
            player,
            state
        );
        return;
    }

    showSingleTextScene(
        "농작물이 아슬아슬하게 아래층 위에 올라갔다!" +
        `<br><br><b>꽃 +${HARVEST_TOWER_REWARD}</b>` +
        `<br><b>${state.stage}단계 성공!</b>` +
        "<br><br>더 높이 쌓아볼까?",
        player,
        {
            onEnd: () =>
                startHarvestTowerStage(
                    player,
                    state
                )
        }
    );
}

function harvestTowerFail(player, state){
    const earned =
        state.stage *
        HARVEST_TOWER_REWARD;

    showSingleTextScene(
        "하, 하나만 더! 딱 하나만 더! 당신은 온 우주의 기운을 모아 하나를 더 쌓았다." +
        "<br><br>온 우주의 기운?<br><br>" +
        "온 우주의 기운을 받은 당신의 탑은 그대로 중력을 받아 무너졌다. 아아, 역시 어떤 일이든 한 순간의 실수로 무너지는 법이다." +
        "<br><br><b>풍요의 탑 쌓기 실패!</b>" +
        `<br><b>성공 ${state.stage}단계</b>` +
        `<br><b>획득한 꽃 ${earned}개</b>`,
        player,
        {
            onEnd: () =>
                startScene(
                    getLocationScene(player),
                    player
                )
        }
    );
}

function finishHarvestTower(player, state){
    const earned =
        state.stage *
        HARVEST_TOWER_REWARD;

    showSingleTextScene(
        "마지막 농작물이 탑 위에 올라갔다." +
        "<br><br>잠시 탑이 흔들렸다." +
        "<br><br>......버틴다!" +
        "<br><br>주변에서 박수가 터져 나왔다." +
        "<br><br>\"오오! 역시 풍요로운 몸매가 풍요로운 탑을 쌓는다!\"" +
        "<br><br>...응?" +
        "<br><br><b>풍요의 탑 완성!</b>" +
        `<br><b>획득한 꽃 ${earned}개</b>`,
        player,
        {
            onEnd: () =>
                startScene(
                    getLocationScene(player),
                    player
                )
        }
    );
}

// =========================
// 많이 먹기 대회 이벤트
// =========================
function isEatEatEatPeriod(player){
    const date = getCalendarDate(player);
    return (
        (date.month === 5 && date.day >= 1 && date.day <= 4)
    );
}

function isEatEatEatDay(player){
    const date = getCalendarDate(player);
    return (
        (date.month === 5 && date.day === 5)
    );
}
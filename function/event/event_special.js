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

    if (isGuGuDay(player)){
        return "🕊️";
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
                `<span class='log-lust'>획득 금액 : ${reward.toLocaleString()}원</span>`
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

    passTime(player, 30);

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
                "데릭은 마지막까지 당신의 동작을 받아내고는 미소를 지었다. 하지만 그 미소는 서늘했다. 그는 다른 사람들에게 자신이 어떻게 보였을지 상상하고 있는 것 같다...." +
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

                `<span class='log-lust'>점수 보상 : ${scoreReward}🌹</span>` +
                "<br>" +

                `<span class='log-lust'>${dance.rank}위 보상 : ${rankFlowerReward}🌹</span>` +

                (
                    furniture
                        ? `<br><span class='log-lust'>${furniture.name}을(를) 획득했다!</span>`
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
    if (hasPlayedHarvestGameToday(player, gameId)){
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

    passTime(player, 10);

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
            `<br><b>+10🌹</b>` +
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
        `<br><b>${earned}🌹 획득</b>`,
        player,
        {
            onEnd: () =>
                startScene(getLocationScene(player), player)
        }
    );
}

//풍요의 탑
const HARVEST_TOWER_STAGES = [
    { speed: 0.50, tolerance: 18 },
    { speed: 0.70, tolerance: 12 },
    { speed: 0.85, tolerance: 9 },
    { speed: 0.95, tolerance: 8 },
    { speed: 1.50, tolerance: 5 }
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
        `<br><br><b>+${HARVEST_TOWER_REWARD}🌹</b>` +
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
        `<br><b>${earned}🌹 획득</b>`,
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
        `<br><b>${earned}🌹 획득</b>`,
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

window.EVENTS.push({
    id : "eatEatEatDay_01",
    condition : (player) =>
        player.justMoved &&
        ["shelter", "goldenShelter"].includes(player.location) &&
        isEatEatEatPeriod(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "쉘터의 아이들이 무료급식의 날이 왔다고 떠들어댔다. 아이들 중에서는 5월 5일을 가장 기다리는 사람들이 많았다. 그들은 이번에는 상류도시에서 어떤 음식을 내놓을까 기대하며 서로 손을 꼽았다." +
                    "<br><br>\"1년치를 한번에 배에 저장해놓을 수 있으면 좋을 텐데.\"<br><br>" +
                    "\"그러니까~\"<br><br>" +
                    "\"주점 가는 거 벌써 기대된다~\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "eatEatEatDay_02",
    condition : (player) =>
        player.justMoved &&
        ["darkStreet", "townStreet"].includes(player.location) &&
        isEatEatEatPeriod(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "\"이번에는 잘 숨겨봐야겠어.\"<br><br>" +
                    "몇몇 사람들이 수군거리며 결의를 다졌다. 누군가 겁에 질린 목소리로 들키면 어떡하냐고 묻자 다른 사람들이 그래도 그날만큼은 백색 군인들이 도둑질을 해도 눈을 감아준다고 말하며 용기를 북돋아주었다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "eatEatEatDay_03",
    condition : (player) =>
        player.justMoved &&
        ["richTownStreet", "gloryStreet"].includes(player.location) &&
        isEatEatEatPeriod(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "\"대체 우리가 언제까지 하류도시 사람들을 먹여살려야 하는 거예요?\"<br><br>" +
                    "몇몇 귀족들이 짜증을 내고 있었다. 그들은 가진 게 없어도 1인분을 하려 노력이라도 해야 하는데, 하류도시 사람들은 근성부터 글러먹은 것 같다고 말했다." +
                    "<br><br>\"에휴, 그래도 우리같은 사람들이 나눠줘야죠. 우리는 그들보다 잘났으니까.\"" +
                    "<br><br>\"저희 쪽은 준비가 잘 되어간대요? 이번에는 누가 장미가 될지 궁금하네요...?\"<br><br>" +
                    "이미 많은 사람들이 장미 선발 대회에 참가할 준비를 하고 있는 것 같다...."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

function getEatEatEatPrepDateKey(player){
    const date = getCalendarDate(player);
    return `${date.year}-${date.month}-${date.day}`;
}

window.eatEatEat_matinPrep = function(player){
    startScene([
        {
            type : "text",
            value : [
                "평소보다 더 바빠보이는 마틴이 당신을 힐끗 올려다보았다. 당신은 주점을 둘러보았다. 마틴 혼자서 이 일을 하려면 4일 내내 밤을 새야 할지도 모른다.... 산더미 같은 식량에 백색 군인들이 가져온 식량이 더 쌓였다." +
                "<br><br>\"...재료 썰기.\"<br><br>" +
                "마틴은 냄비에 퐁당퐁당 썬 고기들을 넣으며 말했다." +
                "<br><br>\"...일한 만큼 꽃동전 줄게.\""
            ]
        },
        {
            type : "effect",
            run : (player) => {
                startEatEatEatMartinPrepGame(player);
                return true;
            }
        }
    ], player);
};

const EAT_EAT_EAT_PREP_INGREDIENTS = [
    "감자",
    "당근",
    "양파",
    "양배추",
    "고기"
];

function startEatEatEatMartinPrepGame(player){
    player.flags.eatEatEatMartinPrepDate = getEatEatEatPrepDateKey(player);
    savePlayer(player);

    const ingredients = [...EAT_EAT_EAT_PREP_INGREDIENTS];

    for (let i = ingredients.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [ingredients[i], ingredients[j]] = [ingredients[j], ingredients[i]];
    }

    const prep = {
        round : 0,
        success : 0,
        ingredients
    };
    startEatEatEatMartinPrepRound(player, prep);
}


function startEatEatEatMartinPrepRound(player, prep){
    if (prep.round >= prep.ingredients.length){
        finishEatEatEatMartinPrep(player, prep);
        return;
    }

    const ingredient = prep.ingredients[prep.round];

    // 성공 구간 위치도 매번 변경
    const targetX = 25 + Math.floor(Math.random() * 51); // 25 ~ 75

    startTimingGaugeGame(player, {
        title : `${ingredient} 썰기`,
        instruction : "적당한 크기가 되도록 SPACE를 눌러 칼을 내리세요!",
        targetX : targetX,
        tolerance : 2,
        speed : 0.8,

        onSuccess : () => {
            prep.success++;
            prep.round++;

            startScene([
                {
                    type : "text",
                    value : `${ingredient}을(를) 먹기 좋은 크기로 썰었다.`
                }
            ], player, {
                onEnd : () => startEatEatEatMartinPrepRound(player, prep)
            });
        },

        onFail : () => {
            prep.round++;

            startScene([
                {
                    type : "text",
                    value : `${ingredient}의 크기가 제각각이다....`
                }
            ], player, {
                onEnd : () => startEatEatEatMartinPrepRound(player, prep)
            });
        }
    });
}

function finishEatEatEatMartinPrep(player, prep){
    const date = getCalendarDate(player);
    const success = prep.success;

    let reward = 1;
    let result = "bad";
    let text = "";

    passTime(player, 20);

    if (success === 5){
        reward = 15;
        result = "good";
        text =
            "마지막 식재료까지 썰은 후 당신은 당신의 결과를 감상했다. 당신이 생각해도 엄청 잘 썬 것 같다! 마틴은 당신의 결과를 보더니 동공이 살짝 커졌다." +
            "<br><br>\"...언젠가 조수로 쓰고 싶어질 정도네.\"<br><br>" +
            "그의 입가에 희미한 미소가 맺혔다.";

    } else if (success === 4){
        reward = 10;
        result = "good";
        text =
            "몇 조각의 크기가 조금 어긋나긴 했지만, 전체적으로 제법 그럴듯하게 썰었다." +
            "<br><br>마틴이 식재료들을 살펴보다가 괜찮다는 듯 고개를 끄덕였다." +
            "<br><br>\"이 정도면 됐어.\"";

    } else if (success >= 2){
        reward = 5;
        result = "normal";
        text =
            "어떻게든 식재료를 전부 썰기는 했다. 도마 위에는 크고 작은 조각들이 뒤섞여 있었다." +
            "<br><br>마틴이 그중 유난히 큰 조각 하나를 집어 들었다. 그러더니 말없이 그 조각을 다시 썰었다.";
    } else {
        reward = 1;
        result = "bad";

        text =
            "식재료를 전부 썰었다." +
            "<br><br>...썰기는 했다." +
            "<br><br>마틴은 도마 위에 널린 기괴한 모양의 식재료들을 한참 바라보았다." +
            "<br><br>\"....\"<br><br>" +
            "침묵이 길어지자 당신은 차라리 욕을 먹는 게 낫겠다는 생각마저 들었다.";
    }
    changeEventPoint(player, reward);

    if (date.month === 5 && date.day === 4){
        player.flags.eatEatEatMartinResult = result;
        player.flags.eatEatEatMartinResultYear = date.year;
    }

    savePlayer(player);

    startScene([
        {
            type : "text",
            value : [
                text +
                `<br><br><strong>${success} / 5회 성공!</strong>` +
                `<br><span class='log-lust'>${reward}화</span>`
            ]
        }
    ], player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });
}

function buildEatEatEatDayTavernScene(player, loc, randomDesc){
    const date = getCalendarDate(player);
    const choices = [];

    if (player.flags?.eatEatEatContestYear !== date.year){
        choices.push({
            text : "많이 먹기 대회에 참가한다.",
            action : "start_eatEatEatContest"
        });
    }

    choices.push({
        text : "주점에서 나간다.",
        action : "move_townStreet"
    });

    return [
        {
            type : "text",
            value :
                "주점 안은 발 디딜 틈도 없을 만큼 사람들로 가득 차 있었다." +
                "<br><br>테이블마다 음식이 산처럼 쌓여 있고, 쉴 새 없이 새로운 접시가 주방에서 나오고 있었다.<br><br>" +
                "평소라면 음식 냄새를 맡으며 주점 밖을 서성였을 사람들도 오늘만큼은 자리를 차지하고 정신없이 음식을 먹고 있다." +
                "<br><br>...몇 명은 음식을 슬쩍 훔치고 있었다." +
                "<br><br>그리고 주점 한가운데에는 유난히 커다란 테이블 하나가 놓여 있었다." +
                "<br><br><strong>[5월 5일 많이 먹기 대회]</strong>" +
                "<br><br>누가 가장 많이 먹을 수 있는지 겨루는 모양이다."
        },
        {
            type : "choice",
            choices
        }
    ];
}

window.start_eatEatEatContest = function(player){
    const date = getCalendarDate(player);

    // 올해 참가 처리
    player.flags.eatEatEatContestYear = date.year;

    player.eatEatEatContest = {
        plate : 0,
        score : 0,
        fullness : 0
    };
    savePlayer(player);

    startScene([
        {
            type : "text",
            value : [
                "당신은 많이 먹기 대회에 참가하기로 했다." +
                "<br><br>주점 한가운데 놓인 커다란 테이블로 다가가자 사람들이 자리를 비켜주었다. 이미 몇몇 참가자들은 빈 접시를 앞에 두고 음식이 나오기만을 기다리고 있었다." +
                "<br><br>당신도 그들 사이에 자리를 잡고 앉았다."
            ]
        },
        {
            type : "text",
            value : [
                "잠시 후 마틴이 음식이 가득 담긴 접시를 들고 나왔다. 그는 당신을 힐끗 보더니 테이블 위에 접시를 내려놓았다. 설명은 필요없었다. 많이 먹기 대회에 무슨 설명이 필요하겠는가? 그냥 먹으면 되는 거지." +
                "<br><br>고기를 먹으면 점수가 더 오를 거고, 야채를 먹으면 덜 배부른 대신 점수가 덜 오를 거고... 당신은 당신의 옆에서 물을 마시며 어떻게든 배부른 배를 쥐어잡는 사람을 보았다." +
                "<br><br>돼장돼장 준비되었나요 돼장 가보자고 돼장~"
            ]
        },
        {
            type : "effect",
            run : (player) => {
                startEatEatEatContest(player);
                return true;
            }
        }
    ], player);
};

function startEatEatEatContest(player){
    const contest = player.eatEatEatContest;

    if (!contest) return;

    if (contest.fullness >= 100){
        finishEatEatEatContest(player);
        return;
    }

    const nextPlate = contest.plate + 1;

    if (nextPlate === 9){
        const date = getCalendarDate(player);

        const hasMartinFood =
            player.flags?.eatEatEatMartinResultYear === date.year;

        if (hasMartinFood){
            startEatEatEatMartinFood(player);
            return;
        }

        startEatEatEatFoodChoice(player);
        return;
    }

    if (nextPlate % 3 === 0){
        startEatEatEatFoodChoice(player);
        return;
    }
    startEatEatEatRandomFood(player);
}

function startEatEatEatRandomFood(player){
    const foods = ["meat", "vegetable"];
    const food = foods[Math.floor(Math.random() * foods.length)];

    if (food === "meat"){
        startEatEatEatFood(player, {
            type : "meat",
            name : "고기",
            score : 40,
            failScore : 20,
            fullness : 20,
            failFullness : 25,
            sequenceLength : 6,
            text : "고기가 가득한 접시가 나왔다."
        });
        return;
    }

    startEatEatEatFood(player, {
        type : "vegetable",
        name : "야채",
        score : 15,
        failScore : 10,
        fullness : 10,
        failFullness : 15,
        sequenceLength : 4,
        text : "야채가 가득한 접시가 나왔다."
    });
}

function startEatEatEatFood(player, food){
    const contest = player.eatEatEatContest;
    if (!contest) return;

    const nextPlate = contest.plate + 1;

    startScene([
        {
            type : "text",
            value :
                `<strong>${nextPlate}번째 접시</strong>` +
                `<br><br>${food.text}`
        },
        {
            type : "effect",
            run : (player) => {
                startArrowMinigame(player, {
                    mode : "sequence",
                    sequenceLength : food.sequenceLength,
                    timeLimit : 5000,
                    title : `${food.name} 먹기`,
                    endOnFail : true,

                    onClear : () => {
                        finishEatEatEatFood(player, food, true);
                    },

                    onGameOver : () => {
                        finishEatEatEatFood(player, food, false);
                    },

                    onTimeout : () => {
                        finishEatEatEatFood(player, food, false);
                    }
                });
                return true;
            }
        }
    ], player);
}

function finishEatEatEatFood(player, food, success){
    const contest = player.eatEatEatContest;
    if (!contest) return;

    passTime(player, 5);

    contest.plate++;

    let gainedScore;
    let gainedFullness;

    if (success){
        gainedScore = food.score;
        gainedFullness = food.fullness;
    } else {
        gainedScore = food.failScore;
        gainedFullness = food.failFullness;
    }

    contest.score += gainedScore;
    contest.fullness += gainedFullness;
    contest.fullness = Math.max(0, contest.fullness);

    savePlayer(player);

    let text = "";
    
    if (food.type === "water"){
        if (success){
            text =
            "당신은 물을 벌컥벌컥 들이켰다. 이제 좀 살 것 같다!" +
            `<br><br><span class='log-lust'>점수 +${gainedScore}</span>`;
        } else {
            text =
            "물이라고 괜찮을 것 같으면 물배 찼다는 말이 왜 있겠는가. 당신은 그만 사레가 들어버리고 말았다. 당신의 기침 소리에 경기를 지켜보던 다른 사람들이 낄낄대는 소리가 들린다." +
            `<br><span class='log-lust'>점수 +${gainedScore}</span>`;
        }
    } else if (success){
        text =
        `다시는 먹짱을 무시하지 마라. 당신은 ${food.name}을(를) 빠르게 먹어치웠다!` +
        `<br><br><span class='log-lust'>점수 +${gainedScore}</span>`;
    } else {
        text =
        `어디서 머피의 법칙 노래가 들리지 않는가? ${food.name}이 끝나지를 않는다.` +
        "<br><br>마치 라면이 불어서 먹어도 먹어도 끝이 안 나는 것처럼." +
        `<br><span class='log-lust'>점수 +${gainedScore}</span>`;
    }

    if (gainedFullness > 0){
        text += `<br>배부름 +${gainedFullness}`;
    } else if (gainedFullness < 0){
        text += `<br><span class='log-danger'>배부름 ${gainedFullness}</span>`;
    }

    text +=
        `<br><br><strong>${contest.plate}접시째</strong>` +
        `<br>점수 : ${contest.score}` +
        `<br>배부름 : ${contest.fullness} / 100`;

    startScene([
        {
            type : "text",
            value : text
        }
    ], player, {
        onEnd : () => startEatEatEatContest(player)
    });
}

function startEatEatEatFoodChoice(player){
    const contest = player.eatEatEatContest;
    if (!contest) return;

    const nextPlate = contest.plate + 1;

    startScene([
        {
            type : "text",
            value :
                `<strong>${nextPlate}번째 접시</strong>` +
                "<br><br>이번에는 먹을 것을 직접 고를 수 있다." +
                "<br><br>무엇을 먹을까?"
        },
        {
            type : "choice",
            choices : [
                {
                    text : "고기가 가득한 접시",
                    action : () => startEatEatEatFood(player, {
                        type : "meat",
                        name : "고기",
                        score : 40,
                        failScore : 20,
                        fullness : 20,
                        failFullness : 25,
                        sequenceLength : 6,
                        text : "고기가 가득한 접시를 골랐다."
                    })
                },
                {
                    text : "야채가 가득한 접시",
                    action : () => startEatEatEatFood(player, {
                        type : "vegetable",
                        name : "야채",
                        score : 15,
                        failScore : 10,
                        fullness : 10,
                        failFullness : 15,
                        sequenceLength : 4,
                        text : "야채가 가득한 접시를 골랐다."
                    })
                },
                {
                    text : "물, 물을 마셔야 해!!",
                    action : () => startEatEatEatFood(player, {
                        type : "water",
                        name : "물",
                        score : 0,
                        failScore : 0,
                        fullness : -5,
                        failFullness : 5,
                        sequenceLength : 10,
                        text : "무, 물이 필요해! 당신은 황급히 물을 집어들었다."
                    })
                }
            ]
        }
    ], player);
}

function startEatEatEatMartinFood(player){
    const contest = player.eatEatEatContest;
    if (!contest) return;

    const result = player.flags?.eatEatEatMartinResult;

    let fullnessChange = 0;
    let text = "";

    if (result === "good"){
        fullnessChange = -40;

        text =
            "<strong>9번째 접시</strong>" +
            "<br><br>이번에는 마틴이 직접 접시를 들고 나왔다." +
            "<br><br>접시 위에는 어딘가 낯익은 크기의 식재료들이 가지런히 담겨 있었다. 전날 당신이 썰었던 것들이다." +
            "<br><br>당신은 음식을 한입 먹었다." +
            "<br><br>...맛있다. 이상할 정도로 술술 들어간다." +
            "<br><br>마틴이 당신을 힐끗 바라보았다." +
            "<br><br>\"잘 썰어놨더라.\"";

    } else if (result === "normal"){
        fullnessChange = -20;

        text =
            "<strong>9번째 접시</strong>" +
            "<br><br>이번에는 마틴이 직접 접시를 들고 나왔다." +
            "<br><br>접시 위에는 전날 당신이 썰었던 식재료들이 들어간 음식이 담겨 있었다." +
            "<br><br>크기가 조금씩 제각각이라 먹기 불편한 부분도 있었지만, 마틴이 어떻게 손을 본 모양이다." +
            "<br><br>그래도 제법 잘 넘어간다.";

    } else {
        fullnessChange = 20;

        text =
            "<strong>9번째 접시</strong>" +
            "<br><br>이번에는 마틴이 직접 접시를 들고 나왔다." +
            "<br><br>당신은 접시를 보자마자 불길한 예감이 들었다." +
            "<br><br>전날 당신이 썰어놓았던 기괴한 모양의 식재료들이 그대로 남아 있다." +
            "<br><br>작은 조각을 삼키자마자 큰 조각이 입을 틀어막고, 겨우 씹어 넘기자 이번에는 또 다른 거대한 조각이 기다리고 있었다." +
            "<br><br>마틴은 말없이 당신이 먹는 모습을 지켜보았다." +
            "<br><br>...왜 다시 안 썰어준 건데?";
    }

    contest.plate++;
    contest.fullness += fullnessChange;
    contest.fullness = Math.max(0, contest.fullness);

    savePlayer(player);

    if (fullnessChange > 0){
        text += `<br><br>배부름 +${fullnessChange}`;
    } else {
        text +=
            `<br><br><span class='log-danger'>배부름 ${fullnessChange}</span>`;
    }

    text +=
        `<br><br><strong>${contest.plate}접시째</strong>` +
        `<br>점수 : ${contest.score}` +
        `<br>배부름 : ${contest.fullness} / 100`;

    startScene([
        {
            type : "text",
            value : text
        }
    ], player, {
        onEnd : () => startEatEatEatContest(player)
    });
}

const EAT_EAT_EAT_NPCS = [
    {
        id : "yuri",
        name : "유리",
        minScore : 220,
        maxScore : 300,
        canJoin : (player) =>
            !!player.flags?.yuri_firstMeeting &&
            !player.flags?.yuriDie
    },

    {
        id : "luke",
        name : "루크",
        minScore : 215,
        maxScore : 240,
        canJoin : (player) =>
            !!player.flags?.luke_firstMeeting &&
            !player.flags?.collapseLuke
    },

    {
        id : "sion",
        name : "시온",
        minScore : 145,
        maxScore : 215,
        canJoin : (player) =>
            !!player.flags?.sion_hisLittleConfession
    },

    {
        id : "akasia",
        name : "아카시아",
        minScore : 230,
        maxScore : 250,
        canJoin : (player) =>
            !!player.flags?.akasiaValenMedal_event &&
            !player.flags?.akasiaDie
    },

    {
        id : "pale",
        name : "창백",
        minScore : 240,
        maxScore : 320,
        canJoin : (player) =>
            !!player.flags?.pale_findHerPlace
    },

    {
        id : "sora",
        name : "소라",
        minScore : 240,
        maxScore : 320,
        canJoin : (player) =>
            !!player.flags?.sora_firstMeeting &&
            !player.flags?.soraDie
    },

    {
        id : "nikolai",
        name : "니콜라이",
        minScore : 110,
        maxScore : 200,
        canJoin : (player) =>
            !!player.flags?.nikolai_firstMeeting &&
            !player.flags?.nikolaiDie
    }
];

const EAT_EAT_EAT_MOBS = [
    { name : "건장한 남자", minScore : 200, maxScore : 310 },
    { name : "굶주린 주민", minScore : 100, maxScore : 210 },
    { name : "주점 단골", minScore : 50, maxScore : 210 },
    { name : "하류도시 주민", minScore : 200, maxScore : 230 },
    { name : "정체불명의 먹보", minScore : 200, maxScore : 320 }
];

function getEatEatEatRandomScore(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getEatEatEatContestants(player){
    const contestants = [];
    const availableNpcs = EAT_EAT_EAT_NPCS.filter(npc =>
        npc.canJoin(player)
    );

    for (let i = availableNpcs.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [availableNpcs[i], availableNpcs[j]] =
            [availableNpcs[j], availableNpcs[i]];
    }

    availableNpcs.slice(0, 3).forEach(npc => {
        contestants.push({
            id : npc.id,
            name : npc.name,
            score : getEatEatEatRandomScore(
                npc.minScore,
                npc.maxScore
            )
        });
    });

    const mobs = [...EAT_EAT_EAT_MOBS];

    for (let i = mobs.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [mobs[i], mobs[j]] = [mobs[j], mobs[i]];
    }

    mobs.slice(0, 2).forEach((mob, index) => {
        contestants.push({
            id : `mob_${index}`,
            name : mob.name,
            score : getEatEatEatRandomScore(
                mob.minScore,
                mob.maxScore
            )
        });
    });
    return contestants;
}

function finishEatEatEatContest(player){
    const contest = player.eatEatEatContest;
    if (!contest) return;

    const contestants = getEatEatEatContestants(player);

    contestants.push({
        id : "player",
        name : player.name || "당신",
        score : contest.score,
        plates : contest.plate
    });

    contestants.sort((a, b) => b.score - a.score);

    let previousScore = null;
    let previousRank = 0;

    contestants.forEach((contestant, index) => {
        if (contestant.score === previousScore){
            contestant.rank = previousRank;
        } else {
            contestant.rank = index + 1;
            previousRank = contestant.rank;
        }

        previousScore = contestant.score;
    });

    const playerResult = contestants.find(
        contestant => contestant.id === "player"
    );

    player.flags.eatEatEatContestScore = contest.score;
    player.flags.eatEatEatContestPlates = contest.plate;
    player.flags.eatEatEatContestRank = playerResult.rank;

    savePlayer(player);

    showEatEatEatContestResult(
        player,
        contestants,
        playerResult
    );
}

const EAT_EAT_EAT_RANK_REWARDS = {
    1 : 200,
    2 : 200,
    3 : 150,
    4 : 100,
    5 : 50,
    6 : 1
};

const EAT_EAT_EAT_FIRST_PRIZE_FURNITURES = [
    "piggyDoll",
    "piggyForkDoll",
    "piggySpoonDoll",
    "poogyDoll",
    "piggyMoney",
    "pooggy",
    "goldenSuperPig",
    "meatTable",
    "meatChair"
];

function showEatEatEatContestResult(player, contestants, playerResult){
    const rank = playerResult.rank;
    const reward = EAT_EAT_EAT_RANK_REWARDS[rank] ?? 1;

    let rankingText = contestants
        .map(contestant => {
            const isPlayer = contestant.id === "player";

            return (
                `${contestant.rank}위 - ` +
                `${isPlayer ? "<strong>당신</strong>" : contestant.name}` +
                ` : ${contestant.score}점`
            );
        })
        .join("<br>");

    let resultText =
        "잠시 후 모든 참가자의 점수 집계가 끝났다." +
        "<br><br><strong>[5월 5일 많이 먹기 대회 결과]</strong>" +
        "<br><br>" +
        rankingText +
        `<br><br>당신의 최종 순위는 <strong>${rank}위</strong>다!`;

    startScene([
        {
            type : "text",
            value : resultText
        },
        {
            type : "effect",
            run : (player) => {
                giveEatEatEatContestReward(player, rank, reward);
                return true;
            }
        }
    ], player);
}

function giveEatEatEatContestReward(player, rank, reward){
    changeEventPoint(player, reward);

    let furnitureId = null;
    let furnitureName = null;

    if (rank === 1){
        furnitureId =
            EAT_EAT_EAT_FIRST_PRIZE_FURNITURES[
                Math.floor(
                    Math.random() *
                    EAT_EAT_EAT_FIRST_PRIZE_FURNITURES.length
                )
            ];

        giveFurniture(player, furnitureId);

        const furniture = FURNITURE_DATA[furnitureId];
        furnitureName = furniture?.name || furnitureId;
    }

    let text =
        `대회 상품으로 <span class='log-lust'>${reward}🌹</span>를 받았다!`;

    if (rank === 1){
        text +=
            "<br><br>그리고 우승 상품으로 커다란 상자 하나가 당신 앞에 놓였다." +
            "<br><br>상자를 열어보니..." +
            `<br><br><strong>${furnitureName}</strong>이(가) 들어 있었다!`;
    }

    player.eatEatEatContest = null;

    savePlayer(player);

    startScene([
        {
            type : "text",
            value : text
        }
    ], player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });
}

//5월의 장미
const MAY_ROSE_OUTFITS = {
    animalPajamas : {
        name : "귀여운 동물 잠옷"
    },
    ballGown : {
        name : "화려한 무도회복"
    },
    festivalDress : {
        name : "단정한 축제복"
    },
    lingerie : {
        name : "란제리"
    }
};

const MAY_ROSE_GREETINGS = {
    nyan : {
        name : "귀엽게 냥냥거리며 인사"
    },
    elegant : {
        name : "우아하게 인사"
    },
    proud : {
        name : "도도하게 고개만 까닥"
    },
    seductive : {
        name : "야릇한 미소를 지으며 인사"
    }
};

const MAY_ROSE_JUDGES = {
    kain : {
        name : "카인",
        canJoin : (player) => true,

        outfit : {
            animalPajamas : 40,
            ballGown : 50,
            festivalDress : 40,
            lingerie : 25
        },
        greeting : {
            nyan : 50,
            elegant : 50,
            proud : 40,
            seductive : 25
        }
    },

    valen : {
        name : "발렌",
        canJoin : (player) =>
            !player.flags?.valenDie,

        outfit : {
            animalPajamas : 40,
            ballGown : 25,
            festivalDress : 50,
            lingerie : 10
        },
        greeting : {
            nyan : 25,
            elegant : 50,
            proud : 40,
            seductive : 10
        }
    },

    deric : {
        name : "데릭",
        canJoin : (player) => true,

        outfit : {
            animalPajamas : 10,
            ballGown : 50,
            festivalDress : 25,
            lingerie : 40
        },
        greeting : {
            nyan : 10,
            elegant : 50,
            proud : 25,
            seductive : 40
        }
    },

    akasia : {
        name : "아카시아",
        canJoin : (player) =>
            !player.flags?.akasiaDie,

        outfit : {
            animalPajamas : 25,
            ballGown : 40,
            festivalDress : 50,
            lingerie : 10
        },
        greeting : {
            nyan : 25,
            elegant : 50,
            proud : 40,
            seductive : 10
        }
    },

    nikolai : {
        name : "니콜라이",
        canJoin : (player) =>
            !player.flags?.nikolaiDie,

        outfit : {
            animalPajamas : 50,
            ballGown : 25,
            festivalDress : 10,
            lingerie : 40
        },
        greeting : {
            nyan : 40,
            elegant : 25,
            proud : 10,
            seductive : 50
        }
    }
};

const MAY_ROSE_MOBS = [
    { name : "화려하게 차려입은 귀족" },
    { name : "긴장한 귀족 영애" },
    { name : "자신만만한 귀족 청년" },
    { name : "장미를 든 참가자" },
    { name : "잔뜩 꾸민 상류도시 주민" }
];

function getRandomMayRoseJudge(player){
    const judgeIds = Object.keys(MAY_ROSE_JUDGES).filter(
        judgeId => MAY_ROSE_JUDGES[judgeId].canJoin(player)
    );

    if (judgeIds.length === 0){
        return null;
    }

    return judgeIds[
        Math.floor(Math.random() * judgeIds.length)
    ];
}

function getMayRoseContestants(player, judgeId){
    const contestants = [];

    const availableNpcs = Object.entries(MAY_ROSE_JUDGES)
        .filter(([npcId, npc]) =>
            npcId !== judgeId &&
            npc.canJoin(player)
        )
        .map(([npcId, npc]) => ({
            id : npcId,
            name : npc.name
        }));

    for (let i = availableNpcs.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));

        [availableNpcs[i], availableNpcs[j]] =
            [availableNpcs[j], availableNpcs[i]];
    }
    contestants.push(
        ...availableNpcs.slice(0, 2)
    );

    const mobs = [...MAY_ROSE_MOBS];
    for (let i = mobs.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));

        [mobs[i], mobs[j]] =
            [mobs[j], mobs[i]];
    }
    const mobCount = 5 - contestants.length;
    mobs.slice(0, mobCount).forEach((mob, index) => {
        contestants.push({
            id : `mayRoseMob_${index}`,
            name : mob.name
        });
    });
    return contestants;
}

window.start_mayRoseContest = function(player){
    player.mayRoseContest = {
        outfit : null,
        judge : null,
        greeting : null,
        charmScore : 0,
        outfitScore : 0,
        greetingScore : 0,
        totalScore : 0
    };

    savePlayer(player);

    startScene([
        {
            type : "text",
            value : [
                "상류도시의 광장에는 평소보다 훨씬 많은 사람들이 모여 있었다." +
                "<br><br>화려하게 꾸며진 무대 위에는 커다란 장미 장식과 함께 현수막 하나가 걸려 있다." +
                "<br><br><strong>[5월의 장미 선발회]</strong>" +
                "<br><br>오늘 하루, 가장 매력적인 사람을 가려내는 상류도시의 축제다." +
                "<br><br>당신은 참가자 대기실로 향했다."
            ]
        },
        {
            type : "text",
            value : [
                "무대에 오르기 전에 먼저 옷을 골라야 한다." +
                "<br><br>어떤 옷을 입고 나갈까?"
            ]
        },
        {
            type : "choice",
            choices : Object.entries(MAY_ROSE_OUTFITS).map(
                ([outfitId, outfit]) => ({
                    text : outfit.name,
                    action : () => selectMayRoseOutfit(
                        player,
                        outfitId
                    )
                })
            )
        }
    ], player);
};

function selectMayRoseOutfit(player, outfitId){
    const contest = player.mayRoseContest;
    if (!contest) return;

    contest.outfit = outfitId;
    contest.judge = getRandomMayRoseJudge(player);

    contest.contestants = getMayRoseContestants(
        player,
        contest.judge
    );

    savePlayer(player);
    revealMayRoseJudge(player);
}

function revealMayRoseJudge(player){
    const contest = player.mayRoseContest;
    if (!contest) return;
    const outfit = MAY_ROSE_OUTFITS[contest.outfit];
    const judge = MAY_ROSE_JUDGES[contest.judge];
    startScene([
        {
            type : "text",
            value :
                `당신은 <strong>${outfit.name}</strong>을(를) 입고 무대에 올랐다.` +
                "<br><br>먼저 무대에 오른 참가자들이 차례로 심사를 받고 있다." +
                "<br><br>잠시 후, 당신의 차례가 되었다." +
                "<br><br>관객들의 시선이 일제히 당신에게 쏠렸다."
        },
        {
            type : "text",
            value :
                "당신은 무대 앞으로 걸어나가 심사위원석을 바라보았다." +
                "<br><br>오늘 당신을 심사할 사람은..." +
                `<br><br><strong>${judge.name}</strong>이다!`
        },
        {
            type : "text",
            value :
                `${judge.name}의 시선이 당신에게 향했다.` +
                "<br><br>어떻게 인사할까?"
        },
        {
            type : "choice",
            choices : Object.entries(MAY_ROSE_GREETINGS).map(
                ([greetingId, greeting]) => ({
                    text : greeting.name,
                    action : () => selectMayRoseGreeting(
                        player,
                        greetingId
                    )
                })
            )
        }
    ], player);
}

function selectMayRoseGreeting(player, greetingId){
    const contest = player.mayRoseContest;
    if (!contest) return;
    contest.greeting = greetingId;
    savePlayer(player);
    calculateMayRoseScore(player);
}

function calculateMayRoseScore(player){
    const contest = player.mayRoseContest;
    if (!contest) return;

    const judge = MAY_ROSE_JUDGES[contest.judge];
    const outfit = MAY_ROSE_OUTFITS[contest.outfit];
    const greeting = MAY_ROSE_GREETINGS[contest.greeting];
    const totalStats = calculateTotalStats(player);
    const charm = totalStats.charm || 0;

    const charmScore = Math.min(
        100,
        Math.round(charm * 1.2)
    );

    const outfitScore =
        judge.outfit[contest.outfit] || 0;

    const greetingScore =
        judge.greeting[contest.greeting] || 0;

    const totalScore =
        charmScore +
        outfitScore +
        greetingScore;

    contest.charmScore = charmScore;
    contest.outfitScore = outfitScore;
    contest.greetingScore = greetingScore;
    contest.totalScore = totalScore;

    savePlayer(player);
    showMayRosePlayerScore(player);
}

function showMayRosePlayerScore(player){
    const contest = player.mayRoseContest;
    if (!contest) return;

    const judge = MAY_ROSE_JUDGES[contest.judge];
    const outfit = MAY_ROSE_OUTFITS[contest.outfit];
    const greeting = MAY_ROSE_GREETINGS[contest.greeting];

    startScene([
        {
            type : "text",
            value :
                `당신은 <strong>${greeting.name}</strong>을(를) 했다.` +
                `<br><br>${judge.name}은(는) 잠시 당신을 바라보더니 점수를 적었다.`
        },
        {
            type : "text",
            value :
                `<strong>[${judge.name}의 심사 결과]</strong>` +
                `<br><br>비밀투표점수 : ${contest.charmScore}점` +
                `<br>의상 (${outfit.name}) : ${contest.outfitScore}점` +
                `<br>인사 (${greeting.name}) : ${contest.greetingScore}점` +
                `<br><br><strong>총점 : ${contest.totalScore} / 200점</strong>`
        }
    ], player, {
        onEnd : () => finishMayRoseContest(player)
    });
}

const MAY_ROSE_NPC_SCORE_RANGES = {
    kain : {
        min : 180,
        max : 200
    },
    deric : {
        min : 160,
        max : 190
    },
    valen : {
        min : 140,
        max : 180
    },
    akasia : {
        min : 145,
        max : 175
    },
    nikolai : {
        min : 150,
        max : 180
    }
};

function getRandomMayRoseScore(min, max){
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}

function finishMayRoseContest(player){
    const contest = player.mayRoseContest;
    if (!contest) return;
    
    passTime(player, 30);

    const results = contest.contestants.map(contestant => {
        const range = MAY_ROSE_NPC_SCORE_RANGES[contestant.id];
        if (range){
            return {
                ...contestant,
                score : getRandomMayRoseScore(
                    range.min,
                    range.max
                )
            };
        }
        return {
            ...contestant,
            score : getRandomMayRoseScore(120, 175)
        };
    });

    results.push({
        id : "player",
        name : player.name,
        score : contest.totalScore
    });

    results.sort((a, b) => b.score - a.score);

    let previousScore = null;
    let previousRank = 0;

    results.forEach((result, index) => {
        if (result.score === previousScore){
            result.rank = previousRank;
        } else {
            result.rank = index + 1;
            previousRank = result.rank;
        }

        previousScore = result.score;
    });

    const playerResult = results.find(
        result => result.id === "player"
    );
    contest.rank = playerResult.rank;
    contest.results = results;
    savePlayer(player);
    showMayRoseContestResult(player);
}

function showMayRoseContestResult(player){
    const contest = player.mayRoseContest;
    if (!contest || !contest.results) return;

    const judge = MAY_ROSE_JUDGES[contest.judge];

    const rankingText = contest.results
        .map(result => {
            const isPlayer = result.id === "player";

            return (
                `${result.rank}위 - ` +
                `${isPlayer ? "<strong>당신</strong>" : result.name}` +
                ` : ${result.score}점`
            );
        })
        .join("<br>");

    startScene([
        {
            type : "text",
            value :
                "모든 참가자의 심사가 끝났다." +
                "<br><br>잠시 후, 집계가 끝난 점수와 순위가 공개되기 시작했다."
        },
        {
            type : "text",
            value :
                "<strong>[5월의 장미 선발회 결과]</strong>" +
                `<br><br>오늘의 심사위원 : <strong>${judge.name}</strong>` +
                "<br><br>" +
                rankingText +
                `<br><br>당신의 최종 순위는 <strong>${contest.rank}위</strong>다!`
        }
    ], player, {
        onEnd : () => giveMayRoseContestReward(player)
    });
}

const MAY_ROSE_RANK_REWARDS = {
    1 : 350,
    2 : 350,
    3 : 300,
    4 : 100,
    5 : 50,
    6 : 1
};

const MAY_ROSE_FIRST_PRIZE_FURNITURES = [
    "roseBunch",
    "roseSmell",
    "goldenRose",
    "roseBath",
    "redRoseBed",
    "greenRoseBed",
    "blueRoseBed",
    "blackRoseBed"
];

function giveMayRoseContestReward(player){
    const contest = player.mayRoseContest;
    if (!contest) return;

    const rank = contest.rank;
    const reward = MAY_ROSE_RANK_REWARDS[rank] ?? 1;

    changeEventPoint(player, reward);

    let furnitureName = null;

    if (rank === 1){
        const furnitureId =
            MAY_ROSE_FIRST_PRIZE_FURNITURES[
                Math.floor(
                    Math.random() *
                    MAY_ROSE_FIRST_PRIZE_FURNITURES.length
                )
            ];

        giveFurniture(player, furnitureId);

        const furniture = FURNITURE_DATA[furnitureId];
        furnitureName = furniture?.name || furnitureId;
    }

    let text =
        `대회 상품으로 <span class='log-lust'>${reward}🌹</span>를 받았다!`;

    if (rank === 1){
        text +=
            "<br><br>그리고 '5월의 장미'에게 주어지는 특별한 상품이 당신 앞에 놓였다." +
            "<br><br>상품을 확인해보니..." +
            `<br><br><strong>${furnitureName}</strong>이(가) 들어 있었다!`;
    }

    const date = getCalendarDate(player);
    player.flags.mayRoseContestYear = date.year;
    player.mayRoseContest = null;
    savePlayer(player);

    startScene([
        {
            type : "text",
            value : text
        }
    ], player, {
        onEnd : () =>
            startScene(getLocationScene(player), player)
    });
}

// =========================
// 비둘기 이벤트
// =========================

function isGuGuDay(player){
        const date = getCalendarDate(player);
    return (
        (date.month === 4 && date.day >= 1 && date.day <= 4)
    );
}

window.EVENTS.push({
    id : "guGuDay_01",
    condition : (player) =>
        player.justMoved &&
        ["townStreet", "darkStreet"].includes(player.location) &&
        isGuGuDay(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "\"뭐, 뭐야... 왜 안 도망가....\"<br><br>" +
                    "비둘기는 절대로 날지 않는다. 그것들은 닭둘기라 불릴 정도로 날지 않는다. 그것들은 위협이 와도 그저 쳐다볼 뿐이다." +
                    "<br><br><strong>그것들은 두려워하지 않는다, 새대가리 비둘기니까.</strong>"                    
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "guGuDay_02",
    condition : (player) =>
        player.justMoved &&
        ["richTownStreet", "gloryStreet"].includes(player.location) &&
        isGuGuDay(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "어디선가 귀족의 비명 소리가 들렸다." +
                    "<br><br><strong>누가 내 머리에 똥 쌌어</strong><br><br>" +
                    "제아무리 상류도시 사람이라고 해도 비둘기의 습격에서 도망칠 수는 없었다. 그것이 비둘기이기 때문이다. 비둘기는 백색 군인들이 오는데도 고개를 높게 쳐들고 날개만 퍼덕였다." +
                    "<br><br>\"안돼, 저건 광범위 바이러스 공격-!\"<br><br>" +
                    "비둘기는 도망가지 않는다. 그것이 비둘기니까."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "guGuDay_03",
    condition : (player) =>
        player.justMoved &&
        ["richTownStreet", "gloryStreet"].includes(player.location) &&
        isGuGuDay(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "황금빛 새장 안에 비둘기들이 앉아 있었다. 귀족들은 어느 비둘기의 깃털이 더 희고 윤기가 흐르는지 진지하게 평가하고 있었다." +
                    "<br><br>\"저건 평민들이 기르는 비둘기와는 혈통부터 달라요.\"<br><br>" +
                    "그 말이 끝나자 비둘기가 바닥에 떨어진 과자 부스러기를 향해 필사적으로 달려갔다." +
                    "<br><br>...당신이 보기에는 별로 다르지 않았다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "guGuDay_04",
    condition : (player) =>
        player.justMoved &&
        ["shelter", "goldenShelter"].includes(player.location) &&
        isGuGuDay(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "쉘터의 아이들이 비둘기 한 마리를 빙 둘러싸고 있었다." +
                    "<br><br>\"이름은 국수야!\"<br><br>\"아니야, 내가 먼저 봤으니까 감자야!\"<br><br>" +
                    "비둘기는 이미 자신에게 내밀어진 빵을 전부 먹어치운 뒤였다. 그런데도 도망가지 않았다. 이곳에 있으면 계속 먹을 것을 받을 수 있다는 사실을 깨달은 모양이다." +
                    "<br><br>....제법 영리한 녀석이다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

const GUGU_RHYTHM_CONFIG = {
    darkStreet : {
        title : "평범한 비둘기와 춤 대결",
        noteCount : 15,
        spawnInterval : 700,
        fallDuration : 2100,
        rewards : [
            { minScore : 40, point : 25 },
            { minScore : 35, point : 15 },
            { minScore : 0,  point : 4 }
        ]
    },

    richTownStreet : {
        title : "상류도시 비둘기와 춤 대결",
        noteCount : 25,
        spawnInterval : 500,
        fallDuration : 1300,
        rewards : [
            { minScore : 70, point : 30 },
            { minScore : 65, point : 20 },
            { minScore : 0,  point : 4 }
        ]
    }
};

function hasPlayedGuGuRhythmToday(player){
    return (
        player.flags?.guGuRhythmDay ===
        getCurrentDay(player)
    );
}

function markGuGuRhythmPlayedToday(player){
    player.flags ??= {};
    player.flags.guGuRhythmDay =
        getCurrentDay(player);

    savePlayer(player);
}

function startGuGuRhythmGame(player, location){
    const config = GUGU_RHYTHM_CONFIG[location];
    if (
        !config ||
        !isGuGuDay(player) ||
        hasPlayedGuGuRhythmToday(player)
    ){
        showSingleTextScene(
            "오늘은 이미 비둘기와 춤 대결을 했다." +
            "<br><br>비둘기들은 당신에게 더 보여줄 춤이 없다는 듯 고개를 돌렸다.",
            player,
            {
                onEnd : () =>
                    startScene(
                        getLocationScene(player),
                        player
                    )
            }
        );
        return;
    }
    markGuGuRhythmPlayedToday(player);
    startScene([
        {
            type : "text",
            value : [
                "\"구구.\"<br><br>" +
                "비둘기가 오른발을 내밀었다." +
                "<br><br>\"구구구.\"<br><br>" +
                "이번에는 날개를 벌린 채 두 번 회전했다. 주변의 비둘기들이 일제히 당신을 바라보았다. <br><br>...아무래도 도전을 받은 것 같다." +
                "<br><br><strong>비둘기보다 춤을 못 추면 이 거리에서 살아남을 수 없다!</strong>"
            ]
        },
        {
            type : "effect",
            run : (player) => {
                startArrowRhythmGame(player, {
                    title : config.title,
                    noteCount : config.noteCount,
                    spawnInterval : config.spawnInterval,
                    fallDuration : config.fallDuration,
                    perfectScore : 3,
                    goodScore : 2,
                    okScore : 1,
                    onEnd : (player, result) => {
                        finishGuGuRhythmGame(
                            player,
                            location,
                            result
                        );
                    }
                });
                return true;
            }
        }
    ], player);
}

function finishGuGuRhythmGame(player, location, result){
    const config = GUGU_RHYTHM_CONFIG[location];
    if (!config) return;

    const rewardData =
        config.rewards.find(data =>
            result.score >= data.minScore
        );

    const reward = rewardData?.point || 0;

    changeEventPoint(player, reward);
    savePlayer(player);

    let resultText;

    if (location === "darkStreet"){
        if (reward === 25){
            resultText =
                "당신이 마지막 박자에 맞춰 발을 내디뎠다." +
                "<br><br>비둘기는 자신의 짧은 다리를 내려다보더니 조용히 고개를 숙였다. 춤 대결의 패배를 인정한 모양이다." +
                "<br><br>잠시 후 비둘기 떼가 당신에게 길을 내어주었다." +
                `<br><br><strong>꽃 ${reward}개를 획득했다!</strong>`;
        } else if (reward === 15){
            resultText =
                "당신과 비둘기는 마지막까지 팽팽하게 춤을 이어갔다." +
                "<br><br>\"구....\"<br><br>" +
                "비둘기는 못마땅한 표정으로 당신을 바라보다가 몇 걸음 뒤로 물러났다. 완벽하게 굴복시키지는 못했지만, 춤 실력은 인정받은 모양이다." +
                `<br><br><strong>꽃 ${reward}개를 획득했다!</strong>`;
        } else {
            resultText =
                "비둘기가 가슴을 부풀리며 승리의 스텝을 밟았다." +
                "<br><br>\"구구구!\"<br><br>" +
                "그것은 그대로 당신의 머리 위에 자리를 잡더니 날개를 퍼덕이며 승리를 자축했다. 당신은 패배감에 고개를 들 수가 없었다.... 어쩌면 비둘기의 무게 때문일지도 모르겠지만." +
                `<br><br><strong>꽃 ${reward}개를 획득했다!</strong>`;
        }
    } else {
        if (reward === 30){
            resultText =
                "당신은 비둘기의 현란한 발놀림을 완벽하게 따라잡았다." +
                "<br><br>\"구굿!?\"<br><br>" +
                "상류도시 비둘기가 충격받은 듯 한 걸음 뒤로 물러났다. 마침내 비둘기 떼가 당신에게 길을 내어주었다." +
                `<br><br><strong>꽃 ${reward}개를 획득했다!</strong>`;
        } else if (reward === 20){
            resultText =
                "상류도시 비둘기와 당신은 마지막 박자까지 한 치도 물러서지 않았다." +
                "<br><br>비둘기는 당신의 춤을 인정하듯 우아하게 고개를 숙였다. 그러나 완전히 패배를 인정할 생각은 없는 모양이다." +
                `<br><br><strong>꽃 ${reward}개를 획득했다!</strong>`;
        } else {
            resultText =
                "상류도시 비둘기가 우아하게 마지막 회전을 마쳤다. 주변의 비둘기들이 날개를 퍼덕이며 환호했다." +
                "<br><br>비둘기는 거기서 멈추지 않았다. 그것은 그대로 당신의 머리 위에 자리를 잡더니 \"구!\" 소리와 함께 승리를 자축했다." +
                "<br><br>당신은 패배감에 고개를 들 수가 없었다.... 어쩌면 비둘기의 무게 때문일지도 모르겠지만." +
                `<br><br><strong>꽃 ${reward}개를 획득했다!</strong>`;
        }
    }

    showSingleTextScene(
        resultText,
        player,
        {
            onEnd : () =>
                startScene(
                    getLocationScene(player),
                    player
                )
        }
    );
}

// =========================
// 눈사람 이벤트
// =========================

function isSnowManDay(player){
    const date = getCalendarDate(player);
    return (
        (date.month === 12 && date.day >= 1) ||
        date.month === 1 ||
        (date.month === 2 && date.day <= 28)
    );
}

window.EVENTS.push({
    id : "snowManDay_01",
    condition : (player) =>
        player.justMoved &&
        ["townStreet", "darkStreet"].includes(player.location) &&
        isSnowManDay(player) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "\"12월 1일부터 2월 28일까지는 눈이 몇 번이나 올까? 나는 눈사람 데이 좋아한단 말이야.\"<br><br>" +
                    "그들은 3개월 내내 눈이 왔으면 좋겠다고 말하며 손을 호호 불었다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

const SNOWMAN_REWARDS = [
    { minScore : 45, point : 20 },
    { minScore : 38, point : 15 },
    { minScore : 28, point : 10 },
    { minScore : 18, point : 5 },
    { minScore : 0,  point : 2 }
];

function calculateSnowManScore(bodySize, headSize){
    const sizeScore =
        (bodySize + headSize) * 4;

    let balanceBonus = 0;

    // 가장 이상적인 눈사람 비율
    if (bodySize === headSize + 1){
        balanceBonus = 12;
    }

    // 몸통과 얼굴이 같은 눈경단
    else if (bodySize === headSize){
        balanceBonus = 2;
    }

    // 몸통이 얼굴보다 두 단계 큼
    else if (bodySize === headSize + 2){
        balanceBonus = 5;
    }

    // 얼굴이 더 크거나 차이가 지나치면 보너스 없음
    return {
        sizeScore,
        balanceBonus,
        totalScore : sizeScore + balanceBonus
    };
}

function hasPlayedSnowManToday(player){
    return (
        player.flags?.snowManPlayedDay ===
        getCurrentDay(player)
    );
}

function markSnowManPlayedToday(player){
    player.flags ??= {};
    player.flags.snowManPlayedDay =
        getCurrentDay(player);

    savePlayer(player);
}

window.startSnowManGame = function(player){
    if (
        !isSnowManDay(player) ||
        !isSnowing(player) ||
        hasPlayedSnowManToday(player)
    ){
        showSingleTextScene(
            "오늘은 눈사람을 만들 수 없다.",
            player,
            {
                onEnd : () =>
                    startScene(
                        getLocationScene(player),
                        player
                    )
            }
        );
        return;
    }
    
    markSnowManPlayedToday(player);
    const state = {
        part : "body",
        bodySize : 1,
        headSize : 1
    };

    startSnowManGrowthRound(
        player,
        state
    );
};

const SNOWMAN_GROWTH_STAGES = {
    1 : {
        speed : 1.0,
        tolerance : 4
    },
    2 : {
        speed : 1.25,
        tolerance : 3
    },
    3 : {
        speed : 1.5,
        tolerance : 2
    },
    4 : {
        speed : 1.8,
        tolerance : 1.5
    }
};

function getSnowManPartName(part){
    return part === "body"
        ? "몸통"
        : "얼굴";
}

function getSnowManPartSize(state){
    return state.part === "body"
        ? state.bodySize
        : state.headSize;
}

function setSnowManPartSize(state, size){
    if (state.part === "body"){
        state.bodySize = size;
    } else {
        state.headSize = size;
    }
}

function getSnowManSizeText(size){
    const sizeNames = {
        1 : "아주 작은",
        2 : "작은",
        3 : "적당한",
        4 : "커다란",
        5 : "엄청나게 커다란"
    };

    return sizeNames[size] || "형체를 알 수 없는";
}

function startSnowManGrowthRound(player, state){
    const partName = getSnowManPartName(state.part);
    const currentSize = getSnowManPartSize(state);

    // 이미 최대 크기라면 해당 부위 완성
    if (currentSize >= 5){
        finishSnowManPart(
            player,
            state
        );
        return;
    }

    const stage =
        SNOWMAN_GROWTH_STAGES[currentSize];

    // 성공 구간 위치는 매번 변경
    const targetX =
        20 + Math.floor(Math.random() * 61);

    startTimingGaugeGame(player, {
        title :
            `${partName} 굴리기 - 현재 ${currentSize}단계`,

        instruction :
            "성공 구간에 맞춰 SPACE를 누르세요!",

        targetX,
        speed : stage.speed,
        tolerance : stage.tolerance,

        extraHtml :
            `<div style="margin-top:12px;">` +
            `현재 ${partName} 크기: ` +
            `<strong>${currentSize} / 5단계</strong>` +
            `</div>`,

        onSuccess : () => {
            const nextSize =
                Math.min(5, currentSize + 1);

            setSnowManPartSize(
                state,
                nextSize
            );

            showSnowManGrowthSuccess(
                player,
                state
            );
        },

        onFail : () => {
            showSnowManGrowthFail(
                player,
                state
            );
        }
    });
}

function showSnowManGrowthSuccess(player, state){
    const partName =
        getSnowManPartName(state.part);

    const currentSize =
        getSnowManPartSize(state);

    // 5단계에 도달하면 자동 완성
    if (currentSize >= 5){
        startScene([
            {
                type : "text",
                value :
                    `당신이 눈덩이를 힘껏 굴리자 ${partName}이(가) 더욱 커졌다.` +
                    `<br><br><strong>${partName}이(가) 최대 크기인 5단계가 되었다!</strong>`
            }
        ], player, {
            onEnd : () =>
                finishSnowManPart(
                    player,
                    state
                )
        });

        return;
    }

    startScene([
        {
            type : "text",
            value :
                `당신이 눈덩이를 굴리자 ${partName}이(가) 더욱 커졌다.` +
                `<br><br>현재 크기는 <strong>${currentSize}단계</strong>다.` +
                "<br><br>조금 더 굴리면 커지겠지만, 실패하면 지금 크기로 완성해야 한다."
        },
        {
            type : "choice",
            choices : [
                {
                    text : "조금 더 굴린다",
                    action : () =>
                        startSnowManGrowthRound(
                            player,
                            state
                        )
                },
                {
                    text : `이 크기로 ${partName}을(를) 완성한다`,
                    action : () =>
                        finishSnowManPart(
                            player,
                            state
                        )
                }
            ]
        }
    ], player);
}

function showSnowManGrowthFail(player, state){
    const partName =
        getSnowManPartName(state.part);

    const currentSize =
        getSnowManPartSize(state);

    startScene([
        {
            type : "text",
            value :
                "당신이 욕심을 내어 눈사람을 더 크게 하는 순간, 눈덩이가 데굴데굴 굴러갔다. 아, 안돼!!! 당신은 가까스로 굴러가는 눈사람을 멈췄다. 더 이상 욕심내면 안 될 것 같다." +
                `<br><br>${partName}은(는) <strong>${currentSize}단계</strong> 크기로 완성되었다.`
        }
    ], player, {
        onEnd : () =>
            finishSnowManPart(
                player,
                state
            )
    });
}

function finishSnowManPart(player, state){
    if (state.part === "body"){
        state.part = "head";

        startScene([
            {
                type : "text",
                value :
                    `${getSnowManSizeText(state.bodySize)} 몸통이 완성되었다.` +
                    "<br><br>이제 몸통 위에 올릴 얼굴을 만들어야 한다." +
                    "<br><br><strong>몸통보다 한 단계 작은 얼굴을 만들면 가장 예쁜 비율이 된다!</strong>"
            }
        ], player, {
            onEnd : () =>
                startSnowManGrowthRound(
                    player,
                    state
                )
        });

        return;
    }

    finishSnowManGame(
        player,
        state
    );
}

function finishSnowManGame(player, state){
    const scoreData =
        calculateSnowManScore(
            state.bodySize,
            state.headSize
        );

    const rewardData =
        SNOWMAN_REWARDS.find(data =>
            scoreData.totalScore >= data.minScore
        );

    const reward =
        rewardData?.point || 0;

    changeEventPoint(
        player,
        reward
    );

    let resultText;

    if (
        state.bodySize === 5 &&
        state.headSize === 4
    ){
        resultText =
            "당신은 커다란 몸통 위에 얼굴을 조심스럽게 올렸다." +
            "<br><br>눈사람은 금방이라도 움직일 것처럼 크고 균형 잡힌 모습이었다. 주변 사람들이 눈사람을 올려다보며 감탄했다." +
            "<br><br>\"내 비율 비너스 비율이구마잉\"<br><br>" +
            "...대체 어디서 들린 목소리였지? 어쨌든,<br><br>" +
            "<br><br><strong>완벽한 눈사람이다!</strong>";
    }

    else if (
        state.bodySize ===
        state.headSize + 1
    ){
        resultText =
            "당신은 몸통 위에 얼굴을 조심스럽게 올렸다." +
            "<br><br>몸통보다 조금 작은 얼굴이 안정적으로 자리를 잡았다. 크기와 비율 모두 제법 훌륭한 눈사람이다.";
    }

    else if (
        state.bodySize ===
        state.headSize
    ){
        resultText =
            "당신은 몸통 위에 얼굴을 올렸다." +
            "<br><br>위아래의 눈덩이 크기가 똑같다." +
            "<br><br>……눈사람이라기보다는 커다란 눈경단 두 개를 쌓아놓은 것처럼 보인다.";
    }

    else if (
        state.headSize >
        state.bodySize
    ){
        resultText =
            "얼굴을 몸통 위에 올리는 순간 눈사람 전체가 위태롭게 흔들렸다." +
            "<br><br>머리가 너무 크다. 눈사람이 무거운 고민을 품고 있는 것처럼 보인다.";
    }

    else if (
        state.bodySize >=
        state.headSize + 3
    ){
        resultText =
            "거대한 몸통 위에 작은 얼굴을 올렸다." +
            "<br><br>멀리서 보면 눈사람이라기보다는 눈덩이 위에 무언가 꽂혀 있는 것 같다.";
    }

    else {
        resultText =
            "당신은 완성한 얼굴을 몸통 위에 올렸다." +
            "<br><br>조금 어설픈 부분은 있지만, 어디에서 봐도 눈사람이라는 사실만큼은 확실하다.";
    }

    resultText +=
        `<br><br>몸통 크기: <strong>${state.bodySize}단계</strong>` +
        `<br>얼굴 크기: <strong>${state.headSize}단계</strong>` +
        `<br>크기 점수: <strong>${scoreData.sizeScore}점</strong>` +
        `<br>비율 보너스: <strong>+${scoreData.balanceBonus}점</strong>` +
        `<br>최종 점수: <strong>${scoreData.totalScore}점</strong>` +
        `<br><br><strong>꽃 ${reward}개를 획득했다!</strong>`;

    showSingleTextScene(
        resultText,
        player,
        {
            onEnd : () =>
                startScene(
                    getLocationScene(player),
                    player
                )
        }
    );
}
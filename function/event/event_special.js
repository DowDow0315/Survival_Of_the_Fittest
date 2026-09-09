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
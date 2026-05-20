window.ride_subway_richTownEntrance = function(player){
    startSubwayRide(player, "richTownEntrance");
};

window.ride_subway_townStreet = function(player){
    startSubwayRide(player, "townStreet");
};

function startSubwayRide(player, destination){
    player.inEvent = true;

    if (Math.random() < 0.6){
        startMolesterMiniGame(player, destination);
        return;
    }

    player.location = destination;
    player.inEvent = false;

    showSingleTextScene("당신은 지하철을 타고 목적지에 도착했다.", player);
}

//미니게임 내부 망치질 시작~
function startMolesterMiniGame(player, destination){
    player.subwayEvent = {
        destination,
        stage: 0,
        attention: 0,
        bonus: 0,
        climaxCount: 0,
        access: {
            bottom: false,
            underwear: false
        },
        stunned: 0,
    };

    showSubwayTurn(player);
}

function checkSubwayArousal(player){
    const s = player.subwayEvent;

    if (player.status.arousal >= 100){
        player.status.arousal = 0;
        s.climaxCount++;

        s.stunned = 2;
        flashScreenMulti(3, 100);

        if (s.climaxCount >= 5){
            return subwayFail(player);
        }

        return showSubwayText(
            player,
            "한번에 당신의 흥분이 해방되었다! 절정과 함께 당신의 눈앞이 점멸됐다.",
            () => {
                enemyMolesterBurst(player);
            }
        );
    }

    return false;
}

function showSubwayTurn(player){
    const s = player.subwayEvent;

    startScene([
        {
            type: "text",
            value:
                `당신의 뒤로 누군가의 살이 느껴진다. 고의적인 접근이다.<br><br>` +
                `단계: ${Math.min(s.stage + 1, 2)}<br>` +
                `주목도: ${s.attention}/100`
        },
        {
            type: "choice",
            choices: [
                { text: "저항한다", action: "subway_resist" },
                { text: "가만히 있는다", action: "subway_wait" }
            ]
        }
    ], player);
}

window.subway_resist = function(player){
    handleSubwayTurn(player, "resist");
};

window.subway_wait = function(player){
    handleSubwayTurn(player, "wait");
};

function showSubwayText(player, text, callback){
    startScene([
        { type: "text", value: text }
    ], player, {
        onEnd: () => {
            if (callback){
                callback();
            } else {
                showSubwayTurn(player);
            }
        }
    });
}

//플레이어 턴
function handleSubwayTurn(player, action){
    const s = player.subwayEvent;

    if (s.stunned > 0){
        return showSubwayText(
            player,
            "당신은 절정의 여파로 움직이지 못하고 있다...",
            () => {
                enemyMolesterAction(player);
            }
        );
    }

    if (action === "wait"){
        s.bonus += 0.1;

        return showSubwayText(player, "당신은 기회를 엿봤다.", () => {
        enemyMolesterAction(player);
        });
    }

    if (action === "resist"){
        let chance = 0.2;
        chance = clamp(chance, 0.1, 0.9);

        chance += getTotalStat(player, "dex") * 0.01;
        chance += getTotalStat(player, "charm") * 0.005;
        chance += s.bonus;

        s.bonus = 0;

        if (Math.random() < chance){
            const charm = getTotalStat(player, "charm");
            const attentionGain = 15 + Math.floor(charm / 5);
            
            s.attention = clamp(s.attention + attentionGain, 0, 100);

            if (s.attention >= 100){
                return subwaySuccess(player);
            }

            return showSubwayText(player, "주변 사람들의 주의도가 높아지는 게 느껴진다.", () => {
                enemyMolesterAction(player);
            });
        }

        return showSubwayText(player, "그는 당신의 저항을 손가락으로 틀어막았다. 주변 사람들은 당신이 무슨 상항에 처했는지 인지하지 못하고 있다.", () => {
            enemyMolesterAction(player);
        });
    }
}

function tryBlockAccess(player){
    const dex = getTotalStat(player, "dex");
    const chance = 0.25 + dex * 0.01;

    return Math.random() < clamp(chance, 0.1, 0.7);
}

const SUBWAY_SENSITIVITY_KEY = {
    a: "aSensitivity",
    c: "cSensitivity"
};

function getSubwaySensitivityMultiplier(player, type){
    const key = SUBWAY_SENSITIVITY_KEY[type];
    const value = player.sexualTraits?.[key] || 0;

    return 1 + value / 400;
}

function applySubwayArousalAttack(player, type, stage, sensitivityGain = 1){
    const base = AROUSAL_GAIN[type][stage];
    const multiplier = getSubwaySensitivityMultiplier(player, type);
    const amount = Math.floor(base * multiplier);

    changeArousal(player, amount);

    const key = SUBWAY_SENSITIVITY_KEY[type];
    changeSensitivity(player, key, sensitivityGain);

    return amount;
}


//치한 턴
const AROUSAL_GAIN = {
    a: [3, 10],
    c: [3, 10]
};

const ENEMY_PATTERN = {
    male: {
        a: 0.5,
        c: 0.1,
        next: 0.4
    },
    female: {
        a: 0.35,
        c: 0.35,
        next: 0.3
    }
};

function enemyMolesterAction(player){
    const accessResult = handleSubwayAccessTurn(player);

    if (accessResult){
    if (accessResult.continueAttack){
        return showSubwayText(player, accessResult.text, () => {
            enemyMolesterActionCore(player);
        });
    }
    return showSubwayText(player, accessResult.text);
    }
    return enemyMolesterActionCore(player);
}

function enemyMolesterActionCore(player){
    const s = player.subwayEvent;

    if (s.stunned > 0){
    s.stunned--;

    return enemyMolesterBurst(player);
    }
    
    const stage = Math.min(s.stage, 1);

    const gender = player.gender === "male" ? "male" : "female";
    const pattern = ENEMY_PATTERN[gender];

    const roll = Math.random();

    // a 공격
    if (roll < pattern.a){

        applySubwayArousalAttack(player, "a", stage);

        if (checkSubwayArousal(player)) return;

        return showSubwayText(
            player,
            MOLESTER_TEXT[gender].a[stage]
        );
    }

    // c 공격
    if (roll < pattern.a + pattern.c){

        applySubwayArousalAttack(player, "c", stage);

        if (checkSubwayArousal(player)) return;

        return showSubwayText(
            player,
            MOLESTER_TEXT[gender].c[stage]
        );
    }

    // 단계 상승

    if (s.stage >= 1){
    applySubwayArousalAttack(player, "a", stage);
    if (checkSubwayArousal(player)) return;

    return showSubwayText(player, MOLESTER_TEXT[gender].a[stage]);
    }

    const nextTexts = MOLESTER_TEXT[gender].next;
    const text = nextTexts[Math.min(s.stage, nextTexts.length - 1)];

    s.stage++;

    return showSubwayText(player, text);
}

function hasEasyAccessBottom(player){
    const bottom = player.equipment?.bottom;
    return bottom?.tags?.includes("easyAccess");
}

function hasUnderwear(player){
    return !!player.equipment?.underwear;
}

function handleSubwayAccessTurn(player){
    const s = player.subwayEvent;

    // 1단계: bottom 진입
    if (s.stage === 0 && !s.access.bottom){
        s.access.bottom = true;

        if (!hasEasyAccessBottom(player)){
        if (tryBlockAccess(player)){
            return {
                text: "당신은 하의 안으로 들어오려는 그의 손을 감지했다. 당신의 그의 손을 쳐냈다!",
                continueAttack: false
            };
        } else {
            return {
                text : "당신은 하의 안으로 들어오려는 그의 손을 막으려고 했지만, 그의 손은 당신의 손보다 빠르게 당신의 하의 안으로 파고들었다.",
                continueAttack : true
            };
        }
        }

        s.access.bottom = true;

        return {
            text: "누군가의 손이 접근이 쉬운 당신의 하의로 바로 들어왔다.",
            continueAttack: true
        };
    }

    // 2단계: underwear 진입
    if (s.stage === 1 && !s.access.underwear){
        s.access.underwear = true;

        if (hasUnderwear(player)){
        if (tryBlockAccess(player)){
            return {
                text: "속옷 안으로 들어오려는 그의 손이 느껴진다. 당신은 그의 손을 쳐냈다!",
                continueAttack: false
            };
        } else {
            return {
                text : "당신은 저항했지만, 그의 손가락은 집요하게 당신의 속옷 안으로 파고들었다.",
                continueAttack : true
            }
        }
        }

         s.access.underwear = true;


        return {
            text: "속옷이 없다는 걸 알아차린 상대는 낮게 웃으며 더 대담하게 행동했다.",
            continueAttack: true
        };
    }

    return null;
}

function enemyMolesterBurst(player){
    const s = player.subwayEvent;
    const stage = Math.min(s.stage, 1);
    const gender = player.gender === "male" ? "male" : "female";

    let amount = 0;

    if (gender === "male"){
        applySubwayArousalAttack(player, "a", stage, 3);
    } else {
        applySubwayArousalAttack(player, "a", stage, 3);
        applySubwayArousalAttack(player, "c", stage, 3);
    }
    if (checkSubwayArousal(player)) return;
    return showSubwayText(
        player,
        pickRandom(MOLESTER_BURST_TEXT[gender])
    );
}

const MOLESTER_TEXT = {
    male : {
        a: [
            "그의 손은 당신의 엉덩이를 주물렀다. 그의 엄지가 당신의 엉덩이골 사이, 민감한 꼬리뼈 부근을 노골적으로 쓸어올렸다.",
            "그는 한손으로는 당신의 엉덩이를 주무르며, 한손으로는 당신의 엉덩이를 쑤셨다. 푹푹 쑤셔대는 손가락에 당신은 본능적으로 발뒤꿈치를 든 채 바들바들 떨었다. 당신의 몸이 그의 손가락의 움직임에 따라 위아래로 흔들린다."
        ],
        c: [
            "그의 손이 당신의 성기를 손톱으로 꾹 누르며 주물렀다. 당신의 성기 주변으로 그의 열기가 느껴진다.",
            "그의 손이 당신의 성기를 뿌리까지 거칠게 움켜쥐고 망설임없이 위아래로 흔들기 시작했다."
        ],
        next: [
            "그의 행동이 더 대담해졌다...!"
        ]
    },
    female : {
        a: [
            "그의 손이 당신의 엉덩이를 집요하게 주무르며 점점 더 은밀한 곳으로 향한다.",
            "맨엉덩이가 그의 허벅지에 닿아있다. 그는 당신의 애널에 손가락을 처박은 채 쑤컹쑤컹 격렬하게 위아래로 움직이기 시작했다. 당신의 다리가 떨려온다."
        ],
        c: [
            "그의 손이 당신의 클리를 위아래로 문질렀다. 두 허벅지 안쪽으로 점점 습기가 차기 시작한다.",
            "그의 손이 당신의 보지를 손가락으로 쑤셨다. 당신은 다리를 오므리지도 못한 채 그의 핑거링에 따라 움찔움찔거렸다. 습기가 그의 손가락과 당신의 보지에 붙어 끈적하게 늘어진다."
        ],
        next: [
            "그의 행동이 더 대담해졌다...!"
        ]
    }
};

const MOLESTER_BURST_TEXT = {
    male: [
        "그는 당신이 무너진 틈을 놓치지 않고 더욱 정성스럽게 당신의 엉덩이를 지분거렸다.",
        "당신이 움직이지 못하는 사이, 그는 당신의 엉덩이에 더 깊숙하게 손가락을 꽂아넣었다. 당신이 움찔거리자 그는 웃었다. <br>\"기분 좋지? 한 번 더 가게 해줄게.\"<br>그의 손가락은 멈추지 않는다."
    ],
    female: [
        "그는 무력해진 당신을 자신에게 기대게 한 후 두 손으로 당신의 앞구멍, 뒷구멍을 모두 농락했다.",
        "무력해진 당신을 상대로 그의 행동은 더 대담해졌다. 그는 당신을 자신의 몸에 기대게 한 뒤 두 손을 쑤컹쑤컹 각자 구멍 안에 집어넣었다. 당신은 뒤로도 앞으로도 가지 못한 채 애액만 흘렸다. 그가 변태라고 당신의 귀에 속삭였다."
    ]
};

//미니게임 결과
function subwaySuccess(player){
    const s = player.subwayEvent;

    startScene([
        {
            type: "text",
            value: "당신은 치한에게서 벗어나 안전하게 목적지에 도착할 수 있었다."
        }
    ], player, {
        onEnd: () => {
            player.location = s.destination;
            player.inEvent = false;

            renderMap(player);

            passTime(player, 3);
            localStorage.setItem("playerData", JSON.stringify(player));

            startScene(getLocationScene(player), player);
        }
    });
}

function getPlayerSensitivityTier(player){
    const a = player.sexualTraits?.aSensitivity || 0;
    const c = player.sexualTraits?.cSensitivity || 0;

    let baseValue;

    if (player.gender === "male"){
        baseValue = a;
    } else {
        baseValue = (a + c) / 2;
    }

    const rank = getSensitivityRank(baseValue);

    if (["E","D","C"].includes(rank)) return 1;
    if (["B","A"].includes(rank)) return 2;
    return 3; //s
}

function subwayFail(player){
    const s = player.subwayEvent;
    const tier = getPlayerSensitivityTier(player);
    const resultText = pickRandom(SUBWAY_FAIL_TEXT[tier]);

    applySubwayFailPenalty(player, tier);

    startScene([
        {
            type: "text",
            value: "치한은 당신을 안은 채로 계속 구멍을 쑤셔댔다. 당신은 더 이상 가고 싶지 않았지만 남자의 손가락에 속절없이 연속절정했다. 남자는 더 이상 저항할 기력도 없는 당신을 내려다보았다. 그는 당신을 손가락으로 위협하며 지하철에서 내렸고, 이미 저항할 기력이 없는 당신은 그의 손에 끌려갈 수밖에 없었다..."
        },
        {
            type: "text",
            value: resultText
        }
    ], player, {
        onEnd: () => {
            player.location = s.destination;
            player.inEvent = false;

            renderMap(player);

            passTime(player, 5);
            localStorage.setItem("playerData", JSON.stringify(player));

            startScene(getLocationScene(player), player);
        }
    });
}

const SUBWAY_FAIL_TEXT = {
    1: [
        "당신은 동물꼬리 바이브레이터와 동물귀를 하고 있다. 당신이 조금만 멋대로 움직이려고 해도 남자는 당신의 엉덩이를 내리치며 자신의 허락없이는 못 움직이게 훈육했다. 당신은 짐승같은 자세를 하고 엉덩이를 움찔움찔하며 남자의 명령에 따를 수밖에 없었다. 남자는 당신을 애완동물처럼 엉덩이를 흔들게 한 뒤 천천히 바이브레이터의 속도를 올려갔다. 올라가는 바이브레이터의 진동, 하지만 남자는 당신이 조금만 다른 행동을 하려고 해도 봐주지 않았다. 쾌감을 참는 당신의 구멍에서 애액이 뚝뚝 떨어지기 시작한다. 남자의 조교는 몇 시간이고 계속됐다...",
        "당신은 변기 위에서 남자에게 깊숙이 박혀있었다. 당신이 어떤 움직임을 보이든 남자의 성기가 당신의 구멍 안을 더 헤집게 하는 꼴밖에 안 되었다. 남자가 몸을 움직이자 당신은 변기 위에서 두 다리를 벌린 채 헐떡이며 같이 움직였다. 남자는 당신의 구멍이 자신의 성기에 맞춰질 때까지 계속 조교했다. 조교는 몇 시간이고 계속됐다..."
    ],
    2: [
        "당신은 동물꼬리 바이브레이터와 동물귀를 하고 있다. 너도 은근히 즐기고 있지? 너도 은근히 즐기고 있잖아. 남자는 당신을 매도하며 당신이 가장 느끼는 부위를 집중적으로 자극했다. 당신은 느끼지 않으려고 노력했지만, 예민한 당신의 몸이 이성은 배신하고 자지러졌다. 남자는 당신의 찐득한 구멍을 손가락으로 헤집으며 당신에게 칠칠맞은 애완동물이라고 말헀다. 남자는 당신에게 인간의 언어를 금지시켰다. 당신이 조금이라도 자신의 자존심을 찾으려고 하면 바로 매질이 날아들었다. 당신은 개처럼 배를 보인 채 누워 접힌 두 다리를 벌벌 떨었다. 남자의 조교는 몇 시간이고 계속됐다...",
        "쿵, 쿵, 쿵, 변기 위에서 당신은 엉덩이가 변기 안으로 빠지지도 않고 잘도 남자에게 붙어있었다. 남자는 당신이 자신에게 몸을 본능적으로 붙어올 때마다 역시 당신도 이런 걸 원하고 있었던 거라고 매도했다. 몇 번이고 남자의 성기를 받아들인 당신의 구멍은 이제 어떤 성기가 와도 받아들일 수 있다는 듯이 쭈압쭈압 뻐끔거리고 있었다. 끝나지 않는 추삽질 위로 당신의 애액쇼도 계속된다. 당신의 분수쇼에 젖은 남자의 성기는 시간이 지나면 지날수록 유연하게 당신의 구멍에 들어갔다 나왔다. 조교는 몇 시간이고 계속됐다..."
    ],
    3: [
        "동물꼬리 바이브레이터, 동물귀, 그걸로도 부족하다고 여겼는지 남자는 당신에게 딜도까지 박아버렸다. 당신은 네 발로 기며 '멍멍'이나 '꿀꿀' 소리를 내야만 했다. 남자의 농축된 정액을 개그릇에 받아먹으며 당신은 엉덩이를 움찔거렸다. 네 다리로 걷던 당신은 급격하게 올라간 바이브레이터의 진동에 새된 비명을 지르며 무너져내렸다. 남자는 앞으로도 당신의 야한 몸을 예뻐해주겠다고 속삭이며 당신의 위로 올라탔다. 마치 암컷개가 교배당하는 것처럼 당신은 참지 못하고 앙앙거리며 허리를 흔들었다. 쾌락 조교는 몇 시간이고 계속됐다...",
        "당신의 허벅지에는 이미 바를 정자들로 가득했다. 다리를 벌린 채 당신은 남자의 성기가 당신의 구멍을 자극할 때마다 앙앙 울어댔다. 소리를 안 내고 싶어도 너무 민감해진 당신의 몸은 이성을 배반했다. 앙앙거리는 당신의 모습을 사진으로 찍으며 남자는 너도 바라고 있었으니까 가만히 있었던 거 아니냐고 물었다. 남자의 매도에 당신의 눈동자에 눈물이 고였지만, 곧 그 눈물은 수치인지 쾌락인지 모를 정도로 붉은 기 속에서 뚝뚝 떨어졌다. 당신의 다리는 이제 오므리려는 시도도 하지 않는다. 쾌락 조교는 몇 시간이고 계속됐다..."
    ]
};

//결과 적용란
const SUBWAY_FAIL_PENALTY = {
    1: { hp: 5, stamina: 10, arousal: 10, sensitivity: 1 },
    2: { hp: 10, stamina: 20, arousal: 20, sensitivity: 2 },
    3: { hp: 20, stamina: 30, arousal: 30, sensitivity: 3 }
};

function applySubwayFailPenalty(player, tier){
    const p = SUBWAY_FAIL_PENALTY[tier];

    player.status.hp = Math.max(0, player.status.hp - p.hp);
    player.status.stamina = Math.max(0, player.status.stamina - p.stamina);

    changeArousal(player, p.arousal);
    passTime(player, 20);

    player.sexualTraits.aSensitivity += p.sensitivity;

    if (player.gender !== "male"){
        player.sexualTraits.cSensitivity += p.sensitivity;
    }

     player.status.trauma = Math.min(
        player.status.maxTrauma,
        player.status.trauma + 5
    );
}
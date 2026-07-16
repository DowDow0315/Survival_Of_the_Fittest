const GRAVEYARD_UPPER_TRIALS = [
    "math",
    "memoryArrow",
    "randomBox",
    "reaction",
    "enemy"
];

const GRAVEYARD_UNDERGROUND_ENEMIES = [
    "skeletonEnhanced",
    "skeletonBig",
    "skeletonWheel"
];

function getRandomGraveyardUndergroundEnemy(){
    return pickRandom(GRAVEYARD_UNDERGROUND_ENEMIES);
}

window.graveyard_enterUnderground = function(player){
    player.graveyardUnderground = {
        area: "upper",
        step: 0,
        maxStep: 15,
        cleared: false
    };

    savePlayer(player);

    startScene(buildGraveyardUndergroundUpperScene(player), player);
};

function buildGraveyardUndergroundUpperScene(player){
    const state = player.graveyardUnderground;

    return [
        {
            type: "text",
            value:
                "석관 아래의 계단을 내려가니 아무 것도 없는 통로가 보였다. 잘그닥잘그닥, 뼈가 부딪히는 소리를 제외하면 너무 고요하다..." +
                "<br><br>차갑고 눅눅한 공기 속에서, 벽면에 새겨진 글귀들이 희미하게 빛났다." +
                "<br><br>끝이 보이지 않는 통로가 이어진다."
        },
        {
            type: "choice",
            choices: [
                { text: "앞으로 나아간다", action: "graveyard_upper_nextTrial" },
                { text: "다시 올라간다", action: "graveyard_returnEntrance" },
                { text : "잠깐 쉰다", action : "graveYard_rest"}
            ]
        }
    ];
}

window.graveYard_rest = function(player){
    if (!player.graveyardUnderground){
        graveyard_enterUnderground(player);
        return;
    }

    startScene([
        {
            type: "text",
            value:
                "당신은 차가운 벽에 기대어 잠시 숨을 골랐다." +
                "<br><br>편히 쉴 만한 장소는 아니었지만, 지친 몸을 추스르기에는 충분했다."
        },
        {
            type: "effect",
            run: (player) => {
                player.stamina = Math.min(
                    player.maxStamina ?? 100,
                    player.stamina + 20
                );

                player.hp = Math.min(
                    player.maxHp ?? 100,
                    player.hp + 50
                );

                passTime(player, 10);

                savePlayer(player);
            }
        }
    ], player, {
        onEnd: () => {
            startScene(
                buildGraveyardUndergroundUpperScene(player),
                player
            );
        }
    });
};

window.graveyard_upper_nextTrial = function(player){
    const state = player.graveyardUnderground;

    if (state.step >= state.maxStep){
        state.cleared = true;
        savePlayer(player);
        startScene(buildGraveyardUpperClearScene(player), player);
        return;
    }

    let trial;

    do {
        trial = pickRandom(GRAVEYARD_UPPER_TRIALS);
    } while (
        GRAVEYARD_UPPER_TRIALS.length > 1 &&
        trial === state.lastTrial
    );

    state.lastTrial = trial;
    savePlayer(player);

    if (trial === "math") return startGraveyardMathTrial(player);
    if (trial === "memoryArrow") return startGraveyardMemoryArrowTrial(player);
    if (trial === "randomBox") return startGraveyardRandomBoxTrial(player);
    if (trial === "reaction") return startGraveyardReactionTrial(player);
    if (trial === "enemy") return startGraveyardEnemyTrial(player);
};

//시험
function startGraveyardMathTrial(player){
    startMathMinigame(player, {
        timeLimit: 3500,
        min: 10,
        max: 99,
        multiplyMin: 1,
        multiplyMax: 13,
        operators: ["+", "-", "*"],
        title: "죽음은 기다려주지 않는다.",
        hintText: "숫자 입력 후 엔터",
        onClear: graveyardUpperTrialSuccess,
        onGameOver: graveyardUpperTrialFail
    });
}

function startGraveyardMemoryArrowTrial(player){
    startArrowMinigame(player, {
        target: 1,
        sequenceLength: 6,
        timeLimit: 4500,
        hideAfter: 1100,
        title: "죽은 자는 길을 잃었다",
        successText: "누군가는 오늘도 죽었지만, 당신은 오늘도 살아남았다",
        failText: "누군가는 당신의 죽음을 바라고 있을지도 모른다.",
        endOnFail: true,
        onClear: graveyardUpperTrialSuccess,
        onGameOver: graveyardUpperTrialFail
    });
}

function startGraveyardEnemyTrial(player){
    showSingleTextScene(
        "잘그닥, 잘그닥.<br><br>어둠 속에서 뼈가 맞부딪히는 소리가 가까워졌다.<br><br><span class='log-danger'>강한 자만이 살아남을 수 있다.</span>",
        player,
        {
            onEnd: () => {
                startBattle(getRandomGraveyardUndergroundEnemy(), player, {
                    onWin: () => graveyardUpperTrialSuccess(player),
                    onEscape: () => startScene(buildGraveyardUndergroundUpperScene(player), player)
                });
            }
        }
    );
}

const GRAVEYARD_RANDOM_BOX_ITEMS = [
    "skull",
    "rustyRing",
    "wheat",
    "rice",
    "mushroom",
    "tornClothes",
    "goldRing",
    "smallJewelry"
];

function startGraveyardRandomBoxTrial(player){
    const luckyBox = randomInt(1, 3);

    startScene([
        {
            type: "text",
            value:
                "통로 한가운데에 낡은 상자 세 개가 놓여 있었다." +
                "<br><br>" +
                "벽면의 글자가 희미하게 빛났다." +
                "<br><br>" +
                "<span class='log-danger'>살기 위해서는 때로는 운도 필요하다.</span>"
        },
        {
            type: "choice",
            choices: [
                { text: "왼쪽 상자를 연다", action: `graveyard_randomBox_${luckyBox === 1 ? "lucky" : "enemy"}` },
                { text: "가운데 상자를 연다", action: `graveyard_randomBox_${luckyBox === 2 ? "lucky" : "enemy"}` },
                { text: "오른쪽 상자를 연다", action: `graveyard_randomBox_${luckyBox === 3 ? "lucky" : "enemy"}` }
            ]
        }
    ], player);
}

window.graveyard_randomBox_lucky = function(player){
    const rewards = [];

    for (let i = 0; i < 3; i++){
        const key = pickRandom(GRAVEYARD_RANDOM_BOX_ITEMS);
        const item = findItemByKey(key);

        if (item){
            addItem(player, item);
            rewards.push(item.name);
        }
    }

    renderInventoryModal(player);

    showSingleTextScene(
        "상자 안에는 아직 쓸 만한 물건들이 들어 있었다." +
        "<br><br>" +
        rewards.map(name => `획득: ${name}`).join("<br>"),
        player,
        {
            onEnd: () => graveyardUpperTrialSuccess(player)
        }
    );
};

window.graveyard_randomBox_enemy = function(player){
    showSingleTextScene(
        "상자를 여는 순간, 안쪽에서 마른 손뼈가 튀어나왔다." +
        "<br><br>" +
        "<span class='log-danger'>당신의 운은 어떨까</span>",
        player,
        {
            onEnd: () => {
                startBattle(getRandomGraveyardUndergroundEnemy(), player, {
                    onWin: () => graveyardUpperTrialSuccess(player),
                    onEscape: () => startScene(buildGraveyardUndergroundUpperScene(player), player)
                });
            }
        }
    );
};

function startGraveyardReactionTrial(player){
    startArrowMinigame(player, {
        target: 1,
        sequenceLength: 1,
        timeLimit: 700,
        hideAfter: null,
        title: "망설임은 죽음을 부른다.",
        successText: "당신은 망설이지 않았다.",
        failText: "당신은 죽음에 한 발자국 더 가까워졌다.",
        endOnFail: true,
        onClear: graveyardUpperTrialSuccess,
        onGameOver: graveyardUpperTrialFail
    });
}

//성공, 실패함수
function graveyardUpperTrialSuccess(player){
    player.graveyardUnderground.step++;
    savePlayer(player);

    showSingleTextScene(
        "앞을 막고 있던 어둠이 천천히 걷혔다.",
        player,
        {
            onEnd: () => startScene(buildGraveyardUndergroundUpperScene(player), player)
        }
    );
}

function graveyardUpperTrialFail(player){
    showSingleTextScene(
        "벽면의 글자가 검게 타들어갔다.<br><br>어둠 속에서 무언가가 기어 나왔다.",
        player,
        {
            onEnd: () => {
                startBattle(getRandomGraveyardUndergroundEnemy(), player, {
                    onWin: () => startScene(buildGraveyardUndergroundUpperScene(player), player),
                    onEscape: () => startScene(buildGraveyardUndergroundUpperScene(player), player)
                });
            }
        }
    );
}

//마지막 장면
function buildGraveyardUpperClearScene(player){
    if (
        isMatinGraveyardQuest02Active(player) &&
        !player.flags?.matin_graveyard_sheWasHere
    ){
        return buildMatinGraveyardQuest02FoundScene(player);
    }

    return [
        {
            type: "text",
            value:
                "끝없이 이어질 것 같던 통로의 어둠이 조금씩 옅어졌다." +
                "<br><br>" +
                "잘그닥거리던 뼈 소리도 어느 순간 들리지 않았다." +
                "<br><br>" +
                "앞쪽에는 아래로 이어지는 오래된 계단이 보였다." +
                "<br><br>" +
                "<span class='log-danger'>상층을 통과했다.</span>"
        },
        {
            type: "choice",
            choices: [
                { text: "아래로 내려간다", action: "graveyard_enterLowerUnderground" },
                { text: "공동묘지 입구로 돌아간다", action: "graveyard_returnEntrance" }
            ]
        }
    ];
}

window.graveyard_enterLowerUnderground = function(player){
    player.flags = player.flags || {};

    if (!player.flags.matin_graveyard_openBottom){
        showSingleTextScene(
            "당신은 계단을 내려갔다. 하지만 계단 앞에는 또 문이 하나 있었다. 하층인가? 하지만 아직은 갈 필요가 없다.",
            player,
            {
                onEnd: () => startScene(buildGraveyardUndergroundUpperScene(player), player)
            }
        );
        return;
    }

    enterDungeon(player, "graveYardBottom");
};


//마틴
function buildMatinGraveyardQuest02FoundScene(player){
    return [
        {
            type: "text",
            value:
                "긴 여정 끝에 당신은 드디어 아래로 내려가는 길을 보았다. 마틴이 말했던 상층에서 하층으로 이어지는 계단 통로인 거 같다. 당신은 계단 통로를 살펴보았지만 쪽지는 찾을 수 없었다." +
                "<br>그대로 돌아가야 하나 고민하고 있을 때 당신의 눈에 이질적인 천조각이 보였다. 옷에서 떨어져나온 천조각이 아니었다. 옷에 쓰는 천조각이라기에는 덜 부드러웠다." +
                "<br>마틴이 찾는 건 아닐 수도 있지만 당신은 이거라도 가져가기로 했다."
        },
        {
            type: "effect",
            run: (player) => {
                completeMatinGraveyardQuest02Investigation(player);
            }
        },
        {
            type: "choice",
            choices: [
                { text: "천조각을 챙긴다", action: "graveyard_afterMatinQuest02Found" }
            ]
        }
    ];
}

window.graveyard_afterMatinQuest02Found = function(player){
    startScene([
        {
            type: "text",
            value:
                "당신은 천조각을 줍고서도 놓친 게 혹시 있을까봐 한번 더 계단통로를 뒤져보았지만, 정말 아무 것도 찾을 수 없었다." +
                "<br>...마틴에게 보고하러 가자."
        },
        {
            type: "choice",
            choices: [
                { text: "아래로 내려간다", action: "graveyard_enterLowerUnderground" },
                { text: "공동묘지 입구로 돌아간다", action: "graveyard_returnEntrance" }
            ]
        }
    ], player);
};
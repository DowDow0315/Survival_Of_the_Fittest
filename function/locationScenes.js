const LOCATION_SCENE_BUILDERS = {
    shop: buildShopScene,
    barracks : buildBarracksScene,
    darkStreet : buildDarkStreetScene,
    lukeHouse: buildLukeHouseScene,
    shelter: buildShelterScene,
    tavern : buildTavernScene,
    forest : buildForestScene,
    deepForest : buildDeepForestScene,
    guardPost1: buildGuardPost1Scene,
    guardPost2: buildGuardPost2Scene,
    guardPost3: buildGuardPost3Scene,
    wastedRuin: buildWastedRuinScene,
    whiteFlowerTomb: buildWhiteFlowerTombScene,
    banditForest : buildBanditForestScene,
    graveyard : buildGraveyardScene,
    goblinCave : buildGoblinCaveScene,
    richTownEntrance : buildRichTownEntranceScene,
    royalForge : buildRoyalForgeScene,
    royalHospital : buildRoyalHospitalScene,
    royalHotel: buildRoyalHotelScene,
    arena : buildArenaScene,
    heavenPalace : buildHeavenPalaceScene,
    heavenValenRoom : buildHeavenValenRoomScene,
    theater : buildTheaterScene,
    gloryHole: getGloryHoleScene,
    forest_act3 : buildForest_act3Scene,
    deepForest_act3 : buildDeepForest_act3Scene
};

function getLocationScene(player){
    if (player.dungeon?.active && typeof buildDungeonScene === "function"){
        return buildDungeonScene(player);
    }

    if (player.flags?.pendingArousalRelease){
        return buildArousalReleaseScene(player, false);
    }

    const loc = LOCATIONS[player.location];
    const timeKey = getTimeKey(player);
    const randomDesc = pickRandom(loc.desc[timeKey]);

    if (player.location === "subway"){
        return getSubwayScene(player, loc, randomDesc);
    }

    const builder = LOCATION_SCENE_BUILDERS[player.location];

    if (builder){
        return builder(player, loc, randomDesc);
    }

    return buildDefaultLocationScene(player, loc, randomDesc);
}

function buildDefaultLocationScene(player, loc, randomDesc){
    return [
        {
            type: "text",
            value: `${randomDesc}<br><br>어디로 갈까?`
        },
        {
            type: "choice",
            choices: Object.keys(loc.connections).map(dest => ({
                text: `${LOCATIONS[dest].name}(으)로 이동한다.`,
                action: "move_" + dest
            }))
        }
    ];
}

function buildShopScene(player, loc, randomDesc){
    return [
        {
            type: "text",
            value: `${randomDesc}<br><br>무엇을 할까?`
        },
        {
            type: "choice",
            choices: [
                { text: "쇼핑", action: "open_soraShop" },
                { text: "소라와 대화", action: "sora_talk" },
                { text: "나가기", action: "move_townStreet" }
            ]
        }
    ];
}

function buildBarracksScene(player, loc, randomDesc){
    const choices = [];

    if (player.flags?.luke_talk_unlocked && isLukeTalkTime(player)){
        choices.push({ text: "루크와 대화", action: "luke_talk" });
    }

    const exitAction = player.flags?.act3CollapseDone
        ? "move_townEntrance_act3"
        : "move_townEntrance";

    choices.push(
        { text: "조사실로 들어가기", action: "move_inquisitRoom" },
        { text: "나가기", action: exitAction }
    );

    return [
        {
            type: "text",
            value: `${randomDesc}<br><br>무엇을 할까?`
        },
        {
            type: "choice",
            choices
        }
    ];
}

function isLukeTalkTime(player){
    const hour = Math.floor(player.time / 10) % 24;
    return hour >= 1 && hour < 3;
}

function buildDarkStreetScene(player, loc, randomDesc){
    const trainingCount =
        player.flags.darkStreet_hp_training_count || 0;

    const trainingPrice = getHpTrainingPrice(3000, trainingCount);

    const choices = [
        { text: `뒷골목 단련장에서 훈련한다 (-${trainingPrice.toLocaleString()}G / 최대 HP +5)`, action: "darkStreet_hpTraining" },
        { text: "하수도로 간다", action: "move_sewer" },
        { text: "공동묘지로 간다", action: "move_graveyard" }
    ];

    if (hasItemKey(player, "lukeHouseKey")){
        choices.push({
            text: "루크의 집에 간다",
            action: "move_lukeHouse"
        });
    }

    choices.push({ text: "길거리로 돌아간다", action: "move_townStreet" });

    return [
        {
            type: "text",
            value: `${randomDesc}<br><br>무엇을 할까?`
        },
        {
            type: "choice",
            choices
        }
    ];
}

window.darkStreet_hpTraining = function(player){
    
    const trainingCount = player.flags.darkStreet_hp_training_count || 0;    
    const price = getHpTrainingPrice(3000, trainingCount);

    if ((player.status?.stamina || 0) < 30){
        showSingleTextScene(
            "당신은 훈련을 시작하려 했지만 몸에 힘이 들어가지 않았다. 아무도 당신을 말리지는 않겠지만, 이 상태로 했다가는 돈만 버리는 꼴이 될 것이다.",
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
        return;
    }
    
    if (!spendGold(player, price)){
        showSingleTextScene(
            "단련장의 남자는 당신이 가진 돈을 확인하더니 코웃음을 쳤다.<br><br>\"돈도 없으면서 몸은 키우고 싶은가 보지?\"",
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
        return;
    }

    player.flags.darkStreet_hp_training_count = trainingCount + 1;
    
    increasePlayerMaxHp(player, 5);
    changeStamina(player, -30);
    passTime(player, 30);
    savePlayer(player);

    showSingleTextScene(
        "당신은 낡은 단련장에서 거칠게 몸을 단련했다. 제대로 된 장비도, 친절한 지도도 없었지만 몸은 분명 이전보다 단단해졌다." +
        "<br><br><b>최대 HP가 5 증가했다.</b>" +
        `<br>지금까지 받은 뒷골목 단련: ${trainingCount + 1}회`,
        player,
        {
            onEnd: () => startScene(getLocationScene(player), player)
        }
    );
};

function buildLukeHouseScene(player, loc, randomDesc){
    return [
        {
            type: "text",
            value: `${randomDesc}<br><br>무엇을 할까?`
        },
        {
            type: "choice",
            choices: [
                { text: "잔다", action: "sleep_lukeHouse" },
                { text: "쉰다", action: "rest_lukeHouse" },
                { text: "청소를 해준다", action: "clean_lukeHouse" },
                { text: "나간다", action: "move_darkStreet" }
            ]
        }
    ];
}

window.sleep_lukeHouse = function(player){
    player.status.hp = player.status.maxHp;
    player.status.stamina = player.status.maxStamina;

    passTime(player, 60);
    savePlayer(player);
    showSingleTextScene(
        "당신은 루크의 침대에 몸을 눕혔다. 익숙하지 않은 침대였지만 이상할 정도로 편안했다. 눈을 뜨자 몸의 피로가 말끔히 풀려 있었다.",
        player,
        {
            onEnd: () => startScene(getLocationScene(player), player)
        }
    );
};

window.rest_lukeHouse = function(player){
    changeHP(player, 50);
    changeStamina(player, 50);

    passTime(player, 30);
    savePlayer(player);
    showSingleTextScene(
        "당신은 루크의 방에서 잠시 쉬었다. 안심하고 쉴 수 있어서인지 당신의 피로는 금방 회복되었다.",
        player,
        {
            onEnd: () => startScene(getLocationScene(player), player)
        }
    );
};

window.clean_lukeHouse = function(player){
    passTime(player, 10);

    if (player.flags.lukeHouseCleanDay !== player.day){
        changeEmotion("luke", "affection", 1);
        player.flags.lukeHouseCleanDay = player.day;
    }
    changeEmotion("luke", "affection", 1);
    changeEmotion("luke", "rage", -1);
    changeTrauma(player, -1);
    savePlayer(player);

    showSingleTextScene(
        "당신은 한동안 루크의 집을 청소했다. 먼지를 털고 바닥을 닦자 집 안이 확실히 달라졌다! 괜히 뿌듯한 기분이 들었다.",
        player,
        {
            onEnd: () => startScene(getLocationScene(player), player)
        }
    );
};

function buildShelterScene(player, loc, randomDesc){
    const choices = [
        { text: "자기", action: "sleep" },
        { text: "잠깐 쉬기", action: "rest" },
        { text: "몸을 정비한다", action: "cleanseBodyFluid" },
        { text: "침착하게 정신을 다스린다", action: "calmDown" },
        { text: "유리와 대화", action: "yuri_talk" }
    ];

    if (player.flags?.sion_talk_unlocked) {
        choices.push({
            text: "시온과 대화",
            action: "sion_talk"
        });
    }

    choices.push({
        text: "나가기",
        action: "move_townStreet"
    });

    return [
        {
            type: "text",
            value: `${randomDesc}<br><br>무엇을 할까?`
        },
        {
            type: "choice",
            choices
        }
    ];
}

function buildTavernScene(player, loc, randomDesc){
    const choices = [
        { text: "퀘스트 게시판을 본다", action: "open_tavernQuests" },
        { text: "진행 중인 의뢰를 확인한다", action: "open_activeQuest" },
        { text: "주점 일을 돕는다.", action : "matin_work"},
        { text: "마틴에게 물건을 산다", action : "open_matinShop"},
        { text: "장비를 강화한다", action : "open_matinEnhance"},
    ];

    if (player.flags?.tavern_cooking_unlocked){
        choices.push({ text: "요리를 한다", action: "open_cookingMenu" });
    }

    choices.push(
        { text: "마틴과 대화한다", action: "matin_talk" },
        { text: "침착하게 정신을 다스린다", action: "calmDown" },
        { text: "나가기", action: "move_townStreet" }
    );

    return [
        {
            type: "text",
            value: `${randomDesc}<br><br>마틴이 카운터 너머에서 당신을 힐끗 본다.<br><br>무엇을 할까?`
        },
        {
            type: "choice",
            choices
        }
    ];
}

function buildForestScene(player, loc, randomDesc){
    return [
        {
            type: "text",
            value: `${randomDesc}<br><br>무엇을 할까?`
        },
        {
            type: "choice",
            choices: [
                { text: "서치", action: "search" },
                { text: "자기", action: "sleep" },
                { text : "잠깐 쉬기", action : "rest"},
                { text: "깊은곳으로 들어가기", action: "move_deepForest" },
                { text: "마을입구로 돌아가기", action: "escape_forest" }
            ]
        }
    ];
}

function buildDeepForestScene(player, loc, randomDesc){
    const isGoblinCleanup =
        player.quest?.active?.id === "goblin_cave_cleanup";

    const caveVisible = player.flags?.goblin_cave_visible &&
                        isGoblinCleanup;

    const canEnterStoryCave =
        player.flags?.story_goblin_cave_visible &&
        ["undercity_story_03", "undercity_story_04"].includes(player.quest?.active?.id) &&
        !player.flags?.undercity_story_04_done;

    const choices = [
        { text: "서치", action: "search" },
        { text: "자기", action: "sleep" },
        { text : "잠깐 쉬기", action : "rest"}
    ];

    if (caveVisible || canEnterStoryCave){
        choices.push({
            text: canEnterStoryCave
                ? "전에 찾았던 고블린 동굴로 간다"
                : "고블린 동굴로 간다",
            action: "move_goblinCave"
        });
    }

    if (player.flags?.undercity_story_05_unlocked){
        choices.push({
            text: "도적들이 도망친 숲길을 따라간다",
            action: "move_banditForest"
        });
    }

    choices.push({
        text: "숲에서 빠져나오기",
        action: "escape_deepForest"
    });

    return [
        {
            type: "text",
            value: `${randomDesc}<br><br>무엇을 할까?`
        },
        {
            type: "choice",
            choices
        }
    ];
}

function buildBanditForestScene(player, loc, randomDesc){

    if (player.banditCamp?.active){
        return [
            {
                type: "text",
                value: "당신은 아직 도적떼 진지 안에 있다."
            },
            {
                type: "choice",
                choices: [
                    { text: "계속 전진한다", action: "banditCamp_next" },
                    { text: "철수한다", action: "banditCamp_leave" }
                ]
            }
        ];
    }
    
    const choices = [
        { text: "주변을 수색한다", action: "search" },
        { text: "자기", action: "sleep" },
        { text : "잠깐 쉬기", action : "rest"}
    ];

    if (
        player.quest?.active?.id === "undercity_story_06" &&
        player.flags?.bandit_hideout_found
    ){
        choices.push({
            text: "도적떼 소굴로 간다",
            action : "move_banditHideout"
        });
    }

    if (
        player.quest?.active?.id === "bandit_cleanup"
    ){
        choices.push({
            text: "도적떼 진지를 습격한다",
            action : "start_banditCampRaid"
        });
    }
    
    choices.push({
        text: "경계병 제1초소로 향한다",
        action: "travel_banditForest_to_guardPost1"
    });

    choices.push({
        text: "깊은숲으로 돌아간다",
        action: "move_deepForest"
    });

    return [
        {
            type: "text",
            value: `${randomDesc}<br><br>무엇을 할까?`
        },
        {
            type: "choice",
            choices
        }
    ];
}

window.start_banditCampRaid = function(player){
    startBanditCampRaid(player);
};

function buildGuardPost1Scene(player, loc, randomDesc){

    const choices = [];

    if (player.flags?.uppercity_hero_event_seen){
        choices.push({
            text:"경계병 제2초소로 향한다",
            action:"travel_guardPost1_to_guardPost2"
        });
    } else {
        choices.push({
            text:"더 안쪽으로 향한다",
            action: "blocked_guardPost1_inner"
        });
    }

    choices.push(
        {
            text:"끊어진 가도로 돌아간다",
            action:"travel_guardPost1_to_banditForest"
        },
        {
            text:"잠깐 쉬기",
            action:"rest"
        }
    );

    return [
        {
            type:"text",
            value:`${randomDesc}<br><br>무엇을 할까?`
        },
        {
            type:"choice",
            choices
        }
    ];
}

window.blocked_guardPost1_inner = function(player){
    startScene([
        {
            type:"text",
            value:
                "당신이 더 안쪽으로 들어가려고 하자 경비병 한 명이 당신의 앞을 막아섰다. 그는 단호하게 상류도시의 허가가 없으면 앞으로는 더 나아갈 수 없다고 말했다."+
                "<br><br>\"...그리고 들어가지 않는 게 좋아.\"<br><br>" +
                "그는 당신을 다시 돌려보냈다. 아직은 갈 수 없을 거 같다."
        }
    ], player, {
        onEnd: () => startScene(getLocationScene(player), player)
    });
};

function buildGuardPost2Scene(player, loc, randomDesc){
    const choices = [];

    if (
        player.flags?.uppercity_story_01_started &&
        !player.flags?.uppercity_story_01_done
    ){
        choices.push({
            text : "외곽 연구시설로 향한다",
            action : "move_whiteFlowerLab"
        });
    }

    if (
        player.quest?.active?.id === "whiteFlowerLab_cleanup"
    ){
        choices.push({
            text : "하얀꽃 연구소 지부로 향한다",
            action : "move_whiteFlowerLabRepeated"
        });
    }

    if (
        player.quest?.active?.id === "rebel_story_01" &&
        !player.flags?.rebel_story_01_done
    ){
        choices.push({
            text: "유리가 남긴 흔적을 따라간다",
            action: "move_slaverCampShelter"
        });
    }

    if (
        player.quest?.active?.id === "slaverCamp_cleanup" &&
        !player.slaverRaid?.active
    ){
        choices.push({
            text: "인신매매단의 흔적을 추적한다",
            action: "start_slaverRaid"
        });
    }

    choices.push(
        { text:"경계병 제3초소로 향한다", action:"travel_guardPost2_to_guardPost3" },
        { text:"경계병 제1초소로 돌아간다", action:"travel_guardPost2_to_guardPost1" },
        { text:"잠깐 쉬기", action:"rest" }
    );

    return [
        { type:"text", value:`${randomDesc}<br><br>무엇을 할까?` },
        {
            type:"choice",
            choices
        }
    ];
}

window.start_slaverRaid = function(player){
    startSlaverRaid(player);
};

function buildGuardPost3Scene(player, loc, randomDesc){
    const choices = [];

    if (
        player.quest?.active?.id === "uppercity_story_02" &&
        !player.flags?.uppercity_story_02_done
    ){
        choices.push({
            text: "마물의 흔적을 쫓는다",
            action: "start_erwinRaid"
        });
    }

    if (
        player.quest?.active?.id === "uppercity_story_03" &&
        !player.flags?.uppercity_story_03_done
    ){
        choices.push({
            text: "발렌이 말한 오래된 연구소를 찾아간다.",
            action: "move_whiteFlowerOldLab"
        });
    }

    choices.push(
        { text:"폐야로 향한다", action:"approach_wastedRuin" },
        { text:"하얀꽃무덤으로 향한다", action:"approach_whiteFlowerTomb" },
        { text:"경계병 제2초소로 돌아간다", action:"travel_guardPost3_to_guardPost2" },
        { text:"잠깐 쉬기", action:"rest" }
    );

    return [
        { type:"text", value:`${randomDesc}<br><br>무엇을 할까?` },
        {
            type:"choice",
            choices
        }
    ];
}

window.approach_wastedRuin = function(player){

    showSingleTextScene(
        "당신이 폐야 쪽으로 향하려 하자 경계병 한 명이 창으로 길을 막았다.<br><br>" +
        "\"발렌 님이 아직은 가는 길을 막아두라고 했다. 네가 왜 가고 싶어하는지는 이해가 안 가지만...\"<br><br>" +
        "그는 당신을 이해할 수 없다는 눈으로 쳐다보았다.",
        player
    );
};

window.approach_whiteFlowerTomb = function(player){

    showSingleTextScene(
        "당신이 하얀꽃 무덤 쪽으로 향하려 하자 경계병 한 명이 창으로 길을 막았다.<br><br>" +
        "\"발렌 님이 아직은 가는 길을 막아두라고 했다. 네가 왜 가고 싶어하는지는 이해가 안 가지만...\"<br><br>" +
        "그는 당신을 이해할 수 없다는 눈으로 쳐다보았다.",
        player
    );
};

window.start_erwinRaid = function(player){
    startErwinRaid(player);
};

function buildForest_act3Scene(player, loc, randomDesc){
    const choices = [];

    choices.push(
        { text:"주변을 수색한다", action:"search" },
        { text:"잠깐 쉬기", action:"rest" },
        { text:"뒤틀린 깊은숲으로 들어간다", action:"travel_forest_act3_to_deepForest_act3" },
        { text:"마을입구로 돌아간다", action:"travel_forest_act3_to_townEntrance_act3" }
    );

    return [
        { type:"text", value:`${randomDesc}<br><br>무엇을 할까?` },
        {
            type:"choice",
            choices
        }
    ];
}

function buildDeepForest_act3Scene(player, loc, randomDesc){
    const choices = [];

    choices.push(
        { text:"주변을 수색한다", action:"search" },
        { text:"잠깐 쉬기", action:"rest" },
        { text:"뒤틀린 숲으로 돌아간다", action:"travel_deepForest_act3_to_forest_act3" },
        { text:"폐야로 향한다", action:"travel_deepForest_act3_to_wastedRuin" },
        { text:"하얀꽃무덤으로 향한다", action:"travel_deepForest_act3_to_whiteFlowerTomb" }
    );

    return [
        { type:"text", value:`${randomDesc}<br><br>무엇을 할까?` },
        {
            type:"choice",
            choices
        }
    ];
}


function buildWastedRuinScene(player, loc, randomDesc){
    const choices = [];

    choices.push(
        { text:"주변을 수색한다", action:"search" },
        { text:"잠깐 쉬기", action:"rest" },
        { text:"뒤틀린 깊은숲으로 돌아간다", action:"travel_wastedRuin_to_deepForest_act3" }
    );

    return [
        { type:"text", value:`${randomDesc}<br><br>무엇을 할까?` },
        {
            type:"choice",
            choices
        }
    ];
}

function buildWhiteFlowerTombScene(player, loc, randomDesc){
    const choices = [];

    choices.push(
        { text:"주변을 수색한다", action:"search" },
        { text:"잠깐 쉬기", action:"rest" },
        { text:"뒤틀린 깊은숲으로 돌아간다", action:"travel_whiteFlowerTomb_to_deepForest_act3" }
    );

    return [
        { type:"text", value:`${randomDesc}<br><br>무엇을 할까?` },
        {
            type:"choice",
            choices
        }
    ];
}

const GRAVEYARD_ROUTE = ["left", "left", "right", "right", "left", "right", "left"];

function initGraveyardState(player){
    player.graveyard = player.graveyard || {
        step: 0,
        cleared: false
    };
}

function buildGraveyardScene(player, loc, randomDesc){
    initGraveyardState(player);

    if (player.graveyard.cleared){
        return buildGraveyardTreasureScene(player);
    }

    return [
        {
            type: "text",
            value:
                `${randomDesc}<br><br>` +
                `공동묘지 안쪽은 이상할 정도로 안개가 짙다.<br>` +
                `길은 왼쪽과 오른쪽으로 갈라져 있다.`
        },
        {
            type: "choice",
            choices: [
                { text: "왼쪽으로 나아간다", action: "graveyard_left" },
                { text: "오른쪽으로 나아간다", action: "graveyard_right" },
                { text: "주변을 수색한다", action: "search" },
                { text: "밖으로 나간다", action: "leave_graveyard" },
                { text : "잠깐 쉬기", action : "rest"}
            ]
        }
    ];
}

window.graveyard_left = function(player){
    advanceGraveyard(player, "left");
};

window.graveyard_right = function(player){
    advanceGraveyard(player, "right");
};

window.leave_graveyard = function(player){
    initGraveyardState(player);

    player.graveyard.step = 0;

    localStorage.setItem("playerData", JSON.stringify(player));

    moveTo(player, "darkStreet");
};

function advanceGraveyard(player, direction){
    initGraveyardState(player);

    changeStamina(player, -5);
    passTime(player, 8);

    const correct = GRAVEYARD_ROUTE[player.graveyard.step] === direction;

    if (correct){
        player.graveyard.step++;

        if (Math.random() < 0.5){
            localStorage.setItem("playerData", JSON.stringify(player));
            startBattle("skeleton", player, {
                onWin: () => startScene(getLocationScene(player), player),
                onEscape: () => startScene(getLocationScene(player), player),
                onLose: () => startScene(getLocationScene(player), player)
            });
            return;
        }

        if (player.graveyard.step >= GRAVEYARD_ROUTE.length){
            player.graveyard.cleared = true;
            localStorage.setItem("playerData", JSON.stringify(player));
            startScene(buildGraveyardTreasureScene(player), player);
            return;
        }

        localStorage.setItem("playerData", JSON.stringify(player));

        showSingleTextScene(
            "주변이 흐릿하긴 하지만 앞으로 나아가고 있는 거 같긴 하다.",
            player
        );
        return;
    }

    player.graveyard.step = 0;
    localStorage.setItem("playerData", JSON.stringify(player));

    showSingleTextScene(
        "뭔가 잘못 간 거 같다.",
        player
    );
}

function buildGraveyardTreasureScene(player){
    return [
        {
            type: "text",
            value:
                "안개가 걷히자 공동묘지의 가장 깊은 곳이 드러났다." +
                " 열리지 않는 석관 앞으로 보물상자 하나가 놓여있다."
        },
        {
            type: "choice",
            choices: [
                { text: "보물상자를 연다", action: "graveyard_openChest" },
                { text: "석관을 살펴본다", action: "graveyard_sarcophagus" },
                { text: "공동묘지 입구로 돌아간다", action: "graveyard_returnEntrance" }
            ]
        }
    ];
}

window.graveyard_openChest = function(player){
    if (player.flags?.matinLocketTaken){
        showSingleTextScene("상자는 이미 비어 있다.", player);
        return;
    }

    player.flags = player.flags || {};
    player.flags.matinLocketTaken = true;

    addItem(player, ITEMS.misc.matinLocket);
    renderInventoryModal(player);

    showSingleTextScene(
        "당신은 낡은 보물상자를 열었다. 안에는 하트 모양의 오래된 목걸이가 들어 있었다. 당신은 목걸이를 들었다. 하트 모양 로켓 안에는 사진 한장이 끼어져 있었다. 하지만 사진은 너무 빛이 바래서 얼굴은 고사하고 사진 속의 인물이 몇 명인지도 알아볼 수가 없었다. 당신은 다시 로켓을 닫았다. 로켓 뒷면에는 matin이라는 글씨가 삐뚤삐뚤하게 써있었다.",
        player
    );
}

function hasItemKey(player, key){
    return player.inventory?.some(item => item.key === key);
}

window.graveyard_sarcophagus = function(player){
    if (!hasItemKey(player, "graveYardKey")){
        showSingleTextScene(
            "석관은 단단히 닫혀 있다. 당신은 혹시나 싶어서 석관을 두드려보았지만 석관은 열리지 않았다.",
            player
        );
        return;
    }

    startScene([
        {
            type: "text",
            value:
                "당신은 석관의 열쇠를 어디에다 꽂아야 하는지 고민하다가 열쇠 구멍이 아닌 거 같은 구멍에 집어넣았다. 구멍 안에 열쇠를 꽂는 곳이 숨겨져 있었다. 당신은 그대로 열쇠를 돌렸다." +
                "<br>쿠구궁 하는 소리와 함께 석관이 열렸다. 석관 뚜껑이 열리자 밑에서부터 차갑고 눅눅한 바람이 올라왔다. 석관 아래에는 어둠 속으로 이어지는 좁은 계단이 숨겨져 있었다." +
                "<br><br>당신은 밑으로 걸어갔다."
        },
        {
            type: "choice",
            choices: [
                { text: "계단 아래로 내려간다", action: "graveyard_enterUnderground" },
                { text: "아직 들어가지 않는다", action: "graveyard_returnEntrance" }
            ]
        }
    ], player);
};

window.graveyard_returnEntrance = function(player){
    initGraveyardState(player);
    player.graveyard.step = 0;
    player.graveyard.cleared = false;

    localStorage.setItem("playerData", JSON.stringify(player));

    startScene(getLocationScene(player), player);
};

function buildGoblinCaveScene(player, loc, randomDesc){
    const choices = [
        { text: "동굴 안으로 들어간다.", action: "enter_goblinCave" }
    ];

    if (player.flags?.goblinCaveShortcut){
        choices.push({
            text: "전에 끌려갔던 샛길로 들어간다.",
            action: "enter_goblinCaveShortcut"
        });
    }

    choices.push({
        text: "깊은숲으로 돌아간다.",
        action: "move_deepForest"
    });

    return [
        {
            type: "text",
            value: "어두운 동굴 입구다. 어디선가 탁,탁,탁,탁 소리와 신음 소리가 들려온다."
        },
        {
            type: "choice",
            choices
        }
    ];
}

function getSubwayScene(player, loc, randomDesc){
    const from = player.lastSubwayFrom;

    const returnLocation =
        from === "richTownEntrance"
            ? "richTownEntrance"
            : "townStreet";

    const destination =
        from === "richTownEntrance"
            ? "townStreet"
            : "richTownEntrance";

    return [
        {
            type: "text",
            value: `${randomDesc}<br><br>무엇을 할까?`
        },
        {
            type: "choice",
            choices: [
                {
                    text: LOCATIONS[returnLocation].name + "로 돌아간다",
                    action: "move_" + returnLocation
                },
                {
                    text: "지하철에 탄다",
                    action: "ride_subway_" + destination
                }
            ]
        }
    ];
}

function buildRichTownEntranceScene(player, loc, randomDesc){
    return [
        {
            type: "text",
            value: `${randomDesc}<br><br>높은 성문 앞, 경비병들이 출입자를 통제하고 있다.<br><br>무엇을 할까?`
        },
        {
            type: "choice",
            choices: [
                { text: "경비병에게 간다", action: "approach_richGateGuard" },
                { text: "지하철로 향한다", action: "move_subway" }
            ]
        }
    ];
}

window.approach_richGateGuard = function(player){
    startScene([
        {
            type: "text",
            value: `경비병이 당신을 위아래로 훑어본다.<br>"출입 허가증은?"`
        },
        {
            type: "choice",
            choices: [
                { text: "뇌물을 건넨다", action: "bribe_richTownGate" },
                { text: "훈장을 보여준다", action: "show_medal" },
                { text: "서신을 건넨다", action: "show_letter" },
                { text: "돌아간다", action: "back_richGate" }
            ]
        }
    ], player);
};

window.bribe_richTownGate = function(player){
    const price = 50000;

    if (!spendGold(player, price)){
        showSingleTextScene(
            `돈이 없는 당신을 보며 경비병은 그럴 줄 알았다는 듯이 코웃음을 쳤다. 그는 당신의 어깨를 밀쳤다. 당신과 대화를 하는 것도 낭비라고 생각하는 모양이다.`,
            player
        );
        return;
    }

    startScene([
        {
            type: "text",
            value: `당신은 경비병에게 ${price}G를 건넸다.<br>경비병은 돈을 확인하더니 아무 말 없이 자리를 비켜주었다.`
        }
    ], player, {
        onEnd: () => {
            enterLocation(player, "richTownStreet", 3);
        }
    });
};

window.back_richGate = function(player){
    startScene(getLocationScene(player), player);
};

window.show_medal = function(player){
    if (!hasItem(player, "상류도시 훈장")){
        showSingleTextScene(
            `경비병은 당신을 노려보았다. <br>"너 따위가 상류도시 훈장을 가지고 있을 리가 없지."<br>그는 당신의 어꺠를 뒤로 밀쳤다.`,
            player
        );
        return;
    }

    startScene([
        {
            type: "text",
            value: `당신은 상류도시 훈장을 꺼내 보였다. 경비병은 당신에게 고개를 까닥이더니 자리를 비켜주었다.`
        }
    ], player, {
        onEnd: () => {
            enterLocation(player, "richTownStreet", 3);
        }
    });
};

window.show_letter = function(player){
    if (!hasItem(player, "데릭의 친필 서신")){
        showSingleTextScene(
            `경비병은 당신을 위아래로 훑어보았다. <br>"그 아름다운 외모로 지금까지 사람들을 잘도 속였나보군. 하지만 내 눈은 속일 수 없다."<br>그는 당신의 어깨를 밀쳐 당신을 뒤로 물러나게 했다.`,
            player
        );
        return;
    }

    startScene([
        {
            type: "text",
            value: `당신은 데릭의 서신을 건넸다. 경비병은 데릭의 서신을 확인하더니 고개를 까닥였다. 관문을 통과하는 당신의 뒷모습 뒤로 경비병의 집요한 시선이 달라붙었다.`
        }
    ], player, {
        onEnd: () => {
            enterLocation(player, "richTownStreet", 3);
        }
    });
};

function enterLocation(player, location, time = 0){
    player.location = location;

    if (time > 0) {
        passTime(player, time);
    }

    savePlayer(player);

    if (checkAllEvents(player)) {
        return;
    }

    startScene(getLocationScene(player), player);
}

function buildRoyalForgeScene(player, loc, randomDesc){
    return [
        {
            type: "text",
            value:
                `${randomDesc}<br><br>` +
                `줄리앙은 당신의 인기척을 느꼈지만 당신 쪽을 쳐다보지 않았다. 그는 자신의 보석을 박을 수 있는 상대에게만 관심이 있는 거 같다.` +
                `<br><br>무엇을 할까?`
        },
        {
            type: "choice",
            choices: [
                { text: "강화한다", action: "open_juliangEnhance" },
                { text: "보석으로 강화한다", action: "open_juliangSocket" },
                { text: "상점을 연다", action: "open_juliangShop" },
                { text: "돌아간다", action: "move_richTownStreet" }
            ]
        }
    ];
}

function buildRoyalHospitalScene(player, loc, randomDesc){
    if (player.status?.trauma >= 100){
        return buildForcedHospitalizationScene(player);
    }

    const traumaWarning =
        player.status?.trauma >= 80
            ? `<br><br>의사는 진료기록을 보더니 잠시 침묵했다.<br><br>"...당신은 치료보다 안정이 먼저 필요합니다."`
            : "";

    return [
        {
            type: "text",
            value:
                `${randomDesc}` +
                traumaWarning +
                `<br><br>무엇을 할까?`
        },
        {
            type: "choice",
            choices: [
                { text: "트라우마 치료를 받는다", action: "hospital_traumaCare" },
                { text: "민감도 수술을 받는다", action: "hospital_sensitivityMenu" },
                { text: "신체 개조 상담을 받는다", action: "hospital_bodyModifyMenu" },
                { text: "흉물 제거 수술을 받는다", action: "hospital_abominationRemoval" },
                { text: "나간다", action: "move_richTownStreet" }
            ]
        }
    ];
}

function buildRoyalHotelScene(player, loc, randomDesc){
    return [
        {
            type: "text",
            value: `${randomDesc}<br><br>무엇을 할까?`
        },
        {
            type: "choice",
            choices: [
                { text: "방을 잡고 잔다 (-1000G)", action: "sleep_royalHotel" },
                { text: "나간다", action: "move_richTownStreet" }
            ]
        }
    ];
}

window.sleep_royalHotel = function(player){
    const price = 1000;

    if (!spendGold(player, price)){
        showSingleTextScene(
            "데스크 직원은 당신을 위아래로 훑어보더니 정중하지만 차가운 목소리로 말했다.<br><br>\"죄송합니다. 금액이 부족하십니다.\"",
            player
        );
        return;
    }

    player.status.stamina = player.status.maxStamina;
    player.status.hp = player.status.maxHp;
    passTime(player, 80);

    savePlayer(player);

    showSingleTextScene(
        "당신은 천국의 쉼터에서 방을 잡고 푹 쉬었다. 깨끗한 침대와 조용한 방 덕분에 몸과 마음이 한결 가벼워졌다.",
        player,
        {
            onEnd: () => startScene(getLocationScene(player), player)
        }
    );
};

function buildArenaScene(player, loc, randomDesc){
    const trainingCount = player.flags.arena_hp_training_count || 0;
    const trainingPrice = getHpTrainingPrice(7500, trainingCount);
    
    return [
        {
            type: "text",
            value:
                `${randomDesc}` +
                `<br><br>무엇을 할까?`
        },
        {
            type: "choice",
            choices: [
                {
                    text:
                        `전문 체력 단련을 받는다 ` +
                        `(-${trainingPrice.toLocaleString()}G / 최대 HP +15)`,
                    action: "arena_hpTraining"
                },
                {
                    text: "아레나 경기에 참가한다",
                    action: "arena_startRun"
                },
                {
                    text: "나간다",
                    action: "move_richTownStreet"
                }
            ]
        }
    ];
}

window.arena_hpTraining = function(player){
    const trainingCount = player.flags.arena_hp_training_count || 0;

    const price = getHpTrainingPrice(7500, trainingCount);

    if ((player.status?.stamina || 0) < 40){
        showSingleTextScene(
            "당신은 전문 단련을 신청하려 했지만 몸에 힘이 남아 있지 않았다. 아레나 훈련 교관은 당신을 위아래로 내려다보더니 지금 상태로는 당신을 단련시킬 수 없다고 말했다.",
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
        return;
    }

    if (!spendGold(player, price)){
        showSingleTextScene(
            "접수원은 당신이 내민 돈을 확인하고는 정중하게 돌려주었다." +
            "<br><br>\"죄송하지만 금액이 부족합니다.\"",
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
        return;
    }

    player.flags.arena_hp_training_count = trainingCount + 1;
    
    increasePlayerMaxHp(player, 15);
    changeStamina(player, -40);
    passTime(player, 20);
    savePlayer(player);

    showSingleTextScene(
        "당신은 아레나의 전문 교관에게 체계적인 훈련을 받았다. 교관은 당신이 한계에 도달할 때마다 조금씩 더 강한 부하를 가했다. 모든 훈련이 끝났을 때는 손가락 하나 움직이기 힘들었지만, 당신의 육체는 이전보다 훨씬 강인해져 있었다." +
        "<br><br><b>최대 HP가 15 증가했다.</b>" +
        `<br>지금까지 받은 아레나 단련: ${trainingCount + 1}회`,
        player,
        {
            onEnd: () => startScene(getLocationScene(player), player)
        }
    );
};

window.arena_startRun = function(player){
    player.flags ??= {};

    player.flags.arena_run_active = true;
    player.flags.arena_win_streak = 0;
    player.flags.arena_pending_reward = 0;

    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "당신은 아레나 참가 신청서에 이름을 적었다. 접수원은 당신에게 한 번 경기장에 들어가면 패배하거나 스스로 물러날 때까지 연전이 이어진다고 설명했다." +
                "<br><br>\"승리를 이어갈수록 상금도 커집니다. 하지만 물러나는 순간 연승 기록은 초기화됩니다.\"" +
                "<br><br><br><br><span class='log-warning'>아레나에서는 저장할 수 없습니다. 5번 이길 시 체력 70퍼센트가 회복됩니다.</span>"
        },
        {
            type: "choice",
            choices: [
                {
                    text: "경기장으로 들어간다",
                    action: "arena_nextBattle"
                },
                {
                    text: "경기에 참가하지 않는다",
                    action: "arena_cancelRun"
                }
            ]
        }
    ], player);
};

window.arena_cancelRun = function(player){
    resetArenaRun(player);
    startScene(getLocationScene(player), player);
};

function resetArenaRun(player){
    player.flags ??= {};

    player.flags.arena_run_active = false;
    player.flags.arena_win_streak = 0;
    player.flags.arena_pending_reward = 0;

    savePlayer(player);
}

const ARENA_ENEMIES = [
    "bandit1", "bandit2", "banditBoss",
    "rebels1", "rebels2", "rebels3",
    "trafficker1", "trafficker2", "trafficker3", "trafficker4",
    "whiteArmy1", "whiteArmy2"
];

function getRandomArenaEnemy(){
    return ARENA_ENEMIES[
        Math.floor(Math.random() * ARENA_ENEMIES.length)
    ];
}

window.arena_nextBattle = function(player){

    if (!player.flags.arena_run_active){
        showSingleTextScene(
            "현재 진행 중인 아레나 연전이 없다.",
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
        return;
    }

    const enemyId = getRandomArenaEnemy();

    startBattle(enemyId, player, {
        onWin: () => {
            handleArenaVictory(player);
        },

        onSkipDefeat: () => {
            handleArenaDefeat(player);
        }
    });
};

function getArenaRoundReward(streak){
    const reward = 500 * Math.pow(streak, 1.5);
    return Math.floor(reward / 100) * 100;
}

function handleArenaVictory(player){
    player.flags.arena_win_streak = (player.flags.arena_win_streak || 0) + 1;
    const streak = player.flags.arena_win_streak;
    const roundReward = getArenaRoundReward(streak);
    player.flags.arena_pending_reward = (player.flags.arena_pending_reward || 0) + roundReward;
    const totalReward = player.flags.arena_pending_reward;

    const recovered = streak % 5 === 0;
    
    if (recovered){
        player.status ??= {};
        
        const maxHp = player.maxHp || 100;
        const heal = Math.floor(maxHp * 0.7);
        
        player.status.hp = Math.min(
            maxHp,
            (player.status.hp || 0) + heal
        );
        
        player.status.stamina = 100;
    }
    
    passTime(player, 5);
    savePlayer(player);

    startScene([
        {
            type: "text",
            value: [
                "당신의 상대가 경기장 바닥에 쓰러졌다.",
                "<br><br>잠시 정적이 흐른 뒤, 관중석에서 거대한 함성이 터져 나왔다.",
                `<br><br><b>${streak}연승을 달성했다.</b>`,
                `<br>이번 경기 상금: ${roundReward.toLocaleString()}G`,
                `<br>현재 누적 상금: ${totalReward.toLocaleString()}G`,
                "<br><br>계속해서 다음 상대와 싸울까?"
            ]
        },
        {
            type: "choice",
            choices: [
                {
                    text: "다음 경기로 나아간다",
                    action: "arena_nextBattle"
                },
                {
                    text: `누적 상금 ${totalReward.toLocaleString()}G를 받고 나간다`,
                    action: "arena_cashOut"
                }
            ]
        }
    ], player);
}

window.arena_cashOut = function(player){
    player.flags ??= {};

    const streak =
        player.flags.arena_win_streak || 0;

    const reward =
        player.flags.arena_pending_reward || 0;

    if (reward > 0){
        addGold(player, reward);
    }

    resetArenaRun(player);

    showSingleTextScene(
        `당신은 더 이상의 경기를 포기하고 아레나에서 물러났다. 접수원은 당신에게 누적 상금 ${reward.toLocaleString()}G를 건넸다.` +
        `<br><br>${streak}연승 기록은 종료되었다.`,
        player,
        {
            onEnd: () => startScene(getLocationScene(player), player)
        }
    );
};

function handleArenaDefeat(player){
    player.flags ??= {};

    const lostStreak =
        player.flags.arena_win_streak || 0;

    const lostReward =
        player.flags.arena_pending_reward || 0;

    player.flags.arena_run_active = false;
    player.flags.arena_win_streak = 0;
    player.flags.arena_pending_reward = 0;

    savePlayer(player);

    startScene([
        {
            type: "text",
            value: [
                "당신은 결국 상대의 공격을 버티지 못하고 아레나 바닥에 쓰러졌다.",
                `<br><br>${lostStreak}연승 기록과 누적 상금 ${lostReward.toLocaleString()}G를 모두 잃었다.`,
                "<br><br>심판은 당신의 패배를 선언했지만, 흥분한 관중들은 쉽게 자리를 떠나지 않았다."
            ]
        },
        {
            type: "text",
            value: [
                "관중들은 패배한 당신에게 몰려들었다. 그들의 추잡한 손길이 당신에게 쏟아지는 것이 느껴진다... 하지만 당신은 그들의 욕정을 다 받아낼 때까지 움직일 수가 없었다."
            ]
        }
    ], player, {
        onEnd: () => {
            changeTrauma(player, 20);
            changeSensitivity(player, "mSensitivity", 30);
            changeSensitivity(player, "aSensitivity", 30);
            changeSensitivity(player, "cSensitivity", 30);
            changeSensitivity(player, "bSensitivity", 30);
            addBodyFluid(player, "m", 50);
            addBodyFluid(player, "c", 50);
            addBodyFluid(player, "a", 50);
            addBodyFluid(player, "b", 50);
            changeHP(player, 1);
            startScene(getLocationScene(player), player);
        }
    });
}

function buildTheaterScene(player, loc, randomDesc){
    const choices = [];

    choices.push({
        text: "공연을 본다 (-1000G)",
        action: "watch_theaterPerformance"
    });

    if (player.flags?.kainTalkUnlock){
        choices.push({
            text: "카인과 대화한다",
            action: "kain_talk"
        });
    }

    choices.push({
        text: "나간다",
        action: "move_gloryStreet"
    });

    return [
        {
            type: "text",
            value: `${randomDesc}<br><br>무엇을 할까?`
        },
        {
            type: "choice",
            choices
        }
    ];
}

window.watch_theaterPerformance = function(player){
    const price = 1000;

    if (!spendGold(player, price)){
        showSingleTextScene(
            "접수원이 당신을 내려다보았다. 그는 인상을 찌푸리며 마치 벌레를 쫓듯 당신에게 가라는 손짓을 했다. <br>\"돈도 없으면서 뭔.\"",
            player
        );
        return;
    }

    passTime(player, 30);
    changeStamina(player, 50);
    changeTrauma(player, -5);
    savePlayer(player);

    if (
        player.flags?.kainTalkUnlock &&
        Math.random() < 0.15
    ){
        startScene(
            getKainBackstageScene(player),
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
        return;
    }

    showSingleTextScene(
        "당신은 공연장에 앉아 한동안 무대를 바라보았다. 화려한 조명과 노랫소리 사이에 있자, 복잡했던 머릿속이 조금은 가라앉는 것 같았다.",
        player,
        {
            onEnd: () => startScene(getLocationScene(player), player)
        }
    );
};

function getKainBackstageScene(player){
    const affection = NPC_DATA["kain"].emotion.affection;
    const rage = NPC_DATA["kain"].emotion.rage;
    const dominance = NPC_DATA["kain"].emotion.dominance;

    if (rage > 60 && affection > 90){
        return pickRandom(
            NPC_DATA["kain"].scenes.kain_theaterRandom_RageAffection
        );
    }

    if (rage > 60 && dominance > 50 && affection > 50){
        return pickRandom(
            NPC_DATA["kain"].scenes.kain_theaterRandom_RageDominanceAffection
        );
    }

    if (rage > 60){
        return pickRandom(
            NPC_DATA["kain"].scenes.kain_theaterRandom_Rage
        );
    }

    if (affection >= 80){
        return pickRandom(
            NPC_DATA["kain"].scenes.kain_theaterRandom_AffectionHigh
        );
    }

    if (affection >= 50){
        return pickRandom(
            NPC_DATA["kain"].scenes.kain_theaterRandom_AffectionMid
        );
    }

    return pickRandom(
        NPC_DATA["kain"].scenes.kain_theaterRandom_AffectionLow
    );
}

function buildHeavenPalaceScene(player, loc, randomDesc){
    const choices = [];

    choices.push(
        { text:"발렌의 집무실로 향한다", action:"approach_heavenValenRoom" },
        { text:"천국으로 가는 길로 돌아간다", action:"move_heavenRoad" }
    );

    return [
        { type:"text", value:`${randomDesc}<br><br>무엇을 할까?` },
        {
            type:"choice",
            choices
        }
    ];
}

window.approach_heavenValenRoom = function(player){
    if (hasItem(player, "아카시아 꽃 훈장")){
        moveTo(player, "heavenValenRoom");
        return;
    }

    showSingleTextScene(
        "당신이 발렌의 집무실로 들어가려고 하자 앞에 서있던 백색 군인이 막았다. 그는 발렌의 허락 없이는 발렌의 집무실에 들어올 수 없다고 말했다.",
        player
    );
};

function buildHeavenValenRoomScene(player, loc, randomDesc){
    const choices = [
        { text: "자기", action: "sleep_valenRoom" },
        { text: "잠깐 쉬기", action: "rest_valenRoom" },
        { text: "침착하게 정신을 다스린다", action: "calmDown" },
        { text: "발렌과 대화", action: "valen_talk" },
        { text: "아카시아와 대화", action: "akasia_talk" }
    ];

    choices.push({
        text: "나가기",
        action: "move_heavenPalace"
    });

    return [
        {
            type: "text",
            value: `${randomDesc}<br><br>무엇을 할까?`
        },
        {
            type: "choice",
            choices
        }
    ];
}

window.sleep_valenRoom = function(player){
    player.status.hp = player.status.maxHp;
    player.status.stamina = player.status.maxStamina;

    passTime(player, 40);
    savePlayer(player);
    showSingleTextScene(
        "당신은 발렌의 집무실 안쪽에 있는 침대에 몸을 눕혔다. 침대는 너무 편했다. 당신은 금방 잠들어버렸다. 눈을 뜨자 몸의 피로가 말끔히 풀려 있었다.",
        player,
        {
            onEnd: () => startScene(getLocationScene(player), player)
        }
    );
};

window.rest_valenRoom = function(player){
    changeHP(player, 50);
    changeStamina(player, 50);
    passTime(player, 20);
    savePlayer(player);

    showSingleTextScene(
        "당신은 발렌의 집무실에서 잠시 쉬었다. 발렌과 아카시아의 허락 없이는 아무도 오지 않을 거라는 안도감 때문일까, 당신의 몸은 금방 가벼워졌다.",
        player,
        {
            onEnd: () => startScene(getLocationScene(player), player)
        }
    );
};

function getGloryHoleScene(player){
    return [
        {
            type: "text",
            value: [
                "문을 열자 눅눅한 공기와 함께 묘한 열기가 피부에 닿는다.",
                "안쪽에는 조용히 앉아있는 사람들과, 당신을 바라보는 시선들이 있다."
            ]
        },
        {
            type: "choice",
            choices: [
                { text: "니콜라이의 집무실로 간다", action: "gh_office" },
                { text: "1번 방에 들어간다", action: "gh_room1" },
                { text: "2번 방에 들어간다", action: "gh_room2" },
                { text: "나간다", action: "leave_gloryHole" }
            ]
        }
    ];
}

function initGloryHoleState(player){
    player.flags = player.flags || {};
    player.flags.ghWorkedMinutes = player.flags.ghWorkedMinutes || 0;
}

function runGloryHoleEvent(player, event){
    initGloryHoleState(player);

    startScene([
        {
            type: "text",
            value: event.text
        }
    ], player, {
        onEnd: () => {
            applyGloryHoleEffects(player, event);

            if (checkArousalRelease(player, () => {
                startScene(getGloryHoleScene(player), player);
            })) return;

            startScene(getGloryHoleScene(player), player);
        }
    });
}

function applyGloryHoleEffects(player, event){
    if (event.gold){
        addGold(player, getGloryHoleGoldReward(player, event.gold));
    }

    if (event.arousal) {
        changeArousal(player, event.arousal);
    }

    if (event.stamina) changeStamina(player, event.stamina);

    if (event.trauma) changeTrauma(player, event.trauma);

    if (event.sensitivity){
        Object.entries(event.sensitivity).forEach(([key, amount]) => {
            changeSensitivity(player, key, amount);
        });
    }

    if (event.fluid){
        Object.entries(event.fluid).forEach(([key, amount]) => {
            addBodyFluid(player, key, amount);
        });
    }

    if (event.minutes){
        player.flags.ghWorkedMinutes += event.minutes;
        passTime(player, event.minutes);
    }

    localStorage.setItem("playerData", JSON.stringify(player));
}

function getGloryHoleGoldReward(player, baseGold){
    const charm = getTotalStat(player, "charm");
    const multiplier = 1 + (charm * 0.025);
    return Math.floor(baseGold * multiplier);
}

function getGloryHoleDebt(player){
    const minutes = player.flags?.ghWorkedMinutes || 0;

    if (minutes <= 0) return 0;

    return Math.ceil(minutes / 60) * 100;
}

window.gh_room1 = function(player){
    if (!player.flags?.gloryHolePermission){
        showSingleTextScene(
            "당신은 아직 니콜라이에게 허락받지 못했다.",
            player
        );
        return;
    }

    const event = GH_ROOM1_EVENTS[
        Math.floor(Math.random() * GH_ROOM1_EVENTS.length)
    ];

    runGloryHoleEvent(player, event);
};

window.gh_room2 = function(player){
    if (!player.flags?.gloryHolePermission){
        showSingleTextScene(
            "당신은 아직 니콜라이에게 허락받지 못했다.",
            player
        );
        return;
    }
    const event = GH_ROOM2_EVENTS[
        Math.floor(Math.random() * GH_ROOM2_EVENTS.length)
    ];

    runGloryHoleEvent(player, event);
};

window.gh_office = function(player){
    player.flags = player.flags || {};

    //첫 방문
    if (!player.flags.gloryHolePermission){
        player.flags.gloryHolePermission = true;

        startScene(
            NPC_DATA["nikolai"].scenes.nikolai_gloryHoleWelcome,
            player,
            {
                onEnd: () => {
                    startScene(getLocationScene(player), player);
                }
            }
        );

        return;
    }

    //반복
    startScene([
        {
            type: "text",
            value: "니콜라이는 당신을 보자 눈을 접으며 웃었다.<br>\"어, 자기야 왔어? 무슨 일이야?\"<br>그의 앞에는 언제나 노트북이 있었다."
        },
        {
            type: "choice",
            choices: [
                ...(player.flags?.nikolai_talk_unlock
                ? [{ text: "니콜라이와 대화한다", action: "nikolai_talk" }]
                : []),
                { text: "돌아간다", action: "return_gh" }
            ]
        }
    ], player);
};

window.return_gh = function(player){
    startScene(getGloryHoleScene(player), player);
};

window.leave_gloryHole = function(player){
    initGloryHoleState(player);

    const debt = getGloryHoleDebt(player);

    if (debt <= 0){
        moveTo(player, "townStreet");
        return;
    }

    startScene([
        {
            type: "text",
            value:
                `당신이 나가려고 하자 언제 왔는지, 니콜라이는 문앞에 서있었다. 그는 분홍색 눈꼬리를 접으며 웃었다.<br>` +
                `"자기, 그냥 가려고?"<br>` +
                `그는 웃는 얼굴로 손을 내밀었다.<br>` +
                `오늘의 사용료는 ${debt}G야.`
        },
        {
            type: "choice",
            choices: [
                {
                    text: `돈을 낸다 (${debt}G)`,
                    action: "pay_gloryHole_debt"
                },
                {
                    text: "거절한다",
                    action: "refuse_gloryHole_payment"
                }
            ]
        }
    ], player);
};

window.pay_gloryHole_debt = function(player){
    const debt = getGloryHoleDebt(player);

    if (!spendGold(player, debt)){
        showSingleTextScene(
            "돈이 부족하다.",
            player
        );
        return;
    }

    player.flags.ghWorkedMinutes = 0;

    const affection = NPC_DATA["nikolai"].emotion.affection || 0;

    if (affection < 60){
        changeEmotion("nikolai", "affection", 3);
    }

    showSingleTextScene(
        "니콜라이는 만족스러운 표정으로 고개를 끄덕였다.<br>\"역시 자기야. 다음번에도 잘 부탁해?\"<br>그는 손을 팔랑거리며 당신에게서 멀어져갔다.",
        player,
        {
            onEnd: () => moveTo(player, "townStreet")
        }
    );
};

window.refuse_gloryHole_payment = function(player){
    changeEmotion("nikolai", "rage", 5);
    changeEmotion("nikolai", "affection", -5);
    startScene([
        {
            type: "text",
            value:
                `니콜라이의 미소가 옅어졌다. 그는 안타깝다는 듯 채찍을 들어보이며 고개를 기울였다.<br>` +
                `"자기... 나쁜 아이가 되려고 그러는 거야?"`
        }
    ], player, {
        onEnd: () => {
            startBattle("nikolai", player, {
                noEscape: true,

                onWin: () => {
                    player.flags.ghWorkedMinutes = 0;

                    showSingleTextScene(
                        "니콜라이는 당신을 노려보았지만 이내 당신을 못 잡을 거라는 걸 알고 그만두었다. 그래, 오늘만큼은.",
                        player,
                        {
                            onEnd: () => moveTo(player, "townStreet")
                        }
                    );
                },

                onLose: () => {
                    startNikolaiPunishmentRoom(player, {
                        source: "nikolai",
                        debt: getGloryHoleDebt(player)
                    });
                }
            });
        }
    });
};


const GH_ROOM1_EVENTS = [
    {
        text : [
            "당신은 멍하니 앞에 사람이 오기까지 기다렸다. 발자국 소리가 들린다. 당신이 고개를 들자 구멍 사이로 툭 튀어나온 남성기가 보였다.",
            "당신은 혀를 내밀어 남성기를 핥았다. 기둥 옆의 불알이 당신의 혀놀림에 따라 떨리는 게 느껴진다. 당신은 계속 핥다가 결국 그의 남성기를 입안에까지 집어넣었다",
            "처음에는 불쾌한 맛이 났지만, 당신의 입은 점점 적응해갔다. 벽 너머로 남자의 신음 소리가 들린다. 몇 번의 펠라 끝에 남자는 당신의 입안에 정액을 싸질렀다. 짤랑, 하는 소리와 함께 다른 구멍 사이로 동전이 떨어지는 것이 보였다."
        ],
        minutes: 30,
        gold: 150,
        arousal: 5,
        stamina: -10,
        trauma : 2,
        sensitivity : {
            mSensitivity : 2
        },
        fluid : {
            m : 5
        }
    },
    {
        text : [
            "당신은 멍하니 앞에 사람이 오기까지 기다렸다. 발자국 소리가 당신 앞에서 멈췄다. 남자는 제 성기를 앞으로 내밀면서 손으로 할 생각하지 말고 제대로 빨라고 으름장놓듯이 말했다.",
            "당신은 남자의 성기를 입에 물고 사탕을 빨듯이 혀를 돌렸다. 당신의 혀놀림에 남자는 만족스러운 신음 소리를 내며 벽에 퍽퍽 자신의 배를 쳐댔다. 벽으로 막혀있는데도 남성기가 자꾸만 당신의 입을 압박하는 느낌이 든다",
            "남자의 사정과 함께 당신의 뺨이 볼록해졌다. 미처 담아내지 못한 정액이 입술 옆가로 흘러내렸다. 짤랑하는 소리와 함꼐 옆으로 돈이 떨어졌다."
        ],
        minutes: 50,
        gold : 320,
        arousal: 15,
        stamina: -15,
        trauma : 2,
        sensitivity : {
            mSensitivity : 4
        },
        fluid : {
            m : 10
        }
    },
    {
        text: [
            "당신은 멍하니 앞에 사람이 오기까지 기다렸다. 발자국 소리가 당신 앞에서 멈췄다. 남자는 제 성기를 앞으로 내밀면서 손으로 할 생각하지 말고 제대로 빨라고 으름장놓듯이 말했다.",
            "당신은 남자의 성기를 입에 물고 사탕을 빨듯이 혀를 돌렸다. 그 순간 남자의 윽 소리와 함께 당신의 입에 뜨거운 것이 가득찼다. 당신은 놀라서 허공을 응시했다.",
            "남자도 민망했는지 서둘러 성기를 빼내더니 급하게 달아나버렸다. 허둥지둥거리는 발걸음 소리가 복도에 울렸다."
        ],
        minutes : 5,
        gold : 0,
        trauma : 1,
        fluid : {
            m : 5
        }
    }
]

const GH_ROOM2_EVENTS = [
    {
        text: [
            "낡은 침대 위에 앉아있던 당신은 문이 열리는 소리에 고개를 들었다. 남자는 시간이 없다는 듯이 외투를 벗어던지더니 그대로 당신을 억눌렀다. 배려 따위는 없었다. 당신은 억눌린 채로 그의 성욕을 받아내야만 했다.",
            "거친 키스로 제대로 숨도 쉬지 못하는 당신의 위로 남자의 손이 당신의 가슴을 쥐어짜듯이 잡았다. 본능적으로 튀어나온 당신의 헉 소리에도 남자는 신경쓰지 않는 듯했다. 구멍으로 거칠게 파고드는 남성기에 당신의 허리가 휘었다.",
            "남성기가 당신의 안을 쿵쿵 찧는 동안 당신의 허리는 침대에 닿지 않았다. 공중에 뜬 허리가 바들바들거리며 위아래로 움직인다. 당신의 시야도, 같이 위아래로 흔들린다. 남자는 당신을 같은 인격체로도 보고 있지 않았다.",
            "모든 것이 끝났을 때 당신의 뺨위로는 눈물자국이 그려져 있었다. 당신은 아픈 허리를 부여잡고 침대에서 일어났다. 남자가 남기고 간 돈이 당신의 부서진 인격으로 보였다."
        ],
        minutes : 120,
        gold : 600,
        arousal : 25,
        stamina : -40,
        trauma : 5,
        sensitivity : {
            mSensitivity: 6,
            cSensitivity: 8,
            aSensitivity: 8,
            bSensitivity: 6
        },
        fluid : {
            m : 10,
            c : 15,
            a : 15
        }
    },
    {
        text : [
            "낡은 침대 위에서 기다리고 있는 당신에게 남자가 걸어왔다. 그는 당신의 손을 부드럽게 잡더니 그대로 당신을 침대에 눕혔다. 남자의 눈에 사랑은 없었지만, 그래도 손길은 다정했다.",
            "남자는 당신의 입술을 제 입술로 부드럽게 누르면서 당신의 숨소리를 이끌어갔다. 남자가 이끄는 대로 당신의 손은 남자의 목 위에 둘러져있었다. 깊은 입맞춤 후 남자의 입술은 당신의 가슴골 사이로 흘러내렸다. 쪽쪽거리는 소리가 가슴 사이에서 울린다.",
            "가슴에 있던 남자의 입술이 다시 당신의 입술 위로 올라왔을 때 남자는 당신의 두 다리를 끌어올려 자신의 허리에 둘렀다. 남성기가 당신의 안으로 들어온다. 당신이 그 크기에 움찔거리자 남자는 괜찮다고 당신을 달래주며 당신의 목 위로 키스를 해주었다. 그 부드러움에 당신의 긴장이 조금씩 풀렸다.",
            "당신의 구멍에 침범한 남자의 성기는, 천천히 당신의 가장 깊숙한 곳까지 들어왔다. 다리가 그의 허리 위쪽으로 올라갈 수록 남자의 존재감은 더 커졌다. 남자는 당신에게 소리를 내라고 말하며 허리를 움직였다.",
            "한차례의 사정이 끝나고 당신이 눈을 떴을 떄 남자는 이미 없었다. 당신은 멍하니 남자가 두고 간 돈을 챙겼다."
        ],
        minutes : 150,
        gold : 720,
        arousal : 40,
        stamina : -20,
        trauma : 2,
        sensitivity : {
            mSensitivity: 10,
            cSensitivity: 10,
            aSensitivity: 10,
            bSensitivity: 10
        },
        fluid : {
            c : 5,
            a : 15
        }
    },
    {
        text : [
            "문이 쾅 열리고, 남자가 한 명 들어왔다. 그는 방에 들어오자마자 채찍으로 바닥을 내리치며 침대에 배를 대고 누우라고 명령했다. 침대에 바짝 엎드린 당신의 위로 채찍질이 수차례 떨어졌다. 당신이 조금만 움직이려고 해도 채찍은 당신의 등, 허벅지, 엉덩이 위로 내려쳐지며 가만히 있을 것을 종용했다.",
            "끊기지 않을 것만 같았던 짝 소리가 멎었을 때, 그는 채찍의 뭉툭한 부분으로 당신의 엉덩이 위를 문질렀다. 채찍선 모양으로 부어있는 당신의 엉덩이는 작은 터치에도 바들바들 떨렸다. 그는 만족스러운 신음을 흘린 후 당신의 몸을 다시 돌려눕혔다. 그가 다시 채찍을 든다. 끝난 줄 알았는데 끝나지 않았다. 이제 당신의 눈은 채찍이 내려오는 순간조차 피할 수 없었다.",
            "채찍은 당신의 가슴 위로 떨어졌다. 당신의 가슴은 시간이 지나면 지날수록 엉덩이와 똑같이 채찍선 모양으로 부어올랐다. 그는 거친 숨을 몰아내쉬면서도 희열이 가득한 미소를 지으며 당신의 붉은 가슴 위로 돈을 올려주었다."
        ],
        minutes : 80,
        gold : 560,
        arousal : 20,
        stamina : -50,
        trauma : 5,
        sensitivity : {
            aSensitivity: 10,
            bSensitivity: 10
        }
    },
    {
        text : [
            "낡은 침대 위에서 기디리고 있던 당신에게 남자가 한 명 다가왔다. 그는 급하게 당신을 억누른 채 전희도 없이 그대로 당신에게 삽입했다.",
            "몇 분이 지나지도 않아 남자는 당신의 안에 사정했다.... 자기도 그렇게 빨리 싸버릴 줄은 몰랐는지 남자의 얼굴이 붉어졌다. 그는 그대로 도망쳐 나가버렸다."
        ],
        minutes: 10,
        gold : 0,
        trauma: 3,
        fluid : {
            a : 5,
            c : 5
        }
    },
    {
        text : [
            "낡은 침대 위에서 기디리고 있던 당신에게 남자가 한 명 다가왔다. 그는 급하게 당신을 억누른 채 전희도 없이 그대로 당신에게 삽입했다.",
            "몇 분이 지나지도 않아 남자는 당신의 안에 사정했다.... 자기도 그렇게 빨리 싸버릴 줄은 몰랐는지 남자의 얼굴이 붉어졌다. 그는 그대로 도망쳐 나가버리려다가 이제야 생각난 듯 당신에게 돈을 던져주었다. 급히 나가는 남자의 뒤로 쾅 하는 소리가 난다."
        ],
        minutes: 10,
        gold : 100,
        trauma: 3,
        fluid : {
            a : 5,
            c : 5
        }
    }
]

//hp 단련 함수
function getHpTrainingPrice(basePrice, count){
    return Math.floor(basePrice * Math.pow(1.8, count));
}
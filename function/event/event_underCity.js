//에릭

//루크
window.EVENTS.push({
    id : "luke_guard_punishment_event",
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.bandit_luke_event_done &&
        NPC_DATA["luke"].emotion.affection > 50 &&
        !player.flags?.luke_guard_punishment_event_seen,

    action : (player) => {
        player.flags.luke_guard_punishment_event_seen = true;
        savePlayer(player);

        startScene(
            NPC_DATA["luke"].scenes.luke_guard_punishment_event,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id : "luke_missing_player_event",

    condition : (player) =>
        player.flags?.bandit_luke_event_done &&
        NPC_DATA["luke"].emotion.affection > 80 &&
        ["townEntrance", "townStreet", "darkStreet", "barracks"].includes(player.location) &&
        player.flags?.luke_missing_player_ready &&
        Math.random() < 0.8,

    action : (player) => {
        player.flags = player.flags || {};
        player.flags.luke_missing_player_event_seen = true;
        player.flags.luke_missing_player_ready = false;
        player.flags.luke_left_undercity_day = null;
        savePlayer(player);

        startScene(
            NPC_DATA["luke"].scenes.luke_missing_player_event,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

function updateLukeUndercityAbsence(player){
    player.flags = player.flags || {};

    const undercityLocations = ["townEntrance", "townStreet", "darkStreet", "barracks"];
    const isInUndercity = undercityLocations.includes(player.location);
    const today = getCurrentDay(player);

    // 이미 루크가 찾으러 올 준비가 됐으면 더 이상 건드리지 않음
    if (player.flags.luke_missing_player_ready) return;

    if (isInUndercity) {
        player.flags.luke_left_undercity_day = null;
        savePlayer(player);
        return;
    }

    if (player.flags.luke_left_undercity_day == null) {
        player.flags.luke_left_undercity_day = today;
        savePlayer(player);
        return;
    }

    if (today - player.flags.luke_left_undercity_day >= 20) {
        player.flags.luke_missing_player_ready = true;
        savePlayer(player);
    }
}

window.EVENTS.push({
    id : "luke_whiteFlowerLab_soldier_event",
    once : true,

    condition : (player) =>
        player.location === "barracks" &&
        player.flags?.whiteFlowerLab_lukeSoldier &&
        player.inventory.some(item => item.key === "lukeWFLSoldier") &&
        !player.flags?.luke_whiteFlowerLab_soldier_event_seen,

    action : (player) => {
        player.flags = player.flags || {};
        player.flags.luke_whiteFlowerLab_soldier_event_seen = true;
        removeItemByKey(player, "lukeWFLSoldier");
        savePlayer(player);

        startScene(
            NPC_DATA["luke"].scenes.luke_whiteFlowerLab_soldier_event,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id : "luke_talk_unlocked_event",
    once : true,

    condition : (player) =>
        player.location === "townEntrance" &&
        NPC_DATA["luke"].emotion.affection > 80 &&
        NPC_DATA["luke"].emotion.rage < 50 &&
        NPC_DATA["luke"].emotion.fear < 60 &&
        !player.flags?.luke_talk_unlocked,

    action : (player) => {
        player.flags.luke_talk_unlocked = true;
        addItem(player, ITEMS.accessary.lukeNecklace);
        savePlayer(player);

        startScene(
            NPC_DATA["luke"].scenes.luke_talk_unlocked_event,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id : "luke_patience_limit_event",

    condition : (player) =>
        player.justMoved &&
        (player.location === "townEntrance" ||
         player.location === "townStreet" ||
         player.location === "darkStreet") &&
        NPC_DATA["luke"].emotion.lust >= 100 &&
        Math.random() < 0.2,

    action : (player) => {
        savePlayer(player);

        startScene(
            NPC_DATA["luke"].scenes.luke_patience_limit_event,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

//소라
window.EVENTS.push({
    id : "sora_patience_limit_outside_event",

    condition : (player) =>
        player.justMoved &&
        player.location !== "shop" &&
        NPC_DATA["sora"].emotion.lust >= 100 &&
        Math.random() < 0.08,

    action : (player) => {
        startSoraPatienceLimitOutsideEvent(player);
    }
});

window.EVENTS.push({
    id : "sora_patience_limit_shop_event",

    condition : (player) =>
        player.justMoved &&
        player.location === "shop" &&
        NPC_DATA["sora"].emotion.lust >= 100 &&
        Math.random() < 0.3,

    action : (player) => {
        startSoraPatienceLimitShopEvent(player);
    }
});

window.EVENTS.push({
    id : "sora_missing_people_event01",

    condition : (player) =>
        player.justMoved &&
        player.location === "shop" &&
        player.flags?.undercity_story_06_done &&
        getCurrentDay(player) >= player.flags.undercity_story_06_done_day + 1 &&
        Math.random() < 0.1,

    action : (player) => {
        savePlayer(player);

        startScene(
            NPC_DATA["sora"].scenes.sora_missing_people_event_01,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id : "sora_missing_people_event02",

    condition : (player) =>
        player.justMoved &&
        player.location === "shop" &&
        player.flags?.undercity_story_06_done &&
        getCurrentDay(player) >= player.flags.undercity_story_06_done_day + 1 &&
        NPC_DATA["sora"].emotion.affection >= 50 &&
        NPC_DATA["luke"].emotion.affection >= 50 &&
        Math.random() < 0.05,

    action : (player) => {
        savePlayer(player);

        startScene(
            NPC_DATA["sora"].scenes.sora_missing_people_event_02,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id : "sora_flowerDate_01",
    once : true,

    condition : (player) =>
        player.justMoved &&
        player.location === "shop" &&
        NPC_DATA["sora"].emotion.affection >= 20 &&
        !player.flags?.sora_flowerDate_01_done &&
        Math.random() < 0.15,

    action : (player) => {
        player.flags.sora_flowerDate_01_done = true;
        savePlayer(player);

        startScene(
            NPC_DATA["sora"].scenes.sora_flowerDate_01,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id : "sora_flowerDate_02",

    condition : (player) =>
        player.justMoved &&
        player.location === "shop" &&
        NPC_DATA["sora"].emotion.affection >= 30 &&
        Math.random() < 0.07,

    action : (player) => {
        startScene(
            NPC_DATA["sora"].scenes.sora_flowerDate_02,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id : "sora_flowerDate_03",
    once : true,

    condition : (player) =>
        player.justMoved &&
        player.location === "shop" &&
        NPC_DATA["sora"].emotion.affection >= 50 &&
        (
            getTimePeriod(player) === "night" ||
            getTimePeriod(player) === "dawn"
        ) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene(
            NPC_DATA["sora"].scenes.sora_flowerDate_03,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

//소라 개인퀘스트
window.EVENTS.push({
    id : "sora_drug_02_unlock_event",
    once : true,

    condition : (player) =>
        player.justMoved &&
        player.location === "townEntrance" &&
        player.flags?.uppercity_story_01_started &&
        !player.flags?.sora_drug_02_start_seen,

    action : (player) => {
        player.flags.sora_drug_02_start_seen = true;
        savePlayer(player);

        startScene(
            NPC_DATA["sora"].scenes.sora_drug_02_event,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

//마틴
window.EVENTS.push({
    id : "matin_cooking_unlock_event",
    once : true,

    condition : (player) =>
        player.justMoved &&
        player.location === "tavern" &&
        NPC_DATA["matin"].emotion.affection > 10 &&
        !player.flags?.tavern_cooking_unlocked,

    action : (player) => {
        player.flags = player.flags || {};
        player.knownRecipes = player.knownRecipes || [];

        player.flags.tavern_cooking_unlocked = true;

        if (!player.knownRecipes.includes("fruitStirFry")){
            player.knownRecipes.push("fruitStirFry");
        }
        
        savePlayer(player);

        startScene(
            NPC_DATA["matin"].scenes.matin_cooking_unlock_event,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

//유리
window.EVENTS.push({
    id : "yuri_shelter_heal_event",

    condition : (player) =>
        player.justMoved &&
        player.location === "shelter" &&
        ["dawn", "night"].includes(getTimePeriod(player)) &&
        NPC_DATA["yuri"].emotion.affection > 60 &&
        NPC_DATA["yuri"].emotion.affection < 90 &&
        NPC_DATA["yuri"].emotion.rage < 80 &&
        player.status.hp < 50 &&
        Math.random() < 0.15,

    action : (player) => {
        savePlayer(player);

        startScene(
            NPC_DATA["yuri"].scenes.yuri_shelter_heal_event,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id : "yuri_shelter_heal_event_high_affection",

    condition : (player) =>
        player.justMoved &&
        player.location === "shelter" &&
        ["dawn", "night"].includes(getTimePeriod(player)) &&
        NPC_DATA["yuri"].emotion.affection >= 90 &&
        NPC_DATA["yuri"].emotion.rage < 80 &&
        player.status.hp < 50 &&
        Math.random() < 0.2,

    action : (player) => {
        startScene(NPC_DATA["yuri"].scenes.yuri_shelter_heal_event_high_affection, player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "yuri_shelter_comfort_event",

    condition : (player) =>
        player.justMoved &&
        player.location === "shelter" &&
        ["dawn", "night"].includes(getTimePeriod(player)) &&
        NPC_DATA["yuri"].emotion.affection > 60 &&
        NPC_DATA["yuri"].emotion.rage < 80 &&
        player.status.trauma > 60 &&
        player.status.hp >= 50 &&
        Math.random() < 0.15,

    action : (player) => {
        savePlayer(player);

        startScene(
            NPC_DATA["yuri"].scenes.yuri_shelter_comfort_event,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

//니콜라이

//창백
window.EVENTS.push({
    id : "pale_afterFlowerDateDream_01",
    once : true,

    condition : (player) =>
        player.flags?.sora_flowerDate_01_done &&
        player.location === "shelter" &&
        player.justMoved,

    action : (player) => {
        startScene(
            NPC_DATA["pale"].scenes.pale_afterFlowerDateDream_01,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

//스토리이벤트
window.EVENTS.push({
    id : "undercity_story_07_rebel_leader_head_event",
    once : true,

    condition : (player) =>
        player.justMoved &&
        player.location === "townStreet" &&
        player.flags?.undercity_story_07_done &&
        getCurrentDay(player) >= player.flags.undercity_story_07_done_day + 3 &&
        !player.flags?.undercity_story_07_rebel_leader_head_event_seen,

    action : (player) => {
        player.flags = player.flags || {};
        player.flags.undercity_story_07_rebel_leader_head_event_seen = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "길거리가 이상할 정도로 조용했다. 원래도 시끄러운 동네는 아니었지만 오늘은 더더욱, 분위기가 무겁게 가라앉아있었다. 당신은 사람들의 시선을 쫓아갔다. 그들의 시선을 따라가자 익숙한 얼굴이 있었다.",
                    "<br>광장 한복판에 일자로 똑바로 서있는 나무 기둥들, 그리고 그 나무 기둥들에는 여러 사람들의 목 잘린 얼굴들이 매달려 있었다. 가장 앞, 가장 가운데의 나무 기둥에는 당신도 아는 얼굴이 매달려 있었다. <br>당신이 전에 잡았던 반란군 수장의 얼굴이다.",
                    "<br>경비병들이나 마을 사람들이나 각기 다른 표정들을 짓고 있었다. 경비병들이 모여있는 자리에 있는 루크는 벌써 담배 한 개비를 다 태웠는지 담배 하나를 더 꺼내고 있었다. 반란군 수장의 머리가 매달려있는 나무 기둥 아래에는 에릭의 글씨가 크게 적혀 있었다.",
                    "<br><br><br><span style='color:red;'>반역자는 이렇게 된다.</span><br><br><br>",
                    "누구 하나, 어떤 소리도 내지 못했다. 반란의 '반' 자라도 입밖으로 꺼냈다가는 바로 목이 잘려 나무 기둥에 꽂힐 것만 같았다.",
                    "<br>그때, 군중 뒤쪽에서 여자의 비명소리가 들렸다."
                ]
            },
            {
                type : "text",
                value : [
                    "\"아니야!\"<br><br>",
                    "여자였다. 여자는 사람들을 밀치며 앞으로 나왔다. 그는 \"아니야\"라는 말을 몇 번이고 하며 나무 기둥 앞으로 비틀비틀 걸어나왔다. 반란군 수장의 얼굴 앞에 도착한 그는 털썩 주저앉았다. 그의 눈물이 뚝뚝 반란군 수장의 앞에서 떨어진다.",
                    "<br><br>\"제 아들이에요.\"<br><br>",
                    "그 말에 몇몇 사람들은 그 여자에게서 떨어져나갔고, 몇몇 사람들은 굳어서 움직이지 못했다. 여자의 입은 멈추지 않았다.",
                    "<br><br>\"제 아들이에요, 제 아들이라고요, 제 아들.... 왜 제 아들까지....\"<br><br>",
                    "여자는 높게 걸려있는 반란군 수장의 얼굴에 손을 뻗었다.",
                    "<br><br>\"왜... 왜... 누나를 찾겠다고 나간 귀로... 한번도 집에 들르지 않았으면서... 이렇게 돌아오면 난...\"<br><br>",
                    "여자의 절규가 광장에 퍼진다. 의미를 알 수 없는 울음 소리로 여자는 반란군 수장의 얼굴에 계속 손을 뻗었다.<br><br>",
                    "\"내려주세요, 제발 한번만, 한번만 내려주세요! 우리 아들, 한번만이라도 안을 수 있도록... 한번만...!<br>제 아들이에요, 제 아들이라고요, 반역자가 아니라 제 아들...!\"<br><br>"
                ]
            },
            {
                type : "text",
                value : [
                    "여자의 절규 사이로 군화 소리가 들린다. 에릭이다. 에릭은 무표정으로 제 아들을 내려달라고 애원하는 여자를 내려다보았다. 여자는 에릭을 보더니 에릭에게 기어가 그의 바짓가랑이를 잡으려 들었다. 하지만 에릭은 가차없이 자신에게 뻗어오는 여자의 손을 발로 찼다. 분명 아팠을 것이다. 하지만 여자는 고통 어린 신음 소리 하나 없이 에릭에게 다시 한번 손을 뻗었다.",
                    "<br><br>\"제발요, 한번만... 한번만 안아주게 해주세요...!\"<br><br>",
                    "\"반란군 수장을 옹호하겠다는 거군.\"<br><br>",
                    "에릭은 루크에게로 고개를 돌렸다. 아무 말 없이 담배를 피우고 있던 루크는 에릭과 시선이 마주치자 낮게 욕을 내뱉으며 걸어나왔다. 그는 여자를 끌고 가기 전에 잠깐, 기둥 위의 목과 무릎 꿇은 여자를 번갈아보았다. 하지만 그뿐이었다. 그는 그대로 여자를 가차없이 끌고 나갔다. 여자는 끌려가는 마지막까지 한번만 제 아들을 안아보게 해달라고 애원했다. 그는 자신은 이제 죽어도 상관이 없다고 했다. 이제 자신에게 남은 사람은 아무도 없다고 말했다.",
                    "<br><br>...그러니 한번만, 죽기 전에 아들이라도 안게 해달라고 말했다.",
                    "<br><br><br>\"루크.\"<br><br><br>",
                    "에릭은 루크의 발걸음이 한순간이라도 느려지는 걸 놓치지 않았다. 루크는 아무 대답도 하지 않았다. 그저 여자를 끌고 갈 뿐이다."
                ]
            },
            {
                type : "text",
                value : [
                    "여자의 목소리는 더 이상 들리지 않는다.",
                    "<br>에릭의 목소리만 들렸다.",
                    "<br><br>\"보았나.\"<br><br>",
                    "그저, 에릭의 목소리만....",
                    "<br><br><span class='log-eric'>\"저게 반역의 말로다.\"</span>"
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeTrauma(player, 5);
                    changeEmotion("eric", "affection", 1);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "undercity_story_07_rebel_leader_head_event_refuse",
    once : true,

    condition : (player) =>
        player.justMoved &&
        player.location === "townStreet" &&
        player.flags?.undercity_story_07_refused &&
        getCurrentDay(player) >= player.flags.undercity_story_07_refused_day + 5 &&
        !player.flags?.undercity_story_07_rebel_leader_head_event_refuse_seen,

    action : (player) => {
        player.flags = player.flags || {};
        player.flags.undercity_story_07_rebel_leader_head_event_refuse_seen = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "길거리가 이상할 정도로 조용했다. 원래도 시끄러운 동네는 아니었지만 오늘은 더더욱, 분위기가 무겁게 가라앉아있었다. 당신은 사람들의 시선을 쫓아갔다. 그들의 시선을 따라가자 여러 얼굴들이 보였다.",
                    "<br>광장 한복판에 일자로 똑바로 서있는 나무 기둥들, 그리고 그 나무 기둥들에는 여러 사람들의 목 잘린 얼굴들이 매달려 있었다. 가장 앞, 가장 가운데의 나무 기둥에 반란군 수장의 머리가 매달려 있는 거 같다.",
                    "<br>경비병들이나 마을 사람들이나 각기 다른 표정들을 짓고 있었다. 경비병들이 모여있는 자리에 있는 루크는 벌써 담배 한 개비를 다 태웠는지 담배 하나를 더 꺼내고 있었다. 반란군 수장의 머리가 매달려있는 나무 기둥 아래에는 에릭의 글씨가 크게 적혀 있었다.",
                    "<br><br><br><span style='color:red;'>반역자는 이렇게 된다.</span><br><br><br>",
                    "누구 하나, 어떤 소리도 내지 못했다. 반란의 '반' 자라도 입밖으로 꺼냈다가는 바로 목이 잘려 나무 기둥에 꽂힐 것만 같았다.",
                    "<br>그때, 군중 뒤쪽에서 여자의 비명소리가 들렸다."
                ]
            },
            {
                type : "text",
                value : [
                    "\"아니야!\"<br><br>",
                    "여자였다. 여자는 사람들을 밀치며 앞으로 나왔다. 그는 \"아니야\"라는 말을 몇 번이고 하며 나무 기둥 앞으로 비틀비틀 걸어나왔다. 반란군 수장의 얼굴 앞에 도착한 그는 털썩 주저앉았다. 그의 눈물이 뚝뚝 반란군 수장의 앞에서 떨어진다.",
                    "<br><br>\"제 아들이에요.\"<br><br>",
                    "그 말에 몇몇 사람들은 그 여자에게서 떨어져나갔고, 몇몇 사람들은 굳어서 움직이지 못했다. 여자의 입은 멈추지 않았다.",
                    "<br><br>\"제 아들이에요, 제 아들이라고요, 제 아들.... 왜 제 아들까지....\"<br><br>",
                    "여자는 높게 걸려있는 반란군 수장의 얼굴에 손을 뻗었다.",
                    "<br><br>\"왜... 왜... 누나를 찾겠다고 나간 귀로... 한번도 집에 들르지 않았으면서... 이렇게 돌아오면 난...\"<br><br>",
                    "여자의 절규가 광장에 퍼진다. 의미를 알 수 없는 울음 소리로 여자는 반란군 수장의 얼굴에 계속 손을 뻗었다.<br><br>",
                    "\"내려주세요, 제발 한번만, 한번만 내려주세요! 우리 아들, 한번만이라도 안을 수 있도록... 한번만...!<br>제 아들이에요, 제 아들이라고요, 반역자가 아니라 제 아들...!\"<br><br>"
                ]
            },
            {
                type : "text",
                value : [
                    "여자의 절규 사이로 군화 소리가 들린다. 에릭이다. 에릭은 무표정으로 제 아들을 내려달라고 애원하는 여자를 내려다보았다. 여자는 에릭을 보더니 에릭에게 기어가 그의 바짓가랑이를 잡으려 들었다. 하지만 에릭은 가차없이 자신에게 뻗어오는 여자의 손을 발로 찼다. 분명 아팠을 것이다. 하지만 여자는 고통 어린 신음 소리 하나 없이 에릭에게 다시 한번 손을 뻗었다.",
                    "<br><br>\"제발요, 한번만... 한번만 안아주게 해주세요...!\"<br><br>",
                    "\"반란군 수장을 옹호하겠다는 거군.\"<br><br>",
                    "에릭은 루크에게로 고개를 돌렸다. 아무 말 없이 담배를 피우고 있던 루크는 에릭과 시선이 마주치자 낮게 욕을 내뱉으며 걸어나왔다. 그는 여자를 끌고 가기 전에 잠깐, 기둥 위의 목과 무릎 꿇은 여자를 번갈아보았다. 하지만 그뿐이었다. 그는 그대로 여자를 가차없이 끌고 나갔다. 여자는 끌려가는 마지막까지 한번만 제 아들을 안아보게 해달라고 애원했다. 그는 자신은 이제 죽어도 상관이 없다고 했다. 이제 자신에게 남은 사람은 아무도 없다고 말했다.",
                    "<br><br>...그러니 한번만, 죽기 전에 아들이라도 안게 해달라고 말했다.",
                    "그 순간 뒤에서 누군가 당신의 귀를 막아주었다. 당신은 천천히 고개를 돌렸다. 유리였다. 주변의 소리가 먹먹하다. 그 사이에서 유리는 입모양으로 말했다.",
                    "<br><br>\"보, 지, 않, 아, 도, 돼... 가, 자.\"<br><br>"
                ]
            },
            {
                type : "text",
                value : [
                    "유리는 당신을 이끌고 광장에서 벗어났다. 어떤 소리도 들리지 않는, 광장에서 먼 구석으로 이동하고 나서야 유리는 당신의 귀에서 손을 떼주었다. 어쩐지 당신은 어렸을 때로 돌아간 기분이었다. 사람들의 악의에 가득찬 소리를 듣지 말라며 당신의 귀를 작은 손으로 막아주던 그날의 유리가, 당신은 떠올라버렸다.",
                    "<br>2년 동안 어디로 사라져있었든, 당신에게 유리는 그저 유리였다. 그는 당신에게 이제 괜찮다고 속삭였다. 당신은 그의 온기에 기댄 채 고개를 끄덕였다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeTrauma(player, 5);
                    changeEmotion("eric", "affection", -1);
                    changeEmotion("yuri", "affection", 2);
                    changeEmotion("yuri", "dominance", 5);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

//랜덤이벤트
window.EVENTS.push({
    id : "whiteflower_hallucination_event01",
    condition : (player) =>
        player.justMoved &&
        ["townEntrance", "townStreet", "darkStreet"].includes(player.location) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "바닥에 주저앉아있던 남자가 당신을 보더니 눈을 크게 떴다. 그는 비틀거리면서 당신에게 다가오더니 당신의 손목을 붙잡았다. 그의 눈동자는 초점없이 흔들리고 있었다.",
                    "<br><br>\"지금까지 어디에 있었니... 배고프지? 아빠가 저녁 해줄게...\"<br><br>",
                    "그는 당신의 손등을 부드럽게 쓰다듬었다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 그의 말에 맞춰주었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "그는 당신의 손등을 쓰다듬다가 자신의 품에서 빵을 내밀었다. 이곳저곳에 곰팡이가 피어있는 빵이다. 그는 그대로 그 빵을 당신의 입술에 문지르며 당신은 더 이상 굶으면 안 된다고 말했다.",
                                    "<br><br>\"굶어죽으면 안돼... 안돼...\"<br><br>",
                                    "멍하니 중얼거리던 남자는 곧 정신을 잃고 쓰러져버렸다. 당신은 당신의 손을 놓치고 쓰러진 남자를 내려다보았다.",
                                    "<br>...정신만을 잃은 게 아니다. 그는 목숨을 잃었다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 1);
                                    changeHP(player, -2);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 그에게 돈이 필요하다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 말에 그는 눈을 크게 뜨더니 자신의 주머니를 뒤지기 시작했다. 품속에 있었던 빵이 툭, 길바닥으로 떨어졌지만 남자는 신경쓰지 않았다. 그는 주머니를 뒤지더니 돈을 찾아 당신의 손에 쥐어주었다.",
                                    "<br>고작 5원. 남자는 당신에게 전재산을 바쳤다. 그는 자신이 돈을 금방 벌어오겠다고 말하며 당신의 손을 놓고 비틀비틀 다른 곳으로 걸어갔다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeGold(player, 5);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 그의 손을 뿌리쳤다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 손을 붙잡고 있던 남자의 손에는 이미 힘이 없었다. 그는 당신이 뿌리치는 대로 비틀거리더니 그대로 뒤로 넘어졌다. 그는 당신을 올려다보았다.",
                                    "<br><br>\"...너, 넌... 누구야.\"<br><br>",
                                    "이제야 당신이 자신의 자식이 아니라는 걸 깨달은 남자의 얼굴에 고통이 서렸다. 아아, 그래, 그 아이가 지금 살아있을 리가 없잖아....",
                                    "<div style='color:red; font-style:italic'><br><br>\"내가 먹었는데....\"<br><br></div>",
                                    "그리고 남자는 그대로 길바닥에 엎어졌다.",
                                    "<br>...죽은 거 같다."
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

window.EVENTS.push({
    id : "whiteflower_hallucination_event02",
    condition : (player) =>
        player.justMoved &&
        ["townEntrance", "townStreet", "darkStreet"].includes(player.location) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "거친 숨소리와 함께 뒤에서 여자가 당신의 손을 낚아챘다. 그는 당신의 이름이 아닌 다른 사람의 이름을 부르며 당신에게 하얀꽃님이 역시 자신에게 당신을 보낸 거냐고 중얼거렸다.",
                    "<br><br>\"하얀꽃님이 보내준 거지...? 나를 데리러 온 거지, 우리 아가...\"<br><br>",
                    "그는 자신의 풍만한 가슴을 당신의 입쪽으로 들이밀며 엄마는 언제든 당신에게 줄 모유가 준비되어 있다고 말했다. 모유, 모유는 하얀색.... 깔깔깔 여자는 웃음을 터뜨렸다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 여자의 가슴을 빨았다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "예상대로 여자의 가슴에서는 어떤 것도 나오지 않았다. 여자는 모유가 나오지 않자 당황하며 울기 시작했다.",
                                    "<br><br>\"나는.. 나는 네게 다 주려고 했는데... 아니야, 아니야...!\"<br><br>",
                                    "그는 당신의 주머니를 뒤지더니 당신의 손에 꼭 쥐어주었다. 마약이다. 그는 이것만 있으면 세상이 아름다워진다고 말했다.",
                                    "<br><br>\"내가 더 가져올 테니까.... 여기서 얌전히 기다리고 있어, 내 아가..\"<br><br>",
                                    "여자가 당신에게서 멀어진다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    addItem(player, ITEMS.misc.drug);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 여자에게 하얀꽃님에 대해 물었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"하얀꽃님은.... 모두의 위에 있지.... 그분의 감정.... 우리는 그 감정에 빠질 수밖에 없어.... 아아...\"<br><br>",
                                    "여자는 갑자기 파르르 떨더니 당신을 향해 손을 뻗었다.",
                                    "<br><br>\"이리와.... 이리와......\"<br><br>",
                                    "<br><br><strong><div style= 'text-align:center; color:#302ce9; font-size:4rem'>\"이리와\"</div></strong><br><br>",
                                    "그순간 경비병들이 여자에게 다가와 반란군이라고 하면서 그를 잡아갔다. 여자는 경비병들에게 끌려가면서도 당신에게 악귀처럼 손을 뻗었다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 3);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 여자의 손을 뿌리쳤다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신에게 뿌려쳐진 여자는 멍하니 당신을 바라보다가 당신은 자신의 아가가 아니라고 중얼거리듯이 말했다.",
                                    "<br>누구도 내 슬픔을 이해해주지 않아.... 아니야, 하얀꽃, 하얀꽃님만큼은....<br>",
                                    "그대로 다른 곳으로 걸어가려던 여자는 풀썩 쓰러졌다. 그는 미친듯이 손을 뻗어 제 주머니에 남아있던 마약 하나를 입에 물었다. 마약이 입에 들어간 후, 여자는 행복하다는 듯 미소를 지었다."
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

window.EVENTS.push({
    id : "children_funeral_event",

    condition : (player) =>
        player.justMoved &&
        player.location === "townStreet" &&
        Math.random() < 0.1,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "골목 한쪽에 아이들이 모여 있었다. 그들은 낡은 천 조각과 시든 꽃 몇 송이를 바닥에 내려놓고 있었다. 장례식이라고 부르기엔 너무 초라했지만, 아이들의 표정은 누구보다 진지했다.",
                    "<br><br>\"...다음에는 안 아픈 곳에서 태어나.\"",
                    "<br><br>누군가 작은 목소리로 말했다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신도 잠시 묵념했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신도 아이들의 옆에 서서 고개를 숙였다. 몇몇 아이들이 결국 울음을 터뜨렸다. 모두가 한 문장씩 죽은 아이에게 덕담을 던졌다. 다음에는 상류도시에서 태어나서 배터지게 먹으라고 말하는 아이도 있었다.",
                                    " 그렇게 몇 분, 아이들은 슬픔을 안고 흩어졌다. 남은 것은 곧 사라질 무덤뿐이었다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, -5);
                                    passTime(player, 5);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 조용히 지나쳤다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 그대로 애도의 자리를 지나쳤다. 뒤에서 작은 울음 소리가 들렸지만 곧 사라졌다. 이곳에서는 아이의 울음조차 길게 이어지는 걸 허락하지 않는다. 몇 명이 한 사람 죽은 걸로 지랄한다고 욕하는 것이 들린다.",
                                    "<br><br>...당신은 앞으로 나아갔다."
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

window.EVENTS.push({
    id : "shelter_money_event_02",

    condition : (player) =>
        player.justMoved &&
        player.location === "shelter" &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "쉘터 안쪽이 평소보다 소란스러웠다. 당신은 아이들이 모여있는 곳으로 시선을 돌렸다. 한 아이가 양손을 번쩍 들고 있었다.",
                    "<br><br>\"나 상류도시 가!\"<br><br>",
                    "그 말에 주변 아이들이 와아, 하고 소리를 질렀다. 정말이냐고, 거기는 밥도 매일 먹을 수 있냐고, 침대가 진짜 푹신하냐고, 아이들은 저마다의 상류도시를 떠올리며 떠들어댔다.",
                    "<br><br>\"돈 많이 벌어서 꼭 데리러 올게.\"<br><br>",
                    "아이는 두 주먹을 불끈 쥐더니 몇몇 아이들에게 자신이 모아놨던 돈을 조금씩 나눠주었다. 아이의 시선이 당신에게 멎었다. 아이는 당신에게로 달려오더니 당신의 손에 돈을 쥐어주었다.",
                    "<br><br>\"지금까지 고마웠어... 돈 많이 벌어서 돌아올게, 정말로.\"<br><br>",
                    "당신은 지금까지 그 약속을 하고 돌아오지 못한 사람들을 많이 봐왔다. 이 아이라고 다를까, 하는 생각이 들었지만 당신은 굳이 그 말을 입밖으로 꺼내지는 않았다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeTrauma(player, 1);
                    changeGold(player, 50);
                }
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "shelter_money_event_03",

    condition : (player) =>
        player.justMoved &&
        player.location === "shelter" &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "쉘터 안쪽이 평소보다 소란스러웠다. 당신은 아이들이 모여있는 곳으로 시선을 돌렸다. 한 아이가 양손을 번쩍 들고 있었다.",
                    "<br><br>\"나 상류도시 가!\"<br><br>",
                    "그 말에 주변 아이들이 와아, 하고 소리를 질렀다. 정말이냐고, 거기는 밥도 매일 먹을 수 있냐고, 침대가 진짜 푹신하냐고, 아이들은 저마다의 상류도시를 떠올리며 떠들어댔다.",
                    "<br>그 순간, 유리가 그들의 뒤에서 나타났다. 아이들의 목소리가 바로 잦아들었다. 상류도시에 간다고 펄쩍 뛰던 아이는 유리의 눈치를 살피더니 마치 죄인이라도 된 것마냥 고개를 숙였다. 그들은 모두 이유는 모르겠지만 유리가 상류도시를 싫어한다는 걸 알고 있었다. 유리는 죄인처럼 고개를 숙이고 있던 아이를 내려다보더니 손을 뻗어 아이의 머리를 쓰다듬었다.",
                    "<br><br>\"...정말 갈 거니?\"<br><br>",
                    "아이는 유리의 부드러운 목소리에 용기를 내어 고개를 들었다. 그는 주먹을 꽉 쥐더니 상류도시에 가서 꼭 다시 돌아오겠다고 말했다. 그는 유리에게 지금까지 보살펴줘서 고맙다고 돈을 내밀었지만 유리는 그 돈을 받지 않았다. 그는 다시 아이의 손을 밀며 고개를 저었다.",
                    "<br><br>\"돌아오면 그때 주겠니? 상류도시에 처음 가면 분명 그 돈이 필요할 거야.\"<br><br>",
                    "유리는 아이를 꼬옥 안아주었다.",
                    "<br><br>\"건강해야해, 알겠지?\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "shelter_money_event_04",

    condition : (player) =>
        player.justMoved &&
        player.location === "shelter" &&
        player.flags?.metNikolai &&
        Math.random() < 0.05,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "당신은 쉘터에 들어오자마자 니콜라이를 보았다. 몇몇 아이들은 입을 헤 벌리며 니콜라이를 바라보고 있었다. 쉘터에서 예쁘다고 소문이 자자했던 아이가 한 명 걸어나왔다. 평소의 옷차림과 다르게 그 아이의 옷은 화려했다. 니콜라이는 그 모습에 눈웃음을 지었다.",
                    "<br><br>\"자기, 역시 예상대로 예쁘네. 돈방석 위에 같이 앉아보자고.\"<br><br>",
                    "그는 눈을 찡긋거리며 아이에게 손을 내밀었고 아이는 망설이다가 니콜라이의 손을 잡으려고 했다. 하지만 그 순간, 아이의 손목을 붙잡은 사람이 있었다. 유리다. 그는 아이의 망설임을 읽고 단호하게 아이의 손목을 붙잡고 있었다.",
                    "<br><br>\"니콜라이. 내가 이런 식으로 쉘터의 아이들을 현혹하지 말라고 했을 텐데?\"<br><br>",
                    "\"바보가 되더니 시력도 잃었나봐? 이건 우리 보석들이 선택하는 거야. 그리고 자기는 그 선택을 막을 권리가 없지.\"<br><br>",
                    "\"...진심으로 그렇게 생각해?\"<br><br>",
                    "유리는 니콜라이에게서 시선을 뗀 후 화려한 옷을 입은 아이를 바라보며 말했다. 아이는 여전히 니콜라이와 유리를 번갈아보며 망설이는 것처럼 보였다. 유리의 표정이 더 단호해졌고, 니콜라이의 미소는 점점 희미해져갔다.",
                    "<br><br>\"난 언제나 진심이야. 너와는 다르게.\""
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 유리에게 이건 아이가 선택한 거라고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 말에 유리는 숨을 멈췄다. 그는 믿을 수 없다는 듯이 당신을 바라보다가 아이의 손목을 놓지는 않은 채 아이를 똑바로 바라보았다.",
                                    "<br><br>\"침착하게 잘 생각해보자. 정말로 네가 원하는 길이니?\"<br><br>",
                                    "니콜라이, 당신, 그리고 유리를 번갈아보던 아이는 결국 유리의 손을 뿌리쳤다. 아이는 유리를 바라보며 자신은 유리만큼 강하고 유능한 사람이 아니라고 말했다. \"나는 이 길밖에 없어...\", 울먹이는 아이의 말이 끝나기도 전에 니콜라이는 유리가 잡고 있었던 아이의 손목을 자기가 부드럽게 잡았다. 니콜라이의 미소가 짙어졌다.",
                                    "<br><br>\"그럼 자기, 자기는 스타가 될 거야.\"<br><br>",
                                    "그는 아이의 손을 잡고 쉘터를 떠나기 전, 당신에게 윙크를 하며 동전을 던졌다. 아이가 쉘터를 떠나간다. 유리는 아무 말도 하지 않았다. 그는 그저 멍하니 닫힌 문을 응시하고 있다가 다시 자신의 일로 돌아갔을 뿐이다.",
                                    "<br>당신은 니콜라이에게 받은 동전을 내려다보았다. 왜 이 동전이 찝찝하게 느껴지는지는 당신의 양심만이 알 수 있을 것이다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeEmotion("nikolai", "affection", 3);
                                    changeEmotion("yuri", "affection", -8);
                                    changeGold(player, 500);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 니콜라이에게 이건 아이의 선택이 아니라고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 말에 니콜라이의 미소가 더 희미해졌다. 유리는 당신의 말에 고개를 끄덕였다.",
                                    "<br><br>\"구석에 몰린 사람에게 선택지를 강요하는 건, 그 사람의 선택이 아니야.\"<br><br>",
                                    "유리는 다시 한번 아이의 손목을 잡고 아이와 시선을 마주하며 말했다. 그는 아이에게 글로리홀에 가면 그가 어떤 취급을 받을지는 그 자신도 잘 알고 있을 거라고 말했다. 니콜라이는 뾰로퉁한 얼굴로 유리와 아이를 번갈아보았다. 유리의 말을 듣던 아이는 고개를 주억거렸다. 그는 사실은 글로리홀에서 일하고 싶지 않다고 울먹이며 말했다.",
                                    "<br><br>\"힘든 거 알아. 하지만 우리는.... 아직까지는 선택할 수 있잖아. 하고 싶지 않은 선택은 다른 모든 걸 다 해본 뒤에 해도 늦지 않아.\"<br><br>",
                                    "\"흐응. 그래서 선택을 한 거니, 자기? 그래. 어려운 길을 선택하는 것도 네 선택이지, 뭐.\"<br><br>",
                                    "니콜라이는 그 화려한 옷은 나중에 자신에게 제대로 가져오라고 말했다. 하나의 흠도 없이. 유리는 아이에게 화려한 옷을 벗어놓기만 하면 자신이 니콜라이에게 가져다주겠다고 말했다. 니콜라이가 무서웠는지 아이는 바로 고개를 끄덕였다.",
                                    " 니콜라이는 미련없이 쉘터를 떠났다. 유리는 아이의 어깨를 두드려준 후 당신을 돌아보았다. 그는 당신에게 미소를 짓고 있었다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeEmotion("yuri", "affection", 3);
                                    changeEmotion("nikolai", "affection", -2);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 두 사람의 대화에 끼고 싶지 않다. 당신은 그대로 그들을 지나쳤다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 그들의 대치 상황에서 빠져나왔다. 유리와 니콜라이가 다투는 소리가 들리다가 몇 분이 지나자 다시 쉘터는 조용해졌다. <br>...그 아이가 어떤 선택을 했는지는 모르겠다."
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

window.EVENTS.push({
    id : "market_soup_lady_event",

    condition : (player) =>
        player.justMoved &&
        player.location === "townStreet" &&
        Math.random() < 0.1,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "길거리를 걷고 있는데 맛있는 냄새가 난다. 당신은 당신도 모르게 고개를 돌렸다. 수프를 만들고 있던 사람의 시선과 당신의 시선이 마주쳤다. 그는 잠시 고민하다가 한숨을 쉬며 당신을 손짓으로 불렀다",
                    "<br><br>\"쯧, 얼굴이 반쪽이네. 이리 와. 돈 안 받을 테니까 한 그릇 먹고 가.\""
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 수프를 받아먹었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "따뜻한 수프가 목을 타고 넘어갔다. 대체 무슨 재료로 만든 걸까 알 수 없지만 목을 타고 넘어가는 수프는 차가운 현실과 다르게 따듯하긴 했다. 그는 당신이 수프를 먹는 걸 응시하다가 미소지었다.",
                                    "<br><br>\"그래. 안 죽었으면 된 거지.\"<br><br>",
                                    "그는 당신에게 수프를 한 그릇 더 준 후 휘파람을 불며 자신의 일로 돌아갔다. 당신의 마음도 따듯해졌다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeHP(player, 10);
                                    changeStamina(player, 10);
                                    changeTrauma(player, -2);
                                    passTime(player, 3);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 괜찮다고 말하며 옆에 있던 아이에게나 나눠주라고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "그의 시선이 당신에게서 옆에 있던 아이에게로 넘어갔다. 아이는 수프 냄새에 침을 흘리며 꼬르륵거리는 배를 부여잡고 있었다. 수프 매대 주인은 한숨을 쉬었다. 그러더니 그는 아이에게 수프 한 그릇을 나눠주었다.",
                                    " 아이는 눈 깜짝할 사이에 수프 한 그릇을 비워버렸다. 아이의 먹는 속도에 놀랐는지 눈을 동그랗게 뜨고 있던 수프 매대 주인은 한숨을 쉬며 한 그릇을 더 퍼주었다.",
                                    "<br><br>\"누가 안 빼앗어먹으니까 천천히 먹어. 대체 얼마나 굶은 거냐.... 한 그릇 더 줄 테니까 천천히 먹어.\"<br><br>",
                                    "당신의 마음 한구석에 온기가 스며든다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, -5);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 아무도 믿지 않는다. 수프를 거절했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "그는 그대로 가버리는 당신을 잡지 않았다. 그는 오늘도 어제처럼, 그저 수프를 팔아서 생계를 유지할 뿐이다. 당신도 어제처럼, 오늘도 앞으로 걸어갔다."
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

window.EVENTS.push({
    id : "child_pickpocket_event",

    condition : (player) =>
        player.justMoved &&
        player.location === "darkStreet" &&
        Math.random() < 0.1,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "어두운 골목을 지나던 중, 작은 손이 당신의 주머니를 스쳤다. 당신이 고개를 돌리자, 마른 아이 하나가 움찔하며 뒤로 물러났다. 입술은 누군가한테 맞은 건지 아니면 영양실조인 건지 부루터져 있었고 다리는 바들바들 떨리고 있었다.",
                    "<br>아이의 손에는 당신의 돈이 들려있었다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "아이를 붙잡는다.",
                        stat : "dex",
                        difficulty : 8,
                        success : [
                            {
                                type : "text",
                                value : [
                                    "당신은 도망치려는 아이의 팔을 붙잡았고 아이는 살려달라고 말하면서 당신에게 돈을 다시 되돌려주었다.",
                                    "<br><br>\"때리지 말아주세요, 때리지 말아주세요... 배가 너무 고파서 그랬어요...\"<br><br>",
                                    "그러더니 아이는 당신이 주춤한 사이에 부리나케 도망쳐버렸다."
                                ]
                            }
                        ],
                        fail : [
                            {
                                type : "text",
                                value : [
                                    "아이는 당신의 손을 빠져나갔다. 당신의 예상보다 아이는 더 빨랐다. 당신의 주머니가 전보다 더 가벼워졌다...."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeGold(player, -500);
                                }
                            }
                        ]
                    },
                    {
                        text : "그냥 보내준다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 아이를 붙잡지 않았다. 아이는 당신이 자신을 붙잡지 않자 이상하다는 듯이 바라보다가 얼굴을 일그러뜨리더니 금방이라도 울 것만 같은 얼굴로 도망가버렸다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeGold(player, -500);
                                    changeTrauma(player, -3);
                                }
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

window.EVENTS.push({
    id : "shelter_rebel_event_01",
    condition : (player) =>
        player.justMoved &&
        player.location === "shelter" &&
        Math.random() < 0.1,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "쉘터 벽 한구석에 새로 적힌 낙서가 보인다.",
                    "<br><br><br><strong><div style='color:#4ce1f5; font-style:italic'>\"우리는 아직 죽지 않았다.\"</div></strong><br><br><br>"                  
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "낙서를 지운다.",
                        scene : [
                            {
                                type: "text",
                                value : [
                                    "당신은 낙서를 문질러 지웠다. 에릭이 쉘터에 왔다가 이 낙서를 봐버렸다는 상상만으로도 당신의 머리털은 쭈뼛 섰다. 누군가 당신을 뒤에서 바라보는 느낌이 들어서 당신은 낙서를 지우다 말고 고개를 돌렸다. 하지만 당신의 뒤에는 아무도 없었다."
                                ]
                            }
                        ]
                    },
                    {
                        text : "낙서를 그대로 둔다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 낙서에 손을 대지 않고 물러났다.",
                                    "<br><br>이 문장은 누구에게는 희망이고, 누구에게는 사형선고가 될지도 모른다."
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

window.EVENTS.push({
    id : "rescued_prisoner_after_bandit_event",

    condition : (player) =>
        player.justMoved &&
        ["townStreet", "darkStreet"].includes(player.location) &&
        player.flags?.undercity_story_06_done &&
        getCurrentDay(player) >= (player.flags.undercity_story_06_done_day + 1) &&
        Math.random() < 0.01,

    action : (player) => {
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "모퉁이를 도는 순간, 누군가 당신의 어깨에 부딪혔다. 처음에는 거지나 취객인 줄 알았다. 하지만 고개를 든 얼굴을 본 순간, 당신은 어렴풋이 흐릿한 얼굴들 중 하나를 떠올려냈다. 당신의 기억이 맞다면 이 사람은 도적떼 소굴에서 구해냈던 포로 중 하나다. 그는 당신을 알아봤는지 덜덜 떨며 당신의 옷자락을 붙잡았다.",
                    "<br><br>\"제발... 나를 못본 척해줘....\"<br><br>",
                    "그 순간 그의 뒤에서 누군가가 저벅저벅 걸어오는 소리가 들렸다. 누군가가, 누군가를 끌고 오고 있었다. 그는 군화 소리에 화들짝 놀라더니 그대로 옆으로 들어가서 숨었다. 쓰레기봉투들 사이에 웅크린 채로 그는 덜덜 떨고 있었다. 당신은 고개를 들었다. 그림자가 가까워진다.",
                    "<br>에릭이 피떡이 된 경비병 한 명을 끌고 걸어오고 있었다. 경비병은 에릭에게 멱살이 잡힌 채 \"잘못했어요\" 따위의 말을 중얼거리고 있었다. 에릭의 차가운 녹안이 당신을 내려다본다.",
                    "<br><br>\"수상한 자를 봤나.\""
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 고개를 저었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "에릭은 말없이 당신을 응시했다. 1초, 2초, 3초... 30초. 그는 당신을 말없이 바라보기만 했다. 들킨 걸까? 당신의 심장 박동 소리가 점점 커지기 시작했다. 에릭의 그림자가 당신의 그림자를 덮쳐온다.",
                                    "<br>하지만 당신의 예상과 다르게 에릭은 경비병을 끌고 그대로 당신을 지나쳐갔다. 그의 초록색 시선이 여전히 마음에 걸리지만 당신은 그의 그림자가 사라질 때까지 가만히 있었다. 에릭이 멀리로 가고 나서야 숨어있던 사람이 모습을 드러냈다. 그는 모습을 드러낸 후에도 한동안 숨을 쉬지 못하다가 당신의 손을 잡으며 고맙다고 말했다.",
                                    "<br><br>\"당신 때문에 나는 돌아갈 수 있어...\"<br><br>",
                                    "그는 흐느끼며 말했다. 그는 몇 번이고 당신에게 고맙다고 같은 말을 반복한 후 당신의 손에 야생열매를 쥐어주더니 에릭과 다른 방향으로 사라졌다.<br>",
                                    "...당신은 자신이 적어도 오늘만큼은 누군가를 다시 지옥으로 밀어넣지 않았다는 걸 본능적으로 깨달았다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, -3);
                                    changeEmotion("eric", "affection", -3);
                                    changeEmotion("eric", "rage", 3);
                                    addItem(player, ITEMS.misc.wildFruit);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 에릭에게 그가 숨은 곳을 가르쳐주었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 말에 에릭은 고개를 끄덕이더니 곧바로 숨어있던 자를 잡아냈다. 숨어있던 자는 발버둥을 치고, 울어도 보고, 애원도 해봤지만 에릭의 표정에는 변화가 없었다. 그의 방황하는 눈동자가 당신을 향한다. 그의 눈동자를 본 순간 당신은 순간 숨이 턱 막혀왔다. 그는 당신을 전혀 원망하고 있지 않았다. 그저 지금이라도 제발 살려달라고 당신에게 애원하고 있었다.",
                                    "<br><br>\"제발 한번이라도 다시 만나게... 으아악!\"<br><br>",
                                    "그는 에릭의 손에 의해 벽에 머리를 박더니 그대로 푹 고개를 떨구었다. 머리에서 난 피가 찐득하게 그의 얼굴을 타고 천천히 흘러내린다. 에릭은 한손으로는 여전히 남자의 멱살을 잡은 채로 주머니에 손을 넣더니 동전을 당신에게 던져주었다. 그리고 그는 두 사람을 끌고 사라져버렸다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 5);
                                    changeEmotion("eric", "affection", 1);
                                    changeGold(player, 500);
                                    savePlayer(player);
                                }
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

window.EVENTS.push({
    id : "missing_people_event_01",
    condition : (player) =>
        player.justMoved &&
        ["townStreet", "darkStreet"].includes(player.location) &&
        player.flags?.undercity_story_06_done &&
        getCurrentDay(player) >= player.flags.undercity_story_06_done_day + 1 &&
        Math.random() < 0.1,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "벽에 전단지 한 장이 붙어있다. <br><br><br>실종자 수색<br><br>제 딸을 찾습니다.<br><br>제 아들을 찾습니다.<br><br>남편을 찾습니다.<br><br>아내를 찾습니다.<br><br><br>",
                    "낡은 종이 위에는 흐릿한 얼굴들이 빼곡하게 그려져 있었다. 당신은 얼굴들을 살펴보았다. 낯익은 얼굴들도 보인다.",
                    "<br><br>...구하지 않았었나?"
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeTrauma(player, 1);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});


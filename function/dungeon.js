const DUNGEONS = {
    sewer: {
        id: "sewer",
        name: "하수구",
        startRoom: "r2c0",

        layout : [
            ["",     "r0c1", "r0c2", "r0c3", "r0c4",  "",     "r0c6", "r0c7"],
            ["",     "",     "r1c2", "",      "",     "",     "r1c6", "r1c7"],
            ["r2c0", "r2c1", "r2c2", "r2c3", "r2c4",  "",     "r2c6", ""],
            ["",     "",      "",    "",      "r3c4", "",     "r3c6", ""],
            ["",     "r4c1", "r4c2", "r4c3",  "r4c4", "r4c5", "r4c6", ""]
        ],

        rooms: {
            r0c1: { name: "하수구 막다른 곳", exits: { right: "r0c2" }, chest : "sewer_chest"},
            r0c2: { name: "하수구 통로", exits: { left: "r0c1", right: "r0c3", down: "r1c2" } },
            r0c3: { name: "하수구 통로", exits: { left: "r0c2", right: "r0c4" } },
            r0c4: { name: "하수구 막다른 곳", exits: { left: "r0c3" }, chest : "sewer_chest"},

            r1c2: { name: "하수구 통로", exits: { up: "r0c2", down: "r2c2" } },

            r2c0: { name: "하수구 입구", exits: { right: "r2c1" } },
            r2c1: { name: "하수구 통로", exits: { left: "r2c0", right: "r2c2" } },
            r2c2: { name: "하수구 통로", exits: { left: "r2c1", up: "r1c2", right: "r2c3" } },
            r2c3: { name: "하수구 통로", exits: { left: "r2c2", right: "r2c4" } },
            r2c4: { name: "하수구 통로", exits: { left: "r2c3", down: "r3c4" } },

            r3c4: { name: "하수구 통로", exits: { up: "r2c4", down: "r4c4" } },

            r4c1: { name: "하수구 막다른 곳", exits: { right: "r4c2" }, chest : "sewer_fixed_chest" },
            r4c2: { name: "하수구 통로", exits: { left: "r4c1", right: "r4c3" } },
            r4c3: { name: "하수구 통로", exits: { left: "r4c2", right: "r4c4" } },
            r4c4: { name: "하수구 통로", exits: { left: "r4c3", up: "r3c4", right: "r4c5" } },
            r4c5: { name: "하수구 통로", exits: { left: "r4c4", right: "r4c6" } },
            r4c6: { name: "하수구 통로", exits: { left: "r4c5", up: "r3c6" } },

            r3c6: { name: "하수구 통로", exits: { down: "r4c6", up: "r2c6" } },
            r2c6: { name: "하수구 통로", exits: { down: "r3c6", up: "r1c6" } },
            r1c6: {
                name: "안전해보이는 하수구 틈새",
                exits: { down: "r2c6", up: "r0c6" },
                safeZone: true,
                allowRest: true
            },
            r0c6: {
                name : "거지들의 소굴",
                exits : {down: "r1c6", right:"r0c7"},
                boss : "beggers"
            },
            r0c7: {
                name : "하얀꽃 통로",
                exits : {left: "r0c6", down: "r1c7"},
                safeZone: true,
                noEncounter : true,
                requireFlag: "undercity_story_02_done",
                lockedText: "위화감은 느꼈지만, 아직 아무 것도 알 수 없다."
            },
            r1c7: {
                name : "하얀꽃의 무덤",
                exits : {up:"r0c7"},
                safeZone : true,
                noEncounter: true,
                requireFlag: "undercity_story_02_done",
                event : "sewer_white_flower_grave",
                seenFlag: "sewer_white_flower_grave_seen",
                repeatEvent: "sewer_white_flower_grave_repeat"
            }
        },
        encounters : [
            {type : "battle", enemy : "slime", weight: 30},
            {type : "battle", enemy : "begger", weight : 40},
            {type : "event", id: "sewer_slime_swallowing", weight: 10},
            {type : "event", id : "sewer_someone_hand", weight : 10},
            {type : "event", id : "sewer_dirty_water", weight: 10}
        ]
    },
    goblinCave: {
        id : "goblinCave",
        name : "고블린동굴",
        startRoom : "r0c0",
        captureRoom: "r5c10",

        layout: [
            ["r0c0","r0c1", "r0c2", "r0c3", "",     "",     "r0c6", "",     "r0c8", "r0c9", "r0c10"],
            ["",    "r1c1", "",     "",     "",     "",     "r1c6", "",     "",     "r1c9", ""],
            ["",    "r2c1", "r2c2", "",     "r2c4", "",     "r2c6", "r2c7", "r2c8", "r2c9", ""],
            ["",    "r3c1", "",     "",     "r3c4", "",     "r3c6", "",     "",     "r3c9", ""],
            ["",    "r4c1", "r4c2", "r4c3", "r4c4", "r4c5", "r4c6", "",     "",     "r4c9", "r4c10"],
            ["",    "r5c1", "",     "",     "r5c4", "",     "",     "",     "",     "r5c9", "r5c10"],
            ["",    "r6c1", "",     "",     "r6c4", "",     "",     "",     "",     "",     ""],
            ["",    "r7c1", "r7c2", "r7c3", "r7c4", "r7c5", "r7c6", "",     "",     "",     ""]
    ],

    rooms: {
        r0c0: { name: "동굴 입구", exits: { right: "r0c1" } },
        r0c1: { name: "고블린 동굴 통로", exits: { left: "r0c0", right: "r0c2", down: "r1c1" } },
        r0c2: { name: "고블린 동굴 통로", exits: { left: "r0c1", right: "r0c3" } },
        r0c3: { name: "고블린 동굴 막다른 길", exits: { left: "r0c2" }, chest: "goblin_chest" },

        r1c1: { name: "내려가는 통로", exits: { up: "r0c1", down: "r2c1" } },
        r2c1: { name: "어두운 통로", exits: { up: "r1c1", down: "r3c1", right: "r2c2" } },
        r2c2: { name: "작은 굴", exits: { left: "r2c1" }, chest: "goblin_chest"},
        r3c1: { name: "어두운 통로", exits: { up: "r2c1", down: "r4c1" }, roomEvent:"goblin_flower_note" },
        r4c1: { name: "갈림길", exits: { up: "r3c1", down: "r5c1", right: "r4c2" } },
        r5c1: { name: "축축한 통로", exits: { up: "r4c1", down: "r6c1" } },
        r6c1: { name: "축축한 통로", exits: { up: "r5c1", down: "r7c1" } },
        r7c1: { name: "동굴 깊은 통로", exits: { up: "r6c1", right: "r7c2" } },

        r4c2: { name: "고블린 발자국", exits: { left: "r4c1", right: "r4c3" } },
        r4c3: { name: "무너진 길", exits: { left: "r4c2", right: "r4c4" } },
        r4c4: { name: "중앙 통로", exits: { left: "r4c3", up: "r3c4", down: "r5c4", right: "r4c5" } },
        r5c4: { name: "좁은 통로", exits: { up: "r4c4", down: "r6c4" } },
        r6c4: { name: "좁은 통로", exits: { up: "r5c4", down: "r7c4" } },

        r7c2: { name: "동굴 깊은 통로", exits: { left: "r7c1", right: "r7c3" } },
        r7c3: { name: "동굴 깊은 통로", exits: { left: "r7c2", right: "r7c4" }, chest: "goblin_chest" },
        r7c4: { name: "동굴 깊은 통로", exits: { left: "r7c3", up: "r6c4", right: "r7c5" } },
        r7c5: { name: "동굴 깊은 통로", exits: { left: "r7c4", right: "r7c6" } },
        r7c6: { name: "막다른 동굴", exits: { left: "r7c5" }, roomEvent:"goblin_flower_ambush" },

        r2c4: { name: "고블린 흔적", exits: { down: "r3c4" }, chest: "goblin_chest" },
        r3c4: { name: "고블린 흔적", exits: { up: "r2c4", down: "r4c4" } },
        r4c5: { name: "이어지는 통로", exits: { left: "r4c4", right: "r4c6" } },
        r4c6: { name: "오른쪽 갈림길", exits: { left: "r4c5", up: "r3c6" } },

        r0c6: { name: "외딴 굴", exits: { down: "r1c6" }, chest: "goblin_fixed_chest" },
        r1c6: { name: "가파른 통로", exits: { up: "r0c6", down: "r2c6" } },
        r2c6: { name: "고블린 순찰로", exits: { up: "r1c6", down: "r3c6", right: "r2c7" } },
        r3c6: { name: "고블린 순찰로", exits: { up: "r2c6", down: "r4c6" } },

        r2c7: { name: "고블린 순찰로", exits: { left: "r2c6", right: "r2c8" } },
        r2c8: { name: "고블린 순찰로", exits: { left: "r2c7", right: "r2c9" } },
        r2c9: { name: "보스방 아래 통로", exits: { left: "r2c8", up: "r1c9", down: "r3c9" } },

        r0c8: { name: "하얀꽃잎들로 입구가 가려져있는 비밀방", exits: { right: "r0c9" }, safeZone: true, allowRest: true },
        r0c9: { name: "보스방 앞 통로", exits: { left: "r0c8", right: "r0c10", down: "r1c9" } },
        r0c10: {
            name : "고블린 보스방",
            exits : {left: "r0c9"},
            boss : "goblinKing"
        },
        r1c9: { name: "보스방 앞 샛길", exits: { up: "r0c9", down: "r2c9" } },

        r3c9: { name: "포로방 근처", exits: { up: "r2c9", down: "r4c9" }, roomEvent: "goblin_flower_ambush" },
        r4c9: { name: "포로방 앞", exits: { up: "r3c9", down: "r5c9", right: "r4c10" } },
        r4c10: { name: "감시 굴", exits: { left: "r4c9", down: "r5c10" } },
        r5c9: { name: "낡은 우리 앞", exits: { up: "r4c9", right: "r5c10" } },
        r5c10: { name: "포로방", exits: { left: "r5c9", up: "r4c10" } }
    },
    encounters : [
        {type : "battle", enemy : "goblin", weight: 50},
        {type : "event", id : "goblin_rope", weight: 20},
        {type : "event", id : "goblin_trap_log", weight: 20},
        {type : "event", id : "goblin_slayer", weight : 10}
    ]
    },
    banditHideout: {
        id: "banditHideout",
        name: "도적떼 소굴",
        startRoom: "r9c0",
        
        layout: [
            ["r0c0", "",     "r0c2", "",     "r0c4", "",     "",     "",     ""],
            ["r1c0", "r1c1", "r1c2", "",     "r1c4", "r1c5", "",     "",     ""],
            ["",     "",     "r2c2", "",     "r2c4", "",     "",     "",     ""],
            ["",     "r3c1", "r3c2", "r3c3", "r3c4", "",     "",     "",     ""],
            ["",     "r4c1", "",     "",     "r4c4", "",     "",     "r4c7", ""],
            ["r5c0", "r5c1", "",     "",     "r5c4", "",     "r5c6", "r5c7", ""],
            ["",     "",     "",     "",     "r6c4", "",     "r6c6", "",     ""],
            ["",     "r7c1", "r7c2", "r7c3", "r7c4", "r7c5", "r7c6", "",     ""],
            ["",     "",     "",     "",     "r8c4", "",     "r8c6",     "", ""],
            ["r9c0", "r9c1", "r9c2", "r9c3", "r9c4", "",     "r9c6", "r9c7", "r9c8"]
        ],

        rooms: {
            r9c0: { name: "시작점", exits: { right: "r9c1" } },
            r9c1: { name: "비밀통로", exits: { left: "r9c0", right: "r9c2" }, noEncounter: true },
            r9c2: { name: "비밀통로", exits: { left: "r9c1", right: "r9c3" }, noEncounter: true, event : "bandit_secret_note" },
            r9c3: { name: "비밀통로", exits: { left: "r9c2", right: "r9c4" }, noEncounter: true },
            r9c4: { name: "중앙 통로", exits: { left: "r9c3", up: "r8c4" } },
            r9c6: { name: "화려한 복도", exits: { right: "r9c7" }, roomEvent: "bandit_luke_event", noEncounter: true },
            r9c7: { name: "화려한 방", exits: { left: "r9c6", right: "r9c8" }, noEncounter: true },
            r9c8: { name: "트로피방", exits: { left: "r9c7" }, noEncounter: true },

            r8c4: { name: "중앙 통로", exits: { down: "r9c4", up: "r7c4" } },
            r8c6: { name: "피비린내나는 통로", exits: { down: "r9c6", up: "r7c6" } },

            r7c1: { name: "창고", exits: { right: "r7c2" }, chest: "bandit_chest" },
            r7c2: { name: "창고 통로", exits: { left: "r7c1", right: "r7c3" } },
            r7c3: { name: "창고 통로", exits: { left: "r7c2", right: "r7c4" } },
            r7c4: { name: "중앙 통로", exits: { left: "r7c3", up: "r6c4", down: "r8c4", right: "r7c5" } },
            r7c5: { name: "감시 통로", exits: { left: "r7c4", right: "r7c6" } },
            r7c6: { name: "감시 통로", exits: { left: "r7c5", up: "r6c6", down:"r8c6" } },

            r6c4: { name: "중앙 통로", exits: { up: "r5c4", down: "r7c4" } },
            r6c6: { name: "포로방 앞 통로", exits: { down: "r7c6", up: "r5c6" } },

            r5c0: { name: "창고", exits: { right: "r5c1" }, chest: "bandit_chest" },
            r5c1: { name: "창고 통로", exits: { left: "r5c0", up: "r4c1" } },
            r5c4: { name: "중앙 통로", exits: { up: "r4c4", down: "r6c4" } },
            r5c6: { name: "더러운 통로", exits: { down: "r6c6", right: "r5c7" } },
            r5c7: { name: "포로방 입구", exits: { left: "r5c6", up: "r4c7" }},

            r4c1: { name: "창고 통로", exits: { down: "r5c1", up: "r3c1" } },
            r4c4: { name: "중앙 통로", exits: { up: "r3c4", down: "r5c4" } },
            r4c7: { name: "포로방", exits: { down: "r5c7" }, noEncounter: true, roomEvent: "bandit_prison_room", seenFlag: "bandit_prison_room_seen", repeatEvent: "bandit_prison_room_repeat" },

            r3c1: { name: "창고 통로", exits: { down: "r4c1", right: "r3c2" } },
            r3c2: { name: "통로 길목", exits: { left: "r3c1", right: "r3c3" } },
            r3c3: { name: "통로", exits: { left: "r3c2", right: "r3c4" } },
            r3c4: { name: "중앙 통로", exits: { left: "r3c3", up: "r2c4", down: "r4c4" } },

            r2c2: { name: "실험 통로", exits: { down: "r3c2", up: "r1c2" } },
            r2c4: { name: "중앙 통로", exits: { up: "r1c4", down: "r3c4" } },

            r1c0: { name: "실험실", exits: {up: "r0c0", right: "r1c1" }, event: "bandit_experiment_note"},
            r1c1: { name: "실험 통로", exits: { left: "r1c0", right: "r1c2" } },
            r1c2: { name: "실험 통로", exits: { left: "r1c1", down: "r2c2", up: "r0c2" } },
            r1c4: { name: "거대한 문앞", exits: { up: "r0c4", down: "r2c4", right: "r1c5" } },
            r1c5: { name: "숨돌릴 구석", exits: { left: "r1c4" }, safeZone: true, allowRest: true },

            r0c0: { name: "연구자료방", exits: { down: "r1c0" }, event:"bandit_research_note" },
            r0c2: { name: "시체처리소", exits: { down: "r1c2" }, event: "bandit_corpse_room" },
            r0c4: { name: "보스방", exits: { down: "r1c4" }, boss: "banditBoss", bossIntro:"banditBoss_intro" }
    },

    encounters: [
        { type: "battle", enemy: "bandit1", weight: 40 },
        { type: "battle", enemy: "bandit2", weight: 20 },
        {type : "event", id : "banditHideout_runner", weight: 5},
        {type : "event", id : "banditHideout_furious_child", weight: 20},
        {type : "event", id : "banditHideout_may_i_touch_b", weight: 10},
        {type : "event", id : "banditHideout_box", weight: 15}
    ]
}
}

window.DUNGEON_EVENTS = DUNGEON_EVENTS;

//던전 보물상자
function checkDungeonChest(player){
    const room = getCurrentDungeonRoom(player);
    if (!room || !room.chest) return false;

    const chest = DUNGEON_CHESTS[room.chest];
    if (!chest) return false;

    player.flags = player.flags || {};

    let flag;
    if (chest.type === "fixed"){
        flag = `opened_${room.chest}`;
    } else {
        flag = `opened_${player.dungeon.id}_${player.dungeon.room}_${room.chest}`;
    }
    
    if (chest.type === "fixed" && player.flags[flag]) return false;

    if (player.flags[flag]) return false;

    startScene([
        {
            type: "text",
            value: `${chest.name || "상자"}를 발견했다.`
        },
        {
            type: "choice",
            choices: [
                { text: "연다", action: "open_dungeon_chest" },
                { text: "무시한다", action: "ignore_dungeon_chest" }
            ]
        }
    ], player);

    return true;
}

window.open_dungeon_chest = function(player){
    const room = getCurrentDungeonRoom(player);
    if (!room?.chest) return;

    const chest = DUNGEON_CHESTS[room.chest];
    if (!chest) return;

    player.flags = player.flags || {};

    let flag;
    if (chest.type === "fixed"){
        flag = `opened_${room.chest}`;
    } else {
        flag = `opened_${player.dungeon.id}_${player.dungeon.room}_${room.chest}`;
    }

    if (chest.type === "fixed"){
        if (player.flags[flag]){
            showSingleTextScene("이미 연 상자다.", player);
            return;
        }

        player.flags[flag] = true;
        chest.reward(player);
        return;
    }

    if (chest.type === "random"){
        if (player.flags[flag]){
            showSingleTextScene("이미 연 상자다.", player);
            return;
        }
        
        player.flags[flag] = true;
        localStorage.setItem("playerData", JSON.stringify(player));
        openDungeonChest(player, chest);
        return;
    }
};

const SEWER_CHEST_POOL = [
    { id: "small_potion", weight: 20 },
    { id: "dirty_item", weight: 15 },
    { id: "nothing", weight: 10 },
    { id: "gold_50", weight: 20 },
    { id: "gold_100", weight: 20 },
    { id: "gold_500", weight: 5 }
];

const GOBLIN_CHEST_POOL = [
    { id: "small_potion", weight: 10 },
    { id: "meat_potion", weight: 30 },
    { id: "dirty_item", weight: 10 },
    { id: "nothing", weight: 10 },
    { id: "gold_50", weight: 10 },
    { id: "gold_100", weight: 30 },
    { id: "gold_500", weight: 10 }
];

const BANDIT_CHEST_POOL = [
    { id: "medium_potion", weight: 10 },
    { id: "jewerlyPieces", weight: 10 },
    { id: "nothing", weight: 15 },
    { id: "gold_300", weight: 30 },
    { id: "gold_500", weight: 20 },
    { id: "gold_1000", weight: 5 },
    { id: "druggy", weight: 30 }
];

const DUNGEON_CHESTS = {
    sewer_chest: {
        name: "녹슨 상자",
        type: "random",
        pool: SEWER_CHEST_POOL
    },

    sewer_fixed_chest: {
        name: "잠긴 금속 상자",
        type: "fixed",
        reward: (player) => {
            addItem(player, ITEMS.top.croptshirt);
            showSingleTextScene("상자 안에는 크롭티가 들어 있었다.", player);
        }
    },

    goblin_chest: {
        name : "퀘퀘한 냄새가 나는 나무 상자",
        type : "random",
        pool : GOBLIN_CHEST_POOL
    },

    goblin_fixed_chest: {
        name: "조악한 기술로 잠겨있는 나무 상자",
        type : "fixed",
        reward: (player) => {
            addItem(player, ITEMS.bottom.longskirts);
            showSingleTextScene("상자 안에는 긴 치마가 들어 있었다.", player);
        }
    },

    bandit_chest: {
        name: "도적들의 상자",
        type: "random",
        pool: BANDIT_CHEST_POOL
    }
};

const CHEST_REWARDS = {
    gold_50: (player) => {
        changeGold(player, 50);
        showSingleTextScene("상자 안에는 50 골드가 들어 있었다.", player);
    },

    gold_100: (player) => {
        changeGold(player, 100);
        showSingleTextScene("상자 안에는 100 골드가 들어 있었다.", player);
    },

    gold_300: (player) => {
        changeGold(player, 300);
        showSingleTextScene("상자 안에는 300 골드가 들어 있었다.", player);
    },

    gold_500: (player) => {
        changeGold(player, 500);
        showSingleTextScene("상자 안에는 500 골드가 들어 있었다.", player);
    },

    gold_1000: (player) => {
        changeGold(player, 1000);
        showSingleTextScene("! 상자 안에는 1000 골드가 들어 있었다.", player);
    },

    small_potion: (player) => {
        addItem(player, ITEMS.consumable.smallPotion);
        showSingleTextScene("물약을 발견했다.", player);
    },

    medium_potion: (player) => {
        addItem(player, ITEMS.consumable.mediumPotion);
        showSingleTextScene("물약을 발견했다.", player);
    },

    dirty_item: (player) => {
        addItem(player, ITEMS.misc.tornClothes);
        showSingleTextScene("찝찝한 물건을 발견했다...", player);
    },

    nothing: (player) => {
        showSingleTextScene("아무 것도 없다. 누군가 털어간 모양이다...", player);
    },

    jewerlyPieces: (player) => {
        addItem(player, ITEMS.misc.jewerlyPieces);
        showSingleTextScene("상자 안에는 자잘한 보석 조각들이 들어 있었다.", player);
    },

    druggy: (player) => {
        addItem(player, ITEMS.misc.druggy);
        showSingleTextScene("상자 안에는 수상한 약이 들어 있었다.", player);
    },

    meat_potion: (player) => {
        addItem(player, ITEMS.consumable.meatPotion);
        showSingleTextScene("무엇으로 만들어진지 상상하고 싶지 않아지는 고기를 발견했다.", player);
    }
};

function openDungeonChest(player, chest){
    const result = pickWeighted(chest.pool);

    const reward = CHEST_REWARDS[result];

    if (!reward){
        console.warn("상자 보상 없음:", result);
        return;
    }

    reward(player);
}

window.enterDungeon = function(player, dungeonId){
    const dungeon = DUNGEONS[dungeonId];
    if (!dungeon) return;

    player.location = dungeonId;
    player.dungeon = {
        active: true,
        id: dungeonId,
        room: dungeon.startRoom,
        visited: [dungeon.startRoom]
    };

    localStorage.setItem("playerData", JSON.stringify(player));
    renderMap(player);
    if (
        dungeonId === "sewer" &&
        player.flags?.undercity_story_01_done &&
        !player.flags?.sora_sewer_event_seen &&
        !player.flags?.sora_drug_01_done
    ){
        startSoraSewerEvent01(player);
        return;
    }
    startScene(buildDungeonScene(player), player);
};

function getCurrentDungeon(player){
    if (!player?.dungeon?.active) return null;
    return DUNGEONS[player.dungeon.id];
}

function getCurrentDungeonRoom(player){
    const dungeon = getCurrentDungeon(player);
    if (!dungeon) return null;

    return dungeon.rooms[player.dungeon.room];
}

function moveDungeon(player, direction){
    const dungeon = getCurrentDungeon(player);
    const room = getCurrentDungeonRoom(player);

    if (!dungeon || !room) return;

    const nextRoomKey = room.exits[direction];

    if (!nextRoomKey){
    startScene([
        {
            type: "text",
            value: "그쪽으로는 갈 수 없다."
        }
    ], player, {
        onEnd: () => startScene(buildDungeonScene(player), player)
    });
    return;
    }

    const nextRoom = dungeon.rooms[nextRoomKey];

    if (
        dungeon.id === "banditHideout" &&
        (nextRoomKey === "r9c7" || nextRoomKey === "r9c8") &&
        (
            player.flags?.bandit_luke_event_done ||
            player.flags?.bandit_luke_path_closed ||
            player.flags?.bandit_luke_ignored
        )
    ){
        showSingleTextScene(
            "화려한 방은 허무한 잿더미로 가라앉아있다.... 당신은 들어갈 수 없다.",
            player
        );
        return;
    }
    
    if (nextRoom?.requireFlag && !player.flags?.[nextRoom.requireFlag]){
        showSingleTextScene(
            nextRoom.lockedText || "아직 이곳으로 갈 수 없다.",
            player
        );
        return;
    }

    player.dungeon.room = nextRoomKey;

    if (!player.dungeon.visited.includes(nextRoomKey)){
        player.dungeon.visited.push(nextRoomKey);
    }

    localStorage.setItem("playerData", JSON.stringify(player));

    const newRoom = getCurrentDungeonRoom(player);
    renderMap(player);

    if (
        dungeon.id === "goblinCave" &&
        nextRoomKey === "r5c10"
    ){
        handleGoblinPrisonRoom(player);
        return;
    }

    if (newRoom.roomEvent){
        const roomEventFlag = `roomEvent_${nextRoomKey}_${newRoom.roomEvent}`;
        player.dungeon.tempFlags = player.dungeon.tempFlags || {};
        
        if (!player.dungeon.tempFlags[roomEventFlag]){
            player.dungeon.tempFlags[roomEventFlag] = true;
            localStorage.setItem("playerData", JSON.stringify(player));
            runDungeonRoomEvent(player, newRoom.roomEvent);
            return;
        }
    }

    if (newRoom.event){
        runDungeonEvent(player, newRoom.event);
        return;
    }

    if (newRoom.boss){
        const bossDefeatedFlag = `defeated_${dungeon.id}_${newRoom.boss}`;
        
        if (player.flags?.[bossDefeatedFlag]){
            startScene(buildDungeonScene(player), player);
            return;
        }
        
        if (newRoom.bossIntro && !player.flags?.[`seen_${newRoom.bossIntro}`]){
            runDungeonBossIntro(player, newRoom.bossIntro);
            return;
        }
        
        startBattle(newRoom.boss, player, {
            onWin: () => {
                player.flags = player.flags || {};
                player.flags[bossDefeatedFlag] = true;
                savePlayer(player);    
                handleDungeonBossWin(player, dungeon, newRoom);
            }
        });
        return;
    }

    if (newRoom.safeZone){
        renderMap(player);
        startScene(buildDungeonScene(player), player);
        return;
    }

    passTime(player, 1);
    changeArousal(player, -5);
    if (applyActionStatusEffects(player)) return;

    if (checkDungeonChest(player)) return;

    const encounter = pickDungeonEncounter(dungeon);
    if (encounter){
        if (encounter.type === "battle"){
            startBattle(encounter.enemy, player);
            return;
        }

        if (encounter.type === "event"){
            runDungeonEvent(player, encounter.id);
            return;
        }
    }

    renderMap(player);
    startScene(buildDungeonScene(player), player);
}

function handleDungeonBossWin(player, dungeon, room){
    addQuestProgress(player, room.boss);

    if (dungeon.id === "goblinCave" && room.boss === "goblinKing"){
        if (isGoblinStoryActive(player)){
            handleGoblinKingWin(player);      
            return;
        }
    }

    if (dungeon.id === "banditHideout" && room.boss === "banditBoss"){
        handleBanditBossWin(player);
        return;
    }

    if (dungeon.id === "sewer"){
        handleSewerBossWin(player);
        return;
    }

    startScene([
        {
            type: "text",
            value: "보스를 쓰러뜨렸다. 던전 밖으로 돌아가시겠습니까?"
        },
        {
            type: "choice",
            choices: [
                { text: "돌아간다", action: "leave_dungeon_after_boss" },
                { text: "조금 더 둘러본다", action: "continue_dungeon_after_boss" }
            ]
        }
    ], player);
}

window.continue_dungeon_after_boss = function(player){
    renderMap(player);
    startScene(buildDungeonScene(player), player);
};

function buildDungeonScene(player){
    if (player.flags?.pendingArousalRelease){
        return buildArousalReleaseScene(player, true);
    }
    const dungeon = getCurrentDungeon(player);
    const room = getCurrentDungeonRoom(player);
    const roomKey = player.dungeon?.room;

    const choices = [
        { text: "위로 간다", action: "dungeon_up" },
        { text: "아래로 간다", action: "dungeon_down" },
        { text: "왼쪽으로 간다", action: "dungeon_left" },
        { text: "오른쪽으로 간다", action: "dungeon_right" },
        { text: "잠시 쉰다", action: "dungeon_rest" },
        { text: "침착하게 정신을 다스린다", action: "calmDown" },
    ];

    if (roomKey === dungeon.startRoom){
        choices.push({ text: "던전에서 나간다", action: "exit_dungeon" });
    }

    //숏컷들
    if (
        dungeon.id === "goblinCave" &&
        roomKey === dungeon.startRoom &&
        player.flags?.goblinCaveShortcut
    ){
        choices.push({
            text: "숏컷으로 동굴 깊은 곳까지 간다",
            action: "enter_goblinCaveShortcut"
        });
    }
    if (
        dungeon.id === "goblinCave" &&
        roomKey === dungeon.captureRoom &&
        player.flags?.goblinCaveShortcut
    ){
        choices.push({
            text: "숏컷으로 동굴 밖으로 나간다",
            action: "leave_dungeon_after_boss"
        });
    }


    
    return [
        {
            type: "text",
            value: `${room.name}이다.<br>축축한 악취가 코를 찌른다.<br><br>어디로 갈까?`
        },
        {
            type: "choice",
            choices
        }
    ];
}

function pickDungeonEncounter(dungeon){
    const list = dungeon.encounters;
    if (!list) return null;

    let total = list.reduce((sum, e) => sum + e.weight, 0);
    let roll = Math.random() * total;

    for (const e of list){
        roll -= e.weight;
        if (roll <= 0) return e;
    }

    return list[0];
}

window.dungeon_up = function(player){ moveDungeon(player, "up"); };
window.dungeon_down = function(player){ moveDungeon(player, "down"); };
window.dungeon_left = function(player){ moveDungeon(player, "left"); };
window.dungeon_right = function(player){ moveDungeon(player, "right"); };

window.renderDungeonMap = function(player){
    const mapArea = document.getElementById("mapArea");
    if (!mapArea || !player?.dungeon?.active) return;

    const dungeon = DUNGEONS[player.dungeon.id];
    const currentRoom = player.dungeon.room;

    const layout = dungeon.layout;

    function cell(roomKey){
        if (!roomKey) return `<div class="dungeon-cell empty"></div>`;

        const visited = player.dungeon.visited.includes(roomKey);
        const current = roomKey === currentRoom;

        return `
            <div class="dungeon-cell ${visited ? "visited" : ""} ${current ? "current" : ""}">
                ${current ? "●" : visited ? "" : "?"}
            </div>
        `;
    }

    mapArea.innerHTML = `
        <div class="map-box">
            <h3>${dungeon.name}</h3>
            <div class="dungeon-map">
                ${layout.map(row => `
                    <div class="dungeon-row">
                        ${row.map(cell).join("")}
                    </div>
                `).join("")}
            </div>
        </div>
    `;
};

function pickDungeonRestEncounter(dungeon){
    const list = dungeon.encounters.filter(e => e.type === "battle");
    if (list.length === 0) return null;

    let total = list.reduce((sum, e) => sum + e.weight, 0);
    let roll = Math.random() * total;

    for (const e of list){
        roll -= e.weight;
        if (roll <= 0) return e;
    }

    return list[0];
}

function doDungeonRest(player){
    const dungeon = getCurrentDungeon(player);
    const room = getCurrentDungeonRoom(player);

    if (!dungeon || !room) return;

    let danger = 0.5;

    if (room.safeZone) danger = 0;
    else if (room.nearBoss) danger = 0.7;

    passTime(player, 5);

    if (Math.random() < danger){
        const encounter = pickDungeonRestEncounter(dungeon);

        if (encounter){
            showSingleTextScene("습격이다!", player, {
                onEnd: () => {
                    startBattle(encounter.enemy, player, {
                        onWin: () => startScene(buildDungeonScene(player), player),
                        onEscape: () => startScene(buildDungeonScene(player), player)
                    });
                }
            });
            return;
        }
    }

    changeHP(player, Math.floor(player.status.maxHp * 0.2));
    changeStamina(player, Math.floor(player.status.maxStamina * 0.3));

    showSingleTextScene("잠시 숨을 골랐다.", player);
}

window.dungeon_rest = function(player){
    doDungeonRest(player);
};

//던전 들어가기 작동
window.DUNGEONS = DUNGEONS;
window.enter_sewer = function(player){
    window.enterDungeon(player, "sewer");
};

window.enter_goblinCave = function(player){
    window.enterDungeon(player, "goblinCave");
};

window.enter_goblinCaveShortcut = function(player){
    const dungeon = DUNGEONS.goblinCave;

    player.location = "goblinCave";

    player.dungeon = {
        active: true,
        id: "goblinCave",
        room: dungeon.captureRoom,
        visited: [dungeon.captureRoom]
    };

    localStorage.setItem("playerData", JSON.stringify(player));
    renderMap(player);
    startScene(buildDungeonScene(player), player);
};

window.leave_dungeon_after_boss = function(player){
    leaveDungeon(player);
};

function leaveDungeon(player){
    const dungeonId = player.dungeon?.id;

    player.dungeon = null;

    if (dungeonId === "goblinCave"){
        player.location = "deepForest";
    } else if (dungeonId === "sewer"){
        player.location = "darkStreet";
    } else {
        player.location = "townStreet";
    }

    localStorage.setItem("playerData", JSON.stringify(player));
    renderMap(player);
    startScene(getLocationScene(player), player);
}

window.exit_dungeon = function(player){
    const dungeon = getCurrentDungeon(player);
    const roomKey = player.dungeon?.room;

    if (!dungeon) return;

    if (roomKey !== dungeon.startRoom){
        showSingleTextScene("여기서는 던전 밖으로 나갈 수 없다.", player);
        return;
    }

    leaveDungeon(player);
};

//던전 이벤트
function runDungeonEvent(player, eventId){
    const dungeon = getCurrentDungeon(player);
    const room = getCurrentDungeonRoom(player);
    const events = DUNGEON_EVENTS[dungeon.id];

    if (!events || !events[eventId]) return;

    let finalEventId = eventId;

    if (room?.seenFlag){
        player.flags = player.flags || {};

        if (player.flags[room.seenFlag] && room.repeatEvent){
            finalEventId = room.repeatEvent;
        } else {
            player.flags[room.seenFlag] = true;
            localStorage.setItem("playerData", JSON.stringify(player));
        }
    }

    runScene(events[finalEventId], player, {
        sceneState: {
            type: "dungeonEvent",
            dungeonId: dungeon.id,
            eventId: finalEventId
        },
        onEnd: () => {
            if (checkArousalRelease(player, () => {
                startScene(buildDungeonScene(player), player);
            })) return;
            startScene(buildDungeonScene(player), player);
        }
    });
}

function handleCheck(node, player){
    const stat = getTotalStat(player, node.stat);
    const roll = Math.random() * 20;

    if (stat + roll >= node.difficulty){
        runScene(node.success, player, {
            onEnd: () => startScene(buildDungeonScene(player), player)
        });
    } else {
        runScene(node.fail, player, {
            onEnd: () => startScene(buildDungeonScene(player), player)
        });
    }
}

//던전 이벤트들
function runDungeonRoomEvent(player, eventId){
    if (eventId === "goblin_flower_ambush"){
        startScene([
            {
                type: "text",
                value: "동굴에서 당신은 하얀꽃들이 떨어져있는 걸 보았다. 당신이 한 발자국 옮길 때마다 바닥에 있는 하얀꽃잎들은 바르르 떨었다. 툭. 앞에서 들려오는 사뿐한 발걸음 소리에 당신은 고개를 들었다. 웃음소리...? 꽃인간이다!"
            }
        ], player, {
            onEnd: () => {
                startBattle("flower", player, {
                    onWin: () => startScene(buildDungeonScene(player), player),
                    onEscape: () => startScene(buildDungeonScene(player), player)
                });
            }
        });
    }
    else if (eventId === "goblin_flower_note"){
        startScene([
            {
                type: "text",
                value:
                    "낡은 가방 하나가 동굴 벽에 기대어 있다. 안에는 피로 얼룩진 쪽지 한 장이 들어 있었다.<br><br>" +
                    "분명 고블린이 문제라고 하지 않았어? 이건 고블린의 웃음소리가 아니잖아!<br>" +
                    "젠장, 에르윈. 어딨는 거야? 네가 보고 싶어. 사실 나는 너를....<br>" +
                    "에르윈, 에르윈, 에르윈, 내가 미쳐가는 거 같아. 계속 웃음소리가 들려. 널 보고싶어, 보고싶어, 보고싶어...<br><br><br>" +
                    "<div style='color:red; font-style:italic'>" +
                    "하얀꽃.... 에르윈, 네가 나한테 준 마지막 꽃이 하얀꽃이었지..." +
                    "</div>"
            }
        ], player, {
            onEnd: () => {
                startScene(buildDungeonScene(player), player);
            }
        });
    }

    else if (eventId === "bandit_luke_event"){
         if (
            player.flags?.bandit_luke_event_done ||
            player.flags?.bandit_luke_ignored
        ){
            showSingleTextScene("화려한 방은 허무한 잿더미로 가라앉아있다.... 당신은 들어갈 수 없다.", player, {
                onEnd: () => startScene(buildDungeonScene(player), player)
            });
            return;
        }
        startScene([
            {
                type : "text",
                value : "지나쳐온 복도들보다 훨씬 화려한 복도다. 지금까지 걸어왔던 복도들과는 이질적이라서 당신은 자기도 모르게 신경을 곤두세웠다. 그리고 그런 당신의 앞으로 익숙한 뒤통수가 보였다. 루크다.<br>" +
                        "그는 피묻은 너클을 끼고 있다가 당신을 돌아보았다. 그는 당신을 위아래로 훑어보더니 코웃음을 쳤다.<br><br>" +
                        "\"하. 피냄새가 나는 곳은 잘도 찾아오는군.\"<br><br>" +
                        "루크는 너클을 털어냈다. 핏방울들이 화려한 복도 바닥을 더럽힌다. 그는 으르렁거리는 목소리로 당신에게 신경끄라고 말한 뒤 화려한 문을 열고 들어가버렸다. 루크가 닫은 건지, 아니면 원래 닫히는 문인 건지, 그가 들어가고 나서 화려한 문이 쿵 닫혔다." +
                        "<br><br>\"루, 루크...!?\"<br><br>\"하. 내 이름 부를 혀가 아직도 남아있었나?\"<br><br>" +
                        "챙, 하고 쇠가 부딪히는 소리가 들렸다. 싸우고 있는 소리다."
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "화려한 문을 열고 들어간다.",
                        action : "banditHideout_follow_luke"
                    },
                    {
                        text : "당신은 루크를 쫓아가지 않았다.",
                        action : "banditHideout_ignore_luke"
                    }
                ]
            }
        ], player);
    }

    else if (eventId === "bandit_prison_room"){
        startScene([
            {
                type: "text",
                value: "포로방에는 사람들이 꽤 있었다. 그들은 모두 수척한 상태로 자신의 끔찍한 운명만을 기다리고 있었다. 감옥 창살에 기대어 앉아있던 사람 중 한 명이 당신을 발견하고 다가왔다." +
                       "<br><br>\"도적떼를 소탕하러 오신 건가요?\"<br><br>" +
                       "그는 당신의 무기에 묻은 피와 조금이나마 남은 희망으로 당신이 도적떼를 소탕하러 온 사람이라고 믿고 있는 듯 싶었다. 그는 주섬주섬 당신에게 옷을 주었다. 도적들이 입고 있었던 옷이라고 한다." +
                       "<br><br>\"제발 그들을 죽여주세요...\"<br><br>" +
                       "아이는 당신을 슬픈 눈동자로 응시하며 말했다. 뒤에서 아이의 엄마로 보이는 자가 아이의 이름을 불렀다. 레리는 당신에게 마지막으로 고개를 숙여보인 후 벽에 기대어있는 제 어머니에게로 달려갔다."
            },
            {
                type: "effect",
                run: (player) => {
                    addItem(player, ITEMS.bottom.banditArmorBottom);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => startScene(buildDungeonScene(player), player)
        });
    }
}

const DUNGEON_EVENTS = {
    sewer : {
        sewer_slime_swallowing : [
            {
                type : "text",
                value : "이상하다. 어디선가 끈적끈적한 소리가 들리는 거 같기도 하고 아닌 거 같기도 하다. 정면에는 없다."
            },
            {
                type : "check",
                stat : "int",
                difficulty : 12,
                success : [
                    {
                        type : "text",
                        value : "당신은 위에서 들리는 소리일지도 모른다는 생각에 발걸음을 내딛기 전에 위부터 살펴보았다. 분홍색 슬라임이다! 당신은 슬라임을 피해 구석으로 이동하여 통과했다."
                    }
                ],
                fail : [
                    {
                        type : "text",
                        value : "당신은 위는 살피지 못하고, 주변만 살피며 걸었다. 위에서 크게 들려오는 소리에 당신은 바로 피하려고 했지만 이미 늦었다. 분홍색 슬라임이 당신의 몸을 뒤덮었다. 당신의 가슴에 붙은 슬라임은 몇 번이고 당신의 유두를 빨다가 힘없이 미끄러져 내려갔다."
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            changeArousal(player, getSensitivityArousalGain(player, "b", 10)),
                            changeSensitivity(player, "bSensitivity", 5);
                        }
                    }
                ]
            }
        ],
        sewer_someone_hand : [
            {
                type : "text",
                value : "좁은 통로를 지나칠 때, 누군가 뒤에서 당신의 엉덩이를 만지는 듯한 느낌이 들었다!"
            },
            {
                type : "check",
                stat : "dex",
                difficulty : 12,
                success : [
                    {
                        type : "text",
                        value : "당신은 민첩하게 사람의 손에서 벗어났다. 어둡고 좁은 통로를 통과한 후 뒤를 돌았을 때는 이미 아무도 없었다."
                    }
                ],
                fail : [
                    {
                        type : "text",
                        value : "당신은 도망가려고 했지만 좁은 통로에서 벗어나는 건 쉽지 않았다. 당신이 어딘가에 걸려 비틀거릴 때 누군가의 손은 당신의 엉덩이를 양손으로 잡고 세게 주물렀다. 꽉 쥔 손가락 사이로 당신의 엉덩이살이 밀린다. 당신은 허겁지겁 능욕에서 벗어났다. 좁은 통로를 벗어난 후 뒤를 돌아보았을 때는 이미 아무도 없었다."
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            changeArousal(player, getSensitivityArousalGain(player, "a", 15)),
                            changeSensitivity(player, "aSensitivity", 5);
                        }
                    }
                ]
            }
        ],
        sewer_dirty_water : [
            {
                type : "text",
                value : "앞에서 어딘가 터지는 소리가 났다. 하수구물이 터져서 쏴아아 당신을 집어삼킬 듯이 내려온다!"
            },
            {
                type : "check",
                stat : "str",
                difficulty : 12,
                success : [
                    {
                        type : "text",
                        value : "피할 곳이 없었던 당신은 그대로 위로 손을 뻗어 위파이프에 매달렸다. 물이 지나가는 동안 당신은 파이프에 매달려있을 수 있었다."
                    }
                ],
                fail : [
                    {
                        type : "text",
                        value : "위의 파이프에 매달리려고 했던 당신은 매달려있다가 손의 힘이 딸려서 그대로 밑으로 떨어졌다. 하수구의 더러운 물이 당신의 몸을 뒤덮는다..."
                    },
                    {
                        type : "effect",
                        run: (player) => {
                            addStatusEffect(player, {
                                id: "poison",
                                name: "독",
                                damage: 3,
                                duration: 5
                            });
                        }
                    }
                ]
            }
        ],
        sewer_white_flower_grave:[
            {
                type : "text",
                value : "짙은 향기가 당신의 피부에 스며든다. 당신은 점점 진해지는 향에 정신을 놓을 뻔했지만, 어떻게든 주변을 둘러보려고 애썼다. <br>" +
                        "...당신의 주변에는 하얀 꽃들이 무덤처럼 쌓여있었다. 다 떨어진 하얀꽃들인데도, 하나도 상하지 않고, 하나도 시들지 않고, 그들은 마치 살아있는 것처럼 흔들리고 있었다. 당신은 당신도 모르게 하얀꽃들의 무덤에 가까이 갔다." +
                        " 하얀꽃들은 저절로 와서 쌓인 걸까. 아니면 누군가 하얀꽃들을 가져와서 무덤을 만든 걸까. 당신은 멍하니 하얀꽃들의 무덤을 바라보았다. <br>" +
                        "<div style='text-align:center;'><strong style='color:red; font-size:3rem'><br><br>찾<br><br>았<br><br>다<br><br></strong></div>" +
                        "<div style='color:#7a4b4b; font-style:italic'><br>당신이 눈을 깜박였을 때, 환청처럼 들리던 목소리는 사라졌다. 이제 더 이상 목소리를 들을 수 없다.</div>"
            },
            {
                type : "choice",
                choices : [
                    {text: "돌아간다", action: "leave_dungeon_after_boss"},
                    {text: "조금 더 둘러본다", action:"continue_dungeon_after_boss"}
                ]
            }
        ],
        sewer_white_flower_grave_repeat: [
            {
                type : "text",
                value : "하얀꽃의 무덤이다. 바람 소리 말고는 아무 소리도 들리지 않는다."
            },
            {
                type : "choice",
                choices : [
                    { text: "돌아간다", action: "leave_dungeon_after_boss" },
                    { text: "조금 더 둘러본다", action: "continue_dungeon_after_boss" }
                ]
            }
        ]
    },
    goblinCave : {
        goblin_rope: [
            {
                type : "text",
                value : "어두운 동굴을 지나가던 당신의 목으로 올가미가 날아들었다!"
            },
            {
                type : "check",
                stat : "dex",
                difficulty : 13,
                success : [
                    {
                        type : "text",
                        value : "당신은 올가미가 당신의 목에 닿기 전에 재빠르게 피했다. 어린 고블린들이 어둠 속에서 아쉽다는 듯 입맛을 다시며 당신을 쳐다보다가 스르르 어둠속으로 도망가버리는 모습이 보인다."
                    }
                ],
                fail : [
                    {
                        type : "text",
                        value : "당신은 올가미를 피하려고 했지만 피하지 못했다. 올가미가 당신의 목을 조여온다! 당신이 올가미에서 벗어나려고 발버둥치는 동안 작은 고블린 하나가 당신의 뒤로 달려들어 당신의 엉덩이에 붙었다. 그의 축축한 혀가 당신의 엉덩이골을 핥는다...! 당신이 어떻게든 올가미에서 벗어났을 때 작은 고블린은 이미 자취를 감춘 지 오래였다. 당신의 엉덩이 부분이 축축하다...."
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            changeArousal(player, getSensitivityArousalGain(player, "a", 15)),
                            changeSensitivity(player, "aSensitivity", 5);
                        }
                    }
                ]
            }
        ],
        goblin_trap_log : [
            {
                type : "text",
                value : "당신은 가시바닥 위에 통나무 외다리가 놓여있는 것을 발견했다. 지나가려면 저 가느다란 외다리를 건너가는 것밖에 답이 없다. 당신이 무게중심을 잡고 건너가려는 순간, 멀리 있던 어린 고블린이 통나무 다리를 마구 흔들기 시작했다." 
            },
            {
                type : "check",
                stat : "dex",
                difficulty : 13,
                success : [
                    {
                        type : "text",
                        value : "당신은 비틀거리기는 했지만 무사히 통나무를 건너갈 수 있었다. 어린 고블린은 당신이 통나무 다리에서 내리기 전에 줄행랑을 쳐버린지 오래였다. 당신은 새끼고블린이 도망치면서 떨어뜨린 고기를 주웠다. 먹을 수는 있을 거 같다."
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            addItem(player, ITEMS.consumable.meatPotion);
                        }
                    }
                ],
                fail : [
                    {
                        type : "text",
                        value : "당신은 흔들리는 통나무 다리에 균형을 잃고 넘어졌다. 당신은 가시바닥에 떨어지지는 않았지만 가랑이 사이로 통나무가 끼었다. 그 모습을 본 어린 고블린은 신나서 통나무 다리를 더 흔들었고 당신은 당신의 성기를 강제로 자극당하며 일어나지도 못하고 꾸물꾸물 몸을 이끌어야만 했다. 당신이 80% 정도 왔을까? 통나무 다리를 흔들던 새끼고블린은 통나무 다리를 놓고 달음박질했다. 당신은 아픈 중심을 부여잡고 통나무 다리를 마저 건넜다."
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            changeArousal(player, getSensitivityArousalGain(player, "c", 10)),
                            changeSensitivity(player, "cSensitivity", 5);
                        }
                    }
                ]
            }
        ],
        goblin_slayer : [
            {
                type : "text",
                value : "동굴을 지나가던 당신의 앞으로 큰 대검을 든 전사가 나타났다. 그의 대검에는 고블린 머리가 꽂혀있었다."
            },
            {
                type : "check",
                stat : "charm",
                difficulty : 13,
                success : [
                    {
                        type : "text",
                        value : "당신을 보고 매료당한 그는 온힘을 다해 당신을 응원했다. 오라오라오라, 고블린슬레이어의 킹왕짱 응원댄스! 드디어 미친 걸까. 하지만 당신은 어쩐지 몸이 가벼워진 느낌이 들었다. 자칭 고블린슬레이어는 응원댄스를 마친 후 멀어져갔다."
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            changeHP(player, 30),
                            changeStamina(player, 30);
                        }
                    }
                ],
                fail : [
                    {
                        type : "text",
                        value : "그는 밝은 목소리로 중얼거리며 고블린 고기는 맛있다고 말했다. <div style='color:red; font-style:italic'>고블린들이 내 가족을 먹어치웠듯이 나도 고블린들을 다 먹어치울 거야!</div> 그는 당신을 지나쳐갔다."
                    }
                ]
            }
        ]
    },
    banditHideout : {
        banditHideout_runner : [
            {
                type : "text",
                value : "조용히 길을 가던 도중, 당신은 도적으로 보이는 사람을 한 명 만났다. 그는 당신을 보고 움찔하더니 자신은 이 도적떼를 나갈 생각이니 제발 못 본 척하고 지나가달라고 말했다."
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "못 본 척 보내준다",
                        scene : [
                            {
                                type : "text",
                                value : "무기를 들지 않는 당신에게 그는 고맙다고 말했다. 그는 자신은 살고 싶어서 들어왔을 뿐인데, 여기 있다보니 그들이 하는 짓을 양심상 참아낼 수가 없었다고 털어놓았다." +
                                        "<br>\"난... 난 그저 살고 싶었을 뿐이었어.\"<br>"+
                                        "그가 부리나케 뛰어나가는 모습이 보인다. 잘 나갈 수 있을지, 아니면 결국 잡혀서 보복을 당할지 당신은 알 수 없다. 당신이 아는 건 지금까지 도적떼에 있다가 다시 마을로 돌아왔다는 사람은 본 적이 없다는 사실뿐이었다."
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, -1);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 그에게 성의를 보이라고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : "성의를 보이라는 당신의 말에 그의 얼굴이 굳었다. 그는 주머니를 더듬거리더니 덜덜 떨리는 손으로 100원을 당신에게 건넸다." +
                                        " 도적질을 하는데 100원밖에 없다고? 당신이 그를 쳐다보자 그는 벌벌 떨며 자신에게 남은 것은 이제 아무 것도 없다고 말했다. 그는 당신을 도적떼마냥 두려워하고 있다... 그는 100원을 당신에게 넘긴 후 그대로 도망쳐버렸다."
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeGold(player, 100);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 길을 비켜주지 않았다.",
                        scene : [
                            {
                                type : "text",
                                value : "당신이 무기를 쥐는 것을 본 도적은 나는 그저 살고 싶었을 뿐인데, 라고 주절거리며 무기를 들었다. 그는 당신을 원망하고 있다."
                            },
                            {
                                type : "effect",
                                run: (player) => {
                                    const enemyId = "bandit1";
                                    const enemy = ENEMIES[enemyId]();
                                    startBattle("bandit1", player, {
                                        onWin: () => startScene(buildDungeonScene(player), player),
                                        onEscape: () => startScene(buildDungeonScene(player), player),
                                        onLose: () => {runDefeatEvent(player, enemy);}
                                    });
                                    return true;
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        banditHideout_furious_child : [
            {
                type : "text",
                value : "조심스럽게 걸어가던 당신은 순간 당신의 몸쪽으로 무언가가 날아오는 것을 느꼈다. 독이 발린 투척단검이다!"
            },
            {
                type : "check",
                stat : "dex",
                difficulty : 15,
                success : [
                    {
                        type : "text",
                        value : "당신은 가뿐하게 독이 발린 투척단검을 피했다. 저 멀리에서 아이가 당신을 노려보고 있는 게 보인다. 도적떼의 나잇대가 다양하다고는 하지만 저런 아이들까지... 아이는 당신이 다가오자 누군가를 부르면서 뛰어갔고 당신은 어쩔 수 없이 아이와 반대 방향으로 몸을 숨길 수밖에 없었다."
                    }
                ],
                fail : [
                    {
                        type : "text",
                        value : "당신은 독이 발린 투척단검을 피하지 못했다! 저 멀리에서 아이가 당신을 습격할까 말까 고민하고 있는 것이 보인다. 그는 당신을 습격하려다가도 당신이 쓰러지지 않자 칫, 하는 소리와 함께 누군가를 부르면서 달아나버렸다. 당신은 어쩔 수 없이 아이와 반대 방향으로 몸을 숨길 수밖에 없었다."
                    },
                    {
                        type : "effect",
                        run: (player) => {
                            addStatusEffect(player, {
                                id: "poison",
                                name: "독",
                                damage: 4,
                                duration: 5
                            });
                        }
                    }
                ]
            }
        ],
        banditHideout_may_i_touch_b : [
            {
                type : "text",
                value : "당신은 모퉁이를 돌다가 한 도적이랑 마주쳤다. 그는 침입자인 당신을 보고 눈을 깜박이더니 능글맞은 미소를 지으며 당신을 위아래로 훑어보았다." +
                        "<br>\"여기서 싸움이 나면 피차 곤란한 건 마찬가지잖아?\"<br>"+
                        "그는 당신에게 당신의 가슴 딱 한번만 만지게 해주면 지나가게 해주겠다고 말했다."
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 어쩔 수 없이 그에게 가슴을 허락해주었다.",
                        scene : [
                            {
                                type : "text",
                                value : {
                                    male : "도적은 웃으면서 당신의 가슴을 주물렀다. 평평한 당신의 가슴을 주무르며 그는 남자치고는 당신의 가슴 느낌이 꽤 좋다고 말했다. 점점 더 집요하게 당신의 가슴을 괴롭히는 그의 손길에 당신은 자기도 모르게 몸을 꼬았다. 도적이 그 모습을 보며 웃었다. 그는 당신에게 당신은 수캐가 아니라 암캐같다고 말했다.<br><br>\"어떤 수캐가 이렇게까지 느끼겠어?\"<br><br>그는 당신의 가슴을 몇 번 더 주무른 후에야 당신을 놓아주었다.",
                                    female : "도적은 웃으면서 당신의 가슴을 주물렀다. 그는 남의 가슴에 피어싱을 박는 게 취미인 사람들이 많은데, 그들이 왜 그런 취미를 가지게 된건지는 네 가슴을 보니 알 거 같다고 말했다. 당신의 가슴이 위아래로 출렁인다. 그는 당신의 가슴골에 얼굴을 묻으며 딱 여기에 긴 막대가 있으면 좋지 않겠냐며 음탕하게 웃었다. <br><br>\"좋아, 좋아, 예쁜이. 난 어차피 떠날 생각이었으니 비켜주지.\"<br><br>그는 아쉽다는 듯 당신의 가슴을 몇 번 더 주무른 후에야 당신을 놓아주었다."
                                }
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeArousal(player, getSensitivityArousalGain(player, "b", 10)),
                                    changeSensitivity(player, "bSensitivity", 5);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 거부했다.",
                        scene : [
                            {
                                type : "text",
                                value : "도적은 능글맞은 미소를 얼굴에서 지우지 않았다. <br><br>\"네가 정 그렇다면야....\"<br><br>상급도적의 공격이 시작된다!"
                            },
                            {
                                type : "effect",
                                run: (player) => {
                                    const enemyId = "bandit2";
                                    const enemy = ENEMIES[enemyId]();
                                    startBattle("bandit2", player, {
                                        onWin: () => startScene(buildDungeonScene(player), player),
                                        onEscape: () => startScene(buildDungeonScene(player), player),
                                        onLose: () => {runDefeatEvent(player, enemy);}
                                    });
                                    return true;
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        banditHideout_box : [
            {
                type : "text",
                value : "지나가던 당신은 박스 하나를 발견했다. 단단히 닫혀있기 한데.... 어쩌면 열 수 있을지도 모른다!"
            },
            {
                type : "check",
                stat : "str",
                difficulty : 13,
                success : [
                    {
                        type : "text",
                        value : "당신은 상자를 세게 내리쳤고 상자는 부서졌다! 당신은 상자 안에서 요구르트를 얻었다. 야호!"
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            addItem(player, ITEMS.consumable.smallPotion);
                        }
                    }
                ],
                fail : [
                    {
                        type : "text",
                        value : "당신은 상자를 내리쳤지만 상자는 꿈쩍도 하지 않았다. 당신은 어쩔 수 없이 상자를 포기했다..."
                    }
                ]
            }
        ],
        bandit_secret_note : [
            {
                type : "text",
                value : "쪽지가 하나 바닥에 놓여있다" +
                        "<br><br><br>미친ㅋㅋㅋㅋ 여기 비밀구멍이 있었네. 나중에 여기로 도망가면 되겠다." +
                        "<br>그니까. 난 인신매매단까지는 하기 싫다고. 자기야, 우리 그럼 어디로 갈까. 하류도시 말고...." +
                        "<br>걍 소규모 정착지 가면 돼. 너만 있으면 우린" +
                        "<br><br><br>쪽지가 그 문장에서 끊겨져 있다. 급하게 나가다가 서로 주고받았던 비밀 쪽지를 떨어뜨리고 나간 모양이다.... 그들은 살았을까?"
            }
        ],
        bandit_experiment_note : [
            {
                type : "text",
                value : "실험실은 피로 가득했지만, 어쩐지 그 피에서는 달콤한 냄새가 났다. 당신은 책상 위에 있는 연구 일지를 보았다." +
                        "<br><br><br>연구일지 1" +
                        "<br>에라가 또 투정을 부리고 있어. 뭐만 하면 아프대. 약 때문에 안 아파야 하는 거 아니야? 왜 얘만 이러는 거야?" +
                        "<br><br>연구일지 2" +
                        "<br>분명 약을 먹을 때까지는 괜찮았는데, 다른 사람들이 점점 죽어나가고 있어. 이 일 그만하고 싶다. 대체 왜 하는 거지? 하지만 대장은 이걸로 떼돈을 벌 수 있다고 하고 있지... 그래. 대장 말대로 행복한 기분 속에서 죽은 거니까 죄책감 가지지 말자고. 어차피 죽일 사람들이었잖아." +
                        "<br><br>연구일지 3" +
                        "<br>나는 에라가 제일 먼저 죽을 줄 알았는데.... 최종생존자가 에라라니. 근데 이걸 살아있다고 말해도 되는 거야? 젠장. 차라리 밖에 나가서 목숨 걸고 싸우는 게 낫겠어. 내가 팔만 부러지지 않았더라도." +
                        "<br><br>연구일지 4" +
                        "<br><strong style='color:blue'>내가 먼저 죽을 줄 알았어? 히히히히 에라는 언제나 최종생존자야!</strong>" +
                        "<br><br>연구일지 5" +
                        "<br>에라는 죽었다. 그들은 에라의 시체를 가져가겠다고 했다. 우리는 반대하지 않았다. 그 시체를 더 보고 싶어하는 사람들은 우리 중에 없다. 이 실험이 마지막이었으면 좋겠는데 대장은 떼돈을 벌었다고 좋아했다. 아니. 대장뿐만 아니라 많은 사람들이 좋아했다. 우리 하류도시가 싫어서 나왔잖아. 그런데" +
                        "<br><br><br>이후의 연구일지는 찢겨져 있었다. 누군가 찢어버린 모양이다."
            }
        ],
        bandit_research_note : [
            {
                type : "text",
                value : "연구자료실이다. 당신은 메모 한 장을 발견했다." +
                        "<br><br><br>에라 사건 이후로 우리는 돈이 많아졌다. 실험은 계속된다. 보고도 계속된다. 우리같은 도적떼들이 많은 걸까? 나는 윗사람들의 생각은 알 수가 없다. 그래서 다음 후임자에게 맡긴다." +
                        "<br>네가 만약 살아남고 싶다면, 네가 하는 일에 절대로 의문을 가지지 마." +
                        "<br><br><br>당신은 옆에서 메모를 하나 더 발견했다." +
                        "<br><br><br>그들은 더 이상 돈을 주지 않는다. 내가 열심히 실험 결과를 써서 보냈건만! 대체 무슨 일이지? 우리는 이제 돈이 없다. 그웰이 우리에게 마을 습격을 제안했다. 그는 경비병의 경계가 언제가 제일 취약한 지 아주 잘 알고 있었다. 내 옆에 있던 놈이 그웰에게 그래도 같이 밥 먹었던 사이들을 죽이는 건데 괜찮냐고 묻자 그는 코웃음을 쳤다. 그들은 멍청한 놈들이라고. 역시 뒤통수를 조심해야겠다."
            }
        ],
        bandit_corpse_room : [
            {
                type : "text",
                value : "시체방이라고 써있는 곳이다. 하지만 시체방에서는 퀘퀘한 냄새가 아니라 달콤한 냄새만 풍기고 있었다." +
                        "...게다가 시체는 없었다. 다 녹아버린 걸까? 그저 하얀꽃잎들만이 바닥에 수북하게 쌓여있을 뿐이다."
            }
        ],
        bandit_prison_room_repeat: [
            {
                type: "text",
                value: "포로들은 불안한 눈으로 자신의 불확실한 미래를 기다리고 있다."
            }
        ]
    }
}

//스토리 던전용
//하수구 undercity_02
function handleSewerBossWin(player){
    player.flags = player.flags || {};
    const hasDeepSewer =
        player.quest?.active?.id === "undercity_story_02";

    if (hasDeepSewer){
        player.flags.undercity_story_02_done = true;
    }

    startScene([
        {
            type: "text",
            value: hasDeepSewer
                ? "보스를 쓰러뜨리자, 무너진 벽 틈 사이로 이전에는 보이지 않던 빈 구멍이 보인다."
                : "보스를 쓰러뜨렸다. 던전 밖으로 돌아가시겠습니까?"
        },
        {
            type: "choice",
            choices: [
                { text: "돌아간다", action: "leave_dungeon_after_boss" },
                { text: "조금 더 둘러본다", action: "continue_dungeon_after_boss" }
            ]
        }
    ], player);
}
//고블린동굴 undercity_04
function handleGoblinKingWin(player){
    player.flags = player.flags || {};

    startScene([
        {
            type: "text",
            value:
                "당신은 고블린킹을 쓰러뜨렸다. 고블린킹이 쓰러지자 숨어서 결투의 승패를 기다리고 있던 고블린들은 끼기긱 소리를 내며 서로를 쳐다보았다. 몇 놈은 도망갔고 몇 놈은 당신에게 달려들었다. 당신은 고블린들과 대면하며 무기를 바로잡았다." +
                "그때 폭발음과 함께 동굴 한쪽 면이 푹 꺼졌다. 폭발음이 너무 커서 고블린들의 비명 소리는 들리지도 않았다. 희뿌연 안개 사이로 당신은 사람들을 보았다. 몇몇은 다리를 질질 끌고 있었고, 몇몇은 아예 걷지도 못해 다른 누군가에게 부축당하고 있었다. 당신은 가운데에 있는 사람을 보았다. 유리다." +
                "유리는 당신을 보더니 미소를 지었다. 그는 당신이 없었다면 자신은 이들을 구출하지 못했을 거라고 말했다. <br><br>" +
                "\"쉘터로 돌아갈까, {playerName}.\"<br><br>" +
                "그는 당신에게 다가오더니 당신의 상처에 약을 바르고 붕대를 매주었다. 그는 능숙하게 당신을 치료해준 후 한 아이를 안아들고 당신과 같이 동굴밖으로 나갔다."
        },
        {
            type : "effect",
            run : (player) => {
                changeHP(player, 100);
                changeStamina(player, 100);
                changeNPCEmotion("yuri", "affection", 5);

                resolveGoblinStoryQuest(player);

                savePlayer(player);
            }
        },
        {
            type : "effect",
            run : (player) => {
                startPaleChaseEvent(player);
                return true;
            }
        }
    ], player);
}

function handleGoblinPrisonRoom(player){
    player.flags = player.flags || {};
    player.flags.goblinCaveShortcut = true;
    savePlayer(player);

    if (!isGoblinStoryActive(player)){
        showSingleTextScene(
            "살과 살이 맞부딪히는 소리와 함께 포로들의 비명 섞인 신음 소리가 들린다. 그들은 이미 고블린들의 인간 가축으로 전락해있었다. 여자는 물론이고, 몇명은 남자인데도 배가 불룩하게 올라있었다. 그들의 다리 사이로 뚝뚝 흘러내리는 정액은 이미 웅덩이를 몇개나 만든 후다. 방 안에 있는 고블린들이 너무 많아서 지금은 덤비면 안 될 거 같다.",
            player
        );
        return;
    }

    if (!player.flags.goblin_prison_yuri_seen){
        player.flags.goblin_prison_yuri_seen = true;
        savePlayer(player);

        startScene([
            {
                type: "text",
                value:
                    "포로방에 도착했을 때 당신은 익숙한 인영을 보았다. 유리다. 그는 포로들의 상처를 치료하고 있었다. 몇몇 고블린들의 머리통과 머리통없는 시체들이 바닥에 굴러다니고 있다." +
                    " 유리는 당신의 인기척에 단검을 들고 뒤를 돌았다가, 당신을 알아보고 미소를 지었다. 그는 당신에게 이들을 구출하러 온 거냐고 물었다." +
                    "<br><br>\"구출하고 싶은데... 이들을 다 데리고 나가기에는...\"<br><br>"+
                    "부상자들이 너무 많았다. 그리고 무엇보다도, 유리의 몸상태도 그리 좋아보이지는 않았다. 상처 위로 연고를 바르고 붕대로 감싸긴 했지만 출혈이 있는지 붕대에서는 계속 피가 새어나오고 있었다."+
                    " 당신이 포로방을 떠나려고 하자 유리가 당신의 팔을 붙잡았다. <br><br>"+
                    "\"잠깐만... 이거라도.\"<br><br>"+
                    "유리가 당신의 상처를 치료해준다. 그는 당신의 손에 비타민을 쥐어주며 이것밖에 못 해줘서 미안하다고 말했다. 그에게 마지막 남은 회복물약이었던 듯하다."
            },
            {
                type : "effect",
                run : (player) => {
                    changeHP(player, 100);
                    addItem(player, ITEMS.consumable.mediumPotion);
                }
            }
        ], player);

        return;
    }

    showSingleTextScene(
        "유리는 포로들의 상처를 치료하고 있었다. 그는 지금은 승산이 없다는 걸 깨닫고 다음 번에 다시 와야 하나 고민하는 것처럼 보였다.",
        player
    );
}

function isGoblinStoryActive(player){
    return ["undercity_story_03", "undercity_story_04"]
        .includes(player.quest?.active?.id);
}

function resolveGoblinStoryQuest(player){
    player.flags = player.flags || {};
    initQuestData(player);

    const activeId = player.quest.active?.id;

    if (activeId === "undercity_story_03"){
        player.flags.undercity_story_03_done = true;
        player.flags.undercity_story_04_unlocked = true;
        player.flags.story_goblin_cave_known = true;
        player.flags.story_goblin_cave_visible = false;
        player.flags.undercity_story_04_ready = true; // 04까지 해결했지만 보고 전

        player.quest.active.progress = 1;
        return;
    }

    if (activeId === "undercity_story_04"){
        player.flags.undercity_story_04_ready = true;
        player.flags.story_goblin_cave_visible = false;
        player.quest.active.progress = 1;
        return;
    }
}

//undercity06 도적떼 소굴 이벤트
window.banditHideout_ignore_luke = function(player){
    player.flags = player.flags || {};
    player.flags.bandit_luke_ignored = true;
    player.flags.bandit_luke_path_closed = true;

    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "당신은 들어가려다가 말았다. 방안에 적이 한 명만 있는 건 아닌 거 같았지만, 당신은 어쨌든 들어가지 않았다. 당신은 등을 돌리고 그 자리를 벗어났다."
        }
    ], player, {
        onEnd: () => startScene(buildDungeonScene(player), player)
    });
};

window.banditHideout_follow_luke = function(player){
    player.flags = player.flags || {};
    player.flags.bandit_luke_followed = true;
    savePlayer(player);
    startScene([
        {
            type : "text",
            value :
                "당신은 조심스럽게 화려한 문을 열었다. 뒤에서 열리는 문소리에 루크가 당신을 돌아보았다. <br><br>\"너....\"<br><br> 루크의 말이 끝나기도 전에 앞에 있던 놈이 루크의 얼굴 쪽으로 칼을 휘둘렀다. 루크는 본능적으로 뒤로 물러났지만 그의 눈 아래로 피가 흘러내렸다." +
                "<br><br>\"그웰!\"<br><br>" +
                "루크는 그의 이름을 격분하여 불렀다. 그웰이라고 부른 자는 비릿하게 미소를 지으며 그러니까 누가 정신을 팔고 있냐고 물었다. 그웰의 시선이 당신에게 닿았다."+
                "<br><br>\"넌 루크한테 그렇게 당하고서도 구하러 오나 보네? 구원자병이라도 있나 보지?\"<br><br>" +
                "\"너는... {lukeTitle} 욕할 자격이 없어, 이새끼야.\"<br><br>" +
                "루크가 그에게 달려든다. 그때 당신은 루크의 뒤로 달려드는 상급도적을 감지했다! 당신은 루크의 뒤에 서며 상급도적의 공격을 막아냈다. 상급도적과의 전투가 시작된다...!"
        }
    ], player, {
        onEnd : () => {
            startBattle("bandit2", player, {
                noEscape: true,
                
                onWin: () => {
                    startBanditLukeFightWin(player);
                },
                onSkipDefeat: () => {
                    startBanditLukeFightLose(player);
                },

            customTurnEvents : {
                1 : () => {
                    log("그웰 : 나보다 더 밑바닥이었으면서, 에릭 눈에 한번 들었다고 에릭의 개라도 된 모양인데! 어차피 그새끼는 네가 필요가 없어지면 널 가차없이 버릴 거다!", "special");
                },

                2 : () => {
                    log("루크 : 내가 그딴 걸 신경쓸 거 같나? 난 어차피 아무도 안 믿어.", "luke");
                },

                3 : () => {
                    log("루크 : 그래서, 씨발, 도적떼에 붙어서 먹는 밥은 맛있었나?", "luke");
                },

                4 : () => {
                    log("그웰 : 크악! 내 눈!!", "special");
                },

                5 : () => {
                     log("루크 : 물었잖아. 너와 같이 밥 먹고 있던 새끼들을 죽이고 먹는 밥은 맛있었냐고. 아니면 윗사람들 얼굴을 한번이라도 봐서 좋았나? 아쉽게 되었군. 그들은 다 처분당했다는데.", "luke");
                },

                6 : () => {
                    log("그웰 : 처분? 하. 넌 그들이 도덕 때문에 처분당했다고 생각하나? 순진한 척하지... 끄아아아악!", "special");
                },

                7 : () => {
                    log("그웰 : 기다려, 제발! 난, 난 그저 살고 싶었을 뿐이야! 배부르게 먹고 살고 싶었을 뿐이라....", "special");
                },

                8 : () => {
                    log("루크 : 이제 와서 목숨을 구걸하기에는 늦었어, 버러지새끼야.", "luke");
                }
            }
            });
        }
    });
}

window.startBanditLukeFightWin = function(player){
    startScene([
        {
            type: "text",
            value:
                "당신은 상급도적을 쓰러뜨렸다. 당신은 숨을 고르며 루크를 돌아보았다. 그웰은 루크에게 제발 살려달라고 빌고 있었다. 하지만 루크는 그대로 그웰의 목에 너클을 박아넣었다. 분수처럼 쏟아져나오는 피에 가시너클이 붉은색으로 물든다." +
                " 루크는 가시너클에 묻은 피를 털어내지도 않고 그대로 담배를 하나 꺼내 입에 물었다. 그러더니 그는 당신을 바라보았다." +
                "<br><br>\"{lukeTitle}. 불.\"<br><br>"
        },
        {
            type : "choice",
            choices : [
                {
                    text : "당신은 루크의 담배에 불을 붙여주었다.",
                    scene : [
                        {
                            type : "text",
                            value : "루크는 깊게 담배를 빨았다. 무슨 생각을 하고 있는 건지 그의 자안은 평소와 다르게 잔잔하고 깊었다. 하지만 그것도 몇 초일 뿐, 그는 입꼬리를 들어올리며 그 특유의 사악한 미소를 지어보였다." +
                                    "<br><br>\"너 뒤질 뻔한 거 아냐?\"<br><br>" +
                                    "그는 눈위로 자꾸만 흘러내리는 피를 닦아내더니 뒤질 뻔했으니 이번만 봐주는 거라고 말했다. 그가 당신에게 다가온다. 그리고 그는 당신의 상처를 치료하기 시작했다. 그의 손길은 거칠긴 했지만 그래도 어떻게든 당신의 상처를 치료해주긴 했다. 다른 사람들을 제대로 치료해준 적은 없는 모양이다...." +
                                    "그러더니 그는 트로피방으로 향했다. 트로피방의 문이 열린다."
                        },
                        {
                            type : "effect",
                            run : (player) => {
                                changeHP(player, 100);
                                changeStamina(player, 100);
                                changeNPCEmotion("luke", "affection", 8);
                                changeNPCEmotion("luke", "rage", -5);
                                passTime(player, 5);
                                savePlayer(player);        
                            }
                        }
                    ]
                },
                {
                    text : "당신은 거절했다.",
                    scene : [
                        {
                            type : "text",
                            value : "루크는 당신의 거절에 이번만 봐주는 거라고 말하며 픽 웃었다. 그러더니 그는 제 라이터로 자신의 담배 위로 불을 지폈다. 그렇게 1초, 2초.... 생각에 잠겨있던 그는 당신을 위아래로 훑어보았다." +
                                    "<br><br>\"이리와봐.\"<br><br>" +
                                    "당신이 좋거나 싫다고 대답하기도 전에 그는 당신을 끌어당기더니 거친 손으로 당신의 상처를 치료해주었다. 정말 거칠다.... 당신이 인상을 찌푸리자 루크는 딱 여기까지만 봐주겠다고 말하면서 입술을 씰룩였다. 조금 아프긴 했지만, 그래도 어떻게든 그는 당신의 상처를 치료해주긴 했다. 다른 사람들을 제대로 치료해본 적은 없는 모양이다...." +
                                    "그러더니 그는 트로피방으로 향했다. 트로피방의 문이 열린다."
                        },
                        {
                            type : "effect",
                            run : (player) => {
                                changeHP(player, 100);
                                changeStamina(player, 100);
                                changeNPCEmotion("luke", "affection", 6);
                                changeNPCEmotion("luke", "rage", -5);
                                passTime(player, 5);
                                savePlayer(player);        
                            }
                        }
                    ]
                }
            ]
        }
    ], player, {
        onEnd: () => startBanditLukeTrophyRoom(player)
    });
};

window.startBanditLukeFightLose = function(player){
    startScene([
        {
            type : "text",
            value : "당신은 상급도적의 공격을 버티지 못하고 쓰러졌다. 이제 끝이라고 생각했을 때, 억 하는 소리와 함께 당신에게 달려들던 도적이 옆으로 쓰러졌다. 피다. 그의 입에서 역류한 피가 당신을 붉은색으로 물들인다. 그리고 그순간 큭, 하는 소리가 났다. 당신은 간신히 눈을 떠서 루크를 바라보았다." +
                    " 루크의 뒤에 있던 그웰이 루크를 찌른 모양이다. 다행히 피해서 옆구리만 맞긴 했지만... 당신의 눈이 커졌다. 하지만 루크는 오히려 으르렁거리며 그딴 표정 짓고 있지 말라고 했다. 그리고 그는 쓰러져있는 당신을 내버려두고 다시 그웰에게 달려들었다. 그들이 싸우는 동안 당신은 아무 것도 할 수 없었다." +
                    " 흐릿해진 청각으로 몇 번의 금속음이 더 들려왔을까. 어느 순간 금속음은 멈췄고 커다란 그림자가 당신을 덮어왔다. 욕을 하면서 거친 손길이 당신의 몸으로 뻗어온다. 당신은 눈을 질끈 감았다. 하지만 당신이 예상했던 고통은 느껴지지 않았다." +
                    " 다시 눈을 떴을 때 루크는 당신의 앞에 담배를 피며 앉아있었다. 당신이 일어난 걸 눈치채지 못하고 허공을 노려보던 루크는 당신의 인기척에 인상을 찌푸리며 고개를 돌렸다. 그의 옆구리에는 어설프지만 피는 새어나오지 않는 붕대가 둘러져있다." +
                    "<br><br>\"{lukeTitle}, 쌤쌤이다.\"<br><br>" +
                    "그는 딱 그렇게만 말했다. 그리고 트로피방으로 걸어갔다. 당신은 전보다 훨씬 가뿐해진 몸으로 그의 뒤를 쫓았다."
        },
        {
            type: "effect",
            run: (player) => {
                changeHP(player,100);
                changeStamina(player, 100);
                changeNPCEmotion("luke", "affection", 4);
                changeNPCEmotion("luke", "dominance", 10);
                passTime(player, 30);
                savePlayer(player);
            }
        }
    ], player, {
        onEnd: () => startBanditLukeTrophyRoom(player)
    });
};

window.startBanditLukeTrophyRoom = function(player){
    player.flags = player.flags || {};
    player.flags.bandit_luke_event_done = true;
    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "화려한 트로피방, 그리고 거기엔 찢어진 제복들로 가득했다. 게다가 이름표도 전부 뜯어져있었다. <br>이곳은, 경비병단을 정면으로 비웃는 트로피 방이었다." +
                "<br><br>\"...꺼져.\"<br><br>" +
                "루크는 한동안 제복들을 바라보다가 그렇게 말했다."
        },
        {
            type: "choice",
            choices: [
                {
                    text: "당신은 그에게 여기 도적떼를 소탕할 생각은 없냐고 물었다.",
                    scene: [
                        {
                            type: "text",
                            value:
                                "\"신경 끄라고 했을 텐데.\"<br><br>" +
                                "루크는 바닥에 떨어져 있던 단검 하나를 주워 당신에게 던졌다. 그리고 뒤를 돌았다. 더 이상 당신과 말을 하지 않을 생각인 거 같다." +
                                "<br>당신은 화려한 방에서 나갔다. 몇 걸음 옮기지 않았을 때 뒤에서 큰 소리가 들려왔다. 뒤를 돌아보니 화려한 방은 활활 타오르고 있었다...."
                        },
                        {
                            type: "effect",
                            run: (player) => {
                                addItem(player, ITEMS.weapon.dancingdagger);
                                player.dungeon.room = "r9c6";
                                savePlayer(player);
                            }
                        }
                    ]
                },
                {
                    text: "당신은 그에게 괜찮냐고 물었다.",
                    scene: [
                        {
                            type: "text",
                            value:
                                "그 말이 들리자마자 루크는 당신을 벽으로 세게 밀어붙였다. 그의 사나운 자안이 당신을 노려본다.<br><br>\"한번만 더 그딴 눈으로 쳐다보면....\"<br><br>뒷말은 말하지 않아도 알 수 없었다. 어쩐지 당신의 그 말에 더 화가 나버린 거 같다.... 그는 고개를 돌리더니 당신에게 대검 하나를 던졌다. 가져가라는 듯이. 더 이상 루크에게 말을 걸 수 없을 거 같다." +
                                "<br>당신은 화려한 방에서 나갔다. 몇 걸음 옮기지 않았을 때 뒤에서 큰 소리가 들려왔다. 뒤를 돌아보니 화려한 방은 활활 타오르고 있었다...."
                        },
                        {
                            type: "effect",
                            run: (player) => {
                                addItem(player, ITEMS.weapon.dancingdagger);
                                player.dungeon.room = "r9c6";
                                savePlayer(player);
                            }
                        }
                    ]
                }
            ]
        }
    ], player, {
        onEnd: () => startScene(buildDungeonScene(player), player)
    });
};

function runDungeonBossIntro(player, introId){
    if (introId === "banditBoss_intro"){
        player.flags = player.flags || {};

        if (player.flags.banditBoss_firstLose){

            startScene([
                {
                    type:"text",
                    value: "당신은 다시 한번 더 큰 문을 열었다. 도적두목이 당신을 돌아보더니 어이없어하며 한숨을 쉬었다. <br>\"애새끼들이 빠져가지고...\"<br>그는 한번 더 당신을 쓰러뜨릴 생각이다."
                }
            ], player, {
                onEnd: () => startBanditBossBattle(player)
            });

            return;
        }

        player.flags.seen_banditBoss_intro = true;
        savePlayer(player);

        startScene([
            {
                type: "text",
                value:
                    "당신은 거대한 문을 열고 들어갔다. 당신은 화려한 금은보화라도 있을 줄 알았다. 하지만 도적대장의 방에는 보석조각들만 몇 개 있을 뿐, 당신이 생각했던 방의 모습이 아니었다. 도적대장은 문을 열고 들어온 당신을 응시했다. 그가 짚고 있던 책상 위에는 금은보화가 아니라 장부와 찢어진 보고서밖에 없었다." +
                    "<br><br>\"바로 옆에서 굶어 죽어가는 사람을 보면서 네 살이라도 떼어내주고 싶다는 생각을 한 적이 있나?\"<br><br>" +
                    "그는 투척단검을 손위에서 돌리며 비릿한 미소를 지었다." +
                    "<br><br>\"우리가 괴물이라고? 틀린 말은 아니지. 원래 굶긴 쪽보다 굶주린 쪽에서 괴물이 먼저 태어나는 법이니까.\""
            },
            {
                type: "choice",
                choices: [
                    {
                        text : "당신은 말없이 무기를 들었다.",
                        scene : [
                            {
                                type : "text",
                                value : "당신이 말없이 무기를 들자 도적대장도 더 이상 말을 하지 않았다. 그의 투척단검이 당신을 향해 날아온다...!"
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    startBanditBossBattle(player);
                                    return true;
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 그에게 악행은 어떤 일로도 변명할 수 없다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : "당신의 말에 도적대장은 재밌다는 듯이 웃었다. 하지만 입가와 다르게 그의 눈동자는 다른 것을 바라보고 있는 것처럼 느껴진다. 그는 당신에게 당신은 바보거나 강한 사람인 거라고 말했다. <br><br>\"...그리고 세상 모든 사람들이 너처럼 바보거나 강한 건 아니야.\"<br><br>그는 투척단검을 돌렸다. 전투가 시작된다...!"
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    startBanditBossBattle(player);
                                    return true;
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 비릿하게 웃으며 너만 괴물인 건 아니라고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : "당신의 말에 도적대장은 멈췄다가 크하하 웃음을 터뜨렸다. <br><br>\"그렇군. 알량한 도덕심이 아니라 내 목에 걸린 돈 떄문에 온 거였군!\"<br><br>그는 적으로 만나지 않았더라면 당신을 제 부하로 삼고 싶어했을 거라고 말했다. 칭찬같지 않은 칭찬이 끝나기도 전에 그가 던진 투척단검이 당신의 목을 향해 날아온다...!"
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    startBanditBossBattle(player);
                                    return true;
                                }
                            }
                        ]
                    }
                ]
            }
        ], player);
    }
}

window.startBanditBossBattle = function(player){
    startBattle("banditBoss", player, {
        noEscape: true,
        onWin: () => {
            player.flags = player.flags || {};
            player.flags.defeated_banditHideout_banditBoss = true;
            savePlayer(player);

            handleDungeonBossWin(
                player,
                getCurrentDungeon(player),
                getCurrentDungeonRoom(player)
            );
        },
        onSkipDefeat : () => {
            startBanditBossLose(player);
        }
    });
};

function handleBanditBossWin(player){
    player.flags = player.flags || {};

    player.flags.undercity_story_06_done = true;
    player.flags.banditHideout_cleared = true;

    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "도적대장은 쓰러졌다. 당신은 쓰러진 도적대장의 옆으로 책상 위의 장부와 찢어진 보고서를 살펴보았다. 죽인 사람들은 분명 많을 텐데, 역시 죽인 사람들의 기록은 없고 훔친 물건들의 기록만 남아있었다. 당신은 천천히 기록들을 읽었다. 훔친 물건들의 량은 똑같았지만 들어오는 돈의 양은 어느 순간부터 현저하게 줄었다." +
                " 당신은 장부를 더 읽어내려갔다. 숫자 옆에 써있는 낙서들.... 그들은 물건만 뺴앗는 게 아니라 인간을 사로잡아서 인신매매를 할 계획까지 세우고 있었던 것처럼 보였다. 당신이 이들은 막지 않았더라면 하류도시 사람들은 더 큰 고통을 받았을 것이다. 이번 하류도시의 습격도 인신매매를 위한 초석이었을 수도 있겠다..." +
                "<br>이 도적떼들만 그런 생각을 가지고 있었던 거라고 확신할 수는 없지 않나.<br>" +
                "인신매매단이 갑자기 마을을 습격해온다면? 그들의 무기로 하류도시를 습격해온다면.... 당신은 도적대장의 시체를 내려다보았다. 그의 허벅지에 위화감이 느껴져서, 당신은 그의 허벅지를 살폈다. 무슨 살덩어리를 떼어낸 것처럼 그의 안쪽 허벅지는 움푹 파여있었다." +
                "<br>당신은 고개를 들었다. 어쨌든 오늘도 당신은 살아남았다."
        },
        {
            type: "choice",
            choices: [
                { text: "던전 밖으로 돌아간다", action: "leave_dungeon_after_boss" },
                { text: "조금 더 둘러본다", action: "continue_dungeon_after_boss" }
            ]
        }
    ], player);
}

function startBanditBossLose(player){
    player.flags = player.flags || {};

    if (!player.flags.banditBoss_firstLose){

        player.flags.banditBoss_firstLose = true;

        startScene([
            {
                type:"text",
                value:
                    "당신은 도적두목을 이기지 못하고 쓰러졌다. 그는 누군가에게 당신을 처리하라고 했고 당신은 누군가에게 끌려가고 있다. <br>\"어차피 이새끼로 실험한다고 해도 돈은 못 받는 거 아니야?\"<br>\"에라같은 애가 나오면 그들이 우리를 다시 봐줄 수도 있지.\"<br>" +
                    "<br>당신은 그들이 당신의 팔에 영양제 주사를 넣는 걸 본다. 그들이 당신을 연구실 침대에 묶기 위해 뒤를 돌았을 때 당신은 그 틈을 놓치지 않았다. 그들이 다시 돌아왔을 때는 빈 침대뿐이었다."
            },
            {
                type:"effect",
                run:(player)=>{
                    player.dungeon.room = "r1c0";
                    changeHP(player, 30);
                    savePlayer(player);
                }
            }
        ], player);

        return;
    }

    player.dungeon.room = "r1c0";
    changeHP(player, 30);

    startScene([
        {
            type:"text",
            value:
                "당신은 또 두적두목에게 져서 쓰러졌다. 그가 이번에는 확실히 당신을 처리하라고 당부하는 소리가 들린다. 당신은 그들이 당신에게 영양제 주사를 투여해줄 거라는 걸 알고 있다. 당신은 기다렸다가 그들이 영양제 주사를 놓고 돌아선 순간, 또 다시 온 기회를 놓치지 않았다. 숨어있는 당신의 뒤로 그들이 난 이제 뒤졌다고 경악하는 소리가 들린다."
        }
    ], player);
}
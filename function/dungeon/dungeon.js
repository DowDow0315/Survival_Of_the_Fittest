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
        {type : "battle", enemy : "goblin", weight: 40},
        {type : "event", id : "goblin_rope", weight: 20},
        {type : "event", id : "goblin_trap_log", weight: 20},
        {type : "event", id : "goblin_meatMeat", weight : 10},
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
            r9c6: { name: "화려한 복도", exits: { up : "r8c6", right: "r9c7" }, roomEvent: "bandit_luke_event", noEncounter: true },
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
            r3c2: { name: "통로 길목", exits: { left: "r3c1", right: "r3c3", up : "r2c2" } },
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
            { type: "battle", enemy: "bandit1", weight: 30 },
            { type: "battle", enemy: "bandit2", weight: 10 },
            {type : "event", id : "banditHideout_runner", weight: 5},
            {type : "event", id : "banditHideout_furious_child", weight: 20},
            {type : "event", id : "banditHideout_may_i_touch_b", weight: 10},
            {type : "event", id : "banditHideout_box", weight: 15},
            {type : "event", id : "banditHideOut_food", weight: 15}
        ]},

    whiteFlowerLab : {
        id : "whiteFlowerLab",
        name : "외곽 연구시설",
        startRoom : "r7c3",

        layout : [
            ["r0c0", "r0c1",     "", "r0c3", "r0c4", "r0c5", "r0c6", "r0c7", "r0c8"],
            ["r1c0",     "",     "", "r1c3",     "",     "",     "", "r1c7",     ""],
            ["r2c0", "r2c1",     "", "r2c3",     "", "r2c5", "r2c6",     "",     ""],
            [""    , "r3c1",     "", "r3c3",     "",     "", "r3c6",     "", "r3c8"],
            [""    , "r4c1", "r4c2", "r4c3", "r4c4", "r4c5", "r4c6",     "", "r4c8"],
            ["r5c0", "r5c1",     "", "r5c3",     "",     "", "r5c6", "r5c7", "r5c8"],
            [""    , "r6c1",     "", "r6c3",     "",     "", "r6c6",     "", "r6c8"],
            [""    ,     "",     "", "r7c3",     "",     "",     "",     "",     ""]
        ],

        rooms : {
            r0c0 : { name : "하얀꽃방", exits: {right : "r0c1", down : "r1c0"}, event : "whiteFlowerLab_soldier", seenFlag : "whiteFlowerLab_lukeSoldier" },
            r0c1 : { name : "비밀방", exits : { left : "r0c0" }, event : "whiteFlowerLab_erwin", seenFlag : "whiteFlowerLab_erwin" },
            r0c3 : { name : "백색 복도의 끝", exits : { down : "r1c3", right : "r0c4" } },
            r0c4 : { name : "중추로 가는 길A", exits : { left : "r0c3", right : "r0c5" } },
            r0c5 : { name : "중추로 가는 길B", exits : { left : "r0c4", right : "r0c6" } },
            r0c6 : { name : "중추로 가는 길C", exits : { left : "r0c5", right : "r0c7" } },
            r0c7 : { name : "중추실 앞", exits : { left : "r0c6", right : "r0c8", down : "r1c7" } },
            r0c8 : { name : "중추실", exits : { left : "r0c7" }, boss: "infectedSmalls", bossIntro:"infectedSmalls_intro" },
            
            r1c0 : { name : "하얀꽃잎들로 뒤덮인 복도", exits : { up : "r0c0", down : "r2c0" } },
            r1c3 : { name : "백색 복도 통로6", exits : { up : "r0c3", down : "r2c3" } },
            r1c7 : { name : "중추실 옆 작은 방", exits : { up : "r0c7" }, safeZone: true, allowRest: true },
            
            r2c0 : { name : "코너길", exits : { up : "r1c0", right : "r2c1" } },
            r2c1 : { name : "출입금지실", exits : { left : "r2c0", down : "r3c1" } },
            r2c3 : { name : "백색 복도 통로5", exits : { up : "r1c3", down : "r3c3" } },
            r2c5 : { name : "실험실A", exits : { right : "r2c6" }, event : "whiteFlowerLab_experimentA" },
            r2c6 : { name : "실험실 복도 코너", exits : { left : "r2c5", down : "r3c6" } },
            
            r3c1 : { name : "출입금지실 앞", exits : { up : "r2c1", down : "r4c1" } },
            r3c3 : { name : "백색 복도 통로4", exits : { up : "r2c3", down : "r4c3" } },
            r3c6 : { name : "피묻은 실험실 복도B", exits : { up : "r2c6", down : "r4c6" } },
            r3c8 : { name : "폐기실", exits : { down : "r4c8" }, chest: "whiteFlowerLab_chest" },
            
            r4c1 : { name : "하얀꽃잎이 떨어져있는 복도", exits : { up : "r3c1", down : "r5c1", right : "r4c2" }, chest: "whiteFlowerLab_chest" },
            r4c2 : { name : "옆으로 새어나가는 통로", exits : { left : "r4c1", right : "r4c3" } },
            r4c3 : { name : "백색 복도 통로3", exits : { up : "r3c3", left : "r4c2", right : "r4c4", down : "r5c3" } },
            r4c4 : { name : "실험실 입구", exits : { left : "r4c3", right : "r4c5" } },
            r4c5 : { name : "실험실 출입 복도", exits : { left : "r4c4", right : "r4c6" } },
            r4c6 : { name : "피묻은 실험실 복도A", exits : { up : "r3c6", left : "r4c5", down : "r5c6" } },
            r4c8 : { name : "폐기실 앞", exits : { up : "r3c8", down : "r5c8" } },

            r5c0 : { name : "직원 숙소", exits : { right : "r5c1" }, event : "whiteFlowerLab_researcherDiary" },
            r5c1 : { name : "거주지 앞", exits : { up : "r4c1", left : "r5c0", down : "r6c1" } },
            r5c3 : { name : "백색 복도 통로2", exits : { up : "r4c3", down : "r6c3" } },
            r5c6 : { name : "피묻은 통로", exits : { up : "r4c6", right : "r5c7", down : "r6c6" } },
            r5c7 : { name : "피묻은 통로2", exits : { left : "r5c6", right : "r5c8" } },
            r5c8 : { name : "급식실로 가는 통로", exits : { left : "r5c7", up : "r4c8", down : "r6c8" } },
            
            r6c1 : { name : "감방", exits : { up : "r5c1" }, event : "whiteFlowerLab_prison" },
            r6c3 : { name : "백색 복도 통로1", exits : { up : "r5c3", down : "r7c3" }, chest: "whiteFlowerLab_chest" },
            r6c6 : { name : "실험실B", exits : { up : "r5c6" }, event : "whiteFlowerLab_experimentB" },
            r6c8 : { name : "급식실", exits : { up : "r5c8" }, chest : "whiteFlowerLab_fixed_chest", event : "whiteFlowerLab_cafeteria", seenFlag : "whiteFlowerLab_cafeteria" },
            
            r7c3 : { name : "실험실 출입문", exits : { up : "r6c3" } }
        },

        encounters : [
            { type: "battle", enemy: "infectedSmall", weight: 10 },
            { type: "battle", enemy: "infected", weight: 20 },
            { type: "battle", enemy: "infectedSoldier", weight: 15 },
            {type : "event", id : "whiteFlowerLab_Collapse", weight: 15},
            {type : "event", id : "whiteFlowerLab_flowerAttack", weight: 10},
            {type : "event", id : "whiteFlowerLab_oneWhiteFlower", weight: 5},
            {type : "event", id : "whiteFlowerLab_familySoldier", weight: 5}
        ]
    },

    whiteFlowerLabRepeated : {
        id : "whiteFlowerLabRepeated",
        name : "하얀꽃 연구소 지부",
        startRoom : "r4c4",

        layout : [
            ["r0c0", ""    , ""     ,"r0c3", "r0c4"],
            ["r1c0", "r1c1", "r1c2", "r1c3", ""    ],
            [""    , ""    , "r2c2", ""    , "r2c4"],
            [""    , ""    , "r3c2", "r3c3", "r3c4"],
            [""    , "r4c1", "r4c2", ""    , "r4c4"]
        ],

        rooms : {
            "r0c0" : { name : "하얀꽃창고", exits: {down : "r1c0"}, chest: "whiteFlowerLabRepeated_chest" },
            "r0c3" : { name : "제어실 직전 통로의 작은 틈", exits : {right: "r0c4", down: "r1c3"}, safeZone: true, allowRest: true },
            "r0c4" : { name : "제어실", exits : {left : "r0c3"}, boss: "infectedSoldier"},

            "r1c0" : {name : "창고앞", exits : {up: "r0c0", right : "r1c1"} },
            "r1c1" : {name : "창고앞 복도", exits : {left: "r1c0", right: "r1c2"}},
            "r1c2" : {name : "중앙갈림길", exits : {left : "r1c1", right : "r1c3"}, chest: "whiteFlowerLabRepeated_chest"},
            "r1c3" : {name : "제어실로가는길", exits : {left : "r1c2", up:"r0c3"}},

            "r2c2" : {name : "백색통로2", exits : {up: "r1c2", down : "r3c2"}},
            "r2c4" : {name : "막힌 통로", exits : {down : "r3c4"}, chest: "whiteFlowerLabRepeated_chest"},

            "r3c2" : {name : "백색통로1", exits : {up:"r2c2", down:"r4c2", right : "r3c3"}},
            "r3c3" : {name : "통로쪽으로 뻗은 길", exits : {left : "r3c2", right : "r3c4"}},
            "r3c4" : {name : "출입구 앞", exits : {left : "r3c3", up: "r2c4", down : "r4c4"}},

            "r4c1" : {name : "거대한 하얀꽃이 있었던 걸로 보이는 방", exits : {right : "r4c2"}, chest: "whiteFlowerLabRepeated_chest"},
            "r4c2" : {name : "하얀꽃들이 그려져있는 복도", exits : {left : "r4c1", up: "r3c2"}},
            "r4c4" : {name : "출입구", exits : {up : "r3c4"}}
        },

        encounters : [
            { type: "battle", enemy: "infectedSmall", weight: 15 },
            { type: "battle", enemy: "infected", weight: 35 },
            { type: "battle", enemy: "infectedSoldier", weight: 20 },
            {type : "event", id : "whiteFlowerLabRepeated_Collapse", weight: 15},
            {type : "event", id : "whiteFlowerLabRepeated_flowerAttack", weight: 10},
            {type : "event", id : "whiteFlowerLabRepeated_oneWhiteFlower", weight: 5}
        ] 
    },
    erwinHideout : {
        id : "erwinHideout",
        name : "하얀꽃잎들이 떨어져있는 은신처",
        startRoom : "r0c2",
        layout : [
            [    "",     "", "r0c2",     "",     ""],
            [    "",     "", "r1c2",     "",     ""],
            [    "",     "", "r2c2",     "",     ""],
            [    "",     "", "r3c2",     "",     ""],
            [    "",     "", "r4c2",     "",     ""],
            [    "",     "", "r5c2",     "",     ""],
            [    "",     "", "r6c2",     "",     ""]
        ],
        rooms : {
            "r0c2" : {name : "하얀꽃입구", exits : {down : "r1c2"}, event : "erwin1"},
            "r1c2" : {name : "흐트러진 통로", exits : {down : "r2c2", up : "r0c2", event : "erwin2"}},
            "r2c2" : {name : "발자국이 이어진 통로", exits : {down : "r3c2", up : "r1c2"}, event : "erwin3"},
            "r3c2" : {name : "시체들이 쌓여있는 통로", exits : {down : "r4c2", up : "r2c2"}, event : "erwin4"},
            "r4c2" : {name : "꽃들만이 가득한 통로", exits : {down : "r5c2", up : "r3c2"}, event : "erwin5", seenFlag : "erwinHideout_erwin5"},
            "r5c2" : {name : "고요한 통로", exits : {down : "r6c2", up : "r4c2"}, event : "erwin6"},
            "r6c2" : {name : "...그리고 당신", exits : {up : "r5c2"}, boss : "erwin", bossIntro : "erwin_intro"}
        }
    },
    slaverCamp : {
        id : "slaverCamp",
        name : "인신매매단 임시 진지",
        startRoom : "r6c2",

        layout : [
            ["r0c0",     "", "r0c2",     "",     ""],
            ["r1c0",     "", "r1c2", "r1c3",     ""],
            ["r2c0", "r2c1", "r2c2",     "", "r2c4"],
            ["r3c0",     "", "r3c2", "r3c3", "r3c4"],
            ["r4c0",     "", "r4c2",     "", "r4c4"],
            [    "",     "", "r5c2",     "", "r5c4"],
            [    "",     "", "r6c2",     "",     ""]
        ],

        rooms : {
            "r0c0" : {name : "우리", exits : {down : "r1c0"}, event : "slaverCamp_prisonerCage"},
            "r0c2" : {name : "수장천막", exits : {down : "r1c2"}, boss: "trafficker4"},

            "r1c0" : {name : "우리 앞", exits : {up : "r0c0", down : "r2c0"}},
            "r1c2" : {name : "수장천막 앞", exits : {up: "r0c2", down : "r2c2", right : "r1c3"}},
            "r1c3" : {name : "수장천막 옆 작은 박스 틈", exits: {left : "r1c2"}, safeZone: true, allowRest: true},

            "r2c0" : {name : "갈라지는 흙길L", exits : {up : "r1c0", down : "r3c0", right : "r2c1"}},
            "r2c1" : {name : "이어지는 흙길L", exits: {left : "r2c0", right : "r2c2"}},
            "r2c2" : {name : "흙길4", exits : {up : "r1c2", down : "r3c2", left : "r2c1"}},
            "r2c4" : {name : "식량창고", exits : {down : "r3c4"}, event : "slaverCamp_foodStorage"},

            "r3c0" : {name : "대기실 앞", exits : {up : "r2c0", down : "r4c0"}},
            "r3c2" : {name : "흙길3", exits : {up : "r2c2", down : "r4c2", right : "r3c3"}},
            "r3c3" : {name : "이어지는 흙길R", exits : {left : "r3c2", right : "r3c4"} },
            "r3c4" : {name : "갈라지는 흙길R", exits : {up : "r2c4", down : "r4c4", left : "r3c3"}},

            "r4c0" : {name : "대기실", exits : {up : "r3c0"}, event : "slaverCamp_prisonerDespairRoom"},
            "r4c2" : {name : "흙길2", exits : {up : "r3c2", down : "r5c2"}},
            "r4c4" : {name : "약간 끊어진 흙길", exits : {up : "r3c4", down: "r5c4"}},

            "r5c2" : {name : "흙길1", exits : {up : "r4c2", down : "r6c2"}},
            "r5c4" : {name : "처리실", exits : {up : "r4c4"}, event : "slaverCamp_slavesEnd"},

            "r6c2" : {name : "입구", exits : {up : "r5c2"}}
        },
        encounters : [
            { type: "battle", enemy: "trafficker1", weight: 30 },
            { type: "battle", enemy: "trafficker2", weight: 20 },
            { type: "battle", enemy: "trafficker3", weight: 10 },
            { type : "event", id : "slaverCamp_coin", weight: 5},
            { type : "event", id : "slaverCamp_runner", weight: 5},
            { type : "event", id : "slaverCamp_dancer", weight: 5},
            { type : "event", id : "slaverCamp_priceTag", weight: 10}
        ],
    },

    slaverCampShelter : {
        id : "slaverCampShelter",
        name : "유리가 추적한 인신매매단 근거지",
        startRoom : "r0c0",

        layout : [
            ["r0c0", "r0c1", "r0c2", "r0c3", "r0c4"],
            [""    ,     "",     "",     "", "r1c4"],
            ["r2c0", "r2c1", "r2c2",     "", "r2c4"],
            ["r3c0",     "",     "",     "", "r3c4"],
            ["r4c0", "r4c1", "r4c2", "r4c3", "r4c4"]
        ],

        rooms : {
            "r0c0" : {name : "입구", exits : {right : "r0c1"}},
            "r0c1" : {name : "오른쪽으로 뻗어가는 길1", exits : {left : "r0c0", right : "r0c2"}, event : "slaverCampShelter_yuri_01", seenFlag : "slaverCampShelter_yuri_01"},
            "r0c2" : {name : "오른쪽으로 뻗어가는 길2", exits : {left : "r0c1", right : "r0c3"}},
            "r0c3" : {name : "오른쪽으로 뻗어가는 길3", exits : {left : "r0c2", right : "r0c4"}},
            "r0c4" : {name : "코너길1", exits : {left : "r0c3", down : "r1c4"}},

            "r1c4" : {name : "밑으로 뻗어가는 길1", exits : {up : "r0c4", down : "r2c4"}, event : "slaverCampShelter_yuri_02", seenFlag : "slaverCampShelter_yuri_02"},
            "r2c4" : {name : "밑으로 뻗어가는 길2", exits : {up : "r1c4", down : "r3c4"}},
            "r3c4" : {name : "밑으로 뻗어가는 길3", exits : {up : "r2c4", down : "r4c4"}, event : "slaverCampShelter_memo" },
            "r4c4" : {name : "코너길2", exits : {up : "r3c4", left : "r4c3"}},

            "r4c3" : {name : "왼쪽으로 뻗어가는 길1", exits : {left : "r4c2", right : "r4c4"}},
            "r4c2" : {name : "왼쪽으로 뻗어가는 길2", exits : {left : "r4c1", right : "r4c3"}, event : "slaverCampShelter_yuri_03", seenFlag : "slaverCampShelter_yuri_03"},
            "r4c1" : {name : "왼쪽으로 뻗어가는 길3", exits : {left : "r4c0", right : "r4c2"}},
            "r4c0" : {name : "코너길3", exits : {up : "r3c0", right : "r4c1"}},

            "r3c0" : {name : "위로 뻗어가는 길1", exits : {down : "r4c0", up : "r2c0"}, event : "slaverCampShelter_yuri_04", seenFlag : "slaverCampShelter_yuri_04"},
            "r2c0" : {name : "쉘터를 위한 길", exits : {down : "r3c0", right : "r2c1"}},
            "r2c1" : {name : "결전 직전의 길", exits : {left : "r2c0", right : "r2c2"}, event : "slaverCampShelter_yuri_05" },
            "r2c2" : {name : "쉘터의 아이들을 위해", exits : {left : "r2c1"}, boss: "trafficker4", bossIntro: "slaverCampShelter_boss_intro"}
        },

        encounters : [
            { type: "battle", enemy: "trafficker1", weight: 30 },
            { type: "battle", enemy: "trafficker2", weight: 20 },
            { type: "battle", enemy: "trafficker3", weight: 10 },
        ]
    },
    whiteFlowerOldLab : {
        id : "whiteFlowerOldLab",
        name : "오래된 하얀꽃 연구소",
        startRoom : "r7c2",

        layout : [
            ["r0c0", "r0c1", "r0c2", "r0c3", "r0c4", "r0c5", "r0c6", "r0c7"],
            [    "", "r1c1",     "",     "",     "",     "",     "", "r1c7"],
            [    "", "r2c1",     "", "r2c3", "r2c4", "r2c5", "r2c6", "r2c7"],
            ["r3c0", "r3c1",     "", "r3c3",     "",     "",     "", "r3c7"],
            ["r4c0",     "",     "", "r4c3",     "", "r4c5",     "", "r4c7"],
            ["r5c0", "r5c1",     "", "r5c3", "r5c4", "r5c5",     "", "r5c7"],
            ["r6c0",     "",     "",     "",     "",     "", "r6c6", "r6c7"],
            ["r7c0", "r7c1", "r7c2",     "",     "", "r7c5", "r7c6",     ""]
        ],

        rooms : {
            "r0c0" : {name : "누군가의 아버지였던 자의 방", exits : {right : "r0c1"}, event : "whiteFlowerOldLab_soraFather01"},
            "r0c1" : {name : "하얀꽃 화관이 걸려있는 문앞", exits : {left : "r0c0", down : "r1c1", right : "r0c2"}},
            "r0c2" : {name : "길게 뻗은 복도", exits : {left : "r0c1", right : "r0c3"}},
            "r0c3" : {name : "피가 묻은 복도", exits : {left : "r0c2", right : "r0c4"}, event : "whiteFlowerOldLab_bloodtunnel", seenFlag : "whiteFlowerOldLab_bloodtunnel"},
            "r0c4" : {name : "피가 묻은 복도2", exits : {left : "r0c3", right : "r0c5"}},
            "r0c5" : {name : "피가 묻은 복도3", exits : {left : "r0c4", right : "r0c6"}},
            "r0c6" : {name : "하얀 즙이 묻은 복도", exits : {left : "r0c5", right : "r0c7"}},
            "r0c7" : {name : "복도의 끝", exits : {right : "r0c6", down : "r1c7"}},

            "r1c1" : {name : "달콤한 냄새로 가득한 복도2", exits : {up : "r0c1", down : "r2c1"}},
            "r1c7" : {name : "하얀꽃밭", exits : {up : "r0c7", down : "r2c7"}, event : "whiteFlowerOldLab_whityFlowers"},

            "r2c1" : {name : "달콤한 냄새로 가득한 복도", exits : {up : "r1c1", down : "r3c1"}},
            "r2c3" : {name : "기밀방 문 앞", exits : {down : "r3c3", right : "r2c4"}},
            "r2c4" : {name : "고요한 복도", exits : {left : "r2c3", right : "r2c6"}},
            "r2c5" : {name : "하얀꽃병 복도2", exits : {left : "r2c4", right : "r2c6"}, event : "whiteFlowerOldLab_whitetunnel", seenFlag : "whiteFlowerOldLab_whitetunnel"},
            "r2c6" : {name : "하얀꽃병 복도", exits : {left : "r2c5", right : "r2c7"}},
            "r2c7" : {name : "하얀꽃밭2", exits : {up : "r1c7", left : "r2c6", down : "r3c7"}},

            "r3c0" : {name : "어린아이의 낙서 그림이 붙여져 있는 복도", exits : {right: "r3c1", down : "r4c0"}, event : "whiteFlowerOldLab_childPainting"},
            "r3c1" : {name : "코너길", exits : {left : "r3c0", up : "r2c1"}},
            "r3c3" : {name : "하얀꽃잎들로 가득한 방", exits : {up : "r2c3", down : "r4c3"}},
            "r3c7" : {name : "하얀꽃밭3", exits : {up : "r2c7", down : "r4c7"}},

            "r4c0" : {name : "이어지는 복도", exits : {up : "r3c0", down : "r5c0"}},
            "r4c3" : {name : "하얀꽃잎들이 수북한 방", exits : {up : "r3c3", down : "r5c3"}},
            "r4c5" : {name : "죽음의 요람", exits : {down : "r5c5"}, boss: "soraFather", bossIntro: "whiteFlowerOldLab_boss_intro"},
            "r4c7" : {name : "죽은 촉수가 붙어있는 방", exits : {up : "r3c7", down : "r5c7"}, event : "whiteFlowerOldLab_deadTentacle"},

            "r5c0" : {name : "소리없는 비명 복도", exits : {up: "r4c0", right : "r5c1", down : "r6c0"}, event : "whiteFlowerOldLab_bloodLine2", seenFlag : "whiteFlowerOldLab_bloodLine2"},
            "r5c1" : {name : "시든 반지가 떨어져있는 방", exits : {left : "r5c0"}, event : "whiteFlowerOldLab_overSee"},
            "r5c3" : {name : "한 남자의 시체가 있는 방", exits : {up : "r4c3", right : "r5c4"}, event : "whiteFlowerOldLab_soraFather02", seenFlag : "whiteFlowerOldLab_soraFather02"},
            "r5c4" : {name : "낙서들로 가득한 방", exits : {right : "r5c3", left : "r5c5"}, event : "whiteFlowerOldLab_soraFather03"},
            "r5c5" : {name : "실험실 앞 틈새", exits : {left : "r5c4", up : "r4c5"}, safeZone: true, allowRest: true},
            "r5c7" : {name : "촉수병실", exits : {up : "r4c7", down : "r6c7"}},

            "r6c0" : {name : "질질 끌린 피 흔적", exits : {up : "r5c0", down : "r7c0"} },
            "r6c6" : {name : "촉수 시체", exits : {right : "r7c6"}},
            "r6c7" : {name : "촉수병실2", exits : {left : "r6c6", up : "r5c7"}},

            "r7c0" : {name : "핏자국?", exits : {up : "r6c0", right : "r7c1"}, event : "whiteFlowerOldLab_bloodLine1", seenFlag : "whiteFlowerOldLab_bloodLine1"},
            "r7c1" : {name : "하얀복도", exits : {left : "r7c0", right : "r7c2"}},
            "r7c2" : {name : "출입구", exits : {left : "r7c1"}},
            "r7c5" : {name : "흉물 시체", exits : {right : "r7c6"}, chest : "whiteFlowerOldLab_fixed_chest1"},
            "r7c6" : {name : "하얀꽃 시체", exits : {left : "r7c5", up : "r6c6"}, chest : "whiteFlowerOldLab_fixed_chest2"}
        },

        encounters : [
            { type: "battle", enemy: "flower2", weight: 20 },
            { type: "battle", enemy: "flower3", weight: 15 },
            { type: "battle", enemy: "flower4", weight: 15 },
            { type: "battle", enemy: "flower5", weight: 1 },
            { type : "event", id : "whiteFlowerOldLab_flowerfight", weight: 5},
            { type : "event", id : "whiteFlowerOldLab_abomination", weight: 8},
            { type : "event", id : "whiteFlowerOldLab_food", weight: 10}
        ]
    },
    rebelsHideOut : {
        id : "rebelsHideOut",
        name : "반란군 근거지",
        startRoom : "r5c3",

        layout : [
            ["r0c0", "r0c1", "r0c2", "r0c3"],
            ["r1c0",     "",     "", "r1c3"],
            ["r2c0", "r2c1",     "", "r2c3"],
            ["r3c0",     "", "r3c2", "r3c3"],
            ["r4c0",     "", "r4c2",     ""],
            ["r5c0",     "",     "", "r5c3"],
            ["r6c0", "r6c1",     "", "r6c3"],
            [    "", "r7c1", "r7c2", "r7c3"]
        ],

        rooms : {
            "r0c0" : {name : "깨진 창문이 있는 통로", exits : {down : "r1c0", right : "r0c1"}},
            "r0c1" : {name : "놀이방", exits : {left : "r0c0", right : "r0c2"}, event : "rebelsHideOut_playroom", seenFlag : "rebelsHideOut_playroom"},
            "r0c2" : {name : "교육방", exits : {left : "r0c1", right : "r0c3"}, event : "rebelsHideOut_studyroom", seenFlag : "rebelsHideOut_studyroom"},
            "r0c3" : {name : "식당", exits : {left : "r0c2", down : "r1c3"}, event : "rebelsHideOut_cafeteria", seenFlag : "rebelsHideOut_cafeteria"},

            "r1c0" : {name : "어지러운 통로4", exits : {down : "r2c0", up : "r0c0"}},
            "r1c3" : {name : "짧은 통로", exits : {up : "r0c3", down : "r2c3"}},

            "r2c0" : {name : "어지러운 통로3", exits : {up : "r1c0", down : "r3c0", right : "r2c1"}},
            "r2c1" : {name : "당직실", exits : {left : "r2c0"}, chest: "rebelsHideOut_chest"},
            "r2c3" : {name : "벽이 지도로 가득 차있는 방", exits : {up : "r1c3", down : "r3c3"}, chest: "rebelsHideOut_chest"},

            "r3c0" : {name : "어지러운 통로2", exits : {up : "r2c0", down : "r4c0"}},
            "r3c2" : {name : "작전실 앞, 작은 틈새", exits : {down : "r4c2", right : "r3c3"}, safeZone: true, allowRest: true},
            "r3c3" : {name : "마지막 코너길", exits : {up : "r2c3", left : "r3c2"}},

            "r4c0" : {name : "어지러운 통로1", exits : {up: "r3c0", down : "r5c0"}},
            "r4c2" : {name : "작전실", exits : {up : "r3c2"}, boss: "rebelLeader2", bossIntro: "rebelsHideOut_boss_intro"},

            "r5c0" : {name : "발자국들이 여기저기 흩어져 있는 통로", exits : {up : "r4c0", down : "r6c0"}},
            "r5c3" : {name : "반란군 은신처 입구", exits : {down : "r6c3"}},

            "r6c0" : {name : "붉은 깃발이 걸려있는 방", exits : {up : "r5c0", right : "r6c1"}, chest: "rebelsHideOut_chest"},
            "r6c1" : {name : "반란의 불빛을 따라 걷는 길", exits : {left : "r6c0", down : "r7c1"}},
            "r6c3" : {name : "축축한 통로", exits : {up : "r5c3", down : "r7c3"}},

            "r7c1" : {name : "점점 밝아지는 통로", exits : {up : "r6c1", right : "r7c2"}},
            "r7c2" : {name : "어두운 통로", exits : {left : "r7c1", right : "r7c3"}},
            "r7c3" : {name : "끊어진 쇠사슬들이 널려있는 통로", exits : {left : "r7c2", up : "r6c3"}, event : "rebelsHideOut_savingPeople"}
        },
        
        encounters : [
            { type: "battle", enemy: "rebels1", weight: 30 },
            { type: "battle", enemy: "rebels2", weight: 20 },
            { type: "battle", enemy: "rebels3", weight: 20 },
            { type : "event", id : "rebelsHideOut_undercityHero", weight: 20},
            { type : "event", id : "rebelsHideOut_slave1", weight: 10},
            { type : "event", id : "rebelsHideOut_slave2", weight: 10}
        ]
    },

    graveYardBottom : {
        id : "graveYardBottom",
        name : "공동묘지 지하 하층",
        startRoom : "r1c0",

        layout : [
            [    "",     "", "r0c2", "r0c3", "r0c4", "r0c5"],
            ["r1c0",     "", "r1c2",     "",     "", "r1c5"],
            ["r2c0", "r2c1",     "", "r2c3",     "", "r2c5"],
            ["r3c0",     "", "r3c2", "r3c3", "r3c4", "r3c5"],
            ["r4c0", "r4c1", "r4c2",     "", "r4c4",     ""]
        ],

        rooms : {
            "r0c2" : {name : "지키는 자의 무덤", exits : {right : "r0c3", down : "r1c2"}, boss: "skeletonKnight"},
            "r0c3" : {name : "안식의 장소", exits : {left : "r0c2", right : "r0c4"}, safeZone: true, allowRest: true},
            "r0c4" : {name : "울퉁불퉁한 길", exits : {left : "r0c3", right : "r0c5"}},
            "r0c5" : {name : "해골먼지길", exits : {left : "r0c4", down : "r1c5"}, chest: "graveYardBottom_chest"},

            "r1c0" : {name : "상층으로 올라가는 계단 입구", exits : {down : "r2c0"}},
            "r1c2" : {name : "작은 구멍으로 이어지는 길", exits : {up : "r0c2"}, safeZone : true, noEncounter : true,
                     event : "graveYardBottom_skeletonKnight_after", seenFlag : "graveYardBottom_skeletonKnight_after_seen", repeatEvent : "graveYardBottom_skeletonKnight_after_repeat"},
            "r1c5" : {name : "어른이 겨우 통과할 법한 길", exits : {up : "r0c5", down : "r2c5"}},

            "r2c0" : {name : "을씨년스러운 길", exits : {up : "r1c0", down : "r3c0", right : "r2c1"}},
            "r2c1" : {name : "환청이 들리는 방", exits : {left : "r2c0"}, chest: "graveYardBottom_chest"},
            "r2c3" : {name : "작은 방", exits : {down : "r3c3"}, chest: "graveYardBottom_chest"},
            "r2c5" : {name : "좁은 통로", exits : {up : "r1c5", down : "r3c5"}},

            "r3c0" : {name : "으스스한 길", exits : {up : "r2c0", down : "r4c0"}},
            "r3c2" : {name : "도주로", exits : {right : "r3c3", down : "r4c2"}},
            "r3c3" : {name : "누군가의 찢어진 옷이 남은 길", exits : {left : "r3c2", right : "r3c4", up : "r2c3"}},
            "r3c4" : {name : "보석이 으깨져있는 길", exits : {left : "r3c3", right : "r3c5", down : "r4c4"}},
            "r3c5" : {name : "너무 좁은 통로", exits : {left : "r3c4", up : "r2c5"}},

            "r4c0" : {name : "아주 좁은 통로", exits : {up : "r3c0", right : "r4c1"}},
            "r4c1" : {name : "온기가 남지 않은 시체가 있는 길", exits : {left : "r4c0", right : "r4c2"}},
            "r4c2" : {name : "누군가 끌려간 흔적이 남아있는 길", exits : {left : "r4c1", up : "r3c2"}},
            "r4c4" : {name : "어린이가 들어갈 만한 구멍", exits : {up : "r3c4"}, chest: "graveYardBottom_chest"}
        },

        encounters : [
            { type: "battle", enemy: "skeletonBig", weight: 15 },
            { type: "battle", enemy: "skeletonEnhanced", weight: 25 },
            { type: "battle", enemy: "skeletonWheel", weight: 25 },
            { type : "event", id : "graveYardBottom_child", weight: 20},
            { type : "event", id : "graveYardBottom_child2", weight: 1},
            { type : "event", id : "graveYardBottom_child3", weight: 20},
            { type : "event", id : "graveYardBottom_whiteClothes", weight: 20},
            { type : "event", id : "graveYardBottom_whiteClothes2", weight: 20}
        ]
    }
}

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
    { id: "potato", weight: 8 },
    { id: "cabbage", weight: 8 },
    { id: "druggy", weight: 30 }
];

const whiteFlowerLab_CHEST_POOL = [
    { id: "meat_potion", weight: 20 },
    { id: "medium_potion", weight: 15 },
    { id: "potato", weight: 8 },
    { id: "cabbage", weight: 8 },
    { id: "wheat", weight: 5 },
    { id: "rice", weight: 5 },
    { id: "high_potion", weight: 1 },
    { id: "nothing", weight: 15 },
    { id: "gold_500", weight: 20 },
    { id: "gold_1000", weight: 10 }
];

const whiteFlowerLabRepeated_CHEST_POOL = [
    { id: "medium_potion", weight: 20 },
    { id: "high_potion", weight: 5 },
    { id: "potato", weight: 8 },
    { id: "cabbage", weight: 8 },
    { id: "wheat", weight: 10 },
    { id: "rice", weight: 10 },
    { id: "nothing", weight: 15 },
    { id: "gold_500", weight: 25 },
    { id: "gold_1000", weight: 15 }
];

const rebelsHideOut_CHEST_POOL = [
    { id: "medium_potion", weight: 20 },
    { id: "high_potion", weight: 10 },
    { id: "mushroom", weight: 8 },
    { id: "potato", weight: 8 },
    { id: "cabbage", weight: 8 },
    { id: "wheat", weight: 10 },
    { id: "rice", weight: 10 },
    { id: "nothing", weight: 5 },
    { id: "gold_500", weight: 25 },
    { id: "gold_1000", weight: 20 }
];

const graveYardBottom_CHEST_POOL = [
    { id: "medium_potion", weight: 30 },
    { id: "high_potion", weight: 20 },
    { id: "nothing", weight: 5 },
    { id: "gold_500", weight: 25 },
    { id: "gold_1000", weight: 20 },
    { id: "gold_1500", weight: 5 }
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
    },

    whiteFlowerLab_chest: {
        name: "하얀꽃으로 뒤덮인 상자",
        type: "random",
        pool: whiteFlowerLab_CHEST_POOL
    },

    whiteFlowerLab_fixed_chest: {
        name: "연구소 직원들의 상자",
        type : "fixed",
        reward: (player) => {
            addItem(player, ITEMS.consumable.soju);
            addItem(player, ITEMS.misc.animalMeat);
            addItem(player, ITEMS.misc.wheat);
            addItem(player, ITEMS.misc.rice);
            showSingleTextScene("상자 안에는 소주와 몇몇 음식들이 들어있었다.", player);
        }
    },

    whiteFlowerLabRepeated_chest: {
        name: "하얀꽃으로 뒤덮인 상자",
        type: "random",
        pool: whiteFlowerLabRepeated_CHEST_POOL
    },

    whiteFlowerOldLab_fixed_chest1: {
        name: "검은 즙이 묻어있는 실험실 상자",
        type : "fixed",
        reward: (player) => {
            addItem(player, ITEMS.misc.whiteFlowerLeafStone);
            showSingleTextScene("상자 안에는 백화석이 들어있었다. 하얀꽃이 돌 안에서 하늘하늘 흔들리고 있다", player);
        }
    },

    whiteFlowerOldLab_fixed_chest2: {
        name: "하얀 즙이 묻어있는 실험실 상자",
        type : "fixed",
        reward: (player) => {
            addItem(player, ITEMS.misc.abominationBigEgg);
            showSingleTextScene("상자 안에는 흉뮬의 아주 큰 알이 들어있었다...", player);
        }
    },

    rebelsHideOut_chest: {
        name: "반란군들의 보급 상자",
        type: "random",
        pool: rebelsHideOut_CHEST_POOL
    },

    graveYardBottom_chest : {
        name : "해골상자",
        type : "random",
        pool : graveYardBottom_CHEST_POOL
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

    gold_1500: (player) => {
        changeGold(player, 1500);
        showSingleTextScene("!! 상자 안에는 1500 골드가 들어 있었다.", player);
    },

    small_potion: (player) => {
        addItem(player, ITEMS.consumable.smallPotion);
        showSingleTextScene("물약을 발견했다.", player);
    },

    medium_potion: (player) => {
        addItem(player, ITEMS.consumable.mediumPotion);
        showSingleTextScene("물약을 발견했다.", player);
    },

    high_potion: (player) => {
        addItem(player, ITEMS.consumable.highPotion);
        showSingleTextScene("물약을 발견했다.", player);
    },

    dirty_item: (player) => {
        addItem(player, ITEMS.misc.tornClothes);
        showSingleTextScene("찝찝한 물건을 발견했다...", player);
    },

    nothing: (player) => {
        showSingleTextScene("상자는 비어있었다...", player);
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
    },

    potato: (player) => {
        addItem(player, ITEMS.misc.potato);
        showSingleTextScene("당신은 감자를 발견했다.", player);
    },

    cabbage: (player) => {
        addItem(player, ITEMS.misc.cabbage);
        showSingleTextScene("당신은 배추를 발견했다.", player);
    },

    mushroom: (player) => {
        addItem(player, ITEMS.misc.mushroom);
        showSingleTextScene("당신은 버섯을 발견했다.", player);
    },

    wheat: (player) => {
        addItem(player, ITEMS.misc.wheat);
        showSingleTextScene("당신은 밀을 발견했다.", player);
    },

    rice: (player) => {
        addItem(player, ITEMS.misc.rice);
        showSingleTextScene("당신은 쌀을 발견했다.", player);
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
        if (newRoom.seenFlag && player.flags?.[newRoom.seenFlag]){
            startScene(buildDungeonScene(player), player);
            return;
        }
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

    if (dungeon.id === "slaverCampShelter" && room.boss === "trafficker4"){
        handleSlaverCampShelterBossWin(player);
        return;
    }

    if (dungeon.id === "slaverCamp" && room.boss === "trafficker4"){
        handleSlaverCampBossWin(player);
        return;
    }

    if (dungeon.id === "whiteFlowerLabRepeated" && room.boss === "infectedSoldier"){
        player.flags = player.flags || {};
        player.flags.whiteFlowerLab_cleanup_done = true;

        addQuestProgress(player);
        savePlayer(player);

        startScene([
            {
                type: "text",
                value:
                    "꽃감염병이 쓰러졌다. 당신은 제어실의 장치를 작동시켰다.<br><br>" +
                    "<div style='text-align:center;'><strong style='color:#ff4d4d; font-size:4rem'>콰앙</strong></div>" +
                    "<br><br>연구소 지부가 폭발과 함께 무너져내렸다."
            },
            {
                type: "effect",
                run: (player) => {
                    leaveDungeon(player);
                }
            }
        ], player);

        return;
    }

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

    if (dungeon.id === "whiteFlowerLab" && room.boss === "infectedSmalls"){
        handleInfectedSmallsWin(player);
        return;
    }

    if (dungeon.id === "erwinHideout" && room.boss === "erwin"){
        handleErwinWin(player);
        return;
    }

    if (dungeon.id === "whiteFlowerOldLab" && room.boss === "soraFather"){
        handleSoraFatherWin(player);
        return;
    }

    if (dungeon.id === "rebelsHideOut" && room.boss === "rebelLeader2"){
        handleRebelLeader2Win(player);
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
            value: `${room.name}(이)다.<br><br>어디로 갈까?`
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
    } else if (dungeonId === "whiteFlowerLab"){
        player.location = "guardPost2";
    } else if (dungeonId === "whiteFlowerLabRepeated"){
        player.location = "guardPost2";
    } else if (dungeonId === "slaverCamp"){
        player.slaverRaid = {
            active: false,
            progress: 0,
            maxProgress: getRandomSlaverRaidMaxProgress(),
            prisonerEventDone: false,
            campFound: false
        };
        player.location = "guardPost2";
    } else if (dungeonId === "slaverCampShelter"){
        player.location = "shelter";
    } else if (dungeonId === "erwinHideout"){
        resetErwinRaid(player);
        player.location = "guardPost3";
    } else if (dungeonId === "whiteFlowerOldLab"){
        player.location = "guardPost3";
    } else if (dungeonId === "rebelsHideOut"){
        player.location = "richTownEntrance";
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
                return true;
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
                        "<br><br>\"루, 루크...!?\"<br><br>\"내 이름 부를 혀가 아직도 남아있었나?\"<br><br>" +
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
        ],
        goblin_meatMeat : [
            {
                type : "text",
                value : [
                    "동굴을 지나던 당신은 고블린이 식량을 모아놓은 곳을 발견했다. 역시나, 그들은 채소 따위 먹지 않았다. 오로지 사슴고기들뿐이다. 당신은 그들의 유용한 식량을 챙겼다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    addItem(player, ITEMS.misc.animalMeat);
                    addItem(player, ITEMS.misc.animalMeatPieces);
                    addItem(player, ITEMS.misc.animalMeatPieces);
                }
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
        banditHideOut_food : [
            {
                type : "text",
                value : [
                    "당신은 도적떼의 저장상자를 발견했다. 자물쇠만 풀어내면 어떻게든 될 거 같다. 당신은 자물쇠에 접근했다."
                ]
            },
            {
                type : "check",
                stat : "dex",
                difficulty : 13,
                success : [
                    {
                        type : "text",
                        value : "당신은 상자의 자물쇠를 기민한 손놀림으로 풀어냈다. 그들의 식량을 얻어냈다. 당신은 도적들에게서 도둑질을 해냈다!"
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            addItem(player, ITEMS.misc.animalMeat);
                            addItem(player, ITEMS.misc.potato);
                            addItem(player, ITEMS.misc.cabbage);
                        }
                    }
                ],
                fail : [
                    {
                        type : "text",
                        value : "당신은 상자의 자물쇠를 풀어보려고 했지만 잘 되지 않았다. 어쩔 수 없이 당신은 아쉬움을 뒤로 하고 전진했다. 역시 도적은 도적이다."
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
    },
    whiteFlowerLab : {
        whiteFlowerLab_familySoldier : [
            {
                type : "text",
                value : "당신은 꽃감염병을 보았다. 당신은 바로 공격하려고 했지만 꽃감염병은 당신을 공격할 생각이 없는 것처럼 보였다. 오히려 그는 당신에게 다가오더니 말을 하려고 노력했다." +
                        "그는 당신에게 부탁 하나만 해도 되냐고 금방이라도 다 스러질 거 같은 목소리로 말했다. 당신은 그의 입모양을 살폈다."
            },
            {
                type : "check",
                stat : "int",
                difficulty : 15,
                success : [
                    {
                        type : "text",
                        value : "당신은 그의 말을 알아들었다! 그는 자신의 가족에게 자신의 안부를 전해달라고 말하고 있었다. 자신은 잘 살고 있다고, 걱정하지 않아도 된다고... 당신이 자신의 말을 알아들었다는 걸 깨달은 그는 웃는 얼굴로 당신에게 가족 사진을 보여주었다." +
                                " 그는 자신의 얼굴에 있던 꽃을 후두둑 떼냈다. 그는 당신의 손에 그 꽃들을 쥐어주더니, 완전히 정신을 잃기 전에 그대로 바닥에 쓰러졌다. 하얀꽃에서 하얀 애액이 흘러내린다." +
                                "<br>...그는 죽었다, 가족을 잊지 않고."
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            addItem(player, ITEMS.misc.flower);
                        }
                    }
                ],
                fail : [
                    {
                        type : "text",
                        value : "당신은 최대한 그의 말을 이해해보려고 했지만 되지 않았다. 그는 괴로워하더니 그대로 당신을 지나쳐갔다." +
                                " 그가 떠난 방향에서부터 비명 소리가 들렸다. 더 이상 사람의 것이 아닌 소리가 뒤에서부터 들려온다. 그리고 뚝, 소리는 어느 순간 멈췄다."
                    }
                ]
            }
        ],
        whiteFlowerLab_oneWhiteFlower : [
            {
                type : "text",
                value : "당신은 걸어가다가 하얀 꽃 한 송이가 피어있는 것을 보았다. 그것은 마치 살아있는 것처럼 흔들리고 있었다."
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 꽃을 뽑았다.",
                        scene : [
                            {
                                type : "text",
                                value : "당신이 꽃을 뽑는 순간, 당신의 머리에 아이의 비명 소리가 울렸다. 대체 어디서부터 난 비명 소리인지 당신은 알 수가 없다. 확실한 건 분명히 당신에게 들렸다는 것이다. 당신은 뽑은 하얀꽃을 내려다보았다. 하얀꽃의 줄기에서 하얀 액이 주륵주륵 흐른다.... 그리고 그것은 그대로 시들었다."
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeHP(player, 30);
                                    changeTrauma(player, 2);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 꽃을 그냥 내버려두었다.",
                        scene : [
                            {
                                type : "text",
                                value : "하얀 꽃은 당신이 가는 동안에도 너울너울 춤을 추듯 움직였다. 달콤한 냄새가 난다... 어쩐지 당신의 발걸음이 가벼워졌다."
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeHP(player, 10);
                                    changeStamina(player, 10);
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        whiteFlowerLab_flowerAttack : [
            {
                type : "text",
                value : "당신이 발걸음을 내딛는 순간, 당신의 밑에서 뭔가가 느껴졌다. 당신은 밑을 내려다보았다. 아주 큰 꽃이 당신을 향해 활짝 피어있었다."
            },
            {
                type : "check",
                stat : "dex",
                difficulty : 18,
                success : [
                    {
                        type : "text",
                        value : "당신은 꽃술이 당신의 애널에 침범하기 전에 재빠르게 자리를 피했다. 큰꽃은 당신을 놓치자 으르렁거리듯 꽃잎을 떨더니 그대로 봉우리를 닫았다."
                    }
                ],
                fail : [
                    {
                        type : "text",
                        value : "큰꽃에서 나온 꽃술이 당신의 하의 안으로 쉽게 들어왔다. 당신은 당황해서 꽃술을 움켜잡았지만 꽃술은 멈추지 않았다. 그것은 당신의 엉덩이골 사이로 파고들더니 그대로 찌걱거리는 소리와 함께 애널로 돌입했다." +
                                " 꽃술의 울퉁불퉁한 겉면이 당신의 여린 속살을 자극한다. 돌기가 당신의 속살을 긁을 때마다 당신의 두 다리는 바들바들 떨렸다. 그리고 주르륵, 꽃술에서 무언가가 나왔다. 당신의 애널이 물컹물컹한 애액으로 가득 찼다. 이제는 찌꺽이는 소리도 아니었다. 쭈압, 푸슛, 흥건한 소리가 당신의 애널에서 흘러나온다...." +
                                "<br>큰꽃은 당신을 몇 분이고 능욕하고 나서야 만족했다. 꽃술이 당신의 애널에서 스르르 빠져나왔다. 습해진 당신의 애널이 뻐끔거린다."
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            changeHP(player, -5);
                            changeArousal(player, getSensitivityArousalGain(player, "a", 16)),
                            changeSensitivity(player, "aSensitivity", 8);
                            addBodyFluid(player, "a", 20);
                            passTime(player, 5);
                        }
                    }
                ]
            }
        ],
        whiteFlowerLab_Collapse : [
            {
                type : "text",
                value : "\"콰앙!\"<br><br>당신의 바로 옆에서 무너지는 소리가 들렸다. 당신이 고개를 돌렸을 때는 이미 기둥이 당신 쪽으로 넘어지고 있었다!"
            },
            {
                type : "check",
                stat : "str",
                difficulty : 17,
                success : [
                    {
                        type : "text",
                        value : "당신은 다행히도 쓰러지는 기둥을 몸으로 받아낼 수 있었다. 아프긴 했지만 당신의 근력으로는 버틸 만했다. 당신은 기둥을 치운 후 앞으로 나아갔다."
                    }
                ],
                fail : [
                    {
                        type : "text",
                        value : "당신은 기둥에 그대로 깔렸다. 어떻게든 기둥을 밀어서 빠져나오긴 했지만 빠져나온 후에도 당신의 몸은 욱씬거렸다."
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            changeHP(player, -20);
                            changeStamina(player, -20);
                        }
                    }
                ]
            }
        ],
        whiteFlowerLab_researcherDiary : [
            {
                type : "text",
                value : [
                    "방을 열고 들어가자 백색 벽과 바닥으로 이루어진 방이 나왔다. 그리고 방에는 백색 침대들로 가득했다. 침대들은 서로 따닥따닥 붙어있어서 침대에서 내려오는 것도 힘들었을 거 같다." +
                    "<br>주변을 둘러보던 당신은 베개 옆에 있는 일기장 하나를 발견했다. 낡고 바랜 일기장, 당신은 일기를 읽었다. 1일차부터 써있지는 않았다." +
                    "<br><br><br>[380일차]<br>이제 신입 연구원들이 와도 감흥이 없다. 어차피 저들 중 몇몇은 일년도 되지 않아 미치거나 죽을 것이다. 그들에게 쓸데없는 정을 주고 싶지는 않았다." +
                    "<br><br>[383일차]<br>한 신입 놈이 나에게 와서 가족은 안 보고 싶냐고 물었다. 나는 시큰둥하게 가족들은 어차피 잘 살고 있을 거라고 말했다. 내가 여기에 있는지 1년이 됐으니, 그들은 이제 상류도시에 가서 따듯한 음식을 제공받고 있겠지. 이 실험이 끝나기 전까지는 너도 나도 가족에게는 못 돌아갈 거라고 말하며 난 신입에게 일을 더 열심히 하라고 재촉했다. 보통 이러면 다들 나가떨어지던데, 이 신입은 입술을 삐죽이며 웃었다." +
                    "<br><br>[390일차]<br>그 신입 새끼, 내 생각보다 더 어렸다. 그는 노모를 상류도시에 올려보내기 위해서 연구소에 지원했다고 했다. 그나마 자기 머리가 똑똑해서 다행이라고 그는 웃었다. 머리는 좋은데 대가리에는 꽃들이 가득찬 거 같다. 친하게 지내고 싶지 않다." +
                    "<br><br>[397일차]<br>오늘은 그 신입 놈이랑 같이 소주를 마셨다. 아껴놨던 소주다. 이새끼랑 마시게 됐다는 게 웃기긴 한데.... 아무튼, 녀석은 내게 상류도시의 사람들도 이 연구소에 있는 게 신기하다고 말했다. 그들은 우리처럼 생존하기 위해서 여기에 지원한 게 아니야, 바보야. 이제 녀석만 보면 한숨이 나온다. 내 아들이 컸으면 이렇게 컸으려나." +
                    "<br><br>[400일차]<br>...녀석이 요새 좀 이상한 거 같다. 아니, 20일밖에 안 됐는데 벌써 그딴 눈을 한다고? 정신 좀 차려라." +
                    "<br><br>[420일차]<br>노모의 편지를 못 받는 게 이상하단다. 씨발... 내가 좀 알아봐줘야겠다." +
                    "<br><br>[421일차]<br>팀장님한테 말해보았지만 개같이 까였다. 아니, 노모 생사 확인해주는 게 그렇게 어렵나? 아직 1년 안 지났으니 하류도시에 있을 텐데, 주소는 어차피 이 신입 새끼가 알고 있으니까 한번 찾아가보면 되는 거잖아?" +
                    "<br><br>[425일차]<br>신입이 노모에게 편지를 받았댄다. 근데 이번엔 이상하다고 난리다. 이상하긴 뭐가 이상해. 이새끼도 드디어 미쳐가는 거 같다. 난 녀석의 입에 소주병을 꽂아주었다. 제발 씨발 정신 좀 차려라." +
                    "<br><br>[431일차]<br>신입이 도망갔다가 잡혔다는 소식을 들었다. 1시간도 못 넘기고 바로 잡혔다고 한다. 팀장새끼는 나한테 이제 내 일에나 집중하라고 말했다. 이제까지 그래왔던 것처럼... 그래, 이제까지 그래왔지. 나는 그냥 내 일을 해야 해. 내 가족들은 상류도시에서 잘 먹고 잘 살고 있을 테니까." +
                    "<br><br>[432일차]<br>오늘 가족들한테 받은 편지를 좀 다시 읽어봤다. 씨발... 이상한 게 맞는 거 같다. 드디어 나도 미쳐가나? 하, 근데 내 가족밖에 모르는 일들이 써있긴 한데... 씨발, 모르겠다. 소주나 마셔야겠다." +
                    "<br><br>[433일차]<br>밥을 혼자 먹게 된 지 3일." +
                    "<br><br>[435일차]<br>요새 머리가 자꾸 간지럽다... 뭐지...." +
                    "<br><br><br>일기는 435일에서 끊겨있었다. 당신은 일기장을 닫았다."
                ]
            }
        ],
        whiteFlowerLab_prison : [
            {
                type : "text",
                value : [
                    "감옥이다. 당신은 고개를 숙이고 감옥에 들어가야만 했다. 건장한 성인 남성이라면 제대로 서지도 못할 높이다. 여기에 갇혀있었던 사람들은 그럼 전부 앉아있었을까? 아니면 누워있었을까? 주변을 둘러보았지만 당신은 아무 것도 찾을 수 없었다." +
                    " 당신이 찾을 수 있는 건 그저 하얀꽃잎 몇 개뿐이다. 당신은 나오다가 관리 일지를 보았다." +
                    "<br><br><br>실험체 A, 실험체 B에게 엄청난 모성애를 보이고 있음. 주의 요망. <br>실험체 B가 실험체 F의 옆에 붙었음. 동질감을 느끼는 것처럼 보임. <br>실험체B, 실험체F, 실험체BE가 서로 붙었음. 그리고 다른 어른 실험체들은 그들에게 모성애를 느끼는 거 같음. 자기 자식이 아닌데도." +
                    "<br>실험체A, 실험체Z, 실험체CX 폐기 처분." +
                    "<br><br>그 후에도 비슷한 내용들이 계속 써져 있었다. 당신은 관리 일지에서 시선을 돌렸다."
                ]
            },
            {
                type : "text",
                value : [
                    "그 순간 당신은 꽃감염자 한 명이 당신에게로 다가오는 것을 보았다. 꽃에는 눈이 없는데, 당신은 그것이 당신을 노려보고 있다는 느낌을 받았다. 꽃감염자의 가슴에는 명찰이 하나 달려있었다. [실험체 BZ], 꽃감염자가 당신에게 달려든다...!"
                ]
            },
            {
                type : "effect",
                run: (player) => {
                    const enemyId = "infected";
                    const enemy = ENEMIES[enemyId]();
                    startBattle("infected", player, {
                        onWin: () => startScene(buildDungeonScene(player), player),
                        onEscape: () => startScene(buildDungeonScene(player), player),
                        onLose: () => {runDefeatEvent(player, enemy);}
                    });
                    return true;
                }
            }
        ],
        whiteFlowerLab_soldier : [
            {
                type : "text",
                value : [
                    "꽃감염병 하나가 버튼 앞에 서있었다. 그것은 당신을 보더니 오지 말라는 듯 손바닥을 내밀어보였다. 그는 그르렁거리며 민간인은 이곳에 오면 안 된다고 말했다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 그에게 왜 지금까지 이곳을 지키고 있는 거냐고 물었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 말에 그것은 입술을 달싹이더니 간신히 말을 했다." +
                                    "<br><br>\"그게...내... ㅇ...이...니ㄲ...ㅏ... 나는... 약속을... 약속....\"<br>" +
                                    "그는 자신의 주머니에서 훈장을 하나 꺼냈다. 경계병의 훈장이 아니라 경비병의 훈장이었다. 루크 경비병단 소속이었던 모양이다. 당신은 그 훈장을 받아들었다. 훈장에는 루크의 글씨체로 삐뚤삐뚤 이름이 써져 있었다." +
                                    "<br><br>\"너...아...ㄹ..아? ...너...ㄹ..크...친구...?\"<br><br>" +
                                    "당신이 글씨체를 알아보이는 기색을 보이자 꽃감염병은 웅얼거렸다. 이성을 아예 잃기 직전인 거 같다.<br><br>" +
                                    "\"ㄱ...져다...ㅈ...난... 끝까..ㅈ... ㄴ..ㄹ..ㅕ...\"<br><br>" +
                                    "그것은 더 이상 참을 수 없었는지 창을 들더니 그대로 그것을 제 얼굴에 꽂았다. 그의 몸이 당신의 앞으로 풀썩 쓰러졌다. 꽃이 시들었다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 2);
                                    player.flags.whiteFlowerLab_lukeSoldier = true;
                                    addItem(player, ITEMS.misc.lukeWFLSoldier);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "그는 당신이 발렌의 명령을 받아 여기에 왔다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "발렌의 명령을 받아서 왔다는 말에 꽃감염자의 표정이 멈췄다. '발렌', 그는 그 이름만은 명확하게 말했다. 그러더니 그것은 당신에게 훈장 하나를 내밀었다." +
                                    "<br><br>\"ㅇ...거....하...ㄹ...ㄷ...시...ㄹ...크...\"<br><br>" +
                                    "당신은 그것에게서 훈장을 받았다. 훈장에는 꽃감염자의 이름으로 추정되는 글자가 루크의 글씨체로 삐뚤삐뚤 써있었다. 그것은 당신이 받는 걸 보더니 더 이상 미련은 없다는 듯 창을 들어 자신의 머리에 꽂았다. 털썩. 시든 꽃이 당신의 앞으로 쓰러졌다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 2);
                                    player.flags.whiteFlowerLab_lukeSoldier = true;
                                    addItem(player, ITEMS.misc.lukeWFLSoldier);
                                    savePlayer(player);
                                }
                            }
                        ]              
                    },
                    {
                        text : "꽃감염병이다. 당신은 무기를 들어 그것에게 겨누었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신이 무기를 들자 꽃감염자는 이곳을 지켜야 한다는 생각으로 이성을 잃었는지 그르렁거리는 소리와 함께 당신에게 달려들었다. 싸움이 시작된다!"
                                ]
                            },
                            {
                                type : "effect",
                                run: (player) => {
                                    player.flags.whiteFlowerLab_erwin = true;
                                    savePlayer(player);

                                    const enemyId = "infectedSoldier";
                                    const enemy = ENEMIES[enemyId]();
                                    startBattle("infectedSoldier", player, {
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
        whiteFlowerLab_erwin : [
            {
                type : "text",
                value : [
                    "버튼을 누르고 열린 방에 들어서자 하얀꽃으로 이루어진 방이 당신을 맞이했다. 여기저기서 달콤한 냄새가 난다. 하얀꽃잎으로 이루어진 침대, 그리고 하얀꽃잎으로 이루어진 장식품들.... 대체 누가 만든 걸까?<br>" +
                    "마치 공주님이라도 있었던 방같다. 당신은 조심스럽게 발을 앞으로 내딛었다. 당신이 침대에 손을 뻗자 침대를 이루고 있었던 하얀꽃잎들이 다 시들어버렸다." +
                    " 당신이 어디를 가서 뭘 만지든 아름답게 장식되어 있었던 하얀꽃잎들은 전부 시들어버렸다. 하얗게 아름다웠던 방이 전부 무너져 내린다. 당신은 뒷걸음질치다가 침대 바닥 옆으로 조그맣게 쓰인 글자를 하나 발견했다." +
                    "<br><br><br><span class='log-pale'>에르윈<br>이 이름은 잊지 않을 거야</span><br><br><br>" +
                    "당신은 그 방에서 하얀꽃잎으로 이루어진 브라를 주웠다. 이상하게도 그 브라는 당신의 손길에도 시들지 않았다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    addItem(player, ITEMS.bra.whiteFlowerBra);
                    player.flags.whiteFlowerLab_erwin = true;
                    savePlayer(player);
                }
            }
        ],
        whiteFlowerLab_experimentA : [
            {
                type : "text",
                value : [
                    "실험실에 들어서자마자 달콤한 냄새가 당신의 코를 찌르듯이 찔러왔다. 달콤한 냄새가 너무 짙어서 당신은 숨을 쉬는 것조차도 버거웠다. 작은꽃잎부터 큰꽃잎까지 실험실 바닥에 우수수 떨어져있었다. 몇몇 꽃들은 실험실 가운을 입고 있었다. 당신은 권총을 든 채 시들어있는 꽃감염자에게 다가갔다. 그것도 실험실 가운을 입고 있었다." +
                    " 당신은 그것에게서 권총을 빼냈지만, 권총은 빼내자마자 으스러져서 못 쓰게 되었다. 아니, 당신이 빼내기 전에도 으스러져 있었던 거겠지. 당신은 바스라진 종이를 주웠다." +
                    "<br><br><br>모두가 하얀꽃이 되어간다. 이것을 상류도시 사람들에게 들키면 안 된다. 노력은 해보겠지만 후임자가 온다면 내가 못 다한 일들을 끝내주길 바란다. 젠장. 소리가 들린다. 나까지 이성을 잃기 전에 빨리<br><br><br>" +
                    "내용이 끊겨있다. 당신은 종이를 다시 내려두고 주변을 둘러보았다. 몇몇 꽃들에 작은 구멍이 뚫려 있었다."
                ]
            }
        ],
        whiteFlowerLab_experimentB : [
            {
                type : "text",
                value : [
                    "실험실에 들어서자 너무 진한 달콤한 냄새가 당신의 코를 역하게 찔러온다. 당신은 당신도 모르게 코를 막고 주변을 둘러보았다. 꽃잎들이 담겨져있는 병들로 가득한 방이었다. 그리고 작은꽃잎들과 큰꽃잎들이 바닥에 흩뿌려져 있는 공간. 당신은 실험실의 벽을 보았다." +
                    "<br>손톱자국 같은 것이 벽에 그어져 있었다. 큰 유리관 안에도 손톱자국이 있었고 실험실 벽에도 손톱자국이 있었다. 당신은 걸어가다가 연구 일지를 보았다. 연구 일지에는 사람이 어떻게 꽃으로 변해가는가에 대해 써있었다." +
                    "<br><br><br>상류도시에서 금지가 되었다고는 하지만 우리는 대의를 위하여 악역도 자처하겠다.<br><br><br>가훈이라도 되는 것마냥 그 문장이 가장 앞에 써있었다." +
                    "<br><br><br>꽃감염체들은 서로에게 연결되는 것처럼 보인다. 누군가의 감정이 계속 꽃감염체에게 공유되고 있다. 아마 100년 전처럼, 또 그것일 것이다. 그 공유체만 끊으면 그들은 말 잘 듣는 군대가 될 수 있을 거 같다." +
                    "<br><br>그 가설은 틀렸다. 일부의 꽃감염체들이 어린 꽃감염체들에게 모성애를 가지게 되는 부분을 확인했다. 그들은 무슨 일이 있어도 어린 개체들을 지키려고 한다. 가장 온순해보였던 실험체Z가 어제 연구원을 공격했다. 있으면 안 되는 일이다. 실험체Z를 비롯한 나머지 감염체들의 폐기 처분을 요청한다." +
                    "<br><br>다시 가설을 수정한다. 가장 강한 감정은 <span class='log-pale'>창백</span>에게서 오는 것 같고, 그것에서 오는 게 아닌 감정- 나머지들이 느끼는 감정들은 서로 약하게 공유되는 것으로 보인다. 서로의 감정에 영향을 너무 받으면 마치 서로가 하나인 것처럼 행동할 때도 있다.<br>다른 건 후순위다. 무슨 일이 있어도 그것을 죽여야 한다. **에게 한번 더 요청해야 한다. 예전 실험 기록에서도 그렇고 왜 계속 그것의 감정이 공유가 되는가." +
                    "<br><br>그나마 다행인 건 지금은 그들이 사람의 행동을 따라하려고 하지는 않는다는 것이다. 자신의 기억에 붙잡혀 있는 거 같다. 더 큰 위험은 부담하지 않는 게 좋을지도 모르겠다." +
                    "<br><br>...하지만 만약에, 기억을 끊었는데 그후의 부작용이 없어진다면...."
                ]
            }
        ],
        whiteFlowerLab_cafeteria : [
            {
                type : "text",
                value : [
                    "식당 문을 열고 들어서자 음식 썩은내 대신 달콤한 냄새가 났다. 식탁 위든, 아래든, 그릇 위든 식당은 하얀꽃들로 가득했다. 그리고 그 하얀꽃들 사이에 작은 꽃감염자 하나가 앉아있었다. 다른 꽃감염자보다는 훨씬 작은 꽃이 당신을 바라본다." +
                    "<br>당신을 공격할 생각은 없는 거 같다. 아니, 공격할 생각이 없기는커녕 당신이 한 발자국 다가오면 그것은 한 발자국 뒤로 물러났다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 그것을 벴다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "그것은 당신의 일격에 그대로 죽었다. 자신의 몸을 방어하는 법도 몰랐던 모양이다. 시들어서 툭 떨어진 하얀꽃 앞으로 뭔가가 형성됐다. 하얀꽃 팔찌였다." +
                                    "<br>당신은 하얀꽃 팔찌를 주웠다. 하얀꽃 팔찌에 당신의 손이 닿은 순간, 죄악감이 당신의 등골을 타고 흘러내렸다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    addItem(player, ITEMS.accessary.whiteFlowerLabBracelet);
                                    changeTrauma(player, 10);
                                    changeStamina(player, -10);
                                    player.flags.whiteFlowerLab_cafeteria = true;
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 그것을 건드리지 않았다. 그저 손을 뻗었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신이 손을 뻗자 꽃도 당신에게 자신의 손을 뻗었다. 당신의 손이 그것의 손에 맞닿는 순간 당신의 세상이 하얘졌다. 하얘진 세상에서 당신은 피투성이가 된 당신을 보았다. 당신은 거의 죽어있었다. 그대로 내버려두었으면 아마 죽었을 것이다. 그 순간 누군가가, 길고 긴 그림자가 쭈욱 당신의 앞으로 늘어졌다." +
                                    "<br>그것은 창백했다. 그것은 당신의 주변을 맴돌다가 이리저리 고개를 돌렸다. 당신은 그것의 머리를 보았다. 백발의 머리카락이 이리저리 흔들리다가 꽃잎으로 와르르 무너진다. 그것은 고개를 숙이더니 흩어진 꽃잎들을 전부 주워담았다. 그것은 몇 번을 더 고민하다가 당신에게 다가간다." +
                                    "<br><br><br>그리고 당신의 세상은 다시 현실로 돌아왔다. 작은 꽃감염자가 당신은 물끄러미 바라보고 있는 것처럼 느껴진다. 그러더니 그것은 당신의 손을 한번 더 꽉 쥐었다." +
                                    "<br>당신의 몸이 치유됐다. 작은 꽃감염자는 하늘하늘 어딘가로 멀어져갔다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeHP(player, 50);
                                    changeStamina(player, 50);
                                    changeTrauma(player, -5);
                                    player.flags.whiteFlowerLab_cafeteria = true;
                                    savePlayer(player);
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    whiteFlowerLabRepeated : {
        whiteFlowerLabRepeated_oneWhiteFlower : [
            {
                type : "text",
                value : "당신은 걸어가다가 하얀 꽃 한 송이가 피어있는 것을 보았다. 그것은 마치 살아있는 것처럼 흔들리고 있었다."
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 꽃을 뽑았다.",
                        scene : [
                            {
                                type : "text",
                                value : "당신이 꽃을 뽑는 순간, 당신의 머리에 아이의 비명 소리가 울렸다. 대체 어디서부터 난 비명 소리인지 당신은 알 수가 없다. 확실한 건 분명히 당신에게 들렸다는 것이다. 당신은 뽑은 하얀꽃을 내려다보았다. 하얀꽃의 줄기에서 하얀 액이 주륵주륵 흐른다.... 그리고 그것은 그대로 시들었다."
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeHP(player, 30);
                                    changeTrauma(player, 2);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 꽃을 그냥 내버려두었다.",
                        scene : [
                            {
                                type : "text",
                                value : "하얀 꽃은 당신이 가는 동안에도 너울너울 춤을 추듯 움직였다. 달콤한 냄새가 난다... 어쩐지 당신의 발걸음이 가벼워졌다."
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeHP(player, 10);
                                    changeStamina(player, 10);
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        whiteFlowerLabRepeated_flowerAttack : [
            {
                type : "text",
                value : "당신이 발걸음을 내딛는 순간, 당신의 밑에서 뭔가가 느껴졌다. 당신은 밑을 내려다보았다. 아주 큰 꽃이 당신을 향해 활짝 피어있었다."
            },
            {
                type : "check",
                stat : "dex",
                difficulty : 18,
                success : [
                    {
                        type : "text",
                        value : "당신은 꽃술이 당신의 애널에 침범하기 전에 재빠르게 자리를 피했다. 큰꽃은 당신을 놓치자 으르렁거리듯 꽃잎을 떨더니 그대로 봉우리를 닫았다."
                    }
                ],
                fail : [
                    {
                        type : "text",
                        value : "큰꽃에서 나온 꽃술이 당신의 하의 안으로 쉽게 들어왔다. 당신은 당황해서 꽃술을 움켜잡았지만 꽃술은 멈추지 않았다. 그것은 당신의 엉덩이골 사이로 파고들더니 그대로 찌걱거리는 소리와 함꼐 애널로 돌입했다." +
                                " 꽃술의 울퉁불퉁한 겉면이 당신의 여린 속살을 자극한다. 돌기가 당신의 속살을 긁을 때마다 당신의 두 다리는 바들바들 떨렸다. 그리고 주르륵, 꽃술에서 무언가가 나왔다. 당신의 애널이 물컹물컹한 애액으로 가득 찼다. 이제는 찌꺽이는 소리도 아니었다. 쭈압, 푸슛, 흥건한 소리가 당신의 애널에서 흘러나온다...." +
                                "<br>큰꽃은 당신을 몇 분이고 능욕하고 나서야 만족했다. 꽃술이 당신의 애널에서 스르르 빠져나왔다. 습해진 당신의 애널이 뻐끔거린다."
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            changeHP(player, -5);
                            changeArousal(player, getSensitivityArousalGain(player, "a", 16)),
                            changeSensitivity(player, "aSensitivity", 8);
                            addBodyFluid(player, "a", 20);
                            passTime(player, 5);
                        }
                    }
                ]
            }
        ],
        whiteFlowerLabRepeated_Collapse : [
            {
                type : "text",
                value : "\"콰앙!\"<br><br>당신의 바로 옆에서 무너지는 소리가 들렸다. 당신이 고개를 돌렸을 때는 이미 기둥이 당신 쪽으로 넘어지고 있었다!"
            },
            {
                type : "check",
                stat : "str",
                difficulty : 17,
                success : [
                    {
                        type : "text",
                        value : "당신은 다행히도 쓰러지는 기둥을 몸으로 받아낼 수 있었다. 아프긴 했지만 당신의 근력으로는 버틸 만했다. 당신은 기둥을 치운 후 앞으로 나아갔다."
                    }
                ],
                fail : [
                    {
                        type : "text",
                        value : "당신은 기둥에 그대로 깔렸다. 어떻게든 기둥을 밀어서 빠져나오긴 했지만 빠져나온 후에도 당신의 몸은 욱씬거렸다."
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            changeHP(player, -20);
                            changeStamina(player, -20);
                        }
                    }
                ]
            }
        ]
    },
    slaverCamp : {
        slaverCamp_prisonerCage : [
            {
                type : "text",
                value : [
                    "당신은 금방이라도 끊어질 거 같은 신음 소리를 들었다. 당신은 몸을 숙인 채 신음 소리가 나는 곳으로 고개를 돌렸다. 우리 안에는 수많은 사람들이 있었다. 몇 명은 이미 가슴에 피어싱이 박혀있었고, 또 몇 명은 다리에 보석 피어싱이 박혀서 움직이지도 못하고 있었다." +
                    " 당신은 우리 근처에서 맴돌았다. 자물쇠를 몰래 따는 걸 시도해볼 수는 있을 거 같다. 도망치는 건 그들의 몫이겠지만...."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "자물쇠를 따본다.",
                        type : "check",
                        stat : "dex",
                        difficulty : 18,
                        
                        success : [
                            {
                                type : "text",
                                value : [
                                    "당신은 자물쇠를 조용히 따는 것에 성공했다. 우리에 있던 사람들이 당신을 쳐다보았다. 몇 명은 당신을 쳐다보지도 않고 도망갔고 몇 명은 당신에게 고맙다는 인사를 해보이며 도망갔다. 그리고 몇 명은 그저 우리 안에 남아있었다.",
                                    " 우리에 남아있는 사람들은 도망쳐봤자 어차피 다시 잡힐 거라는 생각에 가만히 있는 거 같았다. 그들의 눈에는 이미 의지가 없었다. 그저 주인의 명령대로 복종하는 인형이 되어 있었다. 몇 명은 팔려나갈 예정인지 목에 상품 코드가 붙어 있었다.",
                                    " 비명 소리가 들린다. 몇 명이 도망치다가 잡힌 모양이다. 당신은 재빨리 그들의 시야 밖으로 도망갔다." +
                                    "<br><br>...그래도 몇 명은 도망가지 않았을까. 당신은 애써 그렇게 생각했다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeStamina(player, 10);
                                    changeTrauma(player, -3);
                                }
                            }
                        ],

                        fail : [
                            {
                                type : "text",
                                value : [
                                    "뒤에서 누군가의 발자국 소리가 들렸다. 자물쇠를 따느라 시간을 너무 지체한 모양이다. 자물쇠를 딴 후 당신은 몸을 돌렸다. 인신매매상이 당신에게 다가오고 있다." +
                                    "<br><br>\"지지마...!\"<br><br>" +
                                    "누군가가 뒤에서 당신을 응원했다. 한 사람이 응원하자 다른 사람도 용기를 내 당신을 응원하기 시작했다. 전부가 당신을 응원한 건 아니었지만 어쨌든 당신의 행동에 희망을 얻은 사람이 있다..." +
                                    "<br><br>당신의 몸에 힘이 솟는다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeHP(player, 100);
                                    changeStamina(player, 100);
                                    startBattle("trafficker1", player, {
                                        onWin: () => startScene(buildDungeonScene(player), player),
                                        onEscape: () => startScene(buildDungeonScene(player), player)
                                    });
                                    return true;
                                }
                            }
                        ]
                    },
                    {
                        text : "그냥 지나친다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 우리를 그저 지나쳤다... 당신이 이곳에서 할 수 있는 일은 없다. 여기서 당신이 잡히게 된다면? 당신은 그들과 똑같은 운명으로 전락할 것이다." +
                                    " 설사 당신이 안 잡히고 자물쇠를 풀어준다고 한들, 도망쳐나간 사람들이 인신매매상에 다시 잡히지 않을 확률은 제로에 가까웠다. 당신은 현명한 선택을 한 것이다.... 아마도."
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        slaverCamp_foodStorage : [
            {
                type : "text",
                value : [
                    "당신은 인신매매상이 임시로 놓은 저장창고를 발견했다. 자원이 조금이라도 없어지면 이들이 조금이라도 주춤하지 않을까? 당신은 식량창고를 뒤졌다. 자원을 꽤나 많이 얻을 수 있었다."
                ]
            },
            {
                type : "effect",
                run : (player) =>{
                    addItem(player, ITEMS.misc.potato);
                    addItem(player, ITEMS.misc.cabbage);
                    addItem(player, ITEMS.misc.mushroom);
                    addItem(player, ITEMS.misc.wheat);
                    addItem(player, ITEMS.mics.rice);
                    addItem(player, ITEMS.misc.wheat);
                    addItem(player, ITEMS.mics.rice);
                }
            }
        ],
        slaverCamp_prisonerDespairRoom : [
            {
                type : "text",
                value : [
                    "대기실, 대기실이라고 했지만 방이 아니었다. 그저 공간이었다. 벽 하나 없이 땅에 줄만 그어져있는 공간. 그리고 당신은 귀를 틀어막고 눈을 가리고 싶어졌다. 수많은 귀족들이 노예들을 강간하고 있었다. 그 좁은 영역 안에서 수치심도 모르고 짐승처럼 노예들을 착취하고 품평을 하고 있었다." +
                    " 그런데도 몇몇 노예들은 귀족의 눈에 들기 위해서 웃으며 허리를 흔들었다. 눈은 울고 있었지만 그들의 입꼬리는 부자연스러울 정도로 올라가있었다. 제발 절 사주세요, 라고 노예들을 말하고 있었다." +
                    " 그들의 절망들로 귀족들은 자신의 위치를 공고화했다. 웃음 소리, 울음 소리, 당신은 뒤로 물러났다. 더 이상 그 자리에 있고 싶지 않았다."
                ]
            }
        ],
        slaverCamp_coin : [
            {
                type : "text",
                value : [
                    "당신은 길을 가다가 바닥에서 뭔가 반짝이는 걸 발견했다."
                ]
            },
            {
                type : "check",
                stat : "int",
                difficulty : 18,

                success : [
                    {
                        type : "text",
                        value : [
                            "동전이다. 귀족이 흘리고 간 걸까. 당신은 돈을 주웠다. 뭔가 축축했다."
                        ]
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            changeGold(player, 1000);
                        }
                    }
                ],

                fail : [
                    {
                        type : "text",
                        value : [
                            "당신은 다시 한번 눈을 깜박여보았지만 아무 것도 찾을 수 없었다. 갈 길을 가자...."
                        ]
                    }
                ]
            }
        ],
        slaverCamp_runner : [
            {
                type : "text",
                value : [
                    "길을 가던 당신은 쓰러져있는 노예를 발견했다. 다가가서 상태를 살폈지만 치료를 해준다고 해도 살 가망은 없는 거 같다. 그는 눈을 간신히 뜨더니 당신의 손을 잡았다.",
                    "<br><br>\"도망가...\"" +
                    "...그리고 그는 죽었다."
                ]
            }
        ],
        slaverCamp_priceTag : [
            {
                type : "text",
                value : [
                    "길을 가던 당신은 노예 명부를 발견했다. <br><br>[이름-나이-성적특성-가격]<br><br>그들은 노예를 인간으로 취급하지 않는다, 가축으로 취급할 뿐." +
                    "<br><br>....<br><br>" +
                    "상류도시 인장이 왜 박혀있는 걸까."
                ]
            }
        ],
        slaverCamp_slavesEnd : [
            {
                type : "text",
                value : [
                    "피냄새와 썩은냄새가 난다... 당신은 위를 올려다보았다. 형체를 알아볼 수 없을 정도로 훼손된 살덩이들로 갈고리에 매달려 있었다.<br><br>" +
                    "<span class='log-danger'>철퍽</span>" +
                    "<br><br>당신은 발밑을 내려다보았다. 피다. 천장에서 떨어진 피가 흙바닥에 작은 웅덩이를 만들고 있었다." +
                    "<br><br>...아직도 따듯하다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    addItem(player, ITEMS.consumable.meatPotion);
                }
            }
        ],
        slaverCamp_dancer : [
            {
                type : "text",
                value : [
                    "쿵, 쿵, 쿵, 어디선가 엄청난 소리가 들려온다. 당신은 고개를 돌렸다. 쉬고 있는 건지 덩치가 있는 인신매매상들이 서로 모여서 춤을 추고 있었다. 근육에 맺힌 땀방울이 촤라락 근육 위에서 튀겼다." +
                    "<br>당신은 정신이 멍해졌다.<br>" +
                    "뛸 때마다 그들의 거대하고 아름다운 남성기가 바지를 입었는데도 두드러져 보였다. 왜 상의는 벗고 있는 걸까. 아하! 춤추느라 벗어던진 거였구나!" +
                    "<br><br>...그들의 웅장한 근육이 꿈에서도 나올 거 같다." +
                    "<br><br>그래도 그들의 춤 때문인지 당신은 마음이 나름 마음이 풍족해지고(?) 기력이 회복됐다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeArousal(player, 20);
                    changeHP(player, 20);
                    changeStamina(player, 20);
                }
            }
        ]
    },
    slaverCampShelter : {
        slaverCampShelter_yuri_01 : [
            {
                type : "text",
                value : [
                    "당신은 유리의 흔적을 쫓아 인신매매단의 임시 처소 근처에 도착했다. 당신의 인기척을 느낀 유리가 당신을 돌아보았다.",
                    "\"여기에 아이들이...\"<br><br>" +
                    "유리는 고개를 숙였다. 몇 초간 고개를 숙이고 있던 유리는 다시 고개를 돌았다." +
                    "<br><br>\"미안. 이러고 있는 동안에도 그들은 고통을 받고 있겠지.\"" +
                    "<br><br>확고한 호박색 눈동자, 그는 자신이 목숨을 잃게 된다고 하더라도 아이들을 구출할 생각이다." +
                    "<br><br>\"내 옆에 있어줘서 고마워, {playerName}.\""
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    player.flags.slaverCampShelter_yuri_01 = true;
                }
            }
        ],
        slaverCampShelter_yuri_02 : [
            {
                type : "text",
                value : [
                    "당신은 유리가 옆에서 싸우는 모습을 지켜보았다. 그의 동작은 언제나처럼 유려했고 상대방의 숨통을 끊는 일에 주저하지 않았다." +
                    " 당신은 유리에게 언제부터 사람 숨통을 끊을 수 있게 되었냐고 물었다. 당신의 질문에 유리는 자신의 쌍검을 소매 안으로 집어넣었다. 그의 쌍검에는 하류도시의 사람들 것으로는 보이지 않는 보석이 하나 박혀있었다, 그의 눈동자를 닮은 호박." +
                    "<br><br>\"...누군가를 지키기 위해서는... 누군가를 베어야 할 때가 있어.\"<br><br>" +
                    "유리는 당신의 시선을 피했다." +
                    "<br><br>\"난 그저 지키고 싶었어. 그뿐이야.\""
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    player.flags.slaverCampShelter_yuri_02 = true;
                }
            }
        ],
        slaverCampShelter_yuri_03 : [
            {
                type : "text",
                value : [
                    "유리의 걸음이 멈췄다. 아이들의 신발이다. 그리고 피.... 신발은 두 짝이 아니었다. 유리는 조용히 신발 앞에 앉았다. 그리고 신발을 가슴에 안고 잠시 고개를 숙였다." +
                    "<br><br>\"...가자.\"<br><br>" +
                    "그는 다시 신발을 내려놓았다."
                ]
            },
            {
                type : "text",
                value : [
                    "\"...{playerName}. 너는 이렇게 싸우는 데 의미가 있다고 생각해?\"<br><br>" +
                    "당신과 같이 걸어가던 유리가 입술을 뗐다." +
                    "<br><br>\"한 명을 구하고, 한 명을 잃고.... 마치 밑 빠진 독에 물을 붓는 듯한 느낌이야.<br>미안. 너한테는 자꾸 무거운 얘기만 하게 되네.\"" +
                    "<br><br>유리는 무거운 얘기는 이제 그만하겠다는 듯이 고개를 저었다. 더 얘기를 할 생각은 없는 거 같다. 그는 그저 말없이 당신에게 다가와 당신의 상처를 치료해주었다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeHP(player, 50);
                    changeStamina(player, 50);
                    player.flags.slaverCampShelter_yuri_03 = true;
                }
            }
        ],
        slaverCampShelter_yuri_04 : [
            {
                type : "text",
                value : [
                    "당신의 옆에서 걸으며 유리는 자신의 팔을 치료했다." +
                    "<br><span class='log-yuri'>우리는 아직 죽지 않았다</span><br>" +
                    "누군가 바닥에 써놓은 글씨에 유리의 발걸음이 멈췄다. 잠시 생각에 잠겨있던 그는 반란군들에 대해 어떻게 생각하냐고 물었다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 반란군에게도 이유가 있을 거라고 대답한다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 대답에 유리는 고개를 끄덕였다."+
                                    "<br><br>\"반란군은 처음부터 반란을 원해서 시작한 건 아니었어. 그저 그들은 소중한 사람을 지키거나, 찾거나, 약한 사람들을 도와주기 위해서 생겼던 것뿐이야.<br>지금은 상류도시를 전복해야 한다는 생각을 가진 사람들도 많은 거 같지만.... 처음에는 작게 시작했어.\"<br><br>"+
                                    "유리는 폭력은 싫어한다고 말했다. 그는 상류도시에 괴물들만이 있는 건 당연히 아니라고 말했다. 그곳에서도 소중한 사람들을 사랑할 줄 아는 사람이 있다고, 그리고 타인에게 동정심을 느끼는 사람들도 있다고 그는 이어 말했다." +
                                    "<br><br>\"하지만 그뿐이야.<br><br>그 도시에는 괴물들이 너무 많아. 그러니 변화를 위해서라면....\"<br><br>" +
                                    "....<br><br>" +
                                    "\"누군가는 피를 묻혀야 하는 걸지도 몰라.\""
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("yuri", "affection", 3);
                                    player.flags.slaverCampShelter_yuri_04 = true;
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 반란군은 없어져야 한다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"...그래?\"<br><br>"+
                                    "유리는 씁쓸하게 웃었다." +
                                    "<br><br>\"그들이 소중한 것을 되찾기 위해, 그리고 누군가를 도와주기 위해 결성한 거라고 하더라도... 없어져야 한다고 생각해?\"<br><br>" +
                                    "당신을 돌아보는 유리의 얼굴은 슬퍼보였다." +
                                    "<br><br>\"...나는 그렇게 생각하지 않아.\""
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("yuri", "affection", -2);
                                    player.flags.slaverCampShelter_yuri_04 = true;
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        slaverCampShelter_yuri_05 : [
            {
                type : "text",
                value : [
                    "울음 소리가 들린다. 비명 소리가 들린다. 그리고, 그 소리들에 섞인 익숙한 목소리들. 유리는 주먹을 불끈 쥐었다." +
                    "<br><br>\"준비됐어?\"<br><br>" +
                    "그는 마지막으로 당신을 치료해주었다. 아이들을 위해, 당신은 앞으로 나아가야 한다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeHP(player, 100);
                    changeStamina(player, 100);
                }
            }
        ],
        slaverCampShelter_memo : [
            {
                type : "text",
                value : [
                    "[누군가가 흘겨쓴 쪽지]" +
                    "<br><br>쉘터를 노리라는 명령이 떨어질 줄은 몰랐다.<br><br>" +
                    "어린 애들을 잡아다가 어디에 쓰겠다는 거야? 돈만 제대로 준다면야 상관없지만. 뭐, 어린 애들이 취향인 변태새끼들도 이 세상에는 존재하는 법이지." +
                    "<br><br>들어보니까 지금 누군가를 찾기 위해서 이러는 거란다." +
                    "<br><br>쉘터에 누군가 있었나?" +
                    "<br><br>난 쉘터에 하류도시의 영웅이 있다는 것밖에 모르는데." +
                    "<br><br>아. 어쩌면 하류도시의 영웅이 어떻게 반응하는지 보고 싶었던 건가. 그런 이유라면 정말 더 변태같군." +
                    "<br><br>역시 상류도시 놈들의 생각은 이해할 수가 없다. 앗차차, 여긴 상류도시 출신도 은근 있으니 입 조심해야지." +
                    "<br><br>일단 우리 보스부터가 상류도시 출신 사람이니까."
                ]
            }
        ]
    },
    erwinHideout : {
        erwin1 : [
            {
                type : "text",
                value : [
                    "마물의 은신처 입구, 하얀 꽃잎들이 여기저기에 떨어져 있었다. 하얀 꽃잎을 밟고 들어간 입구는 성인 남성 한 명 정도가 겨우 통과할 정도로 작았다. 보통 성인 남성이라면 고개를 숙이고 들어갈 만한 구멍, 그리고 그후로부터의 공간은 점점 넓어졌다." +
                    "<br>바닥에 깔려있는 하얀 꽃잎들 사이로 당신은 글자 하나를 발견했다. 에르윈, 에르윈, 에르윈.... 누군가가 에르윈이라는 바닥에 몇 번이고 새겨놨다. 끝이 뾰족한 돌과 뭉툭한 돌이 여기저기 널려 있었다. 당신은 발걸음을 옮겼다." +
                    "<br><br>\"에르윈!\"<br><br>" +
                    "어디서 목소리가 들렸는지 모르겠다. 당신은 이리저리 고개를 돌렸다. 그 순간 익숙한 얼굴이 당신의 앞에 나타났다. 반란군 수장 처형식에서 봤던 그 여자다. 그 여자는 당신을 보며 손짓을 하고 있었다." +
                    "<br><br>\"멀리 가지 말라고 했잖니.\"<br><br>" +
                    "그는 인자하게 웃으며 당신에게 손을 뻗었다. 그리고 그 손이 당신에게 닿는 순간, 눈을 깜박, 그는 사라졌다. 닿았...닿았었나? 당신은 어떤 것도 느끼지 못했다."
                ]
            }
        ],

        erwin2 : [
            {
                type : "text",
                value : [
                    "당신은 계속 걸어갔다. 하얀꽃잎들이 불안정하게 이리저리 흐트러져 있었다. 당신이 발걸음을 내딛을 때마다 하얀 꽃잎들이 위로 솟구쳤다가 그대로 다시 밑으로 꺼졌다." +
                    "<br>당신이 모르는 얼굴이 당신의 앞에 나타났다. 그는 애정이 깊은 눈으로 당신을 쳐다보며 밖에서 나돌아다니는 건 네 남동생이나 너나 똑같다고 말했다." +
                    "<br><br>\"그래서 내가 싫어?\"<br><br>" +
                    "햇살처럼 밝은 목소리였다. 당신은 그 목소리가 어디에서부터 들려온 건지 찾을 수 없었다. 아무튼 당신의 앞에 서있는 남자는 갑자기 하얀꽃을 건네받고 있었다." +
                    "<br><br>\"그럴 리가. 내가 널 사랑하는 이유들 중 하나인 걸.\"<br><br>" +
                    "눈을 깜박였을 때 남자는 없었다. 환상이라도 보는 걸까? 아니면, 또... 누군가의 기억을? 당신은 밑을 내려다보았다. 하얀꽃 하나가 당신의 발목을 꽈악 붙잡고 있었다." +
                    "<br>...하지만 하얀꽃 하나만으로는 당신의 앞길을 막을 수 없다."
                ]
            }
        ],

        erwin3 : [
            {
                type : "text",
                value : [
                    "드디어 당신은 입구에서부터 이어지던 많은 발자국들을 찾아냈다. 발자국들은 더 깊은 곳으로 이어져 있었다. 당신은 가다가 바닥의 글자를 읽었다." +
                    "<br><br><strong>아렌. 아렌이 나를 찾고 있어. 아렌이 위험해. 에르 에리 에르 에르윈이 갈 거야. 누나가 갈게. 제발, 죽지만 말아줘.</strong><br><br>" +
                    "<strong>다시 그곳으로 돌아가기 싫어. 하지만 내 동생 내 동생 내 동생 내 동 생 내동 생 내 동생</strong><br><br>" +
                    "그 후의 글자는 없다."
                ]
            }
        ],

        erwin4 : [
            {
                type : "text",
                value : [
                    "당신은 발자국들을 따라 더 안으로 향했다. 비릿하게 달콤한 냄새가 당신의 코를 찌른다. 당신은 고개를 돌렸다. <br><br>.....<br><br>전부.... 시체들이다. 그리고 시체들 위로 하얀꽃들이 무성하게 피어있었다. 당신은 시체들이 입고 있는 옷을 자세히 보았다." +
                    "<br>상류도시에서 많이 봤던 백색 제복. 발렌은 당신 이전에도 많은 사람들을 이곳으로 보냈던 걸까? 경계병의 옷을 입고 있는 사람은 없었다."
                ]
            }
        ],

        erwin5 : [
            {
                type : "text",
                value : [
                    "꽃들이 가득한 공간이다. 당신은 꽃들 사이에서 무언가를 보았다. 하얀꽃잎으로 만들어진...." +
                    "<br>속옷<br>" +
                    "저번의 하얀꽃잎으로 만들어진 브라와 관련이 있는 걸까?" +
                    "<br><br>달콤한 냄새가 점점 강해진다. 곧 마물과 만날 거 같다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    addItem(player, ITEMS.underwear.whiteFlowerPants);
                    player.flags.erwinHideout_erwin5 = true;
                    savePlayer(player);
                }
            }
        ],

        erwin6 : [
            {
                type : "text",
                value : [
                    "통로가 고요하다. 달콤한 냄새는 더 진해졌다. 몇 걸음만 더 나아가면 당신은 마물과 마주칠 수 있을 것이다." +
                    "<br><br><span class='log-danger'>돌이킬 수 없는 결정입니다.</span>"
                ]
            }, 
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 마물을 베기 위해 앞으로 나아갔다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "하얀꽃 무덤에서 내려온 마물은 언젠가 경계병들을 공격할 것이고, 경계병들이 무너져내리면 하류도시를 삼킬 것이고, 하류도시마저 무너지면 결국 상류도시 사람들도 죽게 될 것이다. 마물은 죽여야 한다. 그리고 당신이 받은 임무는 이 마물을 죽이는 거였다." +
                                    "<br>당신은 앞으로 계속 나아갔다."
                                ]
                            }
                        ]
                    },
                    {
                        text : "당신은 임무를 포기했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 임무를 포기했다." +
                                    "<br><br>당신은 되돌아왔던 길을 다시 나갔다. 하얀꽃잎들이 당신의 발밑에서 바스러졌지만, 시들지는 않았다. 당신은 계속 앞으로 나아갔다." +
                                    "마물의 은신처에서 벗어난 당신은 달콤한 냄새가 더 이상 나지 않을 때까지 계속 걸어갔다."
                                ]
                            },
                            {
                                type : "text",
                                value : [
                                    "경계병 제3초소에서 경계를 서고 있던 경계병들이 당신을 발견하고 당신에게 다가왔다. 그들은 당신을 '하류도시의 영웅'이라고 부르며 반겼다. 적어도 하류도시에서 경계병들은 당신을 제대로 존중해주고 있는 거 같다." +
                                    "<br><br>\"하류도시의 영웅, 마물은 퇴치하고 온 건가?\"<br><br>" +
                                    "마물에게 당한 것이 많은 만큼, 그들은 기대하는 눈으로 당신의 입술을 보고 있다. 오늘도 그들의 동료들 중 몇몇은 시체로 돌아온 모양이다. 당신은 시체 쪽으로 곁눈질했다. 시체에서는 역한 냄새만 풍겼다. 달콤한 냄새는 전혀 느껴지지 않았다."
                                ]
                            },
                            {
                                type : "choice",
                                choices : [
                                    {
                                        text : "당신은 마물을 죽였다고 대답했다.",
                                        scene : [
                                            {
                                                type : "text",
                                                value : [
                                                    "당신의 대답에 그들은 마물을 죽여줘서 고맙다고 말했다. 상류도시 출신이든, 하류도시 출신이든, 이 순간만큼은 당신에게 감사하는 마음을 전하는 건 똑같았다." +
                                                    "<br><br>\"어딜 감히 경계병 제3초소까지 내려오려고...\"<br><br>" +
                                                    "\"절대로 내 가족이 있는 곳으로는 못 가게 할 거다.\"<br><br>" +
                                                    "그들은 당신의 대답으로 의지를 다지게 된 거 같다."
                                                ]
                                            },
                                            {
                                                type : "text",
                                                value : [
                                                    "<span class='log-eric'>\"마물을 죽였다고?\"</span>" +
                                                    "<br><br>뒤에서 익숙한 목소리가 들린다. 당신은 에릭을 돌아보았다. 에릭은 차가운 시선으로 당신을 위아래로 훑어보고 있었다." +
                                                    "<br><br>\"...들어가보면, 답이 나오겠지.\"<br><br>" +
                                                    "에릭의 손가락이 오른쪽 허리춤의 홀스터를 규칙적으로 톡, 톡 두드렸다. 빠르지 않은 움직임이었지만 그 안에 담긴 의미는 위협적이었다."
                                                ]
                                            },
                                            {
                                                type : "effect",
                                                run : (player) => {
                                                    changeNPCEmotion("eric", "affection", -5);
                                                    changeNPCEmotion("eric", "rage", 10);
                                                    savePlayer(player);
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text : "당신은 마물을 죽이지 않았다고 대답했다.",
                                        scene : [
                                            {
                                                type : "text",
                                                value : [
                                                    "당신의 대답에 경계병들의 표정이 굳었다. 그들은 당신의 대답이 이해가 안 된다는 듯 서로를 바라보았다. 한 명이 못 참고 당신의 멱살을 잡아올렸다." +
                                                    "<br><br>\"그게 무슨 소리야. 마물을 안 죽였다고?\"<br><br>" +
                                                    "\"못 죽인 걸 잘못 말한 거겠지. 마물이 좀 세냐.\"<br><br>" +
                                                    "경계병들 중 몇 명이 과열되려는 분위기를 막아주긴 했지만 당신을 향한 싸늘한 시선은 거두어지지 않았다." +
                                                    "<br><br>\"미안하다. 요새 죽은 애들이 많아서... 민감해. 대신 사과하마.\"<br><br>" +
                                                    "경계병 제3초소를 담당하고 있는 대장이 당신의 어깨에 손을 올리며 말했다. 그는 괜찮다는 듯 당신의 어깨를 두드려주었다."
                                                ]
                                            },
                                            {
                                                type : "text",
                                                value : [
                                                    "<span class='log-eric'>\"마물을 안 죽였다, 라.\"</span>" +
                                                    "<br><br>뒤에서 익숙한 목소리가 들린다. 당신은 에릭을 돌아보았다. 그의 차가운 녹안이 당신을 위아래로 훑어보았다." +
                                                    "그는 더 이상 아무 말도 하지 않았다. 그저 손가락으로 오른쪽 허리춤의 홀스터를 규칙적으로 톡, 톡 두드렸을 뿐이었다. 하지만 그 단조로운 소리조차 위협적으로 느껴졌다."
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type : "text",
                                value : [
                                    "당신은 에릭이 마물의 흔적을 쫓아서 가는 뒷모습을 응시했다. 이유는 모르겠지만 그가 금방 그 마물을 찾을 거 같다는 예감이 든다.... 몇몇 경계병들은 수군거렸고, 몇몇 경계병들은 그래도 당신에게 수고했다는 말을 해주었다.",
                                    "<br>당신은 경계병 제3초소에 서있다." +
                                    "<br>달콤한 향이 흐려져 간다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    leaveDungeon(player);

                                    player.flags.uppercity_story_02_notKillErwin = true;
                                    player.flags.uppercity_story_02_done = true;
                                    player.flags.uppercity_story_02_done_day = getCurrentDay(player);
                                    player.flags.uppercity_story_02_quest_unlocked = false;
                                    
                                    if (!player.quest.completed.includes("uppercity_story_02")){
                                        player.quest.completed.push("uppercity_story_02");
                                    }
                                    
                                    if (player.quest.active?.id === "uppercity_story_02"){
                                        player.quest.active = null;
                                    }

                                    changeNPCEmotion("eric", "affection", -5);
                                    changeNPCEmotion("valen", "affection", -10);
                                    changeNPCEmotion("valen", "rage", 5);
                                    changeNPCEmotion("akasia", "rage", 10);
                                    changeNPCEmotion("akasia", "affection", -10);
                                    
                                    savePlayer(player);
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    whiteFlowerOldLab : {
        whiteFlowerOldLab_flowerfight : [
            {
                type : "text",
                value : [
                    "연구소를 지나던 당신은 하얀꽃인간의 시체를 보았다. 머리부터 시작해서 몸까지 완전히 시들어있어서 원래 어떤 형태의 하얀꽃인간이었는지도 분간이 되지 않았다. 하지만 확실한 건, 하얀꽃의 시체의 일부분에 하얀즙이 아니라 검은 액이 묻어있다는 것이었다." +
                    "<br>그리고 그 검은액에서는 달콤한 냄새가 아니라 역겨운 냄새가 났다." +
                    "<br><br><br>....<br><br><br>썩은 피가 고여있는 냄새."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 하얀꽃 시체에 가까이 다가가서 더 살펴보았다.",
                        type : "check",
                        stat : "int",
                        difficulty : 20,

                        success : [
                            {
                                type : "text",
                                value : [
                                    "가까이 다가간 하얀꽃인간 시체에는 무언가의 살점조각이 붙어 있었다. 격렬하게 싸웠던 건지 다시 살펴본 하얀꽃인간의 몸에는 성한 부분이 없었다. 당신은 시선을 내렸다.",
                                    "<br>성기가 보통 성기와는 달랐다. 살점들이 더욱 붙은 거 같은, 기괴하게 부풀어있는 상태였다." +
                                    "<br>...더 이상은 안 보는 게 낫겠다."
                                ]
                            }
                        ],

                        fail : [
                            {
                                type : "text",
                                value : [
                                    "당신은 하얀꽃인간의 시체를 살폈지만 더 얻을 수 있는 정보는 없었다. 당신은 다시 앞으로 나아가기로 했다."
                                ]
                            }
                        ]
                    },
                    {
                        text : "당신은 그냥 지나갔다."
                    }
                ]
            }
        ],
        whiteFlowerOldLab_abomination : [
            {
                type : "text",
                value : "연구소를 지나던 당신은 평균적인 발 크기만한 벌레처럼 생긴 것을 보았다. 그것은 그륵그륵 소리를 내더니 그대로 당신에게로 달려들었다."
            },
            {
                type : "check",
                stat : "dex",
                difficulty : 17,
                success : [
                    {
                        type : "text",
                        value : "당신은 다행히도 벌레를 피할 수 있었다. 당신은 그대로 발로 벌레를 밟아눌렀다. 일반 벌레와 다르게 그것은 증기가 빠지는 소리가 나더니 몇 번을 더 꿈틀이다가 그대로 메말라버렸다. <br><br>당신은 그것에서 알같은 것을... 주울 수 있었다."
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            addItem(player, ITEMS.misc.abominationSmallEgg);
                            savePlayer(player);
                        }
                    }
                ],
                fail : [
                    {
                        type : "text",
                        value : "당신은 벌레를 피하려고 했지만 벌레가 더 빨랐다. 벌레는 당신의 하복부에 찌르듯이 지나가더니 필사적으로 뭔가를 주입하기 시작했다. 당신은 벌레를 떼내려고 했지만 이미 늦었다... <br><br>쿵, 쿵, 당신의 뱃속에서 불길한 것이 박동한다. 최대한 빨리 병원에 가야할 거 같다."
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            changeTrauma(player, 2);
                            infectAbomination(player);
                            savePlayer(player);
                        }
                    }
                ]
            }
        ],
        whiteFlowerOldLab_bloodLine1 : [
            {
                type : "text",
                value : [
                    "당신은 바닥 위의 변색된 핏자국들을 보았다. 손바닥 모양으로 남아있는 것도 있었고 손톱자국 모양으로 남아있는 것도 있었다. 핏자국들은 전부 연구소 출입문을 향하고 있었다." +
                    "<br><br>...아무도 연구소 출입문에 닿지 못한 거 같지만." +
                    "<br><br>당신은 핏자국을 따라 발걸음을 옮겼다."
                ]
            }
        ],
        whiteFlowerOldLab_bloodLine2 : [
            {
                type : "text",
                value : [
                    "변색된 핏자국의 마지막은 수많은 시체들로 이어져 있었다. 분명 오래된 시체일 텐데 시체들은 마치 가공이라도 된 것마냥 깨끗했다, 온몸이 하얀 꽃줄기로 찢긴 것만 제외하면. 마치 식물이 그들의 몸에서 자라난 것같은 끔찍한 형상이었다.",
                    "<br>그 과정이 고통스러웠는지 대부분의 시체들이 눈을 감지 못하고 있었다. 눈구덩이는 이미 썩어서 눈알 자체가 없었지만- 몇은 심지어 그 자리에 하얀꽃이 피어있었다- 그들이 얼마나 고통스러웠을지는 짐작할 수 있었다." +
                    " 시체들 대부분은 흰색 가운을 입고 있었다. 당신은 흰색 가운 사이에서 명찰을 하나 꺼내들었다. 바스락거리는 오래된 종이 위에 누군가의 이름이 써져 있었다. 잘 보이지는 않는다. 하지만 그 위에 유성매직으로 삐뚤삐뚤 **의 엄마라고 써져 있었다." +
                    "<br>...당신은 명찰을 내려놓았다."
                ]
            }
        ],
        whiteFlowerOldLab_overSee : [
            {
                type : "text",
                value : [
                    "당신은 시든 꽃반지 하나를 보았다. 시든 꽃반지에서는 어떤 냄새도 나지 않았다. 당신은 당신도 모르게 당신의 손가락을 만지작거렸다." +
                    "<br>고개를 들자 누군가가 작게 뚫어둔 구멍이 있었다. 대체 벽을 어떻게 뚫었는지는 모르겠지만 당신은 뚫린 구멍으로 내부를 살펴보았다." +
                    "<br><br>누군가가 벽에 기대어 앉아있었다. 당신은 조금 더 가까이 얼굴을 댔다. 방안의 구조가 조금씩은 보인다. 여기저기에 설치되어 있는 유리관들, 유리관들은 사람 한 명 정도는 거뜬히 들어갈 수 있을 정도로 컸다." +
                    "<br><br><span class='log-danger'>그리고 그 유리관들은 전부 깨져있었다.</span>" +
                    "<br><br>방안을 살펴보던 당신은 다시 이마를 뗐다. 여기서 더 알아낼 수 있는 건 없을 거 같다."
                ]
            }
        ],
        whiteFlowerOldLab_childPainting : [
            {
                type : "text",
                value : [
                    "아이가 그린 듯한 그림이 벽에 붙어있다. 하얀꽃들이 가득하고, 주인공처럼 보이는 꽃은 마법전사처럼 화려한 것을 이것저것 두르고 있었다. 그리고 그림의 가장 밑에 있는 글자, [우리가 사람들을 지킬 거예요]."
                ]
            }
        ],
        whiteFlowerOldLab_soraFather01 : [
            {
                type : "text",
                value : [
                    "당신은 누군가의 방에 들어왔다. 책상 위에는 물이 다 증발한 화분이 있었고, 그 화분에는 아마 하얀꽃이었을 어떤 식물의 줄기가 푹 밑으로 꺼져 있었다. 당신은 그의 책상에 다가갔다. 업무 일지가 하나 놓여 있었다." +
                    "<br><br>" +
                    "[04/30] 하얀꽃의 재생력은 대단하다. 아직 실험을 하지 않은 아이가 다쳤는데, 사람 몸에서 자랄 수 있도록 개조한 하얀꽃을 상처에 심자마자 바로 무릎의 상처가 나았다." +
                    "<br>[05/03] 이정도의 재생력이라면 흉물을 이길 수 있을지도 모른다. 게다가 하얀꽃이 몸안에서부터 피어난 실험체들은 모든 능력이 인간이었을 때의 능력을 초월했다. 도시에 이렇게라도 공헌할 수 있는 게 기쁘다." +
                    "<br>[06/10] 개인의 희생이 필요하다는 걸 모르는 건가? 피실험체의 의지를 없애야 할지도 모르겠다. 하얀꽃에는 환각, 환청 등 인지를 왜곡시키는 성분도 들어있으니 가능할 거 같다." +
                    "<br>[02/22] 의지와 기억들을 끊어냈다. 그런데도 이들은 인간이 되고 싶어한다. 하얀꽃들을 컨트롤하기 위해서는 하나가 필요하다. 모두와의 감정이 연결된 무언가.... 우리는 그걸 만들기로 했다. 우리에게 복종하고, 다른 실험체들을 복종시킬 아름다운 무언가를." +
                    "<br>[01/10] 창백. 하얀꽃에서 만들어진 아이는 창백하다. 인간의 형태도 갖추지 못한다. 하지만 그는 우리를 보더니 곧 인간의 형태를 갖추었다. 똑똑하다, 우리 인간들처럼." +
                    "<br>[12/21] 모든 하얀꽃들은 창백에게서 영향을 받는다. 그래서 우리는 우리들의 대의를 창백에게 설명하려고 했다. 하지만 창백은 그런 거엔 관심이 없다. 그것은 마음에 드는 사람의 얼굴로 변하는 것에 더 관심이 많다. 대체 언제까지 그런 장난을 칠 생각이지?" +
                    "<br>[03/05] 창백이 말했다. 난 인간이야. 다른 하얀꽃들도 말했다. 우린 인간이야. 인간이 되고자 하는 의지가 예전보다 더 강해진 거 같다. <br><br>...창백을 잘 가르쳐야 한다.",
                    "<br><br><br><br><div style='text-align:center; font-size:2rem; color: #ff0000;'>실험 폐기</div><br><br><div style='text-align:center; font-size:2rem; color: #ff0000;'>위험성 : 최고 등급</div>"
                ]
            }
        ],
        whiteFlowerOldLab_bloodtunnel : [
            {
                type : "text",
                value : [
                    "피묻은 복도가 시작되었다. 저벅, 저벅, 저벅, 변색된 피라 분명 말라비틀어졌을 텐데도 어쩐지 당신은 발에 뭔가가 끈적끈적 붙는 느낌이 들었다." +
                    "<br><br>저벅, 저벅, 저벅.<br><br>" +
                    "저벅, 저벅, 저벅.<br><br>" +
                    "저벅, 저벅, 저벅.<br><br>" +
                    "잠깐. 당신의 발자국 소리가 맞는가? 당신은 고개를 들었다. 앞에는 없다. 당신은 뒤를 돌았다." +
                    "<br><br>당신의 뒤에 쌍검을 든 꽃인간이 하나 있었다. 그는 당신을 증오하는 눈으로 노려보고 있다. 쌍검꽃인간이 당신에게 달려든다!"
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    startBattle("flower5", player, {
                        onWin: () => startScene(buildDungeonScene(player), player),
                        onEscape: () => startScene(buildDungeonScene(player), player)
                    });
                    return true;
                }
            }
        ],
        whiteFlowerOldLab_whityFlowers : [
            {
                type : "text",
                value : [
                    "하얀꽃만이 가득한 꽃밭에 도착했다. 달콤한 냄새가 당신의 코를 기분 좋게 자극한다. 하얀꽃밭 사이사이로 당신은 아이들이 놀다만 장난감으로 보이는 것들도 봤다. 인형, 로봇, 자동차.... 전부 낡았지만 여전히 손떼가 묻어있었다. 아이들은 분명 이 장난감들을 사랑했을 것이다." +
                    "<br>당신은 종이 한 장을 집어들었다." +
                    "<br><br>[똑똑한 박사님이 저한테는 하류도시의 영웅이 될 거라고 했어요! 나는 하류도시의 영웅이 될 거예요!]<br><br>" +
                    "종이의 마지막에는 동그란 도장이 찍혀 있었다.<br><br>[참 잘했어요]"
                ]
            },
            {
                type : "text",
                value : [
                    "그리고 그 종이 뒤에 적혀있는 문장." +
                    "<br>[어떻게 아이들한테까지 이럴 수 있어? 내가 다 데리고 나갈 거야.]"
                ]
            }
        ],
        whiteFlowerOldLab_food : [
            {
                type : "text",
                value : [
                    "조리대다. 당신이 조리대에 가까이 가려는 순간 어디선가 동요가 들려온다." +
                    "<br><br>어린 아이들과 어른들이 다같이 나눠먹어요~ 다같이 나눠먹어요~ 뭐든 다같이 나눠먹어요~<br><br>" +
                    "오물조물오물조물, 어린 아이 친구들, 어른들도 잘못을 할 수 있답니다~ 다같이 나눠먹으려면 어른들이 잘못을 했을 때 꼭 말해줘야 해요~" +
                    "<br><br>안 그러면 안 그러면 흉물이 당신을 와아앙, 그것도 아니면 당신의 부모님이 당신에게 안녕안녕 영원한 작별인사를~ 할 수도 있으니까요~" +
                    "<br><br><br>동요는 멈췄다. 당신은 밀과 쌀을 얻었다. 피실험체에게 밥은 잘 먹였던 모양이다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    addItem(player, ITEMS.misc.rice);
                    addItem(player, ITEMS.misc.wheat);
                    addItem(player, ITEMS.misc.rice);
                    addItem(player, ITEMS.misc.wheat);
                    savePlayer(player);
                }
            }
        ],
        whiteFlowerOldLab_deadTentacle : [
            {
                type : "text",
                value : [
                    "죽은 촉수가 벽에 붙어있다. 당신은 처음에 그것이 꽃인간의 촉수인 줄 알았다. 하지만 아니었다. 그 촉수는 흉물의 촉수였다.",
                    "<br>하얀꽃들이 여기저기에 박혀있는 흉물의 촉수.... 당신은 촉수의 시체에서 시선을 뗐다."
                ]
            }
        ],
        whiteFlowerOldLab_whitetunnel : [
            {
                type : "text",
                value : [
                    "백색 복도를 걷고 있는데 뒤에서 또 발걸음 소리가 들려왔다. 당신은 바로 뒤를 돌았다. 당신의 뒤로 접근하고 있던 쌍검꽃인간이 움직임을 멈췄다." +
                    "<br><br>\"...인간은, 다 싫어.\"<br><br>" +
                    "당신의 예상보다 훨씬 앳된 목소리였다. 쌍검꽃인간이 당신에게 달려들었다!"
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    startBattle("flower5", player, {
                        onWin: () => startScene(buildDungeonScene(player), player),
                        onEscape: () => startScene(buildDungeonScene(player), player)
                    });
                    return true;
                }
            }
        ],
        whiteFlowerOldLab_soraFather02 : [
            {
                type : "text",
                value : [
                    "당신은 남자의 시체를 보았다. 그리고 당신은 그 시체를 알아보았다. 당신이 꿈속에서 보았던 그 남자다, 소라와 똑같은 백발에 금안을 하고 있는 남자. 그는 벽에 기대어 앉아있었다." +
                    "<br>그의 흉부에 꽂혀있는 하얀꽃이 눈에 띈다. 살아있는 건가? 당신은 그에게 다가가서 손을 대보았다. 차갑다. 하지만 이상하게 죽은 거 같지는 않다. 그는 그저 <span class='log-pale'>창백</span>하다." +
                    "<br>당신은 그가 들고 있는 무전기에 손을 뻗었다. 전원 버튼을 누르자 지지직 소리가 들린다. 녹음기록이 있다. 당신은 녹음기록을 틀었다."
                ]
            },
            {
                type : "text",
                value : [
                    "[녹음기록 1]" +
                    "<br>\"소라, 아빠 말 좀 들어봐, 응? 이건 그저 대의를 위해ㅅ\"" +
                    "<br>\"아뇨. 아빠는 이미 떳떳하지 않다는 걸 알고 있었어요. 떳떳했다면 저한테 이렇게 숨기려고 할 생각도 하지 않았겠죠.\"" +
                    "<br>\"....<br>....<br>....<br>아직 어려서 그런지 말이 안 통하는 구나. 집에 들어가있어라. 그리고 다시는 여기에 오지 말고.\""
                ]
            },
            {
                type : "text",
                value : [
                    "[녹음기록 2]" +
                    "<br>\"...다시 말해봐.\"" +
                    "<br>\"창백과 소라가 교류가 있었던 거 같습니다. <br>과장님. 딸이 소중하시다는 건 알지만 대의를 위해서는 따님을\"" +
                    "<br>\"아니. 소라는 내가 알아서 한다.\""
                ]
            },
            {
                type : "text",
                value : [
                    "[녹음기록 3]" +
                    "<br>\"과장님, 라우렌스 가문에서 마지막 경고를 내렸습니다. 당장 실험을 중단하고 상류도시로 복귀할 것. 그들은 꽃인간이 인간에게 더 큰 피해를 줄 거라 생각합니다.\"<br>" +
                    "\"지금 와서 폐기라고? 절대 안 될 일이지.... 내가 지금까지 얼마나 많은 사람들을 갈아넣었는데....\"<br>" +
                    "\"과장님?\"<br>" +
                    "\"이제 와서 멈추면 내가 지금까지 한 건 학살이야. 이 실험은 멈추지 않는\"<br>" +
                    "<br><br><br>쨍그랑 소리와 함께 여기저기서 비명 소리가 들렸다. 지지직 소리와 함께 마지막 녹음 기록이 끊겼다."
                ]
            },
            {
                type : "text",
                value : [
                    "당신은 녹음기를 그의 손에 다시 무전기를 쥐어준 후 걸음을 옮겼다." +
                    "<br><br>...뭔가 이상하다." +
                    "<br><br>불길한 기분이 들어서 당신은 뒤를 돌아보았다." +
                    "<br><br><strong>아까까지만 해도 뒤에 있었던 시체가 없다.</strong>"
                ]
            }
        ],
        whiteFlowerOldLab_soraFather03 : [
            {
                type : "text",
                value : [
                    "낙서가 가득한 방이었다. 글씨체는 전부 다 달랐다. 당신은 이걸 한 사람이 쓴 건지, 아니면 여러 사람이 쓴 건지 분간할 수가 없었다. 글씨체는 다 달랐지만 말투는 전부 비슷했기 때문이었다." +
                    "당신이 아는 이름이 여러 번 써있었다. <span class='log-pale'>소라. 소라. 소라. 소라. 소라.</span> 안녕하세요/김시합니다/사랑해요/안아주세요 등등 여러 인삿말들도 뒤죽박죽 써있었다." +
                    "<br><br>어지러운 낙서에서 시선을 떼고 당신은 앞을 바라보았다. 곧 임무를 끝낼 수 있을 거 같다."
                ]
            }
        ]
    },
    rebelsHideOut : {
        rebelsHideOut_savingPeople : [
            {
                type : "text",
                value : [
                    "당신은 반란군의 근거지에서 끊어진 쇠사슬들이 여기저기에 널려있는 것을 보았다. 몇몇 쇠사슬에는 값비싼 보석 조각들이 달려 있었다. 어쩌면 반란군들이 상류도시의 노예를 구했던 흔적일지도 모르겠다고 당신은 생각했다." +
                    "<br><br>당신은 주변을 보았다. 백색 군인들이 쇠사슬은 신경도 쓰지 않고 앞으로만 나아가는 모습이 보인다."
                ]
            }
        ],
        rebelsHideOut_playroom : [
            {
                type : "text",
                value : [
                    "아이들이 노는 방이었을까? 당신은 지금까지 걸어왔던 곳들과 이 방이 굉장히 이질적이라고 생각했다. 어디서 사왔는지 바닥에는 레고 블럭, 인형, 로봇들이 여기저기 흩어져있었다. 당신은 레고블럭으로 쌓은 레고성을 보았다. 레고성의 가장 꼭대기에는 붉은 깃발이 올라가 있었다." +
                    "<br>백색 군인 중 한 명이 지나가면서 그대로 레고성을 부서뜨렸다. 레고성이 부서지고 붉은색 깃발도 쓰러졌지만, 붉은색 깃발이 아직 찢어지지는 않았다." +
                    "<br><br>멀리서 반란군이 발견됐는지 싸우는 소리가 났다. 싸우는 소리는 단말마와 함께 금방 끊겼다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeTrauma(player, 2);
                    savePlayer(player);
                }
            }
        ],
        rebelsHideOut_studyroom : [
            {
                type : "text",
                value : [
                    "공부를 시키는 방이었을까? 진한 색깔의 피 아래로 책 표지가 드러났다. 어린이용 책이다. 어린이용 책 주변에 어린이들이 받아쓰기를 한 것같은 종이들이 여기저기 널려 있었다." +
                    " 백색 군인들은 아무렇지도 않게 그들의 흔적을 짓밟았다. 아이들이 공부를 한 흔적 위로 붉은색 발자국들이 찍힌다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeTrauma(player, 2);
                    savePlayer(player);
                }
            }
        ],
        rebelsHideOut_cafeteria : [
            {
                type : "text",
                value : [
                    "식당이다. 아이용 식판과 어른용 식판이 가지런하게 꽂혀 있었다. <br><br>[편식하면 나쁜 어린이]<br>[남기지 말고 꼭꼭 씹기]<br>[우리는 아직 죽지 않았다]" +
                    "<br><br>천 위에 써져있는 슬로건들, 그리고 슬로건들 밑에는 아이들이 낙서한 건지 여러 그림들이 그려져 있었다. 큰 돼지 밑에 여러 사람이 각자 그린 듯한 작은돼지들이 모여있는 그림도 있었다." +
                    "<br>당신은 식당에서 아직 상하지 않은 자원 몇 개를 발견했다. 아이들이 살고 있었을 이 식당에는 이제 죽음밖에 없다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    addItem(player, ITEMS.misc.potato);
                    addItem(player, ITEMS.misc.mushroom);
                    addItem(player, ITEMS.misc.wheat);
                    addItem(player, ITEMS.misc.rice);
                    savePlayer(player);
                }
            }
        ],
        rebelsHideOut_undercityHero : [
            {
                type : "text",
                value : [
                    "당신은 뒤에서 엄청난 살의를 느꼈다. 칼날이 당신을 향해 날아든다!"
                ]
            },
            {
                type : "check",
                stat : "dex",
                difficulty : 20,
                success : [
                    {
                        type : "text",
                        value : "당신은 가까스로 반란군의 마지막 회심의 일격을 피했다. 그가 당신에게 튀어나오자마자 옆에 있던 백색 군인이 그의 목을 그대로 칼로 꿰뚫었다. 역류한 피가 입과 코에서 줄줄 흘러내렸다. 하지만 반란군은 죽으면서도 당신을 노려보았다.<br>...죽은 후에도 그의 서슬 퍼런 눈은 당신이 있던 방향만을 노려보고 있었다."
                    }
                ],
                fail : [
                    {
                        type : "text",
                        value : "\"죽어라, 상류도시의 개!\"<br><br>당신은 옆구리에 날카로운 통증을 느꼈다. 어둠에서 튀어나와 당신의 옆구리를 찌른 반란군은 곧 백색 군인들에 의해 목이 잘렸다. 머리가 데굴데굴 바닥을 구른다. 하지만 그는 목이 잘리고서도 눈을 뜨고 있었다, 당신을 보는 건지 아니면 다른 누군가를 보는 건지."
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            changeHP(player, -20);
                            savePlayer(player);
                        }
                    }
                ]
            }
        ],
        rebelsHideOut_slave1 : [
            {
                type : "text",
                value : [
                    "당신은 노예 몇 명이 백색 군인 발을 잡고 있는 걸 보았다. 그들은 다른 노예들은 도망갔지만 자신들은 도망가지 않았다며 제발 다시 상류도시로 보내달라고 간청하고 있었다. 반란군들은 분명 저들을 구했다. 하지만 이미 자유를 잃어버렸던 노예들에게는 자유가 문밖의 빛이 아니라 어디로 가야 할지 모르는 어둠처럼 보였을지도 모르겠다." +
                    "<br><br>당신이 하류도시의 영웅이란 걸 알아본 노예들이 당신의 발도 붙잡기 시작했다. 제발 저를 상류도시로 보내주세요, 라고 그들은 말했다." +
                    "<br><br>\"여긴 저희가 알아서 처리하겠습니다.\"<br><br>" +
                    "백색 군인들 중 몇 명이 노예들을 이끌고 밖으로 나가는 모습이 보인다. 백색 군인을 따라 나가던 노예들 중 한 명이 당신의 손에 돈을 쥐어주었다. 그리고 그는 감사하다고 말한 후 백색 군인을 따라갔다.<br>...그들을 인간취급도 하지 않는 도시로."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeGold(player, 100);
                    savePlayer(player);
                }
            }
        ],
        rebelsHideOut_slave2 : [
            {
                type : "text",
                value : [
                    "당신은 구석에 웅크리고 숨어있는 노예 한 명을 발견했다. 그는 도망가려다가 못 도망갔는지 불안한 눈동자를 이리저리 굴리고 있었다. 당신과 시선을 마주친 노예가 숨을 죽였다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 노예를 숨겨주었다.",
                        stat : "int",
                        difficulty : 20,
                        success : [
                            {
                                type : "text",
                                value : [
                                    "당신은 노예를 숨겨주었다. 당신은 노예가 숨어있는 구조를 이용해 은밀하게 그의 몸을 가려주었다. 백색 군인들은 다행히도 당신의 행동에 위화감을 느끼지 못하고 그대로 지나갔다. 백색 군인들 몇 명이 지나간 후, 당신은 다시 자리를 비켜주었다. 노예는 당신의 손을 붙잡더니 연신 꾸벅꾸벅 고개를 숙였다. 옛주인에게 맞고 살았는지 그의 몸에는 옅고 진한 상처들로 가득했다." +
                                    "<br>그는 당신의 손에 자신이 아껴왔던 감자 하나를 쥐어주었다. 그리고 그는 백색 군인들의 눈을 피해 나갔다. 그가 도망에 성공할지 실패할지는 알 수 없다. 하지만 그래도 당신은 오늘, 한 사람의 자유를 구했다. 마음이 따듯해졌다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    addItem(player, ITEMS.misc.potato);
                                    changeTrauma(player, -1);
                                    savePlayer(player);
                                }
                            }
                        ],
                        fail : [
                            {
                                type : "text",
                                value : [
                                    "당신은 노예를 숨겨주려고 했지만 백색 군인은 금방 당신의 위화감을 찾아냈다. 그들은 노예를 질질 끌고 나왔다. 노예는 처음에는 발버둥을 쳤지만 그들의 무력 앞에서 저항할 수 없다는 걸 깨닫고 그대로 축 늘어졌다. 노예를 찾아냈던 백색 군인이 당신을 응시했다." +
                                    "<br><br>\"하류도시의 영웅. 설마 노예를 숨기려고 했던 건 아니시겠죠?<br>발렌 님은 당신을 특별하게 생각하고 있습니다. 그의 마음을 저버리지 마시길 바랍니다.\"<br><br>" +
                                    "그 말을 끝으로 그는 더 이상 당신을 추궁하지 않았다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 2);
                                    savePlayer(player);
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    graveYardBottom : {
        graveYardBottom_child : [
            {
                type : "text",
                value : [
                    "당신은 내려가다가 한 아이를 보았다. 술래잡기라도 하고 있는 건지 아이는 신나게 누군가에게 쫓기며 놀다가 당신을 돌아보았다. 아이는 당신에게 가벼운 발걸음으로 다가왔다." +
                    "<br><br>\"나랑 놀자! 내가 술래!\"<br><br>" +
                    "아이가 당신에게 달려오기 시작한다. 아이치고 발걸음이 너무 빠르다!"
                ]
            },
            {
                type : "check",
                stat : "dex",
                difficulty : 15,
                success : [
                    {
                        type : "text",
                        value : [
                            "당신은 아이보다 더 빠르게 달렸다. 당신을 쫓아오던 아이의 소리가 점점 멀어졌다." +
                            "<br><br>\"빨라!\"<br><br>" +
                            "어디선가 빨라-빨라-빨라 메아리가 들려왔다. 당신은 아이의 소리가 사라지고 나서야 뛰는 것을 멈췄다. 하지만 당신이 눈을 깜박였을 때 아이는 당신의 앞에 서있었다." +
                            "<br><br>\"내가 조금만 더 빨랐더라면.\"<br><br>" +
                            "아이가 중얼거리듯이 말했다. 다시 눈을 감았다 떴을 때 아이는 그 자리에 없었다. 당신은 처음부터 이곳에 혼자였다."
                        ]
                    }
                ],
                fail : [
                    {
                        type : "text",
                        value : [
                            "당신은 아이에게 잡히지 않기 위해 열심히 뛰었지만 아이는 너무 빨랐다. 아이의 손이 당신을 잡는다. 아니, 잡지 못한다. 아이의 손은 그대로 당신의 몸을 통과했다." +
                            "<br><br>\"당신도 잡혔어.\"<br><br>" +
                            "웃는 건지 우는 건지 모르겠는 목소리로 아이가 말했다." +
                            "<br><br>\"그러니 당신도 죽은 거야.\"<br><br>" +
                            "마지막 선고와 함께 당신의 몸에서 힘이 빠졌다. 생명력을 빼앗긴 느낌이다...."
                        ]
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            changeHP(player, -20);
                            savePlayer(player);
                        }
                    }
                ]
            }
        ],
        graveYardBottom_child2 : [
            {
                type : "text",
                value : [
                    "당신은 작은 몸집의 시체를 보았다. 아이의 귀에는 보석귀걸이가 걸려 있었다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "아이의 귀에 있는 보석귀걸이를 떼려고 해본다.",
                        stat : "int",
                        difficulty : 25,
                        success : [
                            {
                                type : "text",
                                value : [
                                    "당신은 아이의 귀에 있는 보석귀걸이를 떼냈다. 보석 하나가 손안에 떨어졌다." +
                                    "<br><br>누군가의 울음 소리가 당신의 귀를 때린다. 당신은 귀를 막았다. 하지만 울음 소리는 없어지지 않았다, 당신이 그 자리를 재빠르게 벗어날 때까지 쭈욱."
                                ]
                            },
                            {
                                type : "effect",
                                run : "graveYardBottom_child2_getRandomGem"
                            }
                        ],
                        fail : [
                            {
                                type : "text",
                                value : [
                                    "당신은 아이의 귀에 있는 보석귀걸이를 떼려고 했지만 잘 되지 않았다. 아이의 귀가 뜯어졌다. 낡은 장식은 부서졌다.<br>어디선가 울음 소리가 들려온다. 정신이 아득해져서 당신은 눈을 감았다가 떴다.",
                                    "<br><br>시체는 백골이 되어 스러졌다. 당신은 소스라치게 놀라며 뒷걸음질쳤다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 10);
                                }
                            }
                        ]
                    },
                    {
                        text : "죽은 아이를 애도한다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 죽은 아이를 애도했다. 어디선가 아이의 울음 섞인 웃음 소리가 들려온 거 같기도 하다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, -2);
                                    changeHP(player, 30);
                                    changeStamina(player, 30);
                                    savePlayer(player);
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        graveYardBottom_child3 : [
            {
                type : "text",
                value : [
                    "당신은 공동묘지를 걸어가다가 아이를 보았다. 처음에는 환상인 줄 알았다. 하지만 정말 살아있는 아이였다. 아이는 당신을 보더니 겁을 먹으며 뒤로 물러났다." +
                    "<br>당신은 아이의 걸음걸이가 이상하다는 걸 눈치챘다. 절뚝, 절뚝, 아이의 다리에는 상처가 많았고 발 밑에는 큰 보석같은 것이 끼어져 있었다. 저 보석을 그냥 뺐다가는 과다출혈로 죽을 것이다. 하지만 과연 저 다리로 아이가 멀리까지 도망갈 수 있을까?"
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 아이에게 손짓을 한 후 아이의 상처를 조금이라도 치료해주었다.",
                        stat : "charm",
                        difficulty : 15,
                        success : [
                            {
                                type : "text",
                                value : [
                                    "아이는 머뭇거리다가 천천히 당신에게 다가갔다. 당신은 아이의 상처를 치료해주었다. 아이는 처음에는 움찔거렸지만 곧 얌전해져서 당신의 손길을 받아들였다." +
                                    "<br><br>\"감사합니다...\"<br><br>" +
                                    "그는 같이 살던 사람들과 함께 상류도시에서 도망 오는 길이었다고 말했다. 중간에 무시무시한 해골을 만나긴 헀는데 이상하게 자신은 공격하지 않았다고 말했다." +
                                    "<br><br>\"해골들 중에서도 착한 해골이 있는 걸까요?\"<br><br>" +
                                    "치료를 다 끝낸 후 아이는 당신에게 한번 더 인사를 했다. 여전히 절뚝이긴 하지만, 아까보다는 생존 확률이 높아진 거 같다. 당신은 쉘터에서 그 아이를 만날 수 있길 빌었다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, -2);
                                    changeStamina(player, 20);
                                    player.flags.graveYardBottom_savingChild = true;
                                    passTime(player, 10);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 아이를 지나쳐갔다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "이 세상에서 생존은 아이에게든 어른에게든 똑같은 문제다. 자신의 생존 문제는 자신이 해결해야 한다. 당신은 아이에게 더 이상 시선을 두지 않았다."
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        graveYardBottom_whiteClothes : [
            {
                type : "text",
                value : [
                    "당신은 길을 걷다가 찢어져 있는 하얀 천을 발견했다. 분명 상류도시의 군인들이 입는 제복의 천이다. 이런 천이 왜 여기에 있는 걸까?" +
                    "<br>당신은 주변에 어지럽게 흩어진 발자국들을 바라보았다. 어린아이의 발자국들, 그리고 어른의 발자국들...."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    addItem(player, ITEMS.misc.tornClothes);
                }
            }
        ],
        graveYardBottom_whiteClothes2 : [
            {
                type : "text",
                value : [
                    "당신은 어디선가 누군가의 신음 소리를 들었다. 살아있는 사람의 신음 소리다. 당신은 신음 소리가 나는 쪽으로 다가갔다. 하얀 제복을 입고 있는 상류도시의 사람이다. 그는 당신을 보더니 '하류도시의 영웅'이라고 불렀다." +
                    "<br>그의 상처가 깊다. 이대로 내버려두면 죽을 것이다. 하지만 그가 여기까지 내려온 이유를 생각해보면.... 어차피 당신이 지금 그를 외면한다고 해도 아무도 모를 것이다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 그의 상처를 치료해주었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "그는 당신의 치료를 받으며 감사하다고 고개를 숙여 말했다. 상류도시에서 도망간 사람들을 잡고 있었는데 갑자기 해골 기사가 공격해왔다고 그는 말했다.",
                                    "<br><br>\"...이런 거라도.\"<br><br>" +
                                    "그는 당신에게 쌀과 밀을 내밀었다. 그는 지금은 이것밖에 없어서 죄송하다고 말했다." +
                                    "<br><br>\"조심하십시오, 하류도시의 영웅. 그대가 다치지 않기를 바랍니다.\"<br><br>"+
                                    "그는 당신에게 마지막으로 한번 더 고개 숙여 감사 인사를 전한 후 절뚝거리며 돌아갔다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    player.flags.graveYardBottom_savingUpper = true;
                                    addItem(player, ITEMS.misc.wheat);
                                    addItem(player, ITEMS.misc.rice);
                                    passTime(player, 10);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 그를 외면하고 가버렸다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "상류도시의 그 사람은 당신이 그럴 줄 알았다는 듯이, 아무 반응도 보이지 않았다. 그의 앓는 소리가 점점 멀어진다." +
                                    "<br>어느 순간, 그의 신음 소리는 뚝 끊겼다.<br><br>당신은 계속 걸어갔다."
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        graveYardBottom_skeletonKnight_after : [
            {
                type : "text",
                value : [
                    "해골기사가 쓰러진 후 안으로 조금 더 들어가자 작은 구멍이 보였다. 큰 사람은 고개를 숙여서 들어가야 겨우 들어갈 수 있는 크기의 구멍이다. 당신은 주변을 둘러보다가 생선 모양의 키링이 달려있는 목걸이를 발견헀다." +
                    "<br>당신은 그 생선 모양의 목걸이를 줍기 위해 손을 뻗었지만, 뻗은 손은 뭔가에 부딪히듯 자꾸 튕겨져나왔다. 당신의 손은 목걸이에 닿을 수 없다. 당신은 멍하니 그 목걸이를 내려다보았다." +
                    "<br><br>[지켜줄게]<br><br>" +
                    "목걸이에서 반짝 빛이 났다. 으득, 으드득, 뭔가가 일어나는 소리가 나서 당신은 고개를 돌렸다. 널부러져 있던 해골들이 천천히 형체를 갖추어 가고 있었다. 해골 기사가 다시 태어나려고 하고 있다." +
                    "<br>...당신이 여기서 할 수 있는 일은 더 없다. 당신은 마틴에게로 돌아가기로 했다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    player.flags.matin_graveyard_sheStillWaits = true;
                    addQuestProgress(player);
                    savePlayer(player);
                }
            }
        ],
        graveYardBottom_skeletonKnight_after_repeat : [
            {
                type : "effect",
                run : (player) => {
                    const hasQuest04 = player.quest?.subActive?.some(q => q.id === "matin_graveyard_04");
                    
                    if (hasQuest04 && !player.flags?.matin_graveyard_sheWillRest){
                        startScene(
                            NPC_DATA["matin"].scenes.matin_graveyard_04_final,
                            player,
                            {
                                onEnd : () => startScene(buildDungeonScene(player), player)
                            }
                        );
                    }
                    else {
                        startScene([
                            {
                                type : "text",
                                value : [
                                    "작은 구멍 너머로 쇠사슬이 질질 끌리는 소리와 웃음 소리들이 들려온다. 몸을 숙이면 지나갈 수 있을 것 같다."
                                ]
                            },
                            {
                                type : "choice",
                                choices : [
                                    {
                                        text : "구멍으로 나간다.",
                                        action : "graveYardBottom_toUpperCity"
                                    },
                                    {
                                        text : "공동묘지로 돌아간다.",
                                        action : "graveYardBottom_toGraveyard"
                                    }
                                ]
                            }
                        ], player);
                    }
                }
            }
        ]
    }
}

window.graveYardBottom_toUpperCity = function(player){
    player.dungeon = null;
    player.location = "richTownStreet";

    savePlayer(player);
    startScene(getLocationScene(player), player);
};

window.graveYardBottom_toGraveyard = function(player){
    player.dungeon = null;
    player.location = "graveyard";

    savePlayer(player);
    startScene(getLocationScene(player), player);
};

window.graveYard_child2_getRandomGem = function(player){
    const gems = ["ruby", "sapphire", "aquamarine", "diamond"];
    const itemKey = gems[Math.floor(Math.random() * gems.length)];

    addItem(player, itemKey, 1);
    changeTrauma(player, 5);
    savePlayer(player);

    const item = ITEMS[itemKey];
    showSingleTextScene(
        `${item.name}을(를) 얻었다.`,
        () => startScene(getLocationScene(player), player)
    );
};

window.DUNGEON_EVENTS = DUNGEON_EVENTS;

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
        },
        {
            type : "effect",
            run : (player) => {
                startBattle("bandit2", player, {
                    noEscape : true,
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
                    },

                    onWin : () => startBanditLukeFightWin(player),
                    onSkipDefeat : () => startBanditLukeFightLose(player)
                });
                return true;
            }
        }
    ], player);
}

window.startBanditLukeFightWin = function(player){
    startScene([
        {
            type: "text",
            value:
                "당신은 상급도적을 쓰러뜨렸다. 당신은 숨을 고르며 루크를 돌아보았다. 그웰은 루크에게 제발 살려달라고 빌고 있었다. 하지만 루크는 그대로 그웰의 목을 단검으로 베었다. 분수처럼 쏟아져나오는 피에 그의 옷이 붉은색으로 물든다." +
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
                        },
                        {
                            type : "effect",
                            run : (player) => {
                                startBanditLukeTrophyRoom(player);
                                return true;
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
                        },
                        {
                            type : "effect",
                            run : (player) => {
                                startBanditLukeTrophyRoom(player);
                                return true;
                            }
                        }
                    ]
                }
            ]
        }
    ], player);
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
                                "루크는 바닥에 떨어져 있던 댄싱대거 하나를 주워 당신에게 던졌다. 그리고 뒤를 돌았다. 더 이상 당신과 말을 하지 않을 생각인 거 같다." +
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
                                "그 말이 들리자마자 루크는 당신을 벽으로 세게 밀어붙였다. 그의 사나운 자안이 당신을 노려본다.<br><br>\"한번만 더 그딴 눈으로 쳐다보면....\"<br><br>뒷말은 말하지 않아도 알 수 없었다. 어쩐지 당신의 그 말에 더 화가 나버린 거 같다.... 그는 고개를 돌리더니 당신에게 댄싱대거 하나를 던졌다. 가져가라는 듯이. 더 이상 루크에게 말을 걸 수 없을 거 같다." +
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

    if (introId === "infectedSmalls_intro"){
        player.flags = player.flags || {};

        if (player.flags.infectedSmalls_firstLose){

            startScene([
                {
                    type:"text",
                    value: "당신이 오자 작은꽃들이 돌아보았다. <br><br>\"또 왔어! 무서워!\"<br><br>그들은 꽃잎을 바르르 떨고 있다.<br><br>웅성거리는 소리들이 커진다."
                }
            ], player, {
                onEnd: () => startInfectedSmallsBattle(player)
            });

            return;
        }

        player.flags.seen_infectedSmalls_intro = true;
        savePlayer(player);

        startScene([
            {
                type: "text",
                value:
                      "당신이 연구소 문을 열고 들어갔을 때, 당신은 서로 덕지덕지 붙어있는 하얀꽃들을 보았다. 가장 앞에 서있던 꽃감염자가 자신의 꽃머리를 이리저리 흔들었다. 하지만 그것도 잠시, 그것은 그대로 툭 앞으로 쓰러졌다." +
                      "<br>당신은 그들의 소리를 제대로 이해하지는 못한다. 그들은 그저 웅성거릴 뿐이다. 당신이 이해할 수 있는 건 그들이 지금 슬퍼하고 있다는 거였다. 작은 하얀꽃이 파르르 몸을 떨더니 무리에서 떨어져나왔다. 그것은 뒤에 있는 꽃들을 지키기라도 하겠다는 듯 당신을 가로막고 있었다." +
                      "<br><br>\"...! ...!!! ...?! ....!!\"<br><br>" +
                      "당신은 여전히 그들의 말을 이해하지 못한다. 하지만 그들은 무어라 웅성거리더니 많은 작은꽃들이 가장 앞에 있던 꽃에게 달려들었다. 그들은 뭉친다. 뭉치고 뭉쳐서," +
                      "<br><br><div style='text-align:center;'><strong style='color: #302ce9; font-size:3rem'>작은꽃들이 된다</strong></div>"
            },
            {
                type : "effect",
                run : (player) => {
                    startInfectedSmallsBattle(player);
                    return true;
                }
            }
        ], player);
    }

    if (introId === "slaverCampShelter_boss_intro"){
        player.flags = player.flags || {};
        if (player.flags.slaverCampShelter_boss_firstLose){

            startScene([
                {
                    type:"text",
                    value: "유리와 당신이 한번 더 나타나자 인신매매단 간부는 비릿하게 미소를 지었다. <br><br>\"아까는 쥐새끼처럼 빠르더군. 왜 그가 널 쥐새끼라 하는지는 알겠다.\"<br><br>" +
                           "쇠철로 된 그의 올가미가 바닥에 부딪히며 날카로운 소리를 냈다." +
                           "<br><br>\"이번에는 놓치지 않아주지. 현실을 깨달아라.\""
                }
            ], player, {
                onEnd: () => startSlaverCampShelterBossBattle(player)
            });

            return;
        }

            player.flags.seen_slaverCampShelter_boss_intro = true;
            savePlayer(player);

            startScene([
            {
                type: "text",
                value:
                      "천막을 걷어올리는 순간 피비린내가 코를 찔렀다. 아이들, 겁에 질려 떨고 있는 아이들, 몸이 성한 곳이 없는 아이들, 그리고 죽은 아이들.<br><br>유리의 표정이 굳었다." +
                      "<br><br>\"손님이 올 줄은 몰랐는데.\"<br><br>" +
                      "술잔을 기울이던 인신매매단 간부는 천천히 자리에서 일어났다. 그는 유리와 당신을 번갈아보다가, 유리에게서 고개가 멈췄다." +
                      "<br><br>\"...어디서 많이 본 얼굴이군.\"<br><br>" +
                      "그리고 곧, 그는 미소를 지었다." +
                      "<br><br>\"살아있을 줄은 알았지만, 네 마지막 종착지가 여기일 줄은 몰랐군. 아니.<br>오히려 여기일 수밖에 없나.\"<br><br>" +
                      "\"아이들은.\"<br><br>" +
                      "유리의 말에 인신매매단 간부는 끔찍한 미소를 지어보였다." +
                      "<br><br>\"안 보이나? 네 앞에 있잖나.\"<br><br>" +
                      "\"...다른 아이들.\"<br><br>" +
                      "\"다른 아이들? 하하. 여기 없으면 어디에 있겠나.\"<br><br>" +
                      "유리는 더 이상 망설이지 않는다. 그는 쌍검을 바로 쥐고 그에게 달려들었다. 하지만 쌍검의 날이 그에게 닿기도 전에, 인신매매단 간부는 다른 부하들을 불러냈다. 유리가 부하들에게 둘러싸여있다." +
                      "<br><br>\"절대로 죽이지 마. 그를 원하는 대물은 하나가 아니니까.\"<br><br>" +
                      "이번에는 돈을 많이 벌겠군, 이라 흡족하게 중얼거리며 인신매매단 간부는 당신 쪽으로 몸을 돌렸다. 싸움이 시작된다."
            },
            {
                type : "effect",
                run : (player) => {
                    startSlaverCampShelterBossBattle(player);
                    return true;
                }
            }
        ], player);
    }

    if (introId === "erwin_intro"){
            startScene([
            {
                type: "text",
                value:
                      "당신의 발걸음 앞으로, 하얀색 꽃이 흐드러지게 피어났다. 무성한 하얀꽃들 사이에 여인이 한 명 서있었다. 당신을 마주한 그는 고개를 기울이며 당신의 이름을 불렀다." +
                      "<br><br>\"...나를.\"<br><br>" +
                      "바닥까지 길게 뻗은 하얀색 머리카락이 하얀꽃들 사이에서 바스러진다. 머리카락들은 바스라졌다가도 다시 하얀색 꽃과 결합되어 형태를 형성했다. 그는 모든 것이 하얀꽃으로 이루어진 사람으로 보였다." +
                      "<br><br>\"죽,이러 왔,어.\"<br><br>" +
                      "<br><br><br><br><strong><span class='log-pale'>왜?</span></strong>" +
                      "<br><br><strong><span class='log-pale'>왜 네가 나를<br><br>죽이러 온 거야?</span></strong>" +
                      "<br><br><br>....?" +
                      "<br><br><br>에르윈은 당신이 자신을 죽이러 왔다는 걸 알고 있다. 에르윈의 처절한 사투가 시작된다...!"
            },
            {
                type : "effect",
                run : (player) => {
                    startErwinBossBattle(player);
                    return true;
                }
            }
        ], player);
    }

    if (introId === "whiteFlowerOldLab_boss_intro"){
        player.flags = player.flags || {};

        if (player.flags.soraFather_firstLose){

            startScene([
                {
                    type:"text",
                    value: "그는 당신을 돌아보았다. 그는 당신에게서 익숙한 냄새를 맡고 눈이 커졌다. 그의 금안에 눈물이 고인다. <br><br>\"아아.... 내가 지키고 싶었던 건...\"<br><br>그는 이성을 잃었다. 전투가 시작된다."
                }
            ], player, {
                onEnd: () => startSoraFatherBattle(player)
            });

            return;
        }

        player.flags.seen_soraFather_intro = true;
        savePlayer(player);

        startScene([
            {
                type: "text",
                value:
                      "당신은 연구소의 가장 깊은 곳에 있는 실험실로 향했다. 죽음의 냄새만이 가득한 곳이다. 당신은 실험실이 일반 방이 아니라 하나의 거대한 유리관이라는 걸 눈치챘다. 당신은 발렌이 말한 버튼을 찾기 위해 고개를 둘러보았다." +
                      "<br>당신은 소각 버튼을 찾았다. 당신이 그 소각 버튼에 다가간 순간, 뒤에서 살기가 느껴졌다. 무언가가 당신의 목을 베기 전, 당신은 재빨리 옆으로 피했다." +
                      "<br>버튼이 박살났다. 삐, 삐, 삐, 위험한 소리와 함께 관 위로 데이터 로그가 떴다.<br><br>[침입 감지, 복구할 수 없는 데미지 감지, 곧 폭발 시스템을 작동합니다.]" +
                      "<br><br>당신은 뒤를 돌아보았다. 아까 사라졌었던 그 시체, 당신이 꿈에서 만났던 소라의 아버지, 창백한 그가 당신의 앞에 길쭉하게 서있었다." +
                      "<br><br>\"애쉬 가문.... 용서하지... 않겠...다...\"<br><br>" +
                      "그는 이미 이성이 없다. 그는 당신이 누구인지도 못 알아보고 있다. 아니, 어쩌면 당신을 애쉬 가문으로 착각하고 있는 걸지도 모르겠다. 낫이 당신의 목을 향해 날아온다!"
            },
            {
                type : "effect",
                run : (player) => {
                    startSoraFatherBattle(player);
                    return true;
                }
            }
        ], player);
    }

    if (introId === "rebelsHideOut_boss_intro"){
        const hasYuriRing = hasItemOrEquipped(player, "yuriRebelRing");
        const ringText = hasYuriRing
        ? "그는 당신이 갖고 있는 유리의 수호반지를 보더니 순간 숨을 멈췄다. <br><br>\"왜 그걸 네가...?\"<br><br>하지만 곧 그는 마음을 다잡았다. 그는 자신의 동료들을 지키는 것이 우선이다."
        : "그는 방패를 들고 한손검 칼날을 당신 쪽으로 들이밀었다. 그는 당신을 앞으로 보내줄 생각이 없다.";
            startScene([
            {
                type: "text",
                value:
                      "백색 군인들이 반란군들의 씨를 말리기 시작한다. 후퇴하면서 싸우고 있던 반란군들 앞으로 이 거점의 수장이었던 자가 붉은색 깃발을 들고 나왔다. 그는 붉은색 깃발을 바닥에 세우더니 자신들의 구호를 외쳤다." +
                      "<br><br>\"우리는 아직 죽지 않았다.\"<br><br>" +
                      "그 말에 전세가 기울어가던 반란군들이 다시 힘을 냈다. 그들은 자신의 동료들을 후퇴시키기 위해 다시 무기를 들고 싸우고 있다. 처절한 전투 속, 당신의 앞으로 반란군 수장이 걸어나왔다." +
                      "<br><br>\"네 상대는 나다.\"<br><br>" +
                      ringText +
                      "<br><br>전투가 시작된다...!"
            },
            {
                type : "effect",
                run : (player) => {
                    startRebelsHideOutStoryBossBattle(player);
                    return true;
                }
            }
        ], player);
    }
}

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
                { text: "던전 밖으로 나가 길거리로 돌아간다", action: "leave_dungeon_after_boss" },
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

//uppercity_story_01

window.startInfectedSmallsBattle = function(player){
    startBattle("infectedSmalls", player, {
        noEscape: true,
        onWin: () => {
            player.flags = player.flags || {};
            player.flags.defeated_whiteFlowerLab_infectedSmalls = true;
            savePlayer(player);

            handleDungeonBossWin(
                player,
                getCurrentDungeon(player),
                getCurrentDungeonRoom(player)
            );
        },
        onSkipDefeat : () => {
            startInfectedSmallsLose(player);
        }
    });
};

function handleInfectedSmallsWin(player){
    player.flags = player.flags || {};

    player.flags.uppercity_quest01_done = true;
    player.flags.uppercity_quest01_done_day = getCurrentDay(player);

    addQuestProgress(player);
    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "작은꽃들이 쓰러졌다. 우수수 떨어진 작은꽃들에서는 더 이상 아무 소리도 나지 않는다. 당신은 가장 가운데에 있는 버튼을 발견했다. 파란색 버튼, 발렌이 말헀던 그 버튼이다." +
                "당신은 정적 속에서 그 버튼에 다가갔다. 버튼 아래에는 희미하게 글씨가 적혀있었다.<br>[비ㅅ ㅍ기 절차]<br>당신은 꾸욱, 버튼을 눌렀다." +
                "<br><br>...<br><br>...?<br><br>아무 일도 일어나지 않는...<br><br><br><br><br>" +
                "<div style='text-align:center;'><strong style='color: #ff4d4d; font-size:5rem'>콰앙</strong></div>" +
                "<br><br><br><br><br>큰 폭발음에 당신의 귀가 멍해졌다. 어떤 소리도 잘 안 들린다. 당신은 멍하게 뒤를 돌아보았다." +
                "<br>...연구소 건물이 무너져내리고 있다." +
                "<br><br>당신의 앞에 문 하나가 보인다. 당신은 연구소 건물이 완전히 무너져내리기 전에 그 문을 박차고 나갔다."
        },
        {
            type : "text",
            value :
                "<div style='text-align:center; font-size:2rem; color: #302ce9;'>엄마</div><br><br>" +
                "<div style='text-align:center; font-size:2rem; color: #302ce9;'>아빠</div><br><br>" +
                "<div style='text-align:center; font-size:2rem; color: #302ce9;'>보고 싶어</div><br><br>"

        },
        {
            type : "text",
            value :
                "당신은 눈을 깜박였다. 당신의 앞에 경계병들이 보인다. 경계를 서고 있다가 큰소리를 듣고 바로 달려온 모양이다. 그들은 당신에게 괜찮냐고 물었다." +
                " 당신은 큰 충격에 움직일 수가 없었다. 그들은 당신을 부축하더니 그대로 경계병 제2초소로 데리고 나왔다."
        },
        {
            type : "effect",
            run : (player) => {
                leaveDungeon(player);
            }
        }
    ], player);
}

function startInfectedSmallsLose(player){
    player.flags = player.flags || {};

    if (!player.flags.InfectedSmalls_firstLose){

        player.flags.InfectedSmalls_firstLose = true;

        startScene([
            {
                type:"text",
                value:
                    "흐려지는 시야 사이로 웅성거리는 소리가 들린다. <br><br>\"ㅈ짜..주...ㅇ...ㄱ...ㅇ...ㅏ냐?\"<br><br>\"ㅈㅇㅈ...않...ㅇ...ㅇㅁ..ㅕ...우리...ㄱ...ㅈ...ㅇ...ㅓ...!\"<br><br>\"ㅎ...지...마...ㄴ...사...ㅇ....으....ㄴ..ㅃ..ㅏ...\"<br><br>" +
                    "웅성거리던 소리들이 조금씩 멎어갔다. 결심한 듯 그들은 당신을 굴려서 어딘가로 올렸다. 배출구...? 당신은 그대로 의식이 끊겼다." +
                    " 다시 눈을 떴을 때 당신은 폐기실에 있었다. 중추실에서부터 폐기실까지 연결되어있던 모양이다. 아쉽게도 폐기실에서 중추실로 갈 수는 없을 거 같지만."
            },
            {
                type:"effect",
                run:(player)=>{
                    player.dungeon.room = "r4c8";
                    changeHP(player, 10);
                    savePlayer(player);
                }
            }
        ], player);

        return;
    }

    player.dungeon.room = "r4c8";
    changeHP(player, 10);

    startScene([
        {
            type:"text",
            value:
                "당신은 또 작은꽃들에게 져서 쓰러졌다. 그들은 이번에도 당신을 죽이지 않은 모양이다. 당신은 폐기실에서 눈을 떴다."
        }
    ], player);
}

//uppercity_story_02 관련
window.startErwinBossBattle = function(player){
    let supportStarted = false;

    startBattle("erwin", player, {
        noEscape : true,

        allyTurnSupport : {
            name : "에릭",
            hpRate : 0.5,
            damage : 100,
            logType : "eric",
            line : () => {
                if (!supportStarted){
                    supportStarted = true;
                    return "탕! 귀가 멍해지는 듯한 큰 소리가 들렸다. 당신은 뒤를 돌아보았다. 에릭이다.<strong>100 데미지!</strong>";
                }

                const lines = [
                    "다시 한 번 총성이 울렸다. 에르윈의 하얀 몸 일부가 꽃잎처럼 흩어졌다. 에르윈은 비명을 지르고 있다. <strong>100 데미지!</strong>",
                    "탕 소리와 함께 에르윈의 찢어질 듯한 비명 소리가 들렸다. 흩어지던 그는 다시 하얀꽃잎들로 재생했다. <strong>100 데미지!</strong>",
                    "에르윈은 에릭을 공격하려고 했지만, 에릭의 총알이 더 빨랐다. 에릭에게 뻗어지던 촉수들이 그대로 박살났다. <strong>100 데미지!</strong>"
                ];

                return getRandom(lines);
            }
        },

        onWin : () => {
            player.flags.uppercity_story_02_killErwin = true;

            savePlayer(player);

            handleDungeonBossWin(
                player,
                getCurrentDungeon(player),
                getCurrentDungeonRoom(player)
            );
        },

        onSkipDefeat : () => {
            player.flags.uppercity_story_02_killErwin = true;
            startErwinLose(player);
        }
    });
};

function handleErwinWin(player){
    startScene([
        {
            type: "text",
            value:
                "당신은 에르윈을 이겼다. 쓰러진 에르윈은 마지막까지 저 멀리로 손을 뻗었지만 결국에는 아무 것도 잡지 못하고 그대로 몸이 팔부터 부서져내렸다. 그가 부서져내린 자리에는 수북한 하얀꽃들만이 남았다." +
                "<br>에릭은 에르윈이 완전히 부서져내릴 때까지 그 앞에 있었다. 사람인지, 마물인지, 어쨌든 생명이 부서져내리는 것을 보면서도 에릭은 아무 말도 하지 않았다. 그의 녹안은 그저 차갑게 깊기만 했다." +
                "<br>에르윈이 죽은 걸 확인한 에릭이 몸을 돌렸다. 그 순간 뭔가가 당신의 가슴 위로 떨어졌다. 당신은 어떻게든 당신의 가슴 위로 떨어진 것을 받았다. 돈이 들은 작은 주머니다." +
                "<br><br>\"퀘스트 보고는 주점에 가서 해라.\"<br><br>"
        },
        {
            type : "choice",
            choices : [
                {
                    text : "당신은 에릭에게 왜 여기까지 몸소 나온 거냐고 물었다.",
                    scene : [
                        {
                            type : "text",
                            value :
                                "\"...네가 처리하지 못할 수도 있으니까. <br>혹은 안 할 수도 있고.\"<br><br>" +
                                "에릭의 목소리는 차가웠다. 당신은 만약 자신이 이 마물을 처리하지 않았으면 어떻게 했을 거냐고 물었다." +
                                "<br><br>\"네 결정과는 상관없이 에르윈은 어차피 죽었을 거다.\"<br><br>" +
                                "당신은 그에게 마물을 싫어하는 거냐고 물었다. 그러자 에릭은 이 세상에 마물을 좋아하는 사람도 있냐고 물었다. 하얀꽃은 좋아하는 사람이 은근 있지 않냐는 당신의 물음에 에릭은 잠시 말을 멈췄다." +
                                "<br>...어쩌면 그는 꽃과 관련된 것들은 마물이 아니라고 생각하는 걸지도 모르겠다. 에릭은 당신을 힐끗 보더니 앞서 걸었다. 당신은 그의 뒤를 따랐다."
                        }
                    ]
                },
                {
                    text : "당신은 에릭에게 고맙다고 말했다.",
                    scene : [
                        {
                            type : "text",
                            value : 
                                "\"상응하는 대가를 준 것뿐이다.\"<br><br>" +
                                "당신의 고맙다는 말에도 에릭은 주저없이 그렇게 말했다. 그는 앞서 걸었고 당신은 그의 뒤를 뒤쫓아 걸었다. 언제나처럼 그의 발은 빨랐지만, 오늘은 그래도 평소보다는 느린 거 같았다. 당신은 에릭의 뒤에서 걸으며 돈 수거를 하러 멀리까지 오는 이유가 뭐냐고 물었다." +
                                "<br>\"...여기까지 오는 사람들은 그리 많지 않아.\"<br><br>" +
                                "돈 수거가 아닌 다른 일 때문에 여기까지 돌아다니는 건가... 당신은 진심으로 에릭이 잠을 자기는 하는지 궁금해졌다."
                        },
                        {
                            type : "effect",
                            run : player => {
                                changeNPCEmotion("eric", "affection", 3);
                            }
                        }
                    ]
                }
            ]
        },
        {
            type : "text",
            value :
                "당신은 경계병 제3초소까지 에릭과 함께 걸어갔다. 경계병 제3초소 근처에 도착하자, 에릭은 경계병들이 자신을 눈치채기 전 발걸음을 멈췄다. 당신은 의아해하며 그를 올려다보았다." +
                "<br><br><span class='log-eric'>\"하류도시의 영웅은 한 명으로도 충분하다.\"</span><br><br>" +
                "그게 끝이었다. 그는 그대로 다른 방향으로 저벅저벅 걸어가버렸다. 정말로 당신을 경계병 제3초소 앞까지만 데려다줄 생각이었나 보다. 당신을 발견한 경계병들이 밝은 얼굴로 당신을 맞이하는 것이 보인다." +
                "<br>그들은 모두 당신에게 마물을 죽이고 온 거냐고 물었다. 당신이 고개를 끄덕이자 그들의 얼굴색은 더 밝아졌다. 적어도 이들은 당신을 제대로 하류도시의 영웅으로 존중해주고 있다.<br><br>" +
                "<div style='text-align:center; font-size:2rem; color: #302ce9;'>왜</div><br><br>" +
                "<div style='text-align:center; font-size:2rem; color: #302ce9;'>네가</div><br><br>" +
                "<div style='text-align:center; font-size:2rem; color: #302ce9;'>나를</div><br><br>" +
                "<div style='text-align:center; font-size:2rem; color: #302ce9;'>죽이러</div><br><br>" +
                "<div style='text-align:center; font-size:2rem; color: #302ce9;'>온 거야?</div><br><br>"

        },
        {
            type : "text",
            value : "\"하류도시의 영웅?\"<br><br>" +
                    "당신의 움직임이 멈추자 그들은 당신에게 너무 무리한 거 아니냐고 물었다. 모여있던 경계병들 중 몇 명이 당신에게 음식을 내밀었다." +
                    "<br>그들은 당신의 체력이 회복될 때까지 당신을 지켜주었다."
        },
        {
            type : "effect",
            run : (player) => {
                changeHP(player, 100);
                changeStamina(player, 100);
                changeNPCEmotion("eric", "dominance", -5);
                changeNPCEmotion("eric", "affection", 5);
                changeNPCEmotion("valen", "affection", 5);
                changeNPCEmotion("akasia", "affection", 5);

                savePlayer(player);

                leaveDungeon(player);
            }
        }
    ], player);
}

function startErwinLose(player){
    startScene([
        {
            type : "text",
            value : "당신은 에르윈의 공격을 버티지 못하고 쓰러졌지만, 당신이 쓰러지려는 순간 에릭이 당신의 허리를 한손으로 받쳤다. 에르윈은 긴 팔을 당신에게 뻗었다가 에릭이 당신을 부축하자 움직임을 멈췄다." +
                    "<br><br>\"<span class='log-pale'>아, 아아, 아아아....\"</span><br><br>" +
                    "에릭은 당신의 귀를 한손으로 막았다. 당신의 한쪽 귀는 에릭의 단단한 복근에 파묻혀 있다. 그래서 당신은 에르윈이 중얼거리는 소리를 하나도 듣지 못했다. 그저 에릭의 심장 뛰는 소리만 들었을 뿐." +
                    "<br><br>바깥소리는 그저 총소리만,<br>총소리만 들릴 뿐이었다."
        },
        {
            type : "text",
            value : "3번의 총성 후, 에릭은 천천히 당신을 놓아주었다. 하지만 당신이 그대로 쓰러지려고 하자, 그는 주저하지 않고 당신을 그대로 한손에 낀 후 마물의 은신처를 나왔다." +
                    "당신을 기다리고 있던 제3초소 경계병들의 눈이 동그래졌다. 에릭은 아무렇지도 않게 당신을 그들에게 던져주었다. 당신의 몸은 가볍게 그들의 손아귀로 떨어졌다." +
                    "<br><br>\"마물은 퇴치했다.\"<br><br>" +
                    "그는 누가 마물을 퇴치했는지 주어를 말하지 않았지만, 경계병들은 당신이 마물을 처치한 걸로 받아들인 모양이다. 그들은 마물을 퇴치하고서도 살아돌아온 것이 영웅 그 자체라고 믿으며 당신이 기력과 체력을 회복할 떄까지 당신을 지켜주었다." +
                    "<br><br>당신이 다시 눈을 떴을 때 당연하게도 에릭은 없었다. 당신은 제3초소 경계병들의 걱정 속에서 몸을 일으켰다. 치료를 잘해줬는지 몸이 가뿐하다."
        },
        {
            type : "effect",
            run : (player) => {
                addQuestProgress(player, "erwin");
                changeHP(player, 100);
                changeStamina(player, 100);
                changeNPCEmotion("eric", "dominance", 5);
                changeNPCEmotion("eric", "affection", 3);
                changeNPCEmotion("valen", "affection", 1);
                changeNPCEmotion("akasia", "affection", 1);

                savePlayer(player);
                
                leaveDungeon(player);
            }
        }
    ], player);
}

window.startBanditBossBattle = function(player){
    startBattle("banditBoss", player, {
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

//act2 인신매매상 관련

function handleSlaverCampBossWin(player){
    player.flags = player.flags || {};
    player.flags.slaverCamp_cleared = true;

    addQuestProgress(player, "trafficker4");
    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "수장이 쓰러졌다.<br><br>" +
                "그 순간부터 진지는 무너지기 시작했다. 누군가는 비명을 지르며 도망쳤고, 누군가는 포로들을 내버려둔 채 짐만 챙겨 달아났다.<br><br>" +
                "흙길 위에는 발자국과 버려진 사슬, 뒤집힌 상자들만 남았다.<br><br>" +
                "인신매매단 임시 진지는 사실상 해산된 것 같다."
        },
        {
            type: "choice",
            choices: [
                { text: "경비초소로 돌아간다", action: "leave_dungeon_after_boss" },
                { text: "조금 더 둘러본다", action: "continue_dungeon_after_boss" }
            ]
        }
    ], player);
}

function handleSlaverCampShelterBossWin(player){
    player.flags = player.flags || {};
    player.flags.slaverCampShelter_cleared = true;

    addQuestProgress(player, "trafficker4");
    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "당신은 인신매매단 간부를 이겼다. 유리는 아직 살아있는 아이들에게 다가갔다. 아이들 몇 명은 울음을 터뜨렸고, 아이들 몇 명은 울지도 못하고 그저 가만히 있었다." +
                "<br><br>\"괜찮아.... 이제 지켜줄게.<br>무슨 일이 있어도, 너네들만큼은 지켜낼게.\"<br><br>" +
                "아이들에게 하는 약속이기도 하고, 자신에게 하는 약속이기도 했다. 유리는 당신을 돌아보았다." +
                "<br><br>\"고마워. 네가 없었으면 아이들을 구하지 못했을 거야.\"<br><br>" +
                "해체된 인신매매단 거점에서 그는 아이들을 이끌고 밖으로 나갔다. 그는 당신에게 쉘터에 갈 때까지 같이 가줄 수 있겠냐고 물었다." +
                "<br><br>\"...아니. 나랑 같이 쉘터까지 같이 가주겠어?<br>내가, 혼자서는 지키지 못할 거 같거든. 네 도움이 필요해.\"<br><br>"
        },
        {
            type: "choice",
            choices: [
                { text: "쉘터로 돌아간다", action: "leave_dungeon_after_boss" },
                { text: "조금 더 둘러본다", action: "continue_dungeon_after_boss" }
            ]
        }
    ], player);
}

window.startSlaverCampShelterBossBattle = function(player){
    startBattle("trafficker4", player, {
        noEscape: true,
        customTurnEvents : {
            1: () => {
                log("인신매매단 간부 : 이렇게 싸우는 것도 인연이니 하나만 말해주지. 저놈 옆에 남아있지마. 주변을 죽음으로 이끄는 놈이니까.", "special");
            },

            2: () => {
                log("인신매매단 간부 : 우습게도 항상 혼자만 살아남는 놈이지. 여기서 네가 죽는다? 그래도 저녀석은 살아남을 거다.", "special");
            },

            3 : () => {
                log(`유리 : 아니. ${player.name}만큼은 내가 무슨 일이 있어도 지킬 거야.`, "yuri");
            },

            4 : () => {
                log("유리 : ...무슨 일이 있어도.", "yuri");
            },

            5 : () => {
                log("인신매매단 간부 : 그 눈빛... 조금은 돌아온 모양이군? 좋아. 마음에 들어. 예상보다 더 비싸게 팔 수 있겠군.", "special")
            }
        },

        allyTurnSupport : {
            name : "yuri",
            hpRate : 0.5,
            damage : 15,
            logType : "yuri",
            line : () => {
                const lines = [
                    "적들을 어느 정도 해치우고 온 유리가 인신매매단 간부의 빈틈을 노린다! 인신매매단 간부의 옆구리에서 피가 난다! <strong>15 데미지!</strong>",
                    `유리 : ${player.name}, 그리고 쉘터만큼은 무슨 일이 있어도 지켜낼 거야. <strong>15 데미지!</strong>`,
                    "유리는 인신매매단 간부의 부하들을 밀쳐내고 인신매매단 간부에게 검격을 넣었다. 그의 공격은 굉장히 빨랐다. <strong>15 데미지!</strong>",
                    "인신매매단 간부의 옆구리로 유리의 쌍검이 파고들었다. 인신매매단 간부의 손이 유리를 잡기 전에, 유리는 재빨리 뒤로 물러서서 다시 거리를 벌렸다. <strong>15 데미지!</strong>",
                    "유리는 지지 않을 것이다. 그의 눈빛은 평소의 상냥함 하나 없이 매서웠다. 그의 쌍검이 인신매매단 간부의 팔을 찢는다. <strong>15 데미지!</strong>",
                    "마치 춤을 추듯이 유려하게 유리는 인신매매단 간부를 여기저기서 공격했다. 인신매매단 간부가 한 순간 빈틈을 보였을 때, 유리는 그 순간을 절대로 놓치지 않았다. <strong>15 데미지!</strong>"
                ];

                return getRandom(lines).replaceAll("{playerName}", player.name);
            }
        },
        onWin: () => {
            player.flags = player.flags || {};
            player.flags.defeated_slaverCampShelter_trafficker4 = true;
            savePlayer(player);
            
            handleDungeonBossWin(
                player,
                getCurrentDungeon(player),
                getCurrentDungeonRoom(player)
            );
        },
        onSkipDefeat : () => {
            startSlaverShelterBossLose(player);
        }
    });
};

function startSlaverShelterBossLose(player){
    player.flags = player.flags || {};

    if (!player.flags.slaverCampShelter_boss_firstLose){

        player.flags.slaverCampShelter_boss_firstLose = true;

        startScene([
            {
                type:"text",
                value:
                    "당신은 인신매매단 간부의 공격을 버티지 못하고 쓰러졌다. 인신매매단 간부가 당신을 올가미로 제압하려는 순간, 유리가 당신의 몸을 안았다. 그리고 그는 그대로 땅에 무언가를 던졌다." +
                    "<br><br>! 연막탄이었던 모양이다.<br><br>" +
                    "뒤에서 쫓아오는 소리가 들렸지만 유리는 당신을 공주님안기로 안고서도 그들보다 더 빨랐다. 그의 품안에서 당신의 눈이 감긴다...."
            },
            {
                type : "text",
                value : 
                      "다시 눈을 떴을 때 당신은 헝겊으로 된 침대 위에 누워있었다. 경계를 서고 있던 유리가 당신의 인기척에 뒤를 돌았다." +
                      "<br><br>\"치료는 다 했어.\"<br><br>" +
                      "그는 당신의 몸상태를 한번 더 살폈다. 당신의 몸은 더 이상 고통을 느끼고 있지 않다. 당신은 자리에서 일어났다." +
                      "<br><br>쉘터의 아이들을 위해, 당신은 다시 가야만 했다."
            },
            {
                type:"effect",
                run:(player)=>{
                    player.dungeon.room = "r4c0";
                    changeHP(player, 100);
                    changeStamina(player, 100);
                    passTime(player, 50);
                    savePlayer(player);
                }
            }
        ], player);

        return;
    }

    player.dungeon.room = "r4c0";
    changeHP(player, 100);
    changeStamina(player, 100);
    passTime(player, 50);

    startScene([
        {
            type:"text",
            value:
                "당신은 또 한번 패배했지만 유리의 손은 절대로 당신의 손을 놓지 않았다. 그는 아이들은 전부 지키지 못했지만 당신만큼은 놓칠 수 없었다. <br><br>시야가 껌껌해지고 다시 눈을 떴을 떄 유리는 당신의 옆에 있었다, 언제나처럼."
        }
    ], player);
}

//상류도시03 퀘스트
window.startSoraFatherBattle = function(player){
    startBattle("soraFather", player, {
        noEscape: true,
        onWin: () => {
            player.flags = player.flags || {};
            player.flags.defeated_whiteFlowerOldLab_soraFather = true;
            savePlayer(player);

            handleDungeonBossWin(
                player,
                getCurrentDungeon(player),
                getCurrentDungeonRoom(player)
            );
        },
        onSkipDefeat : () => {
            startSoraFatherLose(player);
        }
    });
};

function handleSoraFatherWin(player){
    player.flags = player.flags || {};

    player.flags.uppercity_quest03_done = true;

    addQuestProgress(player);
    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "그는 결국 쓰러졌다. 당신은 하얀꽃이 압착되어 있는 목걸이를 주웠다. 당신은 데이터로그를 보았다.<br><br>" +
                "<div style='text-align:center; font-size:2rem; color: #ff0000;'>5</div><br><br>" +
                "<div style='text-align:center; font-size:2rem; color: #ff4901;'>4</div><br><br>" +
                "<div style='text-align:center; font-size:2rem; color: #fbff07;'>3</div><br><br>" +
                "시간이 없다. 이러다가는 당신마저 타버릴 것이다. 당신은 주변을 둘러보다가 천장을 올려다보았다. 소각 준비 절차인지 아까와 다르게 천장이 뻥 뚫려있었다. 당신은 어떻게든 밟고 뛰면서 천장의 구멍으로 올라갔다." +
                "<div style='text-align:center; font-size:2rem; color: #ff07c1;'>2</div><br><br>" +
                "<div style='text-align:center; font-size:2rem; color: #a200ff;'>1</div><br><br>" +
                "<br><br>잠깐의 정적, 그리고, <br><br><div style='text-align:center; font-size:2rem; color: #ff0000;'>퍼엉</div><br><br>"
        },
        {
            type : "text",
            value :
                "귀가 맹맹하다. 연구소는 완전히 끝났다. 당신은 경계병 제3초소 쪽으로 걸어갔다. 주점에 의뢰 완료를 보고하러 가야 한다."
        },
        {
            type : "effect",
            run : (player) => {
                leaveDungeon(player);
            }
        }
    ], player);
}

function startSoraFatherLose(player){
    player.flags = player.flags || {};

    if (!player.flags.soraFather_firstLose){

        player.flags.soraFather_firstLose = true;

        startScene([
            {
                type:"text",
                value:
                    "그는 당신의 목을 낫으로 베려고 했다. 하지만 그 순간, 당신의 몸을 누군가가 감싸안았다. 당신을 안고 있는 누군가는 울고 있었다. 점점 의식이 희미해져가는 당신의 뒤로 목소리가 웅얼거리듯이 들린다. 당신은 결국 그들이 뭐라고 하는지는 듣지 못하고 그대로 기절했다." +
                    "여기가 어디지...? 누군가가 당신에게 죽지 말라고 말하고 있었다. 당신은 다시 잃을 뻔한 의식 속에서도 당신을 구해준 사람을 보기 위해 눈을 부릅 떴다. 백발의 금안... 그리고 꽃으로 으스러지고 있는 누군가. 형태를 유지하기 위해 애써 노력하고 있는 누군가. 당신과 시선을 마주친 그가 입술을 벌렸다." +
                    "<br><br>\"ㅇ, 서, 해줄, ㄱ... 그ㄹ..ㄴ.... ㄴ게로...와...\"<br><br>" +
                    "본체가 아니었다. 그 말을 마친 그는 그대로 꽃으로 흩어져내렸다." +
                    "<br>당신이 다시 눈을 떴을 때 당신은 하얀꽃 무덤이라고 불려도 될 정도로 수북하게 하얀꽃잎들이 쌓여있는 곳에 누워있었다. 당신은 몸을 일으켰다. 몸이 가뿐하다."
            },
            {
                type:"effect",
                run:(player)=>{
                    player.dungeon.room = "r5c5";
                    changeHP(player, 100);
                    savePlayer(player);
                }
            }
        ], player);

        return;
    }

    player.dungeon.room = "r5c5";
    changeHP(player, 100);

    startScene([
        {
            type:"text",
            value:
                "당신은 또 그의 낫을 이기지 못하고 쓰러졌다. 하지만 이번에도 당신이 눈을 떴을 때 당신은 하얀꽃들이 수북하게 쌓여있는 곳에 누워있었다. 당신은 몸을 일으켰다."
        }
    ], player);
}

//rebel02 스토리 관련
window.startRebelsHideOutStoryBossBattle = function(player){
    startBattle("rebelLeader2", player, {
        noEscape: true,
        onWin: () => {
            player.flags = player.flags || {};
            player.flags.defeated_rebelsHideOut_rebelLeader2 = true;
            savePlayer(player);

            handleDungeonBossWin(
                player,
                getCurrentDungeon(player),
                getCurrentDungeonRoom(player)
            );
        },
        onSkipDefeat : () => {
            startRebelLeader2Lose(player);
        }
    });
};

function handleRebelLeader2Win(player){
    player.flags = player.flags || {};

    player.flags.rebel_story02_done = true;
    addQuestProgress(player);

    const hasYuriRing = hasItemOrEquipped(player, "yuriRebelRing");

    if (hasYuriRing){
        startScene([
            {
                type: "text",
                value:
                    "무릎 한쪽을 꿇은 채, 반란군 수장은 마지막까지 당신을 공격하려고 했다. 하지만 당신이 가지고 있는 유리의 반지에 시선이 닿자 그는 순간적으로 공격을 멈추었다." +
                    "<br>백색 군단은 다른 반란군들을 죽이느라 바쁘다. 어쩌면, 당신은 당신의 선택으로 그를 살려줄 수 있을지도 모른다. 지금까지 있었던 일들이 주마등처럼 당신의 머리를 스치고 지나갔다." +
                    "<br><br><span class='log-danger'>돌이킬 수 없는 결정입니다.</span>"
            },
            {
                type: "choice",
                choices: [
                    { text: "그를 살려준다.", action: "spare_rebelLeader2" },
                    { text: "그를 죽인다.", action: "kill_rebelLeader2_withRing" }
                ]
            }
        ], player);
    } else {
        player.flags.rebelLeader2KilledNoRing = true;
        savePlayer(player);

        startScene([
            {
                type: "text",
                value:
                    "반란군 수장은 끝까지 당신을 죽이려고 들었다. 그가 한손검을 다시 쥐었을 때 당신은 어쩔 수 없이 그의 목을 벴다, 지금까지 당신이 죽여온 많은 사람들처럼." +
                    "백색 군단장이 당신에게 다가왔다. 그는 당신에게 고개를 숙여보이더니 \"수고하셨습니다\"라고 말했다. 당신이 반란군 수장의 목을 벨 때까지 쭉 곁에서 지켜보고 있었던 모양이다. 고개를 들자 하늘색 머리 밑으로 그의 금안이 드러났다." +
                    "<br><br>\"발렌 님께 보고드리겠습니다. 그리고 발렌 님이 의뢰 완료는 하류도시 주점에서 해달라고 말씀하셨습니다.\"<br><br>" +
                    "그는 당신의 '왜?' 질문은 받지 않았다. 그는 딱 그 말을 던지고 나머지 백색 군단을 통솔하며 전장을 마무리했다." +
                    "<br><br>...당신은 던전에서 나왔다."
            },
            {
                type : "effect",
                run : (player) => {
                    changeNPCEmotion("aiden", "affection", 20);
                    changeNPCEmotion("valen", "affection", 10);
                    changeNPCEmotion("akasia", "affection", 10);
                    savePlayer(player);
                    leaveDungeon(player);
                }
            }
        ], player);
    }
}

window.spare_rebelLeader2 = function(player){
    player.flags = player.flags || {};

    player.flags.rebelLeader2SparedWithRing = true;
    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "당신은 무기를 거두었다. 반란군 수장은 믿을 수 없다는 듯이 당신을 바라보다가 \"역시...\"라는 말과 함꼐 자리에서 일어났다. 그는 그 반지의 주인에게 우리는 아직 살아있다고 전해달라고 부탁했다. 그리고 우리는, 여전히 당신의 도움을 필요로 한다는 말까지." +
                "<br>그는 당신의 자비를 헛되게 쓰지 않았다. 살릴 수 있는 반란군들을 통솔하며 그는 쫓아오는 백색 군단에서 멀어졌다. 당신이 안도의 한숨을 쉬고 뒤를 도는 순간," +
                "<br><br>\"수고하셨습니다, 하류도시의 영웅. 발렌 님께서 이 일은 주점에서 보고하길 원하십니다.\"<br><br>" +
                "대체 언제부터 보고 있었던 걸까. 하늘색 머리카락 밑으로 그의 금안이 드러났다. 지금 그가 무슨 생각을 하고 있는지 그 눈동자만을 봐서는 알 수가 없다. 그는 그 말만을 마치고 당신에게서 고개를 돌렸다." +
                "<br><br>...그들을 뒤로 하고 당신은 전장에서 일탈했다."
        },
        {
            type : "effect",
            run : (player) => {
                changeNPCEmotion("aiden", "affection", -10);
                changeNPCEmotion("valen", "affection", -3);
                changeNPCEmotion("akasia", "affection", -5);
                changeNPCEmotion("aiden", "rage", 10);
                changeNPCEmotion("valen", "rage", 10);
                changeNPCEmotion("akasia", "rage", 10);
                savePlayer(player);
                leaveDungeon(player);
            }
        }
    ], player);
};

window.kill_rebelLeader2_withRing = function(player){
    player.flags = player.flags || {};

    player.flags.rebelLeader2KilledWithRing = true;
    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "당신은 그가 공격이 멈춘 걸 보긴 했지만, 그래도 반란군 수장의 목을 베었다. 반란군 수장은 그대로 당신의 앞에 쓰러져서 죽었다, 어쩌면 당신에게 무언가의 말을 전하려다가 그 말을 결국에는 전하지 못한 채로 죽은 걸지도 모르겠다." +
                "<br><br>그 순간, 백색 군단장이 당신에게 다가왔다. 하늘색 머리 밑의 금안, 그는 대체 언제부터 당신을 지켜보고 있었던 걸까. 그는 당신에게 고개를 숙여보이더니 수고하셨다고 말했다." +
                "<br><br>\"발렌 님께 보고드리겠습니다. 그리고 발렌 님은 당신이 주점에서 임무 완수 보고를 하길 바라십니다.\"<br><br>" +
                "그는 당신에게 질문이나 반박의 여지를 남기지 않았다. 그저 고개를 한번 더 숙여보인 후 고개를 돌려 반란군 잔당 처리를 시작했다. 반란군들의 죽어가는 소리가 당신의 귀에 울린다." +
                "<br><br>...당신은 전장에서 일탈했다."
        },
        {
            type : "effect",
            run : (player) => {
                changeNPCEmotion("aiden", "affection", 20);
                changeNPCEmotion("valen", "affection", 5);
                changeNPCEmotion("akasia", "affection", 5);
                savePlayer(player);
                leaveDungeon(player);
            }
        }
    ], player);
};

function startRebelLeader2Lose(player){
    gameOver(
        player,
        "당신은 반란군 수장에게 패배했다. 마지막 순간, 붉은 깃발 아래에서 누군가가 외치는 소리가 들렸다.<br><br>우리는 아직 죽지 않았다.<br><br>칼날이 당신의 목으로 떨어진다. 당신이 다시 눈을 떴을 때, 아주 잠깐, 당신의 시야는 뒤집혀 있었다."
    );
}
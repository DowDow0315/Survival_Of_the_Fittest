Object.assign(DUNGEONS, {
    survivalBandit : {
        id : "survivalBandit",
        name : "도적들의 생존지",
        startRoom : "r2c4",

        layout : [
            ["r0c0",     "", "r0c2", "r0c3", "r0c4"],
            ["r1c0",     "", "r1c2",     "", "r1c4"],
            ["r2c0", "r2c1", "r2c2",     "", "r2c4"],
            [    "", "r3c1",     "",     "",     ""],
            ["r4c0", "r4c1", "r4c2", "r4c3",     ""]
        ],

        rooms : {
            "r0c0" : {name : "살아남은 자의 방", exits : {down : "r1c0"}, boss : "advancedBanditBoss"},
            "r0c2" : {name : "핏자국을 따라 2", exits : {down : "r1c2", right : "r0c3"}},
            "r0c3" : {name : "핏자국을 따라 1", exits : {left : "r0c2", right : "r0c4"}, event : "survivalBandit_bloodLine"},
            "r0c4" : {name : "아수라장", exits : {left : "r0c3", down : "r1c4"}, event : "survivalBandit_mess"},

            "r1c0" : {name : "쉬어가는 틈", exits : {up : "r0c0", down : "r2c0"}, safeZone: true, allowRest: true},
            "r1c2" : {name : "핏자국을 따라 3", exits : {up : "r0c2", down : "r2c2"}},
            "r1c4" : {name : "쉘터의 아이가 남긴 쪽지", exits : {up : "r0c4", down : "r2c4"}, event : "survivalBandit_shelterMemo"},

            "r2c0" : {name : "보석가루가 흩뿌려져 있는 방", exits : {up : "r1c0", right : "r2c1"}},
            "r2c1" : {name : "절망의 길", exits : {left : "r2c0", down : "r3c1", right : "r2c2"}},
            "r2c2" : {name : "저항의 길", exits : {left : "r2c1", up : "r1c2"}},
            "r2c4" : {name : "생존자들의 근거지 입구", exits : {up : "r1c4"}},

            "r3c1" : {name : "아이를 껴안고 있는 어른의 시체", exits : {up : "r2c1", down : "r4c1"}, event : "survivalBandit_corpsesOfThem"},

            "r4c0" : {name : "감방", exits : {right : "r4c1"}, event : "survivalBandit_prison", seenFlag : "survivalBandit_prison"},
            "r4c1" : {name : "감방 앞", exits : {left : "r4c0", up : "r3c1", right : "r4c2"}},
            "r4c2" : {name : "검문소", exits : {left : "r4c1", right : "r4c3"}},
            "r4c3" : {name : "도적들 침실", exits : {left : "r4c2"}, event : "survivalBandit_banditMemo"}
        },

        encounters : [
            { type : "event", id : "survivalBandit_corpses", weight : 25 },
            { type : "event", id : "survivalBandit_trap", weight : 20 },
            { type : "event", id : "survivalBandit_child", weight : 8 },
            { type : "battle", enemy : "advancedBandit1", minCount : 1, maxCount : 3, weight : 30 },
            { type : "battle", enemy : "advancedBandit2", minCount : 1, maxCount : 2, weight : 25 },
            { type : "battle", enemies : ["advancedBandit1", "advancedBandit2"], weight : 30},
            { type : "battle", enemies : ["advancedBandit1", "advancedBandit1", "advancedBandit2"], weight : 25},
        ]
    },

    survivalBanditRepeated : {
        id : "survivalBanditRepeated",
        name : "인간이 아닌 것들의 근거지",
        startRoom : "r2c4",

        layout : [
            ["r0c0",     "", "r0c2", "r0c3", "r0c4"],
            ["r1c0",     "", "r1c2",     "", "r1c4"],
            ["r2c0", "r2c1", "r2c2",     "", "r2c4"],
            [    "", "r3c1",     "",     "",     ""],
            ["r4c0", "r4c1", "r4c2", "r4c3",     ""]
        ],

        rooms : {
            "r0c0" : {name : "살아남은 자의 방", exits : {down : "r1c0"}, boss : "advancedBanditBoss"},
            "r0c2" : {name : "들어가는 길2", exits : {down : "r1c2", right : "r0c3"}},
            "r0c3" : {name : "들어가는 길1", exits : {left : "r0c2", right : "r0c4"}},
            "r0c4" : {name : "좁은 길2", exits : {left : "r0c3", down : "r1c4"}},

            "r1c0" : {name : "쉬어가는 틈", exits : {up : "r0c0", down : "r2c0"}, safeZone: true, allowRest: true},
            "r1c2" : {name : "길목", exits : {up : "r0c2", down : "r2c2"}},
            "r1c4" : {name : "좁은 길1", exits : {up : "r0c4", down : "r2c4"}},

            "r2c0" : {name : "악행길", exits : {up : "r1c0", right : "r2c1"}},
            "r2c1" : {name : "갈래길", exits : {left : "r2c0", down : "r3c1", right : "r2c2"}, chest : "survivalBandit_chest"},
            "r2c2" : {name : "코너길", exits : {left : "r2c1", up : "r1c2"}},
            "r2c4" : {name : "근거지 입구", exits : {up : "r1c4"}},

            "r3c1" : {name : "남쪽으로 빠지는 길", exits : {up : "r2c1", down : "r4c1"}},

            "r4c0" : {name : "구석", exits : {right : "r4c1"}, chest : "survivalBandit_chest"},
            "r4c1" : {name : "길목", exits : {left : "r4c0", up : "r3c1", right : "r4c2"}},
            "r4c2" : {name : "좁게 들어가는 길", exits : {left : "r4c1", right : "r4c3"}},
            "r4c3" : {name : "좁은 구석", exits : {left : "r4c2"}, chest : "survivalBandit_chest"}
        },

        encounters : [
            { type : "event", id : "survivalBanditRepeated_corpses", weight : 25 },
            { type : "event", id : "survivalBanditRepeated_trap", weight : 20 },
            { type : "event", id : "survivalBanditRepeated_child", weight : 8 },
            { type : "battle", enemy : "advancedBandit1", minCount : 1, maxCount : 3, weight : 30 },
            { type : "battle", enemy : "advancedBandit2", minCount : 1, maxCount : 2, weight : 25 },
            { type : "battle", enemies : ["advancedBandit1", "advancedBandit2"], weight : 30},
            { type : "battle", enemies : ["advancedBandit1", "advancedBandit1", "advancedBandit2"], weight : 25},
        ]
    },

    abominationCave : {
        id : "abominationCave",
        name : "사람들이 끌려간 흉물소굴",
        startRoom : "r1c6",

        layout : [
            [    "",     "", "r0c2", "r0c3", "r0c4", "r0c5",     "",     ""],
            ["r1c0", "r1c1",     "", "r1c3",     "",     "", "r1c6",     ""],
            ["r2c0",     "",     "", "r2c3",     "",     "", "r2c6",     ""],
            ["r3c0", "r3c1", "r3c2", "r3c3", "r3c4", "r3c5", "r3c6", "r3c7"],
            [    "", "r4c1",     "",     "",     "",     "",     "", "r4c7"],
            [    "", "r5c1",     "",     "", "r5c4",     "", "r5c6", "r5c7"],
            [    "", "r6c1", "r6c2", "r6c3", "r6c4",     "",     "", "r6c7"]
        ],

        rooms : {
            "r0c2" : {name : "땅속에 묻힌 메모", exits : {right : "r0c3"}, event : "abominationCave_groundMemo"},
            "r0c3" : {name : "누군가가 파놓은 흔적", exits : {left : "r0c2", right : "r0c4", down : "r1c3"}},
            "r0c4" : {name : "탈출구?", exits : {left : "r0c3", right : "r0c5"}},
            "r0c5" : {name : "막힌 구멍", exits : {left : "r0c4"}, event : "abominationCave_cantEscape"},

            "r1c0" : {name : "잠시 쉴 수 있는 구멍", exits : {right : "r1c1", down : "r2c0"}, safeZone: true, allowRest: true },
            "r1c1" : {name : "인큐베이터", exits : {left : "r1c0"}, bossId: "abominations", boss : ["abomination1", "abomination3", "abomination4"], bossIntro:"abominations_intro"},
            "r1c3" : {name : "결합된 냄새", exits : {up : "r0c3", down : "r2c3"}, event : "abominationCave_mixedSmell"},
            "r1c6" : {name : "흉물소굴 입구", exits : {down : "r2c6"}},

            "r2c0" : {name : "신음 소리가 들리는 방", exits : {up : "r1c0", down : "r3c0"}},
            "r2c3" : {name : "하얀꽃잎이 꽂혀있는 방", exits : {up : "r1c3", down : "r3c3"}, event : "abominationCave_whiteFlower", seenFlag : "abominationCave_whiteFlower"},
            "r2c6" : {name : "들끓는 살점", exits : {up : "r1c6", down : "r3c6"}, chest : "abominationCave_chest"},

            "r3c0" : {name : "꽃잎이 먹힌 흔적", exits : {up : "r2c0", right : "r3c1"}, event : "abominationCave_whiteFlower2", seenFlag : "abominationCave_whiteFlower2"},
            "r3c1" : {name : "세갈래길", exits : {left : "r3c0", right : "r3c2", down : "r4c1"}},
            "r3c2" : {name : "울퉁불퉁한 길", exits : {left : "r3c1", right : "r3c3"}},
            "r3c3" : {name : "짙어지는 역겨운 냄새", exits : {left : "r3c2", right : "r3c4", up : "r2c3"}, chest : "abominationCave_chest"},
            "r3c4" : {name : "길게 뻗은 길", exits : {left : "r3c3", right : "r3c5"}},
            "r3c5" : {name : "탐사자의 흔적", exits : {left : "r3c4", right : "r3c6"}, event : "abominationCave_searcher"},
            "r3c6" : {name : "갈라지는 길", exits : {left : "r3c5", right : "r3c7", up : "r2c6"}},
            "r3c7" : {name : "역겨운 통로1", exits : {left : "r3c6", down : "r4c7"}},

            "r4c1" : {name : "붉은통로1", exits : {up : "r3c1", down : "r5c1"}},
            "r4c7" : {name : "역겨운 통로2", exits : {up : "r3c7", down : "r5c7"}},

            "r5c1" : {name : "붉은통로2", exits : {up : "r4c1", down : "r6c1"}},
            "r5c4" : {name : "생존자?", exits : {down : "r6c4"}, event : "abominationCave_surviver_02", seenFlag : "abominationCave_surviver_02"},
            "r5c6" : {name : "뼛조각 방", exits : {right : "r5c7"}, chest : "abominationCave_chest"},
            "r5c7" : {name : "역겨운 통로3", exits : {left : "r5c6", up : "r4c7", down : "r6c7"}},
            
            "r6c1" : {name : "붉은통로3", exits : {up: "r5c1", right : "r6c2"}, event : "abominationCave_surviver_01", seenFlag : "abominationCave_surviver_01"},
            "r6c2" : {name : "붉은통로4", exits : {left : "r6c1", right : "r6c3"}},
            "r6c3" : {name : "붉은통로5", exits : {left : "r6c2", right : "r6c4"}},
            "r6c4" : {name : "붉은통로의 마지막", exits : {left : "r6c3", up : "r5c4"}},
            "r6c7" : {name : "흉물들 먹이방", exits : {up : "r5c7"}, chest : "abominationCave_chest"}
        },

        encounters : [
            { type : "battle", enemy : "abomination1", minCount : 3, maxCount : 4, weight : 30},
            { type : "battle", enemies : ["abomination1", "abomination1", "abomination2"], weight : 20},
            { type : "battle", enemy : "abomination3", minCount : 3, maxCount : 4, weight : 30},
            { type : "battle", enemies : ["abomination3", "abomination1", "abomination3", "abomination1"], weight : 20 },
            { type : "battle", enemy : "abomination2", minCount : 1, maxCount : 2, weight : 20},
            { type : "event", id : "abominationCave_abominatedFish", weight : 25 },
            { type : "event", id : "abominationCave_redGem", weight : 1 },
            { type : "event", id : "abominationCave_scream", weight : 20 },
            { type : "event", id : "abominationCave_eggs", weight : 20 }
        ]

    },

    abominationCaveRepeated : {
        id : "abominationCaveRepeated",
        name : "흉물소굴",
        startRoom : "r1c4",

        layout : [
            ["r0c0", "r0c1", "r0c2", "r0c3",     ""],
            ["r1c0",     "",     "",     "", "r1c4"],
            ["r2c0", "r2c1", "r2c2",     "", "r2c4"],
            [    "",     "", "r3c2", "r3c3", "r3c4"]
        ],

        rooms : {
            "r0c0" : {name : "끈적끈적한 코너2", exits : {down : "r1c0", right : "r0c1"}, chest : "abominationCave_chest"},
            "r0c1" : {name : "끈적끈적한 길4", exits : {left : "r0c0", right : "r0c2"}},
            "r0c2" : {name : "쉴 수 있는 틈새", exits : {left : "r0c1", right : "r0c3"}, safeZone: true, allowRest: true},
            "r0c3" : {name : "흉물소굴 심부", exits : {left : "r0c2"}, bossId: "abominations2", boss : ["abomination1", "abomination1", "abomination3", "abomination4"]},

            "r1c0" : {name : "끈적끈적한 길3", exits : {up : "r0c0", down : "r2c0"}},
            "r1c4" : {name : "흉물소굴 입구", exits : {down : "r2c4"}},

            "r2c0" : {name : "끈적끈적한 코너", exits : {up : "r1c0", right : "r2c1"}, chest : "abominationCave_chest"},
            "r2c1" : {name : "끈적끈적한 길2", exits : {left : "r2c0", right : "r2c2"}},
            "r2c2" : {name : "끈적끈적한 길1", exits : {left : "r2c1", down : "r3c2"}},
            "r2c4" : {name : "입구부터 뻗는 길", exits : {up : "r1c4", down : "r3c4"}},

            "r3c2" : {name : "돌부리길", exits : {up : "r2c2", right : "r3c3"}},
            "r3c3" : {name : "울퉁불퉁한 길", exits : {left : "r3c2", right : "r3c4"}},
            "r3c4" : {name : "코너길", exits : {left : "r3c3", up : "r2c4"}, chest : "abominationCave_chest"}
        },

        encounters : [
            { type : "battle", enemy : "abomination1", minCount : 3, maxCount : 4, weight : 30},
            { type : "battle", enemies : ["abomination1", "abomination1", "abomination2"], weight : 20},
            { type : "battle", enemy : "abomination3", minCount : 3, maxCount : 4, weight : 30},
            { type : "battle", enemies : ["abomination3", "abomination1", "abomination3", "abomination1"], weight : 20 },
            { type : "battle", enemy : "abomination2", minCount : 1, maxCount : 2, weight : 20},
            { type : "event", id : "abominationCaveRepeated_abominatedFish", weight : 25 },
            { type : "event", id : "abominationCaveRepeated_redGem", weight : 1 },
            { type : "event", id : "abominationCaveRepeated_scream", weight : 20 },
            { type : "event", id : "abominationCaveRepeated_eggs", weight : 20 }
        ]
    },

    madLab : {
        id : "madLab",
        name : "폐쇄된 연구소",
        startRoom : "r7c5",

        layout : [
            ["r0c0", "r0c1", "r0c2",     "", "r0c4", "r0c5"],
            ["r1c0",     "", "r1c2",     "",     "", "r1c5"],
            ["r2c0",     "",     "",     "", "r2c4", "r2c5"],
            ["r3c0", "r3c1", "r3c2", "r3c3", "r3c4",     ""],
            [    "",     "", "r4c2",     "", "r4c4",     ""],
            ["r5c0", "r5c1", "r5c2",     "", "r5c4", "r5c5"],
            ["r6c0",     "", "r6c2", "r6c3",     "",     ""],
            ["r7c0",     "",     "", "r7c3",     "", "r7c5"],
            ["r8c0", "r8c1",     "", "r8c3", "r8c4", "r8c5"]
        ],

        rooms : {
            "r0c0" : {name : "기도실", exits : {right : "r0c1", down : "r1c0"}, chest : "madLab_chest"},
            "r0c1" : {name : "약품실", exits : {left : "r0c0", right : "r0c2"}, safeZone: true, allowRest: true},
            "r0c2" : {name : "복도의 작은 틈", exits : {left : "r0c1", down : "r1c2"}},
            "r0c4" : {name : "소각소", exits : {right : "r0c5"}, chest : "madLab_chest"},
            "r0c5" : {name : "가득 쌓인 시체들", exits : {left : "r0c4", down : "r1c5"}, event : "madLab_pain_03", seenFlag : "madLab_joy_03"},
            
            "r1c0" : {name : "누군가의 초상화가 걸려있던 방", exits : {up : "r0c0", down : "r2c0"}, event : "madLab_who", seenFlag : "madLab_who"},
            "r1c2" : {name : "잔뜩 찢긴 소라의 초상화", exits : {up : "r0c2"}, bossId: "teacherAndStudents", boss : ["experimentTeacher", "experimentAboFlower3", "experimentAboFlower3"], bossIntro:"teacherAndStudents_intro"},
            "r1c5" : {name : "세뇌?", exits : {up : "r0c5", down : "r2c5"}},

            "r2c0" : {name : "달콤한 냄새가 나는 복도", exits : {up : "r1c0", down : "r3c0"}},
            "r2c4" : {name : "고통의 시간", exits : {right : "r2c5", down : "r3c4"}, event : "madLab_pain_01", seenFlag : "madLab_pain_01"},
            "r2c5" : {name : "세뇌의 방", exits : {up : "r1c5", left : "r2c4"}, event : "madLab_pain_02", seenFlag : "madLab_pain_02"},

            "r3c0" : {name : "흉물 살점이 벽에 붙어 살아 숨쉬는 복도5", exits : {up : "r2c0", right : "r3c1"}},
            "r3c1" : {name : "흉물 살점이 벽에 붙어 살아 숨쉬는 복도4", exits : {left : "r3c0", right : "r3c2"}},
            "r3c2" : {name : "흉물 살점이 벽에 붙어 살아 숨쉬는 복도3", exits : {left : "r3c1", right : "r3c3", down : "r4c2"}, chest : "madLab_chest"},
            "r3c3" : {name : "가운을 입고 죽어있는 흉물들?", exits : {left : "r3c2", right : "r3c4"}, event : "madLab_joy_01", seenFlag : "madLab_joy_01"},
            "r3c4" : {name : "갈림길", exits : {up : "r2c4", left : "r3c3", down : "r4c4"}},

            "r4c2" : {name : "흉물 살점이 벽에 붙어 살아 숨쉬는 복도2", exits : {up : "r3c2", down : "r5c2"}},
            "r4c4" : {name : "인내의 복도", exits : {up : "r3c4", down : "r5c4"}, chest : "madLab_chest"},

            "r5c0" : {name : "기록실로 이어지는 복도", exits : {right : "r5c1", down : "r6c0"}},
            "r5c1" : {name : "오래된 비디오들이 쌓여있는 방", exits : {left : "r5c0", right : "r5c2"}, event : "madLab_video_01", seenFlag : "madLab_video_01"},
            "r5c2" : {name : "흉물 살점이 벽에 붙어 살아 숨쉬는 복도1", exits : {up : "r4c2", left : "r5c1", down : "r6c2"}},
            "r5c4" : {name : "기쁨의 시간 앞", exits : {up : "r4c4", right : "r5c5"}},
            "r5c5" : {name : "기쁨의 시간", exits : {left : "r5c4"}, event : "madLab_joy_02", seenFlag : "madLab_joy_02"},

            "r6c0" : {name : "영상방1", exits : {up : "r5c0", down : "r7c0"}, event : "madLab_video_02", seenFlag : "madLab_video_02"},
            "r6c2" : {name : "할퀴어져 있는 벽", exits : {up : "r5c2", right : "r6c3"}, chest : "madLab_chest"},
            "r6c3" : {name : "엉성한 바리게이트", exits : {left : "r6c2", down : "r7c3"}},

            "r7c0" : {name : "실험실1", exits : {up : "r6c0", down : "r8c0"}, event : "madLab_video_03", seenFlag : "madLab_video_03"},
            "r7c3" : {name : "끈적한 복도4", exits : {up : "r6c3", down : "r8c3"}},
            "r7c5" : {name : "출입금지 표지판 앞",exits : {down : "r8c5"}},

            "r8c0" : {name : "실험실2", exits : {up : "r7c0", right : "r8c1"}},
            "r8c1" : {name : "영상방2", exits : {left : "r8c0"}, event : "madLab_video_04", seenFlag : "madLab_video_04"},
            "r8c3" : {name : "끈적한 복도3", exits : {up : "r7c3", right : "r8c4"}},
            "r8c4" : {name : "끈적한 복도2", exits : {left : "r8c3", right : "r8c5"}, chest : "madLab_chest"},
            "r8c5" : {name : "끈적한 복도", exits : {up : "r7c5", left : "r8c4"}}
        },

        encounters : [
            { type : "battle", enemies : ["scientist1", "scientist2"], weight : 30},
            { type : "battle", enemy : "scientist1", minCount : 1, maxCount : 3, weight : 10},
            { type : "battle", enemy : "scientist2", minCount : 1, maxCount : 2, weight : 10},
            { type : "battle", enemies : ["experimentAboFlower1", "experimentAboFlower2"], weight : 30 },
            { type : "battle", enemy : "experimentAboFlower1", minCount : 1, maxCount : 2, weight : 10},
            { type : "battle", enemy : "experimentAboFlower2", minCount : 1, maxCount : 2, weight : 10},
            { type : "event", id : "madLab_haveMercy", weight : 10 },
            { type : "event", id : "madLab_singASong", weight : 10 },
            { type : "event", id : "madLab_callingPale", weight : 5 },
            { type : "event", id : "madLab_hisFace", weight : 10 }
        ]
    },

    madLabRepeated : {
        id : "madLabRepeated",
        name : "광기 어린 연구소",
        startRoom : "r3c2",

        layout : [
            ["r0c0", "r0c1", "r0c2", "r0c3", "r0c4"],
            ["r1c0",     "", "r1c2",     "", "r1c4"],
            [    "",     "", "r2c2",     "", "r2c4"],
            [    "",     "", "r3c2",     "", "r3c4"],
            [    "", "r4c1",     "",     "", "r4c4"],
            ["r5c0", "r5c1", "r5c2", "r5c3", "r5c4"]
        ],

        rooms : {
            "r0c0" : {name : "", exits : {right : "r0c1", down : "r1c0"}},
            "r0c1" : {name : "", exits : {left : "r0c0", right : "r0c2"}},
            "r0c2" : {name : "", exits : {left : "r0c1", right : "r0c3", down : "r1c2"}},
            "r0c3" : {name : "", exits : {left : "r0c2", right : "r0c4"}},
            "r0c4" : {name : "", exits : {left : "r0c3", down : "r1c4"}},
            
            "r1c0" : {name : "", exits : {up : "r0c0"}, chest : "madLab_chest"},
            "r1c2" : {name : "", exits : {up : "r0c2", down : "r2c2"}},
            "r1c4" : {name : "", exits : {up : "r0c4", down : "r2c4"}, chest : "madLab_chest"},
            
            "r2c2" : {name : "", exits : {up : "r1c2", down : "r3c2"}},
            "r2c4" : {name : "", exits : {up : "r1c4", down : "r3c4"}},

            "r3c2" : {name : "", exits : {up : "r2c2"}},
            "r3c4" : {name : "", exits : {up : "r2c4", down : "r4c4"}},

            "r4c1" : {name : "", exits : {down : "r5c1"}, bossId: "teacherAndStudents", boss : ["experimentTeacher", "experimentAboFlower3", "experimentAboFlower3"]},
            "r4c4" : {name : "", exits : {up : "r3c4", down : "r5c4"}},

            "r5c0" : {name : "", exits : {right : "r5c1"},  chest : "madLab_chest"},
            "r5c1" : {name : "", exits : {up : "r4c1", left : "r5c0", right : "r5c2"}, safeZone: true, allowRest: true},
            "r5c2" : {name : "", exits : {left : "r5c1", right : "r5c3"}},
            "r5c3" : {name : "", exits : {left : "r5c2", right : "r5c4"}},
            "r5c4" : {name : "", exits : {up : "r4c4", left : "r5c3"}}
        },

        encounters : [
            { type : "battle", enemies : ["scientist1", "scientist2"], weight : 30},
            { type : "battle", enemy : "scientist1", minCount : 1, maxCount : 3, weight : 10},
            { type : "battle", enemy : "scientist2", minCount : 1, maxCount : 2, weight : 10},
            { type : "battle", enemies : ["experimentAboFlower1", "experimentAboFlower2"], weight : 30 },
            { type : "battle", enemy : "experimentAboFlower1", minCount : 1, maxCount : 2, weight : 10},
            { type : "battle", enemy : "experimentAboFlower2", minCount : 1, maxCount : 2, weight : 10},
            { type : "event", id : "madLabRepeated_haveMercy", weight : 5 },
            { type : "event", id : "madLabRepeated_singASong", weight : 5 },
            { type : "event", id : "madLabRepeated_callingPale", weight : 2 },
            { type : "event", id : "madLabRepeated_hisFace", weight : 5 }
        ]
    },

    abominationRedCave : {
        id : "abominationRedCave",
        name : "붉은살점동굴",
        startRoom : "",

    }
})

const survivalBandit_CHEST_POOL = [
    { id: "medium_potion", weight: 30 },
    { id: "high_potion", weight: 20 },
    { id: "nothing", weight: 15 },
    { id: "gold_500", weight: 25 },
    { id: "gold_1000", weight: 20 },
    { id: "gold_1500", weight: 5 },
    { id: "sapphire", weight: 1}
];

const abominationCave_CHEST_POOL = [
    { id: "medium_potion", weight: 30 },
    { id: "high_potion", weight: 20 },
    { id: "nothing", weight: 15 },
    { id: "gold_500", weight: 25 },
    { id: "gold_1000", weight: 20 },
    { id: "gold_1500", weight: 5 },
    { id: "ruby", weight: 1}
];

const madLab_CHEST_POOL = [
    { id: "medium_potion", weight: 25 },
    { id: "high_potion", weight: 25 },
    { id: "nothing", weight: 15 },
    { id: "gold_1000", weight: 20 },
    { id: "gold_1500", weight: 10 },
    { id: "pepper", weight: 5 },
    { id: "aquamarine", weight: 1}
];

Object.assign(DUNGEON_CHESTS, {
    survivalBandit_chest : {
        name : "낡은 상자",
        type : "random",
        pool : survivalBandit_CHEST_POOL
    },

    abominationCave_chest : {
        name : "끈적거리는 상자",
        type : "random",
        pool : abominationCave_CHEST_POOL
    },

    madLab_chest : {
        name : "하얀꽃과 흉물조각으로 점철된 상자",
        type : "random",
        pool : madLab_CHEST_POOL
    }
})

Object.assign(DUNGEON_EVENTS, {
    survivalBandit : {
        survivalBandit_corpses : [
            {
                type : "text",
                value : [
                    "앞으로 걸어가던 당신은 발에 무언가 걸려서 아래를 내려다보았다." +
                    "<br><br>당신의 발치에 걸린 것은 말라빠진 손목이었다. 변색이 되고 파리가 날아다니는 것을 보아 시체가 부패한 모양이다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 애도했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 시체의 앞에서 애도했다. 죽은 자가 당신의 말을 들을 수 있을지는 모르겠지만, 당신은 죽음 후에는 그가 안식을 찾길 바랐다." +
                                    " 당신은 짧은 묵념 후 다시 발걸음을 옮겼다. 정말로 죽은 자가 당신의 말을 듣고 안식을 취했는지, 아니면 당신이 멋대로 그가 안식을 취했다고 생각해버린 건지는 모르겠지만, 당신의 발걸음이 조금이나마 가벼워졌다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeStamina(player, 20);
                                    changeTrauma(player, -5);
                                    passTime(player, 3);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 시체에서 건질 것이 있나 보기 위해 시체를 뒤졌다.",
                        stat : "int",
                        difficulty : 20,
                        success : [
                            {
                                type : "text",
                                value : [
                                    "...당신은 시체에서 버섯 몇 개를 찾아냈다. 도적들이 탈탈 털었을 거라 생각했는데, 가지고 놀다가 몸도 안 뒤지고 버렸던 모양이다. 당신은 버섯들을 챙겼다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    addItem(player, ITEMS.misc.mushroom);
                                    addItem(player, ITEMS.misc.mushroom);
                                    addItem(player, ITEMS.misc.mushroom);
                                    changeTrauma(player, 5);
                                    savePlayer(player);
                                }
                            }
                        ],
                        fail : [
                            {
                                type : "text",
                                value : [
                                    "당신은 시체를 뒤졌지만, 찾은 건 부패한 시체의 살점뿐이었다. 역한 기분이 든다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 10);
                                    changeStamina(player, -20);
                                    savePlayer(player);
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        survivalBandit_trap : [
            {
                type : "text",
                value : [
                    "당신이 발걸음을 내딛으려는 순간, 뭔가가 이상했다. 당신은 아래를 내려다보았다."
                ]
            },
            {
                type : "check",
                stat : "dex",
                difficulty : 25,
                success : [
                    {
                        type : "text",
                        value : [
                            "가시트랩이다! 당신은 민첩하고 유연하게 가시트랩을 피했다."
                        ]
                    }
                ],
                fail : [
                    {
                        type : "text",
                        value : [
                            "당신은 위화감을 느꼈지만 눈으로 확인하기 전에 발이 먼저 바닥에 닿았다. 날카로운 통증이 당신의 발바닥에서부터 올라온다. 가시함정이다. 당신은 어떻게든 다리를 빼낸 후 절뚝거리며 앞으로 향했다."
                        ]
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            changeHP(player, -15);
                        }
                    }
                ]
            }
        ],
        survivalBandit_child : [
            {
                type : "text",
                value : [
                    "당신은 이런 곳에 아이가 있다는 것에 놀랐다. 하지만 그 아이는 희생자처럼 보이지는 않았다. 아이는 당신에게 대거를 들어보이더니 먹을 것을 주면 눈 감고 보내주겠다고 말했다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 아이에게 아이의 행동이 잘못된 이유에 대해 말해주었다.",
                        stat : "int",
                        difficulty : 22,
                        success : [
                            {
                                type : "text",
                                value : [
                                    "아이는 처음에는 당신의 말을 듣지 않았지만 당신의 말이 계속될 수록 점점 기세가 수그러들었다. 그는 고개를 숙이더니 그러면 자신같이 약한 사람은 어떻게 해야 하냐고 물었다." +
                                    "<br><br>\"...그 누구도 나를 살려주려고 하지는 않잖아.\"<br><br>" +
                                    "아이는 당신을 올려다보았다." +
                                    "<br><br>\"하지만 적어도 당신은 나를 살려주려고 하는 것 같으니까...\"<br><br>" +
                                    "아이는 대거를 놓치는 않았다. 하지만 어쩌면 당신은 아이를 도적떼의 길에서 벗어나게 했을지도 모른다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, -3);
                                    savePlayer(player);
                                }
                            }
                        ],
                        fail : [
                            {
                                type : "text",
                                value : [
                                    "아이는 당신의 말을 듣는 척하더니 그대로 당신에게 갑자기 달려들었다. 다행히 아이는 당신에게 대거를 휘두르지는 않았다." +
                                    "<br>아이가 훔친 건 고작 100원이었다. 하지만 그는 100원으로도 만족하는지 100원을 가지고 그대로 부리나케 도망가버렸다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeGold(player, -100);
                                    changeTrauma(player, 1);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 아이의 대거를 빼앗았다.",
                        stat : "dex",
                        difficulty : 22,
                        success : [
                            {
                                type : "text",
                                value : [
                                    "당신에게 대거를 빼앗긴 아이는 망연자실한 얼굴로 당신을 보다가 후다닥 달아나버렸다. 당신은 말없이 아이의 뒷모습을 바라보다가 대거를 챙겼다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    addItem(player, ITEMS.weapon.dagger);
                                    savePlayer(player);
                                }
                            }
                        ],
                        fail : [
                            {
                                type : "text",
                                value : [
                                    "당신은 아이의 대거를 빼앗으려고 헀지만 아이는 당신의 행동을 먼저 눈치를 채고 당신이 자신에게 접근했을 때 대거를 휘둘렀다." +
                                    "<br>당신에게 상처를 입힌 아이는 의기양양하게 당신을 올려다보다가 점점 커지는 붉은색 피에 동공이 흔들렸다. 그는 뒷걸음질치다가 그대로 도망가버렸다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeHP(player, -5);
                                    changeTrauma(player, 3);
                                    savePlayer(player);
                                }
                            }
                        ]

                    }
                ]
            }
        ],
        survivalBandit_bloodLine : [
            {
                type : "text",
                value : [
                    "아수라장을 지나자 핏자국이 바닥에 길게 늘어져 있었다. 누군가 피를 흘린 채로 질질 끌려간 것이다. 가끔씩 핏자국 옆에 손톱으로 긁은 자국들도 보이고는 했다. 당신은 핏자국을 따라 계속 길을 걸어갔다."
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
        survivalBandit_mess : [
            {
                type : "text",
                value : [
                    "복도에 들어서자마자 당신이 마주한 건 아수라장이었다. 핏자국은 여기저기에 튀어 있었고 구석에는 시체가 입고 있었던 것으로 보이는 옷들이 쌓여 있었다. 그들은 그들의 옷가지까지 벗겨내어 민간에 팔려고 했던 것이다." +
                    "<br>벽 구석에 낙서가 하나 보인다.<br><br>" +
                    "<strong>우리는 아직 죽지 않았다? 웃기시네. 우리가 아직 죽지 않은 거겠지. 우리는 내버려뒀지만 반란군들은 쥐잡듯이 뒤졌었다고. 저 말은 우리가 써야할 말이야.</strong>" +
                    "<br><br>그리고 그 밑에 낙서가 하나 더 써있었다.<br><br>" +
                    "<strong>우리는 아직 죽지 않았다!</strong>" +
                    "<br><br>...그들은 반란군을 조롱하고 있었다. 몇몇 낙서들은 방패막이가 되어줘서 고맙다는 추잡한 내용까지 담고 있었다."
                ]
            }
        ],
        survivalBandit_shelterMemo : [
            {
                type : "text",
                value : [
                    "쉘터의 아이가 남긴 것만 같은 쪽지다. 당신은 쪽지를 읽어내렸다." +
                    "<br><br>[유리 형. 형이 만약 이 편지를 보게 된다면.... 날 구하지 못했다고 해서 죄책감을 느끼지는 않았으면 좋겠어. 날 구하지 못했다면 형은 분명 다른 사람들을 구하고 있는 걸 테니까.]<br><br>" +
                    "[나는 지금까지 형과 형의 소꿉친구가 우리를 위해 얼마나 많은 일을 해왔는지 알아. 그래서 두 사람만은 나 때문에 괴롭지 않았으면 좋겠어.]<br><br>" +
                    "[요새 밥도 제대로 안 먹는 것 같던데. 형 친구는 살아있을 거야. 난 그렇게 믿어. 그러니까 그 친구가 돌아왔을 때 슬퍼하지 않도록 밥은 꼭 챙겨먹도록 해.]<br><br>" +
                    "[...하나만 고백해도 돼? 나 사실 형 소꿉친구 좋아했었다. 아름답고 강하잖아.]<br><br>" +
                    "[내가 아는 그 사람은 이 세상에서 제일 아름답고 강한 사람이니까, 유리 형도 믿어. 언젠가는 돌아올 거라고.]<br><br>" +
                    "[지금까지 고마웠어. 완전 마지막 추신! 밥은 꼭 챙겨먹어.]"
                ]
            }
        ],
        survivalBandit_corpsesOfThem : [
            {
                type : "text",
                value : [
                    "당신은 부둥켜안고 있는 시체를 보았다. 어른의 머리는 얼마나 세게 맞았는지 단순한 골절상도 아니고 머리가 아예 움푹 파여 있었다. 어른의 품에 안겨있는 시체는 아이의 시체였다." +
                    "<br>둘 중에 누가 먼저 죽었는지는 모르겠다. 당신이 알 수 있는 건 이들은 이미 인간이 넘지 말아야 할 선을 넘었다는 것이다."
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
        survivalBandit_prison : [
            {
                type : "text",
                value : [
                    "감옥에는 아직 살아있는 사람들이 있었다. 수용된 인원에 비해 공간이 너무 적어서 그들 중 몇몇은 앉아있지도 못하고 있었다. 다리가 썩은 자만이 누워서 앓는 소리를 내고 있었다." +
                    "<br><br>당신을 알아본 몇몇 이들이 창살 가까이로 다가왔다. 그들 중에는 쉘터에서 몇 번 본 아이들도 있었다." +
                    "<br><br>\"구해주러 온 거예요?\"<br><br>" +
                    "한 명이 창살 사이로 손을 뻗었다. 얼마나 말랐는지 그의 손은 좁은 창살 사이로도 삐죽 튀어나왔다. 그는 당신에게 요구르트를 쥐어주었다." +
                    "<br><br>\"얼마 안 되지만....\"<br><br>" +
                    "그가 내민 요구르트에는 온기가 남아있었다. 그는 도적떼들을 꼭 죽여달라고 말했다." +
                    "<br><br>\"믿고 있을게요, 하류도시의 영웅.\""
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    addItem(player, ITEMS.consumable.smallPotion);
                    changeTrauma(player, -2);
                    player.flags.survivalBandit_prison = true;
                    savePlayer(player);
                }
            }
        ],
        survivalBandit_banditMemo : [
            {
                type : "text",
                value : [
                    "도적들이 자는 방이다. 당신은 도적들이 휘갈겨쓴 쪽지를 읽었다." +
                    "<br><br>몇 놈은 대장이 남겨놓으라는데... 우리한테는 저급매춘부밖에 지급이 안 되네, 씨발.<br>" +
                    "그걸로 배는 채울 수 있으니 상관은 없지. 어차피 구멍은 다 똑같은 구멍이야. <br>" +
                    "구멍이 어떻게 다 똑같은 구멍이냐. 아오. 그나마 괜찮은 애 골라서 놀아야겠다.<br>" +
                    "근데 저번 그 말은 뭐냐. 인신매ㅁ" +
                    "<br><br>글자가 끊겨져 있다. 무슨 말을 하려던 걸까."
                ]
            }
        ]
    },
    survivalBanditRepeated : {
        survivalBanditRepeated_corpses : [
            {
                type : "text",
                value : [
                    "앞으로 걸어가던 당신은 발에 무언가 걸려서 아래를 내려다보았다." +
                    "<br><br>당신의 발치에 걸린 것은 말라빠진 손목이었다. 변색이 되고 파리가 날아다니는 것을 보아 시체가 부패한 모양이다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 애도했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 시체의 앞에서 애도했다. 죽은 자가 당신의 말을 들을 수 있을지는 모르겠지만, 당신은 죽음 후에는 그가 안식을 찾길 바랐다." +
                                    " 당신은 짧은 묵념 후 다시 발걸음을 옮겼다. 정말로 죽은 자가 당신의 말을 듣고 안식을 취했는지, 아니면 당신이 멋대로 그가 안식을 취했다고 생각해버린 건지는 모르겠지만, 당신의 발걸음이 조금이나마 가벼워졌다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeStamina(player, 20);
                                    changeTrauma(player, -5);
                                    passTime(player, 3);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 시체에서 건질 것이 있나 보기 위해 시체를 뒤졌다.",
                        stat : "int",
                        difficulty : 20,
                        success : [
                            {
                                type : "text",
                                value : [
                                    "...당신은 시체에서 버섯 몇 개를 찾아냈다. 도적들이 탈탈 털었을 거라 생각했는데, 가지고 놀다가 몸도 안 뒤지고 버렸던 모양이다. 당신은 버섯들을 챙겼다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    addItem(player, ITEMS.misc.mushroom);
                                    addItem(player, ITEMS.misc.mushroom);
                                    addItem(player, ITEMS.misc.mushroom);
                                    changeTrauma(player, 5);
                                    savePlayer(player);
                                }
                            }
                        ],
                        fail : [
                            {
                                type : "text",
                                value : [
                                    "당신은 시체를 뒤졌지만, 찾은 건 부패한 시체의 살점뿐이었다. 역한 기분이 든다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 10);
                                    changeStamina(player, -20);
                                    savePlayer(player);
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        survivalBanditRepeated_trap : [
            {
                type : "text",
                value : [
                    "당신이 발걸음을 내딛으려는 순간, 뭔가가 이상했다. 당신은 아래를 내려다보았다."
                ]
            },
            {
                type : "check",
                stat : "dex",
                difficulty : 25,
                success : [
                    {
                        type : "text",
                        value : [
                            "가시트랩이다! 당신은 민첩하고 유연하게 가시트랩을 피했다."
                        ]
                    }
                ],
                fail : [
                    {
                        type : "text",
                        value : [
                            "당신은 위화감을 느꼈지만 눈으로 확인하기 전에 발이 먼저 바닥에 닿았다. 날카로운 통증이 당신의 발바닥에서부터 올라온다. 가시함정이다. 당신은 어떻게든 다리를 빼낸 후 절뚝거리며 앞으로 향했다."
                        ]
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            changeHP(player, -15);
                        }
                    }
                ]
            }
        ],
        survivalBanditRepeated_child : [
            {
                type : "text",
                value : [
                    "당신은 이런 곳에 아이가 있다는 것에 놀랐다. 하지만 그 아이는 희생자처럼 보이지는 않았다. 아이는 당신에게 대거를 들어보이더니 먹을 것을 주면 눈 감고 보내주겠다고 말했다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 아이에게 아이의 행동이 잘못된 이유에 대해 말해주었다.",
                        stat : "int",
                        difficulty : 22,
                        success : [
                            {
                                type : "text",
                                value : [
                                    "아이는 처음에는 당신의 말을 듣지 않았지만 당신의 말이 계속될 수록 점점 기세가 수그러들었다. 그는 고개를 숙이더니 그러면 자신같이 약한 사람은 어떻게 해야 하냐고 물었다." +
                                    "<br><br>\"...그 누구도 나를 살려주려고 하지는 않잖아.\"<br><br>" +
                                    "아이는 당신을 올려다보았다." +
                                    "<br><br>\"하지만 적어도 당신은 나를 살려주려고 하는 것 같으니까...\"<br><br>" +
                                    "아이는 대거를 놓치는 않았다. 하지만 어쩌면 당신은 아이를 도적떼의 길에서 벗어나게 했을지도 모른다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, -3);
                                    savePlayer(player);
                                }
                            }
                        ],
                        fail : [
                            {
                                type : "text",
                                value : [
                                    "아이는 당신의 말을 듣는 척하더니 그대로 당신에게 갑자기 달려들었다. 다행히 아이는 당신에게 대거를 휘두르지는 않았다." +
                                    "<br>아이가 훔친 건 고작 100원이었다. 하지만 그는 100원으로도 만족하는지 100원을 가지고 그대로 부리나케 도망가버렸다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeGold(player, -100);
                                    changeTrauma(player, 1);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 아이의 대거를 빼앗았다.",
                        stat : "dex",
                        difficulty : 22,
                        success : [
                            {
                                type : "text",
                                value : [
                                    "당신에게 대거를 빼앗긴 아이는 망연자실한 얼굴로 당신을 보다가 후다닥 달아나버렸다. 당신은 말없이 아이의 뒷모습을 바라보다가 대거를 챙겼다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    addItem(player, ITEMS.weapon.dagger);
                                    savePlayer(player);
                                }
                            }
                        ],
                        fail : [
                            {
                                type : "text",
                                value : [
                                    "당신은 아이의 대거를 빼앗으려고 헀지만 아이는 당신의 행동을 먼저 눈치를 채고 당신이 자신에게 접근했을 때 대거를 휘둘렀다." +
                                    "<br>당신에게 상처를 입힌 아이는 의기양양하게 당신을 올려다보다가 점점 커지는 붉은색 피에 동공이 흔들렸다. 그는 뒷걸음질치다가 그대로 도망가버렸다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeHP(player, -5);
                                    changeTrauma(player, 3);
                                    savePlayer(player);
                                }
                            }
                        ]

                    }
                ]
            }
        ]
    },
    abominationCave : {
        abominationCave_abominatedFish : [
            {
                type : "text",
                value : [
                    "어두운 동굴 속, 당신은 붉은 웅덩이에서 펄떡펄떡 뛰고 있는 생선을 보았다. 흉물에 오염된 생선들이 대다수이지만 그중 몇 마리는 아직 오염되지 않은 것 같다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 괜찮아보이는 물고기 몇 마리를 낚아챘다.",
                        stat : "dex",
                        difficulty : 17,
                        success : [
                            {
                                type : "text",
                                value : [
                                    "아자쓰! 당신은 어떻게든 흉물에 오염되지 않은 물고기를 건져냈다. 허공에 따봉을 날리는 나루토가 안 되어서 다행이다!"
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    addItem(player, ITEMS.misc.bigFish);
                                    addItem(player, ITEMS.misc.mediumFish);
                                    addItem(player, ITEMS.misc.bigFish);
                                    addItem(player, ITEMS.misc.mediumFish);
                                    passTime(player, 4);
                                    savePlayer(player);
                                }
                            }
                        ],
                        fail : [
                            {
                                type : "text",
                                value : [
                                    "당신은 최대한 건져내려고 했지만.... 민첩하지 못한 하루였다. 허공에 따봉을 날리는 나루토가 되어주자."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeHP(player, -30);
                                    changeStamina(player, -10);
                                    passTime(player, 4);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "먹으면 당신까지 오염될 것 같다. 당신은 붉은 웅덩이를 지나쳤다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 모험은 하지 않기로 했다. 붉은 웅덩이에서 펄떡거리는 물고기라니, 건강도 안 좋아질 것 같고 무엇보다 비위가 상하지 않는가. 당신은 붉은 웅덩이를 그대로 지나쳤다."
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        abominationCave_redGem : [
            {
                type : "text",
                value : [
                    "당신은 붉은색으로 얼룩진 동굴벽 사이에서 반짝반짝 빛나는 붉은색 돌을 보았다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 붉은색 광석이 있는 틈을 힘으로 벌렸다.",
                        stat : "str",
                        difficulty : 25,
                        success : [
                            {
                                type : "text",
                                value : [
                                    "당신은 광석을 캐냈다! 루비다!"
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) =>{
                                    addItem(player, ITEMS.misc.ruby);
                                    changeStamina(player, 4);
                                    savePlayer(player);
                                }
                            }
                        ],
                        fail : [
                            {
                                type : "text",
                                value : [
                                    "당신은 몇 번이나 노력했지만 틈을 힘으로 벌릴 수 없었다. 어쩔 수 없이 당신은 다시 발걸음을 옮겼다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) =>{
                                    changeStamina(player, -15);
                                    passTime(player, 4);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 약한 지반을 무너뜨리며 광석을 캐내려고 했다.",
                        stat : "int",
                        difficulty : 25,
                        success : [
                            {
                                type : "text",
                                value : [
                                    "당신은 광석을 캐냈다! 루비다!"
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) =>{
                                    addItem(player, ITEMS.misc.ruby);
                                    changeStamina(player, 4);
                                    savePlayer(player);
                                }
                            }
                        ],
                        fail : [
                            {
                                type : "text",
                                value : [
                                    "당신은 몇 번이나 노력했지만 약한 지반을 찾을 수가 없었다. 당신은 어쩔 수 없이 발걸음을 옮겼다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) =>{
                                    changeStamina(player, -15);
                                    passTime(player, 4);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "그냥 지나치자.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 안 될 것 같은 것에 힘을 낭비하고 싶지는 않았다. 당신은 그대로 지나쳤다."
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        abominationCave_scream : [
            {
                type : "text",
                value : [
                    "길을 가고 있는 당신의 귀에 누군가의 비명소리가 들렸다. 본능적으로 당신은 비명소리가 들리는 쪽으로 시선을 돌렸다." +
                    "<br>사람 한 명이 기어서 나오고 있었다. 그는 당신과 시선이 마주치더니 입을 벌리며 당신에게 손을 뻗었다. \"살려줘\"라는 소리를 하려고 했던 것 같다. 하지만 그가 제대로 발음을 내기도 전에 뒤에서 뭔가가 그의 몸을 잡아당겼다." +
                    "<br>그는 제대로 저항 한 번 못하고 그대로 끌려가버렸다. 바닥에는 질질 끌려간 남자의 흔적만 남아있다. 피인지, 아니면 정액인 건지.... 바닥에는 정체 모를 축축한 애액만이 남아있다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeTrauma(player, 10);
                    savePlayer(player);
                }
            }
        ],
        abominationCave_eggs : [
            {
                type : "text",
                value : [
                    "와그작." +
                    "<br><br>당신은 밑을 바라보았다. 당신은 방금 흉물의 알을 발로 밟아 깨뜨렸다.... 끈적끈적한 액이 당신의 발과 바닥 사이에서 길게 늘어졌다. 당신은 발에서 애액을 털어내기 위해 시간을 들였다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeStamina(player, -10);
                    changeTrauma(player, 2);
                    savePlayer(player);
                }
            }
        ],
        abominationCave_groundMemo : [
            {
                type : "text",
                value : [
                    "누군가가 휘갈겨 쓴 메모가 흩어져있다." +
                    "<br><br>[하얀꽃들과 몇 백년 같이 있으면서 흉물은 서서히 진화하기 시작한 듯하다. 여전히 대다수의 흉물들은 하얀꽃에 끔찍한 고통을 느끼지만, 지금 보니 소수 몇몇의 흉물은 하얀꽃을 먹어치워 자신의 힘으로 삼기 시작했다. 대체 언제부터." +
                    "<br><br>[이게 자연적으로 발생할 수 있는 일인가? 아니 지금은 그게 중요하지 않아. 내 일에 집중하자.]" +
                    "<br><br>[발렌 님은 (??-글자가 어그러져 있어서 잘 보이지 않는다)을 이용할 수 있다면 이용하고 싶다고 말했다. 발렌 님은 그 마물을 죽일 생각도 염두에 두고 있다.]" +
                    "<br><br>[...다른 건 중요하지 않아.... 발렌 님께 이 사실을 알려야 한다.... 하얀꽃을 먹어치우는 흉물도 나오고 있어....]" +
                    "<br><br>[상류도시, 상류도시만큼은.... 발렌님....]"
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    player.flags.abomination_groundMemo = true;
                    savePlayer(player);
                }
            }
        ],
        abominationCave_cantEscape : [
            {
                type : "text",
                value : [
                    "당신은 도망치려고 하던 자의 흔적을 쫓아 구석까지 왔지만, 흔적은 막힌 구멍 앞에서 끊겨 있었다." +
                    "<br><br><span class='log-danger'>아니. 끊겨 있는 게 아니라 다시 뒤로 끌려간 흔적으로 보인다.</span>"
                ]
            }
        ],
        abominationCave_mixedSmell : [
            {
                type : "text",
                value : [
                    "하얀꽃의 달콤한 냄새와 흉물의 역겨운 냄새가 섞여 있다. 두 냄새가 섞이자 현기증이 나기 시작했다. 흐려지는 당신의 시야 사이로 순간 뭔가가 스쳐 지나갔다. 당신은 눈을 비비며 고개를 털었다." +
                    "<br><br>...하지만 또렷해진 시야로 주변을 둘러보아도 아무 것도 없었다. 분명 흉물은 아니었던 것 같다...."
                ]
            }
        ],
        abominationCave_whiteFlower : [
            {
                type : "text",
                value : [
                    "당신은 죽어있는 흉물에 하얀꽃잎들이 꽂혀있는 것을 보았다. 전투가 있었던 건지 흉물뿐만이 아니라 바닥에도 하얀꽃잎들이 꽂혀 있었다. 하지만 하얀꽃 마물의 시체는 어디에도 보이지 않았다." +
                    "<br>당신은 주변을 둘러보았다. 하얀꽃들 사이로 흉물이 하나 꿈틀꿉틀 기어나왔다. 그것은 떨어져 있는 하얀꽃들을 보더니 우적우적 먹기 시작했다. 다른 흉물과 다르게 그것의 피부는 하얀색이었다. 마치, 하얀꽃처럼." +
                    "<br>그것은 분명 당신을 발견했지만 당신을 공격하지는 않았다. 당신이 한 걸음 더 다가가자 새끼처럼 보이는 그것은 그대로 도망가버렸다." +
                    "<br><br>...당신의 등뒤로 식은땀이 흘렀다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeTrauma(player, 3);
                    player.flags.abominationCave_whiteFlower = true;
                    savePlayer(player);
                }
            }
        ],
        abominationCave_whiteFlower2 : [
            {
                type : "text",
                value : [
                    "누가 갉아먹은 것처럼 여기저기 뜯겨 있는 하얀꽃잎들. 이들은 모두 시들어있었다. 당신은 주변을 둘러보다가 조그만 구멍을 발견했다." +
                    "<br><br>...이 하얀꽃을 먹은 작은 생명체가 저 구멍으로 도망나갔을 수도 있겠다는 생각이 들었다." +
                    "<br><br>...당신의 등뒤로 식은땀이 흘렀다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeTrauma(player, 3);
                    player.flags.abominationCave_whiteFlower2 = true;
                    savePlayer(player);
                }
            }
        ],
        abominationCave_searcher : [
            {
                type : "text",
                value : [
                    "당신은 흉물이 아니라 인간의 흔적을 발견했다. 발자국이 이리저리 찍혀져 있지도 않고 끌려간 흔적도 없는 걸 보니, 자발적으로 이 동굴에 들어온 사람이 남긴 흔적인 듯하다."
                ]
            }
        ],
        abominationCave_surviver_01 : [
            {
                type : "text",
                value : [
                    "당신은 가다가 누군가가 바닥에 쓴 글자를 발견했다." +
                    "<br><br><strong>나는 아직 살아있어. 살려줘.</strong>" +
                    "<br><br>흔적은 붉은색 통로의 끝까지 이어지는 것 같다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    player.flags.abominationCave_surviver_01 = true;
                    savePlayer(player);
                }
            }
        ],
        abominationCave_surviver_02 : [
            {
                type : "text",
                value : [
                    "\"나, 난 돌아갈 거야, 내 가족에게...!\"<br><br>" +
                    "\"그렇게 흉측한 몰골로 어디를 돌아가겠다고.... 정말로 가족을 사랑한다면 돌아가지 말아야 하는 거 아닌가.\"<br><br>" +
                    "익숙한 목소리가 들린다. 당신의 예상대로 시온이 누군가에게 검을 겨누고 있었다. 시온은 이해가 안 간다는 듯 고개를 기울이며 정말로 그꼴로 돌아가서 사랑하는 사람마저 죽이고 싶냐고 물었다." +
                    "<br><br>\"나는 내가 사랑하는 사람에게 피해를 입힐 바에는 죽어버릴 텐데.\"<br><br>" +
                    "당신에게 말할 때의 톤보다 훨씬 낮고 냉정한 목소리, 인기척을 느낀 시온이 날카로운 표정으로 뒤를 돌아보았다. 뒤에 있는 사람이 당신이라는 걸 인지하자마자 시온의 표정은 부드럽게 풀렸다." +
                    "<br><br>\"영웅님.\"<br><br>" +
                    "시온의 앞에 있는 자는 경계병의 옷을 입고 있었다. 하지만 옷 사이로 드러나는 피부는 붉은 살점으로 울긋불긋 끓어오르고 있었다. 그는 상류도시에 도착하기만 하면 자신의 가족들이 자신을 고쳐줄 거라고 말했다. \"그들은 날 포기하지 않을 거야\"라고 그는 중얼거렸다." +
                    "<br><br>\"이 사람은 곧 흉물에게 먹힐 거예요.\"<br><br>" +
                    "당신이 그에게 다가가려고 하자 시온은 위험하다고 말하면서 당신의 앞을 막았다. 시온은 이 자를 죽일 생각이다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "딩신은 시온에게 검을 거두라고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "시온은 당신의 말에 망설이긴 했지만 거역하지는 않았다. 그는 대검을 내렸다. 흉물에게 잠식된 경계병은 당신에게 목숨을 살려줘서 고맙다고 말했다." +
                                    "<br><br>\"운이 좋은 건지 운이 나쁜 건지....\"<br><br>" +
                                    "시온은 멀어지는 남자를 뒤에서 바라보며 낮게 중얼거렸다. 그는 남자가 사라질 때까지 검을 거두고 있지 않다가, 남자의 그림자조차 보이지 않게 되었을 때야 대검을 내렸다. 시온은 당신을 보며 작게 한숨을 쉬었다." +
                                    "<br><br>\"영웅님은 너무 착해서 문제예요. 그래서 좋은 거긴 하지만.... 그래서 제가 더 지켜드려야 하고....\"<br><br>" +
                                    "시온은 싱긋 웃으며 당신에게 수혈팩을 내밀었다." +
                                    "<br><br>\"뒤는 제가 지켜드릴게요, 영웅님. 그러니 다치지 말아주세요.\""
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    addItem(player, ITEMS.consumable.fullPotion);
                                    player.flags.abominationCave_surviver_02 = true;
                                    player.flags.abominationCave_surviver_02_notKill = true;
                                    changeNPCEmotion("sion", "affection", -2);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 시온이 그를 죽이게 내버려두었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "시온은 가차없이 남자를 벴다. 그는 일부러 당신에게 등을 돌리며 혹시라도 당신에게 튈 피가 없게 막았다." +
                                    "<br><br>\"...약속은 지킬 거예요.\"<br><br>" +
                                    "그는 무슨 일이 있어도 당신을 지킬 거라고 말하며 주머니에서 수혈팩 하나를 꺼냈다. 수혈팩에 피가 묻어있자 그는 아무렇지도 않게 제 옷에 피를 닦은 후 당신에게 깨끗한 수혈팩을 내밀었다." +
                                    "<br><br>\"다치지 마세요, 영웅님. <br><br>뒤는 제가 지켜드릴 테니까요.\""
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    addItem(player, ITEMS.consumable.fullPotion);
                                    player.flags.abominationCave_surviver_02 = true;
                                    changeNPCEmotion("sion", "affection", 3);
                                    changeNPCEmotion("sion", "dominance", 3);
                                    savePlayer(player);
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    abominationCaveRepeated : {
        abominationCaveRepeated_abominatedFish : [
            {
                type : "text",
                value : [
                    "어두운 동굴 속, 당신은 붉은 웅덩이에서 펄떡펄떡 뛰고 있는 생선을 보았다. 흉물에 오염된 생선들이 대다수이지만 그중 몇 마리는 아직 오염되지 않은 것 같다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 괜찮아보이는 물고기 몇 마리를 낚아챘다.",
                        stat : "dex",
                        difficulty : 17,
                        success : [
                            {
                                type : "text",
                                value : [
                                    "아자쓰! 당신은 어떻게든 흉물에 오염되지 않은 물고기를 건져냈다. 허공에 따봉을 날리는 나루토가 안 되어서 다행이다!"
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    addItem(player, ITEMS.misc.bigFish);
                                    addItem(player, ITEMS.misc.mediumFish);
                                    addItem(player, ITEMS.misc.bigFish);
                                    addItem(player, ITEMS.misc.mediumFish);
                                    passTime(player, 4);
                                    savePlayer(player);
                                }
                            }
                        ],
                        fail : [
                            {
                                type : "text",
                                value : [
                                    "당신은 최대한 건져내려고 했지만.... 민첩하지 못한 하루였다. 허공에 따봉을 날리는 나루토가 되어주자."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeHP(player, -30);
                                    changeStamina(player, -10);
                                    passTime(player, 4);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "먹으면 당신까지 오염될 것 같다. 당신은 붉은 웅덩이를 지나쳤다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 모험은 하지 않기로 했다. 붉은 웅덩이에서 펄떡거리는 물고기라니, 건강도 안 좋아질 것 같고 무엇보다 비위가 상하지 않는가. 당신은 붉은 웅덩이를 그대로 지나쳤다."
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        abominationCaveRepeated_redGem : [
            {
                type : "text",
                value : [
                    "당신은 붉은색으로 얼룩진 동굴벽 사이에서 반짝반짝 빛나는 붉은색 돌을 보았다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 붉은색 광석이 있는 틈을 힘으로 벌렸다.",
                        stat : "str",
                        difficulty : 25,
                        success : [
                            {
                                type : "text",
                                value : [
                                    "당신은 광석을 캐냈다! 루비다!"
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) =>{
                                    addItem(player, ITEMS.misc.ruby);
                                    changeStamina(player, 4);
                                    savePlayer(player);
                                }
                            }
                        ],
                        fail : [
                            {
                                type : "text",
                                value : [
                                    "당신은 몇 번이나 노력했지만 틈을 힘으로 벌릴 수 없었다. 어쩔 수 없이 당신은 다시 발걸음을 옮겼다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) =>{
                                    changeStamina(player, -15);
                                    passTime(player, 4);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 약한 지반을 무너뜨리며 광석을 캐내려고 했다.",
                        stat : "int",
                        difficulty : 25,
                        success : [
                            {
                                type : "text",
                                value : [
                                    "당신은 광석을 캐냈다! 루비다!"
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) =>{
                                    addItem(player, ITEMS.misc.ruby);
                                    changeStamina(player, 4);
                                    savePlayer(player);
                                }
                            }
                        ],
                        fail : [
                            {
                                type : "text",
                                value : [
                                    "당신은 몇 번이나 노력했지만 약한 지반을 찾을 수가 없었다. 당신은 어쩔 수 없이 발걸음을 옮겼다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) =>{
                                    changeStamina(player, -15);
                                    passTime(player, 4);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "그냥 지나치자.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 안 될 것 같은 것에 힘을 낭비하고 싶지는 않았다. 당신은 그대로 지나쳤다."
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        abominationCaveRepeated_scream : [
            {
                type : "text",
                value : [
                    "길을 가고 있는 당신의 귀에 누군가의 비명소리가 들렸다. 본능적으로 당신은 비명소리가 들리는 쪽으로 시선을 돌렸다." +
                    "<br>사람 한 명이 기어서 나오고 있었다. 그는 당신과 시선이 마주치더니 입을 벌리며 당신에게 손을 뻗었다. \"살려줘\"라는 소리를 하려고 했던 것 같다. 하지만 그가 제대로 발음을 내기도 전에 뒤에서 뭔가가 그의 몸을 잡아당겼다." +
                    "<br>그는 제대로 저항 한 번 못하고 그대로 끌려가버렸다. 바닥에는 질질 끌려간 남자의 흔적만 남아있다. 피인지, 아니면 정액인 건지.... 바닥에는 정체 모를 축축한 애액만이 남아있다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeTrauma(player, 10);
                    savePlayer(player);
                }
            }
        ],
        abominationCaveRepeated_eggs : [
            {
                type : "text",
                value : [
                    "와그작." +
                    "<br><br>당신은 밑을 바라보았다. 당신은 방금 흉물의 알을 발로 밟아 깨뜨렸다.... 끈적끈적한 액이 당신의 발과 바닥 사이에서 길게 늘어졌다. 당신은 발에서 애액을 털어내기 위해 시간을 들였다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeStamina(player, -10);
                    changeTrauma(player, 2);
                    savePlayer(player);
                }
            }
        ]
    },

    madLab : {
        madLab_haveMercy : [
            {
                type : "text",
                value : [
                    "어디선가 앓는 소리가 났다. 꽃인간이 점점 부풀어오르는 자신의 팔을 잡고 식은땀을 흘리며 앓고 있었다. 그는 당신을 보더니 처음에는 자신이 환상이라도 보는 것이라 생각했는지 눈만 깜박였다. 하지만 이내, 그는 당신이 과학자도 실험체도 아닌 사람이라는 걸 알아차리고 당신에게 기어왔다." +
                    "<br><br>\"부탁이야... 죽여줘....\"<br><br>" +
                    "그는 당신에게 애원하듯이 말했다." +
                    "<br><br>\"이대로라면... 난... 그들처럼...\""
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 그를 죽여주었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 그에게 죽음을 선사해주었다. 그는 죽여달라고 말했으면서도 실제로 죽음이 가까워지자 두려워졌는지 몸을 떨긴 헀지만, 당신의 손길에 저항하지 않았다. 바르르 떨리던 몸에서 점점 생기가 사라진다." +
                                    "<br><br>\"고마....ㅇ...\"<br><br>" +
                                    "그가 의식을 잃는 것과 동시에 흉물의 살점이 끼르륵 소름끼치는 소리는 내며 그의 몸 전체에서 부풀어올랐다. 당신은 뒤로 물러났다." +
                                    "<br><br><span class='log-danger'>흉물은 이미 죽은 그의 시체마저 이용하고 있다</span>"
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 3);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 그를 죽이지 않았다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 아직 이성을 잃지 않은 그를 죽이지 않았다. 그는 괴로운 듯이 앓는 소리를 내더니 제발 자신 좀 죽여달라고 몸부림치기 시작했다. 하지만 당신은 그를 죽이지 않고 지나갔다." +
                                    "<br><br>당신이 몇 걸음 옮기기도 전에 뒤에서 펑 소리가 났다. 앓는 소리가 더 이상 들려오지 않는다. 당신은 뒤를 돌았다." +
                                    "<br><br><span class='log-danger'>당신의 뒤에는 아무도 없었다</span>"
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
        ],
        madLab_singASong : [
            {
                type : "text",
                value : [
                    "어디선가에서 방송이 흘러나온다.<br><br><br>" +
                    "<span class='log-warning'>안녕하세요? 좋은 아침이에요. 오늘도 다들 즐거운 하루 지내셨나요?<br><br>바깥 세상은 아직도 위험해요. 그래서 우리는 세상을 조금 더 포근하고 안전하게 만들 거예요. 우리 모두가 하류도시의 영웅이 되는 거죠.</span>" +
                    "<br><br><span class='log-warning'>자, 서로의 얼굴을 보세요. 아름답죠? 하얀 꽃은 아름다워요. 흉물도 사실 아름다워요. 우리를 지켜주잖아요.</span><br><br>" +
                    "<span class='log-warning'>우리가 이런 아름다운 존재로 계속 남을 수 있는 방법은 뭐라고 했죠? 스스로가 계속 존재해야 한다. 자, 숨을 내쉬어요. 창백은 없어요. 흉물도 없어요. 하얀 꽃과 흉물을 이용하는 건 당신이에요. 다른 누구도 아닌 당신이라고요.</span><br><br>" +
                    "<span class='log-warning'>삼켜질 것 같나요? 그러면 노래를 불러요. 다같이 노래를 불러요. 라~라랄~ 라라라랄~</span><br><br>" +
                    "<span class='log-warning'>힘들어질 때마다 이 세계가 얼마나 좋아질지 생각해봐요. 여러분들 덕분이에요. 여러분들이 스스로의 의지로 강해졌기 때문이에요.</span><br><br>" +
                    "<span class='log-danger'>한명이라도 성공하면 우리 모두는 실패하지 않은 거예요.</span><br><br>" +
                    "<span class='log-warning'>그러니 힘을 내요. 짜잔, 달콤한 사탕이 왔어요. 사탕~ 사탕~ 노래를 불러요.</span>" +
                    "<br><br>위에서 사탕들이 우수수 떨어졌다. 하지만 빈껍질들이 대다수였다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    addItem(player, ITEMS.consumable.normalCandyBar);
                    addItem(player, ITEMS.consumable.normalCandyBar);
                    addItem(player, ITEMS.consumable.normalCandyBar);
                    savePlayer(player);
                }
            }
        ],
        madLab_callingPale : [
            {
                type : "text",
                value : [
                    "지나가던 당신은 흉물에 오염된 하얀꽃 실험체가 머리를 벽에다 박는 것을 보았다. 그는 당신이 가까이 오든 말든 신경쓰지 않고 <span class='log-pale'>창백</span>을 중얼거리며 계속 벽에 머리를 박았다." +
                    "<br><br>\"내 머리에서 사라져... 사라져... 나는 스스로의 의지로 이 세상을 지킬 거야....\"<br><br>"
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 그를 죽여주었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "그는 저항 하나 없이 당신의 손에 죽었다. 우수수, 검붉게 물든 하얀 꽃잎들이 바닥에 잔뜩 쌓인다." +
                                    "<br><br>고맙다는 듯이, 달콤한 냄새가 당신의 주변을 맴돌다가 사라진다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 2);
                                    changeHP(player, 50);
                                    changeStamina(player, 50);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 그를 지나쳤다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 당신의 손에 더 이상 피를 묻히고 싶지 않았다, 그것이 자비라고 하더라도. 당신은 그를 지나쳐갔다. 그는 당신의 존재 자체도 인식하지 못했다, 끝까지."
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        madLab_hisFace : [
            {
                type : "text",
                value : [
                    "당신은 지나가다가 실험체 기록이 적힌 파일을 보았다." +
                    "<br><br>...당신이 구해냈지만 실종자 명단에 있었던 그 사람의 얼굴 아닌가?"
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeTrauma(player, 3);
                    savePlayer(player);
                }
            }
        ],

        madLab_video_01 : [
            {
                type : "text",
                value : [
                    "비디오가 가득 쌓여있는 방이다. 당신은 주변을 돌아보았다. 실험체A, 실험체B.... 실험체ZAWFQKFG...." +
                    "<br>당신은 그중에 깨져있는 비디오 하나를 발견했다. 고장나서 비디오의 내용은 볼 수 없었지만 제목은 읽을 수 있었다." +
                    "<br>[창백]<br>" +
                    "그 순간 뒤에서 노래 소리가 들렸다. 당신은 뒤를 돌아보았다." +
                    "<br><br>\"그 이름은 내 머리에서 없어져야 해...! 나는 내 스스로의 의지로... 도시를 지켜...!\"<br><br>" +
                    "흉물에 감염된 꽃감염체가 당신을 향해 달려든다."
                ]
            },
            {
                type : "effect",
                run: (player) => {
                    player.flags.madLab_video_01 = true;

                    const enemyId = "experimentAboFlower3";
                    const enemy = ENEMIES[enemyId]();
                    startBattle("experimentAboFlower3", player, {
                        onWin: () => startScene(buildDungeonScene(player), player),
                        onEscape: () => startScene(buildDungeonScene(player), player),
                        onLose: () => {runDefeatEvent(player, enemy);}
                    });
                    return true;
                }
            }
        ],
        madLab_video_02 : [
            {
                type : "text",
                value : [
                    "영상이 하나 멈춰있다. 당신은 그 영상을 재생했다. 옛날 영상이라서 그런지 요새 보는 비디오와는 화질이 달랐다." +
                    "<br><br>하지만 당신은 영상 속 사람을 바로 알아차렸다. 당신도 아는 사람이었다. 소라. 그리고... 유리관에 갇혀있는 창백. 창백은 눈을 깜박이더니 금방 제 눈 색깔을 금안으로 바꾸었다." +
                    "소라는 창백의 앞에 쪼그리고 앉아서 이런저런 이야기를 해주었다. 창백은 눈을 깜박이며 소라의 말을 조용히 들었다." +
                    "<br><br>\"사랑을, 많이, 받네?\"<br><br>" +
                    "익숙한 목소리다. 하지만 지금보다 더 거친 목소리. 소라는 눈을 빠르게 깜박이더니 미소를 지었다. 그는 조금 더 목소리를 부드럽게 하며 대답했다." +
                    "<br><br>\"나는 창백도 사랑을 많이 받을 수 있을 거라 생각해. 너는 사람 말도 잘 들어주고....\"<br><br>" +
                    "\"난 내 이름 싫어.\"<br><br>" +
                    "창백은 소라를 내려다보았다." +
                    "<br><br>\"네 이름이 더 예뻐. 사랑받기 좋은 이름. 창백과는 다르게.\"<br><br>" +
                    "\"아니야, 창백도 예...\"<br><br>" +
                    "뒤에서 누군가가 들어오는 소리가 나자 소라는 급하게 자리를 정돈했다. \"나 다음 번에 다시 올 테니까!\", 급하게 손을 흔들고 나가는 소라의 모습을 창백은 뚫어지게 응시했다. 하얀꽃들이 으스러지더니 백발이 되었다. 그리고 백발 아래의 금안은, 정확히 당신을 응시했다." +
                    "<br><br>...정확히 말하면 카메라겠지만."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    player.flags.madLab_video_02 = true;
                    savePlayer(player);
                }
            }
        ],
        madLab_video_03 : [
            {
                type : "text",
                value : [
                    "[연구 일지]<br><br>" +
                    "창백은 분명 특별했다. 그는 자신의 힘을 쓸 줄 알았고, 절대로 실험원들에게 제 능력의 한계를 보여주려고 하지 않았다." +
                    "<br><br>창백을 대체할 존재를 만드는 실험은 틀렸다. 에르윈은 실패작이다. 창백은 마음만 먹으면 손쉽게 자신의 능력을 다시 빼앗아갈 수 있을 것이다." +
                    "<br><br>그걸 보고드렸더니 그는 웃었다. 그는 그렇다면 왜 지금까지 제 능력을 회수하지 않는 걸까요, 라고 말했다. 무슨 말이지? 더 물어보고 싶었지만 물어볼 수가 없었다." +
                    "<br><br>그래서 우리는, 흉물을 이용하기로 했다. 흉물의 알에서 태어난 새끼들을 이용해서 하얀꽃에 면역인 놈이 나올 때까지 실험했다." +
                    "<br><br>몇 백 마리를 실험으로 죽인 건지 모르겠다. 하지만 점점 하얀 꽃에 면역이 되어버린 흉물들이 나오기 시작했다." +
                    "<br><br>그래. 하얀 꽃이 아니라 검붉은 꽃이라면 창백과 연결이 안 될지도 몰라. 스스로의 의지로, 상류도시를 지키는 마물들. 완벽하다." +
                    "<br><br>위에서 허가가 났다. 에르윈의 시체를 가져와야 한다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    player.flags.madLab_video_03 = true;
                    savePlayer(player);
                }
            }
        ],
        madLab_video_04 : [
            {
                type : "text",
                value : [
                    "비디오들은 전부 필름이 엉망이 되어 있었다. 당신은 그들 중 그나마 상태가 좋아보이는 비디오를 찾았다." +
                    "<br>당신은 영상을 틀었다.<br>" +
                    "<br><br>\"나, 널 꺼내줄 거야.\"<br><br>" +
                    "당신은 처음에 시험관에 있는 사람이 소라인 줄 알았다. 소라와 똑같은 모습을 하고 있는 창백은 금안을 깜박이다가 고개를 옆으로 기울였다.<br><br>" +
                    "\"정말? 소라의 아버지가 싫어할 텐데?\"<br><br>" +
                    "\"이건 옳지 않은 일이니까.\"<br><br>" +
                    "그는 너뿐만 아니라 모든 실험체들을 풀어줄 거라고 말했다." +
                    "<br><br>\"그 누구도 다른 사람에게 고통을 줄 권리는 없어.\"<br><br>" +
                    "창백의 미소가 짙어졌다. 그는 소라의 말을 따라서 중얼거렸다." +
                    "<br><br>\"소라가 소라의 아빠에게 고통을 줄 권리는 있고?\"<br><br>" +
                    "\"그건 달라. 난 아빠를 사랑하지만.... 사랑하기에 더더욱 참을 수가 없어.\"<br><br>" +
                    "\"소라는 사랑하기에... 더더욱 참을 수가 없어.\"<br><br>" +
                    "창백이 소라의 말을 중얼거렸다. 뒤에서 인기척이 들리자 소라는 입술에 검지를 올리더니 금방 다녀올 테니 기다려달라고 말했다. 창백은 그의 뒷모습을 보며 웃었다." +
                    "<br><br>\"기대된다, 소라...\""
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    player.flags.madLab_video_04 = true;
                    savePlayer(player);
                }
            }
        ],
        madLab_pain_01 : [
            {
                type : "text",
                value : [
                    "방안에 핏자국들이 낭자하다. 찢어진 서류 사이로 이름들이 보인다. 전부 인간이었던 자들의 이름이다. 우등생/열등생으로 나누어져 있는 명단들을 보던 당신은 고개를 돌렸다." +
                    "<br><br>지휘봉은 아파<br><br>" +
                    "<br><br>말을 안 들으면 우리는 일그러진 영웅의 방으로 가게 돼<br><br>" +
                    "휘갈겨쓴 낙서들. 그리고 그 낙서들의 밑에는 이 낙서를 쓴 사람은 누구냐는 문장이 써있었다. 당신은 고개를 들었다. 아주 작은 화면에서 영상이 계속해서 흘러나오고 있었다." +
                    "<br><br>...319시간.<br><br>" +
                    "당신은 시점을 이리저리 넘겨보았다. 마치 반복된 영상을 잘라붙인 것처럼 실험체들의 동작은 똑같았다. 그들은 입을 뻥긋뻥긋거리며 계속 똑같은 동작을 반복하고 있었다. 소리를 켜보려고 했지만 아쉽게도 소리는 나오지 않았다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    player.flags.madLab_pain_01 = true;
                    savePlayer(player);
                }
            }
        ],
        madLab_pain_02 : [
            {
                type : "text",
                value : [
                    "일그러진 영웅의 방. 당신은 문을 열고 일그러진 영웅의 방으로 들어갔다. 들어가자마자 밝은 사람의 얼굴이 영상에 나왔다. 그는 하얀꽃과 흉물이 귀엽게 그려진 티셔츠를 입고 있었다." +
                    "<br><br>\"안녕하세요? 좋은 아침이에요. 오늘도 다들 즐거운 하루 지내셨나요? 바깥 세상은 아직도 위험해요. 그래서 우리는 세상을 조금 더 포근하고 안전하게 만들 거예요. 우리 모두가 하류도시의 영웅이 되는 거죠.\"<br><br>" +
                    "그는 쉬지 않고 떠들어대기 시작했다." +
                    "<br><br>\"한명이라도 성공하면 우리 모두는 실패하지 않은 거예요. 그러니 힘을 내요. 짜잔, 달콤한 사탕이 왔어요. 사탕~ 사탕~ 노래를 불러요.\"<br><br>" +
                    "마지막 말을 마친 그는 거대한 막대 사탕 하나를 꺼내더니 깨물어 먹기 시작했다. 행복해요, 행복해요, 행복해요. 영상이 갑자기 일그러진다. 점차 타원형들로 겹쳐지더니 빙글빙글 돌기 시작한다." +
                    "<br><br>\"불량학생들. 당신들에게 즐거움을 주는 사탕은 없어요. 여기서 벗어나고 싶으면 어서\"<br><br>" +
                    "<div style='text-align:center;'><strong style='color:red; font-size:3rem'><br><br>노<br><br>래<br><br>해<br><br></strong></div>"
                ]
            },
            {
                type : "text",
                value : [
                    "당신은 돌아서 방을 나가려고 했지만 어느 쪽 문도 열리지 않았다. 당신은 어쩔 수 없이 그가 불렀던 노래를 불렀다. 목소리가 작아, 목소리가 즐겁지 않아, 별의별 이유로 당신을 통과시켜주지 않던 선생님은 당신이 제대로 부르고 나서야 합격이라는 말과 함께 팡파레를 울렸다." +
                    "<br><br>...문이 다시 열렸다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    player.flags.madLab_pain_02 = true;
                    changeTrauma(player, 10);
                    savePlayer(player);
                }
            }
        ],
        madLab_pain_03 : [
            {
                type : "text",
                value : [
                    "당신이 문을 열자 시체가 우두둑 소리와 함께 당신의 앞으로 떨어졌다. 그 소리에 가만히 시체들 사이에 앉아있었던 누군가가 당신을 돌아보았다." +
                    "<br><br>\"내 동생은 나빴어... 그래서 죽은 거야....\"<br><br>" +
                    "그는 사탕을 쪽쪽 빨고 있었다. 그는 누군가의 시체 옆에서 계속 사탕을 빨다가 웃는 얼굴로 벌떡 일어났다." +
                    "<br><br>\"그렇지만 나는 나쁘지 않아! 그러니 나는 즐거워! 너도 즐거워지자!\"<br><br>" +
                    "흉물에 감염된 꽃인간이 당신에게 달려든다!"
                ]
            },
            {
                type : "effect",
                run: (player) => {
                    player.flags.madLab_pain_03 = true;

                    const enemyId = "experimentAboFlower3";
                    const enemy = ENEMIES[enemyId]();
                    startBattle("experimentAboFlower3", player, {
                        onWin: () => startScene(buildDungeonScene(player), player),
                        onEscape: () => startScene(buildDungeonScene(player), player),
                        onLose: () => {runDefeatEvent(player, enemy);}
                    });
                    return true;
                }
            }
        ],
        madLab_joy_01 : [
            {
                type : "text",
                value : [
                    "당신은 연구복을 입고 있는 흉물들의 시체를 보았다." +
                    "<br><br>...시체가 맞긴 하겠지? 당신은 누군가가 간이로 만든 비석이 깨져있는 것을 보았다." +
                    "<br><br>끝까지 함께하지 못한 동지들을 애도하며,<br><br>다음에는 더 좋은 세상에서 태어나. 이 세상은 우리가 지킬게."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    player.flags.madLab_joy_01 = true;
                    changeTrauma(player, 2);
                    savePlayer(player);
                }
            }
        ],
        madLab_joy_02 : [
            {
                type : "text",
                value : [
                    "누군가 방에 크게 <span class='log-danger'>즐거움의 시간</span>이라고 써놓았다. 방에 들어서자 작은 TV 화면에 영상이 하나 멈춰 있었다." +
                    "<br>당신은 영상을 틀었다. 여러 화면들이 9개로 나뉘어져 나왔다." +
                    "<br><br>한쪽 화면에서는 몇몇 실험체들이 감옥을 깨고 있는 것이 보인다. 다른 한쪽 화면에서는 과학자들이 흉물과 하얀 꽃에 취해서 자신의 능력을 시험해보고 있었다, 동료들 시체 옆에서. 다른 화면에서는 어떤 한 사람이 지휘봉을 휘두르고 있었고 다른 흉물에 감염된 꽃인간들이 지휘봉에 맞춰서 똑같은 행동을 반복하고 있었다." +
                    "<br><br>감옥이 꺠졌다. 묶여있던 실험체들이 소리를 지르며, 혹은 울며 뛰쳐나가는 모습이 보인다. 연락을 받은 과학자들이 어딘가로 전화를 한다. 실험체들은 마구잡이로 과학자들을 죽였다. 과학자들은 실험체들과 맞서 싸우기 시작했다." +
                    "<br><br>선생님은 사탕을 물고 있는 실험체들과 함께 자리를 옮겼다. 지직, 지지직, CCTV 화면이 하나씩 꺼진다." +
                    "<br><br><br>...즐거움의 시간?"
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    player.flags.madLab_joy_02 = true;
                    savePlayer(player);
                }
            }
        ],
        madLab_who : [
            {
                type : "text",
                value : [
                    "당신은 텅 빈 벽을 보았다. 못이 박혀 있었던 흔적이 있는 걸 보아 사진이 하나 걸려있었던 걸지도 모르겠다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    player.flags.madLab_who = true;
                    savePlayer(player);
                }
            }
        ]
    },

    madLabRepeated : {
        madLabRepeated_haveMercy : [
            {
                type : "text",
                value : [
                    "어디선가 앓는 소리가 났다. 꽃인간이 점점 부풀어오르는 자신의 팔을 잡고 식은땀을 흘리며 앓고 있었다. 그는 당신을 보더니 처음에는 자신이 환상이라도 보는 것이라 생각했는지 눈만 깜박였다. 하지만 이내, 그는 당신이 과학자도 실험체도 아닌 사람이라는 걸 알아차리고 당신에게 기어왔다." +
                    "<br><br>\"부탁이야... 죽여줘....\"<br><br>" +
                    "그는 당신에게 애원하듯이 말했다." +
                    "<br><br>\"이대로라면... 난... 그들처럼...\""
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 그를 죽여주었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 그에게 죽음을 선사해주었다. 그는 죽여달라고 말했으면서도 실제로 죽음이 가까워지자 두려워졌는지 몸을 떨긴 헀지만, 당신의 손길에 저항하지 않았다. 바르르 떨리던 몸에서 점점 생기가 사라진다." +
                                    "<br><br>\"고마....ㅇ...\"<br><br>" +
                                    "그가 의식을 잃는 것과 동시에 흉물의 살점이 끼르륵 소름끼치는 소리는 내며 그의 몸 전체에서 부풀어올랐다. 당신은 뒤로 물러났다." +
                                    "<br><br><span class='log-danger'>흉물은 이미 죽은 그의 시체마저 이용하고 있다</span>"
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 3);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 그를 죽이지 않았다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 아직 이성을 잃지 않은 그를 죽이지 않았다. 그는 괴로운 듯이 앓는 소리를 내더니 제발 자신 좀 죽여달라고 몸부림치기 시작했다. 하지만 당신은 그를 죽이지 않고 지나갔다." +
                                    "<br><br>당신이 몇 걸음 옮기기도 전에 뒤에서 펑 소리가 났다. 앓는 소리가 더 이상 들려오지 않는다. 당신은 뒤를 돌았다." +
                                    "<br><br><span class='log-danger'>당신의 뒤에는 아무도 없었다</span>"
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
        ],
        madLabRepeated_singASong : [
            {
                type : "text",
                value : [
                    "어디선가에서 방송이 흘러나온다.<br><br><br>" +
                    "<span class='log-warning'>안녕하세요? 좋은 아침이에요. 오늘도 다들 즐거운 하루 지내셨나요?<br><br>바깥 세상은 아직도 위험해요. 그래서 우리는 세상을 조금 더 포근하고 안전하게 만들 거예요. 우리 모두가 하류도시의 영웅이 되는 거죠.</span>" +
                    "<br><br><span class='log-warning'>자, 서로의 얼굴을 보세요. 아름답죠? 하얀 꽃은 아름다워요. 흉물도 사실 아름다워요. 우리를 지켜주잖아요.</span><br><br>" +
                    "<span class='log-warning'>우리가 이런 아름다운 존재로 계속 남을 수 있는 방법은 뭐라고 했죠? 스스로가 계속 존재해야 한다. 자, 숨을 내쉬어요. 창백은 없어요. 흉물도 없어요. 하얀 꽃과 흉물을 이용하는 건 당신이에요. 다른 누구도 아닌 당신이라고요.</span><br><br>" +
                    "<span class='log-warning'>삼켜질 것 같나요? 그러면 노래를 불러요. 다같이 노래를 불러요. 라~라랄~ 라라라랄~</span><br><br>" +
                    "<span class='log-warning'>힘들어질 때마다 이 세계가 얼마나 좋아질지 생각해봐요. 여러분들 덕분이에요. 여러분들이 스스로의 의지로 강해졌기 때문이에요.</span><br><br>" +
                    "<span class='log-danger'>한명이라도 성공하면 우리 모두는 실패하지 않은 거예요.</span><br><br>" +
                    "<span class='log-warning'>그러니 힘을 내요. 짜잔, 달콤한 사탕이 왔어요. 사탕~ 사탕~ 노래를 불러요.</span>" +
                    "<br><br>위에서 사탕들이 우수수 떨어졌다. 하지만 빈껍질들이 대다수였다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    addItem(player, ITEMS.consumable.normalCandyBar);
                    addItem(player, ITEMS.consumable.normalCandyBar);
                    addItem(player, ITEMS.consumable.normalCandyBar);
                    savePlayer(player);
                }
            }
        ],
        madLabRepeated_callingPale : [
            {
                type : "text",
                value : [
                    "지나가던 당신은 흉물에 오염된 하얀꽃 실험체가 머리를 벽에다 박는 것을 보았다. 그는 당신이 가까이 오든 말든 신경쓰지 않고 <span class='log-pale'>창백</span>을 중얼거리며 계속 벽에 머리를 박았다." +
                    "<br><br>\"내 머리에서 사라져... 사라져... 나는 스스로의 의지로 이 세상을 지킬 거야....\"<br><br>"
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 그를 죽여주었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "그는 저항 하나 없이 당신의 손에 죽었다. 우수수, 검붉게 물든 하얀 꽃잎들이 바닥에 잔뜩 쌓인다." +
                                    "<br><br>고맙다는 듯이, 달콤한 냄새가 당신의 주변을 맴돌다가 사라진다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 2);
                                    changeHP(player, 50);
                                    changeStamina(player, 50);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 그를 지나쳤다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 당신의 손에 더 이상 피를 묻히고 싶지 않았다, 그것이 자비라고 하더라도. 당신은 그를 지나쳐갔다. 그는 당신의 존재 자체도 인식하지 못했다, 끝까지."
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        madLabRepeated_hisFace : [
            {
                type : "text",
                value : [
                    "당신은 지나가다가 실험체 기록이 적힌 파일을 보았다." +
                    "<br><br>...당신이 구해냈지만 실종자 명단에 있었던 그 사람의 얼굴 아닌가?"
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeTrauma(player, 3);
                    savePlayer(player);
                }
            }
        ] 
    }
})

//act3 던전 보스들 처리
//도적떼소굴
function handleAdvancedBanditBossWin(player){
    startScene([
        {
            type: "text",
            value:
                "\"...내가 죽는다고 해도... 너 혼자서 우리를 다 막을 수는 없을 거다...\"<br><br>" +
                "생존자들의 왕은 당신을 금방이라도 끊길 것 같은 목소리로 비웃었다. 그는 자신이 사라져도 결국에는 다른 사람이 이 자리를 채울 것이고, 당신이 지키고자 하는 세상은 찾아오지 않을 것이라고 말했다." +
                "<br><br>\"하수구의 거지들처럼 말이다...\"<br><br>" +
                "그는 당신을 마지막으로 올려다본 후 피를 쏟고 죽었다. 당신은 주변을 둘러보았다. 고요하다. 그의 책상 위에 있는 유리병 안의 하얀꽃잎들만 마치 살아있는 것처럼 하늘하늘 흔들리고 있을 뿐이다." +
                "<br><br><br>...어쨌든 당신은 몇몇 사람들의 인생을 구해냈다."
        },
        {
            type: "choice",
            choices: [
                { text: "숲으로 돌아간다", action: "leave_dungeon_after_boss" },
                { text: "조금 더 둘러본다", action: "continue_dungeon_after_boss" }
            ]
        }
    ], player);
}

//흉물소굴
window.startAbominationsBattle = function(player){
    let supportStarted = false;
    startBattle(["abomination1", "abomination3", "abomination4"] , player, {
        noEscape: true,

        allyTurnSupport : {
            name : "시온",
            hpRate : 0.5,
            damage : 50,
            logType : "sion",
            line : () => {
                if (!supportStarted){
                    supportStarted = true;
                    return "\"영웅님!\"<br><br>시온이 당신의 뒤를 막아준 후 적을 공격했다. <strong>50 데미지!</strong>";
                }

                const lines = [
                    "시온은 대검을 들고 높게 뛰어오르더니 그대로 적을 위에서부터 아래로 강타했다. 무거운 대검을 들고도 그는 재빨랐다. <strong>50 데미지!</strong>",
                    "시온은 일부러 당신의 앞을 가로막으며 흉물을 공격했다. 그는 당신이 다치는 걸 원하지 않는다. <strong>50 데미지!</strong>",
                    "시온의 숨소리가 거칠다. 하지만 그는 당신을 위해서 어떻게든 버텨내고 있다. 그는 대검을 가로로 베었다. <strong>50 데미지!</strong>",
                    "시온은 흉물을 공격한 후 바로 뒤로 빠졌다. 그는 당신을 곁눈질로 보며 중얼거렸다. <br><br>\"영웅님의 옆에서 싸울 수 있다니....\" <strong>50 데미지!</strong>"
                ];

                return getRandom(lines);
            }
        },

        onWin: () => {
            player.flags.abominationCave_abominations_defeated = true;
            savePlayer(player);

            handleDungeonBossWin(
                player,
                getCurrentDungeon(player),
                getCurrentDungeonRoom(player)
            );
        },
        onSkipDefeat : () => {
            startAbominationsLose(player);
        }
    });
};

function handleAbominationsWin(player){
    player.flags.act3_quest_02_boss_end = true;
    addQuestProgress(player);
    changeNPCEmotion("sion", "dominance", -5);
    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "마지막 흉물까지 쓰러뜨린 후 당신은 주변을 돌아보았다. 흉물을 쓰러뜨렸지만 이 소굴에 생존자는 없었다. 당신은 주변을 둘러보다가 이곳에는 하얀 꽃잎이 없다는 걸 알아차렸다." +
                "<br><br>\"영웅님.\"<br><br>" +
                "시온은 손수건으로 당신의 뺨부터 닦아주려다가 멈칫하더니 얼굴을 붉히며 고개를 숙였다." +
                "<br><br>\"영웅님 때문에, 내일의 사람들이 살게 된 거예요. 그러니 그런 표정 짓지 마세요.\"<br><br>" +
                "시온은 흉물의 알들을 부수다가 당신을 돌아보았다." +
                "<br><br>\"나머지는 제가 다 처리할게요. 영웅님은 걱정하지 마시고 이제 쉬세요.<br><br>...지쳐보이세요.\"<br><br>" +
                "...당신은 던전을 나왔다. 역겨운 냄새가 코끝에 남지 않은 바깥에서 당신은 깊게 심호흡을 했다. <br><br>주점으로 가서 보고하자."
        },
        {
            type : "effect",
            run : (player) => {
                leaveDungeon(player);
                return true;
            }
        }
    ], player);
}

function startAbominationsLose(player){
    player.flags.act3_quest_02_boss_end = true;
    addQuestProgress(player);
    changeHP(player, 10);
    changeNPCEmotion("sion", "dominance", 5);
    savePlayer(player);

    startScene([
        {
            type:"text",
            value:
                "당신이 쓰러지던 찰나, 시온의 손이 당신의 몸을 받쳤다. 그는 이를 악물고 당신과 자신에게 달려오는 흉물을 대검으로 막아섰다. 챙, 챙, 흉물의 공격을 쳐내는 검소리가 들린다." +
                "<br><br>\"...영웅님이라도...\"<br><br>" +
                "각오한 듯한 목소리, 시온이 다시 고개를 들었을 때 당신의 귀에 익숙한 총소리가 들렸다. 누구의 총소리인지는 바로 알 것만 같았다. 당신은 흐려지는 시야 속에서도 그의 모습을 찾으려고 노력했다. 하지만 당신의 눈은 그를 담지 못하고 그대로 어두컴컴해졌다."
        },
        {
            type : "text",
            value : 
                "당신이 다시 정신을 차렸을 때, 당신의 시온의 무릎 위에 누워있었다. 음정이 다 틀린 콧노래를 부르고 있던 시온이 당신을 내려다보았다." +
                "<br><br>\"정신이 드세요? 어디 불편한 곳은 없으시고요?\"<br><br>" +
                "당신은 시온의 무릎 위에서 일어났다. 걱정 어린 시선이 당신을 바라본다. 당신은 주변을 둘러보았지만 에릭은 없었다. 환청이었을까...? 시온은 일어나자마자 무리하지 말라고 말하며 자리에서 일어났다." +
                "<br><br>\"흉물은 죽었어요, 영웅님. 주점에 가서 보고하시면 될 것 같아요.\"<br><br>" +
                "시온은 자신은 단련을 더 해야 하니 먼저 마을에 돌아가있으라고 말했다. 그는 당신을 혼자 보내는 것이 조금 불안한 것처럼도 보였지만, 당신이 굳건하게 발걸음을 옮기자 입을 다물었다." +
                "<br><br>...왜 계속 따라오는 기분이 들까. 당신은 뒤를 돌았다. 시온은 없었다. 하지만 이상하게도 뒤에서 그의 시선이 자꾸만 느껴졌다. 착각이겠지?"
        },
        {
            type : "effect",
            run : (player) => {
                leaveDungeon(player);
                return true;
            }
        }
    ], player);
}

//광기 어린 연구소
window.startTeacherAndStudentsBattle = function(player){
    startBattle( ["experimentTeacher", "experimentAboFlower3", "experimentAboFlower3"] , player, {
        noEscape: true,
        onWin: () => {
            player.flags.madLab_teacherAndStudents_defeated = true;
            savePlayer(player);

            handleDungeonBossWin(
                player,
                getCurrentDungeon(player),
                getCurrentDungeonRoom(player)
            );
        },
        onSkipDefeat : () => {
            startAbominationsLose(player);
        }
    });
};

function handleTeacherAndStudentsWin(player){
    player.flags.act3_quest_04_boss_end = true;
    addQuestProgress(player);
    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "당신은 그들을 쓰러뜨린 후 소각 버튼과 연구소 자료를 찾았다. 연구소 자료를 보던 당신은 [마리]라는 이름을 보았다. ZZZXY, 실험 성공. 그 순간, 누군가 당신의 발목을 덥썩 잡았다." +
                "<br><br>\"우리들의 즐거움을 방해하지 마...\"<br><br>" +
                "그의 옷에는 [ZZZXY]라는 명찰이 걸려 있었다."
        },
        {
            type : "choice",
            choices : [
                {
                    text : "당신은 마리를 데리고 연구소 밖으로 나가려고 했다.",
                    scene : [
                        {
                            type : "text",
                            value : [
                                "당신은 마리를 데리고 나가려고 했다. 하지만 마리는 오히려 당신의 손을 잡으며 여기서 나랑 함께 즐거운 시간을 보내자고 말했다. 그는 선생님의 지휘봉과 사탕은 즐거운 것이라고 말했다." +
                                "<br>당신은 아버지에 대해 말했지만 마리는 알아듣지 못했다. 오히려 그는 \"아빠? 아빠?\"하다가 그걸로 노래를 부르기 시작했다. 아빠도 즐거워, 아빠랑도 함께 해, 라라랄랄라." +
                                "<br>당신은 소각 버튼을 누른 후 마리를 데리고 나가려고 했지만 마리는 밑으로 뿌리를 내린 후 고개를 저었다." +
                                "<br><br>\"나는 여기서 즐거워질 거야. 노래만 있으면 즐거워질 수 있다고 그랬어. 라랄라라~\"<br><br>" +
                                "곧 있으면 터질 것 같다. 당신은 몇 번을 더 힘써보았지만 바닥에 뿌리를 내린 마리와 함께 나오는 것은 무리였다. 당신은 어쩔 수 없이 혼자 자리를 떴다. 쓰러져있던 꽃인간들이 노래를 불렀다, 계속, 계속, 웃는 얼굴로." +
                                "<br><br>\"아빠아, 아빠아, 랄랄라라라랄, 아빠도 즐거워~\"" +
                                "<br><br>...이 연구소는 곧 노래와 함께 이 세상에서 사라질 것이다."
                            ]
                        },
                        {
                            type : "effect",
                            run : (player) => {
                                leaveDungeon(player);
                                return true;
                            }
                        }
                    ]
                },
                {
                    text : "마리는 이미 인격이 없다. 당신은 소각 버튼을 누른 후 혼자 나갔다.",
                    scene : [
                        {
                            type : "text",
                            value : [
                                "당신은 소각 버튼을 눌렀다. 경고음이 떴지만 몇몇 꽃인간들은 여전히 누워서 웃고 있었다. 라라라, 라랄라라라~ 그들은 노래를 불렀다. 마리도 마찬가지였다." +
                                "<br><br>...이 연구소는 곧 노래와 함께 이 세상에서 사라질 것이다."
                            ]
                        },
                        {
                            type : "effect",
                            run : (player) => {
                                leaveDungeon(player);
                                return true;
                            }
                        }
                    ]
                }
            ]
        }
    ], player);
}

function startTeacherAndStudentsLose(player){
    gameOver(
        player,
        "그들은 당신의 주변으로 몰려들었다. 라라, 라라라라, 괴기한 노래가 당신의 귓가에 울려퍼진다. 그들은 당신에게 당신도 우리처럼 하나가 되면 된다고 말했다." +
        "<br><br>\"우리는 다같이 즐거울 거야. 그렇죠, 선생님?\"<br><br>" +
        "당신의 양팔에 주사기가 한번에 주입된다. 하나는 하얀색 액체였고 하나는 검붉은 액체였다. 둘 다 걸쭉했다. 액체가 주입되자마자 당신의 심장이 빠르게 뛰었다. 당신의 머릿속에 비명이 울렸다." +
        "<br><br>\"ㅇ...ㄷ...! ㅇ..ㄷ....!\"<br><br>" +
        "...하류도시의 영웅은, 이 세상에 더 이상 존재하지 않는다." +
        "게임오버"
    );
}
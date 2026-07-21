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
            "r0c3" : {name : "픿자국을 따라 1", exits : {left : "r0c2", right : "r0c4"}},
            "r0c4" : {name : "아수라장", exits : {left : "r0c3", down : "r1c4"}},

            "r1c0" : {name : "쉬어가는 틈", exits : {up : "r0c0", down : "r2c0"}, safeZone: true, allowRest: true},
            "r1c2" : {name : "핏자국을 따라 3", exits : {up : "r0c2", down : "r2c2"}},
            "r1c4" : {name : "쉘터의 아이가 남긴 쪽지", exits : {up : "r0c4", down : "r2c4"}},

            "r2c0" : {name : "보석가루가 흩뿌려져 있는 방", exits : {up : "r1c0", right : "r2c1"}},
            "r2c1" : {name : "절망의 길", exits : {left : "r2c0", down : "r3c1", right : "r2c2"}},
            "r2c2" : {name : "저항의 길", exits : {left : "r2c1", up : "r1c2"}},
            "r2c4" : {name : "생존자들의 근거지 입구", exits : {up : "r1c4"}},

            "r3c1" : {name : "아이를 껴안고 있는 어른의 시체", exits : {up : "r2c1", down : "r4c1"}},

            "r4c0" : {name : "감방", exits : {right : "r4c1"}, chest : "survivalBandit_chest"},
            "r4c1" : {name : "감방 앞", exits : {left : "r4c0", up : "r3c1", right : "r4c2"}},
            "r4c2" : {name : "검문소", exits : {left : "r4c1", right : "r4c3"}},
            "r4c3" : {name : "도적들 침실", exits : {left : "r4c2"}}
        },

        encounters : [
            { type : "event", id : "survivalBandit_corpses", weight : 25 },
            { type : "event", id : "survivalBandit_trap", weight : 20 },
            { type : "event", id : "survivalBandit_child", weight : 8 },
            { type : "battle", id : "advancedBandit1", minCount : 1, maxCount : 3, weight : 30 },
            { type : "battle", id : "advancedBandit2", minCount : 1, maxCount : 2, weight : 25 },
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
            "r0c2" : {name : "", exits : {down : "r1c2", right : "r0c3"}},
            "r0c3" : {name : "", exits : {left : "r0c2", right : "r0c4"}},
            "r0c4" : {name : "", exits : {left : "r0c3", down : "r1c4"}},

            "r1c0" : {name : "쉬어가는 틈", exits : {up : "r0c0", down : "r2c0"}, safeZone: true, allowRest: true},
            "r1c2" : {name : "", exits : {up : "r0c2", down : "r2c2"}},
            "r1c4" : {name : "", exits : {up : "r0c4", down : "r2c4"}},

            "r2c0" : {name : "", exits : {up : "r1c0", right : "r2c1"}},
            "r2c1" : {name : "", exits : {left : "r2c0", down : "r3c1", right : "r2c2"}},
            "r2c2" : {name : "", exits : {left : "r2c1", up : "r1c2"}},
            "r2c4" : {name : "", exits : {up : "r1c4"}},

            "r3c1" : {name : "", exits : {up : "r2c1", down : "r4c1"}},

            "r4c0" : {name : "", exits : {right : "r4c1"}, chest : "survivalBandit_chest"},
            "r4c1" : {name : "", exits : {left : "r4c0", up : "r3c1", right : "r4c2"}},
            "r4c2" : {name : "", exits : {left : "r4c1", right : "r4c3"}},
            "r4c3" : {name : "", exits : {left : "r4c2"}, chest : "survivalBandit_chest"}
        },

        encounters : [
            { type : "event", id : "survivalBanditRepeated_corpses", weight : 25 },
            { type : "event", id : "survivalBanditRepeated_trap", weight : 20 },
            { type : "event", id : "survivalBanditRepeated_child", weight : 8 },
            { type : "battle", id : "advancedBandit1", minCount : 1, maxCount : 3, weight : 30 },
            { type : "battle", id : "advancedBandit2", minCount : 1, maxCount : 2, weight : 25 },
            { type : "battle", enemies : ["advancedBandit1", "advancedBandit2"], weight : 30},
            { type : "battle", enemies : ["advancedBandit1", "advancedBandit1", "advancedBandit2"], weight : 25},
        ]
    },

    abominationCave : {
        id : "abominationCave",
        name : "흉물소굴",
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
            "r0c2" : {name : "", exits : {right : "r0c3"}},
            "r0c3" : {name : "", exits : {left : "r0c2", right : "r0c4", down : "r1c3"}},
            "r0c4" : {name : "", exits : {left : "r0c3", right : "r0c5"}},
            "r0c5" : {name : "", exits : {left : "r0c4"}},

            "r1c0" : {name : "", exits : {right : "r1c1", down : "r2c0"}, safeZone: true, allowRest: true },
            "r1c1" : {name : "", exits : {left : "r1c0"}, bossId: "abominationMixedLarge", boss : ["abominationMixedHead", "abominationMixedArms", "abominationMixedArms", "abominationMixedMiddle"]},
            "r1c3" : {name : "", exits : {up : "r0c3", down : "r2c3"}},
            "r1c6" : {name : "", exits : {down : "r2c6"}},

            "r2c0" : {name : "", exits : {up : "r1c0", down : "r3c0"}},
            "r2c3" : {name : "", exits : {up : "r1c3", down : "r3c3"}},
            "r2c6" : {name : "", exits : {up : "r1c6", down : "r3c6"}},

            "r3c0" : {name : "", exits : {up : "r2c0", right : "r3c1"}},
            "r3c1" : {name : "", exits : {left : "r3c0", right : "r3c2", down : "r4c1"}},
            "r3c2" : {name : "", exits : {left : "r3c1", right : "r3c3"}},
            "r3c3" : {name : "", exits : {left : "r3c2", right : "r3c4", up : "r2c3"}},
            "r3c4" : {name : "", exits : {left : "r3c3", right : "r3c5"}},
            "r3c5" : {name : "", exits : {left : "r3c4", right : "r3c6"}},
            "r3c6" : {name : "", exits : {left : "r3c5", right : "r3c7", up : "r2c6"}},
            "r3c7" : {name : "", exits : {left : "r3c6", down : "r4c7"}},

            "r4c1" : {name : "", exits : {up : "r3c1", down : "r5c1"}},
            "r4c7" : {name : "", exits : {up : "r3c7", down : "r5c7"}},

            "r5c1" : {name : "", exits : {up : "r4c1", down : "r6c1"}},
            "r5c4" : {name : "", exits : {down : "r6c4"}},
            "r5c6" : {name : "", exits : {right : "r5c7"}},
            "r5c7" : {name : "", exits : {left : "r5c6", up : "r4c7", down : "r6c7"}},
            
            "r6c1" : {name : "", exits : {up: "r5c1", right : "r6c2"}},
            "r6c2" : {name : "", exits : {left : "r6c1", right : "r6c3"}},
            "r6c3" : {name : "", exits : {left : "r6c2", right : "r6c4"}},
            "r6c4" : {name : "", exits : {left : "r6c3", up : "r5c4"}},
            "r6c7" : {name : "", exits : {up : "r5c7"}}
        },

        encounters : [
            { type : "battle", enemy : "abomination1", minCount : 2, maxCount : 4, weight : 30},
            { type : "battle", enemies : ["abomination1", "abomination2"], weight : 35},
        ]

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

Object.assign(DUNGEON_CHESTS, {
    survivalBandit_chest : {
        name : "낡은 상자",
        type : "random",
        pool : survivalBandit_CHEST_POOL
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
    }
})

//act3 던전 보스들 처리
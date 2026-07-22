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
    }
})

//act3 던전 보스들 처리
function handleAdvancedBanditBossWin(player){
    startScene([
        {
            type: "text",
            value:
                "\"...내가 죽는다고 해도... 너 혼자서 우리를 다 막을 수는 없을 거다...\"<br><br>" +
                "생존자들의 왕은 당신을 금방이라도 끊길 것 같은 목소리로 비웃었다. 그는 자신이 사라져도 결국에는 다른 사람이 이 자리를 채울 것이고, 당신이 지키고자 하는 세상은 찾아오지 않을 것이라고 말했다." +
                "<br><br>\"하수구의 거지들처럼 말이다...\"<br><br>" +
                "그는 당신을 마지막으로 올려다본 후 피를 쏟고 죽었다." +
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
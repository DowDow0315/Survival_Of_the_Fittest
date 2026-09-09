Object.assign(DUNGEONS, {
    chocoChoco : {
        id : "chocoChoco",
        name : "초코초코하게 해줄게",
        startRoom : "r0c2",

        layout : [
            ["r0c0",     "", "r0c2",     "",     ""],
            ["r1c0",     "", "r1c2", "r1c3", "r1c4"],
            ["r2c0",     "",     "",     "", "r2c4"],
            ["r3c0",     "", "r3c2", "r3c3", "r3c4"],
            ["r4c0", "r4c1", "r4c2",     "",     ""]
        ],

        rooms : {
            "r0c0" : {name : "초코 도와줘요 거대초코!", exits : {down : "r1c0"}, bossId: "chocos", boss : ["chocoSlimeBig", "chocoSlime", "chocoSlime", "chocoSlime"], bossIntro:"chocos_intro"},
            "r0c2" : {name : "초코 하나!", exits : {down : "r1c2"}},
            
            "r1c0" : {name : "초코 잊지 않겠다", exits : {up : "r0c0", down : "r2c0"}},
            "r1c2" : {name : "초코 둘!", exits : {up : "r0c2", right : "r1c3"}},
            "r1c3" : {name : "초코 셋!", exits : {left : "r1c2", right : "r1c4"}},
            "r1c4" : {name : "초코 넷!", exits : {left : "r1c3", down : "r2c4"}},

            "r2c0" : {name : "초코 사랑을 위해 초코를 희생하다니", exits : {up : "r1c0", down : "r3c0"}},
            "r2c4" : {name : "초코 다섯!", exits : {up : "r1c4", down : "r3c4"}},

            "r3c0" : {name : "초코 이제 숫자 몰라", exits : {up : "r2c0", down : "r4c0"}},
            "r3c2" : {name : "초코 일곱!", exits : {right : "r3c3", down : "r4c2"}},
            "r3c3" : {name : "초코 몇이게?", exits : {left : "r3c2", right : "r3c4"}, event : "chocoChoco_luckySeven"},
            "r3c4" : {name : "초코 여섯!", exits : {up : "r2c4", left : "r3c3"}},

            "r4c0" : {name : "초코 열!", exits : {up : "r3c0", right : "r4c1"}},
            "r4c1" : {name : "초코 아홉!", exits : {left : "r4c0", right : "r4c2"}},
            "r4c2" : {name : "초코 여덟!", exits : {up : "r3c2", left : "r4c1"}}
        },
        
        encounters : [
            { type : "battle", enemy : "chocoSlime", minCount : 2, maxCount : 5, weight : 50},
            { type : "event", id : "chocoChoco_01", weight : 15 },
            { type : "event", id : "chocoChoco_02", weight : 15 },
            { type : "event", id : "chocoChoco_03", weight : 15 },
            { type : "event", id : "chocoChoco_04", weight : 5 }
        ]
    },
    mushroomKingdom : {
        id : "mushroomKingdom",
        name : "머쉬룸킹덤",
        startRoom : "r5c3",

        layout : [
            [    "",     "", "r0c2",     "",     ""],
            ["r1c0",     "", "r1c2",     "", "r1c4"],
            ["r2c0",     "", "r2c2",     "", "r2c4"],
            ["r3c0", "r3c1", "r3c2", "r3c3", "r3c4"],
            [    "",     "", "r4c2",     "",     ""],
            [    "",     "", "r5c2", "r5c3",     ""],
        ],

        rooms : {
            "r0c2" : {name : "그때까지 안녕!", exits : {down : "r1c2"}, event : "mushroomKingdom_finalRoom"},
            
            "r1c0" : {name : "귀요미", exits : {down : "r2c0"}, event : "mushroomKingdom_mathGame"},
            "r1c2" : {name : "머쉬룸킹덤은 언젠가 부흥한다!", exits : {up : "r0c2", down : "r2c2"}},
            "r1c4" : {name : "찌빠!", exits : {down : "r2c4"}, event : "mushroomKingdom_arrowGame"},

            "r2c0" : {name : "1+1은?", exits : {up : "r1c0", down : "r3c0"}},
            "r2c2" : {name : "당신을 쳐다보는 버섯들", exits : {up : "r1c2", down : "r3c2"}},
            "r2c4" : {name : "묵", exits : {up : "r1c4", down : "r3c4"}},

            "r3c0" : {name : "버섯은 연산 잘해!", exits : {up : "r2c0", right : "r3c1"}},
            "r3c1" : {name : "연산 잘해?", exits : {left : "r3c0", right : "r3c2"}},
            "r3c2" : {name : "아하 버섯이로구나", exits : {left : "r3c1", up : "r2c2", right : "r3c3", down : "r4c2"}},
            "r3c3" : {name : "반응 빨라?", exits : {left : "r3c2", right : "r3c4"}},
            "r3c4" : {name : "버섯은 반응 빨라!", exits : {left : "r3c3", up : "r2c4"}},
            
            "r4c2" : {name : "뭔가 물컹해", exits : {up : "r3c2", down : "r5c2"}},
            
            "r5c2" : {name : "머쉬룸킹덤 안내문", exits : {up : "r4c2", right : "r5c3"}, event : "mushroomKingdom_introduction"},
            "r5c3" : {name : "버섯버섯", exits : {left : "r5c2"}}
        },

        encounters : [
            { type : "battle", enemy : "mushroomManColor", minCount : 2, maxCount : 4, weight : 70},
            { type : "battle", enemies : ["mushroomMan", "mushroomManColor", "mushroomManAttack"], weight : 15 },
            { type : "event", id : "mushroomKingdom_selfy", weight : 15 }
        ]
    }
})

Object.assign(DUNGEON_EVENTS, {
    chocoChoco : {
        chocoChoco_luckySeven : [
            {
                type : "text",
                value : [
                    "당신은 초코들이 모여있는 것을 보았다. 초코, 초코, 초코, 초코, 초코, 초코, 초코, 그들은 초코초코거리며 몸을 위로 늘렸다가 아래로 줄였다를 반복하고 있었다. 당신을 본 초코들이 차례대로 비명을 질렀다." +
                    "<br><br>초코-!<br><br>초코-!<br><br>초코-!<br><br>초코옷-!<br><br>초코옷-!<br><br>초코옷-!<br><br>쪼꼬오오옷-!"+
                    "<br><br>7마리가 동시에 당신에게 달려든다...!"
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    const enemyId = ["chocoSlime", "chocoSlime", "chocoSlime", "chocoSlime", "chocoSlime", "chocoSlime", "chocoSlime"];
                    const defeatEnemy = ENEMIES["chocoSlime"]();
                    startBattle(enemyId, player, {
                        onWin: () => startScene(buildDungeonScene(player), player),    
                        onEscape: () => startScene(buildDungeonScene(player), player),
                        onLose: () => {runDefeatEvent(player, defeatEnemy);}
                    });
                    return true;
                }
            }
        ],
        chocoChoco_01 : [
            {
                type : "text",
                value : [
                    "초코가 당신의 앞에 나타났다. 그러더니 초코는 몸을 꿈틀거리며 모습을 바꾸었다.",
                    "<br>어라. 당신을 형상화한 초콜릿이다." +
                    "<br><br>초코! 초코초코! 초코초코초코!<br><br>" +
                    "아무래도 당신의 모습이 마음에 들은 모양이다. 나체인 게 좀 그렇긴 하지만.... 악감정은 없는 것 같다...."
                ]
            }
        ],
        chocoChoco_02 : [
            {
                type : "text",
                value : [
                    "초코 둘이 당신의 앞에 나타났다. 당신이 지금까지 봐왔던 초코들의 색과는 달랐다. 하나는 화이트 초코였고 하나는 스토리베리 초코였다." +
                    "<br><br>\"초코! 초코초코!\"<br><br>" +
                    "어느 초코가 더 맛있어 보이냐고 물어보는 것 같다..."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 화이트 초코의 손을 들어주었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "눈처럼 녹아드는 부드러운 하얀 기적, 당신의 마음을 순수하게 전달하세요!"
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeStamina(player, 40);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 스토리베리 초코의 손을 들어주었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신에게 닿은 가장 부드러운 고백, 핑크하게 고백하세요!"
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeHP(player, 40);
                                    savePlayer(player);
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        chocoChoco_03 : [
            {
                type : "text",
                value : [
                    "초코 셋이 무언가를 둘러싸고 있다. 자세히 보니 작은 초코 조각이었다." +
                    "<br><br>\"초코....\"<br><br>\"초코....\"<br><br>\"초코....\"<br><br>" +
                    "초코 한 마리가 조각을 자신의 몸에 붙였다." +
                    "<br><br>\"초코!\"<br><br>" +
                    "...장례식이 아니라 재활용이었던 모양이다. <br><br>" +
                    "그 순간, 초코 세 마리(?)의 시선이 당신의 가방으로 향했다. 아무래도 당신이 초코 조각을 가지고 있는지 궁금한 모양이다." +
                    "<br><br>\"...초코?\""
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 초코조각 하나를 돌려주었다.",
                        scene : [
                            {
                                type : "effect",
                                run : (player) => {
                                    if (!hasItemKey(player, "chocoSlime")){
                                        startScene([
                                            {
                                                type : "text",
                                                value : [
                                                    "초코 조각이 없다! 당신은 빈 주머니를 뒤적거렸다." +
                                                    "<br><br>\"...초코?\"<br><br>" +
                                                    "그들은 당신을 안쓰럽다는 듯이 바라보더니 그대로 가버렸다. 당신을 바보라고 생각하고 있는 모양이다."
                                                ]
                                            }
                                        ], player, {
                                            onEnd : () => startScene(buildDungeonScene(player), player)
                                        });
                                        return true;
                                    }
                                    removeItemByKey(player, "chocoSlime");
                                    changeTrauma(player, -5);
                                    savePlayer(player);

                                    startScene([
                                        {
                                            type : "text",
                                            value : [
                                                "초코로초코초코~ 초코들은 노래를 부르며 당신이 준 초코조각을 들어올렸다. 어쩐지 당신의 기분도 좋아졌다. 주머니는 가벼워졌지만."
                                            ]
                                        }
                                    ], player, {
                                        onEnd : () => startScene(buildDungeonScene(player), player)
                                    });
                                }
                            }
                        ]
                    },
                    {
                        text : "\"내 초코인데?\"",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"초.\"<br><br>\"코.\"<br><br>\"죽여.\""
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    const enemyId = ["chocoSlime", "chocoSlime", "chocoSlime"];
                                    const defeatEnemy = ENEMIES["chocoSlime"]();
                                    startBattle(enemyId, player, {
                                        onWin: () => startScene(buildDungeonScene(player), player),    
                                        onEscape: () => startScene(buildDungeonScene(player), player),
                                        onLose: () => {runDefeatEvent(player, defeatEnemy);}
                                    });
                                    return true;
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        chocoChoco_04 : [
            {
                type : "text",
                value : [
                    "당신은 황금 초코를 보았다. 황금 초코는 당신을 근엄한 표정으로 바라보더니 물었다." +
                    "<br><br>\"아름다운 건 무엇이라 생각하느냐.\""
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 \"나\"라고 대답했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"세상에서 제일 조심해야 할 것이 오만이지.\"<br><br>" +
                                    "황금 초코는 혀를 차며 멀어져 갔다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    player.flags.youSeeGoldenChoco = true;
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 황금 초코가 아름답다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"겉모습에만 마음을 뺏기다니... 아직 멀었구나.\"<br>" +
                                    "<br>황금 초코는 똥 모양으로 변하더니 이런데도 자신이 아름다워 보이냐고 물었다. 당신이 어떤 대답을 했든, 황금 초코는 고개를 절레절레 저으며 멀어져만 갔다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    player.flags.youSeeGoldenChoco = true;
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 아름다움은 정의할 수 없다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 대답에 황금 초코는 고개를 저었다." +
                                    "<br><br>\"이 세상 구석구석을 살펴보면 아름다움을 찾을 수 있는 것... 아직 멀었구나.\"<br><br>" +
                                    "그는 마지막까지 근엄한 목소리로 사라져 갔다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    player.flags.youSeeGoldenChoco = true;
                                    savePlayer(player);
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        mushroomKingdom : {
            mushroomKingdom_selfy : [
                {
                    type : "text",
                    value : [
                        "\"버섯...버섯... 머쉬룸킹덤은 부흥할 것이다... 너, 버섯 필요해버섯?\"<br><br>" +
                        "당신의 앞에 나타난 황금 버섯은 당신에게 우호적인 제스처를 취하며 다가왔다. 그는 원하는 버섯이 있다면 다른 버섯 세개에 하나를 바꿔주겠다고 말했다." +
                        "<br><br>하나에 세개를 교환해야 한다니! 하지만 이 버섯은 머쉬룸킹덤을 부활시켜야 한다며 당신에게 그 조건을 강요했다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "버섯을 교환한다",
                            scene : [
                                {
                                    type : "effect",
                                    run : (player) => {
                                        startMushroomExchange(player);
                                        return true;
                                    }
                                }
                            ]
                        },
                        {
                            text : "교환하지 않는다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"버섯.... 머쉬룸왕국을 부흥시켜야 하는데버섯....\"<br><br>" +
                                        "버섯은 축 늘어진 채 당신을 지나쳐갔다. 돌아다니면서 더 많은 버섯들을 모을 예정인가 보다."
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            mushroomKingdom_introduction : [
                {
                    type : "text",
                    value : [
                        "머쉬룸킹덤에 도착한 당신은 여기저기에 서 있는 버섯 동상들을 보았다. 전부 다르게 생겼다....<br><br>" +
                        "당신은 버섯이끼들로 가득한 안내문을 하나 발견했다." +
                        "<br><br>[버섯버섯]<br><br>" +
                        "[19일, 19일, 19일, 버섯들이 머쉬룸킹덤 부흥을 위해 게임을 하는 날이다!]" +
                        "<br><br>[잘만 하면 두 개의 버섯이 세 개의 버섯이 되어 버린다고?]" +
                        "<br><br>[부흥을 위한 게임은 머쉬룸킹덤에 아주! 아주! 아주버섯! 중요하다. 그러니 그날 머쉬룸킹덤에 들어온 자들은 모두 그 규칙을 따라버섯해야 한다!]"
                    ]
                }
            ],
            mushroomKingdom_mathGame : [
                {
                    type : "text",
                    value : [
                        "버서어어엇!! 어라, 어디선가 비명 소리가 들린 것 같은데. 당신의 앞에 세 버섯들이 섰다." +
                        "<br><br>\"버섯! 버섯버섯!\"<br><br>" +
                        "버섯들은 갑자기 숫자로 당신을 공격해왔다!"
                    ]
                },
                {
                    type : "effect",
                    run : (player) => {
                        if (player.dungeon?.mushroomMathDone){
                            startScene([
                                {
                                    type : "text",
                                    value : [
                                        "...숫자로 공격하는 줄 알았더니, 갑자기 버섯들이 멈췄다. 그들은 당신의 승리를 아직 기억하고 있다." +
                                        "<br><br>\"버섯버섯.\"<br><br>" +
                                        "다시 도전하려면 머쉬룸킹덤을 나갔다 와야 할 것 같다."
                                    ]
                                }
                            ], player, {
                                onEnd : () => startScene(buildDungeonScene(player), player)
                            });
                            return true;
                        }

                        player.dungeon.mushroomMathDone = true;
                        savePlayer(player);

                        startMathMinigame(player, {
                            timeLimit : 3500,
                            min : 1,
                            max : 99,
                            multiplyMin : 7,
                            multiplyMax : 24,
                            operators : ["+", "-", "*"],
                            
                            title : "버섯은 연산 잘해!",
                            hintText : "버섯보다 연산 못하면 쫓겨납니다.",
                            
                            onClear : (player) => {
                                startMushroomTreasure(player);
                            },

                            onGameOver : (player) => {
                                startMushroomGameFail(player);
                            }
                        });
                        return true;
                    }
                }
            ],
            
            mushroomKingdom_arrowGame : [
                {
                    type : "text",
                    value : [
                        "버서어어엇!! 어라, 어디선가 비명 소리가 들린 것 같은데. 당신의 앞에 세 버섯들이 섰다." +
                        "<br><br>\"버섯! 버섯버섯!\"<br><br>" +
                        "버섯들은 갑자기 당신에게 달려들었다. 당신의 반응속도를 보려고 하는 것 같다!"
                    ]
                },
                {
                    type : "effect",
                    run : (player) => {
                        if (player.dungeon?.mushroomArrowDone){
                            startScene([
                                {
                                    type : "text",
                                    value : [
                                        "...반응속도로 공격하는 줄 알았더니, 갑자기 버섯들이 멈췄다. 그들은 당신의 승리를 아직 기억하고 있다." +
                                        "<br><br>\"버섯버섯.\"<br><br>" +
                                        "다시 도전하려면 머쉬룸킹덤을 나갔다 와야 할 것 같다."
                                    ]
                                }
                            ], player, {
                                onEnd : () => startScene(buildDungeonScene(player), player)
                            });
                            return true;
                        }

                        player.dungeon.mushroomArrowDone = true;
                        savePlayer(player);

                        startArrowMinigame(player, {
                            mode : "sequence",
                            target : 9,
                            sequenceLength : 3,
                            timeLimit : 7000,
                            
                            title : "버섯은 반응 빨라!",
                            successText : "버섯!",
                            failText : "버ㅋㅋㅋ섯ㅋㅋㅋㅋㅋ",
                            
                            endOnFail : true,
                            skipFailScene : true,
                            
                            onClear : (player) => {
                                startMushroomTreasure(player);
                            },
                            
                            onGameOver : (player) => {
                                startMushroomGameFail(player);
                            },
                            
                            onTimeout : (player) => {
                                startMushroomGameFail(player);
                            }
                        });
                        return true;
                    }
                }
            ],
            mushroomKingdom_finalRoom : [
                {
                    type : "effect",
                    run : (player) => {
                        startMushroomFinalRoom(player);
                        return true;
                    }
                }
            ]
        }
    }
})

//초코초코초코
window.startChocosBattle = function(player){
    startBattle( ["chocoSlimeBig", "chocoSlime", "chocoSlime", "chocoSlime"] , player, {
        onWin: () => {
            handleDungeonBossWin(
                player,
                getCurrentDungeon(player),
                getCurrentDungeonRoom(player)
            );
        },
        onSkipDefeat : () => {
            startChocosLose(player);
        }
    });
};

function handleChocosWin(player){
    const gotRareFurniture = Math.random() < 0.01;

    startScene([
        {
            type : "text",
            value : [
                "\"초-코-!\"<br><br>" +
                "초코초코, 초코초코? 초코초코초코! 초코! 초코! 초코! 초코!" +
                (
                    gotRareFurniture
                    ? "<br><br>...잠깐. 당신은 초콜릿 욕조를 응시했다... 목욕, 할 수 있겠지?"
                    : ""
                )
            ]
        },
        {
            type : "effect",
            run : (player) => {
                if (gotRareFurniture){
                    giveFurniture(player, "chocoBath");
                }
                leaveDungeon(player);
            }
        }
    ], player);
}

function startChocosLose(player){
    startScene([
        {
            type : "text",
            value : [
                "이럴 수가. 당신은 초코를 이길 수 없었다. 역시 혈당스파이크는 그 무엇보다도 무서운 법이다. 당신은 그대로 쓰러졌다." +
                "<br><br>\"일어나세요, 용사여...!\"<br><br>" +
                "\"당신은 혈당스파이크에 지면 안 됩니다...!\"<br><br>" +
                "...눈을 떴을 때 당신은 길거리였다."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                changeHP(player, 1);
                leaveDungeon(player);
            }
        }
    ], player);
}

//머쉬룸~
const MUSHROOM_COLORS = [
    { key: "mushroomWhite",  name: "버섯(하양)" },
    { key: "mushroomBlue",   name: "버섯(파랑)" },
    { key: "mushroomRed",    name: "버섯(빨강)" },
    { key: "mushroomPink",   name: "버섯(핑크)" },
    { key: "mushroomOrange", name: "버섯(주황)" },
    { key: "mushroomGreen",  name: "버섯(초록)" },
    { key: "mushroomYellow", name: "버섯(노랑)" },
    { key: "mushroomPurple", name: "버섯(보라)" }
];

function startMushroomExchange(player){
    const available = MUSHROOM_COLORS.filter(mushroom =>
        countItemByKey(player, mushroom.key) >= 3
    );

    if (available.length === 0){
        startScene([
            {
                type: "text",
                value: [
                    "\"버섯...? 같은 버섯 세 개는 가져와야 한다버섯.\"<br><br>" +
                    "황금 버섯은 당신의 가방을 힐끔거리더니 고개를 저었다."
                ]
            }
        ], player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });
        return;
    }

    startScene([
        {
            type: "text",
            value: [
                "\"어떤 버섯을 내놓을 거야버섯? 같은 버섯 세 개씩 받는다버섯.\""
            ]
        },
        {
            type: "choice",
            choices: available.map(giveMushroom => ({
                text: `${giveMushroom.name} 3개를 건넨다.`,
                scene: [
                    {
                        type: "effect",
                        run: (player) => {
                            startMushroomReceiveChoice(player, giveMushroom);
                            return true;
                        }
                    }
                ]
            }))
        }
    ], player);
}

function startMushroomReceiveChoice(player, giveMushroom){
    const receiveOptions = MUSHROOM_COLORS.filter(
        mushroom => mushroom.key !== giveMushroom.key
    );

    startScene([
        {
            type: "text",
            value: [
                `"${giveMushroom.name} 세 개버섯! 어떤 버섯으로 바꿀 거야버섯?"`
            ]
        },
        {
            type: "choice",
            choices: receiveOptions.map(receiveMushroom => ({
                text: `${receiveMushroom.name} 1개를 받는다.`,
                scene: [
                    {
                        type: "effect",
                        run: (player) => {

                            // 혹시 선택 도중 인벤토리가 변했을 경우
                            if (countItemByKey(player, giveMushroom.key) < 3){
                                startScene([
                                    {
                                        type: "text",
                                        value: [
                                            "\"버섯...? 세 개가 안 된다버섯!\""
                                        ]
                                    }
                                ], player, {
                                    onEnd: () =>
                                        startScene(getLocationScene(player), player)
                                });

                                return true;
                            }

                            // 같은 색 버섯 3개 제거
                            const removed = removeItemByKey(
                                player,
                                giveMushroom.key,
                                3
                            );

                            if (removed !== 3){
                                return true;
                            }

                            // 원하는 색 버섯 1개 추가
                            const rewardItem = findItemByKey(receiveMushroom.key);

                            if (rewardItem){
                                addItem(player, rewardItem);
                            }

                            startScene([
                                {
                                    type: "text",
                                    value: [
                                        `당신은 ${giveMushroom.name} 세 개를 건넸다.<br><br>` +
                                        `황금 버섯은 만족스럽게 고개를 끄덕이더니 ${receiveMushroom.name} 하나를 내밀었다.` +
                                        "<br><br>\"좋은 거래였다버섯! 머쉬룸킹덤의 부흥에 보탬이 됐다버섯!\""
                                    ]
                                }
                            ], player, {
                                onEnd: () =>
                                    startScene(getLocationScene(player), player)
                            });
                        }
                    }
                ]
            }))
        }
    ], player);
}

function startMushroomTreasure(player){

    const rewards = [
        { type : "mushroom", count : 2 },
        { type : "mushroom", count : 1 },
        { type : "money", amount : 19 }
    ];

    // 상자 위치 랜덤 섞기
    for (let i = rewards.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [rewards[i], rewards[j]] = [rewards[j], rewards[i]];
    }

    startScene([
        {
            type : "text",
            value : [
                "당신이 게임을 통과하자 버섯들은 석연치 않은 표정을 지었지만, 어쨌든 당신이 게임에서 이겼으니 세 개의 보물상자를 질질 끌고 왔다." +
                "<br><br>\"버서서서서서섯.\"<br><br>" +
                "버섯은 셋 중에 하나를 고르라는 듯 고개를 까닥이더니 팔짱을 끼고 당신의 선택을 기다렸다."
            ]
        },
        {
            type : "choice",
            choices : rewards.map((reward, index) => ({
                text : `${index + 1}번 보물상자를 연다.`,
                scene : [
                    {
                        type : "effect",
                        run : (player) => {
                            giveMushroomTreasureReward(player, reward);
                            return true;
                        }
                    }
                ]
            }))
        }
    ], player);
}


function giveMushroomTreasureReward(player, reward){
    // 버섯 보상
    if (reward.type === "mushroom"){
        const received = [];
        for (let i = 0; i < reward.count; i++){
            // 각각 따로 랜덤 → 같은 색 중복 가능
            const mushroom =
                MUSHROOM_COLORS[
                    Math.floor(Math.random() * MUSHROOM_COLORS.length)
                ];
            const item = findItemByKey(mushroom.key);
            if (item){
                addItem(player, item);
                received.push(mushroom.name);
            }
        }

        startScene([
            {
                type : "text",
                value : [
                    "당신은 보물상자를 열었다.<br><br>" +
                    "짜잔버섯!<br><br>" +
                    `상자 안에는 <strong>${received.join(", ")}</strong>${received.length > 1 ? "이" : "가"} 들어있었다.`
                ]
            }
        ], player, {
            onEnd : () => startScene(buildDungeonScene(player), player)
        });

        return;
    }
    // 돈 보상
    if (reward.type === "money"){
        changeGold(player, 19);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신은 보물상자를 열었다.<br><br>" +
                    "두근두근....<br><br>" +
                    "상자 안에는 무려....<br><br>" +
                    "<strong>19원</strong>이 들어있었다." +
                    "<br><br>......" +
                    "<br><br>버섯들은 뿌듯한 얼굴로 당신을 바라보고 있다."
                ]
            }
        ], player, {
            onEnd : () => startScene(buildDungeonScene(player), player)
        });
        return;
    }
}

function startMushroomGameFail(player){

    startScene([
        {
            type : "text",
            value : [
                "\"실패버섯!\"<br><br>" +
                "버섯들은 신나서 갑자기 차원문을 열었다. 어, 어라, 차원문? 도르마무도르마무도르마무??" +
                "<br><br>당신은 비명소리의 근원지를 찾았다. 이거다. 이 놀이기구다. 그리고 버섯들이 내려가면서 머쉬룸킹덤의 에너지를 생산하고 있었다." +
                "<br><br>버섯들이 당신을 그대로 밀었다. 엄청난 속도다!!!!!!!!!!!!!" +
                "<br><br>.....<br><br>" +
                "...정신을 차렸을 때 당신은 머쉬룸킹덤 밖으로 내동댕이쳐져 있었다."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                changeStamina(player, -90);
                savePlayer(player);
                leaveDungeon(player);
            }
        }
    ], player);
}

function startMushroomFinalRoom(player){
    const date = getCalendarDate(player);
    if (date.month === 9 && date.day === 19){
        startMushroomRomanceRoom(player);
        return;
    }
    startRainbowMushroomShop(player);
}

const MUSHROOM_FURNITURE_EXCHANGES = [
    {
        mushroomKey : "mushroomWhite",
        mushroomName : "버섯(하양)",
        furnitureId : "mushroomWhiteMiniature",
        furnitureName : "하얀버섯맨 미니어처"
    },
    {
        mushroomKey : "mushroomBlue",
        mushroomName : "버섯(파랑)",
        furnitureId : "mushroomBlueMiniature",
        furnitureName : "파란버섯맨 미니어처"
    },
    {
        mushroomKey : "mushroomRed",
        mushroomName : "버섯(빨강)",
        furnitureId : "mushroomRedMiniature",
        furnitureName : "빨간버섯맨 미니어처"
    },
    {
        mushroomKey : "mushroomPink",
        mushroomName : "버섯(핑크)",
        furnitureId : "mushroomPinkMiniature",
        furnitureName : "핑크버섯맨 미니어처"
    },
    {
        mushroomKey : "mushroomOrange",
        mushroomName : "버섯(주황)",
        furnitureId : "mushroomOrangeMiniature",
        furnitureName : "주황버섯맨 미니어처"
    },
    {
        mushroomKey : "mushroomGreen",
        mushroomName : "버섯(초록)",
        furnitureId : "mushroomGreenMiniature",
        furnitureName : "초록버섯맨 미니어처"
    },
    {
        mushroomKey : "mushroomYellow",
        mushroomName : "버섯(노랑)",
        furnitureId : "mushroomYellowMiniature",
        furnitureName : "노란버섯맨 미니어처"
    },
    {
        mushroomKey : "mushroomPurple",
        mushroomName : "버섯(보라)",
        furnitureId : "mushroomPurpleMiniature",
        furnitureName : "보라버섯맨 미니어처"
    }
];

function canMakeRainbowMushroom(player){
    return MUSHROOM_COLORS.every(mushroom =>
        countItemByKey(player, mushroom.key) >= 3
    );
}

function makeRainbowMushroom(player){
    if (!canMakeRainbowMushroom(player)){
        startScene([
            {
                type : "text",
                value : [
                    "\"버섯버섯. 아직 색이 부족하다버섯.\"<br><br>" +
                    "무지개버섯은 모든 색깔의 버섯을 세 개씩 가져오라는 듯 팔을 활짝 벌렸다."
                ]
            }
        ], player, {
            onEnd : () => startScene(buildDungeonScene(player), player)
        });
        return;
    }

    MUSHROOM_COLORS.forEach(mushroom => {
        removeItemByKey(player, mushroom.key, 3);
    });
    const rainbow = findItemByKey("mushroomRainbow");
    if (rainbow){
        addItem(player, rainbow);
    }
    startScene([
        {
            type : "text",
            value : [
                "무지개버섯은 당신이 가져온 형형색색의 버섯들을 한곳에 모았다." +
                "<br><br>\"버섯버섯버섯버섯버섯버섯버섯버섯!\"" +
                "<br><br>번쩍!" +
                "<br><br>당신은 <strong>무지개버섯</strong> 하나를 받았다."
            ]
        }
    ], player, {
        onEnd : () => startScene(buildDungeonScene(player), player)
    });
}

function exchangeMushroomFurniture(player, exchange){
    if (countItemByKey(player, exchange.mushroomKey) < 9){
        startScene([
            {
                type : "text",
                value : [
                    `"${exchange.mushroomName} 아홉 개버섯! 아홉 개가 필요하다버섯!"<br><br>` +
                    "무지개버섯은 손가락을 아홉 개... 아니, 아무튼 어떻게든 일곱 개를 표현했다."
                ]
            }
        ], player, {
            onEnd : () => startRainbowMushroomShop(player)
        });
        return;
    }

    removeItemByKey(player, exchange.mushroomKey, 9);
    giveFurniture(player, exchange.furnitureId);

    startScene([
        {
            type : "text",
            value : [
                `${exchange.mushroomName} 아홉 개가 무지개버섯의 손으로 넘어갔다.` +
                "<br><br>\"완성버섯!\"" +
                `<br><br>당신은 <strong>${exchange.furnitureName}</strong>를 받았다.`
            ]
        }
    ], player, {
        onEnd : () => startScene(buildDungeonScene(player), player)
    });
}

function startRainbowMushroomShop(player){

    const choices = MUSHROOM_FURNITURE_EXCHANGES.map(exchange => ({
        text :
            `${exchange.furnitureName} ` +
            `(${exchange.mushroomName} 9개)`,
        scene : [
            {
                type : "effect",
                run : (player) => {
                    exchangeMushroomFurniture(player, exchange);
                    return true;
                }
            }
        ]
    }));

    choices.push({
        text : "무지개버섯을 만든다. (모든 색깔 버섯 3개씩)",
        scene : [
            {
                type : "effect",
                run : (player) => {
                    makeRainbowMushroom(player);
                    return true;
                }
            }
        ]
    });

    // 최종 수집 보상
    choices.push({
        text : "머쉬룸킹덤을 부활시키고 싶다고 말한다.(무지개버섯 19개)",
        scene : [
            {
                type : "effect",
                run : (player) => {
                    exchangeMushroomKingdomFurniture(player);
                    return true;
                }
            }
        ]
    });

    choices.push({
        text : "아무것도 교환하지 않는다.",
        scene : [
            {
                type : "text",
                value : [
                    "\"버섯? 버섯버섯!\"<br><br>" +
                    "무지개버섯은 알겠다는 듯 고개를 끄덕였다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    startScene(buildDungeonScene(player), player);
                }
            }
        ]
    });

    choices.push({
        text : "던전 밖으로 나간다.",
        scene : [
            {
                type : "text",
                value : [
                    "\"가는버섯?\"" +
                    "<br><br>무지개버섯은 당신에게 작게 손을 흔들었다." +
                    "<br><br>\"다음에 또 와버섯. 머쉬룸킹덤은 언제나 부흥하고 있다버섯!\"" +
                    "<br><br>무지개버섯의 뒤로 출구가 열렸다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    leaveDungeon(player);
                }
            }
        ]
    });

    startScene([
        {
            type : "text",
            value : [
                "방 한가운데에는 유난히 알록달록한 버섯 하나가 앉아 있었다." +
                "<br><br>빨강, 주황, 노랑, 초록, 파랑, 보라... 온갖 색이 뒤섞인 갓이 번쩍거린다." +
                "<br><br>\"무지개버섯이다버섯!\"" +
                "<br><br>...자기소개인 모양이다." +
                "<br><br>무지개버섯은 당신이 모아온 버섯들을 살펴보더니 작은 버섯 모형들을 늘어놓았다." +
                "<br><br>\"일곱 버섯! 같은 색 일곱 버섯 가져오면 바꿔준다버섯!\""
            ]
        },
        {
            type : "choice",
            choices : choices
        }
    ], player);
}

function exchangeMushroomKingdomFurniture(player){

    const rainbowKey = "mushroomRainbow";
    const furnitureId = "mushroomKingdomMiniature";

    // 이미 가지고 있음
    if (player.furnitureInventory?.includes(furnitureId)){
        startScene([
            {
                type : "text",
                value : [
                    "\"버섯킹덤은 하나면 충분하다버섯!\"<br><br>" +
                    "무지개버섯은 당신이 이미 가지고 있는 버섯킹덤 미니어처를 가리켰다."
                ]
            }
        ], player, {
            onEnd : () => startRainbowMushroomShop(player)
        });

        return;
    }

    // 무지개버섯 부족
    if (countItemByKey(player, rainbowKey) < 19){
        const current = countItemByKey(player, rainbowKey);
        startScene([
            {
                type : "text",
                value : [
                    "\"열아홉 버섯! 무지개버섯 열아홉 개가 필요하다버섯!\"<br><br>" +
                    `당신이 가지고 있는 무지개버섯은 ${current}개다.` +
                    "<br><br>...머쉬룸킹덤의 부흥은 멀고도 험하다."
                ]
            }
        ], player, {
            onEnd : () => startRainbowMushroomShop(player)
        });

        return;
    }

    const removed = removeItemByKey(
        player,
        rainbowKey,
        19
    );

    if (removed !== 19){
        return;
    }
    // 최종 가구 지급
    giveFurniture(
        player,
        furnitureId
    );

    startScene([
        {
            type : "text",
            value : [
                "당신은 무지개버섯 열아홉 개를 무지개버섯에게 건넸다." +
                "<br><br>무지개버섯은 그것들을 하나씩 늘어놓기 시작했다." +
                "<br><br>하나, 둘, 셋.... 열아홉." +
                "<br><br>\"버섯버섯버섯버섯버섯버섯버섯버섯버섯버섯버섯버섯버섯버섯버섯버섯버섯버섯버섯!!!!\"" +
                "<br><br>눈부신 빛이 방 안을 가득 채웠다." +
                "<br><br>빛이 사라진 자리에는 조그마한 왕국 하나가 놓여 있었다." +
                "<br><br><strong>머쉬룸킹덤 미니어처</strong>를 얻었다!" +
                "<br><br>...머쉬룸킹덤은 결국 당신의 집에서 부흥하게 되었다."
            ]
        }
    ], player, {
        onEnd : () => startScene(buildDungeonScene(player), player)
    });
}

function startMushroomRomanceRoom(player){
    const romanceNpcs = getRomanceNpcs(player);
    if (romanceNpcs.length === 0){
        startMushroomRomanceRoomSolo(player);
        return;
    }
    const npc =
        romanceNpcs[
            Math.floor(Math.random() * romanceNpcs.length)
        ];
    const handler =
        window.MUSHROOM_ROMANCE_HANDLERS?.[npc.id];
    if (!handler){
        console.warn(
            "머쉬룸킹덤 로맨스 핸들러 없음:",
            npc.id
        );
        leaveDungeon(player)
        return;
    }

    startScene([
        {
            type : "text",
            value : [
                "당신이 방 안으로 들어서자 뒤에서 문이 쾅 닫혔다." +
                "<br><br>[둘이서 이 버섯 다 먹기 전까지는 못 나간다버섯]...이라는 안내문이 붙어 있다." +
                "<br><br>그 순간, 방 한가운데에서 알 수 없는 빛이 번쩍였다." +
                "<br><br>누군가 소환되었다...!" +
                `<br><br>당신의 앞에 나타난 것은 <strong>${npc.name}</strong>였다.`
            ]
        }
    ], player, {
        onEnd : () => {
            handler(
                player,
                () => leaveDungeon(player)
            );
        }
    });
}

function getMushroomRomanceType(){
    const roll = Math.random();
    if (roll < 0.5){
        return "tasty";
    }
    if (roll < 0.85){
        return "poison";
    }
    return "lust";
}

function startMushroomRomanceRoomSolo(player){

    startScene([
        {
            type : "text",
            value : [
                "방 안으로 들어서자 뒤에서 문이 쾅 닫혔다." +
                "<br><br>방 한가운데에서 버섯 하나가 불쑥 솟아올랐다." +
                "<br><br>[둘이 사이좋게 나눠 먹어버섯!]" +
                "<br><br>......" +
                "<br><br>당신은 주위를 둘러보았다." +
                "<br><br>아무도 없다." +
                "<br><br>[...............]" +
                "<br><br>긴 침묵이 흘렀다." +
                "<br><br>[미안버섯.]" +
                "<br><br>쾅 닫혔던 문이 다시 열렸다." +
                "<br><br>......" +
                "<br><br>당신은 아무 말 없이 머쉬룸킹덤을 빠져나왔다."
            ]
        }
    ], player, {
        onEnd : () => leaveDungeon(player)
    });
}
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
                                    return true;
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
        ]
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
                return true;
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
//에이든

//아카시아
window.EVENTS.push({
    id: "akasia_MinigoldenStatue",

    condition: (player) =>
        player.justMoved &&
        ["upperHouse", "underHouse"].includes(player.location) &&
        ( hasNpcRelationship("akasia", "lover") || hasNpcRelationship("akasia", "spouse") ) &&
        ["afternoon", "night"].includes(getTimePeriod(player)) &&
        !player.flags?.akasiaDie &&
        currentHouseHasFurniture(player, "dericMiniGoldenStatue") &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "아카시아는 황금 동상보다는 전구를 쓰는 게 낫지 않냐며 고개를 갸웃거렸다. 그는 데릭의 미니 황금 동상의 얼굴을 빤히 보더니 역시 몇 번을 봐도 자신의 취향은 아니라고 말했다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 그럼 누가 취향이냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"...몰라서 묻는 건 아니지요?\"<br><br>" +
                                        "아카시아는 당신 쪽으로 고개를 돌렸다. 그러더니 우아하게 당신에게로 몸을 기울였다. 그의 입술이 당신의 이마에 닿았다가 떨어졌다." +
                                        "<br><br>\"만약 정말 몰라서 물은 거라면 당신은 세상에서 제일가는 바보고, 알면서 물은 거라면.... 정말 짓궂은 사람입니다.\"<br><br>" +
                                        "아카시아의 목소리는 언제나처럼 낮았지만 웃음기가 섞여 있었다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("akasia", "affection", 2);
                                        savePlayer(player);

                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 데릭은 그래도 잘생긴 편 아니냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"잘생기지 않았다고 말한 적은 없습니다. 그냥 제 취향이 아니었을 뿐이죠.\"<br><br>" +
                                        "아카시아는 데릭의 황금 동상을 빤히 응시하다가 당신을 올려다보았다." +
                                        "<br><br>\"...그런데 제 앞에서 다른 사람 얼굴을 칭찬하는 건 불쾌하군요. 제 기분이 풀릴 때까지 어울려주셔야겠습니다.\"<br><br>" +
                                        "결국 당신은 제 집에서조차 그의 기분이 풀릴 때까지 얌전히 어울려주어야 했다..."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        passTime(player, 15);
                                        changeStamina(player, -30);
                                        changeNpcSuspicion("akasia", 3);
                                        changeNPCEmotion("akasia", "dominance", 2);
                                        changeNPCEmotion("akasia", "affection", -2);
                                        savePlayer(player);

                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            player, {
                onEnd : () => {
                    startScene(
                        getLocationScene(player),
                        player
                    )
                }
            }
        );
    }
});

//데릭
window.EVENTS.push({
    id: "deric_house_bed",

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("deric", "lover") || hasNpcRelationship("deric", "spouse") ) &&
        getTimePeriod(player) === "afternoon" &&
        ( currentHouseHasFurniture(player, "basicBed") || currentHouseHasFurniture(player, "softBed") )&&
        canNpcVisitHouse(player, "deric") &&
        Math.random() < 0.08,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "데릭은 당신의 집을 둘러보다가 침대를 보더니 인상을 찌푸렸다." +
                        "<br><br>\"이런, 이런 침대보다는 차라리 우리 집에 있는 침대에서 자는 게 낫지 않겠니?\"<br><br>" +
                        "그는 폭신하지 않은 당신의 침대를 손끝으로 만지작거리다가 이런 침대에 누우면 천년의 욕정도 식을 것 같다고 중얼거렸다. <br><br>...그는 진심인 것 같다. 그는 당신의 침대 위에 앉을 생각은 추호도 하지 않고 있다."
                    ]
                },
                {
                    type : "effect",
                    run : (player) => {
                        changeNPCEmotion("deric", "dominance", 5);
                        passTime(player, 10);
                        savePlayer(player);
                    }
                }
            ],
            player, {
                onEnd : () => {
                    startScene(
                        getLocationScene(player),
                        player
                    )
                }
            }
        );
    }
});

window.EVENTS.push({
    id: "deric_nikolai_doll",
    once : true,

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("deric", "lover") || hasNpcRelationship("deric", "spouse") ) &&
        getTimePeriod(player) === "afternoon" &&
        currentHouseHasFurniture(player, "nikolaiDoll"),

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "초인종 소리가 울려서 가보니 데릭이었다. 그는 집으로 가는 길에 당신의 집이 보여서 왔다고 말하며, 어딘가에 앉기 전에 당신의 집을 둘러보았다. 그의 시선이 니콜라이 인형에서 멈췄다." +
                        "<br><br>\"생각보다 저 인형을 가지고 다니는 귀족들이 많다는 건 알았지만... 우리 아가도 저 인형을 갖고 있을 줄은 몰랐네?\"<br><br>" +
                        "데릭은 인상을 찌푸리더니 원한다면 저 인형보다 더 예쁜 인형을 사주겠다고 말했다. \"아니다, 인형 말고...\", 그는 더 이상 그 인형을 쳐다보지 않았다."
                    ]
                },
                {
                    type : "effect",
                    run : (player) => {
                        player.flags.dericSmallGoldenStatue = true;
                        changeNpcSuspicion("deric", 1);
                        savePlayer(player);
                    }
                }
            ],
            player, {
                onEnd : () => {
                    startScene(
                        getLocationScene(player),
                        player
                    )
                }
            }
        );
    }
});

window.EVENTS.push({
    id: "deric_nikolai_doll_02",

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("deric", "lover") || hasNpcRelationship("deric", "spouse") ) &&
        getTimePeriod(player) === "afternoon" &&
        currentHouseHasFurniture(player, "nikolaiDoll")&&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "당신의 집에 들어온 데릭은 들어오자마자 니콜라이 인형을 발견했다." +
                        "<br><br>\"...{dericTitle} 취향이니?\"<br><br>" +
                        "그는 니콜라이 인형을 흘겨보다가 당신의 취향은 생각보다 고급스럽지는 않은 모양이라며 투덜거렸다. 그는 당신이 니콜라이 인형을 치우길 원하는 것 같다. 그는 인형에 시선을 두지 않는 척하면서도 무의식적으로 니콜라이의 인형을 힐끔거렸다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 니콜라이 인형을 그의 시선이 닿지 않는 쪽으로 치웠다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "니콜라이의 인형이 자신의 시야에서 없어지자 데릭은 만족한 표정을 지었다. 그는 이야기를 더 이어갔다. 그의 이야기는 극에 치중되어 있었다. 그는 다음 번에 더 좋은 내용의 극이 나오면 당신을 데려가주겠다고 말하며 미소를 지었다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("deric", "affection", 1);
                                        changeNPCEmotion("deric", "dominance", 3);
                                        passTime(player, 15);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 니콜라이 인형이 그렇게 신경쓰이냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신의 말에 데릭의 입가가 미세하게 굳었다." +
                                        "<br><br>\"...내가? 굳이? 내가 왜 그런 인형을 신경쓰겠니.\"<br><br>" +
                                        "그는 그 인형은 자신의 시야에 들어오지도 않는다고 말하며, 자신에게는 그 인형보다 신경쓸 것들이 더 많다고 말했다. 그는 당신의 집에 당신의 예상보다 더 적은 시간만 머물렀다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("deric", "affection", -3);
                                        changeNPCEmotion("deric", "dominance", -5);
                                        changeNpcSuspicion("deric", 1);
                                        passTime(player, 5);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 모르는 척 계속 그와 대화를 나누었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "데릭은 평소보다 더 서늘한 말투로 당신과 대화를 나누었다. 몇 번 얘기를 나누던 그는 할 일이 있다고 말하며 금방 당신의 집을 나섰다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("deric", "affection", -1);
                                        changeNpcSuspicion("deric", 1);
                                        passTime(player, 5);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            player, {
                onEnd : () => {
                    startScene(
                        getLocationScene(player),
                        player
                    )
                }
            }
        );
    }
});

window.EVENTS.push({
    id: "deric_MinigoldenStatue_01",

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("deric", "lover") || hasNpcRelationship("deric", "spouse") ) &&
        ["afternoon", "night"].includes(getTimePeriod(player)) &&
        currentHouseHasFurniture(player, "dericMiniGoldenStatue") &&
        player.flags?.deric_MinigoldenStatue_01_day !== getCurrentDay(player) &&
        Math.random() < 0.07,

    action: (player) => {
        player.flags.deric_MinigoldenStatue_01_day = getCurrentDay(player);
        savePlayer(player);

        startScene(
            [
                {
                    type : "text",
                    value : [
                        "당신의 집에 들어온 데릭은 바로 자신의 미니 황금 동상을 찾았다. 그는 그 동상을 보더니 만족한 듯이 미소를 지었다." +
                        "<br><br>\"가만히 내버려두기만 해도 반짝반짝 빛나지 않니? 영광의 거리에서는 내 동상을 조명처럼 쓰기도 한다는구나.\"<br><br>" +
                        "그는 일부러 자신의 모습을 본뜬 미니 황금 동상 옆에 앉아서 당신과 얘기를 나누었다. 당신과 얘기를 나누다가도 그는 소매에서 손수건을 꺼내서 동상을 닦았다. 이야기를 마치고 나가기 전, 그는 황금 동상의 유지비에 쓰라며 지폐 몇 장을 당신에게 쥐여주고 나갔다."
                    ]
                },
                {
                    type : "effect",
                    run : (player) => {
                        changeNpcSuspicion("deric", -3);
                        changeNPCEmotion("deric", "affection", 1);
                        changeNPCEmotion("deric", "rage", -4);
                        passTime(player, 15);
                        changeGold(player, 10000);
                        savePlayer(player);
                    }
                }
            ],
            player, {
                onEnd : () => {
                    startScene(
                        getLocationScene(player),
                        player
                    )
                }
            }
        );
    }
});


//에릭
window.EVENTS.push({
    id: "eric_MinigoldenStatue_01",

    condition: (player) =>
        player.justMoved &&
        ["upperHouse", "underHouse"].includes(player.location) &&
        ( hasNpcRelationship("eric", "lover") || hasNpcRelationship("eric", "spouse") ) &&
        ["dawn", "night"].includes(getTimePeriod(player)) &&
        currentHouseHasFurniture(player, "dericMiniGoldenStatue") &&
        canNpcVisitHouse(player, "eric") &&
        !player.flags?.ericDie &&
        Math.random() < 0.06,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "당신의 집에 들어오던 에릭의 발걸음이 멈췄다. 그의 시선은 어둠 속에서도 찬란하게 빛나고 있는 데릭의 미니 황금 동상에 멈춰 있었다. 그는 말없이 제 형제의 얼굴을 본뜬 동상을 응시했다. 그리고 말없이 당신을 바라보았다." +
                        "<br><br>\"....\"<br><br>" +
                        "차라리 무슨 말이라도 해줬으면 좋겠다는 생각이 들 정도로 그는 침묵을 지켰다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 데릭이 억지로 준 거라고 변명했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"....\"<br><br>" +
                                        "에릭은 당신의 변명에도 말이 없었다. 그의 침묵은 너무 무거웠다. 그는 당신을 쳐다보지 않은 채, 당신의 취향도 황금 동상이냐고 물었다." +
                                        "<br><br>\"...개개인의 취향에 간섭할 생각은 없다.\"<br><br>" +
                                        "...그가 뭔가 오해를 하고 있는 것 같다!"
                                    ]
                                }
                            ]
                        },
                        {
                            text : "당신은 데릭보다는 에릭의 얼굴과 닮은 것 같다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"...뭐?\"<br><br>" +
                                        "에릭은 삐걱거리며 당신을 돌아보았다. 당신의 눈동자를 고요하게 바라보던 에릭은 다시 황금 동상 쪽으로 시선을 돌렸다. 그는 황금 동상의 얼굴을 뚫어지게 쳐다보았다." +
                                        "<br><br>\"...코가 조금 다르게 생겼다.\"<br><br>" +
                                        "그러더니 그는 황금 동상은 쳐다도 보기 싫다는 듯이 고개를 돌려버렸다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("eric", "affection", -1);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 제발 무슨 말이라도 해달라고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신의 말에 에릭은 당신을 흘낏 보더니 밤에는 혼자 번쩍번쩍 빛나서 황금 동상밖에 안 보일 것 같다고 말했다.... 마치 영광의 거리에 있는 그 동상처럼."
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            player, {
                onEnd : () => {
                    startScene(
                        getLocationScene(player),
                        player
                    )
                }
            }
        );
    }
});

//줄리앙

//카인
window.EVENTS.push({
    id: "kain_MinigoldenStatue_01",

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("kain", "lover") || hasNpcRelationship("kain", "spouse") ) &&
        ["dawn", "morning"].includes(getTimePeriod(player)) &&
        currentHouseHasFurniture(player, "dericMiniGoldenStatue") &&
        canNpcVisitHouse(player, "kain") &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "카인은 당신의 집에 오자마자 데릭의 미니 황금 동상을 보고 표정이 굳었다." +
                        "<br><br>\"...저거 계속 집에 둘 거야?\"<br><br>" +
                        "그는 믿기지 않는다는 듯이 당신을 바라보다가 결국 한숨을 쉬고 당신의 집으로 들어섰다. 그는 의식적으로 황금 동상을 쳐다보지 않으려고 노력하는 듯했다." +
                        "<br><br>\"데릭이 이 집에 많이 들러?\""
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
                                        "당신이 고개를 젓자 카인은 조금은 안도했다. 그는 데릭 옆에 붙어있는 사람들은 모두 안 좋은 결말을 맞았다고 말했다. 그는 손가락을 꼼지락거리다가 당신의 새끼 손가락을 자신의 검지로 감았다." +
                                        "<br><br>\"네가 그자식 때문에 다치는 건 싫어.\"<br><br>" +
                                        "그는 앞으로 데릭에게서 무슨 낌새라도 보이면 자신에게 말하라고 말했다." +
                                        "<br><br>\"어떻게든 해볼 테니까.\""
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("kain", "dominance", 5);
                                        changeNPCEmotion("kain", "affection", 3);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 고개를 끄덕였다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신의 대답에 카인은 욕설을 내뱉으며 짜증을 냈다. 그는 집에 황금 동상을 두기 싫으면 그냥 치우라고 말했다." +
                                        "<br><br>\"데릭이 화내면 그냥 내가 지랄해서 치웠다고 해.\"<br><br>" +
                                        "당신이 카인을 바라보자 카인은 자신은 익숙해서 괜찮다고 말했다. \"매도 맞아본 사람이 원래 더 잘 맞아.\", 그는 아무렇지도 않게 쏘아붙인 후 데릭의 황금 동상에서 시선을 돌렸다. 한순간도 보고 싶지 않은 모양이었다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("kain", "rage", 5);
                                        changeNpcSuspicion("kain", 1);
                                        changeNPCEmotion("kain", "dominance", 5);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 당신이 데릭을 좋아한다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신의 말에 카인은 바로 대답하지 못했다. 그는 자신의 귀를 믿지 못하겠다는 듯 눈을 깜박이다가 \"뭐?\"라고 물었다. 그의 표정이 잔뜩 일그러졌다." +
                                        "<br><br>\"왜... 하필 그새끼인데?\"<br><br>" +
                                        "카인의 주황색 눈동자가 일렁인다. 그는 욕을 내뱉더니 그대로 집을 나가버렸다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("kain", "rage", 15);
                                        changeNPCEmotion("kain", "affection", -10);
                                        changeNPCEmotion("kain", "dominance", -5);
                                        changeNpcSuspicion("kain", 5);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            player, {
                onEnd : () => {
                    startScene(
                        getLocationScene(player),
                        player
                    )
                }
            }
        );
    }
});

window.EVENTS.push({
    id: "kain_musicBox",

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("kain", "lover") || hasNpcRelationship("kain", "spouse") ) &&
        ["storm", "rain", "snow"].includes(player.weather) &&
        ( currentHouseHasFurniture(player, "musicBox") || currentHouseHasFurniture(player, "musicBoxSwan") )&&
        canNpcVisitHouse(player, "kain") &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "우산을 챙기지 않은 건지, 다 젖은 카인이 당신의 집으로 들어섰다. 그는 오늘은 목소리가 더 잘 나왔다고 말하다가 당신의 오르골 근처에서 멈췄다. 그는 노래를 듣고 싶으면 자신에게 들려달라고 하면 되는 거 아니냐고 투덜거리면서도 오르골을 돌렸다. 그는 오르골을 듣다가 음에 맞춰서 자기도 흥얼거렸다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 그의 옆에서 같이 흥얼거렸다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신이 옆에서 같이 흥얼거리자 카인은 키득키득 웃었다. 그는 혹시 혼자서도 오르골 틀어놓고 흥얼거리냐고 물었다." +
                                        "<br><br>\"나도 옛날에 자주 그랬거든. 형 없을....\"<br><br>" +
                                        "카인은 잠시 말을 멈췄다. 오르골이 멈추자 그는 다시 오르골을 돌렸다. 이번에는 아까보다 더 많이."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("kain", "affection", 2);
                                        passTime(player, 10);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 수건을 가지고 오며 우산은 안 챙기고 다니냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"챙겼다고 생각했는데.... 없어졌어.\"<br><br>" +
                                        "카인은 멈칫하더니 곧 당신 쪽으로 고개를 숙였다. 당신은 그의 머리를 말려주었다. 카인은 고개를 숙인 채로 당신을 빤히 바라보다가 눈을 감았다. 오르골 소리가 멈췄다. 하지만 여전히 카인은 당신의 손길에 자신의 머리를 맡기고 있다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("kain", "affection", 2);
                                        changeNPCEmotion("kain", "rage", -2);
                                        changeNPCEmotion("kain", "lust", 2);
                                        passTime(player, 15);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            player, {
                onEnd : () => {
                    startScene(
                        getLocationScene(player),
                        player
                    )
                }
            }
        );
    }
});

//루크
window.EVENTS.push({
    id: "luke_music_box",

    condition: (player) =>
        player.justMoved &&
        player.location === "underHouse" &&
        ( hasNpcRelationship("luke", "lover") || hasNpcRelationship("luke", "spouse") ) &&
        ["morning", "afternoon"].includes(getTimePeriod(player)) &&
        !player.flags?.collapseLuke &&
        ( currentHouseHasFurniture(player, "musicBox") || currentHouseHasFurniture(player, "musicBoxSwan") ) &&
        Math.random() < 0.08,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "당신이 집에 들어오라는 허락을 하지 않았는데도 대체 문을 어떻게 열었는지 루크는 당신의 집에 들어섰다. 당신이 쳐다보자 루크는 씩 웃으며 어깨만 으쓱였다, 언제나처럼. 그는 주변을 둘러보다가 오르골을 보더니 하류도시의 20% 정도는 오르골을 봐도 이게 대체 뭔지 모를 거라고 말했다. 그는 어색하게 오르골을 돌렸다." +
                        "<br><br>\"근데 노래 하나만 나오는 건 아무리 생각해도 비효율적이긴 하다. 더럽게 비싸잖아.\""
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 오르골은 한 가지 노래만 나오는 것조차 완벽한 거라고 대꾸했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신의 대답에도 루크는 이해를 하지 못하겠다는 듯 어깨만 으쓱였다. 그는 노래가 멈추자 다시 오르골을 돌렸다. 오르골을 돌리는 그의 모습은 여전히 어색했다." +
                                        "<br><br>\"뭐, 네가 좋으면 됐지.\"<br><br>" +
                                        "그는 오르골에서 나오는 노래에 대해 물었다. 이야기를 하는 동안 그는 오르골이 멈출 때마다 계속 오르골을 돌렸다. 마지막까지 어색하게."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        passTime(player, 20);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 음치가 그렇게 말하니까 더 설득력이 없는 것 같다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "루크는 말없이 당신을 쳐다봤다." +
                                        "<br><br>\"야 이 씨발.... 누가 음치야. 노래를 거의 안 들어봤으니까 그렇지.\"<br><br>" +
                                        "그는 화풀이하듯이 당신의 머리를 꾹꾹 눌렀다. 그러다가 입꼬리를 올리며 머리를 누르던 손으로 당신의 뒷목을 잡았다." +
                                        "<br><br>\"그리고 넌 박치잖아. 내 밑에서.\"<br><br>"
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("luke", "lust", 15);
                                        changeNPCEmotion("luke", "dominance", -2);
                                        changeNPCEmotion("luke", "affection", 1);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "어쩌면 루크의 말이 맞을지도? 당신은 고개를 끄덕였다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신이 고개를 끄덕이자 루크는 더 이해가 안 간다는 표정을 지었다." +
                                        "<br><br>\"너... 돈이 그렇게 많아?\"<br><br>" +
                                        "그는 당신의 이마를 툭 쳐서 밀었다." +
                                        "<br><br>\"야. 네가 아무리 그래도 출신을 바꿀 순 없어. 하류도시 출신.\""
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("luke", "dominance", 5);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            player, {
                onEnd : () => {
                    startScene(
                        getLocationScene(player),
                        player
                    )
                }
            }
        );
    }
});

window.EVENTS.push({
    id: "luke_house_bath",

    condition: (player) =>
        player.justMoved &&
        player.location === "underHouse" &&
        ( hasNpcRelationship("luke", "lover") || hasNpcRelationship("luke", "spouse") ) &&
        ["night", "dawn"].includes(getTimePeriod(player)) &&
        !player.flags?.collapseLuke &&
        ( currentHouseHasFurniture(player, "basicBath") || currentHouseHasFurniture(player, "luxuryBath") )&&
        canNpcVisitHouse(player, "luke") &&
        Math.random() < 0.08,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "\"하류도시에 욕조 있는 집은 너네 집밖에 없을 거다.\"<br><br>" +
                        "루크는 당신의 욕조 근처에서 서성이다가 당신을 보고 씩 웃었다. 그러더니 그는 그대로 당신을 안아들었다. 갑자기 안아들린 당신은 바둥거렸지만 루크는 당신을 놓아주지 않았다. 그는 욕조도 있으니 젖은 네 모습이나 보자고 말하며 그대로 발로 욕조의 물을 틀었다. 그리고 욕조에 어느 정도 물이 차자 그는 성큼성큼 당신을 안아들고 욕조 안으로 들어갔다." +
                        "<br><br>욕조의 물이 당신의 옷을 적신다. 루크는 물에 젖은 당신을 노골적인 시선으로 위아래로 훑었다. 그러더니 그는 제 엄지를 젖은 당신의 입술에 장난스럽게 문질렀다." +
                        "<br><br>\"역시 존나 야해.\"<br><br>" +
                        "....분위기가 어째 야릇해지는 것 같다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 욕조 끝으로 물러났다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"어쭈, 어딜 가?\"<br><br>" +
                                        "루크는 재밌다는 듯이 웃더니 그대로 당신의 허리를 잡아 자신 쪽으로 끌어당겼다. 당신은 몸부림 한번 제대로 못 치고 다시 루크의 품안으로 끌려왔다. 루크의 입술이 당신의 온몸을 덮어온다. 당신의 몸은 루크 쪽으로 기울어졌다가도 뒤로 기울어졌다. 당신의 머리카락이 흠뻑 물에 젖었다. 코로 들어오는 물에 당신은 더 발버둥을 쳤지만 루크는 오히려 그런 당신이 귀엽다는 듯 당신의 어깨를 꽉 누르고 천천히 당신을 음미해갔다." +
                                        "<br><br>당신은 꽤 긴 시간 동안 그에게 탐해졌다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeSensitivity(player, "aSensitivity", 4);
                                        changeSensitivity(player, "bSensitivity", 4);
                                        changeSensitivity(player, "cSensitivity", 4);
                                        changeSensitivity(player, "mSensitivity", 4);
                                        passTime(player, 30);
                                        changeNPCEmotion("luke", "lust", -50);
                                        changeNPCEmotion("luke", "affection", 2);
                                        changeNPCEmotion("luke", "dominance", 3);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 오히려 루크의 목을 끌어안으며 키스했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "루크는 당신의 행동에 놀란 듯 움직임이 순간 굳었다. 하지만 그것도 잠시 낮게 웃으며 그는 당신의 뒤통수를 한손으로 감싸안으며 키스를 받아주었다. 쪽쪽거리는 소리가 민망할 정도로 크게 울린다. 긴 키스가 끝나고 루크는 당신에게서 입술을 떼며 \"엄청 까부네?\"라고 낮게 속삭였다. 그는 당신을 제 무릎 위에 올리더니 다시금 키스를 해왔다. 당신의 그의 손이 당신의 가슴 위로 슬금슬금 올라오는 것을 느꼈다." +
                                        "<br>허리는 그의 한손에 감긴 채, 당신은 그의 가슴 애무에 몸을 바르르 떨었다. 그는 한손으로도 쉽게 당신의 가슴을 움켜잡았다. 손가락 사이사이로 튀어나오는 살집, 그리고 곧 고개를 숙여 흥분으로 톡 튀어나온 당신의 가슴을 이로 잘근잘근 무는 집요함, 당신의 머리가 순간적으로 새하얗게 질렸다." +
                                        "<br><br>욕조에 받은 물을 탁하게 만들고 나서야 루크는 당신을 풀어주었다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeSensitivity(player, "mSensitivity", 6);
                                        changeSensitivity(player, "bSensitivity", 6);
                                        passTime(player, 20);
                                        changeNPCEmotion("luke", "lust", -50);
                                        changeNPCEmotion("luke", "affection", 2);
                                        changeNPCEmotion("luke", "dominance", -3);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            player, {
                onEnd : () => {
                    startScene(
                        getLocationScene(player),
                        player
                    )
                }
            }
        );
    }
});

//마틴

//니콜라이
window.EVENTS.push({
    id: "nikolai_nikolai_doll",

    condition: (player) =>
        player.justMoved &&
        ["upperHouse", "underHouse"].includes(player.location) &&
        ( hasNpcRelationship("nikolai", "lover") || hasNpcRelationship("nikolai", "spouse") ) &&
        getTimePeriod(player) === "afternoon" &&
        !player.flags?.nikolaiDie &&
        currentHouseHasFurniture(player, "nikolaiDoll")&&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "\"{nikolaiTitle}, 나 보고 싶었어?\"<br><br>" +
                        "초인종 소리가 울려서 문을 열자 니콜라이가 미소를 지으며 서 있었다. 그는 마카롱을 사서 가는 길에 당신의 집이 생각나서 들렀다고 말하며 집안으로 발걸음을 내딛었다. 그는 방에 있는 자신의 인형을 보더니 놀란 듯 눈을 크게 떴다." +
                        "<br><br>\"어머, 아직도 가지고 있었어?\"<br><br>" +
                        "그는 자신의 인형을 손가락으로 쿡쿡 찌르며 역시 이 인형의 매력에서 벗어날 수 없었냐고 장난스레 물었다. 그는 무릎 위에 자기랑 똑닯은 인형을 올리고 당신과 함께 마카롱을 먹었다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 자신이 네 인형을 버릴 줄 알았냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"어머, 자기, 원래 기대는 하는 것보다는 안 하는 게 좋아. 그래야 화도 안 나고 실망도 안 하거든. 기쁨은 2배고.\"<br><br>" +
                                        "니콜라이는 무릎에 앉아있는 인형의 뺨을 손가락으로 콕콕 찌르며 다른 손으로는 마카롱을 냠냠 먹었다.<br><br>" +
                                        "\"이 세상에서 내가 기대하는 건 마카롱의 맛밖에 없어, 자기.\""
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeStamina(player, 30);
                                        passTime(player, 10);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 언제나 니콜라이 인형을 안고 잔다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "니콜라이의 눈이 동그래졌다. 그는 당신을 멍하니 바라보다가 와르르 웃음을 터뜨렸다. 그는 그런 말은 대체 어디서 배운 거냐고 물었다." +
                                        "<br><br>\"...귀엽긴 하네.\"<br><br>" +
                                        "니콜라이는 인형을 자신의 무릎에서 당신의 무릎 위로 올리며 눈꼬리를 휘어 웃었다. 그는 자신의 인형과 당신을 번갈아보며 싱글거렸다." +
                                        "<br><br>\"안고 잔다고 생각하니까 너무 사랑스럽다.\""
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("nikolai", "affection", 1);
                                        changeStamina(player, 30);
                                        passTime(player, 10);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 니콜라이에게 인형을 좋아하냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"응? 글쎄? 귀엽긴 해.\"<br><br>" +
                                        "그는 어떤 인형이냐에 따라 다르지 않을까, 하면서 고개를 갸웃거렸다. 마카롱을 집지 않은 손으로 그는 인형의 머리를 톡톡 쳤다. 그는 당신의 인형이라면 자신도 제 집무실 책상에 놓고 일하고 싶다고 말했다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeStamina(player, 30);
                                        passTime(player, 10);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            player, {
                onEnd : () => {
                    startScene(
                        getLocationScene(player),
                        player
                    )
                }
            }
        );
    }
});

window.EVENTS.push({
    id: "nikolai_MinigoldenStatue",

    condition: (player) =>
        player.justMoved &&
        ["upperHouse", "underHouse"].includes(player.location) &&
        ( hasNpcRelationship("nikolai", "lover") || hasNpcRelationship("nikolai", "spouse") ) &&
        ["afternoon", "morning"].includes(getTimePeriod(player)) &&
        !player.flags?.nikolaiDie &&
        currentHouseHasFurniture(player, "dericMiniGoldenStatue") &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "당신의 집에 들어서자마자 니콜라이는 참지 못하고 웃음을 터뜨렸다. 그는 당신의 집에 있는 데릭의 미니 황금 동상을 손가락으로 가리키며, 영광의 거리에 있는 동상처럼 밤에는 반짝반짝 빛나는 거냐고 물었다. 당신이 대답도 하기 전에 그는 깔깔 웃으며 배를 잡았다." +
                        "<br><br>\"아... 너무 웃었더니 배 아파...\"<br><br>" +
                        "니콜라이는 찔끔 눈물까지 흘리며 오늘도 기분 좋은 하루를 선사해줘서 고맙다고 말했다. <br><br>이야기를 나누는 동안 그는 몇 번이나 데릭의 미니 황금 동상과 시선을 마주치고 웃음을 참지 못했다."
                    ]
                },
                {
                    type : "effect",
                    run : (player) => {
                        passTime(player, 15);
                    }
                }
            ],
            player, {
                onEnd : () => {
                    startScene(
                        getLocationScene(player),
                        player
                    )
                }
            }
        );
    }
});

//창백

//라파엘

//시온

//소라

//발렌
window.EVENTS.push({
    id: "valen_MinigoldenStatue",

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("valen", "lover") || hasNpcRelationship("valen", "spouse") ) &&
        getTimePeriod(player) === "dawn" &&
        !player.flags?.valenDie &&
        currentHouseHasFurniture(player, "dericMiniGoldenStatue") &&
        canNpcVisitHouse(player, "valen") &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "데릭의 미니 황금 동상이 어둠 속에서도 반짝반짝 빛나고 있다. 발렌은 말없이 데릭의 미니 황금 동상을 바라보았다." +
                        "<br><br>\"...영광의 거리에 그의 황금 동상을 세워준 게 조금 후회가 되려고 하군요.\"<br><br>" +
                        "발렌은 당신의 집에서까지 데릭의 미니 황금 동상을 보고 있어야 할 줄은 꿈에도 생각하지 못했다고 말했다." +
                        "<br><br>\"전 동상은 별로 좋아하지 않습니다. 직접 보는 게 더 좋거든요.\""
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 영광의 거리에 데릭의 황금 동상은 왜 지어준 거냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"필요했으니까요.\"<br><br>" +
                                        "발렌은 망설임 없이 대답했다. 그는 당신의 어깨선을 손가락으로 훑으며 사람들은 힘들 때 반짝반짝거리는 것에 시선을 두고 싶어한다고 말했다." +
                                        "<br><br>\"당시는 많은 사람이 겁에 질려 있던 시기였습니다. 그 시간을 이겨내려면 화려한 문화가 필요했죠. 그리고 데릭은 그들에게 화려하고 이상적인 꿈이었습니다.\"<br><br>" +
                                        "발렌은 가만히 생각하다가 웃으며 덧붙였다." +
                                        "<br><br>\"물론 데릭의 동의도 받은 일입니다.\""
                                    ]
                                }
                            ]
                        },
                        {
                            text : "당신은 당신도 직접 보는 것을 좋아한다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "발렌은 조용히 웃었다. 그는 자신의 얼굴을 당신에게 가까이 하더니 그러면 서로 보고 있자고 말했다. 그의 손가락이 당신의 뺨에 닿았다가, 느릿하게 미끄러져서 당신의 아랫입술을 지그시 눌렀다." +
                                        "<br><br>\"그냥 서로만요.\"<br><br>" +
                                        "당신이 눈을 깜박인 순간에 발렌은 그대로 당신의 입술을 덮쳐왔다. 그는 당신의 허리를 잡으며 맞닿은 입술 사이로 낮게 웃었다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("valen", "affection", 1);
                                        changeSensitivity(player, "mSensitivity", 3);
                                        changeNPCEmotion("valen", "lust", -30);
                                        passTime(player, 15);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 영광의 거리에 당신의 황금 동상도 지어주면 안 되냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신의 말에 발렌은 눈을 빠르게 깜박이더니 곧 미소를 지으며 당신도 그런 관심을 즐기냐고 물었다. 그는 당신을 자연스럽게 끌어안으며 고개를 저었다." +
                                        "<br><br>\"당신을 황금 동상으로 만들면, 사람들은 당신이 아니라 <strong>그들의 당신</strong>을 그리게 됩니다. 당신을 욕망하는 다른 사람들은 별로 보고 싶지 않군요.\"<br><br>" +
                                        "그는 장난스럽게 당신의 목에 입술을 묻었다가 뗐다." +
                                        "<br><br>\"당신이 정말로 원한다면 해드리겠지만... 제 시선만으로는 안 되겠습니까?\""
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("valen", "affection", -1);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            player, {
                onEnd : () => {
                    startScene(
                        getLocationScene(player),
                        player
                    )
                }
            }
        );
    }
});

//유리
window.EVENTS.push({
    id: "yuri_MinigoldenStatue",

    condition: (player) =>
        player.justMoved &&
        player.location === "underHouse" &&
        ( hasNpcRelationship("yuri", "lover") || hasNpcRelationship("yuri", "spouse") ) &&
        ["afternoon", "night"].includes(getTimePeriod(player)) &&
        !player.flags?.yuriDie &&
        currentHouseHasFurniture(player, "dericMiniGoldenStatue") &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "집에 들어온 유리는 데릭의 미니 황금 동상을 가만히 응시했다. 무슨 생각을 하는지 그는 한동안 아무 말도 하지 않았다. 동상을 바라보는 호박색 눈동자에는 별다른 감정이 드러나지 않았지만, 그래서 더욱 슬퍼 보였다." +
                        "<br><br>정적이 길어지자 유리는 마침내 당신에게로 고개를 돌렸다. 그는 자신의 행동이 당신을 불편하게 했다면 미안하다고 말하고는, 아무 일도 없었던 것처럼 일상적인 이야기를 이어갔다."
                    ]
                },
                {
                    type : "effect",
                    run : (player) => {
                        changeNPCEmotion("yuri", "affection", -2);
                        changeNpcSuspicion("yuri", 1);
                        passTime(player, 10);
                        savePlayer(player);
                    }
                }
            ],
            player, {
                onEnd : () => {
                    startScene(
                        getLocationScene(player),
                        player
                    )
                }
            }
        );
    }
});

window.EVENTS.push({
    id: "yuri_musicBox",

    condition: (player) =>
        player.justMoved &&
        player.location === "underHouse" &&
        ( hasNpcRelationship("yuri", "lover") || hasNpcRelationship("yuri", "spouse") ) &&
        ["storm", "rain", "snow"].includes(player.weather) &&
        getTimePeriod(player) === "night" &&
        ( currentHouseHasFurniture(player, "musicBox") || currentHouseHasFurniture(player, "musicBoxSwan") )&&
        canNpcVisitHouse(player, "yuri") &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "\"미안. 들어가도 될까?\"<br><br>" +
                        "유리의 머리는 젖어 있었다. 그는 오다가 어린 아이가 비를 맞고 있길래 우산을 줬다고 말하며, 몸이 마를 때까지만 집에 있어도 되겠냐고 물었다. 그는 당신에게 받은 수건으로 머리를 털며 요즘은 어떻냐고 물었다. 그는 당신의 집 천장을 보면서 새는 곳은 없는지 살폈다." +
                        "<br><br>\"아, 오르골.\"<br><br>" +
                        "유리는 미소를 지었다. 그는 오르골은 좋아한다고 말하며 당신에게 무슨 노래 오르골이냐고 물었다. 돌려도 되냐고 물은 후, 그는 오르골을 익숙하게 돌렸다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 유리에게 좋아하는 오르골 노래가 있냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "유리는 기억나는 오르골 노래를 몇 가지 말해주었다. 당신이 아는 노래도 몇 개 있었지만 모르는 노래도 많았다. 당신의 표정을 살피던 유리는 혹시 이들 중에 궁금한 노래가 있냐고 물었다. 그는 당신이 원한다면 직접 불러주겠다고 말하며 웃었다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("yuri", "affection", 1);
                                        passTime(player, 10);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 오르골 음에 맞춰 흥얼거렸다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신이 오르골 음에 맞춰 흥얼거리자 유리는 잠시 말을 잃었다. 당신이 의아해하자 그는 고개를 저으며 잠시 옛날 생각이 났을 뿐이라고 말했다. 그는 흥얼거리는 당신의 옆에서 같이 흥얼거렸다. 그의 음색은 예전처럼 상냥했고 부드러웠다. 어떤 상류도시의 가수들도 유리의 목소리는 따라잡을 수 없을 거라고 당신은 무의식적으로 생각했다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("yuri", "dominance", 5);
                                        changeNPCEmotion("yuri", "affection", 2);
                                        changeTrauma(player, -3);
                                        passTime(player, 15);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 유리와 함께 조용히 오르골 노래를 들었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신과 유리는 서로에게 머리를 기댄 채 오르골 노래를 들었다." +
                                        "<br><br>\"어렸을 때 생각난다... 물론 그때는 오르골도 없었고 천장이 새기는 했지만... 그때의 우리와 지금의 우리는 달라진 게 없다는 생각이 들어.\"<br><br>" +
                                        "유리는 부드럽게 손깍지를 껴며 미소를 지었다." +
                                        "<br><br>\"그래서 네가 좋아, {yuriTitle}.\""
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        passTime(player, 15);
                                        changeTrauma(player, -2);
                                        changeNPCEmotion("yuri", "affection", 2);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            player, {
                onEnd : () => {
                    startScene(
                        getLocationScene(player),
                        player
                    )
                }
            }
        );
    }
});
//에이든
window.EVENTS.push({
    id: "aiden_roseBed_01",

    condition: (player) =>
        player.justMoved &&
        ["upperHouse", "underHouse"].includes(player.location) &&
        ( hasNpcRelationship("valen", "lover") || hasNpcRelationship("valen", "spouse") ) &&
        getTimePeriod(player) === "afternoon" &&
        !player.flags?.valenDie &&
        ["redRoseBed", "greenRoseBed", "blueRoseBed", "blackRoseBed"].some(id => currentHouseHasFurniture(player, id)) &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "안부차 당신의 집에 들렸다는 에이든은 당신의 집을 둘러보다가 장미 침대에 시선을 멈췄다. 그는 얼굴을 붉히더니 5월의 장미 때 자신도 당신을 보았다고 말했다." +
                        "<br><br>\"당신이 그곳에서 가장 아름답다고 생각하긴 했습니다....\"<br><br>"
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 그에게 좋게 봐주셔서 감사하다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"...저야말로 감사합니다. 당신같은 사람이 발렌님의 옆에 있어서 얼마나 위안이 되는지...\"<br><br>" +
                                        "그는 자신의 어깨 무게를 덜어준 사람은 당신이라고 말하며 미소를 지었다. 진심 어린 애정이 그의 금안에서 일렁인다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("aiden", "affection", 3);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 말없이 얼굴을 붉혔다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신이 얼굴을 붉히자 에이든이 당황했다. 그는 몇 번이고 입술을 달싹이다가 고개를 푹 숙이며 당신을 당황하게 했다면 죄송하다고 말했다." +
                                        "<br><br>\"다른 뜻은 없었습니다, 발렌의 기사님.\"<br><br>" +
                                        "그는 앞으로도 서로가 발렌의 양쪽 날개가 되어서 같이 있을 수 있었으면 좋겠다고만 생각했다고 말했다. 어쩐지 분위기가 더 묘해졌다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("aiden", "affection", 2);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 에이든도 장미의 날에 나왔으면 뽑혔을지도 모른다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"네? 무슨 그런 불경한 말씀을.\"<br><br>" +
                                        "에이든은 당황하더니 단호하게 고개를 저었다. 그는 당신에게 자신이 이길 수도 없겠지만 당신이 없다고 하더라도 주인인 발렌을 이길 생각은 없다고 말했다." +
                                        "<br><br>\"이길 수도 없고요.\"<br><br>" +
                                        "그는 앞으로는 당신이 그런 말을 하지 않았으면 좋겠다고 말하며 고개를 돌렸다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("aiden", "affection", -5);
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

window.EVENTS.push({
    id: "akasia_ericBasket_01",

    condition: (player) =>
        player.justMoved &&
        ["upperHouse", "underHouse"].includes(player.location) &&
        ( hasNpcRelationship("akasia", "lover") || hasNpcRelationship("akasia", "spouse") ) &&
        ["afternoon", "night"].includes(getTimePeriod(player)) &&
        currentHouseHasFurniture(player, "ericBasket") &&
        canNpcVisitHouse(player, "akasia") &&
        !player.flags?.akasiaDie &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "당신의 집에 도착한 아카시아는 당신과 이야기를 나누다가 에릭의 바구니에서 시선을 멈췄다. 아카시아는 어디서 본 것 같다고 말하며 고개를 기울이다가 \"아\"하는 소리와 함께 기억해냈다. 그는 당신에게 저건 에릭이 준 거냐고 물었다." +
                        "<br><br>\"에릭은 예전부터 작은 동물들을 좋아했습니다. 가끔씩 저도 에릭의 옆에서 먹이를 주고는 했었죠. 하지만 이상하게.... 저보다는 에릭을 더 따르더군요.\""
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 자신은 에릭보다 아카시아를 더 따르니 된 것 아니냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "아카시아는 당신의 말에 두 눈을 느리게 깜박이다가 이내 웃음을 터뜨렸다. 그의 웃음은 언제나처럼 조용했지만, 이번만큼은 손으로 입을 가리며 고개를 숙이고 어깨를 떨었다." +
                                        "<br><br>\"...기쁘네요.\"<br><br>" +
                                        "아카시아의 미소가 짙어졌다. 그는 당신의 입술 위로 가볍게 입맞춤을 하더니 당연히 당신이 자신을 따르는 게 더 중요하다고 말했다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("akasia", "affection", 3);
                                        changeNPCEmotion("akasia", "dominance", 5);
                                        changeNPCEmotion("akasia", "lust", 5);
                                        passTime(player, 10);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 다음 번에는 자신과 함께 소동물에게 먹이를 줘보자고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신의 말에 아카시아는 고개를 갸웃거리더니 그러다가 동물이 당신을 더 잘 따르면 어쩌냐고 물었다." +
                                        "<br><br>\"...하지만 소동물들 사이에 낑겨있는 당신을 보고 싶긴 하군요.... 귀여울 것 같아요.\"<br><br>" +
                                        "대체 무슨 상상을 한 건지 아카시아의 미소가 더 짙었다. 당신과 아카시아는 더 많은 얘기를 나누었다. 어째 아카시아의 입에서 귀엽다는 소리가 많이 나오는 것 같긴 했지만...."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("akasia", "affection", 1);
                                        changeNPCEmotion("akasia", "dominance", 2);
                                        passTime(player, 10);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 에릭이 괴짜인 거라고 대꾸했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "아카시아는 말없이 당신을 바라보다가 고개를 저었다." +
                                        "<br><br>\"에릭은 괴짜가 아닙니다.\"" +
                                        "<br><br>더 이상 말은 없었다. 분위기가 안 좋아졌다...."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("akasia", "affection", -3);
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
    id: "akasia_roseBath_01",

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("akasia", "lover") || hasNpcRelationship("akasia", "spouse") ) &&
        ["night", "dawn"].includes(getTimePeriod(player)) &&
        canNpcVisitHouse(player, "akasia") &&
        currentHouseHasFurniture(player, "roseBath")&&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "\"....\"<br><br>"+
                        "손을 씻고 오겠다며 화장실로 들어간 아카시아가 나오지를 않는다. 당신이 화장실에 가보자 아카시아는 장미 욕조에 손을 넣으며 찰박찰박 물장난을 치고 있었다. 아카시아가 당신을 돌아보았다. 그는 미소를 지으며 장미 욕조를 볼 때마다 생각하는 거지만 당신이 장미 목욕을 하고 있는 걸 생각하면 얼굴이 뜨거워진다고 말했다." +
                        "<br><br>\"당신도 그렇지 않나요?\"<br><br>" +
                        "아카시아는 당신의 손을 잡고 하늘하늘 욕조로 걸어갔다. 그의 옷이 장미향이 듬뿍 밴 물에 젖어버리는데도, 그는 신경쓰지 않았다. 젖어서 몸에 달라붙은 옷이 그의 몸매를 더 적나라하게 드러낸다. 아카시아는 미소를 지으며 당신의 손을 끌어당겼다." +
                        "<br><br><strong>첨벙</strong>"
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 흠뻑 젖은 채로 아카시아의 놀이에 어울려주었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신과 아카시아는 장미꽃잎이 둥둥 떠있는 욕조에서 물놀이를 했다. 아카시아는 장난스럽게 당신의 머리를 적시며 웃었다. 평소에 짓는 은은한 미소보다 더 밝은 미소였다." +
                                        "<br><br>\"....\"<br><br>" +
                                        "아카시아는 당신의 젖은 모습을 물끄러미 바라보다가 그대로 손을 뻗어 당신의 가슴을 만졌다. 손가락 사이로 삐죽 튀어나오는 살덩이들을 사랑스럽다는 듯이 바라보며 아카시아는 혀로 제 입술을 핥았다." +
                                        "<br><br>\"왜 이렇게 달콤해보일까요, 당신의 가슴 사이로 흐르는 물은.\"<br><br>" +
                                        "아카시아는 말에서 멈추지 않았다. 그는 당신에게 다가오더니 그대로 고개를 숙이고 당신의 가슴을 핥아올리기 시작했다. 그의 말대로 물이 달콤했는지는 모르겠다. 그저 그는, 당신이 숨을 허덕일 때까지 멈추지 않았을 뿐."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player)=> {
                                        changeNPCEmotion("akasia", "affection", 3);
                                        changeNPCEmotion("akasia", "lust", -50);
                                        changeSensitivity(player, "bSensitivity", 4);
                                        passTime(player, 50);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 오히려 아카시아를 욕조 밖으로 끌어당기며 그러다가 감기에 걸린다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"...옷은 당신의 집에서 말리면 되는 거 아닌가요? 다 마를 때까지 당신의 곁에 있을 생각이었는데.\"<br><br>" +
                                        "그리고 이미 젖기도 했고요, 아카시아는 자신을 내려다보며 말했다. 그는 당신도 발렌처럼 물을 별로 안 좋아하는 고양이과냐고 물었다. 발렌도 물놀이를 하자고 할 때마다 웃으면서 자리를 피해버렸다고 한다." +
                                        "<br><br>\"아쉽지만 어쩔 수 없죠.\"<br><br>" +
                                        "아카시아는 욕조 밖으로 나와 젖은 채로 당신과 대화를 나누었다. 당신이 머리를 말려주자 아카시아는 미소를 지으며 물놀이 말고 이런 것도 좋은 것 같다고 말했다. 그는 당신에게 머리를 맡긴 채 편하게 늘어졌다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player)=> {
                                        changeNPCEmotion("akasia", "dominance", -3);
                                        passTime(player, 20);
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

window.EVENTS.push({
    id: "deric_ericBasket_01",

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("deric", "lover") || hasNpcRelationship("deric", "spouse") ) &&
        ["dawn", "night"].includes(getTimePeriod(player)) &&
        currentHouseHasFurniture(player, "ericBasket") &&
        canNpcVisitHouse(player, "deric") &&
        !player.flags?.ericDie &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "당신의 집에 들어온 데릭은 주변을 둘러보다가 견과류 바구니를 보고 멈칫했다. 그는 그 바구니에 가까이 다가가더니 인상을 찌푸렸다." +
                        "<br><br>\"뭐야? 못생겼어. 누구 취향 아니랄까봐.\"<br><br>" +
                        "그는 실력이 하나도 안 늘었다고 투덜거리며 시중에서 파는 걸 사면 되는데 왜 직접 만드는 건지 아직도 이해가 안 간다고 말했다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 에릭이 예전부터 바구니를 직접 만들고는 했냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"걘 어렸을 때부터 다람쥐한테 먹이 주는 걸 좋아했단다.\"<br><br>" +
                                        "데릭은 곰같은 놈이 소동물을 좋아하는 거가 어울리냐고 물으면서도 입꼬리를 씰룩였다. 옛날 생각이 난 모양이다. 그는 바구니에 설치류들을 가득 담아서 집에 돌아왔던 적이 많다고 말하며, 결국에는 집에 데려오지 못했다는 말을 했다." +
                                        "<br><br>\"그런 걸 집에서 어떻게 키우겠니. 집이 금방 더러워져버린다고.\""
                                    ]
                                }
                            ]
                        },
                        {
                            text : "당신은 못생기지 않았다고 투덜거렸다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "데릭은 당신을 바라보다가 바구니를 들며 거친 부분을 하나하나 손가락으로 짚어보였다." +
                                        "<br><br>\"우리 아가.... 보는 눈이 정말 없구나?\"<br><br>" +
                                        "그는 오히려 당신의 눈을 안쓰럽게 여기고 있다. 그는 다음 번에 시중에서 파는 바구니를 구경시켜주겠다고 말했다."
                                    ]
                                },
                                {
                                    type  : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("deric", "affection", -2);
                                        changeNPCEmotion("deric", "rage", 5);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 데릭은 바구니를 직접 만들어본 적이 있냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"내가? 그럴 리가 있겠니.\"<br><br>" +
                                        "데릭은 미소를 지으며 다리를 꼬았다. 그는 가슴 안쪽 주머니에 있던 자신의 지갑을 흔들어 보였다. 저번에 가지고 있던 지갑이랑 다른 것 같다." +
                                        "<br><br>\"원하는 게 있으면 돈으로 사면 된단다.\""
                                    ]
                                },
                                {
                                    type  : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("deric", "affection", 2);
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
    id: "deric_kainSignFrame_01",

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("deric", "lover") || hasNpcRelationship("deric", "spouse") ) &&
        getTimePeriod(player) === "morning" &&
        canNpcVisitHouse(player, "deric") &&
        currentHouseHasFurniture(player, "kainSignFrame") &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "데릭은 당신의 집에서 모닝커피를 타다가 보이는 카인의 사인 액자에 미간을 찌푸렸다." +
                        "<br><br>\"우리 아가가... 카인을 많이 좋아하나 보구나?\"<br><br>" +
                        "그는 카인의 사인 액자를 뚫어지게 응시하며 말했다." +
                        "<br><br>\"하기야, 내가 만들어낸 1위 가수니까 당연한 거겠지만. 그래도 나쁜 물은 들면 안 된단다. 알지?\""
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 데릭이 없었어도 카인은 언젠가 1위 가수가 되었을 거라고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "데릭은 코웃음을 치더니 커피를 마저 우아하게 마셨다." +
                                        "<br><br>\"카인처럼 부르는 사람은 많아. 내가 있었기에 그 녀석이 무대에 올라설 수 있었던 거다. 아니, 적어도 스테리만 남아 있었어도 그 녀석은 무대에 오르지도 못했을 테다.\"<br><br>" +
                                        "데릭은 입꼬리를 비틀어올리며 카인은 원래 무대 뒤에서 청소나 해야 하는 운명이었다고 말했다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("deric", "affection", -5);
                                        changeNPCEmotion("deric", "dominance", -5);
                                        changeNPCEmotion("deric", "rage", 10);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 카인은 착한 아이라고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"착하다?\"<br><br>" +
                                        "데릭은 피식 웃더니 뒤에서 당신의 어깨를 끌어안았다. 그는 당신에게로 고개를 기울이더니 마치 비밀 얘기를 하는 것처럼 속삭였다." +
                                        "<br><br>\"이 세상에 착한 사람은 존재하지 않는단다, 아가. 누구나 닥친 상황에 따라 착해질 수도, 나빠질 수도 있는데 이 세상에 착한 사람이 어디 있겠니.\"<br><br>" +
                                        "그는 당신의 어깨를 주무르며 언젠가는 당신도 자신의 말을 이해할 날이 올 거라고 말했다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("deric", "dominance", 3);
                                        changeNPCEmotion("deric", "rage", 5);
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
                                        "당신의 순종적인 반응에 데릭은 만족하며 다시 커피를 음미했다. 그는 당신의 팬심은 귀엽게 이해해주겠다고 말했다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("deric", "affection", 3);
                                        changeNPCEmotion("deric", "rage", -5);
                                        changeNPCEmotion("deric", "dominance", 5);
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
    id: "deric_kainPoster_01",

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("deric", "lover") || hasNpcRelationship("deric", "spouse") ) &&
        currentHouseHasFurniture(player, "kainPoster") &&
        getTimePeriod(player) === "afternoon" &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "\"...카인의 팬이니?\"<br><br>" +
                        "당신의 집에 찾아와서 자연스럽게 의자에 앉아있던 데릭은 주변을 둘러보다가 카인의 포스터를 발견했다. 그는 당신의 안목에 오늘도 놀랐다고 말하며 고개를 절레절레 저었다." +
                        "<br><br>\"나라면 다른 포스터를 붙여놓을 것 같은데 말이지....\""
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 당신이 카인의 팬이라고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"...팬?\"<br><br>" +
                                        "데릭은 코웃음을 치더니 하긴 카인은 1위 가수니까 당신도 그의 팬일 수도 있겠다고 조롱하듯이 말했다. 그는 카인을 1위 가수로 만들려고 자신이 얼마나 많은 노력을 한지 아냐고 물었다." +
                                        "<br><br>\"그에 비해 스테리는, 아무 것도 안 해줘도 사람의 마음을 사로잡는 아이였지.\"<br><br>" +
                                        "데릭은 당신을 안쓰럽다는 듯이 바라보며, 스테리가 공연에 오르는 걸 당신이 봤다면 당신도 카인의 팬이 아니라 스테리의 팬이 되었을 거라고 말했다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("deric", "affection", -2);
                                        changeNPCEmotion("deric", "rage", 1);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 데릭의 포스터가 생긴다면 그걸 붙여놓겠다고 대답했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "데릭은 당신의 말에 웃었다." +
                                        "<br><br>\"내 포스터는... 바탕색이나 겉면이 금색이어야 할 텐데?\"<br><br>" +
                                        "그는 자신의 포스터는 남들의 포스터와는 차원이 달라야 한다고 말했다." +
                                        "<br><br>\"언젠가 만들게 되면 {dericTitle}한테 먼저 보여주마. 약속이란다.\""
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("deric", "affection", 2);
                                        changeNPCEmotion("deric", "dominance", 2);
                                        changeNPCEmotion("deric", "rage", -4);
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
    id: "deric_kainPoster_02",

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("deric", "lover") || hasNpcRelationship("deric", "spouse") ) &&
        currentHouseHasFurniture(player, "kainRarePoster")&&
        ["dawn", "night"].includes(getTimePeriod(player)) &&
        canNpcVisitHouse(player, "deric") &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "\"....\"<br>" +
                        "<br>술을 마시고 온 건지 데릭의 표정은 평소보다 더 굳어 있었다. 그는 카인의 한정 포스터를 보자마자 기가 막히다는 듯이 코웃음을 쳤다." +
                        "<br><br>\"아가, 이게 그 정도 가격의 가치가 있니?\"<br><br>" +
                        "그는 카인의 눈빛을 뚫어지게 응시하더니 저건 거짓이라고 말했다." +
                        "<br><br>\"진실이 되려면.... 조금 더 진심으로 보여야지. 사람들의 마음을 사로잡을 수 있도록.\""
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 당신의 눈에는 카인이 진심으로 보인다고 대꾸했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신은 쳐다보던 데릭은 낮게 한숨을 쉬었다. 그는 당신의 손목을 붙잡더니 카인의 한정 포스터에서 떨어졌다." +
                                        "<br><br>\"그래. 아가는 잘 모를 수도 있지. 공연을 좋아하는 사람들 중에서도 무지한 이들이 많으니까...\"<br>" +
                                        "<br>그는 자신이 당신의 눈이 되어줄 테니 걱정하지 말라고 말했다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        passTime(player, 10);
                                        changeNPCEmotion("deric", "affection", -2);
                                        changeNPCEmotion("deric", "dominance", 4);
                                        changeNPCEmotion("deric", "rage", 1);
                                        changeNpcSuspicion("deric", 2);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 그런 말은 술이나 깨고 하라고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"...나는 지금 취하지 않았단다.\"<br><br>" +
                                        "데릭은 당신의 손목을 잡아당겼고, 균형을 잃은 당신은 그와 함께 바닥으로 넘어졌다. 데릭과 함께 넘어진 당신은 허리에 묵직한 통증을 느꼈다. 하지만 데릭은 당신의 찌푸린 표정에도 개의치 않고 말을 이었다." +
                                        "<br><br>\"...아가, 어른에게는 예의를 지켜야 한다는 것도 안 배웠니?\"<br><br>" +
                                        "그의 손바닥이 당신의 엉덩이를 향해 3번 내려왔다. 짝, 짜악, 짜아악! 점점 세지는 파열음에 당신은 허리를 떨었다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        passTime(player, 4);
                                        changeHP(player, -15);
                                        changeStamina(player, -10);
                                        changeTrauma(player, 3);
                                        changeNPCEmotion("deric", "affection", -3);
                                        changeNPCEmotion("deric", "dominance", 3);
                                        changeNPCEmotion("deric", "rage", 5);
                                        changeNPCEmotion("deric", "lust", -10);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 그의 말에 동의하며, 카인에게는 진심이 부족하다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "데릭은 당신의 말에 입꼬리를 올리며 고개를 끄덕였다." +
                                        "<br><br>\"그리고 아마 이 아이는 평생 그걸 모를 테고 말이야.\"<br><br>" +
                                        "그는 당신을 꽈악 끌어안더니 포스터에서 멀리 떨어졌다. 그는 당신의 귀에 나쁜 물이 들면 안 된다고 속삭였다. 그의 입술이 당신의 귀를 타고 내려간다. 점점 더 밑으로..."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeSensitivity(player, "bSensitivity", 3);
                                        passTime(player, 6);
                                        changeNPCEmotion("deric", "affection", 3);
                                        changeNPCEmotion("deric", "dominance", 5);
                                        changeNPCEmotion("deric", "lust", -30);
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
    id: "deric_luxuryTeaSet_01",

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("deric", "lover") || hasNpcRelationship("deric", "spouse") ) &&
        getTimePeriod(player) === "morning" &&
        currentHouseHasFurniture(player, "luxuryTeaSet") &&
        canNpcVisitHouse(player, "deric") &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "데릭은 오늘은 일정이 많다고 말하며 아무렇지도 않게 당신의 고급찻잔을 꺼냈다. 그는 커피를 타며 이 커피는 귀족들도 잘 못 먹는 커피라고 말해주었다. 당신의 방안에 고소한 커피 냄새가 맴돈다." +
                        "<br><br>\"물론 나도 즐겨먹는 편은 아니지만, 이렇게 일이 많을 때는 마셔줘야지. 컨디션이 안 좋아서 일을 망치는 건 프로가 아니잖니.\"<br><br>" +
                        "그는 두 잔을 타더니 당신에게도 한 잔을 내밀었다. 그가 탄 커피는 쓰면서도 고소했다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 그에게 커피가 너무 쓰다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "데릭은 당신을 내려다보다가 어쩔 수 없다는 듯 고개를 설레설레 저었다." +
                                        "<br><br>\"역시 아가한테는 아직 일렀나 보구나?\"<br><br>" +
                                        "그는 당신의 어깨를 감싸안으며 자신의 잔을 홀짝홀짝 비웠다." +
                                        "<br><br>\"괜찮단다. 어른이 되면 이해하게 될 테니.\""
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        passTime(player, 5);
                                        changeNPCEmotion("deric", "affection", -1);
                                        changeNPCEmotion("deric", "rage", 3);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 그의 커피를 맛있게 마셨다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신이 커피를 마시는 모습을 보며 데릭은 만족스러운 표정을 지었다. 그는 커피의 맛을 제대로 아는 사람은 드문데 당신은 커피의 맛을 제대로 아는 사람인 것 같아서 다행이라고 말했다." +
                                        "<br><br>\"하긴, 그래야 내 옆에 있을 사람이지.\""
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        passTime(player, 5);
                                        changeNPCEmotion("deric", "affection", 2);
                                        changeNPCEmotion("deric", "rage", -3);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 그에게 일정이 그렇게 많냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"평소에도 바쁘긴 하지만 지금은 또 시즌이라서 말이지.\"<br><br>" +
                                        "데릭은 어깨를 으쓱이더니 자신의 일정을 줄줄줄 말해주었다. 데릭은 당신의 예상보다 훨씬 더 많은 일들을 하고 있었다. 당신이 소소한 일들은 직접 할 필요는 없지 않냐고 묻자 데릭은 고개를 저었다." +
                                        "<br><br>\"마음에 안 들게 하는 놈들이 많아서, 두 번 보느니 차라리 내가 한 번에 보는 게 낫단다.\"<br><br>" +
                                        "그는 자신이 하는 일들에 대해 더 많이 말해주었다. 끝나지 않을 것 같다...."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        passTime(player, 25);
                                        changeStamina(player, -20);
                                        changeNPCEmotion("deric", "affection", 3);
                                        changeNPCEmotion("deric", "dominance", 5);
                                        changeNPCEmotion("deric", "rage", -5);
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
    id: "deric_goldenRose_01",

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("deric", "lover") || hasNpcRelationship("deric", "spouse") ) &&
        getTimePeriod(player) === "night" &&
        canNpcVisitHouse(player, "deric") &&
        currentHouseHasFurniture(player, "goldenRose")&&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "데릭은 당신의 황금 장미를 손으로 돌리며, 가벼워 보이기는 해도 세심한 손짓이었다, 황금 사과의 이야기가 떠오른다고 말했다. 그는 황금 장미를 당신에게 내밀며, 자신이라면 그래도 미의 여신에게 줬을 거라고 말했다." +
                        "<br><br>\"아무리 다른 것이 탐난다고 해도 아름다움을 속이고 싶진 않단다.\"<br><br>" +
                        "당신이 황금 장미를 받으려고 하자 그는 장난스럽게 손을 튕겨 황금 장미를 아슬아슬하게 닿지 못하게 했다. 당신이 쳐다보자 그는 웃으며 황금 장미로 당신의 입술을 톡 쳤다." +
                        "<br><br>\"아름다움은 조금만 놓쳐도 금방 지나가버리니까 말이야. 그것만으로도 가치가 있는 법이지.\""
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 데릭의 입술을 손으로 톡 쳤다. 그리고 당신의 말에 공감한다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"...\"<br><br>" +
                                        "데릭은 당신이 자신의 입술을 치자 눈을 깜박이다가 어이없다는 듯이 웃었다. 그의 입꼬리는 비틀어 올라가 있었다." +
                                        "<br><br>\"정말 도발적이구나, 아가.\"<br><br>" +
                                        "그는 대체 어디서 이리 앙큼한 물이 든 거냐고 물으며 당신을 끌어안았다. 데릭에게 안긴 당신은 그의 입술을 피할 수가 없었다..."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("deric", "affection", 1);
                                        changeNPCEmotion("deric", "lust", 5);
                                        changeNPCEmotion("deric", "dominance", 3);
                                        changeSensitivity(player, "mSensitivity", 3);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 외양의 아름다움은 금방 지나가지만 내면의 아름다움은 금방 지나가지 않는다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"...글쎄. 나도 네 말이 맞았으면 좋겠구나.\"<br><br>" +
                                        "데릭이 황금 장미로 자신의 입술을 가려버려서 당신은 지금 그가 무슨 표정을 짓고 있는지 볼 수 없었다. 당신이 알 수 있는 건 그의 녹안이 평소보다 더 어두워졌다는 것뿐이었다." +
                                        "<br><br>\"...그거 아니? 난 네 순진한 눈동자에 접근했단다.\"<br><br>" +
                                        "데릭은 미소를 지었다." +
                                        "<br><br>\"그때는 그런 눈동자를 다시는 못 볼 줄 알았거든.\""
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("deric", "affection", 3);
                                        changeNPCEmotion("deric", "rage", -3);
                                        changeNPCEmotion("deric", "dominance", -5);
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
    id: "deric_dericEricDoll_01",

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("deric", "lover") || hasNpcRelationship("deric", "spouse") ) &&
        ["dawn", "night"].includes(getTimePeriod(player)) &&
        canNpcVisitHouse(player, "deric") &&
        !player.flags?.ericDie &&
        currentHouseHasFurniture(player, "dericEricDoll")&&
        Math.random() < 0.06,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "데릭에릭인형을 본 데릭은 멈칫하더니 낄낄 웃었다. 그는 손가락으로 에릭 인형의 이마를 통통 튕기며 다른 건 몰라도 표정이 쏙 닮았다고 말했다. 그는 어렸을 때부터 에릭은 항상 똑같은 표정이었다고 말하며 인형의 표정을 똑같이 따라했다. 우와. 좀 다르긴 하지만 순간 에릭 같아 보이긴 했다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 순간 정말 에릭인 줄 알았다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"뭐? 내가 훨씬 잘생겼지, {dericTitle}. 자, 잘 보렴.\"<br><br>" +
                                        "데릭은 데릭에릭 인형을 나란히 세우며 인형에서부터 둘이 다른 점이 확연히 드러나지 않냐고 물었다." +
                                        "<br><br>\"물론 난 인형보다 잘생겼지만.\"<br><br>" +
                                        "...대체 두 인형이 표정 말고 뭐가 다른지 모르겠다. 데릭은 열심히 설명해주었다. 그 설명을 듣는다고 해서 이해가 되는 건 아니었지만...."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("deric", "affection", -2);
                                        passTime(player, 5);
                                        changeStamina(player, -5);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 인형 옷을 평가하고 있는 데릭에게 데릭이랑 인형이랑 똑닮지 않았냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"아니? 내가 훨씬 더 잘생겼지.\"<br><br>" +
                                        "그는 제 인형의 이곳저곳을 가리키며 자신과 인형의 다른 점을 설파했다. 어쩐지 또 길어질 것만 같다...."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        passTime(player, 5);
                                        changeStamina(player, -5);
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

window.EVENTS.push({
    id: "eric_ericBasket_01",

    condition: (player) =>
        player.justMoved &&
        ["upperHouse", "underHouse"].includes(player.location) &&
        ( hasNpcRelationship("eric", "lover") || hasNpcRelationship("eric", "spouse") ) &&
        ["dawn", "night"].includes(getTimePeriod(player)) &&
        currentHouseHasFurniture(player, "ericBasket") &&
        canNpcVisitHouse(player, "eric") &&
        !player.flags?.ericDie &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "노크 후, 당신의 집에 들어온 에릭은 당신이 권해준 자리에 앉아있다가 집안 한곳에 놓인 바구니를 보았다. 그는 자리에서 일어나더니 빈 바구니에 견과류를 채웠다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 에릭에게 같이 먹자고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "에릭은 당신의 말에 멈칫하더니 견과류가 담긴 바구니를 당신의 앞으로 가져왔다. 그는 도토리 하나를 능숙하게 까더니 당신의 입앞으로 내밀었다. 당신이 먼저 먹기 전에는 먹지 않을 생각인 것 같다..." +
                                        "<br><br>...분명 같이 먹기로 했는데 어쩌다보니 당신이 2/3 이상을 먹어버린 것 같다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeStamina(player, 50);
                                        changeHP(player, 50);
                                        passTime(player, 15);
                                        changeNPCEmotion("eric", "affection", 2);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 에릭에게 항상 견과류를 주워오는 거냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"보이는 걸 줍는 것뿐이다.\"<br><br>" +
                                        "그는 호두 하나를 똑 부러뜨리더니 그 안에 든 알맹이를 당신의 입앞으로 내밀었다." +
                                        "<br><br>\"줄 사람도 있으니.\"<br><br>" +
                                        "당신은 그에게 견과류를 받아먹었다. 에릭은 익숙하게 당신에게 견과류를 먹여주었다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeStamina(player, 50);
                                        changeHP(player, 50);
                                        passTime(player, 15);
                                        changeNPCEmotion("eric", "affection", 1);
                                        changeNPCEmotion("eric", "dominance", 3);
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
    id: "eric_roseBunch_01",

    condition: (player) =>
        player.justMoved &&
        ["underHouse", "upperHouse"].includes(player.location) &&
        ( hasNpcRelationship("eric", "lover") || hasNpcRelationship("eric", "spouse") ) &&
        getTimePeriod(player) === "night" &&
        canNpcVisitHouse(player, "eric") &&
        currentHouseHasFurniture(player, "roseBunch")&&
        Math.random() < 0.06,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "당신과 함께 앉아있던 에릭의 시선이 꽃다발에 닿았다. 그의 시선은 생각보다 오래 그 꽃다발에 매달려 있었다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 꽃다발을 가져오며 5월의 장미는 자기라고 말했다. 나 예쁘지?",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"....\"<br><br>" +
                                        "당신의 애교스러운 표정을 물끄러미 바라보던 에릭은 아무렇지도 않게 꽃다발의 꽃 중 하나를 당신의 귀 뒤에 꽂아주었다. 그가 당신의 뒤에 꽂은 장미는 푸른색 장미였다." +
                                        "<br><br>\"...잘 어울린다.\"<br><br>" +
                                        "그의 입가에 은은한 미소가 걸렸다. 금방 없어질 듯 희미하면서도, 당신이 푸른색 장미를 귀뒤에 꽂고 있는 동안은 없어지지 않았다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("eric", "dominance", -1);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 에릭에게 꽃을 좋아하냐고 물었다",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "에릭은 꽃을 좋아하긴 하지만 꽃의 이름들은 잘 모른다고 말했다." +
                                        "<br><br>\"...푸른 장미의 꽃말이 기적이라는 건 안다.\"<br><br>" +
                                        "그는 꽃다발에서 푸른 장미를 당신 쪽으로 기울이며 말했다. 그는 당신을 똑바로 바라보기만 할 뿐 더 말을 붙이진 않았지만, 당신은 어쩐지 그가 지금 당신을 바라보며 무슨 생각을 하고 있는지 알 것만 같았다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("eric", "affection", 1);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 에릭도 다음 5월의 장미에 참가하면 안 되냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"...아니.\"<br><br>" +
                                        "에릭은 꽤 단호했다. 그는 데릭이 그 축제에 참가하는 이상 자신은 절대로 참가하지 않을 거라고 말했다." +
                                        "<br><br>\"...날 볼 때마다 웃는 꼴은 보고 싶지 않다.\"<br><br>" +
                                        "당신이 장화신은 고양이 눈으로 애원한다고 해도 이 부탁만은 안 들어줄 것 같다..."
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

window.EVENTS.push({
    id: "eric_dericEricDoll_01",

    condition: (player) =>
        player.justMoved &&
        ["underHouse", "upperHouse"].includes(player.location) &&
        ( hasNpcRelationship("eric", "lover") || hasNpcRelationship("eric", "spouse") ) &&
        ["dawn", "night"].includes(getTimePeriod(player)) &&
        canNpcVisitHouse(player, "eric") &&
        !player.flags?.ericDie &&
        currentHouseHasFurniture(player, "dericEricDoll")&&
        Math.random() < 0.06,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "에릭은 당신의 데릭에릭 인형을 보고 잠시 숨을 멈췄다. 그의 시선은 데릭과 에릭 인형의 맞잡은 손에 붙어 있었다." +
                        "<br><br>\"...우리는 단 한 번도 손을 저렇게 잡은 적이 없다.\"<br><br>" +
                        "그는 진지하게 인형의 맞잡은 손을 노려보며 말했다. 그는 질색하는 표정을 지으며 인형에게서 시선을 돌렸다." 
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 지금부터라도 손을 잡고 다니는 건 어떻냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"...\"<br><br>" +
                                        "에릭은 말이 없다. 그리고 당신은 등골에 서늘한 땀이 흐르는 걸 느꼈다..."
                                    ]
                                }
                            ]
                        },
                        {
                            text : "당신은 정말 단 한 번도 손을 잡고 다닌 적이 없냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신의 말에 에릭은 바로 없다고 말하지 않았다. 그는 정말로 기억을 더듬는 듯 잠시 생각에 잠겼다." +
                                        "<br><br>\"없다. 그놈은 내 손을 잡는 것보다는 다른 사람 손을 잡는 걸 좋아했어.\"<br><br>" +
                                        "긴 생각 끝에 그는 결론을 정리하고 당신에게 고개를 끄덕여보였다. 정말로 손을 잡고 다닌 적이 없는 모양이다..."
                                    ]
                                }
                            ]
                        },
                        {
                            text : "당신은 인형들이 귀엽지 않냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "에릭은 당신의 말에 인형들을 힐끔 보더니 잘 모르겠다고 대꾸했다." +
                                        "<br><br>\"...네 인형이니까, 네가 좋으면 된 거겠지.\""
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

window.EVENTS.push({
    id: "kain_kainSignFrame_01",

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("kain", "lover") || hasNpcRelationship("kain", "spouse") ) &&
        ["morning", "night"].includes(getTimePeriod(player)) &&
        currentHouseHasFurniture(player, "kainSignFrame") &&
        canNpcVisitHouse(player, "kain") &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "공연까지 시간이 좀 남아서 찾아왔다는 카인은 집에 오자마자 주변을 둘러보았다. 그는 자신의 사인 액자를 발견하더니 입꼬리를 올렸다. 그는 당신과 함께 앉아 지금까지 했던 공연들에 대해 이야기했다. 가끔 공연의 줄거리를 들려주다가, 당신이 그 등장인물이었다면 어떻게 했을 것 같냐고 묻기도 했다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 그에게 성심성의껏 대답해주었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신의 대답에 카인은 진지한 얼굴로 고개를 끄덕였다. 그는 역시 사람마다 등장인물을 받아들이는 방법은 다른 것 같다고 말하며, 다른 시각에서 보니까 대사가 조금 더 이해되는 것 같다고 말했다. 그는 작게 흥얼거리며 그 대사를 노래했다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("kain", "affection", 3);
                                        passTime(player, 15);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 사인 액자가 그렇게 신경쓰였냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"...뭐, 뭐? 아니거든?\"<br><br>" +
                                        "카인은 얼굴이 붉어지더니 그저 사인 액자가 있길래 시선이 간 거라고 변명했다. 그는 잠시 고개를 숙이고 있다가 어쨌든 네가 자신을 생각해서 자신의 사인 액자를 걸어놓은 거 아니냐고 물었다." +
                                        "<br><br>\"시선이 계속 가는 데 어떡하라고... 하.\"<br><br>" +
                                        "자신이 방금 무슨 말을 했는지 깨달은 카인은 마른 세수를 하더니 이만 가보겠다고 말하며 몸을 일으켰다. 그의 얼굴은 집밖으로 나갈 때까지도 붉었다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("kain", "affection", 1);
                                        changeNPCEmotion("kain", "lust", 5);
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
    id: "kain_kainPoster_01",

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("kain", "lover") || hasNpcRelationship("kain", "spouse") ) &&
        currentHouseHasFurniture(player, "kainPoster") &&
        ["afternoon", "night"].includes(getTimePeriod(player)) &&
        canNpcVisitHouse(player, "kain") &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "\"...너, 너 이게 뭐야!\"<br><br>" +
                        "당신의 집에 들른 카인은 벽에 붙어있는 포스터를 보자마자 얼굴이 새빨갛게 달아올랐다. 그는 당신과 자신의 포스터 사이에 서며 이런 걸 네가 왜 갖고 있냐고 묻다가 당신이 대답하려고 하자 대답하지 말라고 고개를 저었다. 그는 거칠게 숨을 몰아쉬더니 자신의 머리를 대충 쓸어넘겼다." +
                        "<br><br>\"하, 씨....\""
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 그에게 불편하면 포스터를 떼겠다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"뭐? 안 불편해!\"<br><br>" +
                                        "그는 마치 포스터를 지키듯이 가로막더니 당신을 노려보았다. 그는 자신이 이런 걸로 흔들릴 것 같냐고 금방이라도 터질 것 같은 얼굴로 물었다. 그는 자신의 포스터를 붙이고 싶으면 붙여도 된다고 말했다." +
                                        "<br><br>...그 후로 몇 분 동안 다른 이야기를 나누었지만, 카인의 얼굴색은 붉은색에서 돌아올 생각을 안 했다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("kain", "affection", 2);
                                        changeNPCEmotion("kain", "lust", 5);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 포스터보다 역시 실물이 더 좋다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "안 그래도 붉어졌던 카인의 얼굴이 당신의 말 떄문에 더 붉어졌다. 그는 괜히 목소리를 높이려다가 당신의 얼굴을 보고 다시 고개를 푹 숙였다." +
                                        "<br><br>\"나도 그럴 거야.\"<br><br>" +
                                        "당신이 고개를 들어 카인을 바라보자 카인은 입술을 씹더니 한 마디를 더 덧붙였다.<br><br>" +
                                        "\"네가 있는 포스터라면 당연히 가지겠지만.... 역시 포스터보다는 네 실물이 더 좋아.\""
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("kain", "affection", 4);
                                        changeNpcSuspicion("kain", -5);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 그에게 쑥스러운 거냐고 놀리듯이 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"...그럼, 안 쑥스럽겠어?\"<br><br>" +
                                        "카인이 당신의 허리를 잡고 끌어당겼다. 순식간에 가까워진 거리, 그의 숨결이 당신의 입술 바로 위에서 느껴졌다." +
                                        "<br><br>\"내가 없을 때도.... 네가 내 얼굴을 보고 있다는 거잖아.\"<br><br>" +
                                        "그의 주황색 눈동자는 당신만을 담고 있었다. 카인은 천천히 당신의 입술 위로 자신의 입술을 묻었다. 그는 작게 속삭였다, 그 사실만으로도 자신의 심장이 얼마나 뛰는지 당신은 평생 모를 거라고. 그의 입술에서부터 당신은 그의 빠른 심장 박동 소리를 느꼈다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("kain", "affection", 1);
                                        changeSensitivity("player", "mSensitivity", 4);
                                        changeNPCEmotion("kain", "lust", -10);
                                        changeNpcSuspicion("kain", -5);
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
    id: "kain_kainPoster_02",

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("kain", "lover") || hasNpcRelationship("kain", "spouse") ) &&
        currentHouseHasFurniture(player, "kainRarePoster")&&
        ["dawn", "night"].includes(getTimePeriod(player)) &&
        canNpcVisitHouse(player, "kain") &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "늦은 밤, 카인은 일정이 늦게 끝났다고 말하며 문밖으로 나온 당신을 끌어안았다. 당신이 품안에서 꼼지락거리자 카인은 가만히 좀 있으라고 말하며 키득키득 웃었다. 그는 당신과 함께 집안으로 들어섰다." +
                        "<br><br>\"....\"<br><br>" +
                        "집안에 대놓고 있는 자신의 한정 포스터에 카인의 얼굴이 붉어졌다. 그는 힐끔힐끔 자신의 한정 포스터를 보다가 마른 세수를 하며 한숨을 쉬었다. 그리고 자신의 포스터보다는 당신의 포스터를 만들고 싶다고 말했다." +
                        "<br><br>\"너만 내 포스터 갖고 있는 건 좀 치사하잖아.\"<br><br>" +
                        "그는 얼토당토 없는 소리를 하며 투덜거렸다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 카인은 연예인이니 당연한 거라고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"당연한 게 어딨어. 데릭이 그럼 연예인이냐? 황금동상도 있으니 그럼 걘 대대대연예인이겠네.\"<br>" +
                                        "<br>카인은 투덜거리며 고개를 저었다. 그는 혹시라도 연예인을 할 생각은 하지도 말라고 말했다. 당신이 그를 쳐다보자 카인은 당황하더니 입술을 꾹 다물었다." +
                                        "<br><br>\"아니, 물론... 네가 진지하게 하겠다고 하면 막지 않을 거야. 그렇지만.... 씨발, 네가 데릭한테 더 휘둘릴 거라는 생각을 하면.\"<br><br>" +
                                        "그는 다시 한 번 데릭과는 가까이 하지 말라고 말했다. 특히 연예계 쪽으로는 더더욱."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("kain", "rage", 1);
                                        changeNpcSuspicion("kain", 1);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 카인의 포스터를 더 갖고 싶다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"네가 내 포스터 훨씬 많이 가지고 있는데.\"<br><br>" +
                                        "자기 포스터인데도 자기가 안 갖고 있는 거냐고 묻자 카인은 어깨를 으쓱이더니 자신은 단 한 번도 제 포스터를 가져본 적이 없다고 말했다. 그래도 그는 자신의 포스터가 비싼 건 알고 있다고 말했다. 한정수량 포스터라면 특히나 더." +
                                        "<br><br>\"가격을 알아서.... 네가 내 포스터를 가지고 있다는 게 기쁘긴 해.\"<br><br>" +
                                        "그는 작은 목소리로 중얼거리듯이 말하다가 다시 투덜거리며 당신을 꼬옥 끌어안았다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("kain", "affection", 2);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 한정 포스터의 카인 포즈를 똑같이 따라했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"야이씨, 그만 안 해?\"<br><br>" +
                                        "카인은 마치 자신의 흑역사를 보는 것마냥 행동했다. 그는 거칠게 당신의 손목을 잡아채더니 그대로 당신을 자신의 품에 가두어버렸다. 당신이 계속 장난을 치자 카인은 어이가 없다는 듯 당신을 내려다보았다." +
                                        "<br><br>\"내가 하고 싶어서 한 포즈도 아니거든?\"<br><br>" +
                                        "그는 놀리지 말라고 투덜거리면서도 당신을 제 품에서 놓아주지는 않았다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("kain", "affection", 1);
                                        changeNPCEmotion("kain", "dominance", 5);
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
    id: "kain_roseSmell_01",

    condition: (player) =>
        player.justMoved &&
        ["upperHouse", "underHouse"].includes(player.location) &&
        ( hasNpcRelationship("kain", "lover") || hasNpcRelationship("kain", "spouse") ) &&
        ["afternoon", "night"].includes(getTimePeriod(player)) &&
        canNpcVisitHouse(player, "kain") &&
        currentHouseHasFurniture(player, "roseSmell")&&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "\"아, 이 향....\"<br><br>" +
                        "카인은 당신의 집에 들어오자마자 인상을 찌푸렸다. 그는 주변을 둘러보다가 장미 향수를 보더니 납득했다는 듯 고개를 끄덕였다. 그는 당신의 눈치를 살피다가 조심스럽게 입을 열었다." +
                        "<br><br>\"...넌 저런 거 좋아해?\""
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 장미 향수는 누구나 좋아하지 않냐며 되물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"그런가.\"<br><br>" +
                                        "카인은 당신의 말에 생각에 잠기더니 고개를 끄덕였다. 하긴 자신의 주변에도 장미 향수를 좋아하는 사람은 많다고 그는 말했다." +
                                        "<br><br>\"나는 싫어하지는 않아. 다만, 네 냄새가 안....\"<br><br>"+
                                        "그는 말을 하려다가 급하게 입을 다물었다. 얼굴이 붉어진 채로 그는 당신에게서 고개를 돌렸다."
                                    ]
                                }
                            ]
                        },
                        {
                            text : "당신은 카인이 이 냄새가 불편하다면 치우겠다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"뭐? 아냐. 불편하지 않아.\"<br><br>" +
                                        "카인은 장미 향수를 치우려는 당신의 손을 제지했다. 그는 장미 향수와 당신을 번갈아보다가 푹 한숨을 쉬며 장미 향수는 오히려 그에게 익숙한 냄새라고 말했다." +
                                        "<br><br>\"예전에 많이 뿌렸어야 했거든.\"<br><br>" +
                                        "에이씨, 그는 고개를 털더니 아무튼 자신은 장미향이 불편하지 않다고 말했다. 그는 당신의 손을 꼭 잡은 채 다른 얘기나 하자고 투덜거렸다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("kain", "affection", 2);
                                        changeNPCEmotion("kain", "rage", -3);
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
                                        "\"그래?\"<br><br>" +
                                        "그는 장미향수를 바라보다가 고개를 끄덕였다." +
                                        "<br><br>\"...언젠가는 사줄게. 진짜로.\"<br><br>" +
                                        "무슨 생각을 하는지, 카인은 당신과 이야기를 하면서도 다른 생각에 잠겨 있었다."
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
                                        "루크는 당신의 행동에 놀란 듯 움직임이 순간 굳었다. 하지만 그것도 잠시 낮게 웃으며 그는 당신의 뒤통수를 한손으로 감싸안으며 키스를 받아주었다. 쪽쪽거리는 소리가 민망할 정도로 크게 울린다. 긴 키스가 끝나고 루크는 당신에게서 입술을 떼며 \"엄청 까부네?\"라고 낮게 속삭였다. 그는 당신을 제 무릎 위에 올리더니 다시금 키스를 해왔다. 당신은 그의 손이 당신의 가슴 위로 슬금슬금 올라오는 것을 느꼈다." +
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
window.EVENTS.push({
    id: "matin_nikolai_doll",

    condition: (player) =>
        player.justMoved &&
        player.location === "underHouse" &&
        ( hasNpcRelationship("matin", "lover") || hasNpcRelationship("matin", "spouse") ) &&
        getTimePeriod(player) === "night" &&
        canNpcVisitHouse(player, "matin") &&
        currentHouseHasFurniture(player, "nikolaiDoll")&&
        Math.random() < 0.07,

    action: (player) => {
        addItem(player, ITEMS.consumable.greatSalmonSushi);
        savePlayer(player);

        startScene(
            [
                {
                    type : "text",
                    value : [
                        "당신의 집에 들른 마틴은 당신이 밥을 안 먹었을 것 같아서 연어 초밥을 따로 챙겨왔다고 말했다. 당신은 마틴에게서 연어 초밥을 받으며 오늘 주점 일은 어땠냐고 물었다. 마틴은 주점 일은 언제나 똑같다고 대답하면서도 오늘 있었던 사소한 일에 대해서 가볍게 말해주었다." +
                        "<br>그는 연어초밥을 식탁에 차리다가 문득 니콜라이 인형을 바라보았다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 마틴 인형도 갖고 싶다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"...그게 무슨 소리야.\"<br><br>" +
                                        "마틴은 당신에게서 고개를 돌리며 밥이나 먹으라고 말했다. 그는 넥타르 소스를 연어 초밥 위로 살살 뿌렸다. 이상하다. 특별한 방법이 아닌데도 그의 연어 초밥은 더 맛있어 보였다." +
                                        "<br><br>\"남은 건 나중에 출출할 때 먹어.\"<br><br>" +
                                        "마틴은 남은 음식은 용기에 싸주며 말했다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("matin", "affection", 1);
                                        passTime(player, 15);
                                        changeHP(player, 75);
                                        changeStamina(player, 30);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 \"안녕, 미니 니콜라이\"라고 니콜라이 인형에게 인사했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "마틴의 눈동자가 순간 떨렸다. 당신은 니콜라이 인형에게 손인사까지 해준 후 마틴과 함께 식탁 앞에 앉았다. 마틴은 앉으면서도 당신과 니콜라이 인형을 번갈아보다가 픽 웃었다. 다시 무표정으로 돌아오긴 했지만 그는 분명 피식 웃었다." +
                                        "<br><br>\"남은 음식은 나중에 출출할 때 먹어.\"<br><br>" +
                                        "당신을 바라보는 마틴의 검은색 눈동자는 평소보다 더 부드러웠다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("matin", "affection", 2);
                                        changeHP(player, 75);
                                        changeStamina(player, 30);
                                        passTime(player, 15);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 아무렇지도 않게 일상 이야기를 이어갔다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "니콜라이 인형을 응시하던 마틴은 당신이 이야기를 이어가자 곧 시선을 돌리고 당신에게 집중했다. 당신은 그와 함께 연어초밥을 먹었다." +
                                        "<br><br>\"남은 건 나중에 출출할 때 먹어.\""
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("matin", "affection", 1);
                                        changeHP(player, 75);
                                        changeStamina(player, 30);
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

window.EVENTS.push({
    id: "nikolai_roseBed_01",

    condition: (player) =>
        player.justMoved &&
        ["upperHouse", "underHouse"].includes(player.location) &&
        ( hasNpcRelationship("nikolai", "lover") || hasNpcRelationship("nikolai", "spouse") ) &&
        ["night", "dawn"].includes(getTimePeriod(player)) &&
        !player.flags?.nikolaiDie &&
        ["redRoseBed", "greenRoseBed", "blueRoseBed", "blackRoseBed"].some(id => currentHouseHasFurniture(player, id)) &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "마카롱을 들고 당신의 집에 들어온 니콜라이는 장미 침대에 폴짝 앉았다. 그는 엉덩이로 침대의 탄력성을 시험하며 역시 상류도시는 돈을 많이 쓴다고 말했다." +
                        "<br><br>\"뭐, 그래서 좋은 거지만.\"<br><br>" +
                        "그는 침대 위에서 마카롱을 먹으면 흘릴 수도 있으니 이건 이따가 먹자고 말하며 엉덩이로 통통 튀었다." +
                        "<br><br>\"5월의 장미 때 자기는 정말 아름다웠지. 처음 자기를 봤을 때부터 생각했지만 자기는 정말 될 사람이었다니까?\""
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 다른 사람의 눈은 필요 없고 니콜라이의 눈이 제일 중요하다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"어머, 자기, 거짓말인 건 알아도 너무 감동적이긴 하다.\"<br><br>" +
                                        "그는 당신에게 찡긋 윙크를 해보이더니 자신의 눈에는 당신이 언제나 1등일 거라고 말했다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("nikolai", "affection", 1);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 니콜라이에게 자신의 어떤 점이 좋았던 거냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"응? 그냥 전부.\"<br><br>" +
                                        "니콜라이는 당신은 처음 봤을 때부터 아름다웠다고 말했다. 그는 천성적인 아름다움은 어떻게 묘사해야 할지 모르겠다고 말하며 깔깔 웃었다. 당신이 뾰로퉁한 표정을 짓자 니콜라이는 당신을 끌어안으며 속삭였다." +
                                        "<br><br>\"물론 나는 자기의 눈동자가 제일 좋긴 했어. 그 눈동자가... 내 시선을 끌었거든.\""
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("nikolai", "affection", 1);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 니콜라이도 한 얼굴 하지 않냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "니콜라이는 당신의 말에 깔깔 웃었다. 그는 자신의 피부를 손가락으로 튕기더니 이건 다 노력이라고 말했다." +
                                        "<br><br>\"그리고 자기는 천연인 거고.\"<br><br>" +
                                        "니콜라이는 그건 소중한 보물이니 꼭 간직해야 한다고 말했다. 그는 외모만큼 불공평한 무기는 없다고 말하며, 손을 뻗어 당신의 피부를 만지작거렸다." +
                                        "<br><br>\"필요하면 관리는 내가 도와줄게, {nikolaiTitle}.\""
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

//창백

//라파엘

//시온
window.EVENTS.push({
    id: "sion_kainPoster",

    condition: (player) =>
        player.justMoved &&
        ["underHouse", "upperHouse"].includes(player.location) &&
        ( hasNpcRelationship("sion", "lover") || hasNpcRelationship("sion", "spouse") ) &&
        ( currentHouseHasFurniture(player, "kainRarePoster") || currentHouseHasFurniture(player, "kainPoster") ) &&
        ["afternoon", "night"].includes(getTimePeriod(player)) &&
        !player.flags.darkSion &&
        canNpcVisitHouse(player, "sion") &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type  : "text",
                    value : [
                        "간식거리와 함께 당신의 집을 찾은 시온은 카인의 포스터를 보자마자 인상을 찌푸렸다. 그는 카인의 포스터를 떼내려다가도 이성을 붙잡고 당신을 돌아보았다. 장밋빛 눈동자가 벌써부터 그렁그렁하다." +
                        "<br><br>\"...제가 더 잘생겨질 거예요. 전 아직 어리고, 아직 제대로 꾸민 적도 없으니까요.\"<br><br>" +
                        "시온은 포스터 앞에 서더니 포스터 속에 있는 카인과 똑같은 포즈를 취해보였다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 시온에게 멋지다고 말해주었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "시온은 당신의 말 한 마디에 바로 표정이 풀렸다. 그는 당신이 그렇게 생각하고 있다면 됐다고 말하며, 당신이 아닌 다른 사람들의 의견은 중요하지 않다고 말했다. 그는 의도적으로 카인의 포스터를 가리고 선 채 당신과 이야기를 나누었다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("sion", "affection", 3);
                                        changeNPCEmotion("sion", "rage", -3);
                                        passTime(player, 15);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 진지하게 연예인과 일반인은 다른 법이라고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"...조금만 기다리세요. 제가 더 잘생겨질 테니까.\"<br><br>" +
                                        "시온은 서늘하게 말했다. 그의 서늘한 시선은 당신이 아니라 카인의 포스터를 향하고 있었다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("sion", "affection", -5);
                                        changeNPCEmotion("sion", "dominance", -5);
                                        changeNPCEmotion("sion", "rage", 3);
                                        changeNpcSuspicion("sion", 3);
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
    id: "sion_roseBed_01",

    condition: (player) =>
        player.justMoved &&
        ["upperHouse", "underHouse"].includes(player.location) &&
        ( hasNpcRelationship("sion", "lover") || hasNpcRelationship("sion", "spouse") ) &&
        getTimePeriod(player) === "morning" &&
        !player.flags.darkSion &&
        ["redRoseBed", "greenRoseBed", "blueRoseBed", "blackRoseBed"].some(id => currentHouseHasFurniture(player, id)) &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "\"일어나셨어요?\"<br><br>" +
                        "당신이 침대에서 눈을 뜨자 시온이 미소를 지으며 당신을 반겨주었다. 이상하다, 어제 집 문을 열어준 기억은 없는데.... 시온은 장미 침대 위에서 자는 당신이 숲속의 잠자는 공주님 같았다고 말했다. 그는 당신의 옆에 앉아 장미 침대 이불보를 만지작거리며 다음에는 역시 하얀 꽃보다는 장미가 당신에게 더 잘 어울린다고 말했다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 시온에게 대체 언제부터 자신의 집에 있었던 거냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"...오래는 안 있었어요.\"<br><br>" +
                                        "당신의 반응에 불안해진 듯 시온은 고개를 숙이고 말했다. 당신이 더 물어보자 시온은 고개를 들더니 시간이 당신에게 중요하냐고 물었다." +
                                        "<br><br>\"그냥 제가 당신의 곁에 있고 싶어서 있었던 것뿐이에요. 그게 제일 중요한 거 아닌가요, 영웅님?\"<br><br>" +
                                        "그는 자신을 미워하지 말아달라고 말하며 당신의 무릎에 이마를 묻었다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("sion", "affection", -2);
                                        changeNPCEmotion("sion", "dominance", -5);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 시온의 온기에 뺨을 기대며 더 자고 싶다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "시온은 당신의 잠투정에 웃었다. 그는 그 누구도 자는 영웅님 곁에 오지 못하도록 지킬 테니 편안하게 자라고 말했다." +
                                        "<br><br>\"자장자장...\"<br><br>" +
                                        "그는 당신의 등을 두드리며 속삭이듯이 말했다. 음정은 조금 이상하지만 그의 부드러운 목소리에 당신의 눈이 점점 감기기 시작했다...." +
                                        "<br><br>당신은 그의 곁에서 편안하게 잠에 들었다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("sion", "affection", 3);
                                        changeNPCEmotion("sion", "dominance", 2);
                                        changeHP(player, 100);
                                        changeStamina(player, 70);
                                        passTime(player, 50);
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

window.EVENTS.push({
    id: "valen_ericBasket_01",

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("valen", "lover") || hasNpcRelationship("valen", "spouse") ) &&
        ["dawn", "morning"].includes(getTimePeriod(player)) &&
        !player.flags?.valenDie &&
        currentHouseHasFurniture(player, "ericBasket") &&
        canNpcVisitHouse(player, "valen") &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "몇몇 고급 과일들과 함께 당신의 집을 찾아온 발렌은 깎아놓은 과일을 자신이 가져온 그릇 위로 옮기며 주변을 둘러보았다. 그는 바구니를 보더니 미소를 지었다." +
                        "<br><br>\"오랜만에 보는 군요. 에릭은 언제나 특이하긴 했죠.\"<br><br>" +
                        "그는 어려서부터 에릭이 친구들과 어울리기보다는 혼자 돌아다니는 것을 좋아했었다고 말했다." +
                        "<br><br>\"아, 물론 그건 지금도 그런 것 같지만.\""
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 그래도 에릭이 예전에는 당신들과 돌아다녔던 거 아니냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"어렸을 때는 같이 돌아다니고는 했죠. 하지만 이제 저희는 성인이고.\"<br><br>" +
                                        "발렌은 잠시 말을 멈췄다. 그의 푸른색 눈동자가 부드럽게 휘어졌다. 하지만 그 청안 안에는 온기가 없었다." +
                                        "<br><br>\"각자 길을 정했으니까요. 당신이 저의 곁에서 저와 함께 걷기로 했듯이.\"<br><br>" +
                                        "그는 당신과 함께 과일을 먹으며 더 많은 얘기를 나누었다. 이야기 내내 그는 자신의 어린 시절에 대해서 말하는 걸 꺼렸다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        passTime(player, 10);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 그럼 발렌은 친구들과 어울리는 것을 더 좋아하냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"...친구들?\"<br><br>" +
                                        "발렌은 웃더니 당신이 생각하는 의미의 친구라면 자신에게는 한 명밖에 남지 않았다고 말했다. 그러더니 그는 당신 쪽으로 몸을 기울였다." +
                                        "<br><br>\"물론 당신은 연인이고요. 그리고 전 혼자 있는 것보다 당신과 있는 시간을 더 좋아합니다.\"<br><br>" +
                                        "발렌은 당신과 함께 과일을 먹으며 더 많은 얘기를 나누었다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("valen", "affection", 1);
                                        passTime(player, 10);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 자신도 사실 혼자 돌아다니는 것을 선호한다고 대답했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"...아닌 것 같은데요.\"<br><br>" +
                                        "발렌은 미소를 지으며 고개를 설레설레 흔들었다." +
                                        "<br><br>\"왜냐면 당신은 혼자 있는 것보다 저와 함께 있는 걸 즐기시니까요.\"<br><br>" +
                                        "발렌은 과일 한 조각을 포크로 찝더니 당신에게 내밀었다. 그의 눈은 \"안 그런가요?\"라고 묻고 있었다. 그는 당신이 당연히 고개를 끄덕일 거라고 생각하고 있다."
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

window.EVENTS.push({
    id: "valen_luxuryTeaSet_01",

    condition: (player) =>
        player.justMoved &&
        player.location === "upperHouse" &&
        ( hasNpcRelationship("valen", "lover") || hasNpcRelationship("valen", "spouse") ) &&
        getTimePeriod(player) === "afternoon" &&
        !player.flags?.valenDie &&
        currentHouseHasFurniture(player, "luxuryTeaSet") &&
        canNpcVisitHouse(player, "valen") &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "발렌은 좋은 차가 있어서 들렸다고 말하며 당신의 고급 찻잔에 미리 준비해놓은 하얀꽃 차를 탔다. 시중에 파는 하얀꽃 차보다 더 달콤한 냄새가 난다. 발렌은 앞으로의 일정을 기분 좋게 할 수 있을 것 같다고 말하며 당신의 일정을 물었다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "마을입구 밖으로 나갈 거라고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"그렇군요. 언제나처럼 믿고 있습니다, {valenTitle}.\"<br><br>" +
                                        "발렌은 당신의 손등에 가볍게 입술을 맞추며 오늘만큼은 당신에게 행운의 가호가 깃들길 바란다고 말했다. 그는 다치지 말라는 말은 안 하겠다고 말했다." +
                                        "<br><br>\"돌아오기만 하세요. 그 후는 제가 어떻게든 할 테니.\""
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("valen", "dominance", 2);
                                        changeStamina(player, 50);
                                        passTime(player, 15);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "발렌과 함께 있고 싶다고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"...하하.\"<br><br>" +
                                        "당신의 말에 일순간 굳어있던 발렌은 짧게 웃었다." +
                                        "<br><br>\"너무 유혹하지는 말아주세요. 당신의 유혹은 그 어떤 유혹보다도 강하니까.\"<br><br>" +
                                        "발렌은 차를 마시며 다음에는 시간을 내보겠다고 말했다. 당신과 발렌은 어느새 데이트 약속을 잡고 있었다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("valen", "affection", 3);
                                        changeNPCEmotion("valen", "dominance", -5);
                                        changeNPCEmotion("valen", "fear", -5);
                                        changeStamina(player, 50);
                                        passTime(player, 15);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "도시에서 남은 일들을 할 거라고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"도시에서 하는 일은 중요하죠.\"<br><br>" +
                                        "발렌은 고개를 끄덕이며 그래도 가장 중요한 건 당신의 몸상태라고 말했다. 그의 손바닥이 당신의 한쪽 뺨을 감싸안았다." +
                                        "<br><br>\"당신은 상류도시의 영웅이자, 저만의 기사님이니까요.\""
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("valen", "affection", 1);
                                        changeStamina(player, 50);
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
        !player.flags?.yuriDie &&
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

window.EVENTS.push({
    id: "yuri_kainSignFrame_01",
    once : true,

    condition: (player) =>
        player.justMoved &&
        player.location === "underHouse" &&
        ( hasNpcRelationship("yuri", "lover") || hasNpcRelationship("yuri", "spouse") ) &&
        getTimePeriod(player) === "afternoon" &&
        !player.flags?.yuriDie &&
        !player.flags?.YuriKainGoodRelationship &&
        currentHouseHasFurniture(player, "kainSignFrame"),

    action: (player) => {
        player.flags.yuri_kainSignFrame_01 = true;
        savePlayer(player);

        startScene(
            [
                {
                    type : "text",
                    value : [
                        "하류도시 바깥으로 나가려다가 당신이 집에 들어가는 걸 발견한 유리는 당신과 함께 집까지 같이 걸어갔다. 그는 온 김에 청소를 해주겠다고 말하며 당신과 함께 당신의 집에 들어섰다. 바닥과 벽을 청소하던 유리의 시선이 카인의 사인 액자에서 멈췄다." +
                        "<br><br>\"....\"<br><br>" +
                        "유리는 아무 말 없이 카인의 사인 액자를 응시했다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 카인이 상류도시에서 잘 지내고 있다고 말해주었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신의 말에 유리는 힘없이 웃었다. 그는 카인이 잘 지낼 줄 알았다고 대답했다." +
                                        "<br><br>\"카인은 그 누구보다도 무대를 사랑했던 아이니까.\"<br><br>" +
                                        "그는 카인이 상류도시에서 행복하면 됐다고 말하며 액자에서 시선을 거두었다. 그리고 그는 청소를 끝낼 때까지 단 한 번도 그 액자에 시선을 주지 않았다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        passTime(player, 15);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 카인이 여전히 당신을 그리워하고 있다고 말해주었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"...그래?\"<br><br>" +
                                        "유리는 흐릿하게 미소를 지었다. 그는 카인의 액자를 손가락으로 건드리려다가 다시 손을 거두었다. 그는 더 이상 카인의 액자에 시선을 주지 않았다." +
                                        "<br><br>\"카인이 잘 지내고 있는 것 같아서 다행이야.\""
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        passTime(player, 15);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 카인을 만나고 싶은 거 아니냐고 물었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "\"....\"<br><br>" +
                                        "유리는 당신의 말에 어떤 대답도 하지 않았다. 그는 그저 조용히 웃더니 청소를 재개했다."
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
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

window.EVENTS.push({
    id: "yuri_kainSignFrame_02",

    condition: (player) =>
        player.justMoved &&
        player.location === "underHouse" &&
        ( hasNpcRelationship("yuri", "lover") || hasNpcRelationship("yuri", "spouse") ) &&
        getTimePeriod(player) === "night" &&
        player.flags?.yuri_kainSignFrame_01 &&
        !player.flags?.yuriDie &&
        !player.flags?.YuriKainGoodRelationship &&
        currentHouseHasFurniture(player, "kainSignFrame") &&
        canNpcVisitHouse(player, "yuri") &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "당신의 집을 청소해주겠다고 온 유리는 어느 때처럼 깨끗하게 바닥과 벽을 닦아주었다. 당신은 그가 카인의 액자 근처에서도 스스럼없이 청소를 하고 있는 모습을 보았다. 하지만 멈추지 않았을 뿐, 그는 카인의 액자만큼은 닦지 않았다."
                    ]
                },
                {
                    type : "effect",
                    run : (player) => {
                        passTime(player, 15);
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
    id: "yuri_kainPoster",

    condition: (player) =>
        player.justMoved &&
        player.location === "underHouse" &&
        ( hasNpcRelationship("yuri", "lover") || hasNpcRelationship("yuri", "spouse") ) &&
        ( currentHouseHasFurniture(player, "kainRarePoster") || currentHouseHasFurniture(player, "kainPoster") )&&
        !player.flags?.yuriDie &&
        !player.flags?.YuriKainGoodRelationship &&
        ["morning", "afternoon"].includes(getTimePeriod(player)) &&
        canNpcVisitHouse(player, "yuri") &&
        Math.random() < 0.07,

    action: (player) => {
        startScene(
            [
                {
                    type : "text",
                    value : [
                        "시간이 남아서 당신의 집에 들렀다는 유리는 당신의 집 상태를 봐주다가 카인의 포스터 앞에서 멈췄다. 무슨 생각을 하고 있는 건지 그는 잠시 동안 포스터만 멍하니 바라보았다." +
                        "<br><br>...포스터를 멍하니 보고 있는 유리의 표정은 굳어 있었다."
                    ]
                },
                {
                    type : "choice",
                    choices : [
                        {
                            text : "당신은 유리에게 조용히 차를 내밀었다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "당신에게 차를 받은 유리는 희미하게 미소를 지었다." +
                                        "<br><br>\"...고마워. 너무 내가 찍었던 것과 똑같아서.\"<br><br>" +
                                        "그는 배경도, 포즈도, 시선 처리도 똑같다고 말했다." +
                                        "<br><br>\"...그가 원해서 저렇게 찍은 건 아니겠지만.\""
                                    ]
                                },
                                {
                                    type : "effect",
                                    run : (player) => {
                                        changeNPCEmotion("yuri", "affection", 2);
                                        savePlayer(player);
                                    }
                                }
                            ]
                        },
                        {
                            text : "당신은 카인이 원했던 삶이라고 말했다.",
                            scene : [
                                {
                                    type : "text",
                                    value : [
                                        "유리는 당신의 말에 천천히 고개를 끄덕였다." +
                                        "<br><br>\"네 말이 맞아. 그가 선택한 길이지.\"<br><br>" +
                                        "유리는 포스터에서 시선을 떼고 당신을 바라보았다." +
                                        "<br><br>\"...내가 이곳을 선택했듯이.\""
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


//기타
window.EVENTS.push({
    id: "mushroomKingdomMiniature_01",

    condition: (player) =>
        player.justMoved &&
        ["underHouse", "upperHouse"].includes(player.location) &&
        currentHouseHasFurniture(player, "mushroomKingdomMiniature") &&
        Math.random() < 0.07,

    action: (player) => {
        addItem(player, ITEMS.misc.mushroom);
        addItem(player, ITEMS.misc.mushroom);
        addItem(player, ITEMS.misc.mushroom);
        addItem(player, ITEMS.misc.mushroom);
        addItem(player, ITEMS.misc.mushroom);
        savePlayer(player);

        startScene(
            [
                {
                    type : "text",
                    value : [
                        "버서서섯, 버서서섯, 어라. 방금 뭔가 이상한 소리가 나지 않았나? 당신은 당신의 방을 힐끔 들여다보았다." +
                        "<br><br><strong>버섯들이 당신의 방안에서 근엄한 표정을 짓고 두 손(?)을 번쩍 들고 있었다. 머쉬룸 킹덤 부활 만세, 머쉬룸 킹덤 부활 만세!</strong><br><br>" +
                        "그 순간 한 버섯과 당신의 눈이 마주쳤다. 버섯은 두 팔을 든 채로 멈춰있다가 아주 작게 말했다." +
                        "<br><br>\"머쉬룸킹덤이여 영원하라버섯....\"<br><br>" +
                        "다시 눈을 깜박였을 때 당신의 앞에는 버섯들이 있었다...."
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
    id: "mushroomKingdomMiniature_02",

    condition: (player) =>
        player.justMoved &&
        ["underHouse", "upperHouse"].includes(player.location) &&
        ["night", "dawn"].includes(getTimePeriod(player)) &&
        currentHouseHasFurniture(player, "mushroomKingdomMiniature") &&
        Math.random() < 0.07,

    action: (player) => {
        addItem(player, ITEMS.misc.pepper);
        addItem(player, ITEMS.misc.cabbage);
        addItem(player, ITEMS.misc.potato);
        addItem(player, ITEMS.misc.mushroom);
        savePlayer(player);

        startScene(
            [
                {
                    type : "text",
                    value : [
                        "버서서섯, 버서서섯, 어라. 방금 뭔가 이상한 소리가 나지 않았나? 당신은 당신의 방을 힐끔 들여다보았다." +
                        "<br><br><strong>...아니, 당신은... 버섯클 타이슨?</strong><br><br>" +
                        "<strong>예아~</strong>" +
                        "<br><br>버섯클 타이슨이 밤마다 당신의 집에서 복싱을 연습하고 있었던 모양이다. 버섯클 타이슨은 붉어진(?) 얼굴로 당신에게 지금까지 자기가 모은 것들을 내밀었다." +
                        "<br><br>\"아주 좋은 연습장이었다버섯.... 앞으로도 잘 부탁한다버섯....\"" 
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
    id: "mushroomKingdomMiniature_03",

    condition: (player) =>
        player.justMoved &&
        ["underHouse", "upperHouse"].includes(player.location) &&
        getTimePeriod(player) === "dawn" &&
        currentHouseHasFurniture(player, "mushroomKingdomMiniature") &&
        Math.random() < 0.07,

    action: (player) => {
        addItem(player, ITEMS.misc.pepper);
        addItem(player, ITEMS.misc.cabbage);
        addItem(player, ITEMS.misc.potato);
        addItem(player, ITEMS.misc.mushroom);
        savePlayer(player);

        startScene(
            [
                {
                    type : "text",
                    value : [
                        "버서서서서섯. 버서서서서섯. 꿈인가? 당신은 눈을 감은 채로 생각했다. 꿈일 것이다. 꿈이 아니면 안 된다. 꿈이리라 믿는다.... 당신은 결국 버섯버섯 소리들에 참지 못하고 눈을 떴다." +
                        "<br><br>\"버섯의 왕이시여버섯.... 언제나 영광이 있으리버섯....\"<br><br>" +
                        "그들은 당신의 주변으로 공물을 늘여놓고 버섯버섯거리며 절을 올리고 있었다. 당신이 눈을 뜨자 버섯맨들은 눈을 느리게 깜박였다." +
                        "<br><br><strong>\"꺄.아.아.아.악.버.섯.\"</strong><br><br>" +
                        "당신이 자리에서 일어났을 때 버섯들은 이미 없었다. 머쉬룸 킹덤 미니어처 안에 있는 버섯들만이 안 움직이는 척 각자 자세를 취하고 있었을 뿐이다."
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
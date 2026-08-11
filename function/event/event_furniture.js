//에이든

//아카시아

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

//에릭

//줄리앙

//카인

//루크
window.EVENTS.push({
    id: "luke_house_bath",

    condition: (player) =>
        player.justMoved &&
        player.location === "underHouse" &&
        ( hasNpcRelationship("luke", "lover") || hasNpcRelationship("luke", "spouse") ) &&
        ["night", "dawn"].includes(getTimePeriod(player)) &&
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

//창백

//라파엘

//시온

//소라

//발렌

//유리
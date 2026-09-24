window.EVENTS.push({
    id : "neutral_route_quest_10_intro_01",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "goldenShelter" &&
        player.flags?.act3_neutral_route &&
        player.flags?.rebel_route_quest_09_after_04 &&
        ["night", "dawn"].includes(getTimePeriod(player)) &&
        getCurrentDay(player) >= (player.flags.rebel_route_quest_09_after_04_day + 1),

    action : (player) => {
        player.flags.rebel_route_quest_10_intro_01 = true;
        player.flags.rebel_route_quest_10_intro_01_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "쉘터의 아이들이 오랜만에 밤에 조용했다. 당신은 아이들을 잠재우고 돌아오는 시온을 보았다. 그는 당신을 보더니 당신이 쉴 수도 없게 떠들고 있길래 아이들을 잘 달래서 각자의 방으로 다 보냈다고 말했다. 그는 황금 쉘터를 둘러보며 아이들이 비 안 새는 천장 밑에서 잘 수 있게 된 건 당신 때문이라고 말했다." +
                    "<br><br>\"반란군들은 아이들이나 당신에게 직접적으로 해준 건 없어요. 사람들이 왜 상류도시의 편을 더 드는지는 여기서부터 알 수 있는 법이죠. 자신의 보이는 이익을 마다할 사람은 얼마 없으니까요.\"<br><br>" +
                    "시온은 당신을 당신의 방으로 데려간 후 침대에 앉혔다. 그는 안색이 안 좋아 보인다고 말하며 좀 쉬라고 말했다." +
                    "<br><br>\"영웅님이 어떤 선택을 하든, 저는 영웅님을 다치게 두지는 않을 거예요.\"<br><br>" +
                    "...시온의 몸에 원래 이렇게 근육이 많았었나? 그의 덩치가 전보다 더 커진 느낌이 든다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "neutral_route_quest_10_intro_04",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_neutral_route &&
        player.flags?.rebel_route_quest_10_intro_03 &&
        getCurrentDay(player) >= (player.flags.rebel_route_quest_10_intro_03_day + 2),

    action : (player) => {
        player.flags.neutral_route_quest_10_intro_04 = true;
        player.flags.act3_quest_10_unlock = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "길거리를 지나던 당신은 당신을 부르는 목소리에 고개를 돌렸다. 어둠 속에 정체를 숨긴 반란군이 발렌의 목적지가 어딘지 알아냈다고 말했다." +
                    "<br><br>\"하얀꽃 무덤 근처입니다. 그가 필요로 하는 거라면 우리도 필요로 할 겁니다. 당신은 발렌보다 먼저 가서 그것을 얻어오길 바랍니다.\"<br><br>" +
                    "반란군은 그 말을 끝으로 모습을 다시 감추었다. 당신이 주점으로 향하는 찰나, 당신의 뒤에서 시온의 목소리가 들려왔다." +
                    "<br><br>\"정말 가실 건가요? 반란군은 당신을 믿고 있지도 않은데요?\"<br><br>" +
                    "시온은 속상한 얼굴로 당신을 바라보았다." +
                    "<br><br>\"...영웅님은, 제가 무슨 일이 있어도 지킬 거예요.\"<br><br>" +
                    "그의 장밋빛 눈동자에 차가운 결의가 서렸다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "neutral_route_quest_10_after_01",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_neutral_route &&
        player.flags?.act3_quest_10_done,

    action : (player) => {
        player.flags.neutral_route_quest_10_after_01 = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"...기다리고 있었어요, 영웅님.\"<br><br>" +
                    "그는 당신이 다치지 않아서 다행이라고 말하며 당신을 껴안았다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 시온에게 왜 시온이 거기에 있었냐고 물었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"...저 말고 영웅님을 지켜주는 사람이 없으니까요.\"<br><br>" +
                                    "그는 상류도시 사람들이고, 반란군들이고 당신을 이용해 먹을 생각밖에 없다고 말했다. 시온은 그 누구도 믿을 수 없다고 말하며 당신을 더 꽈악 끌어안았다." +
                                    "<br><br>\"...무슨 일이 있어도, 당신을 잃지 않을 거예요.\"<br><br>" +
                                    "시온은 당신을 바라보며 자신은 앞으로도 계속 당신을 지킬 거라고 맹세했다." +
                                    "<br><br>\"영웅님이 이 맹세를 받지 않는다고 하더라도요.\""
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("sion", "dominance", 5);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 시온에게 도와주러 와서 고맙다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"당연한 일이에요. 지금 이 세상에서 영웅님을 챙기는 사람은 저밖에 없는걸요. 영웅님조차도 영웅님을 챙기시지 않으시니까요.\"<br><br>" +
                                    "그는 당신의 손바닥 위에 자신의 손바닥을 얹으며, 자신은 당신의 작은 상처도 쉬이 넘어가지 않을 거라고 말했다." +
                                    "<br><br>\"...영웅님이 다치지 않으셨으면 좋겠어요. 그러기 위해서는 제가 더 강해져야겠죠.\""
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("sion", "dominance", 5);
                                    changeNPCEmotion("sion", "affection", 5);
                                    savePlayer(player);
                                }
                            }
                        ]
                    }
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "neutral_route_quest_10_after_02",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townEntrance_act3" &&
        player.flags?.act3_neutral_route &&
        player.flags?.neutral_route_quest_10_after_01 &&
        getCurrentDay(player) >= (player.flags.act3_quest_10_done_day + 4),

    action : (player) => {
        player.flags.neutral_route_quest_10_after_02 = true;
        player.flags.neutral_route_quest_10_after_02_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "마을 입구, 당신은 당신도 모르게 상류도시를 감싸 안고 있는 성벽 쪽을 바라보았다." +
                    "<br><br>...?<br><br>" +
                    "방금 벽이 뭔가... 갈색으로 변하지 않았나? 마치 아카시아 꽃잎이 변색된 것처럼 상류도시를 감싸 안고 있는 백색 벽이 갈색으로 변했었다. 순식간에 벌어진 일이라서 당신은 정말로 벽이 갈색으로 변했었던 건지 확신할 수 없었다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "neutral_route_quest_10_after_03_seedDie",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_neutral_route &&
        player.flags?.neutral_route_quest_10_after_02 &&
        player.flags?.paleWhiteFlowerSeedDie &&
        getCurrentDay(player) >= (player.flags.neutral_route_quest_10_after_02_day + 1),

    action : (player) => {
        player.flags.neutral_route_quest_10_after_03 = true;
        player.flags.neutral_route_quest_10_after_03_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "반란군은 조금 늦게 당신을 찾아왔다. 그들은 꽃의 행방에 대해 물었고, 그들이 당신에게 얻을 수 있는 건 시든 꽃 하나였다." +
                    "<br><br>\"...이 씨앗도....\"<br><br>" +
                    "이미 죽은 씨앗이다. 그들은 대체 발렌이 왜 이거에 집착했는지 이유를 모르겠다고 말하며 고개를 저었다." +
                    "<br><br>\"발렌의 행방은 계속 주시하겠습니다. 필요한 일이 생기면 부르겠습니다.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "neutral_route_quest_10_after_03_seedAlive",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_neutral_route &&
        player.flags?.neutral_route_quest_10_after_02 &&
        player.flags?.paleWhiteFlowerSeedAlive &&
        getCurrentDay(player) >= (player.flags.neutral_route_quest_10_after_02_day + 1),

    action : (player) => {
        player.flags.neutral_route_quest_10_after_03 = true;
        player.flags.neutral_route_quest_10_after_03_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "반란군은 조금 늦게 당신을 찾아왔다. 그들은 꽃의 행방에 대해 물었고 그들이 당신에게 얻어낼 수 있는 건 시든 꽃 한 송이뿐이었다. 당신은 씨앗은 살았다고 말하며 주머니에서 씨앗을 꺼내려고 했지만... 이상하다. 아무리 주머니를 뒤져도 씨앗을 찾을 수가 없었다." +
                    "<br><br>\"...잃어버린 겁니까?\"<br><br>" +
                    "씨앗이라는 말에 그들은 인상을 찌푸렸다. 그들은 당신의 황금쉘터를 뒤져서라도 찾아내곘다고 말하며 고개를 끄덕였다." +
                    "<br><br>...씨앗이 대체 어디로 간 걸까."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "neutral_route_quest_11_intro_01",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townEntrance_act3" &&
        player.flags?.act3_neutral_route &&
        player.flags?.neutral_route_quest_10_after_03 &&
        getCurrentDay(player) >= (player.flags.neutral_route_quest_10_after_03_day + 3),

    action : (player) => {
        player.flags.common_route_quest_11_intro_01 = true;
        player.flags.common_route_quest_11_intro_01_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신은 경비병들이 마을 입구에서 수레를 끌고 나가는 것을 보았다. 힐끗 본 수레에는 시체들이 한가득이었다." +
                    "<br><br>\"대체 시체를 왜 가져오라는 거야?\"<br><br>" +
                    "\"뭔가 조사할 게 있나 보지.... 으, 마치 살아있는 것 같아.\"<br><br>" +
                    "그들의 말대로 수레에 있는 시체들은 다른 시체들과 다르게 살아있는 것처럼 꿈틀거리고 있었다. 마치 숙주는 죽었지만 안에 있는 흉물은 살아있는 것처럼.... 그들도 그렇게 생각했는지 흉물이 하나 튀어나오기 전에 어서 옮기자고 말했다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "common_route_quest_11_intro_02",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townEntrance_act3" &&
        ( player.flags?.act3_neutral_route || player.flags?.act3_rebel_route || player.flags?.act3_uppercity_route ) &&
        player.flags?.common_route_quest_11_intro_01 &&
        getCurrentDay(player) >= (player.flags.common_route_quest_11_intro_01_day + 7 ),

    action : (player) => {
        player.flags.common_route_quest_11_intro_02 = true;
        player.flags.common_route_quest_11_intro_02_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "<div style='text-align:center; font-size:2rem; color: #ff0000;'>콰앙</div><br><br>" +
                    "...? 잘못 들었나? 다행히 도시 안에서 들려오는 소리는 아니었다. 당신은 고개를 들었다. 새들이 하류도시 입구 쪽으로 날아드는 것이 보인다. 경비병들과 경계병들도 인상을 찌푸리며 하류도시 관문 바깥을 살펴보았다." +
                    "<br><br>\"씨발, 이놈의 동네는 잔잔한 적이 없...\"" +
                    "<br><br><div style='text-align:center; font-size:2rem; color: #ff0000;'>콰앙</div><br><br>" +
                    "....<br><br>" +
                    "잘못 들은 게 아닌 것 같다. 하류도시 입구에 있던 사람들이 경계심 어린 눈으로 소리가 들린 쪽을 응시했다." +
                    "<br><br>아무 일도 일어나지 않았다. <span class='log-danger'>아직은</span>"
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "common_route_quest_11_intro_03",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "darkStreet" &&
        ( player.flags?.act3_neutral_route || player.flags?.act3_rebel_route || player.flags?.act3_uppercity_route ) &&
        player.flags?.common_route_quest_11_intro_02 &&
        getCurrentDay(player) >= (player.flags.common_route_quest_11_intro_02_day + 2 ),

    action : (player) => {
        player.flags.common_route_quest_11_intro_03 = true;
        player.flags.common_route_quest_11_intro_03_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"우리는 다 죽을 거야.\"<br><br>" +
                    "중얼거리는 소리가 들려서 당신은 고개를 돌렸다. 몇몇 사람들이 초췌한 얼굴로 모여 있었다. 그들은 종말의 날이 얼마 남지 않았다고 말하며, 어차피 죽는 날이 얼마 남지 않았으면 원하는 대로 살다가 죽는 게 낫지 않겠냐고 말했다." +
                    "<br><br>\"아니면 <strong>제물</strong>을 바치든가.\"<br><br>" +
                    "당신은 고개를 돌렸다. 누가 말한 거지? 하지만 이미 사람들은 말소리를 줄이며 흩어진 지 오래였다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "common_route_quest_11_intro_04",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "darkStreet" &&
        ( player.flags?.act3_neutral_route || player.flags?.act3_rebel_route || player.flags?.act3_uppercity_route ) &&
        player.flags?.common_route_quest_11_intro_03 &&
        getCurrentDay(player) >= (player.flags.common_route_quest_11_intro_03_day + 5 ),

    action : (player) => {
        player.flags.common_route_quest_11_intro_04 = true;
        player.flags.common_route_quest_11_intro_04_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "길거리를 걷던 당신은 순간 당신의 눈을 믿지 못했다. 라파엘? 동공도 제대로 보이지 않는 그의 백색 눈동자는 빈민가 거리를 한 바퀴 둘러보더니 이내 당신을 발견했다. 그는 자애로운 미소를 지으며 당신이 이런 더러운 거리에 어쩐 일이냐고 물었다." +
                    "<br><br>\"아무리 영웅님이라도 이런 곳에 있으면 사상이 더럽혀집니다.\"<br><br>" +
                    "그는 당신의 의아해하는 표정에, 감히 신의 이름을 걸고 활동하는 단체가 있다고 해서 한번 와봤다고 말해주었다." +
                    "<br><br>\"배울 점은 많았습니다. 물론 발렌님은 이들이 상류도시에게도 마수를 뻗는 순간 검을 들겠지만요.\""
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 배울 점이 많다는 게 무슨 뜻이냐고 물었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"말 그대로입니다. 누구에게나 배울 점은 있는 법이니까요.\"<br><br>" +
                                    "라파엘은 앞으로 나아가려면 다른 사람들보다 더 넓게 봐야 한다고 말했다. 그는 어쩌면 반란군들은 그 점이 부족할지도 모르겠다고 말했다." +
                                    "<br><br>\"그래서 그들은 제게 재미가 없는 거고요.\""
                                ]
                            }
                        ]
                    },
                    {
                        text : "당신은 라파엘에게 요새 유행하는 사이비 종교에 대해 잘 아냐고 물었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"사이비 종교라...\"<br><br>" +
                                    "라파엘은 당신에게 정말로 그들의 종교가 사이비 종교라고 생각하냐고 물었다." +
                                    "<br><br>\"왜 그렇게 판단하셨습니까?\"<br><br>" +
                                    "그의 미소는 언제나처럼 자애로웠다." +
                                    "<br><br>\"...정말로, 당신에게 판단할 기준이 있다고 보십니까? 종교는 어떤 종교나 사람들의 소망을 먹고 자라는 법인데도 말입니다.\""
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeNPCEmotion("raphael", "affection", -3);
                                    savePlayer(player);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 그들의 교리에 찬성하는 거냐고 물었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 말에 라파엘은 눈을 느리게 깜박였다." +
                                    "<br><br>\"찬성이요?\"<br><br>" +
                                    "\"하, 하, 하. 찬성이요?\"<br><br>" +
                                    "그는 재밌는 농담이라도 들은 것처럼 폭소했다. 당신은 순간 그의 등뒤에서 날개같은 것을 보았다. 환상이었던 걸까? 금방 사라지긴 했지만 색깔이 흰색이었다, 천사 날개라고 보기에는 기괴하게 뒤틀려 있긴 했지만." +
                                    "<br><br>\"재밌긴 합니다.\"<br><br>" +
                                    "그는 좋은 구경을 해서 좋았다고 말하며 고개를 돌렸다." +
                                    "<br><br>\"더 볼 거리가 생긴다면 좋겠군요.\""
                                ]
                            }
                        ]
                    }
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "common_route_quest_11_intro_05",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        ( player.flags?.act3_neutral_route || player.flags?.act3_rebel_route || player.flags?.act3_uppercity_route ) &&
        player.flags?.common_route_quest_11_intro_04 &&
        getCurrentDay(player) >= (player.flags.common_route_quest_11_intro_04_day + 1 ),

    action : (player) => {
        player.flags.common_route_quest_11_intro_05 = true;
        player.flags.common_route_quest_11_intro_05_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "당신은 길거리에서 사이비 종교단의 광기에 대해 이야기를 나누고 있는 사람들의 말소리를 들었다." +
                    "<br><br>\"...그래도 적어도 거기서는 내일 굶어죽을 걱정은 안 해도 된다는데.\"<br><br>" +
                    "익숙한 목소리다. 당신은 고개를 들었다. 길거리에서 쉘터의 아이들에게 수프를 나눠주고는 했던 그 아주머니다. 그는 한숨을 쉬며 요새 죽는 사람들이 너무 많다고 말했다." +
                    "<br><br>\"시체를 뒤지는 사람들뿐만 아니라 살아있는 사람을 죽이려는 사람들도 더 많아졌고...\"<br><br>" +
                    "\"말세야, 말세. 이러다가 정말 그들의 말처럼 종말이 오겠어.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "neutral_route_quest_11_intro_02",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_neutral_route &&
        ["night", "dawn"].includes(getTimePeriod(player)) &&
        player.flags?.common_route_quest_11_intro_05 &&
        getCurrentDay(player) >= (player.flags.common_route_quest_11_intro_05_day + 2),

    action : (player) => {
        player.flags.neutral_route_quest_11_intro_02 = true;
        player.flags.neutral_route_quest_11_intro_02_day = getCurrentDay(player);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "길거리를 돌아다니던 당신은 하얀색 로브를 입은 사람이 어둠 속에서 다른 사람에게 먹을 것을 나눠주는 걸 보았다. 거지는 의심의 눈초리를 거두지는 않았지만 허겁지겁 음식을 먹었다." +
                    "<br><br>\"...교주님은 믿음이 있는 자는 차별하지 않습니다.\"<br><br>" +
                    "신도는 부드럽게 거지의 손을 잡으면서 말했다. 거지의 몸에서 쓰레기 냄새가 나는데도 불구하고 신도는 눈썹 한번 찡그리지 않았다. 그는 오히려 거지의 손등을 부드럽게 쓰다듬으며, 당신도 우리에게 합류할 수 있다고 말했다." +
                    "<br><br>단호하던 거지의 눈이 흔들리기 시작했다." +
                    "<br><br>\"정말로... 음식은 매번 나눠주는 겁니까?\"<br><br>" +
                    "\"그렇습니다. 우리는 절대로 서로를 버리지 않습니다. 저희는 언젠가 꼭지점에서 다같이 만날 사람들이니까요.\"<br><br>" +
                    "거지는 망설이면서도 결국은 신도의 뒤를 따라갔다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "neutral_route_quest_11_intro_03",
    priority : true,
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.act3_neutral_route &&
        player.flags?.neutral_route_quest_11_intro_02 &&
        getCurrentDay(player) >= (player.flags.neutral_route_quest_11_intro_02_day + 2),

    action : (player) => {
        player.flags.act3_quest_11_unlock = true;
        savePlayer(player);

        startScene([
            {
                type : "text",
                value : [
                    "\"영웅.\"<br><br>" +
                    "상류도시의 귀족으로 보이는 사람이 당신을 불렀다. 그는 애써 턱을 들어올리고 있었지만 눈동자가 미세하게 떨리고 있었다. 그는 자신의 여동생이 돌아오지 않는다고 말하며 당신에게 의뢰를 맡기고 싶다고 말했다." +
                    "<br><br>\"하얀색 로브를 입은 사람이 계속 접근하기는 했는데....\"<br><br>" +
                    "그는 헛기침을 하더니 자신이 여동생을 찾고 있다는 건 누구에게도 말하지 말라고 말했다. 그는 당신에게 사진을 보여주었다. 아무리 봐도 두 사람이 닮은 것 같지는 않다... 그는 주점에 의뢰를 올려놓을 테니 최대한 빨리 자신의 여동생을 찾아달라고 말했다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});
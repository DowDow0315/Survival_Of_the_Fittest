//에릭

//루크
window.EVENTS.push({
    id : "luke_guard_punishment_event",
    once : true,

    condition : (player) =>
        player.location === "townStreet" &&
        player.flags?.bandit_luke_event_done &&
        NPC_DATA["luke"].emotion.affection > 50 &&
        !player.flags?.luke_guard_punishment_event_seen,

    action : (player) => {
        player.flags.luke_guard_punishment_event_seen = true;
        savePlayer(player);

        startScene(
            NPC_DATA["luke"].scenes.luke_guard_punishment_event,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

window.EVENTS.push({
    id : "luke_missing_player_event",

    condition : (player) =>
        player.flags?.bandit_luke_event_done &&
        NPC_DATA["luke"].emotion.affection > 80 &&
        !["townEntrance", "townStreet", "darkStreet", "barracks"].includes(player.location) &&
        getLukeUndercityAbsenceDays(player) >= 14 &&
        Math.random() < 0.15,

    action : (player) => {
        player.flags = player.flags || {};
        player.flags.luke_left_undercity_day = getCurrentDay(player);
        savePlayer(player);

        startScene(
            NPC_DATA["luke"].scenes.luke_missing_player_event,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

function updateLukeUndercityAbsence(player){
    player.flags = player.flags || {};

    const undercityLocations = ["townEntrance", "townStreet", "darkStreet", "barracks"];
    const isInUndercity = undercityLocations.includes(player.location);
    const today = getCurrentDay(player);

    if (isInUndercity) {
        player.flags.luke_left_undercity_day = null;
        return;
    }

    if (player.flags.luke_left_undercity_day == null) {
        player.flags.luke_left_undercity_day = today;
        savePlayer(player);
    }
}

function getLukeUndercityAbsenceDays(player){
    const leftDay = player.flags?.luke_left_undercity_day;
    if (leftDay == null) return 0;

    return getCurrentDay(player) - leftDay;
}

window.EVENTS.push({
    id : "luke_patience_limit_event",

    condition : (player) =>
        (player.location === "townEntrance" ||
         player.location === "townStreet" ||
         player.location === "darkStreet") &&
        NPC_DATA["luke"].emotion.lust >= 100,

    action : (player) => {
        savePlayer(player);

        startScene(
            NPC_DATA["luke"].scenes.luke_patience_limit_event,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
    }
});

//소라

//유리

//니콜라이

//랜덤이벤트
window.EVENTS.push({
    id : "whiteflower_hallucination_event01",
    condition : (player) =>
        player.justMoved &&
        ["townEntrance", "townStreet", "darkStreet"].includes(player.location) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "바닥에 주저앉아있던 남자가 당신을 보더니 눈을 크게 떴다. 그는 비틀거리면서 당신에게 다가오더니 당신의 손목을 붙잡았다. 그의 눈동자는 초점없이 흔들리고 있었다.",
                    "<br><br>\"지금까지 어디에 있었니... 배고프지? 아빠가 저녁 해줄게...\"<br><br>",
                    "그는 당신의 손등을 부드럽게 쓰다듬었다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 그의 말에 맞춰주었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "그는 당신의 손등을 쓰다듬다가 자신의 품에서 빵을 내밀었다. 이곳저곳에 곰팡이가 피어있는 빵이다. 그는 그대로 그 빵을 당신의 입술에 문지르며 당신은 더 이상 굶으면 안 된다고 말했다.",
                                    "<br><br>\"굶어죽으면 안돼... 안돼...\"<br><br>",
                                    "멍하니 중얼거리던 남자는 곧 정신을 잃고 쓰러져버렸다. 당신은 당신의 손을 놓치고 쓰러진 남자를 내려다보았다.",
                                    "<br>...정신만을 잃은 게 아니다. 그는 목숨을 잃었다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 1);
                                    changeHP(player, -2);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 그에게 돈이 필요하다고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 말에 그는 눈을 크게 뜨더니 자신의 주머니를 뒤지기 시작했다. 품속에 있었던 빵이 툭, 길바닥으로 떨어졌지만 남자는 신경쓰지 않았다. 그는 주머니를 뒤지더니 돈을 찾아 당신의 손에 쥐어주었다.",
                                    "<br>고작 5원. 남자는 당신에게 전재산을 바쳤다. 그는 자신이 돈을 금방 벌어오겠다고 말하며 당신의 손을 놓고 비틀비틀 다른 곳으로 걸어갔다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeGold(player, 5);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 그의 손을 뿌리쳤다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신의 손을 붙잡고 있던 남자의 손에는 이미 힘이 없었다. 그는 당신이 뿌리치는 대로 비틀거리더니 그대로 뒤로 넘어졌다. 그는 당신을 올려다보았다.",
                                    "<br><br>\"...너, 넌... 누구야.\"<br><br>",
                                    "이제야 당신이 자신의 자식이 아니라는 걸 깨달은 남자의 얼굴에 고통이 서렸다. 아아, 그래, 그 아이가 지금 살아있을 리가 없잖아....",
                                    "<div style='color:red; font-style:italic'><br><br>\"내가 먹었는데....\"<br><br></div>",
                                    "그리고 남자는 그대로 길바닥에 엎어졌다.",
                                    "<br>...죽은 거 같다."
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
    id : "whiteflower_hallucination_event02",
    condition : (player) =>
        player.justMoved &&
        ["townEntrance", "townStreet", "darkStreet"].includes(player.location) &&
        Math.random() < 0.08,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "거친 숨소리와 함께 뒤에서 여자가 당신의 손을 낚아챘다. 그는 당신의 이름이 아닌 다른 사람의 이름을 부르며 당신에게 하얀꽃님이 역시 자신에게 당신을 보낸 거냐고 중얼거렸다.",
                    "<br><br>\"하얀꽃님이 보내준 거지...? 나를 데리러 온 거지, 우리 아가...\"<br><br>",
                    "그는 자신의 풍만한 가슴을 당신의 입쪽으로 들이밀며 엄마는 언제든 당신에게 줄 모유가 준비되어 있다고 말했다. 모유, 모유는 하얀색.... 깔깔깔 여자는 웃음을 터뜨렸다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 여자의 가슴을 빨았다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "예상대로 여자의 가슴에서는 어떤 것도 나오지 않았다. 여자는 모유가 나오지 않자 당황하며 울기 시작했다.",
                                    "<br><br>\"나는.. 나는 네게 다 주려고 했는데... 아니야, 아니야...!\"<br><br>",
                                    "그는 당신의 주머니를 뒤지더니 당신의 손에 꼭 쥐어주었다. 마약이다. 그는 이것만 있으면 세상이 아름다워진다고 말했다.",
                                    "<br><br>\"내가 더 가져올 테니까.... 여기서 얌전히 기다리고 있어, 내 아가..\"<br><br>",
                                    "여자가 당신에게서 멀어진다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    addItem(player, ITEMS.misc.drug);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 여자에게 하얀꽃님에 대해 물었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "\"하얀꽃님은.... 모두의 위에 있지.... 그분의 감정.... 우리는 그 감정에 빠질 수밖에 없어.... 아아...\"<br><br>",
                                    "여자는 갑자기 파르르 떨더니 당신을 향해 손을 뻗었다.",
                                    "<br><br>\"이리와.... 이리와......\"<br><br>",
                                    "<br><br><strong><div style= 'text-align:center; color:#302ce9; font-size:4rem'>\"이리와\"</div></strong><br><br>",
                                    "그순간 경비병들이 여자에게 다가와 반란군이라고 하면서 그를 잡아갔다. 여자는 경비병들에게 끌려가면서도 당신에게 악귀처럼 손을 뻗었다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, 3);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 여자의 손을 뿌리쳤다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신에게 뿌려쳐진 여자는 멍하니 당신을 바라보다가 당신은 자신의 아가가 아니라고 중얼거리듯이 말했다.",
                                    "<br>누구도 내 슬픔을 이해해주지 않아.... 아니야, 하얀꽃, 하얀꽃님만큼은....<br>",
                                    "그대로 다른 곳으로 걸어가려던 여자는 풀썩 쓰러졌다. 그는 미친듯이 손을 뻗어 제 주머니에 남아있던 마약 하나를 입에 물었다. 마약이 입에 들어간 후, 여자는 행복하다는 듯 미소를 지었다."
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
    id : "children_funeral_event",

    condition : (player) =>
        player.justMoved &&
        player.location === "townStreet" &&
        Math.random() < 0.05,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "골목 한쪽에 아이들이 모여 있었다. 그들은 낡은 천 조각과 시든 꽃 몇 송이를 바닥에 내려놓고 있었다. 장례식이라고 부르기엔 너무 초라했지만, 아이들의 표정은 누구보다 진지했다.",
                    "<br><br>\"...다음에는 안 아픈 곳에서 태어나.\"",
                    "<br><br>누군가 작은 목소리로 말했다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신도 잠시 묵념했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신도 아이들의 옆에 서서 고개를 숙였다. 몇몇 아이들이 결국 울음을 터뜨렸다. 모두가 한 문장씩 죽은 아이에게 덕담을 던졌다. 다음에는 상류도시에서 태어나서 배터지게 먹으라고 말하는 아이도 있었다.",
                                    " 그렇게 몇 분, 아이들은 슬픔을 안고 흩어졌다. 남은 것은 곧 사라질 무덤뿐이었다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, -5);
                                    passTime(player, 5);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 조용히 지나쳤다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 그대로 애도의 자리를 지나쳤다. 뒤에서 작은 울음 소리가 들렸지만 곧 사라졌다. 이곳에서는 아이의 울음조차 길게 이어지는 걸 허락하지 않는다. 몇 명이 한 사람 죽은 걸로 지랄한다고 욕하는 것이 들린다.",
                                    "<br><br>...당신은 앞으로 나아갔다."
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
    id : "market_soup_lady_event",

    condition : (player) =>
        player.justMoved &&
        player.location === "townStreet" &&
        Math.random() < 0.07,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "길거리를 걷고 있는데 맛있는 냄새가 난다. 당신은 당신도 모르게 고개를 돌렸다. 수프를 만들고 있던 사람의 시선과 당신의 시선이 마주쳤다. 그는 잠시 고민하다가 한숨을 쉬며 당신을 손짓으로 불렀다",
                    "<br><br>\"쯧, 얼굴이 반쪽이네. 이리 와. 돈 안 받을 테니까 한 그릇 먹고 가.\""
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "당신은 수프를 받아먹었다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "따뜻한 수프가 목을 타고 넘어갔다. 대체 무슨 재료로 만든 걸까 알 수 없지만 목을 타고 넘어가는 수프는 차가운 현실과 다르게 따듯하긴 했다. 그는 당신이 수프를 먹는 걸 응시하다가 미소지었다.",
                                    "<br><br>\"그래. 안 죽었으면 된 거지.\"<br><br>",
                                    "그는 당신에게 수프를 한 그릇 더 준 후 휘파람을 불며 자신의 일로 돌아갔다. 당신의 마음도 따듯해졌다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeHP(player, 10);
                                    changeStamina(player, 10);
                                    changeTrauma(player, -2);
                                    passTime(player, 3);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 괜찮다고 말하며 옆에 있던 아이에게나 나눠주라고 말했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "그의 시선이 당신에게서 옆에 있던 아이에게로 넘어갔다. 아이는 수프 냄새에 침을 흘리며 꼬르륵거리는 배를 부여잡고 있었다. 수프 매대 주인은 한숨을 쉬었다. 그러더니 그는 아이에게 수프 한 그릇을 나눠주었다.",
                                    " 아이는 눈 깜짝할 사이에 수프 한 그릇을 비워버렸다. 아이의 먹는 속도에 놀랐는지 눈을 동그랗게 뜨고 있던 수프 매대 주인은 한숨을 쉬며 한 그릇을 더 퍼주었다.",
                                    "<br><br>\"누가 안 빼앗어먹으니까 천천히 먹어. 대체 얼마나 굶은 거냐.... 한 그릇 더 줄 테니까 천천히 먹어.\"<br><br>",
                                    "당신의 마음 한구석에 온기가 스며든다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeTrauma(player, -5);
                                }
                            }
                        ]
                    },
                    {
                        text : "당신은 아무도 믿지 않는다. 수프를 거절했다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "그는 그대로 가버리는 당신을 잡지 않았다. 그는 오늘도 어제처럼, 그저 수프를 팔아서 생계를 유지할 뿐이다. 당신도 어제처럼, 오늘도 앞으로 걸어갔다."
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
    id : "child_pickpocket_event",

    condition : (player) =>
        player.justMoved &&
        player.location === "darkStreet" &&
        Math.random() < 0.05,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "어두운 골목을 지나던 중, 작은 손이 당신의 주머니를 스쳤다. 당신이 고개를 돌리자, 마른 아이 하나가 움찔하며 뒤로 물러났다. 입술은 누군가한테 맞은 건지 아니면 영양실조인 건지 부루터져 있었고 다리는 바들바들 떨리고 있었다.",
                    "<br>아이의 손에는 당신의 돈이 들려있었다."
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "아이를 붙잡는다.",
                        stat : "dex",
                        difficulty : 8,
                        success : [
                            {
                                type : "text",
                                value : [
                                    "당신은 도망치려는 아이의 팔을 붙잡았고 아이는 살려달라고 말하면서 당신에게 돈을 다시 되돌려주었다.",
                                    "<br><br>\"때리지 말아주세요, 때리지 말아주세요... 배가 너무 고파서 그랬어요...\"<br><br>",
                                    "그러더니 아이는 당신이 주춤한 사이에 부리나케 도망쳐버렸다."
                                ]
                            }
                        ],
                        fail : [
                            {
                                type : "text",
                                value : [
                                    "아이는 당신의 손을 빠져나갔다. 당신의 예상보다 아이는 더 빨랐다. 당신의 주머니가 전보다 더 가벼워졌다...."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeGold(player, -500);
                                }
                            }
                        ]
                    },
                    {
                        text : "그냥 보내준다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 아이를 붙잡지 않았다. 아이는 당신이 자신을 붙잡지 않자 이상하다는 듯이 바라보다가 얼굴을 일그러뜨리더니 금방이라도 울 것만 같은 얼굴로 도망가버렸다."
                                ]
                            },
                            {
                                type : "effect",
                                run : (player) => {
                                    changeGold(player, -500);
                                    changeTrauma(player, -3);
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
    id : "rebel_graffiti_event",
    condition : (player) =>
        player.justMoved &&
        player.location === "shelter" &&
        Math.random() < 0.04,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "쉘터 벽 한구석에 새로 적힌 낙서가 보인다.",
                    "<br><br><br><strong><div style='color:#4ce1f5; font-style:italic'>\"우리는 아직 죽지 않았다.\"</div></strong><br><br><br>"                  
                ]
            },
            {
                type : "choice",
                choices : [
                    {
                        text : "낙서를 지운다.",
                        scene : [
                            {
                                type: "text",
                                value : [
                                    "당신은 낙서를 문질러 지웠다. 에릭이 쉘터에 왔다가 이 낙서를 봐버렸다는 상상만으로도 당신의 머리털은 쭈뼛 섰다. 누군가 당신을 뒤에서 바라보는 느낌이 들어서 당신은 낙서를 지우다 말고 고개를 돌렸다. 하지만 당신의 뒤에는 아무도 없었다."
                                ]
                            }
                        ]
                    },
                    {
                        text : "낙서를 그대로 둔다.",
                        scene : [
                            {
                                type : "text",
                                value : [
                                    "당신은 낙서에 손을 대지 않고 물러났다.",
                                    "<br><br>이 문장은 누구에게는 희망이고, 누구에게는 사형선고가 될지도 모른다."
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
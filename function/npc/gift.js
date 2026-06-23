const NPC_GIFT_CONFIG = {
    matin: {
        reactions: {
            matinFavorite: {
                great: {
                    affection: 5,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: 5,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: 3,
                    rage: 0,
                    lust : 0,
                    line: ""
                }
            },
            matinHate: {
                great: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: -3,
                    rage: 3,
                    lust : 0,
                    line: ""
                }
            },


            sweet: {
                great: {
                    affection: 3,
                    rage: 0,
                    lust : 0,
                    line: "당신은 마틴의 표정을 읽을 수가 없었다. <br><br>\"...달콤한 건 별로 좋아하지 않아. 하지만 이건 먹을 만하네.\"<br><br>그는 몇 개 더 먹더니 이제 한계라는 듯 다시 음식을 내려놓았다."
                },
            
                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 0,
                    line: "그는 당신의 음식을 먹더니 음식을 만들 때 몇 가지 부분이 미흡했던 거 같다고 말했다. <br><br>\"다음 번에는 완벽해지겠네.\"<br><br>그는 당신의 음식을 많이는 먹지 않고 내려놓았다."
                },
            
                bad: {
                    affection: 1,
                    rage: 0,
                    lust : 0,
                    line: "마틴은 당신의 음식을 먹더니 인상을 찌푸렸다.<br><br>\"...너무... 자극적이야.\"<br><br>그는 용량을 하나하나 가르쳐주었다. 당신의 음식에는 더 이상 손대지 않았다."
                }
            },
            
            lusty: {
                great: {
                    affection: -5,
                    rage: 3,
                    lust : 0,
                    line: "마틴은 음식의 냄새를 맡더니 당신을 쓰레기 보는 시선으로 노려보았다. <br><br>\"더러워.\""
                },

                normal: {
                    affection: -5,
                    rage: 3,
                    lust : 0,
                    line: "마틴은 음식의 냄새를 맡더니 당신을 쓰레기 보는 시선으로 노려보았다. <br><br>\"더러워.\""
                },
            
                bad: {
                    affection: -6,
                    rage: 6,
                    lust : 0,
                    line: "\"윽...\"<br><br>마틴은 냄새를 맡자마자 그대로 뒤로 물러났다. <br><br>\"그거 가지고 당장 나가.\""
                }
            },
            lustyHighAffection : {
                great: {
                    affection: 3,
                    rage: 0,
                    lust : 3,
                    line: "마틴은 음식의 냄새를 맡더니 움찔했다. <br><br>\"이런 악취미는 혼자만 간직해...\"<br><br>고개를 돌리고 있는 그의 귀끝은 붉었다. 그는 당신이 가지 않자 고개를 다시 돌렸다. <br><br>\"...설마 먹어보라는 건 아니지?\""
                },

                normal: {
                    affection: 3,
                    rage: 0,
                    lust : 3,
                    line: "마틴은 음식의 냄새를 맡더니 움찔했다. <br><br>\"...먹을 거면 혼자 먹어.\"<br><br>그는 고개를 돌렸다. 하지만 당신은 그가 곁눈질로 당신을 힐끔힐끔 보고 있다는 걸 알아차렸다."
                },
            
                bad: {
                    affection: 1,
                    rage: 0,
                    lust : 3,
                    line: "마틴은 음식의 냄새를 맡더니 뒤로 물러섰다. 그는 당신과 안전 거리를 유지하며 고개를 저었다. <br><br>\"안 먹어.\"<br><br>그는 꽤 단호했다."
                }
            },
            
            default: {
                trash: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: "\"실패한 거야?\"<br><br>마틴은 당신의 음식을 보더니 픽 웃었다. 금방 입꼬리가 내려가긴 했지만 그는 분명 웃었다. 그는 당신에게서 고개를 돌리고 다시 제 일에 집중했다."
                }
            }
        }
    },
    sora: {
        reactions: {
            soraFavorite: {
                great: {
                    affection: 5,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: 5,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: 3,
                    rage: 0,
                    lust : 0,
                    line: ""
                }
            },
            soraHate: {
                great: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: -3,
                    rage: 3,
                    lust : 0,
                    line: ""
                }
            },


            sweet: {
                great: {
                    affection: 2,
                    rage: 0,
                    lust : 3,
                    line: "소라는 눈을 반짝반짝 빛내며 당신이 준 음식을 바로 먹었다. <br><br>\"달아!\"<br><br>소라는 즐겁다는 듯이 웃었다."
                },
            
                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 3,
                    line: "소라는 눈을 반짝반짝 빛내며 당신이 준 음식을 바로 먹었다. <br><br>\"달아!\"<br><br>소라는 즐겁다는 듯이 웃었다."
                },
            
                bad: {
                    affection: 2,
                    rage: 0,
                    lust : 3,
                    line: "소라는 눈을 반짝반짝 빛내며 당신이 준 음식을 바로 먹었다. <br><br>\"달아!\"<br><br>소라는 즐겁다는 듯이 웃었다.<br>...달콤한 맛의 정도를 잘 느끼지 못하는 거 같다."
                }
            },
            
            lusty: {
                great: {
                    affection: 5,
                    rage: 0,
                    lust : 10,
                    line: "소라는 음식을 보자마자 \"흐응~\" 소리를 내며 당신을 지그시 바라보았다. <br><br>\"소라가 먹어주길 바라? {soraTitle}가 원한다면야...\"<br><br>소라는 당신을 바라보며 눈도 깜박이지 않고 당신이 만들어준 음식을 먹었다."
                },

                normal: {
                    affection: 4,
                    rage: 0,
                    lust : 8,
                    line: "소라는 당신의 음식을 보더니 까르르 웃었다. 재밌다는 듯 당신을 보던 그는 당신이 보는 앞에서 그 음식을 남김없이 먹기 시작했다. <br><br>\"나한테 원하는 게 있는 거지? 우린 같은 걸 원하고 있는 거 같은데.\""
                },
            
                bad: {
                    affection: 3,
                    rage: 0,
                    lust : 6,
                    line: "소라는 당신의 음식을 천천히 맛보기 시작했다. 중간에 살짝 인상을 찌푸리긴 했지만 음식을 다 비워내긴 했다. <br><br>\"으응, 맛있네, 이제 더 큰 선물이 딸려오려나?\""
                }
            },
            
            default: {
                trash: {
                    affection: -1,
                    rage: 0,
                    lust : 0,
                    line: "당신에게 쓰레기를 받은 소라는 눈을 동그랗게 떴다. <br><br>\"이걸 나한테 주는 거야?\"<br><br>그러더니 그는 까르르 웃으며 손사래를 쳤다.<br><br>\"장난도 심하지!\""
                }
            }
        }
    },
    yuri: {
        reactions: {
            yuriFavorite: {
                great: {
                    affection: 3,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: ""
                }
            },
            yuriHate: {
                great: {
                    affection: -1,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: -3,
                    rage: 3,
                    lust : 0,
                    line: ""
                }
            },


            sweet: {
                great: {
                    affection: 2,
                    rage: 0,
                    lust : 0,
                    line: "\"와, 정말 맛있다!\"<br><br>유리는 웃으며 당신의 음식을 먹었다. 생각해보니 그는 달콤한 것을 즐기지 않았던 거 같은데, 지금은 웃으며 먹고 있는 걸 보니 예전보다는 잘 먹을 수 있게 된 것처럼 보인다. 아니면 당신을 향한 배려든가."
                },
            
                normal: {
                    affection: 1,
                    rage: 0,
                    lust : 0,
                    line: "\"맛있어.\"<br><br>유리는 달콤한 음식을 먹으며 미소를 지었다. 그는 쉘터의 아이들도 당신의 음식을 좋아해줄 거라고 말하며 웃었다."
                },
            
                bad: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: "\"괜찮아.\"<br><br>유리는 당신이 만들어준 음식을 먹으면서 말했다. <br><br>\"요리는 하다보면 늘 거야.\""
                }
            },
            
            lusty: {
                great: {
                    affection: -2,
                    rage: 0,
                    lust : 0,
                    line: "유리는 당신이 가져온 음식을 뚫어지게 응시하다가 작게 한숨을 쉬었다. <br><br>\"음식에 이런 장난을....\"<br><br>그는 어린 아이를 바라보는 시선으로 당신을 보고 있다."
                },

                normal: {
                    affection: -4,
                    rage: 0,
                    lust : 0,
                    line: "유리는 당신이 가져온 음식을 비닐봉지에 담았다. <br><br>\"쉘터에는 이런 음식을 가져오지 않았으면 좋겠어.\""
                },
            
                bad: {
                    affection: -6,
                    rage: 0,
                    lust : 0,
                    line: "유리가 코를 찡그렸다. 그러더니 그는 당신이 만든 음식을 비닐봉투에 담아서 꽁꽁 묶었다. <br><br>\"....\"<br><br>그는 당신을 비난하지 않았다, 그저 쳐다볼 뿐."
                }
            },

            lustyHighAffection : {
                great: {
                    affection: 0,
                    rage: 0,
                    lust : 5,
                    line: "유리는 당신이 가져온 음식을 보더니 바로 그 음식을 손으로 가렸다. 그는 음식을 비닐봉투에 담으며 고개를 저었다. <br><br>\"이런 건...\"<br><br>말을 흐리는 그의 얼굴 위로 홍조가 일었다."
                },

                normal: {
                    affection: 0,
                    rage: 0,
                    lust : 5,
                    line: "유리는 당신이 가져온 음식에 한숨을 쉬더니 비닐봉지를 가져왔다. 그는 비닐봉지 안에 음식을 담으며 이런 장난은 졸업해주면 안 되냐고 물었다. <br><br>\"귀엽긴 하... 음.\"<br><br>그는 목을 가다듬은 후 비닐봉투를 묶었다."
                },
            
                bad: {
                    affection: 0,
                    rage: 0,
                    lust : 1,
                    line: "유리는 당신이 가져온 음식을 바로 비닐봉투에 넣었다. 그는 어색한 미소를 지으며 당신에게 이거 먹을 거냐고 물었다. <br><br>\"안 먹을 거면 내가 버릴게. 이런 건 몸에 안 좋아.\""
                }
            },
            
            default: {
                trash: {
                    affection: -3,
                    rage: 0,
                    lust : 0,
                    line: "쓰레기를 받은 유리는 쓰레기와 당신을 번갈아보았다. <br><br>\"...나 주는 거야?\"<br><br>그리고 또 정적이 흘렀다."
                }
            }
        }
    },
    kain: {
        reactions: {
            kainFavorite: {
                great: {
                    affection: 3,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: 0,
                    rage: 0,
                    lust : 0,
                    line: ""
                }
            },
            kainHate: {
                great: {
                    affection: -1,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                normal: {
                    affection: -2,
                    rage: 2,
                    lust : 0,
                    line: ""
                },
            
                bad: {
                    affection: -3,
                    rage: 3,
                    lust : 0,
                    line: ""
                }
            },


            sweet: {
                great: {
                    affection: 4,
                    rage: 0,
                    lust : 0,
                    line: "\"이거 네가 만든 거야?\"<br><br>그는 당신이 만든 음식을 먹더니 놀란 표정을 지었다. <br><br>\"이상한 거 넣은 건 아니지?\"<br><br>그는 삐딱하게 말했지만 귀끝의 홍조는 숨기지 못했다. 아니, 귀뿐만 아니라 뺨도 붉었다."
                },
            
                normal: {
                    affection: 3,
                    rage: 0,
                    lust : 0,
                    line: "\"어렸을 때 형이 많이 줬었어. 형은 달콤한 거 싫어하거든.\"<br><br>카인은 당신의 음식을 먹으면서 말했다. 옛날 생각을 하는 건지 그의 눈동자는 어두워졌다. 그는 은근슬쩍 당신과의 거리를 좁혀왔다."
                },
            
                bad: {
                    affection: 2,
                    rage: 0,
                    lust : 0,
                    line: "\"우웩.\"<br><br>그는 먹자마자 인상을 찌푸렸다. 하지만 당신이 가져가려고 하자 휙 손을 뒤로 내뺐다. <br><br>\"이미 줬잖아. 그럼 내꺼지.\""
                }
            },
            
            lusty: {
                great: {
                    affection: 1,
                    rage: 0,
                    lust : 8,
                    line: "카인은 당신과 음식을 멍하니 번갈아보았다. <br><br>\"너...너 미쳤냐!\"<br><br>그러면서도 그는 당신의 음식을 버리지는 않았다."
                },

                normal: {
                    affection: 0,
                    rage: 3,
                    lust : 8,
                    line: "음식에서 풍겨오는 비릿한 냄새에 카인은 자기도 모르게 뒤로 물러났다. <br><br>\"미친, 미친새끼...\"<br><br>하지만 당신이 음식을 밀어주자 그는 거부하지 못하고 받아버렸다. <br><br>\"미친새끼야...\""
                },
            
                bad: {
                    affection: -2,
                    rage: 3,
                    lust : 8,
                    line: "그는 냄새를 맡자마자 인상을 찌푸렸다. <br><br>\"씨발, 뭔 쓰레기를 가져오냐? 당장 치워.\"<br><br>그는 휙 고개를 돌렸지만 그 음식에서 시선을 떼지는 못했다. <br><br>\"하... 존나 비위 상하는데...\"<br><br>그는 당신에게 성큼성큼 다가오더니 손가락으로 푹 찍어서 맛을 보았다. 우욱, 헛구역질을 하며 그가 고개를 숙였다."
                }
            },

            lustyHighAffection : {
                great: {
                    affection: 3,
                    rage: 0,
                    lust : 15,
                    line: "카인은 당신과 음식을 번갈아보았다. 그의 얼굴이 점점 홍당무처럼 붉어지고 있다. <br><br>\"너, 너.... 다른 사람한테는 이러지 마라!?\"<br><br>그는 훽 당신의 음식을 낚아채듯이 가져갔다."
                },

                normal: {
                    affection: 2,
                    rage: 0,
                    lust : 5,
                    line: "카인은 당신과 음식을 번갈아보았다. 그의 얼굴이 점점 홍당무처럼 붉어지고 있다. <br><br>\"씨발, 나 비린 거 못 먹는데... 너 일부러 그러는 거냐?\"<br><br>중얼중얼 욕을 하면서도 그는 당신의 음식을 챙겼다."
                },
            
                bad: {
                    affection: 0,
                    rage: 3,
                    lust : 1,
                    line: "\"우욱.\"<br><br>그는 바로 벽에 손을 짚으며 헛구역질을 했다. 비위가 약한 그에게 이런 음식은 최악이었다. 그는 당신을 노려보았다. <br><br>\"너 설마 나한테 먹으라 할 건...\"<br><br>그의 동공이 세차게 흔들린다."
                }
            },
            
            default: {
                trash: {
                    affection: -7,
                    rage: 10,
                    lust : 0,
                    line: "\"...뭐야?\"<br><br>카인은 당신의 음식을 그대로 던졌다. 당신의 옆으로 지나간 음식, 그리고 이어서 들리는 쩅그랑 소리. <br><br>\"너나 처먹어.\""
                }
            }
        }
    }
};

function openGiveFoodMenu(player, npcId){
    const foods = player.inventory.filter(item =>
        item.tags?.includes("gift")
    );

    if (foods.length === 0){
        startScene([
            {
                type: "text",
                value: "건넬 만한 음식이 없다."
            }
        ], player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });
        return;
    }

    const choices = foods.map((item, index) => ({
        text: item.name,
        action: `${npcId}_giveFood_${index}`
    }));

    choices.push({
        text: "돌아간다",
        action: `${npcId}_otherTalk`
    });

    window.__giveFoodTemp = {
        npcId,
        foods
    };

    startScene([
        {
            type: "text",
            value: "어떤 음식을 건넬까?"
        },
        {
            type: "choice",
            choices
        }
    ], player);
}

function getGiftTaste(item, npcId){
    const tags = item.tags || [];

    if (tags.includes(`${npcId}Favorite`)) return `${npcId}Favorite`;
    if (tags.includes(`${npcId}Hate`)) return `${npcId}Hate`;

    if (tags.includes("sweet")) return "sweet";
    if (tags.includes("lusty")) return "lusty";

    return "default";
}

function getGiftGrade(item){
    const tags = item.tags || [];

    if (tags.includes("trash")) return "trash";
    if (tags.includes("great")) return "great";
    if (tags.includes("bad")) return "bad";
    return "normal";
}

function giveFoodToNpc(player, npcId, item){
    const config = NPC_GIFT_CONFIG[npcId];

    if (!config){
        console.warn(`선물 설정이 없는 NPC입니다: ${npcId}`);
        return;
    }

    const grade = getGiftGrade(item);
    const taste = getGiftTaste(item, npcId);

    const affection = NPC_DATA[npcId]?.emotion?.affection || 0;

    let reaction =
        config.reactions?.[taste]?.[grade] ||
        config.reactions?.default?.[grade];

    
        //러스트 반응(NPC별)
        if (
            npcId === "matin" &&
            taste === "lusty" &&
            affection >= 70
        ){
            reaction = config.reactions?.lustyHighAffection?.[grade] || reaction;
        }

        if (
            npcId === "yuri" &&
            taste === "lusty" &&
            affection >= 90
        ){
            reaction = config.reactions?.lustyHighAffection?.[grade] || reaction;
        }

        if (
            npcId === "kain" &&
            taste === "lusty" &&
            affection >= 50
        ){
            reaction = config.reactions?.lustyHighAffection?.[grade] || reaction;
        }
        


        if (!reaction){
            console.warn(`선물 반응이 없습니다: ${npcId}, ${taste}, ${grade}`);
            return;
        }
        
        if (reaction.affection){
            changeEmotion(npcId, "affection", reaction.affection);
        }
        
        if (reaction.rage){
            changeEmotion(npcId, "rage", reaction.rage);
        }
        
        if (reaction.lust){
            changeEmotion(npcId, "lust", reaction.lust);
        }
        
        removeItem(player, item);
        savePlayer(player);
        
        let line = reaction.line || "상대는 음식을 받아들였다.";

        const processorName = `process${npcId.charAt(0).toUpperCase()}${npcId.slice(1)}Text`;
        
        if (typeof window[processorName] === "function"){
            line = window[processorName](line, player);
        }

        startScene([
            {
                type: "text",
                value: line
            }
        ], player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });
}

function registerGiftActions(npcId){
    const actions = {};

    for (let i = 0; i < 100; i++){
        actions[`giveFood_${i}`] = (player) => {
            const temp = window.__giveFoodTemp;

            if (!temp || temp.npcId !== npcId){
                startScene(getLocationScene(player), player);
                return;
            }

            const item = temp.foods[i];

            if (!item){
                startScene(getLocationScene(player), player);
                return;
            }

            giveFoodToNpc(player, npcId, item);
        };
    }

    registerActions(npcId, actions);
}
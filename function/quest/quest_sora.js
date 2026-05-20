const SORA_QUESTS = {
    sora_drug_01: {
        id: "sora_drug_01",
        title: "마약 5개 가져오기",
        type: "collect",
        category : "sub",
        giver: "sora",

        requiredItem: "drug",
        requiredCount: 5,

        rewardGold: 1500,

        require: {
            flag: "sora_drugQuest_unlocked"
        },

        onComplete: (player) => {
            player.flags = player.flags || {};
            player.flags.sora_drug_01_done = true;
            player.flags.sora_next_event_unlocked = true;
        }
    }
};

const SORA_SEWER_EVENT_01 = [
    {
        type : "text",
        value : "하수구로 들어가려는 순간, 당신은 익숙한 하얀색 머리카락을 보았다. 소라다. 거지의 품에서 마약을 꺼낸 그는 당신의 인기척에 움찔하더니 뒤를 돌아보았다. <br><br>\"{soraTitle}!\"<br><br>소라는 환하게 웃었다.<br><br>\"냄새로 너인 걸 알 수 있었어.\"<br><br>" +
                "당신은 소라의 손에 들려있는 마약을 본다. 당신의 시선을 알아차린 소라는 웃으며 당신에게 몇 걸음 다가왔다. <br><br>\"왜 그래? 이들은 죽었으니 이제 필요없잖아.\""
    },
    {
        type : "choice",
        choices : [
            {
                text : "당신은 소라에게 마약이 너한테는 쓸모 있는 거냐고 물었다.",
                scene : [
                    {
                        type : "text",
                        value : "당신의 말에 소라는 놀란 듯 눈을 깜박였다. 그것도 잠시 그는 히히 웃으며 당신의 주변을 빙그르르 돌았다. <br><br>\"나한테는? 나한테 관심 가져주는 거야?\"<br><br> 흐음, 알려줄까, 말까, 소라는 고민하듯이 고개를 갸웃거리며 계속 빙빙 당신의 주변을 돌았다.<br><br>" +
                                "\"으응, 어쩔까, 일단 하나는 확실히 말해둘까. 나한테는 필요해. 그래서 말인데에.\" <br><br>소라는 당신의 주변을 빙그르르 돌던 걸 멈추었다. 그는 당신의 귀 가까이에 있다. <br><br>\"나 좀 도와줄래? 소라가~ 정말정말로 마약 5개가 필요하다고 한다면 줄 거야?\"<br><br>그의 부드러운 입김이 당신의 귀 바로 옆에 느껴진다."
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            changeEmotion("sora", "affection", 5);
                            changeEmotion("sora", "lust", 5);
                        }
                    },
                    soraDrugQuestAcceptChoice()
                ]
            },
            {
                text : "마약은 나쁜 거다. 당신은 소라가 마약을 챙기는 걸 못 본 척하기로 했다. 당신이 모른 척 시선을 돌리자 소라의 미소가 짙어졌다.",
                scene : [
                    {
                        type : "text",
                        value : "\"어머. 앙큼해라. {soraTitle}, 지금 너 못 본 척하는 거야?\" <br><br>불쑥 당신에게 다가온 그가 당신을 끌어안았다. 그의 풍만한 가슴이 당신의 몸에 닿는다. <br><br>\"아니면 못 본 척해주는 건가? 상냥해라.\"<br><br> 소라는 당신의 대답을 기다리지 않았다." +
                                "그는 그저 당신을 껴안은 채로 당신에게 공범이 되어달라고 말했다. <br><br>\"공범으로 나랑 엮이는 거야... 어때? 마약 5개만 나한테 가져와주지 않을래?\""
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            changeEmotion("sora", "lust", 5);
                        }
                    },
                    soraDrugQuestAcceptChoice()
                ]
            },
            {
                text : "마약이 나쁘다는 건 알지만, 당신은 소라를 도와주기로 했다. 당신은 소라에게 도와줄까? 라고 물었다.",
                scene : [
                    {
                        type : "text",
                        value : "소라는 당신의 말에 놀란 듯 싶었다. 그의 금색 눈동자는 금방이라도 터질 거 같은 물방울처럼 커져있었다. 그는 몇 번 눈을 깜박이더니 와르르 웃음을 터뜨렸다. <br><br>\"아, 나의 {soraTitle}!\"<br><br> 소라는 당신을 그대로 끌어안더니 당신에게 키스했다. 그의 갑작스러운 키스에 당신은 어떤 행동도 취할 수 없었다. 소라는 자기도 모르게 당신의 입술 안을 긴 혀로 쪽쪽거리다가 정신을 차리고 당신을 다시 놓아주었다." +
                                " 하지만 놓아준 후에도 소라의 눈동자는 여전히 흥분으로 일렁이고 있었다. 그는 당신에게서 단 한 번도 시선을 떼지 않은 채 고맙다고 말했다. <br><br>\"너도 나와 같은 생각일지도 모른다는 생각이 들었어.... 나의 {soraTitle}, 그러면 딱 5개만 구해줄래?\""
                    },
                    {
                        type : "effect",
                        run : (player) => {
                            changeEmotion("sora", "lust", 10);
                            changeEmotion("sora", "affection", 10);
                            changeEmotion("sora", "dominance", 10);
                            changeSensitivity(player, "mSensitivity", 5);
                        }
                    },
                    soraDrugQuestAcceptChoice()
                ]
            }
        ]
    }
]

//소라 개인퀘스트 1 - 소라 하수구 마약
function unlockSoraDrugQuest(player){
    player.flags = player.flags || {};
    player.flags.sora_drugQuest_unlocked = true;
    localStorage.setItem("playerData", JSON.stringify(player));
}

function startSoraSewerEvent01(player){
    player.flags = player.flags || {};

    runScene(SORA_SEWER_EVENT_01, player, {
        onEnd: () => {
            player.flags.sora_drugQuest_unlocked = true;
            player.flags.sora_sewer_event_seen = true;
            localStorage.setItem("playerData", JSON.stringify(player));
            startScene(buildDungeonScene(player), player);
        }
    });
}

function soraDrugQuestAcceptChoice(){
    return {
        type: "choice",
        choices: [
            {
                text: "수락한다",
                scene: [
                    {
                        type: "text",
                        value: "당신이 고개를 끄덕이자 소라의 표정이 환해졌다. 깊은 금색 눈동자가 당신을 전부 품고 싶다는 듯이 바라본다. <br><br>\"기다리고 있을게... {soraTitle}.\"."
                    },
                    {
                        type: "effect",
                        run: (player) => {
                            acceptSoraDrugQuest(player);
                        }
                    }
                ]
            },
            {
                text: "거절한다",
                scene: [
                    {
                        type: "text",
                        value: "당신이 제안을 거절하자 소라는 눈이 동그래졌다. 그러더니 그는 삐졌다는 듯 입술을 삐죽였다. <br><br>\"치이. 하지만 다음에는 들어줘야 해?\" <br><br>그는 마약을 챙겨 하수구 밖으로 나갔다."
                    },
                    {
                        type: "effect",
                        run: (player) => {
                            changeEmotion("sora", "affection", -3);
                        }
                    }
                ]
            }
        ]
    };
}

function isSoraDrugQuestAccepted(player){
    return player.flags?.sora_drugQuest_accepted && !player.flags?.sora_drug_01_done;
}

function acceptSoraDrugQuest(player){
    initQuestData(player);

    const questId = "sora_drug_01";

    const alreadyActive = player.quest.subActive.some(q => q.id === questId);
    const alreadyCompleted = player.quest.completed.includes(questId);

    if (!alreadyActive && !alreadyCompleted){
        player.quest.subActive.push({
            id: questId,
            progress: 0
        });
    }

    player.flags = player.flags || {};
    player.flags.sora_drugQuest_unlocked = true;
    player.flags.sora_drugQuest_accepted = true;

    localStorage.setItem("playerData", JSON.stringify(player));
}

function trySubmitSoraDrugQuest(player){
    const quest = SORA_QUESTS.sora_drug_01;

    if (!isSoraDrugQuestAccepted(player)){
        startScene(getLocationScene(player), player);
        return;
    }

    const hasDrug = countItem(player, quest.requiredItem);

    if (hasDrug < quest.requiredCount){
        startScene([
            {
                type: "text",
                value:
                    "소라는 금안을 깜박이며 당신의 손을 내려다보았다. 마약 봉지가 5개가 아닌데? 그는 싱글거렸다. <br><br>\"뭐야? 바보 흉내내면서 날 더 보고 싶었던 거야? 귀여워라!\"<br><br>그는 까르르 웃었다."
            },
            {
                type: "choice",
                choices: [
                    { text: "돌아간다", action: "return_shop" }
                ]
            }
        ], player);
        return;
    }

    startScene([
        {
            type: "text",
            value:
                "소라는 당신을 올려다보았다. 하얀색 머리카락 아래로 그의 금안이 가늘게 찢어진다. <br><br>\"다 모았어?\""
        },
        {
            type: "choice",
            choices: [
                {
                    text: "마약 5개를 건넨다",
                    scene: [
                        {
                            type: "effect",
                            run: (player) => {
                                removeItem(player, quest.requiredItem, quest.requiredCount);
                                changeGold(player, quest.rewardGold || 0);

                                initQuestData(player);
                                player.quest.subActive = player.quest.subActive.filter(
                                    q => q.id !== quest.id
                                );
                                
                                if (!player.quest.completed.includes(quest.id)){
                                    player.quest.completed.push(quest.id);
                                }

                                if (typeof quest.onComplete === "function"){
                                    quest.onComplete(player);
                                }

                                localStorage.setItem("playerData", JSON.stringify(player));
                            }
                        },
                        {
                            type: "text",
                            value:
                                "당신은 모아온 마약 5개를 건넸다. 소라는 미소를 지으며 당신에게서 마약을 받았다. <br><br>\"착해라, 내 {soraTitle}. 말을 정말 잘 듣네...?\"<br><br>그는 당신 쪽으로 고개를 숙여보였다. <br><br>\"원한다면 보상이라도 더 줄까?\""
                        },
                        {
                            type : "choice",
                            choices : [
                                {
                                    text : "당신은 소라에게 얼굴을 기울였다.",
                                    scene : [
                                        {
                                            type : "text",
                                            value : "당신이 고개를 기울이자 소라의 금안이 반짝였다. 그는 당신에게 부드럽게 해주겠다고 말하며, 당신의 입술에 꽃잎같은 자신의 입술을 묻었다. 쪽쪽거리는 소리가 끊나지 않는다. 소라는 당신에게 키스하며 점차 당신을 뒤로 밀어붙였다. 점점 당신의 몸이 뒤로 기울어진다." +
                                                    "소라는 당신의 뒤통수가 바닥에 닿을 때까지 멈추지 않았다. 괴물의 전리품 냄새, 그리고.... 꽃 냄새. 소라의 상점에는 유독 하얀 꽃이 많긴 했다. 당신의 머리는 그 향에 취해서 몽롱해졌다. 흐릿해지는 시야 속으로 소라가 당신의 입술을 놓아주지 않은 채 웃고 있는 것이 보인다." +
                                                    "당신의 다리 사이로 소라의 한쪽 다리가 들어온다. 그는 당신의 다리 사이에 자신의 다리를 집어넣고, 무릎으로 당신의 중심부를 꾹꾹 눌렀다. 조금씩, 조금씩, 그는 당신의 중앙을 침범해왔다. 몇 분이 지나고 나서야 소라는 당신에게서 입술을 뗐다.<br><br>" +
                                                    "\"기분, 좋아?\"<br><br>소라는 당신을 내려다보며 말했다. 당신의 시야는 아직 돌아오지 않았다. 소라는 당신을 일으킨 후 카운터 의자에 앉혀주었다. <br><br>\"나는 좋았어, 진심으로.\"<br><br>그와의 키스는, 달콤한 꿀 맛이었다."
                                        },
                                        {
                                            type : "effect",
                                            run : (player) => {
                                                changeEmotion("sora", "affection", 15);
                                                changeEmotion("sora", "dominance", 10);
                                                changeEmotion("sora", "lust", -5);
                                                changeSensitivity(player, "mSensitivity", 15);
                                                changeSensitivity(player, "cSensitivity", 5);
                                                changeArousal(
                                                    player,
                                                    getSensitivityArousalGain(player, "m", 20)
                                                );
                                                changeArousal(
                                                    player,
                                                    getSensitivityArousalGain(player, "c", 10)
                                                );
                                                passTime(player, 5);

                                                localStorage.setItem("playerData", JSON.stringify(player));
                                            }
                                        }
                                    ]
                                },
                                {
                                    text : "당신은 괜찮다고 말하며 고개를 저었다.",
                                    scene : [
                                        {
                                            type : "text",
                                            value: "당신이 고개를 젓자 소라는 입을 삐죽였다. <br><br>\"정말? 이런 기회는 놓치지 않는 게 좋을 텐데?\" <br><br>그러면서도 그는 더 이상 당신을 압박하지는 않았다. 장난기 어린 가벼운 목소리로 그는 당신의 눈앞으로 마약 5개를 흔들어보였다. <br><br>\"다음 번에도 도와줄 거지?\""
                                        },
                                        {
                                            type : "effect",
                                            run : (player) => {
                                                changeEmotion("sora", "affection", 10);

                                                localStorage.setItem("playerData", JSON.stringify(player));
                                            }                                
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    text: "아직 주지 않는다",
                    action: "return_shop"
                }
            ]
        }
    ], player);
}

//기능 문제

function canShowSoraQuest(player, quest){
    if (!quest.require) return true;

    if (quest.require.flag){
        return !!player.flags[quest.require.flag];
    }

    return true;
}
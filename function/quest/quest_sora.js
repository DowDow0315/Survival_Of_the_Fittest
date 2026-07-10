const SORA_QUESTS = {
    sora_drug_01: {
        id: "sora_drug_01",
        title: "소라를 위한 마약 5개",
        type: "collect",
        category : "sub",
        giver: "소라",

        requiredItem: "drug",
        requiredCount: 5,

        rewardGold: 700,

        require: {
            flag: "sora_drugQuest_unlocked"
        },

        onComplete: (player) => {
            player.flags = player.flags || {};
            player.flags.sora_drug_01_done = true;
            player.flags.sora_next_event_unlocked = true;
        }
    },

    sora_drug_02 : {
        id : "sora_drug_02",
        title : "소라를 위한 하얀꽃잎조각들 8개",
        type : "collect",
        category : "sub",
        giver : "소라",

        requiredItem : "pieceofwhiteflower",
        requiredCount : 8,

        rewardGold : 1000,

        require : {
            flag : "upperCity_quest01_started"
        },

        onComplete: (player) => {
            player.flags = player.flags || {};
            player.flags.sora_drug_02_done = true;
            player.flags.sora_drug_02_completed_day = getCurrentDay(player);
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
                                                changeEmotion("sora", "lust", -15);
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

//소라 개인퀘스트 2 - 소라 하얀꽃잎조각들
window.accept_sora_drug_02 = function(player){
    initQuestData(player);

    const questId = "sora_drug_02";

    const alreadyActive = player.quest.subActive.some(q => q.id === questId);
    const alreadyCompleted = player.quest.completed.includes(questId);

    if (!alreadyActive && !alreadyCompleted){
        player.quest.subActive.push({
            id: questId,
            progress: 0
        });
    }
    
    player.flags.sora_drug_02_started = true;
    player.flags.sora_drug_02_started_day = getCurrentDay(player);

    savePlayer(player);
};

function trySubmitSoraDrugQuest02(player){
    const quest = SORA_QUESTS.sora_drug_02;

    const hasDrug = countItem(player, quest.requiredItem);

    if (hasDrug < quest.requiredCount){
        startScene([
            {
                type: "text",
                value:
                    "소라는 고개를 갸웃거렸다. <br><br>\"하얀꽃잎조각들 8개가 아닌데?\"<br><br>그는 웃음을 터뜨리더니 그냥 자신의 얼굴을 보러 온 거냐고 물었다. <br><br>\"내 얼굴 보러 온 거면 그런 변명 없이 그냥 와도 돼, {soraTitle}.\""
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
                    text: "하얀꽃잎조각들 8개를 건넨다",
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

                                savePlayer(player);
                            }
                        },
                        {
                            type: "text",
                            value:
                                "당신은 하얀꽃잎조각들 8개를 내밀었다. 소라의 손바닥 위에 앉은 하얀꽃잎조각들은 마치 살아있는 것처럼 하늘하늘 흔들렸다. 소라는 하얀꽃잎조각들을 내려다보다가 그대로 주먹으로 쥐었다. 주륵, 미량이었이지만 하얀 애액이 흘러내렸다." +
                                " 당신이 하얀 애액을 바라보자 소라는 웃으며 자신에게는 하얀 애액이 필요했던 거라고 말했다. 그는 당신의 코밑으로 손가락을 뻗었다. 하얀 애액이 묻은 그의 손가락에서 달콤한 냄새가 난다." +
                                "<br><br>\"달콤하지? 내겐 이 애액이 필요했거든.\"<br><br>" +
                                "그는 하얀꽃잎조각들을 작은 병 안에 넣더니 당신을 올려다보았다." +
                                "<br><br>\"보상 줄까?\"<br><br>" +
                                "그의 목소리는 달콤했다."
                        },
                        {
                            type : "choice",
                            choices : [
                                {
                                    text : "당신은 고개를 끄덕였다.",
                                    scene : [
                                        {
                                            type : "text",
                                            value : [
                                                "당신이 고개를 끄덕이자 소라는 당신의 목을 끌어안았다. 그러더니 그대로 당신을 밑으로 쓰러뜨렸다. 순간, 당신의 주변으로 하얀꽃잎들이 풀썩 날아올랐다가 다시 스러졌다. 마치 당신이 꽃침대에 떨어진 것마냥... 눈을 다시 깜박였을 때 당신의 주변에 꽃침대는 없었다." +
                                                "<br>소라의 입술이 당신의 가슴 위로 내려앉았다. 그는 당신의 가슴을 혀로 핥아올렸다. 가슴에 닿는 그의 혀는 얼음마냥 차가웠다. 당신의 발이 고통과 쾌락으로 바들바들 발작하듯이 떨렸다. 하지만 소라는 무릎으로 당신의 경련하는 발을 누르고 가슴 애무를 이어갔다. 핥짝, 핥짝, 점점 그의 혀가 차갑게 느껴지지 않는다. 마치 아까의 차가움은 당신의 환상이었던 것처럼, 그렇게 사라졌다." +
                                                "<br>차가움이 가시자 당신의 가슴이 뜨겁게 달아올랐다. 소라는 입을 벌리더니 당신의 가슴을 쪽쪽 빨았다. 모유를 빠는 것처럼 보이기도 했다. 당신의 가슴에서 모유가 나올 리가 없는데도 당신은 정말로 당신의 가슴에서 뭔가를 뺏기는 기분이 들었다. 하지만 그 기분은 상실감보다는 몽롱한 쾌락으로 이어졌다. 당신의 시야가 뿌얘졌다." +
                                                "<br><br>\"사랑해.\"<br><br>" +
                                                "소라가 당신의 가슴에 대고 속삭였다. 뜨거운 애액이 울컥, 당신의 가슴을 적셨다. 당신은 멍한 눈으로 소라만을 바라보았다. 그는 시야가 돌아오지 않은 당신을 일으켜세우더니 당신의 머리를 부드럽게 쓰다듬었다." +
                                                "<br><br>\"언젠가는 사랑한다고도 말해줘야 해, 응? 그럼 더 기분 좋게 해줄 테니까...\""
                                            ]
                                        },
                                        {
                                            type : "effect",
                                            run : (player) => {
                                                changeEmotion("sora", "affection", 15);
                                                changeEmotion("sora", "dominance", 10);
                                                changeEmotion("sora", "lust", -15);
                                                changeSensitivity(player, "bSensitivity", 15);
                                                changeArousal(
                                                    player,
                                                    getSensitivityArousalGain(player, "b", 20)
                                                );
                                                passTime(player, 5);

                                                savePlayer(player);
                                            }
                                        }
                                    ]
                                },
                                {
                                    text : "당신은 괜찮다고 말하며 고개를 저었다.",
                                    scene : [
                                        {
                                            type : "text",
                                            value : [
                                                "\"정말? 소라는 정말 기분 좋게 해줄 수 있는데.\"<br><br>" +
                                                "소라는 아쉽다는 걸 숨기지는 않았지만 당신에게 더 강요하지도 않았다. 그는 하얀꽃잎조각들을 넣은 작은 병을 병 선반에 올려놓으며 콧노래를 불렀다. 그의 병 선반에는 이미 하얀꽃잎조각들이 담긴 병들로 가득했다. 그는 병 선반을 다시 안 보이게끔 밀었다.",
                                                "<br><br>\"다음에도 도와줄 거지?\"<br><br>" +
                                                "그는 장난기 어린 미소와 함께 말했다. 다음 번에는 보상도 꼭 받고 말이야...."
                                            ]
                                        },
                                        {
                                            type : "effect",
                                            run : (player) => {
                                                changeEmotion("sora", "affection", 10);
                                                savePlayer(player);
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
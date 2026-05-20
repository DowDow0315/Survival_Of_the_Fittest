function processSoraText(text, player){
    return text.replaceAll("{soraTitle}", getSoraTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getSoraTitle(player){
    if (NPC_DATA["sora"].emotion.affection > 80) return "천사";
    else if(NPC_DATA["sora"].emotion.affection > 50) return "사랑둥이";
    return "귀염둥이";
}

registerActions("sora",{
    //처음이벤트
    firstMeeting: (player) => {
        changeEmotion("sora", "affection", 5);
        addItem(player, ITEMS.consumable.fullPotion);
        startScene(NPC_DATA["sora"].scenes.sora_firstMeeting, player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
    },

    //개인이벤트
    submit_drugQuest: (player) => {
        trySubmitSoraDrugQuest(player);
    },

    //스토리이벤트

    //상점대화로그
    talk: (player) => {
        if (isSoraDrugQuestAccepted(player)){
            startScene([
                {
                    type: "text",
                    value:
                    "소라는 당신을 보자 눈을 반짝였다.<br><br>" +
                    "\"혹시 부탁한 거 가져왔어?\""
                },
                {
                    type: "choice",
                    choices: [
                        { text: "마약을 건넨다", action: "sora_submit_drugQuest" },
                        { text: "당신은 곧 가져다주겠다고 말하며 고개를 저었다. 소라는 당신의 대답에 미소를 지었다.", action: "return_shop" }
                    ]
                }
            ], player);
            return;
        }

        passTime(player, 5);
        const affection = NPC_DATA["sora"].emotion.affection;
        const onEnd = () => {
            changeEmotion("sora", "affection", 1);
            changeEmotion("sora", "lust", 3);
            startScene(getLocationScene(player), player);
        };

        if (affection > 80){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "\"나의 {soraTitle}, 내가 보고 싶어서 온 거야?\"<br><br>소라는 당신의 어깨를 장난스럽게 톡 쳤다. 물론 장난으로 시작한 그의 손은 당신의 가슴에서 끝났다.",
                        "졸립다고 칭얼거리며 소라는 당신에게 기대왔다. 그의 가슴이 당신의 어깨에 닿는다. 소라는 슬쩍 자신의 가슴을 당신에게 더 밀착했다.",
                        "\"내가 널 얼마나 사랑하는지 네가 알면 좋을 텐데.\"<br><br>소라는 당신이 미처 반응도 하기 전에 당신에게 다가와 당신의 이마 위로 키스를 했다.",
                        "\"이 세상에 딱 너랑 나만 존재하면 좋을 텐데.\"<br><br>소라는 당신의 손을 잡고 살랑살랑 흔들었다.<br><br>\"모두가 없는 세상에서 우리 둘만.\""
                    ])
                }
            ], player, { onEnd });
        } else if (affection > 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "소라는 졸고 있다가 당신의 목소리에 깨더니 미소를 지었다. 그는 당신의 어깨에 머리를 기대더니 언젠가 당신이 숲에는 가지 말았으면 좋겠다고 말했다.",
                        "\"왜? 무슨 일 있어?\"<br><br>소라는 까르르 웃었다.<br><br>\"물론 별일없어도 불러도 돼, {soraTitle}! 너는 사랑스러우니까!\"",
                        "소라는 당신의 손에 나무몽둥이를 대보았다. 당신의 손위에 있는 나무몽둥이를 보던 그의 얼굴이 살짝 붉어졌다. 그는 나무몽둥이를 치우더니 자신의 흰색머리카락을 꼬며 흥얼거렸다."
                    ])
                }
            ], player, { onEnd });
        } else{
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "소라는 당신이 부르는 목소리에도 몇 번 깨지 못하다가 이제야 깼다. 그는 당신에게서 익숙하면서도 낯선 냄새가 난다고 말했다.<br><br>\"그래서 너랑 있으면 더 편해지나? 나 원래는 누가 부르면 바로 일어나거든. 네가 편한가봐.\"",
                        "소라는 당신의 앞에서 나무몽둥이를 휘휘 휘둘렀다. 가볍게 휘휘.",
                        "\"에릭이나 루크나 너무 짜증나.\"<br><br>소라는 투덜거리며 자신의 돈을 셌다. 딱 봐도 많아보인다."
                    ])
                }
            ], player, { onEnd });
        }
    }
})

//샵 랜덤 이벤트
function startSoraShopRandomEvent01(player){
    startScene([
        {
            type: "text",
            value:
                "당신이 상점 물건을 고르고 있는 동안, 상점 물건을 정리하고 있던 소라는 슬며시 당신에게 가까이 다가왔다. 당신의 바로 옆에서 소라의 숨결이 느껴진다. 소라는 고개를 갸웃거리며 어떤 물건에 관심을 보이는 거냐고 물었다. 당신은 소라의 말에 대답을 해준 후 다시 물품을 구경했다." +
                " 시간이 지나도, 소라는 당신의 바로 옆에서 당신을 바라보고 있었다. 소라의 시선을 눈치챈 당신이 다시 고개를 돌렸을 때, 소라는 당신의 바로 옆에서 당신을 빤히 응시하고 있었다. 소라는 당신과 시선을 마주치자 싱그럽게 웃으면서 네가 너무 사랑스러워서 바라보고 있었다고 말했다." +
                " 그는 은근슬쩍 당신에게 몸을 기대오면서 키스해도 되냐고 물었다. 아주 가까이에서, 당신은 소라의 입술을 보았다. 어쩐지 소라의 입술이 평소보다 더 촉촉하게 느껴진다."
        },
        {
            type: "choice",
            choices: [
                {
                    text: "당신은 고개를 끄덕이며, 소라 쪽으로 고개를 기울였다.",
                    scene: [
                        {
                            type: "text",
                            value:
                                "소라는 그럴 줄 알았다는 듯이 똑같이 고개를 기울여보였다. 맞닿은 입술 사이로 달콤한 액이 늘어진다. 당신은 달콤한 꿀향에 잔뜩 취해서 동공이 풀렸다. 소라는 그런 당신의 뒤통수를 자신의 손으로 지탱하며, 당신을 더 자기 쪽으로 끌어당겼다. 키스를 하고 있는데도, 소라의 목소리가 들려왔다. <br><br>" +
                                "\"쉬잇. 괜찮아. 나랑 있는 동안에는 아무 걱정하지 않아도 돼.\" <br><br>그의 목소리는 그의 키스만큼이나 달콤했다. 당신은 어쩐지 붕 뜬 느낌이라서 발을 휘저었다. 둥실둥실, 당신의 발은 바닥에 닿지 않았다. 당신의 몽롱한 시선에 소라는 만족한 듯이 읏으며 \"너도 이 기분을 사랑하지?\"라고 물었다." +
                                "그는 당신의 지금 표정을 제일 사랑한다고 말했다. 당신은 그에게 어떤 대답도 할 수 없다, 그에게 키스를 계속 당하고 있으니까. 당신은 계속, 어떤 대답도 하지 못하고 일방적으로 그의 말을 들어야만 했다. <br><br>\"네가 쭈욱 이 표정이었으면 좋겠어.\"<br><br>" +
                                "시간이 조금 더 흐르고 나서야 그는 당신을 놓아주었다. <br><br>\"{soraTitle}이 내 키스를 좋아해서 다행이야. 너만 좋다면, 나는 몇 천번... 아니, 몇 만번이라도 네게 해줄 수 있어.\"<br><br>그는 아직도 풀어져있는 당신의 표정을 보며 당신의 뺨을 쓰다듬었다. <br><br>\"물론 네가 싫어한다고 해도 할지도... 네가 내 키스를 싫어할 리가 없지만.\""
                        },
                        {
                            type: "effect",
                            run: (player) => {
                                addItem(player, ITEMS.consumable.calmPotion);
                                changeEmotion("sora", "affection", 5);
                                changeEmotion("sora", "dominance", 5);
                                changeEmotion("sora", "lust", -30);
                                changeSensitivity(player, "mSensitivity", 5);
                                passTime(player, 10);
                                localStorage.setItem("playerData", JSON.stringify(player));
                            }
                        }
                    ]
                },
                {
                    text: "거절한다",
                    scene: [
                        {
                            type: "text",
                            value:
                                "당신이 고개를 젓자 소라는 어쩔 수 없다는 듯이 고개를 끄덕였다. <br><br>\"네가 그렇다면야....\"<br><br>하지만 그는 여전히 당신의 옆에서, 당신을 빤히 바라보고 있었다."
                        },
                        {
                            type: "effect",
                            run: (player) => {
                                const dominance = NPC_DATA["sora"].emotion.dominance;

                                if (dominance > 50){
                                    startScene([
                                        {
                                            type: "text",
                                            value:
                                                "\"...그렇지만, 역시 하고 싶은걸.\"<br><br>아이같은 말투, 하지만 그의 표정은 심통난 아이랑은 거리가 멀었다. 당신이 어떤 반응을 보이기도 전에 소라는 당신의 턱을 잡고 제쪽으로 끌어당겼다." +
                                                " 소라는 당신의 턱을 끌어당기더니 그대로 거칠게 입술을 맞춰왔다. 달콤한 향이 당신의 머리를 강타한다. 몽롱함 속에서 당신은 뭔가가 입안으로 들어오는 걸 느꼈다. 꿀꺽, 꿀꺽, 그것은 달콤했지만 삼키기가 힘들었다. 하지만 소라는 당신을 봐주지 않고 계속, 계속, 당신에게 키스를 강요했다." +
                                                " 숨의 헐떡이는 소리, 정신을 차렸을 때 당신은 카운터에 기대어 서있었다. 소라는 그런 당신에게 폭 안겼다. <br><br>\"어때? 내 키스에는 못 당하겠지?\"<br><br>당신이 정신을 차렸을 때야 소라는 당신에게서 몇 걸음 떨어졌다. 그는 계속 당신을 주시하고 있다."
                                        },
                                        {
                                            type: "effect",
                                            run: (player) => {
                                                changeEmotion("sora", "dominance", -5);
                                                changeEmotion("sora", "lust", -20);
                                                changeSensitivity(player, "mSensitivity", 10);
                                                passTime(player, 10);
                                                localStorage.setItem("playerData", JSON.stringify(player));
                                            }
                                        }
                                    ], player);
                                } else {
                                    changeEmotion("sora", "affection", -3);
                                    changeEmotion("sora", "dominance", -5);
                                    changeEmotion("sora", "lust", 10);
                                    localStorage.setItem("playerData", JSON.stringify(player));
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ], player, {
        onEnd: () => startScene(getLocationScene(player), player)
    });
}

window.return_shop = function(player){
    startScene(getLocationScene(player), player);
};
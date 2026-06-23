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
    drugQuestTalk : (player) => {
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
                        { text: "마약을 건넨다", action: "trySubmitSoraDrugQuest" },
                        { text: "당신은 곧 가져다주겠다고 말하며 고개를 저었다. 소라는 당신의 대답에 미소를 지었다.", action: "return_shop" }
                    ]
                }
            ], player);
    },

    drugQuest02Talk : (player) => {
        startScene([
            {
                type : "text",
                value : "\"부탁한 거 다 가져온 거야?\"<br><br>상점 구석에 있는 꽃에 물을 주면서 소라는 당신에게 물었다." 
            },
            {
                type : "choice",
                choices : [
                    { text : "하얀꽃잎조각들을 건넨다", action : "trySubmitSoraDrugQuest02"},
                    { text : "당신은 곧 가져다주겠다고 말하며 고개를 저었다. 소라는 당신의 대답에 미소를 지었다.", action : "return_shop" }
                ]
            }
        ], player);
    },
    //스토리이벤트

    //상점대화로그
    giveFood : (player) => {
        openGiveFoodMenu(player, "sora");
    },

    talk: (player) => {
        startScene([
            {
                type: "text",
                value: "소라는 당신이 다가오자 눈을 반짝 빛냈다. <br><br>\"무슨 일이야?\""
            },
            {
                type: "choice",
                choices: [
                    { text: "사소한 잡담을 한다", action: "sora_smallTalk" },
                    { text: "다른 얘기를 한다", action: "sora_otherTalk" },
                    { text: "돌아간다", action: "back_location" }
                ]
            }
        ], player);
    },

    smallTalk : (player) => {
        passTime(player, 5);
        const affection = NPC_DATA["sora"].emotion.affection;
        const onEnd = () => {
            if (NPC_DATA["sora"].emotion.affection < 60){
                changeEmotion("sora", "affection", 1);
            }
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
    },

    otherTalk : (player) => {
        const choices = [];

        choices.push({
            text: "음식을 건넨다",
            action: "sora_giveFood"
        });

        if (isSoraDrugQuestAccepted(player)){
            choices.push({
                text : "부탁받은 물건에 대해 이야기한다",
                action : "sora_drugQuestTalk"
            });
        }

        if (player.flags?.sora_drug_02_started && !player.flags?.sora_drug_02_done){
            choices.push({
                text : "하얀꽃잎조각들에 대해 이야기한다",
                action : "sora_drugQuest02Talk"
            });
        }


        choices.push({ text: "돌아간다", action: "sora_talk" });

        startScene([
            {
                type : "text",
                value : "무엇에 대해 물어볼까."
            },
            {
                type : "choice",
                choices
            }
        ], player);
    }
})

registerGiftActions("sora");

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

//러스트 100 이벤트
function startSoraPatienceLimitOutsideEvent(player){
    player.flags = player.flags || {};
    player.flags.sora_patience_limit_outside_escaped = false;

    const introScene = getSoraPatienceLimitOutsideIntro(player);
    const rescueScene = getSoraPatienceLimitOutsideRescue(player);

    startScene([
        ...introScene,
        ...NPC_DATA["sora"].scenes.sora_patience_limit_outside_event,
        {
            type : "effect",
            run : (player) => {
                if (player.flags?.sora_patience_limit_outside_escaped){
                    return true;
                }

                startScene(rescueScene, player, {
                    onEnd : () => startScene(getLocationScene(player), player)
                });

                return true;
            }
        }
    ], player, {
        onEnd : () => startScene(getLocationScene(player), player)
    });
}

window.sora_patience_limit_outside_escape = function(player){
    player.flags = player.flags || {};
    player.flags.sora_patience_limit_outside_escaped = true;

    changeEmotion("sora", "lust", -20);
    changeTrauma(player, 1);
    savePlayer(player);

    startScene(getLocationScene(player), player);
    return true;
};

window.sora_patience_limit_outside_after_fail = function(player){
    changeEmotion("sora", "lust", -100);
    changeEmotion("sora", "dominance", 5);
    changeTrauma(player, 8);
    changeSensitivity(player, "mSensitivity", 8);
    changeSensitivity(player, "aSensitivity", 8);
    changeSensitivity(player, "cSensitivity", 8);
    changeSensitivity(player, "bSensitivity", 8);
    addBodyFluid(player, "m", 50);
    addBodyFluid(player, "a", 50);
    addBodyFluid(player, "c", 50);
    addBodyFluid(player, "b", 50);
    changeArousal(player, 50);
    passTime(player, 40);
    savePlayer(player);
};

function getSoraPatienceLimitOutsideIntro(player){
    return [
        {
            type : "text",
            value : [
                "<div style='text-align:center;'>문득, 당신은 뒤에서부터 누군가가 지켜보고 있는 듯한 시선을 느꼈다. 당신은 주변을 둘러보았지만 아무도 없었다.</div>",
                "<br><div style='text-align:center;'>그래. 당신의 주변에는 지금 아무도 없었다.</div><br>",
                "<br><br><br><div style='text-align:center;'>분명</div><br><br><br><div style='text-align:center;'>아무도</div><br><br><br>...?",
                "<span class='status-danger'><div style='text-align:center;'>촉수가 당신을 덮쳐온다</div></span>"
            ]
        }
    ]
}

function getSoraPatienceLimitOutsideRescue(player){
    if(player.location === "shelter"){
        return [
            {
                type : "text",
                value : [
                    "그 순간, 당신은 누군가가 촉수를 대거로 잘라내는 것을 보았다. 당신에게 취해있던 촉수들이 비명을 지르며 위협적으로 솟구쳤다. 하지만 대거 2개는 멈추지 않았다. 마치 춤을 추듯이, 대거는 촉수들을 유연한 움직임으로 베어냈다.",
                    " 꽃이 피어있는 쌍검대거, 당신은 그 쌍검대거의 주인이 누군지 알고 있다.",
                    "<br><br>유리.<br><br>",
                    "유리는 촉수 사이에 있던 당신을 제쪽으로 끌어당겼다. 몇몇 촉수들이 여전히 당신의 몸에 붙어 있긴 하지만 어쨌든 당신은 지금 유리의 품에 안겨있다. 금방이라도 유리를 공격할 것처럼 일렁이던 촉수들은 여기저기서 인간의 소리가 들리자 움직임을 멈췄다. 쉘터 아이들이 소란에 웅성거리며 몰려들고 있다.",
                    " 촉수는 사람들이 더 몰리기 전에 스르르 어둠 속으로 사라져버렸다. 유리는 여전히 품속에 있는 당신을 안고 있다.",
                    "<br><br>\"...괜찮아.\"<br><br>",
                    "유리는 당신의 몸에 남아있는 촉수들을 대검으로 떼어내며 말했다. 쉘터의 아이들의 시선이 몰리자 유리는 촉수들을 제 발로 밟아서 가렸다. 그는 쉘터 아이들도 진정시키긴 했지만 진정을 시키면서도 당신의 곁에서 떨어지지 않았다. <br>그는 당신이 진정할 때까지 당신의 옆에 있어주었다."
                ]
            }
        ]
    }

    if(player.location === "darkStreet" || player.location === "townStreet" || player.location === "townEntrance"){
        return [
            {
                type : "text",
                value : [
                    "그 순간 당신은 익숙한 욕설 소리를 들었다. 루크다. 욕설에 촉수들은 더 격렬하게 반응하며 그를 죽이려고 들었다.",
                    "<br><br>\"야, 이 씨발, 정신 안 차려!?\"<br><br>",
                    "루크의 담배 연기가 스르르 밑으로 꺼진다. 하지만 루크는 당신에게로 한 걸음씩 다가가며 당신에게 계속 윽박질렀다. 그의 목소리를 들은 경비병들이 여기저기서 몰려오기 시작한다. 촉수는 으르렁거리더니 그대로 루크의 등짝을 내리쳤다. 루크의 짓이겨진 입술에서 억누르지 못한 신음 소리가 새어나왔다. 하지만 그의 자안은 똑바로 당신을 바라보고 있었다.",
                    "어떻게든 당신에게로 온 루크는 촉수를 자신의 단검으로 찢어발기기 시작했다. 촉수들은 가만히 있지 않았다. 하지만 루크도 가만히 있지는 않았다. 끝나지 않을 것만 같은 싸움은 경비병들이 몰려오는 것으로 끝이 나버렸다. 촉수들은 살의에 가득 찬 울음 소리를 내더니 그대로 당신의 몸을 놓고 사라져버렸다. 촉수를 발견한 경비병들의 표정이 굳었다.",
                    "<br><br>\"뭐해? 쫓아가!\"<br><br>",
                    "루크는 여전히 당신의 몸에서 떨어지지 않고 있는 촉수들을 힘으로 뜯어냈다. 그리고 그는 여전히 멍하니 있는 당신의 뺨을 쳤다. 그는 당신에게 지금 당장 정신을 차리라고 윽박질렀다. \"...젠장.\", 그는 여전히 정신을 못 차리고 있는 당신의 멱살을 잡아 뒤에 있던 경비병들 중 한 놈한테 던졌다. 경비병은 어정쩡한 자세로 당신을 받아들었다.",
                    "<br><br>\"그새끼 정신 차릴 때까지 보호해.\"<br><br>",
                    "촉수를 쫓아간 경비병들의 뒤를 쫓아가는 루크의 뒷모습이 당신의 흐릿한 시야에 맺힌다. 루크는 당신을 돌아보지 않았다.",
                    "<br><br>\"보호라고 내가 분명 말했다, 이새끼야.\"<br><br>",
                    "그는 마지막으로 딱 그 말만을 경비병에게 남겼다. <br><br><br>당신이 정신을 차렸을 때 경비병은 루크의 명령대로 당신을 놓아주었다.<br>...당신은 오늘도 어떻게든 살아남긴 했다."
                ]
            }
        ]
    }

    if(player.location === "tavern"){
        return [
            {
                type : "text",
                value : [
                    "그 순간 촉수들은 끼에엑 비명과 함께 당신의 몸에서 떨어져나왔다. 그들은 자신을 공격한 사람을 공격하기 위해 고개를 돌렸다. 당신의 흐릿한 시야 사이로 마틴이 보인다. 마틴은 횃불을 들고 있었다.",
                    "<br><br>\"꺼져, 괴물.\"<br><br>",
                    "단호한 마틴의 말에 촉수들은 당신을 끌어안은 채로 마틴을 둘러싸기 시작했다. 하지만, 주점 사람들이 몰려들기 시작하자 포위를 멈췄다. 촉수는 마틴을 노려보더니 천천히 어둠 속으로 다시 사라져갔다.",
                    "<br>...당신을 끌고.<br><br>마틴은 촉수에게 끌려가는 당신의 팔을 붙잡았다. 당신의 팔을 잡고 있는 그의 손은 땀으로 축축했다. 촉수가 으르렁거렸지만 마틴은 굳은 얼굴로 당신을 더 제쪽으로 끌어당겼다.",
                    " 결국 촉수들은 당신을 끌고 가는 것을 포기했다. 점점 많아지는 사람들의 그림자, 그리고 몇몇은 촉수를 발견했는지 비명을 질렀다. 마틴은 당신을 끌어안은 채 촉수를 노려보았다.",
                    "<br>촉수가 완전히 물러나고 나서야 마틴은 당신의 팔을 놓았다. 당신의 팔을 놓은 마틴은 순간 비틀거렸지만 얼굴로는 전혀 티를 내지 않았다. 그는 당신에게 네 앞가림 좀 잘하라고 싸늘하게 쏘아붙인 후 다시 카운터로 돌아갔다."
                ]
            }
        ]
    }

    return [
        {
            type : "text",
            value : [
                "<strong>탕</strong>",
                "<br><br>당신의 흐릿한 이성 사이로 총성 한 발이 아니었다. 아니, 한 발이 아니었다. 탕, 탕, 탕, 촉수들은 비명을 지르며 뒤로 물러났다.",
                "<br><br>\"드디어 찾았군.\"<br><br>",
                "에릭은 당신을 쳐다보지도 않고 있었다. 그의 목표는 오로지 촉수였다. 촉수들은 에릭을 공격하려고 했지만 에릭은 촉수들의 공격을 피하며 가차없이 총을 쏘았다. 탕, 탕, 탕, 창백한 촉수들이 비명을 지르며 바닥으로 쓰러진다.",
                "<br>촉수들은 당신을 놓고 도망가기 시작했다. 에릭은 당신을 쳐다보지도 않았다. 그는 어둠 속으로 사라지는 촉수들을 쫓아 자신도 어둠 속으로 사라졌다. 멍한 정신 사이로 들리는 건 오로지 비명소리, 그리고 총성뿐이었다.",
                " 당신의 온 구멍은 달콤한 물로 가득하다. 느리게 눈을 깜박이던 당신은 깜박 기절했다가 다시 일어났다.",
                "<br><br>...무슨 일이 있었든, 당신은 오늘도 살아남았다."
            ]
        }
    ]
}

function startSoraPatienceLimitShopEvent(player) {
    startScene(
        NPC_DATA["sora"].scenes.sora_patience_limit_shop_event,
        player,
        {
            onEnd : () => startScene(getLocationScene(player), player)
        }
    );
}

window.sora_patience_limit_shop_accept = function(player){
    const sceneName = player.gender === "male"
        ? "sora_patience_limit_shop_event_accept_male"
        : "sora_patience_limit_shop_event_accept_female";

    startScene(
        NPC_DATA["sora"].scenes[sceneName],
        player,
        {
            onEnd : () => startScene(getLocationScene(player), player)
        }
    );

    return true;
};

window.sora_patience_limit_shop_refuse = function(player){
    const dominance = NPC_DATA["sora"].emotion.dominance;

    if(dominance >= 50){
        const sceneName = player.gender === "male"
            ? "sora_patience_limit_shop_event_dom_male"
            : "sora_patience_limit_shop_event_dom_female";

        startScene(
            NPC_DATA["sora"].scenes[sceneName],
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );

        return true;
    }

    startScene(
        NPC_DATA["sora"].scenes.sora_patience_limit_shop_event_refuse,
        player,
        {
            onEnd : () => startScene(getLocationScene(player), player)
        }
    );

    return true;
};
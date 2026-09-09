function processSionText(text, player){
    return text.replaceAll("{sionTitle}", getSionTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getSionTitle(player){
    if (NPC_DATA["sion"].emotion.dominance > 80) return "내 심장";
    else if(NPC_DATA["sion"].emotion.affection > 70) return "나만의 영웅님";
    return "영웅님";
}

registerActions("sion",{
    //주점대화로그
    giveFood : (player) => {
        openGiveFoodMenu(player, "sion");
    },
    
    talk: (player) => {
        if (!isSionAvailable(player)){
            showSingleTextScene(
                "시온은 지금 없는 것 같다.",
                player
            );
            return;
        }
        startScene([
            {
                type: "text",
                value: "\"영웅님...!\"<br><br>당신이 다가오자 시온의 얼굴이 밝아졌다."
            },
            {
                type: "choice",
                choices: [
                    { text: "사소한 잡담을 한다", action: "sion_smallTalk" },
                    { text: "다른 얘기를 한다", action: "sion_otherTalk" },
                    { text: "돌아간다", action: "back_location" }
                ]
            }
        ], player);
    },

    smallTalk : (player) => {
        changeEmotion("sion", "affection", 1);
        passTime(player, 3);
        const affection = NPC_DATA["sion"].emotion.affection || 0;
        const dominance = NPC_DATA["sion"].emotion.dominance || 0;
        const onEnd = () => {
            startScene(getLocationScene(player), player);
        };

        if (dominance > 70 && affection > 90){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "시온은 당신을 사랑스럽다는 듯이 바라보고 있다. 그는 당신을 제 무릎에 눕힌 후 콧노래를 흥얼거렸다.",
                        "\"오늘은 또 어디 갔다 오셨어요?\"<br><br>시온은 당신을 이리저리 살펴보며 속상하다는 표정을 지었다.<br><br>\"다치지 마세요.<br><br>...그래서 오늘은 어디 다녀오셨냐니까요.\"",
                        "시온은 당신을 와락 끌어안았다. 그리고 그는 붉어진 얼굴로 말했다. <br><br>\"영웅님, 나만의 영웅님.\""
                    ])
                }
            ], player, { onEnd });
            } else if (affection > 90){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "시온은 당신을 바라보며 미소를 지었다. <br><br>\"제가 도와드릴 일이라도 있나요? 언제든 말해주세요.\"",
                        "시온은 자신이 오늘 했던 훈련에 대해 말했다. 그는 오늘은 정말 멀리까지 나갔다고 말하며 재잘재잘 떠들었다.",
                        "\"...원래 저 말 많지 않은 거 아세요?\"<br><br>시온은 애교스럽게 입술을 삐죽였다.<br><br>\"더 사랑하는 사람이 지는 거라니까 봐드릴게요.\""
                    ])
                }
            ], player, { onEnd });

            } else if (dominance > 70 && affection > 70){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "시온은 말없이 당신을 바라보았다. <br><br>\"오늘은 어디 다녀오셨어요?\"<br><br>대답을 듣기 전에는 당신을 아무 데도 안 보내줄 생각인 거 같다.",
                        "시온은 당신의 손을 잡고 손장난을 쳤다. <br><br>\"오늘은 저랑 여기 계속 있어요. 쭈욱.\"",
                        "시온은 당신의 일정을 물어보았다. 그는 당신이 일정을 듣다가 수첩에 뭔가를 적었다. <br><br>...당신이 일정 중에 만날 가능성이 있는 사람들의 명단이 적혀 있다..."
                    ])
                }
            ], player, { onEnd });
            
        } else if (dominance > 50 && affection > 70){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "시온은 작게 하품을 했다. 그러더니 얼굴이 붉어져서 자신의 입을 가렸다. 부끄러운 모양이다.",
                        "\"영웅님은 만나는 사람이 너무 많아요.\"<br><br>그는 당신의 팔에 팔짱을 꼈다. <br><br>\"영웅님은 제껀데...\"<br><br>시온의 얼굴이 붉다.",
                        "\"유리 형은 정작 중요할 때는 당신을 지켜주지 않잖아요.\"<br><br>그는 당신을 바라보며 인상을 썼다. <br><br>\"그런데 왜 그 형이랑 유독 친한 거예요?\""
                    ])
                }
            ], player, { onEnd });

            } else if (dominance > 50 && affection > 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "시온은 당신에게 오늘의 일정을 물었다. <br><br>\"아하...\"<br><br>그는 당신의 일정을 들으며 노트에 뭔가를 적고 있다.",
                        "시온은 요 근래에 당신이 주점에 있는 걸 보았다고 말했다. <br><br>\"...많이 친해요, 그 사람이랑?\"",
                        "시온은 요 근래에 당신이 상점에 있는 걸 보았다고 말했다. <br><br>\"...많이 친해요, 그 사람이랑?\"",
                        "시온은 당신에게 자신의 훈련에 대해 말했다. 그는 재잘거리다가 얼굴을 붉혔다. <br><br>\"말이 너무 많았나요? 아이 참, 영웅님 앞에서만 정말...\""
                    ])
                }
            ], player, { onEnd });
        } else if (affection > 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "시온은 당신이 말하는 동안 당신의 얼굴을 뚫어지게 응시하고 있었다. 그는 당신과 시선이 마주치자 화들짝 놀라더니 얼굴을 붉혔다.",
                        "시온은 요 근래에 당신이 주점에 있는 걸 보았다고 말했다. <br><br>\"...많이 친해요, 그 사람이랑?\"",
                        "시온은 요 근래에 당신이 상점에 있는 걸 보았다고 말했다. <br><br>\"...많이 친해요, 그 사람이랑?\"",
                        "시온은 쉘터에서 자기보다 당신을 사랑하는 사람은 없을 거라고 말했다. <br><br>\"제가 조금만 더 일찍 태어났어도...\"<br><br>누구를 생각하면서 말하는지는 알 것도 같다."
                    ])
                }
            ], player, { onEnd });

        } else if (dominance > 30){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "시온은 당신을 빤히 바라보았다. <br><br>\"상류도시에서... 누군가랑 관계를 맺었다는 소문이 들리는데... 아니죠?\"",
                        "시온은 당신의 손가락에 자신의 손가락을 엮었다. 그리고 그 모습을 만족스럽게 바라보았다.",
                        "시온은 주점의 알바 옷에 대해 말했다. <br><br>\"저는 그 옷보다 당신에게 더 잘 어울리는 옷 만들어드릴 수 있어요.\""
                    ])
                }
            ], player, { onEnd });

        } else if (affection > 30){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "시온은 당신의 얘기를 듣고 있다. 당신의 얘기를 듣는 그의 눈은 반짝거렸다.",
                        "서로의 손등이 스치자 시온은 순간 움찔했다. 그는 고개를 푹 수그렸다. 얼굴이 붉어져 있다.",
                        "\"오늘... 이거.\"<br><br>시온은 당신에게 꽃을 내밀며 말했다. 장미다. <br><br>\"영웅님 생각이 날 때마다 물을 줬더니 벌써 이만큼 자랐더라고요.\""
                    ])
                }
            ], player, { onEnd });
        } else{
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "시온은 당신처럼 강해지려면 어떻게 해야 하는 지에 대해 물었다. 당신이 어떤 대답을 하든 그는 주의깊게 듣고 있다.",
                        "시온은 쑥스러워하는 얼굴로 당신의 장점을 모아놓은 노트를 내밀었다.<br><br>...당신도 몰랐던 당신의 장점들이 적혀 있었다.",
                        "시온은 언젠가 꼭 당신을 지켜주겠다고 맹세하듯이 말했다. 저번에 맹세하지 않았냐고 묻자 그는 진지한 얼굴로 평생을 맹세하고 그 맹세를 지킬 거라고 말했다.",
                        "시온은 대검의 날을 갈다가 한번만 자신의 대검을 만져주면 안 되겠냐고 물었다. <br><br>\"영웅님의 손길이 닿으면 싸울 때 더 강해질 거 같아서...\"<br><br>그의 얼굴은 붉었다."
                    ])
                }
            ], player, { onEnd });
        }
    },

    otherTalk : (player) => {
        const choices = [];
        const today = getCurrentDay(player);

        if (player.flags?.rebel_route_quest_07_sided_with_sion && !player.flags?.quest_07_sidedWithSion ){
            choices.push({
                text : "당신은 시온에게 여전히 유리가 틀렸다고 생각하냐고 물었다.",
                scene : NPC_DATA.sion.scenes.quest_07_sidedWithSion
            });
        }

        if (player.flags.sion_daily_item_day !== today){
            choices.push({
                text: "자신을 위해 준비한 것이 있는지 묻는다",
                action: "sion_askPreparedItem"
            });
        }

        choices.push({
            text: "음식을 건넨다",
            action: "sion_giveFood"
        });

        choices.push({ text: "돌아간다", action: "sion_talk" });

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
    },

    askPreparedItem : (player) => {
        const today = getCurrentDay(player);
        
        if (player.flags.sion_daily_item_day === today){
            startScene([
                {
                    type : "text",
                    value : "\"죄송해요, 더는 없어요, 영웅님.\""
                }
            ], player, {
                onEnd : () => startScene(getLocationScene(player), player)
            });
            return;

        }
        
        const item = pickRandom([
            ITEMS.misc.rice,
            ITEMS.misc.salmon,
            ITEMS.misc.wheat,
            ITEMS.misc.flowerNectar
        ]);
        
        addItem(player, item);
        changeEmotion("sion", "dominance", 1);
        
        player.flags.sion_daily_item_day = today;
        savePlayer(player);
        
        startScene([
            {
                type : "text",
                value : [
                    "\"네, 영웅님! 잠시만요!\"",
                    `시온은 자신의 짐을 뒤적이다가 ${item.name}을 꺼내 당신에게 건넸다.`,
                    "<br>\"별건 아니지만, 영웅님께 도움이 되었으면 좋겠어요.\""
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    },

    lust_50_shout: (player) => {
        const sion = NPC_DATA["sion"].emotion;        
        
        if (sion.dominance >= 70) {
            startScene(
                NPC_DATA["sion"].scenes.sion_lust_50_shout_highDominance,
                player,
                {
                    onEnd: () => startScene(getLocationScene(player), player)
                }
            );
            return;
        }

        startScene(NPC_DATA["sion"].scenes.sion_lust_50_shout_lowDominance, player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });       
    }
})

registerGiftActions("sion");

function isSionAvailable(player){
    const day = getWeekdayIndex(player);
    const time = getTimePeriod(player);

    // 월/화/수/목/금 낮에는 없음
    if ([0, 1, 2, 3, 4].includes(day) && (time === "morning" || time === "afternoon")){
        return false;
    }

    // 토/일 낮에는 없음
    if ([5, 6].includes(day) && (time === "afternoon")){
        return false;
    }

    return true;
}


//스페셜 데이
window.SPECIAL_GIFT_HANDLERS.sion = function(player, item, grade){
    if (item.specialGift === "chocoChoco"){
        startSionChocoChocoGift(player, item, grade);
        return;
    }
};

function startSionChocoChocoGift(player, item, grade){

    if (grade === "great"){
        startScene([
            {
                type : "text",
                value : [
                    "\"영웅님!\"<br><br>" +
                    "시온이 아주 큰 초콜릿을 들고 당신에게 다가왔다. 그는 당신을 향한 마음을 담아서 만들었다고 말하며, 사실 조금 더 크게 만들고 싶었다고 아쉬워했다. 당신은 그에게서 초콜릿을 받았다. 초콜릿인데 이상할 만큼 묵직해서 당신은 뒤로 넘어갈 뻔했다. 당신은 시온에게 당신이 만든 수제 초콜릿을 내밀었다." +
                    "<br><br>\"영웅님...\"<br><br>" +
                    "시온은 금방이라도 울 것 같은 얼굴로 당신이 준 초콜릿을 가슴에 꼬옥 끌어안았다. 영원히 안 먹고 가보로 삼을 거라는 시온을 당신은 어떻게든 설득해야만 했다... 결국 시온은 고개를 끄덕이긴 했지만 그럼에도 당신은 그가 정말로 당신의 초콜릿을 먹을지 확신할 수 없었다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "sion");
                    player.location = "townStreet";
                    savePlayer(player);
                }
            }
        ], player);

        return;
    }

    if (grade === "normal"){
        startScene([
            {
                type : "text",
                value : [
                    "\"영웅님!\"<br><br>" +
                    "시온이 아주 큰 초콜릿을 들고 당신에게 다가왔다. 그는 당신을 향한 마음을 담아서 만들었다고 말하며, 사실 조금 더 크게 만들고 싶었다고 아쉬워했다. 당신은 그에게서 초콜릿을 받았다. 초콜릿인데 이상할 만큼 묵직해서 당신은 뒤로 넘어갈 뻔했다. 당신은 시온에게 당신이 만든 수제 초콜릿을 내밀었다." +
                    "<br><br>\"영웅님...\"<br><br>" +
                    "시온은 그렁그렁한 눈으로 당신의 초콜릿을 끌어안으며, 죽을 때까지 이 초콜릿은 간직하겠다고 말했다. 당신은 내년에 더 달콤한 초콜릿을 만들어줄 테니 먹으라고 말했지만 그는 들을 생각이 없는 것만 같았다. 년도와 날짜를 포장지 위에 써놓는 시온을 보며 당신은 시야가 아득해졌다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "sion");
                    player.location = "townStreet";
                    savePlayer(player);
                }
            }
        ], player);

        return;
    }

    if (grade === "bad"){
        startScene([
            {
                type : "text",
                value : [
                    "\"영웅님!\"<br><br>" +
                    "시온이 아주 큰 초콜릿을 들고 당신에게 다가왔다. 그는 당신을 향한 마음을 담아서 만들었다고 말하며, 사실 조금 더 크게 만들고 싶었다고 아쉬워했다. 당신은 그에게서 초콜릿을 받았다. 초콜릿인데 이상할 만큼 묵직해서 당신은 뒤로 넘어갈 뻔했다. 당신은 시온에게 당신이 만든 수제 초콜릿을 내밀었다." +
                    "<br><br>\"영웅님...\"<br><br>" +
                    "시온은 당신의 초콜릿을 가슴으로 끌어안으며 무슨 일이 있어도 이 초콜릿만은 지키겠다고 말했다." +
                    "<br><br>\"제 목숨을 바쳐서라도... 아, 안 돼, 영웅님을 지켜야 하니까 그건 안 돼요.\"<br><br>" +
                    "...어쩌면 내년에는 초콜릿을 더 맛있게 만들어줘야 할지도 모르겠다. 이러다가 당신의 맛없는 초콜릿이 평생 박제되게 생겼다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "sion");
                    player.location = "townStreet";
                    savePlayer(player);
                }
            }
        ], player);

        return;
    }
}

//연말 이벤트
window.YEAR_END_HANDLERS.sion = function(player){

    startScene([
        {
            type : "text",
            value : [
                "\"한 해의 마지막 날을 함께 보낸다는 건...\"<br><br>" +
                "당신에게 초청을 받아 당신의 방안으로 들어온 시온은 주변을 둘러보다가 다시 당신을 바라보았다." +
                "<br><br>\"하나 더 맹세할게요. 저는 절대로 영웅님을 놓치지 않을 거예요. 무슨 일이 있어도.\"<br><br>" +
                "그는 미리 준비한 만찬을 당신의 앞에 차리고 화려하게 엮은 꽃다발을 당신의 품에 안겨주었다. 뭔가 프로포즈를 받는 느낌이었다.... 시온은 영웅님은 아무것도 하지 않아도 된다고 말했다." +
                "<br><br>\"영웅님은 바쁜 사람이니까요. 영웅님이 못하는 만큼 제가 하면 돼요.\"<br><br>" +
                "시온은 당신에게 다가오더니 아주 천천히, 당신의 입술 위로 자신의 입술을 얹었다. 그는 급하지 않았다. 입술 위로 전해져오는 심장 박동 소리는 엄청 빨랐지만 그는 평소보다 더 느릿하게 당신의 입술을 탐했다. 그의 손이 점점 당신의 옷 안으로 들어온다." +
                "<br><br>\"...즐겁게 해드릴게요, 영웅님.\"<br><br>" +
                "어느새 당신은 꽃다발과 함께 침대 위에 쓰러져 있었다. 당신을 자신의 두 팔 안에 가둔 시온은 미소를 지었다." +
                "<br><br>\"그 어떤 밤보다 더 즐거운 밤을, 영웅님께 드릴게요.\"<br><br>" +
                "...밤이 엄청 길어질 것 같다. 아니, 짧아지는 걸까?"
            ]
        }
    ], player, {
        onEnd : () => completeYearEndEvent(player, "sion")
    });
};
window.YEAR_END_LETTER_HANDLERS.sion = function(player, next){

    startScene([
        {
            type : "text",
            value : [
                "시온에게서 온 편지다.<br><br><br>" +
                "<span class='log-sion'>[영웅님.]</span><br><br>" +
                "<span class='log-sion'>[어제 영웅님을 기다리면서 생각했어요. 아무리 생각해도 영웅님 주변에 사람들이 너무 많은 것 같아요. 영웅님은 너무 착하신 것 같아요.]</span><br><br>" +
                "<span class='log-sion'>[영웅님이 못하시는 걸, 제가 할게요. 걱정마세요. 저는 언제나 영웅님의 곁에 있을 테니까요.]</span><br><br>" +
                "<span class='log-sion'>[그러니 걱정하지 마세요. 새해 복 많이 받으세요, 영웅님.]</span><br><br>"
            ]
        }
    ], player, {
        onEnd : next
    });
};

//버섯이벤트
window.MUSHROOM_ROMANCE_HANDLERS.sion = function(player, next){
    const mushroomType =
        getMushroomRomanceType();

    if (mushroomType === "tasty"){
        startScene([
            {
                type : "text",
                value : [
                    "\"...영웅님?\"<br><br>" +
                    "갑작스레 소환되어 긴장하던 시온은 당신을 보자마자 표정이 풀어졌다. 그는 영웅님을 만나서 너무 행복해졌다고 말하며 당신에게 다가갔다. 그는 버섯을 먹어야 한다는 안내판을 보더니 은은한 미소를 지었다." +
                    "<br><br>\"그렇다면 제가 먹지 않는다면 영웅님은 영원히.... 저와 함께 여기에 있는 걸까요?\"<br><br>" +
                    "꿀꺽. 어디선가 버섯맨의 숨 넘어가는 소리가 들렸다. 시온은 당신을 빤히 바라보다가 당연히 장난이었다고 말했다. 정말 장난이었을까? 시온은 버섯을 한 입 먹더니 너무 맛있다고 말하며 나머지는 전부 당신을 주려다가 말았다." +
                    "<br><br>\"....아~\"<br><br>" +
                    "붉어진 얼굴로 그는 당신에게 버섯을 직접 먹여주었다. 시온은 행복해 보였다. 그는 하얀 빛이 다시 뿜어져나오자 안타깝다는 표정으로 당신을 보았다." +
                    "<br><br>\"...함께 어딘가에 갇혀버리면 좋을 텐데...\"<br><br>" +
                    "...농담이겠지?"
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeNPCEmotion("sion", "affection", 2);
                    changeNPCEmotion("sion", "rage", -5);
                    changeStamina(player, 25);
                    passTime(player, 20);
                }
            }
        ], player, {
            onEnd : next
        });
        return;
    }

    if (mushroomType === "poison"){
        startScene([
            {
                type : "text",
                value : [
                    "안내문을 읽은 시온은 버섯을 손에 쥔 채 먹을 생각을 하지 않았다. 당신이 계속 버섯 쪽으로 눈짓을 해도 시온은 모르는 척 계속 자신의 이야기를 이어갔다. 그는 원하는 만큼 이야기를 하고 나서야 버섯에 눈길을 주었다. 그는 버섯을 한 입 먹더니 인상을 찌푸리며 다시 뱉었다." +
                    "<br><br>\"...독버섯인데요, 이거.\"<br><br>" +
                    "시온의 안색이 안 좋아진 걸 눈치챈 당신이 시온을 눕혔다. 그리고 당신은 그의 손을 주무르며 그가 조금 더 편해질 수 있게 도왔다. 시온은 그런 당신을 올려다보다가 미소를 지었다." +
                    "<br><br>\"죄송해요. 제가.... 실수했네요. 영웅님의 손, 너무 부드러워서... 실수 더 하고 싶어졌어요.\"<br><br>" +
                    "그는 나머지 독버섯까지 자기가 먹으려고 했다. 당신과 시온은 서로 옥신각신 독버섯을 먹는 내내 싸웠다. 하지만 시온은 오히려 기분이 좋아 보였다.... 다 먹고 혈색이 좋지 않은 얼굴로 하얀 빛에 사라질 때까지도."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeNPCEmotion("sion", "affection", 1);
                    changeNPCEmotion("sion", "dominance", -5);
                    changeHP(player, -25);
                    passTime(player, 30);
                }
            }
        ], player, {
            onEnd : next
        });
        return;
    }

    startScene([
        {
            type : "text",
            value : [
                "\"...장미 모양이네요.\"<br><br>" +
                "시온은 먹기 아깝다는 듯 장미 모양 버섯을 만지작거리다가 입에 넣었다. 입에 넣자마자 시온의 얼굴은 붉어졌다. 그는 당신을 빤히 응시하다가 그대로 당신을 바닥으로 넘어뜨렸다. 다치지는 않게, 당신의 뒤통수를 손으로 감싸 안으며... 바닥에 부딪힌 그의 손목이 부어올랐을지도 모르겠다. 하지만 시온은 큰 소리가 났는데도 당신만을 바라보고 있었다." +
                "<br><br>\"몸이 뜨거워요, 영웅님.\"<br><br>" +
                "그는 바라는 얼굴로 당신을 내려다보고 있었다. 버섯을 입에 문 시온은 그대로 당신에게 입술을 맞추며 버섯을 넘겨주었다. 발정버섯이다...! 당신의 피부에도 열기가 돌았다. 시온은 뜨거워진 손으로, 뜨겁게 느껴지는 당신의 피부를 쓰다듬으며 애원조로 말했다, \"안아도 될까요?\"라고. 그의 장밋빛 눈동자는 물러설 생각이 없는 것 같다.... 당신의 반응에 시온은 미소를 짓더니 그대로 당신의 몸으로 파고들었다. 그의 뜨거운 입술이 당신의 열꽃이 피어오른 목덜미에 닿았다. 목, 쇄골, 가슴, 쪽쪽거리며 열꽃잎들을 남기며 시온은 당신의 옷을 풀어헤쳤다." +
                "<br><br>뜨거운 공기가 식었을 땐, 이미 많은 시간이 흐른 후였다. 시온은 당신을 꽈악 끌어안은 채 사랑한다고 말했다. 당신은 시온의 가슴에 기댄 채 색색 열기가 가라앉지 않은 숨소리를 내쉬었다. 허리가 아파서 일어나고 싶지가 않다. 그때, 하얀 빛이 두 사람 앞에 내리쬐었다. 시온은 인상을 찌푸리며 왜 자신들을 가만히 내버려두지 않는 거냐고 살기 어린 목소리로 중얼거렸다." +
                "<br><br>\"시, 시간, 우리 시간 많이 줬다버섯...\"<br><br>" +
                "버섯맨들은 당신과 시온을 빨리 보내버리기로 한 모양이다. 하얀 빛이 더 강렬해졌다."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                changeArousal(player, 100);
                changeNPCEmotion("sion", "affection", 5);
                changeNPCEmotion("sion", "lust", 40);
                changeSensitivity("player", "mSensitivity", 7);
                changeSensitivity("player", "cSensitivity", 10);
                changeSensitivity("player", "aSensitivity", 10);
                addBodyFluid(player, "a", 20);
                addBodyFluid(player, "c", 20);
                addBodyFluid(player, "m", 20);
                passTime(player, 80);
            }
        }
    ], player, {
        onEnd : next
    });
};
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

        if (player.flags.sion_daily_item_day !== today){
            choices.push({
                text: "자신을 위해 준비한 것이 있는지 묻는다",
                action: "sion_askPreparedItem"
            });
        }

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
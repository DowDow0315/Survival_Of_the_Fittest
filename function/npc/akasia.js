function processAkasiaText(text, player){
    return text.replaceAll("{akasiaTitle}", getValenTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getAkasiaTitle(player){
    if (NPC_DATA["akasia"].emotion.rage > 80) return "아름다운 그대";
    else if(NPC_DATA["akasia"].emotion.affection > 80) return "나의 그대";
    else if(NPC_DATA["akasia"].emotion.affection > 50) return "상류도시의 그대";
    else if(NPC_DATA["akasia"].emotion.affection > 30) return "하류도시의 그대";
    return "시민";
}

registerActions("akasia",{
    //주점대화로그
    giveFood : (player) => {
        openGiveFoodMenu(player, "akasia");
    },
    
    talk: (player) => {
        if (!isAkasiaAvailable(player)){
            showSingleTextScene(
                "아카시아는 지금 자리에 없다. 다른 용건이 있어서 자리를 비운 모양이다.",
                player
            );
            return;
        }
        startScene([
            {
                type: "text",
                value: "집무실에서 서류를 읽고 있던 아카시아가 당신의 인기척에 고개를 들었다. <br><br>\"무슨 일인가요, {akasiaTitle}?\""
            },
            {
                type: "choice",
                choices: [
                    { text: "사소한 잡담을 한다", action: "akasia_smallTalk" },
                    { text: "다른 얘기를 한다", action: "akasia_otherTalk" },
                    { text: "돌아간다", action: "back_location" }
                ]
            }
        ], player);
    },

    smallTalk : (player) => {
        passTime(player, 3);
        const affection = NPC_DATA["akasia"].emotion.affection || 0;
        const dominance = NPC_DATA["akasia"].emotion.dominance || 0;
        const rage = NPC_DATA["akasia"].emotion.rage || 0;
        const onEnd = () => {
            if (affection > 30){
                changeEmotion("akasia", "affection", 1);
            }
            startScene(getLocationScene(player), player);
        };

        if (dominance > 50 && affection > 90){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "아카시아는 지난날 당신을 찾아갔을 때 당신이 자리에 없었다고 말했다. <br><br>\"다음 번에는 착하게 기다리고 있으시길 바라요.\"",
                        "다음 번에는 언제 올 거냐고 묻자 아카시아는 작게 미소를 지었다. <br><br>\"글쎄요, 하지만 당신은 언제나 저를 맞이해주셔야 합니다.\"",
                        "아카시아는 당신에게 상류도시에서 있었던 일들에 대해 말했다. 그는 상류도시의 가십들은 반 이상 거짓말이라고 말했다."
                    ])
                }
            ], player, { onEnd });
            } else if (affection > 90){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "발렌에 대해 묻자 아카시아는 발렌은 뜻을 같이 하는 동료라고 말했다. <br><br>\"이성적인 관계는 아닙니다. 그저 뜻이 맞았을 뿐이죠. 제 취향은 발렌보다는...\"<br><br>그는 의미심장하게 당신을 바라보았다.",
                        "아카시아는 당신의 이성 취향에 대해 물었다. 그는 예상보다 더 주의깊게 당신의 이야기를 듣고 있다.",
                        "아카시아는 당신에게 저번 사교회장에서 있었던 일에 대해 말했다. 그러면서 그는 상류도시 사람들에게 얕보이지 않는 팁을 알려주었다."
                    ])
                }
            ], player, { onEnd });

            } else if (dominance > 50 && affection > 60){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "아카시아는 당신에게 마틴의 주점에는 많이 가는 편이냐고 물었다. <br><br>\"맛있긴 하더군요. 다음 번에도 그곳에서 식사를 같이 하지요.\"<br><br>당신에게는 거부권이 없는 것처럼 보인다.",
                        "당신이 요리를 잘하냐고 묻자 아카시아는 단 한번도 자신의 손에 물을 묻혀본 적이 없다고 대답했다. <br><br>\"물론 피는 묻혀본 적이 많지요.\"<br><br>...농담이 아닌 거 같다.",
                        "아카시아는 신분 상승에는 관심이 없냐고 물었다. <br><br>\"지금부터라도 있으시는 게 좋을 겁니다. 세상 일은 당신 마음대로 되는 게 아니니까요.\""
                    ])
                }
            ], player, { onEnd });

            } else if (affection > 60){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "아카시아는 당신의 모험에 대해 물었다. 그는 당신의 모험 이야기를 주의깊게 듣고 있다.",
                        "아카시아는 당신의 어릴 적에 대해 물었다. 그는 당신의 이야기를 듣다가 풋 웃었다. 당신의 이야기를 듣다가 어린 당신을 머릿속에 그린 모양이다.",
                        "그는 멍하니 있다가 갑자기 역시 빵보다는 밥이 더 맛있다고 말했다."
                    ])
                }
            ], player, { onEnd });

            } else if (dominance > 50 && affection > 30){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "아카시아는 전날에 당신이 했던 행동에 대해서 말했다. 당신이 놀라자 아카시아는 눈도 깜박이지 않고 대꾸했다. <br><br>\"왜 놀라시는 거죠? 하류도시의 영웅에게 저희가 관심이 없을 리가 없지 않습니까.\"",
                        "아카시아는 당신에게 이런저런 의견을 물었다. 어쩐지 당신은 평가받고 있는 듯한 느낌이 들었다...",
                        "아카시아는 사교회장에 참석한 자들의 명단을 보여주며 앞으로 당신도 이들과 친해지는 게 좋을 거라고 말했다."
                    ])
                }
            ], player, { onEnd });

            } else if ( affection > 30){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "아카시아는 당신과 시선을 마주하더니 묻고 싶은 게 있다면 물어봐도 된다고 말했다. <br><br>\"저도 당신에게 궁금한 점이 많아서요.\"",
                        "아카시아는 자신이 다른 사람에게 이런 종류의 관심이 생긴 건 처음이라고 말했다. 발렌에 대해 묻자 아카시아는 발렌은 그저 남동생처럼 느껴진다고 말했다.",
                        "아카시아는 자신은 요리를 잘하는 사람이 좋다고 말했다. <br><br>\"물론 그대라면 요리를 못하셔도 좋습니다. 고용할 수 있는 요리사는 이 세상에 많으니까요.\""
                    ])
                }
            ], player, { onEnd });

        } else{
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "아카시아는 당신의 이야기를 듣다가 다른 사람의 연락이 오자 대화를 멈췄다. <br><br>\"...아쉽네요. 조금 더 대화를 나누고 싶었는데.\"",
                        "아카시아는 당신의 나이를 듣더니 고개를 기울였다. <br><br>\"흐음, 그렇군요...\"<br><br>그는 당신을 위아래로 훑어보았다.",
                        "아카시아는 당신에게 상류도시에 대해 어떻게 생각하냐고 물었다. <br><br>\"상류도시는 무슨 일이 있어도 지킬 생각입니다.\"<br><br>그는 하류도시에 대해서는 말하지 않았다."
                    ])
                }
            ], player, { onEnd });
        }
    },

    otherTalk : (player) => {
        const choices = [];
        const today = getCurrentDay(player);

        choices.push({
            text: "음식을 건넨다",
            action: "akasia_giveFood"
        });

        choices.push({ text: "돌아간다", action: "akasia_talk" });

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

registerGiftActions("akasia");

function isAkasiaAvailable(player){
    const day = getWeekdayIndex(player);
    const time = getTimePeriod(player);

    // 월/수/금 아침과 새벽에는 없음
    if ([0, 2, 4].includes(day) && (time === "morning" || time === "dawn")){
        return false;
    }

    // 화/목 아침, 저녁에는 없음
    if ([1, 3].includes(day) && (time === "morning" || time === "night")){
        return false;
    }

    // 토/일에는 아침, 오후에 없음
    if ([5, 6].includes(day) && (time === "morning" || time === "afternoon")){
        return false;
    }

    return true;
}
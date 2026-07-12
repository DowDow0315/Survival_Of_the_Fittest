function processValenText(text, player){
    return text.replaceAll("{valenTitle}", getValenTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getValenTitle(player){
    if (NPC_DATA["valen"].emotion.rage > 60) return "방해꾼";
    else if(NPC_DATA["valen"].emotion.affection > 80) return "창백한꽃";
    else if(NPC_DATA["valen"].emotion.affection > 50) return "꽃";
    return "하류도시의 영웅";
}

registerActions("valen",{
    //주점대화로그
    giveFood : (player) => {
        openGiveFoodMenu(player, "valen");
    },
    
    talk: (player) => {
        if (!isValenAvailable(player)){
            showSingleTextScene(
                "발렌은 지금 자리에 없다. 그는 언제나 바쁘다.",
                player
            );
            return;
        }
        startScene([
            {
                type: "text",
                value: "집무실에서 서류를 읽고 있던 발렌이 언제나와 같은 미소를 지으며 당신을 올려다보았다."
            },
            {
                type: "choice",
                choices: [
                    { text: "사소한 잡담을 한다", action: "valen_smallTalk" },
                    { text: "다른 얘기를 한다", action: "valen_otherTalk" },
                    { text: "돌아간다", action: "back_location" }
                ]
            }
        ], player);
    },

    smallTalk : (player) => {
        passTime(player, 3);
        const affection = NPC_DATA["valen"].emotion.affection || 0;
        const dominance = NPC_DATA["valen"].emotion.dominance || 0;
        const fear = NPC_DATA["valen"].emotion.fear || 0;
        const onEnd = () => {
            if (affection > 50){
                changeEmotion("valen", "affection", 1);
            }
            startScene(getLocationScene(player), player);
        };

        if (dominance > 70 && affection > 70){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "\"이제는 상류도시를 사랑하시나요?\"<br><br>발렌은 아무렇지도 않게 당신의 손위로 자신을 손을 올리며 말했다. <br><br>\"...당연히 그래야겠지만.\"",
                        "발렌은 당신에게 차를 대접하며 차를 마시는 방법에 대해 알려주었다. 그는 당신이 조금이라도 틀어지면 자세를 교정해주었다.",
                        "그는 당신의 하류도시 생활에 대해 물었다. <br><br>\"하류도시의 창백한 꽃.\"<br><br>당신의 이야기를 듣던 발렌의 미소가 짙어졌다.<br><br>\"역시 영웅보다는 꽃이 당신에게 더 잘 어울립니다.\""
                    ])
                }
            ], player, { onEnd });
            } else if (affection > 90){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "발렌은 당신에게 상류도시에서 불편한 점이 있냐고 물었다. 그는 당신의 말을 주의깊게 듣고 있다.",
                        "발렌은 언젠가 자신을 위해 다른 사람이 되어줄 수 있냐고 물었다. <br><br>\"왜 그런 표정이시죠? 기다리고 있다보면 언젠가 당신에게 새로운 신분이 생길 기회가 주어질지도, 요.\"",
                        "발렌은 당신의 손가락 치수를 쟀다. 그는 당신의 손가락을 보며 희미한 미소를 짓고 있다.",
                        "아카시아에 대해 묻자 발렌은 아카시아는 자신에게 중요한 동반자라고 말했다. <br><br>\"연인보다는 인생의 동반자라고 해야겠죠.<br>...이게 당신이 원하는 대답 아니었나요, 하류도시의 영웅?\""
                    ])
                }
            ], player, { onEnd });

            } else if (affection > 70){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "발렌은 당신에게 사랑에 대해 어떻게 생각하냐고 물었다. 당신의 대답을 들은 발렌의 표정은 평온했다.",
                        "당신은 발렌에게 사랑에 대해 어떻게 생각하냐고 물었다. 발렌은 당신의 말에 귀엽다는 듯이 웃었지만 대답은 해주지 않았다.",
                        "발렌은 당신에게 상류도시가 지니고 있는 문제점들에 대해 말해주었다. 그는 당신에게 의견이 있다면 듣고 싶다고 말했다."
                    ])
                }
            ], player, { onEnd });

            } else if (fear > 50 && affection > 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "\"제가 두려우신가요?\"<br><br>발렌은 당신의 뺨에 손을 뻗었다. 그는 당신의 뺨을 쓰다듬으며 너무 두려워하지는 않아도 된다고 말했다. <br><br>\"당신을 해칠 생각은 없으니까요, 아직은.\"",
                        "발렌은 당신에게 손짓을 하더니 당신을 다리 사이에 앉혔다. 그는 당신의 머리 위에 턱을 올리며 낮게 웃었다. 당신의 순종을 즐기고 있다.",
                        "그는 하류도시와 상류도시 중 하나를 택해야 한다면 무엇을 택할 거냐고 물었다. <br>...당신이 어떻게 생각하든, 당신의 대답은 이미 정해져 있다."
                    ])
                }
            ], player, { onEnd });

            } else if ( fear > 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "그는 하류도시와 상류도시 중 하나를 택해야 한다면 무엇을 택할 거냐고 물었다. <br>...당신이 어떻게 생각하든, 당신의 대답은 이미 정해져 있다.",
                        "발렌은 당신을 말없이 바라보았다.<br><br>...당신이 먼저 시선을 피할 때까지 계속.",
                        "\"공포 분위기를 조성하는 건 좋아하지 않지만 필요하다고는 생각합니다.\"<br><br>발렌은 당신을 똑바로 바라보며 미소를 지었다. <bt><br>\"...그렇지 않나요?\""
                    ])
                }
            ], player, { onEnd });

            } else if ( affection > 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "발렌은 말없이 당신을 응시했다. 당신과 시선이 마주치자 그는 작게 웃었다. <br><br>\"이런, 당신이 너무 아름다워서 보고 있었습니다.\"<br><br>...진심일까?",
                        "당신은 발렌에게 꽃을 좋아하냐고 물었다. \"좋아합니다.\"<br><br>그는 당신을 올려다보았다. <br><br>\"특히 창백한 꽃을요.\"",
                        "발렌은 차를 마시며 당신은 어떤 차를 좋아하냐고 물었다. <br><br>\"저는 차는 다 좋아하는 거 같습니다. <br>....대부분.\""
                    ])
                }
            ], player, { onEnd });

        } else if (affection > 30){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "\"당신이 제 적으로 돌아서는 일은 없었으면 좋겠군요.\"<br><br>발렌이 당신을 보며 말했다. <br><br>\"마음에 드는 사람을 잃는 건 아까우니까요.\"",
                        "발렌은 당신의 취향에 대해 물었다. <br><br>\"경계하지 않으셔도 됩니다. 그저 당신을 알아가고 싶은 것뿐이니까요.\"<br><br>...진심일까?",
                        "발렌은 업무를 하다가도 당신이 말을 하자 멈추었다. 그는 당신의 이야기를 재밌다는 듯이 들어주고 있다."
                    ])
                }
            ], player, { onEnd });
        } else{
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "\"조금 나중에 와주시겠습니까?\"<br><br>발렌은 미소를 지으며 말했다. <br><br>\"지금은 바빠서요.\"",
                        "누군가와 연락을 하던 발렌은 당신을 보더니 조용히 검지를 손에 올렸다. 그리고 그는 통화를 이어갔다.",
                        "\"하류도시의 영웅.\"<br><br>발렌은 은근슬쩍 책상 위의 서류를 덮으며 말했다.<br><br>\"제게 하실 말씀이라도 있나요?\""
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
            action: "valen_giveFood"
        });

        choices.push({ text: "돌아간다", action: "valen_talk" });

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

registerGiftActions("valen");

function isValenAvailable(player){
    const day = getWeekdayIndex(player);
    const time = getTimePeriod(player);

    // 월/수/금 오후와 저녁에는 없음
    if ([0, 2, 4].includes(day) && (time === "night" || time === "afternoon")){
        return false;
    }

    // 화/목 오후, 새벽에는 없음
    if ([1, 3].includes(day) && (time === "afternoon" || time === "dawn")){
        return false;
    }

    // 토/일에는 아침, 오후에 없음
    if ([5, 6].includes(day) && (time === "morning" || time === "afternoon")){
        return false;
    }

    return true;
}
function processAkasiaText(text, player){
    return text.replaceAll("{akasiaTitle}", getAkasiaTitle(player))
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

        if (player.flags?.common_route_quest_06_mimicAbominationRumor_03 && !player.flags?.akasia_about_missingPeople){
            choices.push({
                text: "당신은 아카시아에게 목소리를 듣고 사라진 실종자들에 대해 뭔가를 알고 있냐고 물었다.",
                scene: NPC_DATA.akasia.scenes.akasia_about_missingPeople
            });
        }

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
    },

    lust_90_refuse : (player) => {
        const akasia = NPC_DATA["akasia"].emotion;        
        
        if (akasia.dominance >= 50) {
            startScene(
                NPC_DATA["akasia"].scenes.akasia_lust_90_refuse_no,
                player,
                {
                    onEnd: () => startScene(getLocationScene(player), player)
                }
            );
            return;
        }

        startScene(NPC_DATA["akasia"].scenes.akasia_lust_90_refuse_yes, player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });       
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

//스페셜 데이
//초코초코데이
window.SPECIAL_GIFT_HANDLERS.akasia = function(player, item, grade){
    if (item.specialGift === "chocoChoco"){
        startAkasiaChocoChocoGift(player, item, grade);
        return;
    }
};

function startAkasiaChocoChocoGift(player, item, grade){

    if (grade === "great"){
        startScene([
            {
                type : "text",
                value : [
                    "당신은 집무실에서 아카시아를 찾았다. 아카시아는 이미 수많은 초콜릿들을 받았지만, 선물 포장지는 단 하나도 뜯고 있지 않고 있었다." +
                    "<br><br>\"당신의 초콜릿을 제일 먼저 먹고 싶었습니다.\"<br><br>" +
                    "아카시아는 당신의 앞에서 당신의 수제 초콜릿을 먹었다. 그는 입을 오물거리며 당신의 초콜릿을 천천히 음미했다." +
                    "<br><br>\"...당신의 진심이 담겨서 그럴까요... 이 세상에서 제일 맛있네요.\"<br><br>" +
                    "아카시아는 당신에게 한 발자국 다가가더니 상류도시 사람들은 초코초코 데이 때 초콜릿을 받는 걸 청혼으로 생각하기도 한다는 걸 아냐고 물었다." +
                    "<br><br>\"당신의 청혼이라면 몇 번을 받아도 좋지만요.\"<br><br>" +
                    "그는 당신의 아랫입술에 입맞춤을 하며 웃었다." +
                    "<br><br>\"이건 청혼일까요, 아닐까요?\"<br><br>" +
                    "아카시아는 자신도 당신을 위한 초콜릿을 만들었다고 하며 당신에게 초콜릿을 내밀었다. 아카시아 꽃잎 모양의 하얀 초콜릿... 그는 장난스럽게 웃으며 당신의 입에 아카시아 꽃잎 모양의 초콜릿을 넣어주었다." +
                    "<br><br>\"...당신의 상상력에 맡기겠습니다.\""
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "akasia");
                    player.location = "heavenValenRoom";
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
                    "당신은 집무실에서 아카시아를 찾았다. 아카시아는 이미 수많은 초콜릿들을 받았지만, 선물 포장지는 단 하나도 뜯고 있지 않고 있었다." +
                    "<br><br>\"당신의 초콜릿을 제일 먼저 먹고 싶었습니다.\"<br><br>" +
                    "아카시아는 당신의 앞에서 당신의 수제 초콜릿을 먹었다. 그는 입을 오물거리며 당신의 초콜릿을 천천히 음미했다." +
                    "<br><br>\"분명 평범한 초콜릿인데.... 왜 저는 다르게 느껴질까요. 이 맛만큼은 제가 죽을 때까지 잊지 못할 것 같습니다.\"<br><br>" +
                    "중얼거리듯이 말하던 아카시아는 장난스럽게 웃으며 그래도 자신은 잊으려고 노력할 거라고 말했다. 그리고 그 핑계로 매년 초코초코데이 때 당신의 초콜릿을 받을 거라고 말했다." +
                    "<br><br>\"그리고 당신도...\"<br><br>" +
                    "그는 아무렇지도 않게 당신의 입에 초콜릿을 넣어주었다. 당신이 놀란 표정을 짓자 이 초콜릿의 맛은 다음 초코초코 데이 때까지만 기억하라고 말했다." +
                    "<br><br>\"다음 초코초코 데이 때도 또 드릴 거니까요.\"<br><br>" +
                    "...당신은 다른 건 몰라도 아카시아의 은은한 미소는 못 잊을 것 같다고 생각했다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "akasia");
                    player.location = "heavenValenRoom";
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
                    "당신은 집무실에서 아카시아를 찾았다. 아카시아는 이미 수많은 초콜릿들을 받았지만, 선물 포장지는 단 하나도 뜯고 있지 않고 있었다." +
                    "<br><br>\"당신의 초콜릿을 제일 먼저 먹고 싶었습니다.\"<br><br>" +
                    "아카시아는 당신의 앞에서 당신의 수제 초콜릿을 먹었다. 그는 입을 오물거리며 당신의 초콜릿을 천천히 음미했다." +
                    "<br><br>\"다른 사람들이 만든 요리였다면 화가 났을 것 같은데...\"<br><br>" +
                    "아카시아는 미소를 지었다." +
                    "<br><br>\"영광으로 아세요, {akasiaTitle}. 당신의 요리여서 먹는 거니까.\"<br><br>" +
                    "아카시아는 보란 듯이 당신의 수제 초콜릿을 당신의 앞에서 다 먹은 후 아카시아 꽃잎 모양의 하얀 초콜릿을 당신의 입에 넣어주었다. 당연히, 당신의 수제 초콜릿보다는 아카시아의 수제 초콜릿이 더 맛있었다. 아카시아는 웃으며 다음번에는 조금 더 노력해달라고 말했다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "akasia");
                    player.location = "heavenValenRoom";
                    changeNPCEmotion("akasia", "dominance", 5);
                    savePlayer(player);
                }
            }
        ], player);

        return;
    }
}
//연말 이벤트
window.YEAR_END_HANDLERS.akasia = function(player){

    startScene([
        {
            type : "text",
            value : [
                "당신은 마지막 날 밤을 아카시아와 함께 보내기로 했다. 당신의 초청에 응한 아카시아는 눈을 반짝이며 당신의 옆에 붙어 앉았다. 그는 언젠가부터인가 연말은 혼자 보냈었다고 말했다." +
                "<br><br>\"물론 어렸을 적에는 네 사람이 같이 지냈지만요.\"<br><br>" +
                "아카시아는 미소를 짓더니 당신은 어렸을 때 누구랑 연말을 보냈냐고 물었다. 당신이 이야기를 하는 동안 아카시아는 당신의 어깨에 머리를 기댔다. 어깨 위로 올라온 그의 머리가 가볍다." +
                "<br><br>\"1년 동안 어떤 일이 있었는지 말씀해주실 수 있나요? 특히 아직 다른 사람들에게 말하지 않은 이야기들도.\"<br><br>" +
                "당신과 아카시아는 시간 가는 줄도 모르고 이야기를 계속 이어갔다. 이야기가 잠깐 멈췄을 때 아카시아는 놀 것을 가져왔다고 말하며 젠가를 꺼냈다." +
                "<br><br>\"연인들끼리 하는 젠가, 해보시겠어요?\"<br><br>" +
                "아카시아는 당신의 옷차림을 위아래로 훑어보더니 의기양양한 표정을 지었다. 당신은 아카시아의 옷차림을 보았다.... 당신보다 훨씬 옷가지가 많다...."
            ]
        }
    ], player, {
        onEnd : () => completeYearEndEvent(player, "akasia")
    });
};
window.YEAR_END_LETTER_HANDLERS.akasia = function(player, next){

    startScene([
        {
            type : "text",
            value : [
                "아카시아에게서 온 편지다.<br><br><br>" +
                "<span class='log-akasia'>[당신을 이해하려고 노력은 했습니다. 어쩌면 하류도시 출신이라서, 1년의 마지막 날을 누군가와 함께 보내는 의미를 모르는 걸 수도 있겠다는 생각을 했습니다. 하류도시 출신이라고 해도 이 날의 의미를 모를 리가 없는데도 말이죠.]</span><br><br>" +
                "<span class='log-akasia'>[혹시 엇갈렸을까봐 당신이 있을만한 곳을 찾아다녀보기도 했습니다. 그리고 전, 당신의 집에 불이 켜져 있는 걸 보고 말았습니다.]</span><br><br>" +
                "<span class='log-akasia'>[연말의 마지막 밤을 잘 보내셨길 바랍니다. 제 몫까지도요. 저는 전혀 잘 보내지 못했거든요.]</span><br><br>" +
                "<span class='log-akasia'>[용서는 잘 모르겠습니다. 어쩌면 당신에게는 또 제가 자비를 베풀지도 모르죠. 하지만 용서를 한다고 해서 어제를 제가 잊을 수 있을지는 모르겠네요.]</span>"
            ]
        }
    ], player, {
        onEnd : next
    });
};
function processValenText(text, player){
    return text.replaceAll("{valenTitle}", getValenTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getValenTitle(player){
    if (NPC_DATA["valen"].emotion.rage > 60) return "방해꾼";
    else if(NPC_DATA["valen"].emotion.dominance > 50) return "퍼피";
    else if(NPC_DATA["valen"].emotion.fear > 50) return "작은 꽃";
    else if(NPC_DATA["valen"].emotion.affection > 80) return "창백한 꽃";
    else if(NPC_DATA["valen"].emotion.affection > 50) return "사랑스러운 꽃";
    return "하류도시의 영웅";
}

registerActions("valen",{
    //대화로그
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
                        "발렌은 언젠가 자신을 위해 다른 사람이 되어줄 수 있냐고 물었다. <br><br>\"왜 그런 표정이시죠? 기다리고 있다보면 언젠가 당신에게 새로운 신분이 생길 기회가 주어질지도 모르는 일 아닙니까.\"",
                        "발렌은 당신의 손가락 치수를 쟀다. 그는 당신의 손가락을 보며 희미한 미소를 짓고 있다.",
                        "아카시아에 대해 묻자 발렌은 아카시아는 자신에게 중요한 동반자라고 말했다. <br><br>\"연인보다는 인생의 동반자라고 해야겠죠.<br>...이게 당신이 원하는 대답 아니었나요, 나의 꽃?\""
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

        if (player.flags?.deric_about_nikolai_sister && !player.flags?.valen_about_nikolai_sister){
            choices.push({
                text: "당신은 니콜라이의 누나에 대해 물었다.",
                scene: NPC_DATA.valen.scenes.valen_about_nikolai_sister
            });
        }

        if (player.flags?.common_route_quest_06_mimicAbominationRumor_03 && !player.flags?.valen_about_missingPeople){
            choices.push({
                text: "당신은 발렌에게 목소리를 듣고 사라진 실종자들에 대해 뭔가를 알고 있냐고 물었다.",
                scene: NPC_DATA.valen.scenes.valen_about_missingPeople
            });
        }

        if (player.flags?.aiden_deepThought && !player.flags?.valen_about_aiden_deepThought){
            choices.push({
                text: "당신은 발렌에게 에이든은 언제 만났냐고 물었다.",
                scene: NPC_DATA.valen.scenes.valen_about_aiden_deepThought
            });
        }

        if (player.flags?.common_route_quest_11_intro_04 && !player.flags?.valen_about_common_route_quest_11_intro_04){
            choices.push({
                text: "당신은 발렌에게 하류도시에서 유행하는 종교에 대해 어떻게 생각하냐고 물었다.",
                scene: NPC_DATA.valen.scenes.valen_about_common_route_quest_11_intro_04
            });
        }

        if (player.flags?.common_route_quest_11_intro_04 && !player.flags?.valen_about_common_route_quest_11_intro_04_raphael){
            choices.push({
                text: "당신은 발렌에게 라파엘에 대해 어떻게 생각하냐고 물었다.",
                scene: NPC_DATA.valen.scenes.valen_about_common_route_quest_11_intro_04_raphael
            });
        }

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


//스페셜 데이
window.SPECIAL_GIFT_HANDLERS.valen = function(player, item, grade){
    if (item.specialGift === "chocoChoco"){
        startValenChocoChocoGift(player, item, grade);
        return;
    }
};

function startValenChocoChocoGift(player, item, grade){

    if (grade === "great"){
        startScene([
            {
                type : "text",
                value : [
                    "당신이 발렌의 집무실로 들어서자마자 발렌은 당신이 올 줄 알았다는 듯이 \"오셨습니까\"하고 당신을 맞이해주었다. 그는 지금 집무실 밖으로 나가면 초콜릿들의 세례에서 벗어날 수 없을 것 같다며 작게 농담을 했다. 그의 집무실 책상에는 이미 고급진 초콜릿들로 가득했다." +
                    "<br><br>\"...당신의 초콜릿을 기다리고 있었습니다, {valenTitle}\"<br><br>" +
                    "당신의 시선이 수많은 초콜릿들로 가있다는 걸 인지한 발렌은 미소를 지으며 자신이 가장 기다리고 있던 초콜릿은 당신의 초콜릿이라고 말했다. 그는 당신의 초콜릿을 맛보더니 미소를 지었다." +
                    "<br><br>\"제것도 준비했습니다.\"<br><br>" +
                    "그리고 그가 준비한 것은 더 이상 평범한 초콜릿이라 부를 수 없었다. 새하얀 꽃을 닮은 초콜릿들이 한 아름 묶여, 꽃다발을 이루고 있었다. 그는 당신에게 초콜릿 꽃다발을 건넨 뒤, 당신의 손을 잡아 손등 위로 가볍게 입을 맞췄다." +
                    "<br><br>\"영원히 제 곁에 있어주십시오, {valenTitle}.\"<br><br>" +
                    "...고개를 숙인 채 당신을 올려다보는 그의 푸른 눈동자에는 조금의 흔들림도 없었다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "valen");
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
                    "당신이 발렌의 집무실로 들어서자마자 발렌은 당신이 올 줄 알았다는 듯이 \"오셨습니까\"하고 당신을 맞이해주었다. 그는 지금 집무실 밖으로 나가면 초콜릿들의 세례에서 벗어날 수 없을 것 같다며 작게 농담을 했다. 그의 집무실 책상에는 이미 고급진 초콜릿들로 가득했다." +
                    "<br><br>\"...당신의 초콜릿을 기다리고 있었습니다, {valenTitle}\"<br><br>" +
                    "당신의 시선이 수많은 초콜릿들로 가있다는 걸 인지한 발렌은 미소를 지으며 자신이 가장 기다리고 있던 초콜릿은 당신의 초콜릿이라고 말했다. 그는 당신의 초콜릿을 맛보며 고개를 기울였다." +
                    "<br><br>\"맛으로는 특별할 게 없지만.... 그래도 당신이 이 날 저를 위해 만들어준 초콜릿이라 생각하니 특별하게 느껴지는 군요.\"<br><br>" +
                    "그는 다음 초코초코 데이 때도 기다리고 있겠다고 말하며 당신에게 초콜릿 차를 대접했다. 왜 초콜릿이 아니라 초콜릿 차냐고 묻자 그는 미소를 지으며 자신이 당신에게 청혼하는 모습을 보고 싶냐고 물었다. 농담인지 진담인지 잘 모르겠다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "valen");
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
                    "당신이 발렌의 집무실로 들어서자마자 발렌은 당신이 올 줄 알았다는 듯이 \"오셨습니까\"하고 당신을 맞이해주었다. 그는 지금 집무실 밖으로 나가면 초콜릿들의 세례에서 벗어날 수 없을 것 같다며 작게 농담을 했다. 그의 집무실 책상에는 이미 고급진 초콜릿들로 가득했다." +
                    "<br><br>\"...당신의 초콜릿을 기다리고 있었습니다, {valenTitle}\"<br><br>" +
                    "당신의 시선이 수많은 초콜릿들로 가있다는 걸 인지한 발렌은 미소를 지으며 자신이 가장 기다리고 있던 초콜릿은 당신의 초콜릿이라고 말했다. 그 말은 다른 초콜릿들도 기다린 거냐고 묻자, 발렌은 당연히 와야 할 초콜릿들은 기다리고 있었다고 말했다." +
                    "<br><br>\"그들과는 사이가 틀어지지 않아야 하거든요.\"<br><br>" +
                    "발렌은 당신의 초콜릿을 맛보며 말했다." +
                    "<br><br>\"...당신의 초콜릿보다 맛있기도 하고요.\"<br><br>" +
                    "그는 만약 이 초콜릿이 프로포즈 용도였다면 다음 초코초코 데이 때 다시 한번 청혼을 시도해보는 게 좋겠다고 가볍게 말했다. 농담일까, 아니면 진심일까. 아무튼 발렌은 평소와 다르게 당신의 맛없는 초콜릿도 다 먹어주었다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "valen");
                    player.location = "heavenValenRoom";
                    savePlayer(player);
                }
            }
        ], player);
        return;
    }
}

//연말 이벤트
window.YEAR_END_HANDLERS.valen = function(player){

    startScene([
        {
            type : "text",
            value : [
                "\"당신을 만나기 전까지, 저는 한 해의 마지막을 천국의 성에서 보내지 않은 적이 없습니다.\"<br><br>" +
                "발렌은 당신의 방에 들어서면서 부드러운 목소리로 말했다. 당신과 시선이 마주치자 발렌은 웃으며 당신과 있으면 쉴 수 있어서 좋다고 말했다. 그는 당신의 앞에 앉으며 연말에도 자신은 백색 도시 생각으로 바빴다고 말했다." +
                "<br><br>\"제 안위를 걱정하기보다는 도시의 안위를 걱정했고, 제 미래보다는 도시의 미래를 생각했었습니다. 하지만 지금은....\"<br><br>" +
                "발렌은 소리 없이 웃었다. 당신은 발렌과 마주앉아서 이야기를 했다. 무거운 이야기와 가벼운 이야기를 번갈아 하던 발렌은 말을 멈췄다. 그는 당신을 멍하니 응시하다가 웃으며 자리에서 일어났다. 그리고 그는 당신의 옆에 앉았다." +
                "<br><br>\"...잊고 있었습니다. 당신은 그저 마주해야 하는 사람이 아니라는 걸.\"<br><br>" +
                "당신의 옆에 앉은 발렌은 자연스럽게 당신의 손을 잡았다. 그의 손가락이 당신의 손가락 사이사이에 파고든다. 그는 오늘은 조금 더 우리 둘의 미래에 집중하자고 말했다." +
                "<br><br>\"예를 들면, 모든 것이 끝난 후 저희의 이야기라든가.\"<br><br>" +
                "...이야기꽃은 마지막까지 시들지 않았다."
            ]
        }
    ], player, {
        onEnd : () => completeYearEndEvent(player, "valen")
    });
};
window.YEAR_END_LETTER_HANDLERS.valen = function(player, next){

    startScene([
        {
            type : "text",
            value : [
                "발렌에게서 온 편지다. 언제나처럼 우아한 글씨체다.<br><br><br>" +
                "<span class='log-valen'>[어제 저는 백색 도시를 내려다 보았습니다. 당신은 제가 내려다본 세상에 있었을 수도 있고, 혹은 없었을 수도 있지요.]</span><br><br>" +
                "<span class='log-valen'>[그리고 저는 당신의 용기를 칭찬했습니다. 당신은 분명 절 잘 압니다. 어쩌면 이 세상 누구보다도 저를 잘 아는 사람이지요. 그런데도 저를 배신하시다니.... 제가 아는 당신이라면 각오는 하고 선택을 하신 거겠죠.]</span><br><br>" +
                "<span class='log-valen'>[그리고 저도, 저만의 선택을 해야 하고요.]</span><br><br>" +
                "<span class='log-valen'>[다시 보는 그날까지 당신이 평안하시길.]</span><br><br>"
            ]
        }
    ], player, {
        onEnd : next
    });
};

//버섯이벤트
window.MUSHROOM_ROMANCE_HANDLERS.valen = function(player, next){
    const mushroomType =
        getMushroomRomanceType();

    if (mushroomType === "tasty"){
        startScene([
            {
                type : "text",
                value : [
                    "\"...이런. 업무 중이었는데... 그래도 이런 방해는 나쁘지 않군요.\"<br><br>" +
                    "발렌은 마침 기분 전환이 필요했다고 말하며 당신의 옆으로 다가왔다. 그는 버섯을 보더니 정체도 모르는 것을 그냥 먹을 수는 없다고 말했다." +
                    "<br><br>\"저는 아직 쓰러질 수 없으니까요. 그렇다고 당신을 쓰러뜨릴 수도 없고.\"<br><br>" +
                    "발렌은 여유롭게 웃으며 자신의 마법칼을 만지작거렸다. 꿀꺽, 버섯맨들의 침 삼키는 소리가 들린다. 발렌은 상큼한 얼굴로 가고 싶을 때는 가면 된다고 말했다. 버섯맨들의 웅성거림이 커졌다...." +
                    "<br><br>\"자, 그럼... 가고 싶어질 때까지는 여기에 있어 볼까요? 마침 당신에게 하고 싶었던 이야기가....\"<br><br>" +
                    "버, 버서어어엇! 버섯의 비명과 함께 하얀 빛이 두 사람에게 쏟아져 내렸다. 이건 대체 무슨 마법, 발렌은 중얼거리며 버섯맨들 쪽으로 고개를 돌렸다. 버섯맨들은 급하게 빛의 강도를 올렸다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    passTime(player, 3);
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
                    "발렌은 안내문을 읽은 후 버섯을 보았다." +
                    "<br><br>\"화려한 것에는 보통 독이 있는 법이죠.\"<br><br>" +
                    "그는 그 버섯을 먹을 생각이 없어 보인다. 물론 당신을 먹일 생각도 없고. 발렌은 독버섯을 바닥에 던지더니 자신의 마법 칼의 등을 부드럽게 쓰다듬었다." +
                    "<br><br>\"당신처럼요, {valenTitle}.\"<br><br>" +
                    "버섯맨들의 침 넘어가는 소리가 들린다... 그들은 웅성거리더니 곧 하얀 빛을 내리쬐기 시작했다. 발렌은 이 마법은 어떤 마법인지 궁금하다고 말하며 언젠가는 자신이 밝히겠다고 말하며 웃었다.... 어쩐지 당신은 소름이 돋았다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeNPCEmotion("valen", "fear", 3);
                    changeNPCEmotion("valen", "dominance", 5);
                    passTime(player, 5);
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
                "\"아.\"<br><br>" +
                "발렌은 남성기 모양의 버섯을 보자마자 불쾌하다는 듯 얼굴을 굳혔다. 그러더니 그는 당신에게 다가가서 당신의 눈을 한 손으로 가려주었다." +
                "<br><br>\"당신과는 어울리지 않는 모양입니다. 신경쓰지 않는 걸로 하죠.\"<br><br>" +
                "그는 버섯이 아니어도 나갈 방법은 많다고 말하며 당신을 자리에 앉혔다. 갇힌 건 신경쓰지도 않는지, 그는 아무렇지도 않게 일상 이야기를 이어갔다. 당신은 당신도 모르게 그의 이야기를 들으며 똑같이 자연스러워졌다. 버섯맨들이 뒤에서 웅성거리는 소리가 들린다." +
                "<br><br>\"그나저나 머쉬룸 킹덤이 정말 존재하는 것일 줄은.... 배울 게 많을지도 모르겠군요.\"<br><br>" +
                "버서서서서서섯! 단말마. 그리고 하얀 빛이 부리나케 당신과 발렌을 감싸 안았다. 발렌의 시선은 여전히 머쉬룸 킹덤을 살피고 있었다.... 마치 해부하듯이."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                changeNPCEmotion("valen", "fear", 3);
                changeNPCEmotion("valen", "dominance", 5);
                passTime(player, 5);
            }
        }
    ], player, {
        onEnd : next
    });
};
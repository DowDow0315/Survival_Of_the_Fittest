function processNikolaiText(text, player){
    return text.replaceAll("{nikolaiTitle}", getNikolaiTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getNikolaiTitle(player){
    if (NPC_DATA["nikolai"].emotion.rage > 70) return "암퇘지";
    else if(NPC_DATA["nikolai"].emotion.lust > 70) return "러블리";
    else if(NPC_DATA["nikolai"].emotion.affection > 80) return "보석";
    else if(NPC_DATA["nikolai"].emotion.affection > 50) return "스위츠달링";
    return "자기";
}

registerActions("nikolai", {
    //처음 이벤트
    gloryHoleWelcome_defiant: (player) => {
        changeEmotion("nikolai", "rage", 2);
        startScene(NPC_DATA["nikolai"].scenes.nikolai_gloryHoleWelcome_defiant, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },

    gloryHoleWelcome_neutral: (player) => {
        changeEmotion("nikolai", "affection", 3);
        startScene(NPC_DATA["nikolai"].scenes.nikolai_gloryHoleWelcome_neutral, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },

    gloryHoleWelcome_submissive: (player) => {
        changeEmotion("nikolai", "affection", 5);
        changeGold(player, 100);
        startScene(NPC_DATA["nikolai"].scenes.nikolai_gloryHoleWelcome_submissive, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },

    //개인이벤트

    //스토리이벤트

    //talk
    giveFood : (player) => {
        openGiveFoodMenu(player, "nikolai");
    },

    talk: (player) => {
        startScene([
            {
                type: "text",
                value: "니콜라이는 당신을 보더니 미소를 지었다. <br><br>\"무슨 일이야, {nikolaiTitle}?\"<br><br>그는 살랑살랑 당신에게 손을 흔들었다."
            },
            {
                type: "choice",
                choices: [
                    { text: "사소한 잡담을 한다", action: "nikolai_smallTalk" },
                    { text: "다른 얘기를 한다", action: "nikolai_otherTalk" },
                    { text: "돌아간다", action: "gh_office" }
                ]
            }
        ], player);
    },
    smallTalk : (player) => {
        passTime(player, 5);
        const affection = NPC_DATA["nikolai"].emotion.affection || 0;
        const rage = NPC_DATA["nikolai"].emotion.rage || 0;
        const onEnd = () => {
            startScene(getLocationScene(player), player);
            changeEmotion("nikolai", "affection", 1);
        };

        if (rage >= 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "니콜라이는 미소를 짓고 있긴 했지만, 어쩐지 차가웠다...<br><br>\"바빠서 그런데, 용건이 없으면 가주지 않겠어?\"",
                        "\"있잖아, 이게 화를 달래는 방법이라고 믿었다면 땡이야.\"<br><br>니콜라이는 자판을 두드리며 말했다.<br><br>\"난 화나는 얼굴이 내 앞에 있으면 더 화나거든.\""
                    ])
                }
            ], player, { onEnd });
            return;
        }

        else if (affection >= 90){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "니콜라이는 조용히 당신의 옆에서 휴식을 즐기다가 당신이 가려고 하자 당신의 팔을 살짝 잡았다. <br><br>\"조금만 더...\"",
                        "니콜라이는 당신의 손에 손깍지를 끼며 장난을 쳤다. 그러다가 그는 당신의 가슴에 머리를 묻으며 당신과 있으면 진짜 쉬는 것 같아서 좋다고 말했다.",
                        "\"언젠가 내가 죽게 된다고 해도...\"<br><br>니콜라이는 아무렇지도 않게 웃으며 말을 이었다. <br><br>\"자기만큼은 날, 니콜라이로 기억해줬으면 해.\""
                    ])
                }
            ], player, { onEnd });
        } 

        else if (affection >= 80){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "니콜라이는 당신의 잡담에 즐거워하고 있다. 그는 까르르 웃더니 당신의 얘기는 언제 들어도 재밌다고 말해주었다.",
                        "니콜라이는 꽃받침을 한 채 당신의 얘기를 듣고 있다. 그는 당신의 얘기에 몇 번이고 고개를 끄덕이며 웃었다.",
                        "잠시 말이 없던 니콜라이는 미안하다는 듯 웃었다. <br><br>\"미안. 사실 난 말하는 것보다 듣는 걸 더 좋아하거든. 네가 편해서 그런지 자꾸 말이 없어지네.\"",
                        "니콜라이는 당신의 얘기에 웃음을 터뜨렸다. 그는 당신의 얘기가 재밌다고 생각하고 있다."
                    ])
                }
            ], player, { onEnd });
        } else if (affection > 60){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "니콜라이는 당신에게 컵케이크를 먹겠냐고 물었다. 당신은 고개를 끄덕였고 그의 옆에 앉아서 상류도시에서 사온 컵케이크르 나눠먹었다.",
                        "니콜라이는 상류도시 사람들과의 대화는 재미없지 않냐고 물었다. <br><br>\"출신 때문에 그런가, 난 하류도시 사람들이랑 대화하는 게 더 재밌더라고.\"",
                        "니콜라이는 당신에게 상류도시의 예법에 대해 가르쳐주었다. 그는 상류도시에서 무시를 당하지 않으려면 상류도시 사람들처럼 행동해야 한다고 말했다.<br><br>\"자기는 나같은 사람이 아니잖아. 존중받아야지.\""
                    ])
                }
            ], player, { onEnd });
        } else{
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "니콜라이는 웃으며 당신에게 자신과 얘기를 하는 게 재밌냐고 물었다. 그는 당신을 앞에 앉혀두고 이것저것 많은 것들을 얘기해주었다.",
                        "니콜라이는 소문에 빨랐다. 당신이 니콜라이에게 어떻게 그렇게 소문을 잘 아냐고 묻자 그는 웃으며 가끔씩 상류도시의 사람들은 자신을 귀머거리로 생각하기 때문이라고 말했다.",
                        "니콜라이는 당신의 하루에 대해 물었다. 그는 당신의 일상을 들으며 미소를 잃지 않았다.",
                        "니콜라이는 오늘도 한 사람을 상류도시에 올려보냈다고 말했다. 그는 그 누구에게도 타인의 선택을 막을 권리는 없다고 말했다."
                    ])
                }
            ], player, { onEnd });
        }
    },
    otherTalk : (player) => {
        const choices = [];

        choices.push({
            text: "음식을 건넨다",
            action: "nikolai_giveFood"
        });

        if (!player.flags?.nikolai_ask_about_deric){
            choices.push({
                text: "데릭에 대해 묻는다.",
                scene: NPC_DATA.nikolai.scenes.nikolai_ask_about_deric
            });
        }

        if (!player.flags?.nikolai_ask_about_ash && player.flags.uppercity_quest03_done ){
            choices.push({
                text: "애쉬 가문에 대해 묻는다.",
                scene: NPC_DATA.nikolai.scenes.nikoai_ask_about_ash
            });
        }

        if (!player.flags?.nikolai_ask_about_hisUppercity_01 && player.flags.nikolai_upperOneNight_01_seen ){
            choices.push({
                text: "상류도시에서 무슨 일을 하고 있냐고 묻는다.",
                scene: NPC_DATA.nikolai.scenes.nikolai_ask_about_hisUppercity_01
            });
        }

        if (!player.flags?.nikolai_ask_about_breakUp_01 && player.flags.nikolai_breakUp_01 ){
            choices.push({
                text: "정말로 우리가 헤어진 거냐고 묻는다.",
                scene: NPC_DATA.nikolai.scenes.nikolai_ask_about_breakUp_01
            });
        }

        if (!player.flags?.nikolai_notAnswerMercy && player.flags.act3QuestNikolaiMercy ){
            choices.push({
                text: "당신은 니콜라이에게 그날 왜 자신을 공격했냐고 물었다.",
                scene: NPC_DATA.nikolai.scenes.nikolai_notAnswerMercy
            });
        }

        if (!player.flags?.nikolai_notAnswerMercy2 && player.flags.act3QuestNikolaisMercy ){
            choices.push({
                text: "당신은 니콜라이에게 왜 자신을 살려줬냐고 물었다.",
                scene: NPC_DATA.nikolai.scenes.nikolai_notAnswerMercy2
            });
        }

        if (!player.flags?.nikolai_about_valen_01 && player.flags.act3_quest_07_upper_boss_end ){
            choices.push({
                text: "당신은 니콜라이에게 발렌의 밑에서 일하는 거냐고 물었다.",
                scene: NPC_DATA.nikolai.scenes.nikolai_about_valen_01
            });
        }

        if (!player.flags?.nikolai_heavenPalace_hisLocation_07 && player.flags.nikolai_heavenPalace_hisLocation_06 ){
            choices.push({
                text: "당신은 니콜라이에게 당신을 노리는 자가 있다고 알려주었다.",
                scene: NPC_DATA.nikolai.scenes.nikolai_heavenPalace_hisLocation_07
            });
        }

        if (!player.flags?.nikolai_killingTatiana_answer && player.flags.nikolai_killingTatiana ){
            choices.push({
                text: "당신은 타티아나에 대해 물었다.",
                scene: NPC_DATA.nikolai.scenes.nikolai_killingTatiana_answer
            });
        }

        if (!player.flags?.nikolai_savingTatiana_answer && player.flags.nikolai_savingTatiana ){
            choices.push({
                text: "당신은 타티아나에 대해 물었다.",
                scene: NPC_DATA.nikolai.scenes.nikolai_savingTatiana_answer
            });
        }

        choices.push({ text: "돌아간다", action: "nikolai_talk" });

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

registerGiftActions("nikolai");

window.giveDericLetter = function(player){
    if (!hasItem(player, "데릭의 친필 서신")){
        addItem(player, ITEMS.misc.dericLetter);
    }

    player.flags.dericLetterReceived = true;
    savePlayer(player);
};

//스페셜 데이
window.SPECIAL_GIFT_HANDLERS.nikolai = function(player, item, grade){
    if (item.specialGift === "chocoChoco"){
        startNikolaiChocoChocoGift(player, item, grade);
        return;
    }
};

function startNikolaiChocoChocoGift(player, item, grade){

    if (grade === "great"){
        startScene([
            {
                type : "text",
                value : [
                    "글로리홀은 이미 초콜릿들로 가득했다. 여러 창남 창녀들이 자신의 손님들에게 초콜릿을 받으며 야릇하게 웃고 있었다. 당신은 니콜라이를 찾기 위해 주변을 둘러보았다." +
                    "<br><br>\"어머, 자기!\"<br><br>" +
                    "니콜라이는 초콜릿을 냠냠 먹으며 당신에게 누굴 찾고 있는 거냐고 물었다." +
                    "<br><br>\"나~?\"<br><br>" +
                    "당신은 니콜라이에게 초콜릿을 내밀었다. 니콜라이는 당신을 끌어안으며 감동이라고 말했다. 그는 당신을 끌어안은 채 입으로 \"두근두근\" 소리까지 내더니, 당신의 초콜릿을 주저 없이 먹었다." +
                    "<br><br>\"어머! 지금까지 먹은 초콜릿 중 제일 맛있어, 자기야!\"<br><br>" +
                    "그는 답례로 자신도 초콜릿을 주겠다고 말하며 당신의 입에 초콜릿을 쏙 집어넣었다. 당신은 니콜라이에게 수제로 만든 거냐고 물었다. 니콜라이는 어깨만 으쓱였다." +
                    "<br><br>\"비밀이 많은 게 더 매력적이지 않아?\"<br><br>" +
                    "...확실한 건 그가 준 초콜릿은 시중에 있는 초콜릿과는 맛이 달랐다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "nikolai");
                    player.location = "gloryHole";
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
                    "글로리홀은 이미 초콜릿들로 가득했다. 여러 창남 창녀들이 자신의 손님들에게 초콜릿을 받으며 야릇하게 웃고 있었다. 당신은 니콜라이를 찾기 위해 주변을 둘러보았다." +
                    "<br><br>\"어머, 자기!\"<br><br>" +
                    "니콜라이는 초콜릿을 냠냠 먹으며 당신에게 누굴 찾고 있는 거냐고 물었다." +
                    "<br><br>\"나~?\"<br><br>" +
                    "당신은 니콜라이에게 초콜릿을 내밀었다. 니콜라이는 당신을 끌어안으며 감동이라고 말했다. 그는 당신을 끌어안은 채 입으로 \"두근두근\" 소리까지 내더니, 당신의 초콜릿을 주저 없이 먹었다." +
                    "<br><br>\"어머! 지금까지 먹은 초콜릿 중 제일 맛있어, 자기야!\"<br><br>" +
                    "아닐 텐데? 당신은 그를 올려다봤지만 그는 싱글싱글 웃고 있기만 했다. 그는 답례로 자신도 초콜릿을 주겠다고 말하며 당신의 입에 초콜릿을 쏙 집어넣었다. 당신은 니콜라이에게 수제로 만든 거냐고 물었다. 니콜라이는 어깨만 으쓱였다." +
                    "<br><br>\"비밀이 많은 게 더 매력적이지 않아?\"<br><br>" +
                    "...확실한 건 그가 준 초콜릿은 시중에 있는 초콜릿과는 맛이 달랐다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "nikolai");
                    player.location = "gloryHole";
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
                    "글로리홀은 이미 초콜릿들로 가득했다. 여러 창남 창녀들이 자신의 손님들에게 초콜릿을 받으며 야릇하게 웃고 있었다. 당신은 니콜라이를 찾기 위해 주변을 둘러보았다." +
                    "<br><br>\"어머, 자기!\"<br><br>" +
                    "니콜라이는 초콜릿을 냠냠 먹으며 당신에게 누굴 찾고 있는 거냐고 물었다." +
                    "<br><br>\"나~?\"<br><br>" +
                    "당신은 니콜라이에게 초콜릿을 내밀었다. 니콜라이는 당신을 끌어안으며 감동이라고 말했다. 그는 당신을 끌어안은 채 입으로 \"두근두근\" 소리까지 내더니, 당신의 초콜릿을 주저 없이 먹었다." +
                    "<br><br>\"어머! 지금까지 먹은 초콜릿 중 제일 맛있...다고 말하기엔 내가 양심이 없는 것 같네.\"<br><br>" +
                    "그는 자신이 들고 있던 초콜릿들을 하나하나 당신의 입에 넣어주었다. 그는 몇 개는 수제로 만든 초콜릿이라고 하며 미소를 지었다. 어떤 초콜릿이든 당신의 초콜릿보다는 맛있었다." +
                    "<br><br>\"그래도 자기 초콜릿은 기억에 남을 것 같아.\"<br><br>" +
                    "니콜라이는 놀리듯 말하며 당신의 뺨을 아프지 않게 꼬집었다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "nikolai");
                    player.location = "gloryHole";
                    savePlayer(player);
                }
            }
        ], player);
        return;
    }
}


//연말 이벤트
window.YEAR_END_HANDLERS.nikolai = function(player){

    startScene([
        {
            type : "text",
            value : [
                "\"...자기.\"<br><br>" +
                "당신에게 초청을 받은 후에도 정말로 나냐고, 장난치는 거 아니냐고, 나여도 괜찮겠냐고 몇 번이나 묻던 니콜라이는 당신의 방에 들어오고 나서야 드물게 낮은 목소리로 당신을 불렀다. 당신이 돌아보자 니콜라이는 답지 않게 당신의 시선을 피했다." +
                "<br><br>\"이제 더 묻지는 않을게. 자기의 선택이니까.\"<br><br>"+
                "니콜라이는 다시 고개를 들고 당신과 시선을 마주했다. 그는 평소처럼 생글생글 웃으며 연말에는 보통 무엇을 했냐고 물었다. 당신의 대답에 니콜라이는 꺄르륵 웃으며 회색 농담을 했다." +
                "<br><br>그는 당신을 끌어안으며 내년은 당신이 조금 덜 다치는 1년이 되었으면 좋겠다고 말했다. 그는 당신의 어깨에 자신의 얼굴을 묻더니 당신 냄새가 나서 좋다고 말했다." +
                "<br><br>당신과 그는 떠들다가 그대로 잠이 들어버렸다. 눈을 떴을 때, 여전히 니콜라이는 당신을 끌어안고 있었다."
            ]
        }
    ], player, {
        onEnd : () => completeYearEndEvent(player, "nikolai")
    });
};
window.YEAR_END_LETTER_HANDLERS.nikolai = function(player, next){

    startScene([
        {
            type : "text",
            value : [
                "니콜라이에게서 온 편지다. 마지막에는 입술 도장이 찍혀 있다.<br><br><br>" +
                "<span class='log-nikolai'>[어머, 자기, 어제 즐거운 시간 보낸 것 같더라? 다음 번에는 나도 그 자리에 끼워주길 바라 ㅋㅅㅇ]</span><br><br>" +
                "<span class='log-nikolai'>[자기가 잘 지낸 건 알지만, 그래도 새해 복 많이 받으라는 말은 하고 싶어서 이렇게 편지를 쓰게 됐네. 내가 자기를 생각보다 더~더~더~ 아끼거든.]</span><br><br>" +
                "<span class='log-nikolai'>[자기야, 새해 복 많이 받아.]</span><br><br>" +
                "<span class='log-nikolai'>[죽지 말고~ 자기를 못 본다고 생각하면 마음이 찢어져버린단 말이야. 항상 몸 조심해~ 당신의 니콜라이가.]</span><br><br>"
            ]
        }
    ], player, {
        onEnd : next
    });
};
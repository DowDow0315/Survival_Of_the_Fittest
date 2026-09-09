function processKainText(text, player){
    return text.replaceAll("{kainTitle}", getKainTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getKainTitle(player){
    if (NPC_DATA["kain"].emotion.rage > 60) return "개자식";
    else if(NPC_DATA["kain"].emotion.affection > 80) return "나의 별";
    else if(NPC_DATA["kain"].emotion.affection > 50) return "별";
    return "그새끼꺼";
}

registerActions("kain", {
    giveFood : (player) => {
        openGiveFoodMenu(player, "kain");
    },

    //개인 이벤트
    patience_limit_accept: (player) => {
        const scene = player.gender === "male"
        ? NPC_DATA["kain"].scenes.kain_patience_limit_accept_male
        : NPC_DATA["kain"].scenes.kain_patience_limit_accept_female;
        startScene(scene, player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });
    },
    
    patience_limit_refuse: (player) => {
        const kain = NPC_DATA["kain"].emotion;
        const forceScene = player.gender === "male"
        ? NPC_DATA["kain"].scenes.kain_patience_limit_force_male
        : NPC_DATA["kain"].scenes.kain_patience_limit_force_female;
        
        const forceCondition = kain.rage >= 50
        
        if (forceCondition) {
            startScene(forceScene, player, {
                onEnd: () => startScene(getLocationScene(player), player)
            });
            return;
        }
        
        startScene(
            NPC_DATA["kain"].scenes.kain_patience_limit_respect,
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
        
    },

    upper_route_quest_08_intro_attack_after_yuri : (player) => {
        const kain = NPC_DATA["kain"].emotion;
        const brokeUpCondition = kain.affection < 90

        if (brokeUpCondition) {
            startScene(
                NPC_DATA["kain"].scenes.kain_upper_route_quest_08_intro_attack_after_yuri_breakUp,
                player,
                {
                    onEnd: () => startScene(getLocationScene(player), player)
                }
            );
            return;
        }

        startScene(
            NPC_DATA["kain"].scenes.kain_upper_route_quest_08_intro_attack_after_yuri_cant_breakUp,
            player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );

    },

    talk: (player) => {
        if (!isKainAvailable(player)){
            showSingleTextScene(
                "카인은 지금 없는 것 같다.",
                player
            );
            return;
        }

        startScene([
            {
                type: "text",
                value: "당신이 다가오자 카인이 당신을 쳐다봤다."
            },
            {
                type: "choice",
                choices: [
                    { text: "사소한 잡담을 한다", action: "kain_smallTalk" },
                    { text: "다른 얘기를 한다", action: "kain_otherTalk" },
                    { text: "돌아간다", action: "back_location" }
                ]
            }
        ], player);
    },

    smallTalk : (player) => {
        passTime(player, 5);
        const affection = NPC_DATA["kain"].emotion.affection;
        const rage = NPC_DATA["kain"].emotion.rage;
        const dominance = NPC_DATA["kain"].emotion.dominance;
        const onEnd = () => {
            if (NPC_DATA["kain"].emotion.affection > 50 && rage <= 60){
                changeEmotion("kain", "affection", 1);
                changeEmotion("kain", "rage", -1);
            }

            if (rage>60){
                changeStamina(player, -10);
            }

            if (dominance>50){
                changeStamina(player, -5);
            }
            
            startScene(getLocationScene(player), player);
        };
    
        if (rage > 60 && affection > 90){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "카인은 사나운 얼굴로 당신을 쏘아보았다. 당신이 어떤 말을 하든 그는 받아들이지 않을 것이다. 그는 당신에게 무언가를 말하려다가 욕을 하며 그만두었다.",
                        "\"넌 대체 나한테 뭘 원하는 거야!\"<br>그는 화를 냈다. 그러더니 고개를 돌려버렸다. 하지만 당신이 정말로 가려고 하자 그는 자기도 모르게 당신의 팔을 붙잡았다. <br>\"...씨발.\"<br>그는 욕을 하면서도 당신의 팔을 놓아주지는 않았다.",
                        "\"넌...넌 대체 왜 자꾸...\"<br>그는 갈피를 잡지 못하고 있다. 그는 당신에게 무언가를 말하려다가 욕을 하며 바닥을 발로 찼다."
                    ])
                }
            ], player, { onEnd });
        } else if (rage > 60 && dominance > 50 && affection > 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "카인은 당신의 손목을 잡으려다가 주변의 시선을 의식했는지 손을 멈췄다.<br>\"넌 대체 나랑 뭘하고 싶은 거야.\"<br>그는 당신에게 차갑게 쏘아붙였다.",
                        "카인은 몸을 돌려 다른 사람들의 시야에서 당신을 가렸다.<br>\"넌 씨발... 진짜 짜증나는 개새끼야.\"<br>그는 당신을 내려다보며 중얼거렸다.",
                        "카인은 당신의 목에 코를 대더니 인상을 찌푸렸다. <br>\"너, 어디 갔다온 거야?\"<br>그는 당신의 손목을 쥐었다. <br>\"지금 당장 말해.\""
                    ])
                }
            ], player, { onEnd });
        } else if (rage > 60){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "카인은 당신을 보더니 인상을 찌푸렸다. <br>\"씨발. 왜?\"<br>그는 당신의 얼굴만 봐도 짜증을 내고 있다."
                    ])
                }
            ], player, { onEnd });
        } else if (affection > 80){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "노래를 흥얼거리고 있던 카인은 당신이 오자 헛기침을 하며 목을 가다듬었다. 그는 당신과 시선을 마주쳤다가 바로 돌리며 괜히 툴툴거렸다. <br>\"왜. 뭐 할 말 있어?\"",
                        "짜증을 내고 있던 그는 당신이 오는 것을 보더니 표정이 조금 순하게 풀어졌다. <br>\"야, 다음 공연 때...\"<br>그는 말을 삼켰다.<br>\"아냐. 됐어.\"",
                        "카인은 당신에게 결혼에 대해서는 어떻게 생각하고 있냐고 물었다. 당신이 뭐라고 하지도 않았는데 괜히 그는 변명부터 해댔다. <br>\"데릭이 결혼 얘기하길래 궁금해서 물어본 거야. 별 뜻은 없어.\""
                    ])
                }
            ], player, { onEnd });
        } else if (affection > 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "카인은 당신을 위아래로 훑어보더니 곧장 인상을 구겼다. 그는 저벅저벅 걸어오더니 당신의 옷차림을 정돈해주며 남들 앞에서 이런 꼴 좀 보이지 말라고 말했다. <br>\"씨발, 다들 쳐다보잖아.\"<br>그는 짜증을 냈다.",
                        "카인은 당신의 앞에서 작게 하품을 했다. 하품을 하자마자 당신이 있다는 걸 자각한 카인은 괜히 다른 사람들 공연이나 관람객에 대해 투덜거리면서 시선을 돌렸다. 그의 귀끝이 붉다.",
                        "공연에 대해 물어보자 카인은 이런저런 이야기를 많이 해주었다. 그는 한 사람이 공연장으로 들어가는 걸 보더니 혀를 찼다.<br>\"생각보다 노래를 진짜로 좋아해서 하는 사람은 많지 않아.\"<br>그는 말하다가 다시 짜증이 났는지 괜히 바닥을 발로 찼다.",
                        "카인은 당신의 앞에서 작게 하품을 하다가 당신과 시선을 마주치자 사레가 들렸다. 당신은 켁켁거리는 그에게 물을 가져다주었다."
                    ])
                }
            ], player, { onEnd });
        } else if (affection > 30){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "카인은 당신을 보더니 당신에게서 몇 걸음 떨어졌다. <br>\"거기서 말해.\"<br>어쩐지 그의 행동이 조금 뚝딱거리는 것처럼 느껴진다.",
                        "\"너 아직도 데릭이랑 만나?\"<br>카인은 인상을 찌푸렸다. <br>\"그새끼 너무 믿지는 마. 사람 금방 갈아치우는 놈이니까.\"",
                        "카인은 공연에 대한 얘기는 거의 하지 않았다. 당신이 공연에 대해 물어봐도 그는 누구나 할 수 있는 답변만 해주었다. 공연에 대해 말하고 싶지 않아하는 모양이다.",
                        "그는 당신에게 유리에 대해 물어보았다. 유리에 대해 어떤 이야기를 하든 그의 주황색 눈동자는 점점 어두워진다. 그는 신경질적으로 발로 바닥을 툭툭 찼다."
                    ])
                }
            ], player, { onEnd });
        } else{
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "카인은 당신을 보자 까닥 고갯짓을 해보였다. 그는 당신에게 친근하게 말을 걸지도, 그렇다고 자신의 옆에 있는 당신을 쫓아내지도 않았다.",
                        "카인은 당신에게 유리에 대해 물어보았다. 그는 당신의 말을 들으며 허공으로 시선을 던졌다. 그의 주황색 눈동자가 무겁게 가라앉았다.",
                        "카인은 당신에게 유리에 대해 물어보았다. <br>\"잠깐만.\"<br>그는 주변을 둘러보며 당신의 입을 막았다. 그의 손바닥에서 오렌지 향수 냄새가 난다.<br>\"목소리가 너무 커.\""
                    ])
                }
            ], player, { onEnd });
        }
    },

    otherTalk : (player) => {
        const choices = [];

        choices.push({
            text: "음식을 건넨다",
            action: "kain_giveFood"
        });

        if (!player.flags?.KainYuriRecognize){
            choices.push({
                text : "유리에 대해 묻는다",
                scene : NPC_DATA.kain.scenes.kain_aboutYuri_01
            });
        }


        choices.push({ text: "돌아간다", action: "kain_talk" });

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

registerGiftActions("kain");

function isKainAvailable(player){
    const day = getWeekdayIndex(player);
    const time = getTimePeriod(player);

    // 월/수/금 낮에는 없음
    if ([0, 2, 4].includes(day) && (time === "morning" || time === "afternoon")){
        return false;
    }

    // 화/목 밤에는 없음
    if ([1, 3].includes(day) && (time === "night" || time === "dawn")){
        return false;
    }

    // 토/일에는 새벽에만 있음
    if ([5, 6].includes(day) && time !== "dawn"){
        return false;
    }

    return true;
}

window.kain_nobleSquare_dance_01_refused = function(player){
    const dominance = NPC_DATA["kain"]?.emotion?.dominance || 0;

    if (dominance >= 50){
        startScene(
            NPC_DATA["kain"].scenes.kain_nobleSquare_dance_01_refused_highDominance,
            player,
            {
                onEnd : () => startScene(getLocationScene(player), player)
            }
        );
        return;
    }

    startScene(
        NPC_DATA["kain"].scenes.kain_nobleSquare_dance_01_refused_lowDominance,
        player,
        {
            onEnd : () => startScene(getLocationScene(player), player)
        }
    );
};

window.kainYuriDeathBreakUp = function(player) {
    breakUp("kain");
    player.flags.KainWillNotSingHisSong = true;
    changeNPCEmotion("kain", "affection", -50);
    changeNPCEmotion("kain", "rage", 100);
};

//스페셜 데이
window.SPECIAL_GIFT_HANDLERS.kain = function(player, item, grade){
    if (item.specialGift === "chocoChoco"){
        startKainChocoChocoGift(player, item, grade);
        return;
    }
};

function startKainChocoChocoGift(player, item, grade){

    if (grade === "great"){
        startScene([
            {
                type : "text",
                value : [
                    "카인은 공연장에 들어선 당신을 보자마자 표정이 밝아졌다. 그는 바로 당신에게 가려고 했지만 대기실을 나오자마자 팬들에게 둘러싸여 나오지를 못했다." +
                    "<br><br>\"아, 좀!\"<br><br>" +
                    "결국 카인은 성질을 내다가 다시 대기실로 복귀했다. 당신은 팬들의 시선을 피해 여러 가수들이 머무르고 있는 대기실에 도착했다. 카인의 주변에는 이미 초콜릿들이 쌓여 있었다. 그는 당신의 눈치를 살피더니 자신은 안 받으려고 했는데 지배인 때문에 받은 거라고 말하며, 자신이 원하는 초콜릿은 하나밖에 없다고 말했다. 말을 마친 후, 자신이 무슨 말을 했는지 깨닫고 그는 욕을 하며 얼굴을 붉혔다." +
                    "<br><br>\"...너, 상류도시에 전해 내려오는 초코초코데이 풍습 알아?\"<br><br>" +
                    "당신에게 초콜릿을 받은 카인은 당신의 수제 초콜릿을 선뜻 먹지 못한 채 한동안 만지작거렸다. 그는 아껴 먹고 싶다고 하다가 결국 당신의 수제 초콜릿을 한 입 베어 물었다." +
                    "<br><br>\"...야.\"<br><br>" +
                    "그는 당신에게도 자신의 수제 초콜릿을 내밀었다. 어쩐지 모양은 미숙했지만 초콜릿 향만큼은 그가 초코초코 재료를 듬뿍 담았다는 걸 알 수 있을 정도로 진했다." +
                    "<br><br>\"난 딱 하나만 만들었어. 정말로.\""
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "kain");
                    player.location = "theater";
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
                    "카인은 공연장에 들어선 당신을 보자마자 표정이 밝아졌다. 그는 바로 당신에게 가려고 했지만 대기실을 나오자마자 팬들에게 둘러싸여 나오지를 못했다." +
                    "<br><br>\"아, 좀!\"<br><br>" +
                    "결국 카인은 성질을 내다가 다시 대기실로 복귀했다. 당신은 팬들의 시선을 피해 여러 가수들이 머무르고 있는 대기실에 도착했다. 카인의 주변에는 이미 초콜릿들이 쌓여 있었다. 그는 당신의 눈치를 살피더니 자신은 안 받으려고 했는데 지배인 때문에 받은 거라고 말하며, 자신이 원하는 초콜릿은 하나밖에 없다고 말했다. 말을 마친 후, 자신이 무슨 말을 했는지 깨닫고 그는 욕을 하며 얼굴을 붉혔다." +
                    "<br><br>\"...너, 상류도시에 전해 내려오는 초코초코데이 풍습 알아?\"<br><br>" +
                    "당신에게 초콜릿을 받은 카인은 당신의 수제 초콜릿을 선뜻 먹지 못한 채 한동안 만지작거렸다. 그는 아껴 먹고 싶다고 하다가 결국 당신의 수제 초콜릿을 한 입 베어 물었다." +
                    "<br><br>\"...나도 만들었어.\"<br><br>" +
                    "그는 당신의 초콜릿을 조심스럽게 다시 포장한 뒤, 자신이 만든 초콜릿을 당신에게 내밀었다. 모양은 엉망이었지만 맛은 당신의 초콜릿보다 달콤했다. 당신이 카인을 빤히 바라보자 그는 남은 초콜릿은 아껴 먹을 거라며 퉁명스럽게 덧붙였다. 그러나 또다시 붉어진 얼굴까지 감추지는 못했다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "kain");
                    player.location = "theater";
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
                    "카인은 공연장에 들어선 당신을 보자마자 표정이 밝아졌다. 그는 바로 당신에게 가려고 했지만 대기실을 나오자마자 팬들에게 둘러싸여 나오지를 못했다." +
                    "<br><br>\"아, 좀!\"<br><br>" +
                    "결국 카인은 성질을 내다가 다시 대기실로 복귀했다. 당신은 팬들의 시선을 피해 여러 가수들이 머무르고 있는 대기실에 도착했다. 카인의 주변에는 이미 초콜릿들이 쌓여 있었다. 그는 당신의 눈치를 살피더니 자신은 안 받으려고 했는데 지배인 때문에 받은 거라고 말하며, 자신이 원하는 초콜릿은 하나밖에 없다고 말했다. 말을 마친 후, 자신이 무슨 말을 했는지 깨닫고 그는 욕을 하며 얼굴을 붉혔다." +
                    "<br><br>\"...너, 상류도시에 전해 내려오는 초코초코데이 풍습 알아?\"<br><br>" +
                    "당신에게 초콜릿을 받은 카인은 당신의 수제 초콜릿을 선뜻 먹지 못한 채 한동안 만지작거렸다. 그는 아껴 먹고 싶다고 하다가 결국 당신의 수제 초콜릿을 한 입 베어 물었다." +
                    "<br><br>\"....! ....\"<br><br>" +
                    "그는 아무 말도 하지 않았지만 그의 미간은 많은 것들을 말해주고 있었다. 그는 당신을 힐끔 보더니 초콜릿의 맛은 중요하지 않다고 말했다." +
                    "<br><br>\"...적어도 오늘은.\"" +
                    "그는 미리 준비해둔 듯한 수제 초콜릿을 툭 내밀었다. 모양은 엉망이었지만, 방금 먹은 것보다는 훨씬 달콤했다." +
                    "<br><br>\"왜. 그래도 주려고 만든 건데.\""
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "kain");
                    player.location = "theater";
                    savePlayer(player);
                }
            }
        ], player);

        return;
    }
}

//연말 이벤트
window.YEAR_END_HANDLERS.kain = function(player){

    startScene([
        {
            type : "text",
            value : [
                "당신의 방에 들어선 카인은 평소보다 행동이 부자연스러웠다. 그는 괜시리 투덜거리며 당신의 옆에 붙어 앉았다." +
                "<br><br>\"야... 나 사실 준비한 거 있거든?\"<br><br>" +
                "당신과 시선이 마주치자 그는 쑥스러워졌는지 헛기침을 하더니 당신을 위해 1년 동안 천천히 만들었던 노래가 있다고 말했다. 당신과 만날 때마다, 그리고 당신을 떠올릴 때마다 생각나던 문장들을 하나로 엮어서 만들었다고 한다. 말을 하면 할수록 그의 얼굴은 더 붉어졌지만, 당신을 바라보는 주황색 눈동자만큼은 진지했다." +
                "<br><br>\"...불러줄게. 어차피 너한테밖에 안 불러줄 거야. 너만을 위해 만든 노래니까.\"<br><br>" +
                "그는 당신의 손을 잡더니 천천히 노래를 부르기 시작했다. 그가 무대에서 부르는 노래와는 완전히 다른 느낌의 노래였다. 신비로우면서도 처연한 음색이 당신의 마음을 사로잡는다." +
                "<br><br>...1년 동안 당신과 카인이 나누었던 감정들이, 노래 하나에 전부 서려 있었다." +
                "<br><br>긴 노래를 마친 카인이 촉촉해진 눈동자로 당신을 응시했다." +
                "<br><br>\"좋아해. 올해도, 그리고....\"<br><br>" +
                "그의 입술이 당신의 입술에 다가온다." +
                "<br><br>\"...내년도.\""
            ]
        }
    ], player, {
        onEnd : () => completeYearEndEvent(player, "kain")
    });
};
window.YEAR_END_LETTER_HANDLERS.kain = function(player, next){

    startScene([
        {
            type : "text",
            value : [
                "카인에게서 온 편지다.<br><br><br>" +
                "<span class='log-kain'>[너 어제 누구랑 있었]</span><br><br>" +
                "줄로 죽죽 지워져 있다.<br><br>" +
                "<span class='log-kain'>[어제 존나 바빴나 보다?]</span><br><br>" +
                "<span class='log-kain'>[얼마나 바쁘면 연말인데도 나보다 바쁘냐.]</span><br><br>" +
                "<span class='log-kain'>[씨발. 그래도 미리 말을 해주면 좋았잖아. 다음부터는 바빠서 못 만날 것 같으면 미리 말해. 사람 기다리게 하지 말고.]</span><br><br>"
            ]
        }
    ], player, {
        onEnd : next
    });
};

//버섯이벤트
window.MUSHROOM_ROMANCE_HANDLERS.kain = function(player, next){
    const mushroomType =
        getMushroomRomanceType();

    if (mushroomType === "tasty"){
        startScene([
            {
                type : "text",
                value : [
                    "\"뭐야, 씨발?\"<br><br>" +
                    "노래를 부르다가 나온 건지 화려한 옷을 입고 있는 카인의 이마에는 땀이 송골송골 맺혀 있었다. 그는 당신을 보더니 여긴 어디냐고 물었다. 그는 주변을 둘러보더니 팬들이나 지배인이나 자기가 일부러 펑크를 냈다고 생각하겠다며 짜증을 냈다." +
                    "<br><br>\"나눠먹으라고? 뭘 믿고 먹어?\"<br><br>" +
                    "그는 먹을 생각이 없어 보였다... 결국 당신이 먼저 버섯에 손을 뻗자 카인은 뭔줄 알고 먹으려고 하냐며 화를 냈다. 그리고 그는 어쩔 수 없이 버섯을 입에 댔다." +
                    "<br><br>\"...? 맛있는데?\"<br><br>" +
                    "카인은 당신에게 버섯의 반을 나눠주었다. 당신과 카인은 서로 붙어서 버섯을 먹었다. 카인의 손등과 당신의 손등이 맞닿자 버섯들의 음흉한 목소리가 들린다. 카인은 그 소리를 듣더니 짜증을 내며 슬쩍 손을 뺐다. 그는 당신까지 가십에 휘말리는 건 싫다고 말했다." +
                    "<br><br>버섯을 다 먹자 빛이 다시 번쩍였다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeStamina(player, 30);
                    passTime(player, 15);
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
                    "카인은 무대 의상을 입고 있었다. 그는 버섯보다는 물을 마시고 싶다고 말하며 짜증을 냈다. 당신이 먼저 버섯을 먹으려고 하자 카인이 막아섰다." +
                    "<br><br>\"미쳤어? 이게 뭔 버섯인 줄 알고 먹으려고 하는 거야?\"<br><br>" +
                    "그리고 그는 어쩔 수 없이 버섯을 먼저 먹었다. 그의 안색이 하얘졌다. 그는 이건 독이라고 말했다." +
                    "<br><br>\"씨발... 그래도 그때처럼 목을 해치는 독은 아니네.\"<br><br>" +
                    "그는 당신을 힐끗 보더니 당신에게는 손톱 정도만 내밀었다. 당신이 쳐다보자 카인은 네가 아픈 걸 보느니 차라리 자신이 앓아눕는 게 낫다고 말하며 당신이 빼앗기 전에 자기가 한번에 삼켜버렸다. 카인은 애써 괜찮은 척하며 당신을 응시했다." +
                    "<br><br>\"...그런 표정 짓지 마. 그런 표정 보고 싶은 건 아니었어. 나 괜찮아.\"<br><br>" +
                    "그에게서 식은땀이 나고 있다... 그는 당신의 손바닥에 뺨을 기대며 이걸로 충분하다고 중얼거리듯 말했다. 버섯버섯 소리와 함께 눈앞이 번쩍인다...!"
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeHP(player, -5);
                    changeNPCEmotion("kain", "affection", 3);
                    changeNPCEmotion("kain", "dominance", 5);
                    passTime(player, 10);
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
                "\"...하?\"<br><br>" +
                "짜증을 내기도 전에, 카인은 남성기 모양의 버섯을 보더니 질색했다. 그는 누군지는 몰라도 이런 장난을 친 사람은 가만두지 않을 거라고 말했다. 당신이 사람이 아니라 버섯맨이 그런 거라고 정정해주자 카인은 미심쩍은 얼굴로 당신을 바라보았다." +
                "<br><br>\"...너, 내가 오기 전에 뭐 다른 거라도 먹었어?\"<br><br>" +
                "그는 당신의 상태를 살피다가, 결국 한숨을 쉬며 먼저 버섯을 먹었다. 몇 번 버섯을 씹던 카인은 아랫배를 무의식적으로 감싸쥐더니 당신을 보았다." +
                "<br><br>\"....\"<br><br>" +
                "그는 당신이 버섯을 먹는 모습을 지켜보았다. 그의 얼굴은 점점 더 붉어졌다." +
                "<br><br>\"...야.\"<br><br>" +
                "그는 당신에게 한 걸음 다가왔다. 그러더니 눈을 질끈 감았다." +
                "<br><br>\"딱 키스까지만....\"<br><br>" +
                "그의 입술이 다가온다.... 그리고 그 순간, 뒤에서 버섯맨들의 당황한 소리가 들렸다. 버섯버섯...! 잘못 눌렀어버섯...! 카인의 입술이 당신의 입술에 닿기 전에 눈앞이 하얀 빛으로 번쩍였다." +
                "<br><br>\"뭐, 뭐야!\"<br><br>" +
                "카인의 애처로운 목소리와 함께...."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                changeArousal(player, 30);
                changeNPCEmotion("kain", "lust", 30);
                passTime(player, 20);
            }
        }
    ], player, {
        onEnd : next
    });
};
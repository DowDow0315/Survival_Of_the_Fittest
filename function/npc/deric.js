function processDericText(text, player){
    return text.replaceAll("{dericTitle}", getDericTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getDericTitle(player){
    if (NPC_DATA["deric"].emotion.affection > 80){
        return player.gender === "female" ? "딸" : "아들";
    }
    else if(NPC_DATA["deric"].emotion.affection > 50) return "파트너";
    return "아가";
}

function deric_date_01_accepted(player){
    changeEmotion("deric", "affection", 3);
    changeEmotion("deric", "dominance", 5);
    savePlayer(player);

    startScene(NPC_DATA["deric"].scenes.deric_date_01_accepted, player, {
        onEnd : () => {
            player.location = "gloryStreet";
            player.flags.dericDate01Accepted = true;
            player.flags.dericDate01AcceptedDay = getCurrentDay(player);
            passTime(player, 10);
            changeGold(player, 800);
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
    });
    return true;
}

function deric_date_01_refused(player){
    player.flags = player.flags || {};
    player.flags.dericDate01Refused = true;

    changeEmotion("deric", "affection", -5);
    changeEmotion("deric", "rage", 3);

    savePlayer(player);
}

function deric_date_02_accepted(player){
    changeEmotion("deric", "affection", 5);
    changeEmotion("deric", "dominance", 3);
    savePlayer(player);

    startScene(NPC_DATA["deric"].scenes.deric_date_02_accepted, player, {
        onEnd : () => {
            player.location = "gloryStreet";
            player.flags.dericDate02Accepted = true;
            player.flags.dericDate02AcceptedDay = getCurrentDay(player);
            passTime(player, 20);
            changeGold(player, 1200);
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
    });
    return true;
}

function deric_date_02_refused(player){
    player.flags = player.flags || {};
    player.flags.dericDate02Refused = true;

    changeEmotion("deric", "affection", -5);
    changeEmotion("deric", "rage", 3);

    savePlayer(player);
}

function deric_repeat_date(player){
    player.flags = player.flags || {};
    player.flags.dericRepeatDateCheckedDay = getCurrentDay(player);

    savePlayer(player);

    startScene(NPC_DATA["deric"].scenes.deric_repeat_date, player, {
        onEnd : () => {
            savePlayer(player);
            startScene(getLocationScene(player), player);
        }
    });
}

function deric_repeat_date_place(player){
    const scenes = [
        "deric_repeat_restaurant",
        "deric_repeat_theater",
        "deric_repeat_party"
    ];

    const sceneId = scenes[Math.floor(Math.random() * scenes.length)];

    startScene(NPC_DATA["deric"].scenes[sceneId], player);
    return true;
}

function deric_repeat_restaurant_branch(player){
    return deric_repeat_branch_by_place(player, "restaurant");
}

function deric_repeat_theater_branch(player){
    return deric_repeat_branch_by_place(player, "theater");
}

function deric_repeat_party_branch(player){
    return deric_repeat_branch_by_place(player, "party");
}

function deric_repeat_branch_by_place(player, place){
    const affection = NPC_DATA["deric"].emotion.affection;

    if (affection >= 50){
        startScene(NPC_DATA["deric"].scenes[`deric_repeat_${place}_to_house`], player, {
            onEnd : () => {
                savePlayer(player);
                startScene(getLocationScene(player), player);
            }
        });
    } else {
        startScene(NPC_DATA["deric"].scenes[`deric_repeat_${place}_goodbye`], player, {
            onEnd : () => {
                player.location = "gloryStreet";
                savePlayer(player);
                startScene(getLocationScene(player), player);
            }
        });
    }
    return true;
}

function deric_repeat_date_house(player){
    const scenes = [
        "deric_repeat_house_01",
        "deric_repeat_house_02",
        "deric_repeat_house_03"
    ];

    const sceneId = scenes[Math.floor(Math.random() * scenes.length)];

    startScene(NPC_DATA["deric"].scenes[sceneId], player, {
        onEnd : () => {
            player.location = "gloryStreet";
            passToNextMorning9(player);
            startScene(getLocationScene(player), player);
        }
    });
    return true;
}

function deric_repeat_date_accepted(player){
    player.flags = player.flags || {};
    player.flags.dericRepeatDateCount = (player.flags.dericRepeatDateCount || 0) + 1;

    changeEmotion("deric", "affection", 3);
    changeEmotion("deric", "dominance", 2);

    savePlayer(player);

    return deric_repeat_date_place(player);
}

function deric_repeat_date_refused(player){

    changeEmotion("deric", "affection", -5);
    changeEmotion("deric", "rage", 3);

    savePlayer(player);
}

registerActions("deric", {
    //개인이벤트

    //스토리이벤트

    //talk
    giveFood : (player) => {
        openGiveFoodMenu(player, "deric");
    },

    talk: (player) => {
        if (!isDericAvailable(player)){
            showSingleTextScene(
                "데릭은 지금 집에 없다.",
                player
            );
            return;
        }

        startScene([
            {
                type: "text",
                value: "데릭은 와인을 기울이다가 당신을 보더니 미소를 지었다. <br><br>\"할 말이라도 있니, {dericTitle}?\""
            },
            {
                type: "choice",
                choices: [
                    { text: "사소한 잡담을 한다", action: "deric_smallTalk" },
                    { text: "다른 얘기를 한다", action: "deric_otherTalk" },
                    { text: "돌아간다", action: "back_location" }
                ]
            }
        ], player);
    },
    smallTalk : (player) => {
        passTime(player, 5);
        const affection = NPC_DATA["deric"].emotion.affection || 0;
        const rage = NPC_DATA["deric"].emotion.rage || 0;
        const dominance = NPC_DATA["deric"].emotion.dominance || 0;
        const onEnd = () => {
            startScene(getLocationScene(player), player);
        };

        if (player.flags?.ericDie){
            startDericSmallTalkAfterEricDeath(
                player,
                affection,
                rage,
                dominance,
                onEnd
            );
            return;
        }

        if (rage >= 60){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "데릭은 말없이 당신을 바라보았다. 입가는 호선을 그리고 있었지만 눈빛은 차가웠다. <br><br>\"내가 네게 말을 걸어도 된다고 했었니?\"",
                        "데릭은 신경질적으로 유리잔을 내려놓았다. <br><br>\"지금은 말할 기분이 아니구나.\"<br><br>그의 눈빛은 얼음장처럼 차가웠다."
                    ])
                }
            ], player, { onEnd });
            return;
        }

        if (dominance > 50 && affection > 90){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "데릭은 당신에게 또 하류도시에 갈 생각이냐고 물었다. <br><br>\"나는 네가... 하류도시에 가지 않았으면 좋겠구나. 아무리 네가 태어나고 자란 곳이라도 정은 주지 말렴. 그곳은 언젠가는 사라질 도시니까.\"",
                        "데릭은 와인잔을 흔들며 당신을 바라보았다. 그는 잔에 당신의 얼굴을 담으며 미소를 지었다. <br><br>\"언제까지나 반짝반짝.... 너는 그 빛을 잃지 말아주렴.\"",
                        "데릭은 당신에게 극장에는 많이 가냐고 물었다. 그는 교양을 많이 쌓아야 상류도시 귀족들에게 무시를 당하지 않을 거라고 말했다. <br><br>\"아니면 내 옆에 있어도 되고.\""
                    ])
                }
            ], player, { onEnd });
        } else if (affection > 90){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "데릭은 당신을 바라보며 생각에 잠겨있다. 그러더니 혼자 미소를 지으며 고개를 끄덕였다. 무슨 생각을 했는지는 알 수 없었지만 자신이 내린 결론에 만족한 것 같다.",
                        "데릭은 당신에게 다음 번에 같이 공연을 보러 가자고 말했다. 그는 좋은 자리를 예약해놓겠다고 말했다.",
                        "데릭은 당신이 오자 술을 마시던 걸 멈췄다. 그래도 당신이 있으면 술을 덜 마시는 모양이다.",
                        "데릭은 에릭이 어릴 때부터 고집이 셌다며 흉을 보기 시작했다. 이야기는 어느새 어린 시절의 추억으로 변했지만, 그는 끝까지 불평이라고 우겼다.",
                        "데릭은 당신에게 에릭의 불평을 했다. 그는 동생인 주제에 형인 자신의 말을 더럽게 안 듣는다며, 예의가 없는 녀석이라고 투덜거렸다."
                    ])
                }
            ], player, { onEnd });
        } else if (dominance > 50 && affection > 70){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "데릭은 당신에게 노래를 불러보라고 말했다. 당신이 어떻게 노래를 부르든 그에게는 당신이 사랑스러워 보이는 모양이다. 데릭은 웃음을 터뜨렸다.",
                        "\"카인에게는 물들지 마렴. 그 아이는...\"<br><br>데릭은 차가운 미소를 지었다. <br><br>\"구제 불능이니까.\"",
                        "데릭은 당신에게 옷을 이것저것 입혀보고 있다. 그는 마지막 옷을 입히더니 마음에 들었다는 듯이 박수를 쳤다."
                    ])
                }
            ], player, { onEnd });
        } else if (affection > 70){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "데릭은 당신에게 에릭의 불평을 했다. 그는 에릭은 너무 고지식해서 말이 안 통한다고 투덜거렸다.",
                        "데릭은 당신에게 에릭의 불평을 했다. 그는 동생인 주제에 형인 자신의 말을 더럽게 안 듣는다며, 예의가 없는 녀석이라고 투덜거렸다.",
                        "데릭은 당신에게 상류도시의 볼거리는 다 즐겼냐고 물었다. 그는 자신은 아레나를 별로 안 좋아한다고 말했다. <br><br>\"너무.... 원시적이잖니.\"",
                        "\"자, 아빠라고 불러볼래?\"<br><br>데릭은 당신의 반응을 보며 웃고 있다. <br><br>\"파파도 괜찮단다.\""
                    ])
                }
            ], player, { onEnd });
        } else if (dominance > 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "데릭은 당신에게 다가오는 토요일에 자신을 만나러 오라고 말했다. <br><br>\"너도 내가 옆에 있는 게 편하잖니?\"",
                        "그는 당신의 흐트러진 옷가지를 정돈해주며 이런 모습은 자신의 앞에서만 보이라고 말했다. <br><br>\"정확히 말하면, 내 침대 위에서만.\"<br><br>그는 당신의 뺨을 장난스럽게 톡 두드렸다.",
                        "그는 당신의 얼굴에 이것저것 화장을 해주기 시작했다. 당신의 얼굴은 데릭의 취향으로 꾸며졌다...."
                    ])
                }
            ], player, { onEnd });
        } else if (affection > 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "데릭은 당신에게 노래를 할 줄 아냐고 물었다. 그는 당신이 노래만 잘했다면 지금쯤 카인을 제치고 인기가수 1위가 됐을 거라고 말했다.",
                        "데릭은 당신의 입술을 보더니 부르텄다는 핑계로 당신을 자신의 무릎 위에 앉힌 후 당신의 입술 위로 자기가 쓰던 립스틱을 발라주었다. <br><br>\"역시 예쁘구나, 아가.\"",
                        "그는 자신에게 아빠라고 불러보라고 말했다. 그는 당신의 반응을 즐기고 있다.",
                        "데릭은 에릭은 이 저택에 잘 들어오지 않는다고 말했다. <br><br>\"취향이라고는 정말 고상하지 않은 녀석이라니까.\"<br><br>투덜거리면서도 그는 어린 에릭과 데릭이 찍혀있는 사진에 시선을 던지고 있다."
                    ])
                }
            ], player, { onEnd });
        } else{
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "데릭은 미소를 지으며 당신에게 다른 물건들은 건드리지 말라고 했다. <br><br>\"거친 손으로는 망가질 수 있는 것들이 너무 많거든.\"",
                        "데릭은 이 저택에 쉬러 왔냐고 물으며 미소를 지었다. <br><br>\"천국의 쉼터보다 훨씬 부드럽지, 이불 원단이?\"",
                        "데릭은 에릭은 이 저택에 잘 들어오지 않는다고 말했다. <br><br>\"취향이라고는 정말 고상하지 않은 녀석이라니까.\"<br><br>투덜거리면서도 그는 어린 에릭과 데릭이 찍혀있는 사진에 시선을 던지고 있다."
                    ])
                }
            ], player, { onEnd });
        }
    },
    otherTalk : (player) => {
        const choices = [];

        if (player.flags?.eric_break_wineGlass && !player.flags?.deric_dareToBreakWineGlass && !player.flags?.ericDie ){
            choices.push({
                text: "당신은 데릭의 잔을 깨뜨렸다.",
                scene: NPC_DATA.deric.scenes.deric_dareToBreakWineGlass
            });
        }

        if (player.flags?.dericEricBloodyBandage && !player.flags?.deric_ericfirehistowel && !player.flags?.ericDie){
            choices.push({
                text: "당신은 에릭에게 수건을 가져다주었다고 말했다.",
                scene: NPC_DATA.deric.scenes.deric_ericfirehistowel
            });
        }

        if (player.flags?.eric_deric_hisGoing && !player.flags?.deric_notAnswer && !player.flags?.ericDie){
            choices.push({
                text: "당신은 상류도시 관문에서 있었던 일에 대해 물었다.",
                scene: NPC_DATA.deric.scenes.deric_notAnswer
            });
        }

        if (player.flags?.nikolai_hisSister_ask && !player.flags?.deric_about_nikolai_sister){
            choices.push({
                text: "당신은 니콜라이의 누나에 대해 물었다.",
                scene: NPC_DATA.deric.scenes.deric_about_nikolai_sister
            });
        }

        choices.push({
            text: "음식을 건넨다",
            action: "deric_giveFood"
        });

        choices.push({ text: "돌아간다", action: "deric_talk" });

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

registerGiftActions("deric");

function isDericAvailable(player){
    const day = getWeekdayIndex(player);
    const time = getTimePeriod(player);

    // 월/화/수/목/금 새벽에만 있음
    if ([0, 1, 2, 3, 4].includes(day) && time !== "dawn"){
        return false;
    }

    // 토/일 낮, 저녁에는 없음
    if ([5, 6].includes(day) && (time === "afternoon" || time === "night")){
        return false;
    }
    return true;
}

function startDericSmallTalkAfterEricDeath(
    player,
    affection,
    rage,
    dominance,
    onEnd
){
    let lines = [];

    if (rage >= 60){
        lines = [
            "데릭은 말없이 당신을 바라보았다. 입가는 여전히 미소를 그리고 있었지만, 말을 걸어도 대답은 돌아오지 않았다.",
            "데릭은 신경질적으로 유리잔을 내려놓았다. 잔 안의 와인이 크게 흔들렸다.<br><br>\"...지금은 혼자 있고 싶구나.\""
        ];
    }

    else if (affection > 90){
        lines = [
            "데릭은 평소처럼 와인을 마시고 있었다. 하지만 잔은 좀처럼 비워지지 않았다. 한참 동안 말이 없던 그는 문득 입을 열었다.<br><br>\"그 녀석은 어릴 때부터 고집이 셌단다.\"<br><br>데릭은 작게 웃었다.<br><br>\"정말이지... 형 말이라고는 지지리도 안 들었지.\"<br><br>그 뒤로는 아무 말도 이어지지 않았다.",
            "데릭은 어린 에릭과 자신이 함께 찍힌 사진을 바라보고 있었다. 당신이 다가오자 그는 아무렇지도 않은 얼굴로 사진을 내려놓았다.<br><br>\"무슨 일이니, 아가?\"",
            "데릭은 당신이 오자 술병을 내려놓았다. 평소보다 훨씬 많이 비어 있다.<br><br>\"술 따라주려고?\"<br><br>그는 장난스레 웃었지만 웃음이 웃음으로 보이지가 않았다.",
            "데릭은 한참 동안 당신을 바라보다가 당신의 머리를 쓰다듬었다.<br><br>\"너는 오래 살아주렴.\"<br><br>그는 그 말이 갑자기 튀어나온 것이 이상하다는 듯 잠시 침묵했다.<br><br>\"...그냥, 오래 살라는 뜻이란다.\""
        ];
    }

    else if (affection > 70){
        lines = [
            "데릭은 소파에 앉아 와인잔을 기울이고 있었다. 맞은편에는 아무도 앉지 않은 의자가 하나 놓여 있다. 그는 그쪽을 한 번 바라보더니 다시 잔을 기울였다.",
            "\"그 녀석은 원래 집에 잘 들어오지도 않았단다.\"<br><br>데릭은 아무렇지도 않게 말했다.<br><br>\"그러니 달라진 건 별로 없지.\"<br><br>그는 웃었다. 당신은 아무 말도 하지 않았다.",
            "데릭은 당신에게 요즘 상류도시는 어떠냐고 물었다. 평소와 다를 것 없는 말투였다. 이상할 정도로 평소와 똑같았다."
        ];
    }

    else if (affection > 50){
        lines = [
            "데릭은 당신에게 말을 걸어놓고도 정작 당신의 대답은 듣지 않았다. 그의 시선은 테이블 위에 놓인 오래된 사진에 머물러 있었다.",
            "데릭은 평소처럼 웃으며 당신을 맞았다. 방 안도, 그의 옷차림도, 말투도 달라진 것이 없었다.<br><br>다만 저택이 전보다 조금 더 차분해진 것 같았다.",
            "\"에릭은 이 저택에 잘 들어오지 않아.\"<br><br>데릭은 습관처럼 말하다가 입을 다물었다.<br><br>\"...그랬었지.\""
        ];
    }

    else {
        lines = [
            "데릭은 와인잔을 든 채 창밖을 바라보고 있었다. 당신이 들어온 것을 알고도 한동안 고개를 돌리지 않았다.",
            "저택은 평소보다 조용했다. 데릭은 여전히 평소와 같은 미소를 짓고 있었다.<br><br>\"쉬러 왔니? 편하게 있다 가렴.\"",
            "데릭은 당신과 별 의미 없는 이야기를 나누었다. 그는 평소와 다를 것 없이 행동했다. 적어도 그렇게 보이려고 하는 것 같았다."
        ];
    }
    startScene([
        {
            type : "text",
            value : pickRandom(lines)
        }
    ], player, { onEnd });
}


//스페셜 데이
window.SPECIAL_GIFT_HANDLERS.deric = function(player, item, grade){
    if (item.specialGift === "chocoChoco"){
        startDericChocoChocoGift(player, item, grade);
        return;
    }
};

function startDericChocoChocoGift(player, item, grade){

    if (grade === "great"){
        startScene([
            {
                type : "text",
                value : [
                    "당신은 데릭의 저택에서 그가 돌아오기를 기다려야 했다. 그의 방은 이미 초콜릿 상자들로 가득했고, 심지어 거실까지도 그가 받은 초콜릿들이 공간을 지배하고 있었다.... 특히 유리 식탁 위에 있는 반지 모양 초콜릿은 장식품이라 볼 수 있을 정도로 정교하고 세밀했다." +
                    "<br><br>\"아가.\"<br><br>" +
                    "데릭은 한 손에 초콜릿 상자들을 가득 들고 쌍둥이 저택에 들어왔다. 그는 입꼬리를 올리며 자신에게 초콜릿을 줄 생각이냐고 물었다." +
                    "<br><br>\"우리는 초코초코데이 때 초콜릿을 주면 청혼으로 받아들이기도 하는데.\"<br><br>" +
                    "그는 당신의 초콜릿을 받으며 당신이 그 의도로 초콜릿을 줬든, 그 의도가 없이 초콜릿을 줬든 어쨌든 받은 건 자신이니 알아서 생각하겠다고 말했다. 데릭은 자신이 당신을 위해 준비한 초콜릿은 식탁에 있다고 말했다." +
                    "<br><br>\"널 위해 특별히 주문 제작했단다.\"<br><br>" +
                    "그는 다음 초코초코데이 때는 더 아름다운 걸 주겠다고 말하며 웃었다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "deric");
                    player.location = "twinsMansion";
                    passTime(player, 10);
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
                    "당신은 데릭의 저택에서 그가 돌아오기를 기다려야 했다. 그의 방은 이미 초콜릿 상자들로 가득했고, 심지어 거실까지도 그가 받은 초콜릿들이 공간을 지배하고 있었다.... 특히 유리 식탁 위에 있는 동물 모양 초콜릿은 장식품이라 볼 수 있을 정도로 정교하고 세밀했다." +
                    "<br><br>\"아가.\"<br><br>" +
                    "데릭은 한 손에 초콜릿 상자들을 가득 들고 쌍둥이 저택에 들어왔다. 그는 입꼬리를 올리며 자신에게 초콜릿을 줄 생각이냐고 물었다." +
                    "<br><br>\"우리는 초코초코데이 때 초콜릿을 주면 청혼으로 받아들이기도 하는데.\"<br><br>" +
                    "그는 당신의 초콜릿을 받으며 당신이 그 의도로 초콜릿을 줬든, 그 의도가 없이 초콜릿을 줬든 어쨌든 받은 건 자신이니 알아서 생각하겠다고 말했다. 데릭은 자신이 당신을 위해 준비한 초콜릿은 식탁에 있다고 말했다." +
                    "<br><br>\"널 위해 특별히 주문 제작했단다.\"<br><br>" +
                    "그는 다음 초코초코데이 때는 더 큰 걸 주겠다고 말하며 웃었다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "deric");
                    player.location = "twinsMansion";
                    passTime(player, 10);
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
                    "당신은 데릭의 저택에서 그가 돌아오기를 기다려야 했다. 그의 방은 이미 초콜릿 상자들로 가득했고, 심지어 거실까지도 그가 받은 초콜릿들이 공간을 지배하고 있었다.... 특히 유리 식탁 위에 있는 초콜릿은 포장지부터 남달랐다. 금으로 만든 포장지인 걸까, 딱딱해 보이기까지 한다." +
                    "<br><br>\"아가.\"<br><br>" +
                    "데릭은 한 손에 초콜릿 상자들을 가득 들고 쌍둥이 저택에 들어왔다. 그는 입꼬리를 올리며 자신에게 초콜릿을 줄 생각이냐고 물었다." +
                    "<br><br>\"우리는 초코초코데이 때 초콜릿을 주면 청혼으로 받아들이기도 하는데.\"<br><br>" +
                    "데릭은 초콜릿의 완성도에 따라 청혼이 거절당하기도 한다고 말하며 웃었다. 그러더니 그는 자신이 당신을 위해 준비한 초콜릿은 유리 식탁 위에 있다고 말해주었다." +
                    "<br><br>\"그 포장지는 네가 가져도 된단다. 너를 위한 것이니까.\"<br><br>" +
                    "그는 선심 쓰듯 말하며 고개를 까닥였다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "deric");
                    changeGold(player, 50000);
                    changeNPCEmotion("deric", "dominance", 5);
                    passTime(player, 10);
                    player.location = "twinsMansion";
                    savePlayer(player);
                }
            }
        ], player);
        return;
    }
}

//연말 이벤트
window.YEAR_END_HANDLERS.deric = function(player){

    startScene([
        {
            type : "text",
            value : [
                "데릭은 당신의 방을 둘러보면서 자신이 여기서 잘 수 있을지는 잘 모르겠다고 말했다. 주변을 휘휘 둘러보던 그는 당신과 시선을 마주치더니 그래도 오늘은 특별히 당신을 위해 여기에 머물러주겠다고 말했다. 당신의 옆에 앉으면서도 그는 불편한 듯 코끝을 찡그렸다." +
                "<br><br>\"자. 아가를 위해 가져온 술이란다.\"<br><br>" +
                "딱 봐도 가격이 나갈 것만 같은 술이다. 데릭은 당신의 입맛에 맞춰오느라고 와인 저장고에서 꽤 많은 시간을 보냈다고 말하며 능숙하게 마개를 땄다. 그리고 그는 자신이 가져온 잔에 술을 따랐다." +
                "<br><br>\"무사히 1년을 넘긴 걸 축하하며, 내년은 더 높은 곳으로 올라가길.\"<br><br>" +
                "그는 당신의 잔에 자신의 잔을 부딪혔다. 술을 마시며 당신과 데릭은 많은 이야기를 나누었다. 당신이 어떤 이야기를 하든 그는 잘 받아주었다, 하류도시의 생활이나 바깥 생활을 제외한다면. 당신과 이야기를 나누던 데릭은 당신을 꽈악 끌어안더니 그대로 침대로 누워버렸다. 당신은 데릭에게 안긴 채 둘 중 한 쪽이 먼저 잠에 들기 전까지 계속계속 이야기를 했다."
            ]
        }
    ], player, {
        onEnd : () => completeYearEndEvent(player, "deric")
    });
};
window.YEAR_END_LETTER_HANDLERS.deric = function(player, next){

    startScene([
        {
            type : "text",
            value : [
                "데릭에게서 온 편지다.<br><br><br>" +
                "<span class='log-deric'>[안녕, 아가. 사실 별로 놀라지는 않았단다. 기분이 나쁜 것과 놀라는 건 별개니까 말이다.]</span><br><br>" +
                "<span class='log-deric'>[네 입맛에 맞춘 와인까지 준비해놨는데 네가 그 기회를 놓쳤으니 어쩔 수 없지. 지금 와서 술을 마시고 싶다고 해도 내가 해줄 수 있는 건 없어. 이미 그 술은 엎질러졌거든.]</span><br><br>" +
                "<span class='log-deric'>[네가 연말을 다른 사람과 잘 보냈길 바란다. 물론 나보다는 조금 덜 잘 보냈겠지만.]</span>"
            ]
        }
    ], player, {
        onEnd : next
    });
};
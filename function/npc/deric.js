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

        choices.push({
            text: "음식을 건넨다",
            action: "deric_giveFood"
        });

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
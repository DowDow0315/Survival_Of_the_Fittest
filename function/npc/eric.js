function processEricText(text, player){
    const currentDebtLevel =
        player.temp?.ericPaidDebtLevel || player.debtLevel || 1;

    return text
        .replaceAll("{ericTitle}", getEricTitle(player))
        .replaceAll("{cost1}", getWeeklyCost({...player, debtLevel: currentDebtLevel}))
        .replaceAll("{cost2}", getWeeklyCost({...player, debtLevel: currentDebtLevel + 1}))
        .replaceAll("{playerName}", player.name || "당신");
}

function getEricTitle(player){
    if (NPC_DATA["eric"].emotion.affection > 50) return "꼬맹이";
    return "애송이";
}

registerActions("eric", {
    //처음 이벤트
    firstMeeting_defiant: (player) => {
        changeEmotion("eric", "rage", 5);
        changeHP(player, -10);
        changeGold(player, -500);
        startScene(NPC_DATA["eric"].scenes.eric_firstMeeting_defiant, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },

    firstMeeting_neutral: (player) => {
        changeGold(player, -500);
        startScene(NPC_DATA["eric"].scenes.eric_firstMeeting_neutral, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },

    firstMeeting_submissive: (player) => {
        changeEmotion("eric", "affection", 5);
        changeEmotion("eric", "lust", 10);
        changeArousal(player, +10);
        changeGold(player, -500);
        startScene(NPC_DATA["eric"].scenes.eric_firstMeeting_submissive, player,
            {
            onEnd: () => startScene(getLocationScene(player), player)
        }
        );
    },
    //메인스토리
    undercity_04_skip_event_defiant: (player) => {
        startScene(
            NPC_DATA["eric"].scenes.eric_undercity_04_skip_event_defiant,
            player,
            {
                onEnd: () => startLukeUndercity04AfterEric(player)
            }
        );
    },
    undercity_04_skip_event_neutral: (player) => {
        startScene(
            NPC_DATA["eric"].scenes.eric_undercity_04_skip_event_neutral,
            player,
            {
                onEnd: () => startLukeUndercity04AfterEric(player)
            }
        );
    },
    
    undercity_04_skip_event_submissive: (player) => {
        startScene(
            NPC_DATA["eric"].scenes.eric_undercity_04_skip_event_submissive,
            player,
            {
                onEnd: () => startLukeUndercity04AfterEric(player)
            }
        );
    },

    //개인스토리
    eric_chasingSomething_event_02_care: (player) => {
        const eric = NPC_DATA["eric"].emotion;        
        
        if (eric.affection > 50) {
            startScene(
                NPC_DATA["eric"].scenes.eric_chasingSomething_event_02_care_highAffection,
                player,
                {
                    onEnd: () => startScene(getLocationScene(player), player)
                }
            );
            return;
        }

        startScene(NPC_DATA["eric"].scenes.eric_chasingSomething_event_02_care_lowAffection, player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });       
    },
    //돈 수거 이벤트 
    weeklyPayment_no: (player) => {
        changeEmotion("eric", "rage", 10);
        handleWeeklyPaymentNo(player);
    },

    weeklyPayment_yes: (player) => {
        const paidDebtLevel = player.debtLevel || 1;
        const cost = getWeeklyCost({ ...player, debtLevel: paidDebtLevel });
        
        player.temp = player.temp || {};
        player.temp.ericPaidDebtLevel = paidDebtLevel;
        changeGold(player, -cost);
        
        startScene(NPC_DATA["eric"].scenes.eric_weeklyPayment_yes, player, {
            onEnd: () => {
                player.debtLevel = paidDebtLevel + 1;
                delete player.temp.ericPaidDebtLevel;
                
                savePlayer(player);
                player.inEvent = false;
                startScene(getLocationScene(player), player);
            }
        });
    },
    //talk
    giveFood : (player) => {
        openGiveFoodMenu(player, "eric");
    },

    talk: (player) => {
        if (!isEricAvailable(player)){
            showSingleTextScene(
                "에릭은 지금 집에 없다. 그는 집에 잘 들어오지 않는다.",
                player
            );
            return;
        }

        startScene([
            {
                type: "text",
                value: "에릭의 방 안에서 희미한 인기척이 느껴졌다. 당신이 방문을 열자 쉬고 있던 에릭이 고개를 들었다."
            },
            {
                type: "choice",
                choices: [
                    { text: "사소한 잡담을 한다", action: "eric_smallTalk" },
                    { text: "다른 얘기를 한다", action: "eric_otherTalk" },
                    { text: "돌아간다", action: "back_location" }
                ]
            }
        ], player);
    },
    smallTalk : (player) => {
        passTime(player, 5);
        const affection = NPC_DATA["eric"].emotion.affection || 0;
        const rage = NPC_DATA["eric"].emotion.rage || 0;
        const dominance = NPC_DATA["eric"].emotion.dominance || 0;
        const fear = NPC_DATA["eric"].emotion.fear || 0;
        const onEnd = () => {
            startScene(getLocationScene(player), player);
        };

        if (rage >= 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "에릭은 자신의 휴식을 방해하는 당신을 쳐다보았다. 노려본 게 아닌데도 묵직한 살기가 느껴진다.",
                        "총을 장전하던 에릭은 당신을 돌아보았다. 분위기가 무섭다.... 당신은 지금 말을 걸 타이밍이 아니었다는 걸 뒤늦게 깨달았다."
                    ])
                }
            ], player, { onEnd });
            return;
        }

        if (fear >= 90 && affection >= 80){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "에릭은 당신이 쉽사리 방 안으로 들어오지 못하는 걸 보고서도 침묵을 지켰다. 그는 말없이 자신의 일을 하고 있다.",
                        "에릭은 쉽사리 자신의 방으로 들어오지 못하는 당신을 보더니 고개를 까닥였다. 당신은 그의 방으로 들어오긴 했지민 그에게 가까이 붙어있지는 못했다.",
                        "당신은 그의 방에 들어간 후 적막 속에서 살짝 졸았다. 졸다가 눈을 떴을 때 당신의 위에는 담요 한 장이 덮어져 있었다."
                    ])
                }
            ], player, { onEnd });
        } else if (dominance >= 80 && affection >= 80){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "에릭은 당신이 어디에 있는지 확인하듯 가끔 시선을 들었다. 당신이 그가 정해준 자리에서 벗어나지 않는 한, 그는 별다른 제지를 하지 않았다.",
                        "에릭은 당신을 시야에 둔 채 자신의 일을 하고 있다. 당신이 슬쩍 고개를 내밀자 그는 당신을 흘낏 보긴 했지만 당신을 밀어내지는 않았다.",
                        "당신은 그의 가까이에서 그가 작업에 몰두하는 모습을 볼 수 있었다. 에릭은 당신의 시선에도 아랑곳하지 않고 자신의 일을 계속했다.",
                        "당신이 자신의 작업에 손을 대려고 하자 에릭은 당신의 손을 막았다. 당신은 그의 물건을 만질 수 없다."
                    ])
                }
            ], player, { onEnd });
        } else if (fear > 50 && dominance > 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "에릭은 어차피 당신이 자신의 명령에 거스르지 못할 거라는 걸 알고 있다. 그는 당신이 옆에 있든말든 자신의 일을 계속하고 있다.",
                        "당신이 일에 대해 물어보자 에릭은 짧게 대답해주었다. 당신이 질문을 멈추자 다시 적막이 흘렀다."
                    ])
                }
            ], player, { onEnd });
        } else if (affection >= 100){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "당신이 그의 옆에 다가와도 에릭은 제지하지 않았다. 당신은 에릭의 뺨을 손가락으로 꾹 눌렀다. 그제야 에릭이 당신을 쳐다보았다. 당신과 에릭은 몇 초 동안 서로만을 응시했다.",
                        "당신은 에릭에게 일을 좀 쉬면 안 되냐고 물었다. 에릭은 잠시 말이 없더니 당신을 향해 몸을 돌렸다. 드디어 그가 일에서 손을 뗐다.",
                        "당신은 에릭의 무릎 위로 올라와 앉았다. 그의 품은 따듯했다. 에릭은 당신을 품에 안은 채로 자신의 일을 계속하다가 시선을 밑으로 내렸다. 당신과 에릭의 시선이 마주쳤다, 평소보다 더 길게.",
                        "당신의 곁에서 에릭은 얕은 잠에 빠졌다. 어쩌면 당신이 곁에 있기에, 오늘만큼은 평소보다 조금 더 오래 눈을 감고 있을 수 있는지도 몰랐다."
                    ])
                }
            ], player, { onEnd });
        } else if (affection >= 80){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "당신이 다가오자 에릭은 당신에게로 시선을 던졌다. 그는 당신을 위아래로 훑어보더니 다친 곳이 없는 걸 확인하고 다시 시선을 돌렸다.",
                        "에릭은 당신이 자신의 옆에 기대어 앉아도 뭐라고 하지 않았다. 살짝 졸았던 걸까, 당신이 다시 눈을 떴을 때 당신은 에릭의 침대에 누워있었다. 당신은 책상에 앉아 작업을 하고 있는 그의 뒷모습을 바라보았다.",
                        "당신은 그의 곁에 앉아 묵묵히 손을 움직이는 모습을 바라보았다. 에릭은 시선을 돌리지 않았지만, 당신이 가까이 있는 것을 불편해하지는 않았다.",
                        "당신이 그의 곁에 가만히 앉아있자 에릭은 당신에게 병을 하나 내밀었다. 말린 과일이 담겨있는 병이다. 당신은 말린 과일을 먹으며 그를 기다렸다."
                    ])
                }
            ], player, { onEnd });
        } else if (fear >= 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "방문은 열었지만 당신은 에릭의 곁에 가까이 갈 수 없었다.... 당신은 방문 주변에서만 서성였다."
                    ])
                }
            ], player, { onEnd });
        } else if (affection >= 50 && dominance >= 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "에릭은 당신이 자신의 주변에 있어도 불편해하지 않았다. 아니, 어쩌면 신경을 아예 쓰지 않는 걸지도...? 당신이 방문 쪽으로 향하자 그제야 에릭의 시선이 당신의 뒤로 붙었다가 떨어졌다.",
                        "당신은 에릭의 의자 옆에 놓여있는 작은 쿠션을 보았다. 그가 당신을 위해 준비해둔 걸까? 당신은 그 쿠션 위에 앉아 에릭을 지켜보았다.",
                        "에릭이 일을 하지 않는 모습을 본 적이 없는 것 같다. 당신은 괜히 그의 휴식 시간을 방해한 것 같아서 조금 미안해졌다."
                    ])
                }
            ], player, { onEnd });
        } else if (affection >= 50){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "당신이 방에 발걸음을 디뎌도 에릭은 아무 말도 하지 않았다. 그는 책상 위에 올려놓았던 서류를 다시 집어들었다.<br><br>원래 눈을 붙이려고 했던 걸까.",
                        "당신은 그에게 좀 쉬는 게 어떻겠냐고 물었다. 에릭은 당신을 힐끗 보더니 네가 신경쓸 일은 아니라고 짧게 대꾸했다. 그는 다시 일을 할 생각인 것 같다."
                    ])
                }
            ], player, { onEnd });
        } else if (affection >= 30){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "에릭은 당신이 자신의 방에 들어오자 눈썹을 살짝 올리긴 했지만 제지하지는 않았다. 하지만 당신이 거리를 더 좁히자 그는 고개를 돌려 당신을 응시했다. 거기서 더 다가오지는 말라는 뜻이다.",
                        "에릭은 당신이 일정 거리 안으로 들어오는 건 허락하지 않았다. 당신은 허락한 범위 내에서만 그의 방에 머무를 수 있었다."
                    ])
                }
            ], player, { onEnd });
        } else{
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "당신이 방 안으로 들어오기 전 에릭이 당신을 쳐다보았다. <br><br>\"...데릭이 허락해줬나.\"<br><br>그는 낮게 중얼거리더니 다시 문을 닫아버렸다. 당신은 그의 방에 아직 들어갈 수 없다.",
                        "방 안으로 들어오려던 당신의 앞으로 문이 닫혔다. 당신은 아직 그의 공간에 허락받지 못했다."
                    ])
                }
            ], player, { onEnd });
        }
    },
    otherTalk : (player) => {
        const choices = [];

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

//처음 이벤트
function startEricFirstMeeting(player){
    startScene(NPC_DATA["eric"].scenes.eric_firstMeeting,
        player,
        {
            onEnd: () => startScene(getLocationScene(player), player)
        }
    );
}

//타이벤트들
window.pay_eric_victim_collect_event01 = function(player){
    const price = 1000;

    if (player.gold < price){
        showSingleTextScene(
            "돈이 부족하다. 에릭은 당신을 보더니 무표정으로 희생자의 손을 밟았다. 희생자는 비명을 질렀고, 에릭은 희생자의 손가락을 그대로 부러뜨린 후 그의 품을 뒤져 그들의 전재산을 가져갔다.",
            player
        );
        changeEmotion("eric", "rage", 2);
        changeTrauma(player, 2);
        return true;
    }

    changeGold(player, -price);
    changeEmotion("eric", "dominance", -5);
    changeTrauma(player, -5);

    showSingleTextScene(
        `당신은 ${price}G를 꺼내 에릭에게 건넸다. 에릭은 돈을 받아 세어보더니 희생자를 놓아주었다. 희생자는 당신에게 고맙다고 하며 엎드렸다. 당신은 다음주에 그가 에릭에게 돈을 또 못 낼 수도 있다고 생각하긴 하지만, 우선 그가 일주일이라도 시간을 얻은 것에 집중하기로 했다. 에릭은 그대로 돌아서 가버렸다.`,
        player
    );

    return true;
};

//돈 수거 이벤트
function getWeeklyCost(player){
    const level = player.debtLevel || 1;

    if (level <= 1) return 500;
    if (level === 2) return 1000;
    if (level === 3) return 2000;
    if (level === 4) return 3000;
    if (level === 5) return 4000;
    if (level === 6) return 5000;

    return 5000;
}

function weeklyPayment(player){
    startScene(NPC_DATA["eric"].scenes.eric_weeklyPayment, player, {
        onEnd: () => {
            player.inEvent = false;
            startScene(getLocationScene(player), player);
        }
    });
}

function handleWeeklyPaymentNo(player){
    const rage = NPC_DATA["eric"].emotion.rage;

    let scene;

    if (rage < 50){
        scene = NPC_DATA["eric"].scenes.eric_weeklyPayment_no_low;
    }
    else if (rage < 80){
        scene = NPC_DATA["eric"].scenes.eric_weeklyPayment_no_med;
    }
    else {
        scene = NPC_DATA["eric"].scenes.eric_weeklyPayment_no_high;
    }

    startScene(scene, player, {
        onEnd: () => {
            startBattle("eric", player, {
                noEscape: true,

                onWin: () => {
                    player.inEvent = false;
                    startScene(getLocationScene(player), player);
                },

                onLose: () => {
                    const payment = takeEricPaymentAfterLose(player);
                    player.flags.ericPunishCount = (player.flags.ericPunishCount || 0) + 1;
                    triggerEricPunishment(player, payment);
                }
            });
        }
    });
}

function takeEricPaymentAfterLose(player){
    const cost = getWeeklyCost(player);
    const taken = Math.min(player.gold, cost);

    changeGold(player, -taken);

    player.flags.ericUnpaidDebt = (player.flags.ericUnpaidDebt || 0) + (cost - taken);

    return {
        cost,
        taken,
        remainingDebt: cost - taken
    };
}

function triggerEricPunishment(player, payment){
    const count = player.flags.ericPunishCount || 1;
    const rage = NPC_DATA["eric"].emotion.rage || 0;

    if (count >= 4 && rage >= 80){
        startEricSlaveTraderPunishment(player, payment);
        return;
    }

    if (count >= 4){
        startEricGloryHolePunishment(player, payment);
        return;
    }

    if (count >= 2){
        startEricPrisonAndStreetPunishment(player, payment);
        return;
    }

    startEricPrisonPunishment(player, payment);
}

function startEricPrisonPunishment(player, payment){
    player.inEvent = true;
    player.location = "inquisitRoom";
    passTime(player, 10);

    startScene([
        {
            type: "text",
            value: [
                "전투가 끝났을 때, 당신은 제대로 서 있을 수조차 없었다. 그는 주먹을 털며 일어나지도 못하는 당신을 차가운 눈으로 내려다보았다.<br>",
                "그는 당신에게 어떤 말도 하지 않았다. 당신이 눈을 깜박였을 때 에릭은 이미 당신의 목덜미를 잡고 경비병 막사로 향하고 있었다. 비명소리와 신음소리, 그리고 살끼리의 마찰음밖에 안 들리는 조사실 복도를 지나 당신은 조사실 중 하나로 밀어붙여졌다. 당신이 정신을 차리기도 전에 조사실 문이 닫혔다. 에릭은 그대로 볼개그를 당신의 입에 처박았다. 고문의 시작이었다."
            ]
        }
    ], player, {
        onEnd: () => {
            startTraining(player, {
                trainerId: "eric",
                maxTurns: 20,
                context: "eric_prison_punishment",
                onEnd: () => {
                    player.location = "inquisitRoom";
                    passTime(player, 40);
                    startScene(NPC_DATA["eric"].scenes.eric_prison_punishment_after, player, {
                        onEnd: () => {
                            player.inEvent = false;
                            startScene(getLocationScene(player), player);
                        }
                    });
                }
            });
        }
    });
}

function startEricPrisonAndStreetPunishment(player, payment){
    player.inEvent = true;
    player.location = "inquisitRoom";
    passTime(player, 10);

    startScene([
        {
            type: "text",
            value: [
                "당신은 길에 쓰러지기도 전에 당신이 어디로 끌려갈지 알고 있었다. 에릭은 말없이 당신의 목덜미를 잡더니 그대로 당신을 조사실로 끌고 갔다.<br><br>",
                "\"내 생각보다 넌 멍청한 놈이었군, {ericTitle}. 한 번의 교육으로는 못 알아듣는 멍청한 놈이었나?\"<br><br>",
                "에릭은 당신을 조사실 바닥에 내동댕이쳤다. 볼개그가 당신의 입으로 들어왔을 때, 당신은 각오를 해야만 했다."
            ]
        }
    ], player, {
        onEnd: () => {
            startTraining(player, {
                trainerId: "eric",
                maxTurns: 20,
                context: "eric_prison_and_street",
                onEnd: () => {
                    startEricStreetHumiliationAfterPrison(player, payment);
                }
            });
        }
    });
}

function startEricStreetHumiliationAfterPrison(player, payment){
    player.location = "townStreet";
    passTime(player, 10);

    startScene([
        {
            type: "text",
            value: [
                "고문이 끝났을 때, 당신은 모든 게 다 끝났다고 생각했었다. 하지만 에릭은 당신의 기대를 비웃기라도 하듯이 당신을 데리고 그대로 길거리로 나갔다. 수갑에 팔이 묶인 채로 당신은 단두대 같이 생긴 곳에 목과 팔이 묶였다. 엎드린 자세로 당신은 당신의 앞에 있는 에릭을 올려다보았다.<br><br>",
                "\"내 인내심을 더 이상 시험하지 않는 게 좋을 거다, {ericTitle}.\"<br><br>",
                "그는 단두대를 지키고 있는 사람에게 당신을 3시간 후에 풀어주라고 명령했다. 에릭은 그대로 멀어져갔고, 슬슬 사람들이 단두대 주변으로 모이기 시작했다. 음흉한 눈을 가진 사람들이 움직일 수 없는 당신의 주변으로 모여든다. 짝! 하는 소리와 함께 누군가 당신의 엉덩이를 때렸다. 모두가 지켜보고 있는 앞에서 엉덩이를 맞았다는 생각에 당신의 얼굴이 수치심으로 붉어졌다. 하지만 당신의 고난은 그걸로 끝이 아니었다. 잘게 흔들리는 엉덩이를 바라보던 누군가가 당신의 뒤에 자리를 잡았다. 그리고 당신의 앞으로도 누군가가 성기를 들이밀었다. 그는 당신의 머리카락을 잡아당기며 잘 빨면 부드럽게 해줄 수도 있다고 말했다.",
                "쉘터의 몇몇 사람들과 시선이 마주친다. 그들은 당신과 시선이 마주치자 흠칫 어깨를 떨더니 그대로 자리를 벗어나버렸다. 어차피 그들에게 당신을 구할 수 있는 힘은 없었다. 당신의 집중이 흐트러졌다는 걸 인지한 누군가가 당신의 엉덩이를 한번 더 내리쳤다. 짝! 소리는 아까보다 더 맹렬해졌다. 당신이 준비가 되기도 전에 당신의 구멍은 성기들을 맞이해야만 했다. 단두대에 붙들려 당신의 몸은 상하좌우로 흔들렸다. 탄력성 있게 흔들리는 배와 엉덩이를 짝짝 매질당하며 당신은 모두의 성기를 받아내야만 했다. 차례대로....",
                "끝나지 않을 것만 같았던 시간이 끝나고, 경비병은 비웃으며 당신을 구속에서 풀어주었다.<br><br>",
                "\"다음 번에도 꼭 에릭한테 개기라고, 아가씨.\"<br><br>",
                "당신은 비틀거리면서 일어났다. 지금 당장 이 거리를 벗어나야겠다는 생각이 당신의 머릿속을 장악한다."
            ]
        },
        {
            type: "effect",
            run: (player) => {
                passtime(player, 30);
                changeHP(player, -30);
                changeStamina(player, -40);
                changeArousal(player, 30);
                changeTrauma(player, 10);
                changeSensitivity(player, "aSensitivity", 8);
                changeSensitivity(player, "bSensitivity", 8);
                changeSensitivity(player, "cSensitivity", 8);
                changeSensitivity(player, "mSensitivity", 8);
            }
        }
    ], player, {
        onEnd: () => {
            player.inEvent = false;
            startScene(getLocationScene(player), player);
        }
    });
}

function startEricGloryHolePunishment(player, payment){
    startNikolaiPunishmentRoom(player, {
        source: "eric",
        debt: payment.remainingDebt || 0
    });
}

function startEricSlaveTraderPunishment(player, payment){
    player.flags = player.flags || {};

    startScene([
        {
            type: "text",
            value:
                "에릭은 한동안 아무 말 없이 당신을 바라보았다.<br><br>" +
                "\"...이제 네가 직접 갚을 필요는 없다.\"<br><br>" +
                "그 말이 끝나기도 전에, 낯선 남자들이 방 안으로 들어왔다. 당신은 저항하고, 끌려가면서 끝까지 저항했지만 당신을 바라보는 에릭의 녹색 눈동자는 고요하기만 했다." +
                "<br><br><span class='log-eric'>그는 더 이상 당신을 봐줄 생각이 없다.</span>"
        },
        {
            type: "effect",
            run: (player) => {
                startSlaverCapture(player, {
                    reason: "ericDebt"
                });
                return true;
            }
        }
    ], player);
}

function startLukeUndercity04AfterEric(player){
    startScene(
        NPC_DATA["luke"].scenes.luke_undercity_04_after_eric,
        player,
        {
            onEnd: () => {
                startScene(getLocationScene(player), player);
            }
        }
    );
}

function isEricAvailable(player){
    const day = getWeekdayIndex(player);
    const time = getTimePeriod(player);

    // 월/수/일 새벽에만 있음
    if ([0, 2, 6].includes(day) && time !== "dawn"){
        return false;
    }

    // 토, 아침에만 있음
    if ([5].includes(day) && time !== "morning"){
        return false;
    }
    return true;
}
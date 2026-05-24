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

//돈 수거 이벤트
function getWeeklyCost(player){
    const level = player.debtLevel || 1;

    if (level <= 1) return 500;
    if (level === 2) return 1000;
    if (level === 3) return 2000;
    if (level === 4) return 3000;
    if (level === 5) return 4000;

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
    player.inEvent = false;
    startScene(getLocationScene(player), player);
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
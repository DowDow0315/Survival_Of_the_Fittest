function initBanditCamp(player){
    player.banditCamp = player.banditCamp || {
        active : false,
        progress : 0,
        maxProgress : 6
    };
}

window.startBanditCampRaid = function(player){
    initBanditCamp(player);

    player.banditCamp = {
        active : true,
        progress : 0,
        maxProgress : getRandomBanditCampMaxProgress(),
        prisonerEventDone : false
    };

    savePlayer(player);

    startScene([
        {
            type : "text",
            value :
                "당신은 도적떼들이 있다는 초소로 향했다. 여기저기 널려있는 마을사람들의 시체.... 아니, 마을사람들만의 시체는 아니겠지. 당신의 시선이 경비병의 찢어진 망토에 닿았다가 떨어졌다. 당신은 조용히 발걸음을 옮겼다."
        }
    ], player, {
        onEnd : () => {
            advanceBanditCamp(player);
        }
    });
};

function advanceBanditCamp(player){
    initBanditCamp(player);

    const camp = player.banditCamp;

    if (!camp.active){
        return;
    }

    if (camp.progress >= camp.maxProgress){
        startBanditCampBoss(player);
        return;
    }

    camp.progress++;

    passTime(player, 5);

    if (camp.progress === 4 && !camp.prisonerEventDone){
        camp.prisonerEventDone = true;
        savePlayer(player);
        startBanditCampPrisonerEvent(player);
        return;
    }

    savePlayer(player);

    startBanditCampRandomEvent(player);
}

function startBanditCampRandomEvent(player){
    const eventId = pickWeighted([
        { id: "banditCamp_battle_low", weight: 60 },
        { id: "banditCamp_battle_high", weight: 50 },
        { id: "banditCamp_supply_trap", weight: 20 },
        { id: "banditCamp_dead_guard", weight: 10 },
        { id : "banditCamp_bandit_being_killed", weight: 15},
        { id : "banditCamp_bandit_rest", weight : 10},
        { id : "banditCamp_bandit_supply", weight : 5}
    ]);

    if (eventId === "banditCamp_battle_low"){
        showSingleTextScene("초소를 지키던 하급도적이 당신을 발견했다.", player, {
            onEnd: () => startBattle("bandit1", player, {
                onWin: () => advanceBanditCamp(player),
                onEscape: () => window.banditCamp_leave(player)
            })
        });
        return;
    }

    if (eventId === "banditCamp_battle_high"){
        showSingleTextScene("무장을 갖춘 상급도적이 길을 막았다.", player, {
            onEnd: () => startBattle("bandit2", player, {
                onWin: () => advanceBanditCamp(player),
                onEscape: () => window.banditCamp_leave(player)
            })
        });
        return;
    }

    if (eventId === "banditCamp_supply_trap"){
        startScene([
            {
                type: "text",
                value:
                    "버려진 보급 상자처럼 보이는 물건이 있었다. 당신이 가까이 다가가자 상자는 저절로 열려서 분홍색 연기를 뿜어냈다. 마약 연기다!<br><br>"
            },
            {
                type: "effect",
                run: (player) => {
                    changeArousal(player, 5);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => advanceBanditCamp(player)
        });
        return;
    }

    if (eventId === "banditCamp_dead_guard"){
        startScene([
            {
                type: "text",
                value:
                    "당신은 찢어진 경비병 망토를 발견했다.<br><br>" +
                    "망토 아래에는 이미 식은 시체가 있었다. 그는 이곳을 정찰하러 온 걸까, 아니면 도적떼에 붙었다가 버려진 걸까.<br><br>" +
                    "시체의 손에는 아직 작은 요구르트가 쥐어져 있었다."
            },
            {
                type: "effect",
                run: (player) => {
                    addItem(player, ITEMS.consumable.smallPotion);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => advanceBanditCamp(player)
        });
        return;
    }

    if (eventId === "banditCamp_bandit_being_killed"){
        startScene([
            {
                type: "text",
                value:
                    "당신은 처형대에 걸려있는 시체들을 보았다. 민간인들의 시체만 있는 줄 알았는데 시체들 사이사이에 도적들의 시체도 껴있었다. 자기네들끼리 죽였던 걸까. 식량이 부족해서? 차라리 '식량이 부족해서'가 나았지, 다른 이유는 생각조차 하고 싶지 않았다." +
                    "<br>당신은 처형대 앞에 삐뚤삐뚤하게 써있는 글자를 읽었다."+
                    "<br><br><div style='text-align:center;'><strong style='color:red; font-size:2rem'>우리는 이제 자유다</strong></div><br><br>"+
                    "자유. 그 단어가 이리도 무서운 단어였던가. 당신은 고개를 돌렸다. 누군가 도적 시체 뒤에 맥주를 놓고 간 모양이다. 당신은 그 맥주를 챙겼다."

            },
            {
                type: "effect",
                run: (player) => {
                    addItem(player, ITEMS.consumable.beer);
                    changeTrauma(player, 1)
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => advanceBanditCamp(player)
        });
        return;
    }

    if (eventId === "banditCamp_bandit_rest"){
        startScene([
            {
                type: "text",
                value:
                    "당신은 잠시 쉴 수 있는 곳을 찾았다. 당신은 경계를 늦추지 않은 채 몸을 쉬었다."

            },
            {
                type: "effect",
                run: (player) => {
                    changeHP(player, Math.floor(player.status.maxHp * 0.2));
                    changeStamina(player, Math.floor(player.status.maxStamina * 0.2));
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => advanceBanditCamp(player)
        });
        return;
    }

    if (eventId === "banditCamp_supply"){
        startScene([
            {
                type: "text",
                value:
                    "버려진 보급 상자처럼 보이는 물건이 있었다. 당신은 보급상자에서 자원을 조금 챙길 수 있었다."
            },
            {
                type: "effect",
                run: (player) => {
                    addItem(player, ITEMS.misc.cabbage);
                    addItem(player, ITEMS.misc.potato);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => advanceBanditCamp(player)
        });
        return;
    }
}

function getRandomBanditCampMaxProgress(){
    return 5 + Math.floor(Math.random() * 3); // 5~7
}

window.banditCamp_next = function(player){
    advanceBanditCamp(player);
};

window.banditCamp_leave = function(player){
    player.banditCamp.active = false;
    player.banditCamp.failed = true;

    if (player.quest?.active?.id === "bandit_cleanup"){
        player.quest.active = null;
    }

    savePlayer(player);

    startScene([
        {
            type : "text",
            value :
                "도적떼들은 뭔가 눈치를 챈 모양이다. 당신이 다시 돌아왔을 때 도적떼는 이미 없었다.<br><br>" +
                "<strong style='color:red; font-size:1.4rem'>임무 실패</strong>"
        }
    ], player, {
        onEnd : () => {
            moveTo(player, "banditForest");
        }
    });
};

function startBanditCampPrisonerEvent(player){
    startScene([
        {
            type : "text",
            value :
                "당신은 묶여있는 사람들에게 도착했다. 몇 명은 이미 관리 부족으로 사망했고, 몇 명만이 살아남아서 몸을 바들바들 떨고 있었다. 처음 당신을 보았을 때 그들은 두려움에 떨었지만, 곧 그들은 당신이 도적떼의 일원이 아니라는 걸 알았다. 발을 움직이지 못하는 사람이 당신에게 기어왔다." +
                "<br><br>\"저 사람들에게 지옥을 선사해주세요....\"<br><br>"+
                "그는 자신의 생존보다 그들의 죽음을 더 바라고 있었다. 그의 말에 몇몇 사람들이 울음을 터뜨렸고, 몇몇 사람들은 당신에게 기어왔다. 제대로 걸을 수 있는 사람은 한 명도 없었다. 그들은 도적떼가 최소한의 포로 생존을 위해 준 것들을 전부 당신의 회복에 사용했다." +
                " 어떤 사람은 도적들 몰래 숨겨놓았던 비장의 물약을 당신의 손에 쥐어주었다. 몇몇이 더 울음을 터뜨렸다." +
                "<br><br>\"그걸 그녀석한테 다 주면 어떡해요! 우리는 어떻게 살라고!\"<br>\"우리는 전부 죽을 거라고!\"<br>\"저녀석을 어떻게 믿고....\""+
                "<br>\"죽는다고? 우린 어차피 이미 다 죽은 목숨이야. 우리가 지금 살아있다고 생각해?\"<br><br>" +
                "한 사람의 말에 움찔하는 것도 잠시, 몇몇은 다시 원망을 토해냈다. <br><br>\"그건 네 생각이고...!\"<br>\"내놔, 내 빵 내놓으라고...!\""+
                "<br>...당신은 앞으로 나아가야 한다."
        },
        {
            type : "effect",
            run : (player) => {
                changeHP(player, Math.floor(player.status.maxHp * 0.5));
                changeStamina(player, Math.floor(player.status.maxStamina * 0.5));

                const potions = [
                    ITEMS.consumable.smallPotion,
                    ITEMS.consumable.mediumPotion,
                    ITEMS.consumable.meatPotion
                ];
                addItem(player, potions[Math.floor(Math.random() * potions.length)]);
                savePlayer(player);
            }
        },
        {
            type : "choice",
            choices : [
                { text : "계속 전진한다", action : "banditCamp_next" },
                { text : "철수한다", action : "banditCamp_leave" }
            ]
        }
    ], player);
}

function startBanditCampBoss(player){
    startScene([
        {
            type : "text",
            value :
                "당신은 진지 가장 안쪽까지 도달했다. 당신의 인기척을 느낀 누군가가 천천히 자리에서 일어났다. 당신을 돌아보는 그의 눈에는 살아남기 위한 추악함이 일렁이고 있었다. 그의 손이 움직이는 순간 당신은 재빨리 몸을 옆으로 돌려 피했다." +
                " 당신의 머리카락을 자르고 지나간 단도는 벽에 박혀있다. 당신은 당신의 무기를 쥐었다. 싸울 시간이다."
        }
    ], player, {
        onEnd : () => {
            startBattle("banditBoss", player, {
                noEscape : true,

                onWin : () => {
                    endBanditCampWin(player);
                }
            });
        }
    });
}

function endBanditCampWin(player){
    player.banditCamp.active = false;

    addQuestProgress(player, "banditBoss");

    savePlayer(player);

    showSingleTextScene(
        "도적떼를 소탕했다. 당신은 고개를 들었다. 어쩌면 이 일이 하류도시에 많은 영향은 끼치지 않을 수도 있다. 하지만 적어도, 당신은 당신이 이 세상에 작은 영향은 끼쳤다는 걸 알고 있다.",
        player,
        {
            onEnd : () => {
                player.location = "banditForest";
                savePlayer(player);
                startScene(getLocationScene(player), player);
            }
        }
    );
}

//포획이벤트
function startBanditsCapture(player){
    player.banditCamp = player.banditCamp || {};
    player.banditCamp.active = false;

    if (player.quest?.active?.id === "bandit_cleanup"){
        player.quest.active = null;
    }
    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "<strong style='color:red;'>도적떼 소탕 퀘스트에 실패했다.</strong><br><br>" +
                "도적들은 쓰러진 당신을 초소 안쪽으로 질질 끌고 갔다. 당신의 구멍에서 흐른 정액이 질질 당신이 끌려간 흔적을 남긴다.<br>" +
                "눈을 떴을 때, 당신의 손목은 멍이 들 정도로 밧줄에 세게 묶여 있었다. 주변에서는 도적들이 웃고 떠드는 소리가 들린다. 그나마 쇠사슬은 아니어서 다행인 걸까."
        }
    ], player, {
        onEnd: () => startBanditCaptureTraining(player)
    });
}

function getBanditCaptureState(player){
    player.captureState = player.captureState || {};
    player.captureState.bandits = player.captureState.bandits || {
        ropeDamage: 0,
        escapeAttempts: 0
    };
    return player.captureState.bandits;
}

function startBanditCaptureTraining(player){

    delete player.mineRun;
    player.flags.mineUnlocked = false;
    savePlayer(player);
    
    const capture = getBanditCaptureState(player);

    startTraining(player, {
        trainerId: "bandits",
        maxTurns: 10,
        introLog: "도적들은 당신을 초소 안쪽으로 끌고 갔다. 쉽게 빠져나가기는 어려워 보인다.",
        onEnd: () => {
            showBanditCaptureEscapeChoice(player);
        }
    });
}

window.bandit_capture_cut_rope = function(player){
    const capture = getBanditCaptureState(player);
    const str = getTotalStat(player, "str");
    const chance = Math.min(0.85, 0.25 + str / 120);

    changeStamina(player, -10);

    if (Math.random() < chance){
        capture.ropeDamage = Math.min(5, capture.ropeDamage + 1);
        savePlayer(player);
        showSingleTextScene(`밧줄이 조금 약해졌다. (${capture.ropeDamage}/5)`, player, {
            onEnd: () => startBanditCaptureTraining(player)
        });
    } else {
        savePlayer(player);
        showSingleTextScene("밧줄은 꿈쩍도 하지 않았다.", player, {
            onEnd: () => startBanditCaptureTraining(player)
        });
    }
};

function showBanditCaptureEscapeChoice(player){
    startScene([
        {
            type: "text",
            value: "도적들이 잠시 자리를 비웠다. 지금이 기회일지도 모른다."
        },
        {
            type: "choice",
            choices: [
                { text: "밧줄을 약하게 만든다", action: "bandit_capture_cut_rope" },
                { text: "탈출을 시도한다", action: "bandit_capture_escape" },
                { text: "기회를 더 기다린다", action: "bandit_capture_continue" }
            ]
        }
    ], player);
}

window.bandit_capture_escape = function(player){
    const capture = getBanditCaptureState(player);
    const dex = getTotalStat(player, "dex");

    const chance = Math.min(0.85, 0.10 + capture.ropeDamage * 0.13 + dex / 250);

    if (Math.random() < chance){
        player.captureState.bandits = null;
        player.banditCamp = null;
        player.location = "banditForest";
        savePlayer(player);

        showSingleTextScene("당신은 간신히 도적들의 초소에서 빠져나왔다.", player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });
        return;
    }

    capture.escapeAttempts++;
    savePlayer(player);

    showSingleTextScene("탈출하려 했지만 실패했다. 곧 도적들이 돌아왔다.", player, {
        onEnd: () => startBanditCaptureTraining(player)
    });
};

window.bandit_capture_continue = function(player){
    savePlayer(player);

    showSingleTextScene("당신은 지금은 움직이지 않기로 했다. 곧 도적들이 돌아왔다.", player, {
        onEnd: () => startBanditCaptureTraining(player)
    });
};
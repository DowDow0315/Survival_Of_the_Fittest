function startNikolaiPunishmentRoom(player, options = {}){
    player.inEvent = true;
    player.location = "gloryHole";
    player.flags = player.flags || {};

    const source = options.source || "nikolai";
    const debt = options.debt ?? getGloryHoleDebt(player);

    player.flags.nikolaiPunishmentDebt = debt;
    player.flags.nikolaiPunishmentSource = source;
    player.flags.ghWorkedMinutes = 0;
    player.flags.inNikolaiPunishmentRoom = true;

    localStorage.setItem("playerData", JSON.stringify(player));

    const introScene =
        source === "eric"
            ? NPC_DATA["nikolai"].scenes.nikolai_punishmentRoom_intro_eric
            : NPC_DATA["nikolai"].scenes.nikolai_punishmentRoom_intro;

    startScene(introScene, player, {
        onEnd: () => runNikolaiPunishmentRoom(player)
    });
}

function runNikolaiPunishmentRoom(player){
    player.flags = player.flags || {};

    const debt = player.flags.nikolaiPunishmentDebt || 0;

    if (debt <= 0){
        endNikolaiPunishmentRoom(player);
        return;
    }

    player.flags.nikolaiLockpickProgress = player.flags.nikolaiLockpickProgress || 0;

    startScene([
        {
            type: "text",
            value:
                `체벌방 안은 조용하다.<br><br>` +
                `남은 빚: ${debt}G<br>` +
                `문 상태: ${player.flags.nikolaiLockpickProgress}/100`
        },
        {
            type: "choice",
            choices: [
                { text: "쉰다", action: "nikolai_punish_rest" },
                { text: "문을 딴다", action: "nikolai_punish_lockpick" },
                { text: "니콜라이에게 빈다", action: "nikolai_punish_beg" },
                { text: "망상을 한다", action: "nikolai_punish_delusion"},
                { text: "체념한다", action: "nikolai_punish_submit" }
            ]
        }
    ], player);
}

function applyNikolaiPunishmentEffects(player, event){
    player.flags = player.flags || {};

    player.flags.nikolaiPunishmentDebt =
        Math.max(0, (player.flags.nikolaiPunishmentDebt || 0) - (event.debtPay || 0));

    if (event.minutes) passTime(player, event.minutes);
    if (event.arousal) changeArousal(player, event.arousal);
    if (event.stamina) changeStamina(player, event.stamina);
    if (event.trauma) changeTrauma(player, event.trauma);

    if (event.sensitivity){
        Object.entries(event.sensitivity).forEach(([key, value]) => {
            changeSensitivity(player, key, value);
        });
    }
    
    if (event.fluid){
        Object.entries(event.fluid).forEach(([key, value]) => {
            addBodyFluid(player, key, value);
        });
    }

    if (event.dominance) changeEmotion("nikolai", "dominance", event.dominance);
    if (event.lust) changeEmotion("nikolai", "lust", event.lust);
    if (event.rage) changeEmotion("nikolai", "rage", event.rage);
    if (event.fear) changeEmotion("nikolai", "fear", event.fear);

    localStorage.setItem("playerData", JSON.stringify(player));
}

function runNikolaiPunishmentTurn(player){
    const eventPool =
        Math.random() < 0.25
            ? NIKOLAI_PUNISHMENT_NIKOLAI_EVENTS
            : NIKOLAI_PUNISHMENT_EVENTS;

    const event = eventPool[Math.floor(Math.random() * eventPool.length)];

    startScene([
        {
            type: "text",
            value:
            typeof event.text === "object" && !Array.isArray(event.text)
            ? (event.text[player.gender] || event.text.default || "")
            : event.text
        }
    ], player, {
        onEnd: () => {
            applyNikolaiPunishmentEffects(player, event);

            if (checkArousalRelease(player, () => {
                runNikolaiPunishmentRoom(player);
            })) return;

            runNikolaiPunishmentRoom(player);
        }
    });
}

function getNpcEmotion(npcId, emotion){
    const npc = NPC_DATA?.[npcId];
    return npc?.emotion?.[emotion] || 0;
}

function tryNikolaiPunishmentEscape(player){
    const nikolaiFear = getNpcEmotion("nikolai", "fear");

    if (nikolaiFear >= 80){
        player.flags.nikolaiLockpickProgress = 100;

        localStorage.setItem("playerData", JSON.stringify(player));

    startScene([
        {
            type : "text",
            value :
            "문이 열렸다. 하지만 문을 열려는 순간 당신의 가슴이 쿵쾅쿵쾅 뛰기 시작했다. 니콜라이의 미소, 니콜라이의 채찍, 그리고 니콜라이의.... 당신은 움직일 수 없었다." +
            "당신은 멍하니 문을 열어둔 채로 가만히 있다가 다시 스스로 문을 닫았다. 당신은 니콜라이가 무서워서 도망갈 수 없었다...."
        }
    ], player, {
        onEnd: () => runNikolaiPunishmentRoom(player)
    });
    return;
    }

    const str = getTotalStat(player, "str");
    const chance = Math.min(0.85, 0.1 + str * 0.03);

    if (Math.random() < chance){
        player.inEvent = false;
        player.flags.nikolaiPunishmentDebt = 0;
        player.flags.nikolaiPunishmentSource = null;
        player.flags.nikolaiLockpickProgress = 0;
        player.flags.inNikolaiPunishmentRoom = false;

        changeEmotion("nikolai", "rage", 10);
        changeEmotion("nikolai", "affection", -10);

        player.location = "townStreet";
        localStorage.setItem("playerData", JSON.stringify(player));

        startScene([
            {
                type: "text",
                value:
                    "당신은 문밖으로 나가자마자 미친듯이 달렸다. 폐가 터질 거 같았지만 당신은 발걸음을 멈추지 않았다. 계단을 오르고, 폐 안으로 차가운 밤공기가 밀려들어왔을 때야 당신은 자신이 빠져나왔다는 걸 깨달았다."
            }
        ], player, {
            onEnd: () => startScene(getLocationScene(player), player)
        });

        return;
    }

    changeEmotion("nikolai", "rage", 5);
    changeEmotion("nikolai", "affection", -5);
    player.flags.nikolaiLockpickProgress = 0;

    localStorage.setItem("playerData", JSON.stringify(player));

    startScene([
        {
            type: "text",
            value:
                "문은 열렸지만, 몸이 따라주지 않았다. 당신이 지하실 계단을 오르고 밖으로 나가는 순간, 문을 열자마자 당신은 니콜라이에게 뒷덜미가 잡혔다." +
                "\"자기, 이런 건 더 나빠.\""
        }
    ], player, {
        onEnd: () => runNikolaiEscapePunishment(player)
    });
}

function runNikolaiEscapePunishment(player){
    startScene([
        {
            type : "text",
            value :
            "당신은 니콜라이에게 목덜미를 잡힌 채로 다시 질질 끌려내려갔다. 지하계단을 내려가는 동안 그는 답지 않게 말이 없었다. 당신을 방 안에 밀어넣은 후에야 그는 미소를 지으며 당신을 바라보았다. <br>" +
            "\"다시는 도망치지 못하게 만들어줄게.\"<br>그는 당신의 손을 밧줄로 묶은 후 그대로 천장에 매달아버렸다. 당신은 두 팔을 위로 올린 채 빙글빙글 공중에서 돌았다." +
            "그리고, 짜악짜악 살을 찢는 소리가 울려퍼졌다. 지금까지 그가 당신에게 했던 채찍질은 장난이라는 듯이, 당신의 피부 위로 붉은 꽃이 피어올랐다. 니콜라이는 한 자리에서 채찍질을 했지만, 채찍을 맞을 때마다 당신의 몸은 빙글빙글 돌아가서 당신은 배 위에도, 등 위에도, 엉덩이 위에도, 가슴 위에도... 모든 몸 위로 채찍자국이 새겨졌다." +
            "5분 정도 때렸을까. 당신의 피부를 타고 굴러떨어진 핏방울이 바닥에 작은 웅덩이를 이루었을 때, 니콜라이는 당신의 성기와 엉덩이를 집중적으로 때렸다. <br>\"또 도망갈 거야, 자기?\"<br>그는 계속 당신에게 도망갈 거냐고 물으며 채찍질을 가했다." +
            "그는 당신이 '다시는 도망가지 않겠다'라는 말을 할 때까지 채찍질을 해댔다. 그걸로도 부족했는지 그는 빨래집게로 당신의 가슴을 찝고, 그 밑에는 물풍선을 달았다. 당신의 가슴이 무게 때문에 아래로 쳐진다. 살갗이 찢어지는 소리는 멈추지 않는다. 니콜라이는 당신에게 잘못했어요, 라고 말하라고 했다." +
            "시간이 또 얼마나 흘렀을까. 니콜라이는 마지막으로 채찍으로 물풍선을 때렸다. 가슴 위에 붉은색 선이 그어지면서 물풍선이 당신의 위에서 터졌다. 물풍선이 아니었던 모양이다. 당신의 온몸에 끈적끈적한 것이 묻었다. 비릿한 냄새에 당신이 인상을 찌푸리자 니콜라이는 당신의 머리를 쓰다듬으며 웃었다.<br>" +
            "\"익숙해져야지. 언젠가는 좋아하게 될 거야, 자기라면.\"<br> 니콜라이는 훌쩍이는 당신을 천장에서 풀어준 후 다시 침대에 묶어놓았다. 그리고 그는 정성스레 당신의 상처를 치료해준 후 나갔다."
        }
    ], player, {
        onEnd : () => {
            applyNikolaiPunishmentEffects(player, {
                debtPay : -200,
                minutes : 120,
                stamina : -50,
                trauma : 20,
                sensitivity : {
                    aSensitivity : 30,
                    cSensitivity : 30,
                    bSensitivity : 30
                },
                dominance : 10,
                fear : 15,
                lust : -10
            });
            player.flags.nikolaiLockpickProgress=0;
            localStorage.setItem("playerData", JSON.stringify(player));
            runNikolaiPunishmentRoom(player);
        }
    })
}

function endNikolaiPunishmentRoom(player){
    const source = player.flags.nikolaiPunishmentSource || "nikolai";

    player.inEvent = false;
    player.flags.nikolaiPunishmentDebt = 0;
    player.flags.nikolaiPunishmentSource = null;
    player.flags.nikolaiLockpickProgress = 0;
    player.flags.inNikolaiPunishmentRoom = false;

    localStorage.setItem("playerData", JSON.stringify(player));

    const endScene =
        source === "eric"
            ? NPC_DATA["nikolai"].scenes.nikolai_punishmentRoom_end_eric
            : NPC_DATA["nikolai"].scenes.nikolai_punishmentRoom_end;

    startScene(endScene, player, {
        onEnd: () => {
            player.location = "townStreet";
            localStorage.setItem("playerData", JSON.stringify(player));
            startScene(getLocationScene(player), player);
        }
    });
}

window.nikolai_punish_rest = function(player){
    changeStamina(player, Math.floor(player.status.maxStamina * 0.35));
    passTime(player, 20);

    startScene([
        {
            type: "text",
            value: "당신은 조금이라도 몸을 회복하려 애썼다."
        }
    ], player, {
        onEnd: () => runNikolaiPunishmentTurn(player)
    });
};

window.nikolai_punish_lockpick = function(player){
    const dex = getTotalStat(player, "dex");
    const gain = 5 + Math.floor(dex * 1.5) + Math.floor(Math.random() * 16);

    player.flags.nikolaiLockpickProgress =
        Math.min(100, (player.flags.nikolaiLockpickProgress || 0) + gain);

    passTime(player, 15);
    localStorage.setItem("playerData", JSON.stringify(player));

    if (player.flags.nikolaiLockpickProgress >= 100){
        startScene([
            {
                type: "text",
                value: "찰칵. 문 안쪽에서 작은 소리가 났다. 잠금장치가 풀렸다."
            }
        ], player, {
            onEnd: () => tryNikolaiPunishmentEscape(player)
        });
        return;
    }

    startScene([
        {
            type: "text",
            value: `당신은 문을 열기 위해 잠금장치를 더듬었다.<br>조금은 감이 잡힌 것 같다. (${player.flags.nikolaiLockpickProgress}/100)`
        }
    ], player, {
        onEnd: () => runNikolaiPunishmentTurn(player)
    });
};

window.nikolai_punish_beg = function(player){
    const charm = getTotalStat(player, "charm");
    const chance = Math.min(0.75, 0.1 + charm * 0.025);

    changeEmotion("nikolai", "affection", -3);
    passTime(player, 10);

    if (Math.random() < chance){
        player.flags.nikolaiPunishmentDebt =
            Math.max(0, (player.flags.nikolaiPunishmentDebt || 0) - 1000);

        localStorage.setItem("playerData", JSON.stringify(player));

        startScene([
            {
                type: "text",
                value:
                    "니콜라이는 당신을 물끄러미 내려다보다가 한숨처럼 웃었다.<br>" +
                    "\"자기, 그렇게 말하면 내가 약해지는 거 알지?\"<br>" +
                    "그는 장부에서 일부 금액을 지워주었다. (-1000G)"
            }
        ], player, {
            onEnd: () => runNikolaiPunishmentTurn(player)
        });
        return;
    }

    localStorage.setItem("playerData", JSON.stringify(player));

    startScene([
        {
            type: "text",
            value:
                "니콜라이는 웃기만 했다.<br>" +
                "\"귀엽긴 한데, 규칙은 규칙이야.\""
        }
    ], player, {
        onEnd: () => runNikolaiPunishmentTurn(player)
    });
};

window.nikolai_punish_delusion = function(player){
    changeEmotion("nikolai", "fear", -5);
    passTime(player, 20);

    localStorage.setItem("playerData", JSON.stringify(player));

    startScene([
        {
            type: "text",
            value:
                "당신을 눈을 감고 다른 것을 떠올렸다. 여기에 끌려오기 전에 당신은 어떤 하늘을 바라보았었는지, 그리고 당신의 자유가 어느 정도였는지." +
                "당신의 자유는 언제나 미약했지만, 지금보다는 나았었다. 그때는 몰랐지만, 지금의 당신은 지금보다 나은 상황이 전에 있었다는 걸 알고 있다." +
                "당신은 스스로에게 여기에 평생 갇혀살 거는 아니라고 몇 번이고 되뇌였다. 한 번, 두 번, 세 번.... 그리고 여러 번. 당신의 숨소리가 편안해졌다. 니콜라이에 대한 두려움이 옅어진 거 같다."
        }
    ], player, {
        onEnd: () => runNikolaiPunishmentTurn(player)
    });
};

window.nikolai_punish_submit = function(player){
    runNikolaiPunishmentTurn(player);
};

const NIKOLAI_PUNISHMENT_EVENTS = [
    {
        text: [
            "누군가가 방안으로 들어왔다. 어둠에 적응된 시야가 누군가의 인영을 포착하긴 했지만, 그 사람이 어떤 표정을 짓고 있는 가까지는 포착하기가 어려웠다. 당신은 마치 인형처럼 그에게 사용당했다. 그는 당신의 모든 구멍을 굵고 날카로운 손가락으로 쑤셔대며 당신의 반응을 즐겼다."+
            "당신이 제발 그만해달라고 비명을 지르고 애원할 때까지 그의 고문은 끝나지 않았다. 그가 나간 후에도 당신의 머릿속에는 그의 낄낄거리는 웃음소리가 잔상처럼 남았다."
        ],
        debtPay: 80,
        minutes: 60,
        arousal: 10,
        stamina: -15,
        sensitivity: {
            aSensitivity : 10,
            cSensitivity : 10,
            mSensitivity : 10
        },
        trauma: 13
    },
    {
        text: [
            "누군가가 방안으로 들어왔다. 그는 묶여있는 당신의 위로 몸을 비벼댔다. 그의 성기가 당신의 두 허벅지 사이에서 위아래로 비벼졌다. 당신은 그에게 깔린 채로 가슴을 비벼졌다. 그는 당신에게서 모유라도 나올 것처럼 몇 번을 쥐어짰다. 마치 젖소의 젖을 착유기로 뽑는 것처럼 그의 손을 집게발처럼 당신의 가슴을 계속 찝었다." +
            "짝, 짝, 짝, 붉에 부어오른 당신의 가슴을 그를 두 손바닥으로 내리쳤다. 허벅지 사이의 그의 성기는 이미 크고 단단해진지 오래였다. 당신이 가슴이 아파서 허리를 뒤틀었을 때, 그 틈을 놓치지 않고 남자는 당신의 구멍에 자신의 것을 박았다. 허리가 일그러진 채로 당신은 그에게 무기력하게 강간당했다."
        ],
        debtPay: 80,
        minutes: 60,
        arousal: 20,
        stamina: -15,
        sensitivity: {
            aSensitivity : 10,
            cSensitivity : 10,
            bSensitivity : 10
        },
        fluid : {
            a : 10,
            c : 10,
        },
        trauma : 11
    },
    {
        text: [
            "누군가가 방안으로 들어왔다. 그는 당신의 밑으로 손을 뻗더니 두꺼운 막대기로 당신의 엉덩이를 쑤시기 시작했다. 안을 채운 이물감이 선명하게 느껴진다. 당신이 움직일 때마다 더더욱." +
            "막대기가 빠졌을 때 텅 비어버린 내벽으로 차가운 공기가 스며들며 시큰한 통증이 밀려왔다. 당신은 끝났을 거라고 생각했다. 하지만 행위는 끝나지 않았다. 남자는 빈 공간에 막대기보다 훨씬 큰 자신의 성기를 박아버렸다. 당신의 허리가 격렬하게 튀어올랐다. 새로운 형태의 고통에 당신의 눈이 번쩍 뜨였다. 몇 번이고, 몇 번이고 당신에게 박아대던 남성은 당신이 기절한 후에도 몇 번이고 싼 후에야 방을 나갔다."
        ],
        debtPay: 100,
        minutes: 200,
        arousal: 20,
        stamina: -30,
        sensitivity: {
            aSensitivity : 30
        },
        fluid : {
            a : 30
        },
        trauma : 13
    }
];

const NIKOLAI_PUNISHMENT_NIKOLAI_EVENTS = [
    {
        text: [
            "문이 열리고 니콜라이가 들어왔다. 그는 콧노래를 부르며 당신의 엉덩이 밑으로 애널비즈를 넣었다. 한 알씩, 한 알씩, 당신의 엉덩이는 아파하면서도 탐욕스럽게 애널비즈를 집어삼켰다. 니콜라이는 허리를 침대에 붙이지 못하고 배배 꼬며 몸을 떨고 있는 당신의 툭 튀어나온 배를 쓰다듬으며 이건 너만을 위한 서비스라고 말했다. <br>\"아파도 조금 참아, 자기야. 지금 너무 사랑스럽다.\"<br>그리고 그는 당신의 옆에서 노트북을 하기 시작했다."+
            "어두운 방안에서 니콜라이의 노트북만 빛나고 있다. 당신이 어떤 소리를 내고, 어떤 말을 하든 니콜라이는 고개만 기울일 뿐 애널비즈를 빼내주지는 않았다. 그는 당신이 어떤 반응을 보이든 즐기는 것처럼 보였다. 그렇게 더 시간이 흐르고, 당신의 애널이 애널비즈에 적응이 되었을 때야 니콜라이는 당신의 엉덩이에서 애널비즈를 빼주었다."+
            "애널비즈가 빠지면서 당신은 공허함을 느꼈다. 니콜라이는 그런 당신의 엉덩이를 몇 차례 주무르며 허전해졌냐고 물었다. <br>\"사랑스러워라.... 빨리 자기가 이런 거 없이는 못 사는 몸이 되었으면 좋겠다.\"<br>그는 당신의 머리를 쓰다듬어준 후 방밖으로 나갔다."
        ],
        debtPay: 50,
        minutes: 120,
        arousal: 20,
        stamina: -10,
        sensitivity :{
            aSensitivity : 30
        },
        trauma: 5,
        lust: 5,
        rage: -3,
        fear : 3
    },
    {
        text: {
            male : [
                "문이 열리고 니콜라이가 들어왔다. 그는 당신의 남성기를 들어올리더니 그대로 요도구멍에 카데터를 집어넣었다. 차가운 금속물질이 당신의 요도구멍에 들어온다... 당신은 너무 아파서 몸을 뒤틀었지만 니콜라이는 당신을 달래듯 쉬쉬 소리를 내며 당신의 허리를 팔꿈치로 억눌렀다. 결국 카데터는 끝까지 들어갔다. 니콜라이는 당신에게 참는 법도 배워야한다고 말하며 당신에게 물을 먹였다."+
                "강제로 물을 마신 당신은 배가 빵빵해질 때까지 물을 마셨다. 몰려오는 요의에 당신의 눈꼬리에 눈물이 맺혔다. 하지만 니콜라이는 당신의 아랫배를 누르며 오줌의 양을 확인한 후 당신의 옆에서 작업을 하기 시작했다. 몇 분이 지났을까, 당신은 결국 참지 못하고 흘려버렸다. 니콜라이는 혀를 차며 당신의 남성기를 정성스럽게 닦아주었다.<br>"+
                "\"아직 많이 배워야겠는걸.\"<br>그는 즐거워하는 목소리로 말했다. 그는 당신의 성기를 주무르며 카데타를 빼냈다. <br>\"오줌까지 지리고, 정말 나쁜 아이야, {title}.\""
            ],
            female : [
                "문이 열리고 니콜라이가 들어왔다. 그는 당신의 클리를 양손으로 잡고 벌렸다. 벌린 구멍에 얼굴을 들이대며 그는 당신의 보지 상태를 살폈다. 바들바들 떨리는 당신의 다리에 니콜라이는 웃으며 수치스럽냐고 물었다. <br>\"자랑스러워해야지. 이렇게 아름다운 구멍을 가졌는걸.\"<br>무언가를 찾듯이 그의 손가락이 당신의 보지 안으로 들어와서 내벽 이곳저곳을 꾹꾹 눌렀다. 손목까지 삼키기 직전인 당신의 보지는 고통스럽게 벌려져있다. 그의 손가락이 어느 한 지점을 눌렀을 때, 당신의 묶여있는 다리가 자지러졌다. 무릎을 제대로 굽히지도, 제대로 피지도 못한 채 벌벌 떠는 당신의 반응에 니콜라이는 환하게 웃었다.<br>"+
                "\"찾았다, 자기야.\"<br>그는 확인해보듯이 당신의 지스팟을 손가락으로 몇 번이고 눌렀다. 당신의 보지는 그의 손목을 품은 채 움찔움찔 벌렸다 오므리는 것을 반복했다. 당신의 보지가 경련하며 애액을 질질 흘리는 걸 확인한 니콜라이는 만족스러운 미소를 지으며 막대기 장치 하나를 가져왔다. 딜도 전동장치였다. 그는 그 딜도를 당신의 지스팟까지 푹 눌러꽂은 후 작동시켰다. 당신이 바르작거리며 몇 번이고 절정에 도달하는 동안 니콜라이는 노트북으로 작업을 했다."+
                "시간이 흘렀다. 연이은 절정에 당신의 눈은 공허해졌다. 니콜라이는 벌써 지쳤냐며 놀리듯이 물은 후 당신의 보지에서 진동딜도를 빼주었다. 진동딜도를 빼내자 당신의 보지는 배고픈 듯이 꿈지럭거렸다. 니콜라이는 당신의 보지를 몇 번 쓰다듬어준 후 방밖으로 나갔다."
            ]
        },
        debtPay: 50,
        minutes: 120,
        arousal: 20,
        stamina: -10,
        sensitivity :{
            cSensitivity : 30
        },
        trauma: 8,
        lust: 5,
        rage: -3,
        fear : 3
    }
];
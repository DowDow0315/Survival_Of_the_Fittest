const HOSPITAL_PRICES = {
    traumaCare: 1000,
    sensitivityUp: 100,
    sensitivityDownBase: 300,
    bodyModify: 30000,
    abominationRemoval : 3000
};

const HOSPITAL_SENSITIVITY_PARTS = {
    mSensitivity: "입",
    bSensitivity: "가슴",
    cSensitivity: "성기",
    aSensitivity: "항문"
};

const HOSPITAL_BODY_PARTS = {
    bSize: {
        name: "가슴 크기",
        values: ["작음", "보통", "큼", "거대함"]
    },
    mSize: {
        name: "입 크기",
        values: ["작음", "보통", "큼", "거대함"]
    },
    aSize: {
        name: "엉덩이 크기",
        values: ["작음", "보통", "큼", "거대함"]
    }
};

function saveHospitalPlayer(player){
    savePlayer(player);
}

function returnHospital(player){
    startScene(getLocationScene(player), player);
}

function clampHospitalValue(value, min, max){
    return Math.max(min, Math.min(max, value));
}

window.hospital_traumaCare = function(player){
    const price = HOSPITAL_PRICES.traumaCare;

    if (!spendGold(player, price)){
        showSingleTextScene("돈이 부족하다.", player);
        return;
    }

    player.status.trauma = clampHospitalValue(player.status.trauma - 10, 0, player.status.maxTrauma);

    const s = player.sexualTraits;
    s.mSensitivity += 3;
    s.bSensitivity += 3;
    s.cSensitivity += 3;
    s.aSensitivity += 3;

    passTime(player, 60);
    saveHospitalPlayer(player);

    showSingleTextScene(
        `당신은 ${price}G를 내고 치료를 받았다.<br><br>` +
        "의사는 당신을 침대에 눕게 했고, 당신은 앞에서 왔다갔다 하는 추를 바라봐야만 했다. 한 번, 두 번, 그리고 세 번.... 당신의 눈이 감겼다가 떠진다. 당신이 다시 눈을 떴을 때, 당신은 눈을 그저 깜박였다고 생각했는데 앞에 있던 의사는 진료가 이미 끝났으니 나가도 된다고 말했다. 당신은 눈을 몇 번이고 더 깜박였다. 놀랍게도 시간은 꽤 흘러있었고 당신의 마음도 가벼워진 듯했다." +
        "<br><br>무언가... 아예 잊어버린 기분이다. 통째로 기억이 몇 개 잘린 것같은 기분. 당신은 병원에서 나왔다.",
        player
    );
};

window.hospital_sensitivityMenu = function(player){
    startScene([
        {
            type: "text",
            value:
                "민감도 수술 안내문이 보인다.<br><br>" +
                "민감도 증가 시술 : 500G x 조정량<br>" +
                "민감도 감소 수술 : 2000G x 조정량<br><br>" +
                "어떤 수술을 받을까?"
        },
        {
            type: "choice",
            choices: [
                { text: "민감도를 증가시킨다", action: "hospital_sensitivityUpMenu" },
                { text: "민감도를 감소시킨다", action: "hospital_sensitivityDownMenu" },
                { text: "돌아간다", action: "hospital_back" }
            ]
        }
    ], player);
};

window.hospital_sensitivityUpMenu = function(player){
    showSensitivityPartMenu(player, "up");
};

window.hospital_sensitivityDownMenu = function(player){
    showSensitivityPartMenu(player, "down");
};

function showSensitivityPartMenu(player, mode){
    const choices = Object.keys(HOSPITAL_SENSITIVITY_PARTS).map(key => ({
        text: HOSPITAL_SENSITIVITY_PARTS[key],
        action: () => askSensitivityAmount(player, key, mode)
    }));

    choices.push({ text: "돌아간다", action: "hospital_sensitivityMenu" });

    startScene([
        {
            type: "text",
            value: "어느 부위를 수술할까?"
        },
        {
            type: "choice",
            choices
        }
    ], player);
}

function hospitalChangeSensitivity(player, key, mode, amount){
    const current = player.sexualTraits[key];

    if (mode === "down" && current <= 0){
        showSingleTextScene("이미 더 둔해질 수 없다.", player);
        return;
    }

    if (mode === "down"){
        amount = Math.min(amount, current);
    }

    const price =
        mode === "up"
            ? HOSPITAL_PRICES.sensitivityUp * amount
            : HOSPITAL_PRICES.sensitivityDownBase * amount;

    if (!spendGold(player, price)){
        showSingleTextScene("돈이 부족하다.", player);
        return;
    }

    player.sexualTraits[key] += mode === "up" ? amount : -amount;

    player.sexualTraits[key] = clampHospitalValue(
        player.sexualTraits[key],
        0,
        400
    );

    passTime(player, 90);
    changeTrauma(player, Math.ceil(amount / 20));
    saveHospitalPlayer(player);

    showSingleTextScene(
        `${price}G를 지불했다.<br><br>` +
        "의사는 당신을 수술대로 이끌었고, 수술대에 누운 당신은 날카로운 무언가가 당신을 향해 내려오는 것을 그대로 지켜봐야만 했다.... <br><br>위이이잉 <br><br>기계음이 귓가를 파고든다. 수술은 성공적으로 끝났지만, 그 소리만큼은 쉽게 잊히지 않을 거 같다." +
        `${HOSPITAL_SENSITIVITY_PARTS[key]}의 민감도가 ${amount} ${mode === "up" ? "증가" : "감소"}했다.`,
        player
    );
}

function askSensitivityAmount(player, key, mode){
    const amount = Number(prompt("얼마나 조정할까? 숫자로 입력하세요."));

    if (!Number.isInteger(amount) || amount <= 0){
        showSingleTextScene("올바른 숫자를 입력해야 한다.", player);
        return;
    }
    hospitalChangeSensitivity(player, key, mode, amount);
}

window.hospital_bodyModifyMenu = function(player){
    const choices = Object.keys(HOSPITAL_BODY_PARTS).map(key => ({
        text: HOSPITAL_BODY_PARTS[key].name,
        action: () => hospitalBodyPartMenu(player, key)
    }));

    choices.push({ text: "돌아간다", action: "hospital_back" });

    startScene([
        {
            type: "text",
            value:
                "의사는 신체 개조 목록을 보여주었다.<br><br>" +
                `기본 수술비 : ${HOSPITAL_PRICES.bodyModify}G<br><br>` +
                "무엇을 바꿀까?"
        },
        {
            type: "choice",
            choices
        }
    ], player);
};

function hospitalBodyPartMenu(player, key){
    const part = HOSPITAL_BODY_PARTS[key];

    const choices = part.values.map(value => ({
        text: value,
        action: () => hospitalChangeBody(player, key, value)
    }));

    choices.push({ text: "돌아간다", action: "hospital_bodyModifyMenu" });

    startScene([
        {
            type: "text",
            value:
                `${part.name}를 어떻게 바꿀까?<br><br>` +
                `현재 상태 : ${player.sexualTraits[key]}`
        },
        {
            type: "choice",
            choices
        }
    ], player);
}

function hospitalChangeBody(player, key, value){
    const price = HOSPITAL_PRICES.bodyModify;

    if (player.sexualTraits[key] === value){
        showSingleTextScene("이미 그 상태다.", player);
        return;
    }

    if (!spendGold(player, price)){
        showSingleTextScene("돈이 부족하다.", player);
        return;
    }

    player.sexualTraits[key] = value;

    passTime(player, 180);
    saveHospitalPlayer(player);

    showSingleTextScene(
        `${price}G를 지불했다.<br><br>` +
        "의사는 마스크를 쓴 채 당신에게 다가와 마취주사를 놓았다. 당신이 눈을 깜박였을 때 수술은 이미 끝나있었다. 당신은 당신의 몸을 내려다보았다. 당신의 몸은 이미 이전과 달라져있었다.",
        player
    );
}

window.hospital_back = function(player){
    returnHospital(player);
};

window.hospital_abominationRemoval = function(player){
    const price = HOSPITAL_PRICES.abominationRemoval;

    if (!player.abomination?.active){
        showSingleTextScene("당신의 몸에는 제거할 흉물이 없다.", player);
        return;
    }

    if (!spendGold(player, price)){
        showSingleTextScene("돈이 부족하다.", player);
        return;
    }

    const loss = player.abomination.statLoss || {};
    const strGain = player.abomination.strGain || 0;

    player.stats.dex = (player.stats.dex || 0) + (loss.dex || 0);
    player.stats.int = (player.stats.int || 0) + (loss.int || 0);
    player.stats.charm = (player.stats.charm || 0) + (loss.charm || 0);

    player.stats.str = (player.stats.str || 0) - strGain;

    player.abomination = {
        active: false,
        infectedAt: null,
        birthAt: null,
        lastTick: null,
        statLoss: {
            dex: 0,
            int: 0,
            charm: 0
        },
        strGain: 0
    };

    passTime(player, 360);
    updateDerivedStats(player);
    saveHospitalPlayer(player);

    showSingleTextScene(
        "흉물을 제거하고 싶다는 당신의 말에 의사는 놀라더니 목소리를 낮췄다. 그는 청진기로 당신의 배를 살피더니 굳은 얼굴로 당신을 가장 깊숙한 방으로 안내했다." +
        `${price}G를 지불했다.<br><br>` +
        "의사는 당신을 수술대 위에 눕혔다. 차가운 마취제가 혈관을 타고 퍼지고, 의식이 어둠 속으로 가라앉는다.<br><br>" +
        "눈을 떴을 때 당신의 아랫배에는 길고 얇은 봉합 자국이 남아 있었다. 몸 안쪽을 짓누르던 끔찍한 박동은 더 이상 느껴지지 않는다.<br><br>" +
        "흉물이 제거되었다.<br>잠식으로 변한 능력치가 원래대로 돌아왔다.",
        player
    );
};

//강제입원
function startRaphaelForcedHospitalization(player){
    player.flags = player.flags || {};

    const severe = player.status.trauma >= 90;

    startScene([
        {
            type: "text",
            value: severe
                ? "라파엘은 당신을 발견하자마자 당신에게 다가왔다. 당신이 눈을 한번 깜박였을 때 이미 그는 당신의 앞에 있었다. 그는 당신의 어깨를 부드럽게 눌러잡으며 웃었다. <br><br>\"다 괜찮아질 겁니다... 제가 당신을 버리지 않을 거니까요.\""
                : "라파엘은 당신을 발견하자마자 당신에게 다가왔다. 그는 슬픔이 가득한 목소리로 말했다. <br><br>\"더 이상은 두고 볼 수 없습니다, 가여운 영혼이여....\"<br><br>목소리와 다르게 그의 하얀색 눈동자는 평소와 똑같았다. 그저 동공이 보이지 않아 당신의 모습이 그대로 비칠 뿐. <br><br>\"모든 사람은 사랑받을 자격이 있습니다.\""
        },
        {
            type: "choice",
            choices: [
                { text: "힘으로 뿌리친다", action: "raphael_resist_str" },
                { text: "몸을 빼서 도망친다", action: "raphael_resist_dex" },
                { text: "말로 설득한다", action: "raphael_resist_talk" },
                { text: "얌전히 따른다", action: "raphael_hospitalized_start" }
            ]
        }
    ], player);
}

function raphaelAbilityCheck(player, stat, difficulty){
    const value = getTotalStat(player, stat);
    const roll = Math.floor(Math.random() * 20) + 1;

    return value + roll >= difficulty;
}

function escapeRaphaelHospital(player){
    player.location = "richTownStreet";
    passTime(player, 10);
    saveHospitalPlayer(player);

    showSingleTextScene(
        "당신은 가까스로 라파엘의 손을 뿌리칠 수가 있었다. 병원을 나서면서 뒤를 돌아보았을 때 당신은 그의 괴기한 미소를 보았다. 아니, 어쩌면 평소와 같은 미소였을지도 모른다. 그의 하얀색 눈동자는 당신에게서 한순간도 떨어지지 않고 있다.... 당신이 병원을 박차고 나갈 때까지도.",
        player,
        {
            onEnd: () => startScene(getLocationScene(player), player)
        }
    );
}

function failRaphaelEscape(player){
    showSingleTextScene(
        "당신은 저항하려고 했지만 라파엘의 손아귀에서 벗어날 수가 없었다. 그는 당신을 큰 덩치로 품으며 자장가라도 불러주는 것처럼 속삭였다. <br><br>\"걱정마세요... 당신은 괜찮아질 겁니다. 모두가 그랬듯이.\"",
        player,
        {
            onEnd: () => startRaphaelHospitalRoom(player)
        }
    );
}

window.raphael_resist_str = function(player){
    const diff =
        player.status.trauma >= 90 ? 45 : 35;

    if (raphaelAbilityCheck(player, "str", diff)){
        escapeRaphaelHospital(player);
    } else {
        failRaphaelEscape(player);
    }
};

window.raphael_resist_dex = function(player){
    const diff =
        player.status.trauma >= 90 ? 45 : 35;

    if (raphaelAbilityCheck(player, "dex", diff)){
        escapeRaphaelHospital(player);
    } else {
        failRaphaelEscape(player);
    }
};

window.raphael_resist_talk = function(player){
    const diff =
        player.status.trauma >= 90 ? 50 : 40;

    const intOk =
        raphaelAbilityCheck(player, "int", diff);

    const charmOk =
        raphaelAbilityCheck(player, "charm", diff);

    if (intOk || charmOk){
        escapeRaphaelHospital(player);
    } else {
        failRaphaelEscape(player);
    }
};

window.raphael_hospitalized_start = function(player){
    startRaphaelHospitalRoom(player);
};

function initRaphaelHospitalState(player){
    player.flags = player.flags || {};
    player.flags.raphaelEscapeProgress = player.flags.raphaelEscapeProgress || 0;
}

function startRaphaelHospitalRoom(player){
    player.flags = player.flags || {};
    player.flags.raphaelHospitalized = true;

    saveHospitalPlayer(player);

    startScene([
        {
            type: "text",
            value:
                "눈을 떴을 때, 당신은 새하얀 병실 침대 위에 누워 있었다.<br><br>" +
                "손목에는 얇은 구속구가 채워져 있었다.<br><br>" +
                "문밖에서 클래식 음악이 희미하게 들려온다."
        },
        {
            type: "choice",
            choices: [
                { text: "치료를 받는다", action: "raphael_hospitalTreatment" },
                { text: "탈출을 시도한다", action: "raphael_escapePrepare" }
            ]
        }
    ], player);
}

function applyRaphaelSensitivity(player, amount){
    const s = player.sexualTraits;
    s.mSensitivity = clampHospitalValue(s.mSensitivity + amount, 0, 400);
    s.bSensitivity = clampHospitalValue(s.bSensitivity + amount, 0, 400);
    s.cSensitivity = clampHospitalValue(s.cSensitivity + amount, 0, 400);
    s.aSensitivity = clampHospitalValue(s.aSensitivity + amount, 0, 400);
}

function pickRaphaelEvent(events){
    return events[Math.floor(Math.random() * events.length)];
}

window.raphael_hospitalTreatment = function(player){
    initRaphaelHospitalState(player);

    const event = pickRaphaelEvent(RAPHAEL_TREATMENT_EVENTS);

    changeTrauma(player, event.trauma);
    applyRaphaelSensitivity(player, event.sensitivity);
    changeEmotion("raphael", "affection", 2);
    passTime(player, event.minutes);

    saveHospitalPlayer(player);

    if (player.status.trauma < 20){
        player.flags.raphaelHospitalized = false;
        player.flags.raphaelEscapeProgress = 0;
        saveHospitalPlayer(player);

        showSingleTextScene(
            event.text +
            "하얀색 연기 속, 멍하니 침대에 누워있는 당신에게 라파엘이 다가왔다. 그는 당신을 소중한 아이마냥 끌어안더니 당신에게 이제 괜찮다고 속삭였다. <br><br>\"당신은 나았습니다.\"<br><br>"+
            "그는 당신에게 마지막까지 자신을 사랑하는 법을 잊으면 안 된다고 말했다. 그는 친절하게 당신을 병원 현관까지 마중해주었다. <br><br>\"다시 만날 일이....\"" +
            "<br><br>그는 분명 무어라 당신에게 말을 했다. 하지만 당신은 그 문장의 끝이 '없기를 바랍니다'였는지 '있기를 바랍니다'였는지 확신이 서지 않았다. 어쨌든 당신은 그에게서 탈출했다.",
            player,
            {
                onEnd: () => {
                    player.location = "royalHospital";
                    saveHospitalPlayer(player);
                    startScene(getLocationScene(player), player);
                }
            }
        );
        return;
    }

    showSingleTextScene(
        event.text +
        `<br><br>트라우마가 감소했다.<br>민감도가 ${event.sensitivity} 증가했다.`,
        player,
        {
            onEnd: () => startRaphaelHospitalRoom(player)
        }
    );
};

window.raphael_escapePrepare = function(player){
    initRaphaelHospitalState(player);

    const affection = NPC_DATA["raphael"].emotion.affection || 0;
    const successChance = clampHospitalValue(30 + affection, 10, 90);

    const noticed = Math.random() * 100 >= successChance;

    let escapeText = "";

    if (noticed){
        escapeText =
            "당신은 이불보로 내려갈 끈을 만들고 있었다. 당신은 라파엘이 오기 전에 재빨리 이불보를 숨겼지만, 라파엘은 당신의 표정에서 무언가를 읽은 듯하다. 그는 당신에게 다가오더니 당신이 숨긴 이불보를 부드럽게 빼앗아들었다. <br><br>\"괜찮습니다. 당신은 아직 아프니까요.\"";
    } else {
        const progressGain = Math.floor(Math.random() * 21) + 15;
        player.flags.raphaelEscapeProgress += progressGain;

        escapeText =
            "당신은 이불보를 묶어 끈을 만들었다. 그리고 당신은 라파엘이 오기 전에 재빨리 이불보를 숨겼다. 방으로 들어온 라파엘은 조금은 미심쩍은 얼굴로 당신을 바라보았지만 곧 미소를 지으며 당신의 어깨를 잡아끌었다. 교육의 시간이다." +
            `탈출 준비 진도 : ${player.flags.raphaelEscapeProgress}%`;
    }

    if (player.flags.raphaelEscapeProgress >= 100){
        player.flags.raphaelEscapeProgress = 100;
        passTime(player, 30);
        saveHospitalPlayer(player);

        showSingleTextScene(
            escapeText +
            "<br><br>마침내 충분한 길이의 끈이 완성되었다.",
            player,
            { onEnd: () => startRaphaelWindowEscape(player) }
        );
        return;
    }

    const event = pickRaphaelEvent(RAPHAEL_RESIST_TREATMENT_EVENTS);

    changeTrauma(player, event.trauma);
    applyRaphaelSensitivity(player, event.sensitivity);
    changeEmotion("raphael", "affection", -1);
    passTime(player, event.minutes);

    saveHospitalPlayer(player);

    showSingleTextScene(
        escapeText +
        "<br><br>당신의 저항은 곧 치료 과정에 기록되었다.<br><br>" +
        event.text +
        `<br><br>트라우마가 감소했다.<br>민감도가 ${event.sensitivity} 증가했다.`,
        player,
        { onEnd: () => startRaphaelHospitalRoom(player) }
    );
};

function startRaphaelWindowEscape(player){
    startScene([
        {
            type: "text",
            value:
                "당신은 이불보로 만든 끈을 창틀에 묶었다. 손바닥이 쓸리고, 다리가 떨린다. 하지만 돌아갈 수는 없다.<br><br>" +
                "당신은 창문 밖으로 몸을 던지듯 내려갔다. 발이 바닥에 닿는 순간, 경비병의 목소리가 들렸다.<br><br>" +
                "\"거기, 멈춰!\""
        },
        {
            type: "choice",
            choices: [
                { text: "경비병을 따돌린다", action: "raphael_window_escape_dex" },
                { text: "경비병을 밀치고 나아간다", action: "raphael_window_escape_str" },
                { text: "눈웃음으로 봐달라고 한다", action: "raphael_window_escape_charm" },
                { text: "다 나은 환자라고 속인다", action: "raphael_window_escape_int" }
            ]
        }
    ], player);
}

function raphaelWindowEscapeCheck(player, stat){
    return raphaelAbilityCheck(player, stat, 25);
}

function raphaelEscapeComplete(player){
    player.flags.raphaelHospitalized = false;
    player.flags.raphaelEscapeProgress = 0;
    player.location = "richTownStreet";

    passTime(player, 20);
    saveHospitalPlayer(player);

    startScene(getLocationScene(player), player);
}

window.raphael_window_escape_dex = function(player){
    if (raphaelWindowEscapeCheck(player, "dex")){
        raphaelDexEscapeSuccess(player);
    } else {
        raphaelDexEscapeFail(player);
    }
};
function raphaelDexEscapeSuccess(player){
    showSingleTextScene(
        "당신은 당신을 잡으려는 경비병의 손을 피해서 어떻게든 도망갔다. 당신은 뒤도 돌아보지 않고 달렸다. 병원에서 멀리 떨어지고 나서야 뒤를 돌았을 때, 순간 당신의 귀에 비명소리가 들렸다. 경비원의 비명소리일까? 너무 짧아서 당신이 정말로 경비병의 비명소리를 들은 건지, 아니면 환청이었는지도 구분이 되지 않는다. 당신이 확신할 수 있는 건 당신이 탈출에 성공했다는 거, 그거 하나였다.",
        player,
        {
            onEnd : () => raphaelEscapeComplete(player)
        }
    );
}
function raphaelDexEscapeFail(player){
    showSingleTextScene(
        "당신은 당신에게로 뻗어오는 경비병의 손을 피하려고 했지만 피할 수 없었다. 경비병은 당신에게 가만히 있으라고 말하며 당신을 다시 끌고 갔다. 경비병에게 끌려온 당신을 보며 라파엘은 안타깝다는 듯이 말했다. <br><br>\"괜찮습니다. 저는 절대 당신을 버리지 않을 테니까요.\"<br><br>당신은 다시 병동으로 돌아왔다...",
        player,
        {
            onEnd : () => startRaphaelHospitalRoom(player)
        }
    );
}

window.raphael_window_escape_str = function(player){
    if (raphaelWindowEscapeCheck(player, "str")){
        raphaelStrEscapeSuccess(player);
    } else {
        raphaelStrEscapeFail(player);
    }
};
function raphaelStrEscapeSuccess(player){
    showSingleTextScene(
        "당신은 경비병을 퍽 치고 달려나갔다. 그림자가 비틀거리면서 꼬였던 걸 보니 경비병은 당신의 힘에 넘어졌던 모양이다. 당신은 뒤도 돌아보지 않고 달렸다. 병원에서 멀리 떨어지고 나서야 뒤를 돌았을 때, 순간 당신의 귀에 비명소리가 들렸다. 경비원의 비명소리일까? 너무 짧아서 당신이 정말로 경비병의 비명소리를 들은 건지, 아니면 환청이었는지도 구분이 되지 않는다. 당신이 확신할 수 있는 건 당신이 탈출에 성공했다는 거, 그거 하나였다.",
        player,
        {
            onEnd : () => raphaelEscapeComplete(player)
        }
    );
}
function raphaelStrEscapeFail(player){
    showSingleTextScene(
        "당신은 당신에게로 달려드는 경비병을 쳐내려고 했지만 경비병이 더 강했다. 경비병은 당신의 손을 꺾어 제압하더니 가만히 있으라고 말하며 당신을 다시 끌고 갔다. 경비병에게 끌려온 당신을 보며 라파엘은 안타깝다는 듯이 말했다. <br><br>\"폭력이라니... 물론 폭력도 사랑의 한 방식이긴 하지만 그것부터 깨우치다니 마음이 아프군요.\"<br><br>당신은 다시 병동으로 돌아왔다...",
        player,
        {
            onEnd : () => startRaphaelHospitalRoom(player)
        }
    );
}

window.raphael_window_escape_charm = function(player){
    if (raphaelWindowEscapeCheck(player, "charm")){
        raphaelCharmEscapeSuccess(player);
    } else {
        raphaelCharmEscapeFail(player);
    }
};
function raphaelCharmEscapeSuccess(player){
    showSingleTextScene(
        "당신의 눈웃음에 경비병의 귀끝이 붉어졌다. 그는 헛기침을 하더니 슬쩍 당신의 눈을 피했다. 눈 감아줄 생각인가 보다. 그리고 당신은 경비병의 뒤에서 평소보다 더 크게 느껴지는 라파엘을 보았다. 그는 웃고 있었다. 당신이 아니라 경비병을 보고... 당신은 도망쳤다. 그 경비병이 어떻게 됐을지는 모르겠다. 당신이 확신할 수 있는 건 당신이 탈출에 성공했다는 거, 그거 하나뿐이었다.",
        player,
        {
            onEnd : () => raphaelEscapeComplete(player)
        }
    );
}
function raphaelCharmEscapeFail(player){
    showSingleTextScene(
        "경비병은 당신같이 아름다운 사람은 꼭 치료를 받아야 한다고 말하며 당신을 다시 병동으로 끌고 갔다. 경비병에게 끌려온 당신을 보며 라파엘은 안타깝다는 듯이 말했다. <br><br>\"자신의 몸 가치만 아는 사람이라니, 안타깝군요....\"<br><br>당신은 다시 병동으로 돌아왔다...",
        player,
        {
            onEnd : () => startRaphaelHospitalRoom(player)
        }
    );
}

window.raphael_window_escape_int = function(player){
    if (raphaelWindowEscapeCheck(player, "int")){
        raphaelIntEscapeSuccess(player);
    } else {
        raphaelIntEscapeFail(player);
    }
};
function raphaelIntEscapeSuccess(player){
    showSingleTextScene(
        "당신의 논리적인 말에 경비병은 넘어간 듯 고개를 끄덕였다. 그가 라파엘에게 연락을 취하는 동안 당신은 슬금슬금 물러나서 병원 멀리로 튀었다. 당신은 뒤로 돌았다. 아무도 쫓아오지 않는다.... 하지만 그 순간, 당신은 병원 옥상에서 누군가를 보았다. 옅은 민트색 머리카락, 그리고 새하얀 눈... 라파엘은 너무 멀리 떨어져 있어서 표정조차 보이지 않았다. 그런데 이상하게도, <br><br>당신은 그가 웃고 있다는 사실만큼은 확신할 수 있었다.",
        player,
        {
            onEnd : () => raphaelEscapeComplete(player)
        }
    );
}
function raphaelIntEscapeFail(player){
    showSingleTextScene(
        "경비병은 당신의 말을 믿지 않았다. 그는 그런 말은 라파엘의 앞에서 하라고 말하며 다시 당신을 병동으로 끌고 갔다. 경비병에게 끌려온 당신을 보며 라파엘은 안타깝다는 듯이 말했다. <br><br>\"괜찮아요. 어리석은 양들을 이끄는 것이 저의 의무니까요.\"<br><br>당신은 다시 병동으로 돌아왔다...",
        player,
        {
            onEnd : () => startRaphaelHospitalRoom(player)
        }
    );
}

const RAPHAEL_TREATMENT_EVENTS = [
    {
        text:
            "라파엘은 당신과 다른 환자를 만나게 했다. 그는 당신은 이 환자에게 사랑받는 거라고 말하며 당신을 환자의 품안에 안기게 했다. 당신은 환자의 품안에 안긴 채 환자를 올려다보았다. 환자의 눈이 멍하다. 그리고 환자의 눈에 비친 당신의 눈도 멍하다.... 당신의 흐려진 시선이 침대 옆의 테이블로 향했다. 향초가 하나 피어오르고 있다." +
            " 당신과 환자는 라파엘의 감시 아래에서 서로의 몸을 만져야만 했다. 라파엘은 계속 당신에게 당신은 지금 사랑받고 있는 거라고 속삭였다. 점점 손동작이 빨라진다. 환자는 헉헉거리며 자신의 몸을 당신의 몸에 적극적으로 비비기 시작했다. 그리고 당신도, 그 환자에게 적극적으로 몸을 비비고 있었다. 당신과 환자는 서로의 즙이 서로의 배에 튈 때까지 계속 애무를 했다. 마치 사랑하는 연인처럼." +
            "<br>라파엘은 당신과 환자가 몇 번이고 즙을 서로의 몸에 튀기고 나서야 멈추게 했다. 그는 자랑스럽다는 듯이 환자와 당신의 머리를 쓰다듬었다." +
            "<br><br>\"당신들은 사랑받을 자격이 있는 존재입니다...\"" +
            "<br><br>당신은 다시 당신의 방으로 돌아왔다. 라파엘은 마지막까지 미소로 당신을 품어주었다.",
        trauma: -12,
        sensitivity: 8,
        minutes : 240,
    },
    {
        text:
            "라파엘은 당신에게 당신 스스로가 당신을 사랑해야 한다고 말했다. 그는 당신의 앞으로 시게추를 흔들어보였다. 당신은 강제로 그 시계추를 바라보아야만 했다." +
            "<br><br>\"당신은 누구보다도 당신을 사랑합니다. 당신은 누구보다도 당신을 사랑하는 방법을 잘 알고 있습니다.\"<br><br>" +
            "라파엘의 손이 당신의 손을 부드럽게 잡더니 그대로 당신의 몸을 쓰다듬기 시작했다. 당신의 손이 그의 의도대로 당신의 몸을 쓸어넘기고 애무하고, 심지어 쑤시기까지 했다. 그런데도 당신의 의식은 마치 물속에 풍덩 빠져버린 것처럼 멍멍하기만 했다. 라파엘이 하는 이 일이, 정말로 당신을 사랑해서 하는 일처럼 느껴진다." +
            "아니. 그는 당신을 사랑해서 하는 일이 맞다. 당신은 당신을 더 사랑해야만 한다. 당신은 그렇게 몇 번이고 당신의 손으로 절정했다. 라파엘은 이제 스스로도 자위를 하는 당신의 모습을 지켜보며 웃었다." +
            "<br>다시 방으로 돌아왔을 때 당신의 온몸은 끈적끈적했다...",
        trauma: -15,
        sensitivity: 10,
        minutes : 300,
    },
    {
        text:
            "라파엘은 당신에게 두려워할 필요가 없다고 말했다. 그는 당신의 머리를 쓰다듬으며 당신은 누구에게나 사랑받을 수 있는 존재라고 말했다. 그의 말이 점점 교리처럼 당신에게 와닿기 시작한다. 그래. 당신은 인간뿐만 아니라 모두에게 사랑을 받아야 한다..." +
            " 당신은 눈을 깜박였다. 당신은 네 발로 엎드려있었고 당신의 뒤에서는 누군가가 헉헉거리며 당신의 구멍에 박아대고 있었다. 누군가는 당신을 정말 사랑한다는 듯이 당신의 목을 핥고, 어깨에 머리를 부빗거리고, 행복하게 짖어댔.... 짖었다고? 그 순간 당신은 라파엘과 시선을 마주했다. 그의 하얀색 동공이 당신을 깊은 수렁으로 빠져들게 만든다." +
            "<br>당신은 사랑받고 있다. 당신은 계속 사랑받고 있다. 당신은 행복하다. 당신은 당신도 모르는 사이에 누군가와 똑같이 인간의 언어가 아닌 말을 짖어대며 엉덩이를 흔들었다." +
            "<br>다시 방으로 돌아왔을 때, 당신의 온몸은 정액와 침으로 끈적끈적했다...",
        trauma: -10,
        sensitivity: 5,
        minutes : 200
    }
];

const RAPHAEL_RESIST_TREATMENT_EVENTS = [
    {
        text:
            "라파엘은 아쉬운 목소리로 당신을 달래려고 노력했다. <br><br>\"무지는 죄가 아닙니다. 하지만 스스로를 사랑하지 않는 것은 죄지요.\"<br><br>라파엘은 당신에게 약을 강제로 먹였다. 당신은 삼키지 않으려고 했지만 라파엘은 당신의 숨을 막아서 억지로 삼키게 만들었다. 약을 삼키고 당신의 몸은 물을 먹은 솜마냥 무거워졌다." +
            " 열이 난다. 라파엘은 당신의 몸을 닦아주며 부드러운 노래를 불러주었다. 열기가 당신의 민감한 부위에 더 몰린다. 당신은 다리를 꼬려고 하자 라파엘은 있는 그대로의 당신을 받아들여야 당신이 스스로를 사랑할 수 있게 된다고 말하며 당신의 다리를 다시 벌렸다. 무엇 하나 하지 못한 채 당신은 집중된 열기를 버텨야만 했다." +
            "<br>길고 길었던 노래가 끝나고 그는 식은땀으로 범벅인 당신의 몸을 구석구석 닦아주었다. 그는 나가기 전에 당신에게 속삭였다, 당신이 더 나아지기를 바란다고. 그의 목소리는 전혀 쉬지 않았다.",
        trauma: -2,
        sensitivity: 2,
        minutes: 240
    },
    {
        text:
            "라파엘은 당신을 구속구로 단단히 묶더니 위에서 추를 흔들었다. 하나, 둘, 셋.... 당신이 시선을 다른 곳으로 돌리려고 해도 당신의 시선이 어디 있든 추는 당신의 시선을 쫓아왔다. 몇 번 추가 움직였을까, 당신은 당신의 몸위로 벌레가 기어다니는 듯한 느낌을 받았다. 당신은 몸부림을 쳤다. 하지만 라파엘은 당신의 몸부림을 가만히 내려다보고 있기만 했다. 벌레들이 당신의 몸을 파고든다. 당신의 약한 부분도 파고든다..." +
            "<br>당신의 비명이 멎은 후, 라파엘은 당신이 스스로를 사랑할 준비가 될 때까지 당신은 고통만 느낄 거라고 말했다. 그는 당신을 구속구에서 풀어주었다.",
        trauma : 3,
        sensitivity: 1,
        minutes: 300
    },
    {
        text: 
            "\"이곳은 안전한 곳입니다.\"<br><br>라파엘은 당신의 몸에 무언가를 바른 후, 당신을 X자로 진동기계에 묶었다. 진동기계의 시트에 닿았을 뿐인데 약 때문인지 당신의 몸이 움찔거렸다. 간지럽다. 너무 간지럽다. 뭔가가 당신을 긁어줬으면 좋겠다. 당신은 본능적으로 몸을 꼬기 시작했다. 라파엘은 미소를 지으며 버튼을 눌렀다. 지잉, 하는 소리와 함께 당신의 온몸이 진동하기 시작했다. 그리고 툭 튀어나온 바퀴가 당신의 성기에 대고 회전을 하기 시작했다. 바퀴에는 구슬이 달려있었다." +
            " 엉덩이에마저 구슬 달린 바퀴가 붙으며 당신은 앞뒤로 액을 쏟아내기 시작했다. 라파엘은 당신이 애액을 앞뒤로 뿜어내는 동안 의료 차트를 보며 환자들의 사항을 체크했다. 지옥? 천국? 아니, 라파엘. 라파엘의 시간이 끝났다.... 그는 당신을 기계에서 풀어준 후 추욱 늘어진 당신의 몸을 안아서 침대로 향했다." +
            "<br><br>\"즐거우셨습니까?\"<br><br>그는 언제나처럼 웃고 있다.<br><br>\"만약 저항을 멈춘다면, 천국의 시간을 보내게 해드리죠. 약속하겠습니다.\"<br><br>라파엘은 뻗은 당신의 머리를 쓰다듬어준 후 방밖으로 나갔다.",
        trauma: -4,
        sensitivity: 4,
        minutes: 360
    }
];
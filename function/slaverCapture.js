function startSlaverCapture(player, options = {}){
    if (player.slaverRaid){
        player.slaverRaid.active = false;
    }

    player.slaverCapture = {
        active: true,
        reason: options.reason || "battle",
        sanity: 100,
        stress: 0,
        escapeProgress: 0,
        escapeTarget: 8,
        turn: 0
    };

    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "눈을 떴을 때 당신은 우리에 갇혀있었다." +
                "<br>당신은 직감했다. 이곳에서 당신은 더 이상 인간이 아니다."
        }
    ], player, {
        onEnd: () => showSlaverCaptureChoice(player)
    });
}

function changeSlaverCaptureStats(player, sanityDelta, stressDelta){
    const cap = player.slaverCapture;
    if (!cap) return;

    cap.sanity = Math.max(0, Math.min(100, cap.sanity + sanityDelta));
    cap.stress = Math.max(0, Math.min(100, cap.stress + stressDelta));

    savePlayer(player);

    if (cap.sanity <= 0){
        slaverCaptureGameOver(player, "sanity");
        return true;
    }

    if (cap.stress >= 100){
        slaverCaptureGameOver(player, "stress");
        return true;
    }

    return false;
}

function getSlaverCaptureStatusHTML(player){
    const cap = player.slaverCapture;

    return `
        <div class="slaver-capture-status">
            <div>정신도</div>
            <div class="capture-bar">
                <div class="capture-bar-fill sanity" style="height:${cap.sanity}%"></div>
            </div>
            <div>${cap.sanity}/100</div>

            <br>

            <div>스트레스</div>
            <div class="capture-bar">
                <div class="capture-bar-fill stress" style="height:${cap.stress}%"></div>
            </div>
            <div>${cap.stress}/100</div>

            <br>
            <div>탈출 진행도: ${cap.escapeProgress}/${cap.escapeTarget}</div>
        </div>
    `;
}

function showSlaverCaptureChoice(player){
    const cap = player.slaverCapture;

    startScene([
        {
            type: "text",
            value:
                getSlaverCaptureStatusHTML(player) +
                "<br><br>당신은 아직 완전히 무너지지 않았다. 무엇을 할까?"
        },
        {
            type: "choice",
            choices: [
                { text: "탈출을 시도한다", action: "slaver_capture_try_escape" },
                { text: "처우를 받아들인다", action: "slaver_capture_submit" }
            ]
        }
    ], player);
}

window.slaver_capture_try_escape = function(player){
    if (changeSlaverCaptureStats(player, +15, +15)) return;

    startArrowMinigame(player, {
        target: 1,
        sequenceLength: 6,
        timeLimit: 4000,
        title: "감시의 눈을 피해 우리에서 나와라",
        successText: "당신은 조금씩 탈출 준비를 진행했다.",
        failText: "움직임을 들켰다. 인신매매상이 당신에게 다가오더니 당신의 몸에 채찍질을 가했다. 고통스러운 채찍질 끝에 남은 건 당신의 흐느끼는 소리뿐이었다.",
        onClear: () => {
            player.slaverCapture.escapeProgress++;

            if (player.slaverCapture.escapeProgress >= player.slaverCapture.escapeTarget){
                slaverCaptureEscapeSuccess(player);
                return;
            }

            savePlayer(player);
            startSlaverCaptureEvent(player);
        },
        onStepFail: () => {
            changeSlaverCaptureStats(player, -5, +10);
            startSlaverCaptureEvent(player);
        }
    });
};

window.slaver_capture_submit = function(player){
    if (changeSlaverCaptureStats(player, -15, -15)) return;
    startSlaverCaptureEvent(player);
};

function startSlaverCaptureEvent(player){
    if (changeSlaverCaptureStats(player, -5, +5)) return;

    const eventId = pickWeighted([
        { id: "slaverCapture_training", weight: 25 },
        { id: "slaverCapture_submissiontraining", weight: 25 },
        { id: "slaverCapture_prostitute", weight: 25 }
    ]);

    runSlaverCaptureEvent(player, eventId);
}

function runSlaverCaptureEvent(player, eventId){
    if (eventId === "slaverCapture_training"){
        startScene([
            {
                type: "text",
                value: {
                    male : [
                        getSlaverCaptureStatusHTML(player) +
                        "인신매매상은 당신을 최고의 상품으로 만들기 위해 당신을 삼각목마 위에 올렸다. 삼각목마에 앉자마자 당신의 중심부가 비명을 질렀다. 당신은 고통스러워서 몸을 비틀었지만 몸을 비틀수록 삼각목마의 딱딱한 부분이 당신의 중심부를 더 자극했다." +
                        " 당신이 고통스러워서 몸을 비트는 동안 그는 애널 구멍에 드릴같은 것을 쑤셔박았다. 드릴처럼 삼각형 모양이었지만 끝은 뾰족하지 않고 층이 나눠져있었다. 성기구가 당신의 애널 안에서 돌아간다. 당신의 몸은 삼각목마 위에서 팔딱거렸다, 어떤 움직임이든 당신에게는 더한 고통이 되어 돌아왔지만." +
                        "<br>시간이 지나면 지날수록 당신의 아랫배는 뜨거워졌다. 분명 고통뿐이라고 생각했는데 성기구의 각도가 틀어지자 고통과는 다른 감각으로 허리가 뻣뻣하게 설 때가 있었다. 인신매매상은 당신의 그런 반응을 놓치지 않았다." +
                        "<br>위이잉. 성기구는 계속 당신의 애널 안에서 돌아간다. 성기구가 당신의 애널에 층마다 각기 다른 강도로 파고드는 동안 인신매매상은 당신의 남성기를 막아버렸다. 구멍 뚫린 고기가 되어 당신은 삼각목마 위에서 흔들렸다. 몇 시간이고 이어지는 고통과 인정하고 싶지 않은 감각의 시간 속에서 당신은 인간의 언어를 잃어버리고 말았다." +
                        " 당신이 낼 수 있는 소리는 신음 소리와 비명 소리뿐이었다. 멈춰달라고 빌고 싶어도 당신에게 말할 권리는 없었다. 당신의 입술이 조금이라도 단어를 형성하려고 하자 인신매매상은 당신의 입에도 성기구를 박아버렸다. 그 성기구는 네모나게 길었다. 당신이 몸부림칠 수록 긴 성기구가 당신의 목구멍을 찌른다." +
                        "<br><br><br>...그 지옥같은 시간에서도 당신은 몇 번 절정을 했다."
                    ],
                    female : [
                        getSlaverCaptureStatusHTML(player) +
                        "인신매매상은 당신을 최고의 상품으로 만들기 위해 당신을 삼각목마 위에 올렸다. 삼각목마에 앉자마자 당신의 중심부가 비명을 질렀다. 당신은 고통스러워서 몸을 비틀었지만 몸을 비틀수록 삼각목마의 딱딱한 부분이 당신의 중심부를 더 자극했다." +
                        " 당신이 고통스러워서 몸을 비트는 동안 그는 당신의 양구멍에 드릴같은 것을 쑤셔박았다. 그 성기구는 드릴처럼 삼각형 모형이었지만 모난 곳이 없게 층이 나눠져있었고 끝은 뭉툭했다. 성기구가 당신의 보지와 애널 안에서 돌아간다. 당신의 뜨겁고 말랑말랑한 내벽을 각기 다른 각도와 강도로 자극하는 성기구에 당신의 입에서는 인간보다는 짐승에 가까운 소리가 흘러나왔다." +
                        " 인신매매상이 성기구의 각도를 튼 순간, 당신의 허리가 지금까지와는 다른 느낌으로 튕겼다. 당신의 반응에 인신매매상의 움직임이 멈췄다." +
                        "<br>쿵<br>쿵<br>쿵<br>" +
                        "당신의 불길한 예감대로 인신매매상은 당신의 반응이 달라졌던 부분만 집요하게 파고들었다. 바들거리던 당신은 결국 쾌락과 고통의 아고니 속에서 절정했다. 하지만 당신이 한 번 절정했음에도 불구하고 인신매매상은 멈추지 않았다. 당신의 입은 '그만'이라거나 '제발'같은 말들조차도 내뱉을 수 없었다. 당신은 고개를 뒤로 젖히며 연속으로 절정했다." +
                        " 이대로 당하다는 머리가 점점 이상해질 것만 같다... 하지만 당신이 할 수 있는 일은 없다." +
                        "<br><br><br>그저 인신매매상의 의지에 따라 연거푸 절정할 뿐."
                    ]
                }
            },
            {
                type: "effect",
                run: (player) => {
                    changeHP(player, -10);
                    changeStamina(player, -10);
                    changeTrauma(player, 2);
                    passTime(player, 40);
                    
                    if (player.gender === "male"){
                        changeSensitivity(player, "aSensitivity", 11);
                        changeSensitivity(player, "mSensitivity", 6);
                    } else {
                        changeSensitivity(player, "cSensitivity", 9);
                        changeSensitivity(player, "aSensitivity", 9);
                    }                    
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => showSlaverCaptureChoice(player)
        });
        return;
    }

    if (eventId === "slaverCapture_submissiontraining"){
        startScene([
            {
                type: "text",
                value:
                    getSlaverCaptureStatusHTML(player) +
                    "인신매매상은 당신을 앞에 무릎 꿇게 했다. 그리고 그 자세에서 당신이 조금만 움직이려고 해도 채찍으로 당신의 가슴을 때렸다." +
                    " 당신이 저항해도 당신이 얻을 수 있는 건 미약한 자존감과 큰 고통뿐이었다. 당신의 저항이 약해지자 인신매매상은 당신에게 다가오더니 그대로 당신의 유두에 사슬을 달았다. 그리고 그 짧은 사슬에 꽤나 둔탁한 추를 달았다." +
                    " 추를 달자마자 당신의 몸은 앞으로 기울어졌다. 당신이 완전히 넘어지기 전에 인신매매상은 당신의 어깨를 발로 차 다시 바로세웠다. 잡아당겨지는 유두가 너무 아프다. 하지만 당신이 움직일 때마다 당신의 가슴 위로 떨어지는 채찍질은 당신으로 하여금 필사적으로 무게를 버티게 만들었다." +
                    "<br><br>복종 훈련이 끝난 후 인신매매상은 당신의 부어오른 유두 위로 약을 발라주었다. 당신은 유두가 간지러워졌다..."
            },
            {
                type: "effect",
                run: (player) => {
                    passTime(player, 40);
                    changeSensitivity(player, "bSensitivity", 15);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => showSlaverCaptureChoice(player)
        });
        return;
    }

    if (eventId === "slaverCapture_prostitute"){
        startScene([
            {
                type: "text",
                value:
                    getSlaverCaptureStatusHTML(player) +
                    "인신매매상은 당신을 질질 끌고 나왔다. 당신은 묶인 채로 침대 위에 던져졌다. 우리에만 있다가 오랜만에 맛보는 부드러운 감촉, 그렇기에 당신은 더욱 더 두려워졌다." +
                    "<br>당신의 불길한 예감대로 문이 열리자 사람이 한 명 들어왔다. 그리고 그는 말도 없이 당신의 다리를 벌리더니 그대로 당신의 애널에 제 성기를 박았다." +
                    "<br><br><br>남자가 나가는 모습을 보며 당신은 정액으로 부풀어오른 당신의 배를 끌어안았다.<br><br>하지만 끝이 아니었다. 다리에 묻은 정액이 식기도 전에 다른 사람이 또 들어왔다." +
                    "<br><br><br>당신이 정신을 잃을 때까지 매춘은 끝나지 않았다. 당신이 다시 눈을 떴을 때, 당신은 인신매매상의 팔에 붙들려 다시 우리로 질질 끌려가고 있었다. 우리의 문이 닫힌다...."
            },
            {
                type: "effect",
                run: (player) => {
                    changeHP(player, -10);
                    changeStamina(player, -10);
                    changeTrauma(player, 4);
                    changeSensitivity(player, "aSensitivity", 20);
                    changeSensitivity(player, "bSensitivity", 20);
                    changeSensitivity(player, "mSensitivity", 20);
                    changeSensitivity(player, "cSensitivity", 20);
                    addBodyFluid(player, "a", 15);
                    addBodyFluid(player, "c", 15);
                    addBodyFluid(player, "m", 15);
                    passTime(player, 40);        
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd: () => showSlaverCaptureChoice(player)
        });
        return;
    }
}

function slaverCaptureEscapeSuccess(player){
    player.slaverCapture = null;

    if (player.quest?.active?.id === "slaver_cleanup"){
        player.quest.active = null;
    }

    player.location = "banditForest";
    player.dungeon = null;

    savePlayer(player);

    startScene([
        {
            type: "text",
            value:
                "드디어 당신은 탈출에 성공했다. 당신은 발바닥이 까질 때까지 달렸고, 인신매매상들은 당신을 추격하지 못했다. 아니, 사실 추격해오긴 했던 거 같다. 하지만 추격해오던 그들은 갑자기 비명을 질렀고, 당신은 뒤도 돌아보지 못한 채 도망갔기에 그들이 갑자기 왜 비명을 지른지는 모른다." +
                "당신이 고개를 들고 주변을 둘러보았을 때 당신은 익숙한 곳에 있었다." +
                "<br><br><br><span class='log-pale'>깊은 숲</span>"
        }
    ], player, {
        onEnd: () => startScene(getLocationScene(player), player)
    });
}

function slaverCaptureGameOver(player, type){
    player.slaverCapture = null;

    if (type === "sanity"){
        gameOver(player,
            "당신은 끝내 정신이 무너졌다.<br><br>" +
            "고통과 굴욕, 끝없는 조교 속에서 당신은 자신이 누구였는지조차 잊어버렸다.<br><br>" +
            "당신은 더 이상 탈출을 꿈꾸지 않았다.<br>" +
            "그저 주인의 명령을 기다리는 하나의 상품이 되었을 뿐이다. 당신은 누군가에게 팔려나갈 최고급 노예가 되었다."
        );
        return;
    }

    if (type === "stress"){
        gameOver(player,
            "당신의 몸은 더 이상 버티지 못했다.<br><br>" +
            "끝없는 혹사와 피로, 반복되는 처우 끝에 당신의 몸은 한계를 넘어서고 말았다.<br><br>" +
            "인신매매상은 당신에게 다가왔다. 그는 칼을 들고 있었다.<br><br><br>" +
            "<span class='log-special'>당신은 눈을 감았다. 죽음이 차라리 나았다.</span>"
        );
        return;
    }
}
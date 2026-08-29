//초코초코

function isChocoChocoPeriod(player){
    const date = getCalendarDate(player);

    return (
        (date.month === 2 && date.day >= 8 && date.day <= 14) ||
        (date.month === 11 && date.day >= 5 && date.day <= 11)
    );
}

function isChocoChocoDay(player){
    const date = getCalendarDate(player);

    return (
        (date.month === 2 && date.day === 14) ||
        (date.month === 11 && date.day === 11)
    );
}

window.EVENTS.push({
    id : "chocoChoco_01",
    condition : (player) =>
        player.justMoved &&
        player.location === "townStreet" &&
        isChocoChocoPeriod(player) &&
        Math.random() < 0.1,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "초코!" +
                    "<br><br>...어라? 방금 어디서 엄청 귀여운 소리가 들리지 않았나? 당신은 고개를 돌렸다. 갈색 슬라임을 본 것 같기도 하다...."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "chocoChoco_02",
    condition : (player) =>
        player.justMoved &&
        ["townStreet", "townEntrance", "townEntrance_act3", "darkStreet"].includes(player.location) &&
        isChocoChocoPeriod(player) &&
        Math.random() < 0.1,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "\"내가 너를... 이만큼이나 사랑해.\"<br><br>" +
                    "어떤 사람이 갈색 초콜릿을 자신의 연인에게 내밀고 있었다." +
                    "<br><br>\"날 위해 그 던전에 다녀온 거야...? 넌 정말...\"<br><br>" +
                    "초콜릿을 받은 연인의 눈에는 눈물이 그렁그렁했다. 달콤한 키스가 이어진다.... 공공장소에서. 자리를 피하도록 하자."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "chocoChoco_03",
    condition : (player) =>
        player.justMoved &&
        ["shelter", "goldenShelter"].includes(player.location) &&
        isChocoChocoPeriod(player) &&
        Math.random() < 0.1,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "쉘터의 아이들이 초코송을 부르고 있다. 당신을 본 아이들은 밝게 웃으며 당신을 빙 둘러싸고 초코초코 노래를 불렀다." +
                    "<br><br>그저 초코초코 데이일 뿐이지만, 오늘이라도 아이들이 밝게 웃을 수 있다는 사실에 당신의 마음이 따듯해졌다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeTrauma(player, -5);
                    savePlayer(player);
                }
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "chocoChoco_04",
    condition : (player) =>
        player.justMoved &&
        ["richTownStreet", "gloryStreet", "heavenRoad", "heavenPalace"].includes(player.location) &&
        isChocoChocoPeriod(player) &&
        Math.random() < 0.1,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "당신을 위한 마음이라면서, 상류도시 사람들이 서로 초콜릿을 주고받는 모습이 보인다. 그들은 자신의 연인의 행복을 빌고, 사랑을 다시 확인하며 초코초코 데이를 즐겼다. 특히 몇 명의 귀족들은 오늘이야말로 데릭에게 자신의 마음을 고백하겠다며 초콜릿을 예쁜 포장지에 싸고 있었다. 달콤한 냄새가 상류도시를 맴돈다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});

window.EVENTS.push({
    id : "chocoChoco_05",
    condition : (player) =>
        player.justMoved &&
        player.location === "theater" &&
        isChocoChocoPeriod(player) &&
        Math.random() < 0.1,

    action : (player) => {
        startScene([
            {
                type : "text",
                value : [
                    "극장에서 가수가 나오자마자 팬들이 초콜릿을 들고 가수에게 달려들었다. 저기 있으면 압사당할 것 같다...! 당신은 본능적으로 생명의 위협을 느끼고 구석으로 피했다. 당신의 예상대로 팬들에게 압박당하는 가수의 등은 벽에 닿아 있었다. 그는 사색이 된 얼굴로 살려달라고 지배인에게 SOS 신호를 보내고 있었다." +
                    "<br><br>\"초짜인가...? 오늘 같은 날은 절대 나가면 안 돼.\"<br><br>" +
                    "가수들이 혀를 차더니 대기실 문을 닫는 게 보인다."
                ]
            }
        ], player, {
            onEnd : () => startScene(getLocationScene(player), player)
        });
    }
});
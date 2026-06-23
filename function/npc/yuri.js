function processYuriText(text, player){
    return text.replaceAll("{yuriTitle}", getYuriTitle(player))
    .replaceAll("{playerName}", player.name || "당신");
}

function getYuriTitle(player){
    if (NPC_DATA["yuri"].emotion.affection > 90) return "나의 별";
    else if(NPC_DATA["yuri"].emotion.affection > 60) return "별똥별";
    return "소꿉친구";
}

registerActions("yuri",{
    //처음이벤트
    firstMeeting: (player) => {
        changeEmotion("yuri", "affection", 10);
        addItem(player, ITEMS.weapon.dagger);
        startScene(NPC_DATA["yuri"].scenes.yuri_firstMeeting, player,
            {
                onEnd: () => startScene(getLocationScene(player), player)
            }
        );
    },

    //개인이벤트

    //스토리이벤트

    
    //쉘터대화로그
    giveFood : (player) => {
        openGiveFoodMenu(player, "matin");
    },

    talk: (player) => {
        const time = getTimePeriod(player);
        
        if (time === "morning" || time === "afternoon"){
            showSingleTextScene(
                "유리는 낮에는 쉘터에 없다. 그는 해가 떠있을 때는 돈을 버느라 바쁘다.",
                player
            );
            return;
        }
        
        if (time === "dawn"){
            showSingleTextScene(
                "유리는 지친 얼굴로 잠들어 있다. 얕은 잠인 거 같긴 하지만, 지금은 깨우지 않는 게 좋을 거 같다.",
            player
            );
            return;
        }

        startScene([
            {
                type: "text",
                value: "유리는 당신을 바라보며 조용히 웃었다."
            },
            {
                type: "choice",
                choices: [
                    { text: "사소한 잡담을 한다", action: "yuri_smallTalk" },
                    { text: "다른 얘기를 한다", action: "yuri_otherTalk" },
                    { text: "돌아간다", action: "back_location" }
                ]
            }
        ], player);
    },

    smallTalk : (player) => {
        passTime(player, 5);
        const affection = NPC_DATA["yuri"].emotion.affection;
        const onEnd = () => {
            if (NPC_DATA["yuri"].emotion.affection < 35){
                changeEmotion("yuri", "affection", 1);
            }

            if (affection>90){
                changeHP(player,10);
            }
            
            startScene(getLocationScene(player), player);
        };

        if (affection > 90){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "유리는 당신의 얼굴을 보더니 괜찮냐고 물었다.<br><br>\"네가 무리하는 건 싫어, {yuriTitle}.\"<br><br>그가 당신의 몸을 치료해준다.",
                        "\"...상류 도시는 딱히 가고 싶지 않아.\"<br><br>유리는 잠시 말을 멈췄다.<br><br>\"너도 그곳에는 안 갔으면 좋겠어, {yuriTitle}.\"",
                        "유리는 당신의 이마에 자신의 이마를 맞댄 채 가만히 있었다. 당신이 움직이려고 하자 그는 당신을 바라보았다. <br><br>\"미안. 조금만 더 이러고 있으면 안 될까?\"<br><br>그는 당신에게서 떨어지고 싶어하지 않아한다.",
                        "\"상류 도시에는... 괴물들이 살아. 나는 그들이 마물보다 더 무섭더라고.\"<br><br>유리는 잠시 말을 멈췄다. 그는 당신의 손에 손깍지를 끼며 씁쓸하게 웃었다.<br><br>\"그들도 아마 처음부터 그랬던 건 아니겠지만.\"",
                        "유리는 당신과 시선을 마주치더니 얼굴을 붉혔다. 그는 당신이 이 쉘터에 있어줘서 다행이라고 말하며 자신의 어깨를 톡톡 두드렸다. 당신이 그의 어깨에 머리를 기대자, 그의 몸은 눈에 띄게 굳었다. 쑥스러운 모양이다.",
                        "무기를 갈고 있던 유리는 당신에게 무기의 날을 어떻게 가는지에 대해 가르쳐주었다. 그는 무기의 날을 가는 당신을 지켜보다가 당신의 손을 잡고 세심하게 움직여주었다. 손을 뗐을 때, 그의 귀끝은 조금 붉어져있었다."
                    ])
                }
            ], player, { onEnd });
        } else if (affection > 60){
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "\"너와 더 대화하고 싶어.\"<br><br>유리는 아쉬운 듯이 낮게 한숨을 쉬었다.<br><br>\"오늘도 말 걸어줘서 고마워, {yuriTitle}. 네 미소 보니까 좋다.\"",
                        "무기를 갈고 있던 유리는 당신에게 무기의 날을 어떻게 가는지에 대해 가르쳐주었다. 그는 무기의 날을 가는 당신을 지켜보다가 당신의 손을 잡고 세심하게 움직여주었다. 그는 당신에게 당신이 아프지 않았으면 한다고 말했다.",
                        "당신이 다가오자 유리는 당신의 입으로 과일 하나를 쏙 넣어버렸다. 그는 히히 웃으며 당신의 입이 오물거리는 게 아기같아서 귀엽다고 말했다."
                    ])
                }
            ], player, { onEnd });
        } else{
            startScene([
                {
                    type : "text",
                    value : pickRandom([
                        "유리는 당신과 얘기를 하다가 꾸벅꾸벅 졸았다. 당신이 그의 이마를 톡 치자, 유리는 화들짝 놀라서 깨어났다.<br><br>\"미안해. 네가 내준 시간인데...\"<br><br>유리가 당신을 꽈악 끌어안았다.",
                        "유리는 당신과 얘기를 나누다가 아이가 깬 소리에 화들짝 놀라서 일어났다. 그는 당신을 바라보며 사과했다. <br><br>\"미안. 다음 번에 또.\"",
                        "어디서 가져왔는지, 유리는 당신의 검지에 꽃반지를 해주었다. 당신이 놀라서 쳐다보자 유리는 당신과 닮아서 가져온 꽃이라고 말해주었다."
                    ])
                }
            ], player, { onEnd });
        }
    },

    otherTalk : (player) => {
        const choices = [];

        choices.push({
            text: "음식을 건넨다",
            action: "yuri_giveFood"
        });

        if (player.flags?.KainYuriRecognize && !player.flags?.Yuri_aboutKain_01_seen ){
            choices.push({
                text : "카인에 대해 묻는다",
                scene : NPC_DATA.yuri.scenes.yuri_aboutKain_01
            });
        }

        choices.push({ text: "돌아간다", action: "yuri_talk" });

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

registerGiftActions("yuri");

window.startYuriGoblinShelterEvent = function(player){
    startScene(
        NPC_DATA["yuri"].scenes.yuri_goblinShelter_event,
        player,
        {
            onEnd : () => {
                player.flags = player.flags || {};
                player.flags.yuri_goblinShelter_event_seen = true;

                savePlayer(player);

                startScene(getLocationScene(player), player);
            }
        }
    );
};

window.startYuriRecommendLetterEvent = function(player){
    startScene(
        NPC_DATA["yuri"].scenes.yuri_recommend_letter_event,
        player,
        {
            onEnd : () => {
                player.flags = player.flags || {};
                player.flags.yuri_recommend_letter_event_seen = true;

                savePlayer(player);
                startScene(getLocationScene(player), player);
            }
        }
    );
};

window.yuriReceiveDericLetter = function(player){
    player.flags = player.flags || {};

    if (!player.flags.dericLetterFromYuri){
        addItem(player, ITEMS.misc.dericLetter);
    }

    player.flags.dericLetterFromYuri = true;
    savePlayer(player);
};
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
        openGiveFoodMenu(player, "yuri");
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
            if (affection < 35){
                changeEmotion("yuri", "affection", 1);
            }

            if (affection > 85){
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

        if (player.flags?.kain_about_yuri_01_seen && !player.flags?.yuri_about_kain_01_seen ){
            choices.push({
                text : "데릭이 카인에게 한 짓에 대해 말한다.",
                scene : NPC_DATA.yuri.scenes.yuri_about_kain_01
            });
        }

        if (player.flags?.valen_killYuri_02 && !player.flags?.you_will_kill_yuri ){
            choices.push({
                text : "당신은 유리에게 빈민가 거리로 나오라고 말했다.",
                scene : NPC_DATA.yuri.scenes.you_will_kill_yuri
            });
        }

        if (player.flags?.valen_killYuri_03 && !player.flags?.valen_will_kill_yuri ){
            choices.push({
                text : "당신은 유리에게 발렌이 당신을 죽이려고 한다고 경고했다.",
                scene : NPC_DATA.yuri.scenes.valen_will_kill_yuri
            });
        }

        if (player.flags?.rebel_route_quest_07_sided_with_yuri && !player.flags?.quest_07_sidedWithYuri ){
            choices.push({
                text : "당신은 유리에게 반란군들을 쉘터에 데려온 것을 정말 후회하지 않냐고 물었다.",
                scene : NPC_DATA.yuri.scenes.quest_07_sidedWithYuri
            });
        }

        if (player.flags?.kain_hisCollapseFromStar && !player.flags?.yuri_about_kain_hisCollapseFromStar ){
            choices.push({
                text : "당신은 유리에게 유리도 데릭에게 폭력을 당한 적이 있냐고 물었다.",
                scene : NPC_DATA.yuri.scenes.yuri_about_kain_hisCollapseFromStar
            });
        }

        if (player.flags?.yuri_about_kain_hisCollapseFromStar && !player.flags?.yuri_about_dericViolence ){
            choices.push({
                text : "당신은 유리에게 데릭의 폭력 수위를 말해주었다.",
                scene : NPC_DATA.yuri.scenes.yuri_about_dericViolence
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


//스페셜 데이
window.SPECIAL_GIFT_HANDLERS.yuri = function(player, item, grade){
    if (item.specialGift === "chocoChoco"){
        startYuriChocoChocoGift(player, item, grade);
        return;
    }
};

function startYuriChocoChocoGift(player, item, grade){

    if (grade === "great"){
        startScene([
            {
                type : "text",
                value : [
                    "쉘터에 들어서자 달콤한 냄새가 났다. 유리는 아이들과 함께 초콜릿을 만들고 있었다. 그는 한 아이에게 그래서 이 초콜릿은 누구에게 줄 거냐며 장난스럽게 말했고 아이는 얼굴이 붉어지더니 그건 알려주지 않을 거라고 말했다. 한 아이가 유리야말로 누구에게 수제 초콜릿을 줄 거냐고 물었다." +
                    "<br><br>\"우리한테 주는 거 말고! 따로 만들어놓은 거 말이야!\"<br><br>" +
                    "아이는 유리가 자신의 말에 대답하지 못할 거라고 생각했는지 기세등등했다. 유리는 미소를 짓더니 아이에게서 당신 쪽으로 고개를 돌렸다." +
                    "<br><br>\"글쎄. 당사자는 알 것 같은데.\"<br><br>" +
                    "당신과 시선이 마주친 유리는 싱긋 웃었다. 아이들은 당신과 유리를 번갈아보았다. 몇몇은 고개를 끄덕였고, 몇몇은 믿기지 않는다는 얼굴로 유리와 당신을 바라보았고, 몇몇은 유리의 언행을 이해하지 못했다." +
                    "<br><br>\"자, 아.\"<br><br>" +
                    "유리는 아무렇지도 않게 당신에게 다가와 자신의 초콜릿을 먹여주었다. 당신은 그에게 초콜릿을 받아먹었다. 달콤하면서도 은근 썼다. 유리는 초콜릿을 오물거리는 당신의 입술을 바라보다가, 아이들의 시선이 흩어진 틈을 타 은근슬쩍 입을 벌렸다. 당신은 그의 입에 당신의 수제 초콜릿을 넣어주었다." +
                    "<br><br>\"...맛있다. 고마워.\"<br><br>" +
                    "그의 손등이 당신의 손등을 톡 치고 제자리로 돌아갔다. 유리는 지금까지 먹어본 것들 중에 제일 달콤하다고 말하며 미소를 지었다. 분명 주변에 쉘터의 아이들이 있는데, 지금만큼은 이 세상에 유리와 당신 둘만 남은 기분이었다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "yuri");
                    player.location = "shelter";
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
                    "쉘터에 들어서자 달콤한 냄새가 났다. 유리는 아이들과 함께 초콜릿을 만들고 있었다. 그는 한 아이에게 그래서 이 초콜릿은 누구에게 줄 거냐며 장난스럽게 말했고 아이는 얼굴이 붉어지더니 그건 알려주지 않을 거라고 말했다. 한 아이가 유리야말로 누구에게 수제 초콜릿을 줄 거냐고 물었다." +
                    "<br><br>\"우리한테 주는 거 말고! 따로 만들어놓은 거 말이야!\"<br><br>" +
                    "아이는 유리가 자신의 말에 대답하지 못할 거라고 생각했는지 기세등등했다. 유리는 미소를 짓더니 아이에게서 당신 쪽으로 고개를 돌렸다." +
                    "<br><br>\"글쎄. 당사자는 알 것 같은데.\"<br><br>" +
                    "당신과 시선이 마주친 유리는 싱긋 웃었다. 아이들은 당신과 유리를 번갈아보았다. 몇몇은 고개를 끄덕였고, 몇몇은 믿기지 않는다는 얼굴로 유리와 당신을 바라보았고, 몇몇은 유리의 언행을 이해하지 못했다." +
                    "<br><br>유리는 아이들을 봐주다가 은근슬쩍 당신에게 다가왔다. 그리고 당신의 주머니에 자신의 수제 초콜릿을 넣어주었다. 당신도 유리의 주머니에 당신이 만든 수제 초콜릿을 넣어주었다. 유리는 살짝 고개를 기울이더니 옛날 생각이 난다고 속삭였다." +
                    "<br><br>\"그때도 우리끼리 이렇게 주고받고는 했잖아. 그때 평생 같이 주고받자던 약속, 아직도 지켜지고 있어서 다행이야.\""
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "yuri");
                    player.location = "shelter";
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
                    "쉘터에 들어서자 달콤한 냄새가 났다. 유리는 아이들과 함께 초콜릿을 만들고 있었다. 그는 한 아이에게 그래서 이 초콜릿은 누구에게 줄 거냐며 장난스럽게 말했고 아이는 얼굴이 붉어지더니 그건 알려주지 않을 거라고 말했다. 한 아이가 유리야말로 누구에게 수제 초콜릿을 줄 거냐고 물었다." +
                    "<br><br>\"우리한테 주는 거 말고! 따로 만들어놓은 거 말이야!\"<br><br>" +
                    "아이는 유리가 자신의 말에 대답하지 못할 거라고 생각했는지 기세등등했다. 유리는 미소를 짓더니 아이에게서 당신 쪽으로 고개를 돌렸다." +
                    "<br><br>\"글쎄. 당사자는 알 것 같은데.\"<br><br>" +
                    "당신과 시선이 마주친 유리는 싱긋 웃었다. 아이들은 당신과 유리를 번갈아보았다. 몇몇은 고개를 끄덕였고, 몇몇은 믿기지 않는다는 얼굴로 유리와 당신을 바라보았고, 몇몇은 유리의 언행을 이해하지 못했다." +
                    "<br><br>돌아다니면서 초콜릿을 만드는 아이들을 봐주던 유리는 자연스럽게 당신의 손에 자신의 초콜릿을 쥐어주었다. 하류도시에서는 볼 수 없는 고급 포장지다. 당신도 은근슬쩍 유리에게 당신이 만든 수제 초콜릿을 주었다." +
                    "<br><br>\"이따 먹을게. 혼자서. 천천히.\"<br><br>" +
                    "유리는 입모양으로 당신에게 말했다. 당신의 시선이 유리의 입술에 닿았다가 떨어졌다. 평소와는 다른 그의 은밀한 미소에, 당신은 어쩌면 유리가 상류도시의 초코초코데이 풍습을 알고 있을지도 모르겠다는 생각을 했다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    completeSpecialGift(player, item, "yuri");
                    player.location = "shelter";
                    savePlayer(player);
                }
            }
        ], player);

        return;
    }
}

//연말 이벤트
window.YEAR_END_HANDLERS.yuri = function(player){

    startScene([
        {
            type : "text",
            value : [
                "\"올해 한 해도 수고 많았어.\"<br><br>" +
                "자연스럽게 당신의 방에 들어오며 유리는 미소를 지어보였다. 그는 지금까지 정말 많은 일이 있었던 것 같다고 말했다. 그래서 아무리 다사다난한 1년이라도 당신과 함께라면 어떻게든 버틸 수 있는 것 같다고 말했다." +
                "<br><br>\"아니면 네가 사고를 끌고 다니는 걸까? 어렸을 때부터 네 주변에는 사고가 많긴 했잖아.\"<br><br>" +
                "유리는 쿡쿡 웃으며 자연스럽게 당신의 옆에 앉았다. 그는 당신의 손 위로 손장난을 치며 그래도 걱정하지 말라고 말했다." +
                "<br><br>\"난 언제나, 네 옆에 있을 테니까.\"<br><br>" +
                "그리고 그는 당신의 손을 잡아 올리더니 당신의 손등 위로 입술을 맞췄다. 당신의 손등에 입술을 맞춘 유리는 힐끗 당신을 올려다보더니 자연스럽게 당신의 손목까지 쪽쪽거리며 핥아올렸다. 그의 호박색 눈동자가 마치 투명한 구슬처럼 당신의 얼굴을 담고 있다." +
                "<br><br>\"진심이야.\"<br><br>" +
                "나는 어렸을 때부터 너랑 떨어진다는 생각을 한 적이 없거든. 유리는 당신에게 속삭이더니 웃으며 다시 당신과 거리를 벌렸다. 물론 그래도 두 사람의 그림자는 계속 붙어 있었지만. 한 해의 마지막 밤이 지날 때까지 쭈욱."
            ]
        }
    ], player, {
        onEnd : () => completeYearEndEvent(player, "yuri")
    });
};
window.YEAR_END_LETTER_HANDLERS.yuri = function(player, next){

    startScene([
        {
            type : "text",
            value : [
                "유리에게서 온 편지다.<br><br><br>" +
                "<span class='log-yuri'>[네 선택을 존중해.]</span><br><br>" +
                "<span class='log-yuri'>[하지만 네가 잘못하지 않았다는 건 아니야.]</span><br><br>" +
                "<span class='log-yuri'>[새해 복 많이 받아, 나의 소꿉친구.]</span><br><br>"
            ]
        }
    ], player, {
        onEnd : next
    });
};

//버섯이벤트
window.MUSHROOM_ROMANCE_HANDLERS.yuri = function(player, next){
    const mushroomType =
        getMushroomRomanceType();

    if (mushroomType === "tasty"){
        startScene([
            {
                type : "text",
                value : [
                    "\"...어라?\"<br><br>" +
                    "유리는 당신을 보더니 웃으며 당신도 머쉬룸 킹덤을 찾고 있었던 거냐고 물었다. 그는 아이들에게 버섯맨을 설명해주거나, 뭔가 얻는 게 있으면 보여주고 싶어서 머쉬룸 킹덤을 찾고 있었다고 말하며 당신에게로 다가갔다. 안내문을 읽은 그는 버섯을 들더니 자신이 먼저 먹어보겠다고 말했다." +
                    "<br><br>\"...음...!\"<br><br>" +
                    "그는 눈을 반짝이더니 정말 맛있는 버섯이라고 말했다. 그리고 그는 나머지 남은 것들을 당신에게 그냥 주려다가 장난스러운 미소를 지으며 아~ 벌려보라고 말했다." +
                    "<br><br>\"지금 여긴 아이들도 없잖아.\"<br><br>" +
                    "당신은 결국 입을 벌리고 유리에게 버섯을 받아먹었다. 당신이 버섯을 다 받아먹자 하얀 빛이 깜박이며 두 사람을 감싸안았다." +
                    "<br><br>\"...귀여웠어. 사랑스러웠고.\"<br><br>" +
                    "하얀 빛에 사라지기 전 유리가 속삭이듯이 말했다. 그는 애정 어린 시선으로 당신을 바라보며 웃고 있었다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeNPCEmotion("yuri", "affection", 2);
                    changeNPCEmotion("yuri", "dominance", 3);
                    passTime(player, 15);
                }
            }
        ], player, {
            onEnd : next
        });
        return;
    }

    if (mushroomType === "poison"){
        startScene([
            {
                type : "text",
                value : [
                    "유리는 당신도 머쉬룸 킹덤을 찾고 있을 줄은 몰랐다고 말하며 웃었다." +
                    "<br><br>\"나보다 네가 더 빨랐던 모양이네. 넌 언제나... 내 기대를 기분 좋게 빗나가는 구나.\"<br><br>" +
                    "유리는 미소를 지으며 당신의 배신은 달콤하다고 말했다. 그는 당신의 등을 영원히 쫓아가고 싶다고 말하며 버섯을 집어들었다." +
                    "<br><br>\"위험할 수도 있으니까 내가 먼저 먹을게.\"<br><br>" +
                    "유리는 독버섯을 먹었다. 몇 번 버섯을 씹던 그는 독버섯이라고 말하며 작은 가방 하나를 열어보였다. 그 가방에는 약초가 가득했다. 그는 빠르게 약재 하나를 찾더니 약초를 꿀꺽 삼켰다." +
                    "<br><br>\"너랑 단둘이 잠깐 갇혀있는 건 좋지만 언제까지나 갇혀있는 건 안 되니까...\"<br><br>" +
                    "그는 자신의 약초를 먼저 먹고 버섯을 먹으라고 말했다. 당신은 그가 내민 약초를 먼저 먹은 후 독버섯을 먹았다. 독이 전혀 느껴지지 않는다. 버섯맨들의 짜증 섞인 한숨 소리가 들린다. 하얀 빛이 당신과 유리를 감싸안았다." +
                    "<br><br>\"언젠가 네게도 약초에 대해 가르쳐줄게.\"<br><br>" +
                    "하얀 빛이 사라지기 전, 유리는 속삭이듯이 말했다. \"이따 봐\"라고 그는 입 모양으로 말하며 웃었다."
                ]
            },
            {
                type : "effect",
                run : (player) => {
                    changeNPCEmotion("yuri", "affection", 1);
                    passTime(player, 25);
                }
            }
        ], player, {
            onEnd : next
        });
        return;
    }

    startScene([
        {
            type : "text",
            value : [
                "\"...\"<br><br>" +
                "남성기 모양의 버섯에 유리는 눈썹을 치켜올렸다. 그는 저 버섯은 일단 평범한 버섯은 아닐 거라고 말했다. 어쩌면.... 그는 중얼거리더니 자신이 먼저 먹어보겠다고 말했다." +
                "<br><br>\"이 고집만은 못 꺾어. 나는 네가 아픈 것보다는 내가 아픈 게 더 낫거든.\"<br><br>" +
                "그는 괜찮을 거라고 말한 후 그대로 버섯을 먹었다. 그는 잠시 굳어 있었다. 그러더니 손으로 부채질을 하며 나머지 부분은 당신이 먹는 게 좋을 것 같다고 말했다." +
                "<br><br>\"...나가면 찬 물이라도....\"<br><br>" +
                "당신이 남성기 모양의 버섯을 먹는 걸 보던 유리는 얼굴을 붉혔다." +
                "<br><br>\"...정말 세수라도 해야겠는걸.\"<br><br>" +
                "그는 손등으로 자꾸만 당신의 손등을 스치며 발가락을 까닥거렸다. 하얀 빛이 나타나 두 사람을 감싸안을 때까지 유리는 당신을 건드리지 않았지만, 그렇다고 당신에게서 떨어지지도 않았다."
            ]
        },
        {
            type : "effect",
            run : (player) => {
                changeNPCEmotion("yuri", "lust", 10);
                passTime(player, 20);
            }
        }
    ], player, {
        onEnd : next
    });
};
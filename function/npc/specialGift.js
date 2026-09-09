window.SPECIAL_GIFT_HANDLERS = window.SPECIAL_GIFT_HANDLERS || {};
window.MUSHROOM_ROMANCE_HANDLERS = window.MUSHROOM_ROMANCE_HANDLERS || {};

window.SPECIAL_GIFT_RULES = {

    chocoChoco : {
        canGive : (player) =>
            isChocoChocoDay(player),

        unavailableText :
            "오늘은 초코초코데이가 아니다.",

        oncePerDay : true
    }

};

//선물 가능 NPC
window.SPECIAL_GIFT_NPCS = [

    // 데릭
    {
        id : "deric",
        name : "데릭",
        canGift : (player) =>
            !!player.flags?.dericDate02Accepted
    },

    // 에릭
    {
        id : "eric",
        name : "에릭",
        canGift : (player) =>
            !!player.flags?.endAshParents &&
            !player.flags?.ericDie
    },

    // 아카시아
    {
        id : "akasia",
        name : "아카시아",
        canGift : (player) =>
            !!player.flags?.akasiaValenMedal_event &&
            !player.flags?.akasiaDie
    },

    // 발렌
    {
        id : "valen",
        name : "발렌",
        canGift : (player) =>
            !!player.flags?.akasiaValenMedal_event &&
            !player.flags?.valenDie
    },

    // 카인
    {
        id : "kain",
        name : "카인",
        canGift : (player) =>
            !!player.flags?.kain_firstMeeting_seen
    },

    // 루크
    {
        id : "luke",
        name : "루크",
        canGift : (player) =>
            !!player.flags?.luke_firstMeeting &&
            !player.flags?.collapseLuke
    },

    // 마틴
    {
        id : "matin",
        name : "마틴",
        canGift : (player) =>
            !!player.flags?.matin_firstMeeting
    },

    // 니콜라이
    {
        id : "nikolai",
        name : "니콜라이",
        canGift : (player) =>
            !!player.flags?.nikolai_firstMeeting &&
            !player.flags?.nikolaiDie
    },

    // 시온
    {
        id : "sion",
        name : "시온",
        canGift : (player) =>
            !!player.flags?.sion_hisLittleConfession
    },

    // 소라
    {
        id : "sora",
        name : "소라",
        canGift : (player) =>
            !!player.flags?.sora_firstMeeting &&
            !player.flags?.soraDie
    },

    // 유리
    {
        id : "yuri",
        name : "유리",
        canGift : (player) =>
            !!player.flags?.yuri_firstMeeting &&
            !player.flags?.yuriDie
    },

    // 창백
    {
        id : "pale",
        name : "창백",
        canGift : (player) =>
            !!player.flags?.pale_findHerPlace
    }

];

//연인NPC 조회
function getRomanceNpcs(player){

    return window.SPECIAL_GIFT_NPCS.filter(npc =>
        npc.canGift(player) &&
        (
            hasNpcRelationship(npc.id, "lover") ||
            hasNpcRelationship(npc.id, "spouse")
        )
    );
}

//이하 선물 주기 공용 공식
function openSpecialGiftAction(player, item){

    startScene([
        {
            type : "choice",
            question : `${item.name}을(를) 어떻게 할까?`,
            choices : [
                {
                    text : "먹는다",
                    action : () => useItem(player, item, true)
                },
                {
                    text : "누군가에게 준다",
                    action : () => openSpecialGiftNpcSelect(player, item)
                },
                {
                    text : "그만둔다",
                    action : () => renderInventoryModal(player)
                }
            ]
        }
    ], player);
}

function openSpecialGiftNpcSelect(player, item){

    const availableNpcs = window.SPECIAL_GIFT_NPCS.filter(npc =>
        npc.canGift(player)
    );

    if (availableNpcs.length === 0){
        startScene([
            {
                type : "text",
                value : [
                    "지금은 이 선물을 줄 만한 사람이 떠오르지 않는다."
                ]
            }
        ], player, {
            onEnd : () => renderInventoryModal(player)
        });
        return;
    }

    const choices = availableNpcs.map(npc => ({
        text : npc.name,
        action : () => handleSpecialGift(player, item, npc.id)
    }));

    choices.push({
        text : "그만둔다",
        action : () => renderInventoryModal(player)
    });

    startScene([
        {
            type : "choice",
            question : "누구에게 줄까?",
            choices
        }
    ], player);
}

function handleSpecialGift(player, item, npcId){

    const giftType = item.specialGift;
    const rule = window.SPECIAL_GIFT_RULES?.[giftType];

    // 등록되지 않은 특수 선물
    if (!rule){
        console.warn(`특수 선물 규칙 없음: ${giftType}`);
        return;
    }

    // 해당 특수 선물을 줄 수 있는 조건 검사
    if (
        typeof rule.canGive === "function" &&
        !rule.canGive(player)
    ){
        startScene([
            {
                type : "text",
                value : [
                    rule.unavailableText || "지금은 이 선물을 줄 수 없다."
                ]
            }
        ], player, {
            onEnd : () => renderInventoryModal(player)
        });

        return;
    }

    // NPC별 1일 1회 검사
    if (rule.oncePerDay){

        const date = getCalendarDate(player);

        const giftKey =
            `specialGift_${giftType}_${date.year}_${date.month}_${date.day}_${npcId}`;

        if (player.flags?.[giftKey]){
            startScene([
                {
                    type : "text",
                    value : [
                        "가끔은 여러 번 주는 것보다 한 번 주는 게 더 의미가 있다."
                    ]
                }
            ], player, {
                onEnd : () => renderInventoryModal(player)
            });

            return;
        }
    }

    // 품질 판정
    let grade = null;

    if (item.tags?.includes("great")){
        grade = "great";
    }
    else if (item.tags?.includes("normal")){
        grade = "normal";
    }
    else if (item.tags?.includes("bad")){
        grade = "bad";
    }

    // NPC의 특수 선물 핸들러 찾기
    const handler = window.SPECIAL_GIFT_HANDLERS?.[npcId];

    if (!handler){
        console.warn(`특수 선물 핸들러 없음: ${npcId}`);
        return;
    }

    // NPC 이벤트로 전달
    handler(player, item, grade);
}

function completeSpecialGift(player, item, npcId){

    const giftType = item.specialGift;
    const rule = window.SPECIAL_GIFT_RULES?.[giftType];

    if (!rule){
        return;
    }

    // 1일 1회 플래그 기록
    if (rule.oncePerDay){

        const date = getCalendarDate(player);

        const giftKey =
            `specialGift_${giftType}_${date.year}_${date.month}_${date.day}_${npcId}`;

        player.flags = player.flags || {};
        player.flags[giftKey] = true;
    }

    // 선물 아이템 제거
    removeItem(player, item.key);

    savePlayer(player);
}
const SAVE_PLAYER_KEY = "playerData";
const SAVE_NPC_KEY = "npcData";

function safeJsonParse(value, fallback = null){
    try {
        return JSON.parse(value);
    } catch (error){
        console.error("저장 데이터 파싱 실패:", error);
        return fallback;
    }
}

function saveToLocalStorage(key, value){
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);

    const stored = localStorage.getItem(key);
    if (stored !== json){
        throw new Error(`${key} localStorage 저장 검증 실패`);
    }

    return json;
}

function downloadSaveFile(payload, slot = null){
    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const now = new Date();
    const stamp = now.toISOString().replace(/[:.]/g, "-");

    a.href = url;
    const slotLabel = slot ? `slot${slot}_` : "";
    a.download = `Survival_Of_the_Fittest_${slotLabel}${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => URL.revokeObjectURL(url), 0);
}

function savePlayer(player){
    if (player.mineRun){
        return;
    }
    saveToLocalStorage(SAVE_PLAYER_KEY, player);
}

function loadPlayer(){
    const saved = localStorage.getItem(SAVE_PLAYER_KEY);
    if (!saved){
        alert("세이브데이터가 없습니다!!!");
        return null;
    }
    return safeJsonParse(saved, null);
}

/*캐릭터 상태 표시*/
function updateSidebar(player,sidebarId){
    const sidebar=document.getElementById(sidebarId);
    if (!player){
        sidebar.innerHTML= "<p>캐릭터가 없습니다.</p>";
        return;
    }
    const totalStats = typeof calculateTotalStats === "function" ? calculateTotalStats(player) : (player.stats || {});
    sidebar.innerHTML =`
        <h2>${player.name} (${player.age}세)</h2>
        <p>성별: ${player.gender}</p>
        <p>STR: ${totalStats.str}, DEX: ${totalStats.dex}, INT: ${totalStats.int}, CHARM: ${totalStats.charm}</p>
        <p>ATK: ${player.derivedStats.atk}, DEF: ${player.derivedStats.def}, EVA: ${player.derivedStats.eva}, MAG: ${player.derivedStats.mag}</p>
        <p>전투특성: ${player.battleTrait || '없음'}</p>
        <p>성적 특성: ${player.sexBattleTraits.length > 0 ? player.sexBattleTraits.join(", ") : '없음'}</p>
    `;

}

function ensureEquipmentItemState(item){
    if (!item || !isEquipmentItem(item)) return;

    item.uid ??= crypto.randomUUID();
    item.enhance ??= 0;
}

function normalizePlayer(player){
    if (!player) return null;

    player.inventory = player.inventory || [];

    player.equipment = player.equipment || {
        weapon: null,
        top: { name: "반팔", type: "top", stats: {} },
        bottom: { name: "바지", type: "bottom", stats: {} },
        underwear: { name: "팬티", type: "underwear", stats: {} },
        accessary: null
    };

    if (player.equipment.weapon && player.equipment.weapon.name === "맨주먹"){
        player.equipment.weapon = null;
    }

    player.inventory.forEach(item => {
        item.key ??= getItemKeyByName(item.name);
        const latest = findItemByKey(item.key);
        
        if (latest){
            item.type = latest.type;
        }
        ensureEquipmentItemState(item);
    });

    Object.values(player.equipment).forEach(item => {
        ensureEquipmentItemState(item);
    });

    player.stats = player.stats || { str:0, dex:0, int:0, charm:0 };

    player.level = Number.isInteger(player.level) ? player.level : 1;
    player.exp = Number.isFinite(player.exp) ? player.exp : 0;
    player.statPoints = Number.isInteger(player.statPoints) ? player.statPoints : 0;

    player.derivedStats = player.derivedStats || {};
    player.flags = player.flags || {};
    player.lastWeeklyPaymentWeek = Number.isInteger(player.lastWeeklyPaymentWeek)
        ? player.lastWeeklyPaymentWeek
        : 0;

    return player;
}
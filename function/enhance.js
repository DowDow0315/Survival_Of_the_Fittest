const ENHANCE_CONFIG = {
    defaultMaxLevel: 10
};

function getEnhanceGain(level){
    if (level <= 3) return 1;
    if (level <= 6) return 2;
    if (level <= 9) return 3;
    if (level === 10) return 5;
    return 0;
}

function getAutoEnhanceBonus(item, stat){
    const enhance = Number(item.enhance) || 0;
    const baseValue = item?.stats?.[stat] || 0;

    if (baseValue <= 0) return 0;

    let bonus = 0;

    for (let lv = 1; lv <= Math.min(enhance, 4); lv++){
        bonus += getEnhanceGain(lv);
    }

    return bonus;
}

function addEnhanceCustomBonus(item, stat, amount){
    item.enhanceCustom ??= {
        str: 0,
        dex: 0,
        int: 0,
        charm: 0
    };

    item.enhanceCustom[stat] = (item.enhanceCustom[stat] || 0) + amount;
}

function getEnhanceMaxLevel(place = "default"){
    if (place === "matin"){
        return 3;
    }

    if (place === "richTown"){
        return 10;
    }

    return ENHANCE_CONFIG.defaultMaxLevel;
}

function getEnhanceCost(item){
    const level = Number(item.enhance) || 0;
    return Math.round(1000 * Math.pow(1.67, level) / 100) * 100;
}

//게산 : 1,000 /1,700 / 2,800 / 4,700 / 7,800 / 13,000 / 21,700 / 36,200 / 60,500 / 100,900

function enhanceItem(player, item, place = "default", customStat = null){
    if (!isEquipmentItem(item)) return false;

    item.enhance = Number(item.enhance) || 0;

    const maxLevel = getEnhanceMaxLevel(place);

    if (item.enhance >= maxLevel){
        if (place === "matin"){
            startScene([
                {
                    type: "text",
                    value: "마틴은 당신이 가져온 물건을 살펴보더니 고개를 저었다." +
                           "<br><br>\"내 실력으로 이 이상은 무리야. 여기서 내가 손보았다가는 망가질 거 같아.\"<br><br>"+
                           "그는 몇 초 침묵을 지키다가 더 강화하고 싶으면 상류도시에 가보라고 말했다. 그곳에는 분명 당신의 장비를 더 강화할 수 있는 사람이 있을 거라고 말하며 그는 말꼬리를 흐렸다. 더 이상 말하고 싶어하지 않는 듯했다."
                }
            ], player, {
                onEnd: () => openEnhanceMenu(player, place)
            });
        } else {
            addLog(`여기서는 +${maxLevel} 이상 강화할 수 없다.`);
        }
        return false;
    }

    const nextLevel = item.enhance + 1;

    if (nextLevel >= 5 && !["str", "dex", "int", "charm"].includes(customStat)){
        addLog("강화할 능력치를 선택해야 한다.");
        return false;
    }

    const cost = getEnhanceCost(item);

    if (!spendGold(player, cost)){
        addLog("돈이 부족하다.");
        return false;
    }

    item.enhance = nextLevel;
    if (place === "matin"){
        player.flags ??= {};
        player.flags.matinEnhancedOnce = true;
    }

    if (nextLevel >= 5){
        const gain = getEnhanceGain(nextLevel);
        addEnhanceCustomBonus(item, customStat, gain);

        addLog(`${getDisplayItemName(item)} +${nextLevel} 강화 완료! ${customStat} +${gain} (-${cost}G)`);
    } else {
        addLog(`${getDisplayItemName(item)} +${nextLevel} 강화 완료! (-${cost}G)`);
    }

    savePlayer(player);
    updateDerivedStats(player);
    updateStatusUI(player);
    openEnhanceMenu(player, place);

    return true;
}

function getEnhanceItemList(player){
    const equippedItems = Object.values(player.equipment || {})
        .filter(item => item && isEquipmentItem(item));

    const inventoryItems = (player.inventory || [])
        .filter(item => isEquipmentItem(item));

    return [...equippedItems, ...inventoryItems];
}

function openEnhanceMenu(player, place = "default"){
    const equipList = getEnhanceItemList(player);
    startScene([
        {
            type: "text",
            value: "어느 장비를 강화할까?"
        },
        {
            type: "choice",
            choices: [
                ...equipList.map(item => ({
                    text: `${getDisplayItemName(item)} (+${item.enhance || 0}) - ${getEnhanceCost(item)}G`,
                    action: () => enhanceItem(player, item, place)
                })),
                {
                    text: "돌아간다",
                    action: () => startScene(getLocationScene(player), player)
                }
            ]
        }
    ], player);
}

window.open_matinEnhance = function(player){
    openEnhanceMenu(player, "matin");
};
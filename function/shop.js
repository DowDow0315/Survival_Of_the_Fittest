let shopTab = "buy";
let juliangBuyTab = "items";
let pendingSellQuantity = null;
let eventShopTab = "items";
const EVENT_POINT_EXCHANGE_RATE = 500;

function getSellPrice(item){
    if (!item) return 0;
    // 음식은 정가 판매
    if (item.type === "heal"){
        return item.price || 0;
    }

    if (item.type === "arousal"){
        return item.price || 0;
    }

    if (item.type === "stamina"){
        return item.price || 0;
    }

    if (item.type === "regen"){
        return item.price || 0;
    }

    if (item.type === "junk"){
        return item.price || 0;
    }

    // 나머지는 반값 (음식재료 포함)
    return Math.floor((item.price || 0) * 0.5);
}

const SHOPS = {
    soraShop: {
        name: "소라의 상점",
        items: [
            ITEMS.weapon.dagger,
            ITEMS.weapon.dancingdagger,
            ITEMS.weapon.sword,
            ITEMS.weapon.bigsword,
            ITEMS.weapon.axeHM,
            ITEMS.weapon.replicaBayonet,
            ITEMS.weapon.magicstick,

            ITEMS.top.tshirt,
            ITEMS.top.tanktop,
            ITEMS.top.croptshirt,
            ITEMS.top.overshirt,
            ITEMS.top.hoodie,

            ITEMS.bra.basicBra,
            ITEMS.bra.dotBra,
            ITEMS.bra.ribonBra,
            ITEMS.bra.raceBra,
            ITEMS.bra.strapLessBra,

            ITEMS.bottom.pants,
            ITEMS.bottom.bluejeams,
            ITEMS.bottom.blackjeams,
            ITEMS.bottom.hotpants,
            ITEMS.bottom.skirts,
            ITEMS.bottom.longskirts,
            ITEMS.bottom.shortskirts,

            ITEMS.underwear.basic,
            ITEMS.underwear.racepants,
            ITEMS.underwear.ribonpants,
            ITEMS.underwear.hundosiHM,

            ITEMS.consumable.smallPotion,
            ITEMS.consumable.mediumPotion,
            ITEMS.consumable.highPotion,
            ITEMS.consumable.fullPotion,

            ITEMS.consumable.regenPotion,
            ITEMS.consumable.regenPotion2,

            ITEMS.consumable.smallStaminaPotion,
            ITEMS.consumable.mediumStaminaPotion,
            ITEMS.consumable.largeStaminaPotion,

            ITEMS.consumable.calmPotion,

            ITEMS.misc.potatoSeed,
            ITEMS.misc.cabbageSeed,
            ITEMS.misc.mushroomSeed,
            ITEMS.misc.wheatSeed,
            ITEMS.misc.riceSeed,
            ITEMS.misc.pepperSeed
        ]
    },

    reclaimedShop: {
        name: "되찾은 상점",
        items: [
            ITEMS.weapon.rebelsSpear,
            ITEMS.weapon.fallenGoblingKingSword,
            ITEMS.weapon.rebelsTwinDagger,
            ITEMS.weapon.whiteArmyShieldMace,

            ITEMS.top.rebelsTop2,
            ITEMS.top.whiteUppercityTop2,
            ITEMS.top.croptshirt,
            ITEMS.top.overshirt,
            ITEMS.top.hoodie,

            ITEMS.bra.basicBra,
            ITEMS.bra.dotBra,
            ITEMS.bra.ribonBra,
            ITEMS.bra.raceBra,
            ITEMS.bra.strapLessBra,
            ITEMS.bra.goldenThreadBra,
            ITEMS.bra.armoredBra,
            ITEMS.bra.bandageBra,

            ITEMS.bottom.rebelsBottom2,
            ITEMS.bottom.whiteUppercityBottom2,
            ITEMS.bottom.bluejeams,
            ITEMS.bottom.blackjeams,
            ITEMS.bottom.hotpants,
            ITEMS.bottom.skirts,
            ITEMS.bottom.longskirts,
            ITEMS.bottom.shortskirts,

            ITEMS.underwear.basic,
            ITEMS.underwear.racepants,
            ITEMS.underwear.ribonpants,
            ITEMS.underwear.hundosiHM,
            ITEMS.underwear.slimePants,
            ITEMS.underwear.luckyPants,
            ITEMS.underwear.goldenThreadPants,
            ITEMS.underwear.invisiblePants,

            ITEMS.consumable.smallPotion,
            ITEMS.consumable.mediumPotion,
            ITEMS.consumable.highPotion,
            ITEMS.consumable.fullPotion,
            ITEMS.consumable.fullPotion2,
            ITEMS.consumable.fullPotion3,
            ITEMS.consumable.fullPotion4,

            ITEMS.consumable.regenPotion,
            ITEMS.consumable.regenPotion2,
            ITEMS.consumable.regenPotion3,
            ITEMS.consumable.regenPotion4,

            ITEMS.consumable.smallStaminaPotion,
            ITEMS.consumable.mediumStaminaPotion,
            ITEMS.consumable.largeStaminaPotion,

            ITEMS.consumable.calmPotion,

            ITEMS.misc.potatoSeed,
            ITEMS.misc.cabbageSeed,
            ITEMS.misc.mushroomSeed,
            ITEMS.misc.wheatSeed,
            ITEMS.misc.riceSeed,
            ITEMS.misc.pepperSeed
        ]
    },

    matinShop : {
        name : "마틴의 주점 물품",
        items : [
            ITEMS.top.tavernUpper,
            ITEMS.bottom.tavernBottom,

            ITEMS.misc.pickaxe,
            ITEMS.misc.fisherRod,
            
            ITEMS.consumable.beer,
            ITEMS.consumable.wine,
            ITEMS.consumable.soju
        ]
    },
    juliangShop : {
        name : "불꽃과 보석 물품",
        items : [
            ITEMS.misc.ruby,
            ITEMS.misc.sapphire,
            ITEMS.misc.aquamarine,
            ITEMS.misc.diamond,
            ITEMS.misc.pickaxe
        ],

        furniture : [
            "softBed",
            "luxuryBed",

            "basicBath",
            "luxuryBath",

            "bearDoll",

            "luxuryTeaSet",
            "musicBox",
            "musicBoxSwan",
            "kainPoster",
            "kainRarePoster"
        ]
    },
    merchantVillageShop : {
        name : "행상인 마을 물품",
        items : []
    }
};

const MERCHANT_VILLAGE_POOL = [
    ITEMS.consumable.sensitivityADownPotion,
    ITEMS.consumable.sensitivityBDownPotion,
    ITEMS.consumable.sensitivityCDownPotion,
    ITEMS.consumable.sensitivityMDownPotion,
    ITEMS.consumable.highPotion,
    ITEMS.consumable.fullPotion,
    ITEMS.misc.pickaxe,
    ITEMS.misc.ironOre,
    ITEMS.misc.silverOre,
    ITEMS.misc.goldOre,
    ITEMS.misc.rice,
    ITEMS.misc.wheat
]

function pickRandomItems(pool, count){
    return [...pool]
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
}

let afterShopClose = null;

function openShop(shopId, player, options = {}){
    shopTab = "buy";

    if (shopId === "juliangShop"){
        juliangBuyTab = "items";
    }

    afterShopClose = options.onClose || null;

    if (shopId === "merchantVillageShop"){
        player.tempMerchantVillageItems = pickRandomItems(MERCHANT_VILLAGE_POOL, 3);
        player.tempMerchantVillageBoughtKeys = [];
    }

    const modal = document.getElementById("shopModal");
    modal.style.display = "flex";
    renderShopModal(shopId, player);
}

function closeShop(){
    document.getElementById("shopModal").style.display = "none";

    const next = afterShopClose;
    afterShopClose = null;

    if (next){
        next();
        return;
    }

    startScene(getLocationScene(player), player);
}

function renderShopModal(shopId, player){
    const shop = SHOPS[shopId];
    const box = document.getElementById("shopContent");

    box.innerHTML = "";

    if (!shop){
        box.innerHTML = "<p>상점 데이터가 없다.</p>";
        return;
    }

    const title = document.createElement("h3");
    title.innerText = shop.name;
    box.appendChild(title);

    const tabWrap = document.createElement("div");
    tabWrap.className = "shop-tabs";

    const buyTab = document.createElement("button");
    buyTab.innerText = "구매";
    buyTab.className = shopTab === "buy" ? "active-tab" : "";
    buyTab.onclick = () => {
        shopTab = "buy";
        renderShopModal(shopId, player);
    };

    const sellTab = document.createElement("button");
    sellTab.innerText = "판매";
    sellTab.className = shopTab === "sell" ? "active-tab" : "";
    sellTab.onclick = () => {
        shopTab = "sell";
        renderShopModal(shopId, player);
    };

    tabWrap.appendChild(buyTab);
    tabWrap.appendChild(sellTab);
    box.appendChild(tabWrap);

    const listWrap = document.createElement("div");
    listWrap.className = "shop-list";

    if (shopTab === "buy"){
        if (shopId === "juliangShop"){
            const subTabWrap = document.createElement("div");
            subTabWrap.className = "shop-tabs";
            
            const itemTab = document.createElement("button");
            itemTab.innerText = "보석 관련";
            
            itemTab.className =
            juliangBuyTab === "items"
             ? "active-tab"
             : "";
             
            itemTab.onclick = () => {
                juliangBuyTab = "items";
                renderShopModal(shopId, player);
            };
            
            const furnitureTab = document.createElement("button");
            furnitureTab.innerText = "가구";
            
            furnitureTab.className =
            juliangBuyTab === "furniture"
             ? "active-tab"
             : "";
             
             furnitureTab.onclick = () => {
                juliangBuyTab = "furniture";
                renderShopModal(shopId, player);
            };
            
            subTabWrap.appendChild(itemTab);
            subTabWrap.appendChild(furnitureTab);
            listWrap.appendChild(subTabWrap);
        }
        
        if (
            shopId !== "juliangShop" ||
            juliangBuyTab === "items"
        ) {
            const buyItems =
            shopId === "merchantVillageShop"
             ? (player.tempMerchantVillageItems || [])
             : shop.items;
             
            buyItems.forEach(item => {
                const div = document.createElement("div");
                div.className = "shop-item";

                const info = document.createElement("div");
                info.className = "shop-item-info";
                
                const name = document.createElement("strong");
                name.innerText = item.name;
                info.appendChild(name);
                
                const price = document.createElement("p");
                price.innerText = `${item.price}G`;
                info.appendChild(price);
                
                if (item.type === "heal"){
                    const desc = document.createElement("p");
                    desc.innerText = `회복량: ${item.value}`;
                    info.appendChild(desc);
                } else if (item.stats){
                    const statText = Object.entries(item.stats)
                    .map(([key, value]) => `${key} +${value}`)
                    .join(", ");
                    
                    const desc = document.createElement("p");
                    desc.innerText = statText || "능력치 변화 없음";
                    info.appendChild(desc);
                }
                
                div.appendChild(info);
                
                const buyBtn = document.createElement("button");
                const key = item.key || item.name;
        
                const bought = shopId === "merchantVillageShop" &&
                (player.tempMerchantVillageBoughtKeys || []).includes(key);
        
                buyBtn.innerText = bought ? "품절" : "구매";
                buyBtn.disabled = bought;
                
                buyBtn.onclick = () => {
                    if (shopId === "merchantVillageShop"){
                        const key = item.key || item.name;
                        
                        player.tempMerchantVillageBoughtKeys =
                        player.tempMerchantVillageBoughtKeys || [];
                    
                    if (player.tempMerchantVillageBoughtKeys.includes(key)){
                        addLog("이미 품절된 물건이다.");
                        return;
                    }
                    
                    const beforeGold = player.gold;
                    buyItem(player, item);
                    
                    if (player.gold < beforeGold){
                        player.tempMerchantVillageBoughtKeys.push(key);
                    }
                    
                    renderShopModal(shopId, player);
                    return;
                }
                
                buyItem(player, item);
                renderShopModal(shopId, player);
            };

            div.appendChild(buyBtn);
            listWrap.appendChild(div);
        });
    }

    if (
        shopId === "juliangShop" &&
        juliangBuyTab === "furniture"
    ){
        
        const furnitureIds = shop.furniture || [];
        furnitureIds.forEach(furnitureId => {
            
            const furniture = FURNITURE_DATA[furnitureId];
            
            if (!furniture){
                return;
            }
            
            const div = document.createElement("div");
            div.className = "shop-item";
            
            const info = document.createElement("div");
            info.className = "shop-item-info";
            
            const name = document.createElement("strong");
            
            name.innerText = furniture.name;
            info.appendChild(name);
            
            const price = document.createElement("p");
            
            price.innerText = `${furniture.price}G`;
            info.appendChild(price);
            
            const desc = document.createElement("p");
            
            if (furniture.type === "bed"){
                desc.innerText = "집에 배치할 수 있는 침대다.";
            
            } else if (furniture.type === "bath"){
                desc.innerText = "집에 배치할 수 있는 욕조다.";
            
            } else if (furniture.type === "doll"){
                desc.innerText = "집에 배치할 수 있는 인형이다.";
            
            } else {
                desc.innerText = "집에 배치할 수 있는 장식품이다.";
            }
            
            info.appendChild(desc);
            div.appendChild(info);
            
            const buyBtn = document.createElement("button");
            buyBtn.innerText = "구매";
            buyBtn.onclick = () => {
                buyFurniture(
                    player,
                    furnitureId
                );
                
                renderShopModal(
                    shopId,
                    player
                );
            };
            
            div.appendChild(buyBtn);
            listWrap.appendChild(div);
        });
    }

    } else {
        const sellableItems = player.inventory.filter(canSellItem);

        const grouped = {};

        sellableItems.forEach(item => {
            const key = isEquipmentItem(item)
            ? item.uid
            : item.key || item.name;

            if (!grouped[key]){
                grouped[key] = {
                    item,
                    count: 0
                };
            }

            grouped[key].count++;
        });

        const groupedItems = Object.values(grouped);

        if (groupedItems.length === 0){
            const empty = document.createElement("p");
            empty.innerText = "판매할 물건이 없다.";
            listWrap.appendChild(empty);

        } else {
            groupedItems.forEach(({ item, count }) => {
                const div = document.createElement("div");
                div.className = "shop-item";

                const info = document.createElement("div");
                info.className = "shop-item-info";

                const name = document.createElement("strong");
                name.innerText = isEquipmentItem(item)
                ? getDisplayItemName(item)
                : `${item.name} x${count}`;
                info.appendChild(name);

                const price = document.createElement("p");
                price.innerText = `판매가: ${getSellPrice(item)}G`;
                info.appendChild(price);

                if (item.type === "heal"){
                    const desc = document.createElement("p");
                    desc.innerText = `회복량: ${item.value}`;
                    info.appendChild(desc);
                } else if (item.stats){
                    const statText = Object.entries(item.stats)
                        .map(([key, value]) => `${key} +${value}`)
                        .join(", ");

                    const desc = document.createElement("p");
                    desc.innerText = statText || "능력치 변화 없음";
                    info.appendChild(desc);
                }

                div.appendChild(info);

                const sellOneBtn = document.createElement("button");
                sellOneBtn.innerText = "1개 판매";
                sellOneBtn.onclick = () => {
                    sellItem(player, item);
                    renderShopModal(shopId, player);
                };

                div.appendChild(sellOneBtn);
                if (!isEquipmentItem(item)){
                    const sellAmountBtn = document.createElement("button");
                    sellAmountBtn.innerText = "수량 판매";
                    sellAmountBtn.onclick = () => {
                        openSellQuantityModal(
                            shopId,
                            player,
                            item,
                            count
                        );
                    };
                    div.appendChild(sellAmountBtn);
                }
                listWrap.appendChild(div);
            });
        }
    }
    box.appendChild(listWrap);
}

function openSellQuantityModal(
    shopId,
    player,
    item,
    count
){
    const modal =
        document.getElementById("sellQuantityModal");

    const input =
        document.getElementById("sellQuantityInput");

    if (!modal || !input) return;

    pendingSellQuantity = {
        shopId,
        player,
        itemKey : item.key || item.name,
        count,
        price : getSellPrice(item)
    };

    document.getElementById(
        "sellQuantityItemName"
    ).innerText = item.name;

    document.getElementById(
        "sellQuantityOwned"
    ).innerText = `보유 수량: ${count}개`;

    document.getElementById(
        "sellQuantityPrice"
    ).innerText =
        `개당 판매가: ${getSellPrice(item)}G`;

    document.getElementById(
        "sellQuantityError"
    ).innerText = "";

    input.min = 1;
    input.max = count;
    input.value = count;

    updateSellQuantityTotal();

    modal.style.display = "flex";

    requestAnimationFrame(() => {
        input.focus();
        input.select();
    });
}

function updateSellQuantityTotal(){
    const input =
        document.getElementById("sellQuantityInput");

    const totalText =
        document.getElementById("sellQuantityTotal");

    if (
        !input ||
        !totalText ||
        !pendingSellQuantity
    ){
        return;
    }

    const amount = Number(input.value);

    const validAmount =
        Number.isInteger(amount) && amount > 0
            ? amount
            : 0;

    const total =
        pendingSellQuantity.price * validAmount;

    totalText.innerText =
        `총 판매액: ${total.toLocaleString()}G`;

    document.getElementById(
        "sellQuantityError"
    ).innerText = "";
}

function confirmSellQuantity(){
    if (!pendingSellQuantity) return;

    const input =
        document.getElementById("sellQuantityInput");

    const errorText =
        document.getElementById("sellQuantityError");

    const amount = Number(input.value);

    if (
        !Number.isInteger(amount) ||
        amount < 1
    ){
        errorText.innerText =
            "1 이상의 정수를 입력해주세요.";

        input.focus();
        return;
    }

    if (amount > pendingSellQuantity.count){
        errorText.innerText =
            `보유 수량은 ${pendingSellQuantity.count}개입니다.`;

        input.focus();
        return;
    }

    const {
        shopId,
        player,
        itemKey
    } = pendingSellQuantity;

    sellItems(
        player,
        itemKey,
        amount
    );

    closeSellQuantityModal();
    renderShopModal(shopId, player);
}

function closeSellQuantityModal(){
    const modal =
        document.getElementById("sellQuantityModal");

    if (modal){
        modal.style.display = "none";
    }

    pendingSellQuantity = null;
}

function handleSellQuantityKeydown(event){
    if (event.key === "Enter"){
        event.preventDefault();
        confirmSellQuantity();

    } else if (event.key === "Escape"){
        event.preventDefault();
        closeSellQuantityModal();
    }
}

function sellItem(player, item){
    const price = getSellPrice(item);

    addGold(player, price);

    const index = player.inventory.findIndex(inv =>
        isEquipmentItem(item)
            ? inv.uid === item.uid
            : (inv.key || inv.name) === (item.key || item.name)
    );

    if (index !== -1){
        player.inventory.splice(index, 1);
    }

    savePlayer(player);
    renderInventoryModal(player);

    addLog(`${item.name} 판매! +${price}G`);
}

function canSellItem(item){
    return ["weapon", "top", "bra", "bottom", "underwear", "heal", "stamina", "regen", "arousal", "consumable", "food", "sensitivityDown", "junk", "key", "ore"].includes(item.type);
}

function sellItems(player, itemKey, amount){
    const items = player.inventory.filter(
        item =>
            !isEquipmentItem(item) &&
            (item.key || item.name) === itemKey
    );

    if (items.length === 0) return;

    if (
        !Number.isInteger(amount) ||
        amount < 1 ||
        amount > items.length
    ){
        return;
    }

    const itemsToSell = items.slice(0, amount);

    const total = itemsToSell.reduce(
        (sum, item) => sum + getSellPrice(item),
        0
    );

    let soldCount = 0;

    player.inventory = player.inventory.filter(item => {
        const isTarget =
            !isEquipmentItem(item) &&
            (item.key || item.name) === itemKey;

        if (isTarget && soldCount < amount){
            soldCount++;
            return false;
        }

        return true;
    });

    addGold(player, total);
    savePlayer(player);
    renderInventoryModal(player);

    addLog(
        `${itemsToSell[0].name} ${amount}개 판매!<br>+${total}G`
    );
}

window.open_juliangShop = function(player){
    openShop("juliangShop", player);
};



//이벤트 꽃상점
const EVENT_SHOP = {
    name: "꽃 상점",
        items: [
        {
            item: ITEMS.consumable.sensitivityADownPotion,
            price: 15
        },
        {
            item: ITEMS.consumable.sensitivityBDownPotion,
            price: 15
        },
        {
            item: ITEMS.consumable.sensitivityCDownPotion,
            price: 15
        },
        {
            item: ITEMS.consumable.sensitivityMDownPotion,
            price: 15
        }
    ],

    furniture: [
        {
            id: "carrotWhiteBed",
            price: 1500
        },
        {
            id: "carrotBlackBed",
            price: 1500
        },
        {
            id: "carrotBlueBed",
            price: 1500
        },
        {
            id: "carrotGreenBed",
            price: 1500
        },
        {
            id: "carrotBunnyBed",
            price: 2500
        },
        {
            id: "carrotBunnyBunnyBed",
            price: 5000
        },
        {
            id : "dericEricDoll",
            price : 10000
        }
    ]
};

window.openEventShop = function(player){
    openEventShop(player);
};

function openEventShop(player){
    eventShopTab = "items"
    const modal = document.getElementById("shopModal");
    modal.style.display = "flex";
    renderEventShop(player);
}

function renderEventShop(player){
    const box = document.getElementById("shopContent");
    box.innerHTML = "";

    const title = document.createElement("h3");
    title.innerText = EVENT_SHOP.name;
    box.appendChild(title);

    const pointText = document.createElement("p");
    pointText.innerHTML = `<strong>보유 꽃 : ${(player.eventPoint || 0).toLocaleString()}꽃</strong>`;
    box.appendChild(pointText);
    // 탭
    const tabWrap = document.createElement("div");
    tabWrap.className = "shop-tabs";
    const itemTab = document.createElement("button");
    itemTab.innerText = "소모품";
    itemTab.className =
        eventShopTab === "items"
            ? "active-tab"
            : "";
    itemTab.onclick = () => {
        eventShopTab = "items";
        renderEventShop(player);
    };

    const furnitureTab = document.createElement("button");
    furnitureTab.innerText = "가구";
    furnitureTab.className =
        eventShopTab === "furniture"
            ? "active-tab"
            : "";
    furnitureTab.onclick = () => {
        eventShopTab = "furniture";
        renderEventShop(player);
    };

    tabWrap.appendChild(itemTab);
    tabWrap.appendChild(furnitureTab);

    box.appendChild(tabWrap);

    const listWrap = document.createElement("div");
    listWrap.className = "shop-list";

    if (eventShopTab === "items"){
        EVENT_SHOP.items.forEach(shopItem => {
            const item = shopItem.item;
            if (!item) return;

            const div = document.createElement("div");
            div.className = "shop-item";

            const info = document.createElement("div");
            info.className = "shop-item-info";

            const name = document.createElement("strong");

            name.innerText = item.name;
            info.appendChild(name);

            const price = document.createElement("p");
            price.innerText = `${shopItem.price}꽃`;
            info.appendChild(price);

            const desc = document.createElement("p");
            desc.innerText = `사용 시 해당 민감도 -${item.value}`;
            info.appendChild(desc);
            div.appendChild(info);

            const buyBtn = document.createElement("button");
            buyBtn.innerText = "구매";
            buyBtn.onclick = () => {
                buyEventItem(
                    player,
                    shopItem
                );
                renderEventShop(player);
            };
            div.appendChild(buyBtn);
            listWrap.appendChild(div);
        });
    }

    else if (eventShopTab === "furniture"){
        EVENT_SHOP.furniture.forEach(shopItem => {
            const furniture = FURNITURE_DATA[shopItem.id];
            if (!furniture) return;
            const div = document.createElement("div");
            div.className = "shop-item";
            const info = document.createElement("div");
            info.className = "shop-item-info";
            const name = document.createElement("strong");
            name.innerText = furniture.name;
            info.appendChild(name);
            const price = document.createElement("p");
            price.innerText = `${shopItem.price.toLocaleString()}꽃`;
            info.appendChild(price);
            const desc = document.createElement("p");
            if (furniture.type === "bed"){
                desc.innerText =
                    "집에 배치할 수 있는 침대다.";
            } else {
                desc.innerText =
                    "집에 배치할 수 있는 가구다.";
            }
            info.appendChild(desc);
            div.appendChild(info);
            const buyBtn = document.createElement("button");
            buyBtn.innerText = "구매";
            buyBtn.onclick = () => {
                buyEventFurniture(
                    player,
                    shopItem
                );
                renderEventShop(player);
            };
            div.appendChild(buyBtn);
            listWrap.appendChild(div);
        });
    }
    box.appendChild(listWrap);
}

function buyEventItem(player, shopItem){
    const item = shopItem.item;
    if (!item) return;
    const currentPoint =
        Number(player.eventPoint) || 0;
    if (currentPoint < shopItem.price){
        addLog("꽃이 부족하다.");
        return;
    }
    const paid =
        changeEventPoint(
            player,
            -shopItem.price
        );
    if (!paid) return;
    addItem(
        player,
        cloneItem(item)
    );
    savePlayer(player);
    addLog(
        `${item.name} 구매! -${shopItem.price}꽃`
    );
}

function buyEventFurniture(
    player,
    shopItem
){
    const furniture =
        FURNITURE_DATA[shopItem.id];
    if (!furniture) return;

    const currentPoint = Number(player.eventPoint) || 0;
    if (currentPoint < shopItem.price){
        addLog(
            "꽃이 부족하다."
        );
        return;
    }
    const paid = changeEventPoint(
        player,
            -shopItem.price
        );
    if (!paid) return;
    giveFurniture(
        player,
        shopItem.id
    );
    addLog(
        `${furniture.name} 구매! -${shopItem.price}꽃`
    );
}

//토비아스 환전 함수
window.tobias_exchangeEventPoint = function(player){
    const storyText = document.getElementById("storyText");
    const choiceArea = document.getElementById("choiceArea");
    const storyBtn = document.getElementById("storyBtn");

    const currentPoint = Number(player.eventPoint) || 0;

    storyBtn.style.display = "none";

    storyText.innerHTML = `
        토비아스는 당신이 내민 꽃을 바라보았다.
        <br><br>
        "몇 개."
        <br><br>
        보유 꽃 : <strong>${currentPoint.toLocaleString()}꽃</strong>
        <br>
        환율 : <strong>1꽃 = ${EVENT_POINT_EXCHANGE_RATE.toLocaleString()}G</strong>
    `;

    choiceArea.innerHTML = `
        <input
            id="eventPointExchangeInput"
            type="number"
            class="story-input"
            min="1"
            max="${currentPoint}"
            placeholder="환전할 꽃 개수"
        >
        <br><br>
        <button id="eventPointExchangeBtn">환전한다</button>
        <button id="eventPointExchangeCancelBtn">그만둔다</button>
    `;

    const input =
        document.getElementById("eventPointExchangeInput");

    const exchangeBtn =
        document.getElementById("eventPointExchangeBtn");

    const cancelBtn =
        document.getElementById("eventPointExchangeCancelBtn");

    function exchange(){
        const amount = Number(input.value);

        if (
            !Number.isInteger(amount) ||
            amount < 1
        ){
            addLog("1 이상의 정수를 입력해주세요.");
            input.focus();
            return;
        }

        if (amount > player.eventPoint){
            addLog("꽃이 부족하다.");
            input.focus();
            return;
        }

        const gold =
            amount * EVENT_POINT_EXCHANGE_RATE;

        const paid =
            changeEventPoint(player, -amount);

        if (!paid) return;

        addGold(player, gold);
        savePlayer(player);

        startScene([
            {
                type : "text",
                value :
                    `토비아스는 꽃 ${amount.toLocaleString()}개를 받아들고 ` +
                    `${gold.toLocaleString()}G를 건넸다.`
            }
        ], player);
    }

    exchangeBtn.onclick = exchange;

    cancelBtn.onclick = () => {
        startScene(
            getLocationScene(player),
            player
        );
    };

    input.addEventListener("keydown", e => {
        if (e.key === "Enter"){
            e.preventDefault();
            exchange();
        }
    });

    input.focus();
};
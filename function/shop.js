let shopTab = "buy";

function getSellPrice(item){
    if (!item) return 0;
    return item.type === "junk" ? (item.price || 0) : Math.floor((item.price || 0) * 0.5);
}

const SHOPS = {
    soraShop: {
        name: "소라의 상점",
        items: [
            ITEMS.weapon.dagger,
            ITEMS.weapon.dancingdagger,
            ITEMS.weapon.sword,
            ITEMS.weapon.bigsword,
            ITEMS.weapon.magicstick,

            ITEMS.top.tshirt,
            ITEMS.top.tanktop,
            ITEMS.top.croptshirt,
            ITEMS.top.overshirt,
            ITEMS.top.hoodie,

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

            ITEMS.consumable.smallPotion,
            ITEMS.consumable.mediumPotion,
            ITEMS.consumable.highPotion,
            ITEMS.consumable.fullPotion,

            ITEMS.consumable.smallStaminaPotion,
            ITEMS.consumable.mediumStaminaPotion,
            ITEMS.consumable.largeStaminaPotion,

            ITEMS.consumable.calmPotion
        ]
    },
    matinShop : {
        name : "마틴의 주점 물품",
        items : [
            ITEMS.top.tavernUpper,
            ITEMS.bottom.tavernBottom,
            
            ITEMS.consumable.beer,
            ITEMS.consumable.whiskey,
            ITEMS.consumable.soju
        ]
    }
};

function openShop(shopId, player){
    shopTab = "buy";
    const modal = document.getElementById("shopModal");
    modal.style.display = "flex";
    renderShopModal(shopId, player);
}

function closeShop(){
    document.getElementById("shopModal").style.display = "none";
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
        shop.items.forEach(item => {
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
            buyBtn.innerText = "구매";
            buyBtn.onclick = () => {
                buyItem(player, item);
                renderShopModal(shopId, player);
            };

            div.appendChild(buyBtn);
            listWrap.appendChild(div);
        });

    } else {
        const sellableItems = player.inventory.filter(canSellItem);

        const grouped = {};

        sellableItems.forEach(item => {
            const key = item.name;

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
                name.innerText = `${item.name} x${count}`;
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

                const sellAllBtn = document.createElement("button");
                sellAllBtn.innerText = "전부 판매";
                sellAllBtn.onclick = () => {
                    sellAllItems(player, item.name);
                    renderShopModal(shopId, player);
                };

                div.appendChild(sellOneBtn);
                div.appendChild(sellAllBtn);

                listWrap.appendChild(div);
            });
        }
    }

    box.appendChild(listWrap);
}

function sellItem(player, item){
    const price = getSellPrice(item);

    addGold(player, price);

    const index = player.inventory.indexOf(item);
    if (index !== -1){
        player.inventory.splice(index, 1);
    }

    localStorage.setItem("playerData", JSON.stringify(player));
    renderInventoryModal(player);

    alert(item.name + " 판매! +" + price + "원");
}

function canSellItem(item){
    return ["weapon", "top", "bottom", "underwear", "heal", "consumable", "junk", "key"].includes(item.type);
}

function sellAllItems(player, itemName){

    const items = player.inventory.filter(
        item => item.name === itemName
    );

    if (items.length === 0) return;

    let total = 0;

    items.forEach(item => {
        total += getSellPrice(item);
    });

    player.inventory = player.inventory.filter(
        item => item.name !== itemName
    );

    addGold(player, total);
    localStorage.setItem("playerData", JSON.stringify(player));
    renderInventoryModal(player);

    alert(`${itemName} ${items.length}개 판매! +${total}G`);
}
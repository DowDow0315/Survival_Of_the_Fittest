function countItem(player, itemKey){
    return player.inventory.filter(item => 
        item.key === itemKey
    ).length;
}

function removeItem(player, itemKey, count = 1){
    let removed = 0;

    player.inventory = player.inventory.filter(item => {
        if (item.key === itemKey && removed < count){
            removed++;
            return false;
        }
        return true;
    });

    localStorage.setItem("playerData", JSON.stringify(player));

    return removed;
}
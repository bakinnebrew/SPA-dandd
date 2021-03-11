document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#equipment-button').addEventListener('click', load_equipment)
    document.querySelector('#monster-button').addEventListener('click', load_monsters)
    document.querySelector('#dice-roller-button').addEventListener('click', load_dice_roller_view)

    let monst_arr = [];
 
    load_monsters();   

});

//search feature that searches array of monsters for substring in Search 
function search() {

    const search_value = document.querySelector('#name').value.toLowerCase();
    var word = search_value.toString()
    console.log(word);
    var search_arr = [];

    for(i = 0; i < monst_arr.length; i++){
        const monster_name = monst_arr[i];
        if(monster_name.includes(word)){
            console.log("found it", monst_arr[i]);
            search_arr.push(monster_name);
        }
    };
   
    console.log(search_arr)

    load_search_results(search_arr)

    };

function load_monsters(){
    const parent = document.getElementById("monster-list")
    while (parent.firstChild) {
     parent.firstChild.remove()
    }

    monst_arr = [];

    document.getElementById('monster-list').style.display = 'block';
    document.getElementById('equipment-list').style.display = 'none';
    document.getElementById('dice-roller-view').style.display = 'none';
    document.getElementById('search-results').style.display = 'none';
    document.getElementById('single-equipment').style.display = 'none';
    document.getElementById('single-monster').style.display = 'none';
    document.querySelector('form').style.display = 'block';

    fetch('https://www.dnd5eapi.co/api/monsters')
    .then(response => response.json())
    .then(monsters => {
    for(i = 0; i < monsters.count; i++){
        console.log(monsters.results[i].name);
        const monst_name = document.createElement('div');
        monst_name.innerHTML = monsters.results[i].name;
        const monst_url = monsters.results[i].url;
        monst_arr.push(monsters.results[i].index);
        monst_name.addEventListener('click', function() {
            load_single_monster(monst_url);
        });
        document.querySelector('#monster-list').append(monst_name);
        };
    });
    console.log(monst_arr)
};

function load_single_monster(monst_url){
    const parent = document.getElementById("single-monster")
    while (parent.firstChild) {
     parent.firstChild.remove()
    }
    document.getElementById('monster-list').style.display = 'none';
    document.getElementById('equipment-list').style.display = 'none';
    document.getElementById('single-equipment').style.display = 'none';
    document.getElementById('search-results').style.display = 'none';
    document.getElementById('dice-roller-view').style.display = 'none';
    document.querySelector('form').style.display = 'none';
    document.getElementById('single-monster').style.display = 'block';

    fetch(`https://www.dnd5eapi.co${monst_url}`)
    .then(response => response.json())
    .then(monster => {
        console.log(monster)
        const monster_name = document.createElement('h1');
        const monster_AC = document.createElement('h6');
        const monster_HP = document.createElement('h6');
        const monster_alignment = document.createElement('h6');
        monster_name.innerHTML = monster.name;
        monster_AC.innerHTML = "AC: " + monster.armor_class;
        monster_HP.innerHTML = "HP: " + monster.hit_points;
        monster_alignment.innerHTML = "Alignment: " + monster.alignment;
        document.querySelector('#single-monster').append(monster_name);
        document.querySelector('#single-monster').append(monster_AC);
        document.querySelector('#single-monster').append(monster_HP);
        document.querySelector('#single-monster').append(monster_alignment);
    })
}

function load_single_equipment(equip_url){
    const parent = document.getElementById("single-equipment")
    while (parent.firstChild) {
     parent.firstChild.remove()
    }
    document.getElementById('monster-list').style.display = 'none';
    document.getElementById('equipment-list').style.display = 'none';
    document.getElementById('single-monster').style.display = 'none';
    document.getElementById('search-results').style.display = 'none';
    document.querySelector('form').style.display = 'none';
    document.getElementById('dice-roller-view').style.display = 'none';
    document.getElementById('single-equipment').style.display = 'block';

    fetch(`https://www.dnd5eapi.co${equip_url}`)
    .then(response => response.json())
    .then(equipment => {
        console.log(equipment)
        const equipment_name = document.createElement('h1');
        equipment_name.innerHTML = equipment.name;
        document.querySelector('#single-equipment').append(equipment_name);

    })
}

function load_equipment(){

    const parent = document.getElementById("equipment-list")
    while (parent.firstChild) {
     parent.firstChild.remove()
    }
    
    document.getElementById('monster-list').style.display = 'none';
    document.getElementById('single-monster').style.display = 'none';
    document.getElementById('search-results').style.display = 'none';
    document.getElementById('single-equipment').style.display = 'none';
    document.querySelector('form').style.display = 'none';
    document.getElementById('dice-roller-view').style.display = 'none';
    document.getElementById('equipment-list').style.display = 'block';

    fetch('https://www.dnd5eapi.co/api/equipment')
    .then(response => response.json())
    .then(equipments => {
    for(i = 0; i< equipments.count; i++){
        console.log(equipments.results[i].name);
        const equip_name = document.createElement('div');
        equip_name.innerHTML = equipments.results[i].name;
        const equip_url = equipments.results[i].url;
        equip_name.addEventListener('click', function() {
            load_single_equipment(equip_url);
        });
        document.querySelector('#equipment-list').append(equip_name);
        };
    });
};


function load_search_results(search_arr){

    const parent = document.getElementById("search-results")
    while (parent.firstChild) {
     parent.firstChild.remove()
    }

    document.getElementById('search-results').style.display = 'block';
    document.getElementById('monster-list').style.display = 'none';
    document.getElementById('single-monster').style.display = 'none';
    document.getElementById('single-equipment').style.display = 'none';
    document.getElementById('equipment-list').style.display = 'none';
    document.getElementById('dice-roller-view').style.display = 'none';
    document.querySelector('form').style.display = 'none';

    console.log(search_arr);
     
    let results_title = document.createElement('h1');
    if(search_arr.length === 0){
        results_title.innerHTML = "There are no results to display";
    }
    else{
    results_title.innerHTML = "Related Search Results";
    }
    document.querySelector('#search-results').append(results_title);

    for(i = 0; i < search_arr.length; i++){
        const monster_name = document.createElement('div');
        monster_name.innerHTML = search_arr[i];
        monster_name.addEventListener('click', function() {
            load_single_monster(`/api/monsters/${monster_name.innerHTML}`);
        });
        document.querySelector('#search-results').append(monster_name);
    }
};

function load_dice_roller_view(){
    document.getElementById('search-results').style.display = 'none';
    document.getElementById('monster-list').style.display = 'none';
    document.getElementById('single-monster').style.display = 'none';
    document.getElementById('single-equipment').style.display = 'none';
    document.getElementById('equipment-list').style.display = 'none';
    document.getElementById('dice-roller-view').style.display = 'block';
    document.querySelector('form').style.display = 'none';
}


function die_roll(){

    let die_quantity = document.getElementById('die-quantity').value;
    let die_kind = document.getElementById('die-kind').value;
    let die_modifier_id = document.getElementById('die-modifier').value;
    let die_modifier_value = parseInt(die_modifier_id);

    if(die_quantity < 1 || die_quantity % 1 != 0) {
    let result_display = document.createElement('h6');
    result_display.innerHTML = "Please enter a correct value"
    document.querySelector('#roll-result').innerHTML = result_display.innerHTML;
    }

    else{
    roll_result = (1 + Math.floor(Math.random() * Math.floor(die_kind))) * die_quantity + die_modifier_value;
    console.log(roll_result);
    result_display = document.createElement('h6');
    result_display.innerHTML = "Result:" + roll_result;
    document.querySelector('#roll-result').innerHTML = result_display.innerHTML;
    };
};

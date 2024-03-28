


rooms = {}
rooms.Garten = {
    "img": "pics/garden.jpg",
    "enter" : (player) => {
        return "Du betrittst eine wunderschönen Garten.";
    },
    "leave": "Du verlässt den wunderschönen Garten.",
    "ways": {
        "Norden": "Kirche",
        "Süden": "Teich"
    },
    "things": ["Blume", "Apfelbaum"],
    "action": {
        "nimm Blume": (player) => {
            if (player.inventory.find((x) => x == "Blume")) {
                player.game.say("Du hast schon eine Blume. Das sollte reichen.")
            } else {
                player.inventory.push("Blume");
            }
        }
    }
}

rooms.Kirche = {
    "img": "pics/church.jpg",
    "enter": "Du näherst dich einer Kirche.",
    "leave": "Du verlässt die Kirche.",
    "ways": {
        "Süden": "Garten"
    },
    "things": ["Taufstein", "Kerze"],
    "action": {
    }
}

rooms.Teich = {
    "img": "pics/pond.jpg",
    "enter": "Du näherst dich einem Teich.",
    "leave": "Du verlässt den Teich.",
    "ways": {
        "Norden": "Garten"
    },
    "things": ["Seerose"],
    "action": {
    }
}

answers = {
    "betrachte Taschenmesser": "Ein Taschenmesser mit einer Klinge und einer Schere.",
    "betrachte Blume": "Eine wunderschöne Blume.",
    "betrachte Apfelbaum": "Ein Apfelbaum mit vielen Äpfeln.",
    "betrachte Kirche": "Eine alte Kirche.",
    "betrachte Teich": "Ein Teich mit Seerosen.",
    "benutze Taschenmesser": "Wozu willst du das Taschenmesser benutzen?",
    "betrachte" : "Du siehst nichts besonderes.",
}


player = {
}
player.log = "Willkommen in unserem Abenteuer"
player.room = "Garten"
player.commands = ["Betrachte", "Nimm", "Benutze"] 
player.inventory = ["Taschenmesser"]
player.game =  {
    "rooms": rooms
}


// program code below


function execute_command(cmd) { 


    var m_len = 0;
    var final_action = "Das kann ich nicht tun.";

    for (const [command, action] of Object.entries(answers))  {
        const m = cmd.match(new RegExp(command, "i" ));
        if (m && m.length && m[0].length > m_len) {
            final_action = action;
            m_len = m[0].length;  
        }
    }
    const resp = get_response(final_action, player);
    add_to_log("\n" + cmd);
    add_to_log("\n" + resp);
}

function add_to_log(text) {
    player.log += '\n' + text;

    let thelog = document.getElementById("log"); 
    thelog.textContent = player.log;
    thelog.scrollTop = thelog.scrollHeight;
}

function select_item(item) {
    document.getElementById("command").value += " " + item;
    execute_command(document.getElementById("command").value);
}

function select_thing(item) {
    document.getElementById("command").value += " " + item;
    execute_command(document.getElementById("command").value);
}


function select_action(action) {
    player.game.current_action = action;
    document.getElementById("command").value = action;
}


function get_response(action, player) {
    return action instanceof Function ? action(player) : action;
}

function move_to(direction) {

    const old_room = player.game.rooms[player.room];
   
    player.log += '\n' + get_response(old_room.leave, player);
   
    player.room = direction;

    const new_room = player.game.rooms[direction];
    
    const direction_list = document.getElementById("dir-list");
    const new_list = document.createElement("span");
    
    for (const [dir, room]  of Object.entries(new_room.ways)) {
        const b =document.createElement('button');
        b.innerText = dir;
        b.onclick = () => move_to(room);
        new_list.appendChild(b);
    }

    direction_list.replaceWith(new_list);
    new_list.setAttribute("id", "dir-list");


    const bild = document.getElementById("bild");
    bild.setAttribute("src", new_room.img);
    
    const inventory = document.createElement("span");
    inventory.setAttribute("id", "inventory");
    for (const item of player.inventory) {
        const b = document.createElement('button');
        b.innerText = item;
        b.onclick = () => select_item(item);
        inventory.appendChild(b);
    }
    
    document.getElementById("inventory").replaceWith(inventory);
    
    const new_things_span = document.createElement("span");
    new_things_span.setAttribute("id", "things");
    for (const item of new_room.things) {
        const b = document.createElement('button');
        b.innerText = item;
        b.onclick = () => select_thing(item);
        new_things_span.appendChild(b);
    }
    
    document.getElementById("things").replaceWith(new_things_span);

    const new_actions_span = document.createElement("span");
    new_actions_span.setAttribute("id", "actions");
    for (const item of player.commands) {
        const b = document.createElement('button');
        b.innerText = item;
        b.onclick = () => select_action(item);
        new_actions_span.appendChild(b);
    }
    
    document.getElementById("actions").replaceWith(new_actions_span);

    player.log += '\n' + get_response(old_room.enter, player);

    let thelog = document.getElementById("log"); 
    thelog.textContent = player.log;
    thelog.scrollTop = thelog.scrollHeight;

}


function start() {
    move_to("Garten");
}


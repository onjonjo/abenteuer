


rooms = {}
rooms.Garten = {
    "img": "pics/garden.jpg",
    "enter": (player) => {
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
    "things": ["Seerose", "Katze"],
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
    "benutze Taschenmesser mit Apfelbaum": [
        transfer([],["Ast"],[],[],
            "Du schneidest einen Ast ab."),
        "Du ritzt deine Namen in den Baum.",
        "Der Baum soll nicht weiter verschandelt werden."
    ],
    " Katze": "Die Katze miaut dich an.",
    "betrachte": "Du siehst nichts besonderes.",
    "Nimm Ast": transfer(["Ast"], ["Apfel"], [""], ["Ast"], "Du hebst den Ast auf. An dem Ast hing ein Apfel, der zu Boden fiel."),
}


player = {
}
player.log = "Willkommen in unserem Abenteuer"
player.room = "Garten"
player.commands = ["Betrachte", "Nimm", "Benutze"]
player.current_command = null;
player.inventory = ["Taschenmesser"]
player.game = {
    "rooms": rooms
}


function transfer(things_remove, things_add, items_remove, items_add, msg) {
    return (player) => {
        player.game.rooms[player.room].things = player.game.rooms[player.room].things.filter((x) => things_remove.indexof(x) >= 0).concat(things_add);
        player.inventory = player.inventory.filter((x) => items_remove.indexof(x) >= 0).concat(items_add);
        return msg;
    }
}

// program code below


function execute_command(cmd) {


    var m_len = 0;
    var final_action = "Das kann ich nicht tun.";

    for (const [command, action] of Object.entries(answers)) {
        const m = cmd.match(new RegExp(command, "i"));
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
    if (player.current_command != null) {
        if (player.current_command === "Benutze") {
            player.current_command = "Benutze " + item + " mit";
            document.getElementById("command").value = player.current_command;
            return;
        }
        document.getElementById("command").value = player.current_command + " " + item;
        execute_command(document.getElementById("command").value);
    }
    player.current_command = null;
    build_room(player.room);
}

function select_thing(thing) {
    if (player.current_command != null) {
        if (player.current_command === "Benutze") {
            player.current_command = "Benutze " + thing + " mit";
            document.getElementById("command").value = player.current_command;
            return;
        }
        document.getElementById("command").value = player.current_command + " " + thing;
        execute_command(document.getElementById("command").value);

    }
    player.current_command = null;
    build_room(player.room);
}


function select_action(command) {
    player.game.current_action = command;
    player.current_command = command;
    document.getElementById("command").value = command;
}


function get_response(action, player) {

    if (action instanceof Array) {
        if (action.length == 1) {
            return get_response(action[0], player);
        } else {
            return get_response(action.shift(), player);
        }
    }

    return action instanceof Function ? action(player) : action;
}

function move_to(new_room_name) {

    const old_room = player.game.rooms[player.room];

    add_to_log(get_response(old_room.leave, player));
    player.room = new_room_name;

    build_room(new_room_name);

    add_to_log(get_response(player.game.rooms[player.room].enter, player));
}
function build_room(new_room_name) {

    const new_room = player.game.rooms[new_room_name];

    const direction_list = document.getElementById("dir-list");
    const new_list = document.createElement("span");

    for (const [dir, room] of Object.entries(new_room.ways)) {
        const b = document.createElement('button');
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

}


function start() {
    build_room("Garten");
}


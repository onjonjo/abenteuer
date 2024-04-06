
rooms = {}
rooms.Garten = {
    "img": "pics/garden.jpg",
    "enter": (player) => {
        return "Du betrittst eine wunderschönen Garten.";
    },
    "leave": "Du verlässt den wunderschönen Garten.",
    "ways": {
        "Gehe nach Norden": "Kirche",
        "Gehe nach Süden": "Teich"
    },
    "things": ["Bank", "Apfelbaum"],
   
}

rooms.Kirche = {
    "img": "pics/church.jpg",
    "enter": "Du näherst dich einer Kirche.",
    "leave": "Du verlässt die Kirche.",
    "ways": {
        "Gehe nach Süden": "Garten"
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
        "Gehe nach Norden": "Garten"
    },
    "things": ["Teich", "Katze"],
    "action": {
    }
}

answers = {
    "betrachte Taschenmesser": "Ein Taschenmesser mit einer Klinge und einer Schere.",
    "betrachte Blume": "Eine wunderschöne Blume.",
    "betrachte Apfelbaum": "Ein Apfelbaum mit vielen Äpfeln.",
    "betrachte Kirche": "Eine alte Kirche.",
    "betrachte Teich": "Ein Teich mit Seerosen. Darin schwimmt ein Fisch.",
    "Betrachte Faden": "Ein langer Faden. Er sieht sehr robust aus.",
    "Betrachte Bank": [transfer([], ["krummer Nagel"], [], [],
        "Eine alte Bank. In der Seite steckt locker ein alter krummer Nagel."),
        "Die Bank ist immer noch da."
    ],
    "Nimm krummer Nagel": [transfer(["krummer Nagel"], [], [], ["krummer Nagel"], 
        "Du kannst den Nagel einfach aus dem alten Holz ziehen"),
        "Du hast den Nagel doch schon."],       
    "benutze Taschenmesser": "Wozu willst du das Taschenmesser benutzen?",
    "benutze Taschenmesser mit Apfelbaum": [
        transfer([], ["Ast"], [], [],
            "Du schneidest einen Ast ab."),
        "Du ritzt deine Namen in den Baum.",
        "Der Baum soll nicht weiter verschandelt werden."],
    "benutze Taschenmesser mit Bank": [
        "du ritzt deinen Namen in die Bank. Die Bank ist so alt, da macht das nichts.", 
         "Wozu? Dein Name steht Doch schon auf der Bank, oder?",
         "Na schön, du ritzt den Namen deines Haustiers in die Bank. Nun ist aber gut!",
        "Das reicht jetzt aber."],
    " Katze": "Die Katze miaut dich an.",
    "Benutze Faden mit Katze|Benutze Katze mit Faden": "Die Katze spielt mit dem Faden.",
    "Benutze Taschenmesser mit Katze|Benutze Katze mit Taschenmesser": "Nein, das lassen wir besser sein.",
    "betrachte": "Du siehst nichts besonderes.",
    "Nimm Ast": [
        transfer(["Ast"], ["Apfel"], [""], ["Ast"], "Du hebst den Ast auf. An dem Ast hing ein Apfel, der zu Boden fiel."),
        "Du hast den Ast schon."
    ],
<<<<<<< HEAD
    "Nimm Apfel": [
        transfer(["Apfel"], [], ["Apfel"], ["Apfel"], "Du hebst den Apfel auf. Er ist schön rot."),
        "Du nimmst den Apfel nochmals in die Hand. Er ist immer noch schön rot."
    ],
    "Benutze Taschenmesser mit Apfel|Benutze Apfel mit Taschenmesser": transfer(["Apfel"], [], ["Apfel"], ["Wurm"],
=======
    "Nimm Apfel$": [
        transfer(["Apfel"], [], [""], ["Apfel"], "Du hebst den Apfel auf. Er ist schön rot."),
        "Du nimmst den Apfel nochmals in die Hand. Er ist immer noch schön rot."
    ],
    "Nimm Apfelbaum":"Der steckt fest im Boden.",
    "Benutze Taschenmesser mit Apfel|Benutze Apfel mit Taschenmesser": transfer([], [], ["Apfel"], ["Wurm"],
>>>>>>> 848da129766d80f998b770984b187068646215eb
        "Du schneidest den Apfel auf und findest einen Wurm."),

    "Betrachte Taufstein": [transfer([], ["Tuch"], [], [], "Ein alter Taufstein mit einem Tuch."),
        "Immer noch der gleiche Taufstein."
    ],
    "Betrachte Tuch": [transfer([], ["Faden"], [], [], "An dem Tuch hängt ein langer Faden."),
        "Ein schönes Tuch."
    ],
    "Nimm Faden": [transfer(["Faden"], [], [], ["Faden"], "Du hebst den Faden auf."),
        "Du hast den Faden schon."
    ],
    "Benutze Faden mit Ast|Benutze Ast mit Faden": transfer([], [], ["Faden", "Ast"], ["Ast mit Faden"], 
        "Du knotest den Faden an das Ende des Astes fest."),
    "Benutze Ast mit Faden mit krummer Nagel": transfer([], [], ["Ast mit Faden", "krummer Nagel"], ["Angel"], 
        "Du hast eine Angel gebaut."),
    "Benutze Angel mit Wurm|Benutze Wurm mit Angel": transfer([], [], ["Angel", "Wurm"], ["Angel mit Köder"], 
        "Damit sollte sich doch was fangen lassen."),
    "Benutze Angel mit Köder mit Teich|Benutze Teich mit Angel mit Köder": [
        "Du wirfst die Angel aus und wartest. Leider passiert nichts.",
        "Du versuchst es nochmals. Plötzlich zuckt die Angel. Du ruckst an, aber im letzten Moment entwischt der Fisch.",
        transfer([], [], ["Angel mit Köder"], ["Angel", "Fisch"],
         "Du versuchst es nochmals. Diesmal hast du Glück. Du ziehst einen Fisch an Land."),
    ],
    "Betrachte Fisch": "Ein glibberiger Karpfen.",
    "Benutze Fisch mit Katze|Benutze Katze mit Fisch": transfer(["Katze"], [], ["Fisch"], ["Katze"],
     "Die Katze frisst den Fisch. Jetzt ist sie dein Freund und folgt dir"),
}


player = {
}
player.log = ""
player.room = "Garten"
player.commands = ["Betrachte", "Nimm", "Benutze"]
player.current_command = null;
player.inventory = ["Taschenmesser"]
player.game = {
    "rooms": rooms
}

/**
 * 
 * @param {Array<string>} things_remove 
 * @param {Array<string>} things_add 
 * @param {Array<string>} items_remove 
 * @param {Array<string>} items_add 
 * @param {string} msg 
 * @returns 
 */
function transfer(things_remove, things_add, items_remove, items_add, msg) {
    return (player) => {
        player.game.rooms[player.room].things = player.game.rooms[player.room].things.filter((x) => things_remove.indexOf(x) < 0).concat(things_add);
        player.inventory = player.inventory.filter((x) => items_remove.indexOf(x) < 0).concat(items_add);
        return msg;
    }
}

// program code below
/**
 * 
 * @param {string} cmd 
 */
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
    add_to_log(cmd);
    add_to_log(resp);
}

function add_to_log(text) {
    player.log += '\n' + text;

    let thelog = document.getElementById("log");
    thelog.textContent = player.log;
    thelog.scrollTop = thelog.scrollHeight;
}

/**
 * 
 * @param {string} item 
 * @returns 
 */
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

/**
 *  @param {string} thing
 */
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
    add_to_log("Willkommen im uunserem Spiel. Du kannst die Richtung mit den Buttons wählen. Du kannst auch Dinge betrachten, nehmen und benutzen. Viel Spaß!");
    build_room("Garten");
}


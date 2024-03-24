
rooms = {}
rooms.Garten = {
    "img": "https://media01.living4media.com/largepreviews/NDI0NjY5NzQ0/13699024-Kleingarten-im-Herbst-mit-Apfelbaum-und-Glashaus.jpg",
    "enter" : (player) => {
        player.game.say("Du betrittst eine wunderschönen Garten.");
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
    "img": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Ahekapelle_im_Genfbachtal-2209.jpg",
    "ways": {
        "Süden": "Garten"
    },
    "things": ["Blume", "Apfelbaum"],
    "action": {
    }
}

rooms.Teich = {
    "img": "https://www.mein-schoener-garten.de/sites/default/files/styles/teaser_15_9_full_lg/public/seerosen-501699-blp-msg.jpg",
    "ways": {
        "Norden": "Garten"
    },
    "things": ["Seerose"],
    "action": {
    }
}

player = {}
player.room = "Garten"
player.inventory = ["Taschenmesser"]
player.game =  {
    "rooms": rooms
}


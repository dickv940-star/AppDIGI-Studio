// ======================================
// AppDIGI Studio
// panel.js
// Mengatur semua panel popup
// ======================================

function openPanel(type) {

    const panel = document.getElementById("panel");

    panel.style.display = "flex";

    const items = [
        "voice",
        "style",
        "size",
        "duration",
        "scene",
        "prompt"
    ];

    items.forEach(id => {

        const el = document.getElementById(id);

        if (el) {
            el.style.display = "none";
        }

    });

    document.getElementById(type).style.display = "block";

    document.getElementById("title").innerHTML = type;

}

function closePanel() {

    document.getElementById("panel").style.display = "none";

}

function selectVoice(type) {

    alert("Voice dipilih : " + type);

}

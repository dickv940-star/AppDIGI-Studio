// ======================================
// AppDIGI Studio
// app.js
// Controller Utama
// ======================================

const scanner = new Scanner();
const ui = new UI();

// Delay animasi
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ======================================
// ANALISA PRODUK
// ======================================

async function runAnalysis() {

    const url = document.getElementById("urlInput").value.trim();

    if (url === "") {
        alert("Masukkan URL produk terlebih dahulu.");
        return;
    }

    ui.reset();

    ui.addStep("🔍 Memvalidasi URL...");
    await delay(600);

    const result = scanner.validateProductUrl(url);

    if (!result.marketplace) {

        ui.addStep("❌ Marketplace tidak didukung");

        ui.showError("Marketplace tidak dikenali.");

        return;

    }

    ui.addStep("✅ URL Valid");
    await delay(500);

    ui.addStep("🔍 Mendeteksi Marketplace...");
    await delay(600);

    ui.addStep("✅ " + result.marketplace);
    await delay(500);

    ui.addStep("🔍 Memverifikasi Produk...");
    await delay(700);

    if (result.valid) {

        ui.addStep("✅ Halaman Produk Valid");

    } else {

        ui.addStep("❌ Bukan Halaman Produk");

    }

    await delay(500);

    ui.addStep("🟢 Confidence " + result.confidence + "%");

    // Sprint 3
    const intelligence = scanner.analyzeProductIntelligence(url);

    const ai = scanner.aiBrainAnalysis(
        intelligence.product,
        intelligence.validation
    );

    ui.showResult(result, ai);

}

// ======================================
// GENERATE VIDEO
// ======================================

function generate() {

    alert("Fitur Generate Video AI masih Sprint berikutnya.");

}

// ======================================
// START APP
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("scanBtn");

    if (btn) {

        btn.addEventListener("click", runAnalysis);

    }

    if ("serviceWorker" in navigator) {

        navigator.serviceWorker.register("service-worker.js");

    }

});

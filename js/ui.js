// =======================================
// AppDIGI Studio
// ui.js
// Semua update tampilan aplikasi
// =======================================

class UI {

    constructor() {

        this.steps = document.getElementById("analysisSteps");
        this.result = document.getElementById("resultCard");

    }

    reset() {

        this.steps.innerHTML = "";
        this.result.innerHTML = "";

    }

    addStep(text) {

        this.steps.innerHTML += `
            <div class="analysis-item">
                ${text}
            </div>
        `;

        this.steps.scrollTop = this.steps.scrollHeight;

    }

    showResult(result, ai = null) {
let html = `

<div class="status-card">

<h3>STATUS ANALISA</h3>

<p>
<b>Marketplace</b><br>
${result.marketplace}
</p>

<p>
<b>URL</b><br>
${result.valid ? "VALID ✅" : "INVALID ❌"}
</p>

<p>
<b>Produk</b><br>
${result.valid ? "VALID ✅" : "BUKAN HALAMAN PRODUK ❌"}
</p>

<p>
<b>Confidence</b><br>
${result.confidence}%
</p>

`;

    showError(message){

        this.result.innerHTML = `

        <div class="status-card">

            <h3>ERROR</h3>

            <p>${message}</p>

        </div>

        `;
html += `

<hr>

<h3>AI ANALYZER</h3>

<p>
<b>Product Score</b><br>
${ai.productScore}
</p>

<p>
<b>Viral Score</b><br>
${ai.viralScore}
</p>

<p>
<b>Target Buyer</b><br>
${ai.targetBuyer}
</p>

<p>
<b>Recommendation</b><br>
${ai.recommendation}
</p>

`;
       html += `

<hr>

<p>

<b>Status</b><br>

${result.confidence>=80

? "🟢 Siap dianalisa AI"

: "🔴 URL harus diperbaiki"}

</p>

</div>

`; 
    }

}

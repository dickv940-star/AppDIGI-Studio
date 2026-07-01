class Scanner {

    // =========================
    // 1. DETECT MARKETPLACE
    // =========================
    detect(url) {

        if (!url) {
            return { valid: false };
        }

        const lower = url.toLowerCase();

        let marketplace = null;
        let valid = false;

        if (lower.includes("shopee.co.id")) {
            marketplace = "Shopee";
            valid = true;
        }

        else if (lower.includes("tokopedia.com")) {
            marketplace = "Tokopedia";
            valid = true;
        }

        else if (lower.includes("tiktok.com")) {
            marketplace = "TikTok Shop";
            valid = true;
        }

        else if (lower.includes("lazada.co.id")) {
            marketplace = "Lazada";
            valid = true;
        }

        return {
            marketplace,
            valid,
            domain: this.safeDomain(url)
        };
    }

    // =========================
    // 2. VALIDASI URL + CONFIDENCE (SPRINT 1)
    // =========================
    validateProductUrl(url) {

        const result = this.detect(url);

        if (!result.valid) {
            return {
                valid: false,
                confidence: 0,
                marketplace: null,
                domain: null,
                reason: "Marketplace tidak didukung"
            };
        }

        let confidence = 40;
        const lower = url.toLowerCase();

        switch (result.marketplace) {

            case "Shopee":
                if (lower.includes("-i.") || lower.includes("/product/") || lower.includes("i.")) {
                    confidence += 60;
                }
                break;

            case "Tokopedia":
                if (lower.includes("/p/")) {
                    confidence += 60;
                }
                break;

            case "TikTok Shop":
                if (lower.includes("/product/")) {
                    confidence += 60;
                }
                break;

            case "Lazada":
                if (lower.includes(".html")) {
                    confidence += 60;
                }
                break;
        }

        return {
            valid: confidence >= 80,
            confidence,
            marketplace: result.marketplace,
            domain: result.domain
        };
    }

    // =========================
    // 3. PRODUCT INTELLIGENCE (SPRINT 2)
    // =========================
    analyzeProductIntelligence(url) {

        const validation = this.validateProductUrl(url);
        const product = this.mockFetchProductData(url);

        let completeness = 0;

        if (product.title) completeness += 25;
        if (product.price) completeness += 25;
        if (product.images?.length > 0) completeness += 25;
        if (product.description?.length > 20) completeness += 25;

        let fakeRisk =
            completeness < 50 ? "HIGH" :
            completeness < 80 ? "MEDIUM" : "LOW";

        return {
            validation,
            product,
            completenessScore: completeness,
            fakeRisk
        };
    }

    // =========================
    // 4. AI BRAIN (SPRINT 3)
    // =========================
    aiBrainAnalysis(product, validation) {

        let score = 50;

        // product quality
        if (product.title) score += 10;
        if (product.price) score += 10;
        if (product.images?.length > 0) score += 10;
        if (product.description?.length > 20) score += 10;

        // marketplace trust
        if (validation.marketplace === "Shopee") score += 5;
        if (validation.marketplace === "Tokopedia") score += 5;

        // penalties
        if (!product.images?.length) score -= 15;
        if (!product.price) score -= 10;

        // clamp
        score = Math.max(0, Math.min(100, score));

        let viral = Math.floor(score * 0.85 + Math.random() * 10);

        let target = "General Audience";

        if (score >= 85) {
            target = "Wanita 18–35 (Impulse Buyer)";
        } else if (score >= 70) {
            target = "Reseller / Affiliate";
        } else {
            target = "Budget Shopper";
        }

        let recommendation =
            score >= 80 ? "🔥 LAYAK DIJUAL" :
            score >= 60 ? "⚠ BISA DIJUAL (optimasi diperlukan)" :
            "❌ TIDAK DISARANKAN";

        return {
            productScore: score,
            viralScore: viral,
            targetBuyer: target,
            recommendation
        };
    }

    // =========================
    // 5. MOCK DATA PRODUK
    // =========================
    mockFetchProductData(url) {

        const isShopee = url.toLowerCase().includes("shopee");

        return {
            title: isShopee ? "Tas Wanita Premium Fashion" : "Produk Demo",
            price: isShopee ? "129000" : null,
            images: isShopee ? ["img1.jpg", "img2.jpg"] : [],
            description: isShopee
                ? "Tas elegan cocok untuk kerja, jalan, dan casual style."
                : ""
        };
    }

    // =========================
    // 6. SAFE DOMAIN PARSER
    // =========================
    safeDomain(url) {
        try {
            return new URL(url).hostname;
        } catch (e) {
            return "unknown";
        }
    }
}

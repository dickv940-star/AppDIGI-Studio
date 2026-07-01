/*
==========================================
 AppDIGI Studio
 Universal Marketplace Scanner v1.0
==========================================
*/

const MarketplaceScanner = {

    marketplaces: [

        {
            name: "Shopee",
            domains: [
                "shopee.co.id",
                "shopee.com",
                "shp.ee"
            ]
        },

        {
            name: "TikTok Shop",
            domains: [
                "shop.tiktok.com",
                "vt.tiktok.com",
                "tiktok.com"
            ]
        },

        {
            name: "Tokopedia",
            domains: [
                "tokopedia.com"
            ]
        },

        {
            name: "Lazada",
            domains: [
                "lazada.co.id",
                "lazada.com"
            ]
        },

        {
            name: "Blibli",
            domains: [
                "blibli.com"
            ]
        },

        {
            name: "Bukalapak",
            domains: [
                "bukalapak.com"
            ]
        }

    ],

    detect(url) {

        try {

            const host = new URL(url).hostname.toLowerCase();

            for (const item of this.marketplaces) {

                if (item.domains.some(domain => host.includes(domain))) {

                    return {

                        valid: true,
                        marketplace: item.name,
                        domain: host

                    };

                }

            }

            return {

                valid: false,
                marketplace: null,
                domain: host

            };

        } catch (e) {

            return {

                valid: false,
                marketplace: null,
                domain: null

            };

        }
validateProductUrl(url) {

    const result = this.detect(url);

    if (!result.valid) {
        return {
            valid: false,
            confidence: 0,
            reason: "Marketplace tidak didukung"
        };
    }

    let confidence = 40;

    const lower = url.toLowerCase();

    switch (result.marketplace) {

        case "Shopee":

            if (
                lower.includes("-i.") ||
                lower.includes("/product/")
            ) confidence += 60;

            break;

        case "Tokopedia":

            if (
                lower.includes("/p/")
            ) confidence += 60;

            break;

        case "TikTok Shop":

            if (
                lower.includes("/product/")
            ) confidence += 60;

            break;

        case "Lazada":

            if (
                lower.includes(".html")
            ) confidence += 60;

            break;

    }

    return {

        valid: confidence >= 80,

        confidence,

        marketplace: result.marketplace,

        domain: result.domain

    };

}
    }

};

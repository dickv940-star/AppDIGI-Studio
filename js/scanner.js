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

    }

};

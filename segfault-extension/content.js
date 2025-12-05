const UNITS_REGEX = {
    length: {
        nmi: /(\d+(?:\.\d+)?)\s*(?:nmi|nautical miles?|milles? nautiques?)(?![a-zA-Z])/gi,
        km: /(\d+(?:\.\d+)?)\s*(?:km|kilomètres?|kilometers?)(?![a-zA-Z])/gi,
        cm: /(\d+(?:\.\d+)?)\s*(?:cm|centimètres?|centimeters?)(?![a-zA-Z])/gi,
        mm: /(\d+(?:\.\d+)?)\s*(?:mm|millimètres?|millimeters?)(?![a-zA-Z])/gi,
        um: /(\d+(?:\.\d+)?)\s*(?:μm|um|micromètres?|micrometers?)(?![a-zA-Z])/gi,
        nm: /(\d+(?:\.\d+)?)\s*(?:nm|nanomètres?|nanometers?)(?![a-zA-Z])/gi,
        ly: /(\d+(?:\.\d+)?)\s*(?:ly|light[- ]?years?|années?[- ]?lumière)(?![a-zA-Z])/gi,
        au: /(\d+(?:\.\d+)?)\s*(?:au|astronomical units?|unités? astronomiques?)(?![a-zA-Z])/gi,
        mi: /(\d+(?:\.\d+)?)\s*(?:miles?)(?![a-zA-Z])/gi,
        yd: /(\d+(?:\.\d+)?)\s*(?:yards?)(?![a-zA-Z])/gi,
        ft: /(\d+(?:\.\d+)?)\s*(?:ft|feet|foot|pieds?)(?![a-zA-Z])/gi,
        in: /(\d+(?:\.\d+)?)\s*(?:in|inch(?:es)?|pouces?)(?![a-zA-Z])/gi,
        m: /(\d+(?:\.\d+)?)\s*(?:mètres?|meters?)(?![a-zA-Z²³])/gi,
    },
    weight: {
        kg: /(\d+(?:\.\d+)?)\s*(?:kg|kilogrammes?|kilograms?)(?![a-zA-Z])/gi,
        mg: /(\d+(?:\.\d+)?)\s*(?:mg|milligrammes?|milligrams?)(?![a-zA-Z])/gi,
        ug: /(\d+(?:\.\d+)?)\s*(?:μg|ug|microgrammes?|micrograms?)(?![a-zA-Z])/gi,
        ng: /(\d+(?:\.\d+)?)\s*(?:ng|nanogrammes?|nanograms?)(?![a-zA-Z])/gi,
        lb: /(\d+(?:\.\d+)?)\s*(?:lbs?|livres?|pounds?)(?![a-zA-Z])/gi,
        oz: /(\d+(?:\.\d+)?)\s*(?:oz|onces?|ounces?)(?![a-zA-Z])/gi,
        ct: /(\d+(?:\.\d+)?)\s*(?:ct|carats?)(?![a-zA-Z])/gi,
        stone: /(\d+(?:\.\d+)?)\s*(?:st|stones?)(?![a-zA-Z])/gi,
        t: /(\d+(?:\.\d+)?)\s*(?:tonnes?|tons?)(?![a-zA-Z])/gi,
        g: /(\d+(?:\.\d+)?)\s*(?:grammes?|grams?)(?![a-zA-Z])/gi,
    },
    temperature: {
        c: /(\d+(?:\.\d+)?)\s*(?:°C|celsius)(?![a-zA-Z])/gi,
        f: /(\d+(?:\.\d+)?)\s*(?:°F|fahrenheit)(?![a-zA-Z])/gi,
        k: /(\d+(?:\.\d+)?)\s*(?:K(?:elvin)?)(?![a-zA-Z])/gi,
        r: /(\d+(?:\.\d+)?)\s*(?:°R|rankine)(?![a-zA-Z])/gi,
    },
    volume: {
        ml: /(\d+(?:\.\d+)?)\s*(?:ml|millilitres?|milliliters?)(?![a-zA-Z])/gi,
        m3: /(\d+(?:\.\d+)?)\s*(?:m³|m3|mètres? cubes?|cubic meters?)(?![a-zA-Z])/gi,
        cm3: /(\d+(?:\.\d+)?)\s*(?:cm³|cm3|centimètres? cubes?)(?![a-zA-Z])/gi,
        gal: /(\d+(?:\.\d+)?)\s*(?:gal|gallons?)(?![a-zA-Z])/gi,
        qt: /(\d+(?:\.\d+)?)\s*(?:qt|quarts?)(?![a-zA-Z])/gi,
        pt: /(\d+(?:\.\d+)?)\s*(?:pt|pints?|pintes?)(?![a-zA-Z])/gi,
        cup: /(\d+(?:\.\d+)?)\s*(?:cups?|tasses?)(?![a-zA-Z])/gi,
        fl_oz: /(\d+(?:\.\d+)?)\s*(?:fl\.?\s*oz|onces? liquides?)(?![a-zA-Z])/gi,
        l: /(\d+(?:\.\d+)?)\s*(?:litres?|liters?)(?![a-zA-Z])/gi,
    },
    area: {
        km2: /(\d+(?:\.\d+)?)\s*(?:km²|km2|kilomètres? carrés?|square kilometers?)(?![a-zA-Z])/gi,
        cm2: /(\d+(?:\.\d+)?)\s*(?:cm²|cm2|centimètres? carrés?|square centimeters?)(?![a-zA-Z])/gi,
        mm2: /(\d+(?:\.\d+)?)\s*(?:mm²|mm2|millimètres? carrés?)(?![a-zA-Z])/gi,
        m2: /(\d+(?:\.\d+)?)\s*(?:m²|m2|mètres? carrés?|square meters?)(?![a-zA-Z])/gi,
        ha: /(\d+(?:\.\d+)?)\s*(?:ha|hectares?)(?![a-zA-Z])/gi,
        acre: /(\d+(?:\.\d+)?)\s*(?:acres?)(?![a-zA-Z])/gi,
        ft2: /(\d+(?:\.\d+)?)\s*(?:ft²|ft2|pieds? carrés?|square feet)(?![a-zA-Z])/gi,
        in2: /(\d+(?:\.\d+)?)\s*(?:in²|in2|pouces? carrés?|square inch(?:es)?)(?![a-zA-Z])/gi,
        mi2: /(\d+(?:\.\d+)?)\s*(?:mi²|mi2|miles? carrés?|square miles?)(?![a-zA-Z])/gi,
    },
};

const UNITS = {
    length: {
        m: { toBase: 1 },
        km: { toBase: 1000 },
        cm: { toBase: 0.01 },
        mm: { toBase: 0.001 },
        mi: { toBase: 1609.34 },
        ft: { toBase: 0.3048 },
        in: { toBase: 0.0254 },
        yd: { toBase: 0.9144 },
        nmi: { toBase: 1852 },
        um: { toBase: 0.000001 },
        nm: { toBase: 0.000000001 },
        pm: { toBase: 0.000000000001 },
        ly: { toBase: 9460730472580800 },
        au: { toBase: 149597870700 },
        pc: { toBase: 30856775814913673 },
        furlong: { toBase: 201.168 },
        chain: { toBase: 20.1168 },
        rod: { toBase: 5.0292 },
        fathom: { toBase: 1.8288 },
        league: { toBase: 4828.032 },
    },
    weight: {
        kg: { toBase: 1 },
        g: { toBase: 0.001 },
        mg: { toBase: 0.000001 },
        lb: { toBase: 0.453592 },
        oz: { toBase: 0.0283495 },
        t: { toBase: 1000 },
        ug: { toBase: 0.000000001 },
        ng: { toBase: 0.000000000001 },
        ct: { toBase: 0.0002 },
        grain: { toBase: 0.00006479891 },
        stone: { toBase: 6.35029 },
        ton_us: { toBase: 907.185 },
        ton_uk: { toBase: 1016.05 },
        slug: { toBase: 14.5939 },
        dram: { toBase: 0.00177185 },
        quintal: { toBase: 100 },
    },
    temperature: {
        c: { toBase: (v) => v, fromBase: (v) => v },
        f: {
            toBase: (v) => ((v - 32) * 5) / 9,
            fromBase: (v) => (v * 9) / 5 + 32,
        },
        k: { toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
        r: {
            toBase: (v) => ((v - 491.67) * 5) / 9,
            fromBase: (v) => (v * 9) / 5 + 491.67,
        },
        re: {
            toBase: (v) => v * 1.25,
            fromBase: (v) => v * 0.8,
        },
    },
    volume: {
        l: { toBase: 1 },
        ml: { toBase: 0.001 },
        gal: { toBase: 3.78541 },
        m3: { toBase: 1000 },
        cm3: { toBase: 0.001 },
        qt: { toBase: 0.946353 },
        pt: { toBase: 0.473176 },
        cup: { toBase: 0.236588 },
        fl_oz: { toBase: 0.0295735 },
        tbsp: { toBase: 0.0147868 },
        tsp: { toBase: 0.00492892 },
        gal_uk: { toBase: 4.54609 },
        qt_uk: { toBase: 1.13652 },
        pt_uk: { toBase: 0.568261 },
        fl_oz_uk: { toBase: 0.0284131 },
        barrel: { toBase: 158.987 },
        bbl_oil: { toBase: 158.987 },
        bushel: { toBase: 35.2391 },
        peck: { toBase: 8.80977 },
    },
    area: {
        m2: { toBase: 1 },
        km2: { toBase: 1000000 },
        cm2: { toBase: 0.0001 },
        ha: { toBase: 10000 },
        acre: { toBase: 4046.86 },
        ft2: { toBase: 0.092903 },
        mm2: { toBase: 0.000001 },
        in2: { toBase: 0.00064516 },
        yd2: { toBase: 0.836127 },
        mi2: { toBase: 2589988.11 },
        are: { toBase: 100 },
        rood: { toBase: 1011.71 },
        perch: { toBase: 25.2929 },
    },
};

function convert(value, fromUnit, toUnit, type) {
    if (type === "temperature") {
        const baseValue = UNITS[type][fromUnit].toBase(value);
        return UNITS[type][toUnit].fromBase(baseValue);
    } else {
        const baseValue = value * UNITS[type][fromUnit].toBase;
        return baseValue / UNITS[type][toUnit].toBase;
    }
}

let preferences = null;

async function loadPreferences() {
    const data = await chrome.storage.sync.get("preferences");
    preferences = data.preferences;
    return preferences;
}

function removeAllConversions() {
    const convertedElements = document.querySelectorAll(".unit-converted");
    let count = 0;

    convertedElements.forEach((element) => {
        let text = element.innerHTML;
        while (text.includes("[≈")) {
            text = text.replace(/\s*\[≈[^\]]*\]/g, "");
        }
        const textNode = document.createTextNode(text);
        if (element.parentElement) {
            element.parentElement.replaceChild(textNode, element);
            count++;
        }
    });
}

function scanAndConvert() {
    if (!preferences || !preferences.autoScan) {
        return;
    }

    let totalConversions = 0;

    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function (node) {
                if (!node.parentElement) return NodeFilter.FILTER_REJECT;

                if (
                    node.parentElement.tagName === "SCRIPT" ||
                    node.parentElement.tagName === "STYLE" ||
                    node.parentElement.classList.contains("unit-converted") ||
                    node.parentElement.closest(".unit-converted")
                ) {
                    return NodeFilter.FILTER_REJECT;
                }

                if (node.textContent.includes("[≈")) {
                    return NodeFilter.FILTER_REJECT;
                }

                return NodeFilter.FILTER_ACCEPT;
            },
        }
    );

    const nodesToProcess = [];
    let node;
    while ((node = walker.nextNode())) {
        nodesToProcess.push(node);
    }

    nodesToProcess.forEach((textNode) => {
        let text = textNode.textContent;
        let modified = false;

        Object.keys(UNITS_REGEX).forEach((type) => {
            const preferredUnit = preferences.preferredUnits[type];
            if (!preferredUnit) return;

            Object.keys(UNITS_REGEX[type]).forEach((unitKey) => {
                if (unitKey === preferredUnit) return;

                const regex = UNITS_REGEX[type][unitKey];
                const newRegex = new RegExp(regex.source, regex.flags);

                text = text.replace(newRegex, (match, value) => {
                    const numValue = parseFloat(value);
                    if (isNaN(numValue)) return match;

                    try {
                        const converted = convert(
                            numValue,
                            unitKey,
                            preferredUnit,
                            type
                        );
                        const unitSymbol = getUnitSymbol(preferredUnit, type);
                        modified = true;
                        totalConversions++;
                        return `${match} [≈${converted.toFixed(
                            2
                        )} ${unitSymbol}]`;
                    } catch (e) {
                        return match;
                    }
                });
            });
        });

        if (modified) {
            const span = document.createElement("span");
            span.className = "unit-converted";
            span.setAttribute("data-converted", "true");
            span.textContent = text;
            if (textNode.parentElement) {
                textNode.parentElement.replaceChild(span, textNode);
            }
        }
    });
}

function getUnitSymbol(unit, type) {
    const symbols = {
        length: {
            m: "m",
            km: "km",
            cm: "cm",
            mm: "mm",
            mi: "mi",
            ft: "ft",
            in: "in",
            yd: "yd",
            nmi: "nmi",
            um: "μm",
            nm: "nm",
            pm: "pm",
            ly: "al",
            au: "au",
            pc: "pc",
            furlong: "fur",
            chain: "ch",
            rod: "rd",
            fathom: "ftm",
            league: "lea",
        },
        weight: {
            kg: "kg",
            g: "g",
            mg: "mg",
            lb: "lb",
            oz: "oz",
            t: "t",
            ug: "μg",
            ng: "ng",
            ct: "ct",
            grain: "gr",
            stone: "st",
            ton_us: "ton",
            ton_uk: "ton",
            slug: "slug",
            dram: "dr",
            quintal: "q",
        },
        temperature: {
            c: "°C",
            f: "°F",
            k: "K",
            r: "°R",
            re: "°Ré",
        },
        volume: {
            l: "L",
            ml: "mL",
            gal: "gal",
            m3: "m³",
            cm3: "cm³",
            qt: "qt",
            pt: "pt",
            cup: "cup",
            fl_oz: "fl oz",
            tbsp: "tbsp",
            tsp: "tsp",
            gal_uk: "gal UK",
            qt_uk: "qt UK",
            pt_uk: "pt UK",
            fl_oz_uk: "fl oz UK",
            barrel: "bbl",
            bbl_oil: "bbl",
            bushel: "bu",
            peck: "pk",
        },
        area: {
            m2: "m²",
            km2: "km²",
            cm2: "cm²",
            mm2: "mm²",
            ha: "ha",
            acre: "acre",
            ft2: "ft²",
            in2: "in²",
            yd2: "yd²",
            mi2: "mi²",
            are: "a",
            rood: "rood",
            perch: "perch",
        },
    };
    return symbols[type][unit] || unit;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updatePreferences") {
        const oldPreferences = preferences;
        preferences = message.preferences;

        removeAllConversions();

        if (preferences && preferences.autoScan) {
            scanAndConvert();
        }
    }
});

(async function init() {
    await loadPreferences();
    if (preferences && preferences.autoScan) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", scanAndConvert);
        } else {
            scanAndConvert();
        }
    }
})();

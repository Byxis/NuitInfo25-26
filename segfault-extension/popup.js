const UNITS = {
    length: {
        m: { name: "Mètre", toBase: 1, basic: true },
        km: { name: "Kilomètre", toBase: 1000, basic: true },
        cm: { name: "Centimètre", toBase: 0.01, basic: true },
        mm: { name: "Millimètre", toBase: 0.001, basic: true },
        mi: { name: "Mile", toBase: 1609.34, basic: true },
        ft: { name: "Pied", toBase: 0.3048, basic: true },
        in: { name: "Pouce", toBase: 0.0254, basic: true },

        yd: { name: "Yard", toBase: 0.9144 },
        nmi: { name: "Mile nautique", toBase: 1852 },
        um: { name: "Micromètre", toBase: 0.000001 },
        nm: { name: "Nanomètre", toBase: 0.000000001 },
        pm: { name: "Picomètre", toBase: 0.000000000001 },
        ly: { name: "Année-lumière", toBase: 9460730472580800 },
        au: { name: "Unité astronomique", toBase: 149597870700 },
        pc: { name: "Parsec", toBase: 30856775814913673 },
        furlong: { name: "Furlong", toBase: 201.168 },
        chain: { name: "Chaîne", toBase: 20.1168 },
        rod: { name: "Perche", toBase: 5.0292 },
        fathom: { name: "Brasse", toBase: 1.8288 },
        league: { name: "Lieue", toBase: 4828.032 },
    },
    weight: {
        kg: { name: "Kilogramme", toBase: 1, basic: true },
        g: { name: "Gramme", toBase: 0.001, basic: true },
        mg: { name: "Milligramme", toBase: 0.000001, basic: true },
        lb: { name: "Livre", toBase: 0.453592, basic: true },
        oz: { name: "Once", toBase: 0.0283495, basic: true },
        t: { name: "Tonne", toBase: 1000, basic: true },

        ug: { name: "Microgramme", toBase: 0.000000001 },
        ng: { name: "Nanogramme", toBase: 0.000000000001 },
        ct: { name: "Carat", toBase: 0.0002 },
        grain: { name: "Grain", toBase: 0.00006479891 },
        stone: { name: "Stone", toBase: 6.35029 },
        ton_us: { name: "Tonne US", toBase: 907.185 },
        ton_uk: { name: "Tonne UK", toBase: 1016.05 },
        slug: { name: "Slug", toBase: 14.5939 },
        dram: { name: "Drachme", toBase: 0.00177185 },
        quintal: { name: "Quintal", toBase: 100 },
    },
    temperature: {
        c: {
            name: "Celsius",
            toBase: (v) => v,
            fromBase: (v) => v,
            basic: true,
        },
        f: {
            name: "Fahrenheit",
            toBase: (v) => ((v - 32) * 5) / 9,
            fromBase: (v) => (v * 9) / 5 + 32,
            basic: true,
        },
        k: {
            name: "Kelvin",
            toBase: (v) => v - 273.15,
            fromBase: (v) => v + 273.15,
            basic: true,
        },

        r: {
            name: "Rankine",
            toBase: (v) => ((v - 491.67) * 5) / 9,
            fromBase: (v) => (v * 9) / 5 + 491.67,
        },
        re: {
            name: "Réaumur",
            toBase: (v) => v * 1.25,
            fromBase: (v) => v * 0.8,
        },
    },
    volume: {
        l: { name: "Litre", toBase: 1, basic: true },
        ml: { name: "Millilitre", toBase: 0.001, basic: true },
        gal: { name: "Gallon US", toBase: 3.78541, basic: true },
        cup: { name: "Tasse", toBase: 0.236588, basic: true },

        m3: { name: "Mètre cube", toBase: 1000 },
        cm3: { name: "Centimètre cube", toBase: 0.001 },
        qt: { name: "Quart US", toBase: 0.946353 },
        pt: { name: "Pinte US", toBase: 0.473176 },
        fl_oz: { name: "Once liquide US", toBase: 0.0295735 },
        tbsp: { name: "Cuillère à soupe", toBase: 0.0147868 },
        tsp: { name: "Cuillère à café", toBase: 0.00492892 },
        gal_uk: { name: "Gallon UK", toBase: 4.54609 },
        qt_uk: { name: "Quart UK", toBase: 1.13652 },
        pt_uk: { name: "Pinte UK", toBase: 0.568261 },
        fl_oz_uk: { name: "Once liquide UK", toBase: 0.0284131 },
        barrel: { name: "Baril", toBase: 158.987 },
        bbl_oil: { name: "Baril de pétrole", toBase: 158.987 },
        bushel: { name: "Boisseau", toBase: 35.2391 },
        peck: { name: "Picotin", toBase: 8.80977 },
    },
    area: {
        m2: { name: "Mètre carré", toBase: 1, basic: true },
        km2: { name: "Kilomètre carré", toBase: 1000000, basic: true },
        cm2: { name: "Centimètre carré", toBase: 0.0001, basic: true },
        ha: { name: "Hectare", toBase: 10000, basic: true },
        acre: { name: "Acre", toBase: 4046.86, basic: true },
        ft2: { name: "Pied carré", toBase: 0.092903, basic: true },

        mm2: { name: "Millimètre carré", toBase: 0.000001 },
        in2: { name: "Pouce carré", toBase: 0.00064516 },
        yd2: { name: "Yard carré", toBase: 0.836127 },
        mi2: { name: "Mile carré", toBase: 2589988.11 },
        are: { name: "Are", toBase: 100 },
        rood: { name: "Rood", toBase: 1011.71 },
        perch: { name: "Perche carrée", toBase: 25.2929 },
    },
};

let currentType = "length";
let isConverting = false;
let showAllUnits = false;

function convert(value, fromUnit, toUnit, type) {
    if (type === "temperature") {
        const baseValue = UNITS[type][fromUnit].toBase(value);
        return UNITS[type][toUnit].fromBase(baseValue);
    } else {
        const baseValue = value * UNITS[type][fromUnit].toBase;
        return baseValue / UNITS[type][toUnit].toBase;
    }
}

function populateUnitSelectors(type) {
    const unit1Select = document.getElementById("unit1");
    const unit2Select = document.getElementById("unit2");

    unit1Select.innerHTML = "";
    unit2Select.innerHTML = "";

    Object.keys(UNITS[type]).forEach((unitKey) => {
        const unit = UNITS[type][unitKey];
        const option1 = new Option(unit.name, unitKey);
        const option2 = new Option(unit.name, unitKey);
        unit1Select.add(option1);
        unit2Select.add(option2);
    });

    if (unit2Select.options.length > 1) {
        unit2Select.selectedIndex = 1;
    }
}

function populatePreferenceSelectors() {
    Object.keys(UNITS).forEach((type) => {
        const select = document.getElementById(`pref-${type}`);
        const currentValue = select.value;
        select.innerHTML = "";

        Object.keys(UNITS[type]).forEach((unitKey) => {
            const unit = UNITS[type][unitKey];
            if (!showAllUnits && !unit.basic) return;

            const option = new Option(unit.name, unitKey);
            select.add(option);
        });

        if (
            currentValue &&
            select.querySelector(`option[value="${currentValue}"]`)
        ) {
            select.value = currentValue;
        }
    });
}

function handleInput1Change() {
    if (isConverting) return;
    isConverting = true;

    const value1 = parseFloat(document.getElementById("value1").value);
    const unit1 = document.getElementById("unit1").value;
    const unit2 = document.getElementById("unit2").value;

    if (!isNaN(value1)) {
        const result = convert(value1, unit1, unit2, currentType);
        document.getElementById("value2").value = result.toFixed(6);
    } else {
        document.getElementById("value2").value = "";
    }

    isConverting = false;
}

function handleInput2Change() {
    if (isConverting) return;
    isConverting = true;

    const value2 = parseFloat(document.getElementById("value2").value);
    const unit1 = document.getElementById("unit1").value;
    const unit2 = document.getElementById("unit2").value;

    if (!isNaN(value2)) {
        const result = convert(value2, unit2, unit1, currentType);
        document.getElementById("value1").value = result.toFixed(6);
    } else {
        document.getElementById("value1").value = "";
    }

    isConverting = false;
}

async function savePreferences() {
    const preferences = {
        autoScan: document.getElementById("enableAutoScan").checked,
        preferredUnits: {
            length: document.getElementById("pref-length").value,
            weight: document.getElementById("pref-weight").value,
            temperature: document.getElementById("pref-temperature").value,
            volume: document.getElementById("pref-volume").value,
            area: document.getElementById("pref-area").value,
        },
    };

    await chrome.storage.sync.set({ preferences });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs
                .sendMessage(tabs[0].id, {
                    action: "updatePreferences",
                    preferences,
                })
                .catch((err) => console.log("Content script not ready yet"));
        }
    });
}

async function loadPreferences() {
    const data = await chrome.storage.sync.get("preferences");
    if (data.preferences) {
        document.getElementById("enableAutoScan").checked =
            data.preferences.autoScan || false;

        if (data.preferences.preferredUnits) {
            Object.keys(data.preferences.preferredUnits).forEach((type) => {
                const select = document.getElementById(`pref-${type}`);
                if (select) {
                    select.value = data.preferences.preferredUnits[type];
                }
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    populateUnitSelectors(currentType);
    populatePreferenceSelectors();

    await loadPreferences();

    document.getElementById("measureType").addEventListener("change", (e) => {
        currentType = e.target.value;
        populateUnitSelectors(currentType);
        document.getElementById("value1").value = "";
        document.getElementById("value2").value = "";
    });

    document
        .getElementById("value1")
        .addEventListener("input", handleInput1Change);
    document
        .getElementById("value2")
        .addEventListener("input", handleInput2Change);
    document
        .getElementById("unit1")
        .addEventListener("change", handleInput1Change);
    document
        .getElementById("unit2")
        .addEventListener("change", handleInput2Change);

    document
        .getElementById("enableAutoScan")
        .addEventListener("change", savePreferences);
    document
        .getElementById("pref-length")
        .addEventListener("change", savePreferences);
    document
        .getElementById("pref-weight")
        .addEventListener("change", savePreferences);
    document
        .getElementById("pref-temperature")
        .addEventListener("change", savePreferences);
    document
        .getElementById("pref-volume")
        .addEventListener("change", savePreferences);
    document
        .getElementById("pref-area")
        .addEventListener("change", savePreferences);

    document.getElementById("showAllUnits").addEventListener("change", (e) => {
        showAllUnits = e.target.checked;
        populatePreferenceSelectors();
    });
});

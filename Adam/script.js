/* =========================================================
   JESUS UNBLOCKER
   Main application script
   ========================================================= */


/* =========================================================
   DEFAULT SITE DATABASE
   ========================================================= */

const DEFAULT_SITES = [

    {
        id: "games",
        name: "Games",
        icon: "🎮",

        subcategories: [

            {
                name: "Game Hubs",

                sites: [
                    {
                        name: "KBHGames",
                        url: "kbhgames.com"
                    },
                    {
                        name: "Gamenora",
                        url: "gamenora.com"
                    },
                    {
                        name: "Gamaverse",
                        url: "gamaverse.com"
                    },
                    {
                        name: "R74N",
                        url: "r74n.com"
                    },
                    {
                        name: "Calcsolver",
                        url: "calcsolver.net"
                    }
                ]
            },


            {
                name: "Geometry Dash",

                sites: [
                    {
                        name: "GD Lite",
                        url: "geometrixdashlitepc.io"
                    },
                    {
                        name: "Geometry-games",
                        url: "geometry-games.io"
                    },
                    {
                        name: "Geometrygames",
                        url: "geometrygames.io"
                    },
                    {
                        name: "Dashmetry",
                        url: "dashmetry.com"
                    },
                    {
                        name: "GD Lite 2",
                        url: "geometrydash-lite2.io/"
                    }
                ]
            },


            {
                name: "Classic",

                sites: [
                    {
                        name: "Tetris",
                        url: "mathster.com/games/tetris/"
                    },
                    {
                        name: "Dino Game",
                        url: "offline-dino-game.firebaseapp.com"
                    },
                    {
                        name: "Microsoft Surf",
                        url: "rbeesley.github.io/MicrosoftEdge-SURF/"
                    }
                ]
            },


            {
                name: "Miscellaneous",

                sites: [
                    {
                        name: "Tiny Exams",
                        url: "duck.tinyexams.com"
                    },
                    {
                        name: "BeanethIII",
                        url: "beanethiii.github.io/70403"
                    },
                    {
                        name: "Undertale 10th Anniversary",
                        url: "ut10-battle.undertale.com"
                    },
                    {
                        name: "Black Jack",
                        url: "trinket.io/python/fb8b43596e?outputOnly=true&runOption=run"
                    }
                ]
            }

        ]
    },


    {
        id: "utilities",
        name: "Utilities",
        icon: "🛠️",

        subcategories: [

            {
                name: "Calculators",

                sites: [
                    {
                        name: "Desmos",
                        url: "desmos.com/calculator"
                    },
                    {
                        name: "Calculator",
                        url: "calculator.net"
                    },
                    {
                        name: "GeoGebra",
                        url: "geogebra.org/classic"
                    }
                ]
            },


            {
                name: "Writing",

                sites: [
                    {
                        name: "EditPad (simple text)",
                        url: "editpad.org"
                    },
                    {
                        name: "ProtectedText (encrypted)",
                        url: "protectedtext.com"
                    },
                    {
                        name: "Word Counter (with other plagiarism tools and such)",
                        url: "wordcounter.net"
                    }
                ]
            },


            {
                name: "Time",

                sites: [
                    {
                        name: "Exact Time",
                        url: "time.is"
                    },
                    {
                        name: "Countdown",
                        url: "timer-tab.com"
                    },
                    {
                        name: "Stopwatch/Alarm",
                        url: "vclock.com"
                    }
                ]
            },


            {
                name: "Programming",

                sites: [
                    {
                        name: "JSFiddle (test code)",
                        url: "jsfiddle.net"
                    },
                    {
                        name: "CodePen",
                        url: "codepen.io"
                    },
                    {
                        name: "Liveweave (HTML/CSS/JS)",
                        url: "liveweave.com"
                    },
                    {
                        name: "SQL Fiddle",
                        url: "sqlfiddle.com"
                    }
                ]
            },


            {
                name: "En/Decryption",

                sites: [
                    {
                        name: "Base64 Encoder",
                        url: "base64encode.org"
                    },
                    {
                        name: "UUID Generator",
                        url: "uuidgenerator.net"
                    },
                    {
                        name: "JSON Formatter",
                        url: "jsonformatter.org"
                    },
                    {
                        name: "Numbers/lists randomizer",
                        url: "random.org"
                    }
                ]
            },


            {
                name: "Colors/Drawing",

                sites: [
                    {
                        name: "Coolors (color palettes)",
                        url: "coolors.co"
                    },
                    {
                        name: "Color Picker",
                        url: "colorpicker.me"
                    },
                    {
                        name: "Drawing",
                        url: "excalidraw.com"
                    }
                ]
            }

        ]
    }

];


/* =========================================================
   STATE
   ========================================================= */

let tabs = [];

let activeTabId = null;

let favorites = [];

let recentSites = [];

let customSites = [];

let settings = {
    theme: "dark",
    accent: "#7c5cff",
    compact: false
};


/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE_KEY = "jesusUnblockerState";


function saveState() {

    const state = {
        favorites,
        recentSites,
        customSites,
        settings
    };

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
    );
}


function loadState() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return;
        }

        const state =
            JSON.parse(saved);

        if (Array.isArray(state.favorites)) {
            favorites = state.favorites;
        }

        if (Array.isArray(state.recentSites)) {
            recentSites = state.recentSites;
        }

        if (Array.isArray(state.customSites)) {
            customSites = state.customSites;
        }

        if (state.settings) {

            settings = {
                ...settings,
                ...state.settings
            };

        }

    } catch (error) {

        console.error(
            "Could not load saved data:",
            error
        );

    }

}


/* =========================================================
   URL HANDLING
   ========================================================= */

function normalizeUrl(input) {

    if (!input) {
        return "";
    }

    let value =
        input.trim();

    if (!value) {
        return "";
    }


    /*
       Already has a protocol.
    */

    if (
        /^https?:\/\//i.test(value)
    ) {

        return value;

    }


    /*
       Looks like a URL.

       Examples:

       example.com
       example.com/test
       localhost:3000
    */

    if (
        value.includes(".") ||
        /^localhost(?::\d+)?/i.test(value) ||
        /^127\.0\.0\.1(?::\d+)?/i.test(value)
    ) {

        return "https://" + value;

    }


    /*
       Otherwise we'll treat it as a search.
    */

    return "";

}


function isProbablyUrl(value) {

    if (!value) {
        return false;
    }

    const trimmed =
        value.trim();

    return (
        /^https?:\/\//i.test(trimmed) ||
        /^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(trimmed) ||
        /^localhost(?::\d+)?(\/.*)?$/i.test(trimmed)
    );

}


function createSearchUrl(query) {

    return (
        "https://www.google.com/search?q=" +
        encodeURIComponent(query)
    );

}


function resolveInput(input) {

    const value =
        input.trim();

    if (!value) {
        return null;
    }

    if (isProbablyUrl(value)) {

        return normalizeUrl(value);

    }

    return createSearchUrl(value);

}


/* =========================================================
   OPEN / NAVIGATE
   ========================================================= */

function openBlank(url) {

    /*
       This block is important because your existing buttons
       call openBlank("example.com").
    */

    if (url) {

        const finalUrl =
            normalizeUrl(url);

        if (!finalUrl) {
            navigate(url);
            return;
        }

        openUrl(finalUrl);

        return;
    }


    /*
       No URL argument means use the address input.
    */

    const input =
        document.getElementById("addressInput") ||
        document.getElementById("siteInput");

    if (!input) {
        return;
    }

    const value =
        input.value.trim();

    if (!value) {
        return;
    }

    navigate(value);

    input.value = "";

}


function navigate(input) {

    if (!input) {
        return;
    }

    const url =
        resolveInput(input);

    if (!url) {
        return;
    }

    openUrl(url);

}


function openUrl(url, title = null) {

    if (!url) {
        return;
    }

    const normalized =
        normalizeUrl(url) || url;

    const existing =
        tabs.find(
            tab => tab.url === normalized
        );


    if (existing) {

        switchTab(existing.id);

        return;

    }


    createTab(
        normalized,
        title || getDomainName(normalized)
    );

}


/* =========================================================
   TABS
   ========================================================= */

function generateId() {

    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .slice(2)
    );

}


function createTab(
    url = null,
    title = "New Tab"
) {

    const tab = {

        id: generateId(),

        url,

        title,

        history: url ? [url] : [],

        historyIndex: url ? 0 : -1

    };


    tabs.push(tab);

    switchTab(tab.id);

    renderTabs();

    return tab;

}


function switchTab(id) {

    const tab =
        tabs.find(
            item => item.id === id
        );

    if (!tab) {
        return;
    }

    activeTabId = id;

    renderTabs();

    loadActiveTab();

}


function closeTab(id) {

    const index =
        tabs.findIndex(
            tab => tab.id === id
        );

    if (index === -1) {
        return;
    }


    const wasActive =
        tabs[index].id === activeTabId;

    tabs.splice(index, 1);


    if (!tabs.length) {

        createTab();

        return;

    }


    if (wasActive) {

        const newIndex =
            Math.min(
                index,
                tabs.length - 1
            );

        activeTabId =
            tabs[newIndex].id;

    }


    renderTabs();

    loadActiveTab();

}


function renderTabs() {

    const container =
        document.getElementById("tabs");

    if (!container) {
        return;
    }

    container.innerHTML = "";


    tabs.forEach(tab => {

        const element =
            document.createElement("div");

        element.className =
            "tab" +
            (
                tab.id === activeTabId
                    ? " active"
                    : ""
            );


        element.innerHTML = `

            <span class="tab-title">
                ${escapeHtml(tab.title)}
            </span>

            <button
                class="tab-close"
                type="button"
                title="Close tab"
            >
                ×
            </button>

        `;


        element.addEventListener(
            "click",
            event => {

                if (
                    event.target
                        .classList
                        .contains("tab-close")
                ) {

                    closeTab(tab.id);

                    return;

                }

                switchTab(tab.id);

            }
        );


        container.appendChild(element);

    });


    const newTab =
        document.createElement("button");

    newTab.className =
        "new-tab";

    newTab.type = "button";

    newTab.textContent = "+";

    newTab.title =
        "New tab";

    newTab.onclick =
        () => createTab();

    container.appendChild(newTab);

}


/* =========================================================
   LOAD ACTIVE TAB
   ========================================================= */

function loadActiveTab() {

    const tab =
        tabs.find(
            item => item.id === activeTabId
        );

    const hub =
        document.getElementById("hub");

    const iframeContainer =
        document.getElementById(
            "iframeContainer"
        );

    const frame =
        document.getElementById("siteFrame");

    const address =
        document.getElementById(
            "addressInput"
        );


    if (!tab) {
        return;
    }


    if (!tab.url) {

        if (hub) {
            hub.classList.remove("hidden");
        }

        if (iframeContainer) {
            iframeContainer.classList.add(
                "hidden"
            );
        }

        if (address) {
            address.value = "";
        }

        updateNavigationButtons();

        return;

    }


    if (hub) {
        hub.classList.add("hidden");
    }

    if (iframeContainer) {
        iframeContainer.classList.remove(
            "hidden"
        );
    }


    if (address) {
        address.value = tab.url;
    }


    if (frame) {

        const loading =
            document.getElementById(
                "frameLoading"
            );

        if (loading) {
            loading.classList.remove(
                "hidden"
            );
        }


        frame.src = tab.url;

    }


    updateFavoriteButton();

    updateNavigationButtons();

    addRecentSite(tab.url, tab.title);

}


/* =========================================================
   HISTORY
   ========================================================= */

function addToHistory(url) {

    const tab =
        getActiveTab();

    if (!tab || !url) {
        return;
    }


    /*
       Don't add duplicate consecutive entries.
    */

    if (
        tab.history[
            tab.historyIndex
        ] === url
    ) {
        return;
    }


    /*
       Remove forward history.
    */

    tab.history =
        tab.history.slice(
            0,
            tab.historyIndex + 1
        );


    tab.history.push(url);

    tab.historyIndex =
        tab.history.length - 1;

}


function goBack() {

    const tab =
        getActiveTab();

    if (!tab) {
        return;
    }


    if (
        tab.historyIndex <= 0
    ) {
        return;
    }


    tab.historyIndex--;

    tab.url =
        tab.history[
            tab.historyIndex
        ];

    loadActiveTab();

}


function goForward() {

    const tab =
        getActiveTab();

    if (!tab) {
        return;
    }


    if (
        tab.historyIndex >=
        tab.history.length - 1
    ) {
        return;
    }


    tab.historyIndex++;

    tab.url =
        tab.history[
            tab.historyIndex
        ];

    loadActiveTab();

}


function updateNavigationButtons() {

    const tab =
        getActiveTab();

    const back =
        document.getElementById(
            "backButton"
        );

    const forward =
        document.getElementById(
            "forwardButton"
        );


    if (!tab) {
        return;
    }


    if (back) {

        back.disabled =
            tab.historyIndex <= 0;

    }


    if (forward) {

        forward.disabled =
            tab.historyIndex >=
            tab.history.length - 1;

    }

}


/* =========================================================
   FRAME CONTROLS
   ========================================================= */

function reloadFrame() {

    const frame =
        document.getElementById(
            "siteFrame"
        );

    if (!frame) {
        return;
    }


    const current =
        frame.src;

    frame.src = "";

    setTimeout(
        () => {
            frame.src = current;
        },
        20
    );

}


function toggleFullscreen() {

    const container =
        document.getElementById(
            "iframeContainer"
        );

    if (!container) {
        return;
    }


    if (
        document.fullscreenElement
    ) {

        document.exitFullscreen();

        return;

    }


    container.requestFullscreen()
        .catch(
            error =>
                console.error(
                    error
                )
        );

}


function openExternal() {

    const tab =
        getActiveTab();

    if (!tab || !tab.url) {
        return;
    }

    window.open(
        tab.url,
        "_blank",
        "noopener,noreferrer"
    );

}


async function copyCurrentUrl() {

    const tab =
        getActiveTab();

    if (!tab || !tab.url) {
        return;
    }


    try {

        await navigator.clipboard.writeText(
            tab.url
        );

        showToast(
            "URL copied."
        );

    } catch {

        showToast(
            "Could not copy URL."
        );

    }

}


/* =========================================================
   HUB RENDERING
   ========================================================= */

function getAllSites() {

    const combined =
        JSON.parse(
            JSON.stringify(DEFAULT_SITES)
        );


    /*
       Add custom sites.
    */

    customSites.forEach(site => {

        let category =
            combined.find(
                item =>
                    item.id ===
                    site.category
            );


        if (!category) {

            category = {

                id: site.category,

                name: site.category,

                icon: "📁",

                subcategories: []

            };

            combined.push(category);

        }


        let sub =
            category.subcategories.find(
                item =>
                    item.name ===
                    site.subcategory
            );


        if (!sub) {

            sub = {

                name: site.subcategory,

                sites: []

            };

            category.subcategories.push(
                sub
            );

        }


        sub.sites.push({
            name: site.name,
            url: site.url
        });

    });


    return combined;

}


function renderHub() {

    const container =
        document.getElementById(
            "hubContent"
        );

    if (!container) {
        return;
    }


    const searchInput =
        document.getElementById(
            "hubSearch"
        );

    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    container.innerHTML = "";


    const categories =
        getAllSites();


    categories.forEach(
        category => {

            const categoryElement =
                document.createElement(
                    "section"
                );

            categoryElement.className =
                "category";


            const matchingSubs = [];


            category.subcategories.forEach(
                sub => {

                    const sites =
                        sub.sites.filter(
                            site => {

                                if (!search) {
                                    return true;
                                }

                                return (
                                    site.name
                                        .toLowerCase()
                                        .includes(search) ||

                                    site.url
                                        .toLowerCase()
                                        .includes(search) ||

                                    sub.name
                                        .toLowerCase()
                                        .includes(search) ||

                                    category.name
                                        .toLowerCase()
                                        .includes(search)
                                );

                            }
                        );


                    if (sites.length) {

                        matchingSubs.push({
                            sub,
                            sites
                        });

                    }

                }
            );


            if (!matchingSubs.length) {
                return;
            }


            categoryElement.innerHTML = `

                <div class="category-header">

                    <h2>
                        ${category.icon || ""}
                        ${escapeHtml(category.name)}
                    </h2>

                    <span class="site-count">
                        ${matchingSubs.reduce(
                            (total, item) =>
                                total +
                                item.sites.length,
                            0
                        )} sites
                    </span>

                </div>

            `;


            matchingSubs.forEach(
                ({ sub, sites }) => {

                    const subElement =
                        document.createElement(
                            "div"
                        );


                    subElement.innerHTML = `

                        <div class="sub-header">
                            ${escapeHtml(sub.name)}
                        </div>

                        <div class="site-grid"></div>

                    `;


                    const grid =
                        subElement.querySelector(
                            ".site-grid"
                        );


                    sites.forEach(
                        site => {

                            const card =
                                createSiteCard(
                                    site
                                );

                            grid.appendChild(
                                card
                            );

                        }
                    );


                    categoryElement.appendChild(
                        subElement
                    );

                }
            );


            container.appendChild(
                categoryElement
            );

        }
    );


    if (!container.children.length) {

        container.innerHTML = `

            <div class="status-message">
                No sites found.
            </div>

        `;

    }

}


function createSiteCard(site) {

    const card =
        document.createElement(
            "div"
        );

    card.className =
        "site-card";


    const favorite =
        favorites.includes(
            site.url
        );


    card.innerHTML = `

        <div class="site-card-top">

            <div class="site-icon">
                🌐
            </div>

            <div>

                <h3>
                    ${escapeHtml(site.name)}
                </h3>

            </div>

        </div>

        <p>
            ${escapeHtml(
                getDomainName(site.url)
            )}
        </p>

        <span
            class="site-status"
            title="Frameability must be verified by the browser"
        ></span>

        <button
            class="card-favorite ${
                favorite ? "active" : ""
            }"
            title="Favorite"
        >
            ${favorite ? "★" : "☆"}
        </button>

    `;


    card.addEventListener(
        "click",
        event => {

            if (
                event.target
                    .classList
                    .contains(
                        "card-favorite"
                    )
            ) {

                toggleFavorite(
                    site.url
                );

                renderHub();

                return;

            }


            openUrl(
                site.url,
                site.name
            );

        }
    );


    return card;

}


/* =========================================================
   SIDEBAR
   ========================================================= */

function renderCategoryNav() {

    const container =
        document.getElementById(
            "categoryNav"
        );

    if (!container) {
        return;
    }


    container.innerHTML = "";


    getAllSites().forEach(
        category => {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "nav-button";


            button.innerHTML = `

                <span>
                    ${category.icon || "📁"}
                </span>

                <span>
                    ${escapeHtml(
                        category.name
                    )}
                </span>

            `;


            button.onclick = () => {

                showHub();

                const section =
                    [
                        ...document
                            .querySelectorAll(
                                ".category"
                            )
                    ]
                    .find(
                        element =>
                            element
                                .querySelector(
                                    "h2"
                                )
                                ?.textContent
                                .includes(
                                    category.name
                                )
                    );


                if (section) {

                    section.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            };


            container.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   FAVORITES
   ========================================================= */

function isFavorite(url) {

    return favorites.includes(url);

}


function toggleFavorite(url) {

    if (!url) {
        return;
    }


    if (isFavorite(url)) {

        favorites =
            favorites.filter(
                item => item !== url
            );

        showToast(
            "Removed from favorites."
        );

    } else {

        favorites.push(url);

        showToast(
            "Added to favorites."
        );

    }


    saveState();

    updateFavoriteButton();

}


function toggleFavoriteCurrent() {

    const tab =
        getActiveTab();

    if (!tab || !tab.url) {
        return;
    }

    toggleFavorite(
        tab.url
    );

}


function updateFavoriteButton() {

    const button =
        document.getElementById(
            "favoriteButton"
        );

    const tab =
        getActiveTab();


    if (!button) {
        return;
    }


    if (
        tab &&
        tab.url &&
        isFavorite(tab.url)
    ) {

        button.classList.add(
            "active"
        );

        button.textContent =
            "★";

    } else {

        button.classList.remove(
            "active"
        );

        button.textContent =
            "☆";

    }

}


/* =========================================================
   RECENT SITES
   ========================================================= */

function addRecentSite(
    url,
    title
) {

    if (!url) {
        return;
    }


    recentSites =
        recentSites.filter(
            item => item.url !== url
        );


    recentSites.unshift({

        url,

        title:
            title ||
            getDomainName(url),

        time:
            Date.now()

    });


    /*
       Keep the list small.
    */

    recentSites =
        recentSites.slice(
            0,
            30
        );


    saveState();

}


function showRecent() {

    const hub =
        document.getElementById(
            "hub"
        );

    const iframe =
        document.getElementById(
            "iframeContainer"
        );

    if (iframe) {
        iframe.classList.add(
            "hidden"
        );
    }

    if (hub) {
        hub.classList.remove(
            "hidden"
        );
    }


    const container =
        document.getElementById(
            "hubContent"
        );

    if (!container) {
        return;
    }


    container.innerHTML = `

        <section class="category">

            <div class="category-header">

                <h2>🕘 Recently Visited</h2>

                <span class="site-count">
                    ${recentSites.length} sites
                </span>

            </div>

            <div
                class="site-grid"
                id="recentGrid"
            ></div>

        </section>

    `;


    const grid =
        document.getElementById(
            "recentGrid"
        );


    recentSites.forEach(
        site => {

            grid.appendChild(
                createSiteCard(site)
            );

        }
    );


    if (!recentSites.length) {

        grid.innerHTML = `

            <div class="status-message">
                You haven't visited any sites yet.
            </div>

        `;

    }

}


/* =========================================================
   FAVORITES PAGE
   ========================================================= */

function showFavorites() {

    const hub =
        document.getElementById(
            "hub"
        );

    const iframe =
        document.getElementById(
            "iframeContainer"
        );

    if (iframe) {
        iframe.classList.add(
            "hidden"
        );
    }

    if (hub) {
        hub.classList.remove(
            "hidden"
        );
    }


    const container =
        document.getElementById(
            "hubContent"
        );

    if (!container) {
        return;
    }


    const sites =
        findSitesByUrls(
            favorites
        );


    container.innerHTML = `

        <section class="category">

            <div class="category-header">

                <h2>⭐ Favorites</h2>

                <span class="site-count">
                    ${sites.length} sites
                </span>

            </div>

            <div
                class="site-grid"
                id="favoritesGrid"
            ></div>

        </section>

    `;


    const grid =
        document.getElementById(
            "favoritesGrid"
        );


    sites.forEach(
        site => {

            grid.appendChild(
                createSiteCard(site)
            );

        }
    );


    if (!sites.length) {

        grid.innerHTML = `

            <div class="status-message">
                You haven't added any favorites yet.
            </div>

        `;

    }

}


function findSitesByUrls(urls) {

    const result = [];

    getAllSites().forEach(
        category => {

            category.subcategories.forEach(
                sub => {

                    sub.sites.forEach(
                        site => {

                            if (
                                urls.includes(
                                    site.url
                                )
                            ) {

                                result.push(
                                    site
                                );

                            }

                        }
                    );

                }
            );

        }
    );


    /*
       Include custom favorites even if
       the site isn't in DEFAULT_SITES.
    */

    customSites.forEach(
        site => {

            if (
                urls.includes(
                    site.url
                )
            ) {

                result.push({

                    name:
                        site.name,

                    url:
                        site.url

                });

            }

        }
    );


    return result;

}


/* =========================================================
   HOME
   ========================================================= */

function showHub() {

    const hub =
        document.getElementById(
            "hub"
        );

    const iframe =
        document.getElementById(
            "iframeContainer"
        );


    if (hub) {
        hub.classList.remove(
            "hidden"
        );
    }

    if (iframe) {
        iframe.classList.add(
            "hidden"
        );
    }


    renderHub();

}


/* =========================================================
   CUSTOM SITES
   ========================================================= */

function populateCustomCategories() {

    const select =
        document.getElementById(
            "customCategory"
        );

    if (!select) {
        return;
    }


    select.innerHTML = "";


    getAllSites().forEach(
        category => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                category.id;

            option.textContent =
                category.name;

            select.appendChild(
                option
            );

        }
    );


}


function addCustomSite() {

    const nameInput =
        document.getElementById(
            "customName"
        );

    const urlInput =
        document.getElementById(
            "customUrl"
        );

    const categoryInput =
        document.getElementById(
            "customCategory"
        );


    if (
        !nameInput ||
        !urlInput ||
        !categoryInput
    ) {
        return;
    }


    const name =
        nameInput.value.trim();

    const rawUrl =
        urlInput.value.trim();

    const category =
        categoryInput.value;


    if (!name || !rawUrl) {

        showToast(
            "Enter a name and URL."
        );

        return;

    }


    const url =
        normalizeUrl(rawUrl);


    if (!url) {

        showToast(
            "That doesn't look like a URL."
        );

        return;

    }


    customSites.push({

        id: generateId(),

        name,

        url,

        category,

        subcategory: "Custom"

    });


    saveState();

    renderCategoryNav();

    renderHub();

    populateCustomCategories();


    nameInput.value = "";

    urlInput.value = "";


    showToast(
        "Custom site added."
    );

}


/* =========================================================
   FRAMEABILITY TEST
   ========================================================= */

async function testCustomUrl() {

    const input =
        document.getElementById(
            "testUrl"
        );

    const result =
        document.getElementById(
            "testResult"
        );


    if (!input || !result) {
        return;
    }


    const url =
        normalizeUrl(
            input.value
        );


    if (!url) {

        result.textContent =
            "Enter a valid URL.";

        return;

    }


    /*
       Important:

       JavaScript running on GitHub Pages cannot reliably
       inspect X-Frame-Options or CSP frame-ancestors on
       another origin because of browser security rules.

       Therefore this is deliberately presented as a
       best-effort test rather than a guarantee.
    */


    result.textContent =
        "Testing…";


    try {

        /*
           no-cors prevents us from reading the response,
           but lets us determine whether a network request
           itself can be initiated.
        */

        await fetch(
            url,
            {
                method: "HEAD",
                mode: "no-cors",
                cache: "no-store"
            }
        );


        result.innerHTML = `
            <span style="color: var(--success)">
                ✓ Site responded.
            </span>
            <br>
            <small>
                This does NOT guarantee iframe embedding.
                The browser will enforce the site's
                X-Frame-Options/CSP rules.
            </small>
        `;


    } catch (error) {

        result.innerHTML = `
            <span style="color: var(--warning)">
                ⚠ Could not test the site.
            </span>
            <br>
            <small>
                It may be offline, block the request,
                or reject cross-origin access.
            </small>
        `;

    }

}


/* =========================================================
   SETTINGS
   ========================================================= */

function openSettings() {

    const modal =
        document.getElementById(
            "settingsModal"
        );

    if (!modal) {
        return;
    }


    modal.classList.remove(
        "hidden"
    );


    const theme =
        document.getElementById(
            "themeSetting"
        );

    const accent =
        document.getElementById(
            "accentSetting"
        );

    const compact =
        document.getElementById(
            "compactSetting"
        );


    if (theme) {
        theme.value =
            settings.theme;
    }

    if (accent) {
        accent.value =
            settings.accent;
    }

    if (compact) {
        compact.value =
            String(
                settings.compact
            );
    }

}


function closeSettings() {

    const modal =
        document.getElementById(
            "settingsModal"
        );

    if (modal) {

        modal.classList.add(
            "hidden"
        );

    }

}


function changeTheme(theme) {

    settings.theme =
        theme;

    applyTheme();

    saveState();

}


function applyTheme() {

    if (
        settings.theme ===
        "light"
    ) {

        document.documentElement
            .style
            .setProperty(
                "--bg",
                "#f4f5f7"
            );

        document.documentElement
            .style
            .setProperty(
                "--bg2",
                "#ffffff"
            );

        document.documentElement
            .style
            .setProperty(
                "--panel",
                "#ffffff"
            );

        document.documentElement
            .style
            .setProperty(
                "--panel2",
                "#eef0f4"
            );

        document.documentElement
            .style
            .setProperty(
                "--border",
                "#d9dde5"
            );

        document.documentElement
            .style
            .setProperty(
                "--text",
                "#171a21"
            );

        document.documentElement
            .style
            .setProperty(
                "--muted",
                "#687080"
            );

    } else {

        document.documentElement
            .style
            .setProperty(
                "--bg",
                "#0b0d12"
            );

        document.documentElement
            .style
            .setProperty(
                "--bg2",
                "#11141b"
            );

        document.documentElement
            .style
            .setProperty(
                "--panel",
                "#151923"
            );

        document.documentElement
            .style
            .setProperty(
                "--panel2",
                "#1b202c"
            );

        document.documentElement
            .style
            .setProperty(
                "--border",
                "#292f3d"
            );

        document.documentElement
            .style
            .setProperty(
                "--text",
                "#f4f6fb"
            );

        document.documentElement
            .style
            .setProperty(
                "--muted",
                "#9ba3b4"
            );

    }

}


function changeAccent(color) {

    settings.accent =
        color;

    applyAccent();

    saveState();

}


function applyAccent() {

    document.documentElement
        .style
        .setProperty(
            "--accent",
            settings.accent
        );

}


function changeCompact(value) {

    settings.compact =
        value === "true";

    applyCompact();

    saveState();

}


function applyCompact() {

    document.body.classList.toggle(
        "compact",
        settings.compact
    );

}


/* =========================================================
   IMPORT / EXPORT
   ========================================================= */

function exportData() {

    const data = {

        version: 1,

        favorites,

        recentSites,

        customSites,

        settings

    };


    const blob =
        new Blob(
            [
                JSON.stringify(
                    data,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );

    link.href =
        url;

    link.download =
        "jesus-unblocker-data.json";

    link.click();


    URL.revokeObjectURL(
        url
    );

}


function importData(event) {

    const file =
        event.target.files?.[0];

    if (!file) {
        return;
    }


    const reader =
        new FileReader();


    reader.onload =
        () => {

            try {

                const data =
                    JSON.parse(
                        reader.result
                    );


                if (
                    Array.isArray(
                        data.favorites
                    )
                ) {

                    favorites =
                        data.favorites;

                }


                if (
                    Array.isArray(
                        data.recentSites
                    )
                ) {

                    recentSites =
                        data.recentSites;

                }


                if (
                    Array.isArray(
                        data.customSites
                    )
                ) {

                    customSites =
                        data.customSites;

                }


                if (data.settings) {

                    settings = {

                        ...settings,

                        ...data.settings

                    };

                }


                saveState();

                applyTheme();

                applyAccent();

                applyCompact();

                renderCategoryNav();

                renderHub();

                populateCustomCategories();


                showToast(
                    "Data imported."
                );


            } catch {

                showToast(
                    "Invalid data file."
                );

            }

        };


    reader.readAsText(
        file
    );

}


/* =========================================================
   RESET
   ========================================================= */

function clearData() {

    const confirmed =
        confirm(
            "Reset favorites, recent sites, custom sites, and settings?"
        );


    if (!confirmed) {
        return;
    }


    favorites = [];

    recentSites = [];

    customSites = [];


    settings = {

        theme: "dark",

        accent: "#7c5cff",

        compact: false

    };


    saveState();

    applyTheme();

    applyAccent();

    applyCompact();

    renderCategoryNav();

    renderHub();

    populateCustomCategories();


    showToast(
        "Data reset."
    );

}


/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

function setupKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        event => {

            /*
               Ctrl/Cmd + L
            */

            if (
                (
                    event.ctrlKey ||
                    event.metaKey
                ) &&
                event.key.toLowerCase() === "l"
            ) {

                event.preventDefault();

                const input =
                    document.getElementById(
                        "addressInput"
                    );

                if (input) {

                    input.focus();

                    input.select();

                }

                return;

            }


            /*
               Alt + Left
            */

            if (
                event.altKey &&
                event.key === "ArrowLeft"
            ) {

                event.preventDefault();

                goBack();

                return;

            }


            /*
               Alt + Right
            */

            if (
                event.altKey &&
                event.key === "ArrowRight"
            ) {

                event.preventDefault();

                goForward();

                return;

            }


            /*
               Ctrl/Cmd + R
            */

            if (
                (
                    event.ctrlKey ||
                    event.metaKey
                ) &&
                event.key.toLowerCase() === "r"
            ) {

                event.preventDefault();

                reloadFrame();

                return;

            }


            /*
               Ctrl/Cmd + T
            */

            if (
                (
                    event.ctrlKey ||
                    event.metaKey
                ) &&
                event.key.toLowerCase() === "t"
            ) {

                event.preventDefault();

                createTab();

                return;

            }


            /*
               Ctrl/Cmd + W
            */

            if (
                (
                    event.ctrlKey ||
                    event.metaKey
                ) &&
                event.key.toLowerCase() === "w"
            ) {

                event.preventDefault();

                if (activeTabId) {
                    closeTab(activeTabId);
                }

                return;

            }


            /*
               Ctrl + Shift + F
            */

            if (
                event.ctrlKey &&
                event.shiftKey &&
                event.key.toLowerCase() === "f"
            ) {

                event.preventDefault();

                toggleFullscreen();

            }

        }
    );

}


/* =========================================================
   SIDEBAR MOBILE
   ========================================================= */

function toggleSidebar() {

    const sidebar =
        document.getElementById(
            "sidebar"
        );

    if (!sidebar) {
        return;
    }


    sidebar.classList.toggle(
        "open"
    );

}


/* =========================================================
   IFRAME LOAD
   ========================================================= */

function setupIframe() {

    const frame =
        document.getElementById(
            "siteFrame"
        );

    if (!frame) {
        return;
    }


    frame.addEventListener(
        "load",
        () => {

            const loading =
                document.getElementById(
                    "frameLoading"
                );

            if (loading) {

                loading.classList.add(
                    "hidden"
                );

            }


            const tab =
                getActiveTab();

            if (!tab) {
                return;
            }


            /*
               We cannot read the iframe's URL if it is
               cross-origin.

               Same-origin frames may allow access, but we
               deliberately catch errors here.
            */

            try {

                const frameUrl =
                    frame.contentWindow
                        .location.href;

                if (
                    frameUrl &&
                    frameUrl !==
                    "about:blank"
                ) {

                    tab.url =
                        frameUrl;

                    addToHistory(
                        frameUrl
                    );

                    updateAddressBar();

                }

            } catch {

                /*
                   Expected for cross-origin frames.
                */

            }

        }
    );

}


/* =========================================================
   ADDRESS BAR
   ========================================================= */

function updateAddressBar() {

    const input =
        document.getElementById(
            "addressInput"
        );

    const tab =
        getActiveTab();


    if (
        input &&
        tab &&
        tab.url
    ) {

        input.value =
            tab.url;

    }

}


function updateAddressFromFrame() {

    /*
       Cross-origin iframe URLs cannot normally be read.
       Keep the current tab URL instead.
    */

    updateAddressBar();

}


/* =========================================================
   HELPERS
   ========================================================= */

function getActiveTab() {

    return tabs.find(
        tab =>
            tab.id ===
            activeTabId
    ) || null;

}


function getDomainName(url) {

    try {

        const parsed =
            new URL(
                normalizeUrl(url)
            );

        return parsed.hostname
            .replace(
                /^www\./,
                ""
            );

    } catch {

        return url;

    }

}


function escapeHtml(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );

    if (!toast) {
        return;
    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        showToast.timeout
    );


    showToast.timeout =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadState();

        applyTheme();

        applyAccent();

        applyCompact();


        renderCategoryNav();

        renderHub();

        populateCustomCategories();


        /*
           Start with one empty tab.
        */

        createTab();


        /*
           Address bar.
        */

        const addressForm =
            document.getElementById(
                "addressForm"
            );


        if (addressForm) {

            addressForm.addEventListener(
                "submit",
                event => {

                    event.preventDefault();

                    const input =
                        document.getElementById(
                            "addressInput"
                        );

                    if (!input) {
                        return;
                    }

                    navigate(
                        input.value
                    );

                }
            );

        }


        /*
           Hub search.
        */

        const hubSearch =
            document.getElementById(
                "hubSearch"
            );


        if (hubSearch) {

            hubSearch.addEventListener(
                "input",
                () => renderHub()
            );

        }


        /*
           Iframe.
        */

        setupIframe();

    }
);

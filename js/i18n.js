// 多語言翻譯系統
const translations = {
    'zh-TW': {
        pageTitle: '米池計算器',
        selectPoolType: '選擇池類型:',
        poolDate: '卡池日期',
        targetFiveStars: '目標五星數：',
        character: '角色',
        weapon: '武器',
        currentPulls: '已墊抽數',
        tooltipCurrentPulls: '距離上一次抽出5星後已經抽了多少抽。',
        simTimes: '模擬次數:',
        hardPity: '卡池已大保底',
        tooltipHardPity: '卡池上一次抽出的5星是非UP角色/武器。',
        brightLight: '明光計數器',
        tooltipBrightLight: '明光機制模型使用B站up"一棵平衡树"的推論計算。有做些微調整使結果更接近大數據。',
        draw4Star: '墊池抽四星(角色)',
        tooltipDraw4Star: '計算在抽出指定數量的PU五星角色前。抽到指定數量的PU四星角色的成功率。',
        draw4StarHint: '是否墊池沒有絕對對錯，只有能否接受風險。墊池抽四星有歐有非，抽卡前請詳閱公開說明書(並沒有)。',
        target4Stars: '目標四星數：',
        current4Pulls: '距離上個四星已抽',
        hardPity4Label: '上個四星是PU角色(不論是否是目標角色)',
        simulate: '模擬',
        result: '模擬結果:',
        calculating: '計算中...',
        footerText: '非營利開源專案，如發現BUG或有改進意見，歡迎至巴哈姆特論壇搜尋"米池計算器"向作者回報。',
        githubProject: 'GitHub 專案',
        // 結果顯示
        expected: '期望值',
        p10: '10%達成率',
        p50: '50%中位數',
        p90: '90%達成率',
        successRate4: '4星達標成功率',
        runtime: '運行時間',
        ms: '毫秒',
        // 圖表
        chartLabel: '累計百分比 (%)',
        chartXAxis: '抽取次數',
        chartYAxis: '累計百分比 (%)'
    },
    'en': {
        pageTitle: 'Gacha Calculator',
        selectPoolType: 'Select Pool Type:',
        poolDate: 'Banner Schedule',
        targetFiveStars: 'Target 5★ Count:',
        character: 'Character',
        weapon: 'Weapon',
        currentPulls: 'Current Pity',
        tooltipCurrentPulls: 'Number of pulls since your last 5-star.',
        simTimes: 'Simulations:',
        hardPity: 'Guaranteed',
        tooltipHardPity: 'Your last 5-star was off-banner (not the featured character/weapon).',
        brightLight: 'Fate Points',
        tooltipBrightLight: 'Capturing Radiance mechanism model based on calculations by Bilibili uploader "一棵平衡树". Slightly adjusted to match large-scale data.',
        draw4Star: '4★ Pity Goals (Character)',
        tooltipDraw4Star: 'Calculate the probability of getting a certain number of featured 4-star characters before reaching your 5-star target.',
        draw4StarHint: 'There is no right or wrong choice for 4-star pity building. Results vary - proceed at your own risk.',
        target4Stars: 'Target 4★ Count:',
        current4Pulls: 'Pulls since last 4★',
        hardPity4Label: 'Last 4★ was featured (any featured character)',
        simulate: 'Simulate',
        result: 'Results:',
        calculating: 'Calculating...',
        footerText: 'Non-profit open source project. Report bugs or suggestions on the Bahamut forum by searching "米池計算器".',
        githubProject: 'GitHub Project',
        // Results
        expected: 'Expected',
        p10: '10th Percentile',
        p50: 'Median (50th)',
        p90: '90th Percentile',
        successRate4: '4★ Success Rate',
        runtime: 'Runtime',
        ms: 'ms',
        // Chart
        chartLabel: 'Cumulative Percentage (%)',
        chartXAxis: 'Pull Count',
        chartYAxis: 'Cumulative Percentage (%)'
    },
    'ja': {
        pageTitle: 'ガチャ計算機',
        selectPoolType: 'ガチャの種類:',
        poolDate: 'ガチャ日程',
        targetFiveStars: '目標の星5数：',
        character: 'キャラクター',
        weapon: '武器',
        currentPulls: '現在の天井数',
        tooltipCurrentPulls: '前回の星5から何回引いたか。',
        simTimes: 'シミュレーション回数:',
        hardPity: '天井確定',
        tooltipHardPity: '前回の星5がすり抜け（非ピックアップ）だった。',
        brightLight: '運命ポイント',
        tooltipBrightLight: '掴みし明光のメカニズムはBilibili投稿者「一棵平衡树」の計算に基づいています。大規模データに近づけるため微調整しています。',
        draw4Star: '星4天井目標（キャラ）',
        tooltipDraw4Star: '目標の星5を引く前に、指定数のピックアップ星4キャラを引く確率を計算します。',
        draw4StarHint: '星4を狙うかどうかに正解はありません。リスクを受け入れられるかどうかです。',
        target4Stars: '目標の星4数：',
        current4Pulls: '前回の星4からの回数',
        hardPity4Label: '前回の星4がピックアップだった',
        simulate: 'シミュレート',
        result: '結果:',
        calculating: '計算中...',
        footerText: '非営利オープンソースプロジェクト。バグや提案はBahamutフォーラムで「米池計算器」を検索してご報告ください。',
        githubProject: 'GitHub プロジェクト',
        // 結果
        expected: '期待値',
        p10: '10%達成',
        p50: '中央値（50%）',
        p90: '90%達成',
        successRate4: '星4成功率',
        runtime: '実行時間',
        ms: 'ミリ秒',
        // チャート
        chartLabel: '累積パーセント (%)',
        chartXAxis: '抽選回数',
        chartYAxis: '累積パーセント (%)'
    }
};

// 目前語言
let currentLanguage = 'zh-TW';

// 取得翻譯文字
function t(key) {
    return translations[currentLanguage][key] || translations['zh-TW'][key] || key;
}

// 套用翻譯到所有 data-i18n 元素
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = t(key);
        if (text) {
            el.textContent = text;
        }
    });
    // 更新頁面標題
    document.title = t('pageTitle');
}

// 設定語言
function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        localStorage.setItem('preferredLanguage', lang);
        applyTranslations();

        // 更新語言選擇器
        const selector = document.getElementById('languageSelector');
        if (selector) {
            selector.value = lang;
        }

        // 更新圖表標籤（如果圖表已存在）
        if (window.resultChart instanceof Chart) {
            window.resultChart.data.datasets[0].label = t('chartLabel');
            window.resultChart.options.scales.x.title.text = t('chartXAxis');
            window.resultChart.options.scales.y.title.text = t('chartYAxis');
            window.resultChart.update();
        }
    }
}

// 初始化語言系統
function initI18n() {
    // 從 localStorage 讀取偏好語言，或使用瀏覽器語言
    let savedLang = localStorage.getItem('preferredLanguage');

    if (!savedLang) {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('ja')) {
            savedLang = 'ja';
        } else if (browserLang.startsWith('zh')) {
            savedLang = 'zh-TW';
        } else {
            savedLang = 'en';
        }
    }

    currentLanguage = savedLang;

    // DOM 載入完成後套用翻譯
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            applyTranslations();
            setupLanguageSelector();
        });
    } else {
        applyTranslations();
        setupLanguageSelector();
    }
}

// 設定語言選擇器事件
function setupLanguageSelector() {
    const selector = document.getElementById('languageSelector');
    if (selector) {
        selector.value = currentLanguage;
        selector.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }
}

// 自動初始化
initI18n();

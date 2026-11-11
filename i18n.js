(function () {
  var NAV = {
    "Главная": { en: "Home", he: "ראשי" },
    "Жизнь": { en: "Life", he: "חיים" },
    "Письма": { en: "Letters", he: "מכתבים" },
    "Творчество": { en: "Work", he: "יצירה" },
    "Документы, публикации и воспоминания": { en: "Documents, publications and memoirs", he: "מסמכים, פרסומים וזיכרונות" },
    "Фотографии": { en: "Photographs", he: "תצלומים" }
  };
  var SKIP = {
    "К содержанию": { en: "To the contents", he: "אל התוכן" },
    "К тексту": { en: "To the text", he: "אל הטקסט" }
  };
  var SECTIONS = {
    "Разделы": { en: "Sections", he: "מדורים" }
  };
  var H2 = {
    "Дело 1935": { en: "The 1935 case", he: "תיק 1935" },
    "Дело 1938": { en: "The 1938 case", he: "תיק 1938" },
    "Реабилитация": { en: "Rehabilitation", he: "שיקום" },
    "Воспоминания": { en: "Memoirs", he: "זיכרונות" },
    "Публикации": { en: "Publications", he: "פרסומים" },
    "Фотографии": { en: "Photographs", he: "תצלומים" },
    "Дело Кореца": { en: "Korets’s case", he: "תיקו של קורץ" },
    "Источники": { en: "Sources", he: "מקורות" }
  };
  var HEADS = {
    "18 декабря 1947 г.": { en: "18 December 1947", he: "18 בדצמבר 1947" },
    "«Кукольный дом»": { en: "“A Doll’s House”", he: "«בית הבובות»" },
    "«Р.С.В»": { en: "“R.S.V.”", he: "«ר.ס.ו.»" },
    "Аккорд": { en: "A chord", he: "אקורד" },
    "Анкета арестованного": { en: "The prisoner’s questionnaire", he: "שאלון העציר" },
    "Арест": { en: "The arrest", he: "המעצר" },
    "Арест в Харькове, 1935": { en: "Arrest in Kharkov, 1935", he: "מעצר בחרקוב, 1935" },
    "Бах": { en: "Bach", he: "באך" },
    "Белая ночь": { en: "White night", he: "לילה לבן" },
    "Березка": { en: "The little birch", he: "ליבנה קטנה" },
    "Бьют в железную рельсу длинную": { en: "They beat on a long iron rail", he: "מכים בפסי ברזל ארוכים" },
    "Вечер": { en: "Evening", he: "ערב" },
    "Воспоминания о ссылке": { en: "Memoirs of exile", he: "זיכרונות מן הגלות" },
    "Вступление": { en: "Introduction", he: "פתיחה" },
    "Выписка из протокола Харковского облсуда": { en: "Extract from the Kharkov regional court record", he: "קטע מפרוטוקול בית המשפט המחוזי בחרקוב" },
    "Глава I": { en: "Chapter I", he: "פרק I" },
    "Глава II": { en: "Chapter II", he: "פרק II" },
    "Глава III": { en: "Chapter III", he: "פרק III" },
    "Глава IV": { en: "Chapter IV", he: "פרק IV" },
    "Дело 1938 года": { en: "The 1938 case", he: "תיק 1938" },
    "Для нас закрыты все пути": { en: "All paths are closed to us", he: "כל הדרכים סגורות בפנינו" },
    "Документы, публикации и воспоминания": { en: "Documents, publications and memoirs", he: "מסמכים, פרסומים וזיכרונות" },
    "Домой": { en: "Homeward", he: "הביתה" },
    "Допрос 15 июня 1938 года": { en: "Interrogation of 15 June 1938", he: "חקירה מ־15 ביוני 1938" },
    "Допрос Давида Ландау": { en: "Interrogation of David Landau", he: "חקירתו של דוד לנדאו" },
    "Допросы и показания": { en: "Interrogations and testimony", he: "חקירות ועדויות" },
    "Другу": { en: "To a friend", he: "לידיד" },
    "Дуэт": { en: "Duet", he: "דואט" },
    "Жизнь": { en: "Life", he: "חיים" },
    "Жрец": { en: "The priest", he: "הכוהן" },
    "Закат": { en: "Sunset", he: "שקיעה" },
    "Заявление Пятигорского": { en: "Pyatigorsky’s statement", he: "הצהרת פיאטיגורסקי" },
    "Заявление Элеоноры Эпштейн": { en: "Eleonora Epstein’s statement", he: "הצהרת אלאונורה אפשטיין" },
    "Здравствуй": { en: "Hello", he: "שלום" },
    "Злословие": { en: "Slander", he: "לשון הרע" },
    "Из Гейне": { en: "From Heine", he: "מתוך היינה" },
    "Из сердца я вырвала образ твой": { en: "I tore your image from my heart", he: "עקרתי את דמותך מלבי" },
    "К читателю": { en: "To the reader", he: "אל הקורא" },
    "Как выглядел бы день рождения В.Д.П., если бы она была здорова": { en: "What V.D.P.’s birthday would have looked like if she had been well", he: "איך היה נראה יום ההולדת של ו.ד.פ. אילו הייתה בריאה" },
    "Камера 104": { en: "Cell 104", he: "תא 104" },
    "Колыбельная": { en: "Lullaby", he: "שיר ערש" },
    "Кто виноват?": { en: "Who is to blame?", he: "מי אשם?" },
    "Лилюли": { en: "Liluli", he: "לילולי" },
    "Листовка": { en: "The leaflet", he: "הכרוז" },
    "Любовная лирика": { en: "Love lyrics", he: "שירי אהבה" },
    "Месяц повис над печною трубой": { en: "The moon hung over the stovepipe", he: "הירח נתלה מעל ארובת הכיריים" },
    "Молитва": { en: "Prayer", he: "תפילה" },
    "Новый год": { en: "New Year", he: "השנה החדשה" },
    "Ночь": { en: "Night", he: "לילה" },
    "Обвинительное заключение": { en: "The indictment", he: "כתב האישום" },
    "Обвинительное заключение и суд": { en: "The indictment and the trial", he: "כתב האישום והמשפט" },
    "Отправка дела на доследование": { en: "The case sent back for further investigation", he: "התיק הוחזר להשלמת חקירה" },
    "Очная ставка с Пятигорским": { en: "Confrontation with Pyatigorsky", he: "עימות עם פיאטיגורסקי" },
    "ПИСЬМО Л.Д.ЛАНДАУ НАРКОМУ ВНУТРЕННИХ ДЕЛ УКРАИНЫ": { en: "Landau’s letter to the People’s Commissar of Internal Affairs of Ukraine", he: "מכתב ל.ד. לנדאו לקומיסר הפנים של אוקראינה" },
    "ПРОТОКОЛ ДОПРОСА 12/XI-56": { en: "Interrogation record, 12/XI-56", he: "פרוטוקול חקירה 12/XI-56" },
    "Падежи": { en: "The cases", he: "יחסות" },
    "Паденья, взлеты, радость, муки": { en: "Falls, rises, joy, torment", he: "נפילות, עליות, שמחה, ייסורים" },
    "Пересмотр дела в 1956 году": { en: "Review of the case in 1956", he: "בחינה מחדש של התיק ב־1956" },
    "Пересмотр обвинения": { en: "Review of the charge", he: "בחינה מחדש של האישום" },
    "Песенка беспризорного": { en: "Song of a street child", he: "שיר של ילד רחוב" },
    "Песня": { en: "A song", he: "שיר" },
    "Песня медведей": { en: "Song of the bears", he: "שיר הדובים" },
    "Письма": { en: "Letters", he: "מכתבים" },
    "Письма из лагеря": { en: "Letters from the camp", he: "מכתבים מן המחנה" },
    "Письмо": { en: "A letter", he: "מכתב" },
    "Письмо Ландау в Военную прокуратуру": { en: "Landau’s letter to the military prosecutor’s office", he: "מכתב לנדאו לפרקליטות הצבאית" },
    "Письмо внуку": { en: "Letter to a grandson", he: "מכתב לנכד" },
    "Письмо восемнадцатое": { en: "Letter eighteen", he: "מכתב שמונה־עשר" },
    "Письмо восьмое": { en: "Letter eight", he: "מכתב שמיני" },
    "Письмо второе": { en: "Letter two", he: "מכתב שני" },
    "Письмо двадцатое": { en: "Letter twenty", he: "מכתב עשרים" },
    "Письмо двадцать второе": { en: "Letter twenty-two", he: "מכתב עשרים ושניים" },
    "Письмо двадцать первое": { en: "Letter twenty-one", he: "מכתב עשרים ואחד" },
    "Письмо двадцать третье": { en: "Letter twenty-three", he: "מכתב עשרים ושלושה" },
    "Письмо двенадцатое": { en: "Letter twelve", he: "מכתב שנים־עשר" },
    "Письмо девятнадцатое": { en: "Letter nineteen", he: "מכתב תשעה־עשר" },
    "Письмо девятое": { en: "Letter nine", he: "מכתב תשיעי" },
    "Письмо десятое": { en: "Letter ten", he: "מכתב עשירי" },
    "Письмо одиннадцатое": { en: "Letter eleven", he: "מכתב אחד־עשר" },
    "Письмо первое": { en: "Letter one", he: "מכתב ראשון" },
    "Письмо пятнадцатое": { en: "Letter fifteen", he: "מכתב חמישה־עשר" },
    "Письмо пятое": { en: "Letter five", he: "מכתב חמישי" },
    "Письмо седьмое": { en: "Letter seven", he: "מכתב שביעי" },
    "Письмо семнадцатое": { en: "Letter seventeen", he: "מכתב שבעה־עשר" },
    "Письмо третье": { en: "Letter three", he: "מכתב שלישי" },
    "Письмо тринадцатое": { en: "Letter thirteen", he: "מכתב שלושה־עשר" },
    "Письмо четвертое": { en: "Letter four", he: "מכתב רביעי" },
    "Письмо четырнадцатое": { en: "Letter fourteen", he: "מכתב ארבעה־עשר" },
    "Письмо шестнадцатое": { en: "Letter sixteen", he: "מכתב שישה־עשר" },
    "Письмо шестое": { en: "Letter six", he: "מכתב שישי" },
    "Подпись к детскому рисунку": { en: "Inscription on a child’s drawing", he: "כיתוב לציור של ילד" },
    "Поперечная канава влево в лес": { en: "A cross ditch, left, into the woods", he: "תעלה לרוחב, שמאלה, אל היער" },
    "Посвящение": { en: "Dedication", he: "הקדשה" },
    "Послесловие": { en: "Afterword", he: "אחרית דבר" },
    "Постановление о прекращении дела": { en: "Order to close the case", he: "החלטה על סגירת התיק" },
    "Постановление о привлечении": { en: "Order to bring charges", he: "החלטה על העמדה לדין" },
    "Постановление об аресте": { en: "Order of arrest", he: "צו מעצר" },
    "Приговор": { en: "The sentence", he: "גזר הדין" },
    "Пролог": { en: "Prologue", he: "פרולוג" },
    "Пророк": { en: "The prophet", he: "הנביא" },
    "Протокол допроса 2/XII": { en: "Interrogation record, 2/XII", he: "פרוטוקול חקירה 2/XII" },
    "Протокол допроса 22/XII": { en: "Interrogation record, 22/XII", he: "פרוטוקול חקירה 22/XII" },
    "Протокол допроса 9/XII": { en: "Interrogation record, 9/XII", he: "פרוטוקול חקירה 9/XII" },
    "Протокол допроса Давидовича": { en: "Interrogation record of Davidovich", he: "פרוטוקול חקירתו של דוידוביץ'" },
    "Протокол допроса Кравченко": { en: "Interrogation record of Kravchenko", he: "פרוטוקול חקירתו של קרבצ'נקו" },
    "Протокол допроса Пятигорского": { en: "Interrogation record of Pyatigorsky", he: "פרוטוקול חקירתו של פיאטיגורסקי" },
    "Протокол заседания МК УФТИ": { en: "Minutes of the UFTI party committee", he: "פרוטוקול ישיבת ועד המפלגה של מכון חרקוב" },
    "Протокол заседания бюро": { en: "Minutes of the bureau", he: "פרוטוקול ישיבת הלשכה" },
    "Реабилитация": { en: "Rehabilitation", he: "שיקום" },
    "Решение об аресте": { en: "Decision to arrest", he: "החלטה על מעצר" },
    "Роптание": { en: "Murmuring", he: "תרעומת" },
    "С.Рус": { en: "S.Rus", he: "ס.רוס" },
    "Следствие": { en: "The investigation", he: "החקירה" },
    "Стихи": { en: "Poems", he: "שירים" },
    "Странный вечер": { en: "A strange evening", he: "ערב מוזר" },
    "Сумеречные объятия": { en: "Dusky embraces", he: "חיבוקי בין־ערביים" },
    "Творчество": { en: "Work", he: "יצירה" },
    "То, что будет": { en: "What will be", he: "מה שיהיה" },
    "Трав весенних дурманящий запах": { en: "The heady scent of spring grasses", he: "ריח משכר של עשבי אביב" },
    "Трио": { en: "Trio", he: "שלישייה" },
    "Тюрьма и лагерь": { en: "Prison and camp", he: "בית סוהר ומחנה" },
    "Фергана": { en: "Fergana", he: "פרגנה" },
    "Фотографии": { en: "Photographs", he: "תצלומים" },
    "Хагода": { en: "Haggadah", he: "הגדה" },
    "Характеристика из УФТИ": { en: "A reference from UFTI", he: "חוות דעת ממכון חרקוב" },
    "Чортов костер": { en: "The devil’s bonfire", he: "מדורת השטן" },
    "Эйлер": { en: "Euler", he: "אוילר" },
    "Эпилог": { en: "Epilogue", he: "אפילוג" },
    "Эссе": { en: "Essays", he: "מסות" },
    "Юрик": { en: "Yurik", he: "יוריק" },
    "Я забыл времена и даты": { en: "I have forgotten times and dates", he: "שכחתי זמנים ותאריכים" },
    "Я устал": { en: "I am tired", he: "עייפתי" }
  };
  var HOME_TITLE = { en: "Moisey Abramovich Korets", he: "משה אברמוביץ׳ קורץ" };
  var HOME_DESC = {
    en: "Moisey Abramovich Korets, 1908–1984. Physicist, prisoner, popularizer of science. A family page.",
    he: "משה אברמוביץ׳ קורץ, 1908–1984. פיזיקאי, אסיר, מפיץ מדע. עמוד משפחתי."
  };

  function norm(s) {
    return (s || "").replace(/\s+/g, " ").trim();
  }

  function langOf() {
    var q = "";
    try { q = new URLSearchParams(location.search).get("lang") || ""; } catch (e) { q = ""; }
    if (q === "ru" || q === "en" || q === "he") {
      try { localStorage.setItem("mk-lang", q); } catch (e) {}
      return q;
    }
    try {
      var saved = localStorage.getItem("mk-lang");
      if (saved === "en" || saved === "he" || saved === "ru") return saved;
    } catch (e) {}
    return "ru";
  }

  function putSwitcher(lang) {
    if (document.querySelector(".langs")) return;
    var header = document.querySelector("header");
    if (!header) return;
    var nav = header.querySelector("nav");
    var p = document.createElement("p");
    p.className = "langs";
    p.setAttribute("dir", "ltr");
    p.setAttribute("aria-label", lang === "he" ? "שפה" : (lang === "en" ? "Language" : "Язык"));
    ["ru", "en", "he"].forEach(function (code) {
      var label = code === "ru" ? "Русский" : (code === "en" ? "English" : "עברית");
      var el;
      if (code === lang) {
        el = document.createElement("span");
        el.setAttribute("aria-current", "true");
      } else {
        el = document.createElement("a");
        var u = new URL(location.href);
        u.searchParams.set("lang", code);
        u.hash = "";
        el.href = u.pathname + u.search;
        el.hreflang = code;
      }
      el.lang = code;
      el.textContent = label;
      p.appendChild(el);
    });
    header.appendChild(p);
  }

  function applyMap(el, map, lang) {
    if (!el || lang === "ru") return;
    var key = norm(el.textContent);
    if (map[key] && map[key][lang]) el.textContent = map[key][lang];
  }

  function apply(lang) {
    putSwitcher(lang);
    if (lang === "ru") return;
    document.documentElement.lang = lang;
    if (lang === "he" && !document.getElementById("he-font")) {
      var link = document.createElement("link");
      link.id = "he-font";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@500;700&family=Noto+Serif+Hebrew:wght@400;600&display=swap";
      document.head.appendChild(link);
    }
    var header = document.querySelector("header");
    if (header) {
      header.querySelectorAll("a").forEach(function (a) {
        if (a.closest(".langs")) return;
        applyMap(a, NAV, lang);
      });
      var nav = header.querySelector("nav");
      if (nav && SECTIONS[nav.getAttribute("aria-label")]) {
        nav.setAttribute("aria-label", SECTIONS[nav.getAttribute("aria-label")][lang]);
      }
      if (lang === "he") header.classList.add("i18n-he");
    }
    applyMap(document.querySelector("a.skip"), SKIP, lang);
    var swap = document.getElementById("home-" + lang) || document.getElementById("page-" + lang);
    if (swap) {
      var fresh = swap.content.querySelector("main");
      var current = document.querySelector("main");
      if (fresh && current) current.replaceWith(fresh.cloneNode(true));
      var desc = document.querySelector('meta[name="description"]');
      if (swap.id.indexOf("home-") === 0) {
        document.title = HOME_TITLE[lang];
        if (desc && HOME_DESC[lang]) desc.setAttribute("content", HOME_DESC[lang]);
      } else {
        var pageTitle = swap.getAttribute("data-title");
        if (pageTitle) document.title = pageTitle;
        var pageDesc = swap.getAttribute("data-desc");
        if (desc && pageDesc) desc.setAttribute("content", pageDesc);
      }
      if (lang === "he") document.documentElement.setAttribute("dir", "rtl");
      return;
    }
    var h1 = document.querySelector("main h1");
    applyMap(h1, HEADS, lang);
    if (h1 && lang === "he") h1.classList.add("i18n-he");
    var titleKey = norm(document.title);
    if (HEADS[titleKey]) document.title = HEADS[titleKey][lang];
    document.querySelectorAll("main h2").forEach(function (h2) {
      var key = norm(h2.textContent);
      if (!H2[key]) return;
      h2.textContent = H2[key][lang];
      if (lang === "he") h2.classList.add("i18n-he");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { apply(langOf()); });
  } else {
    apply(langOf());
  }
})();

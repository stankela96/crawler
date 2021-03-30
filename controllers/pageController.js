const puppeteer = require("puppeteer");

async function pageData (req, res, next) {
    const { passedUrl } = req.body;

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(passedUrl, {waitUntil: 'networkidle2'});
    
    const result = await page.evaluate(() => {
        const handleInput = (element, attribute) => {
          return element && element[attribute] && element[attribute].trim() || undefined
        }

        let articles = {};
        let data = Array.from(document.querySelectorAll('.o-Hits.a-list-reset > li'));

        articles = data.map(list => ({
          imageLink: handleInput(list.querySelector('.o-FilteredProductListItem__image > a'), 'href'),
          title: handleInput(list.querySelector('.o-FilteredProductListItem__content > div > div > div > a'), 'textContent'),
          pzn: handleInput(list.querySelector('.o-ProductPackageDetails > div:nth-child(2)'), 'textContent'),
          price: handleInput(list.querySelector('.o-ProductPriceInfo > div:nth-child(2) > div > div > div:nth-child(3)'), 'textContent')
        }));

        return {
          articles
        }
    });

    let filtered = result.articles.filter(value => Object.keys(value).length !== 0);
    let index = 1;

    for(const element of filtered) {
      element.pzn = element.pzn.split(':')[1].trim();
      element.position = index++;
    }

    await browser.close();
    res.status(200).send(filtered);
};

module.exports = {pageData};


/*
Response from postman:
[
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/3933100/calendula-wundsalbe.htm",
        "title": "Calendula Wundsalbe",
        "pzn": "03933100",
        "price": "€ 10,30",
        "position": 1
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/12421103/dhu-silicea-pentarkan.htm",
        "title": "DHU Silicea Pentarkan®",
        "pzn": "12421103",
        "price": "€ 20,50",
        "position": 2
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/1448547/wala-rosatum-heilsalbe.htm",
        "title": "Wala® Rosatum Heilsalbe",
        "pzn": "01448547",
        "price": "€ 7,13",
        "position": 3
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/171138/calendula-essenz.htm",
        "title": "Calendula Essenz",
        "pzn": "00171138",
        "price": "€ 14,92",
        "position": 4
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/3141416/combudoron-gel.htm",
        "title": "Combudoron® Gel",
        "pzn": "03141416",
        "price": "€ 14,53",
        "position": 5
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/1448234/wala-narben-gel.htm",
        "title": "WALA® Narben Gel",
        "pzn": "01448234",
        "price": "€ 12,74",
        "position": 6
    },
    {
        "imageLink": "https://www.shop-apotheke.com/baby/12903977/wecesin.htm",
        "title": "Wecesin®",
        "pzn": "12903977",
        "price": "€ 14,28",
        "position": 7
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/2782283/derivatio-tabletten.htm",
        "title": "Derivatio Tabletten",
        "pzn": "02782283",
        "price": "€ 18,16",
        "position": 8
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/1572856/hamamelis-comp-salbe.htm",
        "title": "Hamamelis comp. Salbe",
        "pzn": "01572856",
        "price": "€ 13,19",
        "position": 9
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/3141451/heilsalbe.htm",
        "title": "Heilsalbe",
        "pzn": "03141451",
        "price": "€ 18,73",
        "position": 10
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/2198584/wala-wund-und-brandgel.htm",
        "title": "WALA® Wund- und Brandgel",
        "pzn": "02198584",
        "price": "€ 7,80",
        "position": 11
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/2094577/arnica-salbe-n.htm",
        "title": "ARNICA SALBE N",
        "pzn": "02094577",
        "price": "€ 5,04",
        "position": 12
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/1339605/dhu-halicar-salbe-n.htm",
        "title": "DHU Halicar® Salbe N",
        "pzn": "01339605",
        "price": "€ 26,09",
        "position": 13
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/3932922/wala-calcea-wund-und-heilcreme.htm",
        "title": "WALA® Calcea Wund- und Heilcreme",
        "pzn": "03932922",
        "price": "€ 13,70",
        "position": 14
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/1245442/calendumed-salbe-n.htm",
        "title": "CALENDUMED SALBE N",
        "pzn": "01245442",
        "price": "€ 19,74",
        "position": 15
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/1399978/wala-akne-wasser.htm",
        "title": "WALA® Akne-Wasser",
        "pzn": "01399978",
        "price": "€ 12,14",
        "position": 16
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/81091/wala-calcium-quercus-globuli-velati.htm",
        "title": "WALA® Calcium Quercus Globuli velati",
        "pzn": "00081091",
        "price": "€ 9,61",
        "position": 17
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/1713535/dermaplant.htm",
        "title": "DERMAPLANT®",
        "pzn": "01713535",
        "price": "€ 21,14",
        "position": 18
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/7511838/dhu-halicar-creme.htm",
        "title": "DHU Halicar® Creme",
        "pzn": "07511838",
        "price": "€ 26,20",
        "position": 19
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/8102325/dhu-schuessler-frauengesundheit-set.htm",
        "title": "DHU Schüßler Frauengesundheit Set",
        "pzn": "08102325",
        "price": "€ 19,40",
        "position": 20
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/2782219/derivatio-tabletten.htm",
        "title": "Derivatio Tabletten",
        "pzn": "02782219",
        "price": "€ 11,29",
        "position": 21
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/4837485/arnica-salbe-n.htm",
        "title": "ARNICA SALBE N",
        "pzn": "04837485",
        "price": "€ 7,97",
        "position": 22
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/3141468/mercurialis-perennis-10-salbe.htm",
        "title": "Mercurialis perennis 10% Salbe",
        "pzn": "03141468",
        "price": "€ 17,15",
        "position": 23
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/3141445/dermatodoron-salbe.htm",
        "title": "Dermatodoron® Salbe",
        "pzn": "03141445",
        "price": "€ 21,11",
        "position": 24
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/8783639/wala-apis-belladonna-c-mercurio-globuli.htm",
        "title": "WALA® Apis Belladonna c. Mercurio Globuli",
        "pzn": "08783639",
        "price": "€ 8,39",
        "position": 25
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/1948528/calendula-essenz.htm",
        "title": "Calendula Essenz",
        "pzn": "01948528",
        "price": "€ 42,16",
        "position": 26
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/2198526/wala-rosmarinus-prunus-comp-gelatum.htm",
        "title": "WALA® Rosmarinus/ Prunus comp. Gelatum",
        "pzn": "02198526",
        "price": "€ 7,78",
        "position": 27
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/10044263/cutacalmi.htm",
        "title": "Cutacalmi®",
        "pzn": "10044263",
        "price": "€ 10,62",
        "position": 28
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/1448346/wala-mercurialis-salbe.htm",
        "title": "WALA® Mercurialis Salbe",
        "pzn": "01448346",
        "price": "€ 8,46",
        "position": 29
    },
    {
        "imageLink": "https://www.shop-apotheke.com/homoeopathie/7511844/calendumed-creme.htm",
        "title": "Calendumed Creme",
        "pzn": "07511844",
        "price": "€ 7,66",
        "position": 30
    }
]
*/
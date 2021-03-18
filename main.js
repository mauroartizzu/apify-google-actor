const Apify = require('apify');

Apify.main(async () => {
    const input = await Apify.getInput();
    console.log('Actor input:');
    console.dir(input);

    const url = `https://www.google.it/search?q=${input.query}`;

    
    const requestQueue = await Apify.openRequestQueue();
    await requestQueue.addRequest({ url });

    const handlePageFunction = async ({ request, $ }) => {
        const extabar = $('div#extabar').text(); // "1 risultato (0,32 secondi) "
        const topstuff = $('div#topstuff').text(); // La ricerca di - "asdghksadhjkdsakhjadsjkhadshjkadshjkasdhjkasdkhjasdkhjadsasdhjk" - non ha prodotto risultati in nessun documento.Suggerimenti:Assicurarsi che tutte le parole siano state digitate correttamente.Provare con parole chiave diverse.Provare con parole chiave più generiche."
        
    };

    
    // Set up the crawler, passing a single options object as an argument.
    const crawler = new Apify.CheerioCrawler({
        requestQueue,
        handlePageFunction: async ({ request, response, body, $ }) => {
            const dataset = await Apify.openDataset();

            const data = {
                searchQuery: {
                    term: input.query
                },
                url: url
            };

            await dataset.pushData(data);
        },
    });

    await crawler.run();

});

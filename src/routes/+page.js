// src/routes/+page.js
/** @type {import('./$types').PageLoad} */

import Papa from 'papaparse';

/*
  {
    Chiuse: '02-ago-24 19:51:14',
    Dettagli: 'GKS Tychy - Warta Poznan Under 1,5 goal-Over/Under 1,5 gol | ID scommessa Betfair 1:356296301583 | Piazzata 02-ago-24 19:04:00 | ID Scommessa AdM bc0000000046112d6a07',
    Tipo: 'Punta',
    Quota: 4,
    'Puntata (€)': '15,00',
    'Responsabilità (€)': ' -- ',
    'Profitto/Perdita (€)': ' -15,00 ',
    Stato: 'Persa'
  },

*/
// @ts-ignore
export async function load(event) {
	// Fetch the CSV file from the static directory
    const response = await event.fetch('/betfair_bets_settled.csv');
    const csvData = await response.text();
  
    // Parse the CSV data
    const parsedData = Papa.parse(csvData, {
      header: true,
      dynamicTyping: true
    });

    const data = parsedData.data.filter(record => {
        return !(!record.Dettagli || !record.Chiuse || !record.Tipo)
    }).map(record => {
        // if(!record.Dettagli || !record.Chiuse || !record.Tipo) {
        //     return
        // }

        const parts = record.Dettagli.split('|')
        const details = parts[0]
        const betId = parts[1]
        const createdAt = parts[2].replace("Piazzata", "").trim()
        const admId = parts[3]

        const betMarket = details.match(/-([^-]+)$/)[1].trim()

        const match = details.match(/^(([^-]+)\s*-\s*([A-Z0-9a-z]+\s*){1,3})/)[1].trim()

        const betType = details.replace(betMarket, "").replace(match, "").trim().replace("-", "")

        console.log("createdAt:", createdAt)
        console.log("type:", record.Tipo)
        console.log("details:", details)
        console.log("betMarket:", betMarket)
        console.log("betType:", betType)
        console.log("match:", match)
        console.log("betId:", betId)
        console.log("admId:", admId)

        console.log("odds:", record.Quota, typeof record.Quota)

        const back = record['Puntata (€)'] ? parseInt(record['Puntata (€)'].replace(" ", "").replace(",", "")) : 0
        console.log("back:", back, typeof back)

        const lay = record['Responsabilità (€)'] ? (record['Responsabilità (€)'].includes('--') ? 0 : parseInt(record['Responsabilità (€)'].replace(" ", "").replace(",", ""))) : 0

        console.log("lay: ", lay, typeof lay)

        const pl = record['Profitto/Perdita (€)'] ? parseInt(record['Profitto/Perdita (€)'].replace(" ", "").replace(",", "")) : 0

        console.log("P/L: ", pl, typeof pl)

        console.log('\n')

        return {
            closedAt: record.Chiuse,
            createdAt,
            type: record.Tipo,
            //details,
            match,
            betMarket,
            betType,
            betId,
            admId,
            odds: record.Quota,
            back,
            lay,
            pl,
            status: record.Stato
        }
    })

    // console.log('ParsedData: ', data)
  
    // Return the parsed data to the page
    return {
        data
    };
}
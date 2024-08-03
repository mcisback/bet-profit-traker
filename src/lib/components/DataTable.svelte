<script>
	import Badge from "./Badge.svelte";


   const columns = {
    // closedAt:
    // {
    //     sortable: true,
    // },
    createdAt:
    {
        sortable: true,
    },
    type:
    {
        sortable: true,
    },
    // details:
    // {
    //     sortable: true,
    // },
    match:
    {
        sortable: true,
    },
    betMarket:
    {
        sortable: true,
    },
    betType:
    {
        sortable: true,
    },
    // betId:
    // {
    //     sortable: true,
    // },
    // admId:
    // {
    //     sortable: true,
    // },
    odds:
    {
        sortable: true,
    },
    back:
    {
        sortable: true,
    },
    lay:
    {
        sortable: true,
    },
    pl:
    {
        sortable: true,
    },
    status: {
        sortable: true,
    }
   }

	export let data;

    console.log('DataTable data:', data)

    const winsCount = data.data.reduce((acc, record) => {
        return record.status === 'Vinta' ? acc + 1 : acc
    }, 0)

    const lossCount = data.data.reduce((acc, record) => {
        return record.status === 'Persa' ? acc + 1 : acc
    }, 0)

    const wins = data.data.reduce((acc, record) => {
        return record.status === 'Vinta' ? acc + record.pl : acc
    }, 0)

    const losses = data.data.reduce((acc, record) => {
        return record.status === 'Persa' ? acc + record.pl : acc
    }, 0)

    const profit = (wins + losses) / 100

</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="flex pt-4 pb-8 justify-around px-80">
        <div>
            <Badge color="green">
                Vinte: { winsCount }
            </Badge>
        </div>

        <div>
            <Badge color="red">
                Perse: { lossCount }
           </Badge>
        </div>

        <div>
            <Badge color="green">
                +{ wins / 100 } &euro;
           </Badge>
        </div>

        <div>
            <Badge color="red">
                { losses / 100 } &euro;
           </Badge>
        </div>

        <div>
            {#if profit >= 0}
                <Badge color="green">
                    +{ profit } &euro;
               </Badge>
            {:else}
                <Badge color="red">
                    { profit } &euro;
               </Badge>
            {/if}
        </div>

    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {#each Object.entries(columns) as [label, col]}
                    <th scope="col" class="px-6 py-3">
                        <div class="flex items-center">
                            { label }

                            {#if col.sortable === true}
                            <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
        </svg></a>
                            {/if}
                        </div>
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each data.data as row}
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    {#each Object.entries(columns) as [key, col]}
                        <td class="px-6 py-4">
                            {#if key === 'pl'}
                                {#if row[key] >= 0}
                                    <Badge size="xs" color="green">
                                        +{row[key] / 100} &euro;
                                    </Badge>
                                {:else}
                                    <Badge size="xs" color="red">
                                        {row[key] / 100} &euro;
                                    </Badge>
                                {/if}
                            {:else if  key === 'lay' || key === 'back'}
                                <Badge size="xs" color="blue">
                                    {row[key] / 100} &euro;
                                </Badge>
                            {:else if key === 'type'}
                                {#if row[key] === 'Punta'}
                                    <Badge size="xs" color="back" style="background-color: #4DB1FF !important; color: #004b85 !important;">
                                        {row[key]}
                                    </Badge>
                                {:else}
                                    <Badge size="xs" color="lay" style="background-color: #F994A9 !important; color: #960826 !important;">
                                        {row[key]}
                                    </Badge>
                                {/if}
                            {:else}
                                {row[key]}
                            {/if}
                        </td>
                    {/each}
                </tr>
            {/each}
            
            <!-- <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td class="px-6 py-4">
                    Black
                </td>
                <td class="px-6 py-4">
                    Accessories
                </td>
                <td class="px-6 py-4">
                    $99
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr> -->
        </tbody>
    </table>
</div>

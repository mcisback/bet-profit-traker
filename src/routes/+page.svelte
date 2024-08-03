<script>
	import DataTable from "$lib/components/DataTable.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
	import Sidebar from "$lib/components/Sidebar.svelte";

    export let data;

    console.log('DataTable data:', data)
</script>

<Navbar />

<Sidebar>
    <DataTable data={data}/>
</Sidebar>


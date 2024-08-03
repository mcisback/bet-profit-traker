<script>
    export let color
    export let size = 'xl'
    export let style = ''
</script>

<span class="bg-{ color }-100 text-{ color }-800 text-{ size } font-medium me-2 px-2.5 py-0.5 rounded dark:bg-{ color }-900 dark:text-{ color }-300 whitespace-nowrap" style={style}>
    <slot />
</span>
<script lang="ts">
import { getBackendURL } from "$lib/api/backend";

    import type { IImageData } from "$lib/api/image";

    export let image : IImageData;
</script>

<img src={getBackendURL(image.url)} alt={image.alternativeText}/>
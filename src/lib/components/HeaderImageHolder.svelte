<script lang="ts">
    let y;
</script>

<svelte:window bind:scrollY={y}/>

<div class="image-header">
    <div class="layer paralax-layer" style="transform: translate(0,{y * -0.3}px)">
        <slot></slot>
        <div class="shade"></div>
        <div class="color"></div>
    </div>
    <div class="layer top-layer" style="transform: translate(0,{y * -0.6}px)">
        <slot name="top"></slot>
    </div>
</div>

<style lang="scss">
    .image-header {
        overflow: hidden;
        position: sticky;
        top: 0;
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        aspect-ratio: 4/1;
        box-sizing: content-box;
        min-height: 40vh;
        
        :global(img) {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .layer {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .shade {
		position: absolute;
		bottom: 0;
		height: calc((5% + 3rem)*2);
		width: 100%;

		background: radial-gradient(ellipse farthest-side at bottom, rgba(0,0,0,0.5) 0%, rgba(0, 0, 0, 0) 100%);
	}

	.color {
		position: absolute;
		bottom: 0;
		height: calc((5% + 3rem)*2);
		width: 100%;

		background: linear-gradient(0deg, rgba(0,95,127,1) 20%, rgba(0,95,127,0) 100%);
		mix-blend-mode: color;
	}
</style>


<div class="image-header">
    <div class="layer paralax-layer">
        <slot></slot>
        <div class="shade"></div>
        <div class="color"></div>
    </div>
    <div class="layer top-layer">
        <slot name="top"></slot>
    </div>
</div>


<style lang="scss">
    @use "sass:math";

    $parallax-perspective: 10px;
    $parallax-depth: -10px;
    $parallax-scale: math.div($parallax-perspective - $parallax-depth, $parallax-perspective);

    :global(.outer-main) {
        perspective: $parallax-perspective;
        perspective-origin: 50% 0%;
    }

    .image-header {
        transform-style: preserve-3d; 
        position: sticky;
        top: 0;
        width: 100%;
        aspect-ratio: 4/1;
        
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

    .paralax-layer {
        transform: translateZ($parallax-depth) translateY(50%) scale($parallax-scale);
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
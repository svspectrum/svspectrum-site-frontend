
<div class="image-header">
    <div class="layer1">
        <slot></slot>
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
        
        width: 100%;
        
        :global(img) {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .layer1 {
        position: absolute;
        width: 100%;
        height: 100%;

        transform: translateZ($parallax-depth) translateY(50%) scale($parallax-scale);
    }
</style>
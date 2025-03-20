@php
    use Filament\Support\Facades\FilamentAsset;
    $statePath = $getStatePath();

@endphp
<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    @php
        $width = $getWidth();
        $height = $getHeight();
        $pointRadius = $getPointRadius() ?? 5;
        $imageUrl = $getImageUrl();
    @endphp
    <div
        class="pointer-stage"
        ax-load="visible"
        ax-load-src="{{ FilamentAsset::getAlpineComponentSrc('hotspotImageComponent', 'ruelluna/canvas-pointer') }}"
        x-data="hotspotImageComponent({
        state: $wire.entangle('{{ $statePath }}'),
        statePath: '{{ $statePath }}',
        coordinates: $wire.$entangle('{{ $statePath }}').defer,
        imageUrl: @js($imageUrl),
        width: @js($width),
        height: @js($height),
        pointRadius: @js($pointRadius),
        pointColor: @js($pointColor)
    })"
        x-on:stage:draw-point="$wire.emit('showPointForm')"
        x-on:update-point="addPoint($event.detail)">
        <div wire:ignore x-ref="containerRef" id="container"></div>
        <input x-model="coordinates" type="hidden" name="coordinates" id="coordinates">
    </div>
</x-dynamic-component>

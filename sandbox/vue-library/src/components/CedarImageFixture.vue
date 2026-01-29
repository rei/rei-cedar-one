<template>
  <section class="fixture">
    <h2 class="fixture-title">Image</h2>

    <section class="fixture-group">
      <h3>Base</h3>
      <div class="fixture-stack">
        <img
          class="cdr-image"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="Placeholder image"
        />
      </div>
    </section>

    <section class="fixture-group">
      <h3>Ratios</h3>
      <div class="fixture-stack">
        <img
          class="cdr-image cdr-image--ratio-1-1"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="Square image"
        />
        <img
          class="cdr-image cdr-image--ratio-1-2"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="1 by 2 image"
        />
        <img
          class="cdr-image cdr-image--ratio-3-4"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="3 by 4 image"
        />
        <img
          class="cdr-image cdr-image--ratio-9-16"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="9 by 16 image"
        />
        <img
          class="cdr-image cdr-image--ratio-2-1"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="2 by 1 image"
        />
        <img
          class="cdr-image cdr-image--ratio-4-3"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="4 by 3 image"
        />
        <img
          class="cdr-image cdr-image--ratio-16-9"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="16 by 9 image"
        />
      </div>
    </section>

    <section class="fixture-group">
      <h3>Object fit</h3>
      <div class="fixture-stack">
        <img
          class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-cover"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="Cover fit image"
        />
        <img
          class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-contain"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="Contain fit image"
        />
        <img
          class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-none"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="None fit image"
        />
      </div>
    </section>

    <section class="fixture-group">
      <h3>Object position</h3>
      <div class="fixture-stack">
        <img
          class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-cover cdr-image--position-center"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="Centered image"
        />
        <img
          class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-cover cdr-image--position-top"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="Top aligned image"
        />
        <img
          class="cdr-image cdr-image--ratio-16-9 cdr-image--fit-cover cdr-image--position-bottom"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="Bottom aligned image"
        />
      </div>
    </section>

    <section class="fixture-group">
      <h3>Radius</h3>
      <div class="fixture-stack">
        <img
          class="cdr-image cdr-image--radius-sharp"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="Sharp radius image"
        />
        <img
          class="cdr-image cdr-image--radius-soft"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="Soft radius image"
        />
        <img
          class="cdr-image cdr-image--radius-softer"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="Softer radius image"
        />
        <img
          class="cdr-image cdr-image--radius-round"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="Round radius image"
        />
      </div>
    </section>

    <section class="fixture-group">
      <h3>Loading</h3>
      <div class="fixture-stack">
        <img
          class="cdr-image"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="Lazy image"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
        />
        <img
          class="cdr-image"
          src="https://cedar.rei.com/rei-passage-2-tent.jpg"
          alt="Eager image"
          loading="eager"
          decoding="auto"
          fetchpriority="high"
        />
      </div>
    </section>
  </section>
</template>

<style scoped>
.fixture {
  display: grid;
  gap: 16px;
}

.fixture-title {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 600;
}

.fixture-group h3 {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
}

.fixture-stack {
  display: grid;
  gap: 12px;
  max-width: 72ch;
}
</style>

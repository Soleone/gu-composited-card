import { html } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

import './icon.component';
import './autofit-description-text.component';

const artQualities = {
  small: 250,
  normal: 375,
  large: 500,
  xLarge: 720,
  xxLarge: 1024,
  xxxLarge: 1280,
  xxxxLarge: 1440,
  best: 1920,
};

const layerQualities = {
  small: 256,
  normal: 512,
  large: 720,
  xLarge: 1024,
  xxLarge: 1280,
  xxxLarge: 1440,
  best: 1920,
};

const lockQualities = {
  normal: 256,
  large: 512,
};

// @NOTE: Per the ticket:
// https://immutable.atlassian.net/browse/GUG-6156
// There is no such type as "god power" for now.
// So simply change these cards to simply be type = "power"
export function validateTypeField(type: string) {
  return type === 'god power' ? 'power' : type;
}

export const loadingTemplate = () => html`
  <div class="card__loading">
    <img
      class="card__loading__img"
      src="${require('./assets/loading.png')}"
      alt="immutable loading spinner"
    />
  </div>
`;

const guImagesUrl = 'https://images.godsunchained.com';

// @NOTE: Due to the dsesire to not crop card layer images down to a rectangle,
// we need to load slightly bigger images than what the browser thinks we do,
// and this is why for example:
// we loading the "normal" asset size, and tell the browser it's actually the "small" size

export const baseArtworkLayersTemplate = ({
  id,
  responsiveSrcsetSizes = `${artQualities.normal}px`,
}) => {
  return html`
    <picture class="card__artwork">
      <source
        srcset="
          ${guImagesUrl}/art2/${artQualities.normal}/${id}.webp ${artQualities.small}w,
          ${guImagesUrl}/art2/${artQualities.large}/${id}.webp ${artQualities.normal}w,
          ${guImagesUrl}/art2/${artQualities.xLarge}/${id}.webp ${artQualities.large}w,
          ${guImagesUrl}/art2/${artQualities.xxLarge}/${id}.webp ${artQualities.xLarge}w,
          ${guImagesUrl}/art2/${artQualities.xxxLarge}/${id}.webp ${artQualities.xxLarge}w,
          ${guImagesUrl}/art2/${artQualities.xxxxLarge}/${id}.webp ${artQualities.xxxLarge}w,
          ${guImagesUrl}/art2/${artQualities.best}/${id}.webp ${artQualities.xxxxLarge}w
        "
        sizes="${responsiveSrcsetSizes}"
        type="image/webp"
      />
      <source
        srcset="
          ${guImagesUrl}/art2/${artQualities.normal}/${id}.jpg ${artQualities.small}w,
          ${guImagesUrl}/art2/${artQualities.large}/${id}.jpg ${artQualities.normal}w,
          ${guImagesUrl}/art2/${artQualities.xLarge}/${id}.jpg ${artQualities.large}w,
          ${guImagesUrl}/art2/${artQualities.xxLarge}/${id}.jpg ${artQualities.xLarge}w,
          ${guImagesUrl}/art2/${artQualities.xxxLarge}/${id}.jpg ${artQualities.xxLarge}w,
          ${guImagesUrl}/art2/${artQualities.xxxxLarge}/${id}.jpg ${artQualities.xxxLarge}w,
          ${guImagesUrl}/art2/${artQualities.best}/${id}.jpg ${artQualities.xxxxLarge}w
        "
        sizes="${responsiveSrcsetSizes}"
        type="image/jpg"
      />
      <img
        srcset="${guImagesUrl}/art2/${artQualities.small}/${id}.jpg"
        class="card__artwork__img"
      />
    </picture>
  `;
};

export const mythicImageLayersTemplate = ({
  responsiveSrcsetSizes = `${layerQualities.normal}px`,
  art_id,
  type,
  god,
}) => {
  return html`
    <picture class="card__baseLayer">
      <source
        srcset="
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.normal}/${type}_${art_id}.webp ${layerQualities.small}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.large}/${type}_${art_id}.webp ${layerQualities.normal}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.xLarge}/${type}_${art_id}.webp ${layerQualities.large}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.xxLarge}/${type}_${art_id}.webp ${layerQualities.xLarge}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.xxxLarge}/${type}_${art_id}.webp ${layerQualities.xxLarge}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.best}/${type}_${art_id}.webp ${layerQualities.xxxLarge}w
        "
        sizes="${responsiveSrcsetSizes}"
        type="image/webp"
      />
      <source
        srcset="
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.normal}/${type}_${art_id}.png ${layerQualities.small}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.large}/${type}_${art_id}.png ${layerQualities.normal}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.xLarge}/${type}_${art_id}.png ${layerQualities.large}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.xxLarge}/${type}_${art_id}.png ${layerQualities.xLarge}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.xxxLarge}/${type}_${art_id}.png ${layerQualities.xxLarge}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.best}/${type}_${art_id}.png ${layerQualities.xxxLarge}w
        "
        sizes="${responsiveSrcsetSizes}"
        type="image/png"
      />

      <img
        srcset="
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.small}/${type}_${art_id}.png
        "
        class="card__baseLayer__img"
      />
    </picture>

    <picture class="card__manaLayer">
      <source
        srcset="
          ${guImagesUrl}/border-layers/rosettes/mythics/${layerQualities.normal}/mythic_${art_id}.webp ${layerQualities.small}w,
          ${guImagesUrl}/border-layers/rosettes/mythics/${layerQualities.large}/mythic_${art_id}.webp ${layerQualities.normal}w,
          ${guImagesUrl}/border-layers/rosettes/mythics/${layerQualities.xLarge}/mythic_${art_id}.webp ${layerQualities.large}w,
          ${guImagesUrl}/border-layers/rosettes/mythics/${layerQualities.xxLarge}/mythic_${art_id}.webp ${layerQualities.xLarge}w,
          ${guImagesUrl}/border-layers/rosettes/mythics/${layerQualities.xxxLarge}/mythic_${art_id}.webp ${layerQualities.xxLarge}w,
          ${guImagesUrl}/border-layers/rosettes/mythics/${layerQualities.best}/mythic_${art_id}.webp ${layerQualities.xxxLarge}w
        "
        sizes="${responsiveSrcsetSizes}"
        type="image/webp"
      />
      <source
        srcset="
          ${guImagesUrl}/border-layers/rosettes/mythics/${layerQualities.normal}/mythic_${art_id}.png ${layerQualities.small}w,
          ${guImagesUrl}/border-layers/rosettes/mythics/${layerQualities.large}/mythic_${art_id}.png ${layerQualities.normal}w,
          ${guImagesUrl}/border-layers/rosettes/mythics/${layerQualities.xLarge}/mythic_${art_id}.png ${layerQualities.large}w,
          ${guImagesUrl}/border-layers/rosettes/mythics/${layerQualities.xxLarge}/mythic_${art_id}.png ${layerQualities.xLarge}w,
          ${guImagesUrl}/border-layers/rosettes/mythics/${layerQualities.xxxLarge}/mythic_${art_id}.png ${layerQualities.xxLarge}w,
          ${guImagesUrl}/border-layers/rosettes/mythics/${layerQualities.best}/mythic_${art_id}.png ${layerQualities.xxxLarge}w
        "
        sizes="${responsiveSrcsetSizes}"
        type="image/png"
      />

      <img
        srcset="
          ${guImagesUrl}/border-layers/rosettes/${god}/${layerQualities.normal}/mythic_${art_id}.png
        "
        class="card__manaLayer__img card__manaLayer__img--mythic"
      />
    </picture>
  `;
};

export const nonMythicImageLayersTemplate = ({
  responsiveSrcsetSizes = `${layerQualities.normal}px`,
  type,
  qualityName,
  rarity,
  god,
  set,
  tribe,
}) => {
  type = validateTypeField(type);

  return html`
    <picture class="card__baseLayer">
      <source
        srcset="
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.normal}/${type}_${qualityName}.webp ${layerQualities.small}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.large}/${type}_${qualityName}.webp ${layerQualities.normal}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.xLarge}/${type}_${qualityName}.webp ${layerQualities.large}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.xxLarge}/${type}_${qualityName}.webp ${layerQualities.xLarge}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.xxxLarge}/${type}_${qualityName}.webp ${layerQualities.xxLarge}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.best}/${type}_${qualityName}.webp ${layerQualities.xxxLarge}w
        "
        sizes="${responsiveSrcsetSizes}"
        type="image/webp"
      />

      <source
        srcset="
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.normal}/${type}_${qualityName}.png ${layerQualities.small}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.large}/${type}_${qualityName}.png ${layerQualities.normal}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.xLarge}/${type}_${qualityName}.png ${layerQualities.large}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.xxLarge}/${type}_${qualityName}.png ${layerQualities.xLarge}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.xxxLarge}/${type}_${qualityName}.png ${layerQualities.xxLarge}w,
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.best}/${type}_${qualityName}.png ${layerQualities.xxxLarge}w
        "
        sizes="${responsiveSrcsetSizes}"
        type="image/png"
      />
      <img
        srcset="
          ${guImagesUrl}/border-layers/types/${type}/${layerQualities.small}/${type}_${qualityName}.png
        "
        class="card__baseLayer__img"
      />
    </picture>

    <picture class="card__manaLayer">
      <source
        srcset="
          ${guImagesUrl}/border-layers/rosettes/${god}/${layerQualities.normal}/${god}_${qualityName}.webp ${layerQualities.small}w,
          ${guImagesUrl}/border-layers/rosettes/${god}/${layerQualities.large}/${god}_${qualityName}.webp ${layerQualities.normal}w,
          ${guImagesUrl}/border-layers/rosettes/${god}/${layerQualities.xLarge}/${god}_${qualityName}.webp ${layerQualities.large}w,
          ${guImagesUrl}/border-layers/rosettes/${god}/${layerQualities.xxLarge}/${god}_${qualityName}.webp ${layerQualities.xLarge}w,
          ${guImagesUrl}/border-layers/rosettes/${god}/${layerQualities.xxxLarge}/${god}_${qualityName}.webp ${layerQualities.xxLarge}w,
          ${guImagesUrl}/border-layers/rosettes/${god}/${layerQualities.best}/${god}_${qualityName}.webp ${layerQualities.xxxLarge}w
        "
        sizes="${responsiveSrcsetSizes}"
        type="image/webp"
      />
      <source
        srcset="
          ${guImagesUrl}/border-layers/rosettes/${god}/${layerQualities.normal}/${god}_${qualityName}.png ${layerQualities.small}w,
          ${guImagesUrl}/border-layers/rosettes/${god}/${layerQualities.large}/${god}_${qualityName}.png ${layerQualities.normal}w,
          ${guImagesUrl}/border-layers/rosettes/${god}/${layerQualities.xLarge}/${god}_${qualityName}.png ${layerQualities.large}w,
          ${guImagesUrl}/border-layers/rosettes/${god}/${layerQualities.xxLarge}/${god}_${qualityName}.png ${layerQualities.xLarge}w,
          ${guImagesUrl}/border-layers/rosettes/${god}/${layerQualities.xxxLarge}/${god}_${qualityName}.png ${layerQualities.xxLarge}w,
          ${guImagesUrl}/border-layers/rosettes/${god}/${layerQualities.best}/${god}_${qualityName}.png ${layerQualities.xxxLarge}w
        "
        sizes="${responsiveSrcsetSizes}"
        type="image/png"
      />
      <img
        srcset="
          ${guImagesUrl}/border-layers/rosettes/${god}/${layerQualities.small}/${god}_${qualityName}.png
        "
        class="card__manaLayer__img"
      />
    </picture>

    ${rarity !== 'common'
      ? html`
          <picture class="card__rarityLayer">
            <source
              srcset="
              ${guImagesUrl}/border-layers/gems/${layerQualities.small}/rarity_${rarity}.webp ${layerQualities.small}w,
                ${guImagesUrl}/border-layers/gems/${layerQualities.normal}/rarity_${rarity}.webp ${layerQualities.normal}w,
                ${guImagesUrl}/border-layers/gems/${layerQualities.large}/rarity_${rarity}.webp ${layerQualities.large}w,
                ${guImagesUrl}/border-layers/gems/${layerQualities.xLarge}/rarity_${rarity}.webp ${layerQualities.xLarge}w,
                ${guImagesUrl}/border-layers/gems/${layerQualities.xxLarge}/rarity_${rarity}.webp ${layerQualities.xxLarge}w,
                ${guImagesUrl}/border-layers/gems/${layerQualities.xxxLarge}/rarity_${rarity}.webp ${layerQualities.xxxLarge}w,
                ${guImagesUrl}/border-layers/gems/${layerQualities.best}/rarity_${rarity}.webp ${layerQualities.best}w
              "
              sizes="${responsiveSrcsetSizes}"
              type="image/webp"
            />
            <source
              srcset="
              ${guImagesUrl}/border-layers/gems/${layerQualities.small}/rarity_${rarity}.png ${layerQualities.small}w,
                ${guImagesUrl}/border-layers/gems/${layerQualities.normal}/rarity_${rarity}.png ${layerQualities.normal}w,
                ${guImagesUrl}/border-layers/gems/${layerQualities.large}/rarity_${rarity}.png ${layerQualities.large}w,
                ${guImagesUrl}/border-layers/gems/${layerQualities.xLarge}/rarity_${rarity}.png ${layerQualities.xLarge}w,
                ${guImagesUrl}/border-layers/gems/${layerQualities.xxLarge}/rarity_${rarity}.webp ${layerQualities.xxLarge}w,
                ${guImagesUrl}/border-layers/gems/${layerQualities.xxxLarge}/rarity_${rarity}.webp ${layerQualities.xxxLarge}w,
                ${guImagesUrl}/border-layers/gems/${layerQualities.best}/rarity_${rarity}.png ${layerQualities.best}w
              "
              sizes="${responsiveSrcsetSizes}"
              type="image/png"
            />
            <img
              srcset="
                ${guImagesUrl}/border-layers/gems/${layerQualities.small}/rarity_${rarity}.png
              "
              class="card__rarityLayer__img"
            />
          </picture>
        `
      : null}
    ${rarity === 'legendary'
      ? html`
          <picture class="card__wreathLayer">
            <source
              srcset="
                ${guImagesUrl}/border-layers/wreaths/${layerQualities.small}/wreath_${qualityName}.webp ${layerQualities.small}w,
                ${guImagesUrl}/border-layers/wreaths/${layerQualities.normal}/wreath_${qualityName}.webp ${layerQualities.normal}w,
                ${guImagesUrl}/border-layers/wreaths/${layerQualities.large}/wreath_${qualityName}.webp ${layerQualities.large}w,
                ${guImagesUrl}/border-layers/wreaths/${layerQualities.xLarge}/wreath_${qualityName}.webp ${layerQualities.xLarge}w,
                ${guImagesUrl}/border-layers/wreaths/${layerQualities.xxLarge}/wreath_${qualityName}.webp ${layerQualities.xxLarge}w,
                ${guImagesUrl}/border-layers/wreaths/${layerQualities.xxxLarge}/wreath_${qualityName}.webp ${layerQualities.xxxLarge}w,
                ${guImagesUrl}/border-layers/wreaths/${layerQualities.best}/wreath_${qualityName}.webp ${layerQualities.best}w
              "
              sizes="${responsiveSrcsetSizes}"
              type="image/webp"
            />

            <source
              srcset="
              ${guImagesUrl}/border-layers/wreaths/${layerQualities.small}/wreath_${qualityName}.png ${layerQualities.small}w,
                ${guImagesUrl}/border-layers/wreaths/${layerQualities.normal}/wreath_${qualityName}.png ${layerQualities.normal}w,
                ${guImagesUrl}/border-layers/wreaths/${layerQualities.large}/wreath_${qualityName}.png ${layerQualities.large}w,
                ${guImagesUrl}/border-layers/wreaths/${layerQualities.xLarge}/wreath_${qualityName}.png ${layerQualities.xLarge}w,
                ${guImagesUrl}/border-layers/wreaths/${layerQualities.xxLarge}/wreath_${qualityName}.png ${layerQualities.xxLarge}w,
                ${guImagesUrl}/border-layers/wreaths/${layerQualities.xxxLarge}/wreath_${qualityName}.png ${layerQualities.xxxLarge}w,
                ${guImagesUrl}/border-layers/wreaths/${layerQualities.best}/wreath_${qualityName}.png ${layerQualities.best}w
              "
              sizes="${responsiveSrcsetSizes}"
              type="image/png"
            />
            <img
              srcset="
                ${guImagesUrl}/border-layers/wreaths/${layerQualities.small}/wreath_${qualityName}.png
              "
              class="card__wreathLayer__img"
            />
          </picture>
        `
      : null}
    ${set === 'core' && qualityName === 'plain'
      ? html`
          <picture class="card__lockIconLayer">
            <source
              srcset="
                ${guImagesUrl}/border-layers/locks/${lockQualities.normal}/lock_${qualityName}.webp ${lockQualities.normal}w,
                ${guImagesUrl}/border-layers/locks/${lockQualities.large}/lock_${qualityName}.webp ${lockQualities.large}w,
              "
              type="image/webp"
            />

            <source
              srcset="
                ${guImagesUrl}/border-layers/locks/${lockQualities.normal}/lock_${qualityName}.png ${lockQualities.normal}w,
                ${guImagesUrl}/border-layers/locks/${lockQualities.large}/lock_${qualityName}.png ${lockQualities.large}w,
              "
              type="image/png"
            />

            <img
              srcset="
                ${guImagesUrl}/border-layers/locks/lock_${qualityName}.png
              "
              class="card__lockIconLayer__img"
            />
          </picture>
        `
      : null}
    ${!!tribe
      ? html`
          <picture class="card__tribeBarLayer">
            <source
              srcset="
                ${guImagesUrl}/border-layers/tribe_bars/${layerQualities.small}/tribebar_${qualityName}.webp ${layerQualities.small}w,
                ${guImagesUrl}/border-layers/tribe_bars/${layerQualities.normal}/tribebar_${qualityName}.webp ${layerQualities.normal}w,
                ${guImagesUrl}/border-layers/tribe_bars/${layerQualities.large}/tribebar_${qualityName}.webp ${layerQualities.large}w,
                ${guImagesUrl}/border-layers/tribe_bars/${layerQualities.xLarge}/tribebar_${qualityName}.webp ${layerQualities.xLarge}w,
              "
              sizes="${responsiveSrcsetSizes}"
              type="image/webp"
            />
            <source
              srcset="
                ${guImagesUrl}/border-layers/tribe_bars/${layerQualities.small}/tribebar_${qualityName}.png ${layerQualities.small}w,
                ${guImagesUrl}/border-layers/tribe_bars/${layerQualities.normal}/tribebar_${qualityName}.png ${layerQualities.normal}w,
                ${guImagesUrl}/border-layers/tribe_bars/${layerQualities.large}/tribebar_${qualityName}.png ${layerQualities.large}w,
                ${guImagesUrl}/border-layers/tribe_bars/${layerQualities.xLarge}/tribebar_${qualityName}.png ${layerQualities.xLarge}w,
              "
              sizes="${responsiveSrcsetSizes}"
              type="image/png"
            />

            <img
              srcset="
                ${guImagesUrl}/border-layers/tribe_bars/${layerQualities.best}/tribebar_${rarity}.png
              "
              class="card__tribeBarLayer__img"
            />
          </picture>
        `
      : null}
  `;
};

export const textLayersTemplate = ({
  type = '',
  name = '⃠',
  effect = '⃠',
  mana = '⃠',
  attack = '⃠',
  health = '⃠',
  tribe = '',
  cardSet = '',
  ch = 0,
  cw = 0,
}: {
  type: string;
  name: string;
  effect: string;
  mana: string;
  attack: string | number;
  health: string | number;
  tribe: string;
  cardSet: string;
  ch: number;
  cw: number;
}) => {
  type = validateTypeField(type);
  const isACreatureOrWeapon = RegExp(/creature|weapon/).test(type);
  const nameCrammedTextMode = name.split('').length >= 20;
  const shadowSize = Math.floor(ch * 0.5);
  const onePx = `${shadowSize === 0 ? 1 : shadowSize}px`;
  const black = 'rgba(0, 0, 0, 1)';
  const textShadow = `0 0 ${onePx} ${black}, 0 0 ${onePx} ${black}, 0 0 ${onePx} ${black}`;

  const manaTextStyles = styleMap({
    fontSize: `${ch * 10.5}px`,
    top: `${ch * 6.85}px`,
    left: `${cw * 9.5}px`,
    width: `${cw * 19}px`,
    textShadow,
  });
  const nameTextStyles = styleMap({
    fontSize: `${nameCrammedTextMode ? ch * 3.9 : ch * 4.93}px`,
    bottom: `${ch * 32.85}px`,
    height: `${ch * 9}px`,
    left: `${cw * 13.25}px`,
    right: `${cw * 5.3}px`,
    textShadow,
  });
  const attackTextStyles = styleMap({
    fontSize: `${ch * 9.5}px`,
    bottom: `${ch * 4.5}px`,
    width: `${cw * 15}px`,
    left: `${cw * 10.5}px`,
    textShadow,
  });
  const healthTextStyles = styleMap({
    fontSize: `${ch * 9.5}px`,
    width: `${cw * 16}px`,
    bottom: `${ch * 4.6}px`,
    right: `${cw * 2.5}px`,
    textShadow,
  });
  const tribeTextStyles = styleMap({
    fontSize: `${ch * 3.2}px`,
    bottom: `${ch * 3.1}px`,
    height: `${ch * 4.82}px`,
    left: `${cw * 30.5}px`,
    right: `${cw * 23}px`,
    textShadow,
  });
  const setIconStyles = styleMap({
    fontSize: `${ch * 6}px`,
    top: `${ch * 10}px`,
    right: `${cw * 9}px`,
  });

  return html`
    <div class="card__manaText" style=${manaTextStyles}>
      ${mana}
    </div>

    <div
      class="card__nameText ${nameCrammedTextMode
        ? 'card__nameText--crammed'
        : ''}"
      style=${nameTextStyles}
    >
      <div class="card__nameText__inner">
        ${name}
      </div>
    </div>

    <autofit-description-text
      text=${effect}
      ch=${ch}
      cw=${cw}
      type=${type}
      tribe=${tribe}
    ></autofit-description-text>

    ${isACreatureOrWeapon
      ? html`
          <div class="card__attackText" style=${attackTextStyles}>
            ${attack}
          </div>

          <div class="card__healthText" style=${healthTextStyles}>
            ${health}
          </div>
        `
      : null}
    ${tribe
      ? html`
          <div class="card__tribeText" style=${tribeTextStyles}>
            <div class="card__tribeText__inner">
              ${tribe}
            </div>
          </div>
        `
      : null}
    ${cardSet !== 'mythic'
      ? html`
          <card-icon
            style=${setIconStyles}
            class="card__setIcon"
            iconLigature=${`set_${cardSet}`}
          ></card-icon>
        `
      : null}
  `;
};

import{LitElement,html}from"../node_modules/lit-element/lit-element.js";import ResizeObserver from"../node_modules/@juggle/resize-observer/lib/ResizeObserver.js";import{loadingTemplate,mythicImageLayersTemplate,nonMythicImageLayersTemplate,baseArtworkLayersTemplate,textLayersTemplate}from"./templating.js";import{getStyles}from"./styles.js";// @TODO: these should really come from an endpoint call,
// so that we can easily update them in the future...
const qualities=["plain",// @NOTE: there may be "0" quality items in future, for now, these items
// can use the plain layer imagery assets
"plain","bronze","iron","meteorite","shadow","gold","diamond","mythic"],ro=new ResizeObserver(entries=>{entries.forEach(entry=>entry.target.handleResize(entry))}),loadFonts=()=>{const link=document.createElement("link");link.rel="stylesheet";link.type="text/css";link.href="/src/assets/fonts.css";document.head.appendChild(link)};class CompositedCard extends LitElement{static get properties(){return{protoId:{type:Number},inputProtoData:{type:Object},useHiResAssets:{type:Boolean},resolutionSettings:{lowDpi:Number,highDpi:Number},quality:Number}}static get styles(){return getStyles()}constructor(){super();this.resolutionSettings={lowDpi:"256",highDpi:"512"};this.ch=.01*this.offsetHeight;this.cw=.01*this.offsetWidth;loadFonts()}connectedCallback(){super.connectedCallback();ro.observe(this);this.getViewProtoData()}disconnectedCallback(){super.disconnectedCallback();ro.unobserve(this)}fetchProtoData(){this.loading=!0;return fetch(`//api.godsunchained.com/v0/proto/${this.protoId}`).then(resp=>resp.json())}handleResize(event){this.ch=.01*event.borderBoxSize.blockSize;this.cw=.01*event.borderBoxSize.inlineSize;this.requestUpdate()}getViewProtoData(){if(this.useHiResAssets){this.resolutionSettings={lowDpi:"512",highDpi:"1024"}}this.qualityName=qualities[this.quality];if(this.protoId){this.getProtoDataFromApi()}else if(this.inputProtoData){this.getProtoDataFromInput()}}getProtoDataFromApi(){return this.fetchProtoData().then(data=>{const{id,type,attack,health,effect,name,rarity,god}=data;this.protoCardData={id,type,attack:attack.Int64,health:health.Int64,effect,name,rarity,god};this.loading=!1;this.requestUpdate();return data})}getProtoDataFromInput(){this.protoCardData={...this.inputProtoData};this.protoId=this.inputProtoData.id;this.loading=!1}render(){const isMythicCard="mythic"===this.qualityName;return html`
      ${this.loading?loadingTemplate():html`
            ${baseArtworkLayersTemplate({useHiResAssets:this.useHiResAssets,protoId:this.protoId})}
            ${isMythicCard?mythicImageLayersTemplate({type:this.protoCardData.type,resolutionSettings:this.resolutionSettings,qualityName:this.qualityName}):nonMythicImageLayersTemplate({resolutionSettings:this.resolutionSettings,qualityName:this.qualityName,...this.protoCardData})}
            ${textLayersTemplate({ch:this.ch,cw:this.cw,...this.protoCardData})}
          `}
    `}}// Register the new element with the browser.
customElements.define("composited-card",CompositedCard);
import { isTruthy } from './typeGuard';

interface PJSAccordionOptions {
    trigger: HTMLElement;
    target?: HTMLElement | null;
    isOpen?: boolean;
    duration?: number;
}

class PJSAccordion {
    public trigger: HTMLElement;
    public triggerState: boolean;
    public target: HTMLElement | null;
    public targetState: boolean;
    public duration: number;
    public activeClass: string = 'is-active';
    public animationClass: string = 'is-animation';
    public inactiveClass: string = 'is-inactive';
    public pjsaStyle: HTMLStyleElement　|　null = null;

    constructor(options: PJSAccordionOptions) {
        options.isOpen ??= false;
        options.target ??= null;
        options.duration ??= 0.2;

        this.trigger = options.trigger;
        this.triggerState = options.isOpen;
        this.trigger.classList.add('pjsa-trigger');

        this.target = options.target || <HTMLElement>options.trigger.nextElementSibling;
        if (!isTruthy(this.target)) {
            throw new Error(`don't exist target element.`);
        }
        this.target.classList.add(`pjsa-target`);
        this.targetState = options.isOpen;

        this.duration = options.duration;
        this.pjsaStyle = document.querySelector<HTMLStyleElement>('.pjsa-style');

        if (!this.pjsaStyle) this.appendPJSAStyle();
        this.writePJSAStyle();
        this.applyStateClass(this.trigger, this.triggerState);
        this.applyStateClass(this.target, this.targetState);
        this.setEvent();
    }

    /**
     * ライブラリ用のstyle要素をheadに追加する
     */
    appendPJSAStyle() {
        const pjsaStyle = document.createElement('style');
        const cssText = `
        .pjsa-target.${this.inactiveClass} {
            visibility: hidden !important;
            height: 0 !important;
        }
        .pjsa-target.${this.inactiveClass} .pjsa-target.${this.inactiveClass} {
            display: none;
        }`;
        const cssTextNode = document.createTextNode(cssText);
        pjsaStyle.classList.add('pjsa-style');
        pjsaStyle.dataset.pjsaLen = '0';
        pjsaStyle.appendChild(cssTextNode);
        document.head.appendChild(pjsaStyle);
        this.pjsaStyle = pjsaStyle;
    }
    /**
     * ライブラリ用のstyle要素にスタイルを書き込む
     */
    writePJSAStyle() {
        const pjsaStyle = this.pjsaStyle;
        if (!isTruthy(pjsaStyle)) {
            throw new Error(`don't exist pjsaStyle element.`);
        }

        const pjsaLen = parseInt(String(pjsaStyle.dataset.pjsaLen), 10);
        const cssText = `
        .pjsa-target.${this.animationClass}[data-index="${pjsaLen}"] {
            transition: height ${this.duration}s, visibility ${this.duration}s, margin ${this.duration}s, padding ${this.duration}s;
        }`;
        const cssTextNode = document.createTextNode(cssText);
        pjsaStyle.appendChild(cssTextNode);

        const target = this.target;
        if (!isTruthy(target)) {
            throw new Error(`don't exist target element`);
        }
        target.dataset.index = String(pjsaLen);

        pjsaStyle.dataset.pjsaLen = String(pjsaLen + 1);
    }
    /**
     * targetStateの真偽値によってtargetElmのクラスの付け外しを行う
     */
    applyStateClass(targetElm: HTMLElement, targetState:boolean) {
        if (targetState) {
            targetElm.classList.remove(this.inactiveClass);
            targetElm.classList.add(this.activeClass);
        } else {
            targetElm.classList.remove(this.activeClass);
            targetElm.classList.add(this.inactiveClass);
        }
    }
    /**
     * 各要素にイベントリスナーを追加する
     */
    setEvent() {
        this.trigger.addEventListener('click', this.toggle.bind(this));

        const target = this.target;
        if (!isTruthy(target)) {
            throw new Error(`don't exist target element.`);
        }
        target.addEventListener('transitionend', this.removeStyle.bind(this));
    }
    /**
     * アコーディオンを開く
     */
    open() {
        const target = this.target;
        if (!isTruthy(target)) {
            throw new Error(`don't exist target element.`);
        }
        const targetScrollHeight = target.scrollHeight;
        target.style.height = '0';
        target.style.overflow = 'hidden';
        target.offsetHeight; // CSSOMの更新
        target.style.height = `${targetScrollHeight}px`;
        target.classList.add(this.animationClass);

        this.triggerState = true;
        this.targetState = true;
        this.applyStateClass(this.trigger, this.triggerState);
        this.applyStateClass(target, this.targetState);
    }
    /**
     * アコーディオンを閉じる
     */
    close() {
        const target = this.target;
        if (!isTruthy(target)) {
            throw new Error(`don't exist target element`);
        }

        const targetOffsetHeight = target.offsetHeight;
        target.style.height = `${targetOffsetHeight}px`;
        target.offsetHeight; // CSSOMの更新
        target.style.height = '0';
        target.style.overflow = 'hidden';
        target.classList.add(this.animationClass);

        this.triggerState = false;
        this.targetState = false;
        this.applyStateClass(this.trigger, this.triggerState);
        this.applyStateClass(target, this.targetState);
    }
    /**
     * triggerStateの真偽値によってアコーディオンを開閉する
     */
    toggle() {
        if (this.triggerState) {
            this.close();
        } else {
            this.open();
        }
    }
    /**
     * 動的に追加されたスタイルを削除する
     */
    removeStyle(e:TransitionEvent) {
        e.stopPropagation();

        if (e.propertyName === 'height') {
            const target = <HTMLElement>e.target;
            target.style.height = '';
            target.style.overflow = '';
            target.classList.remove(this.animationClass);
        }
    }
}

export default PJSAccordion;
import { constantsClasses, constantsLinks, constantsTexts } from '../common/constants';
import { cleanClass, generateDomElement } from '../common/utilites';

const { LOGO_TEXT, LOGO_SPAN, SWU_IMG_ALT, MENU_LINK_MAIN, MENU_LINK_PORTFOLIO, MENU_LINK_ABOUT } =
  constantsTexts;

const {
  ID_MAIN,
  ID_ABOUT,
  ID_PORTFOLIO,
  LOGO,
  LOGO_WRAP,
  ACTIVE_LINK,
  ACTIVE,
  HEADER,
  SWU_IMG,
  MENU_BTN_WRAP,
  MENU_BTN,
  MENU,
  HEADER_MENU,
} = constantsClasses;

const { SWU_IMG_PATH } = constantsLinks;

export class App {
  private header!: HTMLElement;

  private mainElement!: HTMLElement;

  private aboutElement!: HTMLElement;

  private portfolioElement!: HTMLElement;

  private menuMain!: HTMLAnchorElement;

  private menuPortfolio!: HTMLAnchorElement;

  private menuAbout!: HTMLAnchorElement;

  private navMenu!: HTMLAnchorElement;

  private menuBtnWrap!: HTMLAnchorElement;

  public start(): void {
    this.renderHeaeder();
    this.setElements();
    this.addListners();
  }

  private addListners(): void {
    this.observeHeadMenu();
    document.addEventListener('click', this.documentClickHandler.bind(this));
  }

  private observeHeadMenu(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entrie) => {
          if (entrie.isIntersecting) {
            console.log(entrie.target.id);
            [this.menuMain, this.menuPortfolio, this.menuAbout].forEach((menuElem) => {
              menuElem.classList.toggle(
                cleanClass(ACTIVE_LINK),
                menuElem.href.split('#')[1] === entrie.target.id
              );
            });
          }
        });
      },
      {
        threshold: 0.6,
      }
    );
    [this.mainElement, this.aboutElement, this.portfolioElement].forEach((element) =>
      observer.observe(element)
    );
  }

  private documentClickHandler(event: Event): void {
    const targ = event.target as HTMLElement;
    if (targ.closest(MENU_BTN_WRAP)) this.menuBtnClicked();
    else if (targ.closest(`${HEADER_MENU} a`)) this.closeMenu();
  }

  private menuBtnClicked(): void {
    this.navMenu.classList.toggle(cleanClass(ACTIVE));
    this.menuBtnWrap.classList.toggle(cleanClass(ACTIVE));
    // this.navMenu.classList.toggle(ACTIVE, !this.navMenu.classList.contains(ACTIVE))
  }

  private closeMenu(): void {
    this.navMenu.classList.remove(cleanClass(ACTIVE));
    this.menuBtnWrap.classList.remove(cleanClass(ACTIVE));
  }

  private renderHeaeder(): void {
    this.header = generateDomElement('header', null, null, HEADER);
    const logoAndSwuImgWrap = generateDomElement('div', null, this.header, LOGO_WRAP);
    const logo = generateDomElement('div', null, logoAndSwuImgWrap, LOGO);
    generateDomElement('h1', LOGO_TEXT, logo);
    generateDomElement('span', LOGO_SPAN, logo);
    const swuImg: HTMLImageElement = generateDomElement('img', '', logoAndSwuImgWrap, SWU_IMG);
    swuImg.alt = SWU_IMG_ALT;
    swuImg.src = SWU_IMG_PATH;
    this.menuBtnWrap = generateDomElement('div', null, this.header, MENU_BTN_WRAP);
    generateDomElement('div', null, this.menuBtnWrap, MENU_BTN);
    this.navMenu = generateDomElement('nav', null, this.header, MENU);
    const menuHeader = generateDomElement('div', null, this.navMenu, HEADER_MENU);
    this.menuMain = generateDomElement('a', MENU_LINK_MAIN, menuHeader);
    this.menuMain.href = ID_MAIN;
    this.menuPortfolio = generateDomElement('a', MENU_LINK_PORTFOLIO, menuHeader);
    this.menuPortfolio.href = ID_PORTFOLIO;
    this.menuAbout = generateDomElement('a', MENU_LINK_ABOUT, menuHeader);
    this.menuAbout.href = ID_ABOUT;
    document.body.prepend(this.header);
  }

  private setElements(): void {
    this.mainElement = document.querySelector(ID_MAIN) as HTMLElement;
    this.portfolioElement = document.querySelector(ID_PORTFOLIO) as HTMLElement;
    this.aboutElement = document.querySelector(ID_ABOUT) as HTMLElement;
  }
}

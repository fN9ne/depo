
// layouts
import { Container } from "../../layouts/Container/Container";

// components
import { LaunchButton } from "../LaunchButton/LaunchButton";

// svg
import { ReactComponent as Logo } from "../../img/logo.svg";
import { ReactComponent as RuFlag } from "../../img/russia.svg";
import { ReactComponent as UkFlag } from "../../img/gb.svg";
import { ReactComponent as DropdownArrow } from "../../img/arrow.svg";

// react
import { useState, useRef } from "react";

// locale
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";

// animation
import { Transition } from "react-transition-group";

// style
import './Header.scss';

// code
export const Header = () => {
	const burgerButton = useRef();

	const [open, setOpen] = useState(false);

	const toggleBurger = () => {
		burgerButton.current.classList.toggle('active');
		setOpen(!open);
	}

	return (
		<header className="header">
			<Container className="header">
				<div className="header__main">
					<Logo className="header__logo" />
					<div className="header__divider"></div>
					<Navbar />
				</div>
				<div className="header__sub">
					<LocaleMenu />
					<LaunchButton />
					<div onClick={toggleBurger} ref={burgerButton} className="header__burger">
						<span></span>
						<span></span>
						<span></span>
					</div>
					<Transition in={open} timeout={350} mountOnEnter unmountOnExit>
						{state => <BurgerContent close={toggleBurger} state={state} />}
					</Transition>
				</div>
			</Container>
		</header>
	);
}

const BurgerContent = ({ state, close }) => {
	return (
		<div className={`burger-content ${state}`}>
			<div onClick={close} className="burger-content__area"></div>
			<div className="burger-content__container">
				<Navbar />
				<div className="burger-content__divider"></div>
				<LocaleMenu burger={true} />
			</div>
		</div>
	);
}

const Navbar = () => {
	const { t } = useTranslation();

	const navItems = [
		{ path: "about-us", text: t("aboutUs") },
		{ path: "how-it-works", text: t("howItWorks") },
		{ path: "partners", text: t("whereWeWork") },
		{ path: "faq", text: "FAQ" },
		{ path: "contacts", text: t("contacts") },
	]

	return (
		<nav className="navigation">
			<ul className="navigation__list">
				{navItems.map((item, index) => <NavbarItem key={index} path={item.path}>{item.text}</NavbarItem>)}
			</ul>
		</nav>
	)
}
const NavbarItem = ({ path, children }) => (
	<li className="navigation__item">
		<a href={`#${path}`} className="navigation__link">{children}</a>
	</li>
)
const LocaleMenu = ({ burger }) => {
	const [open, setOpen] = useState(false);
	const [currentLang, setCurrentLang] = useState({ icon: <RuFlag />, text: "Русский", lang: "ru" })

	const toggleMenu = () => setOpen(!open);

	const languages = [
		{ icon: <RuFlag />, text: "Русский", lang: "ru" },
		{ icon: <UkFlag />, text: "English", lang: "en" }
	]

	const selectLanguage = (lang) => {
		toggleMenu();
		changeLanguage(lang);
	}

	if (!burger) {
		return (
			<div className="locale">
				<div className="locale__current" onClick={toggleMenu}>
					<div className="locale__item">
						<div className="locale__icon">{currentLang.icon}</div>
						<div className="locale__text">{currentLang.text}</div>
					</div>
					<div className="locale__dropdown">
						<DropdownArrow></DropdownArrow>
					</div>
				</div>
				<Transition in={open} timeout={350} mountOnEnter unmountOnExit>
					{state =>
						<ul className={`locale__body ${state}`}>
							{languages.map((item, index) =>
								<li className="locale__item" key={index} onClick={() => {
									selectLanguage(item.lang);
									setCurrentLang({ icon: item.icon, text: item.text, lang: item.lang });
								}}>
									<div className="locale__icon">{item.icon}</div>
									<div className="locale__text">{item.text}</div>
								</li>
							)}
						</ul>
					}
				</Transition>
			</div>
		);
	} else {
		return (
			<div className="locale">
				<div className="locale__label">Выберите язык</div>
				<ul className="locale__body">
					{languages.map((item, index) =>
						<li className={`locale__item ${item.lang === currentLang.lang ? "active" : ""}`} key={index} onClick={() => {
							changeLanguage(item.lang);
							setCurrentLang({ icon: item.icon, text: item.text, lang: item.lang });
						}}>
							<div className="locale__icon">{item.icon}</div>
							<div className="locale__text">{item.text}</div>
						</li>
					)}
				</ul>
			</div>
		);
	}
}
import {
  createEffect,
  createSignal,
  Index,
  onMount,
  createUniqueId,
  type JSX,
} from "solid-js";
import "../solidjs/Nav.css";
import { createMediaQuery } from "@solid-primitives/media";

interface NavItem {
  title: string;
  href: string;
  children?: Array<NavItem>;
  index?: number;
  parent?: string;
}

interface NavItems {
  items: Array<NavItem>;
}

const [navExpanded, setNavExpanded] = createSignal(false);

const [currentPageItem, setCurrentPageItem] = createSignal("");

const [selectedItem, setSelectedItem] = createSignal("nav");

const [currentItemParent, setCurrentItemParent] = createSignal("");

const isSmall = createMediaQuery("(max-width: 800px)");

// Create refs for open/close controls (will be assigned after initial render)
let closeNav: HTMLAnchorElement;
let openNav: HTMLButtonElement;
let closeSubNav: HTMLAnchorElement;

////////////// NAVIGATION CONTAINER //////////////
export function SolidNav(navitems: NavItems) {
  // Select any elements to make [inert] when nav is open

  // createEffect creates a tracking scope for signals used within, then reruns when they update

  // Handle navExpanded changed
  createEffect(() => {
    const main = document.getElementById("main");
    if (!closeNav || !openNav) return;
    if (navExpanded()) {
      // focus the close button after nav is expanded
      closeNav.focus();
      // set [inert] attribute on other content to trap focus
      main?.setAttribute("inert", "");
    } else {
      //focus the open button after nav is closed
      openNav.focus();
      //remove [inert] from content
      main?.removeAttribute("inert");
    }
  });

  // Remove inert if viewport enlarged with nav open
  createEffect(() => {
    const main = document.getElementById("main");
    if (!isSmall()) {
      main?.removeAttribute("inert");
    }
  });

  // Focus first child link when subnav selected
  createEffect(() => {
    const subnavTarget: HTMLElement | null = document.querySelector(
      `[data-parent="${selectedItem()}"] li:first-child > a`
    );
    subnavTarget?.focus();
  });

  return (
    <>
      <NavToggleButton />
      <div
        id="nav-container"
        onkeydown={handleKeyDown}
        aria-hidden={!navExpanded() && isSmall()}
      >
        {isSmall() ? <NavClosePanel /> : <SubNavClosePanel />}
        <Nav items={navitems.items} />
      </div>
    </>
  );
}

////////////// NAV ELEMENT //////////////
function Nav(props: NavItems) {
  // Store the parent element of the currently selected item
  // We use this to maintain correct aria-expanded attributes as focus moves into nested subnavs
  createEffect(() => {
    let parent = document.getElementById(selectedItem())?.dataset.parent;
    parent && setCurrentItemParent(parent);
    console.log(currentItemParent());
    console.log(selectedItem());
  });
  // Runs once when component is added to the DOM
  onMount(() => {
    // Set the current page
    setCurrentPageItem(window.location.href);
  });
  return (
    <nav id="nav">
      <ul class="nav-list top-level" data-parent="nav">
        <Index each={props.items}>
          {(item, index) => (
            <NavItem
              title={item().title}
              href={item().href}
              children={item().children}
              index={index}
              parent="nav"
            />
          )}
        </Index>
      </ul>
    </nav>
  );
}

////////////// NAV ITEM //////////////
function NavItem(item: NavItem) {
  // assign each item a unique id so we can track the selected item
  let uniqueID = createUniqueId();
  const anchor = () => {
    let result = null;
    if (item.children) {
      result = (
        <a
          href={item.href}
          title={item.title}
          id={uniqueID}
          aria-current={currentPageItem() == item.href && "page"}
          style={`--index: ${item.index}`}
          onClick={
            item.parent == "nav" || isSmall()
              ? openSubnav
              : (e) => e.preventDefault
          }
          data-parent={item.parent}
          // This is some janky shit but it works - aria-expanded set to true if item itself is selected, it is the parent of the selected item , or the desktop nav is shown and the item's parent is selected
          aria-expanded={
            selectedItem() == uniqueID ||
            currentItemParent() == uniqueID ||
            (!isSmall() &&
              item.parent != "nav" &&
              item.parent == selectedItem())
          }
          aria-controls={`subnav-${uniqueID}`}
        >
          {item.title}{" "}
          <span class="icon">
            {selectedItem() == uniqueID || currentItemParent() == uniqueID
              ? "-"
              : "+"}
          </span>
        </a>
      );
    } else {
      result = (
        <a
          href={item.href}
          title={item.title}
          id={uniqueID}
          aria-current={currentPageItem() == item.href && "page"}
          style={`--index: ${item.index}`}
        >
          {item.title}
        </a>
      );
    }
    return result;
  };

  return (
    <li
      class={`nav-list__item ${item.children ? "nav-list__item--parent" : ""}`}
      aria-selected={uniqueID == selectedItem()}
    >
      {anchor()}
      {/* Render subnav for items with children */}
      {item.children && (
        <div class="subnav" id={`subnav-${uniqueID}`}>
          <ul class="nav-list" data-parent={uniqueID}>
            {/* Component renders itself, allowing infinite nesting of subnavs */}
            <Index each={item.children}>
              {(child, index) => (
                <NavItem
                  title={child().title}
                  href={child().href}
                  children={child().children}
                  index={index}
                  parent={uniqueID}
                />
              )}
            </Index>
          </ul>
        </div>
      )}
    </li>
  );
}

////////////// MOBILE NAV TOGGLE BUTTON //////////////
function NavToggleButton() {
  return (
    <button
      id="nav-toggle-open"
      ref={openNav}
      title="Open Menu"
      aria-label="Open Menu"
      aria-controls="nav"
      aria-haspopup="true"
      aria-expanded={navExpanded()}
      onClick={() => setNavExpanded(true)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2em"
        height="2em"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d={
            navExpanded()
              ? "M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
              : "M3 5h18M3 12h18M3 19h18"
          }
        />
      </svg>
    </button>
  );
}
////////////// OVERLAY FOR SMALL SCREENS //////////////
function NavClosePanel() {
  return (
    <a
      href="#"
      id="nav-toggle-close"
      ref={closeNav}
      title="Close Menu"
      aria-label="Close Menu"
      aria-controls="nav"
      onClick={() => setNavExpanded(false)}
    ></a>
  );
}

////////////// OVERLAY FOR BIG SCREENS //////////////
function SubNavClosePanel() {
  return (
    <a
      href="#"
      id="subnav-toggle-close"
      ref={closeSubNav}
      title="Close Sub Menu"
      aria-label="Close Sub Menu"
      aria-controls="nav"
      onClick={() => setSelectedItem("")}
    ></a>
  );
}

// Set selected item when subnav opened
const openSubnav: JSX.EventHandler<HTMLAnchorElement, MouseEvent> = (event) => {
  const currentID = event.currentTarget.id;
  currentID && currentID === selectedItem()
    ? handleBackButton()
    : setSelectedItem(currentID);
};

// Dirty things :/
function handleBackButton() {
  // get the current item
  const currentItem = document.getElementById(selectedItem());
  // find its parent item id
  const prevItem =
    currentItem?.closest<HTMLElement>("[data-parent]")?.dataset.parent;
  // set selected item to parent item id
  prevItem && setSelectedItem(prevItem);
}

// Keyboard controls
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    setSelectedItem("");
    if (isSmall()) {
      setNavExpanded(false);
    }
  }
}

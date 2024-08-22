import {
  createEffect,
  createSignal,
  Index,
  onMount,
  createUniqueId,
  type JSX,
} from "solid-js";
import "../solidjs/Nav.css";

interface NavItem {
  title: string;
  href: string;
  children?: Array<NavItem>;
  index?: number;
}

interface NavItems {
  items: Array<NavItem>;
}

const [navExpanded, setNavExpanded] = createSignal(false);

const [currentPageItem, setCurrentPageItem] = createSignal("");

const [selectedItem, setSelectedItem] = createSignal("nav");

const [currentSubnavTitle, setCurrentSubnavTitle] = createSignal("");
// Create refs for open/close controls (will be assigned after initial render)
let closeNav: HTMLAnchorElement;
let openNav: HTMLButtonElement;

// Nav container
export function SolidNav(navitems: NavItems) {
  // Creates a tracking scope for signals used within, then reruns when they update
  createEffect(() => {
    if (!closeNav || !openNav) return;
    // Select any elements to make [inert] when nav is open
    const main = document.getElementById("main");
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

  return (
    <>
      <NavToggleButton />
      <div id="nav-container">
        <NavClosePanel />
        <Nav items={navitems.items} />
      </div>
    </>
  );
}

// Nav element
function Nav(props: NavItems) {
  // Set the subnav title whenever selectedItem() changes
  createEffect(() => {
    let title = document.getElementById(selectedItem())?.getAttribute("title");
    setCurrentSubnavTitle(title ? title : "");
  });
  // Runs once when component is added to the DOM
  onMount(() => {
    // Set the current page
    setCurrentPageItem(window.location.href);
  });
  return (
    <nav id="nav" aria-expanded={navExpanded()} aria-hidden={!navExpanded()}>
      <span class="details">
        <BackButton />
        <span class="subnav__title">{currentSubnavTitle()}</span>
      </span>
      <ul class="nav-list top-level" data-parent="nav">
        <Index each={props.items}>
          {(item, index) => (
            <NavItem
              title={item().title}
              href={item().href}
              children={item().children}
              index={index}
            />
          )}
        </Index>
      </ul>
    </nav>
  );
}
// Back button to navigate up one level in navigation tree
function BackButton() {
  return (
    <button type="button" onClick={handleBackButton} id="back">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2em"
        height="2em"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        >
          <path d="M13 8.5L9.5 12l3.5 3.5" />
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" />
        </g>
      </svg>
    </button>
  );
}
// Nav item
function NavItem(item: NavItem) {
  // assign each item a unique id so we can track the selected item
  let uniqueID = createUniqueId();
  return (
    <li class="nav-list__item">
      <a
        href={item.href}
        title={item.title}
        id={uniqueID}
        aria-current={currentPageItem() == item.href && "page"}
        aria-selected={uniqueID == selectedItem()}
        style={`--index: ${item.index}`}
        onClick={item.children && openSubnav}
      >
        {item.title}
        {item.children && <span class="icon">...</span>}
      </a>
      {/* Render subnav for items with children */}
      {item.children && (
        <div class="subnav">
          <ul
            class="nav-list"
            data-parent={uniqueID}
            aria-expanded={selectedItem() == uniqueID}
          >
            {/* Component renders itself, allowing infinite nesting of subnavs */}
            {item.children &&
              item.children.map((child, index) => (
                <NavItem
                  title={child.title}
                  href={child.href}
                  children={child.children}
                  index={index}
                />
              ))}
          </ul>
        </div>
      )}
    </li>
  );
}

// Open/close button
function NavToggleButton() {
  return (
    <button
      id="nav-toggle-open"
      ref={openNav}
      title="Open Menu"
      aria-label="Open Menu"
      aria-controls="nav"
      aria-haspopup="true"
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
// Overlay panel for the remainder of the page, so clicking outside the nav closes it
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

// Set selected item when subnav opened
const openSubnav: JSX.EventHandler<HTMLAnchorElement, MouseEvent> = (event) => {
  const currentID = event.currentTarget.id;
  currentID && setSelectedItem(currentID);
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

export const navitems = [
  { title: "Home", href: "/" },
  { title: "Contact", href: "/contact" },
  {
    title: "Products",
    href: "#products",
    children: [
      { title: "Hats", href: "/products/hats" },
      { title: "Shoes", href: "/products/shoes" },
      {
        title: "T-shirts",
        href: "#t-shirts",
        children: [
          { title: "Plain", href: "/products/t-shirts/plain" },
          { title: "Printed", href: "/products/t-shirts/printed" },
          {
            title: "Novelty",
            href: "#novelty",
            children: [
              { title: "Hats", href: "/products/hats" },
              { title: "Shoes", href: "/products/shoes" },
              { title: "T-shirts", href: "/products/t-shirts" },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "FAQ",
    href: "#faq",
    children: [
      { title: "Shipping", href: "/faq/shipping" },
      { title: "Warranty", href: "/faq/shipping" },
    ],
  },
  { title: "Account", href: "/account" },
];
function getPermalink(link: string) {
  return link;
}
export const headerData = {
  links: [
    {
      title: "Products",
      href: getPermalink("#"),
      children: [
        {
          title: "Featured",
          href: getPermalink("#"),
        },
        {
          title: "Online Induction System",
          href: getPermalink("/products/online-induction"),
        },
        {
          title: "Contractor Management System",
          href: getPermalink("/products/contractor-management"),
        },
        {
          title: "Check-in System",
          href: getPermalink("/products/check-in-system"),
        },
        {
          title: "Platform",
          href: getPermalink("#"),
        },
        {
          title: "Integrations",
          href: getPermalink("/platform/integrations"),
        },
        {
          title: "SCORM",
          href: getPermalink("/platform/scorm-with-altora"),
        },
        {
          title: "Trust & Security",
          href: getPermalink("/platform/trust"),
        },
        {
          title: "Services",
          href: getPermalink("/platform/services"),
        },
      ],
    },
    {
      title: "Solutions",
      href: getPermalink("#"),
      children: [
        {
          title: "Use cases",
          href: getPermalink("#"),
          children: [
            {
              title: "Check-in system for multiple sites and unstaffed kiosks",
              href: getPermalink(
                "/solutions/use-cases/checkin-system-multiple-sites"
              ),
            },
            {
              title: "Confirm your workers meet the site requirements",
              href: getPermalink("/solutions/use-cases/meet-site-requirements"),
            },
            {
              title: "Who’s-on-site worker information",
              href: getPermalink(
                "/solutions/use-cases/whos-on-site-worker-information"
              ),
            },
            {
              title: "How our site check-in system works",
              href: getPermalink(
                "/solutions/use-cases/how-site-check-in-system-works"
              ),
            },
            {
              title: "On-the-spot site induction training",
              href: getPermalink(
                "/solutions/use-cases/on-the-spot-site-inductions"
              ),
            },
          ],
        },
        {
          title: "Industries",
          href: getPermalink("#"),
          children: [
            {
              title: "Construction",
              href: getPermalink("/solutions/industries/construction"),
            },
            {
              title: "Transport, Logistics and Warehousing",
              href: getPermalink(
                "/solutions/industries/transport-logistics-and-warehousing"
              ),
            },
            {
              title: "Renewable Energy",
              href: getPermalink(
                "/solutions/industries/renewable-energy-site-induction-and-check-in-system"
              ),
            },
            {
              title: "Government and Education",
              href: getPermalink(
                "/solutions/industries/government-and-education"
              ),
            },
            {
              title: "Health and Aged Care",
              href: getPermalink("/solutions/industries/health-and-aged-care"),
            },
            {
              title: "Manufacturing",
              href: getPermalink("/solutions/industries/manufacturing"),
            },
            {
              title: "Mining, Utilities and Agriculture",
              href: getPermalink(
                "/solutions/industries/mining-utilities-agriculture"
              ),
            },
            {
              title: "Hospitality and Events",
              href: getPermalink(
                "/solutions/industries/hospitality-and-events"
              ),
            },
            {
              title: "Labour Hire",
              href: getPermalink("/solutions/industries/labour-hire"),
            },
          ],
        },
      ],
    },
    {
      title: "Case Studies",
      href: getPermalink("/case-studies"),
    },
    {
      title: "Pricing",
      href: getPermalink("/pricing"),
    },
    {
      title: "About",
      href: getPermalink("#"),
      children: [
        {
          title: "Our Customers",
          href: getPermalink("/customers"),
        },
        {
          title: "News",
          href: getPermalink("/news"),
        },
        {
          title: "About Us",
          href: getPermalink("/about"),
        },
      ],
    },
  ],
};

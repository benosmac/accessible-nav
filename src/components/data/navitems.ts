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

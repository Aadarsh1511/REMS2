import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Home,
  Building,
  Users,
  FileText,
  Phone,
  Briefcase,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Header = ({ isLoggeIn, setisLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setisLoggedIn(false);
    navigate("/login");
  };

  const propertyLinks = [
    {
      href: "/search",
      title: "Search Properties",
      description: "Find your dream property",
    },
    {
      href: "/add-property",
      title: "Add Property",
      description: "List your property",
    },
    {
      href: "/post-property",
      title: "Post Property",
      description: "Post property for sale/rent",
    },
    {
      href: "/book-visit",
      title: "Book Visit",
      description: "Schedule property visits",
    },
    {
      href: "/price-trends",
      title: "Price Trends",
      description: "Market price analysis",
    },
    {
      href: "/area-converter",
      title: "Area Converter",
      description: "Convert area units",
    },
  ];

  const dashboardLinks = [
    { href: "/dashboard", title: "Dashboard", description: "User dashboard" },
    { href: "/admin", title: "Admin", description: "Admin panel" },
    { href: "/agent", title: "Agent", description: "Agent dashboard" },
    { href: "/owner", title: "Owner", description: "Owner dashboard" },
  ];

  const companyLinks = [
    {
      href: "/about",
      title: "About Us",
      description: "Learn about our company",
    },
    {
      href: "/our-services",
      title: "Our Services",
      description: "Explore our services",
    },
    { href: "/careers", title: "Careers", description: "Join our team" },
    {
      href: "/testimonials",
      title: "Testimonials",
      description: "What clients say",
    },
    {
      href: "/real-estate-investments",
      title: "Investments",
      description: "Investment opportunities",
    },
    {
      href: "/builders-in-india",
      title: "Builders",
      description: "Top builders in India",
    },
  ];

  const supportLinks = [
    { href: "/contact", title: "Contact Us", description: "Get in touch" },
    {
      href: "/customer-service",
      title: "Customer Service",
      description: "24/7 support",
    },
    {
      href: "/request-info",
      title: "Request Info",
      description: "Get information",
    },
    {
      href: "/feedback",
      title: "Feedback",
      description: "Share your thoughts",
    },
    {
      href: "/report-problem",
      title: "Report Problem",
      description: "Report issues",
    },
    {
      href: "/safety-guide",
      title: "Safety Guide",
      description: "Safety information",
    },
    {
      href: "/mobile-apps",
      title: "Mobile Apps",
      description: "Download our apps",
    },
    {
      href: "/articles",
      title: "Articles",
      description: "Real estate articles",
    },
    {
      href: "/rent-receipt",
      title: "Rent Receipt",
      description: "Generate rent receipts",
    },
    { href: "/sitemap", title: "Sitemap", description: "Site navigation" },
  ];

  const legalLinks = [
    {
      href: "/terms",
      title: "Terms & Conditions",
      description: "Terms of service",
    },
    {
      href: "/privacy",
      title: "Privacy Policy",
      description: "Privacy information",
    },
    {
      href: "/summons-notices",
      title: "Summons/Notices",
      description: "Legal notices",
    },
    {
      href: "/grievances",
      title: "Grievances",
      description: "File complaints",
    },
  ];

  const NavLink = ({
    href,
    children,
    mobile = false,
  }: {
    href: string;
    children: React.ReactNode;
    mobile?: boolean;
  }) => (
    <Link
      to={href}
      className={cn(
        mobile
          ? "block px-3 py-2 text-base font-medium transition-colors hover:text-primary"
          : "text-sm font-medium transition-colors hover:text-primary",
        isActive(href) ? "text-primary" : "text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Building className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              PropertyHub
            </span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Properties</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          to="/search"
                        >
                          <Building className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Property Search
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Find your perfect property with our advanced search
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {propertyLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {link.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {link.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

             {
              isLoggeIn && (
                 <NavigationMenuItem>
                <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {dashboardLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {link.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {link.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              )
             }

              <NavigationMenuItem>
                <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {companyLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {link.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {link.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Support</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {supportLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {link.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {link.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link to="/" className="flex items-center space-x-2">
              <Building className="h-6 w-6" />
              <span className="font-bold">PropertyHub</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                <div className="flex flex-col space-y-2">
                  <h4 className="font-medium">Properties</h4>
                  {propertyLinks.map((link) => (
                    <NavLink key={link.href} href={link.href} mobile>
                      {link.title}
                    </NavLink>
                  ))}
                </div>

                <div className="flex flex-col space-y-2">
                  <h4 className="font-medium">Dashboard</h4>
                  {dashboardLinks.map((link) => (
                    <NavLink key={link.href} href={link.href} mobile>
                      {link.title}
                    </NavLink>
                  ))}
                </div>

                <div className="flex flex-col space-y-2">
                  <h4 className="font-medium">Company</h4>
                  {companyLinks.map((link) => (
                    <NavLink key={link.href} href={link.href} mobile>
                      {link.title}
                    </NavLink>
                  ))}
                </div>

                <div className="flex flex-col space-y-2">
                  <h4 className="font-medium">Support</h4>
                  {supportLinks.map((link) => (
                    <NavLink key={link.href} href={link.href} mobile>
                      {link.title}
                    </NavLink>
                  ))}
                </div>

                <div className="flex flex-col space-y-2">
                  <h4 className="font-medium">Legal</h4>
                  {legalLinks.map((link) => (
                    <NavLink key={link.href} href={link.href} mobile>
                      {link.title}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link to="/" className="md:hidden">
              <Building className="h-6 w-6" />
            </Link>
          </div>
          <nav className="flex items-center space-x-2">
           {
            !isLoggeIn && (
               <Button asChild variant="ghost">
              <Link to="/login">Login</Link>
            </Button>
            )
           }
            {isLoggeIn && (
              <>
                <Button asChild variant="ghost">
                  <Link to="/profile">Profile</Link>
                </Button>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

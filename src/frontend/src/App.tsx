import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import {
  BadgeCheck,
  BarChart3,
  CalendarDays,
  CalendarHeart,
  Camera,
  CheckCircle2,
  Filter,
  Heart,
  Hotel,
  IndianRupee,
  LayoutDashboard,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Music,
  Palette,
  Phone,
  Search,
  Sparkles,
  Store,
  User,
  Users,
  Utensils,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

const venues = [
  // GOA
  {
    id: 1,
    name: "Cidade de Goa Resort",
    city: "Goa",
    state: "Goa",
    type: "Beach Resort",
    budget: 1200000,
    capacity: "200-500 Guests",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    features: ["Beachfront", "Pool", "Catering", "Rooms"],
    match: "Luxury beach wedding",
    phone: "+91 832 245 4545",
    email: "reservations@cidadedegoaresort.com",
    address: "Vainguinim Beach, Dona Paula, Panaji, Goa 403004",
  },
  {
    id: 2,
    name: "Alila Diwa Goa",
    city: "Goa",
    state: "Goa",
    type: "Luxury Resort",
    budget: 1500000,
    capacity: "100-400 Guests",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    features: ["Garden", "Pool", "Premium Decor", "Rooms"],
    match: "Destination wedding",
    phone: "+91 832 274 6800",
    email: "diwa@alilahotels.com",
    address: "Adao Waddo, Majorda, South Goa, Goa 403713",
  },
  // MUMBAI
  {
    id: 3,
    name: "The Taj Mahal Palace",
    city: "Mumbai",
    state: "Maharashtra",
    type: "5-Star Hotel",
    budget: 2500000,
    capacity: "300-800 Guests",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    features: ["Ballroom", "Sea View", "Luxury Catering", "Valet"],
    match: "Iconic luxury venue",
    phone: "+91 22 6665 3366",
    email: "tajmahalpalace.bombay@tajhotels.com",
    address: "Apollo Bunder, Colaba, Mumbai, Maharashtra 400001",
  },
  {
    id: 4,
    name: "Vivah Grand Banquets",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Banquet Hall",
    budget: 450000,
    capacity: "300-600 Guests",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    features: ["Premium Decor", "Valet", "Indoor Stage", "Food Packages"],
    match: "Top rated nearby",
    phone: "+91 98200 12345",
    email: "info@vivahgrand.in",
    address: "Link Road, Andheri West, Mumbai, Maharashtra 400053",
  },
  // CHENNAI
  {
    id: 5,
    name: "Feathers - A Radha Hotel",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "5-Star Hotel",
    budget: 1800000,
    capacity: "200-600 Guests",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    features: ["Banquet Hall", "Rooftop", "Catering", "Valet"],
    match: "Premium city venue",
    phone: "+91 44 4233 4455",
    email: "info@featherschennai.com",
    address: "Palavakkam ECR, Chennai, Tamil Nadu 600041",
  },
  {
    id: 6,
    name: "My Fortune Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Luxury Hotel",
    budget: 1200000,
    capacity: "150-400 Guests",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    features: ["Ballroom", "Outdoor Lawn", "Bridal Suite", "Parking"],
    match: "City center wedding",
    phone: "+91 44 6677 1234",
    email: "weddings@myfortune.in",
    address: "Ethiraj Salai, Egmore, Chennai, Tamil Nadu 600008",
  },
  // HYDERABAD
  {
    id: 7,
    name: "Saanvi Celebration Hall",
    city: "Hyderabad",
    state: "Telangana",
    type: "Wedding Hall",
    budget: 220000,
    capacity: "400-700 Guests",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    features: ["AC Hall", "Dining Area", "Bridal Room", "Parking"],
    match: "Value choice",
    phone: "+91 40 2345 6789",
    email: "saanvievents@gmail.com",
    address: "Secunderabad, Hyderabad, Telangana 500003",
  },
  {
    id: 8,
    name: "Taj Falaknuma Palace",
    city: "Hyderabad",
    state: "Telangana",
    type: "Heritage Palace",
    budget: 3000000,
    capacity: "100-300 Guests",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1506059612708-99d6c258160e?auto=format&fit=crop&w=1200&q=80",
    features: ["Heritage Decor", "Grand Lawns", "Nizam Cuisine", "Rooms"],
    match: "Royal palace wedding",
    phone: "+91 40 6629 8585",
    email: "falaknuma.hyderabad@tajhotels.com",
    address: "Engine Bowli, Falaknuma, Hyderabad, Telangana 500053",
  },
  // PUNE
  {
    id: 9,
    name: "Royal Palace Convention Hall",
    city: "Pune",
    state: "Maharashtra",
    type: "Wedding Hall",
    budget: 250000,
    capacity: "500-800 Guests",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    features: ["Parking", "Catering", "Decoration", "AC Hall"],
    match: "Best budget fit",
    phone: "+91 20 2567 8901",
    email: "royalpalacepune@gmail.com",
    address: "Shivajinagar, Pune, Maharashtra 411005",
  },
  {
    id: 10,
    name: "The Westin Pune",
    city: "Pune",
    state: "Maharashtra",
    type: "5-Star Hotel",
    budget: 1600000,
    capacity: "200-600 Guests",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
    features: ["Ballroom", "Outdoor Lawn", "Premium Catering", "Rooms"],
    match: "Luxury city wedding",
    phone: "+91 20 6726 5000",
    email: "westin.pune@westin.com",
    address: "36/3-B Koregaon Park Annex, Mundhwa Rd, Pune, Maharashtra 411036",
  },
];

const vendors = [
  {
    name: "Dream Decor Studio",
    category: "Decor",
    city: "Pune",
    budget: "₹50,000 onwards",
    icon: Palette,
    rating: 4.8,
    about:
      "Premium wedding decor themes, stage setup, floral styling, and complete event ambience design.",
    tags: ["Floral Decor", "Stage Design", "Theme Setup"],
  },
  {
    name: "Shaadi Caterers",
    category: "Catering",
    city: "Mumbai",
    budget: "₹700 per plate",
    icon: Utensils,
    rating: 4.7,
    about:
      "Veg and non-veg catering for intimate to large wedding events with customizable menus.",
    tags: ["North Indian", "Live Counters", "Buffet"],
  },
  {
    name: "Moments Photography",
    category: "Photography",
    city: "Jaipur",
    budget: "₹65,000 onwards",
    icon: Camera,
    rating: 4.9,
    about:
      "Candid wedding photography, cinematic videography, pre-wedding shoots, and reels coverage.",
    tags: ["Candid", "Cinematic", "Pre-Wedding"],
  },
  {
    name: "Bridal Glow Artists",
    category: "Makeup",
    city: "Delhi",
    budget: "₹25,000 onwards",
    icon: Sparkles,
    rating: 4.6,
    about:
      "Professional bridal, engagement, and family makeup packages with travel support.",
    tags: ["Bridal Makeup", "HD Makeup", "Home Service"],
  },
  {
    name: "Sangeet Sound House",
    category: "DJ & Music",
    city: "Hyderabad",
    budget: "₹35,000 onwards",
    icon: Music,
    rating: 4.5,
    about:
      "Sound systems, wedding DJ, baraat sound, sangeet setup, and lighting coordination.",
    tags: ["DJ", "Sound", "Lighting"],
  },
  {
    name: "Wedding Stay Suites",
    category: "Guest Rooms",
    city: "Goa",
    budget: "₹4,000 per room",
    icon: Hotel,
    rating: 4.7,
    about:
      "Guest accommodation support for destination weddings, family stays, and venue-side bookings.",
    tags: ["Stay", "Rooms", "Destination"],
  },
];

const pricingPackages = [
  {
    name: "Starter",
    price: "₹2,999 / month",
    badge: "New vendors",
    features: [
      "1 business listing",
      "Lead form access",
      "Basic profile page",
      "WhatsApp button",
    ],
  },
  {
    name: "Growth",
    price: "₹7,999 / month",
    badge: "Most popular",
    features: [
      "Priority ranking",
      "10 gallery uploads",
      "Featured city placement",
      "Lead analytics dashboard",
    ],
  },
  {
    name: "Premium",
    price: "₹14,999 / month",
    badge: "Top visibility",
    features: [
      "Homepage featured slot",
      "Unlimited galleries",
      "Verified badge",
      "Dedicated account support",
    ],
  },
];

const cityPages = [
  { name: "Pune", leads: "1,200+", seo: "Wedding halls in Pune" },
  { name: "Mumbai", leads: "2,500+", seo: "Best wedding venues in Mumbai" },
  { name: "Delhi", leads: "3,100+", seo: "Affordable banquet halls in Delhi" },
  {
    name: "Jaipur",
    leads: "1,850+",
    seo: "Destination wedding venues in Jaipur",
  },
  {
    name: "Hyderabad",
    leads: "1,400+",
    seo: "Wedding planners and halls in Hyderabad",
  },
  { name: "Goa", leads: "950+", seo: "Beach wedding venues in Goa" },
];

const seoPages = [
  "Wedding halls under ₹3 lakh",
  "Best banquet halls near me",
  "Top wedding decorators in India",
  "Destination wedding venues by city",
  "Affordable wedding photographers near me",
  "Marriage halls by guest capacity",
];

const investorMetrics = [
  { label: "Projected vendor listings", value: "25,000+" },
  { label: "Target cities", value: "100+" },
  { label: "Monthly lead potential", value: "50,000+" },
  {
    label: "Revenue model",
    value: "Subscriptions + featured listings + lead fees",
  },
];

const backendModules = [
  "User authentication and role management",
  "Vendor onboarding and listing approval",
  "Venue and vendor database management",
  "Lead capture, CRM routing, and WhatsApp integration",
  "AI recommendation engine for budget and city match",
  "SEO landing pages and city page generation",
  "Admin analytics and subscription billing",
];

const dashboardStats = [
  { label: "Total Venue Leads", value: "1,248", icon: BarChart3 },
  { label: "Vendor Listings", value: "356", icon: Store },
  { label: "Bookings This Month", value: "92", icon: CalendarDays },
  { label: "Verified Partners", value: "214", icon: BadgeCheck },
];

const howItWorks = [
  {
    title: "Enter location",
    desc: "Search by city, area, or state anywhere in India.",
  },
  {
    title: "Set budget",
    desc: "Add your total event budget to filter smartly.",
  },
  {
    title: "Compare nearby matches",
    desc: "See halls and vendors ranked by fit, rating, and features.",
  },
  {
    title: "Enquire instantly",
    desc: "Contact vendors, request callback, and shortlist favorites.",
  },
];

interface EnquireForm {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function App() {
  const { actor } = useActor();

  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [guestCount, setGuestCount] = useState("");

  const [enquireOpen, setEnquireOpen] = useState(false);
  const [enquireVenue, setEnquireVenue] = useState("");
  const [enquireForm, setEnquireForm] = useState<EnquireForm>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [enquireLoading, setEnquireLoading] = useState(false);

  const [listingForm, setListingForm] = useState({
    businessName: "",
    ownerName: "",
    city: "",
    category: "",
    phone: "",
    startingPrice: "",
    about: "",
  });
  const [listingLoading, setListingLoading] = useState(false);
  const [listingSuccess, setListingSuccess] = useState(false);

  const filteredVenues = useMemo(() => {
    return venues
      .filter((venue) => {
        const matchesLocation =
          !location ||
          venue.city.toLowerCase().includes(location.toLowerCase()) ||
          venue.state.toLowerCase().includes(location.toLowerCase());
        const matchesBudget = !budget || venue.budget <= Number(budget);
        return matchesLocation && matchesBudget;
      })
      .sort((a, b) => b.rating - a.rating);
  }, [location, budget]);

  const handleEnquireOpen = (venueName: string) => {
    setEnquireVenue(venueName);
    setEnquireForm({ name: "", phone: "", email: "", message: "" });
    setEnquireOpen(true);
  };

  const handleEnquireSubmit = async () => {
    if (!enquireForm.name || !enquireForm.phone) {
      toast.error("Please fill in your name and phone number.");
      return;
    }
    setEnquireLoading(true);
    try {
      await actor?.submitLead(
        enquireForm.name,
        enquireForm.phone,
        enquireForm.email,
        enquireVenue,
        enquireForm.message,
      );
      toast.success("Enquiry sent! The venue will contact you soon.");
      setEnquireOpen(false);
    } catch {
      toast.error("Failed to send enquiry. Please try again.");
    } finally {
      setEnquireLoading(false);
    }
  };

  const handleListingSubmit = async () => {
    if (!listingForm.businessName || !listingForm.phone) {
      toast.error("Please fill in business name and phone.");
      return;
    }
    setListingLoading(true);
    try {
      await actor?.submitBusinessListing(
        listingForm.businessName,
        listingForm.ownerName,
        listingForm.city,
        listingForm.category,
        listingForm.phone,
        BigInt(listingForm.startingPrice || "0"),
        listingForm.about,
      );
      setListingSuccess(true);
      toast.success("Business listing submitted successfully!");
      setListingForm({
        businessName: "",
        ownerName: "",
        city: "",
        category: "",
        phone: "",
        startingPrice: "",
        about: "",
      });
    } catch {
      toast.error("Failed to submit listing. Please try again.");
    } finally {
      setListingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-right" />

      {/* HERO */}
      <section className="relative overflow-hidden hero-gradient text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
          <nav className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-2xl font-black tracking-wide font-display">
                <Heart className="h-7 w-7 fill-white/80" /> VenueWala
              </div>
              <div className="mt-1 text-sm text-white/70">
                Wedding halls &amp; vendor discovery across India
              </div>
            </div>
            <div className="flex flex-wrap gap-5 text-sm font-medium">
              <a
                href="#venues-page"
                data-ocid="nav.venues.link"
                className="text-white/80 hover:text-white transition-colors"
              >
                Venues
              </a>
              <a
                href="#vendors"
                data-ocid="nav.vendors.link"
                className="text-white/80 hover:text-white transition-colors"
              >
                Vendors
              </a>
              <a
                href="#list-business"
                data-ocid="nav.list-business.link"
                className="text-white/80 hover:text-white transition-colors"
              >
                List Business
              </a>
              <a
                href="#dashboard"
                data-ocid="nav.dashboard.link"
                className="text-white/80 hover:text-white transition-colors"
              >
                Dashboard
              </a>
              <a
                href="#investor"
                data-ocid="nav.investor.link"
                className="text-white/80 hover:text-white transition-colors"
              >
                Investor
              </a>
            </div>
          </nav>

          <div className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-sm">
                <CalendarHeart className="h-4 w-4" /> Full marketplace +
                backend-ready structure
              </div>
              <h1 className="font-display text-5xl font-bold leading-tight md:text-6xl">
                Find the Best Wedding Halls &amp; Vendors
                <span className="block italic text-yellow-200">
                  Near You, In Budget
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
                VenueWala is now structured like a scalable wedding marketplace
                startup with venue discovery, vendor onboarding, AI
                recommendations, city landing pages, SEO growth pages, and
                investor-facing positioning. 💍
              </p>
            </div>

            <div>
              <div className="rounded-[30px] bg-white p-6 text-foreground shadow-hero">
                <div className="mb-4 flex items-center gap-2 text-lg font-bold font-display">
                  <Search className="h-5 w-5 text-primary" /> Search your
                  perfect wedding match
                </div>
                <div className="grid gap-4">
                  <div>
                    <label
                      htmlFor="search-location"
                      className="mb-2 block text-sm font-semibold text-foreground/60"
                    >
                      Location
                    </label>
                    <div className="flex items-center gap-2 rounded-2xl border border-border px-4 py-3 focus-within:border-primary transition-colors">
                      <MapPin className="h-4 w-4 text-primary shrink-0" />
                      <input
                        id="search-location"
                        data-ocid="search.location.input"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter city or state"
                        className="w-full outline-none text-sm bg-transparent placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="search-budget"
                      className="mb-2 block text-sm font-semibold text-foreground/60"
                    >
                      Maximum Budget
                    </label>
                    <div className="flex items-center gap-2 rounded-2xl border border-border px-4 py-3 focus-within:border-primary transition-colors">
                      <IndianRupee className="h-4 w-4 text-primary shrink-0" />
                      <input
                        id="search-budget"
                        data-ocid="search.budget.input"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="Enter total budget in ₹"
                        type="number"
                        className="w-full outline-none text-sm bg-transparent placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="search-guests"
                      className="mb-2 block text-sm font-semibold text-foreground/60"
                    >
                      Guest Count
                    </label>
                    <div className="flex items-center gap-2 rounded-2xl border border-border px-4 py-3 focus-within:border-primary transition-colors">
                      <Users className="h-4 w-4 text-primary shrink-0" />
                      <input
                        id="search-guests"
                        data-ocid="search.guests.input"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        placeholder="Optional guest count"
                        type="number"
                        className="w-full outline-none text-sm bg-transparent placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    data-ocid="search.primary_button"
                    className="rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition hover:opacity-90"
                    onClick={() =>
                      document
                        .getElementById("venues-page")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Search Best Matches
                  </button>
                </div>
                <div className="mt-5 rounded-2xl bg-rose-50 p-4 text-sm text-foreground/70">
                  <span className="font-semibold text-primary">
                    AI matching flow:
                  </span>{" "}
                  location + budget + guest size + category + rating +
                  availability → best nearby recommendation.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTOR METRICS */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {investorMetrics.map((item) => (
            <div
              key={item.label}
              className="rounded-[26px] bg-card p-6 shadow-card ring-1 ring-rose-100"
            >
              <div className="text-xl font-black text-primary font-display">
                {item.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VENUES */}
      <section
        id="venues-page"
        className="mx-auto max-w-7xl px-6 py-16 lg:px-8"
      >
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Venue Listing Page
            </div>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl font-display">
              Explore all wedding venues
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Separate venue listing structure with filters, match labels,
              pricing, and enquiry actions.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-primary">
            <Filter className="h-4 w-4" /> {filteredVenues.length} venues found
          </div>
        </div>

        <div className="mb-8 grid gap-4 rounded-[28px] bg-card p-5 shadow-xs ring-1 ring-border md:grid-cols-4">
          <div className="rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
            Location: {location || "All India"}
          </div>
          <div className="rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
            Budget:{" "}
            {budget
              ? `₹${Number(budget).toLocaleString("en-IN")}`
              : "Any budget"}
          </div>
          <div className="rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
            Guests: {guestCount || "Any size"}
          </div>
          <div className="rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
            Sort: Rating / Budget Fit
          </div>
        </div>

        {filteredVenues.length === 0 ? (
          <div className="rounded-[28px] bg-card p-12 text-center shadow-card ring-1 ring-border">
            <div className="text-4xl mb-4">💒</div>
            <h3 className="text-xl font-bold font-display">No venues found</h3>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your location or budget filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredVenues.map((venue, idx) => (
              <div
                key={venue.id}
                data-ocid={`venue.item.${idx + 1}`}
                className="overflow-hidden rounded-[28px] bg-card shadow-card ring-1 ring-border transition card-hover"
              >
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="h-56 w-full object-cover"
                />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xl font-bold font-display">
                        {venue.name}
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" /> {venue.city},{" "}
                        {venue.state}
                      </div>
                    </div>
                    <div className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700 shrink-0">
                      ⭐ {venue.rating}
                    </div>
                  </div>
                  <div className="mt-4 inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-primary">
                    {venue.match}
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                    <div className="rounded-2xl bg-muted p-3">
                      <div className="text-muted-foreground text-xs">Type</div>
                      <div className="mt-1 font-semibold">{venue.type}</div>
                    </div>
                    <div className="rounded-2xl bg-muted p-3">
                      <div className="text-muted-foreground text-xs">
                        Budget
                      </div>
                      <div className="mt-1 font-semibold">
                        ₹{venue.budget.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <div className="col-span-2 rounded-2xl bg-muted p-3">
                      <div className="text-muted-foreground text-xs">
                        Capacity
                      </div>
                      <div className="mt-1 flex items-center gap-2 font-semibold">
                        <Users className="h-4 w-4 text-primary" />{" "}
                        {venue.capacity}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {venue.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  {/* Contact Info */}
                  {(venue.phone || venue.email || venue.address) && (
                    <div className="mt-4 space-y-1.5 rounded-xl border border-border/50 bg-muted/40 p-3">
                      {venue.phone && (
                        <a
                          href={`tel:${venue.phone}`}
                          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Phone className="h-3 w-3 shrink-0 text-primary" />
                          <span>{venue.phone}</span>
                        </a>
                      )}
                      {venue.email && (
                        <a
                          href={`mailto:${venue.email}`}
                          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Mail className="h-3 w-3 shrink-0 text-primary" />
                          <span>{venue.email}</span>
                        </a>
                      )}
                      {venue.address && (
                        <div className="flex items-start gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 shrink-0 text-primary mt-0.5" />
                          <span>{venue.address}</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <button
                      type="button"
                      className="rounded-2xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition hover:opacity-80"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      data-ocid={`venue.enquire.button.${idx + 1}`}
                      onClick={() => handleEnquireOpen(venue.name)}
                      className="rounded-2xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
                    >
                      Enquire
                    </button>
                    <a
                      data-ocid={`venue.whatsapp.button.${idx + 1}`}
                      href={`https://wa.me/?text=I'm interested in ${encodeURIComponent(venue.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      <MessageCircle className="h-4 w-4" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ENQUIRY MODAL */}
      <Dialog open={enquireOpen} onOpenChange={setEnquireOpen}>
        <DialogContent
          data-ocid="enquire.modal"
          className="rounded-[28px] max-w-md"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Enquire about {enquireVenue}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 mt-2">
            <div>
              <label
                htmlFor="eq-name"
                className="block text-sm font-semibold mb-1 text-muted-foreground"
              >
                Your Name *
              </label>
              <input
                id="eq-name"
                data-ocid="enquire.name.input"
                value={enquireForm.name}
                onChange={(e) =>
                  setEnquireForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="Full name"
                className="w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background"
              />
            </div>
            <div>
              <label
                htmlFor="eq-phone"
                className="block text-sm font-semibold mb-1 text-muted-foreground"
              >
                Phone *
              </label>
              <input
                id="eq-phone"
                data-ocid="enquire.phone.input"
                value={enquireForm.phone}
                onChange={(e) =>
                  setEnquireForm((f) => ({ ...f, phone: e.target.value }))
                }
                placeholder="Your phone number"
                className="w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background"
              />
            </div>
            <div>
              <label
                htmlFor="eq-email"
                className="block text-sm font-semibold mb-1 text-muted-foreground"
              >
                Email
              </label>
              <input
                id="eq-email"
                data-ocid="enquire.email.input"
                value={enquireForm.email}
                onChange={(e) =>
                  setEnquireForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="your@email.com"
                className="w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors bg-background"
              />
            </div>
            <div>
              <label
                htmlFor="eq-msg"
                className="block text-sm font-semibold mb-1 text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="eq-msg"
                data-ocid="enquire.message.textarea"
                value={enquireForm.message}
                onChange={(e) =>
                  setEnquireForm((f) => ({ ...f, message: e.target.value }))
                }
                placeholder="Tell them about your event..."
                rows={3}
                className="w-full rounded-2xl border border-border px-4 py-3 text-sm outline-none focus:border-primary transition-colors resize-none bg-background"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              data-ocid="enquire.close_button"
              onClick={() => setEnquireOpen(false)}
              className="flex-1 rounded-2xl border border-border px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted transition"
            >
              Cancel
            </button>
            <button
              type="button"
              data-ocid="enquire.submit_button"
              onClick={handleEnquireSubmit}
              disabled={enquireLoading}
              className="flex-1 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {enquireLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {enquireLoading ? "Sending..." : "Send Enquiry"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* VENDORS */}
      <section id="vendors" className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                Vendor Detail Cards
              </div>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl font-display">
                Detailed wedding vendor profiles
              </h2>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {vendors.map((vendor, idx) => {
              const Icon = vendor.icon;
              return (
                <div
                  key={vendor.name}
                  data-ocid={`vendor.item.${idx + 1}`}
                  className="rounded-[24px] border border-border p-6 shadow-xs transition card-hover bg-card"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                      ⭐ {vendor.rating}
                    </div>
                  </div>
                  <div className="mt-4 text-lg font-bold font-display">
                    {vendor.name}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {vendor.category} · {vendor.city}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-foreground/70">
                    {vendor.about}
                  </p>
                  <div className="mt-4 rounded-xl bg-muted px-3 py-2 text-sm font-medium">
                    Starting: {vendor.budget}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {vendor.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="rounded-2xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition hover:opacity-80"
                    >
                      View Profile
                    </button>
                    <a
                      href="https://wa.me/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      <MessageCircle className="h-4 w-4" /> WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LIST YOUR BUSINESS */}
      <section
        id="list-business"
        className="mx-auto max-w-7xl px-6 py-20 lg:px-8"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] bg-card p-8 shadow-card ring-1 ring-border">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Vendor "List Your Business" Page
            </div>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl font-display">
              Grow on VenueWala
            </h2>
            <p className="mt-4 text-muted-foreground leading-8">
              A dedicated onboarding page for wedding halls, caterers,
              decorators, photographers, makeup artists, DJs, and planners to
              register their business and start receiving leads.
            </p>

            {listingSuccess ? (
              <div
                data-ocid="listing.success_state"
                className="mt-6 rounded-[22px] bg-green-50 border border-green-200 p-6 text-center"
              >
                <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold font-display text-green-800">
                  Listing Submitted!
                </h3>
                <p className="mt-2 text-sm text-green-700">
                  Your business has been submitted for review. We'll contact you
                  shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setListingSuccess(false)}
                  className="mt-4 rounded-2xl bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 transition"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <input
                    data-ocid="listing.businessname.input"
                    value={listingForm.businessName}
                    onChange={(e) =>
                      setListingForm((f) => ({
                        ...f,
                        businessName: e.target.value,
                      }))
                    }
                    placeholder="Business name"
                    className="rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary transition-colors text-sm bg-background"
                  />
                  <input
                    data-ocid="listing.ownername.input"
                    value={listingForm.ownerName}
                    onChange={(e) =>
                      setListingForm((f) => ({
                        ...f,
                        ownerName: e.target.value,
                      }))
                    }
                    placeholder="Owner name"
                    className="rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary transition-colors text-sm bg-background"
                  />
                  <input
                    data-ocid="listing.city.input"
                    value={listingForm.city}
                    onChange={(e) =>
                      setListingForm((f) => ({ ...f, city: e.target.value }))
                    }
                    placeholder="City"
                    className="rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary transition-colors text-sm bg-background"
                  />
                  <input
                    data-ocid="listing.category.input"
                    value={listingForm.category}
                    onChange={(e) =>
                      setListingForm((f) => ({
                        ...f,
                        category: e.target.value,
                      }))
                    }
                    placeholder="Category"
                    className="rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary transition-colors text-sm bg-background"
                  />
                  <input
                    data-ocid="listing.phone.input"
                    value={listingForm.phone}
                    onChange={(e) =>
                      setListingForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    placeholder="Phone / WhatsApp"
                    className="rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary transition-colors text-sm bg-background"
                  />
                  <input
                    data-ocid="listing.price.input"
                    value={listingForm.startingPrice}
                    onChange={(e) =>
                      setListingForm((f) => ({
                        ...f,
                        startingPrice: e.target.value,
                      }))
                    }
                    placeholder="Starting price"
                    type="number"
                    className="rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary transition-colors text-sm bg-background"
                  />
                </div>
                <textarea
                  data-ocid="listing.about.textarea"
                  value={listingForm.about}
                  onChange={(e) =>
                    setListingForm((f) => ({ ...f, about: e.target.value }))
                  }
                  placeholder="About your business"
                  className="mt-4 min-h-[120px] w-full rounded-2xl border border-border px-4 py-3 outline-none focus:border-primary transition-colors resize-none text-sm bg-background"
                />
                <button
                  type="button"
                  data-ocid="listing.submit_button"
                  onClick={handleListingSubmit}
                  disabled={listingLoading}
                  className="mt-5 rounded-2xl bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60 flex items-center gap-2"
                >
                  {listingLoading && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  {listingLoading ? "Submitting..." : "Submit Business Listing"}
                </button>
              </>
            )}
          </div>

          <div className="rounded-[28px] bg-slate-900 p-8 text-white shadow-card">
            <div className="text-xl font-bold font-display">
              Vendor Pricing Packages
            </div>
            <div className="mt-6 space-y-4">
              {pricingPackages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="rounded-[22px] border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-bold font-display">
                        {pkg.name}
                      </div>
                      <div className="mt-1 text-sm text-rose-300">
                        {pkg.badge}
                      </div>
                    </div>
                    <div className="text-right text-lg font-black text-white">
                      {pkg.price}
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-slate-200">
                    {pkg.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-rose-300 shrink-0" />{" "}
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI + BACKEND */}
      <section className="bg-gradient-to-r from-rose-50 to-orange-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[28px] bg-card p-8 shadow-card ring-1 ring-rose-100">
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                Wedding Planner AI Recommendation
              </div>
              <h2 className="mt-3 text-3xl font-bold font-display">
                AI-assisted venue and vendor suggestions
              </h2>
              <p className="mt-4 text-muted-foreground leading-8">
                The AI engine can recommend a complete shortlist based on
                budget, city, event type, guest count, indoor/outdoor
                preference, and preferred vendors.
              </p>
              <div className="mt-6 rounded-[24px] bg-slate-900 p-6 text-white">
                <div className="text-sm text-slate-400">Sample AI output</div>
                <div className="mt-3 text-base font-semibold font-display italic leading-7">
                  "For a 500-guest wedding in Pune under ₹4 lakh, prioritize
                  Royal Palace Convention Hall + Dream Decor Studio + Shaadi
                  Caterers equivalent local partners."
                </div>
              </div>
            </div>

            <div className="rounded-[28px] bg-card p-8 shadow-card ring-1 ring-rose-100">
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                Backend Structure
              </div>
              <h2 className="mt-3 text-3xl font-bold font-display">
                Fully working backend modules
              </h2>
              <div className="mt-6 space-y-3 text-foreground/70">
                {backendModules.map((module) => (
                  <div
                    key={module}
                    className="flex items-start gap-3 rounded-2xl bg-muted px-4 py-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                    <div className="text-sm">{module}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CITY + SEO */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] bg-card p-8 shadow-card ring-1 ring-border">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              City Pages
            </div>
            <h2 className="mt-3 text-3xl font-bold font-display">
              Local landing pages for growth
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {cityPages.map((city) => (
                <div key={city.name} className="rounded-[22px] bg-muted p-4">
                  <div className="text-lg font-bold font-display">
                    {city.name}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    SEO: {city.seo}
                  </div>
                  <div className="mt-3 text-sm font-semibold text-primary">
                    Lead potential: {city.leads}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] bg-slate-900 p-8 text-white shadow-card">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-300">
              SEO Pages
            </div>
            <h2 className="mt-3 text-3xl font-bold font-display">
              Pages built to rank on Google
            </h2>
            <div className="mt-6 space-y-3">
              {seoPages.map((page) => (
                <div
                  key={page}
                  className="rounded-2xl bg-white/5 px-4 py-3 text-slate-200 text-sm"
                >
                  {page}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section id="dashboard" className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                Admin Dashboard Style
              </div>
              <h2 className="mt-1 text-3xl font-bold md:text-4xl font-display">
                Platform control panel preview
              </h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {dashboardStats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-[24px] bg-rose-50 p-6 shadow-xs ring-1 ring-rose-100"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="rounded-xl bg-white p-2 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 text-3xl font-black text-foreground font-display">
                    {item.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          How It Works
        </div>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl font-display">
          Simple, fast, and wedding-focused
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {howItWorks.map((item, index) => (
            <div
              key={item.title}
              className="rounded-[26px] bg-card p-6 shadow-card ring-1 ring-border"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-white text-lg">
                {index + 1}
              </div>
              <div className="mt-4 text-xl font-bold font-display">
                {item.title}
              </div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* INVESTOR */}
      <section id="investor" className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-300">
                Investor Pitch Page
              </div>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl font-display">
                Why VenueWala can scale
              </h2>
              <p className="mt-4 text-slate-300 leading-8">
                VenueWala solves fragmented wedding discovery in India by
                combining local search, AI recommendations, vendor
                subscriptions, city SEO pages, and lead monetization into one
                platform.
              </p>
            </div>
            <div className="rounded-[28px] bg-white/5 p-6 ring-1 ring-white/10">
              <div className="text-lg font-bold font-display">
                Business model summary
              </div>
              <div className="mt-5 grid gap-3 text-sm text-slate-200">
                <div className="rounded-2xl bg-white/5 px-4 py-3">
                  Vendor subscription plans
                </div>
                <div className="rounded-2xl bg-white/5 px-4 py-3">
                  Featured listings and premium ranking
                </div>
                <div className="rounded-2xl bg-white/5 px-4 py-3">
                  Qualified lead fees
                </div>
                <div className="rounded-2xl bg-white/5 px-4 py-3">
                  City page sponsorships
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="bg-card py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Leadership Team
            </div>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl font-display">
              The people behind VenueWala
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              VenueWala is led by a focused team working to build India's
              smartest wedding discovery platform.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Prashant Thakur",
                role: "Founder, CEO & Head of Growth and Strategy",
                title: "Customer Support Head",
                bio: "Leading platform vision, user experience, and customer support operations.",
              },
              {
                name: "Ankit Singh",
                role: "Founder, MD & Finance and Marketing Head",
                title: "Planning Head",
                bio: "Responsible for marketplace planning, venue partnerships, and vendor onboarding strategy.",
              },
              {
                name: "Raj Patwa",
                role: "Founder, VP & Planning and Client Acquisition Head",
                title: "Planning Head",
                bio: "Focused on platform growth planning, vendor ecosystem expansion, and operational strategy.",
              },
            ].map((member) => (
              <div
                key={member.name}
                className="rounded-[26px] border border-border bg-card p-6 shadow-xs card-hover"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-primary mb-4">
                  <User className="h-7 w-7" />
                </div>
                <div className="text-xl font-bold font-display">
                  {member.name}
                </div>
                <div className="mt-2 text-sm text-primary font-semibold">
                  {member.role}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {member.title}
                </div>
                <p className="mt-4 text-sm text-foreground/70">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT US SECTION */}
      <section
        data-ocid="contact.section"
        className="bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950/30 px-6 py-20"
      >
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-rose-400">
            <Mail className="h-3 w-3" /> Get in Touch
          </div>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            We&apos;d Love to Hear From You
          </h2>
          <p className="mt-4 text-slate-400">
            Have a question about a venue? Need help planning your dream
            wedding? Reach out — we&apos;re here to help.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {/* Email Card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm hover:border-rose-500/30 transition-colors">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white">Email Us</h3>
              <p className="mt-1 text-sm text-slate-400">
                We reply within 24 hours
              </p>
              <a
                data-ocid="contact.email.link"
                href="mailto:prashantthakur2604@gmail.com"
                className="mt-4 inline-block text-sm font-semibold text-rose-400 hover:text-rose-300 transition-colors break-all"
              >
                prashantthakur2604@gmail.com
              </a>
            </div>
            {/* WhatsApp Card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm hover:border-green-500/30 transition-colors">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/15 text-green-400">
                <MessageCircle className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white">WhatsApp Us</h3>
              <p className="mt-1 text-sm text-slate-400">
                Chat with us instantly
              </p>
              <a
                data-ocid="contact.whatsapp.link"
                href="https://wa.me/917645842354"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-green-400 hover:text-green-300 transition-colors"
              >
                +91 76458 42354
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-slate-950 px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-2">
          <Heart className="h-4 w-4 text-rose-400 fill-rose-400" />
        </div>
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} VenueWala. Built by APR. Founder:
          Prashant Thakur. Founders: Ankit Singh &amp; Raj Patwa.
        </p>
        <p className="mt-2 text-xs text-slate-600">
          Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-slate-400 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      {/* WHATSAPP FLOATING BUTTON */}
      <a
        href="https://wa.me/917645842354"
        target="_blank"
        rel="noreferrer"
        data-ocid="whatsapp.button"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "#25D366",
          color: "#fff",
          borderRadius: "50px",
          padding: "12px 20px",
          boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "15px",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform =
            "scale(1.06)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            "0 6px 28px rgba(37,211,102,0.6)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            "0 4px 20px rgba(37,211,102,0.45)";
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          role="img"
          aria-label="WhatsApp"
          style={{ width: "22px", height: "22px", flexShrink: 0 }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.852L.054 23.25a.75.75 0 00.916.916l5.453-1.465A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.502-5.18-1.38l-.37-.217-3.838 1.031 1.05-3.735-.237-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
        Chat on WhatsApp
      </a>
    </div>
  );
}

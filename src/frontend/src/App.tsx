import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import {
  AlertCircle,
  BadgeCheck,
  BarChart3,
  Brain,
  CalendarDays,
  CalendarHeart,
  Camera,
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  Filter,
  Heart,
  Hotel,
  IndianRupee,
  KeyRound,
  LayoutDashboard,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Music,
  Palette,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  User,
  Users,
  Utensils,
  Wand2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
    phone: "+91 98220 34567",
    email: "hello@dreamdecor.in",
    address: "Shop 12, Aundh Market, Pune 411007",
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
    phone: "+91 98200 11234",
    email: "book@shaadicaterers.com",
    address: "45 Linking Road, Bandra West, Mumbai 400050",
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
    phone: "+91 94140 22345",
    email: "capture@momentsphotography.in",
    address: "C-9 Vaishali Nagar, Jaipur 302021",
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
    phone: "+91 99100 55678",
    email: "bookings@bridalglow.in",
    address: "B-47 Lajpat Nagar II, New Delhi 110024",
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
    phone: "+91 90000 87654",
    email: "events@sangeetsound.com",
    address: "Plot 22, Jubilee Hills, Hyderabad 500033",
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
    phone: "+91 98230 43210",
    email: "reservations@weddingstaysuites.com",
    address: "Near Calangute Beach, North Goa 403516",
    about:
      "Guest accommodation support for destination weddings, family stays, and venue-side bookings.",
    tags: ["Stay", "Rooms", "Destination"],
  },
  {
    name: "Mehndi Magic",
    category: "Mehendi",
    city: "Jaipur",
    budget: "₹8,000 onwards",
    icon: Sparkles,
    rating: 4.8,
    phone: "+91 94600 78901",
    email: "art@mehndimagic.in",
    address: "Johari Bazaar, Jaipur 302003",
    about:
      "Intricate bridal mehendi designs, rajasthani patterns, and full-bridal packages with full team.",
    tags: ["Bridal Mehendi", "Rajasthani Art", "Full Package"],
  },
  {
    name: "Royal Baraati Band",
    category: "Band & Baraati",
    city: "Delhi",
    budget: "₹45,000 onwards",
    icon: Music,
    rating: 4.6,
    phone: "+91 98113 56789",
    email: "bookings@royalbaraati.com",
    address: "Karol Bagh, New Delhi 110005",
    about:
      "Traditional baraat procession band, dhol players, ghodi arrangement, and full band package.",
    tags: ["Brass Band", "Dhol", "Ghodi"],
  },
  {
    name: "Vidhi Pandit Services",
    category: "Pandit Ji / Rituals",
    city: "Varanasi",
    budget: "₹11,000 onwards",
    icon: Heart,
    rating: 4.9,
    phone: "+91 94153 22000",
    email: "info@vidhipandit.com",
    address: "Dashashwamedh Ghat Road, Varanasi 221001",
    about:
      "Vedic wedding rituals, saptapadi, vidhi ceremonies conducted by experienced pandits in any city.",
    tags: ["Vedic Rituals", "Saptapadi", "Pan-India"],
  },
  {
    name: "Forever Weddings",
    category: "Wedding Planning",
    city: "Mumbai",
    budget: "₹1,50,000 onwards",
    icon: CalendarHeart,
    rating: 4.8,
    phone: "+91 99200 63210",
    email: "plan@foreverweddings.in",
    address: "702 Andheri West, Mumbai 400053",
    about:
      "End-to-end wedding planning, vendor management, budget tracking, and day-of coordination.",
    tags: ["Full Planning", "Vendor Mgmt", "Day-Of"],
  },
  {
    name: "Bloom Florist Studio",
    category: "Florist",
    city: "Pune",
    budget: "₹20,000 onwards",
    icon: Sparkles,
    rating: 4.7,
    phone: "+91 98220 65432",
    email: "bloom@bloomflorist.in",
    address: "FC Road, Shivajinagar, Pune 411005",
    about:
      "Fresh floral arrangements, stage florals, car decoration, and bridal bouquets.",
    tags: ["Fresh Flowers", "Stage Decor", "Bouquets"],
  },
  {
    name: "Spice & Grace Catering",
    category: "Catering",
    city: "Hyderabad",
    budget: "₹900 per plate",
    icon: Utensils,
    rating: 4.7,
    phone: "+91 90000 23456",
    email: "catering@spiceandgrace.com",
    address: "Banjara Hills Road No. 12, Hyderabad 500034",
    about:
      "Hyderabadi biryani, Mughlai, and South Indian fusion menus for large wedding banquets.",
    tags: ["Hyderabadi Biryani", "Mughlai", "Live Counters"],
  },
  {
    name: "Lens & Love Studios",
    category: "Photography",
    city: "Bangalore",
    budget: "₹80,000 onwards",
    icon: Camera,
    rating: 4.9,
    phone: "+91 80 9988 7766",
    email: "shoot@lensandlove.in",
    address: "Indiranagar 100 Feet Road, Bangalore 560038",
    about:
      "Artistic wedding films, drone coverage, destination pre-wedding shoots, and same-day edits.",
    tags: ["Drone", "Cinematic Films", "Same-Day Edit"],
  },
  {
    name: "Aura Bridal Makeup",
    category: "Makeup",
    city: "Ahmedabad",
    budget: "₹18,000 onwards",
    icon: Sparkles,
    rating: 4.6,
    phone: "+91 98254 77890",
    email: "aurabridal@gmail.com",
    address: "SG Highway, Bodakdev, Ahmedabad 380054",
    about:
      "Gujarati and pan-Indian bridal makeup, airbrush finishing, engagement and reception packages.",
    tags: ["Airbrush", "Gujarati Bridal", "Reception Glam"],
  },
  {
    name: "Beat Drop Entertainment",
    category: "DJ & Music",
    city: "Pune",
    budget: "₹40,000 onwards",
    icon: Music,
    rating: 4.5,
    phone: "+91 98221 09876",
    email: "dj@beatdrop.in",
    address: "Koregaon Park, Pune 411001",
    about:
      "High-energy wedding DJs, sound engineers, LED screens, and full-night sangeet entertainment.",
    tags: ["LED Stage", "Sound Engineers", "Sangeet Night"],
  },
  {
    name: "Shubh Lagan Planners",
    category: "Wedding Planning",
    city: "Jaipur",
    budget: "₹2,00,000 onwards",
    icon: CalendarHeart,
    rating: 4.8,
    phone: "+91 94141 55432",
    email: "book@shubhlaganplanners.com",
    address: "C-Scheme, Jaipur 302001",
    about:
      "Destination Rajasthani wedding planning, palace venue tie-ups, and royal theme execution.",
    tags: ["Destination Wedding", "Royal Theme", "Palace Venues"],
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

const featuredVendorCategories = [
  {
    category: "Decor",
    icon: Palette,
    startingAt: "₹25,000",
    desc: "Stage, floral & theme setups",
    whatsapp: "917645842354",
  },
  {
    category: "Catering",
    icon: Utensils,
    startingAt: "₹700/plate",
    desc: "Veg & non-veg banquet menus",
    whatsapp: "917645842354",
  },
  {
    category: "Photography",
    icon: Camera,
    startingAt: "₹65,000",
    desc: "Candid + cinematic coverage",
    whatsapp: "917645842354",
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
  const [showUpgrading, setShowUpgrading] = useState(true);

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

  // AI Event Planner state
  const [aiEventType, setAiEventType] = useState("Wedding");
  const [aiCity, setAiCity] = useState("");
  const [aiBudget, setAiBudget] = useState("");
  const [aiGuests, setAiGuests] = useState("");
  const [aiDate, setAiDate] = useState("");
  const [aiPreferences, setAiPreferences] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Admin settings state
  const [adminApiKey, setAdminApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [adminSaving, setAdminSaving] = useState(false);
  const [apiKeySet, setApiKeySet] = useState(false);
  const [apiKeyStatusLoading, setApiKeyStatusLoading] = useState(true);

  // Check API key status on mount
  useEffect(() => {
    if (!actor) return;
    const checkKeyStatus = async () => {
      try {
        const status = await (actor as any).getApiKeyStatus();
        setApiKeySet(!!status);
      } catch {
        setApiKeySet(false);
      } finally {
        setApiKeyStatusLoading(false);
      }
    };
    checkKeyStatus();
  }, [actor]);
  const handleDownloadPlan = () => {
    if (!aiResult) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Weddnear AI Wedding Plan</title>
        <style>
          body { font-family: Georgia, serif; max-width: 800px; margin: 40px auto; padding: 20px; color: #1e293b; line-height: 1.8; }
          h1 { color: #e11d48; font-size: 24px; border-bottom: 2px solid #e11d48; padding-bottom: 10px; }
          p { margin: 6px 0; font-size: 14px; }
          .footer { margin-top: 40px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px; }
        </style>
      </head>
      <body>
        <h1>💍 Weddnear — Personalised Wedding Plan</h1>
        ${aiResult
          .split("\n")
          .map((line) => (line.trim() ? `<p>${line}</p>` : "<br/>"))
          .join("")}
        <div class="footer">Generated by Weddnear AI Planner • weddnear.io</div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 300);
  };

  const handleGeneratePlan = async () => {
    if (!aiCity || !aiBudget || !aiGuests) {
      toast.error("Please fill in city, budget, and guest count.");
      return;
    }
    setAiLoading(true);
    setAiResult(null);
    setAiError(null);

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1800));

    const budget = Number(aiBudget);
    const guests = Number(aiGuests);
    const perHead = Math.round(budget / guests);

    const venueShare = Math.round(budget * 0.3);
    const cateringShare = Math.round(budget * 0.35);
    const decorShare = Math.round(budget * 0.12);
    const photoShare = Math.round(budget * 0.08);
    const entertainShare = Math.round(budget * 0.05);
    const makeupShare = Math.round(budget * 0.05);
    const miscShare =
      budget -
      venueShare -
      cateringShare -
      decorShare -
      photoShare -
      entertainShare -
      makeupShare;

    const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

    const cityLower = aiCity.toLowerCase();
    const isMetro = [
      "mumbai",
      "delhi",
      "bangalore",
      "hyderabad",
      "chennai",
      "kolkata",
      "pune",
    ].some((c) => cityLower.includes(c));
    const venueType =
      budget > 500000
        ? "5-star banquet hall or heritage palace"
        : budget > 200000
          ? "premium community hall or garden venue"
          : "budget banquet or open lawn";
    const cateringStyle =
      guests > 300
        ? "grand buffet with live counters"
        : "plated multi-cuisine service";
    const decorTheme = aiPreferences?.toLowerCase().includes("outdoor")
      ? "Garden Fairy-Lights theme"
      : budget > 300000
        ? "Royal Floral Grandeur"
        : "Elegant Minimalist";

    const plan = `🎊 PERSONALISED WEDDING PLAN FOR ${aiCity.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 EVENT OVERVIEW
• Event Type: ${aiEventType}
• City: ${aiCity}
• Date: ${aiDate || "TBD"}
• Guest Count: ${guests} guests
• Total Budget: ${formatINR(budget)} (${formatINR(perHead)} per head)

🏛️ VENUE RECOMMENDATIONS
• Best fit: ${venueType} in ${aiCity}
• For ${guests} guests, look for venues with ${Math.round(guests * 1.2)} sq ft capacity
• Allocated Budget: ${formatINR(venueShare)}
${isMetro ? `• Top picks in ${aiCity}: Contact Weddnear vendors for curated venue list` : "• Check local marriage gardens and community centres for best deals"}
• Book at least 6 months in advance for ${aiDate ? "your selected date" : "peak season"}

🍽️ CATERING
• Style: ${cateringStyle}
• Menu: North Indian + South Indian + Continental spread
• Approximate cost: ${formatINR(cateringShare)} (${formatINR(Math.round(cateringShare / guests))}/person)
• Include: Welcome drinks, starter, main course, dessert, paan counter
${aiPreferences?.toLowerCase().includes("veg") ? "• Fully vegetarian menu as per your preference" : "• Mix of veg + non-veg options recommended"}

🌸 DECORATION & THEME
• Theme: ${decorTheme}
• Allocated Budget: ${formatINR(decorShare)}
• Includes: Entrance gate, stage backdrop, floral centrepieces, lighting
• Trending in ${aiCity}: Jasmine strings + LED backdrop + suspended floral canopy

📸 PHOTOGRAPHY & VIDEOGRAPHY
• Package: 2 photographers + 1 videographer + drone shots
• Coverage: Full day (6am–midnight)
• Allocated Budget: ${formatINR(photoShare)}
• Deliverables: 500+ edited photos, highlights reel, full-length video

🎵 MUSIC & ENTERTAINMENT
• DJ with sound system for reception
• Dhol player for baraat
• Allocated Budget: ${formatINR(entertainShare)}
• Optional: Live singer or folk performers for a premium touch

💄 MAKEUP & BRIDAL WEAR
• Bridal makeup + hairstyle + saree draping
• Allocated Budget: ${formatINR(makeupShare)}
• Groom sherwani rental or purchase included
• Book trials 2 weeks before the event

⏰ DAY-OF TIMELINE
• 07:00 AM – Hair & makeup begins
• 10:00 AM – Baraat / bride arrival
• 12:00 PM – Ceremony (if daytime)
• 01:00 PM – Lunch for guests
• 07:00 PM – Evening reception
• 09:00 PM – Dinner & entertainment
• 11:30 PM – Grand send-off

💰 BUDGET BREAKDOWN
• Venue:        ${formatINR(venueShare)} (30%)
• Catering:     ${formatINR(cateringShare)} (35%)
• Decoration:   ${formatINR(decorShare)} (12%)
• Photography:  ${formatINR(photoShare)} (8%)
• Entertainment:${formatINR(entertainShare)} (5%)
• Makeup/Wear:  ${formatINR(makeupShare)} (5%)
• Miscellaneous:${formatINR(miscShare)} (5%)
• TOTAL:        ${formatINR(budget)}

💡 TOP TIPS FOR YOUR ${aiCity.toUpperCase()} WEDDING
1. Book your venue and caterer first — they fill up fastest
2. Hire a local coordinator from Weddnear for smooth execution
3. Get 3 quotes from vendors before finalising
4. Keep 10% of budget as emergency reserve
5. Confirm all vendors in writing with advance payment receipts
${aiPreferences ? `6. Special note: "${aiPreferences}" — we've factored this into the plan above` : ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Plan generated by Weddnear AI Planner
📞 Need help? WhatsApp us: +91 7645842354`;

    setAiResult(plan);
    setAiLoading(false);
  };

  const handleSaveApiKey = async () => {
    if (!adminApiKey.trim()) {
      toast.error("Please enter a valid API key.");
      return;
    }
    if (!actor) {
      toast.error("Backend not connected. Please wait.");
      return;
    }
    setAdminSaving(true);
    try {
      await (actor as any).setOpenAiApiKey(adminApiKey.trim());
      setApiKeySet(true);
      toast.success("OpenAI API key saved to backend successfully!");
      setAdminApiKey("");
    } catch {
      toast.error("Failed to save API key to backend.");
    } finally {
      setAdminSaving(false);
    }
  };

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

  const [vendorCategoryFilter, setVendorCategoryFilter] = useState("All");
  const [vendorCityFilter, setVendorCityFilter] = useState("All");

  const filteredVendors = useMemo(() => {
    return vendors.filter((v) => {
      const matchesCat =
        vendorCategoryFilter === "All" || v.category === vendorCategoryFilter;
      const matchesCity =
        vendorCityFilter === "All" || v.city === vendorCityFilter;
      return matchesCat && matchesCity;
    });
  }, [vendorCategoryFilter, vendorCityFilter]);

  const vendorCities = useMemo(() => {
    const cities = [...new Set(vendors.map((v) => v.city))].sort();
    return cities;
  }, []);

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

  if (showUpgrading) {
    return (
      <div
        data-ocid="upgrading.section"
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-pink-600 via-rose-500 to-orange-400 text-white text-center px-6"
      >
        <div className="flex flex-col items-center gap-6 animate-fade-in">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-white rounded-xl p-2 shadow-lg">
              <img
                src="/assets/uploads/ChatGPT-Image-Mar-17-2026-03_38_47-PM-1.png"
                alt="APR United"
                className="h-20 w-20 object-contain"
              />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black tracking-wide drop-shadow-lg text-white">
                APR United
              </span>
              <span
                className="text-sm font-bold tracking-widest uppercase px-2 py-1 rounded-md"
                style={{ background: "rgba(212,160,23,0.85)", color: "#fff" }}
              >
                APR United
              </span>
            </div>
            <div className="text-base font-medium text-white/80 tracking-wide">
              Find Your Perfect Wedding, Near You
            </div>
          </div>
          <div className="w-16 h-1 bg-white/60 rounded-full" />
          <h1 className="text-3xl md:text-4xl font-bold drop-shadow">
            We Are Upgrading
          </h1>
          <p className="max-w-md text-lg text-white/90">
            We&apos;re making Weddnear even better for you. We&apos;ll be back
            shortly with exciting new features!
          </p>
          <div className="flex gap-2 mt-2">
            <span
              className="w-3 h-3 rounded-full bg-white animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-3 h-3 rounded-full bg-white animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-3 h-3 rounded-full bg-white animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
          <p className="text-sm text-white/70 mt-4">
            Thank you for your patience ❤️
          </p>
          <button
            type="button"
            data-ocid="upgrading.button"
            onClick={() => setShowUpgrading(false)}
            className="mt-4 px-6 py-2 rounded-full bg-white text-pink-600 font-semibold shadow hover:bg-pink-50 transition"
          >
            Enter Site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Toaster richColors position="top-right" />

      {/* ============================
          HERO SECTION
      ============================= */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background: "linear-gradient(135deg, #e11d48 0%, #ec4899 100%)",
        }}
      >
        {/* Soft radial overlays for depth */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, #fff 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, #fff 0%, transparent 70%)",
              transform: "translate(-30%, 30%)",
            }}
          />
        </div>

        {/* NAV */}
        <div className="relative mx-auto max-w-7xl px-6 pt-5 pb-4 lg:px-8">
          <nav className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white rounded-lg p-1 shadow-sm">
                <img
                  src="/assets/uploads/ChatGPT-Image-Mar-17-2026-03_38_47-PM-1.png"
                  alt="APR United"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black tracking-wide font-display text-white drop-shadow">
                    APR United
                  </span>
                  <span
                    className="text-xs font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded"
                    style={{
                      background: "linear-gradient(90deg, #d4a017, #e8536a)",
                      color: "#fff",
                      letterSpacing: "0.12em",
                    }}
                  >
                    APR United
                  </span>
                </div>
                <div className="mt-0.5 text-xs text-white/75 font-medium tracking-wide">
                  Find Your Perfect Wedding, Near You
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-5 text-sm font-medium">
              <a
                href="#venues-section"
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
        </div>

        {/* HERO CONTENT */}
        <div className="relative mx-auto max-w-4xl px-6 py-16 lg:py-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight font-display drop-shadow">
            Find Your Perfect Wedding, Near You 💍
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/85 max-w-xl mx-auto">
            Search wedding halls &amp; vendors by location and budget
          </p>

          {/* SEARCH BAR */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1 w-full">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-rose-400" />
              <input
                data-ocid="search.location.input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter City"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl text-slate-900 text-sm font-medium placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-rose-300 shadow-sm"
              />
            </div>
            <div className="relative flex-1 w-full">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-rose-400" />
              <input
                data-ocid="search.budget.input"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Budget (₹)"
                type="number"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl text-slate-900 text-sm font-medium placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-rose-300 shadow-sm"
              />
            </div>
            <div className="relative flex-1 w-full sm:flex-none sm:w-auto">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-rose-400" />
              <input
                data-ocid="search.guests.input"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                placeholder="Guests"
                type="number"
                className="w-full sm:w-28 pl-10 pr-4 py-3.5 rounded-xl text-slate-900 text-sm font-medium placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-rose-300 shadow-sm"
              />
            </div>
            <button
              type="button"
              data-ocid="search.primary_button"
              onClick={() =>
                document
                  .getElementById("venues-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition shadow-md whitespace-nowrap"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>

          {/* TRUST PILLS */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-white/80">
            <span className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full">
              10 Real Venues
            </span>
            <span className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full">
              18 Verified Vendors
            </span>
            <span className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full">
              5 Major Cities
            </span>
            <span className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full">
              AI Recommendations
            </span>
          </div>
        </div>
      </section>

      {/* ============================
          AI WEDDING PLANNER
      ============================= */}
      {/* ============================
          AI WEDDING PLANNER (INTERACTIVE)
      ============================= */}
      <section
        id="ai-planner"
        className="py-20 bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 relative overflow-hidden"
      >
        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl"
        />

        <div className="relative mx-auto max-w-3xl px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="h-4 w-4" />
              Powered by OpenAI
            </div>
            <h2 className="text-4xl font-bold font-display text-slate-900">
              AI Event Planner ✨
            </h2>
            <p className="mt-3 text-slate-500 text-lg max-w-xl mx-auto">
              Tell us about your event — get a complete personalised plan with
              venues, vendors, budget breakdown, and timeline in seconds.
              Powered by OpenAI via secure backend.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-rose-100 p-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="ai-event-type"
                  className="block text-sm font-semibold text-slate-700 mb-1.5"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-rose-500" /> Event
                    Type
                  </span>
                </label>
                <select
                  id="ai-event-type"
                  data-ocid="ai-planner.select"
                  value={aiEventType}
                  onChange={(e) => setAiEventType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition"
                >
                  <option>Wedding</option>
                  <option>Birthday Party</option>
                  <option>Corporate Event</option>
                  <option>Engagement</option>
                  <option>Anniversary</option>
                  <option>Baby Shower</option>
                  <option>Farewell Party</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="ai-city"
                  className="block text-sm font-semibold text-slate-700 mb-1.5"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-rose-500" /> City
                  </span>
                </label>
                <input
                  id="ai-city"
                  data-ocid="ai-planner.input"
                  type="text"
                  placeholder="e.g. Mumbai, Pune, Delhi"
                  value={aiCity}
                  onChange={(e) => setAiCity(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition"
                />
              </div>
              <div>
                <label
                  htmlFor="ai-budget"
                  className="block text-sm font-semibold text-slate-700 mb-1.5"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <IndianRupee className="h-3.5 w-3.5 text-rose-500" /> Budget
                  </span>
                </label>
                <input
                  id="ai-budget"
                  type="text"
                  placeholder="e.g. 2 lakhs, 50,000"
                  value={aiBudget}
                  onChange={(e) => setAiBudget(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition"
                />
              </div>
              <div>
                <label
                  htmlFor="ai-guests"
                  className="block text-sm font-semibold text-slate-700 mb-1.5"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-rose-500" /> Number of
                    Guests
                  </span>
                </label>
                <input
                  id="ai-guests"
                  type="number"
                  placeholder="e.g. 150"
                  value={aiGuests}
                  onChange={(e) => setAiGuests(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition"
                />
              </div>
              <div>
                <label
                  htmlFor="ai-date"
                  className="block text-sm font-semibold text-slate-700 mb-1.5"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-rose-500" /> Event
                    Date
                  </span>
                </label>
                <input
                  id="ai-date"
                  type="date"
                  value={aiDate}
                  onChange={(e) => setAiDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="ai-preferences"
                  className="block text-sm font-semibold text-slate-700 mb-1.5"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Wand2 className="h-3.5 w-3.5 text-rose-500" /> Special
                    Preferences{" "}
                    <span className="font-normal text-slate-400">
                      (optional)
                    </span>
                  </span>
                </label>
                <textarea
                  id="ai-preferences"
                  data-ocid="ai-planner.textarea"
                  placeholder="e.g. outdoor venue, vegetarian food, live music, floral decor..."
                  value={aiPreferences}
                  onChange={(e) => setAiPreferences(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none transition resize-none"
                />
              </div>
            </div>

            <button
              type="button"
              data-ocid="ai-planner.primary_button"
              onClick={handleGeneratePlan}
              disabled={aiLoading}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 disabled:opacity-60 text-white px-8 py-4 rounded-xl font-bold text-base transition shadow-lg shadow-rose-200"
            >
              {aiLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Our AI is planning your event...
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5" />
                  Generate My Event Plan ✨
                </>
              )}
            </button>
          </div>

          {/* Loading State */}
          {aiLoading && (
            <div
              data-ocid="ai-planner.loading_state"
              className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-rose-100 p-6 text-center"
            >
              <div className="flex items-center justify-center gap-3 text-rose-600">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="font-semibold text-base">
                  Our AI is planning your event...
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                This may take a few seconds
              </p>
            </div>
          )}

          {/* Error State */}
          {aiError && !aiLoading && (
            <div
              data-ocid="ai-planner.error_state"
              className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-6"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-red-700 text-sm">
                  {aiError.replace("ERROR: ", "")}
                </p>
              </div>
            </div>
          )}

          {/* Results */}
          {aiResult && !aiLoading && (
            <div
              data-ocid="ai-planner.success_state"
              className="mt-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-emerald-100 shadow-lg p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Brain className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="font-bold text-slate-800 text-base">
                  Your Personalised Wedding Plan
                </span>
                <span className="ml-auto text-xs text-slate-400">
                  Powered by GPT
                </span>
              </div>
              <div className="prose prose-slate max-w-none">
                {aiResult.split("\n").map((line, lineIndex) => {
                  const stableKey = `line-${lineIndex}`;
                  if (line.trim())
                    return (
                      <p
                        key={stableKey}
                        className="text-sm leading-7 text-slate-700 mb-1"
                      >
                        {line}
                      </p>
                    );
                  return <div key={stableKey} className="h-2" />;
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-xs text-slate-400">
                  Plan generated by AI — verify vendor details before booking
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    data-ocid="ai-planner.secondary_button"
                    onClick={handleDownloadPlan}
                    className="flex items-center gap-1.5 text-xs bg-rose-600 hover:bg-rose-700 text-white font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAiResult(null);
                      setAiError(null);
                    }}
                    className="text-xs text-rose-500 hover:text-rose-700 font-semibold transition"
                  >
                    Generate New Plan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============================
          INVESTOR METRICS STRIP
      ============================= */}
      <section className="bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {investorMetrics.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-rose-50 p-5 ring-1 ring-rose-100"
              >
                <div className="text-2xl font-black text-rose-600">
                  {item.value}
                </div>
                <div className="mt-1 text-sm text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          FEATURED WEDDING VENUES
      ============================= */}
      <section
        id="venues-section"
        className="mx-auto max-w-7xl px-6 py-16 lg:px-8"
      >
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl font-display">
              Featured Wedding Venues
            </h2>
            <p className="mt-2 text-slate-500">
              Handpicked venues across India — filter by city and budget
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-600">
            <Filter className="h-4 w-4" /> {filteredVenues.length} venues found
          </div>
        </div>

        {/* Active Filters Display */}
        {(location || budget || guestCount) && (
          <div className="mb-6 flex flex-wrap gap-3">
            {location && (
              <span className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700">
                📍 {location}
              </span>
            )}
            {budget && (
              <span className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700">
                💰 ₹{Number(budget).toLocaleString("en-IN")}
              </span>
            )}
            {guestCount && (
              <span className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700">
                👥 {guestCount} guests
              </span>
            )}
          </div>
        )}

        {filteredVenues.length === 0 ? (
          <div
            data-ocid="venue.empty_state"
            className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-100"
          >
            <div className="text-5xl mb-4">💒</div>
            <h3 className="text-xl font-bold">No venues found</h3>
            <p className="mt-2 text-slate-500">
              Try adjusting your location or budget filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredVenues.map((venue, idx) => (
              <div
                key={venue.id}
                data-ocid={`venue.item.${idx + 1}`}
                className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:-translate-y-0.5"
              >
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold font-display">
                        {venue.name}
                      </h3>
                      <p className="mt-0.5 text-sm text-slate-500">
                        {venue.city} • ₹{venue.budget.toLocaleString("en-IN")} •{" "}
                        {venue.capacity}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                      ⭐ {venue.rating}
                    </span>
                  </div>

                  {/* Contact Info */}
                  {(venue.phone || venue.email || venue.address) && (
                    <div className="mt-3 space-y-1 rounded-xl bg-slate-50 p-3">
                      {venue.phone && (
                        <a
                          href={`tel:${venue.phone}`}
                          className="flex items-center gap-2 text-xs text-slate-500 hover:text-rose-600 transition-colors"
                        >
                          <Phone className="h-3 w-3 shrink-0 text-rose-500" />
                          <span>{venue.phone}</span>
                        </a>
                      )}
                      {venue.email && (
                        <a
                          href={`mailto:${venue.email}`}
                          className="flex items-center gap-2 text-xs text-slate-500 hover:text-rose-600 transition-colors"
                        >
                          <Mail className="h-3 w-3 shrink-0 text-rose-500" />
                          <span className="truncate">{venue.email}</span>
                        </a>
                      )}
                      venue.address && (
                      <div className="flex items-start gap-2 text-xs text-slate-500">
                        <MapPin className="h-3 w-3 shrink-0 text-rose-500 mt-0.5" />
                        <span className="leading-snug">{venue.address}</span>
                      </div>
                      )
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      data-ocid={`venue.enquire.button.${idx + 1}`}
                      onClick={() => handleEnquireOpen(venue.name)}
                      className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Enquire
                    </button>
                    <a
                      data-ocid={`venue.whatsapp.button.${idx + 1}`}
                      href={`https://wa.me/?text=I'm interested in ${encodeURIComponent(venue.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1 rounded-xl bg-green-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      <MessageCircle className="h-4 w-4" />
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
          className="rounded-3xl max-w-md"
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
                className="block text-sm font-semibold mb-1 text-slate-500"
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
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-rose-400 transition-colors bg-white"
              />
            </div>
            <div>
              <label
                htmlFor="eq-phone"
                className="block text-sm font-semibold mb-1 text-slate-500"
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
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-rose-400 transition-colors bg-white"
              />
            </div>
            <div>
              <label
                htmlFor="eq-email"
                className="block text-sm font-semibold mb-1 text-slate-500"
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
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-rose-400 transition-colors bg-white"
              />
            </div>
            <div>
              <label
                htmlFor="eq-msg"
                className="block text-sm font-semibold mb-1 text-slate-500"
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
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-rose-400 transition-colors resize-none bg-white"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              data-ocid="enquire.close_button"
              onClick={() => setEnquireOpen(false)}
              className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              data-ocid="enquire.submit_button"
              onClick={handleEnquireSubmit}
              disabled={enquireLoading}
              className="flex-1 rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {enquireLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {enquireLoading ? "Sending..." : "Send Enquiry"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ============================
          TOP WEDDING VENDORS
      ============================= */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-2 font-display">
            Top Wedding Vendors
          </h2>
          <p className="text-slate-500 mb-8">
            Trusted specialists for every wedding need
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredVendorCategories.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.category}
                  data-ocid={`featured-vendor.item.${idx + 1}`}
                  className="rounded-3xl border border-slate-100 bg-slate-50 p-6 hover:shadow-md transition"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold font-display">
                    {item.category} Expert
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                  <p className="mt-3 text-sm font-semibold text-slate-600">
                    Starting {item.startingAt}
                  </p>
                  <a
                    href={`https://wa.me/${item.whatsapp}?text=Hi%2C%20I%20need%20a%20${encodeURIComponent(item.category)}%20vendor%20for%20my%20wedding`}
                    target="_blank"
                    rel="noreferrer"
                    data-ocid={`featured-vendor.whatsapp.button.${idx + 1}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================
          FULL VENDOR DIRECTORY
      ============================= */}
      <section id="vendors" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-xs font-semibold uppercase tracking-widest text-rose-600 mb-2">
              Wedding Vendor Directory
            </div>
            <h2 className="text-3xl font-bold font-display">
              Find Trusted Wedding Vendors
            </h2>
            <p className="mt-2 text-slate-500 max-w-xl mx-auto">
              Browse 18+ vendors across all categories — decor, catering,
              photography, mehendi, and more.
            </p>
          </div>

          {/* Vendor Filters */}
          <div className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-100 shadow-sm">
            <Filter className="h-4 w-4 text-slate-400 shrink-0" />
            <div className="flex flex-1 flex-wrap gap-3">
              <div className="flex flex-col gap-1 min-w-[180px]">
                <label
                  htmlFor="vendor-cat-select"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-400"
                >
                  Category
                </label>
                <select
                  id="vendor-cat-select"
                  data-ocid="vendor.category.select"
                  value={vendorCategoryFilter}
                  onChange={(e) => setVendorCategoryFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  {[
                    "All",
                    "Decor",
                    "Catering",
                    "Photography",
                    "Makeup",
                    "DJ & Music",
                    "Guest Rooms",
                    "Mehendi",
                    "Band & Baraati",
                    "Pandit Ji / Rituals",
                    "Wedding Planning",
                    "Florist",
                    "Transport",
                  ].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1 min-w-[160px]">
                <label
                  htmlFor="vendor-city-select"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-400"
                >
                  City
                </label>
                <select
                  id="vendor-city-select"
                  data-ocid="vendor.city.select"
                  value={vendorCityFilter}
                  onChange={(e) => setVendorCityFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  <option value="All">All Cities</option>
                  {vendorCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-sm font-semibold text-rose-600 whitespace-nowrap">
              Showing {filteredVendors.length} vendor
              {filteredVendors.length !== 1 ? "s" : ""}
            </div>
          </div>

          {filteredVendors.length === 0 ? (
            <div
              data-ocid="vendor.empty_state"
              className="mt-16 text-center py-16"
            >
              <Store className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <p className="text-lg font-semibold text-slate-500">
                No vendors found
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Try changing your category or city filter.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredVendors.map((vendor, idx) => {
                const Icon = vendor.icon;
                return (
                  <div
                    key={vendor.name}
                    data-ocid={`vendor.item.${idx + 1}`}
                    className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md flex flex-col"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 shrink-0">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                        ⭐ {vendor.rating}
                      </div>
                    </div>
                    <div className="mt-4 text-lg font-bold font-display">
                      {vendor.name}
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      {vendor.city} · {vendor.category}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600 flex-1">
                      {vendor.about}
                    </p>
                    <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium">
                      Starting: {vendor.budget}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {vendor.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 space-y-1.5">
                      <a
                        href={`tel:${vendor.phone}`}
                        className="flex items-center gap-2 text-sm text-slate-500 hover:text-rose-600 transition"
                      >
                        <Phone className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                        {vendor.phone}
                      </a>
                      <a
                        href={`mailto:${vendor.email}`}
                        className="flex items-center gap-2 text-sm text-slate-500 hover:text-rose-600 transition truncate"
                      >
                        <Mail className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                        {vendor.email}
                      </a>
                      <div className="flex items-start gap-2 text-sm text-slate-400">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400 mt-0.5" />
                        <span className="leading-snug">{vendor.address}</span>
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                      >
                        View Profile
                      </button>
                      <a
                        href={`https://wa.me/91${vendor.phone.replace(/\D/g, "").slice(-10)}?text=Hi%2C%20I%20found%20${encodeURIComponent(vendor.name)}%20on%20Weddnear%20and%20would%20like%20to%20enquire.`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                      >
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ============================
          LIST YOUR BUSINESS CTA
      ============================= */}
      <section className="bg-slate-900 text-white py-16 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-3xl font-bold font-display">
            List Your Business
          </h2>
          <p className="mt-4 text-slate-300 text-lg">
            Get customers &amp; grow your wedding business. Join 350+ verified
            vendors on Weddnear.
          </p>
          <button
            type="button"
            data-ocid="list-business.primary_button"
            onClick={() =>
              document
                .getElementById("list-business")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 px-8 py-3.5 rounded-xl font-bold text-base transition shadow-md"
          >
            Register Now
          </button>
        </div>
      </section>

      {/* ============================
          LIST YOUR BUSINESS FORM
      ============================= */}
      <section
        id="list-business"
        className="mx-auto max-w-7xl px-6 py-20 lg:px-8"
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
            <div className="text-xs font-semibold uppercase tracking-widest text-rose-600 mb-2">
              Vendor Onboarding
            </div>
            <h2 className="text-3xl font-bold font-display">
              Grow on Weddnear
            </h2>
            <p className="mt-3 text-slate-500 leading-7">
              Register your wedding business — halls, caterers, decorators,
              photographers, makeup artists, DJs, and planners. Start receiving
              leads from engaged couples.
            </p>

            {listingSuccess ? (
              <div
                data-ocid="listing.success_state"
                className="mt-6 rounded-2xl bg-green-50 border border-green-200 p-6 text-center"
              >
                <CheckCircle2 className="mx-auto h-10 w-10 text-green-600 mb-3" />
                <h3 className="text-lg font-bold text-green-800">
                  Listing Submitted!
                </h3>
                <p className="mt-2 text-sm text-green-700">
                  Your business has been submitted for review. We&apos;ll get
                  back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setListingSuccess(false)}
                  className="mt-4 rounded-xl bg-green-600 px-5 py-2 text-sm font-semibold text-white hover:bg-green-700 transition"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
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
                    className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-rose-400 transition-colors text-sm bg-white"
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
                    className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-rose-400 transition-colors text-sm bg-white"
                  />
                  <input
                    data-ocid="listing.city.input"
                    value={listingForm.city}
                    onChange={(e) =>
                      setListingForm((f) => ({ ...f, city: e.target.value }))
                    }
                    placeholder="City"
                    className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-rose-400 transition-colors text-sm bg-white"
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
                    className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-rose-400 transition-colors text-sm bg-white"
                  />
                  <input
                    data-ocid="listing.phone.input"
                    value={listingForm.phone}
                    onChange={(e) =>
                      setListingForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    placeholder="Phone / WhatsApp"
                    className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-rose-400 transition-colors text-sm bg-white"
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
                    className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-rose-400 transition-colors text-sm bg-white"
                  />
                </div>
                <textarea
                  data-ocid="listing.about.textarea"
                  value={listingForm.about}
                  onChange={(e) =>
                    setListingForm((f) => ({ ...f, about: e.target.value }))
                  }
                  placeholder="About your business"
                  className="mt-3 min-h-[120px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-rose-400 transition-colors resize-none text-sm bg-white"
                />
                <button
                  type="button"
                  data-ocid="listing.submit_button"
                  onClick={handleListingSubmit}
                  disabled={listingLoading}
                  className="mt-5 rounded-2xl bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60 flex items-center gap-2"
                >
                  {listingLoading && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  {listingLoading ? "Submitting..." : "Submit Business Listing"}
                </button>
              </>
            )}
          </div>

          {/* Pricing Packages */}
          <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-sm">
            <div className="text-lg font-bold font-display mb-6">
              Vendor Pricing Packages
            </div>
            <div className="space-y-4">
              {pricingPackages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
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

      {/* ============================
          AI + BACKEND
      ============================= */}
      <section className="bg-rose-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-rose-100">
              <div className="text-xs font-semibold uppercase tracking-widest text-rose-600 mb-2">
                AI Recommendation Engine
              </div>
              <h2 className="text-2xl font-bold font-display">
                AI-assisted venue and vendor suggestions
              </h2>
              <p className="mt-3 text-slate-500 leading-7">
                The AI engine recommends a complete shortlist based on budget,
                city, event type, guest count, indoor/outdoor preference, and
                preferred vendors.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-rose-100">
              <div className="text-xs font-semibold uppercase tracking-widest text-rose-600 mb-2">
                Backend Structure
              </div>
              <h2 className="text-2xl font-bold font-display">
                Fully working backend modules
              </h2>
              <div className="mt-4 space-y-2 text-slate-600">
                {backendModules.map((module) => (
                  <div
                    key={module}
                    className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-2.5"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-rose-500 shrink-0" />
                    <div className="text-sm">{module}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          CITY + SEO PAGES
      ============================= */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
            <div className="text-xs font-semibold uppercase tracking-widest text-rose-600 mb-2">
              City Pages
            </div>
            <h2 className="text-2xl font-bold font-display">
              Local landing pages for growth
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {cityPages.map((city) => (
                <div key={city.name} className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-lg font-bold font-display">
                    {city.name}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    SEO: {city.seo}
                  </div>
                  <div className="mt-3 text-sm font-semibold text-rose-600">
                    Lead potential: {city.leads}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-widest text-rose-300 mb-2">
              SEO Pages
            </div>
            <h2 className="text-2xl font-bold font-display">
              Pages built to rank on Google
            </h2>
            <div className="mt-6 space-y-3">
              {seoPages.map((page) => (
                <div
                  key={page}
                  className="rounded-xl bg-white/5 px-4 py-3 text-slate-200 text-sm"
                >
                  {page}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          DASHBOARD
      ============================= */}
      <section id="dashboard" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-rose-600">
                Admin Dashboard
              </div>
              <h2 className="mt-1 text-2xl font-bold font-display">
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
                  className="rounded-2xl bg-rose-50 p-6 ring-1 ring-rose-100"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-500">{item.label}</div>
                    <div className="rounded-xl bg-white p-2 text-rose-600">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 text-3xl font-black text-slate-900 font-display">
                    {item.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================
          HOW IT WORKS
      ============================= */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-rose-600 mb-2">
          How It Works
        </div>
        <h2 className="text-3xl font-bold font-display">
          Simple, fast, and wedding-focused
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {howItWorks.map((item, index) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-600 font-bold text-white text-lg">
                {index + 1}
              </div>
              <div className="mt-4 text-xl font-bold font-display">
                {item.title}
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================
          INVESTOR
      ============================= */}
      <section id="investor" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-rose-300 mb-2">
                Investor Pitch
              </div>
              <h2 className="text-3xl font-bold font-display">
                Why Weddnear can scale
              </h2>
              <p className="mt-4 text-slate-300 leading-7">
                Weddnear solves fragmented wedding discovery in India by
                combining local search, AI recommendations, vendor
                subscriptions, city SEO pages, and lead monetization into one
                platform.
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <div className="text-lg font-bold font-display mb-5">
                Business model summary
              </div>
              <div className="grid gap-3 text-sm text-slate-200">
                <div className="rounded-xl bg-white/5 px-4 py-3">
                  Vendor subscription plans
                </div>
                <div className="rounded-xl bg-white/5 px-4 py-3">
                  Featured listings and premium ranking
                </div>
                <div className="rounded-xl bg-white/5 px-4 py-3">
                  Qualified lead fees
                </div>
                <div className="rounded-xl bg-white/5 px-4 py-3">
                  City page sponsorships
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          TEAM
      ============================= */}
      <section id="team" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest text-rose-600 mb-2">
              Leadership Team
            </div>
            <h2 className="text-3xl font-bold font-display">
              The people behind Weddnear
            </h2>
            <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
              Weddnear is led by a focused team working to build India&apos;s
              smartest wedding discovery platform.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
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
                className="rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600 mb-4">
                  <User className="h-7 w-7" />
                </div>
                <div className="text-xl font-bold font-display">
                  {member.name}
                </div>
                <div className="mt-2 text-sm text-rose-600 font-semibold">
                  {member.role}
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  {member.title}
                </div>
                <p className="mt-4 text-sm text-slate-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          CONTACT US
      ============================= */}
      <section data-ocid="contact.section" className="bg-slate-950 px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-rose-400">
            <Mail className="h-3 w-3" /> Get in Touch
          </div>
          <h2 className="font-display mt-4 text-3xl font-bold text-white">
            We&apos;d Love to Hear From You
          </h2>
          <p className="mt-4 text-slate-400">
            Have a question about a venue? Need help planning your dream
            wedding? Reach out — we&apos;re here to help.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
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

      {/* ============================
          ADMIN SETTINGS
      ============================= */}
      <section
        id="admin-settings"
        data-ocid="admin.section"
        className="bg-slate-100 py-12 px-6"
      >
        <div className="mx-auto max-w-xl">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-9 w-9 bg-slate-100 rounded-xl flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Admin Settings
                </h3>
                <p className="text-xs text-slate-500">
                  Configure your OpenAI API key for the AI Wedding Planner
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                API Key Status:
              </span>
              {apiKeyStatusLoading ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  <Loader2 className="h-3 w-3 animate-spin" /> Checking...
                </span>
              ) : apiKeySet ? (
                <span
                  data-ocid="admin.success_state"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full"
                >
                  <ShieldCheck className="h-3 w-3" /> Active
                </span>
              ) : (
                <span
                  data-ocid="admin.error_state"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full"
                >
                  <AlertCircle className="h-3 w-3" /> Not Set
                </span>
              )}
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="admin-api-key"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                <KeyRound className="h-3.5 w-3.5 inline mr-1" />
                OpenAI API Key
              </label>
              <div className="relative">
                <input
                  id="admin-api-key"
                  data-ocid="admin.input"
                  type={showApiKey ? "text" : "password"}
                  placeholder="sk-..."
                  value={adminApiKey}
                  onChange={(e) => setAdminApiKey(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 pr-10 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none transition font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  aria-label="Toggle API key visibility"
                >
                  {showApiKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Your key is stored securely in the backend canister. Get your
                key from{" "}
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  platform.openai.com
                </a>
              </p>
            </div>

            <button
              type="button"
              data-ocid="admin.save_button"
              onClick={handleSaveApiKey}
              disabled={adminSaving}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition disabled:opacity-60"
            >
              {adminSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ShieldCheck className="h-4 w-4" />
              )}
              Save to Backend
            </button>
          </div>
        </div>
      </section>

      {/* ============================
          FOOTER
      ============================= */}
      <footer className="border-t border-white/5 bg-slate-950 px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-2">
          <Heart className="h-4 w-4 text-rose-400 fill-rose-400" />
        </div>
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} APR United. Built by APR United. Founder:
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

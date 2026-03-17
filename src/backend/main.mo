import Array "mo:core/Array";
import Order "mo:core/Order";
import List "mo:core/List";
import Text "mo:core/Text";
import Outcall "./http-outcalls/outcall";

actor {
  // Data Types
  type Lead = {
    name : Text;
    phone : Text;
    email : Text;
    venueInterest : Text;
    message : Text;
  };

  type BusinessListing = {
    businessName : Text;
    ownerName : Text;
    city : Text;
    category : Text;
    phone : Text;
    startingPrice : Nat;
    about : Text;
  };

  // Storage
  let leads = List.empty<Lead>();
  let businessListings = List.empty<BusinessListing>();
  var openAiApiKey : Text = "";

  // Comparison Modules
  module Lead {
    public func compare(a : Lead, b : Lead) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  module BusinessListing {
    public func compare(a : BusinessListing, b : BusinessListing) : Order.Order {
      Text.compare(a.businessName, b.businessName);
    };
  };

  // HTTP Transform (required for outcalls)
  public query func transform(input : Outcall.TransformationInput) : async Outcall.TransformationOutput {
    Outcall.transform(input);
  };

  // OpenAI API Key Management
  public func setOpenAiApiKey(key : Text) : async () {
    openAiApiKey := key;
  };

  public query func getApiKeyStatus() : async Bool {
    openAiApiKey != "";
  };

  // AI Event Planner
  public func generateEventPlan(eventType : Text, city : Text, budget : Text, guestCount : Text, eventDate : Text, preferences : Text) : async Text {
    if (openAiApiKey == "") {
      return "API_KEY_MISSING";
    };

    let userMessage = "Event Type: " # eventType # ", City: " # city # ", Budget: " # budget # ", Guests: " # guestCount # ", Date: " # eventDate # ", Preferences: " # preferences;

    let systemPrompt = "You are an expert Indian event planner specializing in weddings, corporate events, birthdays, and social gatherings. Given the details, create a comprehensive event plan with clear sections: 1) Venue Suggestions, 2) Vendor Recommendations, 3) Event Timeline, 4) Budget Breakdown, 5) Decor & Theme Ideas, 6) Pro Tips. Be practical, detailed, and tailored to Indian events.";

    let requestBody = "{\"model\":\"gpt-4o-mini\",\"messages\":[{\"role\":\"system\",\"content\":\"" # systemPrompt # "\"},{\"role\":\"user\",\"content\":\"" # userMessage # "\"}],\"max_tokens\":1200}";

    let headers : [Outcall.Header] = [
      { name = "Content-Type"; value = "application/json" },
      { name = "Authorization"; value = "Bearer " # openAiApiKey },
    ];

    try {
      let response = await Outcall.httpPostRequest(
        "https://api.openai.com/v1/chat/completions",
        headers,
        requestBody,
        transform,
      );
      response;
    } catch (e) {
      "ERROR: " # e.message();
    };
  };

  // Lead Operations
  public func submitLead(name : Text, phone : Text, email : Text, venueInterest : Text, message : Text) : async () {
    let newLead : Lead = {
      name;
      phone;
      email;
      venueInterest;
      message;
    };
    leads.add(newLead);
  };

  public query func getAllLeads() : async [Lead] {
    leads.toArray().sort();
  };

  // Business Listing Operations
  public func submitBusinessListing(businessName : Text, ownerName : Text, city : Text, category : Text, phone : Text, startingPrice : Nat, about : Text) : async () {
    let newListing : BusinessListing = {
      businessName;
      ownerName;
      city;
      category;
      phone;
      startingPrice;
      about;
    };
    businessListings.add(newListing);
  };

  public query func getAllBusinessListings() : async [BusinessListing] {
    businessListings.toArray().sort();
  };
};

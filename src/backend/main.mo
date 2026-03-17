import Array "mo:core/Array";
import Order "mo:core/Order";
import List "mo:core/List";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

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

  public query ({ caller }) func getAllLeads() : async [Lead] {
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

  public query ({ caller }) func getAllBusinessListings() : async [BusinessListing] {
    businessListings.toArray().sort();
  };
};

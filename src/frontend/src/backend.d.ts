import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Lead {
    name: string;
    email: string;
    venueInterest: string;
    message: string;
    phone: string;
}
export interface BusinessListing {
    startingPrice: bigint;
    about: string;
    ownerName: string;
    city: string;
    businessName: string;
    category: string;
    phone: string;
}
export interface backendInterface {
    getAllBusinessListings(): Promise<Array<BusinessListing>>;
    getAllLeads(): Promise<Array<Lead>>;
    submitBusinessListing(businessName: string, ownerName: string, city: string, category: string, phone: string, startingPrice: bigint, about: string): Promise<void>;
    submitLead(name: string, phone: string, email: string, venueInterest: string, message: string): Promise<void>;
}

import { listing } from ".";

export const publicListing = (data) => {
  return listing.post("publicListing", data);
};

export const privateListing = (data) => {
  return listing.post("privateListing", data);
};


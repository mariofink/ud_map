import axios from "axios";
const CLIENT_ID = "GULEUYNVU3CGUYPN1AKAA122AKFSZZB2XTYUFMA1ML2EWZIC";
const CLIENT_SECRET = "K3U3UPHUSRBQQEN0MBOLI1LVW5DDI22UYCDEBUBWAPJPCPNV";

export default class FoursquareService {
  constructor() {}

  searchVenueAtLocation(location) {
    return new Promise((resolve, reject) => {
      axios
        .get("https://api.foursquare.com/v2/venues/search", {
          params: {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            query: location.name,
            near: "Fulda, Germany",
            intent: "match",
            v: "20180323"
          }
        })
        .then(response => {
          const venue = response.data.response.venues[0];
          if (typeof venue === "undefined") {
            reject("no venue found");
          }
          resolve(response.data.response.venues[0]);
        });
    });
  }

  getVenueDetails(location) {
    return new Promise((resolve, reject) => {
      this.searchVenueAtLocation(location)
        .then(venue => {
          axios
            .get(`https://api.foursquare.com/v2/venues/${venue.id}`, {
              params: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                v: "20180323"
              }
            })
            .then(response => {
              resolve(response.data.response.venue);
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

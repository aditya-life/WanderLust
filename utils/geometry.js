const myAPIKey = process.env.MAP_TOKEN;

const longitudeLatitude = async (place) => {
  try {
    const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(place)}&apiKey=${myAPIKey}`);
    const result = await response.json();
    if (result.features) {
      return result.features[0].geometry // [lon, lat]
    } throw new Error(`No results found for: ${place}`);
  } catch (error) {
    console.error("Error in longitudeLatitude:", error.message);
    throw error; // let caller decide how to handle
  }
};

module.exports = { longitudeLatitude };
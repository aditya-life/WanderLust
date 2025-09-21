const map = new maplibregl.Map({
    container: 'my-map',
    style: `https://maps.geoapify.com/v1/styles/klokantech-basic/style.json?apiKey=${myAPIKey}`,
    center: coordinates, // 👈 Set map center to same pin coords
    zoom: 12
});

// Add navigation controls
map.addControl(new maplibregl.NavigationControl(), 'top-right');
new maplibregl.Marker()
    .setLngLat(coordinates) // [longitude, latitude]
    .addTo(map);

  
console.log(coordinates);
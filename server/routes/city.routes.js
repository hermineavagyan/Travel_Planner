const CityController = require("../controllers/city.controller");
const {authenticate} = require("../config/jwt.config")

module.exports = (app)=> {
app.get("/api/cities", CityController.findAllCities);
app.post("/api/cities", authenticate, CityController.createNewCity);
app.get("/api/cities/:id", CityController.findOneCity);
app.get("/api/citiesbyuser/:username", authenticate, CityController.findAllCitiesByUser);
app.delete("/api/cities/:id", CityController.deleteOneCity);
app.put("/api/cities/:id", CityController.updateCity);
}
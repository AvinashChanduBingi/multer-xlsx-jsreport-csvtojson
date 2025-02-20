const axios = require("axios");
class axiosService
{

 async fetchDataMiddleware(req, res, next) {
  try {
    const response = await axios.get('https://catfact.ninja/fact');
    req.data = response.data;
    next();
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).send('Failed to fetch data from the API');
  }
};
}
module.exports = new axiosService();
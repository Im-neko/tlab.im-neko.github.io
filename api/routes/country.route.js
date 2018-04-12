const express = require('express');
const router = express.Router();
const conf = require('../conf');
const countryCtrl = require('../controllers/country.controller');


router.get('/',　countryCtrl.getCountries);

router.get('/getByArea', countryCtrl.getCountriesByArea);

router.get('/:id', countryCtrl.getCountryByCountryCode);

// router.use( common.checkJWT );
router.post('/', countryCtrl.postCountry);

module.exports = router;

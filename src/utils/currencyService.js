import axios from 'axios';

export async function getAllRates() {
    const response = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=478a2905b0384b2f9d05f1fd960137f1`)
    return response.data.rates
}
import axios from "axios";

//const API_URL = 'https://taxcalculatorzpibackend.herokuapp.com'
const API_URL = "https://taxcalculatorzpibackend.herokuapp.com";

export async function getAllStates() {
  const response = await axios.get(`${API_URL}/states`);
  return response.data;
}

export async function getAllProducts() {
  const response = await axios.get(`${API_URL}/products`);
  return getPreparedProducts(response.data);
}

function getPreparedProducts(products) {
  for (let product of products) {
    product.src_image = product.src_image.trim();
    let words = product.category.split("-");
    let i = 0;
    let newCategory = "";
    for (let word of words) {
      if (i === 0) {
        newCategory = newCategory + word[0].toLowerCase() + word.slice(1);
      } else {
        newCategory = newCategory + word[0].toUpperCase() + word.slice(1);
      }
      i++;
    }
    product.category = newCategory;
  }
  return products;
}

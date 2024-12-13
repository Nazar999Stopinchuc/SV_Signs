import drop from "./modules/drop";
import forms from "./modules/forms";
import mask from "./modules/mask";
import productsRender from "./modules/products-render";
import dropDown from "./modules/drop-down";
import productPageRender from "./modules/product-page-render";
import renderBrokerages from "./modules/brokerages";
import breadCrumbs from "./modules/bread-crumbs";


window.addEventListener('DOMContentLoaded', () => {
  try {drop('#file-input', '.form__label--file', '.form__file-name');} catch (error) {};
  try {forms();} catch (error) {};
  try {mask('[name="phone"]'); } catch (error) {};
  try {productsRender()} catch (error) {};
  try { productPageRender()} catch (error) {};
  try { dropDown() } catch (error) {};
  try { renderBrokerages() } catch (error) {};
  try { breadCrumbs() } catch (error) {};
});

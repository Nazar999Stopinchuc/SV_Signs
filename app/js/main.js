import initializeDropHandlers from "./modules/drop";
import forms from "./modules/forms";
import mask from "./modules/mask";
import productsRender from "./modules/products-render";
import dropDown from "./modules/drop-down";
import productPageRender from "./modules/product-page-render";
import renderBrokerages from "./modules/brokerages";
import breadCrumbs from "./modules/bread-crumbs";
import modals from "./modules/modals";
import search from "./modules/search";
import addToCart from "./modules/add-to-cart";
import basketProcesses from "./modules/basket-processes";
import { setBasketLocalStorageQuont } from "./modules/utyls";
import accordion from "./modules/accardion";
import sentCart from "./modules/sendingCart";
import signUp from "./modules/sign-up";
import sviperInit from "./modules/sviper-init";



window.addEventListener('DOMContentLoaded', () => {
  try { initializeDropHandlers('.form'); } catch (error) { };
  try { initializeDropHandlers('.cart__items'); } catch (error) { };
  try { forms(); } catch (error) { };
  try { signUp(); } catch (error) { };
  try { mask('[name="phone"]'); } catch (error) { };
  try { productsRender() } catch (error) { };
  try { productPageRender() } catch (error) { };
  try { dropDown() } catch (error) { };
  try { renderBrokerages() } catch (error) { };
  try { breadCrumbs() } catch (error) { };
  try { modals('#search', '.search', '.search__close') } catch (error) { };
  try { modals('#show-contacts', '.cart__contact-us', '.cart__close') } catch (error) { };
  try { search() } catch (error) { };
  try { addToCart() } catch (error) { };
  try { setBasketLocalStorageQuont() } catch (error) { };
  try { basketProcesses() } catch (error) { };
  try { accordion('#ditails-btn', '.cart__items') } catch (error) { };
  try { sentCart() } catch (error) { };
  try { sviperInit() } catch (error) { };
});

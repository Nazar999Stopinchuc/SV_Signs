import drop from "./modules/drop";
import forms from "./modules/forms";
import mask from "./modules/mask";
import productsRender from "./modules/products-render";


window.addEventListener('DOMContentLoaded', () => {
  try {drop('#file-input', '.form__label--file', '.form__file-name');} catch (error) {};
  try {forms();} catch (error) {};
  try {mask('[name="phone"]'); } catch (error) {};
  try {productsRender()} catch (error) {};
  

});
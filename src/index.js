import styles from "./scss/main.scss";
import toggleNav from "./js/toggle_nav";
import routes from "./js/routes";



const footerYear=document.querySelector(".Footer-year")
//llamos a objetos
footerYear.textContent=new Date().getFullYear()
toggleNav()
routes()





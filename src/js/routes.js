import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "./configuration";
import "rellax";

import { signIn, signOut} from "./authentication";
import savePhoto from "./save_photos";
import showPhotos from "./show_photos";
import deletePhotos from "./delete_Photo";

import tplAbout from "../html/About.tpl.html";
import tplHome from "../html/Home.tpl.html";
import tplContant from "../html/Contact.tpl.html";
import tplAdmin from "../html/Admin.tpl.html";
import tplAdminAuthentication from "../html/AdminAuthentication.tpl.html";

const routes=()=>{

    const data =document,
    main=data.querySelector(".Main")
    data.addEventListener("DOMContentLoaded",e=>{
        e.preventDefault()
        main.innerHTML=tplHome;
        showPhotos()
    })
    data.addEventListener("click",e=>{
        if(e.target.matches('a[href="#"]')){
            e.preventDefault()
        }
        if(e.target.matches(".home")){
            main.innerHTML=tplHome
            showPhotos()
        }
        else if(e.target.matches(".about")){
            main.innerHTML=tplAbout
            }
        else if(e.target.matches(".contact")){

            main.innerHTML=tplContant
        }
        else if(e.target.matches(".admin")){
            // slider.style.display="none";
            firebase.auth().onIdTokenChanged(user=>{
                if(user){
                    main.innerHTML=tplAdminAuthentication
                    data.querySelector(".Admin-name").textContent=user.displayName
                    data.querySelector(".Admin-avatar").src=user.photoURL
                    savePhoto()
                    showPhotos()
                }else{
                    main.innerHTML=tplAdmin
                }
            })
           
        }else if(e.target.matches("#login")){
            signIn()
        }else if(e.target.matches("#logout")){
          signOut()  
        }
        else if(e.target.matches(".fa-trash")){
           deletePhotos(e.target.dataset.photo, e.target.dataset.id)
          }
    })
    data.addEventListener('change', e => {
        e.preventDefault()
        if (e.target.matches('input[type="file"]')) {
          data.querySelector('.Form-uploader input[type="text"]').value = e.target.value
          data.querySelector("#textarea").value=e.target.value
        }
      })
}
export default routes;

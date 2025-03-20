import { UserStore } from '../../../stores/UserStore';


document.addEventListener('DOMContentLoaded',function(){
    const loginBtn=document.getElementById('login-btn');
    const userForm=document.getElementById('user-form');
    const loginForm=document.getElementById('login-form');
    const registerForm=document.getElementById('register-form');
    const loginFormBtn=document.getElementById('login-form-btn');
    const registerFormBtn=document.getElementById('register-form-btn');
    const registerLink = document.querySelector('.register-link');
    const loginLink = document.querySelector('.login-link');

    const userStore = new UserStore();

    loginBtn.addEventListener('click',function(){
        userForm.style.display='block';
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    })

    registerLink.addEventListener('click',function(e){
        e.preventDefault();
        loginForm.style.display="none";
        registerForm.style.display="block";
    })

    loginLink.addEventListener('click',function(e){
        e.preventDefault();
        registerForm.style.display="none";
        loginForm.style.display="block";
    })

    loginFormBtn.addEventListener('click',async function(e){
        e.preventDefault();

        const email=loginForm.querySelector('input[type="email"]').value;
        const password=loginForm.querySelector('input[type="password"]').value;

        try{
            const data = await userStore.login(email, password);
            alert("Login successful!");
        }catch(error){
            alert('Login failed: ' + error.message);
        }
    })

    registerFormBtn.addEventListener('click',async function(e){
        e.preventDefault();

        const email=registerForm.querySelector('input[type="email"]').value;
        const password=registerForm.querySelector('input[type="password"]').value;

        try{
            const data=await userStore.register(email,password);
            alert("Register successful!");
        }catch(error){
            alert('Register failed: '+ error.message);
        }
    })
})
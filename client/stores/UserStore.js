import { SERVER } from '../config/config';

export class UserStore {

  async login (email, password) {
    try {
      const response = await fetch(`${SERVER}/auth/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      const data = await response.json();

      console.log("Backend response:", response);

      if (response.ok) {
        alert('Login successful');
        localStorage.setItem('token', data.token);
    } else {
        alert(data.message);
    }
    } catch (err) {
      alert('Error logging in. Please try again!');
    }
  }

  async register(email, password){
    try{
      const response=await fetch(`${SERVER}/auth/register`,{
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email,
          password
        })
      })
      const data = await response.json();
      if(response.ok){
        alert('Register successful');
      }
      else{
        alert(data.message);
      }
    }catch(err){
      alert('Error registering. Please try again!');
    }
  }
}


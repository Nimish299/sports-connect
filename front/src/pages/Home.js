import { Link, NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div >
      
      
      <h1>welcome</h1>
        <p>
          Welcome, your ultimate destination for unlocking your athletic
          potential! We understand the importance of personalized guidance in
          sports, and that's why we've created a platform that connects students
          with experienced coaches across a spectrum of disciplines. Discover
          the power of one-on-one coaching tailored to your specific needs and
          goals. Whether you're a beginner looking to master the basics or an
          advanced athlete aiming for peak performance, our platform is designed
          to match you with the perfect coach for your chosen sport.
        </p>
        <div>
       
          <Link class="btn btn-primary my-3 align-items-center justify-content-center" to="/player/login" role="button">Log in</Link>
        </div>
        <div>
          
          <Link class="btn btn-primary my-3" to="/player/signup" role="button">Sign up</Link>
        </div>
        <div>
          <h3>are you a coach ?? </h3>
          <NavLink to="/coach">coach home page</NavLink>
        </div>
      </div>
   
  );
};

export default Home;

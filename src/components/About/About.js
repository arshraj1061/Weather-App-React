import Card from "../UI/Card";
import classes from './About.module.css';

const About = () => {
  return (
    <div className={classes.result}>
      <Card>
        <h2>
          About the Application
        </h2>
      <p>
        This application was created using <i>React</i> and <i>CSS</i>.
      </p>
      <p>The application fetches the data from <i>Mapbox</i> and <i>WeatherBit</i> APIs and renders them to the UI using <i>React.js</i> library provided by <i>JavaScript</i>.</p>

        <h2>
          Meet the Developer
        </h2>
        <section>
            <h4>Arsh Raj</h4>          
          <p><a href="https://www.linkedin.com/in/arsh-raj-311332202/"> Connect with LinkedIn </a></p>
          <p><a href="mailto://arshraj1061@gmail.com">Email</a></p>
        </section>
      </Card>
      </div>
  );
};

export default About;

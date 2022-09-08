import { Container } from 'react-bootstrap';

export const Features = (props) => {
  return (
    <div id='features' className='text-center'>
      <div className='container'>
        <div className='col-lg-12  section-title'>
          <div className='row'>
            <div className='col-sm-12'>
              <h2 className="gold">Technologies</h2>
            </div>
          </div>
          <div className="row">
            <div className='col-xs-6 col-md-3'>
              <img className="crewcoinSm" alt="icon" src={'../img/htmlIcon.png'} />
              <h3>HTML5</h3>
              
            </div>
            <div className='col-xs-6 col-md-3'>
              <img className="crewcoinSm" alt="icon" src={'../img/cssIcon.png'} />
              <h3>CSS3</h3>
              
            </div>
            <div className='col-xs-6 col-md-3'>
              <img className="crewcoinSm" alt="icon" src={'../img/bootstrapIcon.png'} />
              <h3>Bootstrap</h3>
              
            </div>
            <div className='col-xs-6 col-md-3'>
              <img className="crewcoinSm" alt="icon" src={'../img/javascriptIcon.png'} />
              <h3>Javascript</h3>
              
            </div>
            <div className='col-xs-6 col-md-3'>
              <img className="crewcoinSm" alt="icon" src={'../img/nodejsIcon.png'} />
              <h3>NodeJs</h3>
              
            </div>
            <div className='col-xs-6 col-md-3'>
              <img className="crewcoinSm" alt="icon" src={'../img/mongodbIcon.png'} />
              <h3>MongoDb</h3>
              
            </div>
            <div className='col-xs-6 col-md-3'>
              <img className="crewcoinSm" alt="icon" src={'../img/reactIcon.png'} />
              <h3>React</h3>
              
            </div>
            <div className='col-xs-6 col-md-3'>
              <img className="crewcoinSm" alt="icon" src={'../img/electronjsIcon.png'} />
              <h3>Electron</h3>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

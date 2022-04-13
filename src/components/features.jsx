import { Container } from 'react-bootstrap';

export const Features = (props) => {
  return (
    <div id='features' className='text-center'>
      <div className='container'>
        <div className='col-lg-12  section-title'>
        <div className='col-xs-1 col-sm-12'>
          <img id='feature' alt="crewcoinlogo" className="crewcoinMd" src={'../img/crewcoinlogo.png'} />
          </div>
          <div className='row'>
          <div className='col-sm-12'>
              <h2 className="gold">Digital currency you control</h2>
          </div>
          </div>
          {props.data
            ? props.data.map((d, i) => (
              <div key={`${d.title}-${i}`} className='col-xs-6 col-md-3'>
                {' '}
                <i className={d.icon}></i>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </div>
            ))
            : 'Loading...'}
        </div>
      </div>
    </div>
  )
}

export const Testimonials = (props) => {
  return (
    <div id='testimonials'>
      <div className='container'>
        {/* <div className='section-title text-center'>
          <h2>Portfolio</h2>
        </div> */}
        <div className='row text-center borderDash'>
          <div className='col-md-4 col-xs-6'>
            <div className='testimonial-image'>
              <img className='previewImg' src={'../img/crewcoinPreview.png'} alt='testimonial' />
            </div>
            <h3>Crew Coin</h3>
          </div>
          <div className='col-md-4 col-xs-6'>
            <div className='testimonial-image'>
              <img className='previewImg' src={'../img/chiplockedPreview.gif'} alt='testimonial' />
            </div>
            <h3>Chip Locked</h3>
          </div>
          <div className='col-md-4 col-xs-6'>
            <div className='testimonial-image'>
              <img className='previewImg' src={'../img/wenventurePreview.png'} alt='testimonial' />
            </div>
            <h3>Wenventure Inc</h3>
          </div>
          <div className='col-md-4 col-xs-6'>
            <div className='testimonial-image'>
              <img className='previewImg' src={'../img/paddlePreview.png'} alt='testimonial' />
            </div>
            <h3>Paddleboard PA</h3>
          </div>
          <div className='col-md-4 col-xs-6'>
            <div className='testimonial-image'>
              <img className='previewImg' src={'../img/foxPreview.png'} alt='testimonial' />
            </div>
            <h3>Fox Landscaping</h3>
          </div>
          <div className='col-md-4 col-xs-6'>
            <div className='testimonial-image'>
              <img className='previewImg' src={'../img/crewcoinappPreview2.png'} alt='testimonial' />
            </div>
            <h3>Crew Coin App - React Native</h3>
          </div>
        </div>
      </div>
    </div>
  );
}


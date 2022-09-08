import { Image } from "./image";

export const Gallery = (props) => {
  return (
    <div id='portfolio' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2 className="goldscreen">App Screen Shots</h2>
        </div>
        <div className='row'>
          <div className='portfolio-items'>
            {props.data
              ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className='col-xs-6 col-sm-3 col-md-3 col-lg-3'>
                  <Image title={d.title} largeImage={d.largeImage} smallImage={d.smallImage} />
                </div>
              ))
              : 'Loading...'}
            <div className='col-xs-12'>
            <a href="https://apps.apple.com/us/app/crew-coin/id1611964163" >
                <img alt="crewcoinlogo" className="appstore" src={'./img/appstore.png'} />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.davwill19.crewcoin">
                <img alt="crewcoinlogo" className="appstore" src={'./img/playstore.png'} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

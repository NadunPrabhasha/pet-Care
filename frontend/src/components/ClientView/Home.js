import icon1 from '../../assets/1.png'
import icon2 from '../../assets/2.png'
import icon3 from '../../assets/3.png'
import icon4 from '../../assets/6.png'

const Home = () => {
    return ( 
        <>
            <div className="hero">
                <div className="heroText">
                    <h1>PETS ARE OUR</h1>
                    <h2>PASSION</h2>
                </div>
            </div>
            <div className="middleContainer">
                <div className="middleContainerHeading">Care For Every Type and Breed of Pet</div>
                <div className="middleContainerText">At Fetch! Pet Care, we truly love and care for every type and breed of pet. Our pet care services are tailored to meet the individual needs of each animal and are designed to ensure that they are as happy and healthy as possible. We understand that it takes more than just love to provide quality pet care, so we strive to provide the highest standard of care to each and every pet.</div>
            </div>
            <div className="ourServices">
                <div className="ourServicesElement">
                    <div className="ourServicesElementImage"><img src={icon1} alt="" /></div>
                    <div className="ourServicesElementText">Long-term Care</div>
                </div>
                <div className="ourServicesElement">
                    <div className="ourServicesElementImage"><img src={icon2} alt="" /></div>
                    <div className="ourServicesElementText">Online Store</div>
                </div>
                <div className="ourServicesElement">
                    <div className="ourServicesElementImage"><img src={icon3} alt="" /></div>
                    <div className="ourServicesElementText">Treaments</div>
                </div>
                <div className="ourServicesElement">
                    <div className="ourServicesElementImage"><img src={icon4} alt="" /></div>
                    <div className="ourServicesElementText">Medicine</div>
                </div>
            </div>
            {/* <div className="contactUs">

            </div> */}
        </>
     );
}
 
export default Home;
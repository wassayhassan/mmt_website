import React, {useContext} from 'react';
import Banner from './Banner';
import Footer from './Footer';
import HowItWorks from './HowItWorks';
import Instruction from './Instruction';
import Instructors from './Instructors';
import KidSafe from './KidSafe';
import PrivateTutoring from './PrivateTutoring';
import Subscribe from './Subscribe';
import Testimonials from './Testimonials';
import OurServices from './Our Services';
import BlogContent from '../Blog/MainPage_BlogContent';
import { UserContext } from '../context/UserContext';

const Home = () => {
    const {user} = useContext(UserContext)
    console.log(user)
    return (
        <div>
            <Banner />
            <HowItWorks />
            <OurServices />
            <Instructors />
            <PrivateTutoring />
            <Testimonials />
            <Instruction />
            <BlogContent />
            <KidSafe />
            <Subscribe />
            <Footer />
        </div>
    );
};

export default Home;
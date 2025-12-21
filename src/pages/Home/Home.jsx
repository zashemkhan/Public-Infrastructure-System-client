import React from "react";

import Banner from "../../components/Banner";
import Features from "../../components/Features";
import LatestResolved from "../../components/LatestResolved";
// import LatestResolved from "../../components/LatestResolved";
// import Footer from "../../components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <LatestResolved />
      <Features />
      
    </div>
  );
};

export default Home;

import React from 'react'
import TopNav from '../components/top-nav'
import MainNav from '../components/main-nav';
import Footer from '../components/footer';
import SideQuickLinks from '../components/side-quicklinks'
import SideAnnouncements from '../components/side-announcements'
import Facility from '../facilities/facility'

const Facilities = () => (
  <div id="Facilities">
    <TopNav />
    <MainNav />
    <div className="container grid">
      <SideQuickLinks />
      <SideAnnouncements />
      <div id="UniversityFacilities" className="grid-item">
        <h3 className="section header">University Facilities</h3>
        <Facility
          title={"Canteen"}
          backgroundImage={"/images/facilities/canteen/front.jpg"}
          description={
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur imperdiet 
            commodo ligula at scelerisque. Nulla suscipit, neque vel bibendum tincidunt, 
            ipsum elit ultricies nibh, in vulputate lorem risus auctor nulla. Nullam 
            tortor lectus, suscipit a eros ut, imperdiet posuere dolor. Pellentesque 
            gravida non mauris eget ultricies. Pellentesque auctor tortor vitae risus 
            rhoncus ullamcorper. Aenean fringilla dapibus dui, vel ultrices dui pretium 
            varius.`
          }
        />
         <Facility
          title={"Canteen"}
          backgroundImage={"/images/facilities/canteen/front.jpg"}
          description={
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur imperdiet 
            commodo ligula at scelerisque. Nulla suscipit, neque vel bibendum tincidunt, 
            ipsum elit ultricies nibh, in vulputate lorem risus auctor nulla. Nullam 
            tortor lectus, suscipit a eros ut, imperdiet posuere dolor. Pellentesque 
            gravida non mauris eget ultricies. Pellentesque auctor tortor vitae risus 
            rhoncus ullamcorper. Aenean fringilla dapibus dui, vel ultrices dui pretium 
            varius.`
          }
        />
         <Facility
          title={"Canteen"}
          backgroundImage={"/images/facilities/canteen/front.jpg"}
          description={
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur imperdiet 
            commodo ligula at scelerisque. Nulla suscipit, neque vel bibendum tincidunt, 
            ipsum elit ultricies nibh, in vulputate lorem risus auctor nulla. Nullam 
            tortor lectus, suscipit a eros ut, imperdiet posuere dolor. Pellentesque 
            gravida non mauris eget ultricies. Pellentesque auctor tortor vitae risus 
            rhoncus ullamcorper. Aenean fringilla dapibus dui, vel ultrices dui pretium 
            varius.`
          }
        />
         <Facility
          title={"Canteen"}
          backgroundImage={"/images/facilities/canteen/front.jpg"}
          description={
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur imperdiet 
            commodo ligula at scelerisque. Nulla suscipit, neque vel bibendum tincidunt, 
            ipsum elit ultricies nibh, in vulputate lorem risus auctor nulla. Nullam 
            tortor lectus, suscipit a eros ut, imperdiet posuere dolor. Pellentesque 
            gravida non mauris eget ultricies. Pellentesque auctor tortor vitae risus 
            rhoncus ullamcorper. Aenean fringilla dapibus dui, vel ultrices dui pretium 
            varius.`
          }
        />
      </div>
    </div>
    <Footer />
  </div>
)

export default Facilities
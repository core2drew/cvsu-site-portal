import React from 'react'
import Sidebar from 'Components/sidebar'
import Facility from 'SiteComponents/facility'

const Facilities = () => (
  <div id="Facilities">
    <div className="container grid">
      <Sidebar 
        id="SideQuickLinks" 
        title="Quick Links"
        links={[
          {
            to: '/',
            slug: 'Admission Requirements'
          },
          {
            to: '/',
            slug: 'Retention Policies'
          },
          {
            to: '/',
            slug: 'Course Offered'
          }
        ]} 
      />
      <Sidebar 
        id="SideAnnouncements" 
        title="Announcements"
        links={[
          {
            to: '/',
            slug: 'Application for Admission Exam for 1st Semester SY 2019-2020'
          },
          {
            to: '/',
            slug: 'Grade 11 Application for SY 2019-2020'
          },
          {
            to: '/',
            slug: 'Grade 7 Application for SY 2019-2020'
          },
          {
            to: '/',
            slug: 'Deadline of Submission of Requirements for Admission Exam'
          }
        ]} 
      />
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
  </div>
)

export default Facilities
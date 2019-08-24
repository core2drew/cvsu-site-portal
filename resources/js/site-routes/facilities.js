import React from "react";
import Facility from "SiteComponents/facility";

const Facilities = () => (
    <div id="Facilities">
        <div className="container grid">
            <div id="UniversityFacilities" className="grid-item">
                <h3 className="section header">University Facilities</h3>
                <Facility
                    title={"Canteen"}
                    sliderImages={[
                        "/images/facilities/canteen-1.jpg",
                        "/images/facilities/canteen-2.jpg",
                        "/images/facilities/canteen-3.jpg"
                    ]}
                    description={`Is a place where food is provided in a college or other organization. It also plays a vital role in healthy foods and creating a school culture of healthy eating.`}
                />
                <Facility
                    title={"Library"}
                    sliderImages={[
                        "/images/facilities/library-1.jpg",
                        "/images/facilities/library-2.jpg"
                    ]}
                    description={`It provide a flexible space with a wide and inclusive range of resources to support learning and teaching throughout the school.`}
                />
                <Facility
                    title={"Clinic"}
                    sliderImages={[
                        "/images/facilities/clinic-1.jpg",
                        "/images/facilities/clinic-2.jpg"
                    ]}
                    description={`To provide education and counseling in a variety of health and wellness topics, to serve as a medical resource and To provide emergency care for illness or injury while at school.`}
                />
                <Facility
                    title={"Classroom"}
                    sliderImages={[
                        "/images/facilities/classroom-1.jpg",
                        "/images/facilities/classroom-2.jpg",
                        "/images/facilities/classroom-3.jpg"
                    ]}
                    description={`It provides a space where learning can take place uninterrupted by outside distractions.`}
                />
                <Facility
                    title={"Information Desk"}
                    sliderImages={["/storage/facilities/front.jpg"]}
                    description={`It aims to help students make the very best of their time and it can  provide a high-quality information and enquiry service which is accessible to all students.`}
                />
                <Facility
                    title={"Department of Information Technology"}
                    sliderImages={["/images/facilities/it-dept.jpg"]}
                    description={`It handles all the technological issues that arise.`}
                />
                <Facility
                    title={"Science Lab"}
                    sliderImages={["/storage/facilities/front.jpg"]}
                    description={`It is a facility that provides controlled conditions in which scientific research, experiments and measurement may be performed.`}
                />
            </div>
        </div>
    </div>
);

export default Facilities;

import React from "react";
import Facility from "SiteComponents/facility";
import SideLinks from "SiteComponents/sidelinks";
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
                        "/images/facilities/clinic-2.jpg",
                        "/images/facilities/clinic-3.jpg"
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
                    title={"El Chabacano"}
                    sliderImages={[
                        "/images/facilities/el-chabacano-1.jpg",
                        "/images/facilities/el-chabacano-2.jpg",
                        "/images/facilities/el-chabacano-3.jpg"
                    ]}
                    description={`It is a facility that provides controlled conditions in which scientific research, experiments and measurement may be performed.`}
                />
                <Facility
                    title={"IT Laboratory"}
                    sliderImages={["/images/facilities/it-laboratory.jpg"]}
                    description={`It is a facility that provides controlled conditions in which scientific research, experiments and measurement may be performed.`}
                />
                <Facility
                    title={"Covered Court"}
                    sliderImages={["/images/facilities/covered-court.png"]}
                    description={`It is a facility that provides controlled conditions in which scientific research, experiments and measurement may be performed.`}
                />
            </div>
            <SideLinks />
        </div>
    </div>
);

export default Facilities;

import React, {useState} from 'react';
import ProjectDetailsModal from "./ProjectDetailsModal";


function Projects(props) {
  const [detailsModalShow, setdetailsModalShow] = useState(false)
  const [deps, setdeps] = useState({})

  const importAll = require =>
    require.keys().reduce((acc, next) => {
      acc[next.replace("./", "")] = require(next);
      return acc;
    }, {});

  const images = importAll(
    require.context("../assets/images/portfolio", false, /\.(png|jpe?g|svg)$/)
  );

  if (props.resumeBasicInfo) {
    var resumeProjects = props.resumeProjects;
    var resumeBasicInfo = props.resumeBasicInfo;
  }

  let detailsModalShowfunc = (data) => {
    setdetailsModalShow(true);
    setdeps(data)
  };

  let detailsModalClosefunc = () => setdetailsModalShow(false);

  return (
    <section id="portfolio">
      <div className="col-md-12">
        <h1 className="section-title" style={{ color: "black" }}>
          <span>{resumeBasicInfo.section_name.projects}</span>
        </h1>
        <div className="col-md-12 mx-auto">
          <div className="row mx-auto">
            {resumeProjects.map((project, i) => (
              <div className="col-sm-12 col-md-6 col-lg-4">
                <span className="portfolio-item d-block" >
                  <div className="foto" onClick={() => detailsModalShowfunc(project)}>
                    <div >
                      <img src={images[Object.keys(images)[project.images[0]]]} style={{ height: '350px' }} alt="projectimg"/>
                      <span className="project-date">{project.startDate}</span>
                      <br />
                      <p className="project-title-settings mt-3">
                        {project.title}
                      </p>
                    </div>
                  </div>
                </span>
              </div>
            ))}
          </div>
        </div>
        <ProjectDetailsModal
          show={detailsModalShow}
          onHide={detailsModalClosefunc}
          data={deps}
        />
      </div>
    </section>
  );
}

export default Projects;

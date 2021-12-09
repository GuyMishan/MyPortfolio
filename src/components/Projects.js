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
          <div className="row mx-auto">
            {resumeProjects.map((project, i) => (
              <div className="col">
                <span className="portfolio-item d-block" style={{height:'100%'}}>
                  <div className="foto" onClick={() => detailsModalShowfunc(project)} style={{height:'100%'}}>
                    <div style={{height:'100%'}}>
                      <img src={images[Object.keys(images)[project.images[0]]]} alt="projectimg"/>
                      <span className="project-date">{project.startDate}</span>
                      <br />
                      <p className="project-title-settings">
                        {project.title}
                      </p>
                    </div>
                  </div>
                </span>
              </div>
            ))}
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

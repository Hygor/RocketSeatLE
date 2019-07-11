const express = require("express");

const server = express();
server.use(express.json());
server.use((req, res, next) => {
  console.time("Request");
  console.log(`[ ${req.method} : ${req.url} ]`);
  next();
  console.timeEnd("Request");
});

const projects = require("./data/projects.json");

function checkProjectID(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);
  console.log(project);
  if (!project) {
    return res.status(400).json({ error: "Project not found!" });
  }
  return next();
}

function checkProjectInArray(req, res, next) {
  const project = projects.find(p => p.id === id);
  if (!project) {
    return res.status(400).json({
      error: "Project does not exists"
    });
  }
  req.project = project;
  return next();
}

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", checkProjectID, (req, res) => {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);
  return res.json(project);
});

server.post("/projects", (req, res) => {
  const { id, title, tasks } = req.body;
  const project = {
    id,
    title,
    tasks
  };
  projects.push(project);
  return res.json(project);
});

server.put("/projects/:id", checkProjectID, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  // console.log(id);
  // console.log(title);
  const project = projects.find(p => p.id === id);
  project.title = title;
  return res.json(project);
});

server.delete("/projects/:id", checkProjectID, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id === id);
  projects.splice(projectIndex, 1);
  return res.send();
});

server.listen(3000);

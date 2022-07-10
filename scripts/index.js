const eprojects = document.getElementById("projects");

function materialIcon(item) {
  const icon = document.createElement("a");
  icon.classList.add("material-icons");
  icon.innerText = item;
  icon.target = "_blank";
  return icon;
}

async function getProjects() {
  const response = await fetch("resources/projects.json");
  const data = await response.json();
  return data;
}

async function sortProjects(projects) {
  const categoryOrder = ["Final","Side Projects", "Projects", "Exercises"];

  return projects.sort((a, b) => {
    for(const category of categoryOrder) {
      if(a.categories.includes(category)) {
        if(b.categories.includes(category)) {
        } else {
          return -1;
        }
      } else if(b.categories.includes(category)) {
        return 1;
      }
    }

    return String(b.repo).localeCompare(String(a.repo))
  });
}

function renderProjects(projects) {
  projects.forEach((project) => {
    if (project.image == null) {
      project.image = project.repo + ".png";
    }

    const container = document.createElement("div");
    container.classList.add("container");
    container.style.background = `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url('images/${project.image}') no-repeat center`;

    const title = document.createElement("h3");
    title.innerText = project.name;

    const description = document.createElement("p");
    description.innerText = project.description;

    const categories = document.createElement("div");
    categories.classList.add("categories");

    project.categories.forEach((category) => {
      const div = document.createElement("div");
      div.innerText = category;
      categories.append(div);
    });

    const links = document.createElement("div");
    links.classList.add("links");

    const source = materialIcon("code");
    source.href = `https://www.github.com/LittleTealeaf/${project.repo}`;

    const website = materialIcon("language");
    website.href = `https://littletealeaf.github.io/${project.repo}`;

    links.append(source, website);

    container.append(title, description, categories, links);

    eprojects.append(container);
  });
}

getProjects().then(sortProjects).then(renderProjects);

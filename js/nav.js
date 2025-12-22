document.addEventListener("DOMContentLoaded", () => {
  fetch("data/nav.json")
    .then(res => res.json())
    .then(data => {
      const nav = document.createElement("nav");
      nav.classList.add("main-nav");
      const ul = document.createElement("ul");
      data.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = item.url;
        a.textContent = item.name;
        li.appendChild(a);
        ul.appendChild(li);
      });
      nav.appendChild(ul);
      document.body.prepend(nav);
    });
});

// active navbar link
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", function (event) {
  sections.forEach((section) => {
    let top = window.scrollY + 250;
    let offset = section.offsetTop;
    let height = section.offsetHeight;
    let id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      document.querySelectorAll(".active").forEach((a) => {
        a.classList.remove("active");
      });

      document.querySelector("[href*=" + id + "]").classList.add("active");
    }
  });
});

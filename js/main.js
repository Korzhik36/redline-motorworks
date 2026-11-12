  // Фильтрация карточек каталога по названию и направлению.
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("projectSearch");
  const categoryFilter = document.getElementById("categoryFilter");
  const projectItems = document.querySelectorAll(".project-item");
  const emptyState = document.getElementById("emptyState");

  function filterProjects() {
    if (!projectItems.length) return;
    const query = (searchInput?.value || "").trim().toLowerCase();
    const category = categoryFilter?.value || "all";
    let visibleCount = 0;

    projectItems.forEach((item) => {
      const matchesText = (item.dataset.search || "").includes(query);
      const matchesCategory = category === "all" || item.dataset.category === category;
      const visible = matchesText && matchesCategory;
      item.classList.toggle("d-none", !visible);
      if (visible) visibleCount += 1;
    });

    emptyState?.classList.toggle("d-none", visibleCount !== 0);
  }

  searchInput?.addEventListener("input", filterProjects);
  categoryFilter?.addEventListener("change", filterProjects);

  // Передаём название, описание и адрес страницы выбранного проекта в Bootstrap modal.
  const projectModal = document.getElementById("projectModal");
  projectModal?.addEventListener("show.bs.modal", (event) => {
    const trigger = event.relatedTarget;
    if (!trigger) return;
    projectModal.querySelector("#projectModalLabel").textContent = trigger.dataset.project || "Проект REDLINE";
    projectModal.querySelector("#projectModalDescription").textContent = trigger.dataset.description || "Описание проекта пока не добавлено.";
    const modalLink = projectModal.querySelector("#projectModalLink");
    if (modalLink) modalLink.href = trigger.dataset.url || "product.html";
  });

  // Клиентская проверка формы. Серверной отправки в учебном проекте нет.
  const orderForm = document.getElementById("orderForm");
  orderForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const success = document.getElementById("formSuccess");
    const error = document.getElementById("formError");
    success?.classList.add("d-none");
    error?.classList.add("d-none");

    if (!orderForm.checkValidity()) {
      event.stopPropagation();
      orderForm.classList.add("was-validated");
      error?.classList.remove("d-none");
      orderForm.querySelector(":invalid")?.focus();
      return;
    }

    orderForm.classList.remove("was-validated");
    success?.classList.remove("d-none");
    orderForm.reset();
    success?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
// Анимация числовых показателей
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (counter) => {
        const target = Number(counter.dataset.target);
        const duration = 1800;
        const startTime = performance.now();
        const padding = Number(counter.dataset.pad || 0);

        const updateCounter = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Плавное замедление в конце анимации
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const currentValue = Math.floor(easeOut * target);

            counter.textContent = String(currentValue).padStart(padding, '0');

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = String(target).padStart(padding, '0');
            }
        };

        requestAnimationFrame(updateCounter);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => observer.observe(counter));
});
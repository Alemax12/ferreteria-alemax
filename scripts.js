const productos = [
  { id: 1, nombre: "Martillo", categoria: "Herramientas", autor: "Ferretería Alemax", descripcion: "Martillo de acero forjado", imagen: "img/martillo.webp" },
  { id: 2, nombre: "Taladro", categoria: "Eléctricos", autor: "Ferretería Alemax", descripcion: "Taladro inalámbrico de 20V", imagen: "img/taladro.webp" },
  { id: 3, nombre: "Llave Inglesa", categoria: "Herramientas", autor: "Ferretería Alemax", descripcion: "Llave ajustable de 12 pulgadas", imagen: "img/llaveinglesa.webp" },
  { id: 4, nombre: "Destornillador Estria", categoria: "Herramientas", autor: "Ferretería Alemax", descripcion: "Destornillador con cabeza de estria", imagen: "img/estria.webp" },
  { id: 5, nombre: "Formón", categoria: "Herramientas", autor: "Ferretería Alemax", descripcion: "Formon para madera", imagen: "img/formon.webp" },
  { id: 6, nombre: "Llave", categoria: "Herramientas", autor: "Ferretería Alemax", descripcion: "Llave hombre solo", imagen: "img/hombresolo.webp" },
  { id: 7, nombre: "Lijadora", categoria: "Eléctricos", autor: "Ferretería Alemax", descripcion: "Lijadora Electrica", imagen: "img/lijadora.webp" },
  { id: 8, nombre: "Cegueta", categoria: "Corte", autor: "Ferretería Alemax", descripcion: "Cuegueta para cortar", imagen: "img/cegueta.webp" }
];

// Destacados
if (document.getElementById("productos-destacados")) {
  const container = document.getElementById("productos-destacados");
  productos.slice(0, 3).forEach(p => {
    container.innerHTML += `<div class="col-md-4">
      <div class="card mb-3" onclick="verDetalle(${p.id})">
        <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
        <div class="card-body">
          <h5 class="card-title">${p.nombre}</h5>
          <p class="card-text">${p.descripcion}</p>
        </div>
      </div>
    </div>`;
  });

  const categorias = [...new Set(productos.map(p => p.categoria))];
  const catContainer = document.getElementById("categorias");
  categorias.forEach(cat => {
    catContainer.innerHTML += `<span class="badge bg-secondary">${cat}</span>`;
  });
}

// Imagenes
if (document.getElementById("galeria")) {
  const galeria = document.getElementById("galeria");
  const filtroTags = document.getElementById("filtroCategoriaTags");
  const categorias = ["Todas", ...new Set(productos.map(p => p.categoria))];

  categorias.forEach(cat => {
  const span = document.createElement("span");
  span.className = "tag filter-tag";
  span.textContent = cat;
  span.dataset.cat = cat;
  filtroTags.appendChild(span);
});

filtroTags.addEventListener("click", e => {
  if (e.target.matches(".filter-tag")) {
    document.querySelectorAll(".filter-tag").forEach(t => t.classList.remove("active"));
    e.target.classList.add("active");
    cargarGaleria(e.target.dataset.cat);
  }
});

  cargarGaleria("Todas");

  function cargarGaleria(filtroCat) {
    galeria.innerHTML = "";
    productos.filter(p => filtroCat === "Todas" || p.categoria === filtroCat)
      .forEach(p => {
        galeria.innerHTML += `<div class="col-md-4">
          <div class="card mb-3" onclick="verDetalle(${p.id})">
            <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
            <div class="card-body">
              <h5 class="card-title">${p.nombre}</h5>
            </div>
          </div>
        </div>`;
      });
  }
}

// Detail
function verDetalle(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  document.getElementById("modalImagen").src = producto.imagen;
  document.getElementById("modalNombre").textContent = producto.nombre;
  document.getElementById("modalDescripcion").textContent = producto.descripcion;
  document.getElementById("modalAutor").textContent = producto.autor;
  document.getElementById("modalCategoria").textContent = producto.categoria;

  const modal = new bootstrap.Modal(document.getElementById('modalDetalle'));
  modal.show();
}

//Form
const form = document.getElementById("formContacto");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    alert("Gracias por contactarnos, nos pondremos en contacto pronto.");
    form.reset();
    form.classList.remove("was-validated");
  });
}
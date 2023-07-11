function Alumno(nombre, apellidos, edad) {
  this.nombre = nombre;
  this.apellidos = apellidos;
  this.edad = edad;
  this.materias = [];
  this.calificaciones = [];
}

// Datos de ejemplo para inicializar
var alumnos = [
  new Alumno("Juan", "Pérez", 18),
  new Alumno("María", "Gómez", 19),
  new Alumno("Carlos", "López", 20)
];

// Función para agregar un alumno
function agregarAlumno() {
  var nombre = document.getElementById("nombre").value;
  var apellidos = document.getElementById("apellidos").value;
  var edad = document.getElementById("edad").value;

  var alumno = new Alumno(nombre, apellidos, edad);
  alumnos.push(alumno);

  actualizarListas();
}

// Función para actualizar las listas desplegables de alumnos
function actualizarListas() {
  var alumnoSelect = document.getElementById("alumno");
  var promedioAlumnoSelect = document.getElementById("promedioAlumno");
  var promedioGrupoSelect = document.getElementById("promedioGrupo");

  alumnoSelect.innerHTML = "";
  promedioAlumnoSelect.innerHTML = "";
  promedioGrupoSelect.innerHTML = "";

  for (var i = 0; i < alumnos.length; i++) {
    var option = document.createElement("option");
    option.text = alumnos[i].nombre + " " + alumnos[i].apellidos;
    option.value = i;
    alumnoSelect.add(option);

    var promedioOption = document.createElement("option");
    promedioOption.text = alumnos[i].nombre + " " + alumnos[i].apellidos;
    promedioOption.value = i;
    promedioAlumnoSelect.add(promedioOption);
  }

  for (var j = 0; j < grupos.length; j++) {
    var grupoOption = document.createElement("option");
    grupoOption.text = grupos[j].nombre;
    grupoOption.value = j;
    promedioGrupoSelect.add(grupoOption);
  }
}

// Función para asignar calificación a un alumno
function asignarCalificacion() {
  var alumnoIndex = document.getElementById("alumno").value;
  var materia = document.getElementById("materia").value;
  var calificacion = document.getElementById("calificacion").value;

  alumnos[alumnoIndex].materias.push(materia);
  alumnos[alumnoIndex].calificaciones.push(calificacion);

  actualizarListas();
}

// Definir objeto prototipo de Grupo
function Grupo(nombre) {
  this.nombre = nombre;
  this.alumnos = [];
}

// Datos de ejemplo para inicializar
var grupos = [
  new Grupo("Grupo 1"),
  new Grupo("Grupo 2"),
  new Grupo("Grupo 3")
];

// Función para crear un grupo y asignar alumnos
function crearGrupo() {
  var grupoNombre = document.getElementById("grupo").value;

  var grupo = new Grupo(grupoNombre);
  grupos.push(grupo);

  var alumnoIndex = document.getElementById("alumno").value;
  grupos[grupos.length - 1].alumnos.push(alumnos[alumnoIndex]);

  actualizarListas();
}

// Función para buscar alumno por nombre
function buscarPorNombre() {
  var nombreBuscado = document.getElementById("buscarNombre").value;
  var resultado = [];

  for (var i = 0; i < alumnos.length; i++) {
    if (alumnos[i].nombre.toLowerCase() === nombreBuscado.toLowerCase()) {
      resultado.push(alumnos[i]);
    }
  }

  mostrarResultadoBusqueda(resultado);
}

// Función para buscar alumno por apellido
function buscarPorApellido() {
  var apellidoBuscado = document.getElementById("buscarApellido").value;
  var resultado = [];

  for (var i = 0; i < alumnos.length; i++) {
    if (alumnos[i].apellidos.toLowerCase() === apellidoBuscado.toLowerCase()) {
      resultado.push(alumnos[i]);
    }
  }

  mostrarResultadoBusqueda(resultado);
}

// Función para mostrar el resultado de la búsqueda en la interfaz
function mostrarResultadoBusqueda(resultado) {
  var listaAlumnos = document.getElementById("listaAlumnos");
  listaAlumnos.innerHTML = "";

  if (resultado.length === 0) {
    var listItem = document.createElement("li");
    listItem.textContent = "No se encontraron resultados.";
    listaAlumnos.appendChild(listItem);
  } else {
    for (var i = 0; i < resultado.length; i++) {
      var listItem = document.createElement("li");
      listItem.textContent =
        resultado[i].nombre +
        " " +
        resultado[i].apellidos +
        " (Edad: " +
        resultado[i].edad +
        ")";
      listaAlumnos.appendChild(listItem);
    }
  }
}

// Función para calcular el promedio de un alumno
function calcularPromedioAlumno() {
  var alumnoIndex = document.getElementById("promedioAlumno").value;
  var calificaciones = alumnos[alumnoIndex].calificaciones;

  if (calificaciones.length === 0) {
    alert("El alumno no tiene calificaciones registradas.");
    return;
  }

  var suma = 0;
  for (var i = 0; i < calificaciones.length; i++) {
    suma += parseFloat(calificaciones[i]);
  }

  var promedio = suma / calificaciones.length;
  alert("El promedio del alumno es: " + promedio.toFixed(2));
}

// Función para calcular el promedio de un grupo
function calcularPromedioGrupo() {
  var grupoIndex = document.getElementById("promedioGrupo").value;
  var alumnosGrupo = grupos[grupoIndex].alumnos;

  var suma = 0;
  var totalCalificaciones = 0;

  for (var i = 0; i < alumnosGrupo.length; i++) {
    var calificaciones = alumnosGrupo[i].calificaciones;
    for (var j = 0; j < calificaciones.length; j++) {
      suma += parseFloat(calificaciones[j]);
      totalCalificaciones++;
    }
  }

  if (totalCalificaciones === 0) {
    alert("El grupo no tiene calificaciones registradas.");
    return;
  }

  var promedio = suma / totalCalificaciones;
  alert("El promedio del grupo es: " + promedio.toFixed(2));
}

// Función para ordenar los alumnos
function ordenarAlumnos() {
  var ordenamiento = document.getElementById("ordenamiento").value;
  var listaAlumnos = alumnos.slice();

  listaAlumnos.sort(function (a, b) {
    var promedioA = calcularPromedio(a.calificaciones);
    var promedioB = calcularPromedio(b.calificaciones);

    if (ordenamiento === "ascendente") {
      return promedioA - promedioB;
    } else {
      return promedioB - promedioA;
    }
  });

  mostrarResultadoBusqueda(listaAlumnos);
}

// Función para calcular el promedio de un arreglo de calificaciones
function calcularPromedio(calificaciones) {
  if (calificaciones.length === 0) {
    return 0;
  }

  var suma = 0;
  for (var i = 0; i < calificaciones.length; i++) {
    suma += parseFloat(calificaciones[i]);
  }

  return suma / calificaciones.length;
}

// Actualizar las listas desplegables al cargar la página
window.onload = function () {
  actualizarListas();
};
/**
 * This function renders the objects in the array sent to it as a parameter to the screen.
 * @param {Array} pArray
 */
const renderCourseList = (pArray) => {
  courseContainer.innerHTML = pArray
    .map((course) => {
      return `
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-5">
        <div class="card">
          <img src="${course.image}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${course.name}</h5>
            <p class="card-text">${course.instructor}</p>
            <p class="card-text">
              ${course.star}
              <i class="fas fa-star text-warning"></i>
              <i class="fas fa-star text-warning"></i>
              <i class="fas fa-star text-warning"></i>
              <i class="fas fa-star text-warning"></i>
              <i class="fas fa-star-half-alt text-warning"></i>
            </p>
            <p class="card-text">${course.price} $</p>
            <i class="far fa-trash-alt text-danger" onclick="deleteCourse(${course.id})"></i>
          </div>
        </div>
      </div>
        `;
    })
    .join("");
};

/**
 * This function generates a unique id for the new product to be added.
 */
let idNumber = 0;
const forId = () => {
  courseList = JSON.parse(localStorage.getItem("courseList"));
  let idArray = courseList.map((course) => course.id);
  if (idArray.includes(idNumber) === true) {
    idNumber++;
    forId();
  } else {
  }
  return idNumber;
};

/**
 * This function adds a new course.
 * @param {*} event
 */
const addCourse = (event) => {
  event.preventDefault();

  let newCourse = {
    id: forId(),
    image: event.target["image"].value,
    name: event.target["name"].value,
    instructor: event.target["instructor"].value,
    star: event.target["star"].value,
    price: event.target["price"].value,
  };
  courseList.push(newCourse);

  localStorage.setItem("courseList", JSON.stringify(courseList));
  courseList = JSON.parse(localStorage.getItem("courseList"));

  renderCourseList(courseList);
};

/**
 * This function deletes the course with the id sent to it as a parameter.
 * @param {Number} pCourseId
 */
const deleteCourse = (pCourseId) => {
  courseList = courseList.filter((course) => course.id !== pCourseId);
  localStorage.setItem("courseList", JSON.stringify(courseList));
  courseList = JSON.parse(localStorage.getItem("courseList"));
  renderCourseList(courseList);
};

/*If there is no array in localstorage, it will be thrown there first,
It will be rendered later. If there is an array, it will be rendered directly.*/
if (localStorage.getItem("courseList") === undefined) {
  localStorage.setItem("courseList", JSON.stringify(courseList));
}

/*Getting the directory from localstorage and rendering it to the page */
courseList = JSON.parse(localStorage.getItem("courseList"));
renderCourseList(courseList);

/*Form`s submit event */
courseForm.addEventListener("submit", addCourse);

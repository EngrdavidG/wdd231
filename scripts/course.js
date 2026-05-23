const courses = [
    {
        code: "WDD 130",
        name: "Web Fundamentals",
        credits: 2,
        category: "WDD",
        completed: true
    },

    {
        code: "WDD 131",
        name: "Dynamic Web Fundamentals",
        credits: 2,
        category: "WDD",
        completed: true
    },

    {
        code: "WDD 231",
        name: "Web Frontend Development",
        credits: 2,
        category: "WDD",
        completed: false
    },

    {
        code: "CSE 110",
        name: "Programming Building Blocks",
        credits: 2,
        category: "CSE",
        completed: true
    },

    {
        code: "CSE 111",
        name: "Programming with Functions",
        credits: 2,
        category: "CSE",
        completed: false
    },

    {
        code: "CSE 210",
        name: "Programming with Classes",
        credits: 2,
        category: "CSE",
        completed: false
    }
];

const courseContainer = document.querySelector("#courses");
const creditsContainer = document.querySelector("#credits");

function displayCourses(courseList) {

    courseContainer.innerHTML = "";

    courseList.forEach(course => {

        const card = document.createElement("div");

        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        } else {
            card.classList.add("not-completed");
        }

        card.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
        `;

        courseContainer.appendChild(card);
    });

    const totalCredits = courseList.reduce(
        (total, course) => total + course.credits, 0
    );

    creditsContainer.innerHTML =
    `Total Credits: ${totalCredits}`;
}

displayCourses(courses);

/* BUTTONS */
document.querySelector("#all").addEventListener("click", () => {
    displayCourses(courses);
});

document.querySelector("#wdd").addEventListener("click", () => {

    const wddCourses = courses.filter(course =>
        course.category === "WDD"
    );

    displayCourses(wddCourses);
});

document.querySelector("#cse").addEventListener("click", () => {

    const cseCourses = courses.filter(course =>
        course.category === "CSE"
    );

    displayCourses(cseCourses);
});
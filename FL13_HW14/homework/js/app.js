class Student {
	constructor(name, email) {
		let homeworkResult = [];
		this.getName = () => name;
		this.getEmail = () => email;
		this.addHomeworkResult = function(topic, success) {
			return homeworkResult.push({
				topic : topic,
				success : success
			})
		}
		this.getHomeworkResult = function() {
			return homeworkResult;
		}
	}
}
class FrontendLab {
	constructor(students, failedLimit) {
		let studentsList = students;
		this.setStudents = function (students) {
			studentsList = students;
		};
		this.printStudentsList = function () {
			console.log(studentsList);
		};
		this.addHomeworkResults = (homeWorks) => {
			for (let i = 0; i < homeWorks.results.length; i++) {
				if (homeWorks.results[i].email === studentsList[i].email) {
					studentsList[i].results ? null : studentsList[i].results = [];
					studentsList[i].results.push(
						{
							topic : homeWorks.topic,
							success : homeWorks.results[i].success
						}
					);
				}
			}
		}
		this.printStudentsEligibleForTest = () => {
			for (let i = 0; i < studentsList.length; i++) {
				Object.defineProperty(studentsList[i], 'count', {
					enumerable: false,
					configurable: true,
					writable: true,
					value: 0
				});
				for (let k = 0; k < studentsList[i].results.length; k++) {
					if (studentsList[i].results[k].success === false) {
						studentsList[i].count++
					}
				}
				studentsList[i].count <= failedLimit ?
				console.log(`name: ${studentsList[i].name}, email: ${studentsList[i].email}`): null;
			}
		}
	}
}
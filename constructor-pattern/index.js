class Student{
	constructor (name,age) {
		this.name=name;
		this.age=age;
	}
	getStudentDetails() {
		return `Student Name is ${this.name} and Age is ${this.age}`;
	}
}
const stu1=new Student('arun', '22');
const stu2 = new Student("RAM", "24");
const stuInfo1= stu1.getStudentDetails();
const stuInfo2 = stu2.getStudentDetails();
console.log(stuInfo1);
console.log(stuInfo2);

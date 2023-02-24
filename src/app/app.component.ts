import { Component, ViewChild, ElementRef } from "@angular/core";
import { EmployeeService } from "./employee.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "coding-test";
  employeeList: any = [];
  showHideWorkModal: boolean = false;
  showHideVocation: boolean = false;
  selectedEmployee: any;
  workInput: string = "";
  vocationInput: string = "";

  @ViewChild("workModal", { static: false }) workModal!: ElementRef;
  @ViewChild("vocationModal", { static: false }) vocationModal!: ElementRef;

  constructor(private _employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployee();
  }

  loadEmployee() {
    this._employeeService.getEmployee().subscribe(
      (resp: any) => {
        this.employeeList = resp || [];
      },
      (err: any) => {
        console.log("err", err);
      }
    );
  }

  handleShowWork(emp: any) {
    this.workModal.nativeElement.style.display = "block";
    this.showHideWorkModal = !this.showHideWorkModal;
    this.selectedEmployee = emp;
  }
  handleHideWork() {
    this.workModal.nativeElement.style.display = "none";
    this.showHideWorkModal = !this.showHideWorkModal;
    this.workInput = "";
  }

  handleShowVocation(emp: any) {
    this.vocationModal.nativeElement.style.display = "block";
    this.showHideVocation = !this.showHideVocation;
    this.selectedEmployee = emp;
  }

  handleHideVocation() {
    this.vocationModal.nativeElement.style.display = "none";
    this.showHideVocation = !this.showHideVocation;
    this.vocationInput = "";
  }

  submitWork() {
    const payload = {
      id: this.selectedEmployee?.empId,
      value: this.workInput?.trim(),
    };
    this._employeeService.updateWork(payload).subscribe(
      (resp: any) => {
        console.log("resp", resp);
        this.loadEmployee();
        this.handleHideWork();
      },
      (err: any) => {
        console.log("err", err);
        alert("Something went wrong please try again");
      }
    );
  }

  submitVocation() {
    const payload = {
      id: this.selectedEmployee?.empId,
      value: this.vocationInput?.trim(),
    };
    this._employeeService.updateVacation(payload).subscribe(
      (resp: any) => {
        console.log("resp", resp);
        this.loadEmployee();
        this.handleHideVocation();
      },
      (err: any) => {
        console.log("err", err);
        alert("Something went wrong please try again");
      }
    );
  }
}

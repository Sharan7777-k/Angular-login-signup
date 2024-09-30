import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrl: './staff-management.component.css',
})
export class StaffManagementComponent implements OnInit {
  stafform!: FormGroup;
  staffList: any[] = [];
  editingIndex: number | null = null;
  ageError: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.stafform = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.stafform.invalid) {
      return;
    }
    const age = this.calculateAge(this.stafform.value.date);
    if (age < 18) {
      this.ageError = 'Age must be above 18';
      return;
    }
    const newStaff = {
      name: this.stafform.value.name,
      email: this.stafform.value.email,
      address: this.stafform.value.address,
      date: this.stafform.value.date,
      age: age,
    };
    if (this.editingIndex !== null) {
      this.staffList[this.editingIndex] = newStaff;
      this.editingIndex = null;
      this.stafform.reset();
    } else {
      this.staffList.push(newStaff);
    }
    localStorage.setItem('staffList', JSON.stringify(this.staffList));
    this.stafform.reset();
    this.ageError = '';
  }

  loadStaffData() {
    const data = localStorage.getItem('staffList');
    if (data) {
      this.staffList = JSON.parse(data);
    }
  }

  calculateAge(date: string): number {
    const birthDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  saveStaffData() {
    localStorage.setItem('staffList', JSON.stringify(this.staffList));
    this.loadStaffData();
  }

  onEdit(index: number) {
    const staff = this.staffList[index];
    this.stafform.patchValue({
      name: staff.name,
      email: staff.email,
      address: staff.address,
      date: staff.date,
    });

    this.editingIndex = index;
  }

  onCancelEdit() {
    this.editingIndex = null;
    this.stafform.reset();
  }

  onDelete(index: number) {
    this.staffList.splice(index, 1);
    this.saveStaffData();
  }
}

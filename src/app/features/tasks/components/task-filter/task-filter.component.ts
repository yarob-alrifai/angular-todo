import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss'],
})
export class TaskFilterComponent implements OnInit {
  idFilter = new FormControl('');
  @Output() filterChange = new EventEmitter<number | null>();

  readonly #destroyRef = inject(DestroyRef);
  ngOnInit() {
    this.idFilter.valueChanges
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((value) => {
        const filterValue = value ? Number(value) : null;
        this.filterChange.emit(filterValue);
      });
  }

  clearFilter() {
    this.idFilter.setValue('');
  }
}

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { formatString } from 'src/app/helpers/helpers';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-instruction-form-el',
  templateUrl: './instruction-form-el.component.html',
  styleUrls: ['./instruction-form-el.component.css'],
})
export class InstructionFormElComponent {
  @Input() instructions: string[] = [];
  @Output() instructionsData = new EventEmitter<any>();
  @ViewChild('instructionInput') instructionInput: ElementRef;
  public instructionStep: string = '';

  constructor(public ui: UiService, private el: ElementRef) {
    this.instructionInput = el;
  }

  public dropInstruction(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.instructions, event.previousIndex, event.currentIndex);
    this.instructionsData.emit(this.instructions);
  }

  public removeInstructionStep(index: number): void {
    this.instructions.splice(index, 1);
    this.instructionsData.emit(this.instructions);
  }

  public editInstructionStep(index: number): void {
    const [stepToEdit] = this.instructions.splice(index, 1);
    this.instructionsData.emit(this.instructions);
    this.instructionStep = stepToEdit;
    this.instructionInput.nativeElement.focus();
  }

  public addInstructionStep(instructionStep: string): void {
    const formattedInstructionStep = formatString(instructionStep);
    if (formattedInstructionStep.length === 0) return;
    this.instructions.push(formattedInstructionStep);
    this.instructionsData.emit(this.instructions);
    this.instructionStep = '';
  }

  public updateInput(): void {
    if (this.instructionStep.includes('&')) {
      this.instructionStep = this.instructionStep.replace(/&/g, '');
    }
  }
}

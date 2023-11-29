import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss']
})
export class CreatePollComponent implements OnInit {
  new_poll_form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.new_poll_form = this.init_poll_form();
  }

  ngOnInit(): void {
  }

  get is_poll_empty(): boolean {
    return !!this.questions.length;
  }

  get questions(): FormArray<FormGroup> {
    return this.new_poll_form.get('questions') as FormArray<FormGroup>;
  }

  get_answers(i: number): FormArray<FormGroup> {
    return this.questions.at(i).get('options') as FormArray<FormGroup>;
  }

  init_poll_form(): FormGroup {
    const fb = this.formBuilder;
    return fb.group({
      title: fb.control('', [Validators.required]),
      questions: fb.array([])
    })
  }

  create_question(): FormGroup {
    const fb = this.formBuilder;
    return fb.group({
      title: fb.control('', [Validators.required]),
      description: fb.control('', [Validators.required]),
      options: fb.array([
        this.create_option()
      ])
    })
  }

  create_option(): FormGroup {
    const fb = this.formBuilder;
    return fb.group({
      type: fb.control('', Validators.required),
      value: fb.control('', Validators.required)
    })
  }

  add_question(): void {
    this.questions.  push(this.create_question());
  }

  delete_question(i: number): void {
    this.questions.removeAt(i);
  }

  add_option(i: number): void {
    (this.questions.at(i).get('options') as FormArray<FormGroup>)
      .push(this.create_option());
  }

  delete_option(question_index: number, option_index: number): void {
    (this.questions.at(question_index).get('options') as FormArray<FormGroup>)
      .removeAt(option_index);
  }

}

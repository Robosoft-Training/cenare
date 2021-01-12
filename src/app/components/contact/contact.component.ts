import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  isSuccess = 'loading';
  details = {
    contact_number: '',
    email_id: '',
    entity_area: '',
    entity_city: '',
    entity_name: '',
    feedback_by: 'MERCHANT',
    feedback_id: 0,
    message: '',
    name: '',
    query_category: 'Inquiry'
  }

  constructor(
    private contactService: ContactService
  ) { }

  submitFeedback = () => {
    this.contactService.postFeedback(this.details).subscribe(
      msg => {
        if(msg.message === 'Feedback Added'){
          this.isSuccess = 'done';
          setTimeout(() => {
            this.isSuccess = 'loading';
          }, 2000);
        }
        else {
          this.isSuccess = 'error';
          setTimeout(() => {
            this.isSuccess = 'loading';
          }, 2000);
        }
      }
    );
  }

  ngOnInit(): void {
  }

}

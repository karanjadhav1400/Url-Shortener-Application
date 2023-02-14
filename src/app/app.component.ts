import { Component } from '@angular/core';
import { NgTinyUrlService } from 'ng-tiny-url';
import { GoogleApiService} from './google-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  model = {
    inputUrl : '',
  };
  isFormSubmitted = false;
  //title = 'tinyurl';
  shortUrl = '';
  isTextCopied = false;
  isLoading = false;
  //Oauth
  constructor(private tinyUrlService: NgTinyUrlService, private readonly googleApi: GoogleApiService) 
  {}
  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn();
   }
  logout(){
   this.googleApi.signOut()
  }
   //Oauth Ends
  onSubmitUrlForm(urlForm) {
    if(urlForm.valid) {
      this.isLoading = true;
      this.tinyUrlService.shorten(this.model.inputUrl)
      .subscribe(
        (data) => {
          console.log('success :: ', data);
          this.shortUrl = data;
          this.isFormSubmitted = true;
          this.isLoading = false;
        }, 
        (error) => {
          console.log('error :: ', error);
          alert('Something Went Wrong. Please check your url and try again');
          this.isLoading = false;
        }
      );
    }
  }

  copyUrl(shortUrlElementRef){
      let inputElement = document.createElement('input');

      inputElement.setAttribute('type','text');
      inputElement.setAttribute('value',shortUrlElementRef.innerHTML);

      inputElement.select();
      inputElement.setSelectionRange(0, 999999)
      try{
        navigator.clipboard.writeText(inputElement.value); 

        this.isTextCopied = true;

        setTimeout(() => {
          this.isTextCopied = false;
        }, 2000);
      }
      catch (e){
        console.log('error while copying...', (e as Error).toString())
        ;
      }

  }

  reset() {
    this.model.inputUrl = '';
    this.isFormSubmitted = false;
    this.isTextCopied = false;
  }
    
   /**  constructor(private readonly googleApi: GoogleApiService){}
    isLoggedIn(): boolean {
      return this.googleApi.isLoggedIn();
     }
    logout(){
     this.googleApi.signOut()
    }
    **/
}

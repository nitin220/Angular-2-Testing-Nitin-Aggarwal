import {ShowComponent} from "./showTask.component";
import {RouterOutletMap, Router, NavigationExtras} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {async, TestBed, ComponentFixture} from "@angular/core/testing";
import {By}           from '@angular/platform-browser';
import {DebugElement} from "@angular/core";
import {AppService} from "../app.service";
import {HttpModule} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";

describe('ShowComponent', function () {
  let de: DebugElement;
  let comp: ShowComponent;
  let fixture: ComponentFixture<ShowComponent>;
  let service: AppService;
  let router: Router;

  class MockRouter {
   navigate():Promise<boolean>{
     return Promise.resolve(true)
   }
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowComponent],
      providers: [{provide: Router, useClass: MockRouter}, RouterOutletMap, AppService],
      imports: [RouterTestingModule, CommonModule, FormsModule, HttpModule]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowComponent);
    comp = fixture.componentInstance;
    comp.myTask = [{
      date: '22/11/33',
      title: 'Title',
      description: 'hello',
      priority: 'high',
      _id: '123'
    }]
    de = fixture.debugElement.query(By.css('h1'));
    service = fixture.debugElement.injector.get(AppService);
    router = fixture.debugElement.injector.get(Router);
  });

  it('should create component', () => expect(comp).toBeDefined());


  it('it should be able to get data from service', () => {
    spyOn(service, 'getData3').and.returnValue(
      Observable.of<any>(
        [{
          date: '',
          title: '',
          description: '',
          priority: '',
          _id: ''
        }]
      )
    );
    comp.ngOnInit();
    expect(comp.myTask).toEqual([{
      date: '',
      title: '',
      description: '',
      priority: '',
      _id: ''
    }])
  });

  fit('it should be able to delete data from service',() =>{
    spyOn(window, "alert");
    spyOn(router, "navigate").and.returnValue(Promise.resolve(true));
    spyOn(service,'remove').and.returnValue(
      Observable.of<any>(
        [{
          date: '',
          title: '',
          description: '',
          priority: '',
          _id: ''
        }]
      )
    );
    comp.deleteByIndex(0);
    expect(window.alert).toHaveBeenCalledWith('Task Removed');
    expect(router.navigate).toBe(Promise.resolve(true));

  });


});

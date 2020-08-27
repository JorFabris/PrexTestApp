import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditFilmPage } from './edit-film.page';

describe('EditFilmPage', () => {
  let component: EditFilmPage;
  let fixture: ComponentFixture<EditFilmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFilmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditFilmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

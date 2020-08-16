import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InnerPage } from './inner.page';

describe('InnerPage', () => {
  let component: InnerPage;
  let fixture: ComponentFixture<InnerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InnerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { of } from 'rxjs';
import { UIKitModule } from './ui-kit/ui-kit.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, AppComponent, RouterOutlet, UIKitModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the "quiz-app" title', () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('quiz-app');
  });

  it('should render router-outlet and app-ui-header in the template', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
    expect(compiled.querySelector('app-ui-header')).toBeTruthy();
  });
});

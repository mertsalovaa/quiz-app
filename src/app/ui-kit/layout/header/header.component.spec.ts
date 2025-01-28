import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { DebugElement, DestroyRef } from '@angular/core';
import { LinkComponent } from '../../components/link/link.component';
import { TypographyComponent } from '../../components/typography/typography.component';
import { ButtonComponent } from '../../components/button/button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let debugElement: DebugElement;
  let router: Router;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent, LinkComponent, TypographyComponent, ButtonComponent ],
      imports: [RouterTestingModule],
      providers: [DestroyRef],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    router = TestBed.inject(Router);
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize menu items and buttons in the template and data', () => {
    fixture.detectChanges(); 

    const menuItems = fixture.debugElement.queryAll(By.css('app-ui-link'));
    const buttons = fixture.debugElement.queryAll(By.css('app-ui-button'));
    
    expect(menuItems.length).toBe(4);
    expect(buttons).toBeTruthy();

    expect(component.menuItems.length).toBe(3);
    expect(component.isMenuOpen).toBe(false);
  });

  it('should open and close the mobile menu on click event', () => {
    fixture.detectChanges();
    
    const button = fixture.debugElement.query(By.css('button[aria-label="Toggle navigation"]'));
    button.triggerEventHandler('click', {});
    expect(component.isMenuOpen).toBe(true);
    
    fixture.detectChanges();

    button.triggerEventHandler('click', {});
    expect(component.isMenuOpen).toBe(false);
  });
});

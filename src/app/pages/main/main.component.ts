import { Component } from '@angular/core';
import { UIKitModule } from '../../ui-kit/ui-kit.module';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  imports: [UIKitModule],
})
export class MainComponent { }

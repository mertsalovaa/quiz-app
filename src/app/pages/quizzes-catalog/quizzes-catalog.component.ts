import { Component, OnInit } from '@angular/core';
import { UIKitModule } from '../../ui-kit/ui-kit.module';
import { CommonModule } from '@angular/common';
import {
  CardColors,
  CardItemStyle,
  cardItemStyles,
} from '../../ui-kit/constants/card-item';
import { CategoryModel } from '../../services/model/category.model';
import { Observable } from 'rxjs';
import { StoreService } from '../../services/store.service';

@Component({
  standalone: true,
  selector: 'app-quizzes-catalog',
  templateUrl: './quizzes-catalog.component.html',
  imports: [ UIKitModule, CommonModule ],
})
export class QuizzesCatalogComponent implements OnInit {
  categories$!: Observable<CategoryModel[]>;
  isLoading$!: Observable<boolean>;
  
  constructor(private storeService: StoreService) { }
  
  ngOnInit(): void {
    this.categories$ = this.storeService.getCategories();
    this.isLoading$ = this.storeService.getLoadingCategories();
    this.storeService.loadCategories();
  }
  
  getCardStyle(index: number): CardItemStyle {
    const styleIndex = index + Math.floor(index / 5);
    const enumValues = Object.values(CardColors);
    return cardItemStyles[enumValues[styleIndex % enumValues.length]];
  }
}

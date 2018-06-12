import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	/*Initial values*/
	selectedPizzaBase = 'thinCrust';
  	selectedPizzaType = 'cheeseBurst';
  	selectedFoodPreference = 'veg';
  	selectedRange = 100;
  	
  	/*Storing json response and filtered data*/
  	responseData;
  	filteredData;
  	
	constructor(private http: Http) { }
	   ngOnInit() {
	   	  /*Fetch response from json and call function to load screen according to initial values*/
	      this.http.get("assets/app.json").
	      map((response) => response.json()).
	      subscribe((data) => {this.responseData = data; 
	      						this.filterData( this.selectedFoodPreference,this.selectedPizzaBase,this.selectedPizzaType,this.selectedRange);})
	   } 
	   /*Responsible for reloading list of pizzas whenever any value changes*/ 
	   filterData(selectedFoodPreference,selectedPizzaBase,selectedPizzaType,selectedRange) {
	   		/*Filtered list with selected food preference veg-non veg*/ 
		   	var foodPreference = this.responseData.filter(function (value) {
	  			return value.FoodPreference == selectedFoodPreference;
			});  			
			var pizzaDetails = foodPreference[0].PizzaDetails;
			
			/*Filtered list with selected pizza base*/  
			var pizzaBase = pizzaDetails.filter(function (value1) {
	  			return value1.PizzaBase == selectedPizzaBase;
			});
			var pizzaBaseData = pizzaBase[0].PizzaBaseData;
			var pizzaBaseSubData = pizzaBaseData[0].PizzaTypeData;
			
			/*Filtered list with selected pizza type*/ 
			var pizzaTypeData = pizzaBaseSubData.filter(function (value2) {
	  			return value2.PizzaType == selectedPizzaType;
			});				
			var pizzaTypeSubData = pizzaTypeData[0].Details;
			
			/*Filtered list with selected range*/ 
			var pizzaTypeFinalData = pizzaTypeSubData.filter(function (value3) {
	  			return value3.Price <= selectedRange;
			});
			
			/*Final filtered list*/
			this.filteredData = pizzaTypeFinalData;
	   }   
}

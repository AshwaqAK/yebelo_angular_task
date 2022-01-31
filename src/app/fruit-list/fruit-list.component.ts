import { Component, OnInit } from '@angular/core';
import fruitList from '../../assets/fruits.json';
declare var $: any;
@Component({
  selector: 'app-fruit-list',
  templateUrl: './fruit-list.component.html',
  styleUrls: ['./fruit-list.component.scss']
})
export class FruitListComponent implements OnInit {
  fruits: any;
  finalProducts: any = {};

  constructor() { }

  ngOnInit(): void {
    this.fruits = fruitList;
  }

  // selecting the category
  selectOption(e: any) {
    if (e.target.value == "selected") return
    this.fruits = fruitList.filter((x: any) => x.p_category == e.target.value) //filter by category
  }

  // removing the quantity
  decrementQuantity(index: any) {
    if (this.fruits[index]['quantity'] == 0 || this.fruits[index]['quantity'] == undefined) return //stop if the quantity is zero or undefined
    this.fruits[index]['quantity'] = this.fruits[index]['quantity'] - 1
  }

  // adding the quantity
  incrementQuantity(index: any) {
    if (this.fruits[index]['quantity'] == undefined) this.fruits[index]['quantity'] = 0 // assigning zero if the quantity is undefined
    if (this.fruits[index].p_availability <= this.fruits[index]['quantity']) return // if the availability is lesser than quantity
    this.fruits[index]['quantity'] = this.fruits[index]['quantity'] + 1
  }

  // submitting the final product
  submit(index: any) {
    if (fruitList[index].p_availability == 0) return alert("Zero available can't process") // checking if the availability is there
    if (this.fruits[index]['quantity'] == 0 || this.fruits[index]['quantity'] == undefined) return alert("Select the quantity to process"); // checking if the quantity is not selected
    if (fruitList[index].p_availability < this.fruits[index]['quantity']) return alert(`Only ${fruitList[index].p_availability} is available to process`); // checking if the quantity is lesser than availability

    let total = fruitList[index].p_cost * this.fruits[index]['quantity'] // total amount after adding the quantity
    this.finalProducts = {
      name: fruitList[index].p_name,
      details: fruitList[index].p_details,
      category: fruitList[index].p_category,
      totalCost: total
    };
    ($('#fruitSubmit') as any).modal('show');
  }
}

import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  currentYear = new Date().getFullYear();
  array = [1, 2, 3, 4];
  effect = "scrollx";
  constructor() {}

  ngOnInit(): void {}
}

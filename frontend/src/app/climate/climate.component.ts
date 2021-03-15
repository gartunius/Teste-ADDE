import { Component, OnInit } from '@angular/core';
import { ClimateService } from '../climate.service';

@Component({
  selector: 'app-climate',
  templateUrl: './climate.component.html',
  styleUrls: ['./climate.component.css']
})
export class ClimateComponent implements OnInit {

  constructor(private climateService: ClimateService) { }

  ngOnInit(): void {
    this.climateService.getClimateInfo('teste');
  }

}

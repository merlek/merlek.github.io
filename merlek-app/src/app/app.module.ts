import { HttpClientModule } from '@angular/common/http';
import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AgentFlowComponent } from './routes/+agentflow/agentflow.component';
import { HealthCoachComponent } from './routes/+health-coach/health-coach.component';
import { HomeComponent } from './routes/+home/home.component';
import { ResumeComponent } from './routes/+resume/resume.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent, HealthCoachComponent, AgentFlowComponent, ResumeComponent],
  imports: [AppRoutingModule, BrowserModule, HttpClientModule, NgbModule],
  providers: [provideZoneChangeDetection()],
  bootstrap: [AppComponent]
})
export class AppModule {}

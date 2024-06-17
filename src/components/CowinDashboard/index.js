// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    last7DaysVaccinationData: [],
    vaccinationByGender: [],
    vaccinationByAge: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCovidVaccinationData()
  }

  getCovidVaccinationData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()

      const formatedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      const formated7DaysVaccinationData =
        formatedData.last7DaysVaccination.map(each => ({
          vaccineDate: each.vaccine_date,
          dose1: each.dose_1,
          dose2: each.dose_2,
        }))
      this.setState({
        last7DaysVaccinationData: formated7DaysVaccinationData,
        vaccinationByGender: formatedData.vaccinationByGender,
        vaccinationByAge: formatedData.vaccinationByAge,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderVaccinationCoverage = () => {
    const {last7DaysVaccinationData} = this.state
    return (
      <>
      <div className="chart-container">
        <h1 className="chart-heading">Vaccination Coverage</h1>
        <VaccinationCoverage details={last7DaysVaccinationData} />
      </div>
      {this.renderVaccinationByGender()}
      {this.renderVaccinationByAge()}
      </>
    )
  }

  renderVaccinationByGender = () => {
    const {vaccinationByGender} = this.state
    return (
      <div className="chart-container">
        <h1 className="chart-heading">Vaccination by gender</h1>
        <VaccinationByGender details={vaccinationByGender} />
      </div>
    )
  }

  renderVaccinationByAge = () => {
    const {vaccinationByAge} = this.state
    return (
      <div className="chart-container">
        <h1 className="chart-heading">Vaccination by age</h1>
        <VaccinationByAge details={vaccinationByAge} />
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderOnFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  renderAllComponents = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderVaccinationCoverage()
      case apiStatusConstants.failure:
        return this.renderOnFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="content-container">
          <nav className="nav-bar">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo-image"
            />
            <h1 className="app-name">Co-WIN</h1>
          </nav>
          <h1 className="app-title">CoWIN Vaccination in India</h1>
          {this.renderAllComponents()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard

import { decorate, observable, action, computed } from "mobx";
import React, { Component } from "react";
import axios from "axios";
import authStore from "./authStore";
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Icon,
  View,
  Form,
  Item,
  Input
} from "native-base";

class Store {
  constructor() {
    this.doctorList = [];
    this.ratingSet = [];
    this.filteredDoctors = [];
    this.doctorProfile = null;
    this.DoctorAreaAndSpe = [];
    this.AreaDoctorNoSpeciality = [];
    this.city = [];
    this.cityList = [];
    this.Area = [];
    this.AreaList = [];
    this.filteredCategories = [];
    this.filteredItems = [];
    this.cartList = [];
    this.theQuery = "";
    this.counter = 0;
    this.orderList = [];
    this.totalPrice = 0;
    this.Speciality = [];
    this.filteredSpeciality = [];
    this.RatingList = [];
    this.counter = 3;
    this.Like = false;
    this.LikeList = [];
    this.editProf = [];
  }
  //for bringing Doctors only
  getDoctors() {
    axios
      .get("http://127.0.0.1:8000/doctor/list")
      .then(res => res.data)
      .then(doctors => {
        this.doctorList = doctors;
        this.filteredDoctors = doctors;
        this.AreaDoctorNoSpeciality = doctors;
        this.itemList = doctors.reduce((a, b) => a.concat(b.items), []);
      })
      .catch(err => console.error(err));
  }
  //for bringing Cities only
  getCities() {
    axios
      .get("http://127.0.0.1:8000/cities/")
      .then(res => res.data)
      .then(cities => {
        this.city = cities;
      })
      .catch(err => console.error(err));
  }
  //for bringing Area only
  getAreas() {
    axios
      .get("http://127.0.0.1:8000/area/")
      .then(res => res.data)
      .then(Areas => {
        this.Area = Areas;
      })
      .catch(err => console.error(err));
  }
  //for bringing Speciality only
  getSpeciality() {
    axios
      .get("http://127.0.0.1:8000/speciality/")
      .then(res => res.data)
      .then(Speciality => {
        this.Speciality = Speciality.slice().sort();
        this.filteredSpeciality = Speciality.sort();
        // this.filteredSpeciality;
      })
      .catch(err => console.error(err));
  }

  getRating() {
    axios
      .get("http://127.0.0.1:8000/rating/")
      .then(res => res.data)
      .then(rates => {
        this.RatingList = rates;
      })
      .catch(err => console.error(err));
  }

  //for bringing doctor id from doctor list
  bringToProfile(id) {
    const productInCat = this.doctorList.find(item => +item.id === +id);
    this.doctorProfile = productInCat;

    axios
      .post(`http://127.0.0.1:8000/doctor/views/` + id)
      .then(() => console.log("Done"))
      .catch(err => console.error(err));

    return productInCat;
  }

  EditProfile(
    id,
    description,
    google_maps,
    waiting_time,
    service,
    fees,
    opening_file,
    block,
    street,
    building,
    floor
  ) {
    const userData = {
      description: description,
      google_maps: google_maps,
      waiting_time: waiting_time,
      service: service,
      fees: fees,
      opening_file,
      block: block,
      street: street,
      building: building,
      floor: floor
    };
    axios
      .put(`http://127.0.0.1:8000/update/profile/` + id, userData)
      .then(res => res.data)
      .catch(() => console.log("You Failed"));
  }

  getEditProfile(id) {
    axios
      .get(`http://127.0.0.1:8000/update/profile/` + id)
      .then(res => res.data)
      .then(rates => {
        this.editProf = rates;
      })
      .catch(() => console.log("llllllllllllll"));
  }

  //for bringing area id to the Speciality page to get doctor from this area only
  bringToSpeciality(id) {
    const AreaId = this.doctorList.filter(item => +item.area.id === +id);
    this.AreaDoctorNoSpeciality = AreaId;
    this.DoctorAreaAndSpe = this.AreaDoctorNoSpeciality;
  }

  //for bringing Speciality id to get doctor from this Speciality only
  bringAreaAndSpe(id) {
    const SpeId = this.AreaDoctorNoSpeciality.filter(
      item => +item.speciality === +id
    );
    this.DoctorAreaAndSpe = SpeId;
  }

  onSearchDoctorChangeHandler(e) {
    const items = this.doctorList.filter(product =>
      product.user.first_name.toLowerCase().includes(e)
    );
    this.filteredDoctors = items;
  }

  changeDoctorValue(e) {
    this.theQuery = e.toLowerCase();
    this.onSearchDoctorChangeHandler(this.theQuery);
  }

  onSearchSpecialityChangeHandler(e) {
    const items = this.Speciality.filter(product =>
      product.name.toLowerCase().includes(e)
    );
    this.filteredSpeciality = items;
  }

  changeSpecialityValue(e) {
    this.theQuery = e.toLowerCase();
    this.onSearchSpecialityChangeHandler(this.theQuery);
  }

  StarRating() {
    if (!this.doctorProfile) {
      return 0;
    } else {
      let ratingSet = this.doctorProfile.rating_set;
      let rates =
        ratingSet.reduce((total, rating) => total + rating.ratings, 0) /
        ratingSet.length;
      if (!rates) {
        rates = 0;
      }
      return rates;
    }
  }

  StarRatingDoctorSearch(id) {
    let DoctorRating = this.doctorList.find(item => +item.id === +id);
    let doctorRating = DoctorRating.rating_set;
    let Rate = 0;
    for (let i in doctorRating) {
      Rate += doctorRating[i].ratings;
    }
    Rate = Rate / doctorRating.length;

    if (!Rate) {
      Rate = 0;
    }
    return Rate;
  }

  addToLikeList(id) {
    const productInCat = this.doctorList.find(item => +item.id === +id);
    this.LikeList = productInCat;
  }

  // removeFromLikeList(id) {
  // 	let indx = this.LikeList.filter((item) => +item.id === +id);
  // 	if (indx) {
  // 		console.log(indx);
  // 	} else {
  // 		console.log('nothing Happens');
  // 	}
  // 	// let indx = this.LikeList.filter((item) => +item.id === +id);
  // }

  ProfileToEdit(theUser) {
    const productInCat = this.doctorList.find(
      item => item.user.username === theUser
    );
    this.doctorProfile = productInCat;

    return productInCat;
  }
}
decorate(Store, {
  ratingSet: observable,
  Speciality: observable,
  filteredSpeciality: observable,
  onSearchSpecialityChangeHandler: action,
  changeSpecialityValue: action,
  doctorList: observable,
  getDoctors: action,
  filteredDoctors: observable,
  AreaDoctorNoSpeciality: observable,
  DoctorAreaAndSpe: observable,
  bringToSpeciality: action,
  bringAreaAndSpe: action,
  getSpeciality: action,
  getCities: action,
  getAreas: action,
  Area: observable,
  AreaList: observable,
  city: observable,
  doctorProfile: observable,
  cityList: observable,
  getArea: action,
  theQuery: observable,
  onSearchDoctorChangeHandler: action,
  changeDoctorValue: action,
  bringToProfile: action,
  getRating: action,
  StarRating: action,
  Collapsing: action,
  counter: observable,
  StarRatingDoctorSearch: action,
  Like: observable,
  LikeList: observable,
  addToLikeList: action,
  removeFromLikeList: action,
  EditProfile: action,
  editProf: observable,
  getEditProfile: action,
  ProfileToEdit: action
});

const store = new Store();
store.getDoctors();
store.getCities();
store.getSpeciality();
store.getAreas();

export default store;

//.................................................................................
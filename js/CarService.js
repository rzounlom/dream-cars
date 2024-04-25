class CarService {
  constructor() {
    // Base URL for the API
    this.apiUrl = "https://63c07b07e262345656ffb291.mockapi.io/cars";
  }

  // Fetch all cars from the API
  getAllCars() {
    return $.ajax({
      url: this.apiUrl,
      method: "GET",
      dataType: "json",
    });
  }

  // Create a new car
  createCar(carData) {
    return $.ajax({
      url: this.apiUrl,
      method: "POST",
      dataType: "json",
      data: carData,
    });
  }

  // Delete a car by ID
  deleteCar(carId) {
    return $.ajax({
      url: `${this.apiUrl}/${carId}`,
      method: "DELETE",
      dataType: "json",
    });
  }

  // Render cars to the car-grid div
  renderCars(cars) {
    cars.forEach((car) => {
      const carCard = `
            <div class="col-sm-12 col-md-12 col-lg-6 mb-4" >
                <div class="card">
                    <img src="${car.imgUrl}" class="card-img-top" alt="Car Image" />
                    <div class="card-body">
                        <h5 class="card-title">${car.name}</h5>
                        <p class="card-text">${car.details}</p>
                    </div>
                    <div class="card-footer">
                        <button class="edit" data-id="${car.id}">Edit</button>
                        <button class="delete" data-id="${car.id}">Delete</button>
                    </div>
                </div>
            </div>
            `;

      // Append the car card to the car-grid div
      $("#car-grid").append(carCard);
    });
  }
}

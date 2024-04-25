$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar").addClass("scrolled");
      $(".navbar .navbar-brand").addClass("scrolled");
      $(".navbar #navbarNav ul li a").addClass("scrolled");
    } else {
      $(".navbar").removeClass("scrolled");
      $(".navbar .navbar-brand").removeClass("scrolled");
      $(".navbar #navbarNav ul li a").removeClass("scrolled");
    }
  });

  // Instantiate the CarService class
  const carService = new CarService();

  //show alert message
  function showAlert(message, type = "success") {
    const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `;

    $("#alertPlaceholder").html(alertHtml);
    $("#alertModal").modal("show");
  }

  // Fetch all cars and render them
  carService
    .getAllCars()
    .done((cars) => {
      console.log(cars);
      carService.renderCars(cars);
    })
    .fail((error) => {
      console.log("Error fetching cars:", error);
    });

  //create a new car using the add new car modal
  $("#createCarButton").click(function () {
    //add event listener to the button
    const newCar = {
      name: $("#carName").val(),
      imgUrl: $("#imgUrl").val(),
      details: $("#carDescription").val(),
    };

    carService
      .createCar(newCar)
      .done(() => {
        // Update successful, you can refresh the car list or provide some feedback to the user
        showAlert("New car added successfully!");
        $("#addCarModal").modal("hide");

        // Optionally, refresh the car list
        $("#car-grid").empty(); // Clear the current list
        carService.getAllCars().done((cars) => {
          carService.renderCars(cars);
        });
      })
      .fail((error) => {
        console.log("Error updating car:", error);
      });
  });

  //delete a car event listener
  $(document).on("click", ".delete", function () {
    const carId = $(this).attr("data-id"); // Get
    console.log("id of car to delete", carId);

    $("#deleteConfirmationModal").data("car-id-to-delete", carId); // Store carId in the modal's data
    $("#deleteConfirmationModal").modal("show"); // Show the confirmation modal
  });

  //delete a car once the user confirms
  $("#confirmDelete").click(function () {
    const carId = $("#deleteConfirmationModal").data("car-id-to-delete");
    $("#deleteConfirmationModal").modal("hide"); // Hide the confirmation modal

    //delete car using the car id
    carService
      .deleteCar(carId)
      .done(() => {
        // Notify the user that the car was deleted
        showAlert("Car deleted successfully!");

        // Refresh the car list after deletion
        $("#car-grid").empty(); // Clear the current list
        carService.getAllCars().done((cars) => {
          carService.renderCars(cars);
        });
      })
      .fail((error) => {
        console.log("Error deleting car:", error);
        showAlert("Error deleting car!", "danger");
      });
  });

  //update a car event listener
  $(document).on("click", ".edit", function () {
    const carId = $(this).attr("data-id");

    //find care and populate the modal with the car details
    carService.getCarById(carId).done((car) => {
      // Populate the modal's fields with the car's details
      $("#editCarName").val(car.name);
      $("#editImgUrl").val(car.imgUrl);
      $("#editCarDescription").val(car.details);

      // Store the carId in the modal's data for later use
      $("#editCarModal").data("car-id-to-edit", carId);

      // Show the modal
      $("#editCarModal").modal("show");
    });
  });

  //update a car once the user confirms
  $("#saveEdit").click(function () {
    const carId = $("#editCarModal").data("car-id-to-edit");
    const updatedCar = {
      name: $("#editCarName").val(),
      imgUrl: $("#editImgUrl").val(),
      details: $("#editCarDescription").val(),
    };

    carService
      .updateCar(carId, updatedCar)
      .done(() => {
        // Notify the user that the car was updated
        showAlert("Car updated successfully!");
        $("#editCarModal").modal("hide"); // Hide the modal

        // Refresh the car list
        $("#car-grid").empty(); // Clear the current list
        carService.getAllCars().done((cars) => {
          carService.renderCars(cars);
        });
      })
      .fail((error) => {
        console.log("Error updating car:", error);
        showAlert("Error updating car!", "danger");
      });
  });
});

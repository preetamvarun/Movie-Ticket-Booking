const seatContainer = document.querySelector('.seats');
const movies = document.getElementById("moviePicker");
const seatCount = document.getElementById('seatCount');
const netValue = document.getElementById('netValue');
const seats = Array.from(document.querySelectorAll('.seats span'));

let count = 0;

function setMovieData(movieIndex,ticketPrice){
    localStorage.setItem('movieIndex', movieIndex);
    localStorage.setItem('ticketPrice', ticketPrice);
}

function populateUI(){

    // getting the seats index 
    const selectedSeats = JSON.parse(localStorage.getItem('seatsIndex'));

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });

        seatCount.textContent = selectedSeats.length;
    }

    let movieIndex = localStorage.getItem('movieIndex');

    const tp = localStorage.getItem('ticketPrice');

    // IMP
    movieIndex === null ? movies.selectedIndex = 0 : movies.selectedIndex = movieIndex;

    tp === null ? netValue.textContent = 8 * selectedSeats.length : netValue.textContent = tp * selectedSeats.length;

}


movies.addEventListener('change', function(e){

    // define selected seats 

    const ss = JSON.parse(localStorage.getItem('seatsIndex'));

    if(ss !== null && ss.length > 0){
        netValue.textContent = Number(movies.value) * ss.length;
    }

    setMovieData(movies.selectedIndex,movies.value);

    // IMP
    netValue.textContent = movies[movies.selectedIndex].value * ss.length;
});


seatContainer.addEventListener('click', function(e){


    if(e.target.classList.contains('uno') && e.target.classList.length > 1){

        e.target.classList.toggle('selected');

        if(count > 0){
            count--;
        }

    }

    else if(e.target.classList.contains('uno') && e.target.classList.length === 1){
        e.target.classList.toggle('selected');
        count++;
    }


    const selectedSeats = Array.from(document.querySelectorAll('.selected'));
    
    const seatIndexes = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('seatsIndex', JSON.stringify(seatIndexes));

    const ss = JSON.parse(localStorage.getItem('seatsIndex'));

    seatCount.textContent = ss.length;

    netValue.textContent = Number(movies.value) * ss.length;
});

document.addEventListener('DOMContentLoaded', populateUI);


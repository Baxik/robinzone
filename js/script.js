

var restaurantInfo = document.getElementById('restaurantInfo');
var menu = document.getElementById('menu');
var photoGrid = document.querySelector('.photo-grid');
var savedPhotos = JSON.parse(sessionStorage.getItem('uploadedPhotos')) || [];

document.addEventListener('mousemove', function () {
    restaurantInfo.style.opacity = 1;
    menu.style.opacity = 1;

    setTimeout(function () {
        restaurantInfo.style.opacity = 0;
        menu.style.opacity = 0;
    }, 3000);
});



 



function uploadPhoto() {
    var fileInput = document.getElementById('fileInput');

    if (fileInput.files.length > 0) {
        var newPhotoContainer = document.createElement('div');
        newPhotoContainer.className = 'photoContainer';

        var newImage = document.createElement('img');
        newImage.alt = 'Новая фотография';
        newImage.classList.add('uploaded-image'); // Добавляем новый класс

        var reader = new FileReader();
        reader.onload = function (e) {
            newImage.src = e.target.result;

            var deleteButton = document.createElement('button');
            deleteButton.innerText = 'Удалить';
            deleteButton.onclick = function () {
                deletePhoto(newPhotoContainer, savedPhotos.indexOf(photo));
            };

            var img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                newImage.setAttribute('width', img.width);
                newImage.setAttribute('height', img.height);
            };

            newPhotoContainer.appendChild(newImage);
            newPhotoContainer.appendChild(deleteButton);
            photoGrid.appendChild(newPhotoContainer);

            savedPhotos.push({
                src: newImage.src,
                alt: newImage.alt
            });

            sessionStorage.setItem('uploadedPhotos', JSON.stringify(savedPhotos));
        };

        reader.readAsDataURL(fileInput.files[0]);
    }

    fileInput.value = '';
    uploadContainer.style.display = 'none';
}






function deletePhoto(photoContainer, index) {
    photoContainer.remove();
    savedPhotos.splice(index, 1);
    sessionStorage.setItem('uploadedPhotos', JSON.stringify(savedPhotos));
}

window.onload = function () {
    savedPhotos.forEach(function (photo, index) {
        var newPhotoContainer = document.createElement('div');
        newPhotoContainer.className = 'photoContainer';

        var newImage = document.createElement('img');
        newImage.src = photo.src;
        newImage.alt = photo.alt;
        newImage.classList.add('uploaded-image'); // Добавляем новый класс

        var deleteButton = document.createElement('button');
        deleteButton.innerText = 'Удалить';
        deleteButton.onclick = function () {
            deletePhoto(newPhotoContainer, index);
        };

        newPhotoContainer.appendChild(newImage);
        newPhotoContainer.appendChild(deleteButton);
        photoGrid.appendChild(newPhotoContainer);
    });
};

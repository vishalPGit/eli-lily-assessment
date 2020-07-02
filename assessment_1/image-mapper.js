function show(input) {
    const file = input.files[0];
    if (file.type.indexOf("image") == -1) {
        input.type = "";
        input.type = 'file'
        document.querySelector('#user_img').setAttribute('src', "");
        alert("Please upload an image only.");
        return;
    }
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        document.querySelector('#uploadFile').remove();
        const image = document.querySelector('#user_img');
        image.setAttribute('src', e.target.result);
        image.style.display = "block";
        addDescription(file, image);
    }
    fileReader.readAsDataURL(file);
}
const addDescription = (file, image) => {
    setTimeout(() => {
        const details = `Image Name: ${file.name} <br>Dimensions: ${image.naturalWidth} * ${image.naturalHeight} <br>MIME Type: ${file.type} `;
        document.querySelector("#detailsWrapper").innerHTML = details;
        document.querySelector("#detailsWrapper").style.display = "block";
    });
}
const onImageClick = event => {
    const descriptionBox = document.querySelector(".descriptionBox");
    descriptionBox.setAttribute("style", `display:block;top:${event.clientY}px;left:${event.clientX}px;`);
    descriptionBox.setAttribute("yPos", event.clientY);
    descriptionBox.setAttribute("xPos", event.clientX);
}
const onSave = () => {
    const description = document.querySelector("#description").value;
    if (description) {
        const descriptionBox = document.querySelector(".descriptionBox");
        const xPos = descriptionBox.getAttribute("xPos");
        const yPos = descriptionBox.getAttribute("yPos");
        addPointer(xPos, yPos, description);
        updateList(xPos, yPos, description);
        onCancel();
    }
}
const addPointer = (xPos, yPos, description) => {
    const pointer = document.createElement("div");
    pointer.setAttribute("class", "pointer");
    pointer.style.top = `${yPos}px`;
    pointer.style.left = `${xPos}px`;
    pointer.setAttribute("title", description);
    document.querySelector("body").appendChild(pointer);
}
const updateList = (xPos, yPos, description) => {
    const pointerList = document.querySelector("#pointerList tbody");
    const newPointer = document.createElement("tr");
    newPointer.innerHTML = `<td>${xPos}</td> <td>${yPos}</td> <td>${description}</td>`;
    pointerList.appendChild(newPointer);
}
const onCancel = () => {
    document.querySelector(".descriptionBox").style = "";
    document.querySelector("#description").value = "";
}
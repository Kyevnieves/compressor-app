const fileUploadButton = document.querySelector('.fileUploadButton')
const input = document.querySelector('.inputFile')
const convertButton = document.querySelector('.convert-button')
const containerUploadedImages = document.querySelector('.uploaded-image')


document.addEventListener('change', ()=>{
  	const inputFile = document.querySelector('.inputFile')
  	const parrfilename = document.querySelector('.filename')
	const file = inputFile.files[0]
	parrfilename.innerHTML = file.name
	if(file){
		convertButton.disabled = convertButton.enabled
	}
})


fileUploadButton.addEventListener('click', ()=>{
	input.click();
})

convertButton.addEventListener('click', (e)=>{
	e.preventDefault()
	convertwebp50();
})

containerUploadedImages.addEventListener('click', (e)=>{
	if(e.target.tagName == "BUTTON"){
		const url = e.target.dataset.url
		const imageName = e.target.parentElement.querySelector('.nameImage').textContent
		fetch(url)
		  .then(response => response.blob()) // Convertimos la respuesta en un objeto Blob
		  .then(imagenBlob => {
		    // Creamos un elemento de tipo a para descargar la imagen
		    const descarga = document.createElement('a');
		    descarga.href = URL.createObjectURL(imagenBlob);
		    descarga.download = imageName;
		    descarga.click();
		    
		    // Liberamos la memoria utilizada por el objeto Blob
		    URL.revokeObjectURL(descarga.href);
		})
	}
})


const renderizarCardFileConverted = (infoFile)=>{
	const {nameImage, secure_url, sizeBefore, sizeAfter } = infoFile
	let html = `
<div class="card px-8 py-8 bg-white bg-opacity-50 mx-6 my-4 rounded-md flex justify-between items-center">
<h1 class="text-blue-800 text-sm font-bold nameImage">${nameImage}</h1>
<h2 class="text-red-400 text-sm font-bold">${sizeBefore}</h2>
<h2 class="text-green-500 text-sm font-bold">${sizeAfter}</h2>
<button class="px-4 py-2 rounded-md bg-blue-700 text-white font-bold btn-download" data-url="${secure_url}">Descargar</button>
</div>
	`
	containerUploadedImages.innerHTML += html;
}

async function convertwebp50() {
  try {
  	const inputFile = document.querySelector('.inputFile')
  	const formatInput = document.querySelector('.format')
  	const qualityInput = document.querySelector('.quality')
  	const resolutionInput = document.querySelector('.resolution')
  	const format = formatInput.options[formatInput.selectedIndex].value
  	const quality = qualityInput.options[qualityInput.selectedIndex].value
  	const resolution = resolutionInput.options[resolutionInput.selectedIndex].value
  	const form = new FormData();
  	form.append('image', inputFile.files[0]);
  	form.append('format', format);
  	form.append('quality', quality);
  	form.append('resolution', resolution);
    const infoFileProcessed = await axios.post('/convertwebp50', form)
    inputFile.files[0] = null
    renderizarCardFileConverted(infoFileProcessed.data)
  } catch (error) {
    console.error(error);
  }
}

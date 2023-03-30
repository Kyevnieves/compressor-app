import { uploadImage } from "../libs/cloudinary.js";
import fs from 'fs-extra'
import sharp from 'sharp'
import {dirname, __dirname } from '../public/converted/index.js'
console.log(__dirname)

const eliminarExtension = (string)=>{
  let partsOfString = string.split('.')
  return partsOfString[0]
}

const dir = "D:/Kyev/Sharp App/server/public/converted/"
fs.ensureDir(dir, err => {
  console.log(err) // => null
  // dir has now been created, including the directory it is to be placed in
})

const calcularFileExtension = (tamañoImagenBruto) => {
  if(tamañoImagenBruto < 1000000){
      let imageSize = 0
      imageSize = tamañoImagenBruto / 1000
      imageSize = String(imageSize).split('.')
      imageSize = imageSize[0]
      imageSize = `${imageSize}Kb`
      return imageSize
    } else {
      let imageSize = 0
      imageSize = tamañoImagenBruto / 1000000
      imageSize = String(imageSize).substring(0,4)
      imageSize = `${imageSize}MB`
      return imageSize
    }
}

const calcularResize = ( resolution )=>{
  if(resolution == "50"){
    return 
  }
}


export const convertWebp50 = async (req, res) =>{
  if(req.files){
    const { image } = req.files
    const { format, quality, resolution } = req.body
    const imageWithExtension = image.name
    const imgQuality = Number(quality)
    const imgResolution = Number(resolution)
    let imageSizeBefore = calcularFileExtension(image.size)
    const nameImage = eliminarExtension(imageWithExtension)

   // AQUI COMIENZA EL IF WEBP 
    if(format == "webp"){
   // AQUI COMIENZA LA CONVERSION 

    const imageToConvert = sharp(image.tempFilePath)

    sharp(image.tempFilePath)
      .metadata()
      .then(function(metadata) {
      return imageToConvert
      .resize(Math.round(metadata.width * imgResolution))
      .webp({quality: imgQuality})
      .toBuffer();
      })

      .then( async (data) => {
        // CONVIRTIENDO BUFFER WEBP (50%) A ARCHIVO
        const response = await sharp(data).toFile(`server/public/converted/${nameImage}.${format}`);
        // CALCULANDO SI ES KB O MB
        const imageSizeAfter = calcularFileExtension(response.size)
        // ELIMINANDO BUFFER DEL SERVIDOR
        fs.remove(image.tempFilePath)
        // SUBIENDO IMAGEN A CLOUDINARY
        const uploadedImage = await uploadImage(dirname + `/${nameImage}.${format}`)
        // ELIMINADO IMAGEN WEBP DEL SERVIDOR
        const deleteImg = await fs.remove(dirname + `/${nameImage}.${format}`)
        if(uploadedImage){
        res.json({
          nameImage: nameImage,
          sizeBefore: imageSizeBefore,
          sizeAfter: imageSizeAfter,
          secure_url: uploadedImage.secure_url
        })
        }
      })
   // AQUI TERMINA LA CONVERSION
      }
   // AQUI TERMINA EL IF WEBP

   // AQUI COMIENZA EL IF PNG
    if(format == "png"){
   // AQUI COMIENZA LA CONVERSION 
    const imageToConvert = sharp(image.tempFilePath)

    sharp(image.tempFilePath)
      .metadata()
      .then(function(metadata) {
      return imageToConvert
      .resize(Math.round(metadata.width * imgResolution))
      .png({quality: imgQuality})
      .toBuffer();
      })
      .then( async (data) => {
        // CONVIRTIENDO BUFFER WEBP (50%) A ARCHIVO
        const response = await sharp(data).toFile(`server/public/converted/${nameImage}.${format}`);
        // CALCULANDO SI ES KB O MB
        const imageSizeAfter = calcularFileExtension(response.size)
        // ELIMINANDO BUFFER DEL SERVIDOR
        fs.remove(image.tempFilePath)
        // SUBIENDO IMAGEN A CLOUDINARY
        const uploadedImage = await uploadImage(dirname + `/${nameImage}.${format}`)
        // ELIMINADO IMAGEN WEBP DEL SERVIDOR
        const deleteImg = await fs.remove(dirname + `/${nameImage}.${format}`)
        if(uploadedImage){
        res.json({
          nameImage: nameImage,
          sizeBefore: imageSizeBefore,
          sizeAfter: imageSizeAfter,
          secure_url: uploadedImage.secure_url
        })
        }
      })
   // AQUI TERMINA LA CONVERSION
      }
   // AQUI TERMINA EL IF PNG

   // AQUI COMIENZA EL IF JPG
    if(format == "jpeg"){
   // AQUI COMIENZA LA CONVERSION 
    const imageToConvert = sharp(image.tempFilePath)

    sharp(image.tempFilePath)
      .metadata()
      .then(function(metadata) {
      return imageToConvert
      .resize(Math.round(metadata.width * imgResolution))
      .jpeg({quality: imgQuality})
      .toBuffer();
      })
      .then( async (data) => {
        // CONVIRTIENDO BUFFER WEBP (50%) A ARCHIVO
        const response = await sharp(data).toFile(`server/public/converted/${nameImage}.${format}`);
        // CALCULANDO SI ES KB O MB
        const imageSizeAfter = calcularFileExtension(response.size)
        // ELIMINANDO BUFFER DEL SERVIDOR
        fs.remove(image.tempFilePath)
        // SUBIENDO IMAGEN A CLOUDINARY
        const uploadedImage = await uploadImage(dirname + `/${nameImage}.${format}`)
        // ELIMINADO IMAGEN WEBP DEL SERVIDOR
        const deleteImg = await fs.remove(dirname + `/${nameImage}.${format}`)
        if(uploadedImage){
        res.json({
          nameImage: nameImage,
          sizeBefore: imageSizeBefore,
          sizeAfter: imageSizeAfter,
          secure_url: uploadedImage.secure_url
        })
        }
      })
   // AQUI TERMINA LA CONVERSION
      }
   // AQUI TERMINA EL IF JPG

   // AQUI COMIENZA EL IF AVIF
    if(format == "avif"){
   // AQUI COMIENZA LA CONVERSION 
    const imageToConvert = sharp(image.tempFilePath)

    sharp(image.tempFilePath)
      .metadata()
      .then(function(metadata) {
      return imageToConvert
      .resize(Math.round(metadata.width * imgResolution))
      .avif({quality: imgQuality})
      .toBuffer();
      })
      .then( async (data) => {
        // CONVIRTIENDO BUFFER WEBP (50%) A ARCHIVO
        const response = await sharp(data).toFile(`server/public/converted/${nameImage}.${format}`);
        // CALCULANDO SI ES KB O MB
        const imageSizeAfter = calcularFileExtension(response.size)
        // ELIMINANDO BUFFER DEL SERVIDOR
        fs.remove(image.tempFilePath)
        // SUBIENDO IMAGEN A CLOUDINARY
        const uploadedImage = await uploadImage(dirname + `/${nameImage}.${format}`)
        // ELIMINADO IMAGEN WEBP DEL SERVIDOR
        const deleteImg = await fs.remove(dirname + `/${nameImage}.${format}`)
        if(uploadedImage){
        res.json({
          nameImage: nameImage,
          sizeBefore: imageSizeBefore,
          sizeAfter: imageSizeAfter,
          secure_url: uploadedImage.secure_url
        })
        }
      })
   // AQUI TERMINA LA CONVERSION
      }
   // AQUI TERMINA EL IF AVIF

  }
  else {  
    res.send("No existe un archivo")
  }
}

export const convertWebpResize50 = (req, res) => {
  if(req.files){
    const {image} = req.files
    
    const imageWithExtension = image.name

    const nameImage = eliminarExtension(imageWithExtension)

    const imageToConvert = sharp(image.tempFilePath)

    imageToConvert
      .metadata()
      .then(function(metadata) {
      return imageToConvert
      .resize(Math.round(metadata.width / 2))
      .webp()
      .toBuffer();
      })

    .then( async (data) => {
        const response = await sharp(data).toFile(`server/public/converted/${nameImage}.webp`);
        fs.remove(image.tempFilePath)
        const uploadedImage = await uploadImage(dirname + `/${nameImage}.webp`)
        if(uploadedImage){
        res.send(`<a href="${uploadedImage.secure_url}">Descargar imagen comprimida</a>`)
        }
      })
  } else {
    res.send("No existe un archivo")
  }
}

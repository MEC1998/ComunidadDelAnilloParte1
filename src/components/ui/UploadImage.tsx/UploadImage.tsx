import { FC } from "react";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import noImage from "../../../assets/images/noImage.jpeg";
import { ImageService } from "../../../services/ImageService";
import { IImagen } from "../../../types/IImagen";
import styles from "./UploadImage.module.css";

interface IUploadImage {
  image?: string | null;
  setImage?: (image: string | null) => void;
  imageObjeto?: IImagen | null;
  setImageObjeto?: (image: IImagen | null) => void;
  typeElement?: string;
  disabled?: boolean;
}

export const UploadImage: FC<IUploadImage> = ({
  image,
  setImage,
  imageObjeto,
  setImageObjeto,
  typeElement,
  disabled,
}) => {
  const imageService = new ImageService("images");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("uploads", file);

      Swal.fire({
        title: "Subiendo...",
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const data = await imageService.uploadImage(formData);

        if (setImage) {
          setImage(data);
        }

        if (setImageObjeto) {
          setImageObjeto({
            url: data,
            name: file.name,
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "No se pudo subir la imagen.", "error");
      } finally {
        Swal.close();
      }
    }
  };

  const elementActive = { id: 45 };

  const handleDeleteImagen = async () => {
    if (imageObjeto && setImageObjeto && elementActive && typeElement) {
      await imageService
        .deleteImgItems(elementActive?.id, imageObjeto.url, typeElement)
        .then(() => {
          setImageObjeto(null);
        });
    } else if (image && setImage) {
      await imageService.deleteImgCloudinary(image).then(() => {
        setImage(null);
      });
    }
  };

  return (
    <div className={styles.uploadContainer}>
      {image || imageObjeto ? (
        <div className={styles.uploadedImageContainer}>
          <div className={styles.uploadButton}>
            <Button
              onClick={handleDeleteImagen}
              variant="outlined"
              color="error"
            >
              Eliminar imagen
            </Button>
          </div>
          <img
            src={imageObjeto ? imageObjeto.url : image!}
            alt="Uploaded"
            className={styles.uploadedImage}
          />
        </div>
      ) : (
        <>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            onChange={handleFileChange}
            disabled={disabled}
          />
          <label htmlFor="contained-button-file">
            <Button variant="outlined" component="span" disabled={disabled}>
              Elige una imagen
            </Button>
          </label>
          <div>
            <img
              src={noImage}
              alt="Uploaded"
              className={styles.noImage}
            />
          </div>
        </>
      )}
    </div>
  );
};

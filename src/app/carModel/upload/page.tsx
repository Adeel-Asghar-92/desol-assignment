"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

import axios from "axios";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import {
  CarListingInput,
  CarListingSchema,
} from "@/lib/validations/carListing.schema";
import FormInput from "@/components/Form/FormInput";
import { LoadingButton } from "@/components/Buttons/LoadingButton";
import { carListingAction } from "@/actions/car/listing";

const UploadCarModel = () => {
  const [listing, setListing] = useState({
    userId: "",
    model: "",
    price: 0,
    phoneNumber: "",
    city: "",
    maxImages: 0,
    images: [],
    preview: [],
  });

  const [requestLoading, setRequestLoading] = useState(false);
  const methods = useForm<CarListingInput>({
    resolver: zodResolver(CarListingSchema),
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const handleChange = (e: any) => {
    setListing({ ...listing, [e.target.name]: e.target.value });
  };
  const handleImageChange = async (e: any) => {
    const files: any = Array.from(e.target.files);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    await axios({
      method: "post",
      url: "http://localhost:8000/api/carListing/imageupload",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(({ data }) => {
        setListing((prevListing: any) => ({
          ...prevListing,
          images: data.media,
        }));
      })
      .catch((err) => {
        console.log(err);
        alert(`Error: ${err}`);
      });
    if (files.length > listing.maxImages) {
      alert(`You can only upload up to ${listing.maxImages} images.`);
      return;
    }
    const base64Images = await Promise.all(
      files.map((file: any) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    );
    setListing((prevListing: any) => ({
      ...prevListing,
      preview: base64Images,
    }));
    return base64Images;
  };

  const handleSubmit1 = async () => {
    setRequestLoading(true);
    await carListingAction(listing)
      .then(({ data }) => {
        alert(`Submitted successfully! `);
      })
      .catch((error) => {
        if (error instanceof Error) {
          // handleApiError(error);
          alert(`Error:${error}`);
        } else {
          console.log("Error message:", error.message);
        }
      })
      .finally(() => {
        setRequestLoading(false);
      });
  };

  const onSubmitHandler: SubmitHandler<CarListingInput> = (values) => {
    handleSubmit1();
  };

  const handleDeleteImage = (index: any) => {
    setListing((prevListing) => ({
      ...prevListing,
      images: prevListing.images.filter((_, i) => i !== index), // Remove image at index
    }));
  };

  return (
    <div>
      <h3>Updload car model</h3>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="">
          <FormInput
            label="Model"
            name="model"
            type="string"
            onChange={handleChange}
          />
          <FormInput
            label="Price"
            name="price"
            type="number"
            valueAsNumber={true}
            onChange={handleChange}
          />
          <FormInput
            label="Phone Number"
            name="phoneNumber"
            type="number"
            onChange={handleChange}
          />
          <FormInput
            label="City"
            name="city"
            type="string"
            onChange={handleChange}
          />
          <FormInput
            label="Max Images"
            name="maxImages"
            type="number"
            valueAsNumber={true}
            onChange={handleChange}
          />

          <FormInput
            label="Images"
            name="images"
            type="file"
            onChange={handleImageChange}
          />

          <div>
            {listing.preview.map((image, index) => (
              <div key={index} style={{ marginTop: "10px" }}>
                <img
                  src={image}
                  alt={`Selected Image ${index}`}
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    marginRight: "10px",
                  }}
                />
                <button type="button" onClick={() => handleDeleteImage(index)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
          <LoadingButton loading={requestLoading} textColor="007bff">
            Submit
          </LoadingButton>
        </form>
      </FormProvider>
    </div>
  );
};

export default UploadCarModel;

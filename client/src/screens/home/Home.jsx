import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAddressData } from "../../services/item.service";

import { useNavigate } from "react-router-dom";
const FormStep = ({ title, children }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold">{title}</h2>
    {children}
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    id: "",
    itemName: "",
    pickupAddress: {
      name: "",
      email: "",
      phoneNumber: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    deliveryAddress: {
      name: "",
      email: "",
      phoneNumber: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    status: "Pending",
    sku: "",
  });

  const [errors, setErrors] = useState({});
  useEffect(() => {
    // console.log(formData)
  }, [formData]);
  const handleInputChange = (section, field) => async (e) => {
    const value = e.target.value;
    if (field == "zipCode" && value.length == 6) {
      let data = await getAddressData(535183);
      console.log(data)
    }
    console.log(value, section, field);

    if (section === "pickupAddress" || section === "deliveryAddress") {
      setFormData({
        ...formData,
        [section]: { ...formData[section], [field]: value },
      });
    } else if (section === "dimensions") {
      setFormData({
        ...formData,
        dimensions: { ...formData.dimensions, [field]: value },
      });
    } else {
      setFormData({ ...formData, [field]: value });
    }
    setErrors((prevErrors) => ({ ...prevErrors, [`${section}.${field}`]: "" }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (step == 1) {
      var requiredFields = [
        ["pickupAddress", "name"],
        ["pickupAddress", "email"],
        ["pickupAddress", "phoneNumber"],
        ["pickupAddress", "street"],
        ["pickupAddress", "city"],
        ["pickupAddress", "state"],
        ["pickupAddress", "zipCode"],
        ["pickupAddress", "country"],
      ];
    }
    else if (step == 2) {
      var requiredFields = [
        ["deliveryAddress", "name"],
        ["deliveryAddress", "email"],
        ["deliveryAddress", "phoneNumber"],
        ["deliveryAddress", "street"],
        ["deliveryAddress", "city"],
        ["deliveryAddress", "state"],
        ["deliveryAddress", "zipCode"],
        ["deliveryAddress", "country"],
      ]
    }
    else {
      var requiredFields = [
        ["dimensions", "length"],
        ["dimensions", "width"],
        ["dimensions", "height"],
        ["", "itemName"],
        ["", "weight"],
        ["", "sku"],
      ]
    }

    requiredFields.forEach(([section, field]) => {
      const value = section === "dimensions"
        ? formData.dimensions[field]
        : section
          ? formData[section][field]
          : formData[field];
      if (!value) {
        newErrors[`${section}.${field}`] = `${field} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleNextStep = () => {
    console.log(validateFields())
    if (validateFields()) {
      setStep((prevStep) => Math.min(prevStep + 1, 3));
    }
  };

  const handlePrevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSubmit = () => {
    if (validateFields()) {
      console.log("Final Data:", formData);
      navigate("/paayment")
    }
  };

  const renderFieldWithError = (label, value, onChange, placeholder, errorKey) => (
    <div>
      <Label>{label}</Label>
      <Input value={value} onChange={onChange} placeholder={placeholder} />
      {errors[errorKey] && <p className="text-red-500 text-sm">{errors[errorKey]}</p>}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <form className="space-y-6">
        {step === 1 && (
          <FormStep title="Pickup Information">
            {renderFieldWithError(
              "Name",
              formData.pickupAddress.name,
              handleInputChange("pickupAddress", "name"),
              "Enter pickup contact name",
              "pickupAddress.name"
            )}
            {renderFieldWithError(
              "Email",
              formData.pickupAddress.email,
              handleInputChange("pickupAddress", "email"),
              "Enter pickup contact email",
              "pickupAddress.email"
            )}
            {renderFieldWithError(
              "Phone Number",
              formData.pickupAddress.phoneNumber,
              handleInputChange("pickupAddress", "phoneNumber"),
              "Enter pickup contact phone number",
              "pickupAddress.phoneNumber"
            )}
            {renderFieldWithError(
              "Street",
              formData.pickupAddress.street,
              handleInputChange("pickupAddress", "street"),
              "Enter street address",
              "pickupAddress.street"
            )}
            {renderFieldWithError(
              "Zip Code",
              formData.pickupAddress.zipCode,
              handleInputChange("pickupAddress", "zipCode"),
              "Enter zip code",
              "pickupAddress.zipCode"
            )}
            {formData.pickupAddress.zipCode && renderFieldWithError(
              "City",
              () => { },
              handleInputChange("pickupAddress", "city"),
              "Enter city",
              "pickupAddress.city"
            )}
            {formData.pickupAddress.zipCode && renderFieldWithError(
              "State",
              formData.pickupAddress.state,
              handleInputChange("pickupAddress", "state"),
              "Enter state",
              "pickupAddress.state"
            )}

            {formData.pickupAddress.zipCode && renderFieldWithError(
              "Country",
              formData.pickupAddress.country,
              handleInputChange("pickupAddress", "country"),
              "Enter country",
              "pickupAddress.country"
            )}
          </FormStep>
        )}

        {step === 2 && (
          <FormStep title="Delivery Information">
            {renderFieldWithError(
              "Name",
              formData.deliveryAddress.name,
              handleInputChange("deliveryAddress", "name"),
              "Enter delivery contact name",
              "deliveryAddress.name"
            )}
            {renderFieldWithError(
              "Email",
              formData.deliveryAddress.email,
              handleInputChange("deliveryAddress", "email"),
              "Enter delivery contact email",
              "deliveryAddress.email"
            )}
            {renderFieldWithError(
              "Phone Number",
              formData.deliveryAddress.phoneNumber,
              handleInputChange("deliveryAddress", "phoneNumber"),
              "Enter delivery contact phone number",
              "deliveryAddress.phoneNumber"
            )}
            {renderFieldWithError(
              "Street",
              formData.deliveryAddress.street,
              handleInputChange("deliveryAddress", "street"),
              "Enter street address",
              "deliveryAddress.street"
            )}
            {renderFieldWithError(
              "Zip Code",
              formData.deliveryAddress.zipCode,
              handleInputChange("deliveryAddress", "zipCode"),
              "Enter zip code",
              "deliveryAddress.zipCode"
            )}
            {renderFieldWithError(
              "City",
              formData.deliveryAddress.city,
              handleInputChange("deliveryAddress", "city"),
              "Enter city",
              "deliveryAddress.city"
            )}
            {renderFieldWithError(
              "State",
              formData.deliveryAddress.state,
              handleInputChange("deliveryAddress", "state"),
              "Enter state",
              "deliveryAddress.state"
            )}

            {renderFieldWithError(
              "Country",
              formData.deliveryAddress.country,
              handleInputChange("deliveryAddress", "country"),
              "Enter country",
              "deliveryAddress.country"
            )}
          </FormStep>
        )}

        {step === 3 && (
          <FormStep title="Item Details">
            {renderFieldWithError(
              "Item Name",
              formData.itemName,
              handleInputChange("", "itemName"),
              "Enter item name",
              "itemName"
            )}
            {renderFieldWithError(
              "Weight",
              formData.weight,
              handleInputChange("", "weight"),
              "Enter weight",
              "weight"
            )}
            {renderFieldWithError(
              "Length",
              formData.dimensions.length,
              handleInputChange("dimensions", "length"),
              "Enter length",
              "dimensions.length"
            )}
            {renderFieldWithError(
              "Width",
              formData.dimensions.width,
              handleInputChange("dimensions", "width"),
              "Enter width",
              "dimensions.width"
            )}
            {renderFieldWithError(
              "Height",
              formData.dimensions.height,
              handleInputChange("dimensions", "height"),
              "Enter height",
              "dimensions.height"
            )}
            {renderFieldWithError(
              "SKU",
              formData.sku,
              handleInputChange("", "sku"),
              "Enter SKU",
              "sku"
            )}
          </FormStep>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <Button type="button" onClick={handlePrevStep}>
              Back
            </Button>
          )}
          <Button
            type="button"
            onClick={step === 3 ? handleSubmit : handleNextStep}
          >
            {step === 3 ? "Continue to Payment" : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Home;

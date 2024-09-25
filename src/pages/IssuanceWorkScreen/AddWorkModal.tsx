import React, { useState, ReactNode, FormEvent, ChangeEvent } from "react";
import {
  ModalBackground,
  ModalContainer,
  CloseButton,
  ModalHeader,
  ModalHeaderTitle,
  ModalPadding,
  ModalContent,
} from "../../styles/styledModal";
import { selectedRowAtom } from "../../recoil/atoms/selected";
import { useRecoilValue } from "recoil";
import { deleteCodeInfo } from "../../recoil/atoms/codeInfo";
import confetti from "canvas-confetti";
import success from "../../components/assets/green-tick.png";
import { FormContainer, FormRow, FormLabel, FormInput, FormButton, FormError } from "../../styles/styledForm";
import { dynamicObject } from "../../utils/types";

// Define the shape of form data and error messages
interface FormData {
    name: string;
    email: string;
  }
  
  interface FormErrors {
    name: string;
    email: string;
  }


// 작업 추가
const AddWorkModal: React.FC<{
  children: ReactNode;
  handleRefresh: () => void;
}> = ({ children, handleRefresh }) => {
  const selectedRow = useRecoilValue(selectedRowAtom);
  const [isModalOpen, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const openModal = () => {
    setResponseMessage(null);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleCancel = (event: MouseEvent) => {
    event.preventDefault();
    setModalOpen(false);
  };

  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({ name: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Clear error for the current field
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  // Validate form inputs
  const validate = (): boolean => {
    let tempErrors: FormErrors = { name: '', email: '' };
    let isValid = true;

    if (!formData.name) {
      tempErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
      isValid = false;
    }

    console.log(tempErrors);
    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      setFormData({ name: '', email: '' });
      setErrors({ name: '', email: '' });
      setIsSubmitted(false); // Reset submission state
    }
    console.log("handle submit")
  };

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <ModalBackground isVisible={isModalOpen}>
        <ModalContainer width="600px">
          <ModalPadding>
            <ModalHeader backgroundColor="var(--layoutBlue)">
              <ModalHeaderTitle>
                <h3 style={{ color: "white" }}>작업 추가</h3>
              </ModalHeaderTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
          </ModalPadding>
          <ModalContent>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px 20px",
              }}
            >
              {responseMessage ? (
                <div
                  style={{
                    padding: "20px 20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src={success} width={"40px"} />

                  <p style={{ padding: "5px 5px", fontWeight: "bold" }}>
                    {responseMessage}
                  </p>
                </div>
              ) : (
                <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormRow>
          <FormLabel htmlFor="name">Name:</FormLabel>
          <FormInput
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            // required
          />
        </FormRow>
        {isSubmitted && errors?.name && <FormError>{errors?.name}</FormError>} {/* Render error if exists */}

        <FormRow>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <FormInput
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            // required
          />
        </FormRow>
        {isSubmitted && errors?.email && <FormError>{errors?.email}</FormError>} {/* Render error if exists */}

        <FormButton type="submit">Submit</FormButton>
      </form>
    </FormContainer>
              )}
            </div>
          </ModalContent>
        </ModalContainer>
      </ModalBackground>
    </>
  );
};

export default AddWorkModal;

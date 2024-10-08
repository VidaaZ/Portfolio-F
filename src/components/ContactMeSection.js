import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const ContactMeSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  // Validation schema for the form
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    type: Yup.string(),
    comment: Yup.string()
      .required("Required")
      .min(25, "Must be at least 25 characters"),
  });

  // useFormik hook
  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe", // Default value
      comment: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // Submit the form data
      await submit("/api/contact", values);
    },
  });

  // Effect to handle response changes for alert display
  useEffect(() => {
    if (response) {
      if (response.type === "success") {
        // Show success alert with the first name of the user
        onOpen({
          title: "Submission Successful",
          description: `Thanks for your submission, ${formik.values.firstName}!`,
          status: "success",
        });
        formik.resetForm(); // Reset form on success
      } else if (response.type === "error") {
        // Show error alert
        onOpen({
          title: "Submission Failed",
          description: response.message,
          status: "error",
        });
      }
    }
  }, [response, onOpen, formik]);

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl
                isInvalid={
                  formik.touched.firstName && !!formik.errors.firstName
                }
              >
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input id="firstName" {...formik.getFieldProps("firstName")} />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                ) : null}
              </FormControl>

              <FormControl
                isInvalid={formik.touched.email && !!formik.errors.email}
              >
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                ) : null}
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" {...formik.getFieldProps("type")}>
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

              <FormControl
                isInvalid={formik.touched.comment && !!formik.errors.comment}
              >
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  height={250}
                  {...formik.getFieldProps("comment")}
                />
                {formik.touched.comment && formik.errors.comment ? (
                  <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
                ) : null}
              </FormControl>

              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                isLoading={isLoading}
              >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default ContactMeSection;

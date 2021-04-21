import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import KeyGen from "../components/key_gen/KeyGen";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("Passphrase Tests", () => {

  jest.setTimeout(50000)

  // test("KeyGen Works", async () => {
    
  //   render(<KeyGen />);

  //   let name = "test";
  //   let em = "test@test.test";
  //   let pw = "t";

  //   userEvent.type(screen.getByLabelText(/name/i), name);
  //   userEvent.type(screen.getByLabelText(/email/i), em);
  //   userEvent.type(screen.getByLabelText(/passphrase/i), pw);

  //   userEvent.click(screen.getByRole("button", { name: /generate/i }));
  //   userEvent.type(screen.getByLabelText("Passphrase Confirmation *", {exact:true}), pw);

  //   // // act(() => {
  //   //   userEvent.click(screen.getByRole("button", { name: /submit/i }));
  //   // // });
   
  //   // await waitFor(() => {
  //   //   expect(screen.findByTestId("privateKey")).toBeTruthy();
  //   // });
  //   // userEvent.click(await screen.findByTestId("privateKey"));

  //   // expect(
  //   //   await screen.findByText(/-----BEGIN PGP PRIVATE KEY BLOCK-----/i)
  //   // ).toBeTruthy();

  //   // userEvent.click(await screen.findByTestId("publicKey"));

  //   // expect(
  //   //   await screen.findByText(/-----BEGIN PGP PUBLIC KEY BLOCK-----/i)
  //   // ).toBeTruthy();
  // });

  test("Incorrect PW", async () => {
    render(<KeyGen />);

    let name = "test";
    let em = "test@test.test";
    let pw = "t";

    userEvent.type(screen.getByLabelText(/name/i), name);
    userEvent.type(screen.getByLabelText(/email/i), em);
    userEvent.type(screen.getByLabelText(/passphrase/i), pw);

    userEvent.click(screen.getByRole("button", { name: /generate/i }));
    userEvent.type(screen.getByLabelText("Passphrase Confirmation *", {exact:true}), pw);

    act(() => {
      userEvent.click(screen.getByRole("button", { name: /submit/i }));
    });
    expect(screen.getByLabelText(/Please Try Again/i)).toBeInTheDocument();
  });

  test("Incorrect EM ", async () => {
    render(<KeyGen />);

    let name = "test";
    let em = "test@test.test";
    let pw = "t";

    userEvent.type(screen.getByLabelText(/name/i), name);
    userEvent.type(screen.getByLabelText(/email/i), "em");
    userEvent.type(screen.getByLabelText(/passphrase/i), pw);

    userEvent.click(screen.getByRole("button", { name: /generate/i }));

    expect(
      screen.getByText("Invalid Email Format", { exact: false })
    ).toBeInTheDocument();
  });
});

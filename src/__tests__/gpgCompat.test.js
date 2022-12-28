import React from "react";
import { render, screen } from "@testing-library/react";
import Decrypt from "../components/decrypt/Decrypt";
import Encrypt from "../components/encrypt/Encrypt";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import {
  gpgPw,
  gpgPwEnc,
  gpgPubKey,
  gpgKeyMessage,
  gpgPrivKey,
} from "../__mocks__/gpg";

describe("Cross Compatability with GPG", () => {
  test("Decrypt text", async () => {
    render(<Decrypt />);
    userEvent.click(screen.getByLabelText(/Paste my data/i));

    userEvent.type(
      screen.getByLabelText(
        /Enter something like: -----BEGIN PGP MESSAGE-----/i
      ),
      gpgPwEnc
    );
    userEvent.click(screen.getByLabelText(/file type/i));
    userEvent.click(screen.getByText(/.txt/i));
    userEvent.type(screen.getByLabelText(/passphrase/i), gpgPw);
    act(() => {
      userEvent.click(screen.getByRole("button", { name: /decrypt/i }));
    });

    userEvent.click(await screen.findByRole("button", { name: /in browser/i }));
    screen.getByText("test");
  });

  test("Decrypt with RSA Key", async () => {
    render(<Decrypt />);
    userEvent.click(screen.getByText("Key Pair"));
    userEvent.click(screen.getByLabelText(/Paste my data/i));

    userEvent.type(
      screen.getByLabelText(
        /Enter something like: -----BEGIN PGP MESSAGE-----/i
      ),
      gpgKeyMessage
    );
    userEvent.click(screen.getByLabelText(/file type/i));
    userEvent.click(screen.getByText(/.txt/i));

    userEvent.click(screen.getByLabelText(/paste in text/i));

    const rsaIn = screen.getByLabelText(/RSA Key Input/i);
    userEvent.type(rsaIn, gpgPrivKey);

    userEvent.type(screen.getByLabelText(/private key passphrase*/i), gpgPw);

    act(() => {
      userEvent.click(screen.getByRole("button", { name: /decrypt/i }));
    });

    userEvent.click(await screen.findByRole("button", { name: /in browser/i }));
    screen.getByText("test");
  });

  test("GPG Key Encrypt", async () => {
    render(<Encrypt />);

    let message = "PEP Test.";

    userEvent.click(screen.getByText("Key Pair"));
    userEvent.click(screen.getByLabelText(/type my secret/i));

    const encIn = screen.getByLabelText(/text to encrypt/i);
    userEvent.type(encIn, message);

    expect(encIn).toHaveValue(message);

    userEvent.click(screen.getByLabelText(/paste in text/i));

    const rsaIn = screen.getByLabelText(/RSA Key Input/i);
    userEvent.type(rsaIn, gpgPubKey);

    act(() => {
      userEvent.click(screen.getByRole("button", { name: /encrypt/i }));
    });

    userEvent.click(await screen.findByRole("button", { name: /in browser/i }));

    let pre = screen.getByText(/-----BEGIN PGP MESSAGE----/i);
    expect(pre).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import Decrypt from "../components/decrypt/Decrypt";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { pwTest, testPwEnc } from "../__mocks__/decrypt";

describe("Decrypt: Passphrase Tests", () => {
  test("Decrypt text", async () => {
    render(<Decrypt />);
    userEvent.click(screen.getByLabelText(/Paste my gibberish/i));

    userEvent.type(
      screen.getByLabelText(
        /Enter something like: -----BEGIN PGP MESSAGE-----/i
      ),
      testPwEnc
    );
    userEvent.click(screen.getByLabelText(/file type/i));
    userEvent.click(screen.getByText(/.txt/i));
    userEvent.type(screen.getByLabelText(/passphrase/i), pwTest);
    act(() => {
      userEvent.click(screen.getByRole("button", { name: /decrypt/i }));
    });

    userEvent.click(await screen.findByRole("button", { name: /in browser/i }));
    screen.getByText("Test");
  });
  test("Wrong pw", async () => {
    render(<Decrypt />);
    userEvent.click(screen.getByLabelText(/Paste my gibberish/i));

    userEvent.type(
      screen.getByLabelText(
        /Enter something like: -----BEGIN PGP MESSAGE-----/i
      ),
      testPwEnc
    );
    userEvent.click(screen.getByLabelText(/file type/i));
    userEvent.click(screen.getByText(/.txt/i));
    userEvent.type(screen.getByLabelText(/passphrase/i), "pwTest");
    act(() => {
      userEvent.click(screen.getByRole("button", { name: /decrypt/i }));
    });
    expect(await screen.findByText("Passphrase is incorrect!")).toBeTruthy();
  });

  test("bad format", async () => {
    render(<Decrypt />);
    userEvent.click(screen.getByLabelText(/Paste my gibberish/i));

    userEvent.type(
      screen.getByLabelText(
        /Enter something like: -----BEGIN PGP MESSAGE-----/i
      ),
      "testPwEnc"
    );
    userEvent.click(screen.getByLabelText(/file type/i));
    userEvent.click(screen.getByText(/.txt/i));
    userEvent.type(screen.getByLabelText(/passphrase/i), "pwTest");
    act(() => {
      userEvent.click(screen.getByRole("button", { name: /decrypt/i }));
    });
    expect(
      screen.findByText(
        "Looks like there is a format issue with your Encrypted text. We recommend using the original text file supplied!"
      )
    ).toBeTruthy();
  });
});

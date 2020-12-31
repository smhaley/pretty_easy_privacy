import React from "react";
import { render, screen } from "@testing-library/react";
import Decrypt from "../components/decrypt/Decrypt";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { privKey, testPw, pubKey } from "../__mocks__/keys";
import { testKeyEnc } from "../__mocks__/decrypt";

describe("Decrypt: Key Tests", () => {
  test("Decrypt text", async () => {
    render(<Decrypt />);
    userEvent.click(screen.getByText("Key Pair (Asymmetric)"));
    userEvent.click(screen.getByLabelText(/Paste my gibberish/i));

    userEvent.type(
      screen.getByLabelText(
        /Enter something like: -----BEGIN PGP MESSAGE-----/i
      ),
      testKeyEnc
    );
    userEvent.click(screen.getByLabelText(/file type/i));
    userEvent.click(screen.getByText(/.txt/i));

    userEvent.click(screen.getByLabelText(/paste in text/i));

    const rsaIn = screen.getByLabelText(/RSA Key Input/i);
    userEvent.type(rsaIn, privKey);

    userEvent.type(screen.getByLabelText(/private key passphrase*/i), testPw);

    act(() => {
      userEvent.click(screen.getByRole("button", { name: /decrypt/i }));
    });

    userEvent.click(await screen.findByRole("button", { name: /in browser/i }));
    screen.getByText("test");
  });

test("Decrypt with public key", async () => {
    render(<Decrypt />);
    userEvent.click(screen.getByText("Key Pair (Asymmetric)"));
    userEvent.click(screen.getByLabelText(/Paste my gibberish/i));

    userEvent.type(
      screen.getByLabelText(
        /Enter something like: -----BEGIN PGP MESSAGE-----/i
      ),
      "testKeyEnc"
    );
    userEvent.click(screen.getByLabelText(/file type/i));
    userEvent.click(screen.getByText(/.txt/i));

    userEvent.click(screen.getByLabelText(/paste in text/i));

    const rsaIn = screen.getByLabelText(/RSA Key Input/i);
    userEvent.type(rsaIn, pubKey);

    userEvent.type(screen.getByLabelText(/private key passphrase*/i), testPw);

    act(() => {
      userEvent.click(screen.getByRole("button", { name: /decrypt/i }));
    });
    expect(
      await screen.findByText(
        "A Public Key has been supplied. Please provide your Private Key!"
      )
    ).toBeTruthy();
  });

  test("Decrypt Bad Pkey pw", async () => {
    render(<Decrypt />);
    userEvent.click(screen.getByText("Key Pair (Asymmetric)"));
    userEvent.click(screen.getByLabelText(/Paste my gibberish/i));

    userEvent.type(
      screen.getByLabelText(
        /Enter something like: -----BEGIN PGP MESSAGE-----/i
      ),
      testKeyEnc
    );
    userEvent.click(screen.getByLabelText(/file type/i));
    userEvent.click(screen.getByText(/.txt/i));

    userEvent.click(screen.getByLabelText(/paste in text/i));

    const rsaIn = screen.getByLabelText(/RSA Key Input/i);
    userEvent.type(rsaIn, privKey);

    userEvent.type(screen.getByLabelText(/private key passphrase*/i), "testPw");

    act(() => {
      userEvent.click(screen.getByRole("button", { name: /decrypt/i }));
    });

    expect(
      await screen.findByText("Incorrect Passphrase! Please try again.")
    ).toBeTruthy();
    // });
  });

  test("Decrypt Bad Input", async () => {
    render(<Decrypt />);
    userEvent.click(screen.getByText("Key Pair (Asymmetric)"));
    userEvent.click(screen.getByLabelText(/Paste my gibberish/i));

    userEvent.type(
      screen.getByLabelText(
        /Enter something like: -----BEGIN PGP MESSAGE-----/i
      ),
      "testKeyEnc"
    );
    userEvent.click(screen.getByLabelText(/file type/i));
    userEvent.click(screen.getByText(/.txt/i));

    userEvent.click(screen.getByLabelText(/paste in text/i));

    const rsaIn = screen.getByLabelText(/RSA Key Input/i);
    userEvent.type(rsaIn, privKey);

    userEvent.type(screen.getByLabelText(/private key passphrase*/i), testPw);

    act(() => {
      userEvent.click(screen.getByRole("button", { name: /decrypt/i }));
    });
    expect(
      await screen.findByText(
        "Looks like there is a format issue with your Encrypted text. We recommend using the original text file supplied!"
      )
    ).toBeTruthy();
  });

  test("Decrypt Bad PKey format", async () => {
    render(<Decrypt />);
    userEvent.click(screen.getByText("Key Pair (Asymmetric)"));
    userEvent.click(screen.getByLabelText(/Paste my gibberish/i));

    userEvent.type(
      screen.getByLabelText(
        /Enter something like: -----BEGIN PGP MESSAGE-----/i
      ),
      testKeyEnc
    );
    userEvent.click(screen.getByLabelText(/file type/i));
    userEvent.click(screen.getByText(/.txt/i));

    userEvent.click(screen.getByLabelText(/paste in text/i));

    const rsaIn = screen.getByLabelText(/RSA Key Input/i);
    userEvent.type(rsaIn, "privKey");

    userEvent.type(screen.getByLabelText(/private key passphrase*/i), "testPw");

    act(() => {
      userEvent.click(screen.getByRole("button", { name: /decrypt/i }));
    });
    expect(
      await screen.findByText("Invalid RSA Key", {
        exact: false,
        timeout: 5000,
      })
    ).toBeTruthy();
  });
});

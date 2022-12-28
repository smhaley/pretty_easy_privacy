import React from "react";
import { render, screen, getNodeText } from "@testing-library/react";
import Encrypt from "../components/encrypt/Encrypt";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { privKey, pubKey, testPw } from "../__mocks__/keys";
import {key, message as pgpMessage, decrypt} from "openpgp"
// const openpgp = require("openpgp");

describe("Encryption Tests", () => {
  describe("Passphrase Tests", () => {
    test("Encrypts text", async () => {
      render(<Encrypt />);

      let message = "PEP Test.";
      let pw = "t";

      userEvent.click(screen.getByLabelText(/type my secret/i));
      userEvent.type(screen.getByLabelText(/text to encrypt/i), message);
      userEvent.type(screen.getByLabelText(/passphrase/i), "t");

      expect(screen.getByLabelText(/text to encrypt/i)).toHaveValue(message);

      userEvent.click(screen.getByRole("button", { name: /encrypt/i }));
      userEvent.type(screen.getByLabelText(/passphrase confirmation/i), pw);

      act(() => {
        userEvent.click(screen.getByRole("button", { name: /submit/i }));
      });

      userEvent.click(
        await screen.findByRole("button", { name: /in browser/i })
      );

      let pre = screen.getByText(/-----BEGIN PGP MESSAGE----/i);

      expect(pre).toBeInTheDocument();

      let encResult = getNodeText(pre);

      let encIn = {
        message: await pgpMessage.readArmored(encResult),
        passwords: pw,
      };

      const { data: decrypted } = await decrypt(encIn);

      expect(decrypted).toBe(message);
    });

    test("PW error", async () => {
      render(<Encrypt />);

      userEvent.click(screen.getByLabelText(/type my secret/i));
      userEvent.type(screen.getByLabelText(/text to encrypt/i), "PEP Test.");
      userEvent.type(screen.getByLabelText(/passphrase/i), "t");

      expect(screen.getByLabelText(/text to encrypt/i)).toHaveValue(
        "PEP Test."
      );

      userEvent.click(screen.getByRole("button", { name: /encrypt/i }));
      userEvent.type(screen.getByLabelText(/passphrase confirmation/i), "a");

      act(() => {
        userEvent.click(screen.getByRole("button", { name: /submit/i }));
      });

      expect(screen.getByLabelText(/Please Try Again/i)).toBeInTheDocument();
    });
  });

  describe("RSA input", () => {
    test("Key Encrypt", async () => {
      render(<Encrypt />);

      let message = "PEP Test.";

      userEvent.click(screen.getByText("Key Pair"));
      userEvent.click(screen.getByLabelText(/type my secret/i));

      const encIn = screen.getByLabelText(/text to encrypt/i);
      userEvent.type(encIn, message);

      expect(encIn).toHaveValue(message);

      userEvent.click(screen.getByLabelText(/paste in text/i));

      const rsaIn = screen.getByLabelText(/RSA Key Input/i);
      userEvent.type(rsaIn, pubKey);

      act(() => {
        userEvent.click(screen.getByRole("button", { name: /encrypt/i }));
      });

      userEvent.click(
        await screen.findByRole("button", { name: /in browser/i })
      );

      let pre = screen.getByText(/-----BEGIN PGP MESSAGE----/i);
      expect(pre).toBeInTheDocument();

      const {
        keys: [privateKey],
      } = await key.readArmored(privKey);
      await privateKey.decrypt(testPw);
      let output = [privateKey];

      let encResult = getNodeText(pre);

      let enc = {
        message: await pgpMessage.readArmored(encResult),
        privateKeys: output,
      };

      const { data: decrypted } = await decrypt(enc);

      expect(decrypted).toBe(message);
    });

    test("Key Encrypt, private", async () => {
      render(<Encrypt />);

      let message = "PEP Test.";

      userEvent.click(screen.getByText("Key Pair"));
      userEvent.click(screen.getByLabelText(/type my secret/i));

      const encIn = screen.getByLabelText(/text to encrypt/i);
      userEvent.type(encIn, "PEP Test.");

      expect(encIn).toHaveValue("PEP Test.");

      userEvent.click(screen.getByLabelText(/paste in text/i));

      const rsaIn = screen.getByLabelText(/RSA Key Input/i);
      userEvent.type(rsaIn, privKey);

      act(() => {
        userEvent.click(screen.getByRole("button", { name: /encrypt/i }));
      });

      userEvent.click(
        await screen.findByRole("button", { name: /in browser/i })
      );
      let pre = screen.getByText(/-----BEGIN PGP MESSAGE----/i);
      expect(pre).toBeInTheDocument();

      const {
        keys: [privateKey],
      } = await key.readArmored(privKey);
      await privateKey.decrypt(testPw);
      let output = [privateKey];

      let encResult = getNodeText(pre);

      let enc = {
        message: await pgpMessage.readArmored(encResult),
        privateKeys: output,
      };

      const { data: decrypted } = await decrypt(enc);

      expect(decrypted).toBe(message);
    });

    test("Invalid Key", async () => {
      render(<Encrypt />);
      userEvent.click(screen.getByText("Key Pair"));
      userEvent.click(screen.getByLabelText(/type my secret/i));

      const encIn = screen.getByLabelText(/text to encrypt/i);
      userEvent.type(encIn, "PEP Test.");
      expect(encIn).toHaveValue("PEP Test.");

      userEvent.click(screen.getByLabelText(/paste in text/i));

      const rsaIn = screen.getByLabelText(/RSA Key Input/i);
      userEvent.type(rsaIn, "pubKey");

      act(() => {
        userEvent.click(screen.getByRole("button", { name: /encrypt/i }));
      });
      userEvent.click(
        await screen.findByText("Invalid RSA Key! Please try again.")
      );
    });

    test("Missing Key, text input", async () => {
      render(<Encrypt />);
      userEvent.click(screen.getByText("Key Pair"));
      userEvent.click(screen.getByLabelText(/type my secret/i));

      const encIn = screen.getByLabelText(/text to encrypt/i);
      userEvent.type(encIn, "PEP Test.");
      expect(encIn).toHaveValue("PEP Test.");

      userEvent.click(screen.getByLabelText(/paste in text/i));

      act(() => {
        userEvent.click(screen.getByRole("button", { name: /encrypt/i }));
      });
      userEvent.click(await screen.findByText("Key Text Required"));
    });
    test("Missing Key, file input", async () => {
      render(<Encrypt />);
      userEvent.click(screen.getByText("Key Pair"));
      userEvent.click(screen.getByLabelText(/type my secret/i));

      const encIn = screen.getByLabelText(/text to encrypt/i);
      userEvent.type(encIn, "PEP Test.");
      expect(encIn).toHaveValue("PEP Test.");

      userEvent.click(screen.getByLabelText(/import from file/i));

      act(() => {
        userEvent.click(screen.getByRole("button", { name: /encrypt/i }));
      });
      userEvent.click(await screen.findByText("File Required"));
    });
  });
});

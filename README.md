# Safe QR Code Scanner App

The frontend is an Expo (React Native) app. The backend is a Flask server that listens on port `5000`.

Run the two apps in separate terminals. Start the backend first, then the frontend, so the phone can reach the server when a QR code is scanned.

What is needed:

- Node.js (current LTS) and npm
- Python 3 and pip
- The [Expo Go](https://expo.dev/go) app on a phone, or an Android emulator / iOS simulator
- The phone and the computer on the same Wi-Fi network (required when you use a physical phone)

## Starting the frontend app

From the project root:

```bash
cd Frontend
npm install
npm start
```

`npm start` runs the Expo dev server. In the terminal that opens:

- Press `a` to open an Android emulator
- Press `i` to open the iOS simulator (macOS only)
- Scan the QR code with Expo Go on your phone

On Windows, `npm run android` starts the Android target directly. `npm run web` starts the web target, but scanning needs a device camera, so use Expo Go or an emulator for the full flow.

The first time you open the scanner, the app asks for camera permission. Allow it, then point the camera at a QR code. The result screen shows the extracted URL.

The app posts that URL to the backend from `Frontend/app/Result.tsx`:

```text
http://10.0.0.136:5000/checkurl
```

Replace `10.0.0.136` with your computer's LAN address before you scan from a phone. On Windows, run `ipconfig` and use the IPv4 address of your Wi-Fi adapter. The phone cannot use `localhost` or `127.0.0.1`, because those point at the phone itself. After you change the address, reload the app in Expo Go.

## Starting the backend app

From the project root, install Flask once, then start the server:

```bash
cd Backend
pip install flask
python app.py
```

On Windows, if `python` or `pip` is not on your PATH, use:

```bash
py -m pip install flask
py app.py
```

The server binds to `0.0.0.0` on port `5000`, so other devices on your network can reach it. Leave this terminal open while you use the app. You should see Flask's debug server log, and each scan prints `URL Received:` followed by the URL.

If the phone cannot connect:

- Confirm the backend terminal is still running
- Confirm the address in `Frontend/app/Result.tsx` matches this computer's LAN IPv4 address
- Allow inbound connections on port `5000` in Windows Firewall when Windows prompts you, or add an inbound rule for that port
- Keep the phone and the computer on the same network

The check endpoint is `POST /checkurl` with a JSON body of `{ "url": "<scanned url>" }`. A successful call returns HTTP 200.
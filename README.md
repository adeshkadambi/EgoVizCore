# EgoVizCore

A web-based clinical decision support system (CDSS) for monitoring hand function in occupational therapy patients. Clinicians log in, view their assigned patients, and review per-patient hand use reports including quantity metrics, activity breakdowns, and video snippets captured from egocentric wearable cameras.

> **Status:** Active development / Beta. Currently deployed at Firebase Hosting and used with real patient data.

---

## What it does

- **Login** — Firebase email/password authentication; only accounts provisioned in Firebase Auth can log in.
- **Dashboard** — Shows all patients assigned to the logged-in clinician (queried from Firestore by `uid`).
- **Patient Reports** — Per-patient view with:
  - Hand use quantity metrics (minutes recorded, % interaction, interactions/hour, avg interaction duration) displayed as bar/line charts
  - Activity breakdown by ADL category (pie/doughnut chart) with a reference modal for ADL definitions
  - Video snippets linked to Firebase Storage

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6 |
| Styling | Tailwind CSS v3, daisyUI, Headless UI |
| Charts | Chart.js v3, react-chartjs-2 |
| Backend / DB | Firebase (Auth, Firestore, Storage) |
| Deployment | Firebase Hosting via GitHub Actions |

---

## Project structure

```
src/
  components/
    Login.jsx          # Email/password login form
    Nav.jsx            # Top navbar with logout
    Dashboard.jsx      # Patient list + search
    PatientTable.jsx   # Table rendering filtered patient rows
    SearchBar.jsx      # Filters PatientTable by name, therapist, location, dx
    Reports.jsx        # Full report view for a selected patient
    ChartItem.jsx      # Reusable chart wrapper (bar, line, doughnut)
    Modal.jsx          # ADL/IADL category reference modal
    ProtectedRoute.js  # Redirects unauthenticated users to /
  context/
    AuthContext.js     # Firebase auth state (user, loading, signIn, logout)
  data/
    adls.js            # Static ADL category definitions used in the modal
    videodata.js       # Video metadata per patient (swap the active export to change patient)
  firebase.js          # Firebase app init, exports db and auth
  App.js               # Routes: / (Login), /dashboard (ProtectedRoute > Dashboard)
```

---

## Local setup

**Prerequisites:** Node.js 16+, a Firebase project with Auth and Firestore enabled.

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root (never commit this):
   ```
   REACT_APP_FIREBASE_API_KEY=...
   REACT_APP_FIREBASE_AUTH_DOMAIN=...
   REACT_APP_FIREBASE_PROJECT_ID=...
   REACT_APP_FIREBASE_STORAGE_BUCKET=...
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
   REACT_APP_FIREBASE_APP_ID=...
   ```
   Values are in the Firebase console under Project Settings → Your apps.

3. Start the dev server:
   ```bash
   npm start
   ```
   Opens at [http://localhost:3000](http://localhost:3000).

---

## Firestore data model

### `patients` collection

Each document represents one patient and is scoped to a clinician via the `show` field (clinician's Firebase `uid`).

```
patients/{docId}
  name:      string          // patient display name
  dx:        string          // diagnosis
  location:  string          // clinic/site
  therapist: string          // assigned therapist name
  show:      string          // clinician uid — controls who sees this patient
  quantity:  string[]        // 8-element array of comma-separated metric strings:
                             //   [0] dates, [1] minRecord, [2] pctIntL, [3] pctIntR,
                             //   [4] numIntL, [5] numIntR, [6] avgIntL, [7] avgIntR
  activity:  string[]        // 2-element array:
                             //   [0] comma-separated ADL category names
                             //   [1] comma-separated minutes per ADL
```

---

## Deployment

Pushes to `main` automatically build and deploy to Firebase Hosting via `.github/workflows/firebase-hosting-merge.yml`.

The workflow requires these GitHub Actions secrets (Settings → Secrets and variables → Actions):

```
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID
```

---

## Adding a new patient

1. Add a Firestore document to the `patients` collection following the data model above. Set `show` to the clinician's Firebase `uid`.
2. Upload video files to Firebase Storage under a folder named `p-XX/`.
3. Add a new commented block to `src/data/videodata.js` with the video metadata, then update the active `export const videos` to point to the new patient.

---

## Known limitations / areas for improvement

- Video metadata is hardcoded in `src/data/videodata.js` and must be manually swapped per active patient. Moving this to Firestore would make the app fully data-driven.
- No loading indicator while the patient list fetches on the Dashboard.
- No error boundary — a crash in any component will take down the full page.
- No tests.
